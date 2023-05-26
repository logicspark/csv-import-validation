# sheet-utilities-ts

## About
sheet-utilities-ts สร้างขึ้นมาเพื่อที่ อ่านข้อมูลไฟล์ CSV ส่งค่าคืนแบบ

 - อาเรย์
 - ออบ เจ็ค
 การตรวจสอบไฟล์ CSV กับคีย์ที่กำหนดโดย(ส่งคืนวัตถุที่มีข้อมูลและข้อความที่ไม่ถูกต้อง)

## Build With
frameworks/libraries ที่ใช้ในการจัดทำ sheet-utilities-ts

- [![Node][node.js]][node-url]
- [![Sharp][sharp.js]][sharp-url]
- [![Jest][jest.js]][jest-url]
## Getting Started

นี่คือตัวอย่าง การติดตั้ง ตั่งแต่เริ่มต้น ให้ทำตามขั้นตอนง่ายๆเหล่านี้


## Installation

ตัวอย่างการติดตั้ง ตัว sheet-utilities-ts ให้ทำตามขั้นตอนง่ายๆดังนี้โดยใช้ npm or yarn or pnpm และวิธีการ import module sheet-utilities-ts

npm install

```bash
npm install @logicspark/sheet-utilities-ts
```

Or yarn

```bash
yarn add @logicspark/sheet-utilities-ts
```

Or pnpm

```bash
pnpm add @logicspark/sheet-utilities-ts
```


## Usage

```
  import { CsvUtiltiess } from "@logicspark/sheet-utilities-ts";
```


## Function Read File CSV Return Array

- function readCsvFileMapArrny มีหน้าอ่านข้อมูล CSV จาก FilePath ที่อยู่ของไฟล์ CSV
```
  const filePath = 'files/CCTV-exclude_roof.csv';
  const reading =  readCsvFileMapArrny(filePath);
```
- function readBufferMapArrny มีหน้าอ่านข้อมูล CSV จาก Buffer
```
     const reading = readBufferMapArrny(ฺbuffer);
```

## Function Read File CSV Return Objects and Validator

- readAndFileValidator มีหน้าอ่านข้อมูล CSV จาก FilePath ที่อยู่ของไฟล์ CSV และทำการ Validator
- readBufferAndValidator มีหน้าอ่านข้อมูล CSV จาก Buffer ที่อยู่ของไฟล์ CSV และทำการ Validator

#### Configuration 
กำหนดค่าควรมี:
header - ประเภท: อาร์เรย์ ส่วนหัวของแถว 




| key             | Description                                                                |
| ----------------- | ------------------------------------------------------------------ |
| headerName|  กำหนดชื่อ Header ในคอลั่มนั้น ในกรณีที่ csv ไม่ตรงกับที่กำหนดจะ ส่งกลับ message error กลับมา |
| keyName | กำหนด key ข้อมูลในคอลั่มที่ส่งกลับมา |
|type | กำหนด type ของ คอลั่มนั้น |

##### Config example :

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
```
#### readAndFileValidator
```
const filePath = 'files/CCTV-exclude_roof.csv';
const data = await CsvUtiltiess.readBufferAndValidator(filePath, CSVConfig);
```
#### readBufferAndValidator
```
const data = await CsvUtiltiess.readBufferAndValidator(Buffer, CSVConfig);
```