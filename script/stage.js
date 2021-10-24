/**
 * BreakOut | stage.js
 * (c) 1221 mono / Gabuniku
 */
// @ts-check
//ステージデータ
import { Pos, Rect } from "./util.js"
import { Block } from "./block.js"

/**
 * ブロックのグリッドは20x16とする
 */
export const BLOCK_SIZE = 20;
export const GRID_SIZE = [25, 16];


const TestStage = fill_stage();

const NormalStage = {
    name: "普通のステージ",
    comment:"埋めただけ",
    blocks: fill_stage()
};

const KonamiStage = {
    name: "konami",
    comment:"コナミさん許して(小並感)",
    blocks: [
        [],
        [-1, -1, -1, -1, -1, 10, 10, 10, 10, 10, 10, 13, 13, 13, 13, 10, 10, 10, 10, -1],
        [-1, -1, -1, -1, -1, 10, 10, 10, 10, 10, 10, 13, 13, 13, 13, 10, 10, 10, 10, -1],
        [-1, -1, -1, -1, -1, 10, 10, 10, 10, 10, 13, 13, 13, 13, 13, 10, 10, 10, 10, -1],
        [-1, -1, -1, -1, -1, 10, 10, 10, 10, 13, 13, 13, 13, 10, 10, 10, 10, 10, 10, -1],
        [-1, -1, -1, -1, -1, 10, 10, 10, 13, 13, 13, 10, 10, 10, 10, 10, 10, 10, 10, -1],
        [-1, -1, -1, -1, -1, 10, 10, 13, 13, 13, 10, 10, 10, 10, 12, 12, 12, 12, 10, -1],
        [-1, -1, -1, -1, -1, 10, 13, 13, 13, 13, 10, 10, 10, 10, 12, 12, 12, 12, 10, -1],
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
                if (!block.is_undead){
                    count++;
                }
            }
        }
        arr.push(row_build);
    }
    return [arr,count];
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

export const STAGES = [NormalStage,KonamiStage];