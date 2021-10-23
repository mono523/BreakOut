/**
 * BreakOut | entity.js
 * (c) 2021 mono / Gabuniku
 */
// @ts-check

import { Pos, Rect } from "./util.js"

//エンティティ

export class Entity {
    /**
     * 基本継承
     * @param {Pos} pos - 座標
     * @param {Rect} rect - あたり判定
     * @param {number} angle - 角度
     * @param {number} speed - 速さ
     */
    constructor(pos, rect, angle = 0, speed = 10) {
        this.pos = pos;
        this.rect = rect;
        this.angle = angle;
        this.speed = speed;
        this.frame_count = 0;
        this.rate_x = 0;
        this.rate_y = 0;
        this.dead_flag = false;
        this.setAngle(angle);
    }
    /**
     * セッター
     * @param {number} angle - 度
     */
    setAngle(angle) {
        this.rate_x = Math.cos(angle * Math.PI / 180);
        this.rate_y = Math.sin(angle * Math.PI / 180);
        this.angle = angle;
    }
    /**
     * 毎フレーム呼ぶこと
     */
    update() {
        this.rect.setPos(this.pos.copy());
        this.frame_count++;
    }
    /**
     * 前に進む
     */
    goForward() {
        this.pos.x += this.speed * this.rate_x;
        this.pos.y += this.speed * this.rate_y;
    }
    /**
     * 自身のRectを描画する。継承先でrenderを実装しているのであればsuperを呼ばなくていい
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
        let [x, y, w, h] = this.rect.getRectParam();
        ctx.fillRect(x, y, w, h);
    }
}