
function StartGame() {
    if (sceneIndex == 22630 && diveLinker.getOutputList()['f0cf5251c3a14239bc582beefcc1fc28'] != undefined) {

        Resolution = diveLinker.getOutputList()['f0cf5251c3a14239bc582beefcc1fc28'].value
        if (Resolution == 1024) {
            dive.style.width = '1024px';
            dive.style.height = '768px';
        }
        else if (Resolution == 1200) {
            dive.style.width = '1200px';
            dive.style.height = '900px';
        }
    }
    if (sceneIndex == 22631 && diveLinker.getOutputList()['50d49538a3b44f9b86bfb60de3770b92'] != undefined) {
        index = Number(tempIndex) + Number(diveLinker.getOutputList()['50d49538a3b44f9b86bfb60de3770b92'].value)
        if (index < 0) {
            index = 0;
        }
        score = diveLinker.getOutputList()['6b321235e6834ac088babbb1bf3ef9ef'].value;

        isCorr = diveLinker.getOutputList()["fe639af399554248ba6c71dad5755f88"].value;
        question = diveLinker.getOutputList()["ff4a5f4f40a34a809b0f80f3b7eab8fd"].value;
        if (load == false) {
            saveBtn.click()
            diveLinker.setInput("50d49538a3b44f9b86bfb60de3770b92", 0)
            load = true
            items.forEach(element => GetNewItem(element));
        }
        if (state == 1) {
            const date = new Date();
            diveLinker.setInput("63533351423849e8ab2cdd7b65fde274", 2)
            console.log(question)
            saveArray.push(["題目" + question, isCorr , date.toLocaleString()]);
            state = 2;
        }
        else {
            if (diveLinker.getOutputList()["63533351423849e8ab2cdd7b65fde274"].value != state - 1) {
                state = diveLinker.getOutputList()["63533351423849e8ab2cdd7b65fde274"].value;
            }

        }
        if (typeof textArray[index][0] === 'string') {
            diveLinker.setInput("cfeaaaead17742c4bb872392c30732f0", textArray[index][2])
            diveLinker.setInput("2f454eb181d844a5bde1dc67643978a8", textArray[index][1])
            diveLinker.setInput("348698fce54e4f45b10693b7ff0f36aa", textArray[index][0])
        }
        else if (textArray[index][0] == false) {
            if (typeof textArray[index][1] === 'string') {
                Event(textArray[index][1]);
            }
            else {
                console.log("save1")
                Save()
                tempIndex += 1;
            }
        }
        else if (textArray[index][2] == false) {
            textArray[index][0](textArray[index][1]);
            if (textArray[index][3] == "S") {
                sceneIndex = textArray[index][1];
                tempIndex = Number(index) + 1;
            }
        }
    }
    if (sceneIndex == 22632 && diveLinker.getInputList()['bc53614aa6944b0196fb591b4db0caec'] != undefined) {
        if (load2 == 0) {
            document.activeElement.blur();
            load2 = 1
            window.addEventListener('keydown', function (e) {
                var keyID = e.code;
                if (keyID === 'F2' || keyID === 'Delete') {
                    load2 = 2;
                    e.preventDefault();
                }
            }, false);

        }
        else if (load2 == 1) {
            document.activeElement.blur();
        }
        else if (load2 == 2) {
            diveLinker.setInput("bc53614aa6944b0196fb591b4db0caec", 2)
        }
    }
    if (sceneIndex == 22727 && diveLinker.getOutputList()['9f1c691624f04b0ba03f87402430ab69'] != undefined) {
        console.log("22727")
        if (state == 1) {
            console.log("存檔")
            Object.values(diveLinker.getOutputList()).forEach((e) => {
                 if (e.name.includes('安裝')) {
                        const date = new Date();
                        saveArray.push([e.name, e.value, date.toLocaleString()]);
                    } 
                })
            state = 2;
        }
        else {
            if (diveLinker.getOutputList()["3f29faa3a65e40f48fd0a495c76a4fca"].value != state - 1) {
                state = diveLinker.getOutputList()["3f29faa3a65e40f48fd0a495c76a4fca"].value;
            }

        }
    }
    // Object.values(diveLinker.getOutputList()).forEach((e)=>{if(e.name.includes('安裝')){console.log(e.name+"答錯"+e.value)}})
    if (diveLinker.checkComplete()) {
        sceneIndex = Object.values(diveLinker.getOutputList()).find(obj => {
            return obj.name === 'Scene'
        }).value
        load = false
        load2 = false
        console.log(sceneIndex);
        ChangeScene(sceneIndex)
    }
    window.requestAnimationFrame(StartGame);
}
function ChangeScene(s) {
    diveLinker.setProject(s)
    Start()
}
function Save() {
    saveBtn.click()
}
function Event(e) {
    textArray[index][0] = true
    var eventID = Object.values(diveLinker.getInputList()).find(obj => {
        return obj.name === e
    }).id

    /*score = Object.values(diveLinker.getOutputList()).find(obj => {
        return obj.name === 'Score'
      }).value*/
    diveLinker.setInput(eventID, 1)
}
function GetNewItem(item) {
    textArray[index][2] = true;
    var itemID = Object.values(diveLinker.getInputList()).find(obj => {
        return obj.name === item
    }).id
    items.push(item);
    diveLinker.setInput(itemID, true)
}
function Start() {
    diveLinker.enableBlock(false);
    var makeSureDiveIsReady = setInterval(() => {
        diveLinker.getOutputList();
        if (diveLinker.getLoadingStatus()) {
            clearInterval(makeSureDiveIsReady);
            updateTextArray();
            window.requestAnimationFrame(StartGame);
            diveLinker.start()
        }
    }, 50)
}
Start();