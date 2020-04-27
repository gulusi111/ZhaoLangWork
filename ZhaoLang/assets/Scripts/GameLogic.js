import BaseResLoad from 'BaseResLoad'
import PlayerEnum from "PlayerEnum";
import SingletonBase from 'SingletonBase';
import CunMinNode from 'CunMinNode';
import LangRenPTNode from 'LangRenPTNode';


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
        playerTab = this.randZTTab();   //打乱职业位置
        // let ZTtab = this.randZTTab();   //打乱职业位置
        // let zongNum = lr + ls + xz + zd + bd + cm;

        // for (let index = 0; index < zongNum; index++) {
        //     let tab = {};
        //     tab.m_DP = ZTtab[index];
        //     tab.m_isDead = 0; //0没有死亡 1刀死 2出局
        //     tab.m_isDP = false;
        //     tab.m_ZY = 0;  //0不显示 1好人 2坏人
        //     playerTab.push(tab);
        // }

        for (const key in playerTab) {
            if (playerTab[key]) {
                playerTab[key].setNum(key);
            }
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
            var object = new LangRenPTNode();
            let t = {}
            t.m_DP = PlayerEnum["LS_PUTONG"]
            object.init(t);

            tab.push(object);
        }

        this.createLS(ls, tab);  //创建狼神
        this.createXZ(xz, tab);  //创建先知神
        this.createZD(zd, tab);  //创建主动神
        this.createBD(bd, tab);  //创建被动神

        //村民
        for (let index = 0; index < cm; index++) {
            var object = new CunMinNode();
            let t = {}
            t.m_DP = PlayerEnum["CMM_PT"]
            object.init(t);
            tab.push(object);
        }

        this.nowZJtab = tab;
    }

    //创建狼神
    createLS(num, tab) {
        // PlayerEnum["LS_LANGWANG"] = 102; //狼王
        // PlayerEnum["LS_LANGMEI"] = 103; //狼美
        // PlayerEnum["LS_KUANGLANG"] = 104; //狂狼
        // PlayerEnum["LS_DULANG"] = 105; //毒狼
        let tab2 = [PlayerEnum["LS_LANGWANG"], PlayerEnum["LS_LANGMEI"], PlayerEnum["LS_KUANGLANG"], PlayerEnum["LS_DULANG"]];
        for (let index = num; index > 0; index--) {
            let choiceNum = Math.floor(Math.random() * tab2.length);
            tab.push(tab2[choiceNum]);
            tab2.splice(choiceNum, 1);
        }
    }

    //创建先知神
    createXZ(num, tab) {
        let tab2 = [PlayerEnum["XZ_YYJ"], PlayerEnum["XZ_GX"], PlayerEnum["XZ_YSS"], PlayerEnum["XZ_CQN"]];
        for (let index = num; index > 0; index--) {
            let choiceNum = Math.floor(Math.random() * tab2.length);
            tab.push(tab2[choiceNum]);
            tab2.splice(choiceNum, 1);
        }
    }

    //创建主动神
    createZD(num, tab) {
        // PlayerEnum["ZD_SW"] = 401; //守卫
        // PlayerEnum["ZD_QS"] = 402; //骑士 
        // PlayerEnum["ZD_MS"] = 403; //牧师
        // PlayerEnum["ZD_HNW"] = 404; //黑女巫
        // PlayerEnum["ZD_ZNW"] = 405; //真女巫
        // PlayerEnum["ZD_SF"] = 406; //神父
        // PlayerEnum["ZD_LCZ"] = 407; //老村长
        let tab2 = [PlayerEnum["ZD_SW"], PlayerEnum["ZD_QS"], PlayerEnum["ZD_MS"], PlayerEnum["ZD_HNW"], PlayerEnum["ZD_ZNW"], PlayerEnum["ZD_SF"], PlayerEnum["ZD_LCZ"]];
        for (let index = num; index > 0; index--) {
            let choiceNum = Math.floor(Math.random() * tab2.length);
            tab.push(tab2[choiceNum]);
            tab2.splice(choiceNum, 1);
        }
    }

    //创建被动神
    createBD(num, tab) {
        // PlayerEnum["BD_LR"] = 501; //猎人
        // PlayerEnum["BD_BC"] = 502; //白神
        // PlayerEnum["BD_XN"] = 503; //修女
        // PlayerEnum["BD_BNW"] = 504; //白女巫
        // PlayerEnum["BD_YYJ"] = 505; //遗言家
        // PlayerEnum["BD_RZ"] = 506; //忍者
        let tab2 = [PlayerEnum["BD_LR"], PlayerEnum["BD_BC"], PlayerEnum["BD_XN"], PlayerEnum["BD_BNW"], PlayerEnum["BD_YYJ"], PlayerEnum["BD_RZ"]];
        for (let index = num; index > 0; index--) {
            let choiceNum = Math.floor(Math.random() * tab2.length);
            tab.push(tab2[choiceNum]);
            tab2.splice(choiceNum, 1);
        }
    }


    // update (dt) {},
}
