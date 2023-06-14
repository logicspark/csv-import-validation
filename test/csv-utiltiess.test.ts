// csv-utiltiess.test.ts
import { readFileSync } from 'fs'
import { CsvUtilties } from "../src/csv/csv-utiltiess";
import { ValidationConfig } from "../src/shared/interfaces/csv-file.interfaces";

const expectedData = {
    data: [
        {
            orderID: 1,
            productName: 'Eldon Base for stackable storage shelf, platinum',
            customerName: 'Muhammed MacIntyre',
            quantity: 3,
            price: -213.25,
            discount: 38.94,
            total: '35',
            region: 'Nunavut',
            category: 'Storage & Organization',
            discountRate: 0.8
        },
        {
            orderID: 2,
            productName: '1.7 Cubic Foot Compact "Cube" Office Refrigerators',
            customerName: 'Barry French',
            quantity: 293,
            price: 457.81,
            discount: 208.16,
            total: '68.02',
            region: 'Nunavut',
            category: 'Appliances',
            discountRate: 0.58
        },
        {
            orderID: 3,
            productName: 'Cardinal Slant-D� Ring Binder, Heavy Gauge Vinyl',
            customerName: 'Barry French',
            quantity: 293,
            price: 46.71,
            discount: 8.69,
            total: '2.99',
            region: 'Nunavut',
            category: 'Binders and Binder Accessories',
            discountRate: 0.39
        },
        {
            orderID: 4,
            productName: 'R380',
            customerName: 'Clay Rozendal',
            quantity: 483,
            price: 1198.97,
            discount: 195.99,
            total: '3.99',
            region: 'Nunavut',
            category: 'Telephones and Communication',
            discountRate: 0.58
        },
        {
            orderID: 5,
            productName: 'Holmes HEPA Air Purifier',
            customerName: 'Carlos Soltero',
            quantity: 515,
            price: 30.94,
            discount: 21.78,
            total: '5.94',
            region: 'Nunavut',
            category: 'Appliances',
            discountRate: 0.5
        },
        {
            orderID: 6,
            productName: 'G.E. Longer-Life Indoor Recessed Floodlight Bulbs',
            customerName: 'Carlos Soltero',
            quantity: 515,
            price: 4.43,
            discount: 6.64,
            total: '4.95',
            region: 'Nunavut',
            category: 'Office Furnishings',
            discountRate: 0.37
        },
        {
            orderID: 7,
            productName: 'Angle-D Binders with Locking Rings, Label Holders',
            customerName: 'Carl Jackson',
            quantity: 613,
            price: -54.04,
            discount: 7.3,
            total: '7.72',
            region: 'Nunavut',
            category: 'Binders and Binder Accessories',
            discountRate: 0.38
        },
        {
            orderID: 8,
            productName: 'SAFCO Mobile Desk Side File, Wire Frame',
            customerName: 'Carl Jackson',
            quantity: 613,
            price: 127.7,
            discount: 42.76,
            total: '6.22',
            region: 'Nunavut',
            category: 'Storage & Organization',
            discountRate: 0
        },
        {
            orderID: 9,
            productName: 'SAFCO Commercial Wire Shelving, Black',
            customerName: 'Monica Federle',
            quantity: 643,
            price: -695.26,
            discount: 138.14,
            total: '35',
            region: 'Nunavut',
            category: 'Storage & Organization',
            discountRate: 0
        },
        {
            orderID: 10,
            productName: 'Xerox 198',
            customerName: 'Dorothy Badders',
            quantity: 678,
            price: -226.36,
            discount: 4.98,
            total: '8.33',
            region: 'Nunavut',
            category: 'Paper',
            discountRate: 0.38
        }
    ]
};

const expectedDataArry = [
    [
        '1',
        'Eldon Base for stackable storage shelf, platinum',
        'Muhammed MacIntyre',
        '3',
        '-213.25',
        '38.94',
        '35',
        'Nunavut',
        'Storage & Organization',
        '0.8'
    ],
    [
        '2',
        '1.7 Cubic Foot Compact "Cube" Office Refrigerators',
        'Barry French',
        '293',
        '457.81',
        '208.16',
        '68.02',
        'Nunavut',
        'Appliances',
        '0.58'
    ],
    [
        '3',
        'Cardinal Slant-D� Ring Binder, Heavy Gauge Vinyl',
        'Barry French',
        '293',
        '46.71',
        '8.69',
        '2.99',
        'Nunavut',
        'Binders and Binder Accessories',
        '0.39'
    ],
    [
        '4',
        'R380',
        'Clay Rozendal',
        '483',
        '1198.97',
        '195.99',
        '3.99',
        'Nunavut',
        'Telephones and Communication',
        '0.58'
    ],
    [
        '5',
        'Holmes HEPA Air Purifier',
        'Carlos Soltero',
        '515',
        '30.94',
        '21.78',
        '5.94',
        'Nunavut',
        'Appliances',
        '0.5'
    ],
    [
        '6',
        'G.E. Longer-Life Indoor Recessed Floodlight Bulbs',
        'Carlos Soltero',
        '515',
        '4.43',
        '6.64',
        '4.95',
        'Nunavut',
        'Office Furnishings',
        '0.37'
    ],
    [
        '7',
        'Angle-D Binders with Locking Rings, Label Holders',
        'Carl Jackson',
        '613',
        '-54.04',
        '7.3',
        '7.72',
        'Nunavut',
        'Binders and Binder Accessories',
        '0.38'
    ],
    [
        '8',
        'SAFCO Mobile Desk Side File, Wire Frame',
        'Carl Jackson',
        '613',
        '127.7',
        '42.76',
        '6.22',
        'Nunavut',
        'Storage & Organization'
    ],
    [
        '9',
        'SAFCO Commercial Wire Shelving, Black',
        'Monica Federle',
        '643',
        '-695.26',
        '138.14',
        '35',
        'Nunavut',
        'Storage & Organization'
    ],
    [
        '10',
        'Xerox 198',
        'Dorothy Badders',
        '678',
        '-226.36',
        '4.98',
        '8.33',
        'Nunavut',
        'Paper',
        '0.38'
    ]
];


describe("test CsvUtiltiess", () => {
    it("readBufferAndValidator Should return Object Data and InValidData", async () => {
        const filePath = 'example-files/example-header.csv';
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
        const data = await CsvUtilties.readBufferAndValidator(reading, CSVConfig);
        expect(data).toEqual(expectedData);
    });

    it("readAndFileValidator Should return Object Data and InValidData", async () => {
        const filePath = 'example-files/example-header.csv';
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
        const data = await CsvUtilties.readAndFileValidator(filePath, CSVConfig);
        expect(data).toEqual(expectedData);
    });


    it("readFileCSvPart Should return array", async () => {
        const filePath = 'example-files/example.csv';
        const dataArry = await CsvUtilties.readCsvFileMapArrny(filePath);
        expect(dataArry).toEqual(expectedDataArry);
    });

    it("readFileCSvBuffer Should return array", async () => {
        const filePath = 'example-files/example.csv';
        const reading = readFileSync(filePath);
        const dataArry = await CsvUtilties.readBufferMapArrny(reading);
        expect(dataArry).toEqual(expectedDataArry);
    });
});

