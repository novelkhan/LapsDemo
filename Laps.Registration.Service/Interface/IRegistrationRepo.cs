using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azolution.Entities.Sale;
using Utilities;

namespace Laps.Registration.Service.Interface
{
    public interface IRegistrationRepo
    {
        List<CustomersType> PopulateCus_TypeDDL();
        GridEntity<RegistrationsClass> CustomerGrid(GridOptions options);
        string SaveCustomer(RegistrationsClass Customer);
        string DeleteCustomer(int id);
    }
}
