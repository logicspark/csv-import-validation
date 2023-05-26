import { ParseConfig } from 'papaparse';

export interface FieldSchema {
	name: string;
	keyName: string;
	type: 'boolean' | 'number' | 'string';
	optional?: boolean;
	required?: boolean;
	unique?: boolean;
	isArray?: boolean;
	headerError?: (headerValue: string, headerName: string, rowNumber: number,
		columnNumber: number) => string;
	requiredError?: (headerName: string, rowNumber: number,
		columnNumber: number) => string;
}

export interface RowError {
	rowIndex?: number;
	columnIndex?: number;
	message: string;
}

export interface ParsedResults<Row = any, Error = RowError> {
	data: Row[];
	inValidData: Error[];
}

export interface ValidatorConfig {
	headers: FieldSchema[];
}
