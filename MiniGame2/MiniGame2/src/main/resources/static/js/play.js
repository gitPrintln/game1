/**
 * 
 */
 
window.addEventListener('DOMContentLoaded', () => {
     var canvas = document.getElementById('canvas');
     var context = canvas.getContext('2d');
     
     canvas.width = window.innerWidth - 100;
     canvas.height = window.innerHeight - 100;
     
     //context.fillStyle = 'green';
     //context.fillRect(10, 10, 100, 100);
     
     var img1 = new Image();
     img1.src = 'images/zollaman.png';
     var zolla = { // 졸라맨
        x : 10,
        y: 200,
        width : 50,
        height : 50,
        draw(){
            context.fillStyle = 'green';
            // context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(img1, this.x, this.y, this.width, this.height);
        }
     }
     // zolla.x += 1;
     var img2 = new Image();
     img2.src = 'images/검객맨.png';
     
     class Hurdle { // 방해물
        constructor(){
            this.x = 500;
            this.y = 200;
            this.width = 50;
            this.height = 50;
        }
        draw(){
            context.fillStyle = 'red';
            // context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(img2, this.x, this.y, this.width, this.height);
        }
    }
     
    var timer = 0;
    var hurdles = []; // 장애물들 관리
    var jumpTimer = 0;
    var animation; 
    
    var img3 = new Image();
    img3.src = 'images/bg1.jpg';
    
    function Frame(){ // 프레임 실행
        animation = requestAnimationFrame(Frame);
        timer++;
        
        context.clearRect(0,0, canvas.width, canvas.height);
    
        if(timer % 120 === 0){
        var hurdle = new Hurdle(); // 장애물 생성
        hurdles.push(hurdle);
        }
        
        hurdles.forEach((a, i, o) =>{
            // x 좌표가 0미만이면 장애물 제거 해주기
            if(a.x < 0){
                o.splice(i, 1);
            }
            a.x--;
            collision(zolla, a); // 충돌 확인
            a.draw();
        })
        
        // 점프 기능
        if(jumping == true){
            zolla.y--;
            jumpTimer++;
        }
        if(jumping == false){
            if(zolla.y < 200){
            zolla.y++;
            }
        }
        if(jumpTimer > 100){
            jumping = false;
            jumpTimer = 0;
        }
        // zolla.x += 1;
        zolla.draw();
    } 
     
    Frame();
    
    // 충돌 확인
    function collision(man, hurdle){
        var xCol = hurdle.x - (man.x + man.width);
        var yCol = hurdle.y - (man.y + man.height);
        if(xCol < 0 && yCol < 0){
            context.clearRect(0,0, canvas.width, canvas.height);
            cancelAnimationFrame(animation);
        }
    }
    
    
     
    var jumping = false;
    document.addEventListener('keydown', function(e){
        if(e.code === 'Space'){
            jumping = true;
        }
    })
     
     
});