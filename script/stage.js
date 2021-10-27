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
    name: "普通のステージ",
    comment: "埋めただけ",
    blocks: fill_stage()
};

export const KonamiStage = {
    name: "konami",
    comment: "祝コナミコマンド35周年",
    blocks: [
        [],
        [-1, -1, -1, -1, -1, 10, 10, 10, 10, 10, 10, 13, 13, 13, 13, 10, 10, 10, 10, -1],
        [-1, -1, -1, -1, -1, 10, 10, 10, 10, 10, 10, 13, 13, 13, 13, 10, 10, 10, 10, -1],
        [-1, -1, -1, -1, -1, 10, 10, 10, 10, 10, 13, 13, 13, 13, 13, 10, 10, 10, 10, -1],
        [-1, -1, -1, -1, -1, 10, 10, 10, 10, 13, 13, 13, 13, 10, 10, 10, 10, 10, 10, -1],
        [-1, -1, -1, -1, -1, 20, 10, 10, 13, 13, 13, 10, 10, 10, 10, 10, 10, 10, 10, -1],
        [-1, -1, -1, -1, -1, 10, 20, 13, 13, 13, 10, 10, 10, 10, 12, 12, 12, 12, 10, -1],
        [-1, -1, -1, -1, -1, 10, 13, 23, 13, 13, 10, 10, 10, 10, 12, 12, 12, 12, 10, -1],
        [-1, -1, -1, -1, -1, 10, 13, 13, 13, 13, 10, 10, 10, 10, 12, 12, 12, 12, 10, -1],
        [-1, -1, -1, -1, -1, 10, 10, 10, 10, 10, 10, 10, 10, 12, 12, 12, 12, 10, 10, -1],
        [-1, -1, -1, -1, -1, 10, 10, 10, 10, 10, 10, 12, 12, 12, 12, 12, 10, 10, 10, -1],
        [-1, -1, -1, -1, -1, 10, 10, 10, 10, 10, 12, 12, 12, 12, 10, 10, 10, 10, 10, -1],
        [-1, -1, -1, -1, -1, 10, 10, 10, 10, 10, 12, 12, 12, 12, 10, 10, 10, 10, 10, -1],
        [-1, -1, -1, -1, -1, 10, 10, 10, 10, 10, 12, 12, 12, 12, 10, 10, 10, 10, 10, -1],
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