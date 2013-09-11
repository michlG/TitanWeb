function loadPortfolioList()
{
    $.ajax({
        type: 'GET',
        url:"../../Titan/PortfolioCollection/default.json?tmp="+new Date().getTime(),
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
            var eTag = request.getResponseHeader("ETag");
            if(eTag == null)
                eTag = "DefaultUndefined";
            jsonObject["ETag"] = eTag;
            dust.render("stockCompanyTemplate.dust", jsonObject, function (err, out) {
                var titleString = "Stocks from portfolio: " + name;
                titleString += "<input type=\"hidden\" id=\"portfolioId\" value=\"" + portfolioId + "\"/>";
                titleString += "<input type=\"hidden\" id=\"portfolioName\" value=\"" + name + "\"/>";
                titleString += "<button style=\"margin: 2px\" onclick=\"renamePortfolio('"+portfolioId+"','"+name+"')\">Rename</button>";
                titleString += "<button style=\"margin: 2px\" onclick=\"deletePortfolio('"+portfolioId+"')\">Delete</button>";
                titleString += "<button style=\"margin: 2px\" onclick=\"showEditPortfolioPane('"+portfolioId+"')\">Edit Portfolio</button>";
                $("#stockCompaniesTitlePlaceHolder").html(titleString);
                $("#stockCompaniesPlaceHolder").html(out);
            });
        }
    });
}

function loadAllStockCompanies(){
    $.ajax({
        type: 'GET',
        url:"../../Titan/StockCompanyCollection/default.json?tmp="+new Date().getTime(),
        cache:false,
        success: function(jsonObject, textStatus, request){
            var eTag = request.getResponseHeader("ETag");
            if(eTag == null)
                eTag = "DefaultUndefined";
            jsonObject["ETag"] = eTag;
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

function showEditPortfolioPane(id)
{
    window.location.hash = id;
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
    $.ajax({
        action: '/',
        data: fd,
        cache:false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            hideDetailPane();
            showStockCompanyDetails(window.location.hash.substring(1));
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
    $.ajax({
        data: fd,
        cache:false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            hideDetailPane();
            showStockCompanyDetails(window.location.hash.substring(1));
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
    $.ajax({
        data: fd,
        cache:false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            loadPortfolioList();
        }
    });
}

function renamePortfolio(id, name)
{
    var newName = prompt("Please enter the new name of the portfolio",name);
    if(newName == null || newName == "")
        return;
    var fd = new FormData();
    fd.append('ExecuteOperation','AddOrUpdatePortfolio');
    fd.append('Id', id );
    fd.append('Name', newName);
    $.ajax({
        data: fd,
        cache:false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            loadPortfolioList();
            loadStockCompaniesFromPortfolio(id);
        }
    });
}

function deletePortfolio(id)
{
    if(!confirm("Are you sure that you want to delete the selected portfolio?"))
        return;
    var fd = new FormData();
    fd.append('ExecuteOperation','DeletePortfolio');
    fd.append('Id', id );
    $.ajax({
        data: fd,
        cache:false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            loadPortfolioList();
            loadAllStockCompanies();
        }
    });
}

function addStockCompanyToPortfolioClick(){
    var portfolioId = window.location.hash.substring(1);
    var stockCompanyId = $("#stockCompanySelectionBox").val();
    var fd = new FormData();
    fd.append('ExecuteOperation','AddStockCompanyToPortfolio');
    fd.append('Id', portfolioId );
    fd.append('StockCompanyId', stockCompanyId);
    $.ajax({
        data: fd,
        cache:false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            loadStockCompaniesFromPortfolio(id);
        }
    });
    hideDetailPane();
}

function removeStockCompanyFromPortfolioClick(stockCompanyId)
{
    var portfolioId = window.location.hash.substring(1);
    var fd = new FormData();
    fd.append('ExecuteOperation','RemoveStockCompanyFromPortfolio');
    fd.append('Id', portfolioId );
    fd.append('StockCompanyId', stockCompanyId);
    $.ajax({
        data: fd,
        cache:false,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            showStockCompanyToPortfolioPane(portfolioId);
        }
    });
    hideDetailPane();
}