import helper from 'helper';
import PlayerEnum from "PlayerEnum";
import BaseResLoad from 'BaseResLoad';
import GameLogic from 'GameLogic';


cc.Class({
    extends: cc.Component,

    properties: {

    },

    onEnable() {
        cc.log("Gamelayer_onEnable");
        this.bg = cc.find("bg", this.node);
        this.bg_top = cc.find("bg_top", this.bg);
        this.bg_liaotian = cc.find("bg_liaotian", this.bg);
        this.bg_character = cc.find("bg_character", this.bg);
        this.bg_di = cc.find("bg_di", this.bg);
        this.label_liaotian = cc.find("label_liaotian", this.bg);   //聊天 文字 
        this.label_liaotian.active = false;
        this.Item_characterL = cc.find("Item_characterL", this.bg); //左头像
        this.Item_characterL.active = false;
        // this.Item_characterR = cc.find("Item_characterR", this.bg); //右头像
        // this.Item_characterR.active = false;

        this.btn_tuichu = cc.find("btn_tuichu", this.bg_top);   //退出按钮
        this.btn_tuichu.on('touchend', function () {
            cc.log("btn_tuichu");
            helper.getInstance().openTFChoice("是否退出游戏？", function () {
                // cc.log("是否重置游戏");
                this.node.removeFromParent();
            }.bind(this));
        }, this);

        this.btn_chongzhi = cc.find("btn_chongzhi", this.bg_top);   //重置按钮
        this.btn_chongzhi.on('touchend', function () {
            cc.log("btn_chongzhi");
            helper.getInstance().openTFChoice("是否重置游戏？", function () {
                // cc.log("是否重置游戏");
                this.init();
            }.bind(this));
        }, this);

        this.Label_tianshu = cc.find("Label_tianshu", this.bg_liaotian);   //当前天数
        this.scrollView_liaotian = cc.find("scrollView_liaotian", this.bg_liaotian).getComponent(cc.ScrollView);
        if (!this.liaotianPool)
            this.liaotianPool = new cc.NodePool();

        this.scrollView_character = cc.find("scrollView", this.bg_character).getComponent(cc.ScrollView);   //头像框
        if (!this.characterPool)
            this.characterPool = new cc.NodePool();

        this.btn_duihua = cc.find("btn_duihua", this.bg_di);   //聊天按钮
        this.btn_duihua.on('touchend', function () {
            cc.log("btn_duihua");
            helper.getInstance().openNumChoice("1111", function (index) {
                // this.showZZY(index - 1, 2);
                this.liaotian(index - 1);
            }.bind(this));
        }, this);
        this.label_duihua = cc.find("sp_num/LabelAtlas", this.btn_duihua).getComponent(cc.Label);

        this.btn_churen = cc.find("btn_churen", this.bg_di);   //出人按钮
        this.btn_churen.on('touchend', function () {
            cc.log("btn_churen");
            helper.getInstance().openNumChoice("222", function (index) {
                if (this.playerTab[index - 1]) {
                    this.playerTab[index - 1].m_isDead = 2;
                    this.characterUpdata();   //刷新头像框
                }
            }.bind(this));
        }, this);

        this.btn_heiye = cc.find("btn_heiye", this.bg_di);   //黑夜按钮
        this.btn_heiye.on('touchend', function () {
            cc.log("btn_heiye");
            helper.getInstance().openNumChoice("222", function (index) {
                this.showPlayerIcon(index - 1);
            }.bind(this));
        }, this);




        this.init();    //初始化
    },

    //初始化
    init() {
        this.num_tianshu = 0;
        this.Label_tianshu.getComponent(cc.Label).string = this.num_tianshu;
        this.liaotianItems = [];
        this.liaotianTogglePre();   //清理聊天内容
        this.label_duihua.string = 0;   //todo聊天数量
        GameLogic.getInstance().createGamePlayer(2, 3, 3, 0, 0, 0);  //组建局
        this.setPlayerTab(GameLogic.getInstance().playerTab);   //设置当前座位号
        //-------------------------------------------
        this.chatacterItemTab = []; //玩家头像tab
        this.characterUpdata();   //刷新头像框
    },

    //设置当前座位号
    setPlayerTab(tab) {
        this.playerTab = tab;
    },

    //刷新历史纪录
    liaotianUpdata: function () {
        this.liaotianTogglePre();   //清理聊天内容
        for (let index = this.liaotianItems.length - 1; index >= 0; --index) {
            var element = this.liaotianItems[index];
            let item = null;
            if (this.liaotianPool.size() > 0)
                item = this.liaotianPool.get();
            else
                item = cc.instantiate(this.label_liaotian);
            item.active = true;
            this.scrollView_liaotian.content.addChild(item);
            item.getComponent(cc.Label).string = element;

        }
    },

    //清理聊天内容   
    liaotianTogglePre: function () {
        while (this.scrollView_liaotian.content.childrenCount > 0) {
            this.liaotianPool.put(this.scrollView_liaotian.content.children[this.scrollView_liaotian.content.childrenCount - 1]);
        }
    },

    //显示真实正营  //0不显示 1好人 2坏人
    showZZY(index, zhenyingNum) {
        this.playerTab[index].m_ZY = zhenyingNum;
        this.characterUpdata();   //刷新头像框
    },

    //聊天
    liaotian(index){
        this.playerTab[index].chitchat();
    },

    //刷新头像纪录
    characterUpdata: function () {
        this.characterTogglePre();   //清理头像内容
        this.chatacterItemTab = []; //玩家头像tab
        for (let index = 0; index < this.playerTab.length; ++index) {
            var element = this.playerTab[index];
            let item = null;
            if (this.characterPool.size() > 0)
                item = this.characterPool.get();
            else
                item = cc.instantiate(this.Item_characterL);
            item.active = true;
            this.scrollView_character.content.addChild(item);
            // item.getComponent(cc.Label).string = element;
            // let sp_icon = cc.find("sp_icon", item);  //
            let sp_hh = cc.find("sp_hh", item);
            let sp_zhh = cc.find("sp_zhh", item);
            let hh_num = 0; //0不显示 1好人 2坏人
            //猜测阵营
            sp_hh.on('touchend', function () {
                cc.log("sp_hh");
                hh_num = hh_num + 1;
                if (hh_num > 2) {
                    hh_num = 0;
                }
                switch (hh_num) {
                    case 0:
                        sp_haoren.active = false;
                        sp_langren.active = false;
                        break;
                    case 1:
                        sp_haoren.active = true;
                        sp_langren.active = false;
                        break;
                    case 2:
                        sp_haoren.active = false;
                        sp_langren.active = true;
                        break;
                    default:
                        break;
                }
            }, this);
            let sp_shuzi = cc.find("sp_shuzi", item);
            let label_shuzi = cc.find("label", sp_shuzi).getComponent(cc.Label);
            label_shuzi.string = index + 1;
            this.chatacterItemTab[index] = item;    //获取玩家头像tab
            let sp_haoren = cc.find("sp_hh/sp_haoren", item);
            let sp_langren = cc.find("sp_hh/sp_langren", item);
            let sp_zhaoren = cc.find("sp_zhh/sp_haoren", item);
            let sp_zlangren = cc.find("sp_zhh/sp_langren", item);
            //真实阵营显示
            switch (this.playerTab[index].m_ZY) {
                case 0:
                    sp_zhaoren.active = false;
                    sp_zlangren.active = false;
                    break;
                case 1:
                    sp_zhaoren.active = true;
                    sp_zlangren.active = false;
                    break;
                case 2:
                    sp_zhaoren.active = false;
                    sp_zlangren.active = true;
                    break;
                default:
                    break;
            }


            let sp_daopai = cc.find("sp_daopai", item);
            let setX = 65.195;
            let setX2 = -47.301;
            if (index < 6) {
                sp_shuzi.x = -setX;
                sp_hh.x = -setX2;
                sp_zhh.x = -setX2;
            } else {
                sp_shuzi.x = setX;
                sp_hh.x = setX2;
                sp_zhh.x = setX2;
            }

            if (this.playerTab[index].m_isDP == true) {
                this.showPlayerIcon(index);
            } else {
                this.hidePlayerIcon(index);
            }

            //死亡显示
            switch (this.playerTab[index].m_isDead) {
                case 0:
                    sp_daopai.active = false;
                    break;
                case 1:
                    sp_daopai.active = true;
                    break;
                case 2:
                    sp_daopai.active = true;
                    break;
                default:
                    sp_daopai.active = true;
                    break;
            }


        }
    },

    //隐藏头像
    hidePlayerIcon(index) {
        if (index != null && this.chatacterItemTab[index] != null) {
            let sp_icon = cc.find("sp_icon", this.chatacterItemTab[index]);
            // let nameStr = "player_" + this.playerTab[index].m_DP;
            let resCall = function (err, spr) {
                if (err) {
                    cc.log("player_0");
                    return;
                }
                let sp1 = sp_icon.getComponent(cc.Sprite);
                sp1.spriteFrame = spr.getSpriteFrame("player_0");
                this.playerTab[index].m_isDP = false;
            }.bind(this);
            let spr = BaseResLoad.getInstance().LoadByKey(sp_icon.uuid, "texture/texture", resCall, cc.SpriteAtlas);      //cc.bc.Helper.getSpriteFrame("atlas/pccaipiao", str)	//获取图片
            spr && resCall(null, spr);   //如果图片存在手动返回

        }
    },

    //显示头像icon
    showPlayerIcon(index) {
        if (index != null && this.chatacterItemTab[index] != null) {
            let sp_icon = cc.find("sp_icon", this.chatacterItemTab[index]);
            let nameStr = "player_" + this.playerTab[index].m_DP;

            let resCall = function (err, spr) {
                if (err) {
                    cc.log("nameStr" + nameStr);
                    return;
                }
                let sp1 = sp_icon.getComponent(cc.Sprite);
                sp1.spriteFrame = spr.getSpriteFrame(nameStr);
                this.playerTab[index].m_isDP = true;
            }.bind(this);
            let spr = BaseResLoad.getInstance().LoadByKey(sp_icon.uuid, "texture/texture", resCall, cc.SpriteAtlas);      //cc.bc.Helper.getSpriteFrame("atlas/pccaipiao", str)	//获取图片
            spr && resCall(null, spr);   //如果图片存在手动返回
        }
    },

    //显示所有头像
    showAllPlayerIcon() {
        for (let index = 0; index < this.playerTab.length; index++) {
            let nameStr = "player_" + this.playerTab[index].m_DP;

            let resCall = function (err, spr) {
                if (err) {
                    cc.log("nameStr" + nameStr);
                    return;
                }
                let sp1 = sp_icon.getComponent(cc.Sprite);
                sp1.spriteFrame = spr.getSpriteFrame(nameStr);
                this.playerTab[index].m_isDP = true;
            }.bind(this);
            let spr = BaseResLoad.getInstance().LoadByKey(sp_icon.uuid, "texture/texture", resCall, cc.SpriteAtlas);      //cc.bc.Helper.getSpriteFrame("atlas/pccaipiao", str)	//获取图片
            spr && resCall(null, spr);   //如果图片存在手动返回

        }
    },

    //清理头像内容
    characterTogglePre: function () {
        while (this.scrollView_character.content.childrenCount > 0) {
            this.characterPool.put(this.scrollView_character.content.children[this.scrollView_character.content.childrenCount - 1]);
        }
    },

    start() {
        cc.log("Gamelayer_start");
    },

    //打开数字键盘
    openNumNode(b) {
        if (b != null) {
            this.NumChoiceBg2.active = b;
        } else {
            this.NumChoiceBg2.active = false;
        }


    },

    onDestory() {
        cc.log("Gamelayer_onDestory");
    },

    onDisable() {
        cc.log("Gamelayer_onDisable");
    },

});
