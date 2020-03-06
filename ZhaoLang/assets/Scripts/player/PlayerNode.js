

cc.Class({
    extends: cc.Component,

    properties: {
        m_ZY: 0,     //阵营 0好人，1狼人
        m_ZJ: 0,     //职介，狼人，村民，神民
        m_ZZJ: 0,    //真职介，狼人，村民，先知，主动，被动
        m_JZJ: 0,    //真职介，狼人，村民，先知，主动，被动
        m_Num: 0,    //当前号码牌
        m_DP: 0,     //底牌
        m_isDP: 0,   //是否翻底牌
        m_isDead: 0, //是否死亡
        m_isChuJu: 0,//是否抗推出局
        m_isFanHH: 0,//是否翻好坏牌

        m_isDun: 0,      //是否打盾
        m_isJieYao: 0,   //是否用解药
        wordsChar: "",   //聊天内容

        // haoHuaiPai: cc.Sprite,    //好坏牌
        // daoPai: cc.Sprite,    //倒牌
        // haomaPai: cc.Sprite,    //号码牌

        isGetSkill: 0,   //是否得到技能
        isDuSi: 0,      //毒死

        // caicebtn:cc.Button, //猜测好人坏人用户按钮
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

    //设置号码牌
    setNum(num) {
        cc.log("setNum");
    },

    //设置底牌信息
    setDP(num) {
        cc.log("setDP");
    },

    //设置阵营
    setZY(num) {
        cc.log("setZY");
    },

    //中刀
    zhongDao() {
        cc.log("zhongDao");
    },

    //死亡
    death() {
        cc.log("death");
    },

    //首次遗言
    firstWords() {
        cc.log("firstWords");
    },

    //遗言
    Words() {
        cc.log("Words");
    },

    //生前遗言(救活的先知用)
    deathWords() {
        cc.log("deathWords");
    },

    //生前遗言(救活的先知用)
    deathWords() {
        cc.log("deathWords");
    },

    //聊天
    chitchat() {
        cc.log("chitchat");
    },

    //技能
    skill() {
        cc.log("skill");
    },

    //获得玩家技能
    getPlayerSkill() {
        cc.log("getPlayerSkill");
    },

    //设置头像
    setIcon() {
        cc.log("setIcon");
    },

    //验人
    yanren() {
        cc.log("yanren");
    },

    //报验人
    baoYanRen() {
        cc.log("baoYanRen");
    },

    //翻底牌
    fanDiPai(b) {
        cc.log("fanDiPai");
    },

    //翻好坏牌
    fanHaoRenPai(b) {
        cc.log("fanHaoRenPai");
    },

    //设置倒排
    setDaoPai(b) {
        cc.log("setDaoPai");
    },

    //删除自身的时候调用
    removeSelf() {
        cc.log("removeSelf");
    },





});
