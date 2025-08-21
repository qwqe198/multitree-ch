let modInfo = {
	name: "多重树",
	id: "multitree",
	author: "loader3229",
	pointsName: "点数",
	discordName: "loader3229的Discord服务器",
	discordLink: "https://discord.gg/jztUReQ2vT",
	initialStartPoints: new Decimal (0), // 用于硬重置和新玩家
	offlineLimit: 24,  // 单位：小时
}

// 设置版本号和名称
let VERSION = {
	num: "1.7.3",
	name: "",
}

let changelog = `
	<h3>v1.7.3</h3><br>
	◦ 终局内容：e1.4e14点数<br>

	<h3>v1.7.2.1</h3><br>
	◦ 修复了一些问题<br>

	<h3>v1.7.2</h3><br>
	◦ 终局内容：e6.42e13点数<br>

	<h3>v1.7.1</h3><br>
	◦ 在TPTR中添加了荣誉系统<br>

	◦ 终局内容：e2e13点数<br>

	<h3>v1.7</h3><br>
	◦ 新增一棵技能树（动态树）<br>

	◦ 终局内容：e6.555e12点数<br>

	<h3>v1.6.2.1</h3><br>
	◦ 终局内容：e2e12点数<br>

	<h3>v1.6.2</h3><br>
	◦ 在TPTR中添加了幻影灵魂<br>

	◦ 终局内容：e1.8e12点数<br>

	<h3>v1.6.1.2</h3><br>
	◦ 终局内容：e7.777e11点数<br>

	<h3>v1.6.1.1</h3><br>
	◦ 修复了NaN问题<br>

	<h3>v1.6.1</h3><br>
	◦ 在里程碑树中添加了升级版里程碑<br>

	◦ 终局内容：ee11点数<br>

	<h3>v1.6</h3><br>
	◦ 新增一棵技能树（里程碑树）<br>

	◦ 终局内容：e3.9e8点数<br>

	<h3>v1.5.4.1</h3><br>
	◦ 在TPTR中添加了超级生成器<br>

	◦ 终局内容：e1.07e8点数<br>

	<h3>v1.5.4</h3><br>
	◦ 在TPTR中添加了阻碍系统<br>

	◦ 在TPTR中添加了特性系统<br>

	◦ 终局内容：e9.8e7点数<br>

	<h3>v1.5.3.2</h3><br>
	◦ 修复了一些bug<br>

	◦ 终局内容：e3.9e7点数<br>

	<h3>v1.5.3.1</h3><br>
	◦ 修复了一些bug<br>

	◦ 终局内容：e3.78e7点数<br>

	<h3>v1.5.3</h3><br>
	◦ 在TPTR中添加了空间能量<br>

	◦ 在TPTR中添加了强化系统<br>

	◦ 终局内容：e3.75e7点数<br>

	<h3>v1.5.2.1</h3><br>
	◦ 在TPTR中添加了时间胶囊<br>

	◦ 终局内容：e2.75e7点数<br>

	<h3>v1.5.2</h3><br>
	◦ 终局内容：e2.57e7点数<br>

	<h3>v1.5.1</h3><br>
	◦ 在TPTR中添加了生成器<br>

	◦ 终局内容：e2.23e7点数<br>

	<h3>v1.5</h3><br>
	◦ 新增一棵技能树（重制版声望树）<br>

	◦ 添加了重制TPT<br>

	◦ 终局内容：e2.18e7点数，在重制版声望树中有4个助推器<br>

	<h3>v1.4.5</h3><br>
	◦ 终局内容：e1.7e7点数<br>

	<h3>v1.4.4</h3><br>
	◦ 终局内容：e3e6点数<br>

	<h3>v1.4.3</h3><br>
	◦ 终局内容：e2e6点数<br>

	<h3>v1.4.2</h3><br>
	◦ 终局内容：e1.5e6点数<br>

	<h3>v1.4.1</h3><br>
	◦ 终局内容：e1.1e6点数<br>

	<h3>v1.4</h3><br>
	◦ 新增一棵技能树（游戏开发树）<br>

	◦ 终局内容：在经典声望树中有6个精通砖块，e6.7e5点数<br>

	<h3>v1.3</h3><br>
	◦ 新增一棵技能树（增量宇宙树）<br>

	◦ 终局内容：完成增量宇宙树的反物质挑战2，e3e5点数<br>

	<h3>v1.2</h3><br>
	◦ 新增一棵技能树（燃烧树）<br>

	◦ 终局内容：e55000点数<br>

	<h3>v1.1.2</h3><br>
	◦ 添加了快捷键<br>

	<h3>v1.1.1</h3><br>
	◦ 修复了NaN问题<br>

	<h3>v1.1</h3><br>
	◦ 新增一棵技能树（声望森林）<br>

	◦ 终局内容：e15600点数<br>

	<h3>v1.0</h3><br>
	◦ 添加了2棵技能树（经典声望树，星尘树）<br>

	◦ 终局内容：e6000点数<br>
`

let winText = `恭喜！您已到达终点并通关了这个游戏，但目前...`

// 如果在图层内任何地方添加了新函数，并且这些函数在被调用时会产生效果，请在此处添加它们。
// （这里的都是示例，所有官方函数都已处理）
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// 确定是否应显示点数/秒
function canGenPoints(){
	return true
}

// 计算点数/秒！
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasUpgrade("tptc_p",11))gain = gain.mul(upgradeEffect("tptc_p",11));
	if(hasUpgrade("tptc_p",12))gain = gain.mul(upgradeEffect("tptc_p",12));
	gain = gain.mul(tmp.tptc_b.effect);
	gain = gain.mul(tmp.tptc_g.getGenPowerEff);
	gain = gain.mul(tmp.tptc_t.getEnergyEff);
	gain = gain.mul(tmp.tptc_s.buyables[11].effect);
	gain = gain.mul(tmp.tptc_q.quirkEff);
	if(hasUpgrade("tptc_sp",12))gain = gain.mul(upgradeEffect("tptc_sp",12));
	gain = gain.mul(tmp.tm.buyables[0].effect);
	
	
	let mfot=getMultiplierFromOtherTrees()[1];
	
	if(inChallenge("tptr_h",22)&&inChallenge("incrementy_am",12))return mfot.pow(0.1);
	if(inChallenge("tptr_h",22))return mfot;
	gain=gain.mul(mfot);
	
	if(inChallenge("incrementy_am",12))gain=gain.pow(0.1);
	
	// 通胀阶段前的最终软上限
	
	if(gain.gte("e9e15"))gain = Decimal.pow(10,gain.log10().div(9).log10().mul(6e14));
	if(gain.gte("e9.999e15"))gain = new Decimal("e9.999e15");
	//if(gain.gte("ee100"))gain = Decimal.pow(10,gain.log10().log10().mul(1e98));
	
	gain = gain.mul((sha512_256(localStorage.supporterCode).slice(0,2) == '8f' && window.supporterCodeInput)?2:1);
	return gain;
}

function getMultiplierFromOtherTrees() {
	let mfots=[new Decimal(1),new Decimal(0),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1)];
	if(hasUpgrade("stardust_s",12))mfots[2] = mfots[2].mul(upgradeEffect("stardust_s",12));
	if(hasUpgrade("forest_p",21))mfots[3] = mfots[3].mul(upgradeEffect("forest_p",21));
	if(hasUpgrade("burning_a",14))mfots[4] = mfots[4].mul(upgradeEffect("burning_a",14));
	if(hasUpgrade("incrementy_i",13))mfots[5] = mfots[5].mul(upgradeEffect("incrementy_i",13));
	if(hasUpgrade("gd_u",21))mfots[6] = mfots[6].mul(upgradeEffect("gd_u",21));
	if(hasUpgrade("dynas_c",15))mfots[9] = mfots[9].mul(upgradeEffect("dynas_c",15));
	if(!hasUpgrade("gd_g",31))mfots[6] = mfots[6].mul(buyableEffect("gd_f",15));
	mfots[8] = mfots[8].mul((tmp.milestone_m.powerEffect[1]||new Decimal(1)));
	if(hasUpgrade("tm",55))mfots[7] = mfots[7].mul(upgradeEffect("tm",55));
	
	if(inChallenge("tptc_ge",11))mfots[0] = mfots[0].mul(layers.tptc_ge.c11pow());
	
	let power=new Decimal(1);
	power=power.add(player.tm.p_upg.mul(0.01));
	
	for(var i=2;i<=9;i++){
		mfots[1]=mfots[1].add(mfots[i].max(1).log10().root(power));
	}
	mfots[1]=mfots[1].pow(power).mul(mfots[0]);
	mfots[1]=Decimal.pow(10,mfots[1]);
	
	mfots.p=power;
	
	return mfots;
}

// 您可以在此处添加应进入"player"并保存的非图层相关变量及其默认值
function addedPlayerData() { return {
	modpoints: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
}}

var TREES=["","经典声望树","星尘树","声望森林","燃烧树","增量宇宙树","游戏开发树","重制版声望树","里程碑树","动态树","多重树"];
var TREEAUTHOR=["","jacorb90","okamii17","unpingabot","thefinaluptake","pg132","thepaperpilot","jacorb90","loader3229","ducdat0507","loader3229"];
var MODPOINTSNAME=["","","能量","能量","余烬","增量","工作小时数","重制点数","里程碑能量","动态点数",""];
var TREEVERS=[[],["","Pre-Alpha Build 1","Pre-Alpha Build 2","Alpha Build 1","Beta v1.0","Beta v1.1 Alpha 12","Beta v1.1","Beta v1.2","1.0","1.1","1.1","1.1","1.1","1.1","1.1","1.2","1.2","1.2","1.2","1.2","1.2"],["","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a"],["","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0"],["","0.0.1","0.0.2","0.2.0","0.2.0","0.2.0","0.2.0"],["","0.1","0.3","0.4","0.5","0.5","0.6","0.7","0.8","0.8","0.8","0.85","0.85","0.85","0.87","0.87","0.88","0.88","0.88","0.9","0.9","0.9","0.9","0.9","0.9","0.91","0.91","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.93","0.93"],["","0.0","0.1","0.2","0.2","0.2","1.0","1.0","1.0","1.0","1.0","1.0"],["","0.1","0.2","0.3","0.3","0.3","0.3","0.4","0.4","0.4","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.6","0.6","0.6","0.6","0.6","0.6","1.0","1.0","1.1"],["","1.005","1.010","1.016","1.020","1.025","1.025","1.029","1.032","1.035","1.038","1.040","1.043","1.045","1.048","1.050","1.055","1.060","1.065","1.068","1.070"],["","0.0.1","0.0.1","0.0.1","0.0.1","0.1.0","0.1.0","0.1.0","0.1.0","0.1.0","0.2.0","0.2.0","0.2.0","0.2.0","0.2.0"]];

// 在页面顶部显示额外内容
var displayThings = [
	"模组作者：loader3229 汉化：22222",
	function(){
		if(hasUpgrade("tptc_p",13)){
			return "当前技能树："+TREES[player.tm.currentTree]+" 版本 "+TREEVERS[player.tm.currentTree][player.tm.buyables[player.tm.currentTree].toNumber()];
		}
		return "";
	},
	function(){
		if(player.tm.currentTree!=1 && player.tm.currentTree!=10){
			return "您拥有"+format(player.modpoints[player.tm.currentTree])+" "+MODPOINTSNAME[player.tm.currentTree];
		}
		return "";
	},
	function(){
		if(player.tm.currentTree==4){
			return "火焰强度："+format(player.burning_a.flameStrength)+"/"+format(tmp.burning_a.maxFlameStrength);
		}
		if(player.tm.currentTree==6){
			return "基础生产力为"+format(tmp.gd_u.upgrades[11].realEffect);
		}
		if(player.tm.currentTree==8){
			if(player.milestone_m.best.gte(25))return "里程碑能量效果："+format(tmp.milestone_m.powerEffect[1]||new Decimal(1))+"倍点数获取";
			return "里程碑能量效果：";
		}
		if(player.tm.currentTree==7 && hasUpgrade("tm",55)){
			return "重制点数效果："+format(upgradeEffect("tm",55))+"倍点数获取";
		}
		return "";
	},
	function(){
		if(player.tm.currentTree==6){
			return "生产力减速开始于"+format(tmp.gd_u.scstart);
		}
		if(player.tm.currentTree==8){
			if(player.tm.buyables[8].gte(10))return format(tmp.milestone_m.powerEffect[0])+"倍TPTR中的重制点数/声望点数获取";
			return format(tmp.milestone_m.powerEffect[0])+"倍TPTR中的声望点数获取";
		}
		if(getMultiplierFromOtherTrees()[1].gte(2) && (!inChallenge("tptr_h",22))&&(!inChallenge("incrementy_am",12))){
			if(player.points.gte("e9e15"))return "点数软上限开始于"+format("e9e15");
			return "来自TPTC的点数倍率："+format(getPointGen().div(getMultiplierFromOtherTrees()[1]));
		}
		return "";
	},
	function(){
		if(player.tm.currentTree==8){
			let ret="";
			if(player.tm.buyables[8].gte(10))return "";
			
			if(player.milestone_m.best.gte(20))ret=format((tmp.milestone_m.powerEffect[0]||new Decimal(1)).pow(player.tm.buyables[8].gte(8)?0.7:player.milestone_m.best.gte(28)?0.6:player.milestone_m.best.gte(26)?0.5:player.tm.buyables[8].gte(6)?0.42:0.4))+"倍TPTR中的重制点数获取";
			if(player.milestone_m.best.gte(7))ret=format((tmp.milestone_m.powerEffect[0]||new Decimal(1)).pow(player.milestone_m.best.gte(19)?0.35:player.tm.buyables[8].gte(4)?(1/3):player.milestone_m.best.gte(15)?0.3:player.milestone_m.best.gte(9)?0.25:player.milestone_m.best.gte(8)?0.2:0.1))+"倍TPTR中的重制点数获取";
			return ret;
		}
		if(getMultiplierFromOtherTrees()[1].gte(2))return "来自其他技能树的点数倍率："+format(getMultiplierFromOtherTrees()[1]);
		return "";
	},
]

// 确定游戏何时"结束"
function isEndgame() {
	return player.points.gte("e14e13");
}



// 超出此点的内容不太重要！

// 如果有因长时间tick而可能被破坏的内容，可以更改此项
function maxTickLength() {
	return(3600) // 默认为1小时，这个值只是任意大的
}

// 如果需要撤销旧版本的通货膨胀，请使用此功能。如果版本早于修复问题的版本，
// 您可以使用此功能限制其当前资源。
function fixOldSave(oldVersion){
}