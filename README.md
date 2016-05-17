tableExport.jquery.plugin
=========================

<h3>Export HTML Table to</h3>
<ul>
<li> JSON
<li> XML
<li> CSV
<li> TXT
<li> SQL
<li> MS-Word
<li> Ms-Excel
<li> Ms-Powerpoint
<li> PDF
</ul>

Installation
============

Core jquery Plugin<BR>

&lt;script type="text/javascript" src="libs/filesaver.js"><BR>
&lt;script type="text/javascript" src="libs/jspdf.plugin.table.js"><BR>
&lt;script type="text/javascript" src="libs/tableExport.js"><BR>
<BR>


PDF Export
==========
&lt;script type="text/javascript" src="libs/jspdf/jspdf.js"><BR>

Usage
======
//table to csv
onClick ="$('#tableID').tableExport({type:'csv',escape:'false'});"<BR>

//object to pdf
onclick="$().tableExport({ type: 'pdf', pdfFontSize: 9, escape: 'false', objToPfd: exampleData, specifyColumnWidthByColumnNameObj: specifyColumnWidthByColumnName });"<BR>

Options
=======
separator: ','<BR>
ignoreColumn: [2,3],<BR>
tableName:'yourTableName'<BR>
type:'csv'<BR>
pdfFontSize:14<BR>
pdfLeftMargin:20<BR>
escape:'true'<BR>
htmlContent:'false'<BR>
consoleLog:'false' <BR>
filename:'report' <BR>
objToPfd: dataObj <BR>
specifyColumnWidthByColumnNameObj: { 'submitted': 150, 'adid': 150, 'altid': 100, 'allocation': 160 } <BR>