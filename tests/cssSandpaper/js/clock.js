var clock = new function () {
	var me = this;
	var secHand, minHand, hrHand;
	me.init = function () {
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}
		
		
		secHand = document.getElementById('sec');
		minHand = document.getElementById('min');
		hrHand = document.getElementById('hour')
		
		tick(); 
		setInterval(tick, 1000 );
     
        
	}
	
	function tick() {
		var mins = new Date().getMinutes();
		var mdegree = mins * 6;
		var mrotate = "rotate(" + mdegree + "deg)";
		cssSandpaper.setTransform(minHand, mrotate);
		
		var hours = new Date().getHours();
		var mins = new Date().getMinutes();
		var hdegree = hours * 30 + (mins / 2);
		var hrotate = "rotate(" + hdegree + "deg)";
		cssSandpaper.setTransform(hrHand, hrotate);
		
		var seconds = new Date().getSeconds();
		var sdegree = seconds * 6;
		var srotate = "rotate(" + sdegree + "deg)";
		
		cssSandpaper.setTransform(secHand, srotate);
	}
	
}


EventHelpers.addPageLoadEvent('clock.init')