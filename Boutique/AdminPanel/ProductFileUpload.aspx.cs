using Boutique.DAL;
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
            if (productfileUpload.HasFile)
            {
                try
                {
                    Product prodobj = new Product(); 
                    string filename = Path.GetFileName(productfileUpload.FileName);

                    prodobj.ProductID = "8c9b8e83-dc8f-48d7-994b-8688516a8771";
                  
                    if (!string.IsNullOrEmpty(filename))
                    {

                        prodobj.ImageFile = new byte[productfileUpload.FileContent.Length];

                        myStream = productfileUpload.FileContent;

                        myStream.Read(prodobj.ImageFile, 0, (int)productfileUpload.FileContent.Length);

                        prodobj.IsMain = true;
                        prodobj.InsertProductImage();


                   
                        lblFile.Text = "Upload status: File uploaded!";
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