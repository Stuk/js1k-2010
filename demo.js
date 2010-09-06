d=document;
d.body.style.backgroundColor="#4D4D59";
// get the canvas
e=d.getElementById('c');c=e.getContext('2d');

// Create the building pattern
e.height=64;e.width=32;c.fillStyle="#BBC";c.fillRect(0,0,32,64);c.fillStyle="#4D4D59";c.fillRect(4,44,24,20);
p=c.createPattern(e, 'repeat');

e.style.border="5px inset #646A7D";
e.width=976;e.height=336;

function i(){
    // array of buildings
    o=[{x:0,y:200,w:900},{x:0,y:-220,w:900,n:1}];
    // Player y (x is 40)
    y=150;
    // Player y velocity
    v=0;
    // current speed
    s=10;
    //set to 0 if we've touched the ground
    r=1;
    // frame number/score
    f=0;
}
i();

// jumping control
j=0;d.onkeydown=function(){if(r==0)j=5};d.onkeyup=function(){j=0};
function m(n,x){return Math.round(Math.random()*(x-n))+n}
setInterval(function(){
    // clear the canvas TODO shorten
    c.fillStyle="#63697C";
    c.fillRect(0,0,976,336);
    // Update player position
    if(j>0){v-=3;r=1;j--}
    v++;y+=v;
    r=1;
    // move and draw the buildings
    for(b in o){
        b=o[b];
        b.x-=s;

        c.save();
        c.translate(b.x,b.y);
        c.fillStyle=p;
        c.fillRect(0,0,b.w,336);
        c.fillStyle="#FFF";
        c.fillRect(-1,0,b.w+2,2);
        c.restore();

        if(40>b.x&&40<b.x+b.w&&y>b.y&&y<b.y+336){if(y-v<=b.y){y=b.y;r=0;v=0}else{i();break;}}
        if(y>336){i();break;}
        if(!b.n&&b.x+b.w<970){
            b.n=1;
            n = {x:976+m(0,22*s),y:b.y-m(-40,40),w:m(100,976)};
            o.push(n);
            // Sometimes we want a roof
            if(m(0,10)==0) o.push({x:n.x,y:n.y-420,w:n.w,n:1});
        }
    }
    c.fillStyle="#000";
    c.fillRect(40,y-10,10,10);
    c.fillStyle="#FFF";
    c.font = '16px sans-serif';
    c.textAlign = 'right';
    c.textBaseline = 'top';
    c.fillText(Math.round((f+=s)/50)+'m', 970, 5);
    s+=0.02;
}, 30);
