using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azolution.Entities.Sale;
using Utilities;

namespace Laps.Registration.DataService
{
    public class RegistrationDataService
    {
        public List<CustomersType> PopulateCus_TypeDDL()
        {
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                string query = "SELECT * FROM CustomersType";
                return Kendo<CustomersType>.Combo.DataSource(query);
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

        public GridEntity<RegistrationsClass> CustomerGrid(GridOptions options)
        {
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                string query = string.Format(@"SELECT Rg.*, Ct.*,
                    CASE WHEN Rg.Cus_Gender=1 THEN 'Male' ELSE 'Female' END AS Gender,
                    CASE WHEN Rg.Is_Active=0 THEN 'Not Active' ELSE 'Active' END AS Active
                    FROM Registrations AS Rg LEFT JOIN CustomersType AS Ct ON Ct.Cus_Type_ID = Rg.Cus_Type");
                var data = Kendo<RegistrationsClass>.Grid.DataSource(options, query, "Cus_ID");
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

        public string SaveCustomer(RegistrationsClass Customer)
        {
            string ResultMsg = "";
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                if (Customer.Cus_ID == 0)
                {
                    if (Customer.Cus_Password == Customer.Cus_RePassword)
                    {
                        string SaveQuery = string.Format(@"IF '{6}' = '{7}' BEGIN INSERT INTO Registrations (Cus_Name, Cus_Email, Cus_Mobile, Cus_Gender, Cus_DOB, Cus_Type, Cus_Password, Cus_RePassword, Reg_Date, Is_Active)
                      VALUES ('{0}', '{1}', '{2}', {3}, '{4}', {5}, '{6}', '{7}', GETDATE(), '{8}') END", Customer.Cus_Name, Customer.Cus_Email,
                      Customer.Cus_Mobile, Customer.Cus_Gender, Customer.Cus_DOB, Customer.Cus_Type, Customer.Cus_Password, Customer.Cus_RePassword, Customer.Is_Active);
                        con.ExecuteNonQuery(SaveQuery);
                        ResultMsg = "Success";
                    }
                    else
                    {
                        ResultMsg = "Give same Password and Re-Password!!!";
                    }
                }
                else
                {
                    if (Customer.Cus_Password == Customer.Cus_RePassword)
                    {
                        string UpdateQuery = string.Format(@"IF '{6}' = '{7}' BEGIN UPDATE Registrations SET Cus_Name = '{0}', Cus_Email = '{1}', Cus_Mobile = '{2}', Cus_Gender = {3}, Cus_DOB = '{4}', Cus_Type = {5}, Cus_Password = '{6}', Cus_RePassword = '{7}', Reg_Date = GETDATE(), Is_Active = '{8}'  WHERE Cus_ID = {9} END",
                      Customer.Cus_Name, Customer.Cus_Email, Customer.Cus_Mobile, Customer.Cus_Gender, Customer.Cus_DOB,
                      Customer.Cus_Type, Customer.Cus_Password, Customer.Cus_RePassword, Customer.Is_Active, Customer.Cus_ID);
                        con.ExecuteNonQuery(UpdateQuery);
                        ResultMsg = "Update";
                    }
                    else
                    {
                        ResultMsg = "Give same Password and Re-Password!!!";
                    }
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

        public string DeleteCustomer(int id)
        {
            CommonConnection con = new CommonConnection();
            var ResultMsg = "";
            var DeleteQuery = "";
            try
            {
                DeleteQuery = string.Format(@"DELETE FROM Registrations WHERE Cus_ID = {0}", id);
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
