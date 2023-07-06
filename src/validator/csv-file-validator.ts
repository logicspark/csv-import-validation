import { isEmpty, isFunction, isNull } from "lodash";
import {
  ValidationConfig,
  ParsedResults,
} from "../shared/interfaces/csv-file.interfaces";

export function _csvDataValidateFile(csvData: any[], config: ValidationConfig) {
  const file: ParsedResults = {
    inValidData: [],
    data: [],
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
            ? valueConfig.requiredError(
                valueConfig.headerName,
                rowIndex + 1,
                columnIndex
              )
            : `${valueConfig.headerName}'s type is ${valueConfig.type}.`,
        });
      }

      if (valueConfig.required && (isNull(columnVal) || isEmpty(columnVal))) {
        file.inValidData.push({
          rowIndex: rowIndex + 1,
          columnIndex: columnIndex,
          message: isFunction(valueConfig.requiredError)
            ? valueConfig.requiredError(
                valueConfig.headerName,
                rowIndex + 1,
                columnIndex
              )
            : `${valueConfig.headerName} is required in row / ${
                rowIndex + 1
              }, column ${colNumberToColName(columnIndex)}
                  (rowIndex + 1) +
                  ", column" +
                  colNumberToColName(columnIndex)`,
        });
      }

      columnData[valueConfig.keyName] = convertType(
        columnVal,
        valueConfig.type
      );
    });

    file.data.push(columnData);
  });
  return file;
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

function columnValidateType(columnVal: string, typeColumn: string) {
  switch (typeColumn) {
    case "number":
      return !isNaN(Number(columnVal));
    case "string":
      return !(typeof columnVal !== "string");
    case "boolean":
      return !(
        columnVal.toLowerCase() !== "true" ||
        columnVal.toLowerCase() !== "false"
      );
    default:
      return true;
  }
}

function convertType(value: string, type: string) {
  switch (type) {
    case "number":
      return Number(value) ? value !== "" : null;
    case "string":
      return String(value);
    case "boolean": {
      return Boolean(value);
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
