const searchButton = document.querySelector('.search-button');
const responseLog = document.querySelector('.response-log');
const searchBox = document.querySelector('.search-input');
const greeting = document.querySelector('.greeting')

searchButton.addEventListener('click', () => {
  const userInput = searchBox.value;
  generateResponseHtml(userInput);
})

searchBox.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    const userInput = searchBox.value;
  generateResponseHtml(userInput);
  }
})


async function generateResponseHtml(input) {
  greeting.style.display = "none";
  searchBox.value = "";
  const userDiv = document.createElement('div');
  userDiv.classList.add('user-div');
  responseLog.appendChild(userDiv);
  
  
  const userMSG = document.createElement('p');
  userMSG.textContent = input;
  userMSG.classList.add('user-msg');
  userDiv.appendChild(userMSG);

  const responseData = await fetch('https://api.anthropic.com/v1/messages', {
    method: "POST",
    headers: {
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true"
},

body:  JSON.stringify({
   model: "claude-haiku-4-5",
    messages: [
      {role: "user", content: input }
    ],
    max_tokens: 1024
})
  })

  const inputData = await responseData.json();

  console.log(inputData);

  const aiResponse = inputData.content[0].text;

    const aiDiv = document.createElement('div');
  aiDiv.classList.add('ai-div');
  responseLog.appendChild(aiDiv);

  const aiMSG = document.createElement('p');
  aiMSG.textContent = aiResponse;
  aiMSG.classList.add('ai-msg');
  aiDiv.appendChild(aiMSG);

  

  

}



