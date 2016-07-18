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
    /// All those forms which include file upload controls make use of this handler to upload form data
    /// </summary>
 public class PhotoUploadHandler : IHttpHandler
 {

     public void ProcessRequest(HttpContext context)
     {
         Designers designerObj = new Designers();
         Boutiques boutiqueObj = new Boutiques();
         Thread.Sleep(200);
         context.Response.ContentType = "text/plain";
         try
         {

             byte[] logo = null;
             byte[] image = null;
             byte[] myData = null;
             string fileExtension = "";
             if (context.Request.Files.Count > 0)
             {
                
                 foreach (string s in context.Request.Files)
                 {
                     HttpPostedFile file = context.Request.Files[s];
                     switch(s)
                     {
                         case "designerimage":
                              myData = new byte[file.ContentLength];
                              file.InputStream.Read(myData, 0, file.ContentLength);
                             break;

                         case "logofiles":
                              logo = new byte[file.ContentLength];
                              file.InputStream.Read(logo, 0, file.ContentLength);
                             break;

                         case "imagefiles":
                             image = new byte[file.ContentLength];
                             file.InputStream.Read(image, 0, file.ContentLength);
                             break;
                         case "BannerFile":
                              image = new byte[file.ContentLength];
                              file.InputStream.Read(image, 0, file.ContentLength);
                              fileExtension = Path.GetExtension(file.FileName);
                              break;
                     }
                   }//end of loop
        
                     string result = "";
             
                     switch (context.Request.Form.GetValues("ActionTyp")[0])
                     {
                         case "DesignerUpdate":
                                 designerObj.Mobile = context.Request.Form.GetValues("mobile")[0];
                                 designerObj.Profile = context.Request.Form.GetValues("profile")[0];
                                 designerObj.Name = context.Request.Form.GetValues("Name")[0];
                                 designerObj.DesignerID = context.Request.Form.GetValues("DesignerId")[0];
                                 designerObj.BoutiqueID = context.Request.Form.GetValues("BoutiqueId")[0];
                                 designerObj.ImageFile = myData;
                                 designerObj.UpdatedBy = context.Request.Form.GetValues("updatedBy")[0];
                                 result = designerObj.UpdateDesigner().ToString();
                                 context.Response.Write(result);
                              break;

                         case "DesignerInsert":
                             designerObj.Mobile = context.Request.Form.GetValues("mobile")[0];
                             designerObj.Profile = context.Request.Form.GetValues("profile")[0];
                             designerObj.Name = context.Request.Form.GetValues("Name")[0];
                             designerObj.BoutiqueID = context.Request.Form.GetValues("BoutiqueId")[0];
                             designerObj.ImageFile = myData;
                             designerObj.CreatedBy = context.Request.Form.GetValues("createdby")[0];
                             result = designerObj.InsertDesigner().ToString();
                             context.Response.Write(result);
                             break;
                         case "BoutiqueUpdate":

                                 boutiqueObj.boutiqueLogo = logo;
                                 boutiqueObj.boutiqueImage = image;
                                 boutiqueObj.BoutiqueID = context.Request.Form.GetValues("BoutiqueId")[0];
                                 boutiqueObj.AppVersion = context.Request.Form.GetValues("AppVersion")[0];
                                 boutiqueObj.Name = context.Request.Form.GetValues("Name")[0];
                                 boutiqueObj.StartedYear = context.Request.Form.GetValues("StartYear")[0];
                                 boutiqueObj.AboutUs = context.Request.Form.GetValues("AboutUs")[0];
                                 boutiqueObj.Caption = context.Request.Form.GetValues("Caption")[0];
                                 boutiqueObj.Location = context.Request.Form.GetValues("Location")[0];
                                 boutiqueObj.Address = context.Request.Form.GetValues("Address")[0];
                                 boutiqueObj.Phone = context.Request.Form.GetValues("Phone")[0];
                                 boutiqueObj.Timing = context.Request.Form.GetValues("Timing")[0];
                                 boutiqueObj.WorkingDays = context.Request.Form.GetValues("WorkingDays")[0];
                                 boutiqueObj.FbLink = context.Request.Form.GetValues("FbLink")[0];
                                 boutiqueObj.InstagramLink = context.Request.Form.GetValues("InstagramLink")[0];
                                 boutiqueObj.Longitude = context.Request.Form.GetValues("Longitude")[0];
                                 boutiqueObj.Latitude = context.Request.Form.GetValues("Latitude")[0];
                                 boutiqueObj.UpdatedBy = context.Request.Form.GetValues("updatedBy")[0];
                                 result = boutiqueObj.EditBoutique().ToString();
                                 context.Response.Write(result);
                           
                             break;

                         case "BannerInsert":
                             
                       
                            if (fileExtension.ToLower() == ".jpg" || fileExtension.ToLower() == ".png" || fileExtension.ToLower() == ".gif" || fileExtension.ToLower() == ".jpeg")
	                        {
                            boutiqueObj.ImageFile = image;
                            boutiqueObj.FileType = fileExtension;
                            boutiqueObj.BoutiqueID = context.Request.Form.GetValues("BtqID")[0];
                            boutiqueObj.CreatedBy = context.Request.Form.GetValues("CreatedBy")[0];
                            boutiqueObj.ProductID = context.Request.Form.GetValues("ProductID")[0];
                            boutiqueObj.CategoryCode = context.Request.Form.GetValues("CategoryCode")[0];
                            result = boutiqueObj.InsertBannerImage().ToString();
                            context.Response.Write(result);
                            }
                            else
                            {
                                result = "-1"; //File format error
                                context.Response.Write(result);
                            }
                         break;

                     }//end of switch




             
             } //end of if count
        
         }//try
         catch (Exception)
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