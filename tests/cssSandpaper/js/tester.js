var tester = new function () {
	var me = this;
	var testInputs;
	
	var transformElements;
	
	me.init = function () {
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}
		
		testInputs = cssQuery('.testInput');
		transformElements = cssQuery("[data-property='setTransform']");
		
		for (var i=0; i<testInputs.length; i++) {
			EventHelpers.addEvent(testInputs[i], 'change', inputChangeEvent)
		} 
		
	}
	
	function inputChangeEvent(e) {
		evalStr = StringHelpers.sprintf(
			'cssSandpaper.%s(document.getElementById("testSubject"), "%s")', 
				DOMHelpers.getAttributeValue(this, 'data-property'),
				grabAllTransforms()
		);
		//jslog.debug(evalStr)
		eval(evalStr);
	}
	
	function grabAllTransforms() {
		var sb = new StringBuffer();
		
		for (var i=0; i<transformElements.length; i++) {
			var el = transformElements[i];
			var funcName = DOMHelpers.getAttributeValue(el, 'data-function');
			var unit = DOMHelpers.getAttributeValue(el, 'data-unit');
			
			sb.append(
				StringHelpers.sprintf("%s(%s%s) ", funcName, el.value, unit )
			);
		}
		
		return sb.toString();
	}
	
}


EventHelpers.addPageLoadEvent('tester.init')