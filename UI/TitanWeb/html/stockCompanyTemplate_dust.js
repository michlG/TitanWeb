(function(){dust.register("stockCompanyTemplate.dust",body_0);function body_0(chk,ctx){return chk.section(ctx.get("Nodes"),ctx,{"block":body_1},null);}function body_1(chk,ctx){return chk.write("<div class=\"tiles clearfix\">").section(ctx.get("CollectionContent"),ctx,{"block":body_2},null).write("</div>");}function body_2(chk,ctx){return chk.write("<div class=\"tile double bg-color-blueDark\"><div class=\"tile-content\" onclick=\"showStockCompanyDetails('").reference(ctx.get("ID"),ctx,"h").write("');\"><table style=\"border: none;\"><tr><th colspan=\"2\"><h5>").reference(ctx.get("Symbol"),ctx,"h").write(" - ").reference(ctx.get("Name"),ctx,"h").write("</h5></th></tr><tr><td style=\"border: none; text-align: center;\"><h3>Open Price</h3></td><td style=\"border: none; text-align: center;\"><h3>Last Price</h3></td></tr><tr><td style=\"border: none; text-align: center;\"><span class=\"bigNumbering\">").helper("formatDouble",ctx,{},{"value":body_3}).write("$</span></td><td style=\"border: none; text-align: center;\"><span class=\"bigNumbering\">").helper("formatDouble",ctx,{},{"value":body_4}).write("$</span></td></tr></table></div><div ").helper("if",ctx,{"else":body_5,"block":body_6},{"cond":body_7}).write("><div class=\"icon\" style=\"float: left; margin-top: 0px;\"><i ").helper("if",ctx,{"else":body_8,"block":body_9},{"cond":body_10}).write(" /></div><h3 style=\"width: 300px; margin-top:5px; font-weight: bold;\">").helper("formatDouble",ctx,{},{"value":body_11}).write("$ (").helper("formatDouble",ctx,{},{"value":body_12}).write("%)</h3>").helper("if",ctx,{"block":body_13},{"cond":body_14}).write("</div></div>");}function body_3(chk,ctx){return chk.reference(ctx.get("OpenPrice"),ctx,"h");}function body_4(chk,ctx){return chk.reference(ctx.get("LastPrice"),ctx,"h");}function body_5(chk,ctx){return chk.write("class=\"brand bg-color-green\"");}function body_6(chk,ctx){return chk.write("class=\"brand bg-color-red\"");}function body_7(chk,ctx){return chk.write("'").reference(ctx.get("Change"),ctx,"h").write("' < 0");}function body_8(chk,ctx){return chk.write("class=\"icon-chevron-up\"");}function body_9(chk,ctx){return chk.write("class=\"icon-chevron-down\"");}function body_10(chk,ctx){return chk.write("'").reference(ctx.get("Change"),ctx,"h").write("' < 0");}function body_11(chk,ctx){return chk.reference(ctx.get("Change"),ctx,"h");}function body_12(chk,ctx){return chk.reference(ctx.get("ChangePercent"),ctx,"h");}function body_13(chk,ctx){return chk.write("<div class=\"badge bg-color-blue busy\"> </div>");}function body_14(chk,ctx){return chk.write("'").reference(ctx.get("LastPrice"),ctx,"h").write("' < '").reference(ctx.get("AlarmPrice"),ctx,"h").write("'");}return body_0;})();