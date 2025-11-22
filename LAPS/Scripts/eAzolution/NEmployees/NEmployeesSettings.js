$(document).ready(function () {
    EmployeeDetailsManeger.PopulateCities();
    EmployeeDetailsHelper.GenerateDateOfBirth();
    EmployeeEducationManager.GenerateEmployeeEducationGrid();

    $("#btnSave").click(function () {
        EmployeeDetailsManeger.SaveEmployee();
    });

    $("#btnPrint").click(function () {
        debugger;
        EmployeeDetailsHelper.PrintEmployeeReport();
    });

    EmployeeSummaryHelper.GenerateEmployeeGrid();
});