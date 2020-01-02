function Bird(gravity, lift, air_res){
    this.gravity = gravity;
    this.lift = lift;
    this.air_res = air_res;
    this.x = 50;
    this.y = height/2;
    this.rad = 50;
    this.vel = 0;

    this.player = null;

    this.init = function(player){
        this.player = player;
    };

    this.think = function(bottom_pipe, top_pipe, pipe_x){
        if(this.player.play([this.x, this.y, this.vel, bottom_pipe, top_pipe, pipe_x, 1]) > 0.5){
            this.birdJump();
        }
    };

    this.drawBird = function(){
        fill(255);
        ellipse(this.x, this.y, this.rad);
    };
    this.updateBird = function(){
        this.vel += this.gravity;
        this.vel *= this.air_res;
        this.y += this.vel;
    };
    this.checkCollision = function(){
        if(0 < this.y && this.y < height){
            return true;
        }
        else{
            return false;
        } 
    };
    this.birdJump = function(){
        this.vel += this.lift;
    };
}