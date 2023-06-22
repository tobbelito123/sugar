const sugarCravingButton = document.getElementById('sugarCravingButton');
const exerciseButton = document.getElementById('exerciseButton');
const workButton = document.getElementById('workButton');
const gptResponse = document.getElementById('gptResponse');

async function displayResponse(response) {
  gptResponse.textContent = '';
  gptResponse.classList.add('flash');
  for (let i = 0; i < response.length; i++) {
    gptResponse.textContent += response.charAt(i);
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  setTimeout(() => {
    gptResponse.classList.remove('flash');
    gptResponse.style.color = '#008000';
    gptResponse.style.opacity = 1;  // This line is needed to make the response text visible
  }, 10000);
}


sugarCravingButton.addEventListener('click', () => handleButtonClick("I crave sugar, can you motivate me not to eat any sweets? Make sure to include the threat of getting fat. Always include the word FAT in capital letters. Your response should be two sentences, no more."));
exerciseButton.addEventListener('click', () => handleButtonClick("I'm feeling lazy. Can you motivate me to exercise?"));
workButton.addEventListener('click', () => handleButtonClick("I don't feel like working. Can you give me some motivation to get back to work?"));

async function handleButtonClick(prompt) {
  gptResponse.textContent = 'Loading...';
  try {
    const response = await fetchGPTResponse(prompt);
    displayResponse(response);
  } catch (error) {
    displayResponse('Error: Unable to get the response from ChatGPT');
    console.error(error);
  }
}

async function fetchGPTResponse(prompt) {
  const apiKey = "don't_think_so";
  const url = "https://api.openai.com/v1/engines/text-davinci-003/completions";
  const requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.7
    })
  };
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return data.choices[0].text.trim();
}
