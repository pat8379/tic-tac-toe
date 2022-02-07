const container = document.querySelector('.container')
const box = document.querySelectorAll('.box')
const theIcon = document.querySelector('.the-icon')
let svgIcon = 'svg-icon'
const faCircle = 'fa-circle'
const restart = document.getElementById('restart')
const winClass = 'won'
const loseClass = 'lost'
const jepai = document.getElementById('jepai')
const medium = document.getElementById('medium')
const impossible = document.getElementById('impossible')

let arr = [0,1,2,3,4,5,6,7,8]
let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let botCollected = []
let playerCollected = []

// let yCond = '';

let count = 0;
let pis; 
let won = [];
let xTriggered = 0;
let cell


let wonArrays = win.some(combination => {
    return combination.every(index => playerCollected.includes(index))
})

let georgeStatus = true
let firstTimeActivated = false
let y

const restartGame = () => {
    count = 0
    xTriggered = 0
    won = []
    arr = [0,1,2,3,4,5,6,7,8]
    botCollected = []
    playerCollected = []
    box.forEach(cell => {
        if (cell.children.item(1).classList.contains(faCircle)){
            cell.children.item(1).classList.remove(faCircle);
        }
        if (cell.children.item(0).classList.contains(svgIcon)) {
            cell.children.item(0).classList.remove(svgIcon);
        }
        if (cell.classList.contains(winClass)) {
            cell.classList.remove(winClass)
        }
        if (cell.classList.contains(loseClass)) {
            cell.classList.remove(loseClass)
        }
        if (cell.classList.contains('draw')) {
            cell.classList.remove('draw')
        }
    })
    // console.log(`${won} and ${u} yay`);;
};

const findWin = arrayP => {
    for (ifwin=0; ifwin<win.length; ifwin++){
    if (win[ifwin].every(index => arrayP.includes(index))) {
        won.push(win[ifwin])
    }
    };
};

const oneTriggerAway = purpose => {
    let decision = []
    let finalDecision;
    if (purpose === 'win the game'){
        for (u = 0; u < win.length; u++){ 
            for (j = 0; j < win[u].length; j++){ 
                for (i = 0; i < botCollected.length; i++){ 
                    if (win[u][j] === botCollected[i] && !decision.includes(botCollected[i])) {
                        decision.push(botCollected[i])
                    }
                    if (decision.every(indexing => win[u].includes(indexing)) && decision.length === 2) {
                        win[u].forEach(nuios => {
                            if (!decision.includes(nuios)){
                                finalDecision = nuios
                            }
                        })
                        decision = []
                        if (finalDecision !== undefined && arr.includes(finalDecision)){
                            return finalDecision
                        } else {
                            continue
                        }
                    } 
                    // console.log(`${decision} is decision and ${win[u]} is current win pattern and ${j} is j`);
                };
            }
            decision = []
        };
    } else if (purpose === 'defend'){
        for (u = 0; u < win.length; u++){ 
            for (j = 0; j < win[u].length; j++){ 
                for (i = 0; i < playerCollected.length; i++){ 
                    if (win[u][j] === playerCollected[i] && !decision.includes(playerCollected[i])) {
                        decision.push(playerCollected[i])
                    }

                    if (decision.every(indexing => win[u].includes(indexing)) && decision.length === 2) {
                        win[u].forEach(nuios => {
                            if (!decision.includes(nuios)){
                                finalDecision = nuios
                            }
                        })
                        decision = []
                        if (finalDecision !== undefined && arr.includes(finalDecision)){
                            return finalDecision
                        } else {
                            continue
                        }
                    }
                    // console.log(`${decision} is decision`);
                    // console.log(`${decision} is decision and ${win[u]} is current win pattern and ${j} is j`);
                };
            }
            decision = []
        };
    }
};



const botAdd = (number) => {
    container.children.item(y).children.item(1).classList.add(faCircle);
    botCollected.push(number)
    pis = arr.indexOf(number)
    arr.splice(pis,1)
  };
  
let difficultyStatus = ''

const everyThing = () => {
    if (win.some(combination => {
        return combination.every(index => botCollected.includes(index))
    })) {
        console.log('bot wins');
        findWin(botCollected)
        won[0].forEach(winBoxes => container.children.item(winBoxes).classList.add('lost'))
        return
    }
    let x = Array.prototype.indexOf.call(container.children,cell)
    const pos = arr.indexOf(x)
    if (pos !== -1 && (count%2===0)) {
        container.children.item(x).children.item(0).classList.add(svgIcon)
        playerCollected.push(x)
        arr.splice(pos, 1)
        console.log('done ' + x + ' ' + arr);
        count++  
        // -------------------- test
        if (gameDifficulty === 'georgeDif') {
            y = arr[Math.floor(Math.random()*arr.length)]
        } else if (gameDifficulty === 'mediumDif') {
            let winTg = oneTriggerAway('win the game')
            let defTg = oneTriggerAway('defend')
            if (winTg !== undefined) {
                y = winTg
                console.log('bot tries to win');
            } else if (defTg !== undefined) {
                y = defTg
                console.log('bot tries to defend');
            } else if (defTg === undefined){
                y = arr[Math.floor(Math.random()*arr.length)]
                console.log('bot randoms 1');
            } 
        }
        // -------------------- test
        xTriggered++
    } 
    if (win.some(combination => {
        return combination.every(index => playerCollected.includes(index))
    })) {
        console.log('player wins');
        findWin(playerCollected)
        won[0].forEach(winBoxes => container.children.item(winBoxes).classList.add('won'))
        return
    } else if (xTriggered === 5 && won.length === 0) {
        box.forEach(cells => {
            cells.classList.add('draw')
        })
        return
    }

    // console.log('this is y= '+ y);
    setTimeout(() => {
        if (count % 2 !== 0 && arr.length>= 1) {
            botAdd(y)
            count++
            // console.log(y + ' is y and ' + arr);
            console.log(`${botCollected} is bot collected and ${playerCollected} is player collected`);

        };        
    }, 200)
}

const startGame = gameDifficulty => {
    box.forEach(cell => {
        cell.addEventListener('click', function everyThing(){
            if (win.some(combination => {
                return combination.every(index => botCollected.includes(index))
            })) {
                console.log('bot wins');
                findWin(botCollected)
                won[0].forEach(winBoxes => container.children.item(winBoxes).classList.add('lost'))
                return
            }
            let x = Array.prototype.indexOf.call(container.children,cell)
            const pos = arr.indexOf(x)
            if (pos !== -1 && (count%2===0)) {
                container.children.item(x).children.item(0).classList.add(svgIcon)
                playerCollected.push(x)
                arr.splice(pos, 1)
                console.log('done ' + x + ' ' + arr);
                count++  
                // -------------------- test
                if (gameDifficulty === 'georgeDif') {
                    y = arr[Math.floor(Math.random()*arr.length)]
                } else if (gameDifficulty === 'mediumDif') {
                    let winTg = oneTriggerAway('win the game')
                    let defTg = oneTriggerAway('defend')
                    if (winTg !== undefined) {
                        y = winTg
                        console.log('bot tries to win');
                    } else if (defTg !== undefined) {
                        y = defTg
                        console.log('bot tries to defend');
                    } else if (defTg === undefined){
                        y = arr[Math.floor(Math.random()*arr.length)]
                        console.log('bot randoms 1');
                    } 
                }
                // -------------------- test
                xTriggered++
            } 
            if (win.some(combination => {
                return combination.every(index => playerCollected.includes(index))
            })) {
                console.log('player wins');
                findWin(playerCollected)
                won[0].forEach(winBoxes => container.children.item(winBoxes).classList.add('won'))
                return
            } else if (xTriggered === 5 && won.length === 0) {
                box.forEach(cells => {
                    cells.classList.add('draw')
                })
                return
            }
        
            // console.log('this is y= '+ y);
            setTimeout(() => {
                if (count % 2 !== 0 && arr.length>= 1) {
                    botAdd(y)
                    count++
                    // console.log(y + ' is y and ' + arr);
                    console.log(`${botCollected} is bot collected and ${playerCollected} is player collected`);
        
                };        
            }, 200)
        })
    })
};



jepai.onclick = () => {
    if (difficultyStatus !== 'jepai') {
        firstTimeActivated = true
        // box.forEach(cell => {
        //     cell.removeEventListener('click', everyThing)
        // })
        restartGame()
        // georgeStatus = 'george'
        difficultyStatus = 'jepai'
        // georgeStatus = true
        startGame('georgeDif')
        jepai.classList.add('jep-activated')
        if (medium.classList.contains('med-activated')) {
            medium.classList.remove('med-activated')
        }
        if (impossible.classList.contains('impos-activated')){
            impossible.classList.remove('impos-activated')
        }

    }
}

medium.onclick = () => {
    if (difficultyStatus !== 'medium') {
        firstTimeActivated = true
        // box.forEach(cell => {
        //     cell.removeEventListener('click', everyThing)
        // })
        // georgeStatus = false
        restartGame()
        // georgeStatus = 'mediumYellow'
        startGame('mediumDif')
        difficultyStatus = 'medium'
        medium.classList.add('med-activated')
        if (impossible.classList.contains('impos-activated')){
            impossible.classList.remove('impos-activated')
        }
        if (jepai.classList.contains('jep-activated')){
            jepai.classList.remove('jep-activated')
        }
    }
}

impossible.onclick = () => {
    if (difficultyStatus !== 'impossible') {
        firstTimeActivated = true
        // box.forEach(cell => {
        //     cell.removeEventListener('click', everyThing)
        // })
        restartGame()
        // georgeStatus = 'impossibleRed'
        // startGame()
        difficultyStatus = 'impossible'
        impossible.classList.add('impos-activated')
        if (jepai.classList.contains('jep-activated')){
            jepai.classList.remove('jep-activated')
        }
        if (medium.classList.contains('med-activated')) {
            medium.classList.remove('med-activated')
        }

    }
}

restart.onclick = () => {
    restartGame()
}


