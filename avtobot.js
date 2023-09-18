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

    setTimeout(lookForItems, 2000);
    let got_list_times = 0;

    async function lookForItems(){
        console.log('Before the loop');
        let search_button_not_found_times = 0;

        await findSearchButton(search_button_not_found_times)

        got_list_times++;
        console.log('Got list: ' + got_list_times);
        if(got_list_times >= 50){
            console.log('Reloading page');
            location.reload();
        }

        checkForError();
        let item_list = document.getElementsByClassName('itemfloat');
        const buy_button_list = document.getElementsByClassName('item_market_action_button_contents');
        let bought_item = false
        for(let i = 0; i < item_list.length; i++){
            if(item_list[i].children[0].innerHTML < 0.1){
                try{
                    let item_float = item_list[i].children[0].innerHTML;
                    console.log('Item found (' + item_float + ')');
                    if(window.confirm([item_float]) === true){
                        buy_button_list[i].click();
                        console.log(item_float + ' item bought')
                        item_list = []
                        await (location.reload(), 5000);
                    }

                } catch (err){
                    console.log('Could not get item')
                    await location.reload()
                }

            }
        }

        getElementByXpath('//*[@id="market_listing_filter_form"]/div/a').click()

        setTimeout(lookForItems, 2000);
    }

    function getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    function checkForError(){
        let errorMsgExists = document.getElementsByClassName('sih_label sih_label_warning')[0];
        if(errorMsgExists != null){
            console.error('Error occurred')
            location.reload()
        }
    }
    async function findSearchButton(search_button_not_found_times) {
        try {
            const search_button = document.getElementsByClassName("sih_button sih_pre_shadow_button open_setting_paint_seed_and_float")[0];
            console.log(search_button);
            if (search_button) {
                console.log('Found search button');
            } else {
                search_button_not_found_times++;
                console.log('Search button not found: ' + search_button_not_found_times);
                if (search_button_not_found_times >= 7) {
                    console.log('Could not find search button, reloading page');
                    location.reload();
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
                await findSearchButton(search_button_not_found_times);
            }
        } catch (err) {
            search_button_not_found_times++;
            console.log('Search button not found: ' + search_button_not_found_times);
            if (search_button_not_found_times >= 7) {
                console.log('Could not find search button, reloading page');
                location.reload();
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            await findSearchButton(search_button_not_found_times);
        }
    }

})();