chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "fillForm",
    title: "Rellenar formulario",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "fillForm") {
    chrome.tabs.sendMessage(tab.id, { action: "fillForm" });
  }
});
