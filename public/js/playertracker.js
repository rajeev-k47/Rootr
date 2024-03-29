let startx,starty ,angle,endx,endy
function startline(cursorx,cursory,playercentrex,playercentrey){
    angle = Math.atan2(cursory-playercentrey,cursorx-playercentrex)
 startx = playercentrex + 20 *Math.cos(angle)
 starty = playercentrey + 20*Math.sin(angle)
 endx =startx + 10*Math.cos(angle)
 endy =starty + 10*Math.sin(angle)
return{startx:startx,starty:starty,endx:endx,endy:endy}
}