

import { CsvUtiltiess } from './csv/csv-utiltiess';
import { readFileSync, createReadStream, readFile } from 'fs'
import {  ValidationConfig } from './shared/interfaces/csv-file.interfaces';
const main = async () => {
  // readBufferAndValidator
  const filePath = 'files/CCTV-exclude_roof.csv';
  const reading =  readFileSync(filePath);
    const CSVConfig: ValidationConfig = [
      { headerName: 'name', keyName: 'name', type: 'string',required:true},
      { headerName: 'ip', keyName: 'ip', type: 'string' },
      { headerName: 'buildingId', keyName: 'buildingId', type: 'number'},
      { headerName: 'floorId', keyName: 'floorId', type: 'number' },
      { headerName: 'zoneId', keyName: 'zoneId', type: 'string' },
      { headerName: 'room', keyName: 'room', type: 'string' },
      { headerName: 'type', keyName: 'type', type: 'string' }
    ]
    const data = await CsvUtiltiess.readBufferAndValidator(reading, CSVConfig);
    console.log(data);


    // const filePath = 'files/CCTV-exclude_roof.csv';
    // const CSVConfig: ValidationConfig = [
    //     { headerName: 'name', keyName: 'name', type: 'string', required: true },
    //     { headerName: 'ip', keyName: 'ip', type: 'string' },
    //     { headerName: 'buildingId', keyName: 'buildingId', type: 'number' },
    //     { headerName: 'floorId', keyName: 'floorId', type: 'number' },
    //     { headerName: 'zoneId', keyName: 'zoneId', type: 'string' },
    //     { headerName: 'room', keyName: 'room', type: 'string' },
    //     { headerName: 'type', keyName: 'type', type: 'string' }
    // ]
    // const data = await CsvUtiltiess.readAndFileValidator(filePath, CSVConfig);
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