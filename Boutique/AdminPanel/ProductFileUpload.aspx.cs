﻿using Boutique.DAL;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Boutique.AdminPanel
{
    public partial class ProductFileUpload : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void UploadButton_Click(object sender, EventArgs e)
        {
            System.IO.Stream myStream;
            if (fileupload.HasFile)
            {
                try
                {
                    Product prodobj = new Product();
                    string filename = Path.GetFileName(fileupload.FileName);
                  

                   
                  if((hdfchildproductID.Value.ToString().Trim()!="")&&(hdfchildBoutiqueID.Value.ToString().Trim()!=""))
                  {
                     prodobj.ProductID = hdfchildproductID.Value.ToString().Trim();
                     prodobj.BoutiqueID = hdfchildBoutiqueID.Value.ToString().Trim();
                     if (!string.IsNullOrEmpty(filename))
                     {
                        prodobj.FileType = Path.GetExtension(filename);
                        prodobj.ImageFile = new byte[fileupload.FileContent.Length];

                        myStream = fileupload.FileContent;

                        myStream.Read(prodobj.ImageFile, 0, (int)fileupload.FileContent.Length);

                        prodobj.IsMain = true;
                        prodobj.InsertProductImage();


                   
                        lblFile.Text = "Upload status: File uploaded!";
                        ScriptManager.RegisterStartupScript(this, this.GetType(), "LoadAllImagesBind", "parent.BindAllImages();", true);



                    }
                       }
                    else
                  {
                      lblFile.Text = "Upload status: Not uploaded!";
                  }
                }
                catch (Exception ex)
                {
                    lblFile.Text = "Upload status: The file could not be uploaded. The following error occured: " + ex.Message;
                }
            }
        }

    }
}