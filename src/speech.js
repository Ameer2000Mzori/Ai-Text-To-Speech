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
  speak(data);
}

let _speechSynth;
let _voices;
const _cache = {};

/**
 * retries until there have been voices loaded. No stopper flag included in this example.
 * Note that this function assumes, that there are voices installed on the host system.
 */

function loadVoicesWhenAvailable(onComplete = () => {}) {
  _speechSynth = window.speechSynthesis;
  const voices = _speechSynth.getVoices();

  if (voices.length !== 0) {
    _voices = voices;
    onComplete();
  } else {
    return setTimeout(function () {
      loadVoicesWhenAvailable(onComplete);
    }, 100);
  }
}

/**
 * Returns the first found voice for a given language code.
 */

function getVoices(locale) {
  if (!_speechSynth) {
    throw new Error("Browser does not support speech synthesis");
  }
  if (_cache[locale]) return _cache[locale];

  _cache[locale] = _voices.filter((voice) => voice.lang === locale);
  return _cache[locale];
}

/**
 * Speak a certain text
 * @param locale the locale this voice requires
 * @param text the text to speak
 * @param onEnd callback if tts is finished
 */

function playByText(locale, text, onEnd) {
  const voices = getVoices(locale);

  // TODO load preference here, e.g. male / female etc.
  // TODO but for now we just use the first occurrence
  const utterance = new window.SpeechSynthesisUtterance();
  utterance.voice = voices[0];
  utterance.pitch = 1;
  utterance.rate = 1;
  utterance.voiceURI = "native";
  utterance.volume = 1;
  utterance.rate = 1;
  utterance.pitch = 0.8;
  utterance.text = text;
  utterance.lang = locale;

  if (onEnd) {
    utterance.onend = onEnd;
  }

  _speechSynth.cancel(); // cancel current speak, if any is running
  _speechSynth.speak(utterance);
}

// on document ready
loadVoicesWhenAvailable(function () {
  console.log("loaded");
});

function speak(data) {
  audioBtn.disabled = true;
  let text = data.joke;
  setTimeout(() => playByText("en-US", `${text}`), 300);
  setTimeout(audioBtnEnable, 5000);
}

// function callJoke(data) {

//   const audio = new SpeechSynthesisUtterance();

//   // Set the text to be spoken
//   audio.text = data.joke;

//   // Set the language (English - United States)
//   audio.lang = "en-US";

//   // Create an instance of the speech synthesis object
//   const speechSynthesis = window.speechSynthesis;

//   // Specify a voice (optional)
//   const voices = speechSynthesis.getVoices();
//   const englishVoice = voices.find((voice) => voice.lang === "en-US");
//   audio.voice = englishVoice;

//   // Start speaking
//   speechSynthesis.speak(audio);
//   console.log(audio.text);

//   // Disable the button for a few seconds

// }

const audioBtnEnable = () => {
  console.log("Button enabled");
  audioBtn.disabled = false;
};
