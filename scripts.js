const searchButton = document.querySelector('.search-button');
const responseLog = document.querySelector('.response-log');
const searchBox = document.querySelector('.search-input');
const greeting = document.querySelector('.greeting');
const searchDiv = document.querySelector('.search-box');
const newChat = document.querySelector('.')

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
  searchBox.classList.add('search-input-after');
  searchBox.value = "";
  searchDiv.classList.add('search-box-after');
  responseLog.classList.add('response-log-after');

  searchBox.addEventListener('input', () => {
  searchBox.style.height = 'auto';
  searchBox.style.height = searchBox.scrollHeight + 'px';
});

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
    max_tokens: 1024,
    stream: true
})
  })

  


    let fullText = "";
    const aiDiv = document.createElement('div');
  aiDiv.classList.add('ai-div');
  responseLog.appendChild(aiDiv);

  const aiMSG = document.createElement('p');
  aiMSG.classList.add('ai-msg');
  aiDiv.appendChild(aiMSG);

  const reader = responseData.body.getReader();

  const decoder = new TextDecoder();

  while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  const chunkText = decoder.decode(value);
  
  const chunkArr = chunkText.split('\n');



  chunkArr.forEach((text) => {
    if (text.startsWith('data')) {
      const textString = text.slice(6);
      const textObj = JSON.parse(textString);
      console.log(textObj);

      if (textObj.type === 'content_block_delta') {
        const aiText = textObj.delta.text;
        fullText += aiText;
        aiMSG.innerHTML = marked.parse(fullText);
      }
    }
  })
}

  window.scrollTo(0, document.body.scrollHeight);
  

  

}



