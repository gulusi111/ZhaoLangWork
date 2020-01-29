

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.log("onLoad");

        //主界面
        this.bg = cc.find("bg", this.node);
        this.btn_start = cc.find("btn_start", this.bg);
        this.btn_start.on('touchend', function () {
            cc.log("btn_start");
        }, this);

        this.btn_rule = cc.find("btn_rule", this.bg);
        this.btn_rule.on('touchend', function () {
            cc.log("btn_rule");
            this.node_rule.active = true;
        }, this);

        this.btn_end = cc.find("btn_end", this.bg);
        this.btn_end.on('touchend', function () {
            cc.log("btn_end");
        }, this);

        //规则界面
        this.node_rule = cc.find("node_rule", this.node); 
        this.node_rule.active = false;

        this.btn_closeRule = cc.find("btn_closeRule", this.node_rule);  //关闭规则按钮
        this.btn_closeRule.on('touchend', function () {
            cc.log("btn_closeRule");
            this.node_rule.active = false;
        }, this);

        this.btn_gameRule = cc.find("btn_gameRule", this.node_rule);    //游戏规则
        this.btn_gameRule.on('touchend', function () {
            cc.log("btn_gameRule");
            this.pageView_rule.active = true;
        }, this);

        this.btn_gameOcc = cc.find("btn_gameOcc", this.node_rule);      //角色介绍
        this.btn_gameOcc.on('touchend', function () {
            cc.log("btn_gameOcc");
            this.pageView_Occ.active = true;
        }, this);

        this.pageView_rule = cc.find("pageView_rule", this.node_rule); 
        this.pageView_rule.active = false;
        cc.find("btn_return", this.pageView_rule).on('touchend', function () {
            cc.log("btn_return");
            this.pageView_rule.active = false;
        }, this);

        this.pageView_Occ = cc.find("pageView_Occ", this.node_rule); 
        this.pageView_Occ.active = false;
        cc.find("btn_return", this.pageView_Occ).on('touchend', function () {
            cc.log("btn_return");
            this.pageView_Occ.active = false;
        }, this);

    },

    onEnable() {
        cc.log("onEnable");
    },

    start() {
        cc.log("start");
    },


    onDestory() {
        cc.log("onDestory");
    },

    onDisable() {
        cc.log("onDisable");
    },

    // update (dt) {},
});
