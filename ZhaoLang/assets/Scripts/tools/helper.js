import BaseResLoad from 'BaseResLoad'
import SingletonBase from 'SingletonBase';

/**
 * 项目的辅助脚本，理应只提供辅助类的函数
 */
export default class Helper extends SingletonBase {

    constructor() {
        super();
    }

    static _onNewObject() {
        let _instance = new Helper();
        _instance.Res = {};
        _instance.TipsLayer = null; // 缓存tipslayer
       
        return _instance
    }

    loadRes(resUrl, callBack) {
        BaseResLoad.getInstance().LoadByKey(resUrl, resUrl, callBack);
    }

    /**
     * 加载图集资源
     */
    loadAtlasRes(resUrlm, callBack) {
        BaseResLoad.getInstance().LoadByKey(resUrlm, resUrlm, callBack, cc.SpriteAtlas);
    }

    //  获取预制资源
    getPrefab(resUrl, callBack) {
        var prefab = cc.loader.getRes(resUrl);
        if (!prefab) {
            cc.lottery.AppLogMgr.log("getPrefab " + resUrl + " err !");
            this.loadRes(resUrl, function (err, prefab) {
                let ret = null;
                if (!err) {
                    ret = prefab;
                }
                callBack && callBack(ret);
            });
            return null;
        }
        callBack && callBack(prefab);
        return prefab;
    }


    /**
     *  获取图集中的图片
     * @param atlasName  图集路径+ 名字
     * @param texName    图集中图片名
     * @returns {*}
     */
    getSpriteFrame(atlasName, texName, callback) {

        let atlas = cc.loader.getRes(atlasName, cc.SpriteAtlas);
        if (!atlas) {
            let loadResCallBack = function (err, atlas) {
                let spr = null;
                if (!err) {
                    spr = atlas.getSpriteFrame(texName);
                }

                callback && callback(err, spr);
            }

            this.loadAtlasRes(atlasName, loadResCallBack);
            cc.lottery.AppLogMgr.log(" getSpriteFrame is null!");
            return null;
        }
        let spr = atlas.getSpriteFrame(texName);
        if (!spr) {
            cc.lottery.AppLogMgr.error(" there is not " + texName + "in " + atlasName);
            return null;
        }
        callback && callback(null, spr);
        return spr;

    }


    /**
     * 挂在预制资源到指定节点
     * @param prefabUrl
     * @param targetNode  挂在到的节点
     * @param zIndex      层级
     * @param completeCallBack  成功回掉
     */
    addPrefabToNode(prefabUrl, targetNode = cc.director.getScene(), zIndex = 0, completeCallBack) {

        let resFun = function (err, prefab) {
            if (err) {
                cc.lottery.AppLogMgr.log("addPrefabToNode func load " + prefabUrl + " err");
                return;
            }

            let node = cc.instantiate(prefab);
            targetNode.addChild(node, zIndex);
            if (completeCallBack) {
                completeCallBack(node);
            }
        };

        BaseResLoad.getInstance().LoadByKey(prefabUrl, prefabUrl, resFun);
    }


    /**
     *  浮动提示
     * @param content
     */
    showTips(content, type = true) {
        // content = cc.lottery.LanguageManager.GetLanguageText(content)
        if (this.TipsLayer) {
            this.TipsLayer.showTips(content, type);
        } else {
            let callBack = function (node) {
                let nodeJs = node.getComponent("tipsLayer");
                nodeJs.init();
                nodeJs.showTips(content, type);
            };
            let root = cc.find("Canvas");
            this.addPrefabToNode("Prefab/tpsLayer", root, 1000, callBack);
        }
    }


    /**
     * 以资源列表加载资源
     * @param resUrlList
     * @param completeCallBack 回调completeCallBack(UrlCount, loadCount)
     */
    loadListRes(resUrlList, completeCallBack) {
        let curResNum = 0;
        let successNum = 0;
        let resCall = function (err) {
            curResNum++;
            if (!err) {
                successNum++;
            }
            if (curResNum >= resUrlList.length) {
                completeCallBack && completeCallBack(curResNum, successNum);
            }
        };

        for (let i = 0; i < resUrlList.length; i++) {
            BaseResLoad.getInstance().LoadByKey(resUrlList[i], resUrlList[i], resCall);
        }
    }



}
