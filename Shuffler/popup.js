const config = document.getElementById("config");
const shuffleKeyEl = document.getElementById("shuffleKey");
const warning = document.getElementById("warning");
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
        warning.style.display = "block";
    }
    block = false;
})