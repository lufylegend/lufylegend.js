function Rect(pointA,pointB,pointC,pointD,angleX,angleZ,color){
	base(this,LSprite,[]);
	this.pointZ=[(pointA[0]+pointB[0]+pointC[0]+pointD[0])/4,(pointA[1]+pointB[1]+pointC[1]+pointD[1])/4,(pointA[2]+pointB[2]+pointC[2]+pointD[2])/4];
	this.z = this.pointZ[2];
	this.pointA=pointA,this.pointB=pointB,this.pointC=pointC,this.pointD=pointD,this.angleX=angleX,this.angleZ=angleZ,this.color=color;
}
Rect.prototype.draw = function(layer){
	this.graphics.clear();
	this.graphics.drawVertices(1,"#000000",[this.getPoint(this.pointA),this.getPoint(this.pointB),this.getPoint(this.pointC),this.getPoint(this.pointD)],true,this.color);
};
Rect.prototype.setAngle = function(a,b){
	this.angleX = a;
	this.angleZ = b;
	this.z=this.getPoint(this.pointZ)[2];
};
Rect.prototype.getPoint = function(p){
	var u2,v2,w2,u=p[0],v=p[1],w=p[2];
    u2 = u * Math.cos(this.angleX) - v * Math.sin(this.angleX);
    v2 = u * Math.sin(this.angleX) + v * Math.cos(this.angleX);
    w2 = w;
    u = u2; v = v2; w = w2;
    u2 = u;
    v2 = v * Math.cos(this.angleZ) - w * Math.sin(this.angleZ);
    w2 = v * Math.sin(this.angleZ) + w * Math.cos(this.angleZ);
    u = u2; v = v2; w = w2;
    return [u2,v2,w2];
};