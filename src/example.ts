

import { CsvUtiltiess } from './csv/csv-utiltiess';
import { readFileSync, createReadStream, readFile } from 'fs'
import {  ValidationConfig } from './shared/interfaces/csv-file.interfaces';
const main = async () => {
  const filePath = 'files/CCTV-exclude_roof.csv';
  const reading =  readFileSync(filePath);
    const CSVConfig: ValidationConfig = [
      { headerName: 'name', keyName: 'name', type: 'string'},
      { headerName: 'ip', keyName: 'ip', type: 'string', required: true },
      { headerName: 'buildingId', keyName: 'buildingId', type: 'number', required: true},
      { headerName: 'floorId', keyName: 'floorId', type: 'number', required: true },
      { headerName: 'zoneId', keyName: 'zoneId', type: 'string' },
      { headerName: 'room', keyName: 'room', type: 'string', required: true },
      { headerName: 'type', keyName: 'type', type: 'string', required: true }
    ]
    const data = await CsvUtiltiess.readBufferAndValidator(reading, CSVConfig);
    console.log(data);

  // const csvData = await CsvUtiltiess.readFilesMapObjects(filePath,{
  //     expectedHeaders:[ 'name', 'ip', 'buildingId', 'floorId', 'zoneId', 'room', 'type' ],
  //     expectedCellType:{
  //       name:'string',
  //       ip:'string',
  //       buildingId:'number'
  //     }
  //   })
  // console.log(csvData);



  // ascfassfsafsa

  // const CSVConfig: ValidatorConfig = {
  //   headers: [
  //     { name: 'name', inputName: 'name', type: 'string', required: true },
  //     { name: 'ip', inputName: 'ip', type: 'string', required: true },
  //     { name: 'buildingId', inputName: 'buildingId', type: 'number', required: true},
  //     { name: 'floorId', inputName: 'floorId', type: 'number', required: true },
  //     { name: 'zoneId', inputName: 'zoneId', type: 'string' },
  //     { name: 'room', inputName: 'room', type: 'string', required: true },
  //     { name: 'type', inputName: 'type', type: 'string', required: true }
  //   ]
  // };
  // const data = await CsvUtiltiess.readAndFileValidator(filePath, CSVConfig);
  // console.log(data);

  // year,industry_code_ANZSIC,industry_name_ANZSIC,rme_size_grp,variable,value,unit

  // const filePath = 'files/demo.csv';
  // const reading = readFileSync(filePath);
  // const CSVConfig: ValidatorConfig = {
  //   headers: [
  //     { name: 'year', keyName: 'year', type: 'string', required: true },
  //     { name: 'industry_code_ANZSIC', keyName: 'industry_code_ANZSIC', type: 'string', required: true },
  //     { name: 'industry_name_ANZSIC', keyName: 'industry_name_ANZSIC', type: 'string', required: true },
  //     { name: 'rme_size_grp', keyName: 'rme_size_grp', type: 'string', required: true },
  //     { name: 'variable', keyName: 'variable', type: 'string' },
  //     { name: 'value', keyName: 'value', type: 'string', required: true },
  //     { name: 'unit', keyName: 'unit', type: 'string', required: true }
  //   ]
  // };
  // const data = await CsvUtiltiess.readBufferAndValidator(reading, CSVConfig);
  // console.log(data);
}


main();


// "lodash": "^4.17.21",
// "lodash.defaults": "^4.2.0",
// "lodash.difference": "^4.5.0",
// "lodash.escaperegexp": "^4.1.2",
// "lodash.flatten": "^4.4.0",
// "lodash.groupby": "^4.6.0",
// "lodash.isboolean": "^3.0.3",
// "lodash.isequal": "^4.5.0",
// "lodash.isfunction": "^3.0.9",
// "lodash.isnil": "^4.0.0",
// "lodash.isplainobject": "^4.0.6",
// "lodash.isundefined": "^3.0.1",
// "lodash.union": "^4.6.0",
// "lodash.uniq": "^4.5.0",