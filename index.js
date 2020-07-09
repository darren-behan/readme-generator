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
      name: "github",
      message: "🌍 Enter your GitHub username"
    },
    {
      type: "input",
      name: "github_repo",
      message: "⚡️ Enter your GitHub repo name"
    },
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
      message: "🚨 Steps to use this app"
    },
    {
      type: "input",
      name: "code_base",
      message: "📖  Main Code Base"
    },
    {
      type: "input",
      name: "license",
      message: "🖋  License number"
    },
    {
      type: "input",
      name: "contributing",
      message: "👩‍💻How to contribute"
    },
    {
      type: "input",
      name: "tests",
      message: "🧪 List the tests for the app"
    },
    {
      type: "input",
      name: "questions",
      message: "❓ Questions"
    }
  ]);
}

// function to generate the content required for the file being created
function generateReadMe(answers) {
  return `
  ![Code Structure](https://img.shields.io/badge/code-${answers.code_base}-green) ![License Badge](https://img.shields.io/badge/license-${answers.license[0]}-blue) ![Last Commit](https://img.shields.io/github/last-commit/${answers.github}/${answers.github_repo}) ![Open Issues](https://img.shields.io/github/issues-raw/${answers.github}/${answers.github_repo}) ![Repo Size](https://img.shields.io/github/repo-size/${answers.github}/${answers.github_repo})\n
  # Welcome to ${answers.title} 👋\n
  ## Description\n
  📚 ${answers.description}\n
  ## Table of Contents 🗂\n
  * [Description](#Description)
  * [Installation](#Installation)
  * [Usage](#Usage)
  * [License](#License)
  * [Contributing](#Contributing)
  * [Tests](#Tests)
  * [Questions](#Questions)\n
  ## Installation\n
  ⚙️ ${answers.installation}\n
  ## Usage\n
  🚨 ${answers.usage}\n
  ## License\n
  🖋 $![License Badge](https://img.shields.io/badge/license-${answers.license[0]}-blue)\n
  ## Contributing\n
  👩‍💻 ${answers.contributing}\n
  ## Tests\n
  🧪 ${answers.tests}\n
  ## Questions\n
  ❓ ${answers.questions}\n
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