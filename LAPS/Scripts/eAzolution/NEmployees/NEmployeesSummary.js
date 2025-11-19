var EmployeeSummaryManager = {

    gridDataSource: function () {
        var gridData = new kendo.data.DataSource({
            type: 'json',
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 8,
            transport: {
                read: {
                    url: '../Employees/EmployeeGrid/',
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: {
                Model: {
                    fields:
                    {
                        DateOfBirth:
                        {
                            type: "date"
                        },
                    },
                },
                data: "Items", total: "TotalCount"
            }
        });
        return gridData;
    },

    clickDeleteButton: function () {
        var gridData = $("#employeeSummaryDiv").data("kendoGrid");
        var selectedData = gridData.dataItem(gridData.select());
        if (selectedData != null) {
            EmployeeSummaryManager.Delete(selectedData.EmployeeID);
        }
    },

    Delete: function (id) {
        var jsonParam = 'id:' + id;
        var serviceUrl = "../Employees/DeleteEmployee";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);

        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Employee Deleted Successfully',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'OK',
                            onClick: function ($notify) {
                                $notify.close();
                                $("#employeeSummaryDiv").data("kendoGrid").dataSource.read();
                                StudentDetailsHelper.ClearFrom();
                            }
                        }
                    ]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'OK',
                            onClick: function ($notify) {
                                $notify.close();
                            }
                        }
                    ])
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
    }
};

var EmployeeSummaryHelper = {

    GenerateEmployeeGrid: function () {
        $("#employeeSummaryDiv").kendoGrid({

            dataSource: EmployeeSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 760,
            xweight: 550,
            filterable: true,
            sortable: true,
            columns: EmployeeSummaryHelper.GenerateEmployeeColumn(),
            editable: false,
            navigatable: true,
            selectable: "row"
        })
    },

    GenerateEmployeeColumn: function () {
        return columns = [
            { field: "EmployeeID", title: "Employee ID", hidden: true, width: 60 },
            { field: "FirstName", title: "First Name", width: 85 },
            { field: "LastName", title: "Last Name", width: 85 },
            { field: "DateOfBirth", title: "DOB", width: 95, template: "#=kendo.toString(kendo.parseDate(DateOfBirth,'dd MMMM yyyy'),'dd MMMM yyyy') == '01 January 0001' ? '' : kendo.toString(kendo.parseDate(DateOfBirth,'dd-MMM-yyyy'),'dd-MMM-yyyy')#" },
            { field: "EGender", title: "Gender", width: 60, sortable: false },
            { field: "Email", title: "Email", width: 100 },
            { field: "MobileNo", title: "Mobile", width: 95 },
            { field: "CityName", title: "City", width: 85 },
            { field: "Active", title: "Active", width: 75, sortable: false, },
            { field: "Edit", title: "Edit", filterable: false, width: 55, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="EmployeeSummaryHelper.clickEditButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false },
            { field: "Delete", title: "Delete", filterable: false, width: 55, template: '<button type="button" class="k-button" value="Delete" id="btnDelete" onClick="EmployeeSummaryManager.clickDeleteButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false },
        ];
    },

    clickEditButton: function () {
        $("#btnSave").text("Update");
        $("#btnClearAll").text("Clear All");
        var gridData = $("#employeeSummaryDiv").data("kendoGrid");
        var selectedData = gridData.dataItem(gridData.select());
        $("#hdnEmployeeID").val(selectedData.EmployeeID);
        $("#txtFirstName").val(selectedData.FirstName);
        $("#txtLastName").val(selectedData.LastName);
        $("#txtDateOfBirth").data("kendoDatePicker").value(selectedData.DateOfBirth);
        if (selectedData.Gender == 0) {
            $("#rdMale").prop("checked", true);
        }
        else {
            $("#rdFemale").prop("checked", true);
        }
        $("#txtEmail").val(selectedData.Email);
        $("#txtMobileNo").val(selectedData.MobileNo);
        $("#city").data("kendoComboBox").value(selectedData.CityID);
        if (selectedData.Is_Active == 1) {
            $("#chkIs_Active").prop("checked", true);
        }
        else {
            $("#chkIs_Active").prop("checked", false);
        }

        // Load Employee Education
        EmployeeEducationManager.LoadEmployeeEducation(selectedData.EmployeeID);
    },
};