$(document).ready(function () {
    StudentDetailsManeger.PopulateSubjectDDL();
    StudentDetailsHelper.GenerateDateOfBirth();

    $("#btnSave").click(function () {
        StudentDetailsManeger.SaveStudent();
    });
    StudentSummaryHelper.GenerateStudentGrid();
});