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
                Boutiques BouObj = new Boutiques();
                DataSet ds;
                DAL.Security.UserAuthendication UA;
                UIClasses.Const Const = new UIClasses.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                string BoutiqID = Request.QueryString["Session"].ToString();
                BouObj.BoutiqueID = BoutiqID;
                ds = BouObj.GetBoutique();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    DataRow dr = ds.Tables[0].Rows[0];
                    string BoutiqueName = dr["Name"].ToString();
                    string CurrencyCode = dr["CurrencyCode"].ToString();
                    string FormatCode = dr["FormatCode"].ToString();
                    string symbol = dr["Symbol"].ToString();
                    string BranchID = dr["BranchID"].ToString();
                    DAL.Security.UserAuthendication UA_Changed = new DAL.Security.UserAuthendication(UA.userName, BoutiqID,BranchID, BoutiqueName, UA.Role, CurrencyCode, FormatCode, symbol, dr["AppVersion"].ToString());
                    if (UA_Changed.ValidUser)
                    {
                        Session[Const.LoginSession] = UA_Changed;
                    }
                    Response.Redirect("../AdminPanel/SaDashBoard.aspx");
                }
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
            string Boutique_ID = null;
            DataSet dsBoutique = new DataSet();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
           // boutiqueobj.BoutiqueID = UA.BoutiqueID;

            if (UA != null)
            {

                if (boutiqueobj.BoutiqueID == null) //new boutique
                {
                    DAL.Loyalty loyalObj = new DAL.Loyalty();
                    boutiqueobj.CreatedBy = UA.userName;
                    Boutique_ID = boutiqueobj.NewBoutique();//creating new boutique and receiving Boutique ID

                    if (Boutique_ID != "")
                    {

                        loyalObj.BoutiqueID = Boutique_ID;
                        loyalObj.UpdatedBy = UA.userName;
                        status = loyalObj.InitializeLoyaltySettings().ToString(); // intial values are setting w.r.t. the new Boutiqe ID
                    }

                    if (status == "1")
                    {
                        //--------- * Adding Deafult Branch To Boutique * ----------//
                        boutiqueobj.BoutiqueID = Boutique_ID;
                        dsBoutique=boutiqueobj.GetBoutique();
                        if(dsBoutique.Tables[0].Rows.Count>0)
                        {
                            DataRow dr = dsBoutique.Tables[0].Rows[0];
                            boutiqueobj.branchName = dr["Name"].ToString();
                            boutiqueobj.branchCode = "1001";
                            boutiqueobj.branchLocation = dr["Location"].ToString();
                            boutiqueobj.branchAddress = dr["Address"].ToString();
                            boutiqueobj.branchPhone = dr["Phone"].ToString();
                           // boutiqueobj.branchEmail = dr["Phone"].ToString();
                            boutiqueobj.branchCoordinate = dr["latlong"].ToString();
                            boutiqueobj.branchIsActive ="True";
                            boutiqueobj.AddBranch();
                        }
                        
                        // adding category
                        Product Catobj = new Product();

                        Catobj.BoutiqueID = Boutique_ID;
                        Catobj.CategoryCode = "NEW";
                        Catobj.CategoryName = "New Arrivals";
                        Catobj.CreatedBy = UA.userName;

                        status = Catobj.InsertCategory().ToString();

                        Catobj.CategoryCode = "OFR";
                        Catobj.CategoryName = "Offers";
                        status = Catobj.InsertCategory().ToString();
                    }


                }
                else //Edit Boutique
                {
                    boutiqueobj.UpdatedBy = UA.userName;
                    status = boutiqueobj.EditBoutique().ToString();
                    if(status=="1")
                    {
                        status = "2";
                    }
                }

            }
            else
            {

                //redirect to loin
            }
            return status;


        }
        #endregion NewBoutique

        #region NewAdmin
        [System.Web.Services.WebMethod]
        public static string NewAdmin(Users userObj)
         {
             string status = null;
            try
            {
                DAL.Security.UserAuthendication UA;
                UIClasses.Const Const = new UIClasses.Const();

                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                // userObj.BoutiqueID = UA.BoutiqueID;

                
                if (userObj.UserID == null)
                {
                    userObj.IsAdmin = true;
                    status = userObj.AddNewUser().ToString();
                }
                else
                {
                    userObj.BoutiqueID = UA.BoutiqueID;
                    status = userObj.EditUser(userObj.UserID).ToString();
                }
            }
            catch(Exception ex)
            {

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
               status= "2";//Exception of foreign key
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

        //----------------* Branch Methods *-----------------//

        #region SelectBranch
        [System.Web.Services.WebMethod]
        public static string SelectBranch(Boutiques boutiqueObj)
        {
            string jsonResult = null;
            DataSet ds = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            if ((boutiqueObj.BoutiqueID != null) && (boutiqueObj.BoutiqueID != ""))
            {
                ds = boutiqueObj.SelectBranch();

                //Converting to Json

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
            }
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;


            //Converting to Json
        }
        #endregion SelectBranch

        #region NewBranch
        [System.Web.Services.WebMethod]
        public static string NewBranch(Boutiques boutiqueobj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            string status = null;
            //string Boutique_ID = null;

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            // boutiqueobj.BoutiqueID = UA.BoutiqueID;

            if (UA != null)
            {
                if ((boutiqueobj.BoutiqueID != "")&&(boutiqueobj.BoutiqueID!=null))
                {
                    if (boutiqueobj.branchID == null) //new branch
                    {
                        boutiqueobj.CreatedBy = UA.userName;
                        status = boutiqueobj.AddBranch();//creating new boutique and receiving Boutique ID
                    }
                }
                //else //Edit Boutique
                //{
                //    boutiqueobj.UpdatedBy = UA.userName;
                //    status = boutiqueobj.EditBoutique().ToString();
                //}

            }
            
            return status;


        }
#endregion NewBranch

        #region GetAllBranches
        [System.Web.Services.WebMethod]
        public static string GetAllBranches(Boutiques boutiqWebObj)
        {
            string jsonResult = null;
            DataSet ds = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            if ((boutiqWebObj.BoutiqueID != null) && (boutiqWebObj.BoutiqueID!=""))
            {
                ds = boutiqWebObj.GetAllBranches();
            
            //Converting to Json
            
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
        }
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;


            //Converting to Json
        }
        #endregion GetAllBranches

        #region DeleteBranch
        [System.Web.Services.WebMethod]
        public static string DeleteBranch(Boutiques boutiquesObj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];


            string status = null;
            try
            {

                status = boutiquesObj.DeleteBranch().ToString();
            }
            catch (Exception)
            {
                status = "2";//Exception of foreign key
            }
            finally
            {

            }
            return status;
        }
        #endregion DeleteBranch

        #region EditBranch
        [System.Web.Services.WebMethod]
        public static string EditBranch(Boutiques boutiqueobj)
        {
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            string status = null;
            //string Boutique_ID = null;

            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            // boutiqueobj.BoutiqueID = UA.BoutiqueID;

            if (UA != null)
            {

                if (boutiqueobj.branchID != null) //new branch
                {
                    boutiqueobj.UpdatedBy = UA.userName;
                    status = boutiqueobj.EditBranch();//creating new boutique and receiving Boutique ID
                }
                //else //Edit Boutique
                //{
                //    boutiqueobj.UpdatedBy = UA.userName;
                //    status = boutiqueobj.EditBoutique().ToString();
                //}

            }

            return status;


        }
        #endregion EditBranch

        #region GetAllBranchIDandName
        [System.Web.Services.WebMethod]
        public static string GetAllBranchIDandName(Boutiques boutiquesObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DataSet ds = null;
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            if ((boutiquesObj.BoutiqueID != "") && (boutiquesObj.BoutiqueID != null))
            {
                ds = boutiquesObj.GetAllBranchIDAndName();
            
            
            //Converting to Json
            
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
            return jsSerializer.Serialize(parentRow);


        }
        #endregion GetAllBranchIDandName

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