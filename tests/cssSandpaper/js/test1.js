var test1 = new function () {
	var me = this;
	
	var testSubject;
	
	me.init = function () {
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}
		testSubject = document.getElementById('testSubject');
		
		doRotationTest();
	
		
	}
	
	function doRotationTest(){
		
			me.doRotationTestTimeout(-10, 1)
		
	
	}
	
	me.doRotationTestTimeout = function(deg, step) {
		if ( (step > 0 && deg <= 10) || (step < 0 && deg >= -10))  {
			cssSandpaper.setTransform(testSubject, 
				StringHelpers.sprintf('skew(%ddeg) rotate(%ddeg)', deg, deg*2));
			setTimeout(
				StringHelpers.sprintf("test1.doRotationTestTimeout(%d, %d)", deg + step, step),
				10
			);
		} else {
			me.doRotationTestTimeout(deg, -step);
		}
	}
	
}


EventHelpers.addPageLoadEvent('test1.init')