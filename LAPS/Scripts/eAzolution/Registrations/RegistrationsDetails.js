////function ValidateEmail(input) {
////    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
////    if (input.value.match(validRegex)) {
////        return true;
////    } else {
////        alert("Invalid email address!");
////        return false;
////    }
////}

//kendo.ui.validator.rules.FixEmail = function (input) {
//    var datavalemail = input.attr('data-val-email');
//    if (datavalemail != null) input.attr('type', 'email').attr('data-email-msg', datavalemail);
//    return true;
//}


var RegistrationsDetailsManager = {

    PopulateCus_TypeDDL: function () {
        var Cus_TypeObj = new Object();
        Cus_TypeObj = AjaxManager.GetDataSource("../Registrations/PopulateCus_TypeDDL");

        $("#ddlCus_Type").kendoComboBox({
            placeholder: "Select Type",
            dataValueField: "Cus_Type_ID",
            dataTextField: "Cus_Type_Name",
            dataSource: Cus_TypeObj,
            filter: "contains",
            suggest: true,
        });
    },

    SaveCustomer: function () {
        //debugger;
        var objt = RegistrationsDetailsHelper.CreateCustomerFields();
        RegistrationsDetailsHelper.ClearForm();

        var obj = JSON.stringify(objt);
        var jsonParam = 'customer:' + obj;
        var serviceUrl = "../Registrations/SaveCustomer";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);


        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Customer Registered Successfully',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'OK',
                            onClick: function ($noty) {
                                $noty.close();
                                $("#RegistrationsSummaryDiv").data("kendoGrid").dataSource.read();
                            }
                        }
                    ]);
            }
            else if (jsonData == "Update") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Customer Updated Successfully',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'OK',
                            onClick: function ($noty) {
                                $noty.close();
                                $("#RegistrationsSummaryDiv").data("kendoGrid").dataSource.read();
                            }
                        }
                    ]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'Ok',
                            onClick: function ($noty) {
                                $noty.close();
                            }
                        }
                    ]);
            }
        };

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                [{
                    addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                        $noty.close();
                    }
                }]);
        }
    },
};

var RegistrationsDetailsHelper = {

    CreateCustomerFields: function () {
        var obj = new Object();

        obj.Cus_ID = $("#hdnCustomerID").val();
        obj.Cus_Name = $('#txtCus_Name').val();
        obj.Cus_Email = $('#txtCus_Email').val();
        obj.Cus_Mobile = $('#txtCus_Mobile').val();
        obj.Cus_Gender = $('input[name = "Gender"]:checked').val();
        obj.Cus_DOB = $("#txtCus_DOB").val();
        obj.Cus_Type = $('#ddlCus_Type').val();
        obj.Cus_Password = $('#txtCus_Password').val();
        obj.Cus_RePassword = $('#txtCus_RePassword').val();
        obj.Reg_Date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        obj.Is_Active = $("#chkIs_Active").is(":checked") == true ? 1 : 0;
        return obj;
    },

    GenerateDateOfBirth: function () {
        $("#txtCus_DOB").kendoDatePicker({
            format: "dd-MMM-yyyy"
        });
    },

    ClearForm: function () {
        $("#btnSave").text("Save");
        $("#btnClearAll").text("Clear");
        $("#hdnCustomerID").val(0);
        $("#txtCus_Name").val("");
        $("#txtCus_Email").val("");
        $("#txtCus_Mobile").val("");
        $('input[name=Gender]').attr('checked', false);
        $("#txtCus_DOB").val("");
        $("#ddlCus_Type").data("kendoComboBox").value("");
        $("#txtCus_Password").val("");
        $("#txtCus_RePassword").val("");
        $("#chkIs_Active").removeAttr('checked', 'checked');
    },
};