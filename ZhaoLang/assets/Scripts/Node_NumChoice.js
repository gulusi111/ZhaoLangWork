

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.falseCallBack = null;
        //关闭按钮
        cc.find("btn_close", this.node).on('touchend', function () {
            cc.log("btn_close");
            this.node.removeFromParent();
        }, this);
        //数字
        for (let index = 1; index < 13; index++) {
            cc.find("btn_" + index, this.node).on('touchend', function () {
                cc.log("index " + index);
                // this.showPlayerIcon(index - 1);
                this.numCallBack && this.numCallBack(index);
                this.node.removeFromParent();
            }, this);
        }

        this.label = cc.find("label", this.node).getComponent(cc.Label);

    },

    start() {

    },

    //设置数字回调
    setNumCallBack(numCallBack) {
        this.numCallBack = numCallBack;
    },

    //设置显示文字
    setLabel(str) {
        this.label.string = str;
    },


    // update (dt) {},
});
