export declare type starRatingSizes = 'small' | 'medium' | 'large';
export declare type starRatingColor = 'default' | 'negative' | 'ok' | 'positive';
export declare type starRatingSpeed = 'immediately' | 'noticeable' | 'slow';
export declare type starRatingPosition = 'left' | 'right' | 'top' | 'bottom';
export declare type starRatingStarTypes = 'svg' | 'icon' | 'image';
export declare type starRatingStarSpace = 'no' | 'between' | 'around';
export declare type starRatingDirection = 'rtl' | 'ltr';
export interface OnClickEvent {
    rating: number;
}
export interface OnRatingChangeEven {
    rating: number;
}
export interface OnHoverRatingChangeEvent {
    hoverRating: number;
}
