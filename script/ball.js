/**
 * BreakOut | ball.js
 * (c) 2021 mono / Gabuniku
 */
// @ts-check
import { Entity } from "./entity.js"
import { GRAVITY, ReflectionCoefficient, Vec2 } from "./physics.js";
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
        super(pos, new util.Rect(pos.copy(), size + 1, size + 1), angle, 3);
        this.type = type;
        this.size = size;
        this.physics = (type == 3);
        this.vec = null;
        if (this.physics) {
            this.vec = new Vec2(0, 10);
            this.speed = 5;
        }
    }
    update() {
        if (this.physics) {
            // 物理学mode 
            // 物理平均点のワイが物理を実装するｗ
            if(this.vec.y < 5){
                this.vec.y += GRAVITY;
            }else{
                this.vec.y = 5;
            }
            this.pos.x +=  this.vec.x;
            this.pos.y +=  this.vec.y;
            console.log(this.vec)
            if (this.pos.x - this.size <= 0 || this.pos.x + this.size >= 500) {
                this.vec.x *= -ReflectionCoefficient;
                if (this.pos.x - this.size <= 0) {
                    this.pos.x = this.size;
                } else {
                    this.pos.x = 500 - this.size;
                }
            }
            if (this.pos.y - this.size <= 0) {
                this.vec.y = 5;//*= -ReflectionCoefficient;
            }
          
            this.setAngle(this.vec.getAngle());
        } else {
            this.goForward();
            if (this.pos.x - this.size <= 0 || this.pos.x + this.size >= 500) {
                let angle = util.getReflectAngle(this.angle, util.RectEdgeDirection.LEFT);
                this.setAngle(angle);
                if (this.pos.x - this.size <= 0) {
                    this.pos.x = this.size;
                } else {
                    this.pos.x = 500 - this.size;
                }
            }
            if (this.pos.y - this.size <= 0) {
                let angle = util.getReflectAngle(this.angle, util.RectEdgeDirection.UP);
                this.pos.y = 0 + this.size;
                this.setAngle(angle);
            }
        }
        super.update();
    }

    /**
     * 
     * @param {util.Rect} rect - paddle rect
     * @returns {number}
     */
    collision(rect) {
        return this.rect.getCollisionEdge(rect);
    }
    /**
     * 
     * @param {util.Rect} rect - paddle rect
     * @returns {boolean}
     */
    collisionAndFix(rect) {
        let edge = this.rect.getCollisionAndFix(rect);
        if (edge != util.RectEdgeDirection.NONE) {
            this.setAngle(util.getReflectAngle(this.angle, edge));
            return true;
        } else {
            return false;
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
    /**
     * 画面外に行くまでにかかる時間(フレーム)
     * 上を向いているときはステージの上辺で反射して帰ってくるまでの時間
     * 時間 = 距離 / 速さ やってるだけ
     * @returns {number}
     */
    getDownTime() {
        if (this.angle < 0) { // 上向き
            return Math.abs((500 + this.pos.y) / this.rate_y * this.speed);
        } else {
            return Math.abs((500 - this.pos.y) / this.rate_y * this.speed);
        }
    }
}