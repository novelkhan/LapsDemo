using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Azolution.Entities.HumanResource
{
    public class EmployeeEducation
    {
        public int EducationID { get; set; }
        public int EmployeeID { get; set; }
        public string DegreeName { get; set; }
        public string InstituteName { get; set; }
        public int PassingYear { get; set; }
        public string Result { get; set; }
    }
}