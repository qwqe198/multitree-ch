addLayer("milestone_um", {
    name: "升级里程碑", // 可选参数，仅少数地方使用。如果省略则默认使用图层ID
    symbol: "UM", // 显示在图层节点上的符号。默认使用首字母大写的图层ID
    position: 0, // 行内的水平位置。默认按图层ID字母顺序排序
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ccbb00",
    resource: "升级里程碑点数", // 声望货币名称
    type: "none",
    row: 1,
    layerShown(){return player.tm.currentTree==8 && player.tm.buyables[8].gte(2)}, // 显示条件：当前树为第8棵且第8棵树的第2个可购买项已购买
	doReset(){},
	effectDescription: "升级树木以获得更多收益。",
	tabFormat: ["main-display"],
	branches: ["milestone_m"], // 分支关联
	update(){
		// 根据第8棵树的可购买项等级更新点数
		player.milestone_um.points=new Decimal([0,0,2,5,9,14,16,18,21,24,28,30,34,39,40,42,45,47,48,48,50][player.tm.buyables[8].toNumber()]);
	}
})

addLayer("milestone_m", {
    name: "里程碑", // 可选参数，仅少数地方使用。如果省略则默认使用图层ID
    symbol: "M", // 显示在图层节点上的符号。默认使用首字母大写的图层ID
    position: 1, // 行内的水平位置。默认按图层ID字母顺序排序
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#793784",
    requires(){
        // 根据第8棵树的购买项等级返回不同需求
		if(player.milestone_m.points.gte([0,5,10,16,20,25,25,29,32,35,38,40,43,45,48,50,55,60,65,68,70][player.tm.buyables[8].toNumber()]))return new Decimal(Infinity);
		if(player.milestone_m.points.gte(55))return new Decimal(1);
		return new Decimal("e2e8");
	},
    resource: "MT里程碑", // 声望货币名称
    baseResource: "点数", // 基础资源名称
    baseAmount() {return player.points}, // 获取当前基础资源数量
    type: "static", // normal: 货币获取成本随获取量变化 static: 成本取决于已有数量
    gainMult() { // 计算主货币的增益乘数
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // 计算主货币的增益指数
        return new Decimal(1)
    },
    row: 0, // 图层在树中的行号(0是第一行)
	base: new Decimal("e1e7"),
	exponent: function(){
		var base=new Decimal(3);
		if(player.milestone_m.points.gte(50)){
			base = new Decimal(3.8);
			if(player.milestone_m.points.gte(55))base = base.add(0.025);
			if(player.milestone_m.points.gte(60))base = base.add(0.005);
			if(player.milestone_m.points.gte(65))base = base.add(0.02);
			if(player.milestone_m.points.gte(68))base = base.add(0.025);
		}else{
			if(player.milestone_m.points.gte(16))base = base.add(0.15);
			if(player.milestone_m.points.gte(20))base = base.add(0.1);
			if(player.milestone_m.points.gte(25))base = base.add(0.25);
			if(player.milestone_m.points.gte(29))base = base.add(0.05);
			if(player.milestone_m.points.gte(35))base = base.add(0.058);
			if(player.milestone_m.points.gte(38))base = base.add(0.042);
			if(player.milestone_m.points.gte(40))base = base.add(0.025);
			if(player.milestone_m.points.gte(43))base = base.add(0.042);
			if(player.milestone_m.points.gte(45))base = base.add(0.033);
			if(player.milestone_m.points.gte(48))base = base.add(0.03);
		}
		return base;
	},
    layerShown(){return player.tm.currentTree==8}, // 显示条件：当前是第8棵树
	doReset(l){
		return;
	},
	resetsNothing(){return true}, // 重置时不重置任何内容

	
milestones: [
    {
        requirementDescription: "第1个MT里程碑",
        unlocked() {return player[this.layer].best.gte(0)},
        done() {return player[this.layer].best.gte(1)},
        effectDescription: function(){
            if(player.tm.buyables[8].gte(2))return "每秒获得"+format(layers[this.layer].milestone1Effect())+"里程碑能量 (已升级)";
            return "每秒获得"+format(layers[this.layer].milestone1Effect())+"里程碑能量";
        },
        style() {
            if(player.tm.buyables[8].gte(2)&&player[this.layer].best.gte(1)){
                return {backgroundColor: "#cccc00"};
            }
            return {};
        },
    },
    {
        requirementDescription: "第2个MT里程碑",
        unlocked() {return player[this.layer].best.gte(1)},
        done() {return player[this.layer].best.gte(2)},
        effectDescription: function(){
            if(player.tm.buyables[8].gte(2))return "点数提升里程碑能量获取。当前: "+format(layers[this.layer].milestone2Effect())+"倍 (已升级)";
            return "点数提升里程碑能量获取。当前: "+format(layers[this.layer].milestone2Effect())+"倍";
        },
        style() {
            if(player.tm.buyables[8].gte(2)&&player[this.layer].best.gte(2)){
                return {backgroundColor: "#cccc00"};
            }
            return {};
        },
    },
    {
        requirementDescription: "第3个MT里程碑",
        unlocked() {return player[this.layer].best.gte(2)},
        done() {return player[this.layer].best.gte(3)},
        effectDescription: function(){
            let ret="第一个MT里程碑效果被你的里程碑能量提升。当前: "+format(tmp.milestone_m.milestone3Effect)+"倍";
            if(player.tm.buyables[8].gte(3))ret+=" (已升级)";
            return ret;
        },
        style() {
            if(player.tm.buyables[8].gte(3)&&player[this.layer].best.gte(3)){
                return {backgroundColor: "#cccc00"};
            }
            return {};
        },
    },
    {
        requirementDescription: "第4个MT里程碑",
        unlocked() {return player[this.layer].best.gte(3)},
        done() {return player[this.layer].best.gte(4)},
        effectDescription: function(){
            let ret="第三个里程碑效果基于你的里程碑数量提升。当前: 第三个里程碑基础效果+"+format(tmp.milestone_m.milestone4Effect);
            if(player.tm.buyables[8].gte(3))ret+=" (已升级)";
            return ret;
        },
        style() {
            if(player.tm.buyables[8].gte(3)&&player[this.layer].best.gte(4)){
                return {backgroundColor: "#cccc00"};
            }
            return {};
        },
    },
    {
        requirementDescription: "第5个MT里程碑",
        unlocked() {return player[this.layer].best.gte(4)},
        done() {return player[this.layer].best.gte(5)},
        effectDescription: function(){
            let ret="里程碑能量提升增量树宇宙中的超级声望点数获取。当前: "+format(tmp.milestone_m.milestone5Effect)+"倍";
            if(player.tm.buyables[8].gte(3))ret+=" (已升级)";
            return ret;
        },
        style() {
            if(player.tm.buyables[8].gte(3)&&player[this.layer].best.gte(5)){
                return {backgroundColor: "#cccc00"};
            }
            return {};
        },
    },
    {
        requirementDescription: "第6个MT里程碑",
        unlocked() {return player[this.layer].best.gte(5)},
        done() {return player[this.layer].best.gte(6)},
        effectDescription: function(){
            let ret="声望点数获取被你的里程碑提升。当前: "+format(tmp.milestone_m.milestone6Effect)+"倍";
            if(player.tm.buyables[8].gte(4))ret+=" (已升级)";
            return ret;
        },
        style() {
            if(player.tm.buyables[8].gte(4)&&player[this.layer].best.gte(6)){
                return {backgroundColor: "#cccc00"};
            }
            return {};
        },
    },
    {
        requirementDescription: "第7个MT里程碑",
        unlocked() {return player[this.layer].best.gte(6)},
        done() {return player[this.layer].best.gte(7)},
        effectDescription: function(){
            let ret="为里程碑能量添加额外效果";
            if(player.tm.buyables[8].gte(4))ret+=" (已升级)";
            return ret;
        },
        style() {
            if(player.tm.buyables[8].gte(4)&&player[this.layer].best.gte(7)){
                return {backgroundColor: "#cccc00"};
            }
            return {};
        },
    },
    {
        requirementDescription: "第8个MT里程碑",
        unlocked() {return player[this.layer].best.gte(7)},
        done() {return player[this.layer].best.gte(8)},
        effectDescription: function(){
            let ret="前一个里程碑效果更强";
            if(player.tm.buyables[8].gte(4))ret+=" (已升级)";
            return ret;
        },
        style() {
            if(player.tm.buyables[8].gte(4)&&player[this.layer].best.gte(8)){
                return {backgroundColor: "#cccc00"};
            }
            return {};
        },
    },
    {
        requirementDescription: "第9个MT里程碑",
        unlocked() {return player[this.layer].best.gte(8)},
        done() {return player[this.layer].best.gte(9)},
        effectDescription: function(){
            let ret="前一个里程碑效果更强";
            if(player.tm.buyables[8].gte(4))ret+=" (已升级)";
            return ret;
        },
        style() {
            if(player.tm.buyables[8].gte(4)&&player[this.layer].best.gte(9)){
                return {backgroundColor: "#cccc00"};
            }
            return {};
        },
    },
    {
        requirementDescription: "第10个MT里程碑",
        unlocked() {return player[this.layer].best.gte(9)},
        done() {return player[this.layer].best.gte(10)},
        effectDescription: function(){
            if(player.tm.buyables[8].gte(5))return "每秒获得10000%的声望点数 (已升级)";
            return "每秒获得100%的声望点数";
        },
        style() {
            if(player.tm.buyables[8].gte(5)&&player[this.layer].best.gte(10)){
                return {backgroundColor: "#cccc00"};
            }
            return {};
        },
    },

		
		{
    requirementDescription: "第11个MT里程碑",
    unlocked() {return player[this.layer].best.gte(10)},
    done() {return player[this.layer].best.gte(11)},
    effectDescription: function(){
        let ret="声望升级11的效果增强";
        if(player.tm.buyables[8].gte(5))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(5)&&player[this.layer].best.gte(11)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第12个MT里程碑",
    unlocked() {return player[this.layer].best.gte(11)},
    done() {return player[this.layer].best.gte(12)},
    effectDescription: function(){
        let ret="声望升级12的效果增强";
        if(player.tm.buyables[8].gte(5))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(5)&&player[this.layer].best.gte(12)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第13个MT里程碑",
    unlocked() {return player[this.layer].best.gte(12)},
    done() {return player[this.layer].best.gte(13)},
    effectDescription: function(){
        let ret="声望升级13的效果增强";
        if(player.tm.buyables[8].gte(5))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(5)&&player[this.layer].best.gte(13)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第14个MT里程碑",
    unlocked() {return player[this.layer].best.gte(13)},
    done() {return player[this.layer].best.gte(14)},
    effectDescription: function(){
        let ret="声望升级14的效果增强";
        if(player.tm.buyables[8].gte(5))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(5)&&player[this.layer].best.gte(14)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第15个MT里程碑",
    unlocked() {return player[this.layer].best.gte(14)},
    done() {return player[this.layer].best.gte(15)},
    effectDescription: function(){
        let ret="第7个里程碑的效果增强";
        if(player.tm.buyables[8].gte(6))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(6)&&player[this.layer].best.gte(15)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第16个MT里程碑",
    unlocked() {return player[this.layer].best.gte(15)},
    done() {return player[this.layer].best.gte(16)},
    effectDescription: function(){
        let ret="第5个里程碑的效果增强";
        if(player.tm.buyables[8].gte(6))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(6)&&player[this.layer].best.gte(16)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第17个MT里程碑",
    unlocked() {return player[this.layer].best.gte(16)},
    done() {return player[this.layer].best.gte(17)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(7))return "第3个里程碑效果^1.027 (已升级)";
        return "第3个里程碑效果^1.017";
    },
    style() {
        if(player.tm.buyables[8].gte(7)&&player[this.layer].best.gte(17)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第18个MT里程碑",
    unlocked() {return player[this.layer].best.gte(17)},
    done() {return player[this.layer].best.gte(18)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(7))return "第3个里程碑效果^1.028 (已升级)";
        return "第3个里程碑效果^1.018";
    },
    style() {
        if(player.tm.buyables[8].gte(7)&&player[this.layer].best.gte(18)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第19个MT里程碑",
    unlocked() {return player[this.layer].best.gte(18)},
    done() {return player[this.layer].best.gte(19)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(8))return "第7个里程碑的效果增强 (已升级)";
        return "第7个里程碑的效果增强";
    },
    style() {
        if(player.tm.buyables[8].gte(8)&&player[this.layer].best.gte(19)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第20个MT里程碑",
    unlocked() {return player[this.layer].best.gte(19)},
    done() {return player[this.layer].best.gte(20)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(8))return "第7个里程碑的效果增强 (已升级)";
        return "第7个里程碑的效果增强";
    },
    style() {
        if(player.tm.buyables[8].gte(8)&&player[this.layer].best.gte(20)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
	{
    requirementDescription: "第21个MT里程碑",
    unlocked() {return player[this.layer].best.gte(20)},
    done() {return player[this.layer].best.gte(21)},
    effectDescription: function(){
        let ret="里程碑能量提升游戏开发树中T层的所有环。当前: "+format(tmp.milestone_m.milestone21Effect)+"倍";
        if(player.tm.buyables[8].gte(8))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(8)&&player[this.layer].best.gte(21)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第22个MT里程碑",
    unlocked() {return player[this.layer].best.gte(21)},
    done() {return player[this.layer].best.gte(22)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(9))return "声望点数获取乘以1e10 (已升级)";
        return "声望点数获取乘以10";
    },
    style() {
        if(player.tm.buyables[8].gte(9)&&player[this.layer].best.gte(22)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第23个MT里程碑",
    unlocked() {return player[this.layer].best.gte(22)},
    done() {return player[this.layer].best.gte(23)},
    effectDescription: function(){
        let ret="声望升级23的效果增强";
        if(player.tm.buyables[8].gte(9))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(9)&&player[this.layer].best.gte(23)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第24个MT里程碑",
    unlocked() {return player[this.layer].best.gte(23)},
    done() {return player[this.layer].best.gte(24)},
    effectDescription: function(){
        let ret="声望升级24的效果增强";
        if(player.tm.buyables[8].gte(9))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(9)&&player[this.layer].best.gte(24)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第25个MT里程碑",
    unlocked() {return player[this.layer].best.gte(24)},
    done() {return player[this.layer].best.gte(25)},
    effectDescription: function(){
        let ret="为里程碑能量添加额外效果";
        if(player.tm.buyables[8].gte(10))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(10)&&player[this.layer].best.gte(25)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第26个MT里程碑",
    unlocked() {return player[this.layer].best.gte(25)},
    done() {return player[this.layer].best.gte(26)},
    effectDescription: function(){
        let ret="第7个里程碑的效果增强";
        if(player.tm.buyables[8].gte(10))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(10)&&player[this.layer].best.gte(26)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第27个MT里程碑",
    unlocked() {return player[this.layer].best.gte(26)},
    done() {return player[this.layer].points.gte(27)},
    effectDescription: function(){
        let ret="超级声望点数获取被你的里程碑提升。当前: "+format(tmp.milestone_m.milestone27Effect)+"倍";
        if(player.tm.buyables[8].gte(10))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(10)&&player[this.layer].best.gte(27)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第28个MT里程碑",
    unlocked() {return player[this.layer].best.gte(27)},
    done() {return player[this.layer].best.gte(28)},
    effectDescription: function(){
        let ret="第7个里程碑的效果增强";
        if(player.tm.buyables[8].gte(10))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(10)&&player[this.layer].best.gte(28)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第29个MT里程碑",
    unlocked() {return player[this.layer].best.gte(28)},
    done() {return player[this.layer].best.gte(29)},
    effectDescription: function(){
        let ret="里程碑能量提升游戏开发树中的更新获取。当前: "+format(tmp.milestone_m.milestone29Effect)+"倍";
        if(player.tm.buyables[8].gte(11))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(11)&&player[this.layer].best.gte(29)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第30个MT里程碑",
    unlocked() {return player[this.layer].best.gte(29)},
    done() {return player[this.layer].best.gte(30)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(11))return "前一个里程碑还会提升游戏开发树中的时间通量、讲座、经验和现金获取 (已升级)";
        return "前一个里程碑还会提升游戏开发树中的时间通量和讲座获取";
    },
    style() {
        if(player.tm.buyables[8].gte(11)&&player[this.layer].best.gte(30)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第31个MT里程碑",
    unlocked() {return player[this.layer].best.gte(30)},
    done() {return player[this.layer].best.gte(31)},
    effectDescription: function(){
        let ret="声望和超级声望升级11的效果增强";
        if(player.tm.buyables[8].gte(12))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(12)&&player[this.layer].best.gte(31)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第32个MT里程碑",
    unlocked() {return player[this.layer].best.gte(31)},
    done() {return player[this.layer].best.gte(32)},
    effectDescription: function(){
        let ret="声望和超级声望升级12的效果增强";
        if(player.tm.buyables[8].gte(12))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(12)&&player[this.layer].best.gte(32)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第33个MT里程碑",
    unlocked() {return player[this.layer].best.gte(32)},
    done() {return player[this.layer].best.gte(33)},
    effectDescription: function(){
        let ret="声望和超级声望升级13的效果增强";
        if(player.tm.buyables[8].gte(12))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(12)&&player[this.layer].best.gte(33)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第34个MT里程碑",
    unlocked() {return player[this.layer].best.gte(33)},
    done() {return player[this.layer].best.gte(34)},
    effectDescription: function(){
        let ret="声望和超级声望升级14的效果增强；同时解锁一个多树专属声望升级";
        if(player.tm.buyables[8].gte(12))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(12)&&player[this.layer].best.gte(34)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第35个MT里程碑",
    unlocked() {return player[this.layer].best.gte(34)},
    done() {return player[this.layer].best.gte(35)},
    effectDescription: function(){
        let ret="第29个里程碑的效果增强；同时解锁一个多树专属超级声望升级";
        if(player.tm.buyables[8].gte(13))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(13)&&player[this.layer].best.gte(35)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第36个MT里程碑",
    unlocked() {return player[this.layer].best.gte(35)},
    done() {return player[this.layer].best.gte(36)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(13))return "每秒获得10000%的超级声望点数 (已升级)";
        return "每秒获得100%的超级声望点数";
    },
    style() {
        if(player.tm.buyables[8].gte(13)&&player[this.layer].best.gte(36)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第37个MT里程碑",
    unlocked() {return player[this.layer].best.gte(36)},
    done() {return player[this.layer].best.gte(37)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(13))return "第3个里程碑效果^1.049 (已升级)";
        return "第3个里程碑效果^1.037";
    },
    style() {
        if(player.tm.buyables[8].gte(13)&&player[this.layer].best.gte(37)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第38个MT里程碑",
    unlocked() {return player[this.layer].best.gte(37)},
    done() {return player[this.layer].best.gte(38)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(13))return "第3个里程碑效果^1.050 (已升级)";
        return "第3个里程碑效果^1.038";
    },
    style() {
        if(player.tm.buyables[8].gte(13)&&player[this.layer].best.gte(38)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第39个MT里程碑",
    unlocked() {return player[this.layer].best.gte(38)},
    done() {return player[this.layer].best.gte(39)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(13))return "第3个里程碑效果^1.051 (已升级)";
        return "第3个里程碑效果^1.039";
    },
    style() {
        if(player.tm.buyables[8].gte(13)&&player[this.layer].best.gte(39)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第40个MT里程碑",
    unlocked() {return player[this.layer].best.gte(39)},
    done() {return player[this.layer].best.gte(40)},
    effectDescription: function(){
        let ret="增强第2个里程碑效果";
        if(player.tm.buyables[8].gte(14))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(14)&&player[this.layer].best.gte(40)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
		{
    requirementDescription: "第41个MT里程碑",
    unlocked() {return player[this.layer].best.gte(40)},
    done() {return player[this.layer].best.gte(41)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(15))return "第3个里程碑基础效果指数^1.001 (已升级)";
        return "第3个里程碑基础效果指数^1.0005";
    },
    style() {
        if(player.tm.buyables[8].gte(15)&&player[this.layer].best.gte(41)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第42个MT里程碑",
    unlocked() {return player[this.layer].best.gte(41)},
    done() {return player[this.layer].best.gte(42)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(15))return "第2和第6个里程碑效果^3 (已升级)";
        return "第2和第6个里程碑效果^2";
    },
    style() {
        if(player.tm.buyables[8].gte(15)&&player[this.layer].best.gte(42)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第43个MT里程碑",
    unlocked() {return player[this.layer].best.gte(42)},
    done() {return player[this.layer].best.gte(43)},
    effectDescription: function(){
        let ret="第4个里程碑效果增强";
        if(player.tm.buyables[8].gte(16))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(16)&&player[this.layer].best.gte(43)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第44个MT里程碑",
    unlocked() {return player[this.layer].best.gte(43)},
    done() {return player[this.layer].best.gte(44)},
    effectDescription: function(){
        let ret="声望升级11-14效果增强";
        if(player.tm.buyables[8].gte(16))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(16)&&player[this.layer].best.gte(44)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第45个MT里程碑",
    unlocked() {return player[this.layer].best.gte(44)},
    done() {return player[this.layer].best.gte(45)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(16))return "第3个里程碑基础效果指数^1.001 (已升级)";
        return "第3个里程碑基础效果指数^1.0005";
    },
    style() {
        if(player.tm.buyables[8].gte(16)&&player[this.layer].best.gte(45)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第46个MT里程碑",
    unlocked() {return player[this.layer].best.gte(45)},
    done() {return player[this.layer].best.gte(46)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(17))return "第3个里程碑基础效果指数^1.001 (已升级)";
        return "第3个里程碑基础效果指数^1.0005";
    },
    style() {
        if(player.tm.buyables[8].gte(17)&&player[this.layer].best.gte(46)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第47个MT里程碑",
    unlocked() {return player[this.layer].best.gte(46)},
    done() {return player[this.layer].best.gte(47)},
    effectDescription: function(){
        if(player.tm.buyables[8].gte(17))return "第27个里程碑效果^3 (已升级)";
        return "第27个里程碑效果^2";
    },
    style() {
        if(player.tm.buyables[8].gte(17)&&player[this.layer].best.gte(47)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第48个MT里程碑",
    unlocked() {return player[this.layer].best.gte(47)},
    done() {return player[this.layer].best.gte(48)},
    effectDescription: function(){
        let ret="第4个里程碑效果增强";
        if(player.tm.buyables[8].gte(18))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(18)&&player[this.layer].best.gte(48)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第49个MT里程碑",
    unlocked() {return player[this.layer].best.gte(48)},
    done() {return player[this.layer].best.gte(49)},
    effectDescription: function(){
        let ret="超级声望升级11-14效果增强";
        if(player.tm.buyables[8].gte(20))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(20)&&player[this.layer].best.gte(49)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第50个MT里程碑",
    unlocked() {return player[this.layer].best.gte(49)},
    done() {return player[this.layer].best.gte(50)},
    effectDescription: function(){
        let ret="里程碑能量提升增量树宇宙中的Pion获取。当前: "+format(tmp.milestone_m.milestone50Effect)+"倍";
        if(player.tm.buyables[8].gte(20))ret+=" (已升级)";
        return ret;
    },
    style() {
        if(player.tm.buyables[8].gte(20)&&player[this.layer].best.gte(50)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },
},
{
    requirementDescription: "第51个MT里程碑",
    unlocked() {return player[this.layer].best.gte(50)},
    done() {return player[this.layer].best.gte(51)},
    effectDescription: function(){
        //if(player.tm.buyables[8].gte(16))return "第3个里程碑基础效果指数^1.001 (已升级)";
        return "第3个里程碑基础效果指数^1.0005";
    },/*
    style() {
        if(player.tm.buyables[8].gte(16)&&player[this.layer].best.gte(45)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },*/
},
{
    requirementDescription: "第52个MT里程碑",
    unlocked() {return player[this.layer].best.gte(51)},
    done() {return player[this.layer].best.gte(52)},
    effectDescription: function(){
        return "第2个里程碑效果增强";
    },
},
{
    requirementDescription: "第53个MT里程碑",
    unlocked() {return player[this.layer].best.gte(52)},
    done() {return player[this.layer].best.gte(53)},
    effectDescription: function(){
        return "第4个里程碑效果增强";
    },
},
{
    requirementDescription: "第54个MT里程碑",
    unlocked() {return player[this.layer].best.gte(53)},
    done() {return player[this.layer].best.gte(54)},
    effectDescription: function(){
        return "第50个里程碑效果增强";
    },
},
{
    requirementDescription: "第55个MT里程碑",
    unlocked() {return player[this.layer].best.gte(54)},
    done() {return player[this.layer].best.gte(55)},
    effectDescription: function(){
        return "第50个里程碑效果增强";
    },
},
{
    requirementDescription: "第56个MT里程碑",
    unlocked() {return player[this.layer].best.gte(55)},
    done() {return player[this.layer].best.gte(56)},
    effectDescription: function(){
        return "第5个里程碑效果增强";
    },
},
{
    requirementDescription: "第57个MT里程碑",
    unlocked() {return player[this.layer].best.gte(56)},
    done() {return player[this.layer].best.gte(57)},
    effectDescription: function(){
        return "解锁更多升级";
    },
},
{
    requirementDescription: "第58个MT里程碑",
    unlocked() {return player[this.layer].best.gte(57)},
    done() {return player[this.layer].best.gte(58)},
    effectDescription: function(){
        return "第4个里程碑效果增强";
    },
},
{
    requirementDescription: "第59个MT里程碑",
    unlocked() {return player[this.layer].best.gte(58)},
    done() {return player[this.layer].best.gte(59)},
    effectDescription: function(){
        return "声望升级11-14效果增强";
    },
},
{
    requirementDescription: "第60个MT里程碑",
    unlocked() {return player[this.layer].best.gte(59)},
    done() {return player[this.layer].best.gte(60)},
    effectDescription: function(){
        return "多树升级55效果增强";
    },
},
{
    requirementDescription: "第61个MT里程碑",
    unlocked() {return player[this.layer].best.gte(60)},
    done() {return player[this.layer].best.gte(61)},
    effectDescription: function(){
        //if(player.tm.buyables[8].gte(16))return "第3个里程碑基础效果指数^1.001 (已升级)";
        return "第3个里程碑基础效果指数^1.0001";
    },/*
    style() {
        if(player.tm.buyables[8].gte(16)&&player[this.layer].best.gte(45)){
            return {backgroundColor: "#cccc00"};
        }
        return {};
    },*/
},
{
    requirementDescription: "第62个MT里程碑",
    unlocked() {return player[this.layer].best.gte(61)},
    done() {return player[this.layer].best.gte(62)},
    effectDescription: function(){
        return "第2个里程碑效果增强";
    },
},
{
    requirementDescription: "第63个MT里程碑",
    unlocked() {return player[this.layer].best.gte(62)},
    done() {return player[this.layer].best.gte(63)},
    effectDescription: function(){
        return "第4个里程碑效果增强";
    },
},
{
    requirementDescription: "第64个MT里程碑",
    unlocked() {return player[this.layer].best.gte(63)},
    done() {return player[this.layer].best.gte(64)},
    effectDescription: function(){
        return "声望升级11-14效果增强";
    },
},
{
    requirementDescription: "第65个MT里程碑",
    unlocked() {return player[this.layer].best.gte(64)},
    done() {return player[this.layer].best.gte(65)},
    effectDescription: function(){
        return "多树升级55效果增强";
    },
},
{
    requirementDescription: "第66个MT里程碑",
    unlocked() {return player[this.layer].best.gte(65)},
    done() {return player[this.layer].best.gte(66)},
    effectDescription: function(){
        return "游戏开发树中的注册费用降低";
    },
},
{
    requirementDescription: "第67个MT里程碑",
    unlocked() {return player[this.layer].best.gte(66)},
    done() {return player[this.layer].best.gte(67)},
    effectDescription: function(){
        return "游戏开发树中的终点费用降低";
    },
},
{
    requirementDescription: "第68个MT里程碑",
    unlocked() {return player[this.layer].best.gte(67)},
    done() {return player[this.layer].best.gte(68)},
    effectDescription: function(){
        return "第4个里程碑效果增强";
    },
},
{
    requirementDescription: "第69个MT里程碑 lol",
    unlocked() {return player[this.layer].best.gte(68)},
    done() {return player[this.layer].best.gte(69)},
    effectDescription: function(){
        return "在增量树宇宙中获得1.5倍起源点数";
    },
},
{
    requirementDescription: "第70个MT里程碑",
    unlocked() {return player[this.layer].best.gte(69)},
    done() {return player[this.layer].best.gte(70)},
    effectDescription: function(){
        return "多树升级55效果增强";
    },
}
	],
	milestone1Effect(){
		var r=new Decimal(1);
		if(player.milestone_m.best.gte(2))r=r.mul(this.milestone2Effect());
		if(player.milestone_m.best.gte(3))r=r.mul(tmp.milestone_m.milestone3Effect);
		if(player.tm.buyables[8].gte(2))r=r.mul(3);
		if(hasUpgrade("milestone_p",11))r=r.mul(upgradeEffect("milestone_p",11));
		if(hasUpgrade("milestone_p",12))r=r.mul(upgradeEffect("milestone_p",12));
		if(hasUpgrade("milestone_sp",11))r=r.mul(upgradeEffect("milestone_sp",11));
		if(hasUpgrade("milestone_sp",12))r=r.mul(upgradeEffect("milestone_sp",12));
		return r;
	},
	update(diff){
		if(player.milestone_m.best.gte(1)){
			player.modpoints[8]=player.modpoints[8].add(layers.milestone_m.milestone1Effect().mul(diff));
		}
	},
	powerEffect(){
		let eff1=Decimal.pow(10,player.modpoints[8]);
		if(player.modpoints[8].gte(50000))eff1=player.modpoints[8].mul(2).pow(10000);
		let eff2=new Decimal(1);
		if(player.milestone_m.best.gte(25))eff2=player.modpoints[8].pow(1e6);
		if(hasUpgrade("milestone_p",15))eff2 = eff2.pow(upgradeEffect("milestone_p",15));
		if(hasUpgrade("milestone_sp",15))eff2 = eff2.pow(upgradeEffect("milestone_sp",15));
		return [eff1,eff2];
	},
	milestone2Effect(){
		if(player.milestone_m.best.gte(52)){
			let base=1.01;
			let power=hasUpgrade("milestone_sp",25)?0.34:1/3;
			if(player.milestone_m.best.gte(62))power+=0.01;
			let ret = Decimal.pow(base,Decimal.log10(player.points.add(1e10)).pow(power).add(1));
			return ret;
		}
		if(player.milestone_m.best.gte(40)){
			let ret=player.points.add(1e100).log10();
			if(player.milestone_m.best.gte(42))ret=ret.pow(2);
			if(player.tm.buyables[8].gte(14))ret=ret.pow(2);
			if(player.tm.buyables[8].gte(15))ret=ret.pow(1.5);
			return ret;
		}
		if(player.tm.buyables[8].gte(2))return player.points.add(1e100).log10().log10().pow(1.5);
		return player.points.add(1e100).log10().log10();
	},
	milestone3Effect(){
		var m=Decimal.log10(player.modpoints[8].add(20)).pow(0.9);
		if(player.milestone_m.best.gte(41))m=m.pow(player.tm.buyables[8].gte(15)?1.001:1.0005);
		if(player.milestone_m.best.gte(45))m=m.pow(player.tm.buyables[8].gte(16)?1.001:1.0005);
		if(player.milestone_m.best.gte(46))m=m.pow(player.tm.buyables[8].gte(17)?1.001:1.0005);
		if(player.milestone_m.best.gte(51))m=m.pow(1.0005);
		if(player.milestone_m.best.gte(61))m=m.pow(1.0001);
		var b=new Decimal(2);
		if(player.milestone_m.best.gte(4))b=b.add(layers.milestone_m.milestone4Effect());
		if(player.tm.buyables[8].gte(3))m=m.mul(1.016);
		if(player.milestone_m.best.gte(17))m=m.mul(1.017);
		if(player.milestone_m.best.gte(18))m=m.mul(1.018);
		if(player.tm.buyables[8].gte(7))m=m.mul(1.019);
		if(player.tm.buyables[8].gte(13))m=m.mul(1.036);
		if(player.milestone_m.best.gte(37))m=m.mul(1.037);
		if(player.milestone_m.best.gte(38))m=m.mul(1.038);
		if(player.milestone_m.best.gte(39))m=m.mul(1.039);
		if(hasUpgrade("milestone_p",23)){
			b=b.mul(player.milestone_p.points.add(1e20).log10().log10().div(player.tm.buyables[8].gte(9)?24:player.milestone_m.best.gte(23)?29:30).add(1));
		}
		if(hasUpgrade("milestone_p",24)){
			b=b.mul(player.milestone_p.points.add(1e20).log10().log10().div(player.tm.buyables[8].gte(9)?24:player.milestone_m.best.gte(24)?25:30).add(1));
		}
		if(hasUpgrade("milestone_sp",24)){
			b=b.mul(player.milestone_sp.points.add(1e20).log10().log10().div(100).add(1));
		}

		return Decimal.pow(b,m);
	},
	milestone4EffectExponent(){
		if(player.milestone_m.best.gte(68))return 0.55;
		if(player.milestone_m.best.gte(63))return 0.54;
		if(player.tm.buyables[8].gte(18))return 0.534;
		if(player.milestone_m.best.gte(58))return 0.53;
		if(player.milestone_m.best.gte(53))return 0.52;
		if(player.tm.buyables[8].gte(16))return 0.515;
		if(player.milestone_m.best.gte(48))return 0.512;
		if(player.milestone_m.best.gte(43))return 0.511;
		if(player.tm.buyables[8].gte(3))return 0.51;
		return 0.5;
	},
	milestone4Effect(){
		return player.milestone_m.best.sub(2).pow(layers.milestone_m.milestone4EffectExponent());
	},
	milestone5Effect(){
		if(player.milestone_m.best.gte(56))return player.modpoints[8].add(100).log10().pow(6);
		if(player.tm.buyables[8].gte(6))return player.modpoints[8].add(100).log10().pow(4);
		if(player.milestone_m.best.gte(15))return player.modpoints[8].add(100).log10().pow(3);
		if(player.tm.buyables[8].gte(3))return player.modpoints[8].add(100).log10().pow(2);
		return player.modpoints[8].add(100).log10();
	},
	milestone6Effect(){
		var p=player.milestone_m.best;
		if(player.tm.buyables[8].gte(4))p=p.pow(1.98);
		if(hasUpgrade("milestone_p",21))p=p.pow(1.5);
		if(hasUpgrade("milestone_p",22))p=p.pow(1.5);
		if(player.milestone_m.best.gte(42))p=p.pow(2);
		if(player.tm.buyables[8].gte(15))p=p.pow(1.5);
		if(hasUpgrade("milestone_sp",23))p=p.pow(2);
		return p;
	},
	milestone21Effect(){
		if(hasUpgrade("milestone_p",25))return player.modpoints[8].add(100).log10().pow(10);
		if(player.tm.buyables[8].gte(8))return player.modpoints[8].add(100).log10().pow(2);
		return player.modpoints[8].add(100).log10();
	},
	milestone27Effect(){
		var p=player.milestone_m.best;
		if(player.tm.buyables[8].gte(10))p=p.pow(2);
		if(player.milestone_m.best.gte(47))p=p.pow(2);
		if(hasUpgrade("milestone_sp",23))p=p.pow(2);
		if(player.tm.buyables[8].gte(17))p=p.pow(1.5);
		return p;
	},
	milestone29Effect(){
		if(player.tm.buyables[8].gte(13))return player.modpoints[8].add(100).log10().pow(10);
		if(player.tm.buyables[8].gte(10))return player.modpoints[8].add(100).log10().pow(5);
		if(player.milestone_m.best.gte(35))return player.modpoints[8].add(100).log10().pow(2);
		return player.modpoints[8].add(100).log10();
	},
	milestone50Effect(){
		if(player.tm.buyables[8].gte(20))return player.modpoints[8].add(100).log10().pow(3);
		if(player.milestone_m.best.gte(55))return player.modpoints[8].add(100).log10().pow(2);
		if(player.milestone_m.best.gte(54))return player.modpoints[8].add(100).log10();
		return player.modpoints[8].add(100).log10().sqrt();
	},
});


addLayer("milestone_p", {
    name: "里程碑P", // 可选，仅在少数地方使用，如果省略则使用图层ID
    symbol: "P", // 显示在图层节点上的符号，默认为ID首字母大写
    position: 2, // 行内水平位置，默认按ID字母排序
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#658091",
    requires(){
        return new Decimal(1e6);
    },
    resource: "声望点数", // 声望货币名称
    baseResource: "里程碑能量", // 声望基于的资源名称
    baseAmount() {return player.modpoints[8]}, // 获取当前基础资源数量
    type: "normal", // normal: 获得货币的成本取决于获得量 static: 成本取决于已有量
    gainMult() { // 计算来自加成的货币乘数
        mult = new Decimal(1)
        if(player.milestone_m.best.gte(6))mult = mult.mul(tmp.milestone_m.milestone6Effect);
        if(hasUpgrade("milestone_p",13))mult=mult.mul(upgradeEffect("milestone_p",13));
        if(hasUpgrade("milestone_p",14))mult=mult.mul(upgradeEffect("milestone_p",14));
        if(hasUpgrade("milestone_sp",13))mult=mult.mul(upgradeEffect("milestone_sp",13));
        if(hasUpgrade("milestone_sp",14))mult=mult.mul(upgradeEffect("milestone_sp",14));
        if(player.milestone_m.best.gte(22))mult=mult.mul(10);
        if(player.tm.buyables[8].gte(9))mult=mult.mul(1e9);
        return mult
    },
    gainExp() { // 计算来自加成的货币指数
        let m=new Decimal(1);
        return m;
    },
    row: 1, // 图层在树中的行号(0是第一行)
    exponent: 0.5,
    layerShown(){return player.tm.currentTree==8 && player.tm.buyables[8].gte(2)},
    upgrades: {
        rows: 4,
        cols: 5,
        11: {
            title: "声望升级11",
            description: "第一个里程碑效果受声望点数加成",
            cost: new Decimal(1),
            unlocked() { return true},
            effect() {
                let base=3;
                if(player.milestone_m.points.gte(11))base+=0.25;
                if(player.tm.buyables[8].gte(5))base+=0.25;
                if(player.milestone_m.points.gte(31))base+=0.25;
                if(player.tm.buyables[8].gte(12))base+=0.25;
                if(player.milestone_m.points.gte(44))base+=0.1;
                if(player.tm.buyables[8].gte(16))base+=0.1;
                if(player.milestone_m.points.gte(59))base+=0.1;
                if(player.milestone_m.points.gte(64))base+=0.1;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9).add(1))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        12: {
            title: "声望升级12",
            description: "第一个里程碑效果受声望点数加成",
            cost: new Decimal(4),
            unlocked() { return true},
            effect() {
                let base=2;
                if(player.milestone_m.points.gte(12))base+=0.2;
                if(player.tm.buyables[8].gte(5))base+=0.2;
                if(player.milestone_m.points.gte(32))base+=0.1;
                if(player.tm.buyables[8].gte(12))base+=0.1;
                if(player.milestone_m.points.gte(44))base+=0.1;
                if(player.tm.buyables[8].gte(16))base+=0.1;
                if(player.milestone_m.points.gte(59))base+=0.05;
                if(player.milestone_m.points.gte(64))base+=0.05;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9).add(1))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        13: {
            title: "声望升级13",
            description: "声望点数获取受声望点数加成",
            cost: new Decimal(100000000),
            unlocked() { return player.tm.buyables[8].gte(3)},
            effect() {
                let base=1.2;
                if(player.milestone_m.points.gte(13))base+=0.1;
                if(player.tm.buyables[8].gte(5))base+=0.2;
                if(player.milestone_m.points.gte(33))base+=0.025;
                if(player.tm.buyables[8].gte(12))base+=0.025;
                if(player.milestone_m.points.gte(44))base+=0.025;
                if(player.tm.buyables[8].gte(16))base+=0.025;
                if(player.milestone_m.points.gte(59))base+=0.025;
                if(player.milestone_m.points.gte(64))base+=0.025;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9).add(1))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        14: {
            title: "声望升级14",
            description: "声望点数获取受声望点数加成",
            cost: new Decimal(1e11),
            unlocked() { return player.tm.buyables[8].gte(3)},
            effect() {
                let base=1.1;
                if(player.milestone_m.points.gte(14))base+=0.05;
                if(player.tm.buyables[8].gte(5))base+=0.1;
                if(player.milestone_m.points.gte(34))base+=0.05;
                if(player.tm.buyables[8].gte(12))base+=0.05;
                if(player.milestone_m.points.gte(44))base+=0.025;
                if(player.tm.buyables[8].gte(16))base+=0.025;
                if(player.milestone_m.points.gte(59))base+=0.025;
                if(player.milestone_m.points.gte(64))base+=0.025;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9).add(1))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        15: {
            title: "声望升级15",
            description: "里程碑能量对点数获取的影响提升为幂次",
            cost: new Decimal("1e500"),
            unlocked() { return player.milestone_m.points.gte(34)},
            effect() {
                let ret = 50;
                return ret;
            },
            effectDisplay() { return "^"+format(this.effect()) },
        },
        21: {
            title: "声望升级21",
            description: "第6个里程碑效果^1.5",
            cost: new Decimal(1e25),
            unlocked() { return player.tm.buyables[8].gte(4)},
        },
        22: {
            title: "声望升级22",
            description: "第6个里程碑效果^1.5",
            cost: new Decimal(1e33),
            unlocked() { return player.tm.buyables[8].gte(4)},
        },
        23: {
            title: "声望升级23",
            description: "第三个里程碑效果受声望点数加成",
            cost: new Decimal(1e63),
            unlocked() { return player.tm.buyables[8].gte(5)},
        },
        24: {
            title: "声望升级24",
            description: "第三个里程碑效果受声望点数加成",
            cost: new Decimal(1e80),
            unlocked() { return player.tm.buyables[8].gte(5)},
        },
        25: {
            title: "声望升级25",
            description: "第21个里程碑效果^5",
            cost: new Decimal("1e560"),
            unlocked() { return player.milestone_m.points.gte(34)},
        },
        31: {
            title: "声望升级31",
            description: "超级声望升级11-14效果更强",
            cost: new Decimal("1e7000"),
            unlocked() { return player.milestone_m.points.gte(57)},
        },
        32: {
            title: "声望升级32",
            description: "多树升级55效果更强",
            cost: new Decimal("1e7760"),
            unlocked() { return player.milestone_m.points.gte(57)},
        },
        33: {
            title: "声望升级33",
            description: "增量树宇宙中的增量升级13效果更强",
            cost: new Decimal("1e8150"),
            unlocked() { return player.milestone_m.points.gte(57)},
        },
        34: {
            title: "声望升级34",
            description: "增量树宇宙中的增量升级13效果更强",
            cost: new Decimal("1e8800"),
            unlocked() { return player.milestone_m.points.gte(57)},
        },
        35: {
            title: "声望升级35",
            description: "增量树宇宙中的增量升级13效果更强",
            cost: new Decimal("1e8950"),
            unlocked() { return player.milestone_m.points.gte(57)},
        },
    },
    branches: ["milestone_m"],
    passiveGeneration(){
        if(player.tm.buyables[8].gte(5))return 100;
        if(player.milestone_m.best.gte(10))return 1;
        return 0;
    },
    softcap(){
        return new Decimal(Infinity);
    },
    softcapPower(){
        return new Decimal(1);
    },
    doReset(l){
        if(l=="milestone_p" || !l.startsWith("milestone_")){return;}
        var b=new Decimal(player[this.layer].best);
        layerDataReset(this.layer,["upgrades","milestones","challenges"]);
        player[this.layer].best=b;
        return;
    },
})

addLayer("milestone_sp", {
    name: "超级声望", 
    symbol: "SP", 
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#65A0B0",
    requires(){
        return new Decimal(1e98);
    },
    resource: "超级声望点数",
    baseResource: "声望点数",
    baseAmount() {return player.milestone_p.points},
    type: "normal",
    gainMult() {
        mult = new Decimal(1)
        if(player.milestone_m.best.gte(27))mult = mult.mul(tmp.milestone_m.milestone27Effect);
        if(hasUpgrade("milestone_sp",21))mult=mult.mul(upgradeEffect("milestone_sp",21));
        if(hasUpgrade("milestone_sp",22))mult=mult.mul(upgradeEffect("milestone_sp",22));
        return mult
    },
    gainExp() {
        mult = new Decimal(1)
        return mult
    },
    row: 2,
    exponent: 0.1,
    layerShown(){return player.tm.currentTree==8 && player.tm.buyables[8].gte(6)},
    upgrades: {
        rows: 4,
        cols: 5,
        11: {
            title: "超级声望升级11",
            description: "第一个里程碑效果受超级声望点数加成",
            cost: new Decimal(1),
            unlocked() { return true},
            effect() {
                let base=50;
                if(player.milestone_m.points.gte(31))base+=2.5;
                if(player.tm.buyables[8].gte(12))base+=2.5;
                if(player.milestone_m.points.gte(49))base+=2.5;
                if(hasUpgrade("milestone_p",31))base+=2.5;
                if(player.tm.buyables[8].gte(20))base+=2.5;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9).add(1))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        12: {
            title: "超级声望升级12",
            description: "第一个里程碑效果受超级声望点数加成",
            cost: new Decimal(4),
            unlocked() { return true},
            effect() {
                let base=10;
                if(player.milestone_m.points.gte(32))base+=0.5;
                if(player.tm.buyables[8].gte(12))base+=0.5;
                if(player.milestone_m.points.gte(49))base+=0.5;
                if(hasUpgrade("milestone_p",31))base+=0.5;
                if(player.tm.buyables[8].gte(20))base+=0.5;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9).add(1))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        13: {
            title: "超级声望升级13",
            description: "声望点数获取受超级声望点数加成",
            cost: new Decimal(1e15),
            unlocked() { return player.tm.buyables[8].gte(9)},
            effect() {
                let base=3;
                if(player.milestone_m.points.gte(33))base+=0.25;
                if(player.tm.buyables[8].gte(12))base+=0.25;
                if(player.milestone_m.points.gte(49))base+=0.25;
                if(hasUpgrade("milestone_p",31))base+=0.25;
                if(player.tm.buyables[8].gte(20))base+=0.25;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9).add(1))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        14: {
            title: "超级声望升级14",
            description: "声望点数获取受超级声望点数加成",
            cost: new Decimal(1e33),
            unlocked() { return player.tm.buyables[8].gte(9)},
            effect() {
                let base=1.5;
                if(player.milestone_m.points.gte(34))base+=0.25;
                if(player.tm.buyables[8].gte(12))base+=0.25;
                if(player.milestone_m.points.gte(49))base+=0.25;
                if(hasUpgrade("milestone_p",31))base+=0.25;
                if(player.tm.buyables[8].gte(20))base+=0.25;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9).add(1))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        15: {
            title: "超级声望升级15",
            description: "里程碑能量对点数获取的影响提升为幂次",
            cost: new Decimal(2e43),
            unlocked() { return player.milestone_m.points.gte(35)},
            effect() {
                let ret = 2;
                return ret;
            },
            effectDisplay() { return "^"+format(this.effect()) },
        },
        21: {
            title: "超级声望升级21",
            description: "超级声望点数获取受超级声望点数加成",
            cost: new Decimal(1e52),
            unlocked() { return player.tm.buyables[8].gte(10)},
            effect() {
                let base=1.3;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9).add(1))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        22: {
            title: "超级声望升级22",
            description: "超级声望点数获取受超级声望点数加成",
            cost: new Decimal(1e110),
            unlocked() { return player.tm.buyables[8].gte(10)},
            effect() {
                let base=1.1;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9).add(1))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        23: {
            title: "超级声望升级23",
            description: "第6和第27个里程碑效果^2",
            cost: new Decimal("1e437"),
            unlocked() { return player.tm.buyables[8].gte(16)},
        },
        24: {
            title: "超级声望升级24",
            description: "第三个里程碑效果受超级声望点数加成",
            cost: new Decimal("1e578"),
            unlocked() { return player.tm.buyables[8].gte(16)},
        },
        25: {
            title: "超级声望升级25",
            description: "第2个里程碑效果更强",
            cost: new Decimal("1e600"),
            unlocked() { return player.milestone_m.points.gte(57)},
        },
    },
    branches: ["milestone_p"],
    passiveGeneration(){
        if(player.tm.buyables[8].gte(13))return 100;
        if(player.milestone_m.best.gte(36))return 1;
        return 0;
    },
    softcap:new Decimal(Infinity),
    softcapPower:new Decimal(1),
    doReset(l){
        if(l=="milestone_p" || l=="milestone_sp" || !l.startsWith("milestone_")){return;}
        var b=new Decimal(player[this.layer].best);
        layerDataReset(this.layer,["upgrades","milestones","challenges"]);
        player[this.layer].best=b;
        return;
    }
})