var ContextMenu = (function(){
	let contexts = {};
	let contextShown = false;
	let cb = null;
	
	var _init = function(){
		document.addEventListener('contextmenu',(e) => {
			createContext( (e.target && e.target.dataset.context) ? e.target.dataset.context : false);

			contextShown = true;
			document.getElementById("rmenu").className = "rmenu show";  
			document.getElementById("rmenu").style.top =  mouseY(event) + 'px';
			document.getElementById("rmenu").style.left = mouseX(event) + 'px';

			window.event.returnValue = false;
			e.preventDefault();
		}, false);

		document.addEventListener('click', (e) => {
			if(contextShown){
				contextShown = false;
			document.getElementById("rmenu").className = "rmenu hide";  
			}
		});

		document.getElementById('rmenu').addEventListener('click', (e) => {
			var el = null;

			if(e.target && e.target.nodeName == "LI") {
				el = e.target.children[0];
			}else if(e.target && e.target.nodeName == "SPAN"){
				el = e.target
			}
			if(el != null){
				if(cb) cb(el.dataset.url);
				else console.log("No Action Callback: " + el.dataset.url);
			}
		});
	};
	
	
	function createContext(ctx){
		if(contexts[ctx]){
			document.getElementById('rmenu').innerHTML = contexts[ctx];
		}else{
			document.getElementById('rmenu').innerHTML = contexts['_']
		}
	}

	function mouseX(evt) {
		if (evt.pageX) {
			return evt.pageX;
		} else if (evt.clientX) {
		   return evt.clientX + (document.documentElement.scrollLeft ?
			   document.documentElement.scrollLeft :
			   document.body.scrollLeft);
		} else {
			return null;
		}
	}

	function mouseY(evt) {
		if (evt.pageY) {
			return evt.pageY;
		} else if (evt.clientY) {
		   return evt.clientY + (document.documentElement.scrollTop ?
		   document.documentElement.scrollTop :
		   document.body.scrollTop);
		} else {
			return null;
		}
	}
	
	var addContext = function(name, ctx){
		var html = '<ul>';
		for(var c in ctx){
			html += '<li><span data-url="' + ctx[c].url + '">' + ctx[c].name + '</span></li>';
		}
		contexts[name] = html + "</ul>";
	}
	
	var defaultContext = function(ctx){
		var html = '<ul>';
		for(var c in ctx){
			html += '<li><span data-url="' + ctx[c].url + '">' + ctx[c].name + '</span></li>';
		}
		contexts['_'] = html + "</ul>";
	}
	
	var setAction = function(funct){
		cb = funct;
	}
	
	_init();
	return {
		addContext : addContext,
		defaultContext : defaultContext,
		setAction : setAction
	}
	
	
})();
