;(function($){
	var Slider = function(obj,ls){
		this.obj = obj;
		this.ls = ls;
		this.init();
		this.render();
		this.bindEvent();
	}
	
	
	Slider.prototype={
		init:function(){
			
		},
		bindEvent:function(){
			var _self = this;
			_self.obj.find(".ctrl-i").each(function(i){
				$(this).click(function(){
					_self.change(i);
				})
			})
		},
		render:function(){
			var _self = this;
			_self.obj.addClass("silder");
			var divMain = document.createElement("div");
			var divCtrl = document.createElement("div");
			divMain.className = "main";
			divCtrl.className = "ctrl";
			for(var i=0;i<_self.ls.length;i++){
				_self.addItem(divMain,divCtrl,_self.ls[i],i);
			}
			_self.addItem(divMain,divCtrl,_self.ls[0],_self.ls.length,true);
			_self.obj.empty();
			_self.obj.append(divMain);
			_self.obj.append(divCtrl);
			_self.change(0);
			window.setTimeout(function(){
				_self.resizeHeight();
			},100);
			
		},/*main-background*/
		addItem:function(divMain,divCtrl,data,i,background_flag){
				var main_i = document.createElement("div");
				var divCaption = document.createElement("div");
				var h2 = document.createElement("h2");
				var h3 = document.createElement("h3");
				var main_img = document.createElement("img");
				
				
				divCaption.className="caption";
				main_img.src = data.image;
				main_img.className="slider-picture";
				h2.innerHTML = data.title1;
				h3.innerHTML = data.title2;

				main_i.appendChild(divCaption);
				divCaption.appendChild(h2);
				divCaption.appendChild(h3);
				main_i.appendChild(main_img);
				divMain.appendChild(main_i);

				main_i.className="main-i";
				if(background_flag){
					main_i.className += " main-background";
				}else{
					if(i%2==0){
						main_i.className += " main_right";
					}
					var ctrl_i = document.createElement("a");
					var ctrl_img = document.createElement("img");
					ctrl_i.className="ctrl-i";
					ctrl_i.href="javascript:void(0)";
					ctrl_img.src = data.image;

					ctrl_i.appendChild(ctrl_img);
					divCtrl.appendChild(ctrl_i);
				}
			
		},
		resizeHeight:function(){
			var _self = this;
			var ls = _self.obj.find(".slider-picture");
			_self.obj.find(".slider-picture").each(function(i,value){
				this.style.marginTop = "-"+this.clientHeight/2 + 'px';
			});
		},
		change:function(i){
			var _self = this;
			_self.obj.find(".main-i_active").each(function(i){
				var src = $(this).find("img").eq(0).attr("src");
				_self.obj.find(".main-background img").eq(0).attr("src",src);
				$(this).removeClass("main-i_active");
			})
			_self.obj.find(".main-i").eq(i).addClass("main-i_active");


			_self.obj.find(".ctrl-i_active").each(function(i){
				$(this).removeClass("ctrl-i_active");
			})
			_self.obj.find(".ctrl-i").eq(i).addClass("ctrl-i_active");



		}
	}
	
	
	Slider.init = function(id,ls){
		return new Slider($("#"+id),ls);
	}
	
	window["Slider"] = Slider;
})(jQuery)