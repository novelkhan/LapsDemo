using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Azolution.Entities.Sale.Ami
{
    public class Passenger
    {
        public int PassengerID { get; set; }
        public string PassengerName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int PGender { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int TrainID { get; set; }
        public string TrainName { get; set; }
        public int RouteID { get; set; }
        public string RouteName { get; set; }
        public int ClassID { get; set; }
        public string ClassName { get; set; }
        public int Is_Pay { get; set; }
        public string Pay { get; set; }
    }
}
