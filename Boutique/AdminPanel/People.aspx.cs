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

        #region Page_Load
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
        #endregion Page_Load

        #region GetUser
        [System.Web.Services.WebMethod]
        public static string GetUser(Users userobj)
        {
            string status = null;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            userobj.BoutiqueID = UA.BoutiqueID;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DataSet ds = null;
            try
            {
                ds = userobj.SelectUserByUserID();
                //Converting to Json
             
               
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
                ETObj.Module = "People";
                ETObj.Method = "GetUser";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
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
            catch (Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "People";
                ETObj.Method = "DeleteUser";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
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
            string status = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            Designerobj.BoutiqueID = UA.BoutiqueID;

            DataTable dt = null;

            Designerobj.BoutiqueID = UA.BoutiqueID;
            try
            {
                dt = Designerobj.GetAllDesigners();
                //Converting to Json
               
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
                ETObj.Module = "People";
                ETObj.Method = "GetAllDesigners";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            return jsSerializer.Serialize(parentRow);
            //Converting to Json
        }

        #endregion GetAllDesigners

        #region GetAllDesignerIDAndName
        [System.Web.Services.WebMethod]
        public static string GetAllDesignerIDAndName(Designers designersObj)
        {
            string status = null;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
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
                ETObj.Module = "People";
                ETObj.Method = "GetAllDesignerIDAndName";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            //Converting to Json
            return jsSerializer.Serialize("");
        }
        #endregion GetAllDesignerIDAndName

        #region InsertDesigner
        [System.Web.Services.WebMethod]
        public static string InsertDesigner(Designers designerObj)
        {
            string status = null;
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
            catch (Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "People";
                ETObj.Method = "InsertDesigner";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
            finally
            {

            }
            return jsSerializer.Serialize(designerObj); 
        }
        #endregion InsertDesigner

        #region GetDesigner
        [System.Web.Services.WebMethod]
        public static string GetDesigner(Designers designerobj)
        {
            string status = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            designerobj.BoutiqueID = UA.BoutiqueID;

            DataTable dt = null;
            try
            {
                dt = designerobj.GetDesigner();
                //Converting to Json
               
                Dictionary<string, object> childRow, designerimageIsnull;
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
                designerimageIsnull.Add("IsDesignerImageNull", designerobj.IsDesignerImageNull);
                parentRow.Add(designerimageIsnull);
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
                ETObj.Module = "People";
                ETObj.Method = "GetDesigner";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
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
            catch (Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "People";
                ETObj.Method = "DeleteDesigner";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
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
            string status = null;
            try
            {
                if (AdminObj.BoutiqueID == null)
                    AdminObj.BoutiqueID = UA.BoutiqueID;

                AdminObj.CreatedBy = UA.userName;
                AdminObj.RoleName = Const.Administrator;
                AdminObj.CreatedDate = DateTime.Now;
                AdminObj.IsAdmin = true;

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
                ETObj.Module = "People";
                ETObj.Method = "AddAdmin";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }
           


            return status;
        }
        #endregion  AddUserManagerRoles

        #region GetAdministrator
        [System.Web.Services.WebMethod]
        public static string GetAllAdmins(Users Adminsobj)
        {
            string status = null;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Adminsobj.BoutiqueID = UA.BoutiqueID;
            Adminsobj.RoleName = Const.Administrator;
            DataTable dt = null;
            try
            {
                dt = Adminsobj.GetAdmins();
                //Converting to Json
               
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
                ETObj.Module = "People";
                ETObj.Method = "GetAllAdmins";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
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
            catch (Exception ex)
            {
                status = "500";//Exception of foreign key

                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.BoutiqueID = UA.BoutiqueID;
                ETObj.UserID = UA.UserID;
                ETObj.Description = ex.Message;//Actual exception message
                ETObj.Date = DateTime.Now.ToString();
                ETObj.Module = "People";
                ETObj.Method = "DeleteAdmin";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
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
            string status = null;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Adminobj.BoutiqueID = UA.BoutiqueID;

            DataSet ds = null;
            try
            {
                ds = Adminobj.SelectAdminByUserID();
                //Converting to Json
               
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
                ETObj.Module = "People";
                ETObj.Method = "GetAdmin";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
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
            try
            {
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
                ETObj.Module = "People";
                ETObj.Method = "AddManager";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
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
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            string status = null;
            Managerobj.BoutiqueID = UA.BoutiqueID;
            Managerobj.RoleName = Const.Manager;
            DataTable dt = null;
            try
            {
                dt = Managerobj.GetAdmins();
                //Converting to Json
                
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
                ETObj.Module = "People";
                ETObj.Method = "GetAllManager";
                ETObj.ErrorSource = "Code-Behind";
                ETObj.IsMobile = false;
                ETObj.Version = UA.Version;
                ETObj.CreatedBy = UA.userName;
                ETObj.InsertErrorDetails();
            }

            return jsSerializer.Serialize(parentRow);
            //Converting to Json
        }
        #endregion GetManagers

    }
}