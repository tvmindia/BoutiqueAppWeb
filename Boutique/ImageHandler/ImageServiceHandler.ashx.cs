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
                if ((context.Request.QueryString["BoutiqueID"] != null) && (context.Request.QueryString["BoutiqueID"] != ""))
                {
                    DAL.Boutiques BouObj = new DAL.Boutiques();
                    BouObj.BoutiqueID = context.Request.QueryString["BoutiqueID"];
                    byte[] productimg = BouObj.GetBoutiqueImage();
                    if (productimg != null)
                    {
                        MemoryStream memoryStream = new MemoryStream(productimg, false);
                        Image proimg = Image.FromStream(memoryStream);
                        proimg.Save(context.Response.OutputStream, ImageFormat.Jpeg);
                    }

                }

                if ((context.Request.QueryString["BoutiqueLogoID"] != null) && (context.Request.QueryString["BoutiqueLogoID"] != ""))
                {
                    DAL.Boutiques BouObj = new DAL.Boutiques();
                    BouObj.BoutiqueID = context.Request.QueryString["BoutiqueLogoID"];
                    byte[] productimg = BouObj.GetBoutiqueLogo();
                    if (productimg != null)
                    {
                        MemoryStream memoryStream = new MemoryStream(productimg, false);
                        Image proimg = Image.FromStream(memoryStream);
                        proimg.Save(context.Response.OutputStream, ImageFormat.Jpeg);
                    }

                }

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

                if ((context.Request.QueryString["DesignerID"] != null) && (context.Request.QueryString["DesignerID"] != ""))
                {
                    Designers designObj = new Designers();
                    designObj.DesignerID = context.Request.QueryString["DesignerID"];
                   // designObj.BoutiqueID = context.Request.QueryString["DesinerBoutiqueID"];
                    byte[] productimg = designObj.GetDesignerImage();
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