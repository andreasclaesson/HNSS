// ==UserScript==
// @name         BGA
// @namespace    HNSS
// @version      0.1
// @description  A script that makes beetle gifting easier
// @downloadURL  https://raw.githubusercontent.com/andreasclaesson/HNSS/main/Farming/Deck/BGA.user.js
// @updateURL    https://raw.githubusercontent.com/andreasclaesson/HNSS/main/Farming/Deck/BGA.user.js
// @author       VenixDeveloper (Vulxo)
// @noframes
// @match        https://www.nationstates.net/page=deck/card=*/season=*
// @match        https://www.nationstates.net/page=deck
// ==/UserScript==

(function() {
    'use strict';
    let allPuppets = [ "3929788", "3929794", "3929795", "3929796", "3929797", "3929800", "3929801", "3929803", "3929804", "3929805", "3929806", "3929807", "3929808", "3929809", "3929810", "3929812", "3929813", "3929814", "3929815", "3929817", "3929818", "3929819", "3929820", "3929823", "3929824", "3929826", "3929827", "3929829", "3929831", "3929833", "3929834", "3929840", "3929842", "3929844", "3929849", "3929852", "3929854", "3929855", "3929856", "3929857", "3929863", "3929864", "3929865", "3929866", "3929868", "3929869", "3929870", "3929872", "3929873", "3929874", "3929876", "3929877", "3929878", "3929882", "3929883", "3929885", "3929886", "3929888", "3929889", "3929890", "3929891", "3929893", "3929894", "3929895", "3929898", "3929899", "3929901", "3929902", "3929903", "3929905", "3929907", "3929908", "3929910", "3929913", "3929919", "3929921", "3929922", "3929923", "3929925", "3929926", "3929927", "3929930", "3929931", "3929932", "3929934", "3929936", "3929937", "3929939", "3929940", "3929941", "3929944", "3929945", "3929946", "3929948", "3929951", "3929952", "3929953", "3929954", "3929956", "3929958", "3929960", "4245891", "4074820", "715348", "714562", "3423507", "714686", "714677", "714681", "714673", "716234", "3045131", "3045137", "3045143", "3045148", "3045173", "693134", "3703509", "3724102", "3724105", "3724107", "3804517", "3804519", "3760853", "3810010", "3763484", "3564732", "3842439", "3922283", "3225877", "3225886", "3225874", "3225891", "3225864", "3225880", "3225871", "3225896", "3225879", "3225888", "3225873", "3225894", "3225882", "3225884", "3226039", "3226031", "3226029", "3226026", "3226058", "3225866", "3225867", "3226037", "3226035", "3226059", "3225899", "3252041", "3252042", "3252046", "3252047", "3252048", "3252051", "3252054", "3254071", "3254074", "3500955", "3500957", "3500959", "3500960", "3500962", "3500963", "3500964", "3500965", "3502207", "3500968", "3500970", "3500972", "3500973", "3502203", "3724109", "3760860", "3502281", "3502284", "3502289", "3502290", "3502292", "3502293", "3502294", "3502295", "3502296", "3502298", "3502299", "3502302", "3502303", "3502324", "3760856", "3339985", "3339982", "3340002", "3340008", "3340004", "3340010", "3340003", "3339995", "3339991", "3340007", "3339998", "3339986", "3339988", "3339992", "3339983", "3339996", "3339994", "3339989", "3339984", "3340000", "3340013", "3340016", "3340021", "3564707", "3564718", "3564712", "3564715", "3564711", "3564716", "3564727", "3564704", "3564719", "3564734", "3564735", "3564720", "3564703", "3564722", "3564710", "3564729", "3564708", "3564713", "3564702", "3564726", "3564724", "3564717", "3850880", "3850868", "3850869", "3850870", "3850874", "3850876", "3850875", "3850878", "3850872", "3850873" ];

    // Beetle Gifting
    if (window.location.href.indexOf("/gift=1") > -1) {
        let cardName = document.getElementsByClassName("nname")[0].innerHTML;
        let cardId = document.getElementById("deck-single-card").getAttribute('data-cardid');
        if (allPuppets.includes(cardId) && cardName.toLowerCase().includes("beetles")) {
            document.getElementById("entity_name").value = cardName;
            document.getElementsByName("send_gift")[0].focus();
        }
    }
})();
