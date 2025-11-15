var PassengerSummaryManager = {
    gridDataSource: function () {

        var gridData = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 5,
            transport: {
                read: {
                    url: '../Passenger/PassengerGrid/',
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
                            type:"date"
                        },
                    },
            },
                data: "Items", total: "TotalCount"
            }

        });
        return gridData;
    }
};

var PassengerSummaryHelper = {
    GeneratePassengerSummaryGrid: function () {
        $("#psnSummaryDiv").kendoGrid({
            
            dataSource: PassengerSummaryManager.gridDataSource(),
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
            columns: PassengerSummaryHelper.GeneratePassengerColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        })
    },

    GeneratePassengerColumns: function () {
        return columns = [
            { field: "PassengerID", title: "Passenger ID", hidden: true, width: 60 },
            { field: "PassengerName", title: "Passenger", width: 85 },
            { field: "DateOfBirth", title: "DOB", width: 90, template: "#=kendo.toString(kendo.parseDate(DateOfBirth,'dd MMMM yyyy'),'dd MMMM yyyy') == '01 January 0001' ? '' : kendo.toString(kendo.parseDate(DateOfBirth,'dd-MMM-yyyy'),'dd-MMM-yyyy')#" },
            { field: "Gender", title: "Gender", width: 60, sortable: false },
            { field: "Email", title: "Email", width: 100 },
            { field: "Phone", title: "Phone", width: 90 },
            { field: "TrainName", title: "Train", width: 100 },
            { field: "RouteName", title: "Route", width: 100 },
            { field: "ClassName", title: "Class", width: 65 },
            { field: "Pay", title: "Pay", width: 55, sortable: false, },
            { field: "Edit", title: "Edit", filterable: false, width: 55, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="PassengerSummaryHelper.clickEventForEditButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false },
            { field: "Delete", title: "Delete", filterable: false, width: 55, template: '<button type="button" class="k-button" value="Delete" id="btnDelete" onClick="PassengerSummaryHelper.clickEventForDeleteButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false },
        ];
    },


    clickEventForEditButton: function () {
        $("#btnSave").text("Update");
        var gridData = $("#psnSummaryDiv").data("kendoGrid");
        var selectedData = gridData.dataItem(gridData.select());
        $("#hdnPassengerID").val(selectedData.PassengerID);
        $("#txtPassengerName").val(selectedData.PassengerName);
        $("#txtDateOfBirth").data("kendoDatePicker").value(selectedData.DateOfBirth);
        if (selectedData.PGender == 0) {
            $("#rdMale").prop("checked", true);
        }
        else {
            $("#rdFemale").prop("checked", true);
        }
        $("#txtEmail").val(selectedData.Email);
        $("#txtPhone").val(selectedData.Phone);
        $("#cmbTrain").data("kendoComboBox").value(selectedData.TrainID);
        $("#cmbRoute").data("kendoComboBox").value(selectedData.RouteID);
        $("#cmbClass").data("kendoComboBox").value(selectedData.ClassID);
        if (selectedData.Is_Pay == 1)
            $("#chkIs_Pay").prop("checked", true);
        else
            $("#chkIs_Pay").prop("checked", false);
    },


    clickEventForDeleteButton: function () {
        var gridData = $("#psnSummaryDiv").data("kendoGrid");
        var selectedData = gridData.dataItem(gridData.select());
        if (selectedData != null) {
            PassengerSummaryHelper.Delete(selectedData.PassengerID);
        }
    },

    Delete: function (id) {
        var jsonParam = 'id:' + id;
        var serviceUrl = "../Passenger/DeletePassenger/";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);

        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Passenger Deleted Successfully',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'Ok',
                            onClick: function ($noty) {
                                $noty.close();
                                $("#psnSummaryDiv").data("kendoGrid").dataSource.read();
                                PassengerDetailsHelper.ClearPassengerForm();
                            }
                        }
                    ]);
            } else {
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
    }
};