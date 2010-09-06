d=document;
// get the canvas
(e=d.getElementById('c')).width=976;e.height=336;c=e.getContext('2d');
c.fillStyle="rgb(0,0,0)";
function init(){
// array of buildings
o=[{x:40,y:200,w:900}];
// Player y
y=150;
// x is set to 40 all
v=0;
// gravity
g=1;
// current speed
s=10;
}
init();
// jumping control
j=0;d.onkeydown=function(){if(r==0)j=5};d.onkeyup=function(){j=0};
//set to 0 if we've touched the ground
r=1;
function m(n,x){return Math.round(Math.random()*(x-n))+n}
setInterval(function(){
    // clear the canvas TODO shorten
    e.height++;e.height--;
    // Update player position
    if(j>0){v-=3;r=1;j--}
    if(r==1){console.log("air");}
    v+=g;y+=v;
    r=1;
    // move and draw the buildings
    for(b in o){
        b=o[b];
        b.x-=s;
        c.fillRect(b.x,b.y,b.w,336);
        if(40>b.x&&40<b.x+b.w&&y>b.y){if(y-v<=b.y){y=b.y;r=0;v=0}else{init();break;}}
        if(!b.n&&b.x+b.w<970){b.n=1;o.push({x:976+m(0,22*s),y:b.y-m(-40,40),w:m(100,976)});}
    }
    c.fillRect(40,y-10,10,10);
    s+=0.01;
}, 30);
