/**
 * BreakOut | main.js
 * (c) 2021 mono / Gabuniku
 */
// @ts-check

import * as util from "./util.js"
import { Ball } from "./ball.js"
import { Entity } from "./entity.js";

//メインファイル

// クラス

class Paddle extends Entity {
    /**
     * 
     * @param {util.Pos} pos 
     * @param {number} size 
     */
    constructor(pos, size) {
        super(pos, new util.Rect(pos.copy(), size, 40));
    }
    update() {
        if (KeyStatus.Left) {
            if (this.pos.x - this.speed > 0) {
                this.pos.move(-this.speed, 0);
            }
        }
        if (KeyStatus.Right) {
            if (this.pos.x + this.rect.width + this.speed < CANVAS.width) {
                this.pos.move(this.speed, 0);
            }
        }
        super.update();
    }
}

//変数たち
var CANVAS;
/** @type {CanvasRenderingContext2D} - canvasのコンテキスト*/
var CANVAS_CONTEXT;
/** @type {boolean} - ゲームフラグ */
var GAME_FLAG = false;
/** @type {boolean} - 初期化フラグ */
var INIT_FLAG = false;
/** @type {number} */
var frame_count = 0;
/** @type {Array<Ball>} */
const BALLS = [];
/** @type {util.Clock} */
const CLOCK = new util.Clock(60);
/** @type {util.Rect} */
const STAGE_RECT = new util.Rect(new util.Pos(0, 0), 0, 0);
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

let PADDLE = new Paddle(new util.Pos(225, 450), 100);



/**
 * キーボードが押されたときに呼ばれる
 * @param {KeyboardEvent} evt 
 */
function KeyDown(evt) {
    //押されたキーの判別
    switch (evt.code) {
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
        case "Space":
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
    switch (evt.code) {
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
        case "Space":
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

/**
 * タイトル画面
 */
function Title() {
    CANVAS_CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CANVAS_CONTEXT.fillStyle = "rgb(0,0,0)";
    CANVAS_CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);
    CANVAS_CONTEXT.strokeStyle = "rgb(255,255,255)";
    CANVAS_CONTEXT.font = "50px メイリオ";
    util.renderTextToCenterPos("Break Out", CANVAS_CONTEXT, 250, 100);
    util.renderTextToCenterPos("ブロック崩し", CANVAS_CONTEXT, 250, 150);
    CANVAS_CONTEXT.font = "30px メイリオ";
    util.renderTextToCenterPos("ショットキーを押して開始", CANVAS_CONTEXT, 250, 430);
    if (KeyStatus.Shot) {
        GAME_STATUS = GAME_STATUS_ENUM.STAGE_SELECT;
    }
}

function StageSelect() {
    GAME_FLAG = true;
    frame_count = 0;
    KeyReset();
}

/**
 * ゲーム状態
 */
function Game() {
    if (frame_count == 0) {
        // 初期化

    }

}

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
            CANVAS_CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
            break;
        case GAME_STATUS_ENUM.GAME:
            Game();
            frame_count++;
            break;
        case GAME_STATUS_ENUM.GAME_OVER:
            break;
        default:
            break;
    }
    setTimeout(MainLoop, 16.66);
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
    // @ts-ignore
    STAGE_RECT.setSize(CANVAS.width, CANVAS.height);
    document.addEventListener("keydown", KeyDown);
    document.addEventListener("keyup", KeyUp);
    return true;
}
/**
 * 初期化処理
 */
window.onload = function () {
    INIT_FLAG = Init();
    if (!INIT_FLAG) {
        alert("初期化に失敗しました")
    }
    GAME_STATUS = GAME_STATUS_ENUM.TITLE;
    MainLoop();
}