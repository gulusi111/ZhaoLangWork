/**
 * 彩票枚举等
 */
var PlayerEnum = [];
//阵营
PlayerEnum["ZY_LANGREN"] = 1;   //阵营 狼人 
PlayerEnum["ZY_HAOREN"] = 2;    //阵营 好人  
//职阶
PlayerEnum["ZJ_LANGREN"] = 1;   //狼人 
PlayerEnum["ZJ_CUNMIN"] = 2;    //村民
PlayerEnum["ZJ_SHEN"] = 3;      //神民
//真职阶
PlayerEnum["ZZJ_LANG"] = 10; //狼人
PlayerEnum["ZZJ_CUNMIN"] = 11; //村民
PlayerEnum["ZZJ_XZ"] = 12; //先知
PlayerEnum["ZZJ_ZD"] = 13; //主动
PlayerEnum["ZZJ_BD"] = 14; //被动
//假职介
PlayerEnum["JZJ_CUNMIN"] = 21; //村民
PlayerEnum["JZJ_XZ"] = 22; //先知
PlayerEnum["JZJ_ZD"] = 23; //主动
PlayerEnum["JZJ_BD"] = 24; //被动
//狼人装扮
PlayerEnum["LR_PULANG"] = 31; //普通狼
PlayerEnum["LR_XZLANG"] = 32; //先知
PlayerEnum["LR_BDLANG"] = 33; //被动
//村民分类
PlayerEnum["CM_PUCUN"] = 41; //普通村民
PlayerEnum["CM_XZCUN"] = 42; //先知
PlayerEnum["CM_BDCUN"] = 43; //被动

//--------------------身份牌--------------------------------
//狼神
PlayerEnum["LS_PUTONG"] = 101; //普通
PlayerEnum["LS_LANGWANG"] = 102; //狼王
PlayerEnum["LS_LANGMEI"] = 103; //狼美
PlayerEnum["LS_KUANGLANG"] = 104; //狂狼
PlayerEnum["LS_DULANG"] = 105; //毒狼
//村民
PlayerEnum["CMM_PT"] = 201; //普通村民
//先知神
PlayerEnum["XZ_YYJ"] = 301; //预言家
PlayerEnum["XZ_GX"] = 302; //狗熊
PlayerEnum["XZ_YSS"] = 303; //耶稣
PlayerEnum["XZ_CQN"] = 304; //村青年
//主动神
PlayerEnum["ZD_SW"] = 401; //守卫
PlayerEnum["ZD_QS"] = 402; //骑士
PlayerEnum["ZD_MS"] = 403; //牧师
PlayerEnum["ZD_HNW"] = 404; //黑女巫
PlayerEnum["ZD_ZNW"] = 405; //真女巫
PlayerEnum["ZD_SF"] = 406; //神父
PlayerEnum["ZD_LCZ"] = 407; //老村长
//被动神
PlayerEnum["BD_LR"] = 501; //猎人
PlayerEnum["BD_BC"] = 502; //白神
PlayerEnum["BD_XN"] = 503; //修女
PlayerEnum["BD_BNW"] = 504; //白女巫
PlayerEnum["BD_YYJ"] = 505; //遗言家
PlayerEnum["BD_RZ"] = 506; //忍者



module.exports = PlayerEnum