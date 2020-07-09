// Inquirer is used to prompt users in the terminal
var inquirer = require("inquirer");
// fs is a Node standard library package for reading and writing files
var fs = require("fs");
// util is used for node.js internal APIs
const util = require("util");

// function to write the file based on user data returning resolved if successful or reject if there was an error
const writeFileAsync = util.promisify(fs.writeFile);

// function to prompt the user with a series of questions to gather data for the file being created
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
    {
      type: "input",
      name: "installation",
      message: "⚙️  Provide installation instructions"
    },
    {
      type: "input",
      name: "usage",
      message: "Provide an explanation on how to use your application."
    },
    {
      type: "input",
      name: "license",
      message: "Provide the license number for your application."
    },
    {
      type: "input",
      name: "contributing",
      message: "Provide an explanation on how to contribute to your application."
    },
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

// function to generate the content required for the file being created
function generateReadMe(answers) {
  return `
  https://img.shields.io/github/package-json/v/darren-behan/readme-generator \n
  .. image:: https://img.shields.io/github/package-json/v/darren-behan/readme-generator   :alt: GitHub package.json version \n
  .. image:: https://img.shields.io/github/package-json/v/darren-behan/readme-generator   :alt: GitHub package.json version \n
  # Welcome to ${answers.title} 👋\n
  ## Description 📚\n
  ${answers.description}\n
  ## Table of Contents 🗂\n
    * [Installation](#installation)
    * [Usage](#usage)
    * [License](#license)
    * [Contributing](#contributing)
    * [Tests](#tests)
    * [Questions](#questions)\n
  ## Installation ⚙️\n
  ${answers.installation}\n
  ## Usage 🚨\n
  ${answers.usage}\n
  ## License 🖋\n
  ${answers.license}\n
  ## Contributing 👩‍💻\n
  ${answers.contributing}\n
  `;
}

async function init() {
  console.log("hi");
  try {
    // function pauses whilst gathering user data through the promptUser function and stores the data in "answers"
    const answers = await promptUser();

    // the answers from above are passed into the generateReadMe function which is stored in "readme"
    const readme = generateReadMe(answers);

    // function pauses whilst writing the file with the content from "readme"
    await writeFileAsync("README.md", readme);

    // notifies the user if successful
    console.log("Successfully wrote to README.md");
  } catch(err) {
    // notifies the user if there was an error
    console.log(err);
  }
}

init();