var PassengerDetailsManager = {

    SavePassenger: function () {

            var object = PassengerDetailsHelper.CreateObjectFromFields();
            PassengerDetailsHelper.ClearPassengerForm();

            var obj = JSON.stringify(object);
            var jsonParam = 'psngr:' + obj;
            var serviceUrl = "../Passenger/SavePassenger/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        

        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Passenger Saved Successfully',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'OK',
                            onClick: function ($noty) {
                                $noty.close();
                                $("#psnSummaryDiv").data("kendoGrid").dataSource.read();
                            }
                        }
                    ]);
            }
            else if (jsonData == "Update") {
                    AjaxManager.MsgBox('success', 'center', 'Success:', 'Passenger Updated Successfully',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'OK',
                            onClick: function ($noty) {
                                $noty.close();
                                $("#psnSummaryDiv").data("kendoGrid").dataSource.read();
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
        }

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

var PassengerDetailsHelper = {

    PopulateTrainsCombo: function () {
        var objTrain = new Object();
        objTrain = AjaxManager.GetDataSource("../Passenger/PopulateTrainsCombo");

        $("#cmbTrain").kendoComboBox({
            placeholder: "Select Train",
            dataValueField: "TrainID",
            dataTextField: "TrainName",
            dataSource: objTrain,
            filter: "contains",
            suggest: true,
        });
    },

    PopulateRoutesCombo: function () {
        var objRoute = new Object();
        objRoute = AjaxManager.GetDataSource("../Passenger/PopulateRoutesCombo");

        $("#cmbRoute").kendoComboBox({
            autoBind: false,
            cascadeFrom: "Trains",
            placeholder: "Select Route",
            dataValueField: "RouteID",
            dataTextField: "RouteName",
            dataSource: objRoute,
            filter: "contains",
            suggest: true,
        });
    },

    PopulateClasssCombo: function () {
        var objClass = new Object();
        objClass = AjaxManager.GetDataSource("../Passenger/PopulateClasssCombo");

        $("#cmbClass").kendoComboBox({
            autoBind: false,
            cascadeFrom: "TrainRoutes",
            placeholder: "Select Class",
            dataValueField: "ClassID",
            dataTextField: "ClassName",
            dataSource: objClass,
            filter: "contains",
            suggest: true,
        });
    },

    GenerateDateOfBirth: function () {
        $("#txtDateOfBirth").kendoDatePicker({
            format: "dd-MMM-yyyy"
        });
    },

    PrintPassengerReport: function () {
        debugger;

        var jsonParam = "";

        var url = "../Passenger/GetPassengerReport";

        AjaxManager.SendJson2(url, jsonParam, onSuccess, onFailed);

        function onSuccess(jsonData) {
            debugger;

            if (jsonData == "Success") {
                window.open('../Reports/LapsRepot.aspx', '_blank');
            }
        }
        function onFailed(error) {
            debugger;
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                    }
                }]);
        }
    },

    CreateObjectFromFields: function () {
        var object = new Object();

        object.PassengerID = $("#hdnPassengerID").val();
        object.PassengerName = $('#txtPassengerName').val();
        object.DateOfBirth = $('#txtDateOfBirth').val();
        object.PGender = $('input[name="Gender"]:checked').val();
        object.Email = $('#txtEmail').val();
        object.Phone = $('#txtPhone').val();
        object.TrainID = $('#cmbTrain').val();
        object.RouteID = $('#cmbRoute').val();
        object.ClassID = $('#cmbClass').val();
        object.Is_Pay = $("#chkIs_Pay").is(":checked") == true ? 1 : 0;

        return object;
        PassengerDetailsHelper.ClearPassengerForm();
    },

    ClearPassengerForm: function () {

        $("#btnSave").text("Save");
        $('#hdnPassengerID').val(0);
        $("#txtPassengerName").val("");
        $("#txtDateOfBirth").val("");
        $("#txtEmail").val("");
        $("#txtPhone").val("");
        $("#cmbTrain").data("kendoComboBox").value("");
        $("#cmbRoute").data("kendoComboBox").value("");
        $("#cmbClass").data("kendoComboBox").value("");
        $('input[name=Gender]').attr('checked', false);
        $('#chkIs_Pay').removeAttr('checked', 'checked');
        $("#PassengerDiv > form").kendoValidator();
        $("#PassengerDiv").find("span.k-tooltip-validation").hide();
    },

    ValidatePassengerForm: function () {
        var data = [];

        //var validator = $("#PassengerDiv").kendoValidator().data("kendoValidator"),
            validator = $("#txtPassengerName").kendoValidator().data("kendoValidator"),
            validator = $("#txtDateOfBirth").kendoValidator().data("kendoValidator"),
            validator = $("#txtEmail").kendoValidator().data("kendoValidator"),
            validator = $("#txtPhone").kendoValidator().data("kendoValidator"),
            validator = $("#cmbTrain").kendoValidator().data("kendoValidator"),
            validator = $("#cmbRoute").kendoValidator().data("kendoValidator"),
            validator = $("#cmbClass").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            status.kendoComboBox("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    }
};



