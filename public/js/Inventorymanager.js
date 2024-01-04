class inventory{
    constructor({id,image,number,Hotbarid}){
        this.id= 25*id
        this.image=image
        this.number=number
        this.Hotbarid=Hotbarid

    }

    drawitems(){
        c.drawImage(Hotbar,10,60,80,400)
        c.lineWidth=8
        c.strokeStyle='red'
        c.strokeRect(24,(72+42*mousewheelc),50,40);
    
        for(let i=0 ; i <6; i++){
            if(inv.Hotbarid[i]==0){continue}
            c.drawImage(Bulletsforhotbar,this.id*i,0,25,25,35,(80+42*i),25,25)
            c.fillStyle = 'blue'
            c.fillText(`x${this.Hotbarid[i]}`,80,110+42*i)
            
        }
     
    }
}

