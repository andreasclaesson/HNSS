// ==UserScript==
// @name         Autoclose Issues
// @description  Handle autoclosing issues (works with gotMajorIssues)
// @namespace    HNSS
// @version      1.0
// @updateURL    https://github.com/andreasclaesson/HNSS/raw/main/Farming/GotMajorIssues/AutoClose.user.js
// @downloadURL  https://github.com/andreasclaesson/HNSS/raw/main/Farming/GotMajorIssues/AutoClose.user.js
// @match        *://*/*autoclose=1
// @match        https://*.nationstates.net/*page=enact_dilemma*
// @exclude      https://*.nationstates.net/*page=show_dilemma*
// @grant        window.close
// ==/UserScript==

// @match on autoclose=1 not necessary for gotissues but is for junkdajunk and others
// @match on enact_dilemma as autoclose does not carry over to the issue answered screen
// @exclude on show_dilemma since autoclose should not close the new intermediary screen

(function () {
    'use strict';
    window.close();
})();
