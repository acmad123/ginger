var form = {

initialize: function () {
this.bindEvents();
},

bindEvents: function () {
document.addEventListener('DOMContentLoaded', this.onDeviceReady);
},

onDeviceReady: function () {
onBodyLoad();
},
};
var db;
var shortName = 'RentalzSqlDB';
var version = '1.0';
var displayName = 'RentalzSqlDB';
var maxSize = 65535;
var datetime = 'datetime-local';
function errorHandler(transaction, error) {
alert('Error: ' + error.message + ' code: ' + error.code);
}
function successCallBack() {
alert("DEBUGGING: success");
}
function nullHandler() {}
function onBodyLoad() {
if (!window.openDatabase) {
alert('Databases are not supported in this browser.');
return;
}
db = openDatabase(shortName, version, displayName,maxSize);
db.transaction(function(tx){
function DeleteDBvalues(){
if (!window.openDatabase) {

alert('Databases are not supported in this browser.');
return;	
}
}
tx.executeSql( 'CREATE TABLE IF NOT EXISTS Rentalz(RentId INTEGER NOT NULL PRIMARY KEY, Proptype TEXT NOT NULL, Bedrooms TEXT NOT NULL, Datetime TEXT NOT NULL, Rent TEXT NOT NULL, Furnitype TEXT NOT NULL, Notes TEXT NOT NULL, Report TEXT NOT NULL)',
[], nullHandler, errorHandler);
}, errorHandler, successCallBack);
}
function ListDBValues() {
if (!window.openDatabase) {
alert('Databases are not supported in this browser.');
return;
}
$('#lbProperty').html('');
db.transaction(function(transaction) {
transaction.executeSql('SELECT * FROM Rentalz;', [],
function(transaction, result) {
if (result !== null && result.rows !== null) {
for (var i = 0; i < result.rows.length; i++) {
var row = result.rows.item(i);
$('#lbProperty').append('<br>' + row.RentId + '. ' + row.Proptype+ ' ' + row.Bedrooms+ ' ' + row.Datetime+ ' ' + row.Rent+ ' ' + row.Furnitype+ ' ' + row.Notes+ ' ' + row.Report);
}
}
}, errorHandler);
}, errorHandler, nullHandler);
return;
}
function AddValueToDB() {
if (!window.openDatabase) {
alert('Databases are not supported in this browser.');
return;
}
db.transaction(function(transaction) {
transaction.executeSql('INSERT INTO Rentalz(Proptype, Bedrooms, Datetime, Rent, Furnitype, Notes, Report) VALUES (?,?,?,?,?,?,?)',[$('#Proptype').val(), $('#Bedrooms').val(), $('#Datetime').val(), $('#Rent').val(), $('#Furnitype').val(), $('#Notes').val(), $('#Report').val()],
nullHandler, errorHandler);
});
ListDBValues();
return false;
}