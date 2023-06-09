
import { ValidationConfig, ParsedResults, RowError } from '../../src/shared/interfaces/csv-file.interfaces';
import { isEmpty, isString, isFunction, isNumber, isNull } from "lodash";
export function _csvDataAndValidateFile(csvData: any[], config: ValidationConfig) {
    const file: ParsedResults = {
        inValidData: [],
        data: []
    };

    csvData.forEach(function (row, rowIndex) {
        const columnData: any = {};
        config.forEach(function (column, columnIndex) {
            const valueConfig = config[columnIndex];
            let columnVal = row[column.headerName];
            if (!columnValidateType(columnVal, valueConfig.type)) {
                file.inValidData.push({
                    rowIndex: rowIndex + 1,
                    columnIndex: colNumberToColName(columnIndex + 1),
                    message: isFunction(valueConfig.requiredError)
                        ? valueConfig.requiredError(valueConfig.headerName, rowIndex + 1, columnIndex)
                        : `${valueConfig.headerName}'s type is ${valueConfig.type}.`
                });
            }
            if (valueConfig.required && (isNull(columnVal) || isEmpty(columnVal))) {
                file.inValidData.push({
                    rowIndex: rowIndex + 1,
                    columnIndex: columnIndex,
                    message: isFunction(valueConfig.requiredError)
                        ? valueConfig.requiredError(valueConfig.headerName, rowIndex + 1, columnIndex)
                        : String(valueConfig.headerName + ' is required in ' + ' row / ' + (rowIndex + 1) + ', column' + colNumberToColName(columnIndex))
                });
            }
            columnData[valueConfig.keyName] = convertType(columnVal, valueConfig.type);
        });
        file.data.push(columnData);
    })
    return file;
}

export function isDissimilarHeader(expectedHeaders: String[], headers: String[]) {
    return {
        expectedHeaders: headers.filter(element => !expectedHeaders.includes(element)),
        headers: expectedHeaders.filter(element => !headers.includes(element))
    }
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

function colNumberToColName(columnNumber: number) {
    let columnName: any = [];
    while (columnNumber > 0) {
        let rem = columnNumber % 26;
        if (rem == 0) {
            columnName.push("Z");
            columnNumber = Math.floor(columnNumber / 26) - 1;
        }
        else // If remainder is non-zero
        {
            columnName.push(String.fromCharCode((rem - 1) + 'A'.charCodeAt(0)));
            columnNumber = Math.floor(columnNumber / 26);
        }
    }
    return columnName.reverse().join("")
}






