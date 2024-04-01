

// Checking if the question option is bold or not
let  isOptionBold = (item) => {
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
export default isOptionBold;