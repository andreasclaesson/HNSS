// ==UserScript==
// @name         JunkAssist
// @namespace    HNSS
// @version      0.1.0
// @description  Assists you in junking cards quick. Compatible with CardSharksAssist.
// @author       Modified by Vulxo (VenixDeveloper), original by dithpri
// @match        https://*.nationstates.net/*page=deck*
// @grant        none
// ==/UserScript==

const shouldConfirm = ({
    rarity,
    season,
    junkValue,
    name,
    id,
    region,
    badges,
    marketValue,
    bid
}) => {

    if (rarity == "legendary") {
        return true;
    }
    if (marketValue >= 5) {
        return true;
    }
    if (bid > junkValue) {
        return true;
    }
    return false;
};

function addOpt(...args) {
    return args.filter((x) => x).reduce((acc, cur) => `${acc} ${cur}`, "");
}

(function() {
    "use strict";

    document.querySelectorAll(".deckcard").forEach((card) => {
        const junkButton = card.querySelector(".deckcard-junk-button");

        if (!junkButton) {
            console.warn('Junk button not found in card:', card);
            return; // Skip if no junk button is found
        }

        // Skip if this button is marked by CardSharksAssist (HNSS script)
        if (junkButton.getAttribute('data-csa') === 'true') {
            return; // Skip this button
        } else {
            const rarity = junkButton.dataset.rarity;
            const id = Number(junkButton.dataset.cardid);
            const junkValue = Number(junkButton.dataset.junkprice);
            const season = Number(junkButton.dataset.season);

            const name = card.querySelector(".deckcard-title .nnameblock .nname")
                ?.textContent.toLowerCase()
                .replaceAll(" ", "_");
            const region = card.querySelector(".deckcard-region .rlink")?.textContent.toLowerCase().replaceAll(" ", "_");

            const badges = [...card.querySelectorAll("img.trophy")]
                .map((x) => x.src.replace(/^.*\/images\/trophies\/(.*)\.png$/, "$1"))
                .concat([...card.querySelectorAll(".badge")].map((x) => x.textContent.toLowerCase().trim()));

            const marketValueText = card.querySelector(".deckcard-card-mv")?.textContent;
            const bidText = card.querySelector(".deckcard-card-buyers")?.textContent;

            const marketValue = Number(marketValueText?.replaceAll(/[^0-9.]/g, "")) || NaN;
            const bid = Number(bidText?.replaceAll(/[^0-9.]/g, "")) || NaN;

            const params = {
                rarity,
                season,
                junkValue,
                marketValue,
                bid,
                name,
                id,
                region,
                badges,
            };

            const enableConfirmation = shouldConfirm(params);
            if (enableConfirmation === true) {
                junkButton.dataset.rarity = junkButton.dataset.rarity.toUpperCase();
                junkButton.dataset.rarity += addOpt(marketValueText, bidText);
            } else if (enableConfirmation === false) {
                junkButton.dataset.rarity = "uncommon";
            }
        }
    });
})();
