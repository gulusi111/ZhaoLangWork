import BaseResLoad from 'BaseResLoad';
import helper from 'helper';

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("进入了，开始加载图片");
        let resCall = function (err, spr) {
            if (err) {
                cc.log("colorStr" + colorStr);
                return;
            }
           
            cc.log("加载完成");
            
                let callBack = function (node) {
                    // let nodeJs = node.getComponent("tipsLayer");
                    // nodeJs.init();
                    // nodeJs.showTips(content, type);
                };
                let root = cc.find("Canvas");
                helper.getInstance().addPrefabToNode("Prefab/Home", root, 0, callBack);    //进入home界面
        }.bind(this);
        let spr = BaseResLoad.getInstance().LoadByKey(this.uuid, "texture/texture", resCall, cc.SpriteAtlas);      //cc.bc.Helper.getSpriteFrame("atlas/pccaipiao", str)	//获取图片
        spr && resCall(null, spr);   //如果图片存在手动返回
    },

    start () {

    },

    // update (dt) {},
});
