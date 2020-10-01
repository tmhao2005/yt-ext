const onChat = (e: Event) => {
  // chrome.tabs.executeScript(
  //   null,
  //   {code: "document.body.style.backgroundColor='" + e.target.id + "'" },
  // );

  const newURL = "";
  chrome.tabs.create({ url: newURL });

  window.close();
}

function generateLuckyNumber(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

function onGenerateLuckyNumber() {
  const domResult = document.getElementById('yourNumberToday');
  const resultWrapper = document.querySelector<HTMLElement>('.resultWrapper');
  const luckyNumber = generateLuckyNumber(999999);

  domResult.innerHTML = `${luckyNumber}`;
  resultWrapper.style.opacity = '1';
}

// Debug by right click when popup has been just open, inspect elements
document.addEventListener('DOMContentLoaded', () => {
  const btnGenerate = document.querySelector('#btnGenerate');

  btnGenerate.addEventListener('click', onGenerateLuckyNumber);
});
