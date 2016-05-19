using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Boutique.DAL
{
    public class Loyalty
    {
        #region Properties
        public string LoyaltyCardNo
        {
            get;
            set;
        }
        public string BoutiqueID
        {
            get;
            set;
        }
        public int Points
        {
            get;
            set;
        }
        public string ValidityDate
        {
            get;
            set;
        }
        public string CreatedBy
        {
            get;
            set;
        }
        public string CreatedDate
        {
            get;
            set;
        }
        public string UpdatedBy
        {
            get;
            set;
        }
        public string UpdatedDate
        {
            get;
            set;
        }
        #endregion
    }
}