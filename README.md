Open your spreadsheet.

Requirements for the spreadsheet:
1. All column's names must be listed in first row(a1);
Like: 
![alt tag](http://content.screencast.com/users/OlehChem/folders/Default/media/345e4dc1-3d09-4d21-9487-5faa1d955154/tableStructure.png)
2. Allowed names of columns: "Timestamp", "First and Last Name (ukr)", "First and Last Name (eng)", "Mark", "E-mail", "Phone", "Position", "English level",  "Link to social network account (facebook, vk, etc)", "Why have you decided to join this course?", "Feedback", "Conclusion".

3. List of data rows must start in next row (second 2). Empty rows are not allowed.



Go to "Tools" in menu, ->   "Script editor".
Paste code listed below to "Script editor window".

function doPost(e) { // change to doPost(e) if you are recieving POST data
  var ss = SpreadsheetApp.openById(ScriptProperties.getProperty('active'));
  var sheet = ss.getSheetByName("DATA");    // CHANGE NAME!!!
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]; //read headers;
  var cell = sheet.getRange('a1');
  
  var colEmail = headers.indexOf("E-mail");
  var targetId = 0;
  for(var i = 0; i < headers.length; ++i) {
    if(cell.offset(i, colEmail).getValue().trim() == (e.parameter["E-mail"]).trim()) {
      targetId = i;
      break;
    }
  }
  
  var col = 0;
  
  for (i in headers){ // loop through the headers and if a parameter name matches the header name insert the value
    val = e.parameter[headers[i]];
    if(val) {
      cell.offset(targetId, col).setValue(val); 
    }
    col++;
  }
  //http://www.google.com/support/forum/p/apps-script/thread?tid=04d9d3d4922b8bfb&hl=en
  var app = UiApp.createApplication(); // included this part for debugging so you can see what data is coming in
  var panel = app.createVerticalPanel();
  for( p in e.parameters){
    panel.add(app.createLabel(p +" "+e.parameters[p]));
  }
  app.add(panel);
  return app;
}
//http://www.google.sc/support/forum/p/apps-script/thread?tid=345591f349a25cb4&hl=en
function setUp() {
  ScriptProperties.setProperty('active', SpreadsheetApp.getActiveSpreadsheet().getId());
}

Change sheet name in code below, if your spreadsheet isn't named "DATA".
var sheet = ss.getSheetByName("DATA");

Choose "setUp" option from "Select function" dropdown.
Run setUp function twice using "run button".

Deploy your app (Publish -> Deploy as web app).
Choose Project version.
Select "Me (yourmail@gmail.com)" from "Execute the app as:" dropdown.
Select "Anyone, even anonymous" from "Who has access to the app:" dropdown.
Press "Deploy" button. 
Store url into "urlPost" variable (src->js->appController.js:23);
Replace "1FzkGijfnvihEVnI43EF0mJK4H2nxGMDj7R7ZJY0Bb5k" key value to your spreadsheet key (src->js->appController.js:24).

![alt tag](http://content.screencast.com/users/OlehChem/folders/Default/media/7adc433e-7ab5-46ce-b69b-0e7965f91cdb/datarow.png)


