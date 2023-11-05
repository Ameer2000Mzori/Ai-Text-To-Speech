const audioa = document.getElementById("audio");
const audioBtn = document.getElementsByClassName("audiobtn")[0];

// get the jokes api
audioBtn.addEventListener("click", () => {
  getJoke();
});

async function getJoke() {
  const res = await fetch(
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single",
    {}
  );
  const data = await res.json();
  console.log(data);
  callJoke(data);
}

function callJoke(data) {
  audioBtn.disabled = true;

  const audio = new SpeechSynthesisUtterance();

  // Set the text to be spoken
  audio.text = data.joke;

  // Set the language (English - United States)
  audio.lang = "en-US";

  // Create an instance of the speech synthesis object
  const speechSynthesis = window.speechSynthesis;

  // Specify a voice (optional)
  const voices = speechSynthesis.getVoices();
  const englishVoice = voices.find((voice) => voice.lang === "en-US");
  audio.voice = englishVoice;

  // Start speaking
  speechSynthesis.speak(audio);
  console.log(audio.text);

  // Disable the button for a few seconds
  setTimeout(audioBtnEnable, 5000);
}

const audioBtnEnable = () => {
  console.log("Button enabled");
  audioBtn.disabled = false;
};
