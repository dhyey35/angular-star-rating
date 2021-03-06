import { OnChanges, EventEmitter } from "@angular/core";
import { OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent } from "./star-rating-struct";
import { StarRating } from "./star-rating";
import { ControlValueAccessor } from "@angular/forms";
export declare class StarRatingComponent extends StarRating implements OnChanges, ControlValueAccessor {
    onClick: EventEmitter<OnClickEvent>;
    saveOnClick($event: OnClickEvent): void;
    onRatingChange: EventEmitter<OnRatingChangeEven>;
    saveOnRatingChange($event: OnRatingChangeEven): void;
    onHoverRatingChange: EventEmitter<OnHoverRatingChangeEvent>;
    saveOnHover($event: OnHoverRatingChangeEvent): void;
    onTouch: Function;
    onModelChange: Function;
    private onModelChangeRegistered;
    private onTouchRegistered;
    saveOnTouch(): void;
    saveOnModelChange(value: number): void;
    /**ACCESSIBILITY **/
    onKeyDown(event: KeyboardEvent): void;
    onBlur(event: FocusEvent): void;
    onFocus(event: FocusEvent): void;
    onStarHover(rating?: number): void;
    /**Form Control - ControlValueAccessor implementation**/
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    constructor();
    setRating(value: number): void;
    /**
     * onStarClicked
     *
     * Is fired when a star is clicked. And updated the rating value.
     * This function returns if the disabled or readOnly
     * property is set. If provided it emits the onClick event
     * handler with the actual rating value.
     *
     * @param rating
     */
    onStarClicked(rating: number): void;
    /**
     * ngOnChanges
     * @param changes
     */
    ngOnChanges(changes: any): void;
}
