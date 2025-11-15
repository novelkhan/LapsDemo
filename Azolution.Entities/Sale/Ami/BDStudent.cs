using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Azolution.Entities.Sale.Ami
{
    public class BDStudent
    {
        public int StudentID { get; set; }
        public string StudentFirstName { get; set; }
        public string StudentLastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int SudentGender { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public int SubjectID { get; set; }
        public string SubjectName { get; set; }
        public int Is_Active { get; set; }
        public string Active { get; set; }
    }
}
