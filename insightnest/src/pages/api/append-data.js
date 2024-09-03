import { read, utils, writeFile } from 'xlsx';
import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  
  if (req.method === 'POST') {
    const { title, tags, description, reference } = req.body;

    // Read the existing Excel file
    const filePath = path.resolve('./public/data', 'data.xlsx');
    const workbook = read(fs.readFileSync(filePath), { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert the worksheet to JSON
    const jsonData = utils.sheet_to_json(worksheet);

    // Append the new data
    jsonData.push({ title, tags, description, reference });

    // Convert JSON back to worksheet
    const newWorksheet = utils.json_to_sheet(jsonData);
    workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;

    // Write the updated workbook to the file
    writeFile(workbook, filePath);

    res.status(200).json({ message: 'Data appended successfully' });
  } else {
    res.status(405).json({ message: 'Method not test allowed' });
  }
}
