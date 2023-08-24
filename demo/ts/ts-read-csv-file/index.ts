import { CsvUtilities, ValidationConfig } from "csv-import-validation";
import { readFileSync } from 'fs'
const main = async () => {
    const filePath = "demo.csv";
    const data = await CsvUtilities.readCsvFileMapArray(filePath);
    console.log(data);
}
main();