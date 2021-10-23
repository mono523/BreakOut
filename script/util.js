/**
 * BreakOut | util.js
 * (c) 2021 mono / Gabuniku
 */
// @ts-check

//ユーティリティ

/**
 * Posクラス
 * 座標を管理
 * 原則ユーティリティで座標を扱うときはこれを使う
 */
export class Pos {
    /**
     * @param {number} x - x座標
     * @param {number} y - y座標
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    /**
     * セッター
     * @param {number} x - x座標
     * @param {number} y - y座標
     */
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * ゲッター
     * @returns {Array<number>} 
     */
    getPos() {
        return [this.x, this.y];
    }
    /**
     * 自身のコピーを作る
     * @returns {Pos}
     */
    copy() {
        return new Pos(this.x, this.y);
    }
    /**
     * 相対的に移動
     * @param {number} x 
     * @param {number} y 
     */
    move(x, y) {
        this.x += x;
        this.y = +y;
    }
}
// 当たった辺を表す列挙
export const RectEdgeDirection = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
    NONE: 4
};

export class Rect {

    /**
     * 
     * @param {Pos} pos - 左上の座標
     * @param {number} width - 幅
     * @param {number} height - 高さ
     */
    constructor(pos, width, height) {
        this.pos = pos;
        this.width = width;
        this.height = height
    }
    /**
     * セッター
     * @param {Pos} pos 
     */
    setPos(pos) {
        this.pos = pos;
    }
    /**
     * セッター
     * @param {number} width 
     * @param {number} height 
     */
    setSize(width, height) {
        this.width = width;
        this.height = height
    }

    /**
     * Rectの各数値を返す
     * @returns {number[]}
     */
    getRectParam() {
        return [this.pos.x, this.pos.y, this.width, this.height];
    }

    /**
     * Rectの中心座標のPosを返す
     * @returns {Pos}
     */
    getCenter() {
        let pos, off_x, off_y;
        pos = this.pos.copy();
        off_x = this.width / 2;
        off_y = this.height / 2;
        pos.move(off_x, off_y);
        return pos;
    }
    /**
     * 中心座標をposになるように移動させる
     * @param {Pos} pos 
     */
    setCenter(pos) {
        let off_x, off_y;
        off_x = this.width / 2;
        off_y = this.height / 2;
        this.pos = new Pos(pos.x - off_x, pos.y - off_y);
    }
    /**
     * 
     * @returns {Array<number>}
     */
    getHalfSize() {
        return [this.width / 2, this.height / 2];
    }
    /**
     * 衝突してるかを確認
     * @param {Rect} rect 当たっているかの相手
     * @returns {boolean} 結果
     */
    getCollision(rect) {
        let rect_half = this.getHalfSize();
        let rect1_half = rect.getHalfSize();
        let rect_pos = this.getCenter();
        let rect1_pos = rect.getCenter();
        let diff_x = Math.abs(rect_pos[0] - rect1_pos[0]) // X座標の差
        let diff_y = Math.abs(rect_pos[1] - rect1_pos[1]) // Y座標の差
        if ((rect_half[0] + rect1_half[0]) >= diff_x && (rect_half[1] + rect1_half[1]) >= diff_y) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 衝突している辺を求める
     * @param {Rect} rect
     * @returns {number}
     */
    getCollisionEdge(rect) {
        if (!this.getCollision(rect)) {
            return RectEdgeDirection.NONE;
        }
        let rect_half = this.getHalfSize();
        let rect1_half = rect.getHalfSize();
        let rect_pos = this.getCenter();
        let rect1_pos = rect.getCenter();
        let diff_x = Math.abs(rect_pos[0] - rect1_pos[0]);// X座標の差
        let diff_y = Math.abs(rect_pos[1] - rect1_pos[1]); // Y座標の差
        let collision_x = diff_x - (rect_half[0] + rect1_half[0]); //重なっている辺の長さ
        let collision_y = diff_y - (rect_half[1] + rect1_half[1]);
        if (collision_x > collision_y) {
            if ((rect.pos.x - this.pos.x) > 0) {//自分が左側 -> 右の辺
                return RectEdgeDirection.RIGHT;
            } else {
                return RectEdgeDirection.LEFT;
            }
        } else {
            if ((rect.pos.y - this.pos.y) > 0) {//自分が上 -> 下の辺
                return RectEdgeDirection.DOWN;
            } else {
                return RectEdgeDirection.UP;
            }
        }
    }
    /**
     * コピー
     * @returns {Rect}
     */
    copy() {
        return new Rect(this.pos.copy(), this.width, this.height);
    }
}

export class Clock{
    /**
     * フレーム管理など行うクラス
     * @param {number} fps 
     */
    constructor(fps){
        this.fps = fps;
        this.last_tick = 0;
        this.last_call_time = performance.now();
    }
    /**
     * calc tick
     * @returns {number} - 前回の呼び出しからのtick
     */
    tick(){
        let time = performance.now();
        this.last_tick = time - this.last_call_time;
        this.last_call_time = time;
        return this.last_tick;
    }
}

/**
 * 
 * @param {Pos} pos1 
 * @param {Pos} pos2 
 * @returns {number}
 */
export function getDistance(pos1, pos2) {
    return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2)
}


/**
 * min以上max以下の乱数を返す
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * pos1からpos2への向きを計算
 * @param {Pos} pos1 
 * @param {Pos} pos2 
 * @returns {number} 角度
 */
export function getAngleToPos(pos1, pos2) {
    let rad = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
    return rad * (180 / Math.PI);
}

/**
 * 当たった辺と今の角度から反射角を出す
 * @param {number} angle - 今の角度
 * @param {number} edge - RectEdgeDirection
 */
export function getReflectAngle(angle, edge = RectEdgeDirection.NONE) {
    switch (edge) {
        case RectEdgeDirection.LEFT:
        case RectEdgeDirection.RIGHT:
            return 180 - angle;
        case RectEdgeDirection.UP:
        case RectEdgeDirection.DOWN:
            return 360 - angle;
        default:
            return angle;
    }
}

export const COLOR_TYPE = {
    WHITE: 0,
    BLACK: 1,
    RED: 2,
    ORANGE: 3,
    YELLOW: 4,
    GREEN: 5,
    YELLOW_GREEN: 6,
    BLUE: 7,
    PURPLE: 8,
    PINK: 9,
};

/**
 * colorを返す
 * @param {number} type 
 * @returns {string}
 */
export function getTypeColor(type) {
    switch (type) {
        case COLOR_TYPE.WHITE:
            return "rgb(255, 255, 255)";
        case COLOR_TYPE.BLACK:
            return "rgb(0, 0, 0)";
        case COLOR_TYPE.RED:
            return "rgb(255, 0, 0)";
        case COLOR_TYPE.ORANGE:
            return "rgb(255, 150, 255)";
        case COLOR_TYPE.YELLOW:
            return "rgb(255, 255, 0)";
        case COLOR_TYPE.GREEN:
            return "rgb(0, 255, 0)";
        case COLOR_TYPE.YELLOW_GREEN:
            return "rgb(0, 255, 150)";
        case COLOR_TYPE.BLUE:
            return "rgb(0, 0, 255)";
        case COLOR_TYPE.PURPLE:
            return "rgb(150, 0, 255)";
        case COLOR_TYPE.PINK:
            return "rgb(255, 0, 255)";
        default:
            return "rgb(255, 255, 255)";
    }
}
/**
 * 指定した座標が中心になるように文字を描画する
 * @param {string} text
 * @param {CanvasRenderingContext2D} ctx
 * @param {number|Pos} x
 * @param {number} y
 * @returns {number[]} - 描画した座標
 */
export function renderTextToCenterPos(text,ctx,x,y=0){
    if(x instanceof Pos){
        [x,y] = x.getPos();
    }
    let txt = ctx.measureText(text);
    let width = txt.width;
    let render_x = x - (width/2);
    ctx.strokeText(text,render_x,y);
    return [render_x,y];
}