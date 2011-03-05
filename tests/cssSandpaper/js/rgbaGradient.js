var gradient = new function () {
	var me = this;
	
	var countdownNode;
	var angle = 0;
	
	me.init = function () {
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}
		
		skyNode = document.getElementById('sky');
		
		me.animateWarning(255, -6);
	}
	
	
	
	me.animateWarning = function (n, step) {
		if ((step < 0 && n >= 0) || (step >0 && n <= 255)) {
			var grad = StringHelpers.sprintf('-sand-gradient(linear, center top, center bottom, from(rgba(0, 0, %d, %f)), to(rgba(0, 0, %d, %f)));', n,  (255-n)/255, n , n/255);
			
			cssSandpaper.setGradient(skyNode, grad);
			
			setTimeout('gradient.animateWarning(' + (n+  step) + ', ' + step + ')', 30);
		} else {
			setTimeout('gradient.animateWarning(' + (n - step) + ', ' + -step + ')', 30);
		}
	}
}


EventHelpers.addPageLoadEvent('gradient.init')