function copy(text) {
  const input = document.createElement('textarea');
  document.body.appendChild(input);
  input.value = text;
  input.focus();
  input.select();
  document.execCommand('Copy');
  input.remove();
}

function handleUpdate(tabId, changeInfo, tab) {
  if (!/^https:\/\/[a-zA-Z0-9]+\.slack\.com\/files\//.test(tab.url)) {
    return;
  }
  chrome.pageAction.show(tabId);
};

chrome.tabs.onUpdated.addListener(handleUpdate);

chrome.pageAction.onClicked.addListener(tab => {
  const iconsPath = chrome.runtime.getURL('icons');
  const changeIcon = iconName => {
    chrome.pageAction.setIcon({
      tabId: tab.id,
      path: iconsPath + '/' + iconName
    });
  };

  chrome.tabs.executeScript(tab.id, {
    file: 'get-html.js',
    runAt: 'document_end'
  }, ([html]) => {
    copy(html);
    changeIcon('/activicon_32x32.png');
    setTimeout(() => {
      changeIcon('/icon_32x32.png');
    }, 300);
  })
});
