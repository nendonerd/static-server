const fs = require("fs");
const fsP = fs.promises;
const lib = {};

/**
 * @param {string} file
 */
lib.write = (file, data, flag = "wx") => {
  data = JSON.stringify(data);

  fsP
    .writeFile(file, data, { flag })
    .then(console.log("creating file successfully"))
    .catch(err => console.log("Error: " + err));
};

lib.read = file => fsP.readFile(file, { encoding: "utf8" });

lib.delete = file => fsP.unlink(file);

// TESTING
// lib.write('./fileP.json', { a: 'b' }, 'w')
// lib.read("./fileP.json").then(console.log);
// lib.delete("./fileP.json");
