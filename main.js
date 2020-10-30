/**
 * Santiago Yanguas
 * 
 * Bring jokes at the designs
 */
let panel;


/**
* Make a new html
*/
function create() {
  const build = require("./html.js");
  const joke = require("./create.js");


  panel = document.createElement("div");
  panel.innerHTML = build.html;
  panel.querySelector("form").addEventListener("submit", joke);

  return panel;
}



/**
* Shorthand for creating Elements.
* @param {event} event Contain the event to modify
*/
function show(event) {
  if (!panel) event.node.appendChild(create());
}


/**
* Shorthand for creating Elements.
* @param {selection} selection object to look current items in work-table 
*/
function update(selection) {
  const { Text, Rectangle } = require("scenegraph");

  const form = document.querySelector("form");
  const warning = document.querySelector("#warning");

  if (!selection || (!(selection.items[0] instanceof Text)) || (!(selection.items[0] instanceof Rectangle))) {
    form.className = "hide";
    warning.className = "show";
  } else {
    form.className = "show";
    warning.className = "hide";
  }
}

module.exports = {
  panels: {
    enlargeRectangle: {
      show,
      update
    }
  }
};