/*The MIT License (MIT)

Copyright (c) 2016 https://github.com/jomendez/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.*/

(function($){
        $.fn.extend({
            tableExport: function(options) {
                var defaults = {
						separator: ',',
						ignoreColumn: [],
						tableName:'yourTableName',
						type:'csv',
						pdfFontSize:14,
						pdfLeftMargin:20,
						escape:'true',
						htmlContent:'false',
						consoleLog: 'false',
						fileName: 'report',
						objToPfd: null,
						specifyColumnWidthByColumnNameObj: {},
						columnOrder: null
                };
                
				var options = $.extend(defaults, options);
				var el = this;
				
				if(defaults.type == 'csv' || defaults.type == 'txt'){
				
					// Header
					var tdData ="";
					$(el).find('thead').find('tr').each(function() {
					tdData += "\n";
                        //removed the :visible filter to allow tables from objects in memory
						$(this).find('th').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									tdData += '"' + parseString($(this)) + '"' + defaults.separator;									
								}
							}
							
						});
						tdData = $.trim(tdData);
						tdData = $.trim(tdData).substring(0, tdData.length -1);
					});
					
					// Row vs Column
					$(el).find('tbody').find('tr').each(function() {
					tdData += "\n";
						$(this).find('td').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									tdData += '"'+ parseString($(this)) + '"'+ defaults.separator;
								}
							}
						});
						//tdData = $.trim(tdData);
						tdData = $.trim(tdData).substring(0, tdData.length -1);
					});
					
					//output
					if(defaults.consoleLog == 'true'){
						console.log(tdData);
					}
					//var base64data = "base64," + $.base64.encode(tdData);
				    //window.open('data:application/'+defaults.type+';filename=exportData;' + base64data);

				    // Blob for saving.
					var blob = new Blob([tdData], { type: "application/" + defaults.type });
				    // Tell the browser to save it with fileName and extension e.g. report.txt.
					saveAs(blob, defaults.fileName + '.' + defaults.type);

				}else if(defaults.type == 'sql'){
				
					// Header
					var tdData ="INSERT INTO `"+defaults.tableName+"` (";
					$(el).find('thead').find('tr').each(function() {
					
						$(this).find('th').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									tdData += '`' + parseString($(this)) + '`,' ;									
								}
							}
							
						});
						tdData = $.trim(tdData);
						tdData = $.trim(tdData).substring(0, tdData.length -1);
					});
					tdData += ") VALUES ";
					// Row vs Column
					$(el).find('tbody').find('tr').each(function() {
					tdData += "(";
						$(this).find('td').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									tdData += '"'+ parseString($(this)) + '",';
								}
							}
						});
						
						tdData = $.trim(tdData).substring(0, tdData.length -1);
						tdData += "),";
					});
					tdData = $.trim(tdData).substring(0, tdData.length -1);
					tdData += ";";
					
					//output
					//console.log(tdData);
					
					if(defaults.consoleLog == 'true'){
						console.log(tdData);
					}
					
					//var base64data = "base64," + $.base64.encode(tdData);
					//window.open('data:application/sql;filename=exportData;' + base64data);
					    // Blob for saving.
                        var blob = new Blob([tdData], { type: "application/" +defaults.type});
                        // Tell the browser to save it with fileName and extension e.g. report.txt.
                        saveAs(blob, defaults.fileName + '.' +defaults.type);
				
				}else if(defaults.type == 'json'){
				
					var jsonHeaderArray = [];
					$(el).find('thead').find('tr').each(function() {
						var tdData ="";	
						var jsonArrayTd = [];
					
						$(this).find('th').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									jsonArrayTd.push(parseString($(this)));									
								}
							}
						});									
						jsonHeaderArray.push(jsonArrayTd);						
						
					});
					
					var jsonArray = [];
					$(el).find('tbody').find('tr').each(function() {
						var tdData ="";	
						var jsonArrayTd = [];
					
						$(this).find('td').each(function(index,data) {
							if ($(this).css('display') != 'none'){
								if(defaults.ignoreColumn.indexOf(index) == -1){
									jsonArrayTd.push(parseString($(this)));									
								}
							}
						});									
						jsonArray.push(jsonArrayTd);									
						
					});
					
					var jsonExportArray =[];
					jsonExportArray.push({header:jsonHeaderArray,data:jsonArray});
					
					//Return as JSON
					//console.log(JSON.stringify(jsonExportArray));
					
					//Return as Array
					//console.log(jsonExportArray);
					if(defaults.consoleLog == 'true'){
						console.log(JSON.stringify(jsonExportArray));
					}
					//var base64data = "base64," + $.base64.encode(JSON.stringify(jsonExportArray));
					//window.open('data:application/json;filename=exportData;' + base64data);
					    // Blob for saving.
					var blob = new Blob([jsonExportArray], {
                            type: "application/" +defaults.type });
					        // Tell the browser to save it with fileName and extension e.g. report.txt.
					saveAs(blob, defaults.fileName + '.' +defaults.type);


				}else if(defaults.type == 'xml'){
				
					var xml = '<?xml version="1.0" encoding="utf-8"?>';
					xml += '<tabledata><fields>';

					// Header
					$(el).find('thead').find('tr').each(function() {
						$(this).find('th').each(function(index,data) {
							if ($(this).css('display') != 'none'){					
								if(defaults.ignoreColumn.indexOf(index) == -1){
									xml += "<field>" + parseString($(this)) + "</field>";
								}
							}
						});									
					});					
					xml += '</fields><data>';
					
					// Row Vs Column
					var rowCount=1;
					$(el).find('tbody').find('tr').each(function() {
						xml += '<row id="'+rowCount+'">';
						var colCount=0;
						$(this).find('td').each(function(index,data) {
							if ($(this).css('display') != 'none'){	
								if(defaults.ignoreColumn.indexOf(index) == -1){
									xml += "<column-"+colCount+">"+parseString($(this))+"</column-"+colCount+">";
								}
							}
							colCount++;
						});															
						rowCount++;
						xml += '</row>';
					});					
					xml += '</data></tabledata>'
					
					if(defaults.consoleLog == 'true'){
						console.log(xml);
					}
					
					//var base64data = "base64," + $.base64.encode(xml);
					//window.open('data:application/xml;filename=exportData;' + base64data);
					    // Blob for saving.
					var blob = new Blob([xml], {
					    type: "application/" +defaults.type
					});
					    // Tell the browser to save it with fileName and extension e.g. report.txt.
                        saveAs(blob, defaults.fileName + '.' +defaults.type);

				}else if(defaults.type == 'xls' || defaults.type == 'doc'|| defaults.type == 'ppt'  ){
					//console.log($(this).html());
					var excel="<table>";
					// Header
					$(el).find('thead').find('tr').each(function() {
						excel += "<tr>";
						$(this).find('th').each(function(index,data) {
							if ($(this).css('display') != 'none'){					
								if(defaults.ignoreColumn.indexOf(index) == -1){
									excel += "<td>" + parseString($(this))+ "</td>";
								}
							}
						});	
						excel += '</tr>';						
						
					});					
					
					
					// Row Vs Column
					var rowCount=1;
					$(el).find('tbody').find('tr').each(function() {
						excel += "<tr>";
						var colCount=0;
						$(this).find('td').each(function(index,data) {
							if ($(this).css('display') != 'none'){	
								if(defaults.ignoreColumn.indexOf(index) == -1){
									excel += "<td>"+parseString($(this))+"</td>";
								}
							}
							colCount++;
						});															
						rowCount++;
						excel += '</tr>';
					});					
					excel += '</table>'
					
					if(defaults.consoleLog == 'true'){
						console.log(excel);
					}
					
					var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:"+defaults.type+"' xmlns='http://www.w3.org/TR/REC-html40'>";
					excelFile += "<head>";
					excelFile += "<!--[if gte mso 9]>";
					excelFile += "<xml>";
					excelFile += "<x:ExcelWorkbook>";
					excelFile += "<x:ExcelWorksheets>";
					excelFile += "<x:ExcelWorksheet>";
					excelFile += "<x:Name>";
					excelFile += "{worksheet}";
					excelFile += "</x:Name>";
					excelFile += "<x:WorksheetOptions>";
					excelFile += "<x:DisplayGridlines/>";
					excelFile += "</x:WorksheetOptions>";
					excelFile += "</x:ExcelWorksheet>";
					excelFile += "</x:ExcelWorksheets>";
					excelFile += "</x:ExcelWorkbook>";
					excelFile += "</xml>";
					excelFile += "<![endif]-->";
					excelFile += "</head>";
					excelFile += "<body>";
					excelFile += excel;
					excelFile += "</body>";
					excelFile += "</html>";

					//var base64data = "base64," + $.base64.encode(excelFile);
				    //window.open('data:application/vnd.ms-'+defaults.type+';filename=exportData.doc;' + base64data);
					
				    // Blob for saving.
					var blob = new Blob([excelFile], { type: "application/" + defaults.type });
				    // Tell the browser to save it with fileName and extension e.g. report.txt.
					saveAs(blob, defaults.fileName + '.' + defaults.type);
				
				}else if(defaults.type == 'pdf'){
	


				    function splitTable(data) {
				        var newData = [];
				        if (data.length > 0) {

				            for (var i = 0; i < data.length; i++) {


				                var keys = [];
				                if (!defaults.columnOrder) {
				                    keys = Object.keys(data[i]);
				                    keys.sort();
				                } else {
				                    keys = options.columnOrder;
				                }

				                var count = 1;
				                var obj = {};
				                var countProp = 0;
				                for (var p = 0; p < keys.length; p++) {
				                    obj[keys[p]] = data[i][keys[p]];
				                    if (count % 4 === 0) {
				                        newData[countProp] = newData[countProp] ? newData[countProp].concat(obj) : [obj];
				                        obj = {};
				                        countProp++;
				                    } else if (Object.keys(data[i]).length === count) {
				                        newData[countProp] = newData[countProp] ? newData[countProp].concat(obj) : [obj];
				                        obj = {};
				                    }
				                    count++;
				                }
				            }


				        }
				        return newData;
				    }

				    function specifyColumnWidthByColumnName(key, options) {
				        var defaultVal = 140;//total 560
				        //options = { 'submitted': 100, 'adid': 30, 'altid': 30, 'allocation': 400 }

				        if (key && options[key.toLowerCase()]) {
				            return options[key.toLowerCase()];
				        }
				        return defaultVal;
				    }


				    var doc = new jsPDF('p', 'pt', 'a4', true);
				    var data = defaults.objToPfd == null ? doc.tableToJson(defaults.tableName) : defaults.objToPfd;


				    var splitedTable = splitTable(data);
				    var fontSize = defaults.pdfFontSize;
				    var height = 0;
				    doc.setFont("times", "normal");
				    doc.setFontSize(fontSize);

				    for (var i = 0; i < splitedTable.length; i++) {

				        var arr = [];
				        for (var key in splitedTable[i][0]) {
				            arr.push(key.toLowerCase());
				        }

				        height = doc.drawTable(splitedTable[i],
                        {
                            xstart: 10,
                            ystart: 10,
                            tablestart: 40,
                            marginright: 100,
                            xOffset: 10,
                            yOffset: 10,
                            columnWidths: [specifyColumnWidthByColumnName(arr[0], defaults.specifyColumnWidthByColumnNameObj), specifyColumnWidthByColumnName(arr[1], defaults.specifyColumnWidthByColumnNameObj), specifyColumnWidthByColumnName(arr[2], defaults.specifyColumnWidthByColumnNameObj), specifyColumnWidthByColumnName(arr[3], defaults.specifyColumnWidthByColumnNameObj)]
                        });
				        if (i !== splitedTable.length - 1) {
				            doc.addPage();
				        }
				    }
				    var fileName = defaults.fileName + '.' + defaults.type;
				    doc.save(fileName);

				
				}
				
				
				function parseString(data){
				
					if(defaults.htmlContent == 'true'){
						content_data = data.html().trim();
					}else{
						content_data = data.text().trim();
					}
					
					if(defaults.escape == 'true'){
						content_data = escape(content_data);
					}
					
					
					
					return content_data;
				}
			
			}
        });
    })(jQuery);
        