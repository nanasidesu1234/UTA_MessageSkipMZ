//=============================================================================
// UTA_MessageSkipMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Could to skip message by holding down a specific key.
 *
 * @author t-akatsuki
 * @url https://www.utakata-no-yume.net
 *
 * @param assignKeyCodes
 * @text Assgin keys
 * @desc Keys to be assigned to message skip.
 * You can assign up to multiple keys.
 * @default ["control"]
 * @type select[]
 * @option tab (tab)
 * @value tab
 * @option enter/space/Z (ok)
 * @value ok
 * @option shift (shift)
 * @value shift
 * @option control/alt (control)
 * @value control
 * @option escape/insert/X/numpad 0 (escape)
 * @value escape
 * @option pageup/Q (pageup)
 * @value pageup
 * @option pagedown/W (pagedown)
 * @value pagedown
 * @option left arrow/nampad 4 (left)
 * @value letf
 * @option up arrow/nampad 8 (up)
 * @value up
 * @option right arrow/numpad 6 (right)
 * @value right
 * @option down arrow/numpad 2 (down)
 * @value down
 * @option F9 (debug)
 * @value debug
 *
 * @help # Overview
 * This plugin make to skip message by hold down a specific key 
 * while the message is displayed.
 * It is a message skip function that is often used Text adventure game etc.
 *
 * When a choice is inserted, the skipping is interrupted 
 * when the choice is displayed.
 *
 * The following messages can be skipped.
 * - Show Text
 * - Show Scrolling Text
 *   - not skip if check "No fast Forward".
 * - Battle log in battle
 *
 * # Plugin Parameters
 * ## Assgin keys
 * Key to be assigned to message skipping.
 * Multiple keys can be assigned.
 *
 * If you assign more than one key, the message will be skipped 
 * while any one of the keys is being pressed.
 *
 * Select one of the available keys in the dropdown list.
 * - Available keys are within the keymap defined in 
 *   the RPGMakerMZ core script.
 *
 * Keys in parentheses are identifiers at the time of setting.
 *
 * By default, "control" and "alt" keys are set.
 *
 * # Plugin Commands
 * This plugin has no plugin commands.
 *
 * # Plugin Informations
 * Version      : 0.9.0
 * Last Updated : 2020.11.07
 * Author       : t-akatsuki
 * Web Site     : https://www.utakata-no-yume.net
 * GitHub       : https://github.com/t-akatsuki
 * Twitter      : https://twitter.com/T_Akatsuki
 * License      : MIT License
 *
 * # Changelog
 * ## 0.9.0 (2020.11.07)
 * Beta version.
 * Remake for RPGMakerMV based on UTA_MessageSkip plugin for RPGMakerMZ.
 */
/*:ja
 * @target MZ
 * @plugindesc 特定キーを押し続ける事でメッセージを早送りできるようにします。
 *
 * @author 赤月 智平(t-akatsuki)
 * @url https://www.utakata-no-yume.net
 *
 * @param assignKeyCodes
 * @text 割り当てキー定義
 * @desc メッセージスキップに割り当てるキーです。
 * 複数割り当てる事ができます。
 * @default ["control"]
 * @type select[]
 * @option tab (tab)
 * @value tab
 * @option enter/space/Z (ok)
 * @value ok
 * @option shift (shift)
 * @value shift
 * @option control/alt (control)
 * @value control
 * @option escape/insert/X/numpad 0 (escape)
 * @value escape
 * @option pageup/Q (pageup)
 * @value pageup
 * @option pagedown/W (pagedown)
 * @value pagedown
 * @option left arrow/nampad 4 (left)
 * @value letf
 * @option up arrow/nampad 8 (up)
 * @value up
 * @option right arrow/numpad 6 (right)
 * @value right
 * @option down arrow/numpad 2 (down)
 * @value down
 * @option F9 (debug)
 * @value debug
 *
 * @help # 概要
 * メッセージ表示中に特定キーを押し続ける事で
 * メッセージの早送りを行う事ができるようになるプラグインです。
 *
 * ADV等で良くあるメッセージスキップ機能です。
 * 選択肢を挟む場合は選択肢が表示されるタイミングでスキップが中断されます。
 *
 * スキップできるメッセージは以下が対象です。
 *
 * ・文章の表示
 * ・文章のスクロール表示
 *   - 「早送りなし」を指定した場合はスキップ不可。
 * ・戦闘中のバトルログ
 *
 * # プラグインパラメータ
 * ## 割り当てキー定義
 * メッセージスキップに割り当てるキーです。
 * 複数割り当てる事ができます。
 * 複数割り当てた場合はいずれかのキーを押している間にスキップが行われます。
 *
 * 利用できるキーの中からドロップダウンリストで選択します。
 * ※利用できるキーはRPGツクールMZのコアスクリプトで定義された
 *   キーマップの範囲となります。
 * ※()内表記は設定時の識別子です。
 *
 * デフォルトは「control」「alt」キーが設定されています。
 *
 * # プラグインコマンド
 * プラグインコマンドはありません。
 *
 * # プラグインの情報
 * バージョン : 0.9.0
 * 最終更新日 : 2020.11.07
 * 制作者     : 赤月 智平(t-akatsuki)
 * Webサイト  : https://www.utakata-no-yume.net
 * GitHub    : https://github.com/t-akatsuki
 * Twitter   : https://twitter.com/T_Akatsuki
 * ライセンス : MIT License
 *
 * # 更新履歴
 * ## 0.9.0 (2020.11.07)
 * β版。
 * RPGツクールMV用UTA_MessageSkipをRPGツクールMZ用に移植。
 */