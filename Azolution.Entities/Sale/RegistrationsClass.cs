using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace Azolution.Entities.Sale
{
    public class RegistrationsClass
    {
        public int Cus_ID { get; set; }
        public string Cus_Name { get; set; }

        [DataType(DataType.EmailAddress)]
		[EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Cus_Email { get; set; }
        public string Cus_Mobile { get; set; }
        public int Cus_Gender { get; set; }
        public string Gender { get; set; }
        public DateTime Cus_DOB { get; set; }
        public int Cus_Type { get; set; }
        public string Cus_Type_Name { get; set; }

        [DataType(DataType.Password)]
        public string Cus_Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Cus_Password")]
        public string Cus_RePassword { get; set; }
        public DateTime Reg_Date { get; set; }
        public bool Is_Active { get; set; }
        public string Active { get; set; }
    }
}
