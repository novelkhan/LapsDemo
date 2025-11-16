using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Laps.Employees.Service.Services;
using Utilities;

namespace LAPS.Controllers
{
    public class EmployeesController : Controller
    {
        private Laps.Employees.Service.Interfaces.IEmployeeService _iemployeeService = new Laps.Employees.Service.Services.EmployeesService();
        public ActionResult Employees()
        {
            if (Session["CurrentUser"] != null)
            {
                return View("~/Views/NEmployee/NEmployeesSettings.cshtml");
            }
            return RedirectToAction("Logoff", "Home");
        }

        public ActionResult PopulateCities()
        {
            var data = _iemployeeService.PopulateCities();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult EmployeeGrid(GridOptions options)
        {
            var data = _iemployeeService.EmployeesGrid(options);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveEmployee(Azolution.Entities.HumanResource.Employees employee)
        {
            var data = Json(_iemployeeService.SaveEmployee(employee), JsonRequestBehavior.AllowGet);
            return data;
        }

        public ActionResult DeleteEmployee(int id)
        {
            return Json(_iemployeeService.DeleteEmployee(id), JsonRequestBehavior.AllowGet);
        }
    }
}