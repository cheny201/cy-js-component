;(function($){
	var Slider = function(obj,ls){
		this.render();
	}
	
	
	Slider.prototype={
		init:function(){
			
		},
		bindEvent:function(){
			
		},
		render:function(){
			
		},
		change:function(){
			
		}
	}
	
	
	Slider.init = function(id,ls){
		return new Slider($("#"+id),ls);
	}
	
	window["Slider"] = Slider;
})(jQuery)