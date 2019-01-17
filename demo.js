// js1k 2010 entry by Stuart Knightley
// based on Canabalt, http://www.adamatomic.com/canabalt/

d=document;M=Math;R=M.round;W=976;H=336;
// get the canvas
e=d.body.children.c;c=e.getContext('2d');e.width=W;e.height=H;
c.font = '16px sans';
g=c.createLinearGradient(l=t=f=0,0,0,H);g.addColorStop(0,'#E83');g.addColorStop(1,'#FD6');
function i(){
    // l = last score
    l=R(f/50);
    // t = top score
    t = M.max(t,l);
    // array of buildings (and some var definitions)
    // f = frame number/score
    // v = player y velocity
    // r = set to 0 if we've touched the ground
    // j = how long left of the current jump there is
    o=[{x:j=f=v=0,y:200,w:W},{x:0,y:-220,w:W,n:r=1}];
    // Player y (x is 40)
    y=150;
    // current speed
    s=10;
}
i();

// jumping control
d.onkeydown=function(){if(r==0)j=5};d.onkeyup=function(){j=0};
function m(n,x){return R(M.random()*(x-n))+n}
setInterval(function(){
    // clear the canvas
    c.fillStyle=g;
    // Set r to non-zero
    c.fillRect(0,0,r=W,H);
    // Update player position
    if(j>0){v-=3;r=1;j--}
    v++;y+=v;
    // move and draw the buildings
    for(b in o){
        b=o[b];
        b.x-=s;

        c.fillStyle=(b.b)?'#444':'#000';
        c.fillRect(b.x,b.y,b.w,H);

        // Check if player is colliding
        if(40>b.x&&40<b.x+b.w&&y>b.y&&y<b.y+H) {
            // Are we on the top/ground
            if(y-v<=b.y){y=b.y;r=0;v=0}
            // or colliding?
            else{if(!b.b){i();break;}else s*=0.8}
        }
        // If off bottom, stop
        if(y>H){i();break;}
        // Check if we need to create a new building
        if(!b.n&&b.x+b.w<970){
            o.push(n = {x:b.n=W+m(0,22*s),y:b.y-m(-40,40),w:m(200,999)});
            // Sometimes we want a roof... (m(...)==0)
            if(!m(0,10)) o.push({x:n.x,y:n.y-420,w:n.w,n:1});
            // ...and occassionally up to 3 boxes. Add to the front of the array
            // so that the tallness is drawn behind the buildings
            for(z=m(-3,3);z-->0;) o.unshift({x:m(n.x,n.x+n.w-20),y:n.y-20,w:20,n:1,b:1});
        }
    }
    // Draw player
    c.fillRect(40,y-10,10,10);
    c.fillText('Hi '+t+'m Last '+l+'m | '+R((f+=s+=0.05)/50)+'m', 750, 20);
}, 30);
