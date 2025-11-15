var MobileDetailsManager = {
    SaveMobileInfo: function () {

        var object = MobileDetailsHelper.CreateObjectFromFields();

        var obj = JSON.stringify(object);
        var jsonParam = 'mobile:' + obj;
        var serviceUrl = "../Mobile/SaveMobileInfo/";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);

        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Mobile Info Save Successfully',
                    [
                        {
                            addClass: 'btn btn-primary',
                            text: 'Ok',
                            onClick: function ($noty) {
                                $noty.close();
                                $("#mblSummaryDiv").data("kendoGrid").dataSource.read();
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
var MobileDetailsHelper = {
    PopulateColorCombo: function () {
        var objColors = new Object();
        objColors = AjaxManager.GetDataSource("../Mobile/PopulateColorCombo");

        $("#cmbColor").kendoComboBox({
            placeholder: "Select Color",
            dataValueField: "ColorId",
            dataTextField: "Color",
            dataSource: objColors,
            filter: "contains",
            suggest: true,

        })
    },
    //For Brand Combo
    PopulateBrandCombo: function () {
        var objBrands = new Object();
        objBrands = AjaxManager.GetDataSource("../Mobile/PopulateBrandCombo");

        $("#cmbBrand").kendoComboBox({
            placeholder: "Select Brand",
            dataValueField: "BrandId",
            dataTextField: "Brand",
            dataSource: objBrands,
            filter: "contains",
            suggest: true,
        })
    },

    CreateObjectFromFields: function () {
        debugger;
        var object = new Object();

        object.MobileId = $("#hdnMobileId").val();
        object.ModelName = $('#txtModelName').val();
        object.BrandId = $('#cmbBrand').val();
        object.ColorId = $('#cmbColor').val();
        object.Price = $('#txtPrice').val();
        object.Is5G = $('input[name="Is5G"]:checked').val();
        object.IsSmart = $("#chkIsSmart").is(":checked") == true ? 1 : 0

        return object;
    },

    //ValidateMobileInfo: function () {
    //    var data = [];
    //    var validator = $("#MobileDetailsDiv").kendoValidator().data("kendoValidator"),
    //        status = $(".status");
    //    if (validator.validate()) {
    //        status.text("").addClass("valid");
    //        return true;
    //    }
    //    else {
    //        status.text("Opos! There is invalid data in the form.)
    //    }

    //},



    //clearMobileForm: function () {
    // $("#hdnMobileId").val("");
    // $("#txtModelName").val("");
    // $("#txtBrandId").data("kendoComboBox").val("");
    // $("#txtColorId").data("kendoComboBox").val("");
    // $("#txtMobilePrice").val("");           
    // $("#MobileModelDetailsDiv").data('kendoGrid').dataSource.data("");
    // $("#MobileDetailsDiv > form").kendoValidator();
    // $("#MobileDetailsDiv").find("span.k-tooltip-validation").hide();     
    // $('input[name="Is5G"]:checked').val();
    // $("#chkIsSmart").is(":checked") == true ? 1 : 0
    // var status = $(".status");
    // status.text("").removeClass("invalid");
};



