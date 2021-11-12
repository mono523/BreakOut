/**
 * BreakOut | physics.js
 * (c) 2021 mono / Gabuniku
 */
// @ts-check
// 物理


export const GRAVITY = 0.5 // 重力
export const ReflectionCoefficient = 0.8; // 反射係数

export class Vec2 {
    /**
     * 二次元ベクトル
     * @param {number} vx - 横のベクトル成分
     * @param {number} vy - 縦のベクトル成分
     */
    constructor(vx, vy) {
        this.x = vx;
        this.y = vy;
    }
    getAngle() {
        let rad = Math.atan2(this.y, this.x);
        return rad * (180 / Math.PI);
    }
    addForce(vx, vy) {
        this.x += vx;
        this.y += vy;
    }
}