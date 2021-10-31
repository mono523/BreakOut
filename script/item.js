/**
 * BreakOut | item.js
 * (c) 2021 mono / Gabuniku
 */

// アイテム
// @ts-check

import { Entity } from "./entity.js";
import { Rect, Pos, getTypeColor } from "./util.js";

export class Item extends Entity {
    /**
     * 
     * @param {Pos} pos 
     * @param {number} type 
     */
    constructor(pos, type) {
        super(pos, new Rect(pos, 10, 10), 90, 2);
        this.type = type;
    }
    update() {
        this.goForward();
    }
    render(ctx) {
        ctx.fillStyle = getTypeColor(this.type);
        super.render(ctx)
    }
}
