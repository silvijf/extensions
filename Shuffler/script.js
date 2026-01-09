const bannedSites = ["chatgpt.com"];
var selectedElement;
let shuffleKey;

chrome.storage.local.get("shuffleKey", (result) => {
    if (result.shuffleKey == undefined) shuffleKey = "=";
    else shuffleKey = result.shuffleKey;
})

function shuffle() {
    let string = selectedElement.textContent.split("")
    for (let i = string.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [string[i], string[j]] = [string[j], string[i]];
    }
    selectedElement.textContent = string.join("");
}
function init() {
    let everyElement = document.querySelectorAll("*")
    everyElement.forEach((element) => {
        if (element.textContent.length > 1 && element.children.length == 0) {
            if (element.tagName != "input") {
                element.addEventListener("click", () => {
                    selectedElement = element;
                })
            }
        }
    })
}

document.addEventListener("keydown", (event) => {
    if (event.key == shuffleKey) shuffle();
})

let thisSiteBanned = false;
for (i = 0; i < bannedSites.length; i++) {
    if (window.location.host == bannedSites[i]) thisSiteBanned = true;
}
if (!thisSiteBanned) init();
