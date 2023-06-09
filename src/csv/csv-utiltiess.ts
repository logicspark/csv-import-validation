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
    readCsvFileMapArrny(csvFilePath: string) {
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

    async readBufferMapArrny(buffer: Buffer) {
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


    readAndFileValidator(csvFilePath: string, csvfileConfig: ValidationConfig) {
        return new Promise(function (resolve, reject) {
            if (!csvfileConfig) {
                return resolve({
                    inValidData: [{ message: 'config headers are required' }],
                    data: []
                });
            }
            const csvString = readFileSync(csvFilePath, 'utf-8');
            const result = parse(csvString, { header: true });
            const headers = result.meta.fields;
            const expectedHeaders = csvfileConfig.map(headers => headers.headerName);
            const dissimilarHeader = isDissimilarHeader(expectedHeaders, headers);
            if (dissimilarHeader.headers.length || dissimilarHeader.expectedHeaders.length) {
                return resolve({
                    inValidData: [{ message: `Expected headers ${dissimilarHeader.expectedHeaders}, but got ${dissimilarHeader.headers}` }],
                    data: []
                });
            }
            parse(csvString, {
                header: true,  // ระบุว่าไม่มี header
                delimiter: ',',  // กำหนดตัวคั่นคอลัมน์
                newline: '\n',  // กำหนดตัวขึ้นบรรทัดใหม่
                quoteChar: '"',  // กำหนดตัว quote
                skipEmptyLines: true,  // ระบุว่าต้องการข้ามแถวที่ไม่มีข้อมูล
                complete: function (results) {
                    return resolve(_csvDataAndValidateFile(results.data, csvfileConfig))
                },
            });
        });
    }

    readBufferAndValidator(buffer: Buffer, csvfileConfig: ValidationConfig) {
        return new Promise(async function (resolve, reject) {
            if (!csvfileConfig) {
                return resolve({
                    inValidData: [{ message: 'config headers are required' }],
                    data: []
                });
            }
            const stream = Readable.from(buffer);
            parse(stream, {
                header: true,  // ระบุว่าไม่มี header
                delimiter: ',',  // กำหนดตัวคั่นคอลัมน์
                newline: '\n',  // กำหนดตัวขึ้นบรรทัดใหม่
                quoteChar: '"',  // กำหนดตัว quote
                skipEmptyLines: true,  // ระบุว่าต้องการข้ามแถวที่ไม่มีข้อมูล
                complete: function (results: any) {
                    const headers = Object.keys(results.data[0]);
                    const expectedHeaders = csvfileConfig.map(headers => headers.headerName);
                    const dissimilarHeader = isDissimilarHeader(expectedHeaders, headers);
                    if (dissimilarHeader.headers.length || dissimilarHeader.expectedHeaders.length) {
                        return resolve({
                            inValidData: [{ message: `Expected headers ${dissimilarHeader.expectedHeaders}, but got ${dissimilarHeader.headers}` }],
                            data: []
                        });
                    }

                    return resolve(_csvDataAndValidateFile(results.data, csvfileConfig))
                },
            });
        });
    }
}
export const CsvUtiltiess = new CSV();
