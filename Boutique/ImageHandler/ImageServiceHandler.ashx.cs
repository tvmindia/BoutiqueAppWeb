using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Boutique.DAL;

namespace Boutique.ImageHandler
{
    /// <summary>
    /// Summary description for ImageServiceHandler
    /// </summary>
    public class ImageServiceHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
           
            //context.Response.Write("Hello World");
            //context.Response.ContentType = "image/png";
            //context.Response.Expires = -1;
            context.Response.ContentType = "text/plain";
            try
            {
                string dirFullPath = HttpContext.Current.Server.MapPath("~/MediaUploader/");
                string[] files;
                int numFiles;
                files = System.IO.Directory.GetFiles(dirFullPath);
                numFiles = files.Length;
                numFiles = numFiles + 1;
                string str_image = "";

                foreach (string s in context.Request.Files)
                {
                    HttpPostedFile file = context.Request.Files[s];
                    string fileName = file.FileName;
                    string fileExtension = file.ContentType;

                    if (!string.IsNullOrEmpty(fileName))
                    {
                        //fileExtension = Path.GetExtension(fileName);
                        //str_image = "MyPHOTO_" + numFiles.ToString() + fileExtension;
                        //string pathToSave_100 = HttpContext.Current.Server.MapPath("~/MediaUploader/") + str_image;
                        //file.SaveAs(pathToSave_100);
                         Product prodobj = new Product();
                         //Product prodobj;
                         prodobj.ImageFile = new byte[file.ContentLength];
                         byte[] myData = new byte[file.ContentLength];
                         file.InputStream.Read(myData, 0, file.ContentLength);

                         file.InputStream.Read(prodobj.ImageFile, 0, file.ContentLength);
                         prodobj.ProductID="0d313265-e102-442b-9bc5-f8c69015f6d4";
                         prodobj.IsMain = true;
                         prodobj.ProductImageMethods();



                     


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