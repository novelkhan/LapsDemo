using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utilities;

namespace Laps.Employees.Service.Interfaces
{
    public interface IEmployeeService
    {
        List<Azolution.Entities.HumanResource.Cities> PopulateCities();
        GridEntity<Azolution.Entities.HumanResource.Employees> EmployeesGrid(GridOptions options);
        string SaveEmployee(Azolution.Entities.HumanResource.Employees employees);
        string DeleteEmployee(int id);
        string SaveEmployeeWithEducation(Azolution.Entities.HumanResource.Employees employees, List<Azolution.Entities.HumanResource.EmployeeEducation> educationList, List<int> removeEducationList);
        List<Azolution.Entities.HumanResource.EmployeeEducation> GetEmployeeEducationByEmployeeID(int employeeId);
    }
}