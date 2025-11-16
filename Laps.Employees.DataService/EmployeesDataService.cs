using System;
using System.Collections.Generic;
using Utilities;
using Azolution.Entities.HumanResource;

namespace Laps.Employees.DataService
{
    public class EmployeesDataService
    {
        public List<Cities> PopulateCities()
        {
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                string query = "SELECT * FROM Cities";
                return Kendo<Cities>.Combo.DataSource(query);
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                con.Close();
            }
        }

        public GridEntity<Azolution.Entities.HumanResource.Employees> EmployeeGrid(GridOptions options)
        {
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                string query = string.Format(@"SELECT E.EmployeeID, E.FirstName, E.LastName, E.DateOfBirth, E.Gender, E.Email, E.MobileNo, E.CityID, E.Is_Active, C.CityName,
                    CASE WHEN E.Gender=0 THEN 'Male' ELSE'Female' END AS EGender,
                    CASE WHEN E.Is_Active=0 THEN 'Not Active' ELSE 'Active' END AS Active
                    FROM Employees AS E LEFT JOIN Cities AS C ON C.CityID = E.CityID");
                var data = Kendo<Azolution.Entities.HumanResource.Employees>.Grid.DataSource(options, query, "EmployeeID");
                return data;
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                con.Close();
            }
        }

        public string SaveEmployee(Azolution.Entities.HumanResource.Employees employees)
        {
            string ResultMsg = "";
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                if (employees.EmployeeID == 0)
                {
                    string SaveQuery = string.Format(@"INSERT INTO Employees (FirstName, LastName, DateOfBirth, Gender, Email, MobileNo, CityID, Is_Active)
                      VALUES ('{0}', '{1}', '{2}', {3}, '{4}', {5}, {6}, {7})", employees.FirstName, employees.LastName,
                      employees.DateOfBirth, employees.Gender, employees.Email, employees.MobileNo, employees.CityID, employees.Is_Active);
                    con.ExecuteNonQuery(SaveQuery);
                    ResultMsg = "Success";
                }
                else
                {
                    string UpdateQuery = string.Format(@"UPDATE Employees SET FirstName = '{0}', LastName = '{1}', DateOfBirth = '{2}',
                      Gender = {3}, Email = '{4}', MobileNo = '{5}', CityID = {6}, Is_Active = {7} WHERE EmployeeID = {8}",
                      employees.FirstName, employees.LastName, employees.DateOfBirth, employees.Gender, employees.Email,
                      employees.MobileNo, employees.CityID, employees.Is_Active, employees.EmployeeID);
                    con.ExecuteNonQuery(UpdateQuery);
                    ResultMsg = "Update";
                }
                con.CommitTransaction();
            }
            catch (Exception ex)
            {
                ResultMsg = ex.Message;
            }
            finally
            {
                con.Close();
            }
            return ResultMsg;
        }

        public string DeleteEmployee(int id)
        {
            CommonConnection con = new CommonConnection();
            var ResultMsg = "";
            var DeleteQuery = "";
            try
            {
                DeleteQuery = string.Format(@"DELETE FROM Employees WHERE EmployeeID = {0}", id);
                con.ExecuteNonQuery(DeleteQuery);
                ResultMsg = Operation.Success.ToString();
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                con.Close();
            }
            return ResultMsg;
        }
    }
}