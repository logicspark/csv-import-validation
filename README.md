# csv-import-validation

[javascript]:https://img.shields.io/badge/javascript-F0DB4F?style=for-the-badge&logo=javascript&logoColor=323330
[TypeScript]: https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en

[exceljs.js]: https://img.shields.io/badge/sharp-exceljs-red
[exceljs-url]: https://www.npmjs.com/package/csv-file-validator?activeTab=readme

## About
csv-import-validation สร้างขึ้นมาเพื่อที่ การตรวจสอบความถูกต้องของไฟล์ CSV กับสคีมาที่กำหนดโดยผู้ใช้ (ส่งคืนออบเจกต์กลับพร้อมข้อมูลและข้อความที่ไม่ถูกต้อง)
### Node Version ที่รองรับ
```
=> 14.21.0 
```
## building_construction: Built With
นี่คือรายการของไลบรารี่ที่ใช้ในการพัฒนา csv-import-validation
- [![Typescript][typescript]][typescript-url]
- ![javascript][javascript]
- [![Node][node.js]][node-url]
- [![exceljs][exceljs.js]][exceljs-url]

## Installation
ตัวอย่างการติดตั้ง ตัว csv-import-validation ให้ทำตามขั้นตอนง่ายๆดังนี้โดยใช้ npm or yarn or pnpm และวิธีการ import module csv-import-validation

npm install

```bash
npm install csv-import-validation
```

Or yarn

```bash
yarn add csv-import-validation
```

Or pnpm

```bash
pnpm install csv-import-validation
```


## Importing ⬆
``` js
  import { CsvUtilities } from "@logicspark/csv-import-validation";
```
 
[โปรดดูการสาธิตสำหรับรายละเอียดเพิ่มเติม](https://github.com/logicspark/csv-import-validation/tree/main/demo)

## Summarize
อาเรย์
 - การอ่านไฟล์ csv โดยตรงส่งค่าคืนเป็น อาร์เรย์

ออบเจ็ค
 - การตรวจสอบไฟล์ CSV กับคีย์ที่กำหนดโดย(ส่งคืนวัตถุที่มีข้อมูลและข้อความที่ไม่ถูกต้อง)
- ตรวจสอบความถูกต้อง Header
- ตรวจสอบความถูกต้อง type ของคอลั่ม

### Function Read File CSV Return Array

- function readCsvFileMapArrny มีหน้าอ่านข้อมูล CSV จาก FilePath ที่อยู่ของไฟล์ CSV
```
  const filePath = 'files/CCTV-exclude_roof.csv';
  const reading =  readCsvFileMapArrny(filePath);
```
- function readBufferMapArrny มีหน้าอ่านข้อมูล CSV จาก Buffer
```
     const reading = readBufferMapArrny(ฺbuffer);
```

output :
``` js
[
  [
    'Order ID',
    'Product Name',
    'Customer Name',
    'Quantity',
    'Price',
    'Discount',
    'Total',
    'Region',
    'Category',
    'Discount Rate'
  ],
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
  ]
]
```
### Function Read File CSV Return Objects and Validator

- readAndFileValidator มีหน้าอ่านข้อมูล CSV จาก FilePath ที่อยู่ของไฟล์ CSV และทำการ Validator
- readBufferAndValidator มีหน้าอ่านข้อมูล CSV จาก Buffer ที่อยู่ของไฟล์ CSV และทำการ Validator

#### Configuration 
กำหนดค่าควรมี:
header - ประเภท: อาร์เรย์ ส่วนหัวของแถว 




| key             | Description                                                                |
| ----------------- | ------------------------------------------------------------------ |
| headerName|  กำหนดชื่อ Header ในคอลั่มนั้น ในกรณีที่ csv ไม่ตรงกับที่กำหนดจะ ส่งกลับ message error กลับมา |
| keyName | กำหนด key ข้อมูลในคอลั่มที่ส่งกลับมา |
|type | กำหนด type ของ คอลั่มนั้น (number , string) |

##### Config example :
  - function readAndFileValidator มีหน้าอ่านข้อมูล CSV จาก FilePath ที่อยู่ของไฟล์ CSV และทำการ validation
  
``` js
 const CSVConfig: ValidationConfig = [
      { headerName: 'name', keyName: 'name', type: 'string'},
      { headerName: 'ip', keyName: 'ip', type: 'string' },
      { headerName: 'buildingId', keyName: 'buildingId', type: 'number'},
      { headerName: 'floorId', keyName: 'floorId', type: 'number' },
      { headerName: 'zoneId', keyName: 'zoneId', type: 'string' },
      { headerName: 'room', keyName: 'room', type: 'string' },
      { headerName: 'type', keyName: 'type', type: 'string' }
    ]

    const filePath = 'files/CCTV-exclude_roof.csv';
    const data = await CsvUtilities.readAndFileValidator(filePath, CSVConfig);
```
  - function readAndFileValidator มีหน้าอ่านข้อมูล CSV จาก   Buffer validation
``` js
   const CSVConfig: ValidationConfig = [
    { headerName: 'name', keyName: 'name', type: 'string'},
    { headerName: 'ip', keyName: 'ip', type: 'string' },
    { headerName: 'buildingId', keyName: 'buildingId', type: 'number' },
    { headerName: 'floorId', keyName: 'floorId', type: 'number' },
    { headerName: 'zoneId', keyName: 'zoneId', type: 'string' },
    { headerName: 'room', keyName: 'room', type: 'string' },
    { headerName: 'type', keyName: 'type', type: 'string' }
  ];
  const data = await CsvUtilities.readBufferAndValidator(buffer, CSVConfig);
```

- output :
``` json
{
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
    }
  ]
}
```
- outout (กรณี validation ไม่ผ่านตามที่กำหนด)
``` json
{
  inValidData: [
    {
      rowIndex: 1,
      columnIndex: 'A',
      message: "Order ID's type is number."
    },
    {
      rowIndex: 1,
      columnIndex: 'D',
      message: "Quantity's type is number."
    },
    {
      rowIndex: 7,
      columnIndex: 'A',
      message: "Order ID's type is number."
    }
  ]
}
```

