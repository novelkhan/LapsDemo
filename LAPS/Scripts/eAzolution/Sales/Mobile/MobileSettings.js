$(document).ready(function(){
    MobileDetailsHelper.PopulateColorCombo();
    MobileDetailsHelper.PopulateBrandCombo();

    $("#btnSave").click(function () {
        MobileDetailsManager.SaveMobileInfo();
    });

   /* $("#btnClearAll").click(function () {
        ProductsDetailsHelper.clearProductsForm();
    });
    */

    //$("#btnEdit").click(Function(){
    //MobileDetailsManager.EditMobileInfo();
    //});

    MobileSummaryHelper.GenerateMobileSummaryGrid();
    //ProductModelDetailsHelper.GenerateProductModelGrid(0);

});