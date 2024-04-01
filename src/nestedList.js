import isOptionBold from "./helper.js";


// 4.What is a key element of human resource planning?
//     a.Project management
//     b.Customer service
//     c.Workforce forecasting
//     d.Financial analysis


let generateJsonFromNestedList = (listOptions) => {
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
  return {
    title: question,
    options: options,
    correctOption: correctOption,
    correctOptionIndex: correctOptionIndex,
  };
};


export default generateJsonFromNestedList;