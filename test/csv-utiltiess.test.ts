// csv-utiltiess.test.ts
import { readFileSync, createReadStream, readFile } from 'fs'
import { CsvUtiltiess } from "../src/csv/csv-utiltiess";
import { ValidationConfig } from "../src/shared/interfaces/csv-file.interfaces";

describe("test CsvUtiltiess", () => {
    it("readBufferAndValidator Should return Object Data and InValidData", async () => {
        const filePath = 'files/CCTV-exclude_roof.csv';
        const reading = readFileSync(filePath);
        const CSVConfig: ValidationConfig = [
            { headerName: 'name', keyName: 'name', type: 'string', required: true },
            { headerName: 'ip', keyName: 'ip', type: 'string' },
            { headerName: 'buildingId', keyName: 'buildingId', type: 'number' },
            { headerName: 'floorId', keyName: 'floorId', type: 'number' },
            { headerName: 'zoneId', keyName: 'zoneId', type: 'string' },
            { headerName: 'room', keyName: 'room', type: 'string' },
            { headerName: 'type', keyName: 'type', type: 'string' }
        ]
        const data = await CsvUtiltiess.readBufferAndValidator(reading, CSVConfig);
        expect(data);
    });

    it("readAndFileValidator Should return Object Data and InValidData", async () => {
        const filePath = 'files/CCTV-exclude_roof.csv';
        const CSVConfig: ValidationConfig = [
            { headerName: 'name', keyName: 'name', type: 'string', required: true },
            { headerName: 'ip', keyName: 'ip', type: 'string' },
            { headerName: 'buildingId', keyName: 'buildingId', type: 'number' },
            { headerName: 'floorId', keyName: 'floorId', type: 'number' },
            { headerName: 'zoneId', keyName: 'zoneId', type: 'string' },
            { headerName: 'room', keyName: 'room', type: 'string' },
            { headerName: 'type', keyName: 'type', type: 'string' }
        ]
        const data = await CsvUtiltiess.readAndFileValidator(filePath, CSVConfig);
        expect(data);
    });
});