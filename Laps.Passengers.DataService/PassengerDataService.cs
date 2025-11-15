using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azolution.Entities.Sale.Ami;
using Utilities;

namespace Laps.Passengers.DataService
{
    public class PassengerDataService
    {
        public List<Trains> PopulateTrainsCombo()
        {
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                string query = "SELECT * FROM Trains";
                return Kendo<Trains>.Combo.DataSource(query);
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

        public List<TrainClass> PopulateClasssCombo()
        {
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                string query = "SELECT * FROM TrainClass";
                return Kendo<TrainClass>.Combo.DataSource(query);
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

        public List<TrainRoutes> PopulateRoutesCombo()
        {
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                string query = "SELECT * FROM TrainRoutes";
                return Kendo<TrainRoutes>.Combo.DataSource(query);
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

        public string SavePassenger(Passenger psngr)
        {
            string resultMSG = "";
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                if (psngr.PassengerID == 0)
                {
                    string saveQuery = string.Format(@"INSERT INTO Passenger (PassengerName, DateOfBirth, PGender, Email, Phone, TrainID, RouteID, ClassID, Is_Pay) 
                        VALUES('{0}','{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}')",
                        psngr.PassengerName, psngr.DateOfBirth, psngr.PGender, psngr.Email, psngr.Phone, psngr.TrainID, psngr.RouteID, psngr.ClassID, psngr.Is_Pay);
                    con.ExecuteNonQuery(saveQuery);
                    resultMSG = "Success";
                }
                else
                {
                    string updateQuery = string.Format(@"UPDATE Passenger SET PassengerName='{0}', DateOfBirth='{1}', 
                       PGender='{2}', Email='{3}', Phone='{4}', TrainID='{5}', RouteID='{6}', ClassID='{7}', Is_Pay='{8}' WHERE PassengerID={9}", psngr.PassengerName,
                       psngr.DateOfBirth, psngr.PGender, psngr.Email, psngr.Phone, psngr.TrainID, psngr.RouteID, psngr.ClassID, psngr.Is_Pay, psngr.PassengerID);
                    con.ExecuteNonQuery(updateQuery);
                    resultMSG = "Update";
                }
                con.CommitTransaction();
            }
            catch (Exception ex)
            {
                resultMSG = ex.Message;
            }
            finally
            {
                con.Close();
            }
            return resultMSG;
        }

        public GridEntity<Passenger> PassengerGrid(GridOptions options)
            {
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                string query = string.Format(@"SELECT *,
                CASE WHEN P.PGender=0 THEN 'Male' ELSE'Female' END AS Gender,
                CASE WHEN P.Is_Pay=0 THEN 'Not Pay' ELSE 'Pay' END AS Pay FROM Passenger AS P
                LEFT JOIN Trains As T ON T.TrainID = P.TrainID
                LEFT JOIN TrainRoutes AS R ON R.RouteID = P.RouteID
                LEFT JOIN TrainClass AS C ON C.ClassID = P.ClassID");
                return Kendo<Passenger>.Grid.DataSource(options, query, "PassengerID");
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

        public string DeletePassenger(int id)
        {
            CommonConnection con = new CommonConnection();
            var query = "";
            var result = "";
            try
            {
                query = string.Format(@"DELETE FROM Passenger where PassengerID={0}", id);
                con.ExecuteNonQuery(query);
                result = Operation.Success.ToString();
            }

            catch (Exception)
            {
                return null;
            }
            finally
            {
                con.Close();
            }
            return result;
        }

        public List<Passenger> GetPassengerReport()
        {
            string sql = string.Format(@"SELECT *,
                CASE WHEN P.PGender=0 THEN 'Male' ELSE'Female' END AS Gender,
                CASE WHEN P.Is_Pay=0 THEN 'Not Pay' ELSE 'Pay' END AS Pay FROM Passenger AS P
                LEFT JOIN Trains As T ON T.TrainID = P.TrainID
                LEFT JOIN TrainRoutes AS R ON R.RouteID = P.RouteID
                LEFT JOIN TrainClass AS C ON C.ClassID = P.ClassID");
            return Data<Passenger>.DataSource(sql);
        }
    }
}
