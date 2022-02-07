let arr = [0,1,2,3,4,5,6,7,8]

let y;
let positionOfI = 0;

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

// arr = [0,3,4,6,7,8]
arr = [0,2,6,7]

let botCollected = [5,4]

let playerCollected = [1,3,8]

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
                    // console.log(`${decision} is decision and ${win[u]} is current win pattern and ${j} is j`);
                };

            }
        };
    }
};

// console.log(oneTriggerAway());
let winTg = oneTriggerAway('win the game')
win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let defTg = oneTriggerAway('defend')
win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
if (winTg !== undefined) {
    y = winTg
    win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    // yCond = 'ready'
} else {
    if (defTg !== undefined) {
        y = defTg
        win = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        // yCond = 'ready'

    } else {
        y = arr[Math.floor(Math.random()*arr.length)]
        // yCond = 'ready'
    }
}
console.log(y);
// console.log(arr[Math.floor(Math.random()*arr.length))
// console.log(arr);



