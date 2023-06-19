import { Workbook } from 'exceljs';
import { bufferToStream } from '../shared/helpers'
import * as path from 'path'
import { parse } from 'papaparse'
import { readFileSync } from 'fs'
import { ValidationConfig } from '../shared/interfaces/csv-file.interfaces';
import { _csvDataAndValidateFile, isDissimilarHeader } from '../validator/csv-file-validator';
import { Readable } from "stream";
const workbook = new Workbook();
class CSV {
    readCsvFileMapArray(csvFilePath: string) {
        const extname = path.extname(csvFilePath);
        if (extname !== '.csv') {
            throw new Error('File is not a CSV');
        }
        return workbook.csv.readFile(csvFilePath)
            .then((worksheet) => {
                const allData: any = [];
                worksheet = workbook.getWorksheet(1);
                worksheet.eachRow((row, rowNumber) => {
                    const rowData: any = [];
                    row.eachCell((cell, colNumber) => {
                        rowData.push(cell.text);
                    });
                    allData.push(rowData);
                });
                return allData;
            })
            .catch((error) => {
                console.error('CSV file is not valid:', error);
            });
    }

    async readBufferMapArray(buffer: Buffer) {
        const stream = bufferToStream(buffer);
        const allData: any = [];
        return workbook.csv.read(stream).then((worksheet) => {
            worksheet = workbook.getWorksheet(1);
            worksheet.eachRow((row, rowNumber) => {
                const rowData: any = [];
                row.eachCell((cell, colNumber) => {
                    rowData.push(cell.text);
                });
                allData.push(rowData);
            });
            return allData;
        }).catch((error) => {
            console.error('CSV file is not valid:', error);
        })
    }


    readAndFileValidator(csvFilePath: string, csvFileConfig: ValidationConfig) {
        return new Promise(function (resolve, reject) {
            if (!csvFileConfig) {
                return resolve({
                    inValidData: [{ message: 'config headers are required' }]
                });
            }
            const csvString = readFileSync(csvFilePath, 'utf-8');
            const result = parse(csvString, { header: true });
            const headers = result.meta.fields;
            const expectedHeaders = csvFileConfig.map(headers => headers.headerName);
            const dissimilarHeader = isDissimilarHeader(expectedHeaders, headers);
            if (dissimilarHeader.headers.length || dissimilarHeader.expectedHeaders.length) {
                let messageError = "Incorrect header names:";
                dissimilarHeader.headers.forEach((element, index) => {
                    messageError += ` ${dissimilarHeader.headers[index]} / ${dissimilarHeader.expectedHeaders[index]},`;
                });
                messageError = messageError.slice(0, -1);
                return resolve({
                    inValidData: [{ message: messageError }],
                });
            }
            parse(csvString, {
                header: true,  
                delimiter: ',', 
                newline: '\n', 
                quoteChar: '"',  
                skipEmptyLines: true, 
                complete: function (results) {
                    const headers = Object.keys(results.data[0]);
                    const expectedHeaders = csvFileConfig.map(headers => headers.headerName);
                    const dissimilarHeader = isDissimilarHeader(expectedHeaders, headers);
                    if (dissimilarHeader.headers.length || dissimilarHeader.expectedHeaders.length) {
                        let messageError = "Incorrect header names:";
                        dissimilarHeader.headers.forEach((element, index) => {
                            messageError += ` ${dissimilarHeader.headers[index]} / ${dissimilarHeader.expectedHeaders[index]},`;
                        });
                        messageError = messageError.slice(0, -1);
                        return resolve({
                            inValidData: [{ message: messageError }],
                        });
                    }
                    const resultValidate = _csvDataAndValidateFile(results.data, csvFileConfig);
                    if (resultValidate.inValidData.length) {
                        return resolve({
                            inValidData: resultValidate.inValidData
                        });
                    }
                    return resolve({
                        data: resultValidate.data
                    });
                },
            });
        });
    }

    readBufferAndValidator(buffer: Buffer, csvFileConfig: ValidationConfig) {
        return new Promise(async function (resolve, reject) {
            if (!csvFileConfig) {
                return resolve({
                    inValidData: [{ message: 'config headers are required' }]
                });
            }
            const stream = Readable.from(buffer);
            parse(stream, {
                header: true,  
                delimiter: ',', 
                newline: '\n',  
                quoteChar: '"', 
                skipEmptyLines: true,  
                complete: function (results: any) {
                    const headers = Object.keys(results.data[0]);
                    const expectedHeaders = csvFileConfig.map(headers => headers.headerName);
                    const dissimilarHeader = isDissimilarHeader(expectedHeaders, headers);
                    if (dissimilarHeader.headers.length || dissimilarHeader.expectedHeaders.length) {
                        let messageError = "Incorrect header names:";
                        dissimilarHeader.headers.forEach((element, index) => {
                            messageError += ` ${dissimilarHeader.headers[index]} / ${dissimilarHeader.expectedHeaders[index]},`;
                        });
                        messageError = messageError.slice(0, -1);
                        return resolve({
                            inValidData: [{ message: messageError }],
                        });
                    }
                    const resultValidate = _csvDataAndValidateFile(results.data, csvFileConfig);
                    if (resultValidate.inValidData.length) {
                        return resolve({
                            inValidData: resultValidate.inValidData
                        });
                    }
                    return resolve({
                        data: resultValidate.data
                    });

                },
            });
        });
    }
}
export const CsvUtilities = new CSV();
