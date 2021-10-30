/**
 * BreakOut | item.js
 * (c) 2021 mono / Gabuniku
 */
// @ts-check

import { Entity } from "./entity";
import { Rect ,Pos} from "./util";

export class Item extends Entity{
    /**
     * 
     * @param {Pos} pos 
     * @param {number} type 
     */
    constructor(pos,type){
        super(pos,new Rect(pos,10,10),90,3);
        this.type = type;
    }
}
