function rectangularcollision({rectangle1,rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width>=rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y+ rectangle1.height/1.5 <=rectangle2.position.y + rectangle2.height && //adjusted collision detection
        rectangle1.position.y + rectangle1.height/1.1>= rectangle2.position.y
    )
}
function rectangularcollisionwithoutwalls({rectangle1,rectangle2}){
    return(
        parseInt(rectangle1.position.x) + rectangle1.width>=parseInt(rectangle2.position.x) &&
        parseInt(rectangle1.position.x) <= parseInt(rectangle2.position.x) + rectangle2.width &&
        parseInt(rectangle1.position.y)+ rectangle1.height<=parseInt(rectangle2.position.y )+ rectangle2.height && 
        parseInt(rectangle1.position.y) + rectangle1.height>= parseInt(rectangle2.position.y)
    )
}
function collisioncheck(){
    let x1,x2,y1,y2
       if( parseInt(rectangle1.position.x) + rectangle1.width>=parseInt(rectangle2.position.x) &&
        parseInt(rectangle1.position.x) <= parseInt(rectangle2.position.x) + rectangle2.width &&
        parseInt(rectangle1.position.y)+ rectangle1.height<=parseInt(rectangle2.position.y )+ rectangle2.height && 
        parseInt(rectangle1.position.y) + rectangle1.height>= parseInt(rectangle2.position.y)){

        }
        // x1=rectangle1.position.x
        // x2=rectangle2.position.x
        // y1=rectangle1.position.y
        // y2=rectangle2.position.y
}

function checkkeydown(e){
        // e= event
        if(Teamedit){return}
    switch (e.key.toLowerCase()) {
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
        case 't':
            keys.t.pressed=true
            break
        case 'r':
            keys.r.pressed=true
            break
        case 'i':
            keys.i.pressed=true
            break
        case 'g':
            keys.g.pressed=true
            break
        case 'shift':
            keys.shift.pressed = true
            break
    }
    socket.emit('input',keys)
    
}

function checkkeyup(e){
    if(Teamedit){return}
    
    switch (e.key.toLowerCase()) {
        case 'w':
            keys.w.pressed = false
            players[socket.id].moving = false
            break
        case 'a':
            keys.a.pressed = false
            players[socket.id].moving = false
            break
        case 's':
            keys.s.pressed = false
            players[socket.id].moving = false
            break
        case 'd':
            keys.d.pressed = false
            players[socket.id].moving = false
            break
        case 't':
            keys.t.pressed=false
            break
        case 'r':
            keys.r.pressed=false
            break
        case 'i':
            keys.i.pressed=false
            break
        case 'g':
            keys.g.pressed=false
            break
        case 'shift':
            keys.shift.pressed = false
            break
    }
    socket.emit('input',keys)
    
}


var touchstartx,touchstarty
let Teamcreated=false
function touchstart(e){
    touchstartx = e.touches[0].clientX
    touchstarty = e.touches[0].clientY
}

function touchend(){
    touchdown=false
    touchup= false
    touchleft=false
    touchright=false
    players[socket.id].moving = false
}

function touchmove(e){
    var touchEndX = e.touches[0].clientX
    var touchEndY = e.touches[0].clientY
    if(touchEndX>touchstartx){
        if(touchEndX-touchstartx>Math.abs(touchEndY-touchstarty)){
            touchright=true
        }
        else{
            if(touchstarty>touchEndY){
              touchup =true
            }
            else{touchdown=true}
        }
    }
    else{
        if(Math.abs(touchEndX-touchstartx)>Math.abs(touchEndY-touchstarty)){
            touchleft=true
        }
        else{
            if(touchstarty>touchEndY){
                touchup =true
              }
              else{touchdown=true}
        }

    }

}

let row=1,column=1
let interval
let bx=0,by=0
function playExplosion(){
    c.drawImage(bomb_animation,128*(row-1),128*(column-1),128,128,bx-camerax,by-cameray,128,128)
    if(row%8==0){
        column++;row=1
     }
     row++
    if (column<= 6 && row<=8){
        setTimeout(() => {
            requestAnimationFrame(playExplosion);
        }, 1000 / 80);
    }
}
function startExplosion(x,y) {
    row=1,column=1
    bx=x ;by=y
    playExplosion()
}

function r() {
    return Math.floor(Math.random() * 256);
  }

function join(){
    clickallowed=false
    socket.emit('updateTeam',{name:document.getElementById('Team').value,color: "rgb("+r()+","+r()+","+r()+")"})
    document.getElementById('input').innerHTML = "<div>Team : " + document.getElementById('Team').value + "</div>";
    document.getElementById('input').style= "border: 3px solid black;border-radius:5px;font-size:15px;font-weight:bold;padding-left:5px;padding-right:5px"
    Teamcreated=true
}
function Accepted(){
    clickallowed=false
    document.getElementById('request').remove()
    socket.emit('teamjoin',senderid)
    console.log(players[socket.id].Team)


    }
function Rejected(){
    clickallowed=false
    document.getElementById('request').remove()
}

function drawpowers(entity,invisnum,Timernum){
c.beginPath();
c.arc(200, 30, 25, 0, 2 * Math.PI, false);
c.fillStyle = 'rgba(53,53,53,0.5)';
c.fill()
c.lineWidth = 4;
c.strokeStyle = 'rgba(215,16,18,0.5)';
c.stroke();
c.drawImage(speedup,181,15,35,35)
c.fillStyle= 'white'
c.fillRect(170,8,12,12)
c.fillStyle='black'
c.fillText('R',176,19)
c.fillStyle='red'
c.fillText(`x${entity}`,220,60)

c.beginPath();
c.arc(260, 30, 25, 0, 2 * Math.PI, false);
c.fillStyle = 'rgba(53,53,53,0.5)';
c.fill()
c.lineWidth = 4;
c.strokeStyle = 'rgba(215,16,18,0.5)';
c.stroke();
c.drawImage(invis,242.5,15,35,35)
c.fillStyle= 'white'
c.fillRect(231,8,12,12)
c.fillStyle='black'
c.fillText('I',237,19)
c.fillStyle='red'
c.fillText(`x${invisnum}`,281,60)

c.beginPath();
c.arc(320, 30, 25, 0, 2 * Math.PI, false);
c.fillStyle = 'rgba(53,53,53,0.5)';
c.fill()
c.lineWidth = 4;
c.strokeStyle = 'rgba(215,16,18,0.5)';
c.stroke();
c.drawImage(Timer,303,14,35,35)
c.fillStyle= 'white'
c.fillRect(292,8,12,12)
c.fillStyle='black'
c.fillText('G',298,19)
c.fillStyle='red'
c.fillText(`x${Timernum}`,342,60)
}