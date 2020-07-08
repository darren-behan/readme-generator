var inquirer = require("inquirer");
// fs is a Node standard library package for reading and writing files
var fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "👤 Project title"
    },
    {
      type: "input",
      name: "description",
      message: "📚 Project description"
    },
    // {
    //   type: "input",
    //   name: "installation",
    //   message: "Provide an explanation on how to install your application."
    // },
    // {
    //   type: "input",
    //   name: "usage",
    //   message: "Provide an explanation on how to use your application."
    // },
    // {
    //   type: "input",
    //   name: "license",
    //   message: "Provide the license number for your application."
    // },
    // {
    //   type: "input",
    //   name: "contributing",
    //   message: "Provide an explanation on how to contribute to your application."
    // },
    // {
    //   type: "input",
    //   name: "tests",
    //   message: "Provide an explanation on how to test to your application."
    // },
    // {
    //   type: "input",
    //   name: "questions",
    //   message: "Provide questions that if answered, will help enhance your application."
    // }
  ]);
}

function generateReadMe(answers) {
  return `
  # Welcome to ${answers.title} 👋\n
  ## Description\n
  ${answers.description}\n
  ## Table of Contents\n
    * [Installation](#installation)
    * [Usage](#usage)
    * [License](#license)
    * [Contributing](#contributing)
    * [Tests](#tests)
    * [Questions](#questions)\n
  
  `;
}

async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const readme = generateReadMe(answers);

    await writeFileAsync("README.md", readme);

    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }
}

init();