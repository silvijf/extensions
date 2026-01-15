const config = document.getElementById("config");
const shuffleKeyEl = document.getElementById("shuffleKey");
const refresh = document.getElementById("refresh");
const newVersion = document.getElementById("newversion")
let configuring = false;
let block = false;

chrome.storage.local.get("shuffleKey", (result) => {
    if (result.shuffleKey == undefined) chrome.storage.local.set({ shuffleKey: "=" });
    else shuffleKeyEl.innerText = (result.shuffleKey == " ") ? "Space" : result.shuffleKey;
})

function canEndConfiguration(key, block) {
    if (key == "Enter") {
        if (block == false) return true;
        else return false;
    } else return true;
}

config.addEventListener("click", (e) => {
    if (e.detail == 0 && !configuring) block = true;
    config.innerText = "Press a key...";
    configuring = true;
})

document.addEventListener("keyup", (e) => {
    if (configuring && canEndConfiguration(e.key, block)) {
        e.preventDefault()
        chrome.storage.local.set({ shuffleKey: e.key });
        shuffleKeyEl.innerText = (e.key == " ") ? "Space" : e.key;
        config.innerText = "Configure shuffle key...";
        configuring = false;
        refresh.style.display = "block";
    }
    block = false;
})

async function getVersion() {
    let file = await fetch("https://raw.githubusercontent.com/silvijf/extensions/refs/heads/main/Shuffler/manifest.json");
    let text = await file.text();
    let startIndex = text.indexOf('"version"') + 12;
    let endIndex = text.indexOf('"', startIndex);
    console.log(text.substring(startIndex, endIndex), chrome.runtime.getManifest().version)
    if (text.substring(startIndex, endIndex) != chrome.runtime.getManifest().version) newVersion.style.display = "block";
}

getVersion()
