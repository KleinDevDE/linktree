/**
 * Load all quotes stored in the quotes.json file and insert a random quote on the page.
 * @see insertQuote
 */
function loadQuote(){
    //
    let quotes = getContentFromURL("assets/quotes.json");
    console.debug(quotes)
    if (quotes === null){
        console.error("Could not load Quotes!");
        return;
    }
    quotes = JSON.parse(quotes);
    insertQuote(quotes, getRandomOfArray(quotes));
}

/**
 * Check if the quote is enabled, if not, re-select an random quote and call the function again.
 * @param array The array of quotes
 * @param pickedData The quote u want to shown on the site
 */
function insertQuote(array, pickedData){
    if (pickedData.enabled === false){
        insertQuote(array, getRandomOfArray(array));
        return;
    }
    document.getElementById("quoteText").innerHTML = pickedData.quote.toString().replace("\n", "<br>");
    document.getElementById("quoteFooter").innerHTML = "<i>~ " + pickedData.author + "</i>";
}

/**
 * A simple synchronous function to get contents of an url
 * @param url The url
 * @returns {string|undefined} The content of the site. (nullable)
 */
function getContentFromURL(url) {
    return $.ajax({
        type: "GET",
        url: url,
        async: false,
    }).responseText;
}

/**
 * A simple function to get an random entry of an array
 * @param array The array where u want a random entry from
 * @returns {*}
 */
function getRandomOfArray(array){
    return array[Math.floor(Math.random() * array.length)];
}