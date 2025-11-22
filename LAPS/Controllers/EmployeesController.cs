using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Azolution.Entities.Report;
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

        public ActionResult SaveEmployeeWithEducation(EmployeeWithEducationViewModel employee)
        {
            try
            {
                var data = _iemployeeService.SaveEmployeeWithEducation(
                    employee,
                    employee.EducationList ?? new List<Azolution.Entities.HumanResource.EmployeeEducation>(),
                    employee.RemoveEducationList ?? new List<int>()
                );
                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json("Error: " + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetEmployeeEducationByEmployeeID(int employeeId)
        {
            var data = _iemployeeService.GetEmployeeEducationByEmployeeID(employeeId);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetEmployeeReport()
        {
            try
            {
                var data = new ReportData<Azolution.Entities.HumanResource.Employees>();


                data.DataSource = _iemployeeService.GetEmpReport();
                data.RptName = "Employee.rpt";
                Session["report"] = data;
                return Json(Utilities.Operation.Success.ToString(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }

    // ViewModel তৈরি করুন
    public class EmployeeWithEducationViewModel : Azolution.Entities.HumanResource.Employees
    {
        public List<Azolution.Entities.HumanResource.EmployeeEducation> EducationList { get; set; }
        public List<int> RemoveEducationList { get; set; }
    }
}