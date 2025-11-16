$(document).ready(function () {
    EmployeeDetailsManeger.PopulateCities();
    EmployeeDetailsHelper.GenerateDateOfBirth();

    $("#btnSave").click(function () {
        EmployeeDetailsManeger.SaveEmployee();
    });
    EmployeeSummaryHelper.GenerateEmployeeGrid();
});