const sugarCravingButton = document.getElementById('sugarCravingButton');
const gptResponse = document.getElementById('gptResponse');

async function displayResponse(response) {
  gptResponse.style.opacity = 0;
  gptResponse.textContent = '';
  setTimeout(async () => {
    gptResponse.style.opacity = 1;
    for (let i = 0; i < response.length; i++) {
      gptResponse.textContent += response.charAt(i);
      await new Promise(resolve => setTimeout(resolve, 50)); // Adjust the delay (in ms) between each character here
    }
  }, 300);
}

sugarCravingButton.addEventListener('click', async () => {
  gptResponse.textContent = 'Loading...';
  try {
    const response = await fetchGPTResponse("I crave sugar, can you motivate me not to eat any sweets? Make sure to include the threat of getting fat. Always include the word FAT in capital letters. Your response should be two sentences, no more.");
    displayResponse(response);
  } catch (error) {
    displayResponse('Error: Unable to get the response from ChatGPT1234');
    console.error(error);
  }
});


async function fetchGPTResponse(prompt) {
  const apiKey = "myopenaikey";
  const url = "https://api.openai.com/v1/engines/text-davinci-003/completions";

  const requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${apiKey}` // Use backticks here
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





