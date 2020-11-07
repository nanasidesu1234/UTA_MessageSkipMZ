/**
 * @namespace utakata
 */
namespace utakata {
    "use_strict";
    /**
     * @static
     * @class MessageSkip
     * @classdesc メッセージスキップ関連の処理を扱う静的クラス。
     */
    export class MessageSkip {
        /**
         * プラグイン名称定義
         * @static
         * @type {string}
         */
        public static readonly PLUGIN_NAME: string = "UTA_MessageSkipMZ";
        /**
         * プラグインのバージョン定義
         * @static
         * @type {object}
         */
        public static readonly PLUGIN_VERSION: Version = {
            major: 0,
            minor: 9,
            patch: 0
        };
        /**
         * メッセージスキップにアサインしたキー名のリスト
         * @static
         * @private
         * @type {string[]}
         */
        private static _keyNameList: string[] = [];
        /**
         * ロングタップ/マウス左ボタン長押しでのスキップを有効にするか
         * @static
         * @private
         * @type {boolean}
         */
        private static _isEnabledLongTouchSkip: boolean = false;
        /**
         * スクロールメッセージのスキップ時速度レート
         * @static
         * @private
         * @type {number}
         */
        private static _scrollMessageSpeedRate: number = 100;
        /**
         * バトルログのスキップ時速度
         * @static
         * @private
         * @type {number}
         */
        private static _battleLogMessageSpeed: number = 1;
        /**
         * プラグインパラメータの参照
         * @private
         * @type {object}
         */
        private static _parameters: MessageSkipPluginParameters;

        constructor() {
            throw new Error("MessageSkip is static class.");
        }

        /**
         * 初期化処理。
         * @static
         */
        public static initialize(): void {
            this._keyNameList = [];
            this._parameters = <MessageSkipPluginParameters>PluginManager.parameters(this.PLUGIN_NAME);

            // プラグインパラメータに指定された値を読み込む
            var assignKeyCodes: string[] = JsonEx.parse(this._parameters.assignKeyCodes);
            this._loadKeyNameList(assignKeyCodes);
            this._loadEnabledLongTouchSkip();
            this._loadScrollMessageSpeedRate();
            this._loadBattleLogMessageSpeed();
        }

        /**
         * 文字列配列からメッセージスキップキー名リストをロードする。
         * Input.keyMapperで定義されていないものしか受け付けない。
         * 重複する設定があった場合はエラーとせず、uniqueな状態に調整される。
         * @static
         * @private
         * @param {string[]} targetList 読み込み対象文字列配列。
         */
        private static _loadKeyNameList(targetList: string[]): void {
            this._keyNameList = [];
            const keyMapperNames: string[] = Object.values(Input.keyMapper);
            for (const targetStr of targetList) {
                // Input.keyMapperで定義されているものしか受け付けない
                if (!keyMapperNames.includes(targetStr)) {
                    throw new Error(this.PLUGIN_NAME + ": plugin parameter error: assignKeyCodes is invalid value. (" + targetStr + ")");
                }
                this._keyNameList.push(targetStr);
            }
            // unique
            this._keyNameList = this._keyNameList.filter((x: string, i: number, self: string[]) => {
                return self.indexOf(x) === i;
            });
        }

        /**
         * プラグインパラメータからロングタップ/マウス左ボタン長押しでの
         * スキップ有効状態を得る。
         * @static
         * @private
         */
        private static _loadEnabledLongTouchSkip(): void {
            const enableLongTouchSkipStr: string = this._parameters.enableLongTouchSkip;
            if (!["true", "false"].includes(enableLongTouchSkipStr)) {
                throw new Error(this.PLUGIN_NAME + ": plugin parameter error: enableLongTouchSkip is invalid value. (" + enableLongTouchSkipStr + ")");
            }
            this._isEnabledLongTouchSkip = enableLongTouchSkipStr === "true";
        }

        /**
         * プラグインパラメータからスクロールメッセージのスキップ時速度レートを得る。
         * @static
         * @private
         */
        private static _loadScrollMessageSpeedRate(): void {
            const speedStr: string = this._parameters.scrollMessageSpeedRate;
            const speed: number = parseInt(speedStr, 10);
            if (speed !== speed) {
                throw new Error(this.PLUGIN_NAME + ": plugin parameter error: scrollMessageSpeedRate is invalid value. (" + speedStr + ")");
            }
            this._scrollMessageSpeedRate = speed;
        }

        /**
         * プラグインパラメータからバトルログのスキップ時速度を得る。
         * @static
         * @private
         */
        private static _loadBattleLogMessageSpeed(): void {
            const speedStr: string = this._parameters.battleLogMessageSpeed;
            const speed: number = parseInt(speedStr, 10);
            if (speed !== speed) {
                throw new Error(this.PLUGIN_NAME + ": plugin parameter error: battleLogMessageSpeed is invalid value. (" + speedStr + ")");
            }
            this._battleLogMessageSpeed = speed;
        }

        /**
         * 設定したメッセージスキップキーのいずれかが押されているかを判定する。
         * @static
         * @private
         * @return {boolean} メッセージスキップキーが押されている場合trueを返す。
         */
        private static _isPressedSkipButton(): boolean {
            for (const keyName of this._keyNameList) {
                if (Input.isPressed(keyName)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * メッセージスキップ状態であるかを判定する。
         * @static
         * @return {boolean} メッセージスキップ状態である場合trueを返す。
         */
        public static isMessageSkip(): boolean {
            // ロングタップ/マウス左ボタン長押しでのスキップが有効な場合は判定
            if (this._isEnabledLongTouchSkip) {
                if (TouchInput.isLongPressed()) {
                    return true;
                }
            }
            return this._isPressedSkipButton();
        }

        public static getScrollMessageSpeedRate(): number {
            return this._scrollMessageSpeedRate;
        }

        public static getBattleLogMessageSpeed(): number {
            return this._battleLogMessageSpeed;
        }
    }
    MessageSkip.initialize();

    /**
     * Window_Message
     */
    // 文章表示中にスキップキーが押された場合は即全表示するように
    const _Window_Message_updateShowFast = Window_Message.prototype.updateShowFast;
    Window_Message.prototype.updateShowFast = function (): void {
        _Window_Message_updateShowFast.call(this);
        if (MessageSkip.isMessageSkip()) {
            this._showFast = true;
            this._lineShowFast = true;
            this._pauseSkip = true;
        }
    };

    // 文章表示キー入力待ちの際もスキップキーの監視を行う
    const _Window_Message_updateInput = Window_Message.prototype.updateInput;
    Window_Message.prototype.updateInput = function (): boolean {
        const ret = _Window_Message_updateInput.call(this);
        if (this.pause && MessageSkip.isMessageSkip()) {
            Input.update();
            this.pause = false;
            if (!this._textState) {
                this.terminateMessage();
            }
            return true;
        }
        return ret;
    };

    /**
     * Window_ScrollText
     */
    // 早送りなしの場合はスキップしないように
    const _Window_ScrollText_isFastForward = Window_ScrollText.prototype.isFastForward;
    Window_ScrollText.prototype.isFastForward = function (): boolean {
        const ret = _Window_ScrollText_isFastForward.call(this);
        if ($gameMessage.scrollNoFast()) {
            return false;
        }
        return ret || MessageSkip.isMessageSkip();
    };

    // メッセージスキップ状態の場合は早送り速度をスキップ時のレートに
    const _Window_ScrollText_scrollSpeed = Window_ScrollText.prototype.scrollSpeed;
    Window_ScrollText.prototype.scrollSpeed = function (): number {
        if (this.isFastForward() && MessageSkip.isMessageSkip()) {
            let speed = $gameMessage.scrollSpeed() / 2;
            speed *= MessageSkip.getScrollMessageSpeedRate();
            return speed;
        }
        return _Window_ScrollText_scrollSpeed.call(this);
    };

    /**
     * Window_BattleLog
     */
    // メッセージスキップ状態の場合はバトルログの速度をスキップ時のレートに
    const _Window_BattleLog_messageSpeed = Window_BattleLog.prototype.messageSpeed;
    Window_BattleLog.prototype.messageSpeed = function (): number {
        if (MessageSkip.isMessageSkip()) {
            return MessageSkip.getBattleLogMessageSpeed();
        }
        return _Window_BattleLog_messageSpeed.call(this);
    };
}
