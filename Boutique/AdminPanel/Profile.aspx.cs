using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace Boutique.AdminPanel
{
    public partial class Profile : System.Web.UI.Page
    {
        DAL.Security.UserAuthendication UA;
        UIClasses.Const Const = new UIClasses.Const();

        protected void Page_Load(object sender, EventArgs e)
        {
            UA = (DAL.Security.UserAuthendication)Session[Const.LoginSession];

        
            if (UA.Role == Const.Manager)
            {
                NewOwner.Visible = false;
                footer.Visible = false;

            }

        }

        #region NewBoutique
        [System.Web.Services.WebMethod]
        public static string NewBoutique(Boutiques boutiqueObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            boutiqueObj.BoutiqueID = UA.BoutiqueID;

            string status = null;
            if (boutiqueObj.BoutiqueID == null)
            {
               // status = boutiqueobj.NewBoutique().ToString();
            }
            else
            {
                status = boutiqueObj.EditBoutique().ToString();
            }


            return status;
        }
        #endregion NewBoutique

        #region BindBoutiqueDetails
        [System.Web.Services.WebMethod]
        public static string BindBoutiqueDetails(Boutiques boutiqueObj)
        {
            string jsResult = null;
            try
            {

                DAL.Security.UserAuthendication UA;
                UIClasses.Const Const = new UIClasses.Const();

                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                boutiqueObj.BoutiqueID = UA.BoutiqueID;

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
                        jsResult = jsSerializer.Serialize(parentRow);

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

        #region DeleteOwner
        [System.Web.Services.WebMethod]
        public static string DeleteOwner(Owners ownersObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            ownersObj.BoutiqueID = UA.BoutiqueID;

            string status = null;
            try
            {

                status = ownersObj.DeleteOwner().ToString();

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {

            }
            return status;
        }

        #endregion DeleteOwner

        #region InsertOwner

        [System.Web.Services.WebMethod]
        public static string InsertOwner(Owners ownersObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];


            string status = null;
            try
            {
                Users obj = new Users();
                ownersObj.BoutiqueID = UA.BoutiqueID;
                obj.BoutiqueID = UA.BoutiqueID;
                obj.Name = ownersObj.Name;
                obj.Mobile = ownersObj.Phone;
                obj.Email = ownersObj.Email;
                obj.DOB = ownersObj.DOB;
                obj.Gender = ownersObj.Gender;
                obj.CreatedBy = UA.userName;
                

                if (ownersObj.OwnerID != null)
                {
                    status = ownersObj.UpdateOwner().ToString();

                }
                else
                {
                   
                    obj.AddNewUser();

                    ownersObj.UserID=obj.UserID;
                    

                    status = ownersObj.InsertOwner().ToString();
                }

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {

            }
            return status;
        }
        #endregion NewOwner

        #region GetOwner
        [System.Web.Services.WebMethod]
        public static string GetOwner(Owners ownersObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            ownersObj.BoutiqueID = UA.BoutiqueID;

            DataTable dt = null;
            dt = ownersObj.GetOwner();
            //Converting to Json
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    childRow = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        childRow.Add(col.ColumnName, row[col]);
                    }
                    parentRow.Add(childRow);
                }

            }


            return jsSerializer.Serialize(parentRow);




            //Converting to Json
        }
        #endregion GetOwner

        #region GetAllOwners
        [System.Web.Services.WebMethod]
        public static string GetAllOwners(Owners OwnerObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];


            DataTable dt = null;

            OwnerObj.BoutiqueID = UA.BoutiqueID;
            dt = OwnerObj.GetAllOwners();
            //Converting to Json
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    childRow = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        childRow.Add(col.ColumnName, row[col]);
                    }
                    parentRow.Add(childRow);
                }             
            }        
            return jsSerializer.Serialize(parentRow);
            //Converting to Json
        }
        #endregion GetAllOwners


        #region Role

        [System.Web.Services.WebMethod]
        public static string Role()
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string B_ID = UA.Role;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            return jsSerializer.Serialize(B_ID);

        }


        #endregion 
    }
}