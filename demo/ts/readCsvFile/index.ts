import { CsvUtilties, ValidationConfig } from "csv-import-validation";
import { readFileSync } from 'fs'
const main = async () => {
    const filePath = "demo.csv";
    const data = await CsvUtilties.readCsvFileMapArrny(filePath);
    console.log(data);
}
main();