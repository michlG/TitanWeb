(function(){dust.register("editPortfolioPaneRemoveTemplate.dust",body_0);function body_0(chk,ctx){return chk.write("<div style=\"width: 900px; margin-left:auto; margin-right:auto; margin-top: 10px; margin-bottom: 10px;\"><h2 style=\"font-weight: bold;\">Existing stock companies</h2><table><tr><th>Symbol</th><th>Company Name</th><th>Volume</th><th>Actual Price</th><th>Change</th><th>Remove</th></tr>").section(ctx.get("CollectionContent"),ctx,{"block":body_1},null).write("</table></div>");}function body_1(chk,ctx){return chk.write("<tr><td>").reference(ctx.get("Symbol"),ctx,"h").write("</td><td>").reference(ctx.get("CompanyName"),ctx,"h").write("</td><td>").reference(ctx.get("Volume"),ctx,"h").write("</td><td>").reference(ctx.get("PriceActual"),ctx,"h").write("</td><td>").reference(ctx.get("Change"),ctx,"h").write("</td><td><button onclick=\"removeStockCompanyFromPortfolioClick('").reference(ctx.get("ID"),ctx,"h").write("')\">Remove</button></td></tr>");}return body_0;})();