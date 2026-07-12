const searchButton = document.querySelector('.search-button');
const responseBox = document.querySelector('.ai-response');
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

  searchBox.value = "";

  responseBox.innerHTML += aiResponse;
}



