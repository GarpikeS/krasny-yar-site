/**
 * Cross-browser Polyfills
 * Support: Chrome, Firefox, Safari, Edge, Opera, Yandex Browser, IE11
 */

(function() {
    'use strict';

    // ===== SMOOTH SCROLL POLYFILL (Safari, IE, older browsers) =====
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Simple smooth scroll implementation
        window.smoothScrollTo = function(target, duration) {
            duration = duration || 800;
            var start = window.pageYOffset;
            var distance = target - start;
            var startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                var timeElapsed = currentTime - startTime;
                var progress = Math.min(timeElapsed / duration, 1);
                var ease = easeInOutCubic(progress);
                window.scrollTo(0, start + distance * ease);
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            requestAnimationFrame(animation);
        };

        // Override anchor clicks for smooth scroll
        document.addEventListener('click', function(e) {
            var target = e.target.closest('a[href^="#"]');
            if (target) {
                var hash = target.getAttribute('href');
                if (hash && hash !== '#') {
                    var element = document.querySelector(hash);
                    if (element) {
                        e.preventDefault();
                        var offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
                        window.smoothScrollTo(offsetTop - 100, 800);
                        history.pushState(null, null, hash);
                    }
                }
            }
        });
    }

    // ===== REQUESTANIMATIONFRAME POLYFILL =====
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                                          window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    })();

    // ===== ELEMENT.CLOSEST POLYFILL (IE11) =====
    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
            var el = this;
            do {
                if (Element.prototype.matches.call(el, s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }

    // ===== ELEMENT.MATCHES POLYFILL (IE11, older Safari) =====
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s);
                var i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // ===== NODELIST.FOREACH POLYFILL (IE11) =====
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }

    // ===== ARRAY.FROM POLYFILL (IE11) =====
    if (!Array.from) {
        Array.from = function(arrayLike) {
            return [].slice.call(arrayLike);
        };
    }

    // ===== OBJECT.ASSIGN POLYFILL (IE11) =====
    if (typeof Object.assign !== 'function') {
        Object.assign = function(target) {
            if (target === null || target === undefined) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource !== null && nextSource !== undefined) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
    }

    // ===== CUSTOM EVENT POLYFILL (IE11) =====
    if (typeof window.CustomEvent !== 'function') {
        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: null };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
    }

    // ===== INTERSECTION OBSERVER POLYFILL (Safari < 12.1, IE11) =====
    if (!('IntersectionObserver' in window)) {
        // Fallback: trigger all animations immediately
        document.addEventListener('DOMContentLoaded', function() {
            var elements = document.querySelectorAll('[data-anim]');
            elements.forEach(function(el) {
                el.classList.add('is-visible');
            });
        });
    }

    // ===== CSS CUSTOM PROPERTIES DETECTION =====
    window.supportsCSSVariables = window.CSS && window.CSS.supports &&
        window.CSS.supports('--test', '0');

    // Fallback for CSS variables (IE11)
    if (!window.supportsCSSVariables) {
        document.documentElement.classList.add('no-css-vars');

        // Apply fallback colors
        document.addEventListener('DOMContentLoaded', function() {
            var style = document.createElement('style');
            style.textContent = [
                '.btn-primary { background-color: #c41e3a !important; }',
                '.header { height: 92px !important; }',
                'body { font-family: Roboto, Arial, sans-serif !important; }'
            ].join('\n');
            document.head.appendChild(style);
        });
    }

    // ===== PASSIVE EVENT LISTENERS (Performance optimization) =====
    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
                return true;
            }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
    } catch (e) {}

    window.passiveSupported = supportsPassive;
    window.passiveOption = supportsPassive ? { passive: true } : false;

    // ===== PICTURE ELEMENT / SRCSET SUPPORT CHECK =====
    window.supportsPicture = 'HTMLPictureElement' in window;
    window.supportsSrcset = 'srcset' in document.createElement('img');

    // ===== TOUCH DEVICE DETECTION =====
    window.isTouchDevice = (function() {
        return 'ontouchstart' in window ||
               navigator.maxTouchPoints > 0 ||
               navigator.msMaxTouchPoints > 0;
    })();

    if (window.isTouchDevice) {
        document.documentElement.classList.add('touch');
    } else {
        document.documentElement.classList.add('no-touch');
    }

    // ===== IOS DETECTION (for Safari-specific fixes) =====
    window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (window.isIOS) {
        document.documentElement.classList.add('ios');
    }

    // ===== SAFARI DETECTION =====
    window.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (window.isSafari) {
        document.documentElement.classList.add('safari');
    }

    // ===== YANDEX BROWSER DETECTION =====
    window.isYandex = /YaBrowser/.test(navigator.userAgent);
    if (window.isYandex) {
        document.documentElement.classList.add('yandex');
    }

    // ===== EDGE DETECTION =====
    window.isEdge = /Edg/.test(navigator.userAgent);
    if (window.isEdge) {
        document.documentElement.classList.add('edge');
    }

    // ===== FIREFOX DETECTION =====
    window.isFirefox = /Firefox/.test(navigator.userAgent);
    if (window.isFirefox) {
        document.documentElement.classList.add('firefox');
    }

    // ===== OPERA DETECTION =====
    window.isOpera = /OPR/.test(navigator.userAgent) || /Opera/.test(navigator.userAgent);
    if (window.isOpera) {
        document.documentElement.classList.add('opera');
    }

    // ===== IE11 DETECTION =====
    window.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    if (window.isIE11) {
        document.documentElement.classList.add('ie11');
    }

    // ===== WEBP SUPPORT DETECTION =====
    function checkWebPSupport(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function() {
            callback(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    checkWebPSupport(function(supported) {
        window.supportsWebP = supported;
        document.documentElement.classList.add(supported ? 'webp' : 'no-webp');
    });

    // ===== CONSOLE LOG FOR DEBUG =====
    console.log('Browser compatibility layer loaded');
    console.log('Touch device:', window.isTouchDevice);
    console.log('CSS Variables supported:', window.supportsCSSVariables);

})();
