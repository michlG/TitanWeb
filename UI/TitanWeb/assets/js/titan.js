var filterMode = "";

function loadPortfolioList()
{
    $.ajax({
        type: 'GET',
        url:"../../Titan/PortfolioCollection/MasterCollection.json?tmp="+new Date().getTime(),
        cache:false,
        success: function(jsonObject, textStatus, request){
            var eTag = request.getResponseHeader("ETag");
            if(eTag == null)
                eTag = "DefaultUndefined";
            jsonObject["ETag"] = eTag;
            dust.render("portfolioListTemplate.dust", jsonObject, function (err, out) {
                $("#portfolioListPlaceHolder").html(out);
            });
        }
    });
}

function loadStockCompaniesFromPortfolio(portfolioId, name)
{
    $.ajax({
        type: 'GET',
        url:"../../Titan/Portfolio/" + portfolioId + ".json?tmp="+new Date().getTime(),
        cache:false,
        success: function(jsonObject, textStatus, request){
            window.location.hash = portfolioId;
            jsonObject = jsonObject["StockCompanies"];
            var eTag = request.getResponseHeader("ETag");
            if(eTag == null)
                eTag = "DefaultUndefined";
            jsonObject["ETag"] = eTag;
            dust.render("stockCompanyTemplate.dust", jsonObject, function (err, out) {
                var titleString = "Stocks from portfolio: " + name;
                titleString += "<input type=\"hidden\" id=\"portfolioId\" value=\"" + portfolioId + "\"/>";
                titleString += "<input type=\"hidden\" id=\"portfolioName\" value=\"" + name + "\"/>";
                titleString += "<button style=\"margin: 2px\" onclick=\"renamePortfolio('"+name+"')\">Rename</button>";
                titleString += "<button style=\"margin: 2px\" onclick=\"deletePortfolio()\">Delete</button>";
                titleString += "<button style=\"margin: 2px\" onclick=\"showEditPortfolioPane()\">Edit Portfolio</button>";
                $("#stockCompaniesTitlePlaceHolder").html(titleString);
                $("#stockCompaniesPlaceHolder").html(out);
            });
        }
    });
}

function loadAllStockCompanies(){
    $.ajax({
        type: 'GET',
        url:"../../Titan/StockCompanyCollection/MasterCollection.json?tmp="+new Date().getTime(),
        cache:false,
        success: function(jsonObject, textStatus, request){
            var eTag = request.getResponseHeader("ETag");
            if(eTag == null)
                eTag = "DefaultUndefined";
            jsonObject["ETag"] = eTag;
            jsonObject["CollectionContent"] = jQuery.grep(jsonObject["CollectionContent"], function( a ) {
                if(filterMode == null || filterMode == "" || filterMode=="all")
                    return true;
                if(filterMode == "Favourites")
                    return a["IsFavourite"] == true;
                if(filterMode == "Ascending")
                    return a["Change"] > 0;
                if(filterMode == "Descending")
                    return a["Change"] < 0;
            });
            var coll = jsonObject["CollectionContent"];
            for(var i = 0; i < coll.length; i++)
            {
                if(coll[i]["CompanyName"].length > 26)
                    coll[i]["CompanyName"] = coll[i]["CompanyName"].substring(0,26).trim()+"..";
            }
            dust.render("stockCompanyTemplate.dust", jsonObject, function (err, out) {
                $("#stockCompaniesTitlePlaceHolder").html("All stocks");
                $("#stockCompaniesPlaceHolder").html(out);
            });
        }
    });
}

dust.helpers.formatDouble = function (chunk, context, bodies, params) {
    var value = dust.helpers.tap(params.value, chunk, context);
    return chunk.write(Math.round(value*100)/100);
};

function showStockCompanyDetails(id)
{
    window.location.hash = id;
    $.get("stockCompanyDetailPane.html", function( content ) {
        var overlay = $("#overlayPanel");
        overlay.addClass("overlay");
        overlay.html(content);
    }, 'html');
}

function showEditPortfolioPane()
{
    $.get("editPortfolioPane.html", function( content ) {
        var overlay = $("#overlayPanel");
        overlay.addClass("overlay");
        overlay.html(content);
    }, 'html');
}

function hideDetailPane()
{
    var overlay = $("#overlayPanel");
    overlay.removeClass("overlay");
    overlay.html("");
    var portfolioId=$("#portfolioId").val();
    if(portfolioId == null || portfolioId == "")
        loadAllStockCompanies();
    else
        loadStockCompaniesFromPortfolio(portfolioId, $("#portfolioName").val());
}

function setIsFavouriteStatus(id, isFavourite)
{
    var fd = new FormData();
    fd.append('ExecuteOperation','SetIsFavouriteStatus');
    fd.append('Id', id );
    if(isFavourite == 'true')
        isFavourite = false;
    else
        isFavourite = true;
    fd.append('IsFavourite', isFavourite);
    showLoading();
    $.ajax({
        action: '/',
        data: fd,
        cache:false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            setTimeout(function(){
                hideDetailPane();
                showStockCompanyDetails(window.location.hash.substring(1));
                hideLoading();
            }, 500);
        }
    });
}

function setAlarmPrice(id)
{
    var alarmPrice = $("#AlarmPrice").val();
    var fd = new FormData();
    fd.append('ExecuteOperation','SetAlarmPrice');
    fd.append('Id', id);
    fd.append('AlarmPrice', alarmPrice);
    showLoading();
    $.ajax({
        data: fd,
        cache:false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            setTimeout(function(){
                hideDetailPane();
                showStockCompanyDetails(window.location.hash.substring(1));
                hideLoading();
            }, 500);
        }
    });
}

function addNewPortfolio()
{
    var name = prompt("Please enter the name of the portfolio","");
    if(name == null || name == "")
        return;

    var fd = new FormData();
    fd.append('ExecuteOperation','AddOrUpdatePortfolio');
    fd.append('Id', '' );
    fd.append('Name', name);
    showLoading();
    $.ajax({
        data: fd,
        cache:false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            setTimeout(function(){
                loadPortfolioList();
                hideLoading();
            }, 500);
        }
    });
}

function renamePortfolio(name)
{
    var newName = prompt("Please enter the new name of the portfolio",name);
    if(newName == null || newName == "")
        return;
    var fd = new FormData();
    fd.append('ExecuteOperation','AddOrUpdatePortfolio');
    fd.append('Id', window.location.hash.substring(1));
    fd.append('Name', newName);
    showLoading();
    $.ajax({
        data: fd,
        cache:false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            setTimeout(function(){
                loadPortfolioList();
                loadStockCompaniesFromPortfolio(window.location.hash.substring(1), newName);
                hideLoading();
            }, 500);
        }
    });
}

function deletePortfolio()
{
    if(!confirm("Are you sure that you want to delete the selected portfolio?"))
        return;
    var fd = new FormData();
    fd.append('ExecuteOperation','DeletePortfolio');
    fd.append('Id', window.location.hash.substring(1));
    showLoading();
    $.ajax({
        data: fd,
        cache:false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            setTimeout(function(){
                loadPortfolioList();
                loadAllStockCompanies();
                hideLoading();
            }, 500);
        }
    });
}

function addStockCompanyToPortfolioClick(){
    var stockCompanyId = $("#stockCompanySelectionBox").val();
    var fd = new FormData();
    fd.append('ExecuteOperation','AddStockCompanyToPortfolio');
    fd.append('Id', window.location.hash.substring(1));
    fd.append('StockCompanyId', stockCompanyId);
    showLoading();
    $.ajax({
        data: fd,
        cache:false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            setTimeout(function(){
                loadStockCompaniesFromPortfolio(window.location.hash.substring(1), $('#portfolioName').val());
                hideLoading();
            }, 500);
        }
    });
}

function removeStockCompanyFromPortfolioClick(stockCompanyId)
{
    var fd = new FormData();
    fd.append('ExecuteOperation','RemoveStockCompanyFromPortfolio');
    fd.append('Id', window.location.hash.substring(1));
    fd.append('StockCompanyId', stockCompanyId);
    showLoading();
    $.ajax({
        data: fd,
        cache:false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            setTimeout(function(){
                showEditPortfolioPane();
                hideLoading();
            }, 500);
        }
    });
}

function setNewFilter(filter)
{
    filterMode = filter;
    loadAllStockCompanies();
}

var _lastOverlayCode;
function showLoading()
{
    _lastOverlayCode = $('#overlayPanel').html();
    $('#overlayPanel').html('<div style="width: 200px; margin-left: auto; margin-right: auto; margin-top:50px;"><img src="../assets/metroui/images/preloader-w8-cycle-black.gif" width="200px" height="200px" /></div>');
    $('#overlayPanel').addClass("overlay");
}

function hideLoading()
{
    $('#overlayPanel').html(_lastOverlayCode);
    if(_lastOverlayCode.length < 10)
        $('#overlayPanel').removeClass("overlay");
}