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
    public partial class PhotoUploader : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void UploadButton_Click(object sender, EventArgs e)
        {
            System.IO.Stream myStream;
            DAL.Security.UserAuthendication UA;
            UIClasses.Const Const = new UIClasses.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            if (fileupload.HasFile)
            {
                try
                {
                    Designers desingerObj = new Designers();
                    string filename = Path.GetFileName(fileupload.FileName);
                        if (!string.IsNullOrEmpty(filename))
                        {
                           
                            desingerObj.ImageFile = new byte[fileupload.FileContent.Length];
                            myStream = fileupload.FileContent;
                            myStream.Read(desingerObj.ImageFile, 0, (int)fileupload.FileContent.Length);

                            desingerObj.InsertDesigner();
                            lblFile.Text = "Upload status: File uploaded!";
                           
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