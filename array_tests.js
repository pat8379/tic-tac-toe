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

// arr = [0,2,6,7]
arr = [1,2,4,6]

let botCollected = [3,0]

let playerCollected = [8,5,7]

const oneTriggerAway = purpose => {
    let decision = []
    let finalDecision;
    if (purpose === 'win the game'){
        for (u = 0; u < win.length; u++){ 
            for (j = 0; j < win[u].length; j++){ 
                for (i = 0; i < botCollected.length; i++){ 
                    if (win[u][j] === botCollected[i] && !decision.includes(botCollected[i])) {
                        decision.push(botCollected[i])
                        console.log('same found');
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
                        console.log('same found');
                    }

                    if (decision.every(indexing => win[u].includes(indexing)) && decision.length === 2) {
                        win[u].forEach(nuios => {
                            if (!decision.includes(nuios)){
                                finalDecision = nuios
                            }
                        })
                        decision = []
                        if (finalDecision !== undefined){
                            return finalDecision
                        } else {
                            continue
                        }
                    }
                    // console.log(`${decision} is decision`);
                    console.log(`${decision} is decision and ${win[u]} is current win pattern and ${j} is j`);
                };
            }
            decision = []
        };
    }
};
console.log(oneTriggerAway('defend'));