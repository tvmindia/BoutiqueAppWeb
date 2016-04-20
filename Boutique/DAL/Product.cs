using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Boutique.DAL
{
    public class Product
    {
        #region properties
        public Guid ProductID
        {
            get;
            set;
        }
        public Guid BoutiqueID
        {
            get;
            set;
        }
        public string Name
        {
            get;
            set;
        }
        public string Description
        {
            get;
            set;
        }
        public long Price
        {
            get;
            set;
        }
        public Boolean IsOutOfStock
        {
            get;
            set;
        }
        public Boolean IsActive
        {
            get;
            set;
        }
        public string Categories
        {
            get;
            set;
        }
        public Guid DesignerID
        {
            get;
            set;
        }
        public string CreatedBy
        {
            get;
            set;
        }
        public DateTime CreatedDate
        {
            get;
            set;
        }
        public string UpdatedBy
        {
            get;
            set;
        }
        public DateTime UpdatedDate
        {
            get;
            set;
        }
        #endregion properties

        #region Methods
       
        #endregion Methods
    }
}