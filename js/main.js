/**
 * Helper functions available to all other Classes.
 */
var Utils = (function () {
    function Utils() {
    }
    /* --------------------------------------------------------*/
    /* --------------------- MISC HELPERS ---------------------*/
    /* --------------------------------------------------------*/
    Utils.easeQuadOut = function (e0, e1, t) {
        return e0 + (e1 - e0) * (t * (2 - t));
    };
    /**
     * Resizes a rectangle to fit into another rectangle using different positioning and scale properties to crop / position.
     * @data 	The data object containig all of the paraeters for the calculation.
     */
    Utils.fitToContainer = function (data) {
        var newH, newW, top, left;
        var aspectRatio = data.contentWidth / data.contentHeight;
        //scale
        if (data.scaleMode == "proportionalInside") {
            newW = data.containerWidth;
            newH = newW / aspectRatio;
            if (newH > data.containerHeight) {
                newH = data.containerHeight;
                newW = newH * aspectRatio;
            }
        }
        else if (data.scaleMode == "proportionalOutside") {
            newW = data.containerWidth;
            newH = newW / aspectRatio;
            if (newH < data.containerHeight) {
                newH = data.containerHeight;
                newW = newH * aspectRatio;
            }
        }
        else if (data.scaleMode == "none" || !data.scaleMode) {
            newW = data.contentWidth;
            newH = data.contentHeight;
        }
        //fit
        left = (data.hAlign == "left") ? 0 : (data.hAlign == "right") ? -(newW - data.containerWidth) : (data.containerWidth - newW) / 2;
        top = (data.vAlign == "top") ? 0 : (data.vAlign == "bottom") ? -(newH - data.containerHeight) : (data.containerHeight - newH) / 2;
        return {
            'width': newW,
            'height': newH,
            'top': top,
            'left': left
        };
    };
    /**
     * Generates a UUID and returns it.
     */
    Utils.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    };
    /**
     * Pushes a browser state
     * @state 	The state we want to push.
     */
    Utils.pushState = function (state, forceLang) {
        if (forceLang === void 0) { forceLang = false; }
        var s = (forceLang) ? state : Main.activeLang + state;
        History['pushState']({ state: 1 }, Main.config.title, "/" + s);
    };
    /**
     *Opens a popup window centered in the screen
    */
    Utils.openWindow = function (url, width, height) {
        var windowSize = { 'width': width, 'height': height, 'left': (screen.width / 2) - (width / 2), 'top': (screen.height / 2) - (height / 2 + 100) };
        var windowFeatures = "width=" + windowSize.width + ",height=" + windowSize.height + ",status,resizable,scrollbars,modal,alwaysRaised";
        windowFeatures += ",left=" + windowSize.left + ",top=" + windowSize.top + "screenX=" + windowSize.left + ",screenY=" + windowSize.top;
        window.open(url, '' + new Date().getTime() + '', windowFeatures);
    };
    /* --------------------------------------------------------*/
    /* ------------------------ STRING ------------------------*/
    /* --------------------------------------------------------*/
    /**
     * Capitalises the first letter of a string.
     * @str 	The string you want to capitalise.
     */
    Utils.capitalise = function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    /* --------------------------------------------------------*/
    /* ------------------------ OBJECT ------------------------*/
    /* --------------------------------------------------------*/
    /**
     * Counts the key/value pairs in an object.
     * @obj 	The object you want to get a "length" from.
     */
    Utils.objSize = function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key))
                size++;
        }
        return size;
    };
    /* --------------------------------------------------------*/
    /* ----------------------- NUMBERS ------------------------*/
    /* --------------------------------------------------------*/
    /**
     * Detects if a value is numberic or not.
     * @n 	The value we want to check.
     */
    Utils.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    /**
     * Detects if a number is odd or event
     * @num 	The value we want to check.
     */
    Utils.isOdd = function (num) {
        return (num % 2) == 16;
    };
    /**
     * Contain a number to a min and max.
     */
    Utils.clamp = function (min, max, val) {
        if (val < min)
            return min;
        if (val > max)
            return max;
        return val;
    };
    /* --------------------------------------------------------*/
    /* ------------------------- MATH -------------------------*/
    /* --------------------------------------------------------*/
    /**
     * Convert degrees to radians.
     */
    Utils.degreesToRadians = function (degrees) {
        return degrees * Math.PI / 180;
    };
    /**
     * Convert radians to degrees
     */
    Utils.radiansToDegrees = function (radians) {
        return radians * 180 / Math.PI;
    };
    /**
     * Calculates the distance between two points in 2D space.
    */
    Utils.lineDistance = function (point1, point2) {
        var xs = 0;
        var ys = 0;
        xs = point2.x - point1.x;
        xs = xs * xs;
        ys = point2.y - point1.y;
        ys = ys * ys;
        return Math.sqrt(xs + ys);
    };
    /**
     * Calculates the angle in degrees between two points
     */
    Utils.calcAngle = function (p1, p2) {
        var calcAngle = Math.atan2(p1.x - p2.x, p1.y - p2.y) * (180 / Math.PI);
        if (calcAngle < 0)
            calcAngle = Math.abs(calcAngle);
        else
            calcAngle = 360 - calcAngle;
        return calcAngle;
    };
    /**
     * Returns a random number between 2 numbers
     */
    Utils.randomFromInterval = function (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    };
    /* --------------------------------------------------------*/
    /* ------------------------- ARRAY ------------------------*/
    /* --------------------------------------------------------*/
    /**
     * Switches the position of two array elements.
     * @array 		The array containing both elements.
     * @a 			The index of the first element.
     * @b 			The index of the second element.
     * @return 		The array with the elements switched.
     */
    Utils.swapArrayElements = function (array, a, b) {
        var temp = array[a];
        array[a] = array[b];
        array[b] = temp;
        return array;
    };
    /**
     * Removes one of more elements from an array.
     * @array 		The array containing all of the elements.
     * @from		The first element we want to remove (and the last, if @to isn't set).
     * @to 			The index of the last element we want to remove.
     * @return 		The original array with the elements removed.
     */
    Utils.removeFromArray = function (array, from, to) {
        var rest = array.slice((to || from) + 1 || array.length);
        array.length = from < 0 ? array.length + from : from;
        return array.push.apply(array, rest);
    };
    /**
     * Randomly shuffles the contents of an array.
     * @array 		The array containing all of the elements.
     */
    Utils.shuffleArray = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };
    /* --------------------------------------------------------*/
    /* -------------------------- JSON ------------------------*/
    /* --------------------------------------------------------*/
    /**
     * Checks if a string is valid json.
     * @str 	The string you want to check.
     */
    Utils.isValidJSON = function (str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    /**
     * Formats a JSON sting with line breaks for displaying pretty JSON.
     * @str 	The string you want to format.
     */
    Utils.formatJSONString = function (str) {
        var jsonObj = JSON.parse(str);
        var jsonPretty = JSON.stringify(jsonObj, null, '\t');
        return jsonPretty;
    };
    /* --------------------------------------------------------*/
    /* ----------------- BROWSER / OS DETECTION ---------------*/
    /* --------------------------------------------------------*/
    /**
     * Detects the operating system on a mobile device, returns and os and the version.
     */
    Utils.detectMobileOS = function () {
        var mobileOS;
        var mobileOSver;
        var ua = navigator.userAgent;
        var uaindex;
        // determine OS
        if (ua.match(/iPad/i) || ua.match(/iPhone/i)) {
            mobileOS = 'iOS';
            uaindex = ua.indexOf('OS ');
        }
        else if (ua.match(/Android/i)) {
            mobileOS = 'Android';
            uaindex = ua.indexOf('Android ');
        }
        else {
            mobileOS = 'unknown';
        }
        // determine version
        if (mobileOS === 'iOS' && uaindex > -1) {
            mobileOSver = ua.substr(uaindex + 3, 3).replace('_', '.');
        }
        else if (mobileOS === 'Android' && uaindex > -1) {
            mobileOSver = ua.substr(uaindex + 8, 3);
        }
        else {
            mobileOSver = 'unknown';
        }
        var num = Number(mobileOSver);
        return { "os": mobileOS, "ver": num };
    };
    /* --------------------------------------------------------*/
    /* -------------------- FEATURE DETECTION -----------------*/
    /* --------------------------------------------------------*/
    /**
     * Detects if the current browser can play the mp4 video format or now.
     */
    Utils.canPlayMP4 = function () {
        var canPlay = false;
        var v = document.createElement('video');
        if (v.canPlayType && v.canPlayType('video/mp4').replace(/no/, '')) {
            canPlay = true;
        }
        return canPlay;
    };
    /* --------------------------------------------------------*/
    /* ----------------------- DATE / TIME --------------------*/
    /* --------------------------------------------------------*/
    Utils.clientTimezone = function (date) {
        return date.addHours(-(new Date().getTimezoneOffset() / 60));
    };
    /* --------------------------------------------------------*/
    /* ------------------------ COOKIES -----------------------*/
    /* --------------------------------------------------------*/
    /**
     *Sets a cookie to the document object
     * @c_name 		The name for the new cookie.
     * @value 		The data to set on this cookie.
     * @exdays 		How many days befor this cookie expires.
     */
    Utils.setCookie = function (c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = value + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()) + ";path=/";
        document.cookie = c_name + "=" + c_value;
    };
    /**
     * Retrives a cookie from the document object using the cookies name
     * @c_name 		Label of the cookie you want to retrieve.
     */
    Utils.getCookie = function (c_name) {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1) {
            c_start = c_value.indexOf(c_name + "=");
        }
        if (c_start == -1) {
            c_value = null;
        }
        else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }
            c_value = c_value.substring(c_start, c_end);
        }
        return c_value;
    };
    /* --------------------------------------------------------*/
    /* ---------------------- VALIDATION ----------------------*/
    /* --------------------------------------------------------*/
    /**
     * Validates an email address.
     */
    Utils.realEmail = function (addressToTest) {
        var regPattern = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        return regPattern.test(addressToTest);
    };
    Utils.ease = {
        "easeOutCubic": "cubic-bezier(.215,.61,.355,1)",
        "easeInOutCubic": "cubic-bezier(.645,.045,.355,1)",
        "easeInCirc": "cubic-bezier(.6,.04,.98,.335)",
        "easeOutCirc": "cubic-bezier(.075,.82,.165,1)",
        "easeInOutCirc": "cubic-bezier(.785,.135,.15,.86)",
        "easeInExpo": "cubic-bezier(.95,.05,.795,.035)",
        "easeOutExpo": "cubic-bezier(.19,1,.22,1)",
        "easeInOutExpo": "cubic-bezier(1,0,0,1)",
        "easeInQuad": "cubic-bezier(.55,.085,.68,.53)",
        "easeOutQuad": "cubic-bezier(.25,.46,.45,.94)",
        "easeInOutQuad": "cubic-bezier(.455,.03,.515,.955)",
        "easeInQuart": "cubic-bezier(.895,.03,.685,.22)",
        "easeOutQuart": "cubic-bezier(.165,.84,.44,1)",
        "easeInOutQuart": "cubic-bezier(.77,0,.175,1)",
        "easeInQuint": "cubic-bezier(.755,.05,.855,.06)",
        "easeOutQuint": "cubic-bezier(.23,1,.32,1)",
        "easeInOutQuint": "cubic-bezier(.86,0,.07,1)",
        "easeInSine": "cubic-bezier(.47,0,.745,.715)",
        "easeOutSine": "cubic-bezier(.39,.575,.565,1)",
        "easeInOutSine": "cubic-bezier(.445,.05,.55,.95)",
        "easeInBack": "cubic-bezier(.6,-.28,.735,.045)",
        "easeOutBack": "cubic-bezier(.175, .885,.32,1.275)",
        "easeInOutBack": "cubic-bezier(.68,-.55,.265,1.55);"
    };
    return Utils;
})();

var Nickel;
(function (Nickel) {
    /**
     * Parent class for all URL triggered dynamic views.
     */
    var View = (function () {
        /**
         * Stores the global vars, and adds the state change listener
         * @param content 	A jQuery object containing the parent div for this view.
         * @param data 		The JSON data bound to this views content.
         * @param id 		The unique ID associated with this view, used to determine if this view should be visible or not by listening to the browser state.
         */
        function View(content, data, id) {
            this.guid = Utils.generateUUID();
            /**
             * Whether or not this view is currently visible or not.
             */
            this.onStage = false;
            /**
             * The active sub section for this view, set by the updateMe function.
             */
            this.subSection = null;
            /**
             * The delay for setting this view to display:none once the showContent class has been removed.
             */
            this.hideDelay = 0;
            this.initialized = false;
            //set the variables passed in from the parent object
            this.content = content;
            this.id = id;
            this.data = data;
            EventBus.addEventListener(Main.UPDATE_COPY, $.proxy(this.copyChange, this), this);
            History['Adapter'].bind(window, 'statechange', $.proxy(this.stateChanged, this));
        }
        View.prototype.copyChange = function (data) {
            var copy = (this.data.copyKey) ? data[this.data.copyKey] : data;
            if (this.copy) {
                this.copy = $.extend(this.copy, copy);
            }
            else {
                this.copy = copy;
            }
            if (this.initialized) {
                this.updateCopy();
            }
        };
        View.prototype.updateCopy = function () {
            if (!this.rivets) {
                this.rivets = rivets.bind(this.content, {
                    'copy': this.copy,
                    'controller': this
                });
            }
        };
        /**
         * Adds a button for this view to the header.
         */
        View.prototype.addToHeader = function () {
        };
        /**
         * Called if this views button in the header is clicked.
         */
        View.prototype.triggerClicked = function (e) {
            e.preventDefault();
            Utils.pushState('/' + this.id);
        };
        /**
         * Triggered anytime the browser URL state changes, determines if this view should be visible or not.
         */
        View.prototype.stateChanged = function () {
            //get the state
            var showView = false;
            var urlStrings = History['getState']().url.split("/");
            var stateString = urlStrings[4];
            var subString = (urlStrings[5]) ? (urlStrings[5].length > 0) ? urlStrings[5] : null : null;
            if (!stateString)
                stateString = "";
            //if we are just updating the sub class
            if (stateString == this.id && this.onStage && this.subSection != subString) {
                this.updateMe(subString);
            }
            else if (stateString != this.id && this.onStage) {
                this.hideMe();
                this.subSection = null;
            }
            else if (stateString == this.id && !this.onStage) {
                this.showMe(subString);
            }
        };
        /**
         * Called when the stateChanged function sees that this view should be visible, and isn't already.
         * @param subState		Name of the sub view passed in from stateChanged.
         */
        View.prototype.showMe = function (subSection) {
            var _this = this;
            if (this.subSection != subSection) {
                this.updateMe(subSection);
            }
            this.content.css('display', 'block');
            this.onStage = true;
            clearTimeout(this.displayTimeout);
            this.displayTimeout = setTimeout(function () {
                _this.showPageContent();
            }, 30);
            if (this.trigger)
                this.trigger.find('a').addClass('active');
            var urlStrings = History['getState']().url.split("/");
            var stateString = urlStrings[4];
            var page = "/" + stateString;
            ga('send', 'pageview', page);
        };
        /**
         * Called when the stateChanged function sees that this view shouldn't be visible, and is.
         */
        View.prototype.hideMe = function () {
            var _this = this;
            this.hidePageContent();
            clearTimeout(this.displayTimeout);
            this.displayTimeout = setTimeout(function () {
                _this.onStage = false;
                _this.content.css('display', 'none');
            }, this.hideDelay);
            if (this.trigger)
                this.trigger.find('a').removeClass('active');
        };
        /**
         * Called when the sub section of this view changes.
         * @param subState		The subState passed in from stateChanged.
         */
        View.prototype.updateMe = function (subState) {
            this.subSection = subState;
        };
        /**
         * Toggles the show and hide css classes to show the content
         */
        View.prototype.showPageContent = function () {
            this.content.removeClass('hideContent');
            this.content.addClass('showContent');
        };
        /**
         * Toggles the show and hide css classes to show the content
         */
        View.prototype.hidePageContent = function () {
            this.content.removeClass('showContent');
            this.content.addClass('hideContent');
        };
        return View;
    })();
    Nickel.View = View;
})(Nickel || (Nickel = {}));

var Nickel;
(function (Nickel) {
    var Component = (function () {
        /**
         * Stores the global vars
         * @param container 	A jQuery object containing the parent div for this view.
         * @param data 			The config JSON data associated with this component.
         * @param delegate	 	The Class that instantiated this view.
         */
        function Component(container, data, delegate) {
            /**
             * Whether of not this instance is visible or not.
             */
            this.onStage = false;
            /**
             * The delay for setting display:none on this view after the showContent class is removed.
             */
            this.hideDelay = 0;
            /**
             * The delay for adding the showContent class to this view once display:block has been set.
             */
            this.showDelay = 25;
            /**
             * The object containing all event listeners added to this specific component
             */
            this.listeners = {};
            this.onceListeners = {};
            this.initialized = false;
            /**
             * The class to use for showing this component
             */
            this.displayClass = "block";
            this.guid = Utils.generateUUID();
            this.container = container;
            this.delegate = delegate;
            this.data = data;
        }
        /**
         * Sets this.content with a JQuery object pased in (usually cloned from Main.templates), binds this.data to this.content using rivets.
         * @param v 	The JQuery object containing the DOM element for this view.
         */
        Component.prototype.setContent = function (v) {
            this.content = v;
            this.container.append(this.content);
            this.initialized = true;
        };
        Component.prototype.setCopy = function (copy) {
            if (this.langClass)
                this.content.removeClass(this.langClass);
            this.langClass = Main.activeLang;
            this.content.addClass(Main.activeLang);
            if (this.data.copyKey) {
                copy = copy[this.data.copyKey];
            }
            if (this.copy) {
                this.copy = $.extend(this.copy, copy);
            }
            else {
                this.copy = copy;
            }
            if (!this.rivets) {
                this.rivets = rivets.bind(this.content, {
                    "copy": this.copy,
                    "controller": this,
                    "data": this.data
                });
            }
        };
        Component.prototype.once = function (evt, callback, caller) {
            if (!this.onceListeners[evt]) {
                this.onceListeners[evt] = {};
            }
            this.onceListeners[evt][caller.guid] = callback;
        };
        /**
         * Adds an event listener for an event dispatched from this specific instance.
         * @evt 		Event string we want to add an event listener for.
         * @callback 	The function we want to call if that event is dispatched.
         */
        Component.prototype.on = function (evt, callback, caller) {
            if (!this.listeners[evt]) {
                this.listeners[evt] = {};
            }
            this.listeners[evt][caller.guid] = callback;
        };
        /**
         * Removes an event listener for an event dispatched from this specific instance.
         * @evt 		Event string we want to remove an event listener for.
         * @callback 	The function we want to remove from the listeners array for that event.
         */
        Component.prototype.off = function (evt, callback, caller) {
            var listeners = this.listeners[evt];
            var callerListener = listeners[caller.guid];
            delete listeners[caller.guid];
        };
        /**
         * Dispatches an event to any Classes listening for it from this instance.
         * @evt 		The event we want to dispatch.
         * @callback 	The data we want to pass back to the event listener function.
         */
        Component.prototype.dispatch = function (evt, data) {
            if (data === void 0) { data = null; }
            var listeners = this.listeners[evt];
            var onceListeners = this.onceListeners[evt];
            for (var key in listeners) {
                if (listeners.hasOwnProperty(key)) {
                    listeners[key](data);
                }
            }
            for (var key in onceListeners) {
                if (onceListeners.hasOwnProperty(key)) {
                    onceListeners[key](data);
                    delete onceListeners[key];
                }
            }
        };
        /**
         * Binds all of the event listeners for this component.
         */
        Component.prototype.bindEvents = function () {
        };
        /**
         * Unbinds all of the Event listeners for this component.
         */
        Component.prototype.unbindEvents = function () {
        };
        /**
         * Adds display block to this.content, and calls showContent
         */
        Component.prototype.showMe = function () {
            var _this = this;
            var style = (this.displayClass == "visible") ? "visibility" : "display";
            this.content.css(style, this.displayClass);
            this.onStage = true;
            clearTimeout(this.displayTimeout);
            this.displayTimeout = setTimeout(function () {
                _this.showContent();
            }, this.showDelay);
        };
        /**
         * Adds display none to this.content, calls hideContent
         */
        Component.prototype.hideMe = function () {
            var _this = this;
            this.hideContent();
            this.onStage = false;
            var style = (this.displayClass == "visible") ? "visibility" : "display";
            var hide = (style == "display") ? "none" : "hidden";
            clearTimeout(this.displayTimeout);
            this.displayTimeout = setTimeout(function () {
                _this.content.css(style, hide);
            }, this.hideDelay);
        };
        /**
         * Adds the showContent class and removes the hideContent class from this component.
         */
        Component.prototype.showContent = function () {
            this.content.removeClass('hideContent');
            this.content.addClass('showContent');
        };
        /**
         * Adds the hideContent class and removes the showContent class from this component.
         */
        Component.prototype.hideContent = function () {
            this.content.removeClass('showContent');
            this.content.addClass('hideContent');
        };
        /**
         * Kills this component, removes the event listeners, removes this.content, and set's itself to null;
         */
        Component.prototype.killMe = function () {
            this.unbindEvents();
            this.content.remove();
            this.content = null;
        };
        return Component;
    })();
    Nickel.Component = Component;
})(Nickel || (Nickel = {}));

var AjaxRequest = (function () {
    function AjaxRequest(data, success, error, loader, url) {
        if (data === void 0) { data = {}; }
        if (success === void 0) { success = null; }
        if (error === void 0) { error = null; }
        if (loader === void 0) { loader = null; }
        if (url === void 0) { url = 'ajax.cms.php'; }
        this.url = null;
        this.data = {};
        this.successCallback = null;
        this.errorCallback = null;
        this.loader = null;
        this.url = url;
        this.data = data;
        this.successCallback = success;
        this.errorCallback = error;
        this.loader = loader;
    }
    return AjaxRequest;
})();
var Ajax = (function () {
    function Ajax() {
    }
    Ajax.formSubmit = function (form, onComplete, loader) {
        if (onComplete === void 0) { onComplete = null; }
        if (loader === void 0) { loader = null; }
        if (!form.data('ajaxified')) {
            form.data('ajaxified', '1');
            form.ajaxForm({
                complete: function (xhr) {
                    if (loader) {
                        loader.hide();
                    }
                    if (onComplete) {
                        var responseObj = eval("(" + xhr.responseText + ")");
                        onComplete(responseObj);
                    }
                }
            });
        }
        if (loader) {
            loader.show();
        }
        form.submit();
        return form;
    };
    Ajax.post = function (request) {
        if (request.loader) {
            request.loader.show();
        }
        $.ajax({
            type: 'POST',
            url: request.url,
            data: request.data,
            dataType: 'json',
            success: function (response) {
                if (request.loader) {
                    request.loader.hide();
                }
                if (response.bind && response.bind.task) {
                    Ajax.checkExpiredSession(response.bind.task);
                }
                if (request.successCallback) {
                    request.successCallback(response);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (request.loader) {
                    request.loader.hide();
                }
                if (request.errorCallback) {
                    request.errorCallback(jqXHR.responseText);
                }
            }
        });
    };
    Ajax.checkExpiredSession = function (task) {
        if (task == 'expired') {
            Ajax.expireSession();
        }
    };
    Ajax.expireSession = function () {
        window.location.href = "index.php?id=lostsession";
    };
    return Ajax;
})();

var Share = (function () {
    function Share() {
    }
    Share.onTwitter = function (shareUrl, tweetWithoutUrl) {
        //build tweet URL
        var url = 'https://twitter.com/intent/tweet?';
        if (shareUrl) {
            url += 'url=' + encodeURIComponent(shareUrl) + "&";
        }
        if (tweetWithoutUrl) {
            url += 'text=' + encodeURIComponent(tweetWithoutUrl);
        }
        //open tweet dialog
        Utils.openWindow(url, 550, 480);
        Share.recordShare();
    };
    Share.onGoogle = function (shareURL) {
        var url = "https://plus.google.com/share?url=" + shareURL;
        Utils.openWindow(url, 600, 600);
        Share.recordShare();
    };
    Share.onTumblr = function (shareURL) {
        var encodedShareURL = encodeURIComponent(shareURL);
        $.ajax({
            url: '/php/get_media_detail.php',
            type: 'POST',
            data: {
                'type': 'json',
                'url': shareURL
            },
            success: function (data) {
                var url = "https://www.tumblr.com/share/link?url=" + encodedShareURL;
                if (data.title) {
                    url += '&name=' + encodeURIComponent(data.title);
                }
                if (data.desc) {
                    url += '&description=' + encodeURIComponent(data.desc);
                }
                Utils.openWindow(url, 450, 428);
            },
            dataType: 'json',
            async: false // Not async otherwise it falls in the popup blocker
        });
    };
    Share.onFacebook = function (shareUrl, title, description, message) {
        if (title === void 0) { title = null; }
        if (description === void 0) { description = null; }
        if (message === void 0) { message = null; }
        if (navigator.userAgent.match('CriOS')) {
            var url = 'http://www.facebook.com/sharer.php?s=100&p[url]=' + encodeURIComponent(shareUrl);
            Utils.openWindow(url, 550, 480);
        }
        else {
            var obj = {
                method: 'share',
                href: shareUrl
            };
            FB.ui(obj);
        }
        Share.recordShare();
    };
    Share.recordShare = function () {
        Ajax.post(new AjaxRequest({
            'task': 'add-site-share',
        }, function () {
        }, function () {
            console.error("Error recording site share");
        }, null, Main.config.statsURL));
    };
    Share.viaEmail = function (subject, body) {
        subject = encodeURIComponent(subject);
        body = encodeURIComponent(body);
        var s = ('mailto:?subject=' + subject + '&body=' + body);
        window.location = s;
    };
    return Share;
})();

var Nickel;
(function (Nickel) {
    var VirtualScroll = (function () {
        // private maxDelta:number = 
        function VirtualScroll() {
            this.multiplier = 1;
            this.easing = 0.1;
            this.minX = null;
            this.maxX = null;
            this.minY = 0;
            this.maxY = 2000;
            this.lastPageX = 0;
            this.lastPageY = 0;
            this.attached = false;
            this.autoPilotMode = false;
            this.inScroll = false;
            this.guid = Utils.generateUUID();
            // public snap:number = 0;
            // public snapBuffer:number = 60;
            // public snapDelta:number = 10;
            // private snapTimeout:any;
            this.tweening = false;
            this.scrollToSpeed = 600; //px per second
            this.snapPoint = 0;
            this.snapBuffer = 60;
            this.snapDelta = 10;
            this.checkSnap = false;
            this.maxDeltaY = 0;
            this.deltaY = 0;
            this.closest = 0;
            if (Main.config.browser == "firefox")
                this.multiplier = 1.4;
            // if(Modernizr.touch) this.multiplier = 5;
            this.multiplier = 2;
            this.event = {
                scrollX: 0,
                scrollY: 0,
                targetScrollX: 0,
                targetScrollY: 0,
                deltaX: 0,
                deltaY: 0,
                maxDeltaX: 0,
                maxDeltaY: 0,
                screenHeight: 0,
                maxY: this.maxY
            };
            EventBus.addEventListener('SCROLL_TO', $.proxy(this.scrollTo, this), this);
            EventBus.addEventListener('JUMP_TO', $.proxy(this.jumpTo, this), this);
            $(window).bind('resize orientationchange', $.proxy(this.resize, this));
        }
        VirtualScroll.prototype.jumpTo = function (data) {
            this.event.scrollY = data.yVal;
            this.event.targetScrollY = data.yVal;
            this._dispatch();
        };
        VirtualScroll.prototype.updateFromScrollbar = function (data) {
            //calculate the position based off of the percentage and then autoscroll there
            var pos = this.minY + Math.round((this.maxY - this.minY) * data.perc);
            this.scrollTo({ x: 0, y: pos, d: 30 });
        };
        VirtualScroll.prototype.reset = function (timeout) {
            var _this = this;
            if (timeout === void 0) { timeout = null; }
            this.setValue(0, 0);
            if (timeout) {
                this.tweening = true;
                setTimeout(function () {
                    _this.tweening = false;
                }, timeout);
            }
        };
        VirtualScroll.prototype.setValue = function (x, y) {
            this.event.scrollX = x;
            this.event.scrollY = y;
            this.event.targetScrollX = x;
            this.event.targetScrollY = y;
            this.autoPilotMode = false;
        };
        VirtualScroll.prototype.scrollTo = function (data) {
            this.event.targetScrollX = data.x;
            this.event.targetScrollY = data.y;
            var dist = (data.y > this.event.scrollY) ? data.y - this.event.scrollY : this.event.scrollY - data.y;
            var d = (data.d != null) ? data.d : dist / this.scrollToSpeed;
            var e = (data.ease) ? data.ease : Quad.easeOut;
            this.tweening = true;
            var delegate = this;
            TweenMax.to(this.event, d, { "scrollY": data.y, ease: e, onUpdate: function () {
                delegate._dispatch();
            }, onStart: function () {
            }, onComplete: function () {
                delegate.tweening = false;
            } });
            this.duration = data.d * 60 || 30;
            this.t = 0;
        };
        VirtualScroll.prototype.getDuration = function () {
        };
        VirtualScroll.prototype.autoScroll = function () {
            this.t++;
            var dy = Utils.easeQuadOut(this.startY, this.event.targetScrollY, this.t / this.duration);
            this._set(dy - this.event.scrollY);
            if (this.t >= this.duration) {
                this.autoPilotMode = false;
                EventBus.dispatchEvent('SNAP_OVER');
            }
        };
        VirtualScroll.prototype._set = function (dy) {
            if (this.easing && !this.autoPilotMode) {
                this.event.targetScrollY += dy;
            }
            else {
                this.event.scrollY += dy;
            }
            this.event.maxDeltaY = Math.max(this.event.maxDeltaY, Math.abs(dy));
            this.event.deltaY = dy;
            this.event.maxY = this.maxY;
            this.event.minY = this.minY;
            // clearTimeout(this.snapTimeout);
            // this.snapTimeout = setTimeout($.proxy(this.checkSnap, this), 40);
        };
        VirtualScroll.prototype.shouldSnap = function () {
            var targY = Math.abs(this.event.targetScrollY);
            var closest = this.snapPoint * Math.floor(targY / this.snapPoint);
            var closest2 = this.snapPoint * Math.ceil(targY / this.snapPoint);
            var diff = Math.abs(closest - targY);
            var diff2 = Math.abs(closest2 - targY);
            if (diff <= this.snapBuffer) {
                this.closest = closest;
                return true;
            }
            else if (diff2 <= this.snapBuffer) {
                this.closest = closest2;
                return true;
            }
            else {
                return false;
            }
        };
        // private checkSnap(){
        //     var closest = this.snap * (Math.floor((this.event.scrollY + this.snap/2) / this.snap));
        //     var y = this.event.scrollY;
        //     if(y > closest && y < closest + this.snapBuffer || y < closest && y > closest - this.snapBuffer){
        //         //SNAP TO CLOSEST
        //         this.scrollTo({y:closest, x:0, d:0.5});
        //     }
        // }
        VirtualScroll.prototype.touch = function () {
            this._dispatch();
        };
        VirtualScroll.prototype._dispatch = function () {
            if (this.minX != null) {
                this.event.scrollX = Utils.clamp(this.minX, this.maxX, this.event.scrollX);
                this.event.targetScrollX = Utils.clamp(this.minX, this.maxX, this.event.targetScrollX);
            }
            if (this.minY != null) {
                this.event.scrollY = Utils.clamp(this.minY, this.maxY, this.event.scrollY);
                this.event.targetScrollY = Utils.clamp(this.minY, this.maxY, this.event.targetScrollY);
            }
            EventBus.dispatchEvent(VirtualScroll.UPDATE_POSITION, this.event);
        };
        VirtualScroll.prototype.attach = function () {
            if (Modernizr.touch) {
                document.addEventListener('touchstart', $.proxy(this.onTouchStart, this), false);
                document.addEventListener('touchmove', $.proxy(this.onTouchMove, this), false);
            }
            else {
                this.onWheelCallback = addWheelListener(document, $.proxy(this.onWheel, this), false); // this will throw a ts complier error
            }
            // this._dispatch();
            requestAnimationFrame($.proxy(this.onFrame, this));
        };
        VirtualScroll.prototype.detach = function () {
            removeWheelListener(document, this.onWheelCallback);
            document.removeEventListener('touchstart', $.proxy(this.onTouchStart, this));
            document.removeEventListener('touchmove', $.proxy(this.onTouchMove, this));
        };
        VirtualScroll.prototype.onFrame = function () {
            if (!this.tweening) {
                var inc = (this.event.targetScrollY - this.event.scrollY);
                var oldY = this.event.scrollY;
                if (this.autoPilotMode) {
                    this.autoScroll();
                }
                else if (this.easing) {
                    inc *= this.easing;
                    this.event.scrollY += inc;
                }
                if (Math.abs(this.event.targetScrollY - this.event.scrollY) > 0.1 || this.autoPilotMode) {
                    if (!this.inScroll) {
                        this.inScroll = true;
                        // this.slowing = false;
                        // this.slowFired = false;
                        EventBus.dispatchEvent('SCROLL_START');
                    }
                    this._dispatch();
                }
                else if (this.inScroll) {
                    this.inScroll = false;
                    EventBus.dispatchEvent('SCROLL_OVER');
                    this.maxDeltaY = 0;
                    var snap = this.shouldSnap();
                    if (snap) {
                        this.scrollTo({ x: 0, y: -this.closest, d: 0.3, ease: Quad.easeOut });
                    }
                }
            }
            requestAnimationFrame($.proxy(this.onFrame, this));
        };
        // private deltaY:number = 0;
        VirtualScroll.prototype.onWheel = function (e) {
            if (!this.tweening) {
                this.deltaY = (e.deltaY == e.deltaY >> 0) ? e.deltaY : e.deltaY * e.deltaY * e.deltaY;
                // var d = Math.abs(this.deltaY);
                var slowing = false;
                // if(d > this.maxDeltaY){
                //     this.maxDeltaY = d;
                // }else{
                //     slowing = true;
                // }
                // // console.log(this.maxDeltaY);
                // if(slowing){
                // }
                // console.log(diff);
                this.deltaY = Math.round(this.deltaY * this.multiplier);
                if (this.deltaY < 0) {
                    this.deltaY = Math.max(this.deltaY, -100);
                }
                else {
                    this.deltaY = Math.min(this.deltaY, 100);
                }
                this._set(this.deltaY);
            }
        };
        VirtualScroll.prototype.onTouchStart = function (e) {
            this.lastPageX = 0;
            this.lastPageY = 0;
        };
        VirtualScroll.prototype.onTouchMove = function (e) {
            e.preventDefault();
            this.autoPilotMode = false;
            if (this.lastPageX != 0) {
                this._set(-(e.targetTouches[0].pageY - this.lastPageY) * this.multiplier);
            }
            this.lastPageX = e.targetTouches[0].pageX;
            this.lastPageY = e.targetTouches[0].pageY;
        };
        VirtualScroll.prototype.resize = function () {
            this._dispatch();
        };
        VirtualScroll.UPDATE_POSITION = "updatevsposition";
        return VirtualScroll;
    })();
    Nickel.VirtualScroll = VirtualScroll;
})(Nickel || (Nickel = {}));

/**
 * Global event listener class. Used for passing global between views and components.
 */
var EventBus = (function () {
    function EventBus() {
    }
    /**
     * Adds an event listener for a global event.
     * @evt 		Event string we're listening for
     * @callback	The callback function to call if the event is dispatched.
     */
    EventBus.addEventListener = function (evt, callback, caller) {
        if (!EventBus.listeners[evt]) {
            EventBus.listeners[evt] = {};
        }
        EventBus.listeners[evt][caller.guid] = callback;
    };
    /**
     * Removes a specific event listener for a global event.
     * @evt 		Event string we're removing
     * @callback	The callback function we want to remove.
     */
    EventBus.removeEventListener = function (evt, callback, caller) {
        var listeners = EventBus.listeners[evt];
        var callerListener = listeners[caller.guid];
        delete listeners[caller.guid];
    };
    /**
     * Adds an event listener for a global event.
     * @evt 		The event we want to dispatch.
     * @callback	The data we want to pass into the callback function for that event.
     */
    EventBus.dispatchEvent = function (evt, data) {
        if (data === void 0) { data = null; }
        var listeners = EventBus.listeners[evt];
        for (var key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                listeners[key](data);
            }
        }
    };
    /**
     * Object containing all event listeners, with the key being the event string, and the value being an array of listener functions.
     */
    EventBus.listeners = {};
    return EventBus;
})();

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    /**
     * Dynamically generated view for displaying multiple panes, each with a cinemagraph and sale elements.
     */
    var ClimateView = (function (_super) {
        __extends(ClimateView, _super);
        /**
         * Stores the global vars, and adds the state change listener
         * @param content 	A jQuery object containing the parent div for this view.
         * @param data 		The JSON data bound to this views content.
         * @param id 		The unique ID associated with this view, used to determine if this view should be visible or not by listening to the browser state.
         */
        function ClimateView(content, data, id) {
            _super.call(this, content, data, id);
            /**
             * The number of video holder classes
             */
            this.currentSection = 0;
            this.parallaxMode = true;
            this.sectionTransition = "transform 2100ms cubic-bezier(0.545, 0.100, 0.000, 1.010)";
            this.petitionWasUp = false;
            /**
             * The target scroll value before we trigger a page change
             */
            this.scrollTarget = 10;
            this.numToPreload = 1;
            this.initDelay = 2200;
            /**
             * Array containing all of the vid holder classes
             */
            this.sections = [];
            /**
             * The number of video holder classes
             */
            this.numSections = 0;
            /**
             * The number of video holder classes
             */
            this.sectionsLoaded = 0;
            this.parallaxInit = false;
        }
        /**
         * initializes the view, creates the virtual scroller, binds the event listeners, and loads the config.
         */
        ClimateView.prototype.init = function () {
            this.initialized = true;
            this.progressBar = new Nickel.ProgressBar(this.content, {}, this);
            this.petition = new Nickel.PetitionOverlay(this.content, { "copyKey": "overlay" }, this);
            this.sectionHolder = this.content.find('.sections');
            this.rotateOverlay = $('.rotateOverlay');
            EventBus.addEventListener(ClimateView.PROCEED, $.proxy(this.proceed, this), this);
            EventBus.addEventListener(ClimateView.SIGN_PETITION, $.proxy(this.signPetition, this), this);
            EventBus.addEventListener(Main.UPDATE_COPY, $.proxy(this.updateCopy, this), this);
            EventBus.addEventListener(Nickel.Intro.KILL_INTRO, $.proxy(this.killIntro, this), this);
            $(window).bind('resize', $.proxy(this.resize, this));
            this.resize();
            //get the config and the first language async, then create the sections
            this.createSections();
        };
        ClimateView.prototype.killIntro = function () {
            if (this.currentSection != 0) {
                this.sectionHolder.css({
                    'height': this.height
                });
            }
            // this.sections[1].moveUp();
        };
        ClimateView.prototype.signPetition = function (data) {
            this.petition.setVideo(data.youtube_link, data.link_copy_key);
            this.petition.showMe();
            if (data.hideUndecided) {
                this.petition.hideFilmBtn();
                this.petition.hideUndecided();
            }
        };
        /**
         * The second step in the initialization process, creates the vid holders, nav, and footer, shows the first video.
         * @param d 	The JSON data loaded from config.json
         */
        ClimateView.prototype.createSections = function () {
            this.data = Main.data.climate;
            var keys = _.keys(this.data.questions);
            this.numSections = keys.length;
            for (var i = 0; i < this.numSections; i++) {
                var d = this.data.questions[keys[i]];
                d["index"] = i;
                var section = new Nickel[d.class](this.sectionHolder, d, this);
                if (i - 1 <= this.currentSection) {
                    section.on(Nickel.Question.MEDIA_LOADED, $.proxy(this.vidLoaded, this), this);
                }
                this.sections.push(section);
            }
            this.sections[this.currentSection].on(Nickel.Question.PROGRESS, $.proxy(this.updateProgress, this), this);
            this.sections[this.currentSection].init();
            this.updateCopy();
            this.resize();
        };
        ClimateView.prototype.updateProgress = function (perc) {
            this.progressBar.update(perc);
        };
        ClimateView.prototype.updateCopy = function () {
            this.copy = Main.copy;
            for (var i = 0; i < this.sections.length; i++) {
                var section = this.sections[i];
                if (section) {
                    var key = this.sections[i].data.id;
                    var copy = this.copy.questions[key];
                    this.sections[i].setCopy(copy);
                }
            }
            this.petition.setCopy(this.copy);
        };
        /**
         * Checks to see how many videos are loaded, if they all are, builds the page
         */
        ClimateView.prototype.vidLoaded = function () {
            this.sectionsLoaded++;
            // var perc = this.sectionsLoaded / total;
            if (this.sectionsLoaded == this.numToPreload) {
                this.buildPage();
            }
        };
        /**
         * Animates in the initial page elements.
         */
        ClimateView.prototype.buildPage = function () {
            var _this = this;
            this.progressBar.hideMe();
            setTimeout(function () {
                _this.sections[_this.currentSection].showMe();
                clearTimeout(_this.initTimeout);
                _this.initTimeout = setTimeout(function () {
                    _this.showNext();
                }, _this.initDelay);
            }, 600);
        };
        ClimateView.prototype.showNext = function () {
            var next = this.sections[this.currentSection + 1];
            if (next) {
                next.init();
                next.setCopy(this.copy.questions[next.data.id]);
                if (this.parallaxMode && this.currentSection + 1 != 1) {
                    if (this.parallaxInit) {
                        this.sectionHolder.parallax('updateLayers');
                    }
                    else {
                        this.parallaxInit = true;
                        this.sectionHolder.parallax({
                            'frictionY': 0.15,
                            'frictionX': 0.15,
                            'scalarX': 5,
                            'scalarY': 5
                        });
                    }
                }
            }
        };
        /**
         * Update the active section with the section associated with the index passed in.
         * @param index 	The index (in the this.sections array) of the item we want to show.
         */
        ClimateView.prototype.updateActive = function (index) {
            var top = (index > this.currentSection) ? true : false;
            //hide the current video, and show the new active video
            //if we're going "down"
            if (top) {
                var diff = index - this.currentSection;
                for (var i = 0; i < diff; i++) {
                    this.sections[this.currentSection + i].hideMe('top');
                }
                this.currentSection = index;
                this.sections[this.currentSection].showMe();
            }
            else {
                var diff = this.currentSection - index;
                for (var i = 0; i < diff; i++) {
                    this.sections[this.currentSection - i].hideMe('bottom');
                }
                this.currentSection = index;
                this.sections[this.currentSection].showMe();
            }
        };
        ClimateView.prototype.proceed = function () {
            var _this = this;
            this.petition.hideMe();
            //if there is a next section, proceed
            if (this.sections[this.currentSection + 1]) {
                this.sections[this.currentSection].hideMe();
                this.currentSection++;
                this.sections[this.currentSection].showMe();
                if (this.sections[this.currentSection + 1]) {
                    clearTimeout(this.initTimeout);
                    this.initTimeout = setTimeout(function () {
                        _this.showNext();
                    }, this.initDelay);
                }
            }
        };
        ClimateView.prototype.checkRotateOverlay = function () {
            var isiPad = navigator.userAgent.match(/iPad/i) != null;
            if (!isiPad && this.sWidth > this.sHeight && Main.config.deviceType == "phone" || !isiPad && this.sWidth > this.sHeight && Utils.detectMobileOS().os === "iOS") {
                this.showRotateOverlay();
            }
            else {
                this.hideRotateOverlay();
            }
        };
        ClimateView.prototype.showRotateOverlay = function () {
            this.rotateOverlay.show();
        };
        ClimateView.prototype.hideRotateOverlay = function () {
            this.rotateOverlay.hide();
        };
        /**
         * Resized the sectionHolder element to fit the screen, calls resize on all of the VidHolder classes, resizes the nav.
         */
        ClimateView.prototype.resize = function () {
            this.sWidth = $(window).width();
            this.sHeight = $(window).height();
            this.height = this.sHeight - Nickel.Header.height - Nickel.Footer.height;
            var w = this.sWidth;
            var h = this.height;
            var t = Nickel.Header.height - 2;
            var l = 0;
            this.sectionHolder.css({
                'height': h,
                'top': Nickel.Header.height
            });
            if (this.onStage)
                this.checkRotateOverlay();
            for (var i = 0; i < this.sections.length; i++) {
                var section = this.sections[i];
                if (section) {
                    this.sections[i].resize(w, h);
                }
            }
        };
        /**
         * Called when the stateChanged function sees that this view shouldn't be visible, and is.
         */
        ClimateView.prototype.hideMe = function () {
            var _this = this;
            this.hidePageContent();
            this.checkRotateOverlay();
            if (this.petition.onStage) {
                // this.petition.hideMe();
                this.petitionWasUp = true;
            }
            clearTimeout(this.displayTimeout);
            this.displayTimeout = setTimeout(function () {
                _this.onStage = false;
            }, this.hideDelay);
        };
        /**
         * Shows the view, if it hasn't been initializee, calls init().
         * @param subClass 		The sub view to display.
         */
        ClimateView.prototype.showMe = function (subClass) {
            if (this.petitionWasUp) {
                this.petition.showMe();
                this.petitionWasUp = false;
            }
            _super.prototype.showMe.call(this, subClass);
            if (!this.initialized) {
                this.init();
            }
            this.checkRotateOverlay();
            EventBus.dispatchEvent(Nickel.Footer.SHOW_FOOTER);
            Main.tagHolder.empty();
            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            Main.tagHolder.append('<iframe src="https://5195633.fls.doubleclick.net/activityi;src=5195633;type=landi0;cat=landi0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
        };
        /**
         * GUI UPDATE FUNCTIONS
         */
        ClimateView.prototype.updateParallax = function () {
            if (this.parallaxMode) {
                this.sectionHolder.parallax();
                this.sectionHolder.parallax('enable');
            }
            else {
                this.sectionHolder.parallax('disable');
            }
        };
        ClimateView.PROCEED = "proceed";
        ClimateView.SIGN_PETITION = "signthepetition";
        return ClimateView;
    })(Nickel.View);
    Nickel.ClimateView = ClimateView;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    /**
     * Loads and displays either a cinemagraph video or a poster image, as well as a title, and hotspot.
     */
    var Question = (function (_super) {
        __extends(Question, _super);
        /**
         * Stores the global vars, loads the view, and sets the initial state of this view
         * @param container 	A jQuery object containing the parent div for this view.
         * @param data 			The config JSON data associated with this component.
         * @param delegate	 	The Class that instantiated this view.
         */
        function Question(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.parallaxScalars = [1, 1.05, 1.15, 1.25, 1.35];
            this.paddingDefault = 200;
            this.paddingHeight = 200;
            this.paddingOffset = 5;
            this.mediaToLoad = 0;
            this.numMediaLoaded = 0;
            this.autoPlaySprites = false;
            this.autoPlayDelay = 5000;
            this.offBottom = true;
            this.offTop = false;
            this.sprites = [];
            this.popups = [];
            this.expanded = false;
            this.hideDelay = 1000;
            this.setContent(Main.templates.find('.section').clone());
            EventBus.addEventListener(Main.UPDATE_BREAK_POINT, $.proxy(this.updatePadding, this), this);
            this.displayClass = 'block';
            //set the initial state of this VidHolder.
            if (!Main.cssAnimation) {
                this.content.removeClass('offBottom');
                this.content.css('top', this.delegate.height);
            }
            if (this.data.colour_scheme) {
                this.ui.addClass(this.data.colour_scheme);
            }
            if (Modernizr.touch)
                this.autoPlaySprites = true;
        }
        Question.prototype.updatePadding = function (index) {
        };
        Question.prototype.setCopy = function (copy) {
            _super.prototype.setCopy.call(this, copy);
            this.dispatch(Question.SET_COPY, this.copy);
        };
        /**
         * Create either the cinemagraph, or poster image. Instantiate the hotspot, and title for this Question.
         * @param v 	The JQuery object containing the DOM element for this view.
         */
        Question.prototype.setContent = function (v) {
            this.content = v;
            //get the parallax layers
            this.bg = this.content.find('.bg').remove().addClass(this.data.id);
            this.low = this.content.find('.low').remove();
            this.mid = this.content.find('.mid').remove();
            this.top = this.content.find('.top').remove();
            this.ui = this.content.find('.ui').remove();
            this.paddingTop = this.bg.find('.paddingTop');
            this.paddingBottom = this.bg.find('.paddingBottom');
            //add the parallax layers to a group, then add them to the contianer
            this.bgElements = $().add(this.bg).add(this.low).add(this.mid).add(this.top).add(this.ui);
        };
        Question.prototype.init = function () {
            // console.log("INIT QUESTION " + this.data.index);
            this.container.append(this.bgElements);
            //add the sprites to the background layers
            this.addBackgroundSprites();
            if (this.data.popups && !Modernizr.touch) {
                this.addPopups();
            }
            //add the PIXI animation sprites
            if (this.data.sprite_left) {
                this.mediaToLoad++;
                this.spriteLeft = new Nickel.SpriteCharacter(this[this.data.sprite_left.layer].find('.parallaxContainer'), this.data.sprite_left, this);
                this.spriteLeft.on(Nickel.SpriteCharacter.CLICK, $.proxy(this.leftClicked, this), this);
                this.spriteLeft.once(Nickel.SpriteCharacter.LOADED, $.proxy(this.mediaLoaded, this), this);
                this.spriteLeft.once(Nickel.SpriteCharacter.ERROR, $.proxy(this.spriteError, this), this);
            }
            if (this.data.sprite_right) {
                this.mediaToLoad++;
                this.spriteRight = new Nickel.SpriteCharacter(this[this.data.sprite_right.layer].find('.parallaxContainer'), this.data.sprite_right, this);
                this.spriteRight.on(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
                this.spriteRight.once(Nickel.SpriteCharacter.LOADED, $.proxy(this.mediaLoaded, this), this);
                this.spriteRight.once(Nickel.SpriteCharacter.ERROR, $.proxy(this.spriteSheetError, this), this);
            }
            this.addText();
            this.dispatch(Question.INIT);
            //TODO, call this once stuff is loaded properly
            // this.mediaLoaded();
        };
        Question.prototype.addText = function () {
            this.question = new Nickel.QuestionText(this.ui.find('.parallaxContainer'), {}, this);
        };
        Question.prototype.addPopups = function () {
            for (var i = 0; i < this.data.popups.length; i++) {
                var popup = new Nickel.Popup(this.ui, this.data.popups[i], this);
                this.popups.push(popup);
            }
        };
        Question.prototype.leftClicked = function () {
            this.question.hideMe();
            this.spriteLeft.hideMe();
            this.spriteRight.hideMe();
            if (this.spriteLeft.overSound)
                this.spriteLeft.overSound.pause();
            this.spriteRight.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.spriteLeft.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.leftClicked, this), this);
            EventBus.dispatchEvent(Nickel.ClimateView.SIGN_PETITION, {
                "youtube_link": this.data.youtube_link,
                "link_copy_key": this.data.link_copy_key
            });
            ga('send', 'event', 'question', 'click', 'sprite_left', this.data.index);
        };
        Question.prototype.rightClicked = function () {
            this.question.hideMe();
            this.spriteLeft.hideMe();
            this.spriteRight.hideMe();
            this.spriteRight.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.spriteLeft.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.leftClicked, this), this);
            EventBus.dispatchEvent(Nickel.ClimateView.SIGN_PETITION, {
                "youtube_link": this.data.youtube_link,
                "link_copy_key": this.data.link_copy_key
            });
            ga('send', 'event', 'question', 'click', 'sprite_right', this.data.index);
        };
        Question.prototype.addBackgroundSprites = function () {
            if (this.data.bg_sprites) {
                for (var i = 0; i < this.data.bg_sprites.length; i++) {
                    this.mediaToLoad++;
                    var d = this.data.bg_sprites[i];
                    var sprite = new Nickel.ParallaxSprite(this[d.layer].find('.parallaxContainer'), d, this);
                    sprite.once(Nickel.ParallaxSprite.LOADED, $.proxy(this.mediaLoaded, this), this);
                    sprite.once(Nickel.ParallaxSprite.ERROR, $.proxy(this.spriteError, this), this);
                    this.sprites.push(sprite);
                }
            }
        };
        Question.prototype.spriteError = function (src) {
            console.error("Error Loading Sprite " + src);
            this.mediaLoaded();
        };
        Question.prototype.spriteSheetError = function (src) {
            console.error("Error Loading Sprite Sheet " + src);
            this.mediaLoaded();
        };
        Question.prototype.mediaLoaded = function () {
            this.numMediaLoaded++;
            var perc = this.numMediaLoaded / this.mediaToLoad;
            this.dispatch(Question.PROGRESS, perc);
            if (this.numMediaLoaded == this.mediaToLoad) {
                this.dispatch(Question.MEDIA_LOADED);
            }
        };
        /**
         * Shows the vid Holder, if there is a cinemagraph, play it.
         */
        Question.prototype.showMe = function () {
            var _this = this;
            _super.prototype.showMe.call(this);
            this.bgElements.css('display', 'block');
            EventBus.dispatchEvent(Question.ACTIVE, this.data.index);
            if (this.autoPlaySprites) {
                this.autoPlayInterval = setInterval(function () { return _this.playSprite(); }, this.autoPlayDelay);
            }
        };
        Question.prototype.playSprite = function () {
            if (this.spriteLeft && this.spriteRight) {
                if (this.spritePlaying == this.spriteLeft) {
                    this.spriteLeft.out();
                    this.spriteRight.over();
                    this.spritePlaying = this.spriteRight;
                }
                else {
                    this.spriteRight.out();
                    this.spriteLeft.over();
                    this.spritePlaying = this.spriteLeft;
                }
            }
        };
        /**
         * Shows the inner content of this view, animates it in either with css3, or TweenMax.
         */
        Question.prototype.showContent = function () {
            _super.prototype.showContent.call(this);
            if (this.offBottom) {
                this.offBottom = false;
                var top = 0;
                this.bgElements.each(function () {
                    $(this)[0].style[Main.xform] = 'translateY(' + top + 'px)';
                });
            }
        };
        /**
         * Hides the inner content of this view, animates it in either with css3, or TweenMax. Pauses the video.
         * @param dir 		The direction we want to move this view, either top, or bottom
         */
        Question.prototype.hideMe = function (dir) {
            var _this = this;
            if (dir === void 0) { dir = null; }
            _super.prototype.hideMe.call(this);
            if (this.autoPlaySprites) {
                clearInterval(this.autoPlayInterval);
                if (this.spritePlaying)
                    this.spritePlaying.out();
            }
            clearTimeout(this.hideTimeout);
            this.hideTimeout = setTimeout(function () {
                _this.offTop = true;
                var scope = _this;
                _this.bgElements.each(function (i) {
                    var top = (-scope.height - scope.paddingHeight) * scope.parallaxScalars[i];
                    $(this)[0].style[Main.xform] = 'translateY(' + top + 'px)';
                });
            }, this.showDelay);
            //TODO, make the kill call work
            clearTimeout(this.killTimeout);
            this.killTimeout = setTimeout($.proxy(this.killMe, this), 4000);
        };
        Question.prototype.killMe = function () {
            this.bgElements.remove();
            this.bgElements = null;
            this.spriteLeft.killMe();
            this.spriteRight.killMe();
            this.question.killMe();
            this.spriteLeft = null;
            this.spriteRight = null;
            this.question = null;
            this.delegate.sections[this.data.index] = null;
        };
        Question.prototype.getPaddingHeight = function () {
            if (Main.activeBreakpoint <= 320) {
                return this.paddingDefault * 0.25;
            }
            else if (Main.activeBreakpoint >= 500) {
                return this.paddingDefault * 0.5;
            }
            else if (Main.activeBreakpoint >= 1024) {
                return this.paddingDefault * 0.75;
            }
            else {
                return this.paddingDefault;
            }
        };
        /**
         * Positions this view to always fill the screen.
         */
        Question.prototype.resize = function (width, height) {
            this.width = width;
            this.height = height;
            this.paddingHeight = this.getPaddingHeight();
            // var t = this.content.offset().top;
            var h = height;
            var top = (this.offBottom) ? this.height + this.paddingHeight - this.paddingOffset : (this.offTop) ? -this.height - this.paddingHeight + this.paddingOffset : 0;
            this.content.css({
                'width': width,
                'height': h,
                'left': 0
            });
            this.bgElements.css('height', height);
            var scope = this;
            this.bgElements.each(function (i) {
                var t = top * scope.parallaxScalars[i];
                $(this)[0].style[Main.xform] = 'translateY(' + t + 'px)';
            });
            var pos = Utils.fitToContainer({
                'containerWidth': width,
                "containerHeight": height,
                "contentWidth": this.data.media_width,
                "contentHeight": this.data.media_height,
                "scaleMode": "proportionalOutside",
                "vAlign": "center",
                "hAlign": "center"
            });
            this.dispatch(Question.RESIZE);
        };
        //INTRO HACK
        Question.prototype.moveDown = function (introHeight) {
            var top = introHeight;
            this.bgElements.css('top', top);
        };
        //INTRO HACK
        Question.prototype.moveUp = function () {
            this.bgElements.css('top', 0);
        };
        Question.prototype.expand = function () {
            // this.expanded = true;
            // this.resize(this.delegate.sWidth, this.delegate.sHeight - Header.height);
            // this.scrollPrompt.showMe();
        };
        Question.ACTIVE = "activesection";
        Question.MEDIA_LOADED = "sectionloaded";
        Question.RESIZE = "resizesection";
        Question.SET_COPY = "setcopy";
        Question.INIT = "initsection";
        Question.PROGRESS = "sectionprogress";
        return Question;
    })(Nickel.Component);
    Nickel.Question = Question;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var QuestionOne = (function (_super) {
        __extends(QuestionOne, _super);
        function QuestionOne(container, data, delegate) {
            _super.call(this, container, data, delegate);
            ga('send', 'event', 'question', 'view', 'question_one');
        }
        QuestionOne.prototype.addText = function () {
            _super.prototype.addText.call(this);
            this.response = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_right_one' }, this);
        };
        QuestionOne.prototype.leftClicked = function () {
            _super.prototype.leftClicked.call(this);
            this.mid.find('.earth').css('opacity', 0);
        };
        QuestionOne.prototype.rightClicked = function () {
            var _this = this;
            this.spriteRight.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.spriteLeft.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.question.hideMe();
            this.spriteLeft.hideMe();
            this.mid.find('.earth').css('opacity', 0);
            this.response.showMe();
            this.spriteRight.on(Nickel.SpriteCharacter.DONE, function () {
                _this.response.hideMe();
                _this.spriteRight.hideMe();
                EventBus.dispatchEvent(Nickel.ClimateView.SIGN_PETITION, {
                    "youtube_link": _this.data.youtube_link,
                    "link_copy_key": _this.data.link_copy_key
                });
            }, this);
            ga('send', 'event', 'question', 'click', 'sprite_right', this.data.index);
        };
        return QuestionOne;
    })(Nickel.Question);
    Nickel.QuestionOne = QuestionOne;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var QuestionTwo = (function (_super) {
        __extends(QuestionTwo, _super);
        function QuestionTwo(container, data, delegate) {
            _super.call(this, container, data, delegate);
        }
        QuestionTwo.prototype.addText = function () {
            _super.prototype.addText.call(this);
            this.response = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_right_one' }, this);
        };
        QuestionTwo.prototype.rightClicked = function () {
            var _this = this;
            this.spriteRight.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.spriteLeft.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.spriteRight.off(Nickel.SpriteCharacter.OVER, $.proxy(this.overSprite, this), this);
            this.spriteRight.off(Nickel.SpriteCharacter.OUT, $.proxy(this.offSprite, this), this);
            this.question.hideMe();
            this.spriteLeft.hideMe();
            if (this.popups[0]) {
                this.popups[0].hideMe();
            }
            this.response.showMe();
            this.spriteRight.on(Nickel.SpriteCharacter.DONE, function () {
                _this.spriteRight.hideMe();
                _this.response.hideMe();
                EventBus.dispatchEvent(Nickel.ClimateView.SIGN_PETITION, {
                    "youtube_link": _this.data.youtube_link,
                    "link_copy_key": _this.data.link_copy_key
                });
            }, this);
            ga('send', 'event', 'question', 'click', 'sprite_right', this.data.index);
        };
        QuestionTwo.prototype.init = function () {
            _super.prototype.init.call(this);
            this.spriteRight.on(Nickel.SpriteCharacter.OVER, $.proxy(this.overSprite, this), this);
            this.spriteRight.on(Nickel.SpriteCharacter.OUT, $.proxy(this.offSprite, this), this);
            ga('send', 'event', 'question', 'view', 'question_two');
        };
        QuestionTwo.prototype.offSprite = function () {
            if (this.popups[0]) {
                this.popups[0].hideMe();
            }
        };
        QuestionTwo.prototype.overSprite = function () {
            if (this.popups[0]) {
                this.popups[0].showMe();
            }
        };
        return QuestionTwo;
    })(Nickel.Question);
    Nickel.QuestionTwo = QuestionTwo;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var QuestionThree = (function (_super) {
        __extends(QuestionThree, _super);
        function QuestionThree(container, data, delegate) {
            _super.call(this, container, data, delegate);
        }
        QuestionThree.prototype.addText = function () {
            _super.prototype.addText.call(this);
            ga('send', 'event', 'question', 'view', 'question_three');
            this.responseOne = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_right_one' }, this);
            this.responseTwo = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_right_two' }, this);
            this.responseThree = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_right_three' }, this);
        };
        QuestionThree.prototype.rightClicked = function () {
            var _this = this;
            this.spriteRight.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.spriteLeft.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.question.hideMe();
            this.spriteLeft.hideMe();
            this.responseOne.showMe();
            this.spriteRight.on(Nickel.SpriteCharacter.DONE, function () {
                _this.responseOne.hideMe();
                _this.responseThree.showMe();
                setTimeout(function () {
                    _this.responseThree.hideMe();
                    _this.spriteRight.hideMe();
                    EventBus.dispatchEvent(Nickel.ClimateView.SIGN_PETITION, {
                        "youtube_link": _this.data.youtube_link,
                        "link_copy_key": _this.data.link_copy_key
                    });
                }, 3500);
            }, this);
            ga('send', 'event', 'question', 'click', 'sprite_right', this.data.index);
        };
        return QuestionThree;
    })(Nickel.Question);
    Nickel.QuestionThree = QuestionThree;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var QuestionFour = (function (_super) {
        __extends(QuestionFour, _super);
        function QuestionFour(container, data, delegate) {
            _super.call(this, container, data, delegate);
        }
        QuestionFour.prototype.addText = function () {
            _super.prototype.addText.call(this);
            this.responseOne = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_right_one' }, this);
            this.responseTwo = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_left_one' }, this);
            this.responseThree = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_left_two' }, this);
            ga('send', 'event', 'question', 'view', 'question_four');
        };
        QuestionFour.prototype.rightClicked = function () {
            var _this = this;
            this.spriteRight.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.question.hideMe();
            this.responseOne.showMe();
            this.rightTimeoutOne = setTimeout(function () {
                _this.responseOne.hideMe();
                _this.question.showMe();
                _this.spriteRight.on(Nickel.SpriteCharacter.CLICK, $.proxy(_this.rightClicked, _this), _this);
            }, 2000);
            this.spriteRight.on(Nickel.SpriteCharacter.DONE, function () {
                _this.spriteRight.reset();
            }, this);
            ga('send', 'event', 'question', 'click', 'sprite_right', this.data.index);
        };
        QuestionFour.prototype.leftClicked = function () {
            var _this = this;
            clearTimeout(this.rightTimeoutOne);
            this.spriteRight.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.spriteLeft.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.question.hideMe();
            this.responseOne.hideMe();
            this.responseTwo.showMe();
            this.spriteRight.hideMe();
            setTimeout(function () {
                _this.responseTwo.hideMe();
                _this.responseThree.showMe();
            }, 2500);
            setTimeout(function () {
                _this.responseThree.hideMe();
                _this.spriteLeft.hideMe();
                if (_this.spriteLeft.overSound)
                    _this.spriteLeft.overSound.pause();
                EventBus.dispatchEvent(Nickel.ClimateView.SIGN_PETITION, {
                    "youtube_link": _this.data.youtube_link,
                    "link_copy_key": _this.data.link_copy_key
                });
            }, 5000);
            ga('send', 'event', 'question', 'click', 'sprite_left', this.data.index);
        };
        return QuestionFour;
    })(Nickel.Question);
    Nickel.QuestionFour = QuestionFour;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var QuestionFive = (function (_super) {
        __extends(QuestionFive, _super);
        function QuestionFive(container, data, delegate) {
            _super.call(this, container, data, delegate);
        }
        QuestionFive.prototype.addText = function () {
            _super.prototype.addText.call(this);
            this.responseOne = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_left_one' }, this);
            this.countdown = new Nickel.Countdown(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_right_one' }, this);
            this.responseThree = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_right_two' }, this);
            ga('send', 'event', 'question', 'view', 'question_five');
        };
        QuestionFive.prototype.rightClicked = function () {
            var _this = this;
            this.spriteRight.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.spriteLeft.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.question.hideMe();
            this.countdown.showMe();
            this.spriteLeft.hideMe();
            this.spriteRight.on(Nickel.SpriteCharacter.DONE, function () {
                _this.countdown.hideMe();
                _this.responseThree.showMe();
                setTimeout(function () {
                    _this.spriteRight.hideMe();
                    _this.responseThree.hideMe();
                    EventBus.dispatchEvent(Nickel.ClimateView.SIGN_PETITION, {
                        "youtube_link": _this.data.youtube_link,
                        "link_copy_key": _this.data.link_copy_key
                    });
                }, 2500);
            }, this);
            ga('send', 'event', 'question', 'click', 'sprite_right', this.data.index);
        };
        QuestionFive.prototype.leftClicked = function () {
            var _this = this;
            this.spriteRight.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.spriteLeft.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.question.hideMe();
            this.responseOne.showMe();
            this.spriteRight.hideMe();
            setTimeout(function () {
                _this.spriteLeft.hideMe();
                _this.responseOne.hideMe();
                if (_this.spriteLeft.overSound)
                    _this.spriteLeft.overSound.pause();
                EventBus.dispatchEvent(Nickel.ClimateView.SIGN_PETITION, {
                    "youtube_link": _this.data.youtube_link,
                    "link_copy_key": _this.data.link_copy_key
                });
            }, 2500);
            ga('send', 'event', 'question', 'click', 'sprite_left', this.data.index);
        };
        QuestionFive.prototype.init = function () {
            _super.prototype.init.call(this);
            this.spriteLeft.on(Nickel.SpriteCharacter.OVER, $.proxy(this.overSprite, this), this);
            this.spriteLeft.on(Nickel.SpriteCharacter.OUT, $.proxy(this.offSprite, this), this);
        };
        QuestionFive.prototype.offSprite = function () {
            if (this.popups[0]) {
                this.popups[0].hideMe();
            }
        };
        QuestionFive.prototype.overSprite = function () {
            if (this.popups[0]) {
                this.popups[0].showMe();
            }
        };
        return QuestionFive;
    })(Nickel.Question);
    Nickel.QuestionFive = QuestionFive;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var QuestionSix = (function (_super) {
        __extends(QuestionSix, _super);
        function QuestionSix(container, data, delegate) {
            _super.call(this, container, data, delegate);
        }
        QuestionSix.prototype.addText = function () {
            _super.prototype.addText.call(this);
            this.response = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_yes_one' }, this);
            this.responseOne = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_right_one' }, this);
            this.responseTwo = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_right_two' }, this);
            this.questionTwo = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_right_question' }, this);
            if (!Modernizr.touch) {
                this.winnerSound = new buzz.sound("/sound/q6_yay", {
                    formats: ["mp3"],
                    loop: false,
                    preload: true,
                    autoplay: false,
                    volume: 50,
                    webAudioApi: false
                });
                this.winnerSound.load();
            }
            ga('send', 'event', 'question', 'view', 'question_six');
        };
        QuestionSix.prototype.addBackgroundSprites = function () {
            var _this = this;
            _super.prototype.addBackgroundSprites.call(this);
            this.secondaryLeft = new Nickel.ParallaxSprite(this.ui.find('.parallaxContainer'), {
                "img": "/img/sprites/gen/two.png",
                "x": 0.25,
                "y": 0.5,
                "layer": "mid"
            }, this);
            this.secondaryLeft.content.addClass('second');
            this.secondaryLeft.content.bind('click', $.proxy(this.secondaryClick, this));
            this.secondaryRight = new Nickel.ParallaxSprite(this.ui.find('.parallaxContainer'), {
                "img": "/img/sprites/gen/switzerland.png",
                "x": 0.75,
                "y": 0.5,
                "layer": "mid"
            }, this);
            this.secondaryRight.content.addClass('second');
            this.secondaryRight.content.on('mouseenter', function () {
                setTimeout(function () {
                    _this.secondaryRight.hideMe();
                    _this.secondaryRightTwo.showMe();
                }, 1000);
            });
            this.secondaryRightTwo = new Nickel.ParallaxSprite(this.ui.find('.parallaxContainer'), {
                "img": "/img/sprites/gen/two.png",
                "x": 0.75,
                "y": 0.5,
                "layer": "mid"
            }, this);
            this.secondaryRightTwo.content.bind('click', $.proxy(this.secondaryClick, this));
            this.secondaryRightTwo.content.addClass('second');
        };
        QuestionSix.prototype.secondaryClick = function () {
            var _this = this;
            this.questionTwo.hideMe();
            this.responseOne.showMe();
            this.secondaryLeft.hideMe();
            this.secondaryRight.hideMe();
            this.secondaryRightTwo.hideMe();
            this.secondaryRightTwo.content.unbind('click', $.proxy(this.secondaryClick, this));
            this.secondaryRight.content.unbind('click', $.proxy(this.secondaryClick, this));
            this.secondaryLeft.content.unbind('click', $.proxy(this.secondaryClick, this));
            if (this.winnerSound)
                this.winnerSound.play();
            setTimeout(function () {
                _this.responseOne.hideMe();
                _this.responseTwo.showMe();
                setTimeout(function () {
                    _this.responseTwo.hideMe();
                    EventBus.dispatchEvent(Nickel.ClimateView.SIGN_PETITION, {
                        "youtube_link": _this.data.youtube_link,
                        "link_copy_key": _this.data.link_copy_key
                    });
                }, 3000);
            }, 3000);
        };
        QuestionSix.prototype.rightClicked = function () {
            var _this = this;
            this.spriteRight.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.spriteLeft.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.question.hideMe();
            this.spriteLeft.hideMe();
            this.spriteRight.hideMe();
            setTimeout(function () {
                _this.questionTwo.showMe();
                _this.secondaryLeft.showMe();
                _this.secondaryRight.showMe();
            }, 300);
            ga('send', 'event', 'question', 'click', 'sprite_right', this.data.index);
        };
        QuestionSix.prototype.leftClicked = function () {
            var _this = this;
            this.spriteRight.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.spriteLeft.off(Nickel.SpriteCharacter.CLICK, $.proxy(this.rightClicked, this), this);
            this.question.hideMe();
            this.response.showMe();
            this.spriteRight.hideMe();
            setTimeout(function () {
                _this.spriteLeft.hideMe();
                _this.response.hideMe();
                EventBus.dispatchEvent(Nickel.ClimateView.SIGN_PETITION, {
                    "youtube_link": _this.data.youtube_link,
                    "link_copy_key": _this.data.link_copy_key
                });
            }, 4000);
            ga('send', 'event', 'question', 'click', 'sprite_left', this.data.index);
        };
        return QuestionSix;
    })(Nickel.Question);
    Nickel.QuestionSix = QuestionSix;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var QuestionSeven = (function (_super) {
        __extends(QuestionSeven, _super);
        function QuestionSeven(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.textSprites = [];
        }
        QuestionSeven.prototype.addText = function () {
            _super.prototype.addText.call(this);
            this.responseOne = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_one' }, this);
            this.responseTwo = new Nickel.ResponseText(this.ui.find('.parallaxContainer'), { 'copy_key': 'response_two' }, this);
            this.spriteLeft.content.css('pointer-events', 'none');
            this.spriteLeft.content.css('margin-bottom', '-45px');
            if (!Modernizr.touch) {
                this.emoSound = new buzz.sound("/sound/q7_emo", {
                    formats: ["mp3"],
                    loop: false,
                    preload: true,
                    autoplay: false,
                    volume: 65,
                    webAudioApi: false
                });
                this.emoSound.load();
            }
            ga('send', 'event', 'question', 'view', 'question_seven');
        };
        QuestionSeven.prototype.showMe = function () {
            var _this = this;
            _super.prototype.showMe.call(this);
            setTimeout(function () {
                if (_this.emoSound)
                    _this.emoSound.play();
            }, 1000);
            setTimeout(function () {
                _this.spriteLeft.over();
                setTimeout(function () {
                    if (_this.spriteLeft) {
                        _this.spriteLeft.out();
                    }
                }, 2500);
            }, 2500);
        };
        QuestionSeven.prototype.addBackgroundSprites = function () {
            if (this.data.bg_sprites) {
                for (var i = 0; i < this.data.bg_sprites.length; i++) {
                    this.mediaToLoad++;
                    var d = this.data.bg_sprites[i];
                    var sprite;
                    if (d.sprite_type == "text") {
                        sprite = new Nickel.TextSprite(this[d.layer].find('.parallaxContainer'), d, this);
                        sprite.on(Nickel.TextSprite.CLICK, $.proxy(this.spriteClick, this), this);
                        this.textSprites.push(sprite);
                    }
                    else {
                        sprite = new Nickel.ParallaxSprite(this[d.layer].find('.parallaxContainer'), d, this);
                    }
                    sprite.once(Nickel.ParallaxSprite.LOADED, $.proxy(this.mediaLoaded, this), this);
                    sprite.once(Nickel.ParallaxSprite.ERROR, $.proxy(this.spriteError, this), this);
                    this.sprites.push(sprite);
                }
            }
        };
        QuestionSeven.prototype.spriteClick = function () {
            var _this = this;
            this.question.hideMe();
            this.responseOne.showMe();
            for (var i = 0; i < this.textSprites.length; i++) {
                this.textSprites[i].hideMe();
                this.textSprites[i].off(Nickel.TextSprite.CLICK, $.proxy(this.spriteClick, this), this);
            }
            ;
            setTimeout(function () {
                _this.responseOne.hideMe();
                _this.responseTwo.showMe();
            }, 2500);
            setTimeout(function () {
                _this.responseTwo.hideMe();
                EventBus.dispatchEvent(Nickel.ClimateView.SIGN_PETITION, {
                    "youtube_link": _this.data.youtube_link,
                    "link_copy_key": _this.data.link_copy_key,
                    'hideUndecided': true
                });
            }, 5000);
            ga('send', 'event', 'question', 'click', 'sprite_color', this.data.index);
        };
        return QuestionSeven;
    })(Nickel.Question);
    Nickel.QuestionSeven = QuestionSeven;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var SpriteCharacter = (function (_super) {
        __extends(SpriteCharacter, _super);
        function SpriteCharacter(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.spriteIndex = 0;
            this.sizes = [320, 500, 1024, 1366];
            this.suffixes = ["_25", "_50", "_75", "_100"];
            this.playingAction = false;
            this.checkBreakpoint(Main.activeBreakpoint);
            this.setContent(Main.templates.find('.' + this.data.sprite_class).clone());
            this.delegate.on(Nickel.Question.RESIZE, $.proxy(this.resize, this), this);
            this.delegate.on(Nickel.Question.SET_COPY, $.proxy(this.setCopy, this), this);
            this.delegate.on(Nickel.Question.INIT, $.proxy(this.init, this), this);
            EventBus.addEventListener(Main.UPDATE_BREAK_POINT, $.proxy(this.checkBreakpoint, this), this);
        }
        SpriteCharacter.prototype.checkBreakpoint = function (size) {
            for (var i = this.sizes.length; i >= 0; i--) {
                if (size >= this.sizes[i]) {
                    if (i != this.spriteIndex) {
                        this.spriteIndex = i;
                        if (this.initialized) {
                            this.loadSprite();
                            if (this.data.action_sprite) {
                                this.loadActionSprite();
                            }
                        }
                    }
                    break;
                }
            }
        };
        SpriteCharacter.prototype.setContent = function (v) {
            _super.prototype.setContent.call(this, v);
            this.content.bind((Modernizr.touch) ? 'touchstart' : 'mouseenter', $.proxy(this.over, this));
            this.content.bind((Modernizr.touch) ? 'touchend' : 'mouseleave', $.proxy(this.out, this));
            if (this.data.font_size)
                this.content.addClass(this.data.font_size);
            this.content.bind('touchstart click', $.proxy(this.spriteClick, this));
            this.resize();
        };
        SpriteCharacter.prototype.spriteClick = function () {
            if (this.actionSprite) {
                this.playActionSprite();
                if (this.clickSound)
                    this.clickSound.play();
                if (this.overSound)
                    this.overSound.pause();
            }
            this.dispatch(SpriteCharacter.CLICK);
        };
        SpriteCharacter.prototype.playActionSprite = function () {
            this.stage.removeChild(this.sprite);
            this.stage.addChild(this.actionSprite);
            this.renderer.resize(this.actionSpriteData.width, this.actionSpriteData.height);
            this.playingAction = true;
            this.resize();
            this.actionSprite.play();
        };
        SpriteCharacter.prototype.actionSpriteOver = function () {
            this.playingAction = false;
            cancelAnimationFrame(this.raf);
            this.dispatch(SpriteCharacter.DONE);
        };
        SpriteCharacter.prototype.over = function () {
            if (this.sprite) {
                this.sprite.play();
                this.raf = requestAnimationFrame($.proxy(this.animate, this));
            }
            if (this.overSound)
                this.overSound.play();
            this.dispatch(SpriteCharacter.OVER);
        };
        SpriteCharacter.prototype.out = function () {
            if (this.sprite && !this.playingAction) {
                this.sprite.stop();
                cancelAnimationFrame(this.raf);
            }
            if (this.overSound) {
                this.overSound.pause();
                this.overSound.setPercent(0);
            }
            this.dispatch(SpriteCharacter.OUT);
        };
        SpriteCharacter.prototype.init = function () {
            // create an new instance of a pixi stage
            this.stage = new PIXI.Container();
            // create a renderer instance
            var res = (Main.retina) ? 2 : 1;
            if (Modernizr.touch) {
                this.renderer = new PIXI.CanvasRenderer(this.data.width, this.data.height, { 'transparent': true, "autoResize": true, "resolution": res });
            }
            else {
                this.renderer = new PIXI.autoDetectRenderer(this.data.width, this.data.height, { 'transparent': true, "autoResize": true, "resolution": res });
            }
            // add the renderer view element to the DOM
            this.content.append(this.renderer.view);
            //load the json
            this.loader = PIXI.loader; // pixi exposes a premade instance for you to use.
            if (this.data.over_sound && !Modernizr.touch) {
                var l = (this.data.over_sound.loop === false) ? false : true;
                this.overSound = new buzz.sound(this.data.over_sound.src, {
                    formats: this.data.over_sound.formats,
                    loop: l,
                    preload: true,
                    autoplay: false,
                    volume: 50,
                    webAudioApi: false
                });
                this.overSound.load();
            }
            if (this.data.click_sound && !Modernizr.touch) {
                this.clickSound = new buzz.sound(this.data.click_sound.src, {
                    formats: this.data.click_sound.formats,
                    loop: this.data.click_sound.loop,
                    preload: true,
                    autoplay: false,
                    volume: 50,
                    webAudioApi: false
                });
                this.clickSound.load();
            }
            this.loadSprite();
            if (this.data.action_sprite) {
                this.loadActionSprite();
            }
        };
        SpriteCharacter.prototype.reset = function () {
            this.stage.addChild(this.sprite);
            this.stage.removeChild(this.actionSprite);
            this.actionSprite.gotoAndStop(0);
            this.renderer.resize(this.spriteData.width, this.spriteData.height);
            this.playingAction = false;
            this.resize();
            this.sprite.play();
            this.renderer.render(this.stage);
        };
        SpriteCharacter.prototype.killMe = function () {
            this.sprite.destroy();
            if (this.actionSprite)
                this.actionSprite.destroy();
            this.renderer.destroy();
            this.delegate.off(Nickel.Question.RESIZE, $.proxy(this.resize, this), this);
            this.delegate.off(Nickel.Question.SET_COPY, $.proxy(this.setCopy, this), this);
            this.delegate.off(Nickel.Question.INIT, $.proxy(this.init, this), this);
            EventBus.removeEventListener(Main.UPDATE_BREAK_POINT, $.proxy(this.checkBreakpoint, this), this);
        };
        SpriteCharacter.prototype.loadSprite = function () {
            var name = this.data.sprite.name;
            name += this.suffixes[this.spriteIndex];
            var data = this.data.sprite.sprite_data;
            data = data.replace(".", this.suffixes[this.spriteIndex] + ".");
            if (Main.retina) {
                name += "@2x";
                data = data.replace(".", '@2x.');
            }
            this.spriteData = {
                "name": name,
                "sprite_data": data
            };
            //if the texture is alreay in the loader, just use it, if not, load it.
            if (!this.loader.resources[name]) {
                this.loader.add(this.spriteData.name, this.spriteData.sprite_data);
                this.loader.once('complete', $.proxy(this.makeSprite, this));
                this.loader.load();
            }
            else {
                this.makeSprite(null, this.loader.resources);
            }
        };
        SpriteCharacter.prototype.loadActionSprite = function () {
            var name = this.data.action_sprite.name;
            name += this.suffixes[this.spriteIndex];
            var data = this.data.action_sprite.sprite_data;
            data = data.replace(".", this.suffixes[this.spriteIndex] + ".");
            if (Main.retina) {
                name += "@2x";
                data = data.replace(".", '@2x.');
            }
            this.actionSpriteData = {
                "name": name,
                "sprite_data": data
            };
            //if the texture is alreay in the loader, just use it, if not, load it.
            if (!this.loader.resources[name]) {
                this.loader.add(this.actionSpriteData.name, this.actionSpriteData.sprite_data);
                this.loader.once('complete', $.proxy(this.makeActionSprite, this));
                this.loader.load();
            }
            else {
                this.makeSprite(null, this.loader.resources);
            }
        };
        SpriteCharacter.prototype.makeSprite = function (loader, resources) {
            var arr = _.toArray(resources[this.spriteData.name].textures);
            var first = arr[0];
            if (this.sprite) {
                this.stage.removeChild(this.sprite);
                this.sprite = null;
            }
            if (first) {
                this.sprite = new PIXI.extras.MovieClip(arr);
                this.sprite.animationSpeed = 0.4; //24 fps appx
                if (Modernizr.touch) {
                    this.sprite.touchend = $.proxy(this.spriteClick, this);
                }
                else {
                    this.sprite.click = $.proxy(this.spriteClick, this);
                    this.sprite.mouseover = $.proxy(this.over, this);
                    this.sprite.mouseout = $.proxy(this.out, this);
                }
                this.spriteData.width = first.width;
                this.spriteData.height = first.height;
                this.renderer.resize(this.spriteData.width, this.spriteData.height);
                this.stage.addChild(this.sprite);
                this.resize();
                this.renderer.render(this.stage);
                this.dispatch(SpriteCharacter.LOADED);
            }
            else {
                this.renderer.resize(0, 0);
                this.dispatch(SpriteCharacter.ERROR);
            }
        };
        SpriteCharacter.prototype.makeActionSprite = function (loader, resources) {
            var arr = _.toArray(resources[this.actionSpriteData.name].textures);
            var first = arr[0];
            if (this.actionSprite) {
                this.stage.removeChild(this.actionSprite);
                this.actionSprite = null;
            }
            if (first) {
                this.actionSprite = new PIXI.extras.MovieClip(arr);
                this.actionSprite.animationSpeed = 0.4; //24 fps appx
                this.actionSprite.loop = false;
                this.actionSprite.onComplete = $.proxy(this.actionSpriteOver, this);
                this.actionSpriteData.width = first.width;
                this.actionSpriteData.height = first.height;
            }
        };
        SpriteCharacter.prototype.animate = function () {
            this.raf = requestAnimationFrame($.proxy(this.animate, this));
            this.renderer.render(this.stage);
        };
        SpriteCharacter.prototype.resize = function () {
            var data = (this.spriteData && !this.playingAction) ? this.spriteData : (this.actionSpriteData && this.playingAction) ? this.actionSpriteData : null;
            if (data) {
                var contWidth = this.delegate.width;
                var contHeight = this.delegate.height;
                var x = this.data.x;
                if (this.data.x == "center")
                    x = (contWidth * 0.5) - (data.width / 2);
                if (this.data.x == "center_left")
                    x = (contWidth * 0.25) - (data.width / 2);
                if (this.data.x == "center_right")
                    x = (contWidth * 0.75) - (data.width / 2);
                // var y  = this.data.y;
                // if(this.data.y == "center") y = (contHeight * 0.5) - (data.height / 2);
                var y = this.delegate.height * 0.3;
                this.content.css({
                    'width': data.width,
                    'height': data.height,
                    'bottom': y,
                    'left': x
                });
            }
        };
        SpriteCharacter.CLICK = "spriteclick";
        SpriteCharacter.DONE = "spritedone";
        SpriteCharacter.LOADED = "characterspriteloaded";
        SpriteCharacter.ERROR = "characterspriteerror";
        SpriteCharacter.OVER = "overspritecharacter";
        SpriteCharacter.OUT = "outspritecharacter";
        return SpriteCharacter;
    })(Nickel.Component);
    Nickel.SpriteCharacter = SpriteCharacter;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var ParallaxSprite = (function (_super) {
        __extends(ParallaxSprite, _super);
        function ParallaxSprite(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.spriteIndex = 0;
            this.sizes = [320, 500, 1024, 1366];
            this.checkBreakpoint(Main.activeBreakpoint);
            this.setContent(Main.templates.find('.sprite').clone());
            EventBus.addEventListener(Main.UPDATE_BREAK_POINT, $.proxy(this.checkBreakpoint, this), this);
            this.delegate.on(Nickel.Intro.SET_ANIMATION, $.proxy(this.setAnimation, this), this);
            this.delegate.on(Nickel.Intro.PLAY_ANIMATION, $.proxy(this.playAnimation, this), this);
            this.delegate.on(Nickel.Question.INIT, $.proxy(this.init, this), this);
        }
        ParallaxSprite.prototype.playAnimation = function () {
            if (this.data.skrollr) {
                for (var i = 0; i < this.data.skrollr.length; ++i) {
                    var skrollData = this.data.skrollr[i];
                    var endValue = '';
                    if (skrollData.transforms) {
                        for (var t = 0; t < skrollData.transforms.length; t++) {
                            var transform = skrollData.transforms[t];
                            //values
                            if (transform.type == "translateY") {
                                var end = transform.end * this.delegate.introHeight;
                                endValue += ' translateY(' + end + 'px)';
                            }
                            else if (transform.type == "scale") {
                                endValue += ' scale(' + transform.end + ', ' + transform.end + ')';
                            }
                        }
                    }
                    this.content[0].style[Main.xform] = endValue;
                }
            }
        };
        ParallaxSprite.prototype.setAnimation = function () {
            if (this.data.skrollr) {
                for (var i = 0; i < this.data.skrollr.length; ++i) {
                    var skrollData = this.data.skrollr[i];
                    var dly = this.delegate.totalScrollTime * (skrollData.skrollStart);
                    var time = Math.round((skrollData.skrollEnd - skrollData.skrollStart) * this.delegate.totalScrollTime);
                    var transition = Main.cssXform + ' ' + time + 'ms ' + Utils.ease.easeInOutQuad + ' ' + dly + 'ms';
                    var startValue = '';
                    if (skrollData.transforms) {
                        for (var t = 0; t < skrollData.transforms.length; t++) {
                            var transform = skrollData.transforms[t];
                            //values
                            if (transform.type == "translateY") {
                                var start = transform.start * this.delegate.introHeight;
                                startValue += ' translateY(' + start + 'px)';
                            }
                            else if (transform.type == "scale") {
                                startValue += ' scale(' + transform.start + ', ' + transform.start + ')';
                            }
                        }
                    }
                    this.content[0].style[Main.xform] = startValue;
                    this.content[0].style[Main.transition] = transition;
                    if (skrollData.origin) {
                        this.content.css({
                            'transform-origin': skrollData.origin,
                            '-webkit-transform-origin': skrollData.origin
                        });
                    }
                }
            }
        };
        ParallaxSprite.prototype.checkBreakpoint = function (size) {
            for (var i = this.sizes.length; i >= 0; i--) {
                if (size >= this.sizes[i]) {
                    if (i != this.spriteIndex) {
                        this.spriteIndex = i;
                        if (this.initialized) {
                            this.loadMedia();
                        }
                    }
                    break;
                }
            }
        };
        ParallaxSprite.prototype.init = function () {
            this.loadMedia();
        };
        ParallaxSprite.prototype.loadMedia = function () {
            var _this = this;
            if (this.data.img) {
                if (this.img) {
                    $(this.img).remove();
                    this.img = null;
                }
                this.img = new Image();
                this.img.onload = function () {
                    if (_this.data.type == "fill") {
                        if (Main.retina || _this.data.force_retina) {
                            var w = _this.img.naturalWidth / 2;
                            var h = _this.img.naturalHeight / 2;
                            _this.content.css({
                                'background-image': 'url(' + _this.img.src + ')',
                            });
                            if (!_this.data.cover) {
                                _this.content.css({
                                    'background-size': w + 'px ' + h + 'px'
                                });
                            }
                            else {
                                _this.content.addClass('cover');
                            }
                        }
                        else {
                            _this.content.css('background-image', 'url(' + _this.img.src + ')');
                            if (_this.data.cover)
                                _this.content.addClass('cover');
                        }
                    }
                    else if (_this.data.type == "transition") {
                        _this.content.append(_this.img);
                        _this.height = (Main.retina || _this.data.force_retina) ? _this.img.naturalHeight / 2 : _this.img.naturalHeight;
                        var width = (Main.retina || _this.data.force_retina) ? _this.img.naturalWidth / 2 : _this.img.naturalWidth;
                        _this.content.css({
                            'background-size': width + 'px ' + _this.height + 'px'
                        });
                    }
                    else {
                        _this.content.append(_this.img);
                        _this.width = (Main.retina || _this.data.force_retina) ? _this.img.naturalWidth / 2 : _this.img.naturalWidth;
                        _this.height = (Main.retina || _this.data.force_retina) ? _this.img.naturalHeight / 2 : _this.img.naturalHeight;
                        _this.ratio = _this.width / _this.height;
                        if (_this.data.cover)
                            _this.content.addClass('cover');
                        _this.content.css('width', _this.width);
                        _this.content.css('height', _this.height);
                        if (_this.data.cls) {
                            $(_this.img).addClass(_this.data.cls);
                        }
                    }
                    _this.position();
                    _this.delegate.on(Nickel.Question.RESIZE, $.proxy(_this.position, _this), _this);
                    _this.dispatch(ParallaxSprite.LOADED);
                };
                this.img.onerror = function (e) {
                    console.log(e);
                    _this.dispatch(ParallaxSprite.ERROR, _this.img.src);
                };
                var path = this.data.img;
                if (Main.retina || this.data.force_retina)
                    path = path.replace('.', '@2x.'); //add in @2x if we're in retina mode
                path = path.replace(".", "_" + this.sizes[this.spriteIndex] + "."); //add in the _spriteIndex to the name
                this.img.src = path;
            }
            else if (this.data.color) {
                this.content.css('background-color', this.data.color);
                this.position();
                this.delegate.on(Nickel.Question.RESIZE, $.proxy(this.position, this), this);
                this.dispatch(ParallaxSprite.LOADED);
            }
        };
        ParallaxSprite.prototype.position = function () {
            //TODO: make this function less bad...
            //FILL
            if (this.data.type == "fill") {
                var w = (this.data.width) ? this.data.width * this.delegate.width : this.delegate.width;
                var h = (this.data.height) ? this.data.height * this.delegate.height : this.delegate.height;
                var t = (this.data.y) ? this.delegate.height * this.data.y : 0;
                if (this.data.fulWidth)
                    w = this.delegate.delegate.width; //TODO Make this less bad.
                this.content.css({
                    'width': w,
                    'height': h,
                    'left': 0,
                    'top': t
                });
                if (this.data.vAlign == "top") {
                    this.content.css('top', 0);
                }
                else if (this.data.vAlign == "bottom") {
                    this.content.css('bottom', 0);
                    this.content.css('top', 'auto');
                }
                else {
                    this.content.css('top', t);
                }
            }
            else if (this.data.type == "transition") {
                this.content.css({
                    'width': this.delegate.width,
                    'height': this.height,
                    'left': 0
                });
                if (this.data.position == "top") {
                    this.content.css('top', -this.height);
                }
                else {
                    this.content.css('bottom', -this.height);
                }
            }
            else {
                if (this.data.fullWidth) {
                    this.width = this.delegate.delegate.sWidth;
                    this.height = this.width / this.ratio;
                }
                var vOffset, hOffset;
                //vertical offset
                if (this.data.vAlign) {
                    if (typeof this.data.vAlign === "string") {
                        if (this.data.vAlign == "top") {
                            vOffset = 0;
                        }
                        else if (this.data.vAlign == "bottom") {
                            vOffset = -this.height;
                        }
                        else {
                            vOffset = (-this.height / 2);
                        }
                    }
                    else if (typeof this.data.vAlign === "number") {
                        vOffset = this.data.vAlign * this.height;
                    }
                    else {
                        vOffset = -(this.height / 2);
                    }
                }
                else {
                    vOffset = -(this.height / 2);
                }
                //horizontal offset
                if (this.data.hAlign) {
                    if (typeof this.data.hAlign === "string") {
                        if (this.data.hAlign == "left") {
                            hOffset = 0;
                        }
                        else if (this.data.hAlign == "right") {
                            hOffset = -this.width;
                        }
                        else {
                            hOffset = (-this.width / 2);
                        }
                    }
                    else if (typeof this.data.hAlign === "number") {
                        hOffset = this.data.hAlign * this.width;
                    }
                    else {
                        hOffset = -(this.width / 2);
                    }
                }
                else {
                    hOffset = -(this.width / 2);
                }
                var x = (this.delegate.width * this.data.x) + hOffset;
                var y = (this.delegate.height * this.data.y) + vOffset;
                this.content.css({
                    'top': y,
                    'left': x,
                    'width': this.width,
                    'height': this.height
                });
            }
        };
        ParallaxSprite.LOADED = "bgspriteloaded";
        ParallaxSprite.ERROR = "bgspriterror";
        return ParallaxSprite;
    })(Nickel.Component);
    Nickel.ParallaxSprite = ParallaxSprite;
})(Nickel || (Nickel = {}));
;

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var TextSprite = (function (_super) {
        __extends(TextSprite, _super);
        function TextSprite(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.delegate.on(Nickel.Question.SET_COPY, $.proxy(this.setCopy, this), this);
            this.copySpan = $("<span class ='copy'></span>");
            this.copySpan.addClass(this.data.text_align);
            this.content.append(this.copySpan);
            this.content.bind('click', $.proxy(this.click, this));
            this.content.css('cursor', 'pointer');
            this.content.addClass('textSprite');
        }
        TextSprite.prototype.loadMedia = function () {
            var _this = this;
            _super.prototype.loadMedia.call(this);
            if (this.data.rollover) {
                if (this.rolloverImg) {
                    this.rolloverImg = null;
                }
                var path = this.data.rollover;
                if (Main.retina || this.data.force_retina)
                    path = path.replace('.', '@2x.'); //add in @2x if we're in retina mode
                path = path.replace(".", "_" + this.sizes[this.spriteIndex] + "."); //add in the _spriteIndex to the name
                this.rolloverImg = new Image();
                this.rolloverImg.className = 'rollover';
                this.rolloverImg.onload = function () {
                    _this.content.append(_this.rolloverImg);
                };
                this.rolloverImg.src = path;
            }
        };
        TextSprite.prototype.click = function () {
            this.dispatch(TextSprite.CLICK);
        };
        TextSprite.prototype.setCopy = function (copy) {
            _super.prototype.setCopy.call(this, copy);
            var color = copy[this.data.copy_key];
            this.copySpan.html(color);
        };
        return TextSprite;
    })(Nickel.ParallaxSprite);
    Nickel.TextSprite = TextSprite;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var QuestionText = (function (_super) {
        __extends(QuestionText, _super);
        function QuestionText(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.setContent(Main.templates.find('.questionText').clone());
            this.delegate.on(Nickel.Question.SET_COPY, $.proxy(this.setCopy, this), this);
            this.hideDelay = 400;
        }
        return QuestionText;
    })(Nickel.Component);
    Nickel.QuestionText = QuestionText;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var Popup = (function (_super) {
        __extends(Popup, _super);
        function Popup(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.setContent(Main.templates.find('.popup').clone());
            this.delegate.on(Nickel.Question.INIT, $.proxy(this.init, this), this);
            this.delegate.on(Nickel.Question.SET_COPY, $.proxy(this.setCopy, this), this);
            this.content.addClass(this.data.color);
            this.hideDelay = 650;
        }
        Popup.prototype.setCopy = function (copy) {
            _super.prototype.setCopy.call(this, copy);
            this.content.find(".copy").html(this.copy[this.data.copy_key]);
        };
        Popup.prototype.init = function () {
            this.delegate.on(Nickel.Question.RESIZE, $.proxy(this.position, this), this);
            this.position();
        };
        Popup.prototype.position = function () {
            this.width = this.content.width();
            this.height = this.content.height();
            var vOffset, hOffset;
            //vertical offset
            if (this.data.vAlign) {
                if (typeof this.data.vAlign === "string") {
                    if (this.data.vAlign == "top") {
                        vOffset = 0;
                    }
                    else if (this.data.vAlign == "bottom") {
                        vOffset = -this.height;
                    }
                    else {
                        vOffset = (-this.height / 2);
                    }
                }
                else if (typeof this.data.vAlign === "number") {
                    vOffset = this.data.vAlign * this.height;
                }
                else {
                    vOffset = -(this.height / 2);
                }
            }
            else {
                vOffset = -(this.height / 2);
            }
            //horizontal offset
            if (this.data.hAlign) {
                if (typeof this.data.hAlign === "string") {
                    if (this.data.hAlign == "left") {
                        hOffset = 0;
                    }
                    else if (this.data.hAlign == "right") {
                        hOffset = -this.width;
                    }
                    else {
                        hOffset = (-this.width / 2);
                    }
                }
                else if (typeof this.data.hAlign === "number") {
                    hOffset = this.data.hAlign * this.width;
                }
                else {
                    hOffset = -(this.width / 2);
                }
            }
            else {
                hOffset = -(this.width / 2);
            }
            var x = (this.delegate.width * this.data.x) + hOffset;
            var y = (this.delegate.height * this.data.y) + vOffset;
            this.content.css({
                'top': y,
                'left': x,
            });
        };
        Popup.LOADED = "bgspriteloaded";
        Popup.ERROR = "bgspriterror";
        return Popup;
    })(Nickel.Component);
    Nickel.Popup = Popup;
})(Nickel || (Nickel = {}));
;

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var ResponseText = (function (_super) {
        __extends(ResponseText, _super);
        function ResponseText(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.setContent(Main.templates.find('.response').clone());
            this.delegate.on(Nickel.Question.SET_COPY, $.proxy(this.setCopy, this), this);
            this.hideDelay = 600;
        }
        ResponseText.prototype.setCopy = function (copy) {
            _super.prototype.setCopy.call(this, copy);
            this.content.find('.copy').html(this.copy[this.data.copy_key]);
        };
        return ResponseText;
    })(Nickel.Component);
    Nickel.ResponseText = ResponseText;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var Countdown = (function (_super) {
        __extends(Countdown, _super);
        function Countdown(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.from = 3;
            this.numbers = [];
            console.log("new countdown");
            this.setContent(Main.templates.find('.countdown').clone());
            this.delegate.on(Nickel.Question.SET_COPY, $.proxy(this.setCopy, this), this);
            this.hideDelay = 600;
            this.addNumbers();
        }
        Countdown.prototype.addNumbers = function () {
            for (var i = 0; i < this.from; i++) {
                var num = $('<div class = "num">' + (i + 1) + '<span>');
                this.numbers.push(num);
                this.content.find('.copy').append(num);
            }
        };
        Countdown.prototype.showMe = function () {
            _super.prototype.showMe.call(this);
            console.log("show countdown");
            var showDly = 500;
            var hideDly = 1000;
            for (var i = this.numbers.length; i > 0; i--) {
                this.animateNumber(showDly, hideDly, this.numbers[i - 1]);
                showDly += 1500;
                hideDly += 1500;
            }
        };
        Countdown.prototype.animateNumber = function (s, h, n) {
            setTimeout(function () {
                n.addClass('show');
            }, s);
            setTimeout(function () {
                n.addClass('hide').removeClass('show');
            }, h);
        };
        return Countdown;
    })(Nickel.Component);
    Nickel.Countdown = Countdown;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var Intro = (function (_super) {
        __extends(Intro, _super);
        function Intro(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.secondaryBottom = 320;
            this.secondaryLeft = 615;
            this.secondaryWidth = 1514;
            this.secondaryHeight = 924;
            this.parallaxMode = true;
            this.introHeight = 0;
            this.totalScrollTime = 10000;
            this.playingAnimation = false;
            this.offBottom = false;
            this.content.addClass('intro');
        }
        Intro.prototype.init = function () {
            this.container.append(this.content);
            this.content.append(this.bgElements);
            //add the sprites to the background layers
            this.secondaryHolder = $('<div class = "sprite secondaryHolder"></div>');
            this.secondaryHolder.css('z-index', 50);
            if (this.parallaxMode) {
                this.secondaryHolder[0].style[Main.xform] = 'scale(0.75, 0.75)';
                addWheelListener(document, $.proxy(this.playScrollAnimation, this), false);
            }
            else {
                //add the listener for scrolling to the bottom of hte page
                $(window).bind('scroll', $.proxy(this.scrollMobile, this));
            }
            this.content.append(this.secondaryHolder);
            this.secondary = new Nickel.IntroSecondary(this.secondaryHolder, this.data.secondary, this);
            this.secondary.init();
            this.secondary.introSprite.on(Nickel.SpriteCharacter.LOADED, $.proxy(this.mediaLoaded, this), this);
            this.secondary.introSprite.on(Nickel.SpriteCharacter.ERROR, $.proxy(this.mediaLoaded, this), this);
            this.prompt = new Nickel.IntroPrompt(this.ui.find('.parallaxContainer'), {}, this);
            this.prompt.content.bind('click touchstart', $.proxy(this.playScrollAnimation, this));
            this.addBackgroundSprites();
            this.mediaToLoad += 4; //add 4 for the intro sprites
            this.addText();
            this.dispatch(Nickel.Question.INIT);
        };
        Intro.prototype.scrollMobile = function () {
            if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                $(window).unbind('scroll');
                this.delegate.proceed();
            }
        };
        Intro.prototype.showMe = function () {
            _super.prototype.showMe.call(this);
            Main.introOn = true;
            this.secondary.showMe();
            this.question.showMe();
            this.prompt.showMe();
        };
        Intro.prototype.hideMe = function () {
            _super.prototype.hideMe.call(this);
            this.bgElements;
            Main.introOn = false;
            this.secondary.hideMe();
        };
        Intro.prototype.addText = function () {
            this.question = new Nickel.IntroText(this.ui.find('.parallaxContainer'), {}, this);
        };
        Intro.prototype.setCopy = function (copy) {
            //override the default copy because this sections copy is on a higher level. 
            var c = Main.copy[this.data.copy_key];
            _super.prototype.setCopy.call(this, c);
            // this.dispatch(Question.SET_COPY, this.copy);
        };
        Intro.prototype.scroll = function (data) {
            if (data.curTop >= this.introHeight && this.onStage) {
                this.delegate.proceed();
            }
        };
        Intro.prototype.killMe = function () {
            this.bgElements.remove();
            this.bgElements = null;
            this.question.killMe();
            this.spriteLeft = null;
            this.spriteRight = null;
            this.question = null;
            EventBus.dispatchEvent(Intro.KILL_INTRO);
            this.delegate.sections[this.data.index] = null;
        };
        Intro.prototype.playScrollAnimation = function () {
            var _this = this;
            if (!this.playingAnimation) {
                this.playingAnimation = true;
                this.content[0].style[Main.xform] = 'translateY(-' + (this.maxHeight) + 'px)';
                this.secondaryHolder[0].style[Main.xform] = 'scale(1,1)';
                this.dispatch(Intro.PLAY_ANIMATION);
                this.prompt.hideMe();
                setTimeout(function () {
                    _this.delegate.proceed();
                }, this.totalScrollTime + 500);
            }
        };
        /**
         * Positions this view to always fill the screen.
         */
        Intro.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            this.introHeight = (this.parallaxMode) ? height * 5 : height * 3;
            this.maxHeight = height * 3;
            this.bgElements.css('height', this.introHeight);
            this.content.css('height', this.introHeight);
            if (this.secondaryHolder) {
                this.secondaryHolder.css({
                    'width': width,
                    'height': height,
                    'bottom': this.height,
                    'left': 0
                });
                this.secondary.resize(width, height);
            }
            ;
            var time = this.totalScrollTime * 0.6;
            var sTime = this.totalScrollTime * 0.2;
            var isiOS = Utils.detectMobileOS();
            if (isiOS.os == 'iOS') {
                height = height + 10;
            }
            if (this.prompt)
                this.prompt.content.css('top', height);
            if (this.parallaxMode) {
                this.content.css('position', 'fixed');
                var main = Main.cssXform + ' ' + time + 'ms ' + Utils.ease.easeInOutQuad;
                this.content[0].style[Main.transition] = main;
                if (this.secondaryHolder) {
                    var secondary = Main.cssXform + ' ' + sTime + 'ms ' + Utils.ease.easeOutQuad + ' ' + (time * 0.6) + 'ms';
                    this.secondaryHolder[0].style[Main.transition] = secondary;
                }
                if (!this.playingAnimation) {
                    this.dispatch(Intro.SET_ANIMATION); //write the skrollr tags
                }
                else {
                    this.dispatch(Intro.PLAY_ANIMATION); //write the skrollr tags
                }
            }
        };
        Intro.SET_ANIMATION = "setanimation";
        Intro.KILL_INTRO = "killintro";
        Intro.PLAY_ANIMATION = "playanim";
        return Intro;
    })(Nickel.Question);
    Nickel.Intro = Intro;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var IntroSecondary = (function (_super) {
        __extends(IntroSecondary, _super);
        function IntroSecondary(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.offBottom = false;
            this.delegate.on(Nickel.Intro.SET_ANIMATION, $.proxy(this.setAnimation, this), this);
            this.delegate.on(Nickel.Intro.PLAY_ANIMATION, $.proxy(this.playAnimation, this), this);
            this.delegate.on(Nickel.Question.SET_COPY, $.proxy(this.setCopy, this), this);
            this.bgElements.addClass('secondary');
        }
        IntroSecondary.prototype.setAnimation = function () {
            var scope = this;
            var startAttr = 'data-' + (this.delegate.introHeight - this.delegate.height);
            var endAttr = 'data-' + this.delegate.introHeight;
            var time = this.delegate.totalScrollTime * 0.15;
            var dly = this.delegate.totalScrollTime * 0.75;
            this.bgElements.each(function (i) {
                var transition = Main.cssXform + ' ' + time + 'ms ' + Utils.ease.easeInOutQuad + ' ' + dly + 'ms';
                $(this)[0].style[Main.transition] = transition;
            });
        };
        IntroSecondary.prototype.playAnimation = function () {
            var scope = this;
            this.bgElements.each(function (i) {
                var end = (scope.height * 0.8) * scope.parallaxScalars[i];
                var e = 'translateY(-' + end + 'px)';
                $(this)[0].style[Main.xform] = e;
            });
        };
        IntroSecondary.prototype.init = function () {
            this.container.append(this.content);
            this.content.append(this.bgElements);
            //add the sprites to the background layers
            this.addBackgroundSprites();
            if (!this.introSprite) {
                this.introSprite = new Nickel.IntroSprite(this.ui.find('.parallaxContainer'), this.data.sprites, this);
            }
            this.secondaryText = new Nickel.SecondaryText(this.bg.find('.parallaxContainer'), {}, this);
            this.midText = new Nickel.MidText(this.ui.find('.parallaxContainer'), {}, this);
            this.addText();
            this.dispatch(Nickel.Question.INIT);
        };
        IntroSecondary.prototype.killMe = function () {
            this.bgElements.remove();
            this.bgElements = null;
            this.introSprite.killMe();
            this.secondaryText.killMe();
        };
        IntroSecondary.prototype.addText = function () {
        };
        IntroSecondary.prototype.setCopy = function (copy) {
            //override the default copy because this sections copy is on a higher level. 
            var c = Main.copy[this.data.copy_key];
            _super.prototype.setCopy.call(this, c);
            this.dispatch(Nickel.Question.SET_COPY, this.copy);
        };
        /**
         * Positions this view to always fill the screen.
         */
        IntroSecondary.prototype.resize = function (width, height) {
            _super.prototype.resize.call(this, width, height);
            this.bgElements.css('height', height * 2);
        };
        IntroSecondary.prototype.hideMe = function () {
            var _this = this;
            this.bgElements.each(function (i) {
                $(this)[0].style[Main.transition] = Main.cssXform + ' 2100ms cubic-bezier(0.545, 0.100, 0.000, 1.010)';
            });
            clearTimeout(this.hideTimeout);
            this.hideTimeout = setTimeout(function () {
                _this.offTop = true;
                var scope = _this;
                _this.bgElements.each(function (i) {
                    var top = (-(scope.height * 2) - scope.paddingHeight) * scope.parallaxScalars[i];
                    $(this)[0].style[Main.xform] = 'translateY(' + top + 'px)';
                });
            }, this.showDelay);
            //TODO, make the kill call work
            clearTimeout(this.killTimeout);
            this.killTimeout = setTimeout($.proxy(this.killMe, this), 4000);
        };
        IntroSecondary.prototype.showMe = function () {
            _super.prototype.showMe.call(this);
            if (this.introSprite) {
                this.introSprite.play();
            }
        };
        return IntroSecondary;
    })(Nickel.Question);
    Nickel.IntroSecondary = IntroSecondary;
})(Nickel || (Nickel = {}));
;

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var IntroSprite = (function (_super) {
        __extends(IntroSprite, _super);
        function IntroSprite(container, data, id) {
            _super.call(this, container, data, id);
            this.spriteWidth = 960;
            this.spriteHeight = 378;
            this.spriteData = {};
            this.sprites = {};
            this.scalar = 1;
        }
        IntroSprite.prototype.checkBreakpoint = function (size) {
            for (var i = this.sizes.length; i >= 0; i--) {
                if (size >= this.sizes[i]) {
                    if (i != this.spriteIndex) {
                        this.spriteIndex = i;
                        if (this.initialized) {
                            this.loadSprite();
                            this.loadImages();
                        }
                    }
                    break;
                }
            }
        };
        IntroSprite.prototype.init = function () {
            // create an new instance of a pixi stage
            this.stage = new PIXI.Container();
            // create a renderer instance
            var res = (Main.retina) ? 2 : 1;
            this.renderer = new PIXI.autoDetectRenderer(this.spriteWidth, this.spriteHeight, { 'transparent': true, "autoResize": true, "resolution": res });
            this.leaderHolder = new PIXI.Container();
            this.deskHolder = new PIXI.Container();
            this.chairsHolder = new PIXI.Container();
            // add the renderer view element to the DOM
            this.content.append(this.renderer.view);
            this.stage.addChild(this.chairsHolder);
            this.stage.addChild(this.leaderHolder);
            this.stage.addChild(this.deskHolder);
            //load the json
            this.loader = PIXI.loader; // pixi exposes a premade instance for you to use.
            this.loadSprite();
            this.loadImages();
        };
        IntroSprite.prototype.killMe = function () {
            for (var s in this.sprites) {
                this.sprites[s].destroy();
            }
            cancelAnimationFrame(this.raf);
            this.renderer.destroy();
            this.delegate.off(Nickel.Question.RESIZE, $.proxy(this.resize, this), this);
            this.delegate.off(Nickel.Question.SET_COPY, $.proxy(this.setCopy, this), this);
            this.delegate.off(Nickel.Question.INIT, $.proxy(this.init, this), this);
            EventBus.removeEventListener(Main.UPDATE_BREAK_POINT, $.proxy(this.checkBreakpoint, this), this);
        };
        IntroSprite.prototype.setContent = function (v) {
            _super.prototype.setContent.call(this, v);
            this.resize();
        };
        IntroSprite.prototype.play = function () {
            for (var s in this.sprites) {
                this.sprites[s].play();
            }
            this.raf = requestAnimationFrame($.proxy(this.animate, this));
        };
        IntroSprite.prototype.loadSprite = function () {
            this.scalar = 0.25 * (this.spriteIndex + 1);
            for (var i = 0; i < this.data.leaders.length; i++) {
                this.loadLeaderSprite(this.data.leaders[i]);
            }
        };
        IntroSprite.prototype.loadImages = function () {
            this.scalar = 0.25 * (this.spriteIndex + 1);
            var desk = this.getImgPath(this.data.desk.img);
            var chairs = this.getImgPath(this.data.chairs.img);
            //desk
            if (this.desk) {
                this.deskHolder.removeChild(this.desk);
                this.desk.destroy();
            }
            this.desk = new PIXI.Sprite.fromImage(desk);
            this.deskHolder.addChild(this.desk);
            this.desk.x = Math.round(this.data.desk.x * this.scalar);
            this.desk.y = Math.round(this.data.desk.y * this.scalar);
            this.desk.width = Math.round(this.data.desk.width * this.scalar);
            this.desk.height = Math.round(this.data.desk.height * this.scalar);
            //chairs
            if (this.chairs) {
                this.chairsHolder.removeChild(this.chairs);
                this.chairs.destroy();
            }
            this.chairs = new PIXI.Sprite.fromImage(chairs);
            this.chairsHolder.addChild(this.chairs);
            this.chairs.x = Math.round(this.data.chairs.x * this.scalar);
            this.chairs.y = Math.round(this.data.chairs.y * this.scalar);
            this.chairs.width = Math.round(this.data.chairs.width * this.scalar);
            this.chairs.height = Math.round(this.data.chairs.height * this.scalar);
        };
        IntroSprite.prototype.getImgPath = function (path) {
            if (Main.retina || this.data.force_retina)
                path = path.replace('.', '@2x.'); //add in @2x if we're in retina mode
            path = path.replace(".", "_" + this.sizes[this.spriteIndex] + "."); //add in the _spriteIndex to the name
            return path;
        };
        IntroSprite.prototype.loadLeaderSprite = function (d) {
            var name = d.sprite.name;
            name += this.suffixes[this.spriteIndex];
            var data = d.sprite.sprite_data;
            data = data.replace(".", this.suffixes[this.spriteIndex] + ".");
            if (Main.retina) {
                name += "@2x";
                data = data.replace(".", '@2x.');
            }
            this.spriteData[d.id] = {
                "name": name,
                "sprite_data": data,
                "x": d.x,
                "y": d.y
            };
            //if the texture is alreay in the loader, just use it, if not, load it.
            if (!this.loader.resources[name]) {
                this.loader.add(name, data);
                this.loader.once('complete', $.proxy(this.makeLeaderSprite, this, d.id));
                this.loader.load();
            }
            else {
                this.makeLeaderSprite(d.id, null, this.loader.resources);
            }
        };
        IntroSprite.prototype.makeLeaderSprite = function (id, loader, resources) {
            var arr = _.toArray(resources[this.spriteData[id].name].textures);
            var first = arr[0];
            if (this.sprites[id]) {
                this.leaderHolder.removeChild(this.sprites[id]);
                this.sprites[id] = null;
            }
            if (first) {
                var sprite = new PIXI.extras.MovieClip(arr);
                sprite.animationSpeed = 0.4; //24 fps appx
                var w = Math.round(first.width);
                var h = Math.round(first.height);
                var x = Math.round(this.spriteData[id].x * this.scalar);
                var y = Math.round(this.spriteData[id].y * this.scalar);
                this.spriteData[id].width = w;
                this.spriteData[id].height = h;
                sprite.x = x;
                sprite.y = y;
                sprite.width = w;
                sprite.height = h;
                this.leaderHolder.addChild(sprite);
                this.resize();
                this.renderer.render(this.stage);
                this.sprites[id] = sprite;
                this.dispatch(Nickel.SpriteCharacter.LOADED);
            }
            else {
                this.renderer.resize(0, 0);
                this.dispatch(Nickel.SpriteCharacter.ERROR);
            }
        };
        IntroSprite.prototype.resize = function () {
            if (this.renderer)
                this.renderer.resize(Math.round(this.spriteWidth * this.scalar), Math.round(this.spriteHeight * this.scalar));
            var contWidth = this.delegate.delegate.delegate.sWidth;
            var contHeight = this.delegate.delegate.delegate.sHeight;
            var w = Math.round(this.spriteWidth * this.scalar);
            var h = Math.round(this.spriteHeight * this.scalar);
            var x = Math.round((contWidth * 0.5) - (w / 2));
            var y = Math.round((contHeight * 0.5) - (h / 2));
            this.content.css({
                'width': w,
                'height': h,
                'top': y,
                'left': x
            });
        };
        return IntroSprite;
    })(Nickel.SpriteCharacter);
    Nickel.IntroSprite = IntroSprite;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var IntroText = (function (_super) {
        __extends(IntroText, _super);
        function IntroText(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.startAttr = "";
            this.endAttr = "";
            this.setContent(Main.templates.find('.introText').clone());
            this.delegate.on(Nickel.Question.SET_COPY, $.proxy(this.setCopy, this), this);
            this.delegate.on(Nickel.Intro.SET_ANIMATION, $.proxy(this.setAnimation, this), this);
            this.delegate.on(Nickel.Intro.PLAY_ANIMATION, $.proxy(this.playAnimation, this), this);
            this.hideDelay = 400;
        }
        IntroText.prototype.setCopy = function (copy) {
            _super.prototype.setCopy.call(this, copy);
            this.content.find('.headline').html(this.copy.headline);
        };
        IntroText.prototype.playAnimation = function () {
            this.content[0].style[Main.xform] = 'translateY(-600%)';
        };
        IntroText.prototype.setAnimation = function () {
            var xform = Main.cssXform + ' ' + (this.delegate.totalScrollTime / 2) + 'ms ' + Utils.ease.easeInQuad;
            this.content[0].style[Main.transition] = xform;
        };
        IntroText.prototype.showMe = function () {
            _super.prototype.showMe.call(this);
            this.content.find('.headline').textillate({
                minDisplayTime: 1000,
                initialDelay: 500,
                autoStart: true,
                in: {
                    // set the effect name
                    effect: 'fadeInUp',
                    delayScale: 1.2,
                    delay: 40,
                },
                out: {
                    effect: 'fadeOutDown',
                    delayScale: 1.2,
                    delay: 40,
                }
            });
        };
        return IntroText;
    })(Nickel.Component);
    Nickel.IntroText = IntroText;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var SecondaryText = (function (_super) {
        __extends(SecondaryText, _super);
        function SecondaryText(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.startAttr = "";
            this.endAttr = "";
            this.setContent(Main.templates.find('.secondaryText').clone());
            this.delegate.on(Nickel.Question.SET_COPY, $.proxy(this.setCopy, this), this);
            this.delegate.delegate.on(Nickel.Intro.SET_ANIMATION, $.proxy(this.setAnimation, this), this);
            this.delegate.delegate.on(Nickel.Intro.PLAY_ANIMATION, $.proxy(this.playAnimation, this), this);
            this.hideDelay = 400;
        }
        SecondaryText.prototype.setAnimation = function () {
            var scope = this;
            var time = this.delegate.delegate.totalScrollTime * 0.05;
            var dly = this.delegate.delegate.totalScrollTime * 0.85;
            var transform = 'opacity ' + time + 'ms ' + Utils.ease.easeOutQuad + ' ' + dly + 'ms';
            this.content[0].style[Main.transition] = transform;
            this.content.css('opacity', 0);
        };
        SecondaryText.prototype.playAnimation = function () {
            this.content.css('opacity', 1);
        };
        SecondaryText.prototype.showMe = function () {
            _super.prototype.showMe.call(this);
            this.content.find('.headline').textillate({
                minDisplayTime: 1000,
                initialDelay: 500,
                autoStart: true,
                in: {
                    // set the effect name
                    effect: 'fadeInUp',
                    delayScale: 1.2,
                    delay: 40,
                },
                out: {
                    effect: 'fadeOutDown',
                    delayScale: 1.2,
                    delay: 40,
                }
            });
        };
        return SecondaryText;
    })(Nickel.Component);
    Nickel.SecondaryText = SecondaryText;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var MidText = (function (_super) {
        __extends(MidText, _super);
        function MidText(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.setContent(Main.templates.find('.midText').clone());
            this.delegate.on(Nickel.Question.SET_COPY, $.proxy(this.setCopy, this), this);
            this.hideDelay = 400;
        }
        return MidText;
    })(Nickel.Component);
    Nickel.MidText = MidText;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var IntroPrompt = (function (_super) {
        __extends(IntroPrompt, _super);
        function IntroPrompt(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.setContent(Main.templates.find('.introPrompt').clone());
            this.delegate.on(Nickel.Question.SET_COPY, $.proxy(this.setCopy, this), this);
            this.hideDelay = 400;
        }
        return IntroPrompt;
    })(Nickel.Component);
    Nickel.IntroPrompt = IntroPrompt;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.setContent(Main.templates.find('.progress').clone());
            this.bar = this.content.find('.bar');
            this.hideDelay = 1200;
        }
        ProgressBar.prototype.update = function (perc) {
            var w = this.delegate.sWidth * perc;
            // this.bar.css('width', w);
            TweenMax.to(this.bar, 0.5, { scaleX: perc });
        };
        return ProgressBar;
    })(Nickel.Component);
    Nickel.ProgressBar = ProgressBar;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var PetitionOverlay = (function (_super) {
        __extends(PetitionOverlay, _super);
        function PetitionOverlay(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.filmLink = "";
            this.copyKey = "";
            this.filmIsHidden = false;
            this.setContent(Main.templates.find('.petition').clone());
            $(window).bind('resize', $.proxy(this.resize, this));
            this.resize();
            this.hideDelay = 700;
        }
        PetitionOverlay.prototype.hideUndecided = function () {
            this.scrollPrompt.hideMe();
        };
        PetitionOverlay.prototype.hideFilmBtn = function () {
            this.btnFilm.hide();
            this.filmIsHidden = true;
            this.resize();
        };
        PetitionOverlay.prototype.onScroll = function () {
            if (this.onStage) {
                this.hideMe();
            }
        };
        PetitionOverlay.prototype.setCopy = function (copy) {
            _super.prototype.setCopy.call(this, copy);
            this.scrollPrompt.setCopy(copy);
            this.setFilmName();
        };
        PetitionOverlay.prototype.setVideo = function (link, key) {
            this.copyKey = key;
            this.filmLink = link;
            this.setFilmName();
        };
        PetitionOverlay.prototype.setFilmName = function () {
            this.content.find('.filmName').html(this.copy[this.copyKey]);
        };
        PetitionOverlay.prototype.setContent = function (v) {
            _super.prototype.setContent.call(this, v);
            this.btnFilm = this.content.find('.btnFilm').bind('click touchstart', $.proxy(this.filmClicked, this));
            this.btnSign = this.content.find('.btnSign').bind('click touchstart', $.proxy(this.signClicked, this));
            this.scrollPrompt = new Nickel.ScrollPrompt(this.content, {
                "hAlign": "center",
                "vAlign": "bottom",
                "x": 0,
                "y": -50
            }, this);
            if (!Modernizr.touch) {
                this.petitionSound = new buzz.sound("/sound/sign_petition", {
                    formats: ["mp3"],
                    loop: false,
                    preload: true,
                    autoplay: false,
                    volume: 65,
                    webAudioApi: false
                });
                this.petitionSound.load();
                this.filmSound = new buzz.sound("/sound/watch_film", {
                    formats: ["mp3"],
                    loop: false,
                    preload: true,
                    autoplay: false,
                    volume: 65,
                    webAudioApi: false
                });
                this.filmSound.load();
            }
        };
        PetitionOverlay.prototype.filmClicked = function () {
            EventBus.dispatchEvent(Nickel.VideoPlayer.LOAD_VIDEO, { "src": this.filmLink });
            ga('send', 'event', 'petition_overlay', 'click', 'watch_film', this.delegate.currentSection);
            if (this.filmSound)
                this.filmSound.play();
        };
        PetitionOverlay.prototype.signClicked = function () {
            Utils.pushState("/petition");
            ga('send', 'event', 'petition_overlay', 'click', 'sign_petition', this.delegate.currentSection);
            if (this.petitionSound)
                this.petitionSound.play();
            $('.container').off('touchmove', $.proxy(this.preventScroll, this));
        };
        PetitionOverlay.prototype.showMe = function () {
            _super.prototype.showMe.call(this);
            if (this.delegate.currentSection != 7) {
                this.scrollPrompt.showMe();
            }
            if (Modernizr.touch) {
                $('.container').on('touchmove ', $.proxy(this.preventScroll, this));
                this.disableScrolling();
            }
        };
        PetitionOverlay.prototype.hideMe = function () {
            _super.prototype.hideMe.call(this);
            this.scrollPrompt.hideMe();
            if (Modernizr.touch) {
                $('.container').off('touchmove', $.proxy(this.preventScroll, this));
                this.enableScrolling();
            }
        };
        PetitionOverlay.prototype.disableScrolling = function () {
            $('.container').css('overflow', 'hidden');
        };
        PetitionOverlay.prototype.enableScrolling = function () {
            $('.container').css('overflow', '');
        };
        PetitionOverlay.prototype.preventScroll = function (e) {
            e.preventDefault();
        };
        PetitionOverlay.prototype.resize = function () {
            var headerHeight = $('.header').height();
            var sHeight = $(window).height();
            var sWidth = $(window).width();
            var height = sHeight - headerHeight;
            this.content.css({
                'width': sWidth,
                'height': height,
                'top': headerHeight
            });
            var leftOffset = 0.25;
            var os = Utils.detectMobileOS();
            if (!Main.config.deviceType || os.os == "iOS" || os.os == "android") {
                leftOffset = 0.28;
            }
            if (this.filmIsHidden) {
                leftOffset = 0.50;
            }
            this.btnSign.css({
                'left': sWidth * leftOffset,
                'top': height / 2
            });
            this.btnFilm.css({
                'left': sWidth * 0.75,
                'top': height / 2
            });
        };
        return PetitionOverlay;
    })(Nickel.Component);
    Nickel.PetitionOverlay = PetitionOverlay;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var Header = (function (_super) {
        __extends(Header, _super);
        function Header(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.menuOn = false;
            this.setContent(Main.templates.find('.header').clone());
            EventBus.addEventListener(Main.UPDATE_COPY, $.proxy(this.setCopy, this), this);
            EventBus.addEventListener(Header.SET_ACTIVE, $.proxy(this.setActive, this), this);
            EventBus.addEventListener(Header.UNSET_ACTIVE, $.proxy(this.unsetActive, this), this);
            EventBus.addEventListener(Header.TOGGLE_MENU, $.proxy(this.toggleMenu, this), this);
            $(window).bind('resize', $.proxy(this.resize, this));
            this.resize();
            this.loadAnimation();
            this.content.find('.btnPetition').bind('click', function () {
                ga('send', 'event', 'header', 'click', 'sign_petition');
                Utils.pushState("/petition");
            });
            this.content.find('.logo').bind('click', function () {
                Utils.pushState("/");
                location.reload();
            });
            this.content.find('.btnGallery').bind('click', function () {
                ga('send', 'event', 'header', 'click', 'gallery');
                Utils.pushState("/gallery");
            });
            var e = (Modernizr.touch) ? 'touchstart' : 'click';
            this.content.find('.btnMenu').bind(e, $.proxy(this.toggleMenu, this));
            this.content.find('.btnInvolved').bind(e, $.proxy(this.involvedClicked, this));
            this.content.find('.logo').bind(e, $.proxy(this.logoClicked, this));
        }
        Header.prototype.loadAnimation = function () {
            var _this = this;
            if (Main.config.browser == "chrome") {
                this.animation = $('<video width = "90px" height = "90px" src = "/mov/sign_pet_anm.mp4" autoplay preload loop></video>');
                this.animation.on('canplaythrough', function () { return _this.animationLoaded(); });
                this.animation[0].load();
            }
            else {
                var img = new Image();
                this.animation = $(img);
                img.onload = function () { return _this.animationLoaded(); };
                img.src = "/img/sign_pet_anim.gif";
            }
        };
        Header.prototype.animationLoaded = function () {
            this.animation.css('width', 90).css('height', 90);
            this.content.find('.icon').append(this.animation);
        };
        Header.prototype.setActive = function (active) {
            this.content.find(".btn" + Utils.capitalise(active)).addClass('active');
        };
        Header.prototype.unsetActive = function (active) {
            this.content.find(".btn" + Utils.capitalise(active)).removeClass('active');
        };
        Header.prototype.setCopy = function (copy) {
            _super.prototype.setCopy.call(this, copy);
            if (this.menu) {
                this.menu.setCopy(copy);
            }
            if (!this.onStage) {
                this.showMe();
            }
        };
        Header.prototype.resize = function () {
            Header.height = this.content.height();
            if (this.menu) {
                this.menu.resize();
            }
        };
        Header.prototype.involvedClicked = function () {
            ga('send', 'event', 'header', 'click', 'get_involved');
        };
        Header.prototype.logoClicked = function () {
            ga('send', 'event', 'header', 'click', 'logo');
        };
        Header.prototype.toggleMenu = function () {
            if (this.menuOn) {
                this.menu.hideMe();
            }
            else {
                if (this.menu) {
                    this.menu.showMe();
                }
                else {
                    this.menu = new Nickel.MobileMenu(this.container, {}, this);
                    this.resize();
                    this.menu.setCopy(this.copy);
                    this.menu.showMe();
                }
            }
            this.menuOn = !this.menuOn;
        };
        Header.SET_ACTIVE = "setactiveheader";
        Header.UNSET_ACTIVE = "unsetactiveheader";
        Header.TOGGLE_MENU = "togglemenu";
        return Header;
    })(Nickel.Component);
    Nickel.Header = Header;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var Footer = (function (_super) {
        __extends(Footer, _super);
        function Footer(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.actions = 0;
            this.langOpen = false;
            this.setContent(Main.templates.find('.footer').clone());
            // this.content.find('.langSelect').on('change', $.proxy(this.updateLang, this));
            EventBus.addEventListener(Main.UPDATE_COPY, $.proxy(this.setCopy, this), this);
            EventBus.addEventListener(Footer.HIDE_FOOTER, $.proxy(this.hideMe, this), this);
            EventBus.addEventListener(Footer.SHOW_FOOTER, $.proxy(this.showMe, this), this);
            this.languages = this.content.find('.languages');
            this.content.find('.languageSelect .active').bind('click', $.proxy(this.toggleLanguageDropdown, this));
            this.content.find('.languages .lang').bind('click', $.proxy(this.updateLang, this));
            this.content.find('.btnTwitter').bind('click', $.proxy(this.twitterClicked, this));
            this.content.find('.btnGoogle').bind('click', $.proxy(this.googleClicked, this));
            this.content.find('.btnFacebook').bind('click', $.proxy(this.facebookClicked, this));
            this.content.find('.diamond').bind('click', function () {
                ga('send', 'event', 'footer', 'click', 'impact');
                Utils.pushState("/impact");
            });
            this.content.find('.terms').bind('click', $.proxy(this.termsClicked, this));
            this.content.find('.privacy').bind('click', $.proxy(this.privacyClicked, this));
            $(window).bind('resize', $.proxy(this.resize, this));
            this.resize();
            if (Main.config.browser == 'firefox') {
                this.content.addClass('ff');
            }
            if (Main.stats) {
                this.gotStats({ 'bind': Main.stats });
            }
            else {
                this.getStats();
            }
        }
        Footer.prototype.getStats = function () {
            Ajax.post(new AjaxRequest({
                'task': 'get-social-stats',
            }, $.proxy(this.gotStats, this), $.proxy(this.statsError, this), null, Main.config.statsURL));
        };
        Footer.prototype.gotStats = function (d) {
            this.actions = d.bind.stats.total;
        };
        Footer.prototype.statsError = function () {
            console.error("Error getting stats");
        };
        Footer.prototype.twitterClicked = function () {
            var tweet = Main.copy.share_copy.btn_twitter;
            Share.onTwitter(Main.config.baseUrl, tweet);
            var gaLabel = Main.config.baseUrl + "/" + Main.activeLang;
            ga('send', 'social', 'twitter', 'share', gaLabel);
        };
        Footer.prototype.googleClicked = function () {
            Share.onGoogle(Main.config.baseUrl + "/" + Main.activeLang);
            var gaLabel = Main.config.baseUrl + "/" + Main.activeLang;
            ga('send', 'social', 'google', 'share', gaLabel);
        };
        Footer.prototype.facebookClicked = function () {
            Share.onFacebook(Main.config.baseUrl + "/" + Main.activeLang);
            var gaLabel = Main.config.baseUrl + "/" + Main.activeLang;
            ga('send', 'social', 'facebook', 'share', gaLabel);
        };
        Footer.prototype.setCopy = function (copy) {
            _super.prototype.setCopy.call(this, copy);
            if (Main.activeLang != this.active) {
                this.content.find('.active').removeClass(this.active);
                this.active = Main.activeLang;
                this.content.find('.active').addClass(this.active);
            }
        };
        Footer.prototype.resize = function () {
            Footer.height = this.content.height();
        };
        Footer.prototype.toggleLanguageDropdown = function () {
            if (this.langOpen) {
                this.languages.hide();
            }
            else {
                this.languages.show();
            }
            this.langOpen = !this.langOpen;
        };
        Footer.prototype.termsClicked = function () {
            ga('send', 'event', 'footer', 'click', 'terms_and_conditions');
        };
        Footer.prototype.privacyClicked = function () {
            ga('send', 'event', 'footer', 'click', 'privacy_policy');
        };
        Footer.prototype.updateLang = function (e) {
            var targ = $(e.currentTarget);
            var lang = targ.attr('data-code');
            var gaLabel = 'lang_toggle_' + lang;
            ga('send', 'event', 'footer', 'click', gaLabel);
            this.toggleLanguageDropdown();
            var page = History['getState']().url.split("/")[4];
            if (!page)
                page = "";
            Utils.pushState('/' + lang + "/" + page, true);
            if (Main.config.deviceType && Main.config.browser == 'other' && window.requestAnimationFrame) {
                location.reload();
            }
        };
        Footer.prototype.getIEVersion = function () {
            var agent = navigator.userAgent;
            var reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
            var matches = agent.match(reg);
            if (matches != null) {
                return { major: matches[1], minor: matches[2] };
            }
            return { major: "-1", minor: "-1" };
        };
        Footer.height = 0;
        Footer.HIDE_FOOTER = "hidefooter";
        Footer.SHOW_FOOTER = "showfooter";
        return Footer;
    })(Nickel.Component);
    Nickel.Footer = Footer;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    /**
     * Simple component for loading and playing an video file with a <video> tag.
     */
    var VideoPlayer = (function (_super) {
        __extends(VideoPlayer, _super);
        /**
         * Stores the global vars, sets the references to the video node, and loader.
         * @param container    	A jQuery object containing the parent div for this component.
         * @param data          The JSON data unique to this component.
         * @param delegate    	The Class that created this instance.
         */
        function VideoPlayer(container, data, delegate) {
            _super.call(this, container, data, delegate);
            /**
             * The url we're currently playing through the video node.
             */
            this.activeSrc = "";
            /**
             * If we should play the video as soon as it's loaded.
             */
            this.autoplay = false;
            /**
             * If the video is playing right now or not.
             */
            this.isPlaying = false;
            /**
             * Whether or not we should be checking the progress of the video as it plays. Disabled by default for performace reasons.
             */
            this.checkProgress = false;
            /**
             * What time we should start the video at.
             */
            this.startTime = 0;
            this.videoLink = "";
            this.setContent(Main.templates.find('.videoPlayer').clone());
            this.btnClose = this.content.find('.btnClose').bind('click', $.proxy(this.hideMe, this));
            EventBus.addEventListener(VideoPlayer.LOAD_VIDEO, $.proxy(this.loadVideo, this), this);
            $(window).bind('resize', $.proxy(this.resize, this));
            this.resize();
            this.hideDelay = 400;
            this.loader = this.content.find('.loader');
        }
        VideoPlayer.prototype.youtubePlayerReady = function () {
            this.player = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: this.videoLink,
                playerVars: { 'rel': 0 },
                events: {
                    'onReady': $.proxy(this.onPlayerReady, this),
                    'onStateChange': $.proxy(this.onPlayerStateChange, this)
                }
            });
        };
        VideoPlayer.prototype.setContent = function (v) {
            this.content = v;
            this.container.append(this.content);
        };
        VideoPlayer.prototype.onPlayerReady = function () {
            if (!Modernizr.touch) {
                this.player.playVideo();
            }
        };
        VideoPlayer.prototype.onPlayerStateChange = function (e) {
        };
        VideoPlayer.prototype.init = function () {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            this.initialized = true;
        };
        /**
         * Loads a video through the video node, binds the canplaythrough event.
         * @data 		The url and poster frame for the video we want to load.
         */
        VideoPlayer.prototype.loadVideo = function (data) {
            if (!this.onStage) {
                this.showMe();
            }
            this.videoLink = data.src;
            if (!this.initialized) {
                this.init();
            }
            else {
                this.player.loadVideoById(this.videoLink);
            }
        };
        /**
         * Plays the video node, if we're checking progress, sets the checkTimeInt.
         */
        VideoPlayer.prototype.playVideo = function () {
            this.player.playVideo();
            this.dispatch(VideoPlayer.PLAY);
        };
        /**
         * Pauses the video node.
         */
        VideoPlayer.prototype.pauseVideo = function () {
            this.player.pauseVideo();
        };
        /**
         * Shows the video node and hides the loader.
         */
        VideoPlayer.prototype.showVideo = function () {
            this.$videoNode.show();
            this.loader.hide();
        };
        /**
         * Hides the video node.
         */
        VideoPlayer.prototype.hideVideo = function () {
            this.videoNode.pause();
            this.$videoNode.hide();
        };
        /**
         * Shows the loades and hides the video node.
         */
        VideoPlayer.prototype.showLoader = function () {
            this.hideVideo();
            this.loader.show();
        };
        /**
         * Pauses the video and hides the component.
         */
        VideoPlayer.prototype.hideMe = function () {
            _super.prototype.hideMe.call(this);
            this.pauseVideo();
            if (Modernizr.touch) {
                $('.container').off('touchmove', $.proxy(this.preventScroll, this));
                this.enableScrolling();
            }
        };
        VideoPlayer.prototype.showMe = function () {
            _super.prototype.showMe.call(this);
            if (Modernizr.touch) {
                $('.container').on('touchmove ', $.proxy(this.preventScroll, this));
                this.disableScrolling();
            }
        };
        VideoPlayer.prototype.disableScrolling = function () {
            $('.container').css('overflow', 'hidden');
        };
        VideoPlayer.prototype.enableScrolling = function () {
            $('.container').css('overflow', '');
        };
        VideoPlayer.prototype.preventScroll = function (e) {
            e.preventDefault();
        };
        VideoPlayer.prototype.resize = function () {
            var padding = 60;
            var h = $(window).height() - Nickel.Header.height - padding * 2;
            this.content.css({
                'top': Nickel.Header.height,
                'height': h,
                'padding-top': padding,
                'padding-bottom': padding
            });
        };
        /**
         * Event Dispatched once the video node begins to play.
         */
        VideoPlayer.PLAY = "playvideo";
        /**
         * Event Dispatched once the video node reaches the end.
         */
        VideoPlayer.VIDEO_END = "videoend";
        /**
         * Event Dispatched on an interval as the video plays.
         */
        VideoPlayer.PROGRESS = "progress";
        VideoPlayer.LOAD_VIDEO = "globalloadvideo";
        return VideoPlayer;
    })(Nickel.Component);
    Nickel.VideoPlayer = VideoPlayer;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var PetitionView = (function (_super) {
        __extends(PetitionView, _super);
        function PetitionView(content, data, id) {
            _super.call(this, content, data, id);
            this.videos = [];
            this.btnClose = this.content.find('.btnClose').bind('click', $.proxy(this.closeClicked, this));
            // this.hideDelay = 800;
            this.hideDelay = 200;
            // iOS mobile hack
            var isiOS = Utils.detectMobileOS();
            if (isiOS.os == 'iOS') {
                this.content.addClass('iPhone');
            }
            if (Main.config.deviceType = "computer" && Main.config.browser == "other") {
                this.content.addClass('ie');
            }
            console.log(Main.config);
            // $("#petitionForm").submit(function(event) {
            //     	/* stop form from submitting normally */
            //     	event.preventDefault();
            //     	/* get some values from elements on the page: */
            //     	var $form = $( this ),
            //        url = $form.attr( 'action' );
            //     	/* Send the data using post */
            //     	var data = {
            //     		"organization_KEY":$("#key").val(),
            //     		"object":"supporter",
            //     		"Last_Name":$("#last_name").val(),
            //     		"Email":$("#email").val(),
            //     		"City":$("#city").val(),
            //     		"Country":$("#country").val(),
            //     		"first_name_949":"",
            //     		"link":"groups",
            //     		"linkKey":"8",
            //     }
            //     console.log(data);
            //     	var posting = $.post( url, data );
            //     	/* Alerts the results */
            //     	posting.done(function( data ) {
            //       		alert('success');
            //     	});
            //   	});
        }
        PetitionView.prototype.closeClicked = function () {
            Utils.pushState("/");
        };
        PetitionView.prototype.init = function () {
            this.initialized = true;
            this.updateCopy();
        };
        /**
         * Shows the view, if it hasn't been initializee, calls init().
         * @param subClass 		The sub view to display.
         */
        PetitionView.prototype.showMe = function (subClass) {
            _super.prototype.showMe.call(this, subClass);
            $(window).scrollTop(0);
            if (!this.initialized) {
                this.init();
            }
            EventBus.dispatchEvent(Nickel.Header.SET_ACTIVE, this.id);
            EventBus.dispatchEvent(Nickel.Footer.HIDE_FOOTER);
            this.enableScrolling();
            Main.tagHolder.empty();
            var axel = Math.random() + "";
            var a = axel * 10000000000000;
            Main.tagHolder.append('<iframe src="https://5195633.fls.doubleclick.net/activityi;src=5195633;type=petit0;cat=petit0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
        };
        PetitionView.prototype.enableScrolling = function () {
            $('.container').css('overflow', '');
        };
        PetitionView.prototype.hideMe = function () {
            _super.prototype.hideMe.call(this);
            EventBus.dispatchEvent(Nickel.Header.UNSET_ACTIVE, this.id);
        };
        return PetitionView;
    })(Nickel.View);
    Nickel.PetitionView = PetitionView;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var GalleryView = (function (_super) {
        __extends(GalleryView, _super);
        function GalleryView(content, data, id) {
            _super.call(this, content, data, id);
            this.videos = [];
            this.numPerPage = 6;
            this.pages = [];
            this.btnClose = this.content.find('.btnClose').bind('click', $.proxy(this.closeClicked, this));
            $(window).bind('resize', $.proxy(this.resize, this));
            this.pageHolder = this.content.find('.pages');
            this.btnNext = this.content.find('.btnNext').bind('click', $.proxy(this.nextClicked, this));
            this.btnPrevious = this.content.find('.btnPrevious').bind('click', $.proxy(this.previousClicked, this));
            this.hideDelay = 800;
        }
        GalleryView.prototype.nextClicked = function () {
            $(window).scrollTop(0);
            this.showPage(this.currentPage + 1);
        };
        GalleryView.prototype.previousClicked = function () {
            $(window).scrollTop(0);
            this.showPage(this.currentPage - 1);
        };
        GalleryView.prototype.showPage = function (pageNum) {
            this.currentPage = pageNum;
            if (this.activePage)
                this.activePage.hide();
            this.activePage = this.pages[pageNum - 1];
            this.activePage.show();
            this.checkButtons();
            this.resize();
        };
        GalleryView.prototype.checkButtons = function () {
            this.btnPrevious.removeClass('disabled');
            this.btnNext.removeClass('disabled');
            if (this.currentPage == 1) {
                this.btnPrevious.addClass('disabled');
            }
            else if (this.currentPage == this.totalPages) {
                this.btnNext.addClass('disabled');
            }
        };
        GalleryView.prototype.addVideos = function () {
            this.totalPages = Math.ceil(this.data.videos.length / this.numPerPage);
            for (var p = 0; p < this.totalPages; p++) {
                var container = $("<div class = 'page'></div>");
                for (var i = 0; i < this.numPerPage; i++) {
                    var d = this.data.videos[(p * this.numPerPage) + i];
                    if (d) {
                        var vid = new Nickel.GalleryVideo(container, d, this);
                        this.videos.push(vid);
                    }
                }
                this.pageHolder.append(container);
                this.pages.push(container);
            }
            this.showPage(1);
        };
        GalleryView.prototype.closeClicked = function () {
            Utils.pushState("/");
        };
        GalleryView.prototype.init = function () {
            this.initialized = true;
            this.data = Main.data.gallery;
            this.addVideos();
            this.updateCopy();
        };
        GalleryView.prototype.updateCopy = function () {
            _super.prototype.updateCopy.call(this);
            for (var i = 0; i < this.videos.length; i++) {
                this.videos[i].setCopy(this.copy);
            }
        };
        GalleryView.prototype.resize = function () {
            var w = $(window).width() - 40;
            for (var i = 0; i < this.videos.length; i++) {
                this.videos[i].resize(w);
            }
        };
        /**
         * Shows the view, if it hasn't been initializee, calls init().
         * @param subClass 		The sub view to display.
         */
        GalleryView.prototype.showMe = function (subClass) {
            _super.prototype.showMe.call(this, subClass);
            if (!this.initialized) {
                this.init();
            }
            $(window).scrollTop(0);
            EventBus.dispatchEvent(Nickel.Header.SET_ACTIVE, this.id);
            EventBus.dispatchEvent(Nickel.Footer.SHOW_FOOTER);
        };
        GalleryView.prototype.hideMe = function () {
            _super.prototype.hideMe.call(this);
            EventBus.dispatchEvent(Nickel.Header.UNSET_ACTIVE, this.id);
        };
        return GalleryView;
    })(Nickel.View);
    Nickel.GalleryView = GalleryView;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var GalleryVideo = (function (_super) {
        __extends(GalleryVideo, _super);
        function GalleryVideo(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.aspectRatio = 16 / 9;
            this.setContent(Main.templates.find('.galleryVideo').clone());
            this.vidHolder = this.content.find('.vidHolder');
            this.content.bind('click', $.proxy(this.playVid, this));
        }
        GalleryVideo.prototype.playVid = function () {
            EventBus.dispatchEvent(Nickel.VideoPlayer.LOAD_VIDEO, { "src": this.data.youtube_link });
            ga('send', 'event', 'gallery', 'click', 'video');
        };
        GalleryVideo.prototype.setCopy = function (copy) {
            _super.prototype.setCopy.call(this, copy);
            this.content.find('.caption').html(this.copy[this.data.copy_key]);
        };
        GalleryVideo.prototype.resize = function () {
            var w = this.content.width();
            this.vidHolder.css({
                'height': w / this.aspectRatio
            });
        };
        return GalleryVideo;
    })(Nickel.Component);
    Nickel.GalleryVideo = GalleryVideo;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var ImpactView = (function (_super) {
        __extends(ImpactView, _super);
        function ImpactView(content, data, id) {
            _super.call(this, content, data, id);
            this.leaders = [];
            this.global = 0;
            this.signatures = 0;
            this.tweets = 0;
            this.social = 0;
            this.youtube = 0;
            this.instagram = 0;
            this.btnClose = this.content.find('.btnClose').bind('click', $.proxy(this.closeClicked, this));
            this.hideDelay = 800;
            this.content.find(".stat.signatures").bind('click', function () {
                Utils.pushState('/petition');
            });
            this.content.find(".stat.tweets").bind('click', $.proxy(this.twitterClicked, this));
            this.content.find(".stat.social").bind('click', $.proxy(this.facebookClicked, this));
        }
        ImpactView.prototype.closeClicked = function () {
            Utils.pushState("/");
        };
        ImpactView.prototype.init = function () {
            //get the stats
            if (Main.stats) {
                this.gotStats({ 'bind': Main.stats });
            }
            else {
                this.getStats();
            }
            $(window).scrollTop(0);
            this.initialized = true;
            this.data = Main.data.impact;
            this.addLeaders();
            this.updateCopy();
            console.log(this.content);
            this.content.find('.stat').bind('click', $.proxy(this.statClicked, this));
        };
        ImpactView.prototype.getStats = function () {
            Ajax.post(new AjaxRequest({
                'task': 'get-social-stats',
            }, $.proxy(this.gotStats, this), $.proxy(this.statsError, this), null, Main.config.statsURL));
        };
        ImpactView.prototype.gotStats = function (d) {
            Main.stats = d.bind;
            this.instagram = d.bind.stats.instagram_posts;
            this.signatures = d.bind.stats.signatures;
            this.social = d.bind.stats.site_shares;
            this.tweets = d.bind.stats.tweets;
            this.youtube = d.bind.stats.youtube_views;
            this.global = d.bind.stats.total;
        };
        ImpactView.prototype.statClicked = function (e) {
            var className = e.target.className;
            var statType = className.split(' ');
            var gaLabel = 'stat_' + statType[1];
            ga('send', 'event', 'impact', 'click', gaLabel);
        };
        ImpactView.prototype.statsError = function () {
            console.error("Error getting stats");
        };
        ImpactView.prototype.updateCopy = function () {
            _super.prototype.updateCopy.call(this);
            for (var i = 0; i < this.leaders.length; i++) {
                this.leaders[i].setCopy(this.copy);
            }
        };
        ImpactView.prototype.twitterClicked = function () {
            var tweet = Main.copy.share_copy.btn_twitter;
            Share.onTwitter(Main.config.baseUrl, tweet);
            var gaLabel = Main.config.baseUrl + "/" + Main.activeLang;
            ga('send', 'social', 'twitter', 'share', gaLabel);
        };
        ImpactView.prototype.facebookClicked = function () {
            Share.onFacebook(Main.config.baseUrl + "/" + Main.activeLang);
            var gaLabel = Main.config.baseUrl + "/" + Main.activeLang;
            ga('send', 'social', 'facebook', 'share', gaLabel);
        };
        ImpactView.prototype.addLeaders = function () {
            for (var i = 0; i < this.data.leaders.length; i++) {
                this.data.leaders[i].index = i;
                var leader = new Nickel.Leader(this.content.find('.leaders'), this.data.leaders[i], this);
                leader.setCopy(this.copy);
                this.leaders.push(leader);
            }
        };
        /**
         * Shows the view, if it hasn't been initializee, calls init().
         * @param subClass 		The sub view to display.
         */
        ImpactView.prototype.showMe = function (subClass) {
            var _this = this;
            _super.prototype.showMe.call(this, subClass);
            if (!this.initialized) {
                this.init();
            }
            EventBus.dispatchEvent(Nickel.Footer.HIDE_FOOTER);
            setTimeout(function () {
                for (var i = 0; i < _this.leaders.length; i++) {
                    _this.leaders[i].showMe();
                }
                // var dly = 0;
                // this.content.find('.stat .number').each(function(){
                // 	console.log($(this));
                // 	$(this).counterUp({
                // 		delay: dly, 
                // 		time: 4000
                // 	});
                // 	dly+=500;
                // });
            }, 500);
        };
        ImpactView.prototype.hideMe = function () {
            var _this = this;
            _super.prototype.hideMe.call(this);
            setTimeout(function () {
                for (var i = 0; i < _this.leaders.length; i++) {
                    _this.leaders[i].hideMe();
                }
            }, 1000);
        };
        return ImpactView;
    })(Nickel.View);
    Nickel.ImpactView = ImpactView;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var Leader = (function (_super) {
        __extends(Leader, _super);
        function Leader(container, data, delegate) {
            var _this = this;
            _super.call(this, container, data, delegate);
            this.setContent(Main.templates.find('.leader').clone());
            this.sprite = new Image();
            this.sprite.onload = function () {
                var s = $(_this.sprite).css({
                    'width': _this.sprite.naturalWidth / 2,
                    'height': _this.sprite.naturalHeight / 2,
                    'margin-left': -(_this.sprite.naturalWidth / 4)
                });
                _this.content.find('.impactSprite').append(s);
            };
            this.sprite.src = this.data.sprite;
            this.displayClass = "inline-block";
            this.content.addClass('leader' + this.data.index);
            this.content.find('.btnTwitter').bind('click', $.proxy(this.twitterClicked, this));
            this.btnEmail = this.content.find('.btnEmail').bind('click', $.proxy(this.emailClicked, this));
        }
        Leader.prototype.setEmailShare = function () {
            var sub = this.copy.email_subject;
            var bod = this.copy.email_body;
            bod = bod.replace("[name]", this.copy[this.data.name_key]);
            this.btnEmail.attr("href", "mailto:" + this.data.email + "?subject=" + sub + "&body=" + bod);
        };
        Leader.prototype.twitterClicked = function () {
            var tweet = (this.data.twitter) ? this.data.twitter + " " + this.copy.tweet_copy : this.copy.tweet_copy;
            Share.onTwitter(Main.config.baseUrl, tweet);
            var countrykey = this.data.country_key;
            var country = countrykey.split('_');
            var gaLabel = "contact_leader_twtter_" + country[1];
            ga('send', 'event', 'impact', 'click', gaLabel);
        };
        Leader.prototype.emailClicked = function () {
            var countrykey = this.data.country_key;
            var country = countrykey.split('_');
            var gaLabel = "contact_leader_email_" + country[1];
            ga('send', 'event', 'impact', 'click', gaLabel);
        };
        Leader.prototype.setCopy = function (copy) {
            _super.prototype.setCopy.call(this, copy);
            this.content.find('.name').html(this.copy[this.data.name_key]);
            this.content.find('.countryName').html(this.copy[this.data.country_key]);
            this.setEmailShare();
        };
        return Leader;
    })(Nickel.Component);
    Nickel.Leader = Leader;
})(Nickel || (Nickel = {}));

///<reference path='../def/jquery.d.ts'/>
///<reference path='../def/modernizr.d.ts'/>
///<reference path='../def/custom.d.ts'/>
///<reference path='../def/greensock.d.ts'/>
///<reference path='../def/underscore.d.ts'/>
///<reference path='./scaffolding/Utils.ts'/>
///<reference path='./scaffolding/View.ts'/>
///<reference path='./scaffolding/Component.ts'/>
///<reference path='./scaffolding/Ajax.ts'/>
///<reference path='./scaffolding/Share.ts'/>
///<reference path='./scaffolding/VirtualScroll.ts'/>
///<reference path='./scaffolding/EventBus.ts'/>
//Climate
///<reference path='./views/climate/ClimateView.ts'/>
///<reference path='./views/climate/questions/Question.ts'/>
///<reference path='./views/climate/questions/QuestionOne.ts'/>
///<reference path='./views/climate/questions/QuestionTwo.ts'/>
///<reference path='./views/climate/questions/QuestionThree.ts'/>
///<reference path='./views/climate/questions/QuestionFour.ts'/>
///<reference path='./views/climate/questions/QuestionFive.ts'/>
///<reference path='./views/climate/questions/QuestionSix.ts'/>
///<reference path='./views/climate/questions/QuestionSeven.ts'/>
///<reference path='./views/climate/questions/SpriteCharacter.ts'/>
///<reference path='./views/climate/questions/ParallaxSprite.ts'/>
///<reference path='./views/climate/questions/TextSprite.ts'/>
///<reference path='./views/climate/questions/QuestionText.ts'/>
///<reference path='./views/climate/questions/Popup.ts'/>
///<reference path='./views/climate/questions/ResponseText.ts'/>
///<reference path='./views/climate/questions/Countdown.ts'/>
///<reference path='./views/climate/intro/Intro.ts'/>
///<reference path='./views/climate/intro/IntroSecondary.ts'/>
///<reference path='./views/climate/intro/IntroSprite.ts'/>
///<reference path='./views/climate/intro/IntroText.ts'/>
///<reference path='./views/climate/intro/SecondaryText.ts'/>
///<reference path='./views/climate/intro/MidText.ts'/>
///<reference path='./views/climate/intro/IntroPrompt.ts'/>
///<reference path='./views/climate/ProgressBar.ts'/>
///<reference path='./views/climate/PetitionOverlay.ts'/>
///<reference path='./views/climate/Header.ts'/>
///<reference path='./views/climate/Footer.ts'/>
///<reference path='./views/climate/VideoPlayer.ts'/>
///<reference path='./views/petition/PetitionView.ts'/>
///<reference path='./views/gallery/GalleryView.ts'/>
///<reference path='./views/gallery/GalleryVideo.ts'/>
///<reference path='./views/impact/ImpactView.ts'/>
///<reference path='./views/impact/Leader.ts'/>
///
var Main = (function () {
    /*
    Add the config variables and do any more global stuff here
    */
    function Main(config) {
        this.guid = "main";
        //set the php config variables
        Main.config = config;
        Main.mp4 = Utils.canPlayMP4();
        this.setPrefixes();
        this.rivets();
        Main.templates = $("#templates");
        Main.tagHolder = $("#tagHolder");
        Main.activeLang = History['getState']().url.split("/")[3];
        History['Adapter'].bind(window, 'statechange', $.proxy(this.stateChanged, this));
        if ($('html').hasClass('ie8') || $('html').hasClass('ie9')) {
            Main.cssAnimation = false;
        }
        if (window.devicePixelRatio >= 2.0) {
            Main.retina = true;
        }
        EventBus.addEventListener(Main.CHANGE_LANG, $.proxy(this.changeLang, this), this);
        $(window).bind('resize', $.proxy(this.resize, this));
        this.resize();
    }
    Main.prototype.stateChanged = function () {
        var lang = History['getState']().url.split("/")[3];
        if (lang != Main.activeLang) {
            this.changeLang(lang);
        }
    };
    Main.prototype.changeLang = function (lang) {
        Main.activeLang = lang;
        $.getJSON('/data/' + Main.activeLang + '.json', function (data) {
            Main.copy = data;
            EventBus.dispatchEvent(Main.UPDATE_COPY, Main.copy);
        });
    };
    Main.prototype.resize = function () {
        var w = $(window).width();
        for (var i = Main.breakpoints.length - 1; i >= 0; i--) {
            var p = Main.breakpoints[i];
            if (w >= p) {
                if (Main.activeBreakpoint != p) {
                    Main.activeBreakpoint = p;
                    EventBus.dispatchEvent(Main.UPDATE_BREAK_POINT, p);
                }
                break;
            }
        }
    };
    Main.prototype.init = function () {
        $.when($.getJSON('/data/config.json', function (data) {
            Main.data = data;
        }), $.getJSON('/data/' + Main.activeLang + '.json', function (data) {
            Main.copy = data;
        })).done(function () {
            EventBus.dispatchEvent(Main.UPDATE_COPY, Main.copy);
            History['Adapter'].trigger(window, 'statechange');
        });
    };
    Main.prototype.setPrefixes = function () {
        var view = document.createElement('div');
        var prefixes = ['webkit', 'Moz', 'O', 'ms'];
        for (var i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            var e = prefix + 'Transform';
            var t = prefix + 'Transition';
            if (typeof view.style[e] !== 'undefined') {
                Main.xform = e;
                Main.transition = t;
                Main.cssXform = "-" + prefix.toLowerCase() + '-transform';
            }
        }
        view = null;
    };
    Main.prototype.rivets = function () {
        rivets.binders.addclass = function (el, value) {
            if (el.addedClass) {
                $(el).removeClass(el.addedClass);
                delete el.addedClass;
            }
            if (value) {
                $(el).addClass(value);
                el.addedClass = value;
            }
        };
        rivets.formatters.climateNumber = function (value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
        rivets.formatters.footerTime = function (value) {
            var min = Math.floor(value / 60);
            var sec = Math.floor(value - (min * 60));
            var str = "0:00";
            if (sec < 10) {
                str = min + ":0" + sec;
            }
            else {
                str = min + ":" + sec;
            }
            return str;
        };
        rivets.formatters.aeTime = function (value) {
            //convert seconds to hh:mm:ss:ff
            var h = Math.floor(value / 3600); //Get whole hours
            value -= h * 3600;
            var m = Math.floor(value / 60); //Get remaining minutes
            value -= m * 60;
            var s = Math.floor(value / 1);
            value -= s;
            var f = Math.floor(24 * value);
            var hStr = (h < 10) ? "0" + h : h;
            var mStr = (m < 10) ? "0" + m : m;
            var sStr = (s < 10) ? "0" + s : s;
            var fStr = (f < 10) ? "0" + f : f;
            var str = hStr + ":" + mStr + ":" + sStr + ":" + fStr;
            return str;
        };
    };
    Main.mp4 = true;
    Main.preloaded = {};
    Main.cssAnimation = true;
    Main.retina = false;
    Main.introOn = true;
    //copy
    Main.activeLang = "en-us";
    Main.UPDATE_COPY = "updatecopy";
    //breakpoints
    Main.UPDATE_BREAK_POINT = "updatebreakpoint";
    Main.CHANGE_LANG = "changelangmain";
    Main.breakpoints = [320, 375, 500, 768, 1024, 1366, 1600];
    Main.activeBreakpoint = 320;
    return Main;
})();

var GA = (function () {
    function GA() {
    }
    GA.trackPage = function () {
        _gaq.push(['_trackPageview']);
    };
    GA.trackEvent = function (category, action, label) {
        _gaq.push(['_trackEvent', category, action, label]);
    };
    return GA;
})();

var Loader = (function () {
    function Loader(view) {
        this.view = view;
        this.init();
    }
    Loader.prototype.init = function () {
        this.hide();
    };
    Loader.prototype.show = function () {
        this.view.removeClass('hidden');
    };
    Loader.prototype.hide = function () {
        this.view.addClass('hidden');
    };
    return Loader;
})();

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite(content, data, delegate) {
            var _this = this;
            _super.call(this, content, data, delegate);
            this.atInc = 0;
            this.atFrame = 0;
            this.playing = false;
            this.hideDelay = 0;
            this.showDelay = 10;
            this.retina = window["devicePixelRatio"] > 1;
            this.img = new Image();
            this.img.onload = function () {
                _this.spriteWidth = _this.img.width;
                _this.spriteHeight = _this.img.height;
                _this.content.css('background-image', 'url(' + _this.data.src + ')');
                _this.resize();
            };
            this.img.src = (this.retina) ? this.data.src_retina : this.data.src;
        }
        Sprite.prototype.resize = function () {
            this.contWidth = this.content.width();
            this.contHeight = this.content.height();
            var ratio = this.contWidth / (this.spriteWidth / this.data.steps);
            var bg = (this.spriteWidth * ratio) + "px " + (this.spriteHeight * ratio) + "px";
            this.content.css('background-size', bg);
            this.data.height = this.contHeight;
            this.data.width = this.contWidth;
            this.updateFrame();
        };
        Sprite.prototype.play = function (cb) {
            if (cb === void 0) { cb = null; }
            this.playCallback = cb;
            this.atFrame = 0;
            this.playIntervalTime = 1000 / this.data.fps;
            this.playInterval = setInterval($.proxy(this.playFrame, this), this.playIntervalTime);
        };
        Sprite.prototype.playTo = function (target, cb) {
            if (cb === void 0) { cb = null; }
            this.playCallback = cb;
            this.targetFrame = target;
            this.playIntervalTime = 1000 / this.data.fps;
            this.playInterval = setInterval($.proxy(this.playToFrame, this), this.playIntervalTime);
        };
        Sprite.prototype.playToFrame = function () {
            if (this.atFrame > this.targetFrame - 1) {
                this.atFrame--;
                this.updateFrame();
            }
            else if (this.atFrame < this.targetFrame - 1) {
                this.atFrame++;
                this.updateFrame();
            }
            else {
                clearInterval(this.playInterval);
                if (this.playCallback)
                    this.playCallback();
            }
        };
        Sprite.prototype.playFrame = function () {
            this.atFrame++;
            if (this.atFrame == this.data.steps) {
                clearInterval(this.playInterval);
                if (this.playCallback)
                    this.playCallback();
            }
            else {
                this.updateFrame();
            }
        };
        Sprite.prototype.showMe = function () {
            _super.prototype.showMe.call(this);
            this.resize();
        };
        Sprite.prototype.increment = function (index, step, total) {
            this.total = total;
            this.atInc += step;
            var sections = this.data.steps;
            if (this.atInc > total)
                this.atInc = 0;
            if (this.atInc < 0)
                this.atInc = this.total;
            var perc = this.atInc / this.total;
            var frame = Math.floor(sections * perc);
            if (frame != this.atFrame) {
                this.atFrame = frame;
                this.updateFrame();
            }
        };
        Sprite.prototype.updateFrame = function () {
            //get the x pos of the sprite from the atFrame
            if (this.data.axis == "x") {
                var y = 0;
                var x = this.atFrame * this.data.width;
                var str = (-x) + 'px ' + y + 'px';
            }
            else if (this.data.axis == "y") {
                var y = this.atFrame * this.data.height;
                var x = 0;
                var str = x + 'px ' + (-y) + 'px';
            }
            this.content.css('background-position', str);
        };
        return Sprite;
    })(Nickel.Component);
    Nickel.Sprite = Sprite;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var MobileMenu = (function (_super) {
        __extends(MobileMenu, _super);
        function MobileMenu(container, data, delegate) {
            _super.call(this, container, data, delegate);
            this.setContent(Main.templates.find('.menu').clone());
            EventBus.addEventListener(Main.UPDATE_COPY, $.proxy(this.setCopy, this), this);
            this.content.find('.btnGallery').bind('click', $.proxy(this.galleryClicked, this));
            this.content.find('.btnTwitter').bind('click', $.proxy(this.twitterClicked, this));
            this.content.find('.btnFacebook').bind('click', $.proxy(this.facebookClicked, this));
            this.content.find('.btnGoogle').bind('click', $.proxy(this.googleClicked, this));
            this.content.find('.btnPetition').bind('click', $.proxy(this.petitionClicked, this));
            this.hideDelay = 1000;
        }
        MobileMenu.prototype.galleryClicked = function () {
            ga('send', 'event', 'header', 'click', 'gallery');
            EventBus.dispatchEvent(Nickel.Header.TOGGLE_MENU);
            Utils.pushState("/gallery");
        };
        MobileMenu.prototype.petitionClicked = function () {
            ga('send', 'event', 'header', 'click', 'sign_petition');
            EventBus.dispatchEvent(Nickel.Header.TOGGLE_MENU);
            Utils.pushState("/petition");
        };
        MobileMenu.prototype.twitterClicked = function () {
            var tweet = Main.copy.share_copy.btn_twitter;
            Share.onTwitter(Main.config.baseUrl, tweet);
            var gaLabel = Main.config.baseUrl + "/" + Main.activeLang;
            ga('send', 'social', 'twitter', 'share', gaLabel);
        };
        MobileMenu.prototype.facebookClicked = function () {
            Share.onFacebook(Main.config.baseUrl + "/" + Main.activeLang);
            var gaLabel = Main.config.baseUrl + "/" + Main.activeLang;
            ga('send', 'social', 'facebook', 'share', gaLabel);
        };
        MobileMenu.prototype.googleClicked = function () {
            Share.onGoogle(Main.config.baseUrl + "/" + Main.activeLang);
            var gaLabel = Main.config.baseUrl + "/" + Main.activeLang;
            ga('send', 'social', 'google', 'share', gaLabel);
        };
        MobileMenu.prototype.setCopy = function (copy) {
            _super.prototype.setCopy.call(this, copy);
        };
        MobileMenu.prototype.resize = function () {
            var h = $(window).height();
            // this.content.css('height', h - Header.height);
            this.content.css('height', h);
            console.log(Nickel.Header.height);
        };
        return MobileMenu;
    })(Nickel.Component);
    Nickel.MobileMenu = MobileMenu;
})(Nickel || (Nickel = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nickel;
(function (Nickel) {
    var ScrollPrompt = (function (_super) {
        __extends(ScrollPrompt, _super);
        function ScrollPrompt(container, data, delegate) {
            var _this = this;
            _super.call(this, container, data, delegate);
            this.setContent(Main.templates.find('.scrollPrompt').clone());
            this.delegate.on(Nickel.Question.SET_COPY, $.proxy(this.setCopy, this), this);
            this.delegate.on(Nickel.Question.RESIZE, $.proxy(this.resize, this), this);
            this.content.bind('click touchstart', function () {
                ga('send', 'event', 'petition_overlay', 'click', 'undecided', _this.delegate.delegate.currentSection);
                EventBus.dispatchEvent(Nickel.ClimateView.PROCEED);
            });
        }
        ScrollPrompt.prototype.resize = function () {
            //position the div
            if (this.data.vAlign == "top")
                this.content.css('top', 0 + this.data.y);
            if (this.data.vAlign == "bottom")
                this.content.css('bottom', 0 + this.data.y);
            if (this.data.vAlign == "center")
                this.content.css('top', (this.delegate.height / 2) + this.data.y);
            if (this.data.vAlign == "perc")
                this.content.css('top', this.delegate.height * this.data.y);
            if (this.data.hAlign == "left")
                this.content.css('left', 0 + this.data.x);
            if (this.data.hAlign == "right")
                this.content.css('right', 0 + this.data.x);
            if (this.data.hAlign == "center")
                this.content.css('left', (this.delegate.width / 2) + this.data.x);
            if (this.data.hAlign == "perc")
                this.content.css('left', this.delegate.width * this.data.x);
        };
        return ScrollPrompt;
    })(Nickel.Component);
    Nickel.ScrollPrompt = ScrollPrompt;
})(Nickel || (Nickel = {}));
