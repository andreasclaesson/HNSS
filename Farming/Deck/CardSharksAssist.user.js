// ==UserScript==
// @name         CardSharksAssist
// @namespace    HNSS
// @version      0.8.2
// @description  A script that makes gifting cards included within the Card Sharks much easier, also prevents junking them
// @downloadURL  https://raw.githubusercontent.com/andreasclaesson/HNSS/main/Farming/Deck/CardSharksAssist.user.js
// @updateURL    https://raw.githubusercontent.com/andreasclaesson/HNSS/main/Farming/Deck/CardSharksAssist.user.js
// @author       VenixDeveloper (Vulxo)
// @noframes
// @match        https://*.nationstates.net/page=deck/card=*/season=*/gift=1
// @match        https://*.nationstates.net/page=deck?*
// @match        https://*.nationstates.net/page=deck
// @grant        GM.xmlHttpRequest
// @grant        GM.registerMenuCommand
// @connect      docs.google.com
// @connect      googleusercontent.com
// @run-at       document-start
// ==/UserScript==

document.addEventListener('DOMContentLoaded', async function() {
    'use strict';

    let puppetArray = getStoredData() || [];
    GM.registerMenuCommand('Refresh Data from Google Spreadsheet', async function () {
        try {
            const data = await getSpreadsheetData();
            puppetArray = data;
            storeDataInLocalStorage(data);
            alert('Data refreshed successfully!');
        } catch (error) {
            console.error('Error fetching or storing data:', error);
            alert('Error refreshing data. Check the console for details.');
        }
    });

    if (!puppetArray.length) {
        getSpreadsheetData()
            .then(data => {
                puppetArray = data;
                storeDataInLocalStorage(data);
                console.log("Puppet Array has been stored")
                processPage();
            })
            .catch(error => {
                console.error('Error fetching or storing data:', error);
            });
    } else {
        processPage();
    }
    function processPage() {
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
                if (card && card.id) {
                    button.classList.remove("deckcard-junk-button");
                }
            });
        }
    }
});

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

function storeDataInLocalStorage(data) {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem('puppetArray', serializedData);
        } catch (error) {
            console.error('Error storing data in local storage.', error);
        }
    }

function getStoredData() {
    try {
        const serializedData = localStorage.getItem('puppetArray');
        return serializedData ? JSON.parse(serializedData) : null;
    } catch (error) {
        console.error('Error retrieving data from local storage.', error);
        return null;
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
