console.log("Starting");

// document.getElementById('root').addEventListener('mouseover', evt => {
//     cheat();
// });
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const loop = async (option) => {
    if(option == 0)
        return;
    while (true) {
        await sleep(60)
        var res = cheat(option);
        if (res == 1 && option == 3) {
            await sleep(2000)
            var s = document.getElementsByClassName('MuiButton-label')[0];
            if (s.innerHTML !== "Leave game") {
                s.click();
                await sleep(2000)
                s = document.getElementsByClassName('MuiButton-label')[0];
                if (s.innerHTML !== "Leave game") {
                    s.click();
                }
            }
        }
    }
}

chrome.storage.sync.get(['option'], function(result) {
  console.log(result);
  console.log(result.option);
  loop(result.option);
});



function cheat(option) {
    var children = [];
    var error = true;

    while (error) {
        try {
            children = document.querySelector('#root div div').childNodes[1].childNodes[1].childNodes;
            error = false;
        } catch (err) {
            // window.location.reload();
            return -1;
        }
    }

    var cards = [];
    for (var i = 1; i < children.length; i++) {
        var visibility = children[i].style.visibility;
        if (visibility == 'visible') {
            var obj = {
                card: ("0000" + ((i - 1).toString(3))).slice(-4),
                node: children[i]
            };

            cards.push(obj);
        }
    }
    var setFound = findSet(cards, option);
    if (setFound)
        return 0;
    return 1;

}

function findSet(cards, option) {
    var combos = [];
    var setFound = false;
    for (var a = 0; a < cards.length; a++) {
        for (var b = a + 1; b < cards.length; b++) {
            for (var c = b + 1; c < cards.length; c++) {
                var card1 = cards[a];
                setFound = setFound || checkSet(cards[a], cards[b], cards[c], option)
            }
        }
    }
    return setFound;
}

function checkSet(a, b, c, option) {
    for (let i = 0; i < 4; i++) {
        if ((a.card.charCodeAt(i) + b.card.charCodeAt(i) + c.card.charCodeAt(i)) % 3 !== 0) {
            return false;
        }
    }
    if(option == 1){
        a.node.style.background = "yellow";
        b.node.style.background = "yellow";
        c.node.style.background = "yellow";
    }
    if(option == 2 || option == 3){
        a.node.click();
        b.node.click();
        c.node.click();
        a.node.childNodes[0].click();
        b.node.childNodes[0].click();
        c.node.childNodes[0].click();
    }
    return true;
}