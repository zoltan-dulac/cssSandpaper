var italics = new function () {
	var me = this;
	
	var wordRegexes = [/^([a-z]+)\s/g, /\s([a-z]+)$/g, /\s([a-z]+)\s/g];
	var replaceStrings = ['<span class="italics-fix">$1</span> ', 
		' <span class="italics-fix">$1</span>',
		' <span class="italics-fix">$1</span> ']; 
	
	me.init = function () {
		if (EventHelpers.hasPageLoadHappened(arguments)) {
			return;
		}
		
		fix();
		
		
	}
	
	function fix () {
		var emNodes = document.querySelectorAll('em, i');
		
		/*
		 * 
h1 em, p em {
	font-style: normal;
	-sand-transform: skew(-10deg, 0deg);
	position: relative;
	display: inline-block;
	top: 0em;
	background: white; 
}
		 */
		for (var i=0; i<emNodes.length; i++) {
			var node = emNodes[i];
			var html = node.innerHTML;
			for (var j=0; j<wordRegexes.length; j++) {
				html = html.replace(wordRegexes[j], replaceStrings[j]);
			}
			
			node.innerHTML = html;
		}
	}
	
}


EventHelpers.addPageLoadEvent('italics.init');