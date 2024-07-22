// ==UserScript==
// @name         Hotkeys
// @version      1.0.0
// @description  Keybinds for everything needed in card farming.
// @author       Vulxo; Original code by 9003.
// @noframes
// @updateURL    https://github.com/andreasclaesson/HNSS/raw/main/Farming/Hotkeys.user.js
// @downloadURL  https://github.com/andreasclaesson/HNSS/raw/main/Farming/Hotkeys.user.js
// @match        https://*.nationstates.net*
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.min.js
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// @grant        window.close
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.log
// @grant        GM.openInTab
// ==/UserScript==

/* globals Mousetrap */
/* globals GM_config */

(function () {
  "use strict";

  function noinput_mousetrap(event) {
    if (event.target.classList.contains("mousetrap")) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  let mainNation = "Vulxo";
  let keys = {
      openPack: ["O", "o"],
      openDeck: ["P", "p"],
      sellCard: ["S", "s"],
      bidCard: ["B", "b"],
      matchCard: ["M", "m"],
      giftCard: ["G", "g"],
      junkCard: ["J", "j"],
      skipCard: ["H", "h"],
      reloadPage: ["R", "r"]
  };

  const inputs = document.querySelectorAll(
    'input.auctionbid[name="auction_ask"], input.auctionbid[name="auction_bid"]'
  );
  let ask_match = document.querySelector(
    "#highest_matchable_ask_price > .cardprice_sell"
  );
  let bid_match = document.querySelector(
    "#lowest_matchable_bid_price > .cardprice_buy"
  );
  ask_match = ask_match ? ask_match.textContent : 0;
  bid_match = bid_match ? bid_match.textContent : 0;

  // Open Pack
  Mousetrap.bind(keys.openPack, function (ev) {
    window.open(
      "https://www.nationstates.net/page=deck?open_loot_box=1",
      "_self"
    );
  });

  // Open Deck
  Mousetrap.bind(keys.openDeck, function (ev) {
    window.open("https://www.nationstates.net/page=deck", "_self");
  });

  // Asking for a price
  Mousetrap.bind(keys.sellCard, function (ev) {
    noinput_mousetrap(ev);
    document.querySelector('th[data-mode="sell"').click();
    const askbox = document.querySelector(
      'input.auctionbid[name="auction_ask"]'
    );
    askbox.focus();
    askbox.select();
  });

  // Bidding on a card
  Mousetrap.bind(keys.bidCard, function (ev) {
    noinput_mousetrap(ev);
    document.querySelector('th[data-mode="buy"').click();
    const bidbox = document.querySelector(
      'input.auctionbid[name="auction_bid"]'
    );
    bidbox.focus();
    bidbox.select();
  });

  // Match a bid or ask
  Mousetrap.bind(keys.matchCard, function (ev) {
    noinput_mousetrap(ev);
    if (ask_match && ask_match > 0) {
      document.querySelector('input.auctionbid[name="auction_ask"]').value =
        ask_match;
    }
    if (bid_match && bid_match > 0) {
      document.querySelector('input.auctionbid[name="auction_bid"]').value =
        bid_match;
    }
  });

  // Reload Current Page
  Mousetrap.bind(keys.reloadPage, function (ev) {
    location.reload();
  });

  // Skip a card when you are junking
  Mousetrap.bind(keys.skipCard, function (ev) {
    skip = skip + 1;
  });

  // Gift a card, only works when you're on a card page
  Mousetrap.bind(keys.giftCard, function (ev) {
    noinput_mousetrap(ev);
    if (window.location.href.includes("card=")) {
      document
        .querySelectorAll("div.deckcard-info-cardbuttons > a.button")
        .forEach(function (el) {
          if (el.textContent == "Gift") {
            el.click();
          }
        });
    }
  });

  // Junk's card quick, does not work on main nation
  var skip = 0;
  Mousetrap.bind(keys.junkCard, function (ev) {
    if (document.body.dataset.nname != mainNation) {
      let elem = document.querySelectorAll(
        'a.deckcard-junk-button[data-rarity="common"],a.deckcard-junk-button[data-rarity="uncommon"], a.deckcard-junk-button[data-rarity="rare"], a.deckcard-junk-button[data-rarity="ultra-rare"],a.deckcard-junk-button[data-rarity="epic"]'
      )[skip];
      if (elem) {
        elem.click();
        elem.classList.remove("deckcard-junk-button");
        elem.classList.add("disabled");
      }
    }
  });

  Mousetrap.bind(keys.openIssues, function (ev) {
    window.open("https://www.nationstates.net/page=dilemmas", "_blank");
  });

  inputs.forEach(function (el) {
    // to be able to use keybinds while inputting numbers
    el.classList.add("mousetrap");
    // to submit on enter
    el.addEventListener("keypress", function (e) {
      if (e.which == 13) {
        this.parentNode.nextElementSibling.firstChild.click();
      }
    });
  });
})();
