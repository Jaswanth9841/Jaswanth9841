import React, { useState } from "react";
import * as XLSX from "xlsx";

function ImportFile() {
  const [excelData, setExcelData] = useState();

  //Simple Format for Extracting Import Data
  const parseExcelFileIntoJSON = async (event) => {
    const [selectedFile] = event.target.files;
    const data = await selectedFile.arrayBuffer();

    const workBook = XLSX.read(data);
    console.log(workBook);
    const sheetDataJSON = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < workBook.SheetNames.length; i++) {
      const sheetName = workBook.SheetNames[i];

      const workSheet = workBook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(workSheet);
      sheetDataJSON.push(...jsonData);
    }

    return setExcelData(sheetDataJSON);
  };
  console.log(excelData);

  return (
    <div>
      <input type="file" onChange={parseExcelFileIntoJSON} />
    </div>
  );
}

export default ImportFile;
