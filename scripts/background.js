// // chrome.runtime.onInstalled.addListener(() => {
// //     chrome.contextMenus.create({
// //         id: "FlashEx",
// //         title: "Create flash Card",
// //         type: "normal",
// //         contexts:["selection"]
// //     })
// // })



// chrome.contextMenus.create({
//     id: "FlashEx",
//     title: "Send to FlashEx",
//     contexts: ["selection"],
// });

// chrome.contextMenus.onClicked.addListener((info) =>{
    
//     var selectedText = info.selectionText;
//     chrome.runtime.sendMessage({ type: "textSelected", data: info.selectionText });
// })

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.type === "textSelected") {
//         chrome.browserAction.setPopup({
//             tabId: sender.tab.id,
//             popup: "popup.html"
//         }, function() {
//             chrome.runtime.sendMessage({
//                 type: "setText",
//                 data: message.data
//             });
//         });
//     }
// });