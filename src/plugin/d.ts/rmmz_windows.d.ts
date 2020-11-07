//=============================================================================
// rmmz_windows.js v1.0.0
//=============================================================================
type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

/**
 * @class Window_Base
 * @classdesc The superclass of all windows within the game.
 */
declare class Window_Base {
}

/**
 * @extends Window_Base
 * @class Window_Message
 * @classdesc The window for displaying text messages.
 */
declare class Window_Message extends Window_Base {
    public openness: number;
    private _background: number;
    private _positionType: number;
    private _waitCount: number;

    private _textState: any;

    private _showFast: boolean;
    private _lineShowFast: boolean;
    private _pauseSkip: boolean;

    public pause: boolean;

    constructor();
    public initialize(rect: Rect): void;
    public initMembers(): void;

    public setGoldWindow(goldWindow: any): void;
    public setNameBoxWindow(nameBoxWindow: any): void;
    public setChoiceListWindow(choiceListWindow: any): void;
    public setNumberInputWindow(numberInputWindow: any): void;
    public setEventItemWindow(eventItemWindow: any): void;
    public clearFlags(): void;
    public update(): void;

    public terminateMessage(): void;

    public updateInput(): boolean;

    public updateShowFast(): void;
}

declare class  Window_ScrollText extends Window_Base {
    public opacity: number;
    private _reservedRect: Rect;
    private _text: string;
    private _allTextHeight: number;

    constructor();
    public update(): void;
    public startMessage(): void;
    public refresh(): void;
    public updatePlacement(): void;
    public contentsHeight(): number;
    public updateMessage(): void;
    public scrollSpeed(): number;
    public isFastForward(): boolean;
    public fastForwardRate(): number;
    public terminateMessage(): void;
}

declare class Window_BattleLog extends Window_Base {
    constructor();
    public messageSpeed(): number;
}
