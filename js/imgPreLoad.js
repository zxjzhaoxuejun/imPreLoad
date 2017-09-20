/**
 * 图片预加载
 * 2017-09-20
 */

(function($) {
	//构造函数
	function PreLoad(imgs, options) {
		this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
		this.opts = $.extend({}, PreLoad.DEFAULTS, options);
		
		if(this.opts.order==='ordered'){
			this._ordered();
		}else{
			this._unoredered();
		}

	}

	PreLoad.DEFAULTS = {
		order:'unordered',//默认无序加载，ordered
		each: null, //每一张图片加载完毕后执行
		all: null //所有图片加载完毕后执行
	};
	
	PreLoad.prototype._ordered=function(){//有序加载
		var imgs=this.imgs,
			opts = this.opts,
			count = 0,
			len = imgs.length;
			    load();
				//调用图片有序加载
				function load(){
					var imgObj=new Image();
					$(imgObj).on('load error',function(){
						opts.each&&opts.each(count);
						if(count>=len){//所有图片加载完毕
							opts.all&&opts.all();
						}else{//如果有没有加载完成的重新加载
							load();
						}
						count++;
					});

					imgObj.src=imgs[count];
				}
			
	}

	PreLoad.prototype._unoredered = function() { //无序加载
		var imgs=this.imgs,
			opts = this.opts,
			count = 0,
			len = imgs.length;
			$.each(imgs,function(i,src){
				   if(typeof src !='string') return;
					var imgObj=new Image();//new Images对象事件
					//如果触发事件后加载完成为load事件，或者;错误事件error
					$(imgObj).on('load error',function(){//不管链接是否 每次都加载
						opts.each&&opts.each(count);
						
						if(count>=len-1){//判断所有图片是否都加载完成
							opts.all&&opts.all();
						}
						count++;
					});
					
					imgObj.src=src;
				})

	}

	/*
	 * 利用jquery创建插件的两种方式，和调用形式
	 *1.jQuery.extend(object);为扩展jQuery类本身.为类添加新的方法。 调用：$.preload();
	 *2.jQuery.fn.extend(object);给jQuery对象添加方法。调用：$('.class').preload();
	 *jQuery.fn.extend = jQuery.prototype.extend 
	 */
	$.extend({
		preload:function(imgs,opts){
			new PreLoad(imgs,opts);
		}
	});
	

})(jQuery)