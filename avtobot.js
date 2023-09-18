// ==UserScript==
// @name         New Userscript
// @namespace    https://steamcommunity.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://steamcommunity.com/market/listings/730/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    // const items = [
    //     {item_link: 'https://steamcommunity.com/market/listings/730/AUG%20%7C%20Contractor%20%28Minimal%20Wear%29?query=&start=0&count=100', float: '0.2'},
    // ];
    setTimeout(() => {
        console.log('Before the loop')

        let search_button_not_found_times = 0;

        console.log('In the loop boob')
        let findSearchButton = async function(){
            try {
                const search_button = document.getElementsByClassName("sih_button sih_pre_shadow_button open_setting_paint_seed_and_float")[0];
                console.log(search_button);
                if (search_button) {
                    console.log('Found search button');
                } else {
                    search_button_not_found_times++;
                    console.log('Search button not found: ' + search_button_not_found_times);
                    await new Promise(resolve => setTimeout(resolve,1000))
                    await findSearchButton()
                }
            } catch (err) {
                search_button_not_found_times++;
                console.log('Search button not found: ' + search_button_not_found_times);
                if (search_button_not_found_times >= 7) {
                    console.log('Could not find search button, reloading page');
                    location.reload();
                }
            }
        }

        const item_list = document.getElementsByClassName('itemfloat');
        console.log('Got list');
        Array.from(item_list).forEach((item) => {
            console.log(item.children[0].innerHTML);
        });
    }, 2000);

})();