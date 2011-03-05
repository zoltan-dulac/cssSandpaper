var gradient = new function () {
	var me = this;
	
	var countdownNode;
	var angle = 0;
	
	me.init = function () {
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}
		
		skyNode = document.getElementById('sky');
		
		me.animateWarning(255, -2);
	}
	
	
	
	me.animateWarning = function (n, step) {
		if ((step < 0 && n >= 0) || (step >0 && n <= 255)) {
			var grad = StringHelpers.sprintf('-sand-gradient(linear, center top, center bottom, from(#0000%02x), to(#%02x0000));', n, n - 255, n);
					
			cssSandpaper.setGradient(skyNode, grad);
			//cssSandpaper.setTransform(skyNode, StringHelpers.sprintf('rotate(%ddeg)', n))

			setTimeout('gradient.animateWarning(' + (n+  step) + ', ' + step + ')', 30);
		} else {
			setTimeout('gradient.animateWarning(' + (n - step) + ', ' + -step + ')', 30);
		}
	}
}


EventHelpers.addPageLoadEvent('gradient.init')