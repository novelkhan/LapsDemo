var StudentSummaryManager = {

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
                    url: '../BDStudent/StudentGrid/',
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
        var gridData = $("#studentSummaryDiv").data("kendoGrid");
        var selectedData = gridData.dataItem(gridData.select());
        if (selectedData != null) {
            StudentSummaryManager.Delete(selectedData.StudentID);
        }
    },

    Delete: function (id) {
        var jsonParam = 'id:' + id;
        var serviceUrl = "../BDStudent/DeleteStudent";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);

        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Student Deleted Successfully',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'OK',
                            onClick: function ($notify) {
                                $notify.close();
                                $("#studentSummaryDiv").data("kendoGrid").dataSource.read();
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

var StudentSummaryHelper = {
    
    GenerateStudentGrid: function () {
        $("#studentSummaryDiv").kendoGrid({
            
            dataSource: StudentSummaryManager.gridDataSource(),
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
            columns: StudentSummaryHelper.GenerateStudentColumn(),
            editable: false,
            navigatable: true,
            selectable: "row"
        })
    },

    GenerateStudentColumn: function () {
        return columns = [
            { field: "StudentID", title: "Student ID", hidden: true, width: 60 },
            { field: "StudentFirstName", title: "First Name", width: 85 },
            { field: "StudentLastName", title: "Last Name", width: 85 },
            { field: "DateOfBirth", title: "DOB", width: 95, template: "#=kendo.toString(kendo.parseDate(DateOfBirth,'dd MMMM yyyy'),'dd MMMM yyyy') == '01 January 0001' ? '' : kendo.toString(kendo.parseDate(DateOfBirth,'dd-MMM-yyyy'),'dd-MMM-yyyy')#" },
            { field: "Gender", title: "Gender", width: 60, sortable: false },
            { field: "Email", title: "Email", width: 100 },
            { field: "MobileNo", title: "Mobile", width: 95 },
            { field: "SubjectName", title: "Subject", width: 85 },
            { field: "Active", title: "Active", width: 75, sortable: false, },
            { field: "Edit", title: "Edit", filterable: false, width: 55, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="StudentSummaryHelper.clickEditButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false },
            { field: "Delete", title: "Delete", filterable: false, width: 55, template: '<button type="button" class="k-button" value="Delete" id="btnDelete" onClick="StudentSummaryManager.clickDeleteButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false },
        ];
    },

    clickEditButton: function () {
        $("#btnSave").text("Update");
        $("#btnClearAll").text("Clear All");
        var gridData = $("#studentSummaryDiv").data("kendoGrid");
        var selectedData = gridData.dataItem(gridData.select());
        $("#hdnStudentID").val(selectedData.StudentID);
        $("#txtStudentFirstName").val(selectedData.StudentFirstName);
        $("#txtStudentLastName").val(selectedData.StudentLastName);
        $("#txtDateOfBirth").data("kendoDatePicker").value(selectedData.DateOfBirth);
        if (selectedData.SudentGender == 0) {
            $("#rdMale").prop("checked", true);
        }
        else {
            $("#rdFemale").prop("checked", true);
        }
        $("#txtEmail").val(selectedData.Email);
        $("#txtMobileNo").val(selectedData.MobileNo);
        $("#ddlSubject").data("kendoComboBox").value(selectedData.SubjectID);
        if (selectedData.Is_Active == 1) {
            $("#chkIs_Active").prop("checked", true);
        }
        else {
            $("#chkIs_Active").prop("checked", false);
        }
    },
};