// File to hold utility math function used in NEAT
function sigmoidActivation(x){
    let sigmoid_output = (1 / (1 + Math.exp(-x)));
    return sigmoid_output;
}

function binCrossEntropy(y, a){
    let loss = -((y * Math.log(a)) + ((1 - y) * Math.log(1-a)));
    return loss; 
}

function randomNumber(min, max) {
    return (Math.random() * (max - min)) + min;
}