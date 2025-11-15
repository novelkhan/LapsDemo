using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Azolution.Entities.Sale;
using Laps.Registration.Service.Interface;
using Laps.Registration.Service.Service;
using Utilities;

namespace LAPS.Controllers
{
    public class RegistrationsController : Controller
    {
        private readonly IRegistrationRepo _IRegistrationRepo = new RegistrationService();
        public ActionResult Registrations()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("~/Views/Registrations/RegistrationsSettings.cshtml");
            }
            return RedirectToAction("Logoff", "Home");
        }

        public ActionResult PopulateCus_TypeDDL()
        {
            var data = _IRegistrationRepo.PopulateCus_TypeDDL();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CustomerGrid(GridOptions options)
        {
            var data = _IRegistrationRepo.CustomerGrid(options);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveCustomer(RegistrationsClass Customer)
        {
            var data = Json(_IRegistrationRepo.SaveCustomer(Customer), JsonRequestBehavior.AllowGet);
            return data;
        }

        public ActionResult DeleteCustomer(int id)
        {
            return Json(_IRegistrationRepo.DeleteCustomer(id), JsonRequestBehavior.AllowGet);
        }
    }
}