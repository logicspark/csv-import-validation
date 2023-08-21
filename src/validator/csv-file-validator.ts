import { isEmpty, isFunction, isNull } from "lodash";
import {
  ValidationConfig,
  ParsedResults,
} from "../shared/interfaces/csv-file.interfaces";

export function _csvDataValidateFile(csvData: any[], config: ValidationConfig) {
  const file: ParsedResults = {
    invalidData: [],
    data: [],
  };

  csvData.forEach(function (row, rowIndex) {
    const columnData: any = {};
    config.forEach(function (column, columnIndex) {
      const valueConfig = config[columnIndex];
      const columnVal = row[column.headerName];

      if (!validateColumnType(columnVal, valueConfig.type)) {
        file.invalidData.push({
          rowIndex: rowIndex + 1,
          columnIndex: colNumberToColName(columnIndex + 1),
          message: isFunction(valueConfig.requiredError)
            ? valueConfig.requiredError(
              valueConfig.headerName,
              rowIndex + 1,
              columnIndex
            )
            : `${valueConfig.headerName}'s type is ${valueConfig.type}.`,
        });
      }

      if (valueConfig.required && (isNull(columnVal) || isEmpty(columnVal))) {
        file.invalidData.push({
          rowIndex: rowIndex + 1,
          columnIndex: colNumberToColName(columnIndex + 1),
          message: isFunction(valueConfig.requiredError)
            ? valueConfig.requiredError(
              valueConfig.headerName,
              rowIndex + 1,
              columnIndex
            )
            : `${valueConfig.headerName}'s is required.`,
        });
      }

      columnData[valueConfig.keyName] = convertType(
        columnVal,
        valueConfig.type
      );
      
      if (valueConfig.unique) {
        const valUnique = file.data.find((el) => el[valueConfig.keyName] === columnData[valueConfig.keyName]);
        if (valUnique) {
          file.invalidData.push({
            rowIndex: rowIndex + 1,
            columnIndex: colNumberToColName(columnIndex + 1),
            message: isFunction(valueConfig.requiredError)
              ? valueConfig.requiredError(
                valueConfig.headerName,
                rowIndex + 1,
                columnIndex
              )
              : `${valueConfig.headerName} must be unique.`,
          });
        }
      }

    });
    file.data.push(columnData);
  });
  console.log(file);

  return file;
}

export function validateHeaders(expectedHeaders: string[], headers: string[]) {
  const dissimilarHeader = isDissimilarHeader(expectedHeaders, headers);
  if (
    dissimilarHeader.headers.length ||
    dissimilarHeader.expectedHeaders.length
  ) {
    let messageError = "Incorrect header names:";
    dissimilarHeader.headers.forEach((_, index) => {
      messageError += ` ${dissimilarHeader.headers[index]} / ${dissimilarHeader.expectedHeaders[index]},`;
    });
    messageError = messageError.slice(0, -1);
    return messageError;
  }

  return null;
}

export function isDissimilarHeader(
  expectedHeaders: string[],
  headers: string[]
) {
  return {
    expectedHeaders: headers.filter(
      (element) => !expectedHeaders.includes(element)
    ),
    headers: expectedHeaders.filter((element) => !headers.includes(element)),
  };
}

function validateColumnType(columnVal: string, typeColumn: string) {
  switch (typeColumn) {
    case "number":
      return !isNaN(Number(columnVal));
    case "boolean":
      return ['true', 'false','0','1'].includes(columnVal.toLowerCase())
    default:
      return true;
  }
}

function convertType(value: string, type: string) {
  switch (type) {
    case "number":
      return value !== "" ? Number(value) : null;
    case "string":
      return String(value);
    case "boolean": {
      const myBool = (value.toLowerCase() === 'true' || Number(value) > 0);
      return myBool;
    }
    default:
      return value;
  }
}

function colNumberToColName(columnNumber: number) {
  let columnName: any = [];
  while (columnNumber > 0) {
    let rem = columnNumber % 26;

    if (rem == 0) {
      columnName.push("Z");
      columnNumber = Math.floor(columnNumber / 26) - 1;
    } // If remainder is non-zero
    else {
      columnName.push(String.fromCharCode(rem - 1 + "A".charCodeAt(0)));
      columnNumber = Math.floor(columnNumber / 26);
    }
  }

  return columnName.reverse().join("");
}
