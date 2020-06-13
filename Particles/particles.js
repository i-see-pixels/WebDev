const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.width/80) * (canvas.height/80)
}

window.addEventListener("mousemove",
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

class Particle{
    constructor(x, y, directionX, directionY, r, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.r = r;
        this.color = color;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = '#8C5523';
        ctx.fill();
    }

    update(){
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.r){
            if(mouse.x < this.x && this.x < canvas.width - this.r*10){
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.r*10){
                this.x -= 10;
            }
            if(mouse.y < this.x && this.y < canvas.heiight - this.r*10){
                this.y += 10;
            }
            if(mouse.y > this.x && this.y > this.r*10){
                this.y -= 10;
            }
        }

        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

function init(){
    particlesArray = [];
    let n = (canvas.height*canvas.width)/9000;
    for(let i = 0; i < n; i++){
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + (size * 2));
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + (size * 2));

        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#8C5523';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect(){
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) + (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if(distance < (canvas.width/8)*(canvas.height/8)){
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = `rgba(140,85,31,${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
    }

    connect();
}

window.addEventListener("resize", function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius =  ((canvas.width/80) * (canvas.height/80));
    init();
});

window.addEventListener("mouseout", function(){
    mouse.x = undefined;
    mouse.y = undefined;
});

init();
animate();