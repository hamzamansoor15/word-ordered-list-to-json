import XLSX from "xlsx"

let generateExcelFile = (json, outputDoc) => {
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
  let header = [
    "//Question Type",
    "//Points",
    "	//Question Text",
    "//Answer Choice 1",
    "//Answer Choice 2",
    "//Answer Choice 3",
    "//Answer Choice 4",
    "//Answer Choice 5",
    "//Answer Choice 6",
    "//Answer Choice 7",
    "	//Answer Choice 8",
    "//Answer Choice 9",
    "//Answer Choice 10",
  ];

  console.log("format", formatData);
  formatData.unshift(header);

  //* Generate a new file containing sheet called 'Questions'
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet(formatData);
  XLSX.utils.book_append_sheet(workbook, sheet, `Questions`);

  XLSX.writeFile(workbook, outputDoc);
  console.log("Success!");
};

export default generateExcelFile;
