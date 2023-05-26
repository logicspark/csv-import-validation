
import { ValidatorConfig, ParsedResults, RowError } from '../../src/shared/interfaces/csv-file.interfaces';
import { isEmpty, isString, isFunction, isNumber, isNull } from "lodash";
import { ColumnTypes } from '../shared/interfaces/column-types.interfaces';
export function _csvDataAndValidateFile(csvData: any[], config: ValidatorConfig) {
    const file: ParsedResults = {
        inValidData: [],
        data: []
    };
    csvData.forEach(function (row, rowIndex) {
        const columnData: any = {};
        config.headers.forEach(function (column, columnIndex) {
            const valueConfig = config.headers[columnIndex];
            let columnVal = row[column.name];
            if (!columnValidateType(columnVal, valueConfig.type)) {
                file.inValidData.push({
                    rowIndex: rowIndex + 1,
                    columnIndex: columnIndex,
                    message: isFunction(valueConfig.requiredError)
                        ? valueConfig.requiredError(valueConfig.name, rowIndex + 1, columnIndex)
                        : String(valueConfig.name + ` is Type ${valueConfig.type} in the ` + (rowIndex + 1) + ' row / ' + (columnIndex) + ' column')
                });
            }
            if (valueConfig.required && (isNull(columnVal) || isEmpty(columnVal))) {
                file.inValidData.push({
                    rowIndex: rowIndex + 1,
                    columnIndex: columnIndex,
                    message: isFunction(valueConfig.requiredError)
                        ? valueConfig.requiredError(valueConfig.name, rowIndex + 1, columnIndex)
                        : String(valueConfig.name + ' is required in the ' + (rowIndex + 1) + ' row / ' + (columnIndex) + ' column')
                });
            }
            columnData[valueConfig.keyName] = convertType(columnVal ,valueConfig.type);
        });
        file.data.push(columnData);
    })
    return file;
}

function columnValidateType(columnVal: string, typeColumn: string) {
    if (typeColumn === 'number') {
        if (isNaN(Number(columnVal))) {
            return false;
        }
    } else if (typeColumn === 'srting') {
        if (typeof columnVal !== 'string') {
            return false;
        }
    } else if (typeColumn === 'boolean') {
        if (columnVal.toLowerCase() !== 'true' || columnVal.toLowerCase() !== 'false') {
            return false
        }
    }
    return true;
}


function convertType(value: string, type: string) {
    if (type === 'number') {
        if (value !== '') {
            return Number(value)
        } else {
            return null;
        }
    } else if (type === 'string') {
        return String(value);
    } else if (type === 'boolean') {
        return Boolean(value);
    }
}



