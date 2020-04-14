import BaseResLoad from 'BaseResLoad'
import SingletonBase from 'SingletonBase';

/**
 * 项目的辅助脚本，理应只提供辅助类的函数
 */
export default class GameLogic extends SingletonBase {

    constructor() {
        super();
    }

    static _onNewObject() {
        let _instance = new GameLogic();
        _instance.Res = {};
        _instance.TipsLayer = null; // 缓存tipslayer
       
        return _instance
    }

    // update (dt) {},
}
