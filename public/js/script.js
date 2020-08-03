// VoiceRSS Parameters
/*
key (API key) - 982e8d5094854526ba1cea0f0813ccc7
hl (audio language) - en-us
f (audio format) - 16khz_16bit_stereo
c (codec) - mp3
v (voice) - Amy


*/
const audioElement = document.getElementById('audio');
const button = document.getElementById('button');
const subtitles = document.getElementById('subtitles');
const subtitlesContainer = document.getElementsByClassName('joke__subtitles')[0];
let joke = '';

// Disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

function updateSubtitles(subs){
    subtitles.innerText = subs;
    subtitlesContainer.hidden = !subtitlesContainer.hidden;
}

// Get jokes from Joke API
async function getJokes() {
    try {
        const blacklistFlags = 'nsfw,religious,political,racist,sexist';
        const jokeApiUrl = `https://sv443.net/jokeapi/v2/joke/Pun?blacklistFlags=${blacklistFlags}`;
        const response = await fetch(jokeApiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //sayJoke(joke);
        tellMe(joke);
        updateSubtitles(joke);
        toggleButton();
    } catch (error) {
        error('Unable to load joke because: ', error);
    }
}

// Passing joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '982e8d5094854526ba1cea0f0813ccc7',
        src: joke,
        hl: 'en-us',
        v: 'Amy',
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', () => {
    updateSubtitles('');
    toggleButton();
});
