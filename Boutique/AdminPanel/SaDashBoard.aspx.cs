using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Boutique.AdminPanel
{

    public partial class SaDashBoard : System.Web.UI.Page
    {
        private Boutiques boutiqueObj = new Boutiques();
        Users userObj = new Users();
        
        protected void Page_Load(object sender, EventArgs e)
        {
            if ((Request.QueryString["Session"] != null) && (Request.QueryString["Session"] != ""))
            {
                DAL.Security.UserAuthendication UA;              
                UIClasses.Const Const = new UIClasses.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];               
                string BoutiqueID = Request.QueryString["Session"].ToString();
                DAL.Security.UserAuthendication UA_Changed = new DAL.Security.UserAuthendication(UA.userName,BoutiqueID,UA.Boutique,UA.Role);
                if (UA_Changed.ValidUser)
                {
                    Session[Const.LoginSession] = UA_Changed;
                }
                Response.Redirect("../AdminPanel/SaDashBoard.aspx");
            }

        }
        #region webmethods
       
        #region GetAllBoutiques
         [System.Web.Services.WebMethod]
        public static string GetAllBoutiques()
        {
            string jsonResult = null;
            DataSet ds=null;
            Boutiques boutiqWebObj = new Boutiques();
            ds=boutiqWebObj.GetAllBoutiques();
            
           //Converting to Json
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
                //childRow = new Dictionary<string, object>();
                //childRow.Add("Result", "Success");
             
                //parentRow.Add(childRow);
            }
            else
            {
                //childRow = new Dictionary<string, object>();
                //childRow.Add("Result", "Error");
                //parentRow.Add(childRow);
            }
            
            jsonResult= jsSerializer.Serialize(parentRow);

            return jsonResult;
           

          //Converting to Json
       }
        #endregion GetAllBoutiques

        #region NewBoutique
        [System.Web.Services.WebMethod]
        public static string NewBoutique(Boutiques boutiqueobj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            string status = null;        
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
           // boutiqueobj.BoutiqueID = UA.BoutiqueID;
            if (UA != null)
            {

                if (boutiqueobj.BoutiqueID == null)
                {
                    status = boutiqueobj.NewBoutique().ToString();
                }
                else
                {
                    status = boutiqueobj.EditBoutique().ToString();
                }

            }
            else { 
            
            //redirect to loin
            }
            return status;

        }
        #endregion NewBoutique

        #region NewAdmin
        [System.Web.Services.WebMethod]
        public static string NewAdmin(Users userObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
           // userObj.BoutiqueID = UA.BoutiqueID;

            string status = null;
            if(userObj.UserID==null)
            {
                status = userObj.AddNewUser().ToString();
            }
            else
            {
                userObj.BoutiqueID = UA.BoutiqueID;
                status = userObj.EditUser(userObj.UserID).ToString();
            }
           
            return status;
        }
        #endregion NewAdmin

        #region DeleteBoutique
         [System.Web.Services.WebMethod]
        public static string DeleteBoutique(Boutiques boutiquesObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
         

            string status = null;
            try
            {

                status = boutiquesObj.DeleteBoutique().ToString();
            }
             catch(Exception)
            {
               status= "500";//Exception of foreign key
            }
             finally
            {

            }
            return status;
        }
        #endregion DeleteBoutique

        #region BindBoutiqueDetails
        [System.Web.Services.WebMethod]
         public static string BindBoutiqueDetails(Boutiques boutiqueObj)
        {
            string jsResult=null;
            try
            {
                DAL.Security.UserAuthendication UA;
                UIClasses.Const Const = new UIClasses.Const();

                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                DataSet ds = null;
                
                ds = boutiqueObj.GetBoutique();
                if ((ds.Tables[0].Rows.Count > 0) && (ds != null))
                {

                   //Converting to Json
                   
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
                        jsResult= jsSerializer.Serialize(parentRow);
                       
                    }
                   
                }
                
                }

            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }
            return jsResult;
        }
        #endregion BindBoutiqueDetails

        #region GetAllBoutiqueIDandName
        [System.Web.Services.WebMethod]
        public static string GetAllBoutiqueIDandName(Boutiques boutiquesObj)
        {
              JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
              DataSet ds = null;
              ds = boutiquesObj.GetAllBoutiqueIDAndName();
              //Converting to Json
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
                return jsSerializer.Serialize(parentRow);
          
          
        }
        #endregion GetAllBoutiqueIDandName

        #endregion webmethods
      


        #region events
        //protected void NewBoutique_ServerClick(object sender, EventArgs e)
        //{
        //    try
        //    {
        //        boutiqueObj.AppVersion = (txtAppVersion.Value.Trim() != "") ? txtAppVersion.Value.Trim() : null;
        //        boutiqueObj.Name = (txtBouquetName.Value.Trim() != "") ? txtBouquetName.Value.Trim() : null;
        //        boutiqueObj.StartedYear = (txtStartYear.Value.Trim() != "") ? txtStartYear.Value.Trim() : null;
        //        boutiqueObj.AboutUs = (txtAboutus.Value.Trim() != "") ? txtAboutus.Value.Trim() : null;
        //        boutiqueObj.Caption = (txtCaption.Value.Trim() != "") ? txtCaption.Value.Trim() : null;
        //        boutiqueObj.Location = (txtLocation.Value.Trim() != "") ? txtLocation.Value.Trim() : null;
        //        boutiqueObj.Address = (txtAddress.Value.Trim() != "") ? txtAddress.Value.Trim() : null;
        //        boutiqueObj.Phone = (txtPhone.Value.Trim() != "") ? txtPhone.Value.Trim() : null;
        //        boutiqueObj.Timing = (txtTimings.Value.Trim() != "") ? txtTimings.Value.Trim() : null;
        //        boutiqueObj.WorkingDays = (txtWorkingDays.Value.Trim() != "") ? txtWorkingDays.Value.Trim() : null;
        //        boutiqueObj.FbLink = (txtFacebooklink.Value.Trim() != "") ? txtFacebooklink.Value.Trim() : null;
        //        boutiqueObj.InstagramLink = (txtInstatgramlink.Value.Trim() != "") ? txtInstatgramlink.Value.Trim() : null;
        //        boutiqueObj.NewBoutique();
        //      //  upBoutiqueGrid.Update();
        //    }
        //    catch(Exception ex)
        //    {
        //        throw ex;

        //     }
        //     finally
        //    {

        //    }
        //}

        //protected void NewAdmin_ServerClick(object sender, EventArgs e)
        //{
        //    try
        //    {
        //        userObj.Name = (txtUserName.Value.Trim() != "") ? txtUserName.Value.Trim() : null;
        //        userObj.Mobile = (txtMobile.Value.Trim() != "") ? txtMobile.Value.Trim() : null;//cant be null
        //        userObj.Email = (txtUserEmail.Value.Trim() != "") ? txtUserEmail.Value.Trim() : null;
        //        userObj.IsActive = (chkActive.Checked != true) ? false : true;
        //        userObj.IsAdmin = (chkIsAdmin.Checked != true) ? false : true;
        //        userObj.BoutiqueID = "470a044a-4dba-4770-bca7-331d2c0834ae";
        //        userObj.CreatedBy = "albert";
        //        userObj.CreatedDate = DateTime.Now;
        //        userObj.AddNewUser();

        //        //userObj.DOB = (dateDOB.Value.Trim() != "") ? DateTime.Parse(dateDOB.Value.ToString()) : DateTime.Parse(null);//
        //        //userObj.Anniversary = (dateAnniversary.Value.Trim() != "") ? DateTime.Parse(dateAnniversary.Value.ToString()) : DateTime.Parse(null);//check
        //        //// dateFormat: 'dd-mm-yy'
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //    finally
        //    {

        //    }
        //}
        #endregion events
    }
}