/**
 * Insert ur github user ID, you can find it at "https://api.github.com/users/<username>" -> "id" -> <UserID>
 * @type {number}
 */
let githubUserID = 13904220;

/**
 * Insert ur instagram user ID, you can find it at "https://instagram.com/<username>/channel/?__a=1" -> "graphql" -> "user" -> "id" -> <UserID>
 * NOTE: This is currently not needed, cause there is an bug to obtain the username from the userID
 * @type {number}
 */
let instagramUserID = 1432875736;

/**
 * Insert ur instagram username
 * @type {string}
 */
let instagramUserName = "Coincidedmen";



/**
 * Load the username and the count of the repos by the userID.
 * So updating the username will also update the direct link and the info in the button.
 */
function loadGitHubData() {

    let data = getContentFromURL("https://api.github.com/user/" + githubUserID);
    if (data === null) {
        console.error("Could not load Github data!");
        return;
    }
    data = JSON.parse(data);
    document.getElementById("github_data").innerHTML = "@" + data.login + ", " + data.public_repos + " repositories";
    document.getElementById("github_link").href = "https://github.com/" + data.login;
}

/**
 * Currently there is no login in the function
 */
function loadTwitterData() {
    // This API needs authentication, this could only be done if I'm writing an server-based script to get the data.
    // ~ KleinDev (20.05.2021)
}


/**
 * Sends an query to the instagram API with the username to get the amount of posts.
 */
function loadInstagramData() {
    // Blocked cause of CORS policy, Instagram doesn't send the Header "Access-Control-Allow-Origin"
    // So I switched to an proxy_pass on the server-side to get this work.
    // It can be cause errors, I don't know why. May connection throttle, IP ban or something else.
    // ~ KleinDev (20.05.2021)

    try {
        // let username = getInstagramUsername();
        // console.log(username);
        let data = getContentFromURL("https://linktree.kleindev.de/instagram/" + instagramUserName + "/channel/?__a=1");
        if (data === null) {
            console.error("Could not load Instagram data!");
            return;
        }
        data = JSON.parse(data);
        document.getElementById("instagram_data").innerHTML = "@" + data['graphql']['user']['username'] + ", " + data['graphql']['user']['edge_owner_to_timeline_media']['count'] + " images";
    } catch (e){
        console.error("There came an error while fetching instagram data!\nSometimes it works, sometimes not. Maybe it's an connection throttle thing, don't know..\nHere the exception", e);
    }
}

/**
 * Sends an query to the instagram API with the userID to get the username
 * NOTE: It's not compatible with my proxy_pass solution. ~ KleinDev (20.05.2021)
 * @returns {string|undefined} The username
 */
function getInstagramUsername() {
    // https://linktree.kleindev.de/instagram/graphql/query/?query_hash=c9100bf9110dd6361671f113dd02e7d6&variables={%22user_id%22:%221432875736%22,%22include_chaining%22:false,%22include_reel%22:true,%22include_suggested_users%22:false,%22include_logged_out_extras%22:false,%22include_highlight_reels%22:false,%22include_related_profiles%22:false}
    let data = getContentFromURL('https://linktree.kleindev.de/instagram/graphql/query/?query_hash=c9100bf9110dd6361671f113dd02e7d6&variables={"user_id":"'+instagramUserID+'","include_chaining":false,"include_reel":true,"include_suggested_users":false,"include_logged_out_extras":false,"include_highlight_reels":false,"include_related_profiles":false}');
    if (data === null) {
        console.error("Could not load Instagram pre-data!");
        return;
    }
    console.log("data, unparsed", data)
    data = JSON.parse(data);
    console.log("data", data);
    return data['data']['user']['reel']['user']['username'];
}