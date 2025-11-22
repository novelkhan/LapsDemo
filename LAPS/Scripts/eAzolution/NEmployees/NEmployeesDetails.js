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
        var employeeObj = EmployeeDetailsHelper.CreateEmployeeFields();
        EmployeeEducationHelper.CreateEmployeeEducationList();

        // Employee Object এ Education List add করে দিচ্ছি
        employeeObj.EducationList = employeeEducationArray;
        employeeObj.RemoveEducationList = removeEducationArray;

        var obj = JSON.stringify(employeeObj);
        var jsonParam = 'employee:' + obj;
        var serviceUrl = "../Employees/SaveEmployeeWithEducation";
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
                                EmployeeDetailsHelper.ClearFrom();
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
                                EmployeeDetailsHelper.ClearFrom();
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

        obj.EmployeeID = $("#hdnEmployeeID").val() == "" ? 0 : $("#hdnEmployeeID").val();
        obj.FirstName = $('#txtFirstName').val();
        obj.LastName = $('#txtLastName').val();
        obj.DateOfBirth = $('#txtDateOfBirth').val();
        obj.Gender = $('input[name = "Gender"]:checked').val() == undefined ? 0 : $('input[name = "Gender"]:checked').val();
        obj.Email = $("#txtEmail").val();
        obj.MobileNo = $('#txtMobileNo').val();
        obj.CityID = $('#city').val() == "" ? 0 : $('#city').val();
        obj.Is_Active = $("#chkIs_Active").is(":checked") == true ? 1 : 0;
        return obj;
    },

    GenerateDateOfBirth: function () {
        $("#txtDateOfBirth").kendoDatePicker({
            format: "dd-MMM-yyyy"
        });
    },

    PrintEmployeeReport: function () {


        var jsonParam = "";

        var url = "../Employees/GetEmployeeReport";

        AjaxManager.SendJson2(url, jsonParam, onSuccess, onFailed);

        function onSuccess(jsonData) {

            if (jsonData == "Success") {
                window.open('../Reports/LapsRepot.aspx', '_blank');
            }
        }
        function onFailed(error) {

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

        EmployeeEducationHelper.ClearEducationGrid();
    },
};