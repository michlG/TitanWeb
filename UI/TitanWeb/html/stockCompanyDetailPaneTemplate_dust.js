(function(){dust.register("stockCompanyDetailPaneTemplate.dust",body_0);function body_0(chk,ctx){return chk.write("<div style=\"width: 900px; margin-left:auto; margin-right:auto; margin-top: 10px; margin-bottom: 10px;\"><div style=\"margin-left: -50px;\"><a class=\"back-button big page-back\" style=\"float: left; margin-right: 10px; margin-bottom: 3px; margin-top: -5px;\" onclick=\"hideDetailPane()\" /><h2 style=\"font-weight: bold;\">").reference(ctx.get("Symbol"),ctx,"h").write(" - ").reference(ctx.get("CompanyName"),ctx,"h").write("</h2></div><div class=\"tiles clearfix\" style=\"clear: both;\"><div class=\"tile bg-color-blueDark\"><div class=\"tile-content\"><table style=\"border: none; height: 100%;\"><tr><td style=\"border: none; text-align: center;\"><h3>OPEN PRICE</h3></td></tr><tr><td style=\"border: none; text-align: center;\"><span class=\"bigNumbering\">").helper("formatDouble",ctx,{},{"value":body_1}).write("$</span></td></tr></table></div></div><div class=\"tile bg-color-blueDark\"><div class=\"tile-content\"><table style=\"border: none; height: 100%;\"><tr><td style=\"border: none; text-align: center;\"><h3>LOWEST PRICE</h3></td></tr><tr><td style=\"border: none; text-align: center;\"><span class=\"bigNumbering\">").helper("formatDouble",ctx,{},{"value":body_2}).write("$</span></td></tr></table></div></div><div class=\"tile bg-color-blueDark\"><div class=\"tile-content\"><table style=\"border: none; height: 100%;\"><tr><td style=\"border: none; text-align: center;\"><h3>HIGHEST PRICE</h3></td></tr><tr><td style=\"border: none; text-align: center;\"><span class=\"bigNumbering\">").helper("formatDouble",ctx,{},{"value":body_3}).write("$</span></td></tr></table></div></div><div ").helper("if",ctx,{"else":body_4,"block":body_5},{"cond":body_6}).write("><div class=\"tile-content\"><table style=\"border: none; height: 100%;\"><tr><td style=\"border: none; text-align: center;\"><h3>LAST PRICE</h3></td></tr><tr><td style=\"border: none; text-align: center;\"><span class=\"bigNumbering\">").helper("formatDouble",ctx,{},{"value":body_7}).write("$</span></td></tr></table></div></div><div ").helper("if",ctx,{"else":body_8,"block":body_9},{"cond":body_10}).write("><div class=\"tile-content\"><table style=\"border: none; height: 100%;\"><tr><td style=\"border: none; text-align: center;\"><h3>CHANGE</h3></td></tr><tr><td style=\"border: none; text-align: center;\"><span class=\"bigNumbering\">").helper("formatDouble",ctx,{},{"value":body_11}).write("$</span></td></tr></table></div></div><div ").helper("if",ctx,{"else":body_12,"block":body_13},{"cond":body_14}).write("><div class=\"tile-content\"><table style=\"border: none; height: 100%;\"><tr><td style=\"border: none; text-align: center;\"><h3>CHANGE IN PERCENT</h3></td></tr><tr><td style=\"border: none; text-align: center;\"><span class=\"bigNumbering\">").helper("formatDouble",ctx,{},{"value":body_15}).write("%</span></td></tr></table></div></div><div class=\"tile double bg-color-blueDark\"><div class=\"tile-content\"><table style=\"border: none; height: 100%;\"><tr><td style=\"border: none; text-align: center;\"><h3>VOLUME OF STOCKS</h3></td></tr><tr><td style=\"border: none; text-align: center;\"><span class=\"bigNumbering\">").helper("formatDouble",ctx,{},{"value":body_16}).write(" Units</span></td></tr></table></div></div><div ").helper("if",ctx,{"else":body_17,"block":body_18},{"cond":body_19}).write("><div class=\"tile-content\"><table style=\"border: none; height: 100%;\"><tr><td style=\"border: none; text-align: center;\"><h3>").helper("if",ctx,{"else":body_20,"block":body_21},{"cond":body_22}).write("</h3></td></tr><tr><td style=\"border: none; text-align: center;\"><button onclick=\"setIsFavouriteStatus('").reference(ctx.get("ID"),ctx,"h").write("','").reference(ctx.get("IsFavourite"),ctx,"h").write("','").reference(ctx.get("RelativeLocation"),ctx,"h").write(":").reference(ctx.get("ETag"),ctx,"h").write("')\">Change</button></td></tr></table></div></div><div ").helper("if",ctx,{"else":body_23,"block":body_27},{"cond":body_28}).write("><div class=\"tile-content\"><form method=\"post\"><input type=\"hidden\" name=\"ID\" value=\"").reference(ctx.get("ID"),ctx,"h").write("\" /><input type=\"hidden\" name=\"BoundObject\" value=\"").reference(ctx.get("RelativeLocation"),ctx,"h").write(":").reference(ctx.get("MasterETag"),ctx,"h").write("\" /><table style=\"border: none; height: 100%;\"><tr><td style=\"border: none; text-align: center;\" colspan=\"2\"><h3>").helper("if",ctx,{"else":body_29,"block":body_30},{"cond":body_31}).write("</h3></td></tr><tr><td style=\"border: none;\"><input id=\"AlarmPrice\" name=\"AlarmPrice\" value=\"").reference(ctx.get("PriceAlarm"),ctx,"h").write("\" type=\"number\" style=\"width: 100px; height: 40px; font-size: 20px; color: black;\"/></td></tr><tr><td style=\"border: none;\"><button onclick=\"setAlarmPrice('").reference(ctx.get("ID"),ctx,"h").write("','").reference(ctx.get("RelativeLocation"),ctx,"h").write(":").reference(ctx.get("ETag"),ctx,"h").write("')\">Set</button></td></tr></table></form></div></div></div><div> <!-- Days Chart --><h3>Last 30 days</h3><div class=\"k-content\" style=\"margin: 10px;\"><div class=\"chart-wrapper\"><div id=\"chartDays\" style=\"height: 200px; width: 100%;\"></div></div></div></div><div> <!-- Months Chart --><h3>Last 12 months</h3><div class=\"k-content\" style=\"margin: 10px;\"><div class=\"chart-wrapper\"><div id=\"chartMonths\" style=\"height: 200px; width: 100%;\"></div></div></div></div><div> <!-- Years Chart --><h3>Last 10 years</h3><div class=\"k-content\" style=\"margin: 10px;\"><div class=\"chart-wrapper\"><div id=\"chartYears\" style=\"height: 200px; width: 100%;\"></div></div></div></div></div><script>$(\"#chartDays\").kendoChart({dataSource: {transport: {read: {url: \"../../Titan/StockCompanyTrend/").reference(ctx.get("Id"),ctx,"h").write("_Days.json\",dataType: \"json\"}}},legend: {visible: false},seriesDefaults: {type: \"area\"},series: [{field: \"value\",name: \"Stock Price\"}],valueAxis: {labels: {format: \"{0}$\"},line: {visible: false}},categoryAxis: {field: \"timestamp\",majorGridLines: {visible: false}}});$(\"#chartMonths\").kendoChart({dataSource: {transport: {read: {url: \"../../Titan/StockCompanyTrend/").reference(ctx.get("Id"),ctx,"h").write("_Months.json\",dataType: \"json\"}}},legend: {visible: false},seriesDefaults: {type: \"area\"},series: [{field: \"value\",name: \"Stock Price\"}],valueAxis: {labels: {format: \"{0}$\"},line: {visible: false}},categoryAxis: {field: \"timestamp\",majorGridLines: {visible: false}}});$(\"#chartYears\").kendoChart({dataSource: {transport: {read: {url: \"../../Titan/StockCompanyTrend/").reference(ctx.get("Id"),ctx,"h").write("_Years.json\",dataType: \"json\"}}},legend: {visible: false},seriesDefaults: {type: \"area\"},series: [{field: \"value\",name: \"Stock Price\"}],valueAxis: {labels: {format: \"{0}$\"},line: {visible: false}},categoryAxis: {field: \"timestamp\",majorGridLines: {visible: false}}});</script>");}function body_1(chk,ctx){return chk.reference(ctx.get("PriceOpen"),ctx,"h");}function body_2(chk,ctx){return chk.reference(ctx.get("PriceLow"),ctx,"h");}function body_3(chk,ctx){return chk.reference(ctx.get("PriceHigh"),ctx,"h");}function body_4(chk,ctx){return chk.write("class=\"tile bg-color-green\"");}function body_5(chk,ctx){return chk.write("class=\"tile bg-color-red\"");}function body_6(chk,ctx){return chk.write("'").reference(ctx.get("Change"),ctx,"h").write("' < 0");}function body_7(chk,ctx){return chk.reference(ctx.get("PriceActual"),ctx,"h");}function body_8(chk,ctx){return chk.write("class=\"tile bg-color-green\"");}function body_9(chk,ctx){return chk.write("class=\"tile bg-color-red\"");}function body_10(chk,ctx){return chk.write("'").reference(ctx.get("Change"),ctx,"h").write("' < 0");}function body_11(chk,ctx){return chk.reference(ctx.get("Change"),ctx,"h");}function body_12(chk,ctx){return chk.write("class=\"tile bg-color-green\"");}function body_13(chk,ctx){return chk.write("class=\"tile bg-color-red\"");}function body_14(chk,ctx){return chk.write("'").reference(ctx.get("Change"),ctx,"h").write("' < 0");}function body_15(chk,ctx){return chk.reference(ctx.get("ChangePercent"),ctx,"h");}function body_16(chk,ctx){return chk.reference(ctx.get("Volume"),ctx,"h");}function body_17(chk,ctx){return chk.write("class=\"tile bg-color-grayDark\"");}function body_18(chk,ctx){return chk.write("class=\"tile bg-color-blueDark\"");}function body_19(chk,ctx){return chk.write("'").reference(ctx.get("IsFavourite"),ctx,"h").write("' == true");}function body_20(chk,ctx){return chk.write("Not your Favourite");}function body_21(chk,ctx){return chk.write("Your Favourite");}function body_22(chk,ctx){return chk.write("'").reference(ctx.get("IsFavourite"),ctx,"h").write("' == 1");}function body_23(chk,ctx){return chk.helper("if",ctx,{"else":body_24,"block":body_25},{"cond":body_26});}function body_24(chk,ctx){return chk.write("class=\"tile bg-color-red\"");}function body_25(chk,ctx){return chk.write("class=\"tile bg-color-green\"");}function body_26(chk,ctx){return chk.write("'").reference(ctx.get("PriceAlarm"),ctx,"h").write("' < '").reference(ctx.get("PriceLast"),ctx,"h").write("'");}function body_27(chk,ctx){return chk.write("class=\"tile bg-color-grayDark\"");}function body_28(chk,ctx){return chk.write("'").reference(ctx.get("PriceAlarm"),ctx,"h").write("' == 0");}function body_29(chk,ctx){return chk.write("Alarm Price");}function body_30(chk,ctx){return chk.write("No Alarm Price");}function body_31(chk,ctx){return chk.write("'").reference(ctx.get("PriceAlarm"),ctx,"h").write("' == 0");}return body_0;})();