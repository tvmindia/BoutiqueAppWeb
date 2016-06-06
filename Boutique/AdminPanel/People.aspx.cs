﻿using Boutique.DAL;
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
        protected void Page_Load(object sender, EventArgs e)
        {
           

        }
        #region DeleteOwner
        [System.Web.Services.WebMethod]
        public static string DeleteOwner(Owners ownersObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession]; 
            string status = null;
            try
            {

              status=ownersObj.DeleteOwner().ToString();
              
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
                ownersObj.BoutiqueID = UA.BoutiqueID;

                if (ownersObj.OwnerID != null)
                {
                    status = ownersObj.UpdateOwner().ToString();
                   
                }
                else
                {
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

            DataTable dt= null;
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

        #region GetUser
        [System.Web.Services.WebMethod]
        public static string GetUser(Users userobj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession]; 

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

        #region GetAllOwners
        [System.Web.Services.WebMethod]
        public static string GetAllOwners(string Boutiqueid)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession]; 


            DataTable dt = null;
            Owners ownersObj = new Owners();
            ownersObj.BoutiqueID = Boutiqueid;
            dt = ownersObj.GetAllOwners();
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

        #region GetAllDesigners
        [System.Web.Services.WebMethod]
        public static string GetAllDesigners(Designers Designerobj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession]; 

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
            string status = null;
            try
            {

                if (designerObj.DesignerID != null)
                {
                    status = designerObj.UpdateDesigner().ToString();

                }
                else
                {
                    status = designerObj.InsertDesigner().ToString();
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
        #endregion InsertDesigner

        #region GetDesigner
        [System.Web.Services.WebMethod]
        public static string GetDesigner(Designers designerobj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession]; 


            DataTable dt = null;
            dt = designerobj.GetDesigner();
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
        #endregion GetDesigner

        #region DeleteDesigner
        [System.Web.Services.WebMethod]
        public static string DeleteDesigner(Designers designerObj)  
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession]; 
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

        //

        #region AddUserAdminRoles

        [System.Web.Services.WebMethod]
        public static string AddAdmin(Users AdminObj)
        {

            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            AdminObj.BoutiqueID = UA.BoutiqueID;
            AdminObj.CreatedBy = UA.userName;
            AdminObj.RoleName = Const.Administrator;
            AdminObj.CreatedDate = DateTime.Now;



            string status = null;
            if (AdminObj.UserID == null)
            {


                status = AdminObj.AddNewUser().ToString();
                status = AdminObj.AddNewAdmin().ToString();
                status = AdminObj.AddNewRole().ToString();
            }
            else
            {
                status = AdminObj.EditUser(AdminObj.UserID).ToString();
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



            string status = null;
            if (ManagerObj.UserID == null)
            {
                status = ManagerObj.AddNewUser().ToString();
                status = ManagerObj.AddNewAdmin().ToString();
                status = ManagerObj.AddNewRole().ToString();
            }
            else
            {
                status = ManagerObj.EditUser(ManagerObj.UserID).ToString();
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