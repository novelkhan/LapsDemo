using Azolution.Entities.Sale;
using Laps.Mobile.Service.Interface;
using Laps.Mobile.Service.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Utilities;

namespace LAPS.Controllers
{
    public class MobileController : Controller
    {
        //
        // GET: /Mobile/
        private IMobileRepository mobileRepo = new MobileService();
        public ActionResult Index()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("~/Views/Sale/Mobile/MobileSettings.cshtml");
            }
            return RedirectToAction("Logoff", "Home");          
        }

        public ActionResult PopulateColorCombo()
        {
            try
            {
                var data = mobileRepo.PopulateColorCombo();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public ActionResult PopulateBrandCombo()
        {
            try
            {
                var datas = mobileRepo.PopulateBrandCombo();
                return Json(datas, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                
                throw;
            }
        }
        public ActionResult SaveMobileInfo(MobileInfo mobile)
        {
            //var status = mobileRepo.SaveMobileInfo(mobile);
            //return JSON.stringify(status);

            return Json(mobileRepo.SaveMobileInfo(mobile), JsonRequestBehavior.AllowGet);
        }
        public ActionResult MobileInfoGrid(GridOptions options)
        {
            return Json(mobileRepo.MobileInfoGrid(options), JsonRequestBehavior.AllowGet);
        }
       
	}
}