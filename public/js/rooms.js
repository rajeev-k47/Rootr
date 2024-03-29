
class Rooms{
    constructor({position,ratio,id,image}){
        this.position=position
        this.ratio=ratio
        this.id=id
        this.image=image
        
    }
    drawroom(x,y){
        c.drawImage(images[this.id],this.position.x-x,this.position.y-y,this.ratio.x,this.ratio.y)
    }
    drawforeground(x,y,image){
        c.drawImage(image,this.position.x-x,this.position.y-y,this.ratio.x,this.ratio.y)
    }
}

class Boundary {
    static width = 5.11;
    static height =4.74;
    constructor({ position,width,height }) {
        this.position = position
        this.width = width
        this.height = height
    }
    draw() {
        c.fillStyle = 'rgba(255,0,0,0.5)'
        c.fillRect(this.position.x,this.position.y, this.width, this.height)
    }
}
class Stops{
    constructor({position,image,width,height}){
        this.image=image
        this.position= position
        this.width= width
        this.height=height
    }
    draw(x,y,i,j){
        c.drawImage(this.image,this.position.x-x,this.position.y-y,i,j)
    }
}
class spawnitems{
    constructor({position,id,roomid}){
        this.position=position
        this.id=id
        this.roomid=roomid
        this.width=10
        this.height=10
    }
    draw(){
        c.drawImage(Bulletsforhotbar,this.id*25,0,25,25,this.position.x-camerax,this.position.y-cameray,10,10)
    }
}