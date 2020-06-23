let page = document.getElementById('buttonDiv');
  const kButtonColors = ['No cheats', 'Show Set', 'Play 1 Game', 'Full Auto'];
  const options = [0,1,2,3];
  function constructOptions(kButtonColors) {
    for (let item of options) {
      let button = document.createElement('button');
      button.innerHTML = item;
      button.addEventListener('click', function() {
          console.log('clicked');
        chrome.storage.sync.set({option: item}, function() {
          console.log('option is ' + item);
        })
      });
      page.appendChild(button);
    }
  }
  constructOptions(kButtonColors);