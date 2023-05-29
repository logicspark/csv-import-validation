// csv-utiltiess.test.ts
import { readFileSync, createReadStream, readFile } from 'fs'
import { CsvUtiltiess } from "../src/csv/csv-utiltiess";
import { ValidationConfig } from "../src/shared/interfaces/csv-file.interfaces";

const expectedData = {
    inValidData: [] as any[],
    data: [
        {
            name: 'LC-F1-CCTV-01',
            ip: '10.10.100.60',
            buildingId: 1,
            floorId: 1,
            zoneId: '1',
            room: 'Corridor',
            type: 'Fixed Box'
        },
        {
            name: 'LC-F1-CCTV-02',
            ip: '10.10.100.61',
            buildingId: 2,
            floorId: 1,
            zoneId: '010',
            room: 'Reception Hall',
            type: 'Panoramic IR'
        },
        {
            name: 'LC-F1-CCTV-03',
            ip: '10.10.100.62',
            buildingId: 2,
            floorId: 1,
            zoneId: '',
            room: 'Outdoor',
            type: 'Outdoor Dome PTZ'
        },
        {
            name: 'LC-F1-CCTV-04',
            ip: '10.10.100.63',
            buildingId: 2,
            floorId: 1,
            zoneId: '',
            room: 'Lift',
            type: 'Fixed Dome'
        }
    ]
};


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
        expect(data).toEqual(expectedData);
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
        expect(data).toEqual(expectedData);
    });
});