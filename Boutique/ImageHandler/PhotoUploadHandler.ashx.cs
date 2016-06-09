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
                      //  file.InputStream.Read(prodobj.ImageFile, 0, file.ContentLength);
                        // prodobj.ProductID=Product.ProductID

                      //  prodobj.IsMain = true;
                       // prodobj.InsertProductImage();






                    }
                }
                //  database record update logic here  ()

                context.Response.Write(str_image);
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