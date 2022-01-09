let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

//Resizing Screen

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

//Circle Object

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;

        this.draw = () => {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.strokeStyle = "black";
            c.stroke();
            c.fillStyle = "rgba(255, 0, 0, 0.3)";
            c.fill();
        };

        this.update =  () => {

            //bounce off the right or left side of the screen
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }

            //bounce off the top or the bottom of the screen
            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            //adds or minuses the x postion of the circle
            this.x += this.dx;
            //adds or minuses the y position of the circle
            this.y += this.dy;


            this.draw();
        };
    }
}


//Storing Circle

let circleArray = [];

init = () =>{

    //Creating 100 circles using a for loop
    
    circleArray = [];

    for (let i = 0; i < 100; i++) {
        
        //Radius for Circle
        let radius = 30;

        //Random Position
        let x = Math.random() * (innerWidth - radius * 2) + radius; //Stops the circle from being stuck in the sides 
        let y = Math.random() * (innerHeight - radius *2) + radius; //Stops the circle from being stuck at the top and bottom

        //Random Velocity
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 4;

        circleArray.push(new Circle(x, y, dx, dy, radius));
        
    }
}



// Animate
animate = () => {
    requestAnimationFrame(animate);

    //clears the previous frame
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    
    
}

//function call to start the animation

init();


animate();