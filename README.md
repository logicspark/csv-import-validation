# sheet-utilities-ts

## About
sheet-utilities-ts สร้างขึ้นมาเพื่อที่ การตรวจสอบความถูกต้องของไฟล์ CSV กับสคีมาที่กำหนดโดยผู้ใช้ (ส่งคืนออบเจกต์กลับพร้อมข้อมูลและข้อความที่ไม่ถูกต้อง)


## Installation

ตัวอย่างการติดตั้ง ตัว sheet-utilities-ts ให้ทำตามขั้นตอนง่ายๆดังนี้โดยใช้ npm or yarn or pnpm และวิธีการ import module sheet-utilities-ts

npm install

```bash
npm install sheet-utilities
```

Or yarn

```bash
yarn add sheet-utilities
```

Or pnpm

```bash
pnpm install sheet-utilities
```


## Importing ⬆
```
  import { CsvUtiltiess } from "@logicspark/sheet-utilities-ts";
```



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
```
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
  
```
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
    const data = await CsvUtiltiess.readAndFileValidator(filePath, CSVConfig);
```
  - function readAndFileValidator มีหน้าอ่านข้อมูล CSV จาก   Buffer validation
```
   const CSVConfig: ValidationConfig = [
    { headerName: 'name', keyName: 'name', type: 'string'},
    { headerName: 'ip', keyName: 'ip', type: 'string' },
    { headerName: 'buildingId', keyName: 'buildingId', type: 'number' },
    { headerName: 'floorId', keyName: 'floorId', type: 'number' },
    { headerName: 'zoneId', keyName: 'zoneId', type: 'string' },
    { headerName: 'room', keyName: 'room', type: 'string' },
    { headerName: 'type', keyName: 'type', type: 'string' }
  ];
  const data = await CsvUtiltiess.readBufferAndValidator(buffer, CSVConfig);
```

- output :
```
{
  inValidData: [],
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

