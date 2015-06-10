   function Viwepager(opts){
     this.wrap=opts.wrap;
	 this.list=opts.list;
	 this.init();
	 this.renderDOM();
	 this.bindEvent();
   }
   Viwepager.prototype.init=function(){
     this.radio=window.innerHeight/window.innerWidth;
	 this.scaleW=window.innerWidth;
	 this.index=0;
   };
   Viwepager.prototype.renderDOM=function(){
     var wrap=document.getElementById(this.wrap);
	 wrap.className='wrap';
	 var data=this.list;
	 var len=data.length;
	 var scale=this.scaleW;
	 this.outer=document.createElement("ul");
	 for(var i=0;i<len;i++){
	   var li=document.createElement("li");
	   var item=data[i];
	   li.style.width=scale+'px';
       li.style.height=window.innerHeight+'px';
	   li.style.webkitTransform='translate3d('+i*scale+'px,0,0)';
	   if(item){
	     if(item["height"]/item["width"]>this.radio){
		   li.innerHTML='<img height="'+window.innerHeight+'" src="'+item["image"]+'"/>';
		 }else{
		   li.innerHTML='<img width="'+window.innerWidth+'" src="'+item["image"]+'"/>';
		 }
	   }
	   this.outer.appendChild(li);
	 }
	 this.outer.style.width=scale+'px';
     wrap.appendChild(this.outer);
	 
	 this.outer1=document.createElement("div");
	 for(var i=0;i<len;i++){
		 var div=document.createElement("div");
		 div.className='wrap-point';
		 if(i==0){
			 div.style.backgroundColor='#1273B3';
		 }else{
			 div.style.backgroundColor='white';
		 }
		 
		 this.outer1.appendChild(div);
	 }
	 this.outer1.style.position='fixed';
	 this.outer1.id=this.wrap+"-point";
	 this.outer1.style.top=(window.innerHeight-30)+"px";
	 this.outer1.style.height='10px';
	 this.outer1.style.width=scale+'px';
	 this.outer1.style.textAlign='center';
	 var start = (scale - (2*len-1)*5)/2;
	 this.outer1.style.paddingLeft=start+"px";
	 wrap.appendChild(this.outer1);
	 
	 
   };
   Viwepager.prototype.bindEvent=function(){
     var _this=this;
	 var scale=_this.scaleW;
	 var outer=_this.outer;
	 var len=_this.list.length;
	 var startHandler=function(evt){
	   _this.startX=evt.touches[0].pageX;
	   _this.offsetX=0;
	   _this.startTime=new Date()*1;

	 };
	 var moveHandler=function(evt){
	   evt.preventDefault();
	   _this.offsetX=evt.touches[0].pageX-_this.startX;
	   var lis=outer.getElementsByTagName("li");
	   var i=_this.index-1;
	   var m=i+3;
	   for(i;i<m;i++){
	     lis[i]&&(lis[i].style.webkitTransform='translate3d('+((i-_this.index)*scale+_this.offsetX)+'px,0,0)');
		 lis[i]&&(lis[i].style.webkitTransition='none');
	   }
	 };
	 var endHandler=function(){
	   var boundry=scale/5;
	   var endTime=new Date()*1;
	   if(endTime-_this.startTime>=800){
	     var lis=outer.getElementsByTagName("li");
	     if(_this.offsetX>=boundry){
	       _this.go("-1");
	     }else if(_this.offsetX<-boundry){
	       _this.go("+1");
	     }else{
	       _this.go("0");
	     }
	   }else{
	     if(_this.offsetX>=50){
		   _this.go("-1");
		 }else if(_this.offsetX<-50){
		   _this.go("+1");
		 }else{
		   _this.go("0");
		 }
	   }
	   
	 };
     outer.addEventListener('touchstart',startHandler);
	 outer.addEventListener('touchmove',moveHandler);
	 outer.addEventListener('touchend',endHandler);
   };
   Viwepager.prototype.go=function(n){
     var index=this.index;
	 var cindex;
	 var lis=this.outer.getElementsByTagName("li");
	 var len=lis.length;
	 var scale=this.scaleW;
	 if(typeof n=='number'){
	   cindex=index;
	 }else if(typeof n=='string'){
	   cindex=index+n*1;
	 }
	 if(cindex>len-1){
	   cindex=len-1;
	 }else if(cindex<0){
	   cindex=0;
	 }
	 this.index=cindex;
	 lis[cindex].style.webkitTransition='-webkit-transform 0.2s ease-out';
	 lis[cindex-1]&&(lis[cindex-1].style.webkitTransition='-webkit-transform 0.2s ease-out');
	 lis[cindex+1]&&(lis[cindex+1].style.webkitTransition='-webkit-transform 0.2s ease-out');
	 lis[cindex].style.webkitTransform='translate3d(0,0,0)';
	 lis[cindex-1]&&(lis[cindex-1].style.webkitTransform='translate3d(-'+scale+'px,0,0)');
	 lis[cindex+1]&&(lis[cindex+1].style.webkitTransform='translate3d('+scale+'px,0,0)');
	 
	 var lst = document.getElementById(this.wrap+"-point").childNodes;
	 for(var i=0;i<lst.length;i++){
		 if(i == cindex){
			 lst[i].style.backgroundColor='#1273B3';
		 }else{
			 lst[i].style.backgroundColor='white';
		 }
		 	 
	 }
	 
	 
	 
	 
	 
	 
	 
	 
   }