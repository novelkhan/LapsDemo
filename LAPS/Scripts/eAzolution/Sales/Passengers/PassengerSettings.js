$(document).ready(function(){
    PassengerDetailsHelper.PopulateTrainsCombo();
    PassengerDetailsHelper.PopulateRoutesCombo();
    PassengerDetailsHelper.PopulateClasssCombo();
    PassengerDetailsHelper.GenerateDateOfBirth();

    $("#btnSave").click(function () {
        debugger;
        PassengerDetailsManager.SavePassenger();
    });

    $("#btnPrint").click(function () {
        debugger;
        PassengerDetailsHelper.PrintPassengerReport();
    });

    PassengerSummaryHelper.GeneratePassengerSummaryGrid();
});