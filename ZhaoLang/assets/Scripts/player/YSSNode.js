import PlayerEnum from "PlayerEnum";

/**
 * 耶稣
 */

cc.Class({
    extends: require("PlayerNode"),

    //数据初始化
    init(tab) {
        this.m_ZY = PlayerEnum["ZY_HAOREN"];      //阵营 0好人，1狼人
        this.m_ZJ = PlayerEnum["ZJ_SHEN"];      //职介，狼人，村民，神民
        this.m_ZZJ = PlayerEnum["ZZJ_XZ"];     //真职介，狼人，村民，先知，主动，被动
        this.m_JZJ = null;     //真职介，狼人，村民，先知，主动，被动
        this.m_Num = tab.m_Num;     //当前编号
        this.m_showNum = parseInt(this.m_Num) + 1;  //当前号码牌
        this.m_DP = this.m_DP || tab.m_DP;      //底牌
        this.m_isDP = false;    //是否翻底牌
        this.m_isDead = 0;  //是否死亡
        this.m_isChuJu = false; //是否抗推出局
        this.m_isFanHH = false; //是否翻好坏牌

        this.m_isDun = 0;      //是否打盾
        this.m_isJieYao = 0;   //是否用解药
        this.wordsChar = "";   //聊天内容

        // haoHuaiPai: cc.Sprite,    //好坏牌
        // daoPai: cc.Sprite,    //倒牌
        // haomaPai: cc.Sprite,    //号码牌

        this.isGetSkill = 0;   //是否得到技能
        this.isDuSi = 0;      //毒死
    },

    //聊天
    chitchat() {
        cc.log("我是耶稣" + this.m_showNum + "号");
    },

});
