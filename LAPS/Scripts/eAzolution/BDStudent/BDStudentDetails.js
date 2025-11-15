
var StudentDetailsManeger = {

    PopulateSubjectDDL: function () {
        var SubjectObj = new Object();
        SubjectObj = AjaxManager.GetDataSource("../BDStudent/PopulateSubjectDDL");

        $("#ddlSubject").kendoComboBox({
            placeholder: "Select Subject",
            dataValueField: "SubjectID",
            dataTextField: "SubjectName",
            dataSource: SubjectObj,
            filter: "contains",
            suggest: true,
        });
    },

    SaveStudent: function () {
        var object = StudentDetailsHelper.CreateStudentFields();
        StudentDetailsHelper.ClearFrom();

        var obj = JSON.stringify(object);
        var jsonParam = 'student:' + obj;
        var serviceUrl = "../BDStudent/SaveStudent";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);


        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Student Saved Successfully',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'OK',
                            onClick: function ($noty) {
                                $noty.close();
                                $("#studentSummaryDiv").data("kendoGrid").dataSource.read();
                            }
                        }
                    ]);
            }
            else if (jsonData == "Update") {
                    AjaxManager.MsgBox('success', 'center', 'Success:', 'Student Updated Successfully',
                        [
                            {
                                addClass: 'btn btn-primary',
                                text: 'OK',
                                onClick: function ($noty) {
                                    $noty.close();
                                    $("#studentSummaryDiv").data("kendoGrid").dataSource.read();
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

var StudentDetailsHelper = {

    CreateStudentFields: function () {
        var obj = new Object();

        obj.StudentID = $("#hdnStudentID").val();
        obj.StudentFirstName = $('#txtStudentFirstName').val();
        obj.StudentLastName = $('#txtStudentLastName').val();
        obj.DateOfBirth = $('#txtDateOfBirth').val();
        obj.SudentGender = $('input[name = "Gender"]:checked').val();
        obj.Email = $("#txtEmail").val();
        obj.MobileNo = $('#txtMobileNo').val();
        obj.SubjectID = $('#ddlSubject').val();
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
        $("#hdnStudentID").val(0);
        $("#txtStudentFirstName").val("");
        $("#txtStudentLastName").val("");
        $("#txtDateOfBirth").val("");
        $('input[name=Gender]').attr('checked', false);
        $("#txtEmail").val("");
        $("#txtMobileNo").val("");
        $("#ddlSubject").data("kendoComboBox").value("");
        $("#chkIs_Active").removeAttr('checked', 'checked');
    },
};