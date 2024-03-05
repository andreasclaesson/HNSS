// ==UserScript==
// @name         CardSharksAssist
// @namespace    HNSS
// @version      0.8
// @description  A script that makes gifting cards included within the Card Sharks much easier, also prevents junking them
// @downloadURL  https://raw.githubusercontent.com/andreasclaesson/HNSS/main/Farming/Deck/CardSharksAssist.user.js
// @updateURL    https://raw.githubusercontent.com/andreasclaesson/HNSS/main/Farming/Deck/CardSharksAssist.user.js
// @author       VenixDeveloper (Vulxo)
// @noframes
// @match        https://www.nationstates.net/page=deck/card=*/season=*/gift=1
// @match        https://www.nationstates.net/page=deck?*
// @match        https://www.nationstates.net/page=deck
// @grant        GM.xmlHttpRequest
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.registerMenuCommand
// @connect      docs.google.com
// @connect      googleusercontent.com
// @run-at       document-start
// ==/UserScript==

(async function() {
    'use strict';

    let puppetArray = await getSpreadsheetData();
    if (window.location.href.indexOf("/gift=1") > -1) {
        let cardName = document.getElementsByClassName("nname")[0].innerHTML;
        let cardId = document.getElementById("deck-single-card").getAttribute('data-cardid');

        let card = findId(puppetArray, cardId)
        if (card) {
            document.getElementById("entity_name").value = card.gift;
            document.getElementsByName("send_gift")[0].focus();
        }
    } else if (window.location.href.indexOf("/page=deck") > -1) {
        let junkButtons = document.querySelectorAll(
            'a.deckcard-junk-button[data-rarity="common"],a.deckcard-junk-button[data-rarity="uncommon"], a.deckcard-junk-button[data-rarity="rare"], a.deckcard-junk-button[data-rarity="ultra-rare"],a.deckcard-junk-button[data-rarity="epic"]'
        );
        let convertedJunk = [...junkButtons];
        convertedJunk.forEach(button => {
            let card = findId(puppetArray, button.getAttribute('data-cardid'));
            console.log(card)
            if (card) {
                button.classList.remove("deckcard-junk-button");
            }
        });
    }
})();

async function getSpreadsheetData() {
    try {
        const apiUrl = `https://docs.google.com/spreadsheets/d/1aPUl3-UVBYp4gc096Sq7lErpApkz_nSRXb1gW0tb00g/export?format=csv`;

        const response = await fetch(apiUrl);
        const csvData = await response.text();

        const rows = csvData.split('\n').map(row => row.split(','));
        const headers = rows[0];
        const data = rows.slice(1);

        return data.map(row => {
            return Object.fromEntries(headers.map((header, index) => [header.trim(), row[index].trim()]));
        });
    } catch (error) {
        console.error('Error fetching data from Google Spreadsheet.', error);
        return [];
    }
}

function findId(data, idToLookFor) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].Id == idToLookFor) {
            return { "id": data[i].Id, "gift": data[i].GiftDestination };
        }
    }
    return null;
}
