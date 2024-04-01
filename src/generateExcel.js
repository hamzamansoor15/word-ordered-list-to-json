import XLSX from "xlsx"
import K from './constants.js'

let generateExcelFile = (json) => {
  let formatData = json.map((item) => {
    console.log("item", item.title);
    return [
      "MC",
      "5",
      item.title,
      ...item.options.map((option, index) => {
        let opt = option;
        if ((item.correctOption == option, item.correctOptionIndex === index)) {
          opt = "*" + option;
        }
        return opt;
      }),
    ];
  });

  console.log("format", formatData);
  formatData.unshift(K.HEADER);

  //* Generate a new file containing sheet called 'Questions'
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet(formatData);
  XLSX.utils.book_append_sheet(workbook, sheet, K.SHEET_NAME);

  XLSX.writeFile(workbook, K.OUTPUT_PATH);
  console.log("Success!");
};

export default generateExcelFile;
