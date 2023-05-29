// ==UserScript==
// @name         CardTabOpener
// @version      0.3.1
// @namespace    HNSS
// @description  Opens card in new tab when clicked on it
// @downloadURL  https://raw.githubusercontent.com/venixdeveloper/HNSS/main/Farming/Deck/CardTabOpener.user.js
// @updateURL    https://raw.githubusercontent.com/venixdeveloper/HNSS/main/Farming/Deck/CardTabOpener.user.js
// @author       VenixDeveloper (Vulxo)
// @noframes
// @match        https://www.nationstates.net/page=deck
// @match        https://www.nationstates.net/page=deck?*
// @grant        GM_openInTab
// ==/UserScript==
(function () {
    'use strict';
    let dcc = document.querySelectorAll('.deckcard-container');

    for (let i=0; i < dcc.length; i++) {
        let cardId = dcc[i].getElementsByClassName("deckcard")[0].getAttribute("data-cardid");
        let season = dcc[i].getElementsByClassName("deckcard")[0].getAttribute("data-season");

        // Remove black popup box
        dcc[i].getElementsByClassName("deckcard-info")[0].style.display = "none";
        // Add onclick attribute
        dcc[i].setAttribute("onclick", `window.open('https://www.nationstates.net/page=deck/card=${cardId}/season=${season}', '_blank');`);
    }
})();
