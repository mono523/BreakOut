/**
 * BreakOut | main.js
 * (c) 2021 mono / Gabuniku
 */
// @ts-check

//ユーティリティ

/**
 * Posクラス
 * 座標を管理
 * 原則ユーティリティで座標を扱うときはこれを使う
 */
export class Pos {
    /**
     * @param {number} x - x座標
     * @param {number} y - y座標
     */
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }
    /**
     * セッター
     * @param {number} x - x座標
     * @param {number} y - y座標
     */
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * ゲッター
     * @returns {Array<number>} 
     */
    getPos() {
        return [this.x, this.y];
    }
    /**
     * 自身のコピーを作る
     * @returns {Pos}
     */
    copy(){
        return new Pos(this.x,this.y);
    }
    /**
     * 相対的に移動
     * @param {number} x 
     * @param {number} y 
     */
    move(x,y){
        this.x += x;
        this.y = +y;
    }
}

export class Rect{
    /**
     * 
     * @param {Pos} pos - 左上の座標
     * @param {number} width - 幅
     * @param {number} height - 高さ
     */
    constructor(pos,width,height){
        this.pos = pos;
        this.width = width;
        this.height = height
    }
    /**
     * セッター
     * @param {number} width 
     * @param {number} height 
     */
    setSize(width,height){
        this.width = width;
        this.height = height
    }

    /**
     * Rectの中心座標のPosを返す
     * @returns {Pos}
     */
    getCenter(){
        let pos,off_x,off_y;
        pos = this.pos.copy();
        off_x = this.width/2;
        off_y = this.height/2;
        pos.move(off_x,off_y);
        return pos;
    }
    /**
     * 中心座標をposになるように移動させる
     * @param {Pos} pos 
     */
    setCenter(pos){
        let off_x,off_y;
        off_x = this.width/2;
        off_y = this.height/2;
        this.pos = new Pos(pos.x - off_x,pos.y - off_y);
    }
    /**
     * 
     * @returns {Array<number>}
     */
    getHalfSize(){
        return [this.width/2,this.height/2];
    }
    /**
     * 衝突してるかを確認
     * @param {Rect} rect 当たっているかの相手
     * @returns {boolean} 結果
     */
    getCollision(rect){
        let rect_half = this.getHalfSize();
        let rect1_half = rect.getHalfSize();
        let rect_pos = this.getCenter();
        let rect1_pos = rect.getCenter();
        let diff_x = Math.abs(rect_pos[0] - rect1_pos[0]) // X座標の差
        let diff_y = Math.abs(rect_pos[1] - rect1_pos[1]) // Y座標の差
        if((rect_half[0]+rect1_half[0]) >= diff_x && (rect_half[1] + rect1_half[1]) >= diff_y){
            return true;
        }else{
            return false;
        }
    }
}
