
const checkIfActiveTabIsYouTube = async (tabId, changeInfo, tab) => {

    if (tab.url && tab.url.includes('youtube.com')) {

        chrome.action.setPopup({ tabId: tabId, popup: "src/popup/index.html" });
        chrome.action.setIcon({ tabId: tabId, path: "icons/shortly-enabled-48.png" });
    } else {

        chrome.action.setPopup({ tabId: tabId, popup: "" });
        chrome.action.setIcon({ tabId: tabId, path: "icons/shortly-disabled-48.png" });
    }
}

// By default the popup is disabled
chrome.action.setPopup({ popup: "" });

// Listener for active tab change
chrome.tabs.onUpdated.addListener(checkIfActiveTabIsYouTube);


chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => checkIfActiveTabIsYouTube(activeInfo.tabId, null, tab));
});