let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight*0.8*0.99;

let c = canvas.getContext('2d');

//const n = Math.floor((Math.random() * 59) + 41);
const n = 344;
let arr = [];

for(let i = 0; i < n; i++){
    arr[i] = Math.floor((Math.random() * 130) + 5);
}

c.fillStyle = 'rgb(255, 255, 255)';

const leftP = 100;
const space = 0;
const bwidth = 5;
const bh = 500;

function Draw(){
    for (let i = 1; i <= arr.length; i++){
        c.fillRect(leftP + (space + bwidth)*i, 700 - (arr[i - 1]*5), bwidth, arr[i - 1]*5);
    }
}

function updateArr(ar){
    c.clearRect(0, 0, canvas.width, canvas.height);
    arr = ar;
    Draw();
    
}

Draw();
console.log(arr);

let sortButton = document.querySelector('.btn');

function sortBtEvent(e){
    e.preventDefault();
    selSort(arr);
}

sortButton.addEventListener("click", function() {
    sortBtEvent(event);
});


function selSort(ar){
    let i, j , min_idx;

    for(i = 0; i < n - 1; i++){
        min_idx = i;
        for(j = i + 1; j < n; j++){
            if(ar[j] < ar[min_idx])
                min_idx = j;
        }
        
        [ar[min_idx], ar[i]] = [ar[i], ar[min_idx]];
        updateArr(ar);
    }
}