
var EmployeeDetailsManeger = {

    PopulateCities: function () {
        var CityObj = new Object();
        CityObj = AjaxManager.GetDataSource("../Employees/PopulateCities");

        $("#city").kendoComboBox({
            placeholder: "Select City",
            dataValueField: "CityID",
            dataTextField: "CityName",
            dataSource: CityObj,
            filter: "contains",
            suggest: true,
        });
    },

    SaveEmployee: function () {
        var object = EmployeeDetailsHelper.CreateEmployeeFields();
        EmployeeDetailsHelper.ClearFrom();

        var obj = JSON.stringify(object);
        var jsonParam = 'employee:' + obj;
        var serviceUrl = "../Employees/SaveEmployee";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);


        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Employee Saved Successfully',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'OK',
                            onClick: function ($noty) {
                                $noty.close();
                                $("#employeeSummaryDiv").data("kendoGrid").dataSource.read();
                            }
                        }
                    ]);
            }
            else if (jsonData == "Update") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Employee Updated Successfully',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'OK',
                            onClick: function ($noty) {
                                $noty.close();
                                $("#employeeSummaryDiv").data("kendoGrid").dataSource.read();
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

var EmployeeDetailsHelper = {

    CreateEmployeeFields: function () {
        var obj = new Object();

        obj.EmployeeID = $("#hdnEmployeeID").val();
        obj.FirstName = $('#txtFirstName').val();
        obj.LastName = $('#txtLastName').val();
        obj.DateOfBirth = $('#txtDateOfBirth').val();
        obj.Gender = $('input[name = "Gender"]:checked').val();
        obj.Email = $("#txtEmail").val();
        obj.MobileNo = $('#txtMobileNo').val();
        obj.CityID = $('#city').val();
        obj.Is_Active = $("#chkIs_Active").is(":checked") == true ? 1 : 0;
        return obj;
    },

    GenerateDateOfBirth: function () {
        $("#txtDateOfBirth").kendoDatePicker({
            format: "dd-MMM-yyyy"
        });
    },

    ClearFrom: function () {
        $("#btnSave").text("Save");
        $("#btnClearAll").text("Clear");
        $("#hdnEmployeeID").val(0);
        $("#txtFirstName").val("");
        $("#txtLastName").val("");
        $("#txtDateOfBirth").val("");
        $('input[name=Gender]').attr('checked', false);
        $("#txtEmail").val("");
        $("#txtMobileNo").val("");
        $("#city").data("kendoComboBox").value("");
        $("#chkIs_Active").removeAttr('checked', 'checked');
    },
};