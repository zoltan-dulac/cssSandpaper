var countdown = new function () {
	var me = this;
	
	var countdownNode;
	var angle = 0;
	
	me.init = function () {
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}
		
		countdownNode = document.getElementById('countdown');
		
		me.startCountdown(10);
	}
	
	me.startCountdown = function (num) {
		if (num >= 0) {
		
			countdownNode.innerHTML = num;
			
			me.fadeDiv(20);
		}
	}
	
	me.fadeDiv = function (n) {
		if (n >= 0) {
			angle += 5;
			cssSandpaper.setTransform(countdownNode, 
				StringHelpers.sprintf('scale(%f) rotate(%fdeg)', (21-n)/20, angle));
			cssSandpaper.setOpacity(countdownNode, n/10);
			
			setTimeout('countdown.fadeDiv(' + (n-1) + ")", 40);
		} else {
			var count = parseInt(countdownNode.innerHTML);
			me.startCountdown(count-1)
		}
	}
}


EventHelpers.addPageLoadEvent('countdown.init')