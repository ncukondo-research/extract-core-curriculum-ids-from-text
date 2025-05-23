import { convertToUrl,convertToText } from "../../services/extract-exp-id/extract-exp-id"
import { parseOutput } from "../../lib/types";

const baseUrl = "https://flexible-form.vercel.app/v/pEtOtu6xRWOEpjY3V5Iy9Q";


// Receive standard input passed through a pipe
const input = require('fs').readFileSync('/dev/stdin', 'utf8');

const response = parseOutput(JSON.parse(input));

if(!response.success) {
  console.log(response.error.message);
  process.exit(1);
}

const { data } = response;

if(data.status === "failure") {
  console.log(data.message);
  process.exit(1);
}

console.log(data.status);
for(const item of data.data) {
  console.log(`\n\n\n## ${item.id}\n\n`);
  if(item.status === "failure") {
    console.log(item.message);
    continue;
  }
  const idList = item.codes;

  const text = convertToText(idList);
  
  console.log(text);

  console.log(`\n\n[Form Link](${convertToUrl(baseUrl,idList)})`);
  
}

