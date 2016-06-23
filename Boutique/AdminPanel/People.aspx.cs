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
    public partial class People : System.Web.UI.Page
    {
        DAL.Security.UserAuthendication UA;
        UIClasses.Const Const = new UIClasses.Const();
        protected void Page_Load(object sender, EventArgs e)
        {
            UA = (DAL.Security.UserAuthendication)Session[Const.LoginSession];
            if (UA == null)
            {
                Response.Redirect(Const.LoginPageURL);

            }
            if (UA.Role == Const.Manager)
            {
                NewAdmin.Visible = false;
                NewDesigner.Visible = false;
                NewManager.Visible = false;
                NewUser.Visible = false;


            }

        }       

        #region GetUser
        [System.Web.Services.WebMethod]
        public static string GetUser(Users userobj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            userobj.BoutiqueID = UA.BoutiqueID;

            DataSet ds = null;
            ds = userobj.SelectUserByUserID();
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
             
            }


            return jsSerializer.Serialize(parentRow);

            


            //Converting to Json
        }
        #endregion GetUser

        #region UserDeletion
        [System.Web.Services.WebMethod]
        public static string DeleteUser(Users userObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            userObj.BoutiqueID = UA.BoutiqueID;

            string status = null;
            try
            {
                status = userObj.DeleteUser().ToString();
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
       #endregion UserDeletion

        //

        #region GetAllDesigners
        [System.Web.Services.WebMethod]
        public static string GetAllDesigners(Designers Designerobj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            Designerobj.BoutiqueID = UA.BoutiqueID;

            DataTable dt = null;

            Designerobj.BoutiqueID = UA.BoutiqueID;
            dt = Designerobj.GetAllDesigners();
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

        #endregion GetAllDesigners

        #region GetAllDesignerIDAndName
        [System.Web.Services.WebMethod]
        public static string GetAllDesignerIDAndName(Designers designersObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            if (UA.BoutiqueID != "")
            {
                designersObj.BoutiqueID = UA.BoutiqueID;
                DataTable dt = null;

                dt = designersObj.GetAllDesignerIDAndName();
                //Converting to Json
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
            //Converting to Json
            return jsSerializer.Serialize("");
        }
        #endregion GetAllDesignerIDAndName

        #region InsertDesigner
        [System.Web.Services.WebMethod]
        public static string InsertDesigner(Designers designerObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            designerObj.BoutiqueID = UA.BoutiqueID;
        
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer(); 
            
            try
            {

                if (designerObj.DesignerID != null)
                {

                    designerObj.UpdatedBy = UA.userName;
                    designerObj.status = designerObj.UpdateDesigner().ToString();

                }
                else
                {
                    designerObj.CreatedBy = UA.userName;
                     designerObj.status = designerObj.InsertDesigner().ToString();
                }

            }
            catch (Exception)
            {
                designerObj.status = "500";//Exception of foreign key
            }
            finally
            {

            }
            return jsSerializer.Serialize(designerObj); 
        }
        #endregion InsertDesigner

        //#region InserDesignerImage
        //[System.Web.Services.WebMethod]
        //public static string InserDesignerImage(HttpContext context)
        //{
        //    string image = null;
        //   // string dirFullPath = HttpContext.Current.Server.MapPath("~/MediaUploader/");
        //    string[] files;
        //    string s ="";
        //    int numFiles;
        //    //files = System.IO.Directory.GetFiles(dirFullPath);
        //    numFiles = 5;
        //    numFiles = numFiles + 1;
        //    string str_image = "";
        //    HttpPostedFile file = HttpContext.Current.Request.Files[s];
        //    string fileName = file.FileName;
        //    string fileExtension = file.ContentType;
        //    string[] words = fileName.Split(',');
        //    return image;
        //}
        //#endregion InserDesignerImage

        #region GetDesigner
        [System.Web.Services.WebMethod]
        public static string GetDesigner(Designers designerobj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            designerobj.BoutiqueID = UA.BoutiqueID;

            DataTable dt = null;
            dt = designerobj.GetDesigner();
            //Converting to Json
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow,designerimageIsnull;
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

            designerimageIsnull = new Dictionary<string, object>();
            designerimageIsnull.Add("IsDesignerImageNull",designerobj.IsDesignerImageNull);
            parentRow.Add(designerimageIsnull);
            return jsSerializer.Serialize(parentRow);
            //Converting to Json
        }
        #endregion GetDesigner

        #region DeleteDesigner
        [System.Web.Services.WebMethod]
        public static string DeleteDesigner(Designers designerObj)  
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            designerObj.BoutiqueID = UA.BoutiqueID;
            string status = null;
            try
            {
                status = designerObj.DeleteDesigner().ToString();
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
        #endregion DeleteDesigner
        
        #region AddUserAdminRoles

        [System.Web.Services.WebMethod]
        public static string AddAdmin(Users AdminObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            if (AdminObj.BoutiqueID==null)
            AdminObj.BoutiqueID = UA.BoutiqueID;
            
            AdminObj.CreatedBy = UA.userName;
            AdminObj.RoleName = Const.Administrator;
            AdminObj.CreatedDate = DateTime.Now;
            AdminObj.IsAdmin = true;


            string status = null;
            if (AdminObj.UserID == null)
            {
                status = AdminObj.AddNewUser().ToString();
                status = AdminObj.AddNewAdmin().ToString();
                status = AdminObj.AddNewRole().ToString();
            }
            else
            {
                AdminObj.UpdatedBy = UA.userName;
                AdminObj.UpdatedDate = DateTime.Now;
                
                status = AdminObj.EditUser(AdminObj.UserID).ToString();
                status = AdminObj.EditAdmin().ToString(); //update Admin table  
               
            }

           


            return status;
        }
        #endregion  AddUserManagerRoles

        #region GetAdministrator
        [System.Web.Services.WebMethod]
        public static string GetAllAdmins(Users Adminsobj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            Adminsobj.BoutiqueID = UA.BoutiqueID;
            Adminsobj.RoleName = Const.Administrator;
            DataTable dt = null;
            dt = Adminsobj.GetAdmins();
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
        #endregion GetAdministrator

        //manager and admins role removes here
        #region DeleteAdminManager
        [System.Web.Services.WebMethod]
        public static string DeleteAdmin(Users AdminObj)  
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            AdminObj.BoutiqueID = UA.BoutiqueID;
            string status = null;
            try
            {
                status = AdminObj.DeleteAdmin().ToString();
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
        #endregion DeleteDesigner       

        #region GetAministratorDetailsbyUserID
        [System.Web.Services.WebMethod]
        public static string GetAdmin(Users Adminobj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            Adminobj.BoutiqueID = UA.BoutiqueID;

            DataSet ds = null;
            ds = Adminobj.SelectAdminByUserID();
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

            }


            return jsSerializer.Serialize(parentRow);




            //Converting to Json
        }
        #endregion GetUser
                
        #region AddUserManagerRoles

        [System.Web.Services.WebMethod]
        public static string AddManager(Users ManagerObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            ManagerObj.BoutiqueID = UA.BoutiqueID;
            ManagerObj.CreatedBy = UA.userName;
            ManagerObj.RoleName = Const.Manager;
            ManagerObj.CreatedDate = DateTime.Now;
            ManagerObj.IsAdmin=true;



            string status = null;
            if (ManagerObj.UserID == null)
            {
                status = ManagerObj.AddNewUser().ToString();
                status = ManagerObj.AddNewAdmin().ToString();
                status = ManagerObj.AddNewRole().ToString();
            }
            else
            {
                ManagerObj.UpdatedBy = UA.userName;
                ManagerObj.UpdatedDate = DateTime.Now;
                status = ManagerObj.EditUser(ManagerObj.UserID).ToString();
                status = ManagerObj.EditAdmin().ToString(); //update Admin table  
            }




            return status;
        }
        #endregion  AddUserManagerObjRoles

        #region GetManagers
        [System.Web.Services.WebMethod]
        public static string GetAllManager(Users Managerobj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            Managerobj.BoutiqueID = UA.BoutiqueID;
            Managerobj.RoleName = Const.Manager;
            DataTable dt = null;
            dt = Managerobj.GetAdmins();
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
        #endregion GetManagers

    }
}