const container = document.querySelector('.container')
const box = document.querySelectorAll('.box')
const theIcon = document.querySelector('.the-icon')
const svgIcon = 'svg-icon'
const faCircle = 'fa-circle'
const restart = document.getElementById('restart')
const winClass = 'won'
const loseClass = 'lost'

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

let u = 0;
let pis; 
let won = [];

let wonArrays = win.some(combination => {
    return combination.every(index => playerCollected.includes(index))
})

restart.onclick = () => {
    u = 0
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
    })
    console.log(`${won} and ${u}`);
}

const botAdd = (number) => {
  container.children.item(number).children.item(1).classList.add(faCircle);
  botCollected.push(number)
  pis = arr.indexOf(number)
  arr.splice(pis,1)
};

const findWin = arrayP => {
    for (i=0; i<win.length; i++){
      if (win[i].every(index => arrayP.includes(index))) {
          won.push(win[i])
      }
    };
};

const startRandomGame = () => {
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
            let y
            let x = Array.prototype.indexOf.call(container.children,cell)
            const pos = arr.indexOf(x)
            if (pos !== -1 && (u%2===0)) {
                container.children.item(x).children.item(0).classList.add(svgIcon)
                playerCollected.push(x)
                arr.splice(pos, 1)
                console.log('done ' + x + ' ' + arr);
                u++  
                y = arr[Math.floor(Math.random()*arr.length)]
            } 
            if (win.some(combination => {
                return combination.every(index => playerCollected.includes(index))
            })) {
                console.log('player wins');
                findWin(playerCollected)
                won[0].forEach(winBoxes => container.children.item(winBoxes).classList.add('won'))
                return
            } 

            // console.log('this is y= '+ y);
            setTimeout(() => {
                if (u % 2 !== 0 && arr.length>= 1) {
                    botAdd(y)
                    u++
                    // console.log(y + ' is y and ' + arr);
                };        
            }, 200)
            // console.log('amount of u is ' + u);
            // console.log(`playerboxes are ${playerCollected}`);
            // console.log(`botboxes are ${botCollected}`);
        })
    })
};

startRandomGame()

// container.childNodes[1].style.backgroundColor = 'red'
// console.log(container.children.item(2).children.item(0));
