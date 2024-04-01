import mammoth from"mammoth";
import { JSDOM } from "jsdom";
import  generateExcelFile  from "./src/generateExcel.js";

//#region MAIN
async function convertWordOrderedListToJson(inputDoc, outputDoc) {
  try {
    //* convert the input docx to html
    const html = await mammoth.convertToHtml({ path: inputDoc });

    //* creating the json using the html
    const json = generateJson(html.value);
    // console.log("tables", json);


    return generateExcelFile(json, outputDoc);
    
  } catch (error) {
    console.error("Error: ", error);
  }
}

//* Use JSDOM to find all ordered list ol in the html output
//* Param: html from the back file generated via mammonth
//* return Json
function generateJson(html) {
  const response = [];
  const updatedHtml = html.replace("<ol>", '<ol id="list">');
  console.log(updatedHtml);

  // creating dom object
  const dom = new JSDOM(`<!DOCTYPE html><body>${updatedHtml}</body></html>`);
  // console.log("html", dom);

  // getting the document from the dom object
  const document = dom.window.document;

  // selecting the list by id and fetching all the line items (li) in it an iteratable list
  const parent = document.getElementById("list");
  const orderedList = parent.querySelectorAll("#list>li");
  // console.log(orderedList);

  // console.log("HTMLLiElement: ", JSON.stringify(orderedList));

  // Iterating over the orderedlist (questions)
  orderedList.forEach((listOptions, tableIndex) => {
    // console.log("listOptions:",listOptions.children, listoptions., listOptions.firstChild.nodeType, listOptions.firstChild.textContent);
    // listOptions.querySelectorAll('li');

    let isNestedList = hasChildElementAsAnotherList(listOptions);

    
  if(isNestedList)
  {  
    const question = listOptions.firstChild.textContent;
    let options = []; // Array of Question options
    let correctOption = null; // Correction option string
    let correctOptionIndex = null; // correct option array index

    // Iterating over the question options
    listOptions.querySelectorAll("li").forEach((item, index) => {
      // Check if the question option is bold or not
      // Bold means it is the correct option
      // setting the correction option and its array index
      let isBold = isOptionBold(item);
      if (isBold) {
        correctOption = item.textContent;
        correctOptionIndex = index;
      }
      // console.log("isBold", isBold);
      // console.log("item:", item.textContent);
      // appending the question options in an array
      options.push(item.textContent);
    });

    // Appending the question, its options and correct response to an array of jsons
    response.push({
      title: question,
      options: options,
      correctOption: correctOption,
      correctOptionIndex: correctOptionIndex,
    });
  }
  else{
    console.log("isNestedList",isNestedList)
    const text = listOptions.textContent;
    let question = null;
    let options = []; // Array of Question options
    let correctOption = null; // Correction option string
    let correctOptionIndex = null; // correct option array index
    
let splitQuestionAndOptions = text
        .split("A)")
        .join(",")
        .split("B)")
        .join(",")
        .split("C)")
        .join(",")
        .split("D)")
        .join(",")
        .split(",")
    console.log("splitQuestionAndOptions", splitQuestionAndOptions);
    question = splitQuestionAndOptions.shift().trim();
    // console.log("question", question);
    options = splitQuestionAndOptions.map((options) => options.trim());
    // console.log("options", options);
    if (listOptions.children && listOptions.children.length > 0) {
      // console.log("elm.children[0].tagName.toLowerCase()",elm.children[0].tagName.toLowerCase())
      if (listOptions.children[0].tagName.toLowerCase() == "strong") {
        // console.log("strong")
        correctOption = listOptions.children[0].textContent
        correctOption = options.find(option => correctOption.includes(option))
        correctOptionIndex = options.findIndex(option => option.includes(correctOption))
      }

    }
    else{
        console.log("listOptions.children[0].textContent",listOptions.style.background)
    }
    console.log("correctOption", correctOption);
    console.log("correctOptionIndex", correctOptionIndex);

    response.push({
      title: question,
      options: options,
      correctOption: correctOption,
      correctOptionIndex: correctOptionIndex,
    });


  }
  });

  // console.log("response",response)
  return response;
}

// Checking if the question option is bold or not
function isOptionBold(item) {
  // console.log("item.nodeType",item.nodeType);

  //https://www.w3schools.com/jsref/prop_node_nodetype.asp
  // If the node is an element node, the nodeType property will return 1.
  // Check if the option is of node type (not text type)
  if (item.nodeType === 1) {
    // Check if the child option is also of node type (not text type)
    if (item.firstChild.nodeType === 1) {
      // console.log("sel.firstChild",item.firstChild.tagName);

      // item.firstChild.tagName
      var tag = item.firstChild.tagName.toLowerCase();
      return ["strong", "b"].some((boldTag) => boldTag == tag);
    }
  }
  return false;
}

function hasChildElementAsAnotherList(elm) {

    if (elm.children && elm.children.length > 0) {
        console.log("elm.children[0].tagName.toLowerCase()",elm.children.length)
        if(elm.children[0].tagName.toLowerCase() == 'ol'){
          return true
        }
    }
   return false
}

//* Location of your input docx
//* Location of your output xlsx
const inputPath = "example.docx";
const outputPath = "example.xlsx";

convertWordOrderedListToJson(inputPath, outputPath);
//! Run this from command line using `node index.js`
