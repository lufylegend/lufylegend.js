function FPS(){
        var s = this;
        base(s,LSprite,[]);
        s.fps = new LTextField();
        s.fpsCount = 0;
        s.fpsTime = (new Date()).getTime();
        s.fps.color = "#ffffff";
        s.addChild(s.fps);
        s.addEventListener(LEvent.ENTER_FRAME,s.showFPS);
}
FPS.prototype.showFPS = function(s){
        s.fpsCount++;
        var t = (new Date()).getTime();
        if(t - s.fpsTime < 1000)return;
        s.fpsTime = t;
        s.fps.text = s.fpsCount;
        s.fpsCount = 0;
        s.graphics.clear();
        s.graphics.drawRect(0,"#000000",[0,0,s.fps.getWidth(),20],true,"#000000");
};