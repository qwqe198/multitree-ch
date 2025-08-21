addLayer("tm", {
    name: "树管理器", 
    symbol: "TM", 
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(1),
        currentTree: 1,
        p_upg: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(10), 
    resource: "树", 
    baseResource: "点数", 
    baseAmount() {return player.points}, 
    type: "none", 
    exponent: 0.5, 
    gainMult() { 
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: "side", 
    hotkeys: [
        {key: "m", description: "M: 显示树管理器<br>以下快捷键基于当前树。<br>", onPress(){if(hasUpgrade("tptc_p",13))document.getElementById("tm").click();}},
        {key: "ifyoucantseethehotkeys", description: "如果看不到下面的快捷键，请重新进入信息标签", onPress(){}},
    ],
    layerShown(){return hasUpgrade("tptc_p",13);},
    tabFormat: {
        "树管理器":{
            content(){
                let ret=["main-display"];
                for(i=1;player.tm.points.gte(i);i++){
                    ret.push(["row",[["display-text",TREES[i]+" <br>作者: "+TREEAUTHOR[i]+" <br>版本: "+TREEVERS[i][player.tm.buyables[i].toNumber()]],["buyable",i],["clickable",i]]]);
                }
                if(hasUpgrade("tptc_sp",13)){
                    ret.push(["buyable",0]);
                }
                ret.push(["display-text","非常感谢这些启发我的TMT模组作者(loader3229): "]);
                ret.push(["display-text","Jacorb90，制作了经典/重制版声望树。"]);
                if(hasUpgrade("tptc_sp",13))ret.push(["display-text","Acamaeda，制作了模组树。"]);
                if(player.tm.points.gte(2))ret.push(["display-text","okamii17，制作了星尘树，第一个已知的TMT模组。"]);
                if(player.tm.points.gte(3))ret.push(["display-text","unpingabot，制作了声望森林。"]);
                if(player.tm.points.gte(4))ret.push(["display-text","thefinaluptake，制作了燃烧树。(thefinaluptake是社区树中的一个层级!)"]);
                if(player.tm.points.gte(5))ret.push(["display-text","pg132，制作了增量树宇宙。"]);
                if(player.tm.points.gte(6))ret.push(["display-text","thepaperpilot，制作了游戏开发树、Lit和Profectus。"]);
                if(player.tm.points.gte(9))ret.push(["display-text","ducdat0507，制作了动力树。"]);
                if(player.tm.points.gte(8))ret.push(["display-text","还有我，loader3229，制作了里程碑树和多树。"]);
                else ret.push(["display-text","还有我，loader3229，制作了多树。"]);
                return ret;
            }
        },
        "多树升级":{
            content:["upgrades"],
            unlocked(){return player.tptc_mb.best.gte(3)}
        },
        "重写TPT":{
            content:[
                ["display-text","重写TPT升级算作多树升级。<br>升级声望树重制版以解锁更多。"],
                ["upgrade",16],
                ["row",[["upgrade",17],["upgrade",18]]],
                ["row",[["upgrade",26],["upgrade",27],["upgrade",28]]],
                ["row",[["upgrade",36],["upgrade",37]]],
                ["row",[["upgrade",46],["upgrade",47]]],
                ["row",[["upgrade",38],["upgrade",39]]],
                ["row",[["upgrade",56],["upgrade",57],["upgrade",58]]],
                ["row",[["upgrade",19],["upgrade",29]]],
                ["row",[["upgrade",48],["upgrade",49]]],
                ["row",[["upgrade",66],["upgrade",59],["upgrade",67]]],
                ["row",[["upgrade",68],["upgrade",69]]],
                ["row",[["upgrade",76],["upgrade",77]]],
                ["row",[["upgrade",78],["upgrade",79]]]
            ],
            unlocked(){return player.tm.buyables[0].gte(6) && player.tm.buyables[1].gte(20)}
        },
        "倍率升级":{
            content(){
                let mfot=getMultiplierFromOtherTrees();
                let s=new Decimal(0);
                let ret=[["display-text","你现在可以升级来自其他树的倍率了!"],["display-text","P="+format(mfot.p,4)],["blank","4px"]];
                for(i=2;player.tm.points.gte(i);i++){
                    let m=mfot[i];
                    let n=m.log10().root(mfot.p);
                    s=s.add(n);
                    ret.push(["row",[["display-text",TREES[i]+" - log10("+format(m,4)+")^(1/P)="+format(n,4)]]]);
                    if(i==6 && !hasUpgrade("tm",55))i++;
                }
                ret.push(["row",[["display-text","-------------------------------------------------------------"]]]);
                ret.push(["row",[["display-text","总和: "+format(s,4)]]]);
                ret.push(["row",[["display-text","总倍率: 10^("+format(s,4)+"^P×"+format(mfot[0],4)+")="+format(mfot[1],4)]]]);
                ret.push(["row",[["display-text","-------------------------------------------------------------"]]]);
                ret.push(["clickable",0]);
                return ret;
            },
            unlocked(){return player.tm.buyables[0].gte(8) && hasUpgrade("tm",51)}
        },
    },
    
	buyables: {
    0: {
        title: "模组树", // 可选，以较大字体显示在顶部
        cost(x=player[this.layer].buyables[this.id]) { // 购买第x个可购买项的成本，如果是多种货币可以是对象
            let cost = [new Decimal("1e800"),new Decimal("1e4000"),new Decimal("1e20000"),new Decimal("1e100000"),new Decimal("1e500000"),new Decimal("e2e7"),new Decimal("e2e8"),new Decimal("e2e12"),new Decimal(Infinity)][player[this.layer].buyables[this.id].toNumber()];
            return cost
        },
        display() { // 标题后显示在可购买按钮中的其他内容
            let data = tmp[this.layer].buyables[this.id]
            return "等级: "+formatWhole(player[this.layer].buyables[this.id])+"<br>成本: "+format(data.cost)+" 点数<br>效果: 点数获取乘以"+format(data.effect)+"，并解锁"+formatWhole(player[this.layer].buyables[this.id])+"棵新树";
        },
        unlocked() { return player[this.layer].points.gte(this.id) }, 
        canAfford() {
            return player.points.gte(tmp[this.layer].buyables[this.id].cost)
        },
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            player.points = player.points.sub(cost)
            player[this.layer].points = player[this.layer].buyables[this.id].add(1)
        },
        buyMax() {}, // 如果需要，您必须自己处理这个
        effect() {
            return Decimal.pow(1e20,player[this.layer].buyables[this.id].pow(2));
        },
        style: {'height':'200px','width':'200px'},
    },
    1: {
        title: "升级", 
        cost(x=player[this.layer].buyables[this.id]) { 
            let cost = [new Decimal(0),new Decimal(100),new Decimal(1e6),new Decimal(1e30),new Decimal(1e50),new Decimal(1e150),new Decimal(1e300),new Decimal("1e700"),new Decimal("1e1500"),new Decimal("1e3000"),new Decimal("1e7000"),new Decimal("1e13000"),new Decimal("1e30000"),new Decimal("1e80000"),new Decimal("1e200000"),new Decimal("1e800000"),new Decimal("e15e5"),new Decimal("e5e6"),new Decimal("e12e6"),new Decimal("e2e7"),new Decimal(Infinity)][player[this.layer].buyables[this.id].toNumber()];
            return cost
        },
        display() { 
            let data = tmp[this.layer].buyables[this.id]
            return "等级: "+formatWhole(player[this.layer].buyables[this.id])+"<br>成本: "+format(data.cost)+" 点数";
        },
        unlocked() { return player[this.layer].points.gte(this.id) }, 
        canAfford() {
            return player.points.gte(tmp[this.layer].buyables[this.id].cost)
        },
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            player.points = player.points.sub(cost)
        },
        buyMax() {}, 
        style: {'height':'100px','width':'150px'},
    },
    2: {
        title: "升级", 
        cost(x=player[this.layer].buyables[this.id]) { 
            x=new Decimal(x);
            if(x.lt(0.5))return new Decimal(0);
            if(x.lt(11.5))return Decimal.pow(10,x.pow(2).mul(500).add(1500).sub(x.mul(750)));
            return Decimal.dInf
        },
        display() { 
            let data = tmp[this.layer].buyables[this.id]
            return "等级: "+formatWhole(player[this.layer].buyables[this.id])+"<br>成本: "+format(data.cost)+" 点数";
        },
        unlocked() { return player[this.layer].points.gte(this.id) }, 
        canAfford() {
            return player.points.gte(tmp[this.layer].buyables[this.id].cost)
        },
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            player.points = player.points.sub(cost)
        },
        buyMax() {}, 
        style: {'height':'100px','width':'150px'},
    },
    3: {
        title: "升级", 
        cost(x=player[this.layer].buyables[this.id]) { 
            x=new Decimal(x);
            if(x.lt(0.5))return new Decimal(0);
            if(x.lt(8.5))return Decimal.pow(10,x.pow(2).mul(2500).add(9500).sub(x.mul(2000)));
            return Decimal.dInf
        },
        display() { 
            let data = tmp[this.layer].buyables[this.id]
            return "等级: "+formatWhole(player[this.layer].buyables[this.id])+"<br>成本: "+format(data.cost)+" 点数";
        },
        unlocked() { return player[this.layer].points.gte(this.id) }, 
        canAfford() {
            return player.points.gte(tmp[this.layer].buyables[this.id].cost)
        },
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            player.points = player.points.sub(cost)
        },
        buyMax() {}, 
        style: {'height':'100px','width':'150px'},
    },
    4: {
        title: "升级", 
        cost(x=player[this.layer].buyables[this.id]) { 
            x=new Decimal(x);
            if(x.lt(0.5))return new Decimal(0);
            if(x.lt(4.5))return Decimal.pow(10,x.pow(2).mul(7000).add(22000).add(x.mul(3000)));
            return Decimal.dInf
        },
        display() { 
            let data = tmp[this.layer].buyables[this.id]
            return "等级: "+formatWhole(player[this.layer].buyables[this.id])+"<br>成本: "+format(data.cost)+" 点数";
        },
        unlocked() { return player[this.layer].points.gte(this.id) }, 
        canAfford() {
            return player.points.gte(tmp[this.layer].buyables[this.id].cost)
        },
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            player.points = player.points.sub(cost)
        },
        buyMax() {}, 
        style: {'height':'100px','width':'150px'},
    },
    5: {
        title: "升级", 
        cost(x=player[this.layer].buyables[this.id]) { 
            x=new Decimal(x);
            if(x.lt(0.5))return new Decimal(0);
            if(x.lt(10.5))return Decimal.pow(10,x.pow(2).mul(1e4).add(1e5));
            if(x.lt(30.5))return Decimal.pow(10,x.pow(6));
            if(x.lt(44.5))return Decimal.pow(10,x.pow(x.div(5)));
            return Decimal.dInf
        },
        display() { 
            let data = tmp[this.layer].buyables[this.id]
            return "等级: "+formatWhole(player[this.layer].buyables[this.id])+"<br>成本: "+format(data.cost)+" 点数";
        },
        unlocked() { return player[this.layer].points.gte(this.id) }, 
        canAfford() {
            return player.points.gte(tmp[this.layer].buyables[this.id].cost)
        },
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            player.points = player.points.sub(cost)
        },
        buyMax() {}, 
        style: {'height':'100px','width':'150px'},
    },
    6: {
        title: "升级", 
        cost(x=player[this.layer].buyables[this.id]) { 
            x=new Decimal(x);
            if(x.lt(0.5))return new Decimal(0);
            if(x.lt(10.5))return Decimal.pow(10,x.pow(2).mul(5e4).sub(x.mul(25e3)).add(5e5));
            return Decimal.dInf
        },
        display() { 
            let data = tmp[this.layer].buyables[this.id]
            return "等级: "+formatWhole(player[this.layer].buyables[this.id])+"<br>成本: "+format(data.cost)+" 点数";
        },
        unlocked() { return player[this.layer].points.gte(this.id) }, 
        canAfford() {
            return player.points.gte(tmp[this.layer].buyables[this.id].cost)
        },
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            player.points = player.points.sub(cost)
        },
        buyMax() {}, 
        style: {'height':'100px','width':'150px'},
    },
    7: {
        title: "升级", 
        cost(x=player[this.layer].buyables[this.id]) { 
            x=new Decimal(x);
            if(x.lt(0.5))return new Decimal(0);
            if(x.lt(13.5))return Decimal.pow(10,x.pow(2).mul(1e6).add(x.mul(5e5)).add(2e7));
            if(x.lt(20.5))return Decimal.pow(10,x.pow(3).mul(1e5));
            if(x.lt(32.5))return Decimal.pow(10,x.pow(x.div(4)).mul(300));
            return Decimal.dInf
        },
        display() { 
            let data = tmp[this.layer].buyables[this.id]
            return "等级: "+formatWhole(player[this.layer].buyables[this.id])+"<br>成本: "+format(data.cost)+" 点数";
        },
        unlocked() { return player[this.layer].points.gte(this.id) }, 
        canAfford() {
            return player.points.gte(tmp[this.layer].buyables[this.id].cost)
        },
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            player.points = player.points.sub(cost)
        },
        buyMax() {}, 
        style: {'height':'100px','width':'150px'},
    },
    8: {
        title: "升级", 
        cost(x=player[this.layer].buyables[this.id]) { 
            x=new Decimal(x);
            if(x.lt(0.5))return new Decimal(0);
            if(x.lt(15.5))return Decimal.pow(10,x.pow(4).mul(5e8).add(x.mul(5e8)));
            if(x.lt(20.5))return Decimal.pow(10,x.mul(1.25).pow(5).mul(14687500));
            return Decimal.dInf
        },
        display() { 
            let data = tmp[this.layer].buyables[this.id]
            return "等级: "+formatWhole(player[this.layer].buyables[this.id])+"<br>成本: "+format(data.cost)+" 点数";
        },
        unlocked() { return player[this.layer].points.gte(this.id) }, 
        canAfford() {
            return player.points.gte(tmp[this.layer].buyables[this.id].cost)
        },
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            player.points = player.points.sub(cost)
        },
        buyMax() {}, 
        style: {'height':'100px','width':'150px'},
    },
    9: {
        title: "升级", 
        cost(x=player[this.layer].buyables[this.id]) { 
            x=new Decimal(x);
            if(x.lt(0.5))return new Decimal(0);
            if(x.lt(7.5))return Decimal.pow(10,x.add(1).pow(2).mul(1e11).add(2e12));
            if(x.lt(9.5))return Decimal.pow(10,x.add(1).pow(2).mul(2e11));
            if(x.lt(13.5))return Decimal.pow(10,x.pow(x.div(5)).mul(3e11));
            return Decimal.dInf
        },
        display() { 
            let data = tmp[this.layer].buyables[this.id]
            return "等级: "+formatWhole(player[this.layer].buyables[this.id])+"<br>成本: "+format(data.cost)+" 点数";
        },
        unlocked() { return player[this.layer].points.gte(this.id) }, 
        canAfford() {
            return player.points.gte(tmp[this.layer].buyables[this.id].cost)
        },
        buy() { 
            cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            player.points = player.points.sub(cost)
        },
        buyMax() {}, 
        style: {'height':'100px','width':'150px'},
    },
},
	clickables: {
            0: {
                title: "Upgrade P", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].p_upg) { // cost for buying xth buyable, can be an object if there are multiple currencies
					x=new Decimal(x);
					if(x.gte(100))return Decimal.pow(10,x.pow(8));
					if(x.gte(80))return Decimal.pow(10,x.add(1).pow(5).mul(1e5).mul(Decimal.pow(9,x.sub(59).div(40))));
					if(x.gte(60))return Decimal.pow(10,x.add(1).pow(4).mul(8e6).mul(Decimal.pow(9,x.sub(59).div(40))));
					if(x.gte(45))return Decimal.pow(10,x.pow(3).mul(5e8));
					if(x.gte(34))return Decimal.pow(10,x.pow(2).mul(2.25e10));
					if(x.gte(20))return Decimal.pow(10,x.mul(7.5e11));
					if(x.gte(11))return Decimal.pow(10,x.mul(5e11).add(5.3e12));
					if(x.gte(5))return Decimal.pow(10,x.mul(2e11).add(7.8e12));
					return Decimal.pow(10,x.mul(1.6e11).add(7.8e12));
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].clickables[this.id]
                    return "Level: "+formatWhole(player[this.layer].p_upg)+"<br>Cost: "+format(data.cost)+" points";
                },
                unlocked() {return hasUpgrade("tm",51);}, 
				canClick(){
					let data = tmp[this.layer].clickables[this.id]
					return player.points.gte(data.cost)
				},
				onClick(){
					let data = tmp[this.layer].clickables[this.id]
					if(player.points.gte(this.cost()))player[this.layer].p_upg=player[this.layer].p_upg.add(1);
				},
                style: {'height':'100px','width':'150px'},
            },
            1: {
                title: "切换到此树",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            2: {
                title: "切换到此树",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            3: {
                title: "切换到此树",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            4: {
                title: "切换到此树",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            5: {
                title: "切换到此树",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            6: {
                title: "切换到此树",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            7: {
                title: "切换到此树",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            8: {
                title: "切换到此树",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            9: {
                title: "切换到此树",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
	},
	update(){
		for(i=1;player.tm.points.gte(i);i++){
			if(player.tm.buyables[i].lt(1))player.tm.buyables[i]=new Decimal(1);
		}
		player.tm.points=player.tm.buyables[0].add(1);
		
		if(player.tm.currentTree!=currentTreeTemp){
			currentTreeTemp=player.tm.currentTree;
			hotkeys = {};
			hotkeys[layers.tm.hotkeys[0].key] = layers.tm.hotkeys[0];
			hotkeys[layers.tm.hotkeys[0].key].layer = 'tm';
			hotkeys[layers.tm.hotkeys[0].key].id = 0;
			hotkeys[layers.tm.hotkeys[0].key].unlocked = true;
			//hotkeys[layers.tm.hotkeys[1].key] = layers.tm.hotkeys[1];
			//hotkeys[layers.tm.hotkeys[1].key].layer = 'tm';
			//hotkeys[layers.tm.hotkeys[1].key].id = 1;
			//hotkeys[layers.tm.hotkeys[1].key].unlocked = true;
			for (layer in layers){
				if(!layer.startsWith(["_","tptc_","stardust_","forest_","burning_","incrementy_","gd_","tptr_"][currentTreeTemp]))continue;
				hk = layers[layer].hotkeys
				if (hk){
					for (id in hk){
						hotkeys[hk[id].key] = hk[id]
						hotkeys[hk[id].key].layer = layer
						hotkeys[hk[id].key].id = id
						if (hk[id].unlocked === undefined)
							hk[id].unlocked = true
					}
				}
			}
		}
	},
	upgrades: {
    rows: 6,
    cols: 5,
    11: {
        title: "多树升级11",
        description: "解锁声望树经典版中的一些第2行升级",
        cost: new Decimal("1e400000"),
        unlocked() { return true; },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    12: {
        title: "多树升级12",
        description: "解锁星尘树中的一些星尘升级",
        cost: new Decimal("1e700000"),
        unlocked() { return true; },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    13: {
        title: "多树升级13",
        description: "解锁燃烧树中的一些第2行升级",
        cost: new Decimal("e1e6"),
        unlocked() { return true; },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    14: {
        title: "多树升级14",
        description: "解锁声望森林中的一些粒子升级",
        cost: new Decimal("e14e5"),
        unlocked() { return true; },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    15: {
        title: "多树升级15",
        description: "解锁声望树经典版中的一个声望升级",
        cost: new Decimal("e25e5"),
        unlocked() { return true; },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    21: {
        title: "多树升级21",
        description: "解锁星尘树中的一些星尘升级",
        cost: new Decimal("e85e5"),
        unlocked() { return true; },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    22: {
        title: "多树升级22",
        description: "解锁声望树经典版和重制版中的一些第2行升级",
        cost: new Decimal("e223e5"),
        unlocked() { return player[this.layer].points.gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    23: {
        title: "多树升级23",
        description: "解锁声望树经典版中的一些升级",
        cost: new Decimal("e268e5"),
        unlocked() { return player[this.layer].points.gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    24: {
        title: "多树升级24",
        description: "解锁燃烧树中的一些第2行升级",
        cost: new Decimal("e33333333"),
        unlocked() { return player[this.layer].points.gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    25: {
        title: "多树升级25",
        description: "解锁游戏开发树中的一些第2行升级",
        cost: new Decimal("e376e5"),
        unlocked() { return player[this.layer].points.gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    31: {
        title: "多树升级31",
        description: "解锁声望树经典版中的一些第3行升级",
        cost: new Decimal("e448e5"),
        unlocked() { return player[this.layer].points.gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    32: {
        title: "多树升级32",
        description: "解锁星尘树中的一些星尘升级",
        cost: new Decimal("e548e5"),
        unlocked() { return player[this.layer].points.gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    33: {
        title: "多树升级33",
        description: "解锁声望树经典版中的一些声望升级",
        cost: new Decimal("e57777777"),
        unlocked() { return player[this.layer].points.gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    34: {
        title: "多树升级34",
        description: "解锁声望树重制版中的一些第3行升级",
        cost: new Decimal("e775e5"),
        unlocked() { return player[this.layer].points.gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    35: {
        title: "多树升级35",
        description: "解锁声望树经典版中的一些第3行升级",
        cost: new Decimal("e22e7"),
        unlocked() { return player[this.layer].points.gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    41: {
        title: "多树升级41",
        description: "解锁声望树经典版中第4行的声望升级",
        cost: new Decimal("e475e6"),
        unlocked() { return player[this.layer].points.gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    42: {
        title: "多树升级42",
        description: "解锁声望树经典版中的一些超级声望升级",
        cost: new Decimal("e839e8"),
        unlocked() { return player[this.layer].points.gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    43: {
        title: "多树升级43",
        description: "解锁游戏开发树中的更多升级",
        cost: new Decimal("ee11"),
        unlocked() { return player[this.layer].points.gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    44: {
        title: "多树升级44",
        description: "解锁声望树重制版中的一些平衡升级",
        cost: new Decimal("e111111111111"),
        unlocked() { return player[this.layer].points.gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    45: {
        title: "多树升级45",
        description: "解锁游戏开发树中的更多更新升级",
        cost: new Decimal("e95e10"),
        unlocked() { return player[this.layer].points.gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    51: {
        title: "多树升级51",
        description: "解锁树管理器中的新功能",
        cost: Decimal.pow(10,7e13/9),
        unlocked() { return player[this.layer].points.gte(9); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    52: {
        title: "多树升级52",
        description: "解锁游戏开发树中的新升级",
        cost: new Decimal("e81e11"),
        unlocked() { return player[this.layer].points.gte(9); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    53: {
        title: "多树升级53",
        description: "声望森林中的化学合成器缩放效果减弱",
        cost: new Decimal("e15555555555555"),
        unlocked() { return player[this.layer].points.gte(9); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    54: {
        title: "多树升级54",
        description: "解锁增量树宇宙中的新升级",
        cost: new Decimal("e27e12"),
        unlocked() { return player[this.layer].points.gte(9); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    55: {
        title: "多树升级55",
        description: "解锁TPTR中重写点数的效果",
        cost: new Decimal("e485e11"),
        unlocked() { return player[this.layer].points.gte(9); },
        effect(){
            let ret=player.modpoints[7].add(1).pow(2);
            if(player.milestone_m.best.gte(60))ret = ret.pow(50);
            if(hasUpgrade("milestone_p",32))ret = ret.pow(2);
            if(player.milestone_m.best.gte(65))ret = ret.pow(2);
            if(player.milestone_m.best.gte(70))ret = ret.pow(2.5);
            return ret;
        },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
    61: {
        title: "多树升级61",
        description: "时间升级15基于游戏时间获得增强",
        cost: new Decimal("e684e11"),
        unlocked() { return player[this.layer].points.gte(9); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
    },
		    16: {
        title: "重写声望系统",
        fullDisplay() {
            return "<h2>重写声望系统</h2><br>在声望树重制版中解锁声望系统<br>\
            需要: "+format(new Decimal("e214e5"))+" 点数<br>\
            "+format(new Decimal("e14e6"))+" 声望树经典版中的声望点数<br>\
            "+format(Decimal.pow(10,2222))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e214e5")) && 
            player.tptc_p.points.gte(new Decimal("e14e6")) && 
            player.modpoints[6].gte(Decimal.pow(10,2222));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(1); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#31aeb0";
            return ret;
        }
    },
    17: {
        title: "重写加速器",
        fullDisplay() {
            return "<h2>重写加速器</h2><br>在声望树重制版中解锁加速器系统<br>\
            需要: "+format(new Decimal("e216e5"))+" 点数<br>\
            "+format(new Decimal(82400))+" 声望树经典版中的加速器<br>\
            "+format(Decimal.pow(10,2223))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e216e5")) && 
            player.tptc_b.points.gte(82400) && 
            player.modpoints[6].gte(Decimal.pow(10,2223));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(2); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#6e64c4";
            return ret;
        }
    },
    18: {
        title: "重写生成器",
        fullDisplay() {
            return "<h2>重写生成器</h2><br>在声望树重制版中解锁生成器系统<br>\
            需要: "+format(new Decimal("e218e5"))+" 点数<br>\
            "+format(new Decimal(82700))+" 声望树经典版中的生成器<br>\
            "+format(Decimal.pow(10,2224))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e218e5")) && 
            player.tptc_g.points.gte(82700) && 
            player.modpoints[6].gte(Decimal.pow(10,2224));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(2); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#a3d9a5";
            return ret;
        }
    },
    26: {
        title: "重写时间胶囊",
        fullDisplay() {
            return "<h2>重写时间胶囊</h2><br>在声望树重制版中解锁时间胶囊系统<br>\
            需要: "+format(new Decimal("e257e5"))+" 点数<br>\
            "+format(new Decimal(2500))+" 声望树经典版中的时间胶囊<br>\
            "+format(Decimal.pow(10,2350))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e257e5")) && 
            player.tptc_t.points.gte(2500) && 
            player.modpoints[6].gte(Decimal.pow(10,2350));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(3); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#006609";
            return ret;
        }
    },
    27: {
        title: "重写增强系统",
        fullDisplay() {
            return "<h2>重写增强系统</h2><br>在声望树重制版中解锁增强系统<br>\
            需要: "+format(new Decimal("e3e7"))+" 点数<br>\
            "+format(new Decimal("e3e6"))+" 声望树经典版中的增强点数<br>\
            "+format(Decimal.pow(10,2450))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e3e7")) && 
            player.tptc_e.points.gte(new Decimal("e3e6")) && 
            player.modpoints[6].gte(Decimal.pow(10,2450));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(4); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#b82fbd";
            return ret;
        }
    },
    28: {
        title: "重写空间能量",
        fullDisplay() {
            return "<h2>重写空间能量</h2><br>在声望树重制版中解锁空间能量系统<br>\
            需要: "+format(new Decimal("e275e5"))+" 点数<br>\
            "+format(new Decimal(2600))+" 声望树经典版中的空间能量<br>\
            "+format(Decimal.pow(10,2400))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e275e5")) && 
            player.tptc_t.points.gte(2600) && 
            player.modpoints[6].gte(Decimal.pow(10,2400));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(3); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#dfdfdf";
            return ret;
        }
    },
    36: {
        title: "重写超级加速器",
        fullDisplay() {
            return "<h2>重写超级加速器</h2><br>在声望树重制版中解锁超级加速器系统<br>\
            需要: "+format(new Decimal("e475e5"))+" 点数<br>\
            "+format(new Decimal(25))+" 声望树经典版中的超级加速器<br>\
            "+format(Decimal.pow(10,3000))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e475e5")) && 
            player.tptc_sb.points.gte(25) && 
            player.modpoints[6].gte(Decimal.pow(10,3000));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(6); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#504899";
            return ret;
        }
    },

		    37: {
        title: "重写超级生成器",
        fullDisplay() {
            return "<h2>重写超级生成器</h2><br>在声望树重制版中解锁超级生成器系统<br>\
            需要: "+format(new Decimal("e9.8e7"))+" 点数<br>\
            "+format(new Decimal(41))+" 声望树经典版中的超级生成器<br>\
            "+format(Decimal.pow(10,4000))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e9.8e7")) && 
            player.tptc_sg.points.gte(41) && 
            player.modpoints[6].gte(Decimal.pow(10,4000));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(9); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#248239";
            return ret;
        }
    },
    46: {
        title: "重写阻碍系统",
        fullDisplay() {
            return "<h2>重写阻碍系统</h2><br>在声望树重制版中解锁阻碍之灵系统<br>\
            需要: "+format(new Decimal("e605e5"))+" 点数<br>\
            "+format(new Decimal("e435e3"))+" 声望树经典版中的阻碍之灵<br>\
            "+format(Decimal.pow(10,3770))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e605e5")) && 
            player.tptc_q.points.gte("e435e3") && 
            player.modpoints[6].gte(Decimal.pow(10,3770));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#a14040";
            return ret;
        }
    },
    47: {
        title: "重写特质系统",
        fullDisplay() {
            return "<h2>重写特质系统</h2><br>在声望树重制版中解锁特质系统<br>\
            需要: "+format(new Decimal("e6e7"))+" 点数<br>\
            "+format(new Decimal("e1e6"))+" 声望树经典版中的特质<br>\
            "+format(Decimal.pow(10,3750))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e6e7")) && 
            player.tptc_q.points.gte("e1e6") && 
            player.modpoints[6].gte(Decimal.pow(10,3750));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(7); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#c20282";
            return ret;
        }
    },
    38: {
        title: "新增太阳能量",
        fullDisplay() {
            return "<h2>新增太阳能量</h2><br>在声望树重制版中解锁太阳能量系统<br>\
            需要: "+format(new Decimal("e360000000"))+" 点数<br>\
            "+format(new Decimal(10))+" 声望树经典版中的超级加速器<br>\
            "+format(Decimal.pow(10,4500))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e360000000")) && 
            player.tptc_hb.points.gte(10) && 
            player.modpoints[6].gte(Decimal.pow(10,4500));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(16); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#ffcd00";
            return ret;
        }
    },
    39: {
        title: "重写子空间",
        fullDisplay() {
            return "<h2>重写子空间</h2><br>在声望树重制版中解锁子空间系统<br>\
            需要: "+format(new Decimal("e111111111"))+" 点数<br>\
            "+format(new Decimal(27))+" 声望树经典版中的子空间能量<br>\
            "+format(Decimal.pow(10,4050))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e111111111")) && 
            player.tptc_ss.points.gte(27) && 
            player.modpoints[6].gte(Decimal.pow(10,4050));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(10); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#e8ffff";
            return ret;
        }
    },
    56: {
        title: "重写魔法系统",
        fullDisplay() {
            return "<h2>重写魔法系统</h2><br>在声望树重制版中解锁魔法系统<br>\
            需要: "+format(new Decimal("e575e8"))+" 点数<br>\
            "+format(new Decimal("e5e6"))+" 声望树经典版中的魔法能量<br>\
            "+format(Decimal.pow(10,9000))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e575e8")) && 
            player.tptc_m.points.gte("e5e6") && 
            player.modpoints[6].gte(Decimal.pow(10,9000));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(25); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#eb34e0";
            return ret;
        }
    },
    57: {
        title: "重写幻影灵魂",
        fullDisplay() {
            return "<h2>重写幻影灵魂</h2><br>在声望树重制版中解锁幻影灵魂系统<br>\
            需要: "+format(new Decimal("e142e10"))+" 点数<br>\
            "+format(new Decimal(1234567))+" 声望树经典版中的幻影灵魂<br>\
            "+format(Decimal.pow(10,1e5))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e142e10")) && 
            player.tptc_ps.points.gte(1234567) && 
            player.modpoints[6].gte(Decimal.pow(10,1e5));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(28); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#b38fbf";
            return ret;
        }
    },
    58: {
        title: "重写平衡系统",
        fullDisplay() {
            return "<h2>重写平衡系统</h2><br>在声望树重制版中解锁平衡系统<br>\
            需要: "+format(new Decimal("e215e8"))+" 点数<br>\
            "+format(new Decimal("ee8"))+" 声望树经典版中的平衡能量<br>\
            "+format(Decimal.pow(10,7500))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e215e8")) && 
            player.tptc_ba.points.gte("ee8") && 
            player.modpoints[6].gte(Decimal.pow(10,7500));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(24); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#fced9f";
            return ret;
        }
    },
    19: {
        title: "新增荣誉系统",
        fullDisplay() {
            return "<h2>新增荣誉系统</h2><br>在声望树重制版中解锁荣誉系统<br>\
            需要: "+format(new Decimal("e125e11"))+" 点数<br>\
            "+format(new Decimal("e175e9"))+" 声望树经典版中的超级声望点数<br>\
            "+format(Decimal.pow(10,7e5))+" 游戏开发树中的工作时间"
        },
        canAfford() {
            return player.points.gte(new Decimal("e125e11")) && 
            player.tptc_sp.points.gte("e175e9") && 
            player.modpoints[6].gte(Decimal.pow(10,7e5));
        },
        pay(){},
        unlocked() { return player.tm.buyables[7].gte(30); },
        currencyDisplayName: "点数",
        currencyInternalName: "points",
        style() {
            let ret = {"width":"200px","height":"200px"};
            if(hasUpgrade("tm",this.id)) ret.backgroundColor = "#ffbf00";
            return ret;
        }
    },
		
	}
});

