var { table } = require("table");

function printTable(results, fields) {
    var data = [];
    var header = [];
    for(var i = 0; i < fields.length; i++) {
        header.push(fields[i].name);
    }
    data.push(header);
    for (var i = 0; i < results.length; i++) {
        var row = Object.values(results[i]);
        data.push(row);
    }
    var output = table(data);
    console.log(output);
}

module.exports = printTable;