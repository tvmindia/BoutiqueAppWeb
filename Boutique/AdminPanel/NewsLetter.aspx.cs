using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Boutique.AdminPanel
{
    public partial class NewsLetter : System.Web.UI.Page
    {
        DAL.Security.UserAuthendication UA;
        UIClasses.Const Const = new UIClasses.Const();
        protected void Page_Load(object sender, EventArgs e)
        {
            UA = (DAL.Security.UserAuthendication)Session[Const.LoginSession];
        }
        #region GetAllAudienceMailID
         [System.Web.Services.WebMethod]
        public static string GetAllAudienceMailID(NewsLetters newsObj)
        {
            string jsonResult = null;
            string status = null;
            DataSet ds = null;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            newsObj.BoutiqueID = UA.BoutiqueID;
            newsObj.Boutique = UA.Boutique;
            try
            {
                ds = newsObj.GetAllNewsLetterMailIDs();
                JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                Dictionary<string, object> childRow;
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        childRow = new Dictionary<string, object>();
                        foreach (DataColumn col in ds.Tables[0].Columns)
                        {
                            childRow.Add(col.ColumnName, row[col]);
                        }
                        parentRow.Add(childRow);
                    }
                }
                jsonResult = jsSerializer.Serialize(parentRow);
            }
             catch(Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "NewsLetter";
                ETObj.Method = "GetAllAudienceMailID";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }

            return jsonResult; //Converting to Json
        }
        #endregion GetAllAudienceMailID

        #region SendNotificationMail
        [System.Web.Services.WebMethod]
        public static string SendEmail(MailSending mailObj)
        {
            string status = null;
            int ? result=null;
            string jsonResult = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            NewsLetters newsObj = new NewsLetters();
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            mailObj.BoutiqueID = UA.BoutiqueID;
            mailObj.Boutique = UA.Boutique;
            DataSet ds = null;
            mailObj.msg = mailObj.msg;
           
            if (mailObj.audienceType == "All")
            {
                ds = newsObj.GetAllEmailIdsToSendNewsLetterEmail();
                List<string> strDetailIDList = new List<string>();

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    strDetailIDList.Add(row["Email"].ToString());
                }
                mailObj.recepientEmail = strDetailIDList.ToArray();
            }
            else
            {
                mailObj.recepientEmail =new string[]{ mailObj.audienceType};
            }
            HttpContext ctx = HttpContext.Current;
            try
            {
                new Thread(delegate()
                {
                    HttpContext.Current = ctx;
                    result = mailObj.PopulateBody(
                        //"" + "Anija",
                        //"" + "Boutique",
                        //"https://www.google.co.in/" +
                        //"Your Todays Deal.....",
                        //"" + "Offers",
                        //"https://ci5.googleusercontent.com/proxy/6y-FQARPH8tJQD62EWwrkebbdbfsFJyXdIFC_nRIqtB96RJizlM4KcN0A0EWze5jvlC4S1yLnMG92Z_CTG8L2A7EtRHcEQYPtiZTXo_yeRwFSjR3yqESQJXD87xtrx-dfZh0Rybcjs9OE3Bn0m-WGIdVVg5MZig1l7ZoMI0EHmd7=s0-d-e1-ft#http://i1.sdlcdn.com/static/img/marketing-mailers/mailer/2016/UserGrowth/manfashion25april/images/23new.jpg");
                        //mailObj.SendHtmlFormattedEmail("anija.g@thrithvam.me;thomson.varkey@thrithvam.me", "TiqueInn Deal", body);
                 );
                }).Start();
                result=1;
            }
            catch(Exception ex)
            {

                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "NewsLetter";
                ETObj.Method = "SendEmail";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            jsonResult = jsSerializer.Serialize(result);

            return jsonResult;
        }
        #endregion SendNotificationMail

        #region AddSelectedImageToHtmlTemplate
        [System.Web.Services.WebMethod]
        public static string AddSelectedImageToHtmlTemplate(NewsLetters newsObj)
        {
            string status = null;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            newsObj.BoutiqueID = UA.BoutiqueID;
            newsObj.Boutique = UA.Boutique;
            string jsonResult = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                var body = newsObj.PopulateBody();

                jsonResult = jsSerializer.Serialize(body);
            }
            catch(Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "NewsLetter";
                ETObj.Method = "AddSelectedImageToHtmlTemplate";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }

            return jsonResult;
        }
        #endregion AddSelectedImageToHtmlTemplate

        #region GetAllTemplateNameAndID
        [System.Web.Services.WebMethod]
        public static string GetAllTemplateNameAndID(NewsLetters newsObj)
        {
            string status = null;
            string jsonResult = null;
            DataSet ds = null;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            newsObj.BoutiqueID = UA.BoutiqueID;
            newsObj.Boutique = UA.Boutique;
            try
            {
                ds = newsObj.GetAllTemplateIDandName();
                JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                Dictionary<string, object> childRow;
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        childRow = new Dictionary<string, object>();
                        foreach (DataColumn col in ds.Tables[0].Columns)
                        {
                            childRow.Add(col.ColumnName, row[col]);
                        }
                        parentRow.Add(childRow);
                    }
                }
                jsonResult = jsSerializer.Serialize(parentRow);
            }
            catch(Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "NewsLetter";
                ETObj.Method = "GetAllTemplateNameAndID";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return jsonResult; //Converting to Json
        }
        #endregion GetAllTemplateNameAndID

        #region GetAllNewsLetterEmails
        [System.Web.Services.WebMethod]
        public static string GetAllNewsLetterEmails(NewsLetters newsObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            string status = null;
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            newsObj.BoutiqueID = UA.BoutiqueID;
            string jsonResult = null;
            DataSet ds = null;
            try
            {
                ds = newsObj.GetAllEmailIdsToSendNewsLetterEmail();
                JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                Dictionary<string, object> childRow;
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        childRow = new Dictionary<string, object>();
                        foreach (DataColumn col in ds.Tables[0].Columns)
                        {
                            childRow.Add(col.ColumnName, row[col]);
                        }
                        parentRow.Add(childRow);
                    }
                }
                jsonResult = jsSerializer.Serialize(parentRow);
            }
            catch(Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "NewsLetter";
                ETObj.Method = "GetAllNewsLetterEmails";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return jsonResult; //Converting to Json
        }
        #endregion GetAllNewsLetterEmails

        #region AddNesLetterMailTrackingDetails
        /// <summary>
        /// If notification id is an empty string it will do inserting, otherwise updating
        /// </summary>
        /// <param name="notificationObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string AddNesLetterMailTrackingDetails(NewsLetters newsObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            newsObj.BoutiqueID = UA.BoutiqueID;
            newsObj.UpdatedBy = UA.userName;
            newsObj.CreatedBy = UA.userName;
            string status = null;
           // DataSet ds = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Product productObj = new Product();
            //if (newsObj.audienceMailType == "All")
            //{
            //    ds = newsObj.GetAllEmailIdsToSendNewsLetterEmail();
            //    List<string> strDetailIDList = new List<string>();

            //    foreach (DataRow row in ds.Tables[0].Rows)
            //    {
            //        strDetailIDList.Add(row["Email"].ToString());
            //    }
            //    newsObj.audienceMailIDs = strDetailIDList.ToArray();
            //}
            try
            {

                status = newsObj.InsertNewsLetterTrackingDetails().ToString();
                foreach (string imgID in newsObj.ImageIDs)
                {
                    productObj.ImageID = imgID;
                    byte[] ImgBack = productObj.GetProductImage();
                    string fileExtension = ".jpeg";
                    string str_image = imgID + fileExtension.Trim();
                    string filePath = HttpContext.Current.Server.MapPath("~/NewsLetterImages/" + str_image.Trim());
                    if (!System.IO.File.Exists(filePath))
                    {
                        System.IO.File.WriteAllBytes(filePath, ImgBack);
                    }
                }
            }
            catch (Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "NewsLetter";
                ETObj.Method = "AddNesLetterMailTrackingDetails";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            finally
            {
            }
            return jsSerializer.Serialize(newsObj);
        }
        #endregion AddNesLetterMailTrackingDetails

        #region GetAllNewsLetterNotMailSendDetails
        [System.Web.Services.WebMethod]
        public static string GetAllNewsLetterNotMailSendDetails(NewsLetters newsObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            newsObj.BoutiqueID = UA.BoutiqueID;
            string jsonResult = null;
            DataSet ds = null;
            string status = null;
            try
            {
                ds = newsObj.GetAllNewsLetterMailNotSendDetails();
                JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                Dictionary<string, object> childRow;
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        childRow = new Dictionary<string, object>();
                        foreach (DataColumn col in ds.Tables[0].Columns)
                        {
                            childRow.Add(col.ColumnName, row[col]);
                        }
                        parentRow.Add(childRow);
                    }
                }
                jsonResult = jsSerializer.Serialize(parentRow);
            }
            catch(Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "NewsLetter";
                ETObj.Method = "GetAllNewsLetterNotMailSendDetails";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return jsonResult; //Converting to Json
        }
        #endregion GetAllNewsLetterNotMailSendDetails

        #region GetAllTemplateDetails
         [System.Web.Services.WebMethod]
        public static string GetAllTemplateDetails(NewsLetters newsObj)
        {
            string jsonResult = null;
            DataSet ds = null;
            string status = null;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            try
            {
                ds = newsObj.GetAllTemplateDetails();
                JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                Dictionary<string, object> childRow;
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        childRow = new Dictionary<string, object>();
                        foreach (DataColumn col in ds.Tables[0].Columns)
                        {
                            childRow.Add(col.ColumnName, row[col]);
                        }
                        parentRow.Add(childRow);
                    }
                }
                jsonResult = jsSerializer.Serialize(parentRow);
            }
             catch(Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "NewsLetter";
                ETObj.Method = "GetAllTemplateDetails";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return jsonResult; //Converting to Json
        }
        #endregion GetAllTemplateDetails

         #region GetAllNewsLetterSendMailDetails
         [System.Web.Services.WebMethod]
         public static string GetAllNewsLetterSendMailDetails(NewsLetters newsObj)
         {
             string status = null;
             DAL.Security.UserAuthendication UA;
             UIClasses.Const Const = new UIClasses.Const();
             UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
             newsObj.BoutiqueID = UA.BoutiqueID;
             string jsonResult = null;
             DataSet ds = null;
             try
             {
                 ds = newsObj.GetAllSendMailDetails();
                 JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                 List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                 Dictionary<string, object> childRow;
                 if (ds.Tables[0].Rows.Count > 0)
                 {
                     foreach (DataRow row in ds.Tables[0].Rows)
                     {
                         childRow = new Dictionary<string, object>();
                         foreach (DataColumn col in ds.Tables[0].Columns)
                         {
                             childRow.Add(col.ColumnName, row[col]);
                         }
                         parentRow.Add(childRow);
                     }
                 }
                 jsonResult = jsSerializer.Serialize(parentRow);
             }
             catch(Exception ex)
             {
                 status = "500";//Exception of foreign key

                 //Code For Exception Track insert
                 ExceptionTrack ETObj = new ExceptionTrack();
                 ETObj.BoutiqueID = UA.BoutiqueID;
                 ETObj.UserID = UA.UserID;
                 ETObj.Description = ex.Message;//Actual exception message
                 ETObj.Date = DateTime.Now.ToString();
                 ETObj.Module = "NewsLetter";
                 ETObj.Method = "GetAllNewsLetterSendMailDetails";
                 ETObj.ErrorSource = "Code-Behind";
                 ETObj.IsMobile = false;
                 ETObj.Version = UA.Version;
                 ETObj.CreatedBy = UA.userName;
                 ETObj.InsertErrorDetails();
             }
             return jsonResult; //Converting to Json
         }
         #endregion GetAllNewsLetterSendMailDetails

         #region UnsubscribeNewsLetter
         [System.Web.Services.WebMethod]
         public static string UnsubscribeNewsLetter(NewsLetters newsObj)
         {
             DAL.Security.UserAuthendication UA;
             UIClasses.Const Const = new UIClasses.Const();

             UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
             newsObj.BoutiqueID = UA.BoutiqueID;
             string status = null;
             JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
             Product productObj = new Product();
             try
             {

                 status = newsObj.UnsubscribeEmail().ToString();
             }
             catch (Exception ex)
             {
                 status = "500";//Exception of foreign key

                 //Code For Exception Track insert
                 ExceptionTrack ETObj = new ExceptionTrack();
                 ETObj.BoutiqueID = UA.BoutiqueID;
                 ETObj.UserID = UA.UserID;
                 ETObj.Description = ex.Message;//Actual exception message
                 ETObj.Date = DateTime.Now.ToString();
                 ETObj.Module = "NewsLetter";
                 ETObj.Method = "UnsubscribeNewsLetter";
                 ETObj.ErrorSource = "Code-Behind";
                 ETObj.IsMobile = false;
                 ETObj.Version = UA.Version;
                 ETObj.CreatedBy = UA.userName;
                 ETObj.InsertErrorDetails();
             }
             finally
             {
             }
             return jsSerializer.Serialize(newsObj);
         }
         #endregion UnsubscribeNewsLetter

         #region GetNewsLetterEmails
         [System.Web.Services.WebMethod]
         public static string GetNewsLetterEmails(NewsLetters newsObj)
         {
             string status = null;
             string jsonResult = null;
             DataSet ds = null;
             DAL.Security.UserAuthendication UA;
             UIClasses.Const Const = new UIClasses.Const();

             UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
             try
             {
                 ds = newsObj.GetEmailIDBasedOnNewsLetter();
                 JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                 List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                 Dictionary<string, object> childRow;
                 if (ds.Tables[0].Rows.Count > 0)
                 {
                     foreach (DataRow row in ds.Tables[0].Rows)
                     {
                         childRow = new Dictionary<string, object>();
                         foreach (DataColumn col in ds.Tables[0].Columns)
                         {
                             childRow.Add(col.ColumnName, row[col]);
                         }
                         parentRow.Add(childRow);
                     }
                 }
                 jsonResult = jsSerializer.Serialize(parentRow);
             }
             catch(Exception ex)
             {

                 status = "500";//Exception of foreign key

                 //Code For Exception Track insert
                 ExceptionTrack ETObj = new ExceptionTrack();
                 ETObj.BoutiqueID = UA.BoutiqueID;
                 ETObj.UserID = UA.UserID;
                 ETObj.Description = ex.Message;//Actual exception message
                 ETObj.Date = DateTime.Now.ToString();
                 ETObj.Module = "NewsLetter";
                 ETObj.Method = "GetNewsLetterEmails";
                 ETObj.ErrorSource = "Code-Behind";
                 ETObj.IsMobile = false;
                 ETObj.Version = UA.Version;
                 ETObj.CreatedBy = UA.userName;
                 ETObj.InsertErrorDetails();
             }
             return jsonResult; //Converting to Json
         }
         #endregion GetNewsLetterEmails

    }
}