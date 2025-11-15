using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Azolution.Entities.Report;
using Azolution.Entities.Sale.Ami;
using Laps.Passengers.Service;
using Laps.Passengers.Service.Interface;
using Utilities;

namespace LAPS.Controllers
{
    public class PassengerController : Controller
    {
        private IPassengerRepository psngrRepo = new PassengerService();
        public ActionResult PassengerInfo()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("~/Views/Passengers/PassengerSettings.cshtml");
            }
            return RedirectToAction("Logoff", "Home");
        }

        public ActionResult PopulateTrainsCombo()
        {
            var data = psngrRepo.PopulateTrainsCombo();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PopulateRoutesCombo()
        {
            var data = psngrRepo.PopulateRoutesCombo();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PopulateClasssCombo()
        {
            var data = psngrRepo.PopulateClasssCombo();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SavePassenger(Passenger psngr)
        {
            return Json(psngrRepo.SavePassenger(psngr), JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeletePassenger(int id)
        {
            var data = psngrRepo.DeletePassenger(id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PassengerGrid(GridOptions options)
        {
            return Json(psngrRepo.PassengerGrid(options), JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetPassengerReport()
        {
            try
            {
                var data = new ReportData<Passenger>();
                data.DataSource = psngrRepo.GetPassengerReport();
                data.RptName = "PassengerReport.rpt";
                Session["Report"] = data;
                var data2 = Utilities.Operation.Success.ToString();
                return Json(data2, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}