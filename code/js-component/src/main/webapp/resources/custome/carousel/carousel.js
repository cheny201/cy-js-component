/**
 * 旋转木马幻灯片
 */
;(function($){
	var Carousel = function(obj,options){
		var self = this;
		this._obj_ = obj;
		this._ul_ = null;
		this._left_ = null;
		this._right_ = null;
		this._first_item_ = null;
		this._last_item_ = null;
		this._items_ = null;
		this._rotate_flag = true;
		this.timer = null;
		this.options = {
			width:800,//显示区域宽度
			height:270,//显示区域高度
			scale:0.9,//缩小比例
			posterWidth:640,//图片宽度
			verticalAlign:'middle',//对其方式
			posterList:[],//图片参数
			speed:500,//切换速度
			autoPlay:false,//是否自动播放
			delay:3000//自动播放延时
		}
		$.extend(this.options,options);
		this.initDOM();
		this.initSize();
		this.bindEvent();
		if(this.options.autoPlay){
			this.autoPlay();
			this._obj_.hover(function(){
				window.clearInterval(self.timer);
			},function(){
				self.autoPlay();
			})
		}
	}
	
	Carousel.prototype = {
		getOptions : function(){
			var setting = this._obj_.attr("data-setting");
			if(setting && setting != ""){
				return $.parseJSON(setting);
			}else{
				return {};
			}
		},
		
		//创建DOM元素
		initDOM:function(){
			var btnLeft = document.createElement("div");
			btnLeft.className="xzmm-btn btn-left";
			
			var btnRight = document.createElement("div");
			btnRight.className="xzmm-btn btn-right";
			
			var ul = document.createElement("ul");
			ul.className="xzmm-list";
			
			for (var i = 0; i < this.options.posterList.length; i++) {
				var li = document.createElement("li");
				var a = document.createElement("a");
				var img = document.createElement("img");
				li.className="xzmm-item";
				a.href=this.options.posterList[i].a.href;
				img.src=this.options.posterList[i].img.src;
				img.style.width = "100%";
				a.appendChild(img);
				li.appendChild(a);
				ul.appendChild(li);
			}
			this._obj_.empty();
			this._obj_.addClass("xzmm-content");
			this._obj_.append(btnLeft);
			this._obj_.append(ul);
			this._obj_.append(btnRight);
			
			this._ul_ = this._obj_.find("ul.xzmm-list");
			this._left_ = this._obj_.find("div.btn-left");
			this._right_ = this._obj_.find("div.btn-right");
			this._items_ = this._obj_.find("li.xzmm-item");
			this._first_item_ = this._items_.first();
			this._last_item_ = this._items_.last();
		},
		
		//设置左右按钮和第一张图片的大小和zIndex值
		initSize:function(){
			this._obj_.css("width",this.options.width);
			this._obj_.css("height",this.options.height);
			
			this._ul_.css("width",this.options.width);
			this._ul_.css("height",this.options.height);
			
			var btnZIndex = Math.ceil(this.options.posterList.length/2);
			var w = (this.options.width-this.options.posterWidth)/2;
			this._left_.css({
				width:w,
				height:this.options.height,
				zIndex:btnZIndex
			});
			this._right_.css({
				width:w,
				height:this.options.height,
				zIndex:btnZIndex
			});
			this._first_item_.css({left:w,zIndex:btnZIndex});
			
			this.initOther();
		},
		
		initOther:function(){
			var self = this;
			var otherItems = this._items_.slice(1);
			var leftItems = otherItems.slice(Math.ceil(otherItems.size()/2));
			var rightItems = otherItems.slice(0,Math.ceil(otherItems.size()/2));
			var level = Math.ceil(this.options.posterList.length/2);
			var btnWidth = (this.options.width-this.options.posterWidth)/2;
			var posterWidth = this.options.posterWidth;
			
			var gap = btnWidth/(level-1);
			
			var scale = this.options.scale;
			var itemH = this.options.height;
			var itemW = this.options.posterWidth;
			var itemZIndex = level;
			rightItems.each(function(i){
				itemZIndex--;
				itemH = scale * itemH;
				itemW = scale * itemW;
				
				$(this).css({
					left:posterWidth + btnWidth+(i+1)*gap-itemW,
					zIndex:itemZIndex,
					opacity:1/(++i),
					height:itemH,
					width:itemW,
					top:self.getTop(itemH)
				});
			});
			
			var oloop = level;
			leftItems.each(function(i){
				$(this).css({
					left:i*gap,
					zIndex:itemZIndex,
					opacity:1/--oloop,
					height:itemH,
					width:itemW,
					top:self.getTop(itemH)
				});
				itemH = itemH/scale;
				itemW = itemW/scale;
				itemZIndex++;
			});
		},
		
		getTop:function(height){
			var itemT = 0;
			if(this.options.verticalAlign == 'middle'){
				itemT = (this.options.height - height)/2;
			}else if(this.options.verticalAlign == 'bottom'){
				itemT = this.options.height - height;
			}else if(this.options.verticalAlign == 'top'){
				itemT = 0;
			}else{
				itemT = (this.options.height - height)/2;
			}
			return itemT;
		},
		
		bindEvent:function(){
			var self = this;
			this._left_.click(function(){
				if(self._rotate_flag){
					self._rotate_flag = false;
					self.rotate("left");
				}
			});
			this._right_.click(function(){
				if(self._rotate_flag){
					self._rotate_flag = false;
					self.rotate("right");
				}
			});
		},
		
		rotate:function(direction){
			var self = this;
			var zIndexLs = [];
			if(direction === "left"){
				this._items_.each(function(){
					var prev = $(this).prev().get(0)?$(this).prev():self._last_item_,
						width = prev.width(),
						height = prev.height(),
						zIndex = prev.css("zIndex"),
						left = prev.css("left"),
						opacity = prev.css("opacity"),
						top = prev.css("top");
					zIndexLs.push(zIndex);
					$(this).animate({
						width:width,
						height:height,
						left:left,
						opacity:opacity,
						top:top
					},self.options.speed,null,function(){
						self._rotate_flag = true;
					});
				});
			}else if(direction === "right"){
				this._items_.each(function(){
					var next = $(this).next().get(0)?$(this).next():self._first_item_,
						width = next.width(),
						height = next.height(),
						zIndex = next.css("zIndex"),
						left = next.css("left"),
						opacity = next.css("opacity"),
						top = next.css("top");
					zIndexLs.push(zIndex);
					$(this).animate({
						width:width,
						height:height,
						left:left,
						opacity:opacity,
						top:top
					},self.options.speed,null,function(){
						self._rotate_flag = true;
					});
				});
			}
			
			this._items_.each(function(i){
				$(this).css("z-Index",zIndexLs[i]);
			});
		},
		autoPlay:function(){
			var self = this;
			this.timer = window.setInterval(function(){
				self._right_.click();
			},this.options.delay);
		}
	}
	Carousel.init = function(id,options){
		return new Carousel($("#"+id),options);
	}
	
	window["Carousel"] = Carousel;
})(jQuery)
