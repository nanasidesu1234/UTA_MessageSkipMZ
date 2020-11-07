//=============================================================================
// rmmz_core.js v1.0.0
//=============================================================================
type KEYMAPPER = {
    9: "tab", // tab
    13: "ok", // enter
    16: "shift", // shift
    17: "control", // control
    18: "control", // alt
    27: "escape", // escape
    32: "ok", // space
    33: "pageup", // pageup
    34: "pagedown", // pagedown
    37: "left", // left arrow
    38: "up", // up arrow
    39: "right", // right arrow
    40: "down", // down arrow
    45: "escape", // insert
    81: "pageup", // Q
    87: "pagedown", // W
    88: "escape", // X
    90: "ok", // Z
    96: "escape", // numpad 0
    98: "down", // numpad 2
    100: "left", // numpad 4
    102: "right", // numpad 6
    104: "up", // numpad 8
    120: "debug" // F9
}

type GAMEPADMAPPER = {
    0: "ok", // A
    1: "cancel", // B
    2: "shift", // X
    3: "menu", // Y
    4: "pageup", // LB
    5: "pagedown", // RB
    12: "up", // D-pad up
    13: "down", // D-pad down
    14: "left", // D-pad left
    15: "right" // D-pad right
}

/**
 * @staitc
 * @class Input
 * @classdesc The static class that handles input data from the keyboard and gamepads.
 */
declare class Input {
    private static _currentState: {};
    private static _previousState: {};
    private static _gamepadStates: {};
    private static _latestButton: string | null;
    private static _pressedTime: number;
    private static _dir4: number;
    private static _dir8: number;
    private static _preferredAxis: string;
    private static _date: number;
    private static _virtualButton: string | null;

    constructor();

    /**
     * Initializes the input system.
     */
    public static initialize(): void;

    /**
     * The wait time of the key repeat in frames.
     *
     * @type number
     */
    static readonly keyRepeatWait: number;

    /**
     * The interval of the key repeat in frames.
     *
     * @type number
     */
    static readonly keyRepeatInterval: number;

    /**
     * A hash table to convert from a virtual key code to a mapped key name.
     *
     * @type Object
     */
    static readonly keyMapper: KEYMAPPER;

    /**
     * A hash table to convert from a gamepad button to a mapped key name.
     *
     * @type Object
     */
    static readonly gamepadMapper: GAMEPADMAPPER;

    /**
     * Clears all the input data.
     */
    public static clear(): void;

    /**
     * Updates the input data.
     */
    public static update(): void;

    /**
     * Checks whether a key is currently pressed down.
     *
     * @param {string} keyName - The mapped name of the key.
     * @returns {boolean} True if the key is pressed.
     */
    public static isPressed(keyName: string): boolean;

    /**
     * Checks whether a key is just pressed.
     *
     * @param {string} keyName - The mapped name of the key.
     * @returns {boolean} True if the key is triggered.
     */
    public static isTriggered(keyName: string): boolean;

    /**
     * Checks whether a key is just pressed or a key repeat occurred.
     *
     * @param {string} keyName - The mapped name of the key.
     * @returns {boolean} True if the key is repeated.
     */
    public static isRepeated(keyName: string): boolean;

    /**
     * Checks whether a key is kept depressed.
     *
     * @param {string} keyName - The mapped name of the key.
     * @returns {boolean} True if the key is long-pressed.
     */
    public static isLongPressed(keyName: string): boolean;

    /**
     * The four direction value as a number of the numpad, or 0 for neutral.
     *
     * @readonly
     * @type number
     * @name Input.dir4
     */
    get dir4(): number;

    /**
     * The eight direction value as a number of the numpad, or 0 for neutral.
     *
     * @readonly
     * @type number
     * @name Input.dir8
     */
    get dir8(): number;

    /**
     * The time of the last input in milliseconds.
     *
     * @readonly
     * @type number
     * @name Input.date
     */
    get date(): number;

    public static virtualClick(buttonName: string): void;
    private static _setupEventHandlers(): void;
    private static _onKeyDown(event: any);
    private static _shouldPreventDefault(keyCode: number);
    private static _onKeyUp(event: any);
    private static _onLostFocus();
    private static _pollGamepads();
    private static _updateGamepadState(gamepad: any);
    private static _updateDirection(): void;
    private static _signX(): void;
    private static _signY(): void;
    private static _makeNumpadDirection(x: number, y: number): number;
    private static _isEscapeCompatible(keyName: string): boolean;
}

type TouchInputState = {
    triggered: boolean;
    cancelled: boolean;
    moved: boolean;
    hovered: boolean;
    released: boolean;
    wheelX: number;
    wheelY: number;
};

/**
 * @static
 * @class TouchInput
 * @classdesc The static class that handles input data from the mouse and touchscreen.
 */
declare class TouchInput {
    /**
     * The wait time of the pseudo key repeat in frames.
     * @type {number}
     */
    static keyRepeatWait: number;
    /**
     * The interval of the pseudo key repeat in frames.
     * @type {number}
     */
    static keyRepeatInterval: number;
    /**
     * The threshold number of pixels to treat as moved.
     * @type {number}
     */
    static movethreshold: number;

    private _mousePressed: boolean;
    private _screenPressed: boolean;
    private _pressedTime: number;
    private _clicked: boolean;
    private _newState: TouchInputState;
    private _currentState: TouchInputState;
    private _x: number;
    private _y: number;
    private _triggerX: number;
    private _triggerY: number;
    private _moved: boolean;
    private _date: number;

    constructor();

    public static clear(): void;
    /**
     * Updates the touch data.
     */
    public static update(): void;

    /**
     * Initializes the touch system.
     */
    public static initialize(): void;
    /**
     * Checks whether the mouse button or touchscreen has been pressed and
     * released at the same position.
     * @returns {boolean} True if the mouse button or touchscreen is clicked.
     */
    public static isClicked(): boolean;
    /**
     * Checks whether the mouse button or touchscreen is currently pressed down.
     * @returns {boolean} True if the mouse button or touchscreen is pressed.
     */
    public static isPressed(): boolean;
    /**
     * Checks whether the left mouse button or touchscreen is just pressed.
     * @returns {boolean} True if the mouse button or touchscreen is triggered.
     */
    public static isTriggered(): boolean;
    /**
     * Checks whether the left mouse button or touchscreen is just pressed
     * or a pseudo key repeat occurred.
     * @returns {boolean} True if the mouse button or touchscreen is repeated.
     */
    public static isRepeated(): boolean;
    /**
     * Checks whether the left mouse button or touchscreen is kept depressed.
     * @returns {boolean} True if the left mouse button or touchscreen is long-pressed.
     */
    public static isLongPressed(): boolean;
    /**
     * Checks whether the right mouse button is just pressed.
     * @returns {boolean} True if the right mouse button is just pressed.
     */
    public static isCancelled(): boolean;
    /**
     * Checks whether the mouse or a finger on the touchscreen is moved.
     * @returns {boolean} True if the mouse or a finger on the touchscreen is moved.
     */
    public static isMoved(): boolean;
    /**
     * Checks whether the mouse is moved without pressing a button.
     * @returns {boolean} True if the mouse is hovered.
     */
    public static isHovered(): boolean;
    /**
     * Checks whether the left mouse button or touchscreen is released.
     * @returns {boolean} True if the mouse button or touchscreen is released.
     */
    public static isReleased(): boolean;

    /**
     * The horizontal scroll amount.
     * @readonly
     * @type {number}
     * @name TouchInput.wheelX
     */
    get wheelX(): number;
    /**
     * The vertical scroll amount.
     * @readonly
     * @type {number}
     * @name TouchInput.wheelY
     */
    get wheelY(): number;
    /**
     * The x coordinate on the canvas area of the latest touch event.
     * @readonly
     * @type {number}
     * @name TouchInput.x
     */
    get x(): number;
    /**
     * The y coordinate on the canvas area of the latest touch event.
     * @readonly
     * @type {number}
     * @name TouchInput.y
     */
    get y(): number;
    /**
     * The time of the last input in milliseconds.
     * @readonly
     * @type {number}
     * @name TouchInput.date
     */
    get date(): number;

    private static _createNewState(): TouchInputState;
    private static _setupEventHandlers(): void;
    private static _onMouseDown(event: any): void;
    private static _onLeftButtonDown(event: any): void;
    private static _onMiddleButtonDown(): void;
    private static _onRightButtonDown(event: any): void;
    private static _onMouseMove(event: any): void;
    private static _onMouseUp(event: any): void;
    private static _onWheel(event: any): void;
    private static _onTouchStart(event: any): void;
    private static _onTouchMove(event: any): void;
    private static _onTouchEnd(event: any): void;
    private static _onTouchCancel(): void;
    private static _onLostFocus(): void;
    private static _onTrigger(): void;
    private static _onCancel(): void;
    private static _onMove(x: number, y: number): void;
    private static _onHover(x: number, y: number): void;
    private static _onRelease(x: number, y: number): void;
}

/**
 * @static
 * @class JsonEx
 * @classdesc The static class that handles JSON with object information.
 */
declare class JsonEx {
    constructor();

    /**
     * The maximum depth of objects.
     *
     * @type number
     * @default 100
     */
    public static readonly maxDepth: number;

    /**
     * Converts an object to a JSON string with object information.
     *
     * @param {object} object - The object to be converted.
     * @returns {string} The JSON string.
     */
    public static stringify(object: any): string;

    /**
     * Parses a JSON string and reconstructs the corresponding object.
     *
     * @param {string} json - The JSON string.
     * @returns {object} The reconstructed object.
     */
    public static parse(json: string): any;

    /**
     * Makes a deep copy of the specified object.
     *
     * @param {object} object - The object to be copied.
     * @returns {object} The copied object.
     */
    public static makeDeepCopy(object: any): any;

    private static _encode(value: any, depth: number): any;
    private static _decode(value: any): any;
}
