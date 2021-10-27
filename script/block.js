/**
 * BreakOut | block.js
 * (c) 2021 mono / Gabuniku
 */
// @ts-check

import { Entity } from "./entity.js"
import { Pos, Rect, getTypeColor } from "./util.js"
//ブロック

export class Block extends Entity {
    /**
     * @param {Pos} pos
     * @param {number} type - 10の桁で種類を表し,1の桁で色を表す 色はutilの列挙体
     * @param {number} size
     */
    constructor(pos, type, size) {
        super(pos, new Rect(pos.copy(), size, size));
        this.size = size;
        this.type = type % 10; //10のクライ
        this.color = Math.floor(type / 10);//1のクライ
        this.is_undead = (this.type == 2);
    }
    /**
     * a
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
        let old_style = ctx.fillStyle;
        ctx.fillStyle = getTypeColor(this.color);
        let [x, y, w, h] = this.rect.getRectParam();
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = old_style;
    }
}