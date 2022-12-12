// drawing the game :
const canvas = document.getElementById("game_frame");
const ctx = canvas.getContext("2d");

const gridSize = 20;

// init board game
const size = 40;
let array = Array.from({length: size}, () => Array(size).fill(0));

// init the snake :
let middle = size/2;
array[middle][middle] = 1;
array[middle][middle+1] = 2;
array[middle][middle-1] = 3;

let direction = "right"; // up | down | left | right
const moveIntervall = 60;
let count = 0;


const drawMatrix = (canvas, matrix) => {
    const ctx = canvas.getContext("2d");
    const size = matrix.length;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the grid
    ctx.lineWidth = 1;
    for (let i = 0; i <= size; i++) {
        // draw horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, i * canvas.height / size);
        ctx.lineTo(canvas.width, i * canvas.height / size);
        ctx.stroke();

        // draw vertical lines
        ctx.beginPath();
        ctx.moveTo(i * canvas.width / size, 0);
        ctx.lineTo(i * canvas.width / size, canvas.height);
        ctx.stroke();
    }

    // draw the snake's body
    ctx.fillStyle = "#336600";
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (matrix[i][j] === 1) {
                ctx.fillRect(j * canvas.width / size, i * canvas.height / size, canvas.width / size, canvas.height / size);
            } else if (matrix[i][j] === 2) {
                // draw the head :
                ctx.fillRect(j * canvas.width / size, i * canvas.height / size, canvas.width / size, canvas.height / size);
            } else if (matrix[i][j] === 3) {
                // draw the tailf :
                ctx.fillRect(j * canvas.width / size, i * canvas.height / size, canvas.width / size, canvas.height / size);
            }
        }
    }
};



// Get the button element
var button = document.getElementById("start");

// Attach an event listener to the button
button.addEventListener("click", function() {
    // This is the function that will be called when the button is clicked
    drawMatrix(canvas, array);

    // Start the game loop
    setInterval(function() {
        update();
        render();
    }, 1000 / 60); // Call the update and render functions 60 times per second
});


// Define the update and render functions
function update() {
    // Update the game state
    count ++;
    if (count == 30) {
        array = moveSnake(array, direction );
        count = 0;
    }
}

function moveSnake(matrix, direction) {
    // Create a deep copy of the array
    /*
    var copy = matrix.slice().map(function(arr) {
        return arr.slice();
    });
    */
   var copy = Array.from({length: size}, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (matrix[i][j] === 1) {
                switch(direction) {
                    case "up":
                        break;
                    case "down":
                        break;
                    case "right":
                        //copy[i][j] = 0;
                        if (j+1 < size) {
                            copy[i][j+1] = 1;
                        } else {
                            copy[i][0] = 1;
                        }
                        break;
                    case "left":
                        break;
                }
            }
        }
    }
    //matrix = copy;
    return copy;
}

function render() {
    // Render the game screen
    drawMatrix(canvas, array);
}

// Start the game loop
function gameLoop() {
    update();
    render();

}
  
  
  