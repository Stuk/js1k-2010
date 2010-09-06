d=document;
// get the canvas
(e=d.getElementById('c')).width=976;e.height=336;c=e.getContext('2d');
c.fillStyle="rgb(0,0,0)";
// array of buildings
o=[{x:40,y:200,w:900}];
// Player y
y=150;
// x is set to 40 all
v=0;
// gravity
g=1;
// jumping control
j=0;d.onkeydown=function(){j=10};d.onkeyup=function(){j=0};
//set to 0 if we've touched the ground
r=1;
function m(n,x){return Math.round(Math.random()*(x-n))+n}
setInterval(function(){
    // clear the canvas TODO shorten
    e.height++;e.height--;
    // Update player position
    console.log(j);
    if(j>0&&r==0){y-=3;j--;r=1}
    //v+=g;
    y+=1;
    // move and draw the buildings
    for(b in o){
        b=o[b];
        b.x-=10;
        c.fillRect(b.x,b.y,b.w,336);
        if(40>b.x&&40<b.x+b.w&&y>b.y){y=b.y;r=0;v=0}
        if(b.x+b.w<976&&!b.n){console.log(b);b.n=1;o.push({x:976,y:b.y+m(-5,20),w:m(50,200)});}
    }
    c.fillRect(40,y-10,10,10);
    j=0;
}, 50);
