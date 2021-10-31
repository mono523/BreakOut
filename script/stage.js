/**
 * BreakOut | stage.js
 * (c) 1221 mono / Gabuniku
 */
// @ts-check
//ステージデータ
import { Pos, Rect } from "./util.js"
import { Block } from "./block.js"

/**
 * ブロックのグリッドは25x16とする
 */
export const BLOCK_SIZE = 10;
export const GRID_SIZE = [50, 40];


const TestStage = fill_stage();

const NormalStage = {
    name: "Stage1",
    comment: "埋めただけ",
    blocks: [
        [...fillBlock(30,GRID_SIZE[0])],
        [...fillBlock(30,GRID_SIZE[0])],
        [...fillBlock(30,GRID_SIZE[0])],
        [...fillBlock(30,GRID_SIZE[0])],
        [...fillBlock(30,GRID_SIZE[0])],
        [...fillBlock(40,GRID_SIZE[0])],
        [...fillBlock(40,GRID_SIZE[0])],
        [...fillBlock(40,GRID_SIZE[0])],
        [...fillBlock(40,GRID_SIZE[0])],
        [...fillBlock(40,GRID_SIZE[0])],
        [...fillBlock(50,GRID_SIZE[0])],
        [...fillBlock(50,GRID_SIZE[0])],
        [...fillBlock(50,GRID_SIZE[0])],
        [...fillBlock(50,GRID_SIZE[0])],
        [...fillBlock(50,GRID_SIZE[0])],
        [...fillBlock(60,GRID_SIZE[0])],
        [...fillBlock(60,GRID_SIZE[0])],
        [...fillBlock(60,GRID_SIZE[0])],
        [...fillBlock(60,GRID_SIZE[0])],
        [...fillBlock(60,GRID_SIZE[0])],
        [...fillBlock(80,GRID_SIZE[0])],
        [...fillBlock(80,GRID_SIZE[0])],
        [...fillBlock(80,GRID_SIZE[0])],
        [...fillBlock(80,GRID_SIZE[0])],
        [...fillBlock(80,GRID_SIZE[0])],
        [...fillBlock(120,GRID_SIZE[0])],
        [...fillBlock(120,GRID_SIZE[0])],
        [...fillBlock(120,GRID_SIZE[0])],
        [...fillBlock(120,GRID_SIZE[0])],
        [...fillBlock(120,GRID_SIZE[0])],
        [...fillBlock(90,GRID_SIZE[0])],
        [...fillBlock(90,GRID_SIZE[0])],
        [...fillBlock(90,GRID_SIZE[0])],
        [...fillBlock(90,GRID_SIZE[0])],
        [...fillBlock(90,GRID_SIZE[0])],
        [...fillBlock(90,GRID_SIZE[0])],
    ]
};


export const KonamiStage = {
    name: "konami",
    comment: "↑↑↓↓←→←→BA",
    back_color:"rgb(0,0,0)",
    blocks: [
        [], [], [],
        // バイパー
        [...fillBlock(-1, 13), 120, 10, 120, 120],
        [...fillBlock(-1, 13), -1, 120, 10, 10, 120, 120],
        [...fillBlock(-1, 13), -1, -1, 120, 10, 10, 10, 120, 120],
        [...fillBlock(-1, 13), -1, -1, -1, 120, 10, 10, 10, 10, 120, 120],
        [...fillBlock(-1, 13), -1, -1, -1, -1, 120, 120, 120, 120, 120, 120, 120, -1, 40, 40, 40],
        [...fillBlock(-1, 9), -1, -1, 30, 30, -1, -1, 10, -1, 10, 10, 10, 10, 10, 10, 10, 120, -1, 40, 40, 40, 40, 120],
        [...fillBlock(-1, 9), 30, 30, -1, -1, 10, -1, 10, -1, 10, -1, ...fillBlock(10, 18)],
        [...fillBlock(-1, 9), -1, -1, 30, 30, -1, -1, 10, -1, ...fillBlock(120, 15), 10, 10, 120],
        [...fillBlock(-1, 16), 110, -1, ...fillBlock(10, 11), 120, 120],
        [...fillBlock(-1, 16), 110, 10, -1, 10, 10, 10, 10, 10, 120, 120, 120],
        [...fillBlock(-1, 17), 110, -1, 120, 120, 120, 120],
        [...fillBlock(-1, 18), 110, -1, 120],
        [], 
        [...fillBlock(130,50)],
        [],
        // text
        [...fillBlock(-1, 4), -1, -1, 40, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, 40, 40, 40, 40, 40, -1, -1, -1, -1, -1, 40, 40, 40],
        [...fillBlock(-1, 4), -1, 40, 40, 40, -1, -1, -1, -1, 40, 40, 40, -1, -1, -1, -1, -1, 40, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, 40, 40, 40, 40, 40, -1, -1, -1, -1, 40, 40, -1, 40, 40],
        [...fillBlock(-1, 4), 40, -1, 40, -1, 40, -1, -1, 40, -1, 40, -1, 40, -1, -1, 40, -1, 40, -1, 40, -1, -1, 40, -1, 40, -1, 40, -1, 40, 40, -1, -1, 40, 40, -1, -1, 40, 40, -1, -1, -1, 40, 40],
        [...fillBlock(-1, 4), -1, -1, 40, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, -1, -1, 40, 40, 40, -1, -1, -1, -1, 40, 40, 40, -1, -1, 40, 40, -1, -1, 40, 40, -1, -1, 40, 40, -1, -1, -1, 40, 40],
        [...fillBlock(-1, 4), -1, -1, 40, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, 40, 40, -1, -1, 40, 40, -1, -1, 40, 40, -1, -1, -1, 40, 40],
        /*                             クソナガ調整                                                               */[...fillBlock(-1, 31), 40, 40, 40, 40, 40, -1, -1, -1, 40, 40, 40, 40, 40, 40, 40],
        [...fillBlock(-1, 4), -1, -1, 40, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, 40, 40, 40, 40, 40, -1, -1, -1, 40, 40, 40, 40, 40, 40, 40],
        [...fillBlock(-1, 4), -1, 40, -1, -1, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, -1, 40, -1, -1, -1, -1, -1, -1, -1, -1, 40, -1, -1, 40, 40, -1, -1, 40, 40, -1, -1, 40, 40, -1, -1, -1, 40, 40],
        [...fillBlock(-1, 4), 40, 40, 40, 40, 40, -1, -1, 40, 40, 40, 40, 40, -1, -1, 40, 40, 40, 40, 40, -1, -1, 40, 40, 40, 40, 40, -1, 40, 40, -1, -1, 40, 40, -1, -1, 40, 40, -1, -1, -1, 40, 40],
        [...fillBlock(-1, 4), -1, 40, -1, -1, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, -1, 40, -1, -1, -1, -1, -1, -1, -1, -1, 40, -1, -1, 40, 40, -1, -1, 40, 40, -1, -1, 40, 40, -1, -1, -1, 40, 40],
        [...fillBlock(-1, 4), -1, -1, 40, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, -1, -1, -1, 40, -1, -1, -1, 40, 40, 40, 40, 40, -1, -1, -1, 40, 40, -1, -1, -1, 40, 40],

    ]
};
/**
 * a
 * @param {Array<Array<number>>} blocks 
 * @returns 
 */
export function BuildStage(blocks) {
    let arr = [];
    let count = 0; //壊せるブロック
    for (let row = 0; row < blocks.length; row++) {//行
        let row_build = [];
        let row_arr = blocks[row];
        for (let col = 0; col < row_arr.length; col++) { // 列
            const type = row_arr[col];
            if (type >= 0) {
                let block = new Block(new Pos(0 + (BLOCK_SIZE * col), 0 + (BLOCK_SIZE * row)), type, BLOCK_SIZE);
                row_build.push(block);
                if (!block.is_undead) {
                    count++;
                }
            }
        }
        arr.push(row_build);
    }
    return [arr, count];
}

/**
 * 
 * @param {number} type 
 * @param {number} count 
 * @returns {Array<number>}
 */
function fillBlock(type, count) {
    return new Array(count).fill(type);
}


function fill_stage() {
    let arr = [];
    for (let row = 0; row < GRID_SIZE[1]; row++) {//行
        let row_arr = [];
        for (let col = 0; col < GRID_SIZE[0]; col++) { // 列
            row_arr.push(10);
        }
        arr.push(row_arr);
    }
    return arr;
}

export const STAGES = [NormalStage];