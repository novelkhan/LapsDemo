using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azolution.Entities.Sale;
using Laps.Registration.DataService;
using Laps.Registration.Service.Interface;
using Utilities;

namespace Laps.Registration.Service.Service
{
    public class RegistrationService : IRegistrationRepo
    {
        private RegistrationDataService _RegistrationDataService = new RegistrationDataService();
        public string DeleteCustomer(int id)
        {
            return _RegistrationDataService.DeleteCustomer(id);
        }

        public List<CustomersType> PopulateCus_TypeDDL()
        {
            return _RegistrationDataService.PopulateCus_TypeDDL();
        }

        public string SaveCustomer(RegistrationsClass Customer)
        {
            var data = _RegistrationDataService.SaveCustomer(Customer);
            return data;
        }

        public GridEntity<RegistrationsClass> CustomerGrid(GridOptions options)
        {
            return _RegistrationDataService.CustomerGrid(options);
        }
    }
}
