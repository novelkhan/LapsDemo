using System.Collections.Generic;
using Laps.Employees.Service.Interfaces;
using Laps.Employees.DataService;
using Azolution.Entities.HumanResource;
using Utilities;

namespace Laps.Employees.Service.Services
{
    public class EmployeesService : IEmployeeService
    {
        private Laps.Employees.DataService.EmployeesDataService _empployeesDataService = new EmployeesDataService();

        public string DeleteEmployee(int id)
        {
            return _empployeesDataService.DeleteEmployee(id);
        }

        public List<Cities> PopulateCities()
        {
            return _empployeesDataService.PopulateCities();
        }

        public string SaveEmployee(Azolution.Entities.HumanResource.Employees employee)
        {
            var data = _empployeesDataService.SaveEmployee(employee);
            return data;
        }

        public GridEntity<Azolution.Entities.HumanResource.Employees> EmployeesGrid(GridOptions options)
        {
            return _empployeesDataService.EmployeeGrid(options);
        }

        public string SaveEmployeeWithEducation(Azolution.Entities.HumanResource.Employees employees, List<EmployeeEducation> educationList, List<int> removeEducationList)
        {
            return _empployeesDataService.SaveEmployeeWithEducation(employees, educationList, removeEducationList);
        }

        public List<EmployeeEducation> GetEmployeeEducationByEmployeeID(int employeeId)
        {
            return _empployeesDataService.GetEmployeeEducationByEmployeeID(employeeId);
        }

        public List<Azolution.Entities.HumanResource.Employees> GetEmpReport()
        {
            return _empployeesDataService.GetEmployeeReport();
        }
    }
}