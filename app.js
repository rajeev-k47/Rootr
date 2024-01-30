const express = require('express')
const { rmSync } = require('fs')
const app = express()

const http = require('http')
const { send } = require('process')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

const port = process.env.port ||3000

app.use(express.static('public'))

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

const players = {}
const backendprojectiles = {}
const spawn ={}
let i=0
let projectileID=0

io.on('connection', (socket)=>{
    console.log('A user connected ')
    socket.on('playerlocation',(position)=>{
        players[socket.id].xx = position.x 
        players[socket.id].yy = position.y 
        io.emit('updatePlayer', players)
        
    })
    socket.on('playersprite',(image)=>{
        players[socket.id].sprite = image
        io.emit('updatePlayer', players)
    })
    socket.on('mute',(condition)=>{
        if(players[socket.id]){
        players[socket.id].mute = condition
    }
        io.emit('updatePlayer',players)
    })
    socket.on('addusername',(username)=>{
        
        players[socket.id] ={
        xx: 640,
        yy:400,
        username: username,
        score :0,
        xp:215,
        roomid:1,
        keys : {
            w: {pressed: false},
            a: {pressed: false},
            s: {pressed: false},
            d: {pressed: false},
            shift: {pressed: false}
        },
        res:215,
        Team: Math.random()*10000,
        Teamcolor: `rgb(0,0,0)`,
        speed:5,
        invis:false

        
    }
    io.emit('updatePlayer', players)
    })
    

    socket.on('roomchange',({id,roomid})=>{
        players[id].roomid=roomid
        io.emit('updatePlayer', players)
        socket.emit('event',roomid)

    })
    socket.on('shoot', ({ x, y, angle ,hotbarid,playerpos,shootid}) => {
        projectileID++;
        const velocity = {
            x: Math.cos(angle) *10,
            y: Math.sin(angle) *10
        }
        backendprojectiles[projectileID] = {
            x, y, velocity, playerID: shootid,hotbarid,playerpos, trallowx:true,trallowy:true,approach:""
        }
    })

    socket.on('projectilecollision',(id)=>{
        delete backendprojectiles[id]
    })
    socket.on('projectilecollisionwp',({id,pid})=>{
        if(players[id]&&backendprojectiles[pid]){
            players[id].xp-= 2*backendprojectiles[pid].hotbarid+4
        if(players[id].xp<=0){
            delete players[id]
            if(backendprojectiles[pid]){
                players[backendprojectiles[pid].playerID].score+=1
                players[backendprojectiles[pid].playerID].res=215
                players[backendprojectiles[pid].playerID].xp=215
            }
            
        }
    }
        
        delete backendprojectiles[pid]
        io.emit('updatePlayer',players)

    })
    socket.on('keys',(keys)=>{
        if(players[socket.id]){players[socket.id].keys = keys}
        io.emit('updatePlayer',players)
    })
    socket.on('stops',({id,playerid})=>{
        if(id=="heal"&& players[playerid].xp<=215){
            players[playerid].xp+=0.2
        }
         if(id=="Resist" && players[playerid].res<=215){
            players[playerid].res+=0.3
        }
        io.emit('updatePlayer',players)
    })
    socket.on('blastdamage',(id)=>{
        if(players[id]){
        players[id].xp-=20
        if(players[id].xp<=0){
            delete players[id]
        }
        }
          io.emit('updatePlayer',players)


    })
    socket.on('shieldhit',({i,id})=>{
           if(players[id].res>=0){ players[id].res-=10}
            delete backendprojectiles[i]
            io.emit('updatePlayer',players)
    })
    socket.on('speedupdate',({id,speed})=>{
        players[id].speed=speed
        setTimeout(()=>{
            players[id].speed=5
        },4000)
    })
    socket.on('invis',(id)=>{
            players[id].invis=true
            setTimeout(()=>{
                players[id].invis=false
            },5000)
    })
    
    socket.on('delspawnitem',(i)=>{
            delete spawn[i]
            io.emit('delspawnbybackend',i)
    })
    socket.on('updateTeam',({name,color})=>{
            players[socket.id].Team=name
            players[socket.id].Teamcolor=color
    })
    socket.on('request',({id,toid})=>{
        io.emit('backendrequest',({pid:id,toid}))
    })
    socket.on('teamjoin',(senderid)=>{
        players[socket.id].Team=players[senderid].Team
        players[socket.id].Teamcolor=players[senderid].Teamcolor
        io.emit('updatePlayer',players)
    })
    
    socket.on('disconnect',(reason)=>{
        console.log(reason)
        delete players[socket.id]
        
        io.emit('updatePlayer',players)
    })
    //========================//
    

})
let spawnx,spawny,spawnid,elapsed,currenttime,closestplayer
setInterval(() => {
    currenttime=Date.now()
    for (const id in backendprojectiles) {





        //======================//
        if(backendprojectiles[id].hotbarid==6){
        backendprojectiles[id].x += backendprojectiles[id].velocity.x/5
        backendprojectiles[id].y += backendprojectiles[id].velocity.y/5
        const lastx = backendprojectiles[id].x-backendprojectiles[id].playerpos.x  
        const lasty = backendprojectiles[id].y-backendprojectiles[id].playerpos.y 
        
        if(Math.sqrt(lastx*lastx + lasty*lasty)>200){
          io.emit('blast',({lastx:backendprojectiles[id].x,lasty:backendprojectiles[id].y}))
          delete backendprojectiles[id]
       }
        }
        else if(backendprojectiles[id].hotbarid==5 &&players[backendprojectiles[id].playerID]){
            let mindistance = Infinity
            for(const i in players){
                if(i!=backendprojectiles[id].playerID&&players[i].roomid==players[backendprojectiles[id].playerID].roomid&&players[i].Team!=players[backendprojectiles[id].playerID].Team){
                    let distance =  calcdistance(players[backendprojectiles[id].playerID],players[i])
                    if(distance<mindistance){
                        mindistance=distance
                        closestplayer=players[i]
                        
                    }
                    backendprojectiles[id].approach = closestplayer
                }
            }
            // if(backendprojectiles[id].defined){
                if(backendprojectiles[id].approach.xx+18>backendprojectiles[id].x){
                backendprojectiles[id].x+=3} 
                else{backendprojectiles[id].x-=3}
            // }
            // if(backendprojectiles[id].defined){
                if(backendprojectiles[id].approach.yy+25>backendprojectiles[id].y){
                backendprojectiles[id].y+=3}else{backendprojectiles[id].y-=3}
            // }
        }
        else{
            backendprojectiles[id].x += backendprojectiles[id].velocity.x
            backendprojectiles[id].y += backendprojectiles[id].velocity.y
            // console.log(backendprojectiles[id])

        }
        if(backendprojectiles[id]){
        if(backendprojectiles[id].x<40||backendprojectiles[id].x>1500||backendprojectiles[id].y<80||backendprojectiles[id].y>750){
            delete backendprojectiles[id]
        }}
    }
    io.emit('updateprojectiles', backendprojectiles)
},15)

setInterval(()=>{
    spawnx=Math.random()
    spawny=Math.random()
    spawnid=Math.random()
    elapsed=Date.now()
    spawn[i] = {
        position:{x:spawnx*1380+115,y:spawny*650+70},
        id:parseInt(spawnid*7),
        roomid:parseInt(Math.random()*3-1),//prob of 0 is greater
        number:i,
        elapsed:elapsed
    }
    i++
    for(const j in spawn){if(spawn[j].elapsed+11000<currenttime){
        delete spawn[j]
        io.emit('delspawnbybackend',j)}}
    
    io.emit('spawnitems',spawn)
    console.log('spawneditem')
},7000)



server.listen(port, ()=> {
    console.log(`App is listening on ${port}`)
} )

function calcdistance(player1,player2){
        const dx = player2.xx-player1.xx
        const dy = player2.yy-player1.yy

        return Math.sqrt(dx*dx + dy*dy)
}