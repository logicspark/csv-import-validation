import { CsvUtilities, ValidationConfig } from "csv-import-validation";
import { readFileSync } from 'fs'
const main = async () => {
    const filePath = "demo.csv";
    const reading = readFileSync(filePath);
    const CSVConfig: ValidationConfig = [
        { headerName: 'Order ID', keyName: 'orderID', type: 'number' },
        { headerName: 'Product Name', keyName: 'productName', type: 'string' },
        { headerName: 'Customer Name', keyName: 'customerName', type: 'string' },
        { headerName: 'Quantity', keyName: 'quantity', type: 'number' },
        { headerName: 'Price', keyName: 'price', type: 'number' },
        { headerName: 'Discount', keyName: 'discount', type: 'number' },
        { headerName: 'Total', keyName: 'total', type: 'string' },
        { headerName: 'Region', keyName: 'region', type: 'string' },
        { headerName: 'Category', keyName: 'category', type: 'string' },
        { headerName: 'Discount Rate', keyName: 'discountRate', type: 'number' }
    ]
    const data = await CsvUtilities.readBufferAndValidator(reading, CSVConfig);
    console.log(data);
}
main();