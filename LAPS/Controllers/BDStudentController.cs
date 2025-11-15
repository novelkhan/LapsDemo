using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Azolution.Entities.Sale.Ami;
using Laps.Student.Service;
using Laps.Student.Service.Interface;
using Utilities;

namespace LAPS.Controllers
{
    public class BDStudentController : Controller
    {
        private IStudentRepo _iStudentRepo = new StudentService();
        public ActionResult BDStudent()
        {
            if (Session ["CurrentUser"] != null)
            {
                return View("~/Views/BDStudent/StudentSettings.cshtml");
            }
            return RedirectToAction("Logoff", "Home");
        }

        public ActionResult PopulateSubjectDDL()
        {
            var data = _iStudentRepo.PopulateSubjectDDL();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult StudentGrid(GridOptions options)
        {
            var data = _iStudentRepo.StudentGrid(options);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveStudent(BDStudent student)
        {
            var data = Json(_iStudentRepo.SaveStudent(student), JsonRequestBehavior.AllowGet);
            return data; 
        }

        public ActionResult DeleteStudent(int id)
        {
            return Json(_iStudentRepo.DeleteStudent(id), JsonRequestBehavior.AllowGet);
        }
    }
}