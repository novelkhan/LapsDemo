$(document).ready(function () {
    RegistrationsDetailsManager.PopulateCus_TypeDDL();
    RegistrationsDetailsHelper.GenerateDateOfBirth();

    $("#btnSave").click(function () {
        RegistrationsDetailsManager.SaveCustomer();
    });
    RegistrationsSummaryHelper.GenerateCustomerGrid();
});