using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azolution.Entities.Sale.Ami;
using Utilities;

namespace Laps.Student.Service.Interface
{
     public interface IStudentRepo
     {
        List<Subjects> PopulateSubjectDDL();
        GridEntity<BDStudent> StudentGrid(GridOptions options);
        string SaveStudent(BDStudent student);
        string DeleteStudent(int id);
     }
}
