using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azolution.Entities.Sale.Ami;
using Laps.Student.DataService;
using Laps.Student.Service.Interface;
using Utilities;

namespace Laps.Student.Service
{
    public class StudentService : IStudentRepo
    {
        private StudentDataService _studentDataService = new StudentDataService();
        public string DeleteStudent(int id)
        {
            return _studentDataService.DeleteStudent(id);
        }

        public List<Subjects> PopulateSubjectDDL()
        {
            return _studentDataService.PopulateSubjectDDL();
        }

        public string SaveStudent(BDStudent student)
        {
            var data = _studentDataService.SaveStudent(student);
            return data;
        }

        public GridEntity<BDStudent> StudentGrid(GridOptions options)
        {
            return _studentDataService.StudentGrid(options);
        }
    }
}
