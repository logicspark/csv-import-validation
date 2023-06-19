const  CsvUtilities = require('csv-import-validation').CsvUtilities;
const main = async () => {
    const filePath = "demo.csv";
    const data = await  CsvUtilities.readCsvFileMapArray(filePath);
    console.log(data);
}
main();