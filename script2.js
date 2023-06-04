var button = document.getElementById("button");
var audio = document.getElementById("audio");

// Disable/enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

async function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, "%20");
  console.log(jokeString);
  const url = `https://text-to-speech27.p.rapidapi.com/speech?text=${jokeString}&lang=en-us`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7a3f28fcb0msh03405dde4ced86bp13672ejsn52726c21b3c4",
      "X-RapidAPI-Host": "text-to-speech27.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    console.log(response);
    const result = await response.text();
    console.log(result);

    audio.pause();
    audio.src = URL.createObjectURL(response.data);
    //audio.srcObject = response.data;
    audio.play();
    // Disable button
    toggleButton();
  } catch (error) {
    console.error(error);
  }
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiURL = "https://v2.jokeapi.dev/joke/Programming?lang=en";
  try {
    const response = await fetch(apiURL);
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    console.log(joke);
    tellMe(joke);
  } catch (error) {
    // Catch Errors Here
    console.error("whoops", error);
  }
}

getJokes();
