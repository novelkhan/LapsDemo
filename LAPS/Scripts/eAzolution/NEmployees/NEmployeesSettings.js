$(document).ready(function () {
    EmployeeDetailsManeger.PopulateCities();
    EmployeeDetailsHelper.GenerateDateOfBirth();
    EmployeeEducationManager.GenerateEmployeeEducationGrid();

    $("#btnSave").click(function () {
        EmployeeDetailsManeger.SaveEmployee();
    });

    EmployeeSummaryHelper.GenerateEmployeeGrid();
});