/*
 text-shadow for MSIE
 http://asamuzak.jp
 */
/* var ieShadowSettings = function() {
 return isMSIE ? [
 // ここ（return [];内）にtext-shadowを適用させるセレクタの配列を記述
 // セレクタ毎に「カンマ区切り」で配列を追加（カンマを忘れるとエラー発生）
 
 { sel : '#intro p', shadow : '3px 3px 12px #cccccc' },
 { sel : '#hot', shadow : '0 0 4px white, 0 -5px 4px #FFFF33, 2px -10px 6px #FFDD33, -2px -15px 11px #FF8800, 2px -25px 18px #FF2200' }
 ] : null;
 }; */


var textShadowForMSIE = new function (){
	var me = this;
	
	var sId = 0;
	
	me.ieShadowSettings = new Array();

	var isMSIE = /*@cc_on!@*/ false;
	var ieVersion = (function(reg){
	    return isMSIE && navigator.userAgent.match(reg) ? RegExp.$1 * 1 : null;
	})(/MSIE\s([0-9]+[\.0-9]*)/);
	
	function addEvent(target, type, listener){
	    target.addEventListener ? target.addEventListener(type, listener, false) : target.attachEvent ? target.attachEvent('on' + type, function(){
	        listener.call(target, window.event)
	    }) : target['on' + type] = function(e){
	        listener.call(target, e || window.event)
	    };
	}
	
	function getCompStyle(elm){
	    return isMSIE && (ieVersion == 7 || ieVersion == 8) ? elm.currentStyle : document.defaultView.getComputedStyle(elm, '');
	}
	
	function firstElementChild(node) {
		if (node.firstElementChild) {
			return node.firstElementChild;
		} else {
			var children = node.children;
			for (var i=0; i<children.length; i++) {
				if (children[i].nodeType == 1) {
					return children[i]
				}
			}
			return null;
		}
	}
	
	/*	absPath()
	 相対パスを絶対パスに変換	*/
	function absPath(oPath){
	    var elm = document.createElement('span');
	    elm.innerHTML = '<a href="' + oPath + '" />';
	    return elm.firstChild.href;
	}
	
	/*	getPrevSibling()
	 直前にある同一階層の要素を取得	*/
	function getPrevSibling(pElm){
	    return pElm.nodeType == 1 ? pElm : (pElm = pElm.previousSibling, pElm != null ? getPrevSibling(pElm) : null);
	}
	
	function getGeneralObj(pElm){
	    var arr = [];
	    for ((pElm = pElm.previousSibling) && pElm.nodeType == 1 && (arr[arr.length] = pElm); pElm != null;) {
	        (pElm = pElm.previousSibling) && pElm.nodeType == 1 && (arr[arr.length] = pElm);
	    }
	    return arr;
	}
	
	function getAncestObj(pElm){
	    var arr = [];
	    if (pElm = pElm.parentNode) {
	        for (arr[arr.length] = pElm; pElm.nodeName.toLowerCase() != "body";) {
	            (pElm = pElm.parentNode) && (arr[arr.length] = pElm);
	        }
	    }
	    return arr;
	}
	
	function convPercentTo256(cProf){
	    if (cProf.match(/(rgba?)\(\s*([0-9\.]+%?\s*,\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?)\s*(,\s*[01]?[\.0-9]*)?\s*\)/)) {
	        for (var cType = RegExp.$1, arr = RegExp.$2.split(/,/), aCh = (RegExp.$3 || ''), rgbArr = [], i = 0, l = arr.length; i < l; i++) {
	            arr[i].match(/([0-9\.]+)%/) && (arr[i] = Math.round(RegExp.$1 * 255 / 100));
	            rgbArr[rgbArr.length] = arr[i];
	        }
	        return cType + '(' + rgbArr.join(',') + aCh + ')';
	    }
	}
	
	
	
	/* Taken from http://blog.stchur.com/2006/09/20/converting-to-pixels-with-javascript/ */
	function toPixels (_str, _context)
	{
	  if (/px$/.test(_str)) { return parseInt(_str); }
	
	  var tmp = document.createElement('div');
	  tmp.style.visbility = 'hidden';
	  tmp.style.position = 'absolute';
	  tmp.style.lineHeight = '0';
	
	  if (/%$/.test(_str))
	  {
	    _context = _context.parentNode || _context;
	    tmp.style.height = _str;
	  }
	  else
	  {
	    tmp.style.borderStyle = 'solid';
	    tmp.style.borderBottomWidth = '0';
	    tmp.style.borderTopWidth = _str;
	  }
	
	  if (!_context) { _context = document.body; }
	
	  _context.appendChild(tmp);
	  var px = tmp.offsetHeight;
	  _context.removeChild(tmp);
	
	  return px ;
	};
	
	function convUnitToPx(sUnit, obj){
		
	    var getUnitRatio = function(sUnit){
	        var dId = cNum(), dBox = document.createElement('div');
	        dBox.id = 'dummyDiv' + dId;
	        dId++;
	        dBox.style.width = sUnit;
	        dBox.style.height = 0;
	        dBox.style.visibility = 'hidden';
	        var dBody = document.getElementsByTagName('body')[0];
	        dBody.appendChild(dBox);
	        var elm = document.getElementById(dBox.id), val = elm.getBoundingClientRect().right - elm.getBoundingClientRect().left;
	        dBody.removeChild(elm);
	        return val >= 0 ? val : val * -1;
	    };
        

        
        if (sUnit.match(/^0(em|ex|px|cm|mm|in|pt|pc)?$/)) {
        
            return 0;
            
        } else if (sUnit.match(/^(\-?[0-9\.]+)px$/)) {
        
            return RegExp.$1 * 1;
            
        } else if (sUnit.match(/^(\-?[0-9\.]+)(cm|mm|in|pt|pc)$/)) {
        
            return RegExp.$1 * 1 >= 0 ? getUnitRatio(sUnit) : getUnitRatio((RegExp.$1 * -1) + RegExp.$2) * -1;
            
        } else if (sUnit.match(/^(\-?[0-9\.]+)(em|ex)$/)) {
        
            var val = getUnitRatio(sUnit) / getUnitRatio('1' + RegExp.$2);
            
            var aArr = getAncestObj(obj), dRoot = document.getElementsByTagName('html')[0], fSize = [];
            
            aArr.unshift(obj);
            
            aArr[aArr.length] = dRoot;
            
            for (var i = 0, l = aArr.length; i < l; i++) {
            
                fSize[fSize.length] = getCompStyle(aArr[i]).fontSize;
                
            }
            
            for (i = 0, l = fSize.length; i < l; i++) {
            
                if (fSize[i].match(/^([0-9\.]+)%$/)) {
                
                    val *= (RegExp.$1 / 100);
                    
                } else if (fSize[i].match(/^([0-9\.]+)(em|ex)$/)) {
                
                    val *= (getUnitRatio(fSize[i]) / getUnitRatio('1' + RegExp.$2));
                    
                } else if (fSize[i].match(/^smaller$/)) {
                
                    val /= 1.2;
                    
                } else if (fSize[i].match(/^larger$/)) {
                
                    val *= 1.2;
                    
                } else if (fSize[i].match(/^([0-9\.]+)(px|cm|mm|in|pt|pc)$/)) {
                
                    val *= getUnitRatio(fSize[i]);
                    
                    break;
                    
                } else if (fSize[i].match(/^xx\-small$/)) {
                
                    val *= (getUnitRatio(getCompStyle(dRoot).fontSize) / 1.728);
                    
                    break;
                    
                } else if (fSize[i].match(/^x\-small$/)) {
                
                    val *= (getUnitRatio(getCompStyle(dRoot).fontSize) / 1.44);
                    
                    break;
                    
                } else if (fSize[i].match(/^small$/)) {
                
                    val *= (getUnitRatio(getCompStyle(dRoot).fontSize) / 1.2);
                    
                    break;
                    
                } else if (fSize[i].match(/^medium$/)) {
                
                    val *= getUnitRatio(getCompStyle(dRoot).fontSize);
                    
                    break;
                    
                } else if (fSize[i].match(/^large$/)) {
                
                    val *= (getUnitRatio(getCompStyle(dRoot).fontSize) * 1.2);
                    
                    break;
                    
                } else if (fSize[i].match(/^x\-large$/)) {
                
                    val *= (getUnitRatio(getCompStyle(dRoot).fontSize) * 1.44);
                    
                    break;
                    
                } else if (fSize[i].match(/^xx\-large$/)) {
                
                    val *= (getUnitRatio(getCompStyle(dRoot).fontSize) * 1.728);
                    
                    break;
                    
                } else if (fSize[i].match(/^([0-9\.]+)([a-z]+)/)) {
                
                    val *= getUnitRatio(fSize[i]);
                    
                    break;
                    
                } else {
                
                    break;
                    
                }
                
            }
            
            return Math.round(val);
            
        }
	}
	
	function removeDupFunc(fStr){
	    for (var arr = fStr.replace(/\s+/, '').split(/;/), fArr = [], bool, i = 0, l = arr.length; i < l; i++) {
	        bool = true;
	        for (var j = i; j < l; j++) {
	            i != j && arr[i] == arr[j] && (bool = false);
	        }
	        bool && arr[i] != '' && (fArr[fArr.length] = arr[i]);
	    }
	    return fArr.join(';') + ';';
	}
	
	var revArr = function(arr){
	    for (var rArr = [], i = 0, l = arr.length; i < l; i++) {
	        rArr.unshift(arr[i]);
	    }
	    return rArr;
	};
	
	var cNum = (function(n){
	    return function(){
	        return n++;
	    }
	})(0);
	
	me.showElm = function (eId){
	    eId.style.visibility = 'visible';
	}
	
	me.hideElm = function (eId){
	    eId.style.visibility = 'hidden';
	}
	
	
	
	
	
	
	
	
	
    var setShadow = function(tObj){
        var setShadowNodeColor = function(sSpan){
            for (var arr = sSpan.childNodes, i = 0, l = arr.length; i < l; i++) {
                if (arr[i].nodeType == 1) {
                    if (!arr[i].hasChildNodes()) {
                        arr[i].style.visibility = 'hidden';
                    }
                    else {
                        arr[i].style.color = sSpan.style.color;
                        setShadowNodeColor(arr[i]);
                    }
                }
            }
        };
        var hideAncestShadow = function(oElm, pElm){
            for (var arr = pElm.childNodes, i = 0, l = arr.length; i < l; i++) {
                if (arr[i].hasChildNodes()) {
                    if (arr[i].nodeName.toLowerCase() == oElm.tagName.toLowerCase() && arr[i].firstChild == oElm.firstChild) {
                        arr[i].style.visibility = 'hidden';
                    }
                    else {
                        hideAncestShadow(oElm, arr[i]);
                    }
                }
            }
        };
        var boolShadowChild = function(elm){
            for (var bool = true, arr = getAncestObj(elm), i = 0, l = arr.length; i < l; i++) {
                if (arr[i].tagName.toLowerCase() == 'span' && arr[i].className.match(/dummyShadow/)) {
                    bool = false;
                    break;
                }
            }
            return bool;
        };
        if (tObj.shadow != 'invalid') {
            for (var arr = [], nArr = tObj.elm.childNodes, bool = false, i = 0, l = nArr.length; i < l; i++) {
                if (nArr[i].nodeName.toLowerCase() == 'span' && nArr[i].className.match(/dummyShadow/)) {
                    nArr[i].className.match(/hasImp/) && (bool = true);
                    arr[arr.length] = nArr[i].id;
                }
            }
            if (bool == false || tObj.hasImp == true) {
                var mOver = tObj.elm.getAttribute('onmouseover') || '';
                var mOut = tObj.elm.getAttribute('onmouseout') || '';
                mOver != '' && !mOver.match(/;$/) && (mOver += ';');
                mOut != '' && !mOut.match(/;$/) && (mOut += ';');
                for (i = 0, l = arr.length; i < l; i++) {
                    if (tObj.ePseudo == 'hover' && tObj.shadow == 'none') {
                        mOver += 'textShadowForMSIE.hideElm(' + arr[i] + ');';
                        mOut += 'textShadowForMSIE.showElm(' + arr[i] + ');';
                    }
                    else 
                        if (!(tObj.ePseudo == 'hover' && tObj.shadow != 'none')) {
                            tObj.elm.removeChild(document.getElementById(arr[i]));
                        }
                }
                tObj.ePseudo == 'hover' && tObj.shadow == 'none' && (tObj.elm.setAttribute('onmouseover', mOver), tObj.elm.setAttribute('onmouseout', mOut));
                for (var aBg, aArr = getAncestObj(tObj.elm), i = 0, l = aArr.length; i < l; i++) {
                    aBg == null && (getCompStyle(aArr[i]).backgroundColor != 'transparent' || getCompStyle(aArr[i]).backgroundImage != 'none') && (aBg = aArr[i]);
                    for (var cArr = aArr[i].childNodes, j = 0, k = cArr.length; j < k; j++) {
                        cArr[j].nodeType == 1 && cArr[j].nodeName.toLowerCase() == 'span' && cArr[j].className.match(/dummyShadow/) && hideAncestShadow(tObj.elm, document.getElementById(cArr[j].id));
                    }
                }
                tObj.shadow != 'none' && tObj.shadow.length > 1 && (getCompStyle(tObj.elm).backgroundColor != 'transparent' || getCompStyle(tObj.elm).backgroundImage != 'none') && (tObj.shadow = revArr(tObj.shadow));
                if (tObj.shadow == 'none' && tObj.ePseudo != 'hover') {
                    for (var arr = tObj.elm.parentNode.childNodes, i = 0, l = arr.length; i < l; i++) {
                        if (arr[i].nodeName.toLowerCase() == 'span' && arr[i].className == 'dummyShadow') {
                            getCompStyle(tObj.elm).position == 'relative' ? tObj.elm.style.position = 'static' : getCompStyle(tObj.elm).position;
                            getCompStyle(tObj.elm).display == 'inline-block' ? tObj.elm.style.display = 'inline' : getCompStyle(tObj.elm).display;
                            break;
                        }
                    }
                }
                if (tObj.shadow != 'none' && nArr.length != 0 && boolShadowChild(tObj.elm)) {
                    for (var hArr = [], clNode = tObj.elm.cloneNode(true), clArr = clNode.childNodes, i = 0, l = clArr.length; i < l; i++) {
                        clArr[i] != null && clArr[i].hasChildNodes() && clArr[i].nodeName.toLowerCase() == 'span' && clArr[i].className.match(/dummyShadow/) && (hArr[hArr.length] = clArr[i].id, clNode.removeChild(clArr[i]));
                    }
                    var sNode = clNode.innerHTML;
                    ieVersion == 9 && (sNode = sNode.replace(/\n/, ' '));
                    ieVersion == 8 && (tObj.elm.innerHTML = tObj.elm.innerHTML);
                    var zIndexPlace = -1;
                    for (i = 0, l = tObj.shadow.length; i < l; i++) {
                    	
                        var pxRad = convUnitToPx(tObj.shadow[i].z, tObj.elm);
                        
                        var xPos = convUnitToPx(tObj.shadow[i].x, tObj.elm) - pxRad + convUnitToPx(getCompStyle(tObj.elm).paddingLeft, tObj.elm) - convUnitToPx(getCompStyle(tObj.elm).borderTopLeftRadius, tObj.elm)/2;
                        var yPos = convUnitToPx(tObj.shadow[i].y, tObj.elm) - pxRad + convUnitToPx(getCompStyle(tObj.elm).paddingTop, tObj.elm) ;
                        /* if (ieVersion == 7 && pxRad == 0) {
                            xPos >= 0 && (xPos -= 1);
                            yPos >= 0 && (yPos -= 1);
                        } */
						
                        var sColor = tObj.shadow[i].cProf || getCompStyle(tObj.elm).color;
                        var sOpacity = 1; // デフォルトの透過度
                        tObj.shadow[i].cProf != null && tObj.shadow[i].cProf.match(/rgba\(\s*([0-9]+\s*,\s*[0-9]+\s*,\s*[0-9]+)\s*,\s*([01]?[\.0-9]*)\)/) && (sColor = 'rgb(' + RegExp.$1 + ')', sOpacity = (RegExp.$2 * 1));
                        var sBox = document.createElement('span');
                        sBox.id = 'dummyShadow' + sId;
                        sId++;
                        sBox.className = tObj.hasImp == true ? 'dummyShadow hasImp' : 'dummyShadow';
                        sBox.style.display = 'block';
                        sBox.style.position = 'absolute';
                        sBox.style.left = xPos + 'px';
                        sBox.style.top = yPos + 'px';
                        sBox.style.width = '100%';
						
                        
                        sBox.style.color = sColor;
                        //sBox.style.zoom = '100%';
                        
                        var background = DOMHelpers.getDatasetItem(tObj.elm, 'cssSandpaper-chroma');
                        
                        if (!background) {
                            background = "#808080";
                        }
                        
                        sBox.style.backgroundColor = background;
                        
                        sBox.style.filter = 'progid:DXImageTransform.Microsoft.Chroma(color=' + background + '), progid:DXImageTransform.Microsoft.Blur(PixelRadius=' + pxRad + ', MakeShadow=false, ShadowOpacity=' + sOpacity + ')';
                        sBox.style.zIndex = -(i + 1);
                        sBox.innerHTML = sNode;
                        if (getCompStyle(tObj.elm).display == 'inline') {
                            tObj.elm.style.display = 'inline-block';
                        }
                        if (!(getCompStyle(tObj.elm).position == 'absolute' || getCompStyle(tObj.elm).position == 'fixed')) {
                            tObj.elm.style.position = 'relative';
                            ieVersion == 7 && (tObj.elm.nodeName != 'TD' && tObj.elm.nodeName != 'TH' )  && (tObj.elm.style.top = getCompStyle(tObj.elm).paddingTop );
                        }
                        if (getCompStyle(tObj.elm).backgroundColor != 'transparent' || getCompStyle(tObj.elm).backgroundImage != 'none') {
                            getCompStyle(tObj.elm).zIndex != ('auto' || null) ? (sBox.style.zIndex = tObj.elm.style.zIndex) : (tObj.elm.style.zIndex = sBox.style.zIndex = -1);
                        }
                        if (aBg && aBg.tagName.toLowerCase() != 'body') {
                            tObj.elm.style.zIndex = 1;
                            sBox.style.zIndex = zIndexPlace;
							var bgColor = tObj.elm.currentStyle.backgroundColor;
							if (ieVersion > 7 || bgColor == 'transparent') {
								zIndexPlace--;
							}
                        }
                        tObj.elm.appendChild(sBox);
                        if (tObj.ePseudo == 'hover') {
                            sBox.style.visibility = 'hidden';
                            mOver = tObj.elm.getAttribute('onmouseover') || '';
                            mOut = tObj.elm.getAttribute('onmouseout') || '';
                            mOver != '' && !mOver.match(/;$/) && (mOver += ';');
                            mOut != '' && !mOut.match(/;$/) && (mOut += ';');
                            mOver += ('textShadowForMSIE.showElm(' + sBox.id + ');');
                            mOut += ('textShadowForMSIE.hideElm(' + sBox.id + ');');
                            if (hArr.length > 0) {
                                for (j = 0, k = hArr.length; j < k; j++) {
                                    var hElm = document.getElementById(hArr[j]);
                                    if (hElm) {
                                        mOver += ('textShadowForMSIE.hideElm(' + hElm.id + ');');
                                        mOut += ('textShadowForMSIE.showElm(' + hElm.id + ');');
                                    }
                                }
                            }
                            tObj.elm.setAttribute('onmouseover', removeDupFunc(mOver));
                            tObj.elm.setAttribute('onmouseout', removeDupFunc(mOut));
                        }
                    }
                    for (var sSpan = document.getElementsByTagName('span'), i = 0, l = sSpan.length; i < l; i++) {
                        sSpan[i].className.match(/dummyShadow/) && setShadowNodeColor(sSpan[i]);
                    }
                }
            }
        }
    };
    var getTargetObj = function(sObj){
        var getObjType = function(oElm){
			if (!oElm) {
				return null;
			} else {
				return oElm.id != null ? document.getElementById(oElm.id) : document.getElementsByTagName(oElm.elm);
			}
        };
        var compareObj = function(rObj, cObj){
            return ((rObj.id != null && cObj.id != null && rObj.id == cObj.id) || rObj.id == null || cObj.id == null) &&
            (rObj.elm == cObj.tagName.toLowerCase() || rObj.elm == '*') &&
            ((rObj.eClass != null && cObj.className != null && rObj.eClass == cObj.className) || rObj.eClass == null) ? true : false;
        };
        var elm = getObjType(sObj.tElm);
        var tObj = {
            elm: null,
            ePseudo: sObj.tElm?sObj.tElm.ePseudo:null,
            shadow: sObj.sVal,
            hasImp: sObj.sImp
        };
		
		for (var i = 0, l = sObj.elm.length; i < l; i++) {
            tObj.elm = sObj.elm[i];
            setShadow(tObj);
        }
       

		
    };
    var getShadowValue = function(shadow){
        if (shadow.match(/none/)) {
            return 'none';
        }
        else {
            for (var val = [], arr = shadow.match(/((rgba?\(\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?\s*(,\s*[01]?[\.0-9]*\s*)?\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)\s)?(\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?\s*){2,3}(rgba?\(\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?\s*(,\s*[01]?[\.0-9]*\s*)?\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)?/g), i = 0, l = arr.length; i < l; i++) {
                val[i] = {
                    x: '0',
                    y: '0',
                    z: '0',
                    cProf: null
                };
                var uArr = arr[i].match(/\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?\s+\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?(\s+[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?)?/);
                if (uArr = uArr[0].split(/\s+/), uArr[0].match(/^(\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?)$/) && uArr[1].match(/^(\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?)$/)) {
                    uArr.length >= 2 && (val[i].x = uArr[0], val[i].y = uArr[1]);
                    uArr.length == 3 && uArr[2].match(/^([0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?)$/) && (val[i].z = uArr[2]);
                    arr[i].match(/%/) && (arr[i] = convPercentTo256(arr[i]));
                    arr[i].match(/^(rgba?\(\s*[0-9]+\s*,\s*[0-9]+\s*,\s*[0-9]+\s*(,\s*[01]?[\.0-9]*\s*)?\)|[a-zA-Z]+)/) ? (val[i].cProf = RegExp.$1) : arr[i].match(/\s(rgba?\(\s*[0-9]+\s*,\s*[0-9]+\s*,\s*[0-9]+\s*(,\s*[01]?[\.0-9]*\s*)?\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)$/) && (val[i].cProf = RegExp.$1);
                }
                else {
                    val = 'invalid';
                    break;
                }
            }
            return val;
        }
    };
    var getSelectorObj = function(sel){
        if (sel != null) {
            var obj = {
                elm: '*',
                id: null,
                eClass: null,
                ePseudo: null
            };
            sel.match(/^([a-zA-Z\*]{1}[a-zA-Z0-9]*)/) && (obj.elm = RegExp.$1);
            sel.match(/#([a-zA-Z_]{1}[a-zA-Z0-9_\-]*)/) && (obj.id = RegExp.$1);
            sel.match(/\.([a-zA-Z_]{1}[a-zA-Z0-9_\-]*)/) && (obj.eClass = RegExp.$1);
            sel.match(/:([a-z]{1}[a-z0-9\(\)\-]+)/) && (obj.ePseudo = RegExp.$1);
            return obj;
        }
        if (sel == null) {
            return null;
        }
    };
   
    
    me.init = function(){
		for (var arr = me.ieShadowSettings, sId = cNum(), i = 0, l = arr.length; i < l; i++) {
			for (var sSel = arr[i].sel.split(/,/), sReg = /^\s*([a-zA-Z0-9#\.:_\-\s>\+~]+)\s*$/, j = 0, k = sSel.length; j < k; j++) {
				sSel[j].match(sReg) && (sSel[j] = RegExp.$1);
				
				var sObj = {
					type: null,
					tElm: null,
					rElm: null,
					sVal: null,
					sImp: null
				};
				if (document.querySelectorAll) {
					sObj.elm = document.querySelectorAll(sSel[j].trim())
				} else {
					sObj.elm = cssQuery(sSel[j].trim())
				}
				sObj.sVal = getShadowValue(arr[i].shadow);
				sObj.sImp = arr[i].shadow.match(/important/) ? true : false;
				
				
				
				if (sObj.elm.length > 0) {
					getTargetObj(sObj);
				}
				
			}
		}
	}
}

//addEvent(window, 'load', function() { ieVersion >= 7 && ieVersion <= 9 && textShadowForMSIE(); });
