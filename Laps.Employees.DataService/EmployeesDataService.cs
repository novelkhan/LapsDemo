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


        public string SaveEmployeeWithEducation(Azolution.Entities.HumanResource.Employees employees, List<Azolution.Entities.HumanResource.EmployeeEducation> educationList, List<int> removeEducationList)
        {
            string ResultMsg = "";
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                if (employees.EmployeeID == 0)
                {
                    string SaveQuery = string.Format(@"INSERT INTO Employees (FirstName, LastName, DateOfBirth, Gender, Email, MobileNo, CityID, Is_Active)
              VALUES ('{0}', '{1}', '{2}', {3}, '{4}', '{5}', {6}, {7}); SELECT CAST(SCOPE_IDENTITY() as int)",
                      employees.FirstName, employees.LastName, employees.DateOfBirth, employees.Gender,
                      employees.Email, employees.MobileNo, employees.CityID, employees.Is_Active);

                    int newEmployeeID = con.GetScaler(SaveQuery);

                    // Save Education Records
                    if (educationList != null && educationList.Count > 0)
                    {
                        foreach (var education in educationList)
                        {
                            string educationQuery = string.Format(@"INSERT INTO EmployeeEducation (EmployeeID, DegreeName, InstituteName, PassingYear, Result)
                      VALUES ({0}, '{1}', '{2}', {3}, '{4}')",
                              newEmployeeID, education.DegreeName, education.InstituteName, education.PassingYear, education.Result);
                            con.ExecuteNonQuery(educationQuery);
                        }
                    }

                    ResultMsg = "Success";
                }
                else
                {
                    string UpdateQuery = string.Format(@"UPDATE Employees SET FirstName = '{0}', LastName = '{1}', DateOfBirth = '{2}',
              Gender = {3}, Email = '{4}', MobileNo = '{5}', CityID = {6}, Is_Active = {7} WHERE EmployeeID = {8}",
                      employees.FirstName, employees.LastName, employees.DateOfBirth, employees.Gender, employees.Email,
                      employees.MobileNo, employees.CityID, employees.Is_Active, employees.EmployeeID);
                    con.ExecuteNonQuery(UpdateQuery);

                    // Delete Removed Education Records
                    if (removeEducationList != null && removeEducationList.Count > 0)
                    {
                        foreach (var educationId in removeEducationList)
                        {
                            if (educationId > 0)
                            {
                                string deleteEduQuery = string.Format(@"DELETE FROM EmployeeEducation WHERE EducationID = {0}", educationId);
                                con.ExecuteNonQuery(deleteEduQuery);
                            }
                        }
                    }

                    // Save/Update Education Records
                    if (educationList != null && educationList.Count > 0)
                    {
                        foreach (var education in educationList)
                        {
                            if (education.EducationID == 0)
                            {
                                string educationQuery = string.Format(@"INSERT INTO EmployeeEducation (EmployeeID, DegreeName, InstituteName, PassingYear, Result)
                          VALUES ({0}, '{1}', '{2}', {3}, '{4}')",
                                  employees.EmployeeID, education.DegreeName, education.InstituteName, education.PassingYear, education.Result);
                                con.ExecuteNonQuery(educationQuery);
                            }
                            else
                            {
                                string updateEduQuery = string.Format(@"UPDATE EmployeeEducation SET DegreeName = '{0}', InstituteName = '{1}', 
                          PassingYear = {2}, Result = '{3}' WHERE EducationID = {4}",
                                  education.DegreeName, education.InstituteName, education.PassingYear, education.Result, education.EducationID);
                                con.ExecuteNonQuery(updateEduQuery);
                            }
                        }
                    }

                    ResultMsg = "Update";
                }
                con.CommitTransaction();
            }
            catch (Exception ex)
            {
                ResultMsg = ex.Message;
                con.RollBack();
            }
            finally
            {
                con.Close();
            }
            return ResultMsg;
        }

        public List<EmployeeEducation> GetEmployeeEducationByEmployeeID(int employeeId)
        {
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                string query = string.Format(@"SELECT * FROM EmployeeEducation WHERE EmployeeID = {0}", employeeId);
                return con.GenericDataSource<EmployeeEducation>(query);
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


        public List<Azolution.Entities.HumanResource.Employees> GetEmployeeReport()
        {

            string sql = string.Format(@"Select * from Employees");


            return Data<Azolution.Entities.HumanResource.Employees>.DataSource(sql);
        }
    }
}

//CREATE TABLE Employees (
//    EmployeeID INT PRIMARY KEY IDENTITY(1,1),
//    FirstName NVARCHAR(50),
//    LastName NVARCHAR(50),
//    DateOfBirth DATETIME,
//    Gender INT,
//    Email NVARCHAR(50),
//    MobileNo NVARCHAR(50),
//    CityID INT,
//    Is_Active INT
//);



//CREATE TABLE Cities (
//    CityID INT PRIMARY KEY IDENTITY(1,1),
//    CityName NVARCHAR(50)
//);



//CREATE TABLE EmployeeEducation (
//    EducationID INT PRIMARY KEY IDENTITY(1,1),
//    EmployeeID INT NOT NULL,
//    DegreeName NVARCHAR(100),
//    InstituteName NVARCHAR(100),
//    PassingYear INT,
//    Result NVARCHAR(50),
//    FOREIGN KEY(EmployeeID) REFERENCES Employees(EmployeeID)
//        ON DELETE CASCADE
//);


//INSERT INTO Cities (CityName)
//VALUES
//('Dhaka'),
//('Tangail'),
//('Chattogram'),
//('Rajshahi'),
//('Khulna'),
//('Barishal'),
//('Sylhet'),
//('Rangpur');