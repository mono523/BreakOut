/**
 * BreakOut | main.js
 * (c) 2021 mono / Gabuniku
 */
// @ts-check

import * as util from "./util.js"
import { Ball } from "./ball.js"

//メインファイル

//変数たち
var CANVAS;
/** @type {CanvasRenderingContext2D} - canvasのコンテキスト*/
var CANVAS_CONTEXT;
/** @type {boolean} - ゲームフラグ */
var GAME_FLAG = false;
/** @type {boolean} - 初期化フラグ */
var INIT_FLAG = false;
/** @type {Array<Ball>} */
const BALLS = [];
/** @type {util.Clock} */
const CLOCK = new util.Clock(60);
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
    /** @type {boolean} */
    Shot: false
};
/** @type {object} - ゲームの状態*/
const GAME_STATUS_ENUM = {
    /** @type {number} */
    LOAD: 0,
    /** @type {number} */
    TITLE: 1,
    /** @type {number} */
    STAGE_SELECT: 2,
    /** @type {number} */
    GAME: 3,
    /** @type {number} */
    GAME_OVER: 4
};
/** @type {number} */
var GAME_STATUS = 0;

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
        case "z":
        case "Z":
            KeyStatus.Shot = true;
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
        case "z":
        case "Z":
            KeyStatus.Shot = false;
            break;
    }
}
/**
 * キー入力の状態をリセット
 */
function KeyReset() {
    KeyStatus.Up = false;
    KeyStatus.Down = false;
    KeyStatus.Left = false
    KeyStatus.Right = false;
    KeyStatus.Shot = false;
}

function Title(){}

/**
 * 描画関数
 */
function Render() { }


/**
 * メインループ
 */
function MainLoop() {
    switch (GAME_STATUS) {
        case GAME_STATUS_ENUM.LOAD:
            break;
        case GAME_STATUS_ENUM.TITLE:
            Title();
            break;
        case GAME_STATUS_ENUM.STAGE_SELECT:
            break;
        case GAME_STATUS_ENUM.GAME:
            break;
        case GAME_STATUS_ENUM.GAME_OVER:
            break;
        default:
            break;
    }
}


/**
 * 初期化
 * @returns {boolean} - 成功したかどうか
 */
function Init() {
    CANVAS = document.getElementById("canvas");
    // @ts-ignore
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