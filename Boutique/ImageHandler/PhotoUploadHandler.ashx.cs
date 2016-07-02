using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using Boutique.DAL;

namespace Boutique.ImageHandler
{
    /// <summary>
    /// Summary description for PhotoUploadHandler
    /// </summary>
    public class PhotoUploadHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
          Designers designerObj = new Designers();
          Boutiques boutiqueObj = new Boutiques();
          Thread.Sleep(1000);
            context.Response.ContentType = "text/plain";
            try
            {
               
               // Product prodobj = new Product();
              //  string dirFullPath = HttpContext.Current.Server.MapPath("~/MediaUploader/");
              //  string[] files;
              //  int numFiles;
               // files = System.IO.Directory.GetFiles(dirFullPath);
               // numFiles = files.Length;
                //numFiles = numFiles + 1;
                string str_image = "";
                byte[] logo=null;
                byte[] image = null;
                string result="";
                string id = "";
                foreach (string s in context.Request.Files)
                {
                    HttpPostedFile file = context.Request.Files[s];
                    string fileName = file.FileName;
                    string fileExtension = file.ContentType;
                    string[] words = fileName.Split(',');

                    if (words != null)
                    {
                        //prodobj.ProductID = words[0];
                        fileName = words[0];
                    }
                    if (!string.IsNullOrEmpty(fileName))
                    {
                        fileExtension = Path.GetExtension(fileName);

                        str_image = "MyPHOTO_" + fileExtension;
                      //  string pathToSave_100 = HttpContext.Current.Server.MapPath("~/MediaUploader/") + str_image;
                      //  file.SaveAs(pathToSave_100);

                        //  Product prodobj;
                      //  prodobj.ImageFile = new byte[file.ContentLength];
                        if (context.Request.Form.GetValues("DesignerId") != null)
                        {
                            byte[] myData = new byte[file.ContentLength];
                            file.InputStream.Read(myData, 0, file.ContentLength);
                            string[] desId = context.Request.Form.GetValues("DesignerId");
                            string[] boutId = context.Request.Form.GetValues("BoutiqueId");
                            string[] name = context.Request.Form.GetValues("Name");
                            string[] profile = context.Request.Form.GetValues("profile");
                            string[] mobile = context.Request.Form.GetValues("mobile");
                            string[] updatedBy = context.Request.Form.GetValues("updatedBy");
                            designerObj.Mobile = mobile[0];
                            designerObj.Profile = profile[0];
                            designerObj.Name = name[0];
                            designerObj.DesignerID = desId[0];
                            designerObj.BoutiqueID = boutId[0];
                            designerObj.ImageFile = myData;
                            designerObj.UpdatedBy = updatedBy[0];
                            // designerObj.DesignerID=
                            designerObj.UpdateDesigner();
                        }

                        if (context.Request.Form.GetValues("BoutiqueId") != null)
                        {
                            id = context.Request.Form.GetValues("BoutiqueId").ToString();
                            if (context.Request.Files[s] == context.Request.Files["logofiles"])
                            {
                                logo = new byte[file.ContentLength];
                                file.InputStream.Read(logo, 0, file.ContentLength);
                            }
                            if (context.Request.Files[s] == context.Request.Files["imagefiles"])
                            {
                                image = new byte[file.ContentLength];
                                file.InputStream.Read(image, 0, file.ContentLength);
                            }
                            boutiqueObj.boutiqueLogo = logo;
                            boutiqueObj.boutiqueImage = image;
                            string[] boutiqueID = context.Request.Form.GetValues("BoutiqueId");
                            string[] appVersion = context.Request.Form.GetValues("AppVersion");
                            string[] name = context.Request.Form.GetValues("Name");
                            string[] startedYear = context.Request.Form.GetValues("StartYear");
                            string[] aboutUs = context.Request.Form.GetValues("AboutUs");
                            string[] caption = context.Request.Form.GetValues("Caption");
                            string[] location = context.Request.Form.GetValues("Location");
                            string[] address = context.Request.Form.GetValues("Address");
                            string[] phone = context.Request.Form.GetValues("Phone");
                            string[] timing = context.Request.Form.GetValues("Timing");
                            string[] workingDays = context.Request.Form.GetValues("WorkingDays");
                            string[] fbLink = context.Request.Form.GetValues("FbLink");
                            string[] instagramLink = context.Request.Form.GetValues("InstagramLink");
                            string[] longitude = context.Request.Form.GetValues("Longitude");
                            string[] latitude=context.Request.Form.GetValues("Latitude");
                            boutiqueObj.BoutiqueID = boutiqueID[0];
                            boutiqueObj.AppVersion = appVersion[0];
                            boutiqueObj.Name = name[0];
                            boutiqueObj.StartedYear = startedYear[0];
                            boutiqueObj.AboutUs = aboutUs[0];
                            boutiqueObj.Caption = caption[0];
                            boutiqueObj.Location = location[0];
                            boutiqueObj.Address = address[0];
                            boutiqueObj.Phone = phone[0];
                            boutiqueObj.Timing = timing[0];
                            boutiqueObj.WorkingDays = workingDays[0];
                            boutiqueObj.FbLink = fbLink[0];
                            boutiqueObj.InstagramLink = instagramLink[0];
                            boutiqueObj.Longitude = longitude[0];
                            boutiqueObj.Latitude = latitude[0];
                        }
                      //  file.InputStream.Read(prodobj.ImageFile, 0, file.ContentLength);
                        // prodobj.ProductID=Product.ProductID

                      //  prodobj.IsMain = true;
                       // prodobj.InsertProductImage();


                        if (  context.Request.Form.GetValues("BannerImgID") == null || context.Request.Form.GetValues("BannerImgID")[0] == string.Empty)
                        {
                            if (fileExtension.ToLower() == ".jpg" || fileExtension.ToLower() == ".png" || fileExtension.ToLower() == ".gif" || fileExtension.ToLower() == ".jpeg")
	                            {
                                
                            if (context.Request.Files[s] == context.Request.Files["imagefiles"])
                            {
                                image = new byte[file.ContentLength];
                                file.InputStream.Read(image, 0, file.ContentLength);
                            }

                            boutiqueObj.ImageFile = image;
                            boutiqueObj.FileType = fileExtension;


                            string[] boutiqueID = context.Request.Form.GetValues("BtqID");
                            string[] CreatedBy = context.Request.Form.GetValues("CreatedBy");
                            string[] ProductID = context.Request.Form.GetValues("ProductID");
                            string[] CategoryCode = context.Request.Form.GetValues("CategoryCode");

                            if (boutiqueID != null)
                            {
                                boutiqueObj.BoutiqueID = boutiqueID[0];
                            }
                            if (CreatedBy != null)
                            {
                                boutiqueObj.CreatedBy = CreatedBy[0];
                            }

                            if (ProductID != null)
                            {
                                boutiqueObj.ProductID = ProductID[0];    
                            }
                            //var v = context.Request.Form.GetValues("BannerImgID");

                            if (CategoryCode != null)
                            {
                            boutiqueObj.CategoryCode = CategoryCode[0];    
                            }
                            
                            result = boutiqueObj.InsertBannerImage().ToString();
                       
                        }
                            else
                            {
                                result = "-1"; //File format error
                            }
                    }
                        
                    }
                }
                if (context.Request.Form.GetValues("BoutiqueId") != null)
                {
                    string[] boutiqueID = context.Request.Form.GetValues("BoutiqueId");
                    string[] appVersion = context.Request.Form.GetValues("AppVersion");
                    string[] name = context.Request.Form.GetValues("Name");
                    string[] startedYear = context.Request.Form.GetValues("StartYear");
                    string[] aboutUs = context.Request.Form.GetValues("AboutUs");
                    string[] caption = context.Request.Form.GetValues("Caption");
                    string[] location = context.Request.Form.GetValues("Location");
                    string[] address = context.Request.Form.GetValues("Address");
                    string[] phone = context.Request.Form.GetValues("Phone");
                    string[] timing = context.Request.Form.GetValues("Timing");
                    string[] workingDays = context.Request.Form.GetValues("WorkingDays");
                    string[] fbLink = context.Request.Form.GetValues("FbLink");
                    string[] instagramLink = context.Request.Form.GetValues("InstagramLink");
                    string[] longitude = context.Request.Form.GetValues("Longitude");
                    string[] latitude = context.Request.Form.GetValues("Latitude");
                    boutiqueObj.BoutiqueID = boutiqueID[0];
                    boutiqueObj.AppVersion = appVersion[0];
                    boutiqueObj.Name = name[0];
                    boutiqueObj.StartedYear = startedYear[0];
                    boutiqueObj.AboutUs = aboutUs[0];
                    boutiqueObj.Caption = caption[0];
                    boutiqueObj.Location = location[0];
                    boutiqueObj.Address = address[0];
                    boutiqueObj.Phone = phone[0];
                    boutiqueObj.Timing = timing[0];
                    boutiqueObj.WorkingDays = workingDays[0];
                    boutiqueObj.FbLink = fbLink[0];
                    boutiqueObj.InstagramLink = instagramLink[0];
                    boutiqueObj.Longitude = longitude[0];
                    boutiqueObj.Latitude = latitude[0];
                  result= boutiqueObj.EditBoutique().ToString();
                }

                //  database record update logic here  ()
                context.Response.Write(result);
                //context.Response.Write(str_image);
            }
            catch (Exception ac)
            {

            }
            finally
            {

            }
           
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}