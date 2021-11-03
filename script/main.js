/**
 * BreakOut | main.js
 * (c) 2021 mono / Gabuniku
 */
// @ts-check

import * as util from "./util.js"
import { Ball } from "./ball.js"
import { Entity } from "./entity.js";
import { Block } from "./block.js";
import { BuildStage, KonamiStage, STAGES } from "./stage.js";
import { Item } from "./item.js";

//メインファイル

// クラス

class Paddle extends Entity {
    /**
     * 
     * @param {util.Pos} pos 
     * @param {number} size 
     */
    constructor(pos, size) {
        super(pos, new util.Rect(pos.copy(), size, 8));
        this.size = size;
        this.rect.setCenter(pos.copy());
    }
    update() {
        if (KeyStatus.Left) {
            if (this.pos.x - (this.rect.width / 2) >= 0) {
                this.pos.move(-this.speed, 0);
            }
        }
        if (KeyStatus.Right) {
            if (this.pos.x + (this.rect.width / 2) <= CANVAS.width) {
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
/** @type {boolean} - ロードフラグ */
var LOAD_FLAG = false;
/** @type {number} */
var frame_count = 0;
/** @type {Array<Ball>} */
const BALLS = [];
/** @type {Array<Array<Block>>} */
var BLOCKS = [];
/** @type {Array<Item>} */
const ITEMS = [];
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
    Shot: false,
    /** @type {boolean} */
    Escape: false
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
/** @type {number} */
var StageSelectIndex = 0;
/** @type {number} */
var DestructibleBlockCount = 0; // ステージ上の消せるブロックの残り
const PaddleWidth = 60;
let PADDLE = new Paddle(new util.Pos(250, 450), PaddleWidth);
var EndFrame = 0;
var ClearFlag = false;
var GameOverFlag = false;
var konami_flag = false;
var cheat_flag = false;
const CMD_LIST = [];
const AudioData = {};
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
            CMD_LIST.push("U");
            break;
        case "touchUp":
            KeyStatus.Up = true;
        case "Down":
        case "ArrowDown":
            KeyStatus.Down = true;
            CMD_LIST.push("D");
            break;
        case "Left":
        case "ArrowLeft":
            KeyStatus.Left = true
            CMD_LIST.push("L");
            break;
        case "Right":
        case "ArrowRight":
            KeyStatus.Right = true;
            CMD_LIST.push("R");
            break;
        case "Space":
            KeyStatus.Shot = true;
            break;
        case "Escape":
            KeyStatus.Escape = true;
            break;
        case "KeyA":
            CMD_LIST.push("A");
            break;
        case "KeyB":
            CMD_LIST.push("B");
            break;

    }
    if (CMD_LIST.length > 10) {
        CMD_LIST.splice(0, 1)
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
        case "Escape":
            KeyStatus.Escape = false;
            break;
    }
}
//スマホ対応
var upButton = document.getElementById("upButton");
upButton.addEventListener("touchstart", touchUp);
upButton.addEventListener("touchend", touchUp);
function touchUp(e){
    if(e.type == 'touchstart'){
        KeyStatus.Up = true;
    } else if(e.type == 'touchend'){
        KeyStatus.Up = false;
    }
}
var downButton = document.getElementById("downButton");
downButton.addEventListener("touchstart", touchDown);
downButton.addEventListener("touchend", touchDown);
function touchDown(e){
    if(e.type == 'touchstart'){
        KeyStatus.Down = true;
    } else if(e.type == 'touchend'){
        KeyStatus.Down = false;
    }
}
var leftButton = document.getElementById("leftButton");
leftButton.addEventListener("touchstart", touchLeft);
leftButton.addEventListener("touchend", touchLeft);
function touchLeft(e){
    if(e.type == 'touchstart'){
        KeyStatus.Left = true;
    } else if(e.type == 'touchend'){
        KeyStatus.Left = false;
    }
}
var rightButton = document.getElementById("rightButton");
rightButton.addEventListener("touchstart", touchRight);
rightButton.addEventListener("touchend", touchRight);
function touchRight(e){
    if(e.type == 'touchstart'){
        KeyStatus.Right = true;
    } else if(e.type == 'touchend'){
        KeyStatus.Right = false;
    }
}
var shotButton = document.getElementById("shotButton");
shotButton.addEventListener("touchstart", touchShot);
shotButton.addEventListener("touchend", touchShot);
function touchShot(e){
    if(e.type == 'touchstart'){
        KeyStatus.Shot = true;
    } else if(e.type == 'touchend'){
        KeyStatus.Shot = false;
    }
}
var escapeButton = document.getElementById("escapeButton");
escapeButton.addEventListener("touchstart", touchEscape);
escapeButton.addEventListener("touchend", touchEscape);
function touchEscape(e){
    if(e.type == 'touchstart'){
        KeyStatus.Escape = true;
    } else if(e.type == 'touchend'){
        KeyStatus.Escape = false;
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
    KeyStatus.Escape = false;
}
/**
 * アイテムを取った時
 * @param {number} type 
 */
function ItemFunc(type) {
    switch (type) {
        case 3:
            //弾二倍
            for (let index = 0; index < BALLS.length/2; index++) {
                const ball = BALLS[index];
                BALLS.push(new Ball(ball.pos.copy(), ball.angle + util.getRandomRange(-180,180), ball.size, ball.type))
            }
            break;
        case 4:
            // 三つ弾を出す
            let pos = PADDLE.pos.copy();
            pos.move(0, -5);
            for (let index = 0; index < 3; index++) {
                BALLS.push(new Ball(pos.copy(), -135 + (45 * index), 5, 0))
            }
            break;
    }
}

/**
 * タイトル画面
 */
function Title() {
    frame_count++;
    if (KeyStatus.Shot) {
        GAME_STATUS = GAME_STATUS_ENUM.STAGE_SELECT;
        SePlay("hit")
        KeyReset();
        frame_count = 0;
    }
    if (!konami_flag) {
        if (util.sameArray(["U", "U", "D", "D", "L", "R", "L", "R", "B", "A"], CMD_LIST)) {
            konami_flag = true;
            SePlay("gradius");
            STAGES.push(KonamiStage);
        }
    }
    if (util.sameArray(["D", "D", "U", "U", "R", "L", "R", "L", "A", "B"], CMD_LIST)) {
        if (cheat_flag) {
            cheat_flag = false;
        } else { cheat_flag = true; }
        SePlay("gradius");
        CMD_LIST.splice(0);
    }
}

function StageSelect() {
    if (KeyStatus.Shot) {
        GAME_STATUS = GAME_STATUS_ENUM.GAME;
        KeyReset();
        frame_count = 0;
    }
    if (KeyStatus.Up) {
        if (StageSelectIndex > 0) {
            StageSelectIndex--;
        }
    }
    if (KeyStatus.Down) {
        if (StageSelectIndex < STAGES.length - 1) {
            StageSelectIndex++;
        }
    }
    if (KeyStatus.Escape) {
        GAME_STATUS = GAME_STATUS_ENUM.TITLE;
        KeyReset();
        frame_count = 0;
    }

    KeyReset();
}

/**
 * ゲーム状態
 */
function Game() {
    let paddle_coli = false;
    if (frame_count == 0) {
        // 初期化
        PADDLE = new Paddle(new util.Pos(225, 450), PaddleWidth);
        ClearFlag = false;
        GameOverFlag = false;
        GAME_FLAG = false;
        EndFrame = 0;
        ITEMS.splice(0);
        // @ts-ignore
        [BLOCKS, DestructibleBlockCount] = BuildStage(STAGES[StageSelectIndex].blocks);
        console.log(BLOCKS, DestructibleBlockCount);
    }
    if (!GAME_FLAG && KeyStatus.Shot) {
        GAME_FLAG = true;
        let pos = PADDLE.rect.getCenter();
        pos.move(0, -10)
        BALLS.push(new Ball(pos, util.getRandomRange(-135, -45), 5, 0));
    }
    if (!ClearFlag && !GameOverFlag) {
        PADDLE.update();
        let block_coll_snd = false;
        for (let index = 0; index < BALLS.length; index++) {
            const ball = BALLS[index];
            ball.update();
            let block_coll = false;
            if (ball.pos.y > CANVAS.height + 20) {
                BALLS.splice(index, 1); //削除
                continue;
            }
            if (ball.collisionAndFix(PADDLE.rect)) {
                let pos = ball.pos.getPos()[0];
                let pos_p = PADDLE.pos.getPos()[0];
                let dis = (pos - pos_p) / (PADDLE.rect.width / 2);
                ball.setAngle(-90 + (60 * dis));
                paddle_coli = true;
            };
            for (let row = 0; row < BLOCKS.length; row++) {
                const ROW = BLOCKS[row];
                for (let col = 0; col < ROW.length; col++) {
                    const block = ROW[col];
                    let edge = ball.collision(block.rect);
                    if (edge != util.RectEdgeDirection.NONE) {
                        if (block.is_undead) {
                            SePlay("hit2");
                            continue
                        } else {
                            block_coll_snd = true;
                            ROW.splice(col, 1);
                            DestructibleBlockCount--;
                            if (util.getProbability(20)) {
                                ITEMS.push(new Item(block.pos.copy(), Math.floor(util.getRandomRange(3, 5))))
                            }
                        }
                        if (block_coll) {
                            continue;
                        }
                        else {
                            block_coll = true;
                            ball.setAngle(util.getReflectAngle(ball.angle, edge));
                        }
                    }
                }
            }
        }
        for (let index = 0; index < ITEMS.length; index++) {
            const item = ITEMS[index];
            item.update()
            if (item.rect.getCollision(PADDLE.rect)) {
                ItemFunc(item.type);
                ITEMS.splice(index, 1);
            }

        }
        if (KeyStatus.Escape) {
            GAME_STATUS = GAME_STATUS_ENUM.STAGE_SELECT;
            GAME_FLAG = false;
            KeyReset();
            BALLS.splice(0);
            frame_count = 0;
        }
        if (block_coll_snd) {
            // SePlay("hit4");
        }

    }
    if (DestructibleBlockCount == 0) {
        // クリア
        if (ClearFlag) {
            if (EndFrame + 60 < frame_count && KeyStatus.Shot) {
                BALLS.splice(0);
                ITEMS.splice(0);
                GAME_FLAG = false;
                GAME_STATUS = GAME_STATUS_ENUM.STAGE_SELECT;
                frame_count = 0;
                KeyReset();
            }
        } else {
            ClearFlag = true;
            EndFrame = frame_count;
        }

    }
    if (BALLS.length == 0 && GAME_FLAG) {
        if (GameOverFlag) {
            if (EndFrame + 60 < frame_count && KeyStatus.Shot) {
                BALLS.splice(0);
                ITEMS.splice(0);
                GAME_FLAG = false;
                GAME_STATUS = GAME_STATUS_ENUM.STAGE_SELECT;
                frame_count = 0;
                KeyReset();
            }
        }
        else {
            GameOverFlag = true;
            EndFrame = frame_count;
        }
    }
    if (paddle_coli) {
        SePlay("hit3");
    }
}

/**
 * 描画関数
 */
function Render() {
    CANVAS_CONTEXT.fillStyle = "rgb(0,0,0)";
    CANVAS_CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CANVAS_CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);
    switch (GAME_STATUS) {
        case GAME_STATUS_ENUM.TITLE:
            CANVAS_CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
            CANVAS_CONTEXT.fillStyle = "rgb(0,0,0)";
            CANVAS_CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);
            CANVAS_CONTEXT.strokeStyle = "rgb(255,255,255)";
            CANVAS_CONTEXT.font = "100px Impact";
            util.renderTextToCenterPos("Break Out", CANVAS_CONTEXT, 250, 130);
            CANVAS_CONTEXT.font = "20px Impact";
            CANVAS_CONTEXT.fillStyle = "rgb(255,255,255)";
            util.renderTextToCenterPos("(c) 2021 mono / Gabuniku", CANVAS_CONTEXT, 250, 160, true);
            if (Math.sin(frame_count * 0.1) > 0) {
                CANVAS_CONTEXT.font = "40px Impact";
                util.renderTextToCenterPos("- Press Shot Key -", CANVAS_CONTEXT, 250, 430);
            }
            break;
        case GAME_STATUS_ENUM.STAGE_SELECT:
            for (let index = 0; index < STAGES.length; index++) {
                const stage = STAGES[index];
                if (index == StageSelectIndex) {
                    CANVAS_CONTEXT.fillStyle = "rgb(0, 255, 150)";
                    CANVAS_CONTEXT.strokeStyle = "rgb(255, 0, 0)";
                } else {
                    CANVAS_CONTEXT.fillStyle = "rgb(150, 150, 150)";
                    CANVAS_CONTEXT.strokeStyle = "rgb(255, 255, 255)";
                }

                CANVAS_CONTEXT.fillRect(30, 200 + (150 * (index - StageSelectIndex)), 440, 120);
                CANVAS_CONTEXT.font = "50px メイリオ";
                CANVAS_CONTEXT.fillStyle = "rgb(255, 0, 150)";
                util.renderTextToCenterPos(stage.name, CANVAS_CONTEXT, 250, 250 + (150 * (index - StageSelectIndex)), true);
                CANVAS_CONTEXT.font = "30px メイリオ";
                util.renderTextToCenterPos(stage.comment, CANVAS_CONTEXT, 250, 300 + (150 * (index - StageSelectIndex)));

            }
            CANVAS_CONTEXT.fillStyle = "rgb(255, 255, 255)";
            CANVAS_CONTEXT.fillRect(30, 20, 440, 150);
            CANVAS_CONTEXT.fillStyle = "rgb(0, 0, 0)";
            CANVAS_CONTEXT.font = "80px Impact";
            util.renderTextToCenterPos("Select Stage", CANVAS_CONTEXT, 250, 100, true);
            CANVAS_CONTEXT.font = "30px Impact";
            util.renderTextToCenterPos("- Use ↑ or ↓ to Select -", CANVAS_CONTEXT, 250, 150, true);
            break;
        case GAME_STATUS_ENUM.GAME:
            CANVAS_CONTEXT.fillStyle = STAGES[StageSelectIndex].back_color;
            CANVAS_CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);
            for (let index = 0; index < BALLS.length; index++) {
                const ball = BALLS[index];
                ball.render(CANVAS_CONTEXT);
                //CANVAS_CONTEXT.fillStyle = "rgb(255, 0, 0)";
                //CANVAS_CONTEXT.fillRect(ball.rect.pos.x, ball.rect.pos.y, ball.rect.width, ball.rect.height);
            }
            for (let row = 0; row < BLOCKS.length; row++) {
                const ROW = BLOCKS[row];
                for (let col = 0; col < ROW.length; col++) {
                    const block = ROW[col];
                    block.render(CANVAS_CONTEXT);
                }
            }
            for (let index = 0; index < ITEMS.length; index++) {
                const item = ITEMS[index];
                item.render(CANVAS_CONTEXT);


            }
            CANVAS_CONTEXT.fillStyle = "rgb(255,255,255)";
            PADDLE.render(CANVAS_CONTEXT);
            if (ClearFlag) {
                CANVAS_CONTEXT.fillStyle = "rgb(100, 100, 100)";
                CANVAS_CONTEXT.fillRect(0, 200, 500, 100);
                CANVAS_CONTEXT.fillStyle = "rgb(255, 255, 255)";
                CANVAS_CONTEXT.font = "80px Impact";
                util.renderTextToCenterPos("Clear !", CANVAS_CONTEXT, 250, 280, true);
            }
            if (GameOverFlag) {
                CANVAS_CONTEXT.fillStyle = "rgb(100, 100, 100)";
                CANVAS_CONTEXT.fillRect(0, 200, 500, 100);
                CANVAS_CONTEXT.fillStyle = "rgb(255, 255, 255)";
                CANVAS_CONTEXT.font = "80px Impact";
                util.renderTextToCenterPos("Game Over !", CANVAS_CONTEXT, 250, 280, true);
            }
            break;
        case GAME_STATUS_ENUM.GAME_OVER:
            break;
        default:
            break;
    }
}


/**
 * @param {string}  key
 */
function SePlay(key) {
    try {
        let audio = AudioData[key];
        audio.currentTime = 0;
        audio.play();
    } catch (error) {
        console.log(error);
    }
}

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
            StageSelect();
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
    Render();
    setTimeout(MainLoop, 16.666);
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
    AudioData["hit"] = document.getElementById("se_hit");
    AudioData["hit2"] = document.getElementById("se_hit2");
    AudioData["hit3"] = document.getElementById("se_hit3");
    AudioData["hit4"] = document.getElementById("se_hit4");
    AudioData["gradius"] = document.getElementById("se_gradius");
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