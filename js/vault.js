/**
 * This creates a vault object
 * @param code the code that you want to use, example: [1, 2, 3]
 * @param elem_id the id of the div that you want the vault in
 * @constructor idk what this is
 */
function Vault(code, elem_id) {

    let isSafe = false,
        correctCode = code,
        allButtons = $(".buttons>button"),
        enteredCode = [],
        countCorrect = 0,
        countWrong = 0;
    const player = new Audio();

    /**
     * This tests the code
     */
      this.testCode = function () {
        if(typeof code !== "object" || (code.length > 3 || code.length < 3) ) {
            alert("Code is not an array or has les then 3 numbers");
            isSafe = false;
        }
        else {
            isSafe = true;
        }
    };


    /**
     * This creates the vault
     * @returns {null}
     */
    this.init = function () {
        this.testCode();
        if(!isSafe) return null;
        _(elem_id).innerHTML += `
            <div class="vaultContainer">
                <div id="${elem_id}-green-light" class="light green"></div>
                <div id="${elem_id}-red-light" class="light red"></div>
                <div class="clearfix"></div>
                
                <h3 id="${elem_id}-enteredCode" class="entered-code">${"-".repeat(code.length)}</h3>
                <div class="littleHack">
                    <p id="${elem_id}-notif" class="vault-notif">&nbsp;</p>
                    <div class="vault-buttons">
                        <button onclick="${elem_id}.buttonPress(this)" value="1">1</button>
                        <button onclick="${elem_id}.buttonPress(this)" value="2">2</button>
                        <button onclick="${elem_id}.buttonPress(this)" value="3">3</button>
                        <button onclick="${elem_id}.buttonPress(this)" value="4">4</button>
                        <button onclick="${elem_id}.buttonPress(this)" value="5">5</button>
                        <button onclick="${elem_id}.buttonPress(this)" value="6">6</button>
                        <button onclick="${elem_id}.buttonPress(this)" value="7">7</button>
                        <button onclick="${elem_id}.buttonPress(this)" value="8">8</button>
                        <button onclick="${elem_id}.buttonPress(this)" value="9">9</button>
                        <button onclick="${elem_id}.buttonPress(this)" class="null-btn" value="0">0</button>
                    </div>
                    <p id="${elem_id}-stats" class="vault-notif">Times correct: 0 &middot; Times incorrect: 0</p>
                </div>
            </div>
        `;
    };

    /**
     * this checks if the code is correct and what number you pressed
     * @param button the button that is being pressed
     * @returns {null}
     */
    this.buttonPress = function (button) {
        if(!isSafe) return null;
        for(let btn of allButtons) {
            btn.disabled = true;
        }
        let num = button.value;
        enteredCode.push(num);
        _(elem_id + "-enteredCode").innerHTML = (enteredCode.join("") + ("-".repeat(code.length)) ).substring(0, 3);
        if(enteredCode.length === 3) {
            isSafe = false;
            // noinspection EqualityComparisonWithCoercionJS
            let flag = enteredCode[0] == correctCode[0] && enteredCode[1] == correctCode[1] && enteredCode[2] == correctCode[2];
            if(flag) {
                player.pause();
                player.src = "audio/correct.wav";
                player.play();
                blink("#" + elem_id + "-green-light", 9, 200);
                _(elem_id + "-notif").innerHTML = "Code is correct";
                countCorrect++;
            }
            else {player.pause();
                player.src = "audio/fail.mp3";
                player.play();
                blink("#" + elem_id + "-red-light", 9, 200);
                _(elem_id + "-notif").innerHTML = "Code is incorrect";
                countWrong++;
            }
            _(elem_id + "-stats").innerHTML = `Times correct: ${countCorrect} &middot; Times incorrect: ${countWrong}`;
            setTimeout(() => {
                isSafe = true;
                _(elem_id + "-enteredCode").innerHTML = "-".repeat(code.length);
                _(elem_id + "-notif").innerHTML = "&nbsp;";
            }, 3600);
            enteredCode.splice(0, enteredCode.length);
        }


        for(let btn of allButtons) {
            btn.disabled = false;
        }
    };

}

/**
 * This makes the element flash it's color
 * @param elem the element id that you want to flash
 * @param times how many times it should flash
 *  keep in mind that it will flash that amount on and that amount off
 * @param speed the speed that you want to have the flash do it's thing in ms
 */
function blink(elem, times, speed) {
    if (times > 0 || times < 0) {
        if ($(elem).hasClass("blink")) $(elem).removeClass("blink");
        else $(elem).addClass("blink");
    }

    clearTimeout(() => {
        blink(elem, times, speed);
    });

    if (times > 0 || times < 0) {
        setTimeout(() => {
            blink(elem, times, speed);
        }, speed);
        times -= .5;
    }
}

/**
 * This is a shortcut for {@link Document Document}#getElementById
 * @param id the id of the element
 * @returns {HTMLElement | null} the element with the matching id
 * @private Soooo, this doc comment was auto generated and I have no idea what to put here lol
 */
function _(id) { return document.getElementById(id); }