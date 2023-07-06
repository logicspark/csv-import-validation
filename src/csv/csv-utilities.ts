import { Workbook } from "exceljs";
import * as path from "path";
import { parse } from "papaparse";
import { readFileSync } from "fs";
import { Readable } from "stream";

import { ValidationConfig } from "../shared/interfaces/csv-file.interfaces";
import { bufferToStream } from "../shared/helpers";
import {
  _csvDataValidateFile,
  validateHeaders,
} from "../validator/csv-file-validator";

const workbook = new Workbook();

class CSV {
  readCsvFileMapArray(csvFilePath: string) {
    const extname = path.extname(csvFilePath);
    if (extname !== ".csv") {
      throw new Error("File is not a CSV");
    }
    return workbook.csv
      .readFile(csvFilePath)
      .then((worksheet) => {
        const allData: any = [];
        worksheet = workbook.getWorksheet(1);
        worksheet.eachRow((row, _) => {
          const rowData: any = [];
          row.eachCell((cell, _) => {
            rowData.push(cell.text);
          });
          allData.push(rowData);
        });
        return allData;
      })
      .catch((error) => {
        console.error("CSV file is not valid:", error);
      });
  }

  async readBufferMapArray(buffer: Buffer) {
    const stream = bufferToStream(buffer);
    const allData: any = [];
    return workbook.csv
      .read(stream)
      .then((worksheet) => {
        worksheet = workbook.getWorksheet(1);
        worksheet.eachRow((row, _) => {
          const rowData: any = [];
          row.eachCell((cell, _) => {
            rowData.push(cell.text);
          });
          allData.push(rowData);
        });
        return allData;
      })
      .catch((error) => {
        console.error("CSV file is not valid:", error);
      });
  }

  readFileValidator(csvFilePath: string, csvFileConfig: ValidationConfig) {
    return new Promise(function (resolve, _) {
      if (!csvFileConfig) {
        return resolve({
          inValidData: [{ message: "config headers are required" }],
        });
      }

      const csvString = readFileSync(csvFilePath, "utf-8");
      const result = parse(csvString, { header: true });
      const headers = result.meta.fields;
      const expectedHeaders = csvFileConfig.map(
        (headers) => headers.headerName
      );

      const messageError = validateHeaders(expectedHeaders, headers);
      if (messageError) {
        return resolve({
          inValidData: [{ message: messageError }],
        });
      }

      parse(csvString, {
        header: true,
        delimiter: ",",
        newline: "\n",
        quoteChar: '"',
        skipEmptyLines: true,
        complete: function (results) {
          const headers = Object.keys(results.data[0]);
          const expectedHeaders = csvFileConfig.map(
            (headers) => headers.headerName
          );

          const messageError = validateHeaders(expectedHeaders, headers);
          if (messageError) {
            return resolve({
              inValidData: [{ message: messageError }],
            });
          }

          const resultValidate = _csvDataValidateFile(
            results.data,
            csvFileConfig
          );
          if (resultValidate.invalidData.length) {
            return resolve({
              inValidData: resultValidate.invalidData,
            });
          }

          return resolve({
            data: resultValidate.data,
          });
        },
      });
    });
  }

  readBufferValidator(buffer: Buffer, csvFileConfig: ValidationConfig) {
    return new Promise(function (resolve, _) {
      if (!csvFileConfig) {
        return resolve({
          inValidData: [{ message: "config headers are required" }],
        });
      }

      const stream = Readable.from(buffer);
      parse(stream, {
        header: true,
        delimiter: ",",
        newline: "\n",
        quoteChar: '"',
        skipEmptyLines: true,
        complete: function (results: any) {
          const headers = Object.keys(results.data[0]);
          const expectedHeaders = csvFileConfig.map(
            (headers) => headers.headerName
          );

          const messageError = validateHeaders(expectedHeaders, headers);
          if (messageError) {
            return resolve({
              inValidData: [{ message: messageError }],
            });
          }

          const resultValidate = _csvDataValidateFile(
            results.data,
            csvFileConfig
          );
          if (resultValidate.invalidData.length) {
            return resolve({
              inValidData: resultValidate.invalidData,
            });
          }

          return resolve({
            data: resultValidate.data,
          });
        },
      });
    });
  }
}
export const CsvUtilities = new CSV();
