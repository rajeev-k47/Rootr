const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const socket = io()

//Agora()

canvas.width = window.innerWidth
canvas.height = window.innerHeight
c.fillStyle = 'white'
c.fillRect(30, 0, canvas.width, canvas.height)
//=========================//
const offset = {x: 100,y : 0}//Offset to the map

//==========Loading images=========//
const HOTBAR={}
const image = new Image();image.src = './img/bg.png'
const bgimage=new Image();bgimage.src = './img/background1.png'
const room3=new Image();room3.src = './img/Aroom3.png'
const Foreground1 = new Image();Foreground1.src = './img/foreground1.png'
const Foreground0 = new Image();Foreground0.src = './img/foreground0.png'

const playerdownImage = new Image();playerdownImage.src = './img/Playersprite/playerDown.png'
const playerupImage = new Image();playerupImage.src = './img/Playersprite/playerUp.png'
const playerleftImage = new Image();playerleftImage.src = './img/Playersprite/playerLeft.png'
const playerrightImage = new Image();playerrightImage.src = './img/Playersprite/playerRight.png'
const damageup = new Image();damageup.src= './img/Playersprite/damageup.png'
const damagedown = new Image();damagedown.src= './img/Playersprite/damagedown.png'
const damageleft = new Image();damageleft.src= './img/Playersprite/damageleft.png'
const damageright = new Image();damageright.src= './img/Playersprite/damageright.png'
const invisup = new Image();invisup.src= './img/Playersprite/invisUp.png'
const invisdown = new Image();invisdown.src= './img/Playersprite/invisDown.png'
const invisleft = new Image();invisleft.src= './img/Playersprite/invisLeft.png'
const invisright = new Image();invisright.src= './img/Playersprite/invisRight.png'
const Blink = new Image();Blink.src = './img/Blink.png'
const microphone = new Image();microphone.src = './img/Playersprite/microphone.png'
const Bullets =new Image();Bullets.src='./img/Bullat.png'
const playerShield =new Image();playerShield.src='./img/Resistance/shield.png'
const Hotbar =new Image();Hotbar.src='./img/Hotbar.png'
const Bulletsforhotbar =new Image();Bulletsforhotbar.src='./img/Bullet.png'
const Timer  =new Image();Timer.src='./img/timer.png'

const cursor = new Image(); cursor.src='./img/cursor.png'
const bomb_animation = new Image(); bomb_animation.src='./img/explosion.png'
const bomb_hotbar = new Image(); bomb_hotbar.src='./img/bomb.png'

const healthbar1 =new Image();healthbar1.src='./img/Health/meter_bar_center-repeating_blue.png'
const healthbar2 =new Image();healthbar2.src='./img/Health/meter_bar_holder_center-repeating_blue.png'
const healthbar4 =new Image();healthbar4.src='./img/Health/meter_bar_holder_right_edge_blue.png'
const healthbar7 =new Image();healthbar7.src='./img/Health/meter_icon_holder_blue.png'
const healthbaricon =new Image();healthbaricon.src='./img/Health/health.png'

const Resbar1 =new Image();Resbar1.src='./img/Resistance/meter_bar_center-repeating_purple.png'
const Resbar2 =new Image();Resbar2.src='./img/Resistance/meter_bar_holder_center-repeating_purple.png'
const Resbar3 =new Image();Resbar3.src='./img/Resistance/meter_bar_holder_right_edge_purple.png'
const Resbar4 =new Image();Resbar4.src='./img/Resistance/meter_icon_holder_purple.png'
const Resbaricon =new Image();Resbaricon.src='./img/Resistance/sheild.png'
const Resist =new Image();Resist.src='./img/Resistance.png'

const speedup =new Image();speedup.src='./img/stamina.png'
const invis = new Image();invis.src='./img/magic.png'
//=============================================//
//============Loading audio====================//
const walksound = new Audio;walksound.src = './data/audio/walksound.mp3'
const laser_gun = new Audio;laser_gun.src= './data/audio/laser-gun.mp3'
const shotgun = new Audio;shotgun.src= './data/audio/gun.mp3'
//=============================================//

//=============Abilties================//

let Health = new Ability({
    id:1,
    levelimage:healthbar1,
    x:1150,
    y:0,
    bar2:healthbar2,
    bar4:healthbar4,
    bar7:healthbar7,
    baricon:healthbaricon,
    xfactor:40,
    yfactor:0

    
})

let Resistance= new Ability({
    id:2,
    levelimage:Resbar1,
    x:880,
    y:0,
    bar2:Resbar2,
    bar4:Resbar3,
    bar7:Resbar4,
    baricon:Resbaricon,
    xfactor:40,
    yfactor:0

    
})
//===============Inventory================//

let inv = new inventory({
    id:1,
    Hotbarid: [40,30,21,15,10,6,10]

})


//================================//
const images =[bgimage,image]
const background = new Rooms({
    position: {
        x: offset.x,
        y: offset.y
    },
    ratio:{
        x:1430,
        y:760
    },
    id:1
})
const foreground = new Rooms({
    position: {

        x: offset.x,
        y: offset.y
    },
    ratio:{
        x:1430,
        y:760
    }
})

//================================//
const heal = new Stops({
    image:Blink,
    position:{x:442,y:205},
    width:20,
    height:20

})
const Resist_up =new Stops({
    image:Resist,
    position:{x:1254,y:502},
    width:45,
    height:45
})



//===============================//
const projectiles = {}
let playerspeed=5


//=============Player sprite=============//


const players = []
let other =[]

socket.on('updateprojectiles', (backendprojectiles)=>{
    for(const id in backendprojectiles){
    if(!players[socket.id]){return}
    const backendprojectile = backendprojectiles[id]
    if(!projectiles[id]){
        projectiles[id]=new Projectile({
           position:{ 
            x:backendprojectile.x,
            y:backendprojectile.y},
            image:Bullets,
            width:8,
            height:8,
            id:backendprojectile.hotbarid,
            shootplayerid: backendprojectile.playerID,
            velocity:backendprojectile.velocity

        })
        if(backendprojectile.playerID==socket.id){
        inv.Hotbarid[mousewheelc]--
        shotgun.play()}
      }
    else{
        projectiles[id].position.x=backendprojectile.x
        projectiles[id].position.y=backendprojectile.y
   
     }
    }

    for(const id in projectiles){
        if(!backendprojectiles[id]){
            delete projectiles[id]
        }
    }

})
socket.on('updatePlayer', (backendPlayers) => {
    for (const id in backendPlayers) {
        const backendPlayer = backendPlayers[id];
        if (!players[id]) {
            players[id] = new Sprite({
                position: {
                     x: backendPlayer.xx,
                     y: backendPlayer.yy
                },
                image: playerdownImage,
                frames: {
                    max: 4
                },
                sprites: {
                    up: playerupImage,
                    left: playerleftImage,
                    down: playerdownImage,
                    right: playerrightImage,
                },
                spn : 2,
                score:0,
                xp:215,
                res:215,
                roomid:1,
                keys : {
                    w: {pressed: false},
                    a: {pressed: false},
                    s: {pressed: false},
                    d: {pressed: false},
                    shift: {pressed: false}
                },
                shield:false,
                Team:backendPlayer.Team,
                Teamcolor:backendPlayer.Teamcolor,
                speed:5

            });
            // data-score ="${backendPlayer.score}"
        document.querySelector('#playerlabels').innerHTML+=`<div style="border-color:white;padding-left:4px" data-id ="${id}" > ${backendPlayer.username}: ${players[id].score} </div>`
        }
        else {
            players[id].position.x = backendPlayer.xx;
            players[id].position.y = backendPlayer.yy;
            players[id].mute = backendPlayer.mute
            players[id].spn = backendPlayer.sprite
            players[id].username = backendPlayer.username
            players[id].score=backendPlayer.score
            players[id].xp = backendPlayer.xp
            players[id].res=backendPlayer.res
            players[id].roomid = backendPlayer.roomid
            players[id].keys = backendPlayer.keys
            players[id].shield = backendPlayer.keys.shift.pressed
            players[id].Team=backendPlayer.Team
            players[id].Teamcolor=backendPlayer.Teamcolor
            players[id].speed=backendPlayer.speed
            players[id].invis=backendPlayer.invis

            if(id==socket.id){
                playerspeed= players[id].speed
                Health.xp=players[id].xp
                Resistance.xp=players[id].res
            }
            
            if(players[socket.id]){background.id= players[socket.id].roomid}
            document.querySelector(`div[data-id="${id}"]`).innerHTML= `${backendPlayer.username}: ${backendPlayer.score}`

            if (players[id].spn == 2) {
                players[id].image = players[id].sprites.left
            }
            else if (players[id].spn == 3) {
                players[id].image = players[id].sprites.right
            }
            else if (players[id].spn == 0) {
                players[id].image = players[id].sprites.up
            }
            else if (players[id].spn == 1) {
                players[id].image = players[id].sprites.down
            }
        }
    }
        
    for(const id in players){
        if(!backendPlayers[id]){
            const divtodel=document.querySelector(`div[data-id="${id}"]`)
            divtodel.parentNode.removeChild(divtodel)
            if(id === socket.id){
             document.querySelector('#userform').style.display='block'
            }
            delete players[id]
        }
    }
    for(const id in players){
        if(socket.id != id){
          other[id] = players[id]
        }
    }

});
socket.on('blast', ({lastx,lasty})=>{
    startExplosion(lastx-64,lasty-64)//64 as width of animation
    for(const id in players){
        let playerx = players[id].position.x + players[id].width/8
        let playery = players[id].position.y + players[id].height/2
        if(playerx>lastx-32 && playerx<lastx+32 && playery>lasty-32&& playery<lasty+32 ){
            players[id].sprites = {up:damageup,down:damagedown,left:damageleft,right:damageright}
            setTimeout(()=>{players[id].sprites={up:playerupImage,down:playerdownImage,left:playerleftImage,right:playerrightImage}},200)
            socket.emit('blastdamage',id)
        }
    }
})

socket.on('spawnitems',(spawnarray)=>{
    for(const id in spawnarray){
    if(id>=i){
        spawn[i]= new spawnitems({
         position:{x:spawnarray[id].position.x,y:spawnarray[id].position.y},
         id:spawnarray[id].id,
         roomid:spawnarray[id].roomid
    })
    i++
}
}
})

socket.on('delspawnbybackend',(i)=>{
    delete spawn[i]
})
var senderid
socket.on('backendrequest',({pid,toid})=>{
    if(toid==socket.id){
        senderid=pid
    document.getElementById('request').innerHTML = "<div id=\"requestdiv\">============<br>Do you want to join " + players[pid].username + "'s party<br> <button onclick=\"Accepted()\" id=\"right\"style=\"padding-left:10px;padding-right:10px;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size:18px ;font-weight: bold;background-color:grey;border:4px solid blue;border-radius:5px;cursor:pointer\"> <i class=\"fa-solid fa-check\"></i></button> <button onclick=\"Rejected()\" id=\"wrong\" style=\"padding-left:10px;padding-right:10px;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size:18px ;font-weight: bold;background-color:grey;border:4px solid blue;border-radius:5px;cursor:pointer\"> <i class=\"fa-solid fa-xmark\"></i></button></div>";
    document.getElementById('request').style="top:200px;right:0px;width:140px;height:100px;display:flex; position: absolute;border:2px solid blue;background-color:grey; padding-left :5px;border-radius:5px;font-size:20px;font-weight:bold"

    
}})

//============================================//

const keys = {
    w: {pressed: false},
    a: {pressed: false},
    s: {pressed: false},
    d: {pressed: false},
    t: {pressed: false},
    r: {pressed: false},
    i: {pressed: false},
    g: {pressed: false},
    shift: {pressed: false}
}

let touchup,touchdown,touchleft,touchright
let cursorx,cursory

window.addEventListener('touchstart',touchstart)
window.addEventListener('touchmove', touchmove)
window.addEventListener('touchend',touchend)
window.addEventListener('mousemove',(e)=>{
    cursorx=e.clientX;
    cursory=e.clientY;
})



let number,indexnumber
const collisionsMap1 = []
const collisionsMap0 = []
const boundaries1 = []
const boundaries0 = []
const doormap1 = []
const doormap0 = []
const door1=[]
const door0=[]
let spawn ={}
let i=0,entity=5,invisnum=5,Timernum=5
let spawnx,spawny,spawnid,Teamedit,clickallowed
const FPS = 120

convertmap(collisions2,collisionsMap1,boundaries1,106501,1)//Mapconvertor.js
convertmap(collisions1,collisionsMap0,boundaries0,36870,1)//Mapconvertor.js
convertmap(Door1,doormap1,door1,106506,2)
convertmap(Door0,doormap0,door0,20481,2)
//================================================================================//
//=================================ANIMATION======================================//
//================================================================================//
let camerax=0 
let cameray=0
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 1000 / FPS);

    if(players[socket.id]){
    camerax = players[socket.id].position.x - canvas.width/2
    cameray = players[socket.id].position.y - canvas.height/2}

    background.drawroom(camerax,cameray);
   if(players[socket.id]&&players[socket.id].roomid==1){
    heal.draw(camerax,cameray,20,20)
    Resist_up.draw(camerax,cameray,41,40)
   }

if(!players[socket.id]){return}
  c.beginPath()
  c.lineWidth=8
   let playercentrex = players[socket.id].position.x-camerax+players[socket.id].width/2
   let playercentrey = players[socket.id].position.y-cameray+players[socket.id].height/2
   for(const id in players){
    if(id!=socket.id&& players[id].roomid==players[socket.id].roomid&&players[id].Team!=players[socket.id].Team&&!players[id].invis){
        startline(players[id].position.x-camerax,players[id].position.y-cameray,playercentrex,playercentrey)
        c.moveTo(startx,starty) 
        c.lineTo(endx,endy)
        c.stroke()   
     
    }
   }
  
    for (const id in players) {
        const player = players[id];
        if(players[id].roomid==players[socket.id].roomid&&!player.invis){
            player.sprites={up:playerupImage,down:playerdownImage,left:playerleftImage,right:playerrightImage}
            player.draw(camerax,cameray);
            c.font = "bold 15px Comic Sans MS";
            c.fillStyle="white"
            c.textAlign= 'center'
              if (!players[id].mute) {
                c.drawImage(microphone, player.position.x-camerax, player.position.y-cameray)
            }
        }  
        else if(player.invis&&id==socket.id){
            player.sprites={up:invisup,down:invisdown,left:invisleft,right:invisright}
            player.draw(camerax,cameray)
        }
    }
    for(const id in projectiles){
        const Projectile=projectiles[id]
        Projectile.draw(camerax,cameray)
    }
    let moving = true
    let tocheck
    for(const id in players){
        for(const i in spawn){
            if(spawn[i].roomid==players[socket.id].roomid){
                spawn[i].draw()}
            if(rectangularcollisionwithoutwalls({
                rectangle2:players[id],
                rectangle1:spawn[i]
            })){
                let spawnid= spawn[i].id
                inv.Hotbarid[spawnid]+=parseInt(15-3*(spawnid)*Math.random())
                socket.emit('delspawnitem',i)
            }
        
     }
    }
    if(players[socket.id].roomid==1){
        foreground.drawforeground(camerax,cameray,Foreground1)
        tocheck = boundaries1
        doortocheck = door1
      }
    else if(players[socket.id].roomid==0){
        foreground.drawforeground(camerax,cameray,Foreground0)
        tocheck = boundaries0
        doortocheck = door0
    }
    for(const id in players){
        const player =players[id]
        if(players[id].roomid==players[socket.id].roomid&&!players[id].invis){c.fillStyle=players[id].Teamcolor; c.fillText(player.username,player.position.x+player.width/2-camerax,player.position.y-cameray)}
    }

    
    inv.drawitems()
//=================================================//
    Health.draw()
    Resistance.draw()
    

    c.drawImage(cursor,cursorx- cursor.width/64,cursory-cursor.height/64,512/28,512/28) //original size 512x512 px
    
    // tocheck.forEach(boundary => {boundary.draw()}) 
    // doortocheck.forEach(boundary => {boundary.draw()}) //can be used to locate barrier blocks

    
for(const id in projectiles){
for(let i=0 ;i <tocheck.length;i++){
    const boundary = tocheck[i]
    if(rectangularcollisionwithoutwalls({
        rectangle1: projectiles[id],
        rectangle2: boundary
         }
       )
    ){socket.emit('projectilecollision',id)}
}}

for(const id in players){
    if( players[id].roomid==players[socket.id].roomid){
    for(const i in projectiles){
        if(rectangularcollisionwithoutwalls({
            rectangle2: players[id],
            rectangle1: projectiles[i]
             }
           )&& !players[id].shield
        ){
            if(id!=projectiles[i].shootplayerid&&projectiles[i].id!=90&&players[socket.id].Team!=players[id].Team){
                socket.emit('projectilecollisionwp',{id:id,pid:i})
                if(projectiles[i].id==60){socket.emit('speedupdate',({id:id,speed:2.5}))}
                players[id].sprites = {up:damageup,down:damagedown,left:damageleft,right:damageright}
                setTimeout(()=>{players[id].sprites={up:playerupImage,down:playerdownImage,left:playerleftImage,right:playerrightImage}},200)

                
            }
            
            break
        }
        
    }
}

}

drawpowers(entity,invisnum,Timernum)

for(const id in players){
    let shields={
        image:playerShield,
        position:{x:players[id].position.x-players[id].width/2,y:players[id].position.y-players[id].height/4},
        width:70,
        height:70
    
    }
if(players[id].shield&& players[id].res>=0){
    c.drawImage(shields.image,shields.position.x-camerax,shields.position.y-cameray,shields.width,shields.height)
    for(const i in projectiles){
        if(rectangularcollisionwithoutwalls({
            rectangle2:shields,
            rectangle1:projectiles[i]
        })&&players[socket.id].Team!=players[id].Team&&projectiles[i].shootplayerid!=id){
            socket.emit('shieldhit',({i:i,id:id}))
        }}
}}
if(rectangularcollisionwithoutwalls({
    rectangle1:players[socket.id],
    rectangle2:heal
})){
    socket.emit('stops',{id:"heal", playerid: socket.id})
}
if(rectangularcollisionwithoutwalls({
    rectangle1:players[socket.id],
    rectangle2:Resist_up
})){
    socket.emit('stops',{id:"Resist", playerid: socket.id})
}

for(const id in players){
    for(let i =0 ; i<doortocheck.length; i++){
        const doorboundary =  doortocheck[i]
        if(rectangularcollision({
            rectangle1: players[id],
            rectangle2: {...doorboundary, position:{x:doorboundary.position.x-3 ,y:doorboundary.position.y}
               }
             }
           )
        ){
            if(players[id].roomid==0){
                players[id].roomid=1
                players[id].position.x=120
                socket.emit('roomchange',({id:id,roomid:players[id].roomid}))
                break
            }
            else if(players[id].roomid==1){
                players[id].roomid=0
                players[id].position.x =1480
                 socket.emit('roomchange',({id:id,roomid:players[id].roomid}))
                 break
            }
            
            
        }
    }
}

    walksound.pause()


 
    if (keys.w.pressed || touchup === true){
        players[socket.id].moving = true
        players[socket.id].image = players[socket.id].sprites.up
        for(let i=0 ;i <tocheck.length;i++){
            const boundary = tocheck[i]
            if(rectangularcollision({
                rectangle1: players[socket.id],
                rectangle2: {...boundary, position:{x:boundary.position.x ,y:boundary.position.y+5}
                   }
                 }
               )
            ){moving =false;players[socket.id].moving=false ; break}
        }
    if(moving){
        players[socket.id].position.y-=playerspeed
        walksound.play()
        socket.emit('playerlocation',players[socket.id].position)
        socket.emit('playersprite','0')

    }
    
    }
    else if (keys.s.pressed || touchdown===true) {
        players[socket.id].moving=true
        players[socket.id].image = players[socket.id].sprites.down
        for(let i=0 ;i <tocheck.length;i++){
            const boundary = tocheck[i]
            if(rectangularcollision({
                rectangle1: players[socket.id],
                rectangle2: {...boundary, position:{x:boundary.position.x ,y:boundary.position.y-5}
                   }
                 }
               )
            ){
                moving =false;players[socket.id].moving=false ;
                break
            }
                }
        if(moving){
            players[socket.id].position.y+=playerspeed
            walksound.play()
            socket.emit('playerlocation',players[socket.id].position)
            socket.emit('playersprite','1')

    }
    }
    else if (keys.a.pressed|| touchleft===true) {
        players[socket.id].moving=true
        players[socket.id].image = players[socket.id].sprites.left
        for(let i=0 ;i <tocheck.length;i++){
            const boundary = tocheck[i]
            if(rectangularcollision({
                rectangle1: players[socket.id],
                rectangle2: {...boundary, position:{x:boundary.position.x+5,y:boundary.position.y}
                   }
                 }
               )
            ){
                moving =false;players[socket.id].moving=false ;
                break
            }
                }
        if(moving){
            players[socket.id].position.x-=playerspeed
            walksound.play()
            socket.emit('playerlocation',players[socket.id].position)
            socket.emit('playersprite','2')

        }
    }
    else if (keys.d.pressed|| touchright===true) {
        players[socket.id].moving=true
        players[socket.id].image=players[socket.id].sprites.right
        for(let i=0 ;i <tocheck.length;i++){
            const boundary = tocheck[i]
            if(rectangularcollision({
                rectangle1: players[socket.id],
                rectangle2: {...boundary, position:{x:boundary.position.x-5,y:boundary.position.y}
                   }
                 }
               )
            ){
                moving =false;players[socket.id].moving=false ;
                break
            }
                }
        
        if(moving){
            players[socket.id].position.x+=playerspeed
            walksound.play()
            socket.emit('playerlocation',players[socket.id].position)
            socket.emit('playersprite','3')


        }
    }



   if(document.getElementById('Team')){document.getElementById('Team').addEventListener('focus',()=>{
    Teamedit=true
   })
   document.getElementById('Team').addEventListener('focusout',()=>{
    Teamedit=false
   })}
    if(!(players[socket.id].res>=0)){keys.shift.pressed=false}
    socket.emit('keys',keys)
    clickallowed=true
    for(const id in players){
        document.querySelector(`div[data-id="${id}"]`).addEventListener('click',()=>{
            clickallowed=false
            if(id!=socket.id){
               if(Teamcreated){ socket.emit('request',({id:socket.id,toid:id}))}
               else{
                document.getElementById('request').innerHTML = "<div id=\"requestdiv\">============<br>Please create a Team before invite<br> <button onclick=\"Rejected()\" id=\"right\"style=\"padding-left:10px;padding-right:10px;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size:18px ;font-weight: bold;background-color:grey;border:4px solid blue;border-radius:5px;cursor:pointer\"> Ok</button> </div>";
                document.getElementById('request').style="top:200px;right:0px;width:140px;height:100px;display:flex; position: absolute;border:2px solid blue;background-color:grey; padding-left :5px;border-radius:5px;font-size:20px;font-weight:bold"
               }
            }
        })}
             
    

if(keys.r.pressed&&entity>0){
  
    keys.r.pressed=false
    entity-=1
    socket.emit('speedupdate',({id:socket.id,speed:7.5}))
    }
if(keys.i.pressed&&invisnum>0){
    keys.i.pressed=false
    invisnum-=1
    socket.emit('invis',socket.id)
}
if(keys.g.pressed&&Timernum>0){
    keys.g.pressed=false
    Timernum-=1
    // socket.emit('invis',socket.id)
}
    //=======================================================//
    

   
    
}

animate()

window.addEventListener('keydown', checkkeydown)
window.addEventListener('keyup',checkkeyup)


document.querySelector('#userform').addEventListener('submit',(e)=>{
    e.preventDefault()
    Health.xp=215
    delete spawn
    Resistance.xp =215
    inv.Hotbarid= [40,30,21,15,10,6,10]
    document.querySelector('#userform').style.display = 'none'
    document.getElementById('canvas').style.cursor='none'
    socket.emit('addusername',(document.querySelector('#userinput').value))
})



//----------//
