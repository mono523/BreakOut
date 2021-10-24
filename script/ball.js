/**
 * BreakOut | ball.js
 * (c) 2021 mono / Gabuniku
 */
// @ts-check
import { Entity } from "./entity.js"
import * as util from "./util.js"

// ボール


export class Ball extends Entity {
    /**
     * 
     * @param {util.Pos} pos - 座標
     * @param {number} angle - 角度
     * @param {number} size - 大きさ
     * @param {number} type - 種類
     */
    constructor(pos, angle, size, type) {
        super(pos, new util.Rect(pos.copy(), size, size), angle, 10);
        this.type = type;
        this.size = size;
    }
    update() {
        this.goForward();
        if (this.pos.x <= 0 || this.pos.x >= 500) {
            let angle = util.getReflectAngle(this.angle, util.RectEdgeDirection.LEFT);
            this.setAngle(angle);
        }
        if (this.pos.y <= 0) {
            let angle = util.getReflectAngle(this.angle, util.RectEdgeDirection.UP);
            this.setAngle(angle);
        }
        super.update();
    }

    /**
     * 
     * @param {util.Rect} rect - paddle rect
     */
    collision(rect) {
        let edge = this.rect.getCollisionAndFix(rect);
        if (edge != util.RectEdgeDirection.NONE) {
            let pos = this.rect.pos.copy();
            this.setAngle(util.getReflectAngle(this.angle, edge));
        }
    }
    /**
     * 描画
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
        let old_style = ctx.fillStyle;
        ctx.fillStyle = util.getTypeColor(this.type);
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.fillStyle = old_style;
    }
}