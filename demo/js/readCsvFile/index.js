const  CsvUtilties = require('csv-import-validation').CsvUtilties;
const main = async () => {
    const filePath = "demo.csv";
    const data = await  CsvUtilties.readCsvFileMapArrny(filePath);
    console.log(data);
}
main();