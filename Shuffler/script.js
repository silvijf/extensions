const bannedSites = [];
var selectedElement;
let shuffleKey;

chrome.storage.local.get("shuffleKey", (result) => {
    if (result.shuffleKey == undefined) shuffleKey = "=";
    else shuffleKey = result.shuffleKey;
})

function shuffle() {
    try {
        let string = selectedElement.textContent.split("");
        for (let i = string.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [string[i], string[j]] = [string[j], string[i]];
        }
        selectedElement.textContent = string.join("");
    } finally { }

}

document.addEventListener("keydown", (event) => {
    if (
        event.key == shuffleKey &&
        event.ctrlKey == false && event.shiftKey == false && event.metaKey == false && event.altKey == false
    ) shuffle();
})

let thisSiteBanned = false;
for (i = 0; i < bannedSites.length; i++) {
    if (window.location.host == bannedSites[i]) thisSiteBanned = true;
}

if (!thisSiteBanned) {
    document.addEventListener("click", (e) => {
        let target = e.target;
        if (
            target.textContent.length > 1 && target.children.length == 0 &&
            target.tagName != "input" && target.tagName != "textarea" &&
            !target.isContentEditable
        ) {
            selectedElement = target;
        }
    })
}
