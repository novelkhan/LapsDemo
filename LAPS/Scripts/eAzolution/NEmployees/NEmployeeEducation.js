var employeeEducationArray = [];
var removeEducationArray = [];

var EmployeeEducationManager = {

    GenerateEmployeeEducationGrid: function () {
        $("#gridEmployeeEducation").kendoGrid({
            dataSource: {
                data: [],
                schema: {
                    model: {
                        fields: {
                            EducationID: { type: "number" },
                            DegreeName: { type: "string" },
                            InstituteName: { type: "string" },
                            PassingYear: { type: "number" },
                            Result: { type: "string" }
                        }
                    }
                }
            },
            pageable: false,
            toolbar: [{ name: "create", text: "Add New Education" }],
            columns: [
                { field: "EducationID", title: "Education ID", hidden: true, width: 60 },
                { field: "DegreeName", title: "Degree Name", width: 100 },
                { field: "InstituteName", title: "Institute Name", width: 120 },
                { field: "PassingYear", title: "Passing Year", width: 80 },
                { field: "Result", title: "Result", width: 80 },
                {
                    field: "Delete",
                    title: "Delete",
                    filterable: false,
                    width: 55,
                    template: '<button type="button" class="k-button" value="Delete" id="btnDelete" onClick="EmployeeEducationHelper.deleteEducationRow()" ><span class="k-icon k-i-close"></span></button>',
                    sortable: false
                }
            ],
            editable: {
                confirmation: false
            },
            selectable: true
        });
    },

    LoadEmployeeEducation: function (employeeId) {
        if (employeeId > 0) {
            var jsonParam = "employeeId=" + employeeId;
            var serviceUrl = "../Employees/GetEmployeeEducationByEmployeeID";
            AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

            function onSuccess(jsonData) {
                var grid = $("#gridEmployeeEducation").data("kendoGrid");
                grid.dataSource.data(jsonData);
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
    }
};

var EmployeeEducationHelper = {

    CreateEmployeeEducationList: function () {
        employeeEducationArray = [];

        var gridEducation = $("#gridEmployeeEducation").data("kendoGrid");
        var gridData = gridEducation.dataSource.data();

        for (var i = 0; i < gridData.length; i++) {
            var education = gridData[i];

            var objEducation = new Object();
            objEducation.EducationID = education.EducationID == undefined ? 0 : education.EducationID;
            objEducation.EmployeeID = $("#hdnEmployeeID").val();
            objEducation.DegreeName = education.DegreeName;
            objEducation.InstituteName = education.InstituteName;
            objEducation.PassingYear = education.PassingYear;
            objEducation.Result = education.Result;

            employeeEducationArray.push(objEducation);
        }
        return employeeEducationArray;
    },

    deleteEducationRow: function () {
        var gridEducation = $("#gridEmployeeEducation").data("kendoGrid");
        var selectedItem = gridEducation.dataItem(gridEducation.select());

        if (selectedItem.EducationID != undefined && selectedItem.EducationID > 0) {
            removeEducationArray.push(selectedItem.EducationID);
        }

        gridEducation.dataSource.remove(selectedItem);

        return removeEducationArray;
    },

    ClearEducationGrid: function () {
        $("#gridEmployeeEducation").data("kendoGrid").dataSource.data([]);
        employeeEducationArray = [];
        removeEducationArray = [];
    }
};