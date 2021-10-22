/**
 * BreakOut | main.js
 * (c) 2021 mono / Gabuniku
 */
// @ts-check
//メインファイル

//変数たち
var CANVAS;
/** @type {CanvasRenderingContext2D} - canvasのコンテキスト*/
var CANVAS_CONTEXT;
/** @type {boolean} - ゲームフラグ */
var GAME_FLAG = false;
/** @type {boolean} - 初期化フラグ */
var INIT_FLAG = false;
/** @type {object} - 入力の状態*/
const KeyStatus = {
    /** @type {boolean} */
    Up: false,
    /** @type {boolean} */
    Down: false,
    /** @type {boolean} */
    Left: false,
    /** @type {boolean} */
    Right: false,
};

/**
 * キーボードが押されたときに呼ばれる
 * @param {KeyboardEvent} evt 
 */
function KeyDown(evt) {
    //押されたキーの判別
    switch (evt.key) {
        case "Up":
        case "ArrowUp":
            KeyStatus.Up = true;
            break;
        case "Down":
        case "ArrowDown":
            KeyStatus.Down = true;
            break;
        case "Left":
        case "ArrowLeft":
            KeyStatus.Left = true
            break;
        case "Right":
        case "ArrowRight":
            KeyStatus.Right = true;
            break;
    }
}
/**
 * キーボードが離されたに呼ばれる
 * @param {KeyboardEvent} evt 
 */
function KeyUp(evt) {
    // 離されたキーの判別
    switch (evt.key) {
        case "Up":
        case "ArrowUp":
            KeyStatus.Up = false;
            break;
        case "Down":
        case "ArrowDown":
            KeyStatus.Down = false;
            break;
        case "Left":
        case "ArrowLeft":
            KeyStatus.Left = false
            break;
        case "Right":
        case "ArrowRight":
            KeyStatus.Right = false;
            break;
    }
}

/**
 * 描画関数
 */
function Render(){}


/**
 * メインループ
 */
function MainLoop() { }


/**
 * 初期化
 * @returns {boolean} - 成功したかどうか
 */
function Init() {
    CANVAS = document.getElementById("canvas");
    CANVAS_CONTEXT = CANVAS.getContext("2d");
    if (CANVAS_CONTEXT == undefined) {
        return false;
    }
    return true;
}
/**
 * 初期化処理
 */
window.onload = function () {
    INIT_FLAG = Init();
    if (INIT_FLAG) {
        alert("初期化してください")
    }
}