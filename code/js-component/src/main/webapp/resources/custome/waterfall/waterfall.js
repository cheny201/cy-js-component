/**
 * 缺点：
 * 	数据不能都用Waterfall去加载，必须要有初始数据
 */

;(function($){
	var Waterfall = function(id,options){
		this.cols = 0;
		this.obj = $("#"+id);
		this.id = id;
		this.itemW = 0;
		this.itemHArray=[];
		
		if(options == null){
			options = {};
		}
		this.options = {
			dataSet:[],
			width:168,
			borderWidth:1,
			itemPadding:15,
			boxPadding:10,
			loadData:null
		}
		$.extend(this.options,options);
		
		this.init();
		this.bindEvent();
		this.reflush();
	}
	
	Waterfall.prototype = {
			
		init:function(){
			var itemW = this.obj.children().first().outerWidth();
			this.itemW = itemW;
			this.cols = Math.floor($(window).width()/itemW);
			this.obj.addClass("waterfall-content");
			this.obj.css({
				width:this.cols * itemW,
				margin:"0 auto"
			});
		},
		
		renderDOM:function(dataLs){
			for (var i = 0; i < dataLs.length; i++) {
				var data = dataLs[i];
				var item = $("<div>").addClass("waterfall-item").appendTo(this.obj);
				var box = $("<div>").addClass("waterfall-box").appendTo(item);
				var img = $("<img>").attr("src",data.src).appendTo(box);
			}
		},
		
		bindEvent:function(){
			var self = this;
			$(window).on("scroll",function(){
				if(self.checkscrollside()){
					self.options.loadData();
				}
			});
		},
		
		
		reflush:function(){
			var self = this;
			var items = this.obj.find(".waterfall-item");
			items.each(function(i){
				var h = this.offsetHeight;
				if(i < self.cols){
					self.itemHArray[i]=h;
				}else{
					var minH = Math.min.apply(null, self.itemHArray);
					var minHIndex = $.inArray( minH, self.itemHArray );
					var left = items.eq(minHIndex).position().left;
					var left = (self.itemW * minHIndex) + "px";
					
					$(this).css({
						position: "absolute",
						left:left,
						top:minH+15
					});
					self.itemHArray[minHIndex] += items.eq(i).outerHeight();
				}
				
			});
		},
		
		checkscrollside:function(){
			var lastBox = this.obj.find(".waterfall-item").last();
			var lastPinH = lastBox.offset().top + Math.floor(lastBox.outerHeight()/2);
			var scrollTop = $(window).scrollTop() + $(window).height();
			return lastPinH < scrollTop ? true:false;
		}
		
	}
	Waterfall.init = function(id,opt){
		return new Waterfall(id,opt);
	}
	window["Waterfall"] = Waterfall;
})(jQuery)
