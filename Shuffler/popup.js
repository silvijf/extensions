const config = document.getElementById("config");
const shuffleKeyEl = document.getElementById("shuffleKey");
const refresh = document.getElementById("refresh");
const refreshButton = document.getElementById("refreshButton")
const newVersion = document.getElementById("newversion")
let configuring = false;
let block = false;
let enterPressed = false;

const bannedKeys = [
    "Control",
    "Shift",
    "Meta",
    "Alt"
]

chrome.storage.local.get("shuffleKey", (result) => {
    if (result.shuffleKey == undefined) chrome.storage.local.set({ shuffleKey: "=" });
    else shuffleKeyEl.innerText = (result.shuffleKey == " ") ? "Space" : result.shuffleKey;
})

function isBannedKey(key) {
    for (let i = 0; i < bannedKeys.length; i++) {
        if (key == bannedKeys[i]) return true;
    }
    return false;
}

function configure() {
    config.innerText = "Press a key...";
    configuring = true;
}

refreshButton.addEventListener("click", () => {
    chrome.tabs.reload()
})

config.addEventListener("pointerdown", configure)

config.addEventListener("keyup", (e) => {
    if ((e.key == "Enter" || e.key == " ") && !configuring) {
        configure();
        enterPressed = true;
    }
})

document.addEventListener("keyup", (e) => {
    if (configuring && !enterPressed && !isBannedKey(e.key)) {
        e.preventDefault();
        chrome.storage.local.set({ shuffleKey: e.key });
        shuffleKeyEl.innerText = (e.key == " ") ? "Space" : e.key;
        config.innerText = "Configure shuffle key...";
        configuring = false;
        refresh.style.display = "block";
    }
    block = false;
    enterPressed = false;
})

async function getVersion() {
    let file = await fetch("https://raw.githubusercontent.com/silvijf/extensions/refs/heads/main/Shuffler/manifest.json");
    let text = await file.text();
    let startIndex = text.indexOf('"version"') + 12;
    let endIndex = text.indexOf('"', startIndex);
    if (text.substring(startIndex, endIndex) != chrome.runtime.getManifest().version) newVersion.style.display = "block";
}

getVersion()
