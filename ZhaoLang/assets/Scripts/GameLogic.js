import BaseResLoad from 'BaseResLoad'
import PlayerEnum from "PlayerEnum";
import SingletonBase from 'SingletonBase';

/**
 * 项目的辅助脚本，理应只提供辅助类的函数
 */
export default class GameLogic extends SingletonBase {

    playerTab = null;   //桌上所有职业
    nowZJtab = null;    //当前所有职介

    constructor() {
        super();
    }

    static _onNewObject() {
        let _instance = new GameLogic();
        _instance.Res = {};
        _instance.TipsLayer = null; // 缓存tipslayer

        return _instance
    }

    initData() {
        this.playerTab = null;   //玩家
    }

    //开始人数
    createGamePlayer(cm, lr, ls, xz, zd, bd) {
        let playerTab = [];
        this.createZJ(cm, lr, ls, xz, zd, bd);
        let ZTtab = this.randZTTab();   //打乱职业位置
        let zongNum = lr + ls + xz + zd + bd + cm;

        for (let index = 0; index < zongNum; index++) {
            let tab = {};
            tab.name = ZTtab[index];
            tab.isDead = 0; //0没有死亡 1刀死 2出局
            tab.isShowIcon = false;
            tab.zyNum = 0;  //0不显示 1好人 2坏人
            playerTab.push(tab);
        }

        this.playerTab = playerTab;
    }

    //打乱职业位置
    randZTTab() {
        let tab = [];
        let tab2 = [];
        for (let index = 0; index < this.nowZJtab.length; index++) {
            tab2.push(this.nowZJtab[index]);
        }

        for (let index = tab2.length; index > 0; index--) {
            let num = Math.floor(Math.random() * index);
            tab.push(tab2[num]);
            tab2.splice(num, 1);
        }


        return tab
    }

    //随机职业 村民，狼人，狼神，先知，主动，被动
    createZJ(cm, lr, ls, xz, zd, bd) {
        let tab = [];
        //狼人
        for (let index = 0; index < lr; index++) {
            tab.push(PlayerEnum["LS_PUTONG"]);
        }

        this.createLS(ls, tab);  //创建狼神
        this.createXZ(xz, tab);  //创建先知神
        this.createZD(zd, tab);  //创建主动神
        this.createBD(bd, tab);  //创建被动神

        //村民
        for (let index = 0; index < cm; index++) {
            tab.push(PlayerEnum["CMM_PT"]);
        }

        this.nowZJtab = tab;
    }

    //创建狼神
    createLS(num, tab) {

    }

    //创建先知神
    createXZ(num, tab) {

    }

    //创建主动神
    createZD(num, tab) {

    }

    //创建被动神
    createBD(num, tab) {

    }


    // update (dt) {},
}
