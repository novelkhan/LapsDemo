using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Azolution.Entities.HumanResource
{
    public class Employees
    {
        public int EmployeeID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Gender { get; set; }
        public string EGender { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public int CityID { get; set; }
        public string CityName { get; set; }
        public int Is_Active { get; set; }
        public string Active { get; set; }
    }
}