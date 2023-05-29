// ==UserScript==
// @name         ButtonStretcher
// @namespace    HNSS
// @version      0.1
// @description  Really simple script that stretches the "Open Card" button on deck
// @downloadURL  https://raw.githubusercontent.com/venixdeveloper/HNSS/main/Farming/Deck/ButtonStretcher.user.js
// @updateURL    https://raw.githubusercontent.com/venixdeveloper/HNSS/main/Farming/Deck/ButtonStretcher.user.js
// @author       VenixDeveloper (Vulxo)
// @noframes
// @match        https://www.nationstates.net/page=deck
// @match        https://www.nationstates.net/page=deck?*
// @grant        none
// ==/UserScript==
// requested by CSB PM Union

(function() {
    'use strict';

    document.getElementsByClassName('lootboxbutton')[0].setAttribute("style", "width:100%");
})();
