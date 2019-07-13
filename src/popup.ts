const onChat = (e: Event) => {
  // chrome.tabs.executeScript(
  //   null,
  //   {code: "document.body.style.backgroundColor='" + e.target.id + "'" },
  // );

  const newURL = "https://www.facebook.com/tmhao2005";
  chrome.tabs.create({ url: newURL });

  window.close();
}

document.addEventListener('DOMContentLoaded', () => {
  const chatWithAuthor = document.querySelector('.fb');

  chatWithAuthor.addEventListener('click', onChat);
});
