// ==UserScript==
// @name         Autoclose Nation Login
// @description  Handle autoclosing nation logins (works with gotMajorIssues)
// @namespace    HNSS
// @version      1.0
// @updateURL    https://github.com/andreasclaesson/HNSS/raw/main/Farming/GotMajorIssues/AutoCloseLogin.user.js
// @downloadURL  https://github.com/andreasclaesson/HNSS/raw/main/Farming/GotMajorIssues/AutoCloseLogin.user.js
// @match        *://*/*autoclose=1
// @match        https://*.nationstates.net/*page=enact_dilemma*
// @exclude      https://*.nationstates.net/*page=show_dilemma*
// @grant        window.close
// ==/UserScript==


(function () {
    'use strict';
    if (window.location.pathname.match(/^\/nation=[^\/]+$/)) {
        window.close();
    }
})();
