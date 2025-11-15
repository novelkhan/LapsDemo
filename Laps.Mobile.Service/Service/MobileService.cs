using Azolution.Entities.Sale;
using Laps.Mobile.DataService;
using Laps.Mobile.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utilities;

namespace Laps.Mobile.Service.Service
{
    public class MobileService : IMobileRepository
    {
        private MobileDataService mobileDataService = new MobileDataService();
        public List<MobileColor> PopulateColorCombo()
        {
            var data = mobileDataService.PopulateColorCombo();
            return data;
        }
        public List<MobileBrand>PopulateBrandCombo()
        {
            var datas = mobileDataService.PopulateBrandCombo();
            return datas;
        }

        public string SaveMobileInfo(MobileInfo mobile)
        {
            return mobileDataService.SaveMobileInfo(mobile);
        }

        //public string UpdateMobileInfo(MobileInfo mobile)
        //{
        //    return mobileDataService.UpdateMobileInfo(mobile);
        //}

        public GridEntity<MobileInfo> MobileInfoGrid(GridOptions options)
        {
            return mobileDataService.MobileInfoGrid(options);
        }
    }
}
