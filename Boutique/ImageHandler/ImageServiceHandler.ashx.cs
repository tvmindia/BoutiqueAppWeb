using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Boutique.DAL;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.Text.RegularExpressions;
using System.Web.UI.HtmlControls;


namespace Boutique.ImageHandler
{
    /// <summary>
    /// Summary description for ImageServiceHandler
    /// </summary>
    public class ImageServiceHandler : IHttpHandler
    {
        DataSet ds = null;
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
                        memoryStream.Position = 0;
                        Image proimg = Image.FromStream(memoryStream);
                        proimg.Save(context.Response.OutputStream, ImageFormat.Jpeg);
                    }
                    else
                    {
                        context.Response.ContentType = "image/png";
                        context.Response.WriteFile("~/img/Default/DefaultBoutique.jpg");
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
                        memoryStream.Position = 0;
                        Image proimg = Image.FromStream(memoryStream);
                        proimg.Save(context.Response.OutputStream, ImageFormat.Jpeg);
                    }
                    else
                    {
                        context.Response.ContentType = "image/png";
                        context.Response.WriteFile("~/img/Default/nologo1.png");
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
                        memoryStream.Position = 0;
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
                        memoryStream.Position = 0;
                        Image proimg = Image.FromStream(memoryStream);
                        proimg.Save(context.Response.OutputStream, ImageFormat.Jpeg);
                    }
                    else
                    {
                        context.Response.ContentType = "image/png";
                        context.Response.WriteFile("~/img/Default/defaultuser.jpg");
                    }

                }
                if ((context.Request.QueryString["bannerImgID"] != null) && (context.Request.QueryString["bannerImgID"] != ""))
                {
                    Boutiques boutiqueObj = new Boutiques();
                    boutiqueObj.ImageID = context.Request.QueryString["bannerImgID"];
                    byte[] productimg = boutiqueObj.GetBannerImageByImageID();
                    if (productimg != null)
                    {
                        MemoryStream memoryStream = new MemoryStream(productimg, false);
                        memoryStream.Position = 0;
                        Image proimg = Image.FromStream(memoryStream);
                        proimg.Save(context.Response.OutputStream, ImageFormat.Jpeg);
                    }

                }
                if ((context.Request.QueryString["templateID"] != null) && (context.Request.QueryString["templateID"] != ""))
                {
                    NewsLetters newsObj = new NewsLetters();
                    newsObj.TemplateID = Guid.Parse(context.Request.QueryString["templateID"]).ToString();
                    ds = newsObj.GetAllTemplateDetails();
                    string template =ds.Tables[0].Rows[0]["TemplateFile"].ToString();
                    int imageCount = Convert.ToInt32(ds.Tables[0].Rows[0]["ImageCount"]);
                    imageCount=imageCount-1;
                    string body = string.Empty;
                    Regex rx = new Regex("(?<=<img[^>]*src=\")[^\"]+", RegexOptions.IgnoreCase);
           
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/" + template)))
            {
                body = reader.ReadToEnd();
            }
           
            body = body.Replace("{UserName}", " ");
            body = body.Replace("{Title}", "Title");
            body = body.Replace("{Description}", "Description");
            body = body.Replace("{imgLogo}", "../img/Default/nologo1.png");
            if (template == "BoutiqueTemplates/BirthdayTemplate.html")
            {
                
                if (body.Contains("{ImgBirthday}"))
                {
                    body = body.Replace("{ImgBirthday}", "../img/Templates/BirthdayImage.jpg");
                }
                for (int i = 0; i <= imageCount; i++)
                {
                body = body.Replace("{image" + i + "}", "../img/Default/adimage.png");
                }
            }
                    else
            {
                for (int i = 0; i <= imageCount; i++)
                {
                    body = rx.Replace(body, m => "../img/Default/adimage.png");
                }
            }
            string header = newsObj.TemplateHeader();
            string footer = newsObj.TemplateFooter();
            body = header + body;
            body = body + footer;
                    if (template != null)
                    {
                        context.Response.ContentType = "text/html";
                        context.Response.Write(body);
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