<a id="readme-top"></a>

<div align="center">
  <h1>CSV Import Validation</h1>
  
</div>

<p align=center> Validation library for CSV files against defined schema. Easy to use and customize. Developed by <a href="https://logicspark.com">Logic Spark</a> team. </p>

<p align=center> CSV import validation is a Typescript library that is utilize the function to read CSV data from <a href="https://github.com/exceljs/exceljs">ExcelJS<a/>.</p>
<br>

<div align="center">
  <a href="#building_construction-built-with">Built With</a> - 
  <a href="#rocket-getting-started">Getting Started</a> - 
  <a href="#fire-usage">Usage</a> -
  <a href="#books-license">License</a> -
  <a href="#pray-acknowledgement">Acknowledgement</a>
</div>

<br>

## :building_construction: Built With

Here is a list of frameworks/libraries used to develop CSV Import Validation

- [![Typescript][typescript]][typescript-url]
- ![javascript][javascript]
- [![Node][node.js]][node-url]
- [![exceljs][exceljs.js]][exceljs-url]
- [![Jest][Jest]][jest-url]

## :rocket: Getting Started

CSV Import Validation library checks data validation for CSV files against defined schema and returns data and validation messages as an object. In this guide, you will learn what is required before using the library and how to install it quickly. Let's get started!

### Prerequisite

Before installing the CSV Import Validation library, please install the most recent `Node.js` version

- npm

```sh
  npm install npm@latest -g
```

_Support Node.js 14.21.0 and above_

### Installation

Since the example is based on npm, you can use npm cmd to install CSV Import Validation. You can also install via yarn or pnpm.

npm install

```sh
npm install csv-import-validation
```

#### Other options

Or yarn

```sh
yarn add csv-import-validation
```

Or pnpm

```sh
pnpm install csv-import-validation
```

<p align="right">(<a href="#readme-top">back to top</a>)

## :fire: Usage

There are 2 main features in the library. One reads CSV and returns an array while another reads CSV and returns as objects with validation messages. For each feature, it can be read via a file path or buffer. The functions are independent and do not need to be called in sequence.

To use the library, you will need to `import` to your targeted file

```js
import { CsvUtilities } from "csv-import-validation";
```

### Functions that read CSV and return an array

There are two functions, namely:

- function readFileMapArray: read CSV by specifying a file path to the CSV file
- function readBufferMapArray: read CSV from Buffer

```js
const filePath = "files/your-csv-file-name.csv";
const reading = readCsvFileMapArray(filePath);
```

```js
  const reading = readBufferMapArray(ฺbuffer);
```

Each function has the same output as below:

```js
[
  [
    "Order ID",
    "Product Name",
    "Customer Name",
    "Quantity",
    "Price",
    "Discount",
    "Total",
    "Region",
    "Category",
    "Discount Rate",
  ],
  [
    "1",
    "Eldon Base for stackable storage shelf, platinum",
    "Muhammed MacIntyre",
    "3",
    "-213.25",
    "38.94",
    "35",
    "Nunavut",
    "Storage & Organization",
    "0.8",
  ],
];
```

### Functions that read CSV and return objects and validations

There are two functions, namely:

- readFileValidator: read CSV by specifying a file path to the CSV file and validate data
- readBufferValidator read CSV from Buffer and validate data
  The validation can be applied to the header name and data type of each column.

_If you import with validation, data will only be imported if there is no validation message._

```js
const csvConfig: ValidationConfig = [
  { headerName: "name", keyName: "name", type: "string" },
  { headerName: "ip", keyName: "ip", type: "string" },
  { headerName: "buildingId", keyName: "buildingId", type: "number" },
  { headerName: "floorId", keyName: "floorId", type: "number" },
  { headerName: "zoneId", keyName: "zoneId", type: "string" },
  { headerName: "room", keyName: "room", type: "string" },
  { headerName: "type", keyName: "type", type: "string" },
];

const filePath = "files/your-csv-file-name.csv";
const data = await csvUtilities.readFileValidator(filePath, csvConfig);
```

```js
const csvConfig: ValidationConfig = [
  { headerName: "name", keyName: "name", type: "string" },
  { headerName: "ip", keyName: "ip", type: "string" },
  { headerName: "buildingId", keyName: "buildingId", type: "number" },
  { headerName: "floorId", keyName: "floorId", type: "number" },
  { headerName: "zoneId", keyName: "zoneId", type: "string" },
  { headerName: "room", keyName: "room", type: "string" },
  { headerName: "type", keyName: "type", type: "string" },
];
const data = await csvUtilities.readBufferValidator(buffer, csvConfig);
```

#### Configuration Parameters

| Parameter    | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `headerName` | Specify header name of each column to validate with a message |
| `keyName`    | Specify key to map data of the corresponding column           |
| `type`       | Specify data type of each column (`number`, `string`)         |

Each function has the same output. If there is no validation message, the output will return objects of data imported.

```js
{
  "data": [
    {
      "orderID": 1,
      "productName": "Eldon Base for stackable storage shelf, platinum",
      "customerName": "Muhammed MacIntyre",
      "quantity": 3,
      "price": -213.25,
      "discount": 38.94,
      "total": "35",
      "region": "Nunavut",
      "category": "Storage & Organization",
      "discountRate": 0.8
    },
    {
      "orderID": 2,
      "productName": "1.7 Cubic Foot Compact \"Cube\" Office Refrigerators",
      "customerName": "Barry French",
      "quantity": 293,
      "price": 457.81,
      "discount": 208.16,
      "total": "68.02",
      "region": "Nunavut",
      "category": "Appliances",
      "discountRate": 0.58
    }
  ]
}
```

If there is validation, the data will not be imported and the output will return locations that need to be fixed before importing again.

```js
{
  "inValidData": [
    {
      "rowIndex": 1,
      "columnIndex": "A",
      "message": "Order ID's type is number."
    },
    {
      "rowIndex": 1,
      "columnIndex": "D",
      "message": "Quantity's type is number."
    },
    {
      "rowIndex": 7,
      "columnIndex": "A",
      "message": "Order ID's type is number."
    }
  ]
}
```

For more details, please see our [demo](https://github.com/logicspark/csv-import-validation/tree/main/demo) folder. There are demos for both JavaScript and TypeScript. In the [example-files](https://github.com/logicspark/csv-import-validation/tree/main/example-files) folder, we provide csv files with and without header for your ease of use.

<p align="right">(<a href="#readme-top">back to top</a>)

## :books: License

Distributed under the MIT license. See `LICENSE.txt` for more information.

[ExcelJS](https://github.com/exceljs/exceljs) is licensed under the MIT license.

<p align="right">(<a href="#readme-top">back to top</a>)

## :pray: Acknowledgement

- [ExcelJS](https://github.com/exceljs/exceljs)
- [Img Shields](https://shields.io)

<p align="right">(<a href="#readme-top">back to top</a>)

[javascript]: https://img.shields.io/badge/javascript-F0DB4F?style=for-the-badge&logo=javascript&logoColor=323330
[TypeScript]: https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en
[exceljs.js]: https://img.shields.io/badge/exceljs-red
[exceljs-url]: https://github.com/exceljs/exceljs
[Jest]: https://img.shields.io/badge/jest-C32C28?style=for-the-badge&logo=jest&logoColor=white
[jest-url]: https://jestjs.io/
