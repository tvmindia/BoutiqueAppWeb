using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace Boutique.DAL
{
    public class NewsLetters
    {
        #region properties
        public string NotificationID
        {
            get;
            set;
        }
        public string BoutiqueID
        {
            get;
            set;
        }
        public string Title
        {
            get;
            set;
        }
        public string Description
        {
            get;
            set;
        }
        public string StartDate
        {
            get;
            set;
        }
        public string EndDate
        {
            get;
            set;
        }
        public string ProductID
        {
            get;
            set;
        }
        public string CategoryCode
        {
            get;
            set;
        }
        public string UserID
        {
            get;
            set;
        }
        public string OrderID
        {
            get;
            set;
        }
        public string[] ImageIDs
        {
            get;
            set;
        }
        public string[] productIDs
        {
            get;
            set;
        }
        public string[] audienceMailIDs
        {
            get;
            set;
        }
        public string CreatedBy
        {
            get;
            set;
        }
        public DateTime CreatedDate
        {
            get;
            set;
        }
        public string UpdatedBy
        {
            get;
            set;
        }
        public DateTime UpdatedDate
        {
            get;
            set;
        }
        public string TemplateID
        {
            get;
            set;
        }
        public string audienceMailType
        {
            get;
            set;
        }
        public string NewsLetterID
        {
            get;
            set;
        }
        public int imageCount
        {
            get;
            set;
        }
        public string templateFile
        {
            get;
            set;
        }
        public string templateName
        {
            get;
            set;
        }
        public string status
        {
            get;
            set;
        }
        public string imageID
        {
            get;
            set;
        }
        public int audienceCount
        {
            get;
            set;
        }
        public string Boutique
        {
            get;
            set;
        }
        public string EmailId
        {
            get;
            set;
        }
        #endregion properties

        MailSending mailObj = new MailSending();
        #region Methods
        #region GetAllTemplateIDandName
        public DataSet GetAllTemplateIDandName()
        {

            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllTemplateIDAndName]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);

            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }

        #endregion GetAllTemplateIDandName

        #region GetAllEmailIdsToSendNewsLetterEmail
        public DataSet GetAllEmailIdsToSendNewsLetterEmail()
        {

            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllMailID'sBasedOnBoutique]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);

            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion GetAllEmailIdsToSendNewsLetterEmail

        #region GetAllTemplateDetails
        public DataSet GetAllTemplateDetails()
        {

            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllTemplateDetailsByID]";
                cmd.Parameters.Add("@templateID", SqlDbType.UniqueIdentifier).Value =Guid.Parse(TemplateID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);

            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion GetAllTemplateDetails

        #region GetAllTemplateDetailsForDrafts
        public DataSet GetAllTemplateDetailsForDrafts()
        {

            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllDraftsTemplateDetails]";
                cmd.Parameters.Add("@NewsLetterID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(NewsLetterID);
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);

            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion GetAllTemplateDetailsForDrafts

        #region PopulateBody
        public string PopulateBody()
        {
           if(imageID!=null)
            {
                List<string> names = imageID.Split(',').ToList<string>();
                ImageIDs = names.ToArray();
            //    List<string> strDetailIDList = new List<string>();
            //        strDetailIDList.Add(imageID);               
            //    ImageIDs = strDetailIDList.ToArray();              
            }
            // string imageUrl = "https://ci5.googleusercontent.com/proxy/cBgbcNE45Ik_XJgwpDGopRq1XIqU_HQLp3HgHLwVKh4-Yfap2wX1fSUTXvPNJaLttIsN1H8XvofjmLPIXqc122yl8_nO7wnuVrtDTNJ-5zZlHsD9CBNxpzFM1Utj570VnbbFgkNCwKi6kAjCKkEchyP1kGxJoVmdVIAcfwY=s0-d-e1-ft#http://i1.sdlcdn.com/static/img/marketing-mailers/mailer/2016/UserGrowth/manfashion25april/images/";
            DataSet ds = null;
            ds = GetAllTemplateDetails();
            string Url = "";
            string imageUrl, logourl = null;

            string altImage = "http://www.simasa.co.uk/WebRoot/SIMASA/Shops/SIMA/5060/8140/8742/83EE/1AB2/0A00/0063/0C54/SpecialOffer_SIMA-1_m.jpg";
            //Url = "BoutiqueTemplates/EmailTemplate.htm";
            Url = ds.Tables[0].Rows[0]["TemplateFile"].ToString();
            int imageCount = Convert.ToInt32(ds.Tables[0].Rows[0]["ImageCount"]);
            imageCount = imageCount+1-2;
            string body = string.Empty;
            Regex rx = new Regex("(?<=<img[^>]*src=\")[^\"]+", RegexOptions.IgnoreCase);
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/" + Url)))
            {
                body = reader.ReadToEnd();
            }
            //string fileName = HttpContext.Current.Server.MapPath("~/" + Url);
            //body = fileName;
            body = body.Replace("{UserName}", " ");
            body = body.Replace("{Title}", " ");
            body = body.Replace("{Url}", "");
            body = body.Replace("{Description}", Description);
            body = body.Replace("{Mainimage}", "");
            body = body.Replace("{Images0}", altImage);
            if (body.Contains("{ImgBirthday}"))
            {
                body = body.Replace("{ImgBirthday}", "../img/Templates/BirthdayImage.jpg");
            }
            if (body.Contains("imgLogo"))
            {
              logourl = "../ImageHandler/ImageServiceHandler.ashx?BoutiqueLogoID=" + BoutiqueID;
              string logo = "http://tiquesinn.com/" + logourl.Replace("../", "");
              body = body.Replace("{imgLogo}", logo);
              body = body.Replace("{BoutiqueName}", Boutique);
            }
            for (int i = 0; i <= imageCount; i++)
            {
                    //  string[] ids = { "5ff4eb3b-4f63-418d-94a8-e05b33a03008","5ff4eb3b-4f63-418d-94a8-e05b33a03008", "8981c06b-df62-461d-aef3-d512a54c2124", "5ff4eb3b-4f63-418d-94a8-e05b33a03008", "8981c06b-df62-461d-aef3-d512a54c2124", "5ff4eb3b-4f63-418d-94a8-e05b33a03008", "8981c06b-df62-461d-aef3-d512a54c2124", "5ff4eb3b-4f63-418d-94a8-e05b33a03008", "8981c06b-df62-461d-aef3-d512a54c2124" };
                    imageUrl = "../ImageHandler/ImageServiceHandler.ashx?ImageID=" + ImageIDs[i];
               
                // body = body.Replace("{image" + i + "}", imageUrl + i + ".jpeg");
                body = body.Replace("{image" + i + "}", imageUrl);
            }
            return body;
        }
        #endregion PopulateBody

        #region InsertNewsLetterTrackingDetails
        public Int16 InsertNewsLetterTrackingDetails()
        {
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null, outnotificationid = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertNewsLetterTrackingDetails]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@TemplateID", SqlDbType.UniqueIdentifier).Value =Guid.Parse(TemplateID);
                cmd.Parameters.Add("@ImageID", SqlDbType.VarChar, -1).Value = string.Join(",", ImageIDs);
                cmd.Parameters.Add("@ProductID", SqlDbType.VarChar, -1).Value = string.Join(",", productIDs);
                cmd.Parameters.Add("@AudienceMailID", SqlDbType.VarChar, -1).Value = string.Join(",", audienceMailType);
                cmd.Parameters.Add("@Description", SqlDbType.VarChar, -1).Value = Description;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 255).Value = CreatedBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                cmd.Parameters.Add("@IsMAilSend", SqlDbType.Bit).Value = false;
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;
                outnotificationid = cmd.Parameters.Add("@NewsLetterID", SqlDbType.UniqueIdentifier);
                outnotificationid.Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();
                NewsLetterID = outnotificationid.Value.ToString();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            //insert success or failure
            status = outParameter.Value.ToString();
            return Int16.Parse(outParameter.Value.ToString());

        }
        #endregion InsertNewsLetterTrackingDetails

        #region GetAllNewsLetterDetails
        public DataSet GetAllNewsLetterDetails()
        {

            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds,dsEmail = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllNewsLetterDetails]";
                cmd.Parameters.Add("@NewsLetterID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(NewsLetterID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                dsEmail = new DataSet();
                sda.Fill(ds);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    imageCount = Convert.ToInt32(ds.Tables[0].Rows[0]["ImageCount"]);
                    String[] images = new String[] { ds.Tables[0].Rows[0]["ImageID"].ToString() };
                    ImageIDs = images;
                    templateFile = ds.Tables[0].Rows[0]["TemplateFile"].ToString();
                    Description = ds.Tables[0].Rows[0]["Description"].ToString();
                    audienceMailType = ds.Tables[0].Rows[0]["AudienceMailID"].ToString();
                    if (audienceMailType == "All")
                    {
                        dsEmail = GetAllEmailIdsToSendNewsLetterEmail();
                        List<string> strDetailIDList = new List<string>();

                        foreach (DataRow row in dsEmail.Tables[0].Rows)
                        {
                            strDetailIDList.Add(row["Email"].ToString());
                        }
                        audienceMailIDs = strDetailIDList.ToArray();
                    }
                    else
                    {
                        audienceMailIDs =new string[]{ audienceMailType};
                    }
                }

            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion GetAllNewsLetterDetails

        #region UpdateNewsLetterMailSendDetails
        public void UpdateNewsLetterIsmailSend()
        {
            if (BoutiqueID == "")
            {
                throw new Exception("BoutiqueID is Empty!!");
            }
            dbConnection dcon = null;
            SqlCommand cmd = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateIsMailSendFlag]";
                cmd.Parameters.Add("@IsMAilSend", SqlDbType.Bit).Value = true;
                cmd.Parameters.Add("@NewsLetterID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(NewsLetterID);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            //insert success or failure


        }
        #endregion UpdateNewsLetterMailSendDetails

        #region GetAllNewsLetterMailNotSendDetails
        public DataSet GetAllNewsLetterMailNotSendDetails()
        {

            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds,dsAudience = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetNewsLetterDrafts]";
               // cmd.Parameters.Add("@NewsLetterID", SqlDbType.UniqueIdentifier).Value = NewsLetterID;
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value =Guid.Parse(BoutiqueID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
                for (int intCount = 0; intCount < ds.Tables[0].Rows.Count; intCount++)
                {
                    if (ds.Tables[0].Rows[intCount]["AudienceMailID"].ToString() == "All")
                    {
                        dsAudience = GetAllEmailIdsToSendNewsLetterEmail();
                        audienceCount = dsAudience.Tables[0].Rows.Count;
                        ds.Tables[0].Rows[intCount]["AudienceMailID"] = audienceCount;
                    }
                    else
                    {
                        string mailIDs =ds.Tables[0].Rows[intCount]["AudienceMailID"].ToString();
                        audienceCount = mailIDs.Split(',').Length;
                        ds.Tables[0].Rows[intCount]["AudienceMailID"] = audienceCount;
                    }
                }
                ds.Tables[0].AcceptChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion GetAllNewsLetterMailNotSendDetails

        #region GetAllSendMailDetails
        public DataSet GetAllSendMailDetails()
        {

            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds, dsAudience = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllSendMailDetails]";
                // cmd.Parameters.Add("@NewsLetterID", SqlDbType.UniqueIdentifier).Value = NewsLetterID;
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
                for (int intCount = 0; intCount < ds.Tables[0].Rows.Count; intCount++)
                {
                    if (ds.Tables[0].Rows[intCount]["AudienceMailID"].ToString() == "All")
                    {
                        dsAudience = GetAllEmailIdsToSendNewsLetterEmail();
                        audienceCount = dsAudience.Tables[0].Rows.Count;
                        ds.Tables[0].Rows[intCount]["AudienceMailID"] = audienceCount;
                    }
                    else
                    {
                        string mailIDs = ds.Tables[0].Rows[intCount]["AudienceMailID"].ToString();
                        audienceCount = mailIDs.Split(',').Length;
                        ds.Tables[0].Rows[intCount]["AudienceMailID"] = audienceCount;
                    }
                }
                ds.Tables[0].AcceptChanges();
            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion GetAllSendMailDetails

        #region AddNewTemplate
        public Int16 AddNewTemplate()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[AddNewTemplate]";
                cmd.Parameters.Add("@TemplateName", SqlDbType.NVarChar,256).Value = templateName;
                cmd.Parameters.Add("@TemplateFile", SqlDbType.NVarChar, -1).Value = templateFile;
                cmd.Parameters.Add("@ImageCount", SqlDbType.Int).Value = imageCount;
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;
                //outnotificationid = cmd.Parameters.Add("@TemplateID", SqlDbType.UniqueIdentifier);
                //outnotificationid.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
                //TemplateID = outnotificationid.Value.ToString();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            //insert success or failure
            status = outParameter.Value.ToString();
            return Int16.Parse(outParameter.Value.ToString());

        }
        #endregion AddNewTemplate

        #region TemplateHeader
        public string TemplateHeader()
        {
            string header = " <table border='0' cellpadding='10' cellspacing='0' width='600' id='templatePreheader'>"+
                "  <tr>" +
                "<td valign='top' class='preheaderContent'>"+
                "<table style='height:100%!important;width:100%!important;border:0!important;' cellpadding=' 10' cellspacing='0'>"+
                "<tr>" +
                "<td valign='top'>"+
                "<div mc:edit='std_preheader_content'>"+
                "<table style='background-color:rgba(49, 42, 42, 0.19)!important;width:562px!important;height:40px!important;'>"+
                "<tbody>" +
                "<tr>" +
                "<td><img alt='' src='{imgLogo}' style='height:25px!important;width:25px!important;' /></td>"+
                "<td><label id='lblBoutique' >{BoutiqueName}</label></td>"+
                "</tr>" +
                "</tbody>" +
                "</table>"+
                "</div>" +
                "</td>"+
                "</tr>" +
                " </table>"+
                "</td>"+
                " </tr>" +
                "</table>";
            header = header.Replace("{imgLogo}", "../img/Default/nologo1.png");
            return header;
        }
        #endregion TemplateHeader

        #region TemplateFooter
        public string TemplateFooter()
        {
            string footer = "<tr>" +
                "<td align='center' valign='top'>"+
                    " <table border='0' cellpadding='10' cellspacing='0' width='600' id='templateFooter'>"+
                        "<tr>" +
                        "<td valign='top' class='footerContent'>"+
                            "<table border='0' cellpadding='10' cellspacing='0' width='100%'>"+
                                "<tr>" +
                                "<td valign='top' width='350' style='color: #cc6699;'>" +
                                " <div mc:edit='std_footer'>"+
                                "<em>Copyright © 2016 TiquesInn, All rights reserved.</em>" +
                                "<br />" +
                                "<em><a href='../BoutiqueTemplates/Unsubscribe.html' target='_blank'>unsubscribe</a></em>"+
                                "<br>"+
                                "</div>"+
                                "</td>"+
                                "</tr>" +
                            "</table>"+
                        "</td>"+
                        " </tr>" +
                    "</table>"+
                "</td>"+
                " </tr>";
            return footer;
        }
        #endregion TemplateFooter

        #region UnsubscribeEmail
        public Int16 UnsubscribeEmail()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UnsubscribeEmail]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = EmailId;
                cmd.Parameters.Add("@IsUnsubscribed", SqlDbType.Bit).Value = true;
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            //insert success or failure
            status = outParameter.Value.ToString();
            return Int16.Parse(outParameter.Value.ToString());

        }
        #endregion UnsubscribeEmail

        #region GetAllNewsLetterMailIDs
        public DataSet GetAllNewsLetterMailIDs()
        {

            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllNewsLetterMailIDs]";
                cmd.Parameters.Add("@BoutiqueID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(BoutiqueID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);

            }

            catch (Exception ex)
            {
                throw ex;
            }

            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion GetAllNewsLetterMailIDs

       
        #endregion Methods
    }
}