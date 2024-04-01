
// 1.What is one of the primary reasons why concrete is commonly chosen as a building material in construction? A) Aesthetic appeal B) Cost-effectiveness C) Strength and versatility D) Energy efficiency

let generateJsonFromNonNestedList = (listOptions) => {
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
    .split(",");
  console.log("splitQuestionAndOptions", splitQuestionAndOptions);
  question = splitQuestionAndOptions.shift().trim();
  // console.log("question", question);
  options = splitQuestionAndOptions.map((options) => options.trim());
  // console.log("options", options);
  if (listOptions.children && listOptions.children.length > 0) {
    // console.log("elm.children[0].tagName.toLowerCase()",elm.children[0].tagName.toLowerCase())
    if (listOptions.children[0].tagName.toLowerCase() == "strong") {
      // console.log("strong")
      correctOption = listOptions.children[0].textContent;
      correctOption = options.find((option) => correctOption.includes(option));
      correctOptionIndex = options.findIndex((option) =>
        option.includes(correctOption)
      );
    }
  } else {
    console.log(
      "listOptions.children[0].textContent",
      listOptions.style.background
    );
  }
  console.log("correctOption", correctOption);
  console.log("correctOptionIndex", correctOptionIndex);

  return {
    title: question,
    options: options,
    correctOption: correctOption,
    correctOptionIndex: correctOptionIndex,
  };
};

export default generateJsonFromNonNestedList;