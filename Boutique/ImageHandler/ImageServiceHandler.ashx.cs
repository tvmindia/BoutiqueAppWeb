using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Boutique.DAL;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;


namespace Boutique.ImageHandler
{
    /// <summary>
    /// Summary description for ImageServiceHandler
    /// </summary>
    public class ImageServiceHandler : IHttpHandler
    {

          public void ProcessRequest(HttpContext context)
          {
            try
            {
                context.Response.ContentType = "image/jpeg";

                if ((context.Request.QueryString["ImageID"] != null)&&(context.Request.QueryString["ImageID"] != ""))
                {
                    Product productObj = new Product();
                    productObj.ImageID = context.Request.QueryString["ImageID"];
                    byte[] productimg=productObj.GetProductImage();
                    if (productimg != null)
                    {
                        MemoryStream memoryStream = new MemoryStream(productimg, false);
                        Image proimg = Image.FromStream(memoryStream);
                        proimg.Save(context.Response.OutputStream, ImageFormat.Jpeg);
                    }

                }
            }
            catch(Exception ex)
            {
                throw ex;  
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