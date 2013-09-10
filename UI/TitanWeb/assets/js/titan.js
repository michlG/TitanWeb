function loadPortfolioList()
{
    $.ajax({
        type: 'GET',
        url:"../../Titan/PortfolioCollection/default.json",
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
        url:"../../Titan/Portfolio/" + portfolioId + ".json",
        success: function(jsonObject, textStatus, request){
            var eTag = request.getResponseHeader("ETag");
            if(eTag == null)
                eTag = "DefaultUndefined";
            jsonObject["ETag"] = eTag;
            dust.render("stockCompanyTemplate.dust", jsonObject, function (err, out) {
                var titleString = "Stocks from portfolio: " + name;
                titleString += "<button style=\"margin: 2px\" onclick=\"renamePortfolio('"+portfolioId+"','"+name+"','" + jsonObject["RelativeLocation"]+":"+jsonObject["ETag"] + "')\">Rename</button>";
                titleString += "<button style=\"margin: 2px\" onclick=\"deletePortfolio('"+portfolioId+"','" + jsonObject["RelativeLocation"]+":"+jsonObject["ETag"] + "')\">Delete</button>";
                titleString += "<button style=\"margin: 2px\" onclick=\"addStockCompanyToPortfolio('"+portfolioId+"','"+ jsonObject["RelativeLocation"]+":"+jsonObject["ETag"] +"')\">Add new stock company</button>";
                $("#stockCompaniesTitlePlaceHolder").html(titleString);
                $("#stockCompaniesPlaceHolder").html(out);
            });
        }
    });
}

function loadAllStockCompanies(){
    $.ajax({
        type: 'GET',
        url:"../../Titan/StockCompanyCollection/default.json",
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

function hideDetailPane()
{
    var overlay = $("#overlayPanel");
    overlay.removeClass("overlay");
    overlay.html("");
}

function setIsFavouriteStatus(id, isFavourite, boundObject)
{
    var fd = new FormData();
    fd.append('RootSourceAction','SetIsFavouriteStatus');
    fd.append('BoundObject',boundObject);
    fd.append('Id', id );
    fd.append('IsFavourite', isFavourite);
    $.ajax({
        action: '/',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            alert(data);
        }
    });
}

function setAlarmPrice(id, boundObject)
{
    var alarmPrice = $("#AlarmPrice").val();
    var fd = new FormData();
    fd.append('RootSourceAction','SetAlarmPrice');
    fd.append('BoundObject',boundObject);
    fd.append('Id', id);
    fd.append('AlarmPrice', alarmPrice);
    $.ajax({
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            alert(data);
        }
    });
}

function addNewPortfolio()
{
    var name = prompt("Please enter the name of the portfolio","");
    if(name == null || name == "")
        return;

    var fd = new FormData();
    fd.append('RootSourceAction','AddOrUpdatePortfolio')
    fd.append('Id', '' );
    fd.append('Name', name);
    $.ajax({
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            alert(data);
        }
    });
}

function renamePortfolio(id, name, boundObject)
{
    var newName = prompt("Please enter the new name of the portfolio",name);
    if(newName == null || newName == "")
        return;
    var fd = new FormData();
    fd.append('RootSourceAction','AddOrUpdatePortfolio');
    fd.append('BoundObject', boundObject);
    fd.append( 'Id', id );
    fd.append('Name', newName);
    $.ajax({
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            alert(data);
        }
    });
}

function deletePortfolio(id, boundObject)
{
    if(!confirm("Are you sure that you want to delete the selected portfolio?"))
        return;
    var fd = new FormData();
    fd.append('RootSourceAction','DeletePortfolio');
    fd.append('BoundObject',boundObject);
    fd.append('Id', id );
    $.ajax({
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            loadPortfolioList(id);
            loadAllStockCompanies();
        }
    });
}

function addStockCompanyToPortfolio(id, boundObject)
{
    var symbol = prompt("Please enter the symbol of the stock company you want to add","MSFT");
    if(symbol == null || symbol == "")
        return;
    var fd = new FormData();
    fd.append('RootSourceAction','AddStockCompanyToPortfolio');
    fd.append('BoundObject', boundObject);
    fd.append('Id', id );
    fd.append('Symbol', symbol);
    $.ajax({
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            loadStockCompaniesFromPortfolio(id);
        }
    });
}