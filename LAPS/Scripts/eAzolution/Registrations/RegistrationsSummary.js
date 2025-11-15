var RegistrationsSummaryManager = {

    gridDataSource: function () {
        //debugger;
        var gridData = new kendo.data.DataSource({
            type: 'json',
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 8,
            transport: {
                read: {
                    url: '../Registrations/CustomerGrid/',
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
                        Cus_DOB:
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
        var gridData = $("#RegistrationsSummaryDiv").data("kendoGrid");
        var selectedData = gridData.dataItem(gridData.select());
        if (selectedData != null) {
            RegistrationsSummaryManager.Delete(selectedData.Cus_ID);
        }
    },

    Delete: function (id) {
        var jsonParam = 'id:' + id;
        var serviceUrl = "../Registrations/DeleteCustomer";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);

        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Customer Deleted Successfully',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'OK',
                            onClick: function ($notify) {
                                $notify.close();
                                $("#RegistrationsSummaryDiv").data("kendoGrid").dataSource.read();
                                RegistrationsDetailsHelper.ClearForm();
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

var RegistrationsSummaryHelper = {

    GenerateCustomerGrid: function () {
        debugger;
        $("#RegistrationsSummaryDiv").kendoGrid({
           
            dataSource: RegistrationsSummaryManager.gridDataSource(),
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
            columns: RegistrationsSummaryHelper.GenerateCustomerColumn(),
            editable: false,
            navigatable: true,
            selectable: "row"
        })
    },

    GenerateCustomerColumn: function () {
        return columns = [
            { field: "Cus_ID", title: "ID", hidden: true, width: 60 },
            { field: "Cus_Name", title: "Name", width: 85 },
            { field: "Cus_Email", title: "Email", width: 85 },
            { field: "Cus_Mobile", title: "Mobile", width: 85 },
            { field: "Gender", title: "Gender", width: 60, sortable: false },
            { field: "Cus_DOB", title: "D_O_B", width: 75, template: "#=kendo.toString(kendo.parseDate(Cus_DOB,'dd MMMM yyyy'),'dd MMMM yyyy') == '01 January 0001' ? '' : kendo.toString(kendo.parseDate(Cus_DOB,'dd-MMM-yyyy'),'dd-MMM-yyyy')#" },
            { field: "Cus_Type_Name", title: "Cus_Type", width: 80 },
            { field: "Cus_Password", title: "Password", width: 75 },
            /*{ field: "Cus_RePassword", title: "Re-Password", width: 95 },*/
            { field: "Reg_Date", title: "Reg Date", width: 75, template: "#=kendo.toString(kendo.parseDate(Reg_Date,'dd MMMM yyyy'),'dd MMMM yyyy') == '01 January 0001' ? '' : kendo.toString(kendo.parseDate(Reg_Date,'dd-MMM-yyyy'),'dd-MMM-yyyy')#" },
            { field: "Active", title: "Is Active?", width: 65, sortable: false, },
            { field: "Edit", title: "Edit", filterable: false, width: 55, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="RegistrationsSummaryHelper.clickEditButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false },
            { field: "Delete", title: "Delete", filterable: false, width: 55, template: '<button type="button" class="k-button" value="Delete" id="btnDelete" onClick="RegistrationsSummaryManager.clickDeleteButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false },
        ];
    },

    clickEditButton: function () {
        $("#btnSave").text("Update");
        $("#btnClearAll").text("Clear All");
        var gridData = $("#RegistrationsSummaryDiv").data("kendoGrid");
        var selectedData = gridData.dataItem(gridData.select());
        $("#hdnCustomerID").val(selectedData.Cus_ID);
        $("#txtCus_Name").val(selectedData.Cus_Name);
        $("#txtCus_Email").val(selectedData.Cus_Email);
        $("#txtCus_Mobile").val(selectedData.Cus_Mobile);
        if (selectedData.Cus_Gender == 1) {
            $("#rdMale").prop("checked", true);
        }
        else {
            $("#rdFemale").prop("checked", true);
        }
        $("#txtCus_DOB").data("kendoDatePicker").value(selectedData.Cus_DOB);
        $("#ddlCus_Type").data("kendoComboBox").value(selectedData.Cus_Type);
        $("#txtCus_Password").val(selectedData.Cus_Password);
        $("#txtCus_RePassword").val(selectedData.Cus_RePassword);
        if (selectedData.Is_Active == 1) {
            $("#chkIs_Active").prop("checked", true);
        }
        else {
            $("#chkIs_Active").prop("checked", false);
        }
    },
};