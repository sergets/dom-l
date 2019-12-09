(function() {
	var L = function(tag, attrs, content) {
	    var elem = document.createElement(tag);

	    Object.keys(attrs).forEach(function(attr) {
	        if (typeof attrs[attr] === 'function' && attr.substr(0, 2) === 'on') {
	            elem.addEventListener(attr.substr(2), attrs[attr]);
	        } else {
	            elem.setAttribute(attr, attrs[attr]);
	        }
	    })

	    function appendContent(item) {
	        if (item instanceof Node) {
	            elem.appendChild(item);
	        } else if (Array.isArray(item)) {
	            item.forEach(appendContent);
	        } else if (item || item === 0) {
	            elem.appendChild(document.createTextNode(item))
	        }
	    }

	    appendContent(content);

	    return elem;
	}

	Object.assign(L, {
		removeClass: function(elems, cls) {
            if (!Array.isArray(elems)) {
                elems = [elems];
            }
            elems.forEach(function(el) {
                el.className = el.className.replace(cls, '').replace('  ', ' ').replace(/^ /, '').replace('/ $/', '');
            });
        },

	    hasClass: function(el, cls) {
            return new RegExp('\\b' + cls + '\\b').test(el.className);
        },

	    addClass: function(elems, cls) {
            if (!Array.isArray(elems)) {
                elems = [elems];
            }
            elems.forEach(function(el) {
                if (!L.hasClass(el, cls)) {
                    el.className += ' ' + cls;
                }
            });
        },

        toggleClass: function(elems, cls) {
            if (!Array.isArray(elems)) {
                elems = [elems];
            }
            elems.forEach(function(el) {
                if (L.hasClass(el, cls)) {
                    L.removeClass(el, cls);
                } else {
                    L.addClass(el, cls);
                }

            });
        }
    });

    if (typeof module == 'object' && typeof module.exports == 'object') {
        module.exports = L;
    } else if (typeof define == 'function') {
        define(function() { return L; });
    } else {
        (window || global).L = L;
    }
})();
