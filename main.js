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
let positionOfI = 0;


let wonArrays = win.some(combination => {
    return combination.every(index => playerCollected.includes(index))
})

let georgeStatus = ''
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
    for (iFindWin=0; iFindWin<win.length; iFindWin++){
    if (win[iFindWin].every(index => arrayP.includes(index))) {
        won.push(win[iFindWin])
    }
    };
};

const oneTriggerAway = purpose => {
    let decision = []
    if (purpose === 'win the game'){
        for (u = 0; u < win.length; u++){ 
            for (j = 0; j < win[u].length; j++){ 
                for (i = 0; i < botCollected.length; i++){ 
                    // j < 3 or j < win[u].length
                    if (win[u][j] === botCollected[i]) {
                        decision.push(botCollected[i])
                        positionOfI = win[u].indexOf(botCollected[i])
                        win[u].splice(positionOfI,1)
                    }
                    if (win[u].length === 1) {
                        decision.forEach(n => {
                            win[u].push(n)
                        })
                        decision = []
                        if (arr.includes(win[u][0])){
                            return win[u][0]
                        } else {
                            continue
                        }
                    } else if (j === 2 && decision.length < 2){
                        decision.forEach(n => {
                            win[u].push(n)
                        })
                        decision = []
                    }
                    // console.log(`${decision} is decision and ${win[u]} is current win pattern and ${j} is j`);
                };

            }
        };
    } else if (purpose === 'defend'){
        for (u = 0; u < win.length; u++){ 
            for (j = 0; j < win[u].length; j++){ 
                for (i = 0; i < playerCollected.length; i++){ 
                    // j < 3 or j < win[u].length
                    if (win[u][j] === playerCollected[i]) {
                        decision.push(playerCollected[i])
                        positionOfI = win[u].indexOf(playerCollected[i])
                        win[u].splice(positionOfI,1)
                    }
                    if (win[u].length === 1) {
                        decision.forEach(n => {
                            win[u].push(n)
                        })
                        decision = []
                        if (arr.includes(win[u][0])){
                            return win[u][0]
                        } else {
                            continue
                        }
                    } else if (j === 2 && decision.length < 2){
                        decision.forEach(n => {
                            win[u].push(n)
                        })
                        decision = []
                    }
                    // console.log(`${decision} is decision`);
                };

            }
        };
    }
};

const botAdd = (number) => {
    container.children.item(number).children.item(1).classList.add(faCircle);
    botCollected.push(number)
    pis = arr.indexOf(number)
    arr.splice(pis,1)
  };
  
  
let difficultyStatus = ''

const startGame = () => {
    box.forEach(cell => {
        cell.addEventListener('click', function() {
            if (win.some(combination => {
                return combination.every(index => botCollected.includes(index))
            })) {
                console.log('bot wins');
                findWin(botCollected)
                won[0].forEach(winBoxes => container.children.item(winBoxes).classList.add('lost'))
                return
            }
            // let y
            let x = Array.prototype.indexOf.call(container.children,cell)
            const pos = arr.indexOf(x)
            if (pos !== -1 && (count%2===0)) {
                container.children.item(x).children.item(0).classList.add(svgIcon)
                playerCollected.push(x)
                arr.splice(pos, 1)
                console.log('done ' + x + ' ' + arr);
                count++  
                // -------------------- test
                let winTg = oneTriggerAway('win the game')
                win = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]]
                let defTg = oneTriggerAway('defend')
                win = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]]
                
                if (winTg !== undefined) {
                    y = winTg
                    console.log('bot tries to win');
                    win = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]]
                    // yCond = 'ready'
                } else if (defTg !== undefined) {
                    y = defTg
                    console.log('bot tries to defend');
                    win = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]]
                } else if (defTg === undefined){
                    y = arr[Math.floor(Math.random()*arr.length)]
                    console.log('bot randoms 1');
                } 
                // if the triggered are in reverse ie. [2,1,0], the function is not called
                // if order of sequence is [0,1] then bot aims for [2] but if X goes anywhere
                // that doesn't trigger the functions, bot aims for random
                // try removing the purpose argument in oneTriggerAway



                // console.log(y + ' is y');
                // -------------------- test
                // y = arr[Math.floor(Math.random()*arr.length)]
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
                    console.log(y + ' is y and ' + arr);
                };        
            }, 200)
            console.log(xTriggered);
            // console.log('amount of u is ' + u);
            // console.log(`playerboxes are ${playerCollected}`);
            // console.log(`botboxes are ${botCollected}`);
        })
    })
};

jepai.onclick = () => {
    if (difficultyStatus !== 'jepai') {
        restartGame()
        georgeStatus = 'george'
        difficultyStatus = 'jepai'
        startGame()
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
        restartGame()
        georgeStatus = ''
        // startGame()
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
        restartGame()
        georgeStatus = ''
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


