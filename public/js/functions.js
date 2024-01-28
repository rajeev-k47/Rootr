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
        rectangle1.position.x + rectangle1.width>=rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y+ rectangle1.height<=rectangle2.position.y + rectangle2.height && 
        rectangle1.position.y + rectangle1.height>= rectangle2.position.y
    )
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
        case 'shift':
            keys.shift.pressed = false
            break
    }
    socket.emit('input',keys)
    
}


var touchstartx,touchstarty
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
        requestAnimationFrame(playExplosion)
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
    socket.emit('updateTeam',{name:document.getElementById('Team').value,color: "rgb("+r()+","+r()+","+r()+")"})
    document.getElementById('input').innerHTML = "<div>Team : " + document.getElementById('Team').value + "</div>";
    document.getElementById('input').style= "border: 3px solid black;border-radius:5px;font-size:15px;font-weight:bold;padding-left:5px;padding-right:5px"

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