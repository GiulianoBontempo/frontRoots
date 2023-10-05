import * as XLSX from 'xlsx';
import {nodeNames} from './graphs'; // Import graph data

// Create a new workbook
const workbook = XLSX.utils.book_new();

// Create a new worksheet
const headers = ['Node', 'Age']; // Initialize with a default header
const sheetData = [
  ['Alice', 30],
  ['Bob', 25],
  ['Charlie', 35]
];

// Append nodeNames to headers if available
if (nodeNames && Array.isArray(nodeNames)) {
  headers.unshift(...nodeNames); // Add nodeNames to the beginning of headers
}

const worksheetData = [headers, ...sheetData];
const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

// Add the worksheet to the workbook
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

// Write the workbook to a file
XLSX.writeFile(workbook, 'example.xlsx');

console.log("Excel sheet created successfully!");
