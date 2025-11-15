using Azolution.Entities.Sale;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utilities;

namespace Laps.Mobile.Service.Interface
{
    public interface IMobileRepository
    {
        List<MobileColor> PopulateColorCombo();
        List<MobileBrand> PopulateBrandCombo();
        string SaveMobileInfo(MobileInfo mobile);
        GridEntity<MobileInfo> MobileInfoGrid(GridOptions options);

        //string UpdateMobileInfo(MobileInfo mobile);  
    }
}
