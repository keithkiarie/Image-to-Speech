TakePhotoBtn.addEventListener("click", PopFilePicker);
FilePickerInput.addEventListener("input", FilePicked);
PauseBtn.addEventListener("click", PauseSpeech);
ResumeBtn.addEventListener("click", ResumeSpeech);
StopBtn.addEventListener("click", StopSpeech);

const Speaker = new SpeechSynthesisUtterance();

function PopFilePicker() {
    FilePickerInput.click();
    StopSpeech();
}

function FilePicked() {
    const Files = FilePickerInput.files;

    TextDisplayDiv.innerHTML = "";
    AudioControlsDiv.style.display = "none";

    if (Files.length > 0) {
        let FileURL = window.URL.createObjectURL(Files[0]);
        RecognizeText(FileURL, TextRecognized);
    }
}



function RecognizeText(ImageURL, callback) {
    Tesseract.recognize(
        ImageURL,
        'eng', {
            logger: m => {
                m.status = UpperCaseFirstLetters(m.status);
                TextDisplayDiv.innerHTML = `${m.status}: ${(m.progress * 100).toFixed(2)}%`
            }
        }
    ).then(({
        data: {
            text
        }
    }) => {
        callback(text);
    })
}

function TextRecognized(text) {
    TextDisplayDiv.innerHTML = text;
    AudioControlsDiv.style.display = "block";

    PlayBtn.addEventListener("click", function () {
        PauseBtnDiv.style.display = "block";
        StopBtnDiv.style.display = "block";
        PlayBtnDiv.style.display = "none";
        Speak(text);
    })
}

function UpperCaseFirstLetters(Text) {
    let Separated = Text.split(" ");
    let NewText = "";

    for (let i = 0; i < Separated.length; i++) {
        let word = Separated[i];
        let FirstChar = word[0].toUpperCase();
        let NewWord = FirstChar;

        for (let j = 1; j < word.length; j++) NewWord += word[j];
        Separated[i] = NewWord;
    }

    for (let i = 0; i < Separated.length; i++) {
        if (i == Separated.length - 1) NewText += Separated[i];
        else NewText += Separated[i] + " ";
    }
    return NewText;
}


function Speak(message) {
    Speaker.text = message;
    window.speechSynthesis.speak(Speaker);
}


function PauseSpeech() {
    window.speechSynthesis.pause();
    ResumeBtnDiv.style.display = "block";
    PauseBtnDiv.style.display = "none";
}

function ResumeSpeech() {
    window.speechSynthesis.resume();
    ResumeBtnDiv.style.display = "none";
    PauseBtnDiv.style.display = "block";
}

function StopSpeech() {
    AudioControlsDiv.style.display = "none";
    TextDisplayDiv.innerHTML = "";
    window.speechSynthesis.cancel();
}