

cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {
        this.trueCallBack = null;
        this.falseCallBack = null;
        
        cc.find("btn_true", this.node).on('touchend', function () {
            cc.log("btn_true");
            this.trueCallBack && this.trueCallBack();
            this.node.removeFromParent();
        }, this);

        cc.find("btn_false", this.node).on('touchend', function () {
            cc.log("btn_false");
            this.falseCallBack && this.falseCallBack();
            this.node.removeFromParent();
        }, this);

        this.label = cc.find("label", this.node).getComponent(cc.Label);

    },

    //设置同意回调
    setTrueCallBack(trueCallBack){
        this.trueCallBack = trueCallBack;
    },

    //设置拒绝回调
    setFalseCallBack(falseCallBack){
        this.falseCallBack = falseCallBack;
    },

    //设置显示文字
    setLabel(str){
        this.label.string = str;
    },

    start () {

    },

});
