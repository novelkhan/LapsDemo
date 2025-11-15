using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azolution.Entities.Sale.Ami;
using Utilities;

namespace Laps.Student.DataService
{
    public class StudentDataService
    {
        public List<Subjects> PopulateSubjectDDL()
        {
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                string query = "SELECT * FROM Subjects";
                return Kendo<Subjects>.Combo.DataSource(query);
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

        public GridEntity<BDStudent> StudentGrid(GridOptions options)
        {
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                string query = string.Format(@"SELECT S.StudentID, S.StudentFirstName, S.StudentLastName, S.DateOfBirth, S.SudentGender, S.Email, S.MobileNo, S.SubjectID, S.Is_Active, Sub.SubjectName,
                    CASE WHEN S.SudentGender=0 THEN 'Male' ELSE'Female' END AS Gender,
                    CASE WHEN S.Is_Active=0 THEN 'Not Active' ELSE 'Active' END AS Active
                    FROM BDStudent AS S LEFT JOIN Subjects AS Sub ON Sub.SubjectID = S.SubjectID");
                var data = Kendo<BDStudent>.Grid.DataSource(options, query, "StudentID");
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

        public string SaveStudent(BDStudent student)
        {
            string ResultMsg = "";
            CommonConnection con = new CommonConnection();
            try
            {
                con.BeginTransaction();
                if (student.StudentID == 0)
                {
                    string SaveQuery = string.Format(@"INSERT INTO BDStudent (StudentFirstName, StudentLastName, DateOfBirth, SudentGender, Email, MobileNo, SubjectID, Is_Active)
                      VALUES ('{0}', '{1}', '{2}', {3}, '{4}', {5}, {6}, {7})", student.StudentFirstName, student.StudentLastName,
                      student.DateOfBirth, student.SudentGender, student.Email, student.MobileNo, student.SubjectID, student.Is_Active);
                    con.ExecuteNonQuery(SaveQuery);
                    ResultMsg = "Success";
                }
                else
                {
                    string UpdateQuery = string.Format(@"UPDATE BDStudent SET StudentFirstName = '{0}', StudentLastName = '{1}', DateOfBirth = '{2}',
                      SudentGender = {3}, Email = '{4}', MobileNo = '{5}', SubjectID = {6}, Is_Active = {7} WHERE StudentID = {8}",
                      student.StudentFirstName, student.StudentLastName, student.DateOfBirth, student.SudentGender, student.Email,
                      student.MobileNo, student.SubjectID, student.Is_Active, student.StudentID);
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

        public string DeleteStudent(int id)
        {
            CommonConnection con = new CommonConnection();
            var ResultMsg = "";
            var DeleteQuery = "";
            try
            {
                DeleteQuery = string.Format(@"DELETE FROM BDStudent WHERE StudentID = {0}", id);
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
