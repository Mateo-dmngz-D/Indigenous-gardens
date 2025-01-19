const fs = require('fs');
const path = require('path');
const csvFilePath = path.join(__dirname, 'flowers.csv');

function csvToJson(csvFilePath) {
    const data = fs.readFileSync(csvFilePath, 'utf8');
    const lines = data.split('\n');
    const headers = lines[0].split(',');

    const jsonResult = lines.slice(1).map(line => {
        const values = line.split(',');
        if (values.length !== headers.length) {
            return null;
        }
        const jsonObject = {};
        headers.forEach((header, index) => {
            jsonObject[header.trim()] = values[index].trim();
        });
        return jsonObject;
    }).filter(line => line !== null);

    return JSON.stringify(jsonResult, null, 2);
}

const jsonOutput = csvToJson(csvFilePath);
console.log(jsonOutput);
