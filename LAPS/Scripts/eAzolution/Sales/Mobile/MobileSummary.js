var MobileSummaryManager = {
    gridDataSource: function () {

        var gridData = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../Mobile/MobileInfoGrid/',
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: { data: "Items", total: "TotalCount" }
        });
        return gridData;
    }
};
var MobileSummaryHelper = {
    GenerateMobileSummaryGrid: function () {

        $("#mblSummaryDiv").kendoGrid({

            dataSource: MobileSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 450,
            filterable: true,
            sortable: true,
            columns: MobileSummaryHelper.GenerateMobileColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        })

    },

    GenerateMobileColumns: function () {
        return columns = [


            { field: "MobileId", title: "MobileId", hidden: true, width: 100 },
            { field: "ModelName", title: "ModelName", width: 100 },
            { field: "BrandId", title: "Brand", width: 100 },
            { field: "ColorId", title: "Color", width: 100 },
            { field: "Price", title: "Price", width: 100, sortable: true },
            { field: "Is5G", title: "Is5G", width: 60, sortable: false },
            { field: "IsSmart", title: "IsSmart", width: 60, sortable: false, },
            { field: "Edit", title: "Edit", filterable: false, width: 50, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="MobileSummaryHelper.clickEventForEditButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false },
            { field: "Delete", title: "Delete", filterable: false, width: 50, template: '<button type="button" class="k-button" value="Delete" id="btnDelete"  ><span class="k-icon k-i-pencil"></span></button>', sortable: false },

        ];
    },

    clickEventForEditButton: function () {
        var gridData = $("#mblSummaryDiv").data("kendoGrid");
        var selectedData = gridData.dataItem(gridData.select());

        $("#hdnMobileId").val(selectedData.MobileId);

        $("#txtModelName").val(selectedData.ModelName);
        $("#cmbBrand").data("kendoComboBox").value(selectedData.BrandId);
        $("#cmbColor").data("kendoComboBox").value(selectedData.ColorId);
        $("#txtPrice").val(selectedData.Price);
        if (selectedData.IsSmart == 1)
            $("#chkIsSmart").prop("checked", true);
        else
            $("#chkIsSmart").prop("checked", false);

        if (selectedData.Is5G == 1) {
            $("#rd5G").prop("checked", true);
        }
        else {
            $("#rdnot5G").prop("checked", true);

        }

    }

};