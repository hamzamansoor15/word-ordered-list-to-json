import mammoth from"mammoth";
import { JSDOM } from "jsdom";
import  generateExcelFile  from "./src/generateExcel.js";
import generateJsonFromNestedList from "./src/nestedList.js";
import generateJsonFromNonNestedList from "./src/unNestedList.js";
import K from "./src/constants.js";

//#region MAIN
async function convertWordOrderedListToJson() {
  try {
    //* convert the input docx to html
    const html = await mammoth.convertToHtml({ path: K.INPUT_PATH });

    //* creating the json using the html
    const json = generateJson(html.value);
    // console.log("tables", json);


    return generateExcelFile(json);
    
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
   let questionOptions = generateJsonFromNestedList(listOptions);

    // Appending the question, its options and correct response to an array of jsons
    response.push(questionOptions);
  }
  else{

   let questionOptions = generateJsonFromNonNestedList(listOptions);


    response.push(questionOptions);


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
