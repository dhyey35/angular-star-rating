(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
	(factory((global['angular-star-rating'] = global['angular-star-rating'] || {}),global._angular_core,global._angular_common,global._angular_forms));
}(this, (function (exports,_angular_core,_angular_common,_angular_forms) { 'use strict';

/**
 * Configuration service for the StarRating component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the star ratings used in the application.
 */
var StarRatingConfig = (function () {
    function StarRatingConfig() {
        this.classEmpty = "default-star-empty-icon";
        this.classHalf = "default-star-half-icon";
        this.classFilled = "default-star-filled-icon";
        this.numOfStars = 5;
        this.size = "medium";
        this.speed = "noticeable";
        this.labelPosition = "left";
        this.starType = "svg";
        this.assetsPath = "assets/images/";
        this.svgPath = this.assetsPath + "star-rating.icons.svg";
        this.svgEmptySymbolId = "star-empty";
        this.svgHalfSymbolId = "star-half";
        this.svgFilledSymbolId = "star-filled";
        this.svgPathEmpty = this.svgPath + "#" + this.svgEmptySymbolId;
        this.svgPathHalf = this.svgPath + "#" + this.svgHalfSymbolId;
        this.svgPathFilled = this.svgPath + "#" + this.svgFilledSymbolId;
    }
    /**
     * @param {?} rating
     * @param {?} numOfStars
     * @param {?=} staticColor
     * @return {?}
     */
    StarRatingConfig.prototype.getColor = function (rating, numOfStars, staticColor) {
        rating = rating || 0;
        // if a fix color is set use this one
        if (staticColor) {
            return staticColor;
        }
        // calculate size of smallest fraction
        var /** @type {?} */ fractionSize = numOfStars / 3;
        // apply color by fraction
        var /** @type {?} */ color = 'default';
        if (rating > 0) {
            color = 'negative';
        }
        if (rating > fractionSize) {
            color = 'ok';
        }
        if (rating > fractionSize * 2) {
            color = 'positive';
        }
        return color;
    };
    /**
     * @param {?} rating
     * @return {?}
     */
    StarRatingConfig.prototype.getHalfStarVisible = function (rating) {
        return Math.abs(rating % 1) > 0;
    };
    return StarRatingConfig;
}());

var StarRatingUtils = (function () {
    function StarRatingUtils() {
    }
    /**
     * getStarsArray
     *
     * returns an array of increasing numbers starting at 1
     *
     * @param {?} numOfStars
     * @return {?}
     */
    StarRatingUtils.getStarsArray = function (numOfStars) {
        var /** @type {?} */ stars = [];
        for (var /** @type {?} */ i = 0; i < numOfStars; i++) {
            stars.push(i + 1);
        }
        return stars;
    };
    /**
     * getHalfStarVisible
     *
     * Returns true if there should be a half star visible, and false if not.
     *
     * @param {?} rating
     * @return {?}
     */
    StarRatingUtils.getHalfStarVisible = function (rating) {
        return Math.abs(rating % 1) > 0;
    };
    /**
     * getColor
     *
     * The default function for color calculation
     * based on the current rating and the the number of stars possible.
     * If a staticColor is set the function will use it as return value.
     *
     * @param {?} rating
     * @param {?} numOfStars
     * @param {?=} staticColor
     * @return {?}
     */
    StarRatingUtils.getColor = function (rating, numOfStars, staticColor) {
        rating = rating || 0;
        //if a fix color is set use this one
        if (staticColor) {
            return staticColor;
        }
        //calculate size of smallest fraction
        var /** @type {?} */ fractionSize = numOfStars / 3;
        //apply color by fraction
        var /** @type {?} */ color = 'default';
        if (rating > 0) {
            color = 'negative';
        }
        if (rating > fractionSize) {
            color = 'ok';
        }
        if (rating > fractionSize * 2) {
            color = 'positive';
        }
        return color;
    };
    return StarRatingUtils;
}());
/**
 * isDigitKeyEventCode
 * detects digit key event sodes
 * @param eventCode
 */
StarRatingUtils.isDigitKeyEventCode = function (eventCode) {
    return eventCode.indexOf('Digit') === 0;
};

var StarRating = (function () {
    function StarRating() {
        var config = new StarRatingConfig();
        //set default ctrl props
        this.classEmpty = config.classEmpty;
        this.classHalf = config.classHalf;
        this.classFilled = config.classFilled;
        this.pathEmpty = config.svgPathEmpty;
        this.pathHalf = config.svgPathHalf;
        this.pathFilled = config.svgPathFilled;
        //set default Component Inputs
        if ('getColor' in config && typeof config.getColor === "function") {
            this.getColor = config.getColor;
        }
        if ('getHalfStarVisible' in config && typeof config.getHalfStarVisible === "function") {
            this.getHalfStarVisible = config.getHalfStarVisible;
        }
        this.numOfStars = config.numOfStars;
        this.rating = 0;
        this.step = 1;
    }
    Object.defineProperty(StarRating.prototype, "id", {
        /**
         * @return {?}
         */
        get: function () {
            return this._id;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._id = value || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "focus", {
        /**
         * @return {?}
         */
        get: function () {
            return this._focus;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._focus = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "labelText", {
        /**
         * @return {?}
         */
        get: function () {
            return this._labelText;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._labelText = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "labelPosition", {
        /**
         * @return {?}
         */
        get: function () {
            return this._labelPosition;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._labelPosition = value || this.config.labelPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "labelVisible", {
        /**
         * @return {?}
         */
        get: function () {
            return this._labelVisible;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._labelVisible = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "hoverEnabled", {
        /**
         * @return {?}
         */
        get: function () {
            return this._hoverEnabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._hoverEnabled = (value !== undefined) ? !!value : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "staticColor", {
        /**
         * @return {?}
         */
        get: function () {
            return this._staticColor;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._staticColor = value || undefined;
            //update color.
            this.setColor();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "direction", {
        /**
         * @return {?}
         */
        get: function () {
            return this._direction;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._direction = value || undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "numOfStars", {
        /**
         * @return {?}
         */
        get: function () {
            return this._numOfStars;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._numOfStars = (value > 0) ? value : this.config.numOfStars;
            //update stars array
            this.stars = StarRatingUtils.getStarsArray(this.numOfStars);
            //update color
            this.setColor();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "hoverRating", {
        /**
         * @return {?}
         */
        get: function () {
            return this._hoverRating;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._hoverRating = (value > 0) ? value : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "speed", {
        /**
         * @return {?}
         */
        get: function () {
            return this._speed;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._speed = value || this.config.speed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "size", {
        /**
         * @return {?}
         */
        get: function () {
            return this._size;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._size = value || this.config.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "starType", {
        /**
         * @return {?}
         */
        get: function () {
            return this._starType;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._starType = value || this.config.starType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "space", {
        /**
         * @return {?}
         */
        get: function () {
            return this._space;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._space = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "readOnly", {
        /**
         * @return {?}
         */
        get: function () {
            return this._readOnly;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._readOnly = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "disabled", {
        /**
         * @return {?}
         */
        get: function () {
            return this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._disabled = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "step", {
        /**
         * @return {?}
         */
        get: function () {
            return this._step;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._step = (value > 0 ? value : 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRating.prototype, "rating", {
        /**
         * @return {?}
         */
        get: function () {
            return this._rating;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.setRating(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * setRating
     * I use a setter function instead of a set method to enable overrides for this function.
     * @param {?} value
     * @return {?}
     */
    StarRating.prototype.setRating = function (value) {
        //validate and apply newRating
        var /** @type {?} */ newRating = 0;
        if (value >= 0
            && value <= this.numOfStars) {
            newRating = value;
        }
        //limit max value to max number of stars
        if (value > this.numOfStars) {
            newRating = this.numOfStars;
        }
        this._rating = newRating;
        //update ratingAsInteger. rating parsed to int for the value-[n] modifier
        this.ratingAsInteger = parseInt(this._rating.toString());
        //update halfStarsVisible
        this.setHalfStarVisible();
        //update calculated Color
        this.setColor();
    };
    Object.defineProperty(StarRating.prototype, "showHalfStars", {
        /**
         * @return {?}
         */
        get: function () {
            return this._showHalfStars;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._showHalfStars = !!value;
            //update halfStarVisible
            this.setHalfStarVisible();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    StarRating.prototype.svgVisible = function () {
        return this.starType === "svg";
    };
    /**
     * @return {?}
     */
    StarRating.prototype.interactionPossible = function () {
        return !this.readOnly && !this.disabled;
    };
    /**
     * @return {?}
     */
    StarRating.prototype.setColor = function () {
        //check if custom function is given
        if (typeof this.getColor === "function") {
            this.color = this.getColor(this.rating, this.numOfStars, this.staticColor);
        }
        else {
            this.color = StarRatingUtils.getColor(this.rating, this.numOfStars, this.staticColor);
        }
    };
    /**
     * @return {?}
     */
    StarRating.prototype.setHalfStarVisible = function () {
        //update halfStarVisible
        if (this.showHalfStars) {
            //check if custom function is given
            if (typeof this.getHalfStarVisible === "function") {
                this.halfStarVisible = this.getHalfStarVisible(this.rating);
            }
            else {
                this.halfStarVisible = StarRatingUtils.getHalfStarVisible(this.rating);
            }
        }
        else {
            this.halfStarVisible = false;
        }
    };
    /**
     * @return {?}
     */
    StarRating.prototype.getComponentClassNames = function () {
        var /** @type {?} */ classNames = [];
        classNames.push(this.rating ? 'value-' + this.ratingAsInteger : 'value-0');
        classNames.push(this.halfStarVisible ? 'half' : '');
        classNames.push(this.hoverEnabled ? 'hover' : '');
        var /** @type {?} */ hoverRating = (this.hoverRating ? 'hover-' + this.hoverRating : 'hover-0');
        classNames.push(this.hoverEnabled ? hoverRating : '');
        classNames.push(this.space ? 'space-' + this.space : '');
        classNames.push(this.labelPosition ? 'label-' + this.labelPosition : '');
        classNames.push(this.color ? 'color-' + this.color : '');
        classNames.push(this.starType ? 'star-' + this.starType : '');
        classNames.push(this.speed);
        classNames.push(this.size);
        classNames.push(this.readOnly ? 'read-only' : '');
        classNames.push(this.disabled ? 'disabled' : '');
        classNames.push(this.direction ? 'direction-' + this.direction : '');
        return classNames.join(' ');
    };
    /**
     * @return {?}
     */
    StarRating.prototype.increment = function () {
        //increment to next higher step
        var /** @type {?} */ absDiff = Math.abs(this.rating % this.step);
        this.rating = this.rating + (absDiff > 0 ? this.step - absDiff : this.step);
    };
    /**
     * @return {?}
     */
    StarRating.prototype.decrement = function () {
        //decrement to next lower step
        var /** @type {?} */ absDiff = Math.abs(this.rating % this.step);
        this.rating = this.rating - (absDiff > 0 ? absDiff : this.step);
    };
    /**
     * @return {?}
     */
    StarRating.prototype.reset = function () {
        this.rating = 0;
    };
    return StarRating;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var STAR_RATING_CONTROL_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return StarRatingComponent; }),
    multi: true
};
var StarRatingComponent = (function (_super) {
    __extends(StarRatingComponent, _super);
    function StarRatingComponent() {
        var _this = _super.call(this) || this;
        //Outputs
        ///////////////////////////////////////////////////////////////////////////////////////////
        _this.onClick = new _angular_core.EventEmitter();
        _this.onRatingChange = new _angular_core.EventEmitter();
        _this.onHoverRatingChange = new _angular_core.EventEmitter();
        _this.onModelChangeRegistered = false;
        _this.onTouchRegistered = false;
        return _this;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    StarRatingComponent.prototype.saveOnClick = function ($event) {
        if (this.onClick) {
            this.onClick.emit($event);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    StarRatingComponent.prototype.saveOnRatingChange = function ($event) {
        if (this.onRatingChange) {
            this.onRatingChange.emit($event);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    StarRatingComponent.prototype.saveOnHover = function ($event) {
        if (this.onHoverRatingChange) {
            this.onHoverRatingChange.emit($event);
        }
    };
    /**
     * @return {?}
     */
    StarRatingComponent.prototype.saveOnTouch = function () {
        if (this.onTouchRegistered) {
            this.onTouch();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    StarRatingComponent.prototype.saveOnModelChange = function (value) {
        if (this.onModelChangeRegistered) {
            this.onModelChange(value);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    StarRatingComponent.prototype.onKeyDown = function (event) {
        var _this = this;
        var /** @type {?} */ handlers = {
            //Decrement
            Minus: function () { return _this.decrement(); },
            ArrowDown: function () { return _this.decrement(); },
            ArrowLeft: function () { return _this.decrement(); },
            //Increment
            Plus: function () { return _this.increment(); },
            ArrowRight: function () { return _this.increment(); },
            ArrowUp: function () { return _this.increment(); },
            //Reset
            Backspace: function () { return _this.reset(); },
            Delete: function () { return _this.reset(); },
            Digit0: function () { return _this.reset(); }
        };
        var /** @type {?} */ handleDigits = function (eventCode) {
            var /** @type {?} */ dStr = "Digit";
            var /** @type {?} */ digit = parseInt(eventCode.substr(dStr.length, eventCode.length - 1));
            _this.rating = digit;
        };
        if (handlers[event['code']] || StarRatingUtils.isDigitKeyEventCode(event['code'])) {
            if (StarRatingUtils.isDigitKeyEventCode(event['code'])) {
                handleDigits(event['code']);
            }
            else {
                handlers[event['code']]();
            }
            event.preventDefault();
            event.stopPropagation();
        }
        this.saveOnTouch();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    StarRatingComponent.prototype.onBlur = function (event) {
        this.focus = false;
        event.preventDefault();
        event.stopPropagation();
        this.saveOnTouch();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    StarRatingComponent.prototype.onFocus = function (event) {
        this.focus = true;
        event.preventDefault();
        event.stopPropagation();
        this.saveOnTouch();
    };
    /**
     * @param {?=} rating
     * @return {?}
     */
    StarRatingComponent.prototype.onStarHover = function (rating) {
        if (!this.interactionPossible() || !this.hoverEnabled) {
            return;
        }
        this.hoverRating = rating ? parseInt(rating.toString()) : 0;
        //fire onHoverRatingChange event
        var /** @type {?} */ $event = { hoverRating: this.hoverRating };
        this.saveOnHover($event);
    };
    /**
     * Form Control - ControlValueAccessor implementation*
     * @param {?} obj
     * @return {?}
     */
    StarRatingComponent.prototype.writeValue = function (obj) {
        this.rating = obj;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    StarRatingComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
        this.onModelChangeRegistered = true;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    StarRatingComponent.prototype.registerOnTouched = function (fn) {
        this.onTouch = fn;
        this.onTouchRegistered = true;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    StarRatingComponent.prototype.setRating = function (value) {
        var /** @type {?} */ initValue = this.rating;
        _super.prototype.setRating.call(this, value);
        //if value changed trigger valueAccessor events and outputs
        if (initValue !== this.rating) {
            var /** @type {?} */ $event = { rating: this.rating };
            this.saveOnRatingChange($event);
            this.saveOnModelChange(this.rating);
        }
    };
    
    /**
     * onStarClicked
     *
     * Is fired when a star is clicked. And updated the rating value.
     * This function returns if the disabled or readOnly
     * property is set. If provided it emits the onClick event
     * handler with the actual rating value.
     *
     * @param {?} rating
     * @return {?}
     */
    StarRatingComponent.prototype.onStarClicked = function (rating) {
        //fire onClick event
        if (!this.interactionPossible()) {
            return;
        }
        this.rating = rating;
        var /** @type {?} */ onClickEventObject = {
            rating: this.rating
        };
        this.saveOnClick(onClickEventObject);
    };
    /**
     * ngOnChanges
     * @param {?} changes
     * @return {?}
     */
    StarRatingComponent.prototype.ngOnChanges = function (changes) {
    };
    return StarRatingComponent;
}(StarRating));
StarRatingComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'star-rating-comp',
                providers: [STAR_RATING_CONTROL_ACCESSOR],
                inputs: [
                    'getHalfStarVisible',
                    'getColor',
                    'showHalfStars',
                    'hoverEnabled',
                    'rating',
                    'step',
                    'disabled',
                    'readOnly',
                    'space',
                    'starType',
                    'size',
                    'speed',
                    'numOfStars',
                    'direction',
                    'staticColor'
                    //, 'labelVisible'
                    ,
                    'labelPosition',
                    'labelText',
                    'id'
                ],
                outputs: [
                    'onClick',
                    'onRatingChange',
                    'onHoverRatingChange'
                ],
                template: "<div id=\"{{id}}\" class=\"rating {{getComponentClassNames()}}\" tabindex=\"0\" (keydown)=\"onKeyDown($event)\" (blur)=\"onBlur($event)\" (focus)=\"onFocus($event)\" (mouseleave)=\"onStarHover(0)\"> <div *ngIf=\"labelText\" class=\"label-value\">{{labelText}}</div> <div class=\"star-container\"> <div class=\"star\" (mouseenter)=\"onStarHover(star)\" *ngFor=\"let star of stars\" (click)=\"onStarClicked(star)\"> <i *ngIf=\"!svgVisible()\" class=\"star-empty {{classEmpty}}\"></i> <i *ngIf=\"!svgVisible()\" class=\"star-empty {{classHalf}}\"></i> <i *ngIf=\"!svgVisible()\" class=\"star-filled {{classFilled}}\"></i> <svg *ngIf=\"svgVisible()\" class=\"star-empty default-star-empty-icon\"> <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" [attr.xlink:href]=\"pathEmpty\"></use> </svg> <svg *ngIf=\"svgVisible()\" class=\"star-half default-star-half-icon\"> <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" [attr.xlink:href]=\"pathHalf\"></use> </svg> <svg *ngIf=\"svgVisible()\" class=\"star-filled default-star-filled-icon\"> <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" [attr.xlink:href]=\"pathFilled\"></use> </svg> </div> </div> </div>"
            },] },
];
/**
 * @nocollapse
 */
StarRatingComponent.ctorParameters = function () { return []; };

var EXPORTS = [StarRatingComponent];
var StarRatingModule = (function () {
    function StarRatingModule() {
    }
    /**
     * @return {?}
     */
    StarRatingModule.forRoot = function () {
        return {
            ngModule: StarRatingModule,
            providers: [StarRatingConfig]
        };
    };
    return StarRatingModule;
}());
StarRatingModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [_angular_common.CommonModule],
                exports: [EXPORTS],
                declarations: [EXPORTS]
            },] },
];
/**
 * @nocollapse
 */
StarRatingModule.ctorParameters = function () { return []; };

exports.StarRatingModule = StarRatingModule;
exports.StarRatingComponent = StarRatingComponent;
exports.StarRatingConfig = StarRatingConfig;

Object.defineProperty(exports, '__esModule', { value: true });

})));
