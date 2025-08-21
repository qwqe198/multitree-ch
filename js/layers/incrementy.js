addLayer("incrementy_i", {
    name: "增量层",
    symbol: "I",
    position: 0,
    startData() { return {
        points: new Decimal(0),
        unlocked: true
    }},
    color: "#4B4C83",
    requires: new Decimal(1),
    resource: "",
    baseResource: "点数",
    baseAmount() {return player.points},
    type: "none",
    row: 0,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(1);},
        
    doReset(l){
        if(!l.startsWith("incrementy_")){return;}
        if(l=="incrementy_i" || l=="incrementy_b" || !l.startsWith("incrementy_")){return;}
        layerDataReset("incrementy_i",["upgrades","milestones","challenges"]);
        return;
    },
        
    tooltip(){
        return format(player.modpoints[5])+" 增量";
    },
    upgrades: {
        rows: 4,
        cols: 5,
        11: {
            title: "增量升级11",
            description(){
                return "每秒获得"+format(upgradeEffect("incrementy_i",11))+"增量";
            },
            cost: new Decimal(0),
            unlocked() { return true; },
            effect() {
                let ret = new Decimal(1);
                if(hasUpgrade("incrementy_i",12))ret=ret.mul(upgradeEffect("incrementy_i",12));
                if(hasUpgrade("incrementy_i",14)&&hasUpgrade("incrementy_am",21))ret=ret.mul(upgradeEffect("incrementy_i",14));
                if(hasUpgrade("incrementy_am",13))ret=ret.mul(upgradeEffect("incrementy_am",13));
                if(hasUpgrade("incrementy_am",14))ret=ret.mul(upgradeEffect("incrementy_am",14));
                if(hasUpgrade("incrementy_i",35))ret=ret.mul(upgradeEffect("incrementy_i",35));
                if(hasUpgrade("incrementy_i",33))ret=ret.mul(layers.incrementy_am.effect());
                if(hasUpgrade("incrementy_am",22))ret=ret.mul(upgradeEffect("incrementy_am",22));
                if(hasUpgrade("tptc_p",24))ret=ret.mul(upgradeEffect("tptc_p",24));
                if(hasUpgrade("incrementy_m",11))ret=ret.mul(upgradeEffect("incrementy_m",11));
                if(hasUpgrade("incrementy_a",21))ret=ret.mul(upgradeEffect("incrementy_a",21));
                if(hasUpgrade("incrementy_a",22))ret=ret.mul(upgradeEffect("incrementy_a",22));
                if(hasUpgrade("incrementy_a",23))ret=ret.mul(upgradeEffect("incrementy_a",23));
                if(hasUpgrade("incrementy_a",11)&&hasUpgrade("incrementy_a",24))ret=ret.mul(upgradeEffect("incrementy_a",11));
                if(hasUpgrade("incrementy_n",14))ret=ret.mul(buyableEffect("incrementy_n",13));
                if(hasUpgrade("incrementy_g",21))ret=ret.mul(upgradeEffect("incrementy_g",21));
                if(hasUpgrade("incrementy_s",32))ret=ret.mul(layers.incrementy_s.effect());
                if(hasUpgrade("incrementy_i",21)&&hasUpgrade("incrementy_b",22))ret=ret.mul(buyableEffect("incrementy_i",12));
                if(hasUpgrade("incrementy_sp",42))ret=ret.mul(layers.incrementy_a.effect()[0]);
                if(player.tm.buyables[5].gte(21)&&hasUpgrade("incrementy_pi",24))ret=ret.mul(player.incrementy_a.points.add(1).pow(layers.incrementy_b.effect().div(9)));
                
                if(hasUpgrade("incrementy_i",22))ret=ret.pow(buyableEffect("incrementy_i",13));
                
                if(hasUpgrade("incrementy_i",14)&&!hasUpgrade("incrementy_am",21))ret=ret.mul(upgradeEffect("incrementy_i",14));
                if(hasUpgrade("incrementy_i",15))ret=ret.mul(buyableEffect("incrementy_i",11));
                if(hasUpgrade("incrementy_i",21)&&!hasUpgrade("incrementy_b",22))ret=ret.mul(buyableEffect("incrementy_i",12));
                if(!hasUpgrade("incrementy_i",33))ret=ret.mul(layers.incrementy_am.effect());
                if(hasUpgrade("incrementy_am",11))ret=ret.mul(upgradeEffect("incrementy_am",11));
                if(!hasUpgrade("incrementy_sp",42))ret=ret.mul(layers.incrementy_a.effect()[0]);
                if(hasUpgrade("incrementy_a",11)&&!hasUpgrade("incrementy_a",24))ret=ret.mul(upgradeEffect("incrementy_a",11));
                ret=ret.mul(layers.incrementy_m.effect()[0]);
                if(hasUpgrade("incrementy_e",14))ret=ret.mul(upgradeEffect("incrementy_e",14));
                if(hasUpgrade("incrementy_n",22))ret=ret.mul(buyableEffect("incrementy_n",21));
                if(hasUpgrade("incrementy_g",24))ret=ret.mul(upgradeEffect("incrementy_g",24));
                if(!hasUpgrade("incrementy_s",32))ret=ret.mul(layers.incrementy_s.effect());
                if(player.tm.buyables[5].gte(21)&&!hasUpgrade("incrementy_pi",24))ret=ret.mul(player.incrementy_a.points.add(1).pow(layers.incrementy_b.effect()));
                
                ret=ret.pow(buyableEffect("incrementy_o",11));
                
                if(inChallenge("incrementy_am",11))ret=ret.pow(0.1);
                if(inChallenge("incrementy_m",11))ret=ret.root(2);
                if(inChallenge("incrementy_m",12))ret=ret.root(3);
                if(inChallenge("incrementy_q",11))ret=ret.root(2);
                if(inChallenge("incrementy_q",12))ret=ret.root(3);
                if(inChallenge("incrementy_q",21))ret=ret.root(5);
                if(inChallenge("incrementy_q",22))ret=ret.root(4);
                if(inChallenge("incrementy_sp", 22))ret=ret.root(100);
                return ret;
            },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        12: {
            title: "增量升级12",
            description: "基于点数提升基础增量获取",
            cost: new Decimal(10),
            unlocked() { return true; },
            effect() {
                let base=1.01;
                if(hasUpgrade("incrementy_pi",13))base=1.1;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.5));
                if(hasUpgrade("incrementy_am",12))ret=ret.pow(2);
                if(hasUpgrade("incrementy_m",12))ret=ret.pow(2);
                if(hasUpgrade("incrementy_p",15))ret=ret.pow(2);
                if(hasUpgrade("incrementy_g",22))ret=ret.pow(upgradeEffect("incrementy_g",22));
                if(hasUpgrade("incrementy_i",41))ret=ret.pow(2);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        13: {
            title: "增量升级13",
            description: "基于增量提升点数获取",
            cost: new Decimal(100),
            unlocked() { return true; },
            effect() {
                let base=1e10;
                let ret = Decimal.pow(base,Decimal.log10(player.modpoints[5].add(1)).pow(0.9));
                if(player.incrementy_sp.best.gte(13))ret = Decimal.pow(base,Decimal.log10(player.modpoints[5].add(1)).pow(0.93));
                if(hasUpgrade("milestone_p",33))ret = player.modpoints[5].add(1).pow(1.6);
                if(hasUpgrade("milestone_p",34))ret = player.modpoints[5].add(1).pow(1.8);
                if(hasUpgrade("milestone_p",35))ret = player.modpoints[5].add(1).pow(2);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        14: {
            title: "增量升级14",
            description(){
                if(hasUpgrade("incrementy_am",21))return "基于增量升级数量提升基础增量获取";
                return "基于增量升级数量提升增量获取";
            },
            cost: new Decimal(300),
            unlocked() { return true; },
            effect() {
                let ret=Decimal.pow(1.2,player.incrementy_i.upgrades.length);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        15: {
            title: "增量升级15",
            description: "解锁增量可购买项",
            cost: new Decimal(500),
            unlocked() { return true; },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        21: {
            title: "增量升级21",
            description: "解锁增量可购买项，并使第一个增量可购买项效果基数+0.1",
            cost: new Decimal(4e4),
            unlocked() { return true; },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        22: {
            title: "增量升级22",
            description: "解锁增量可购买项，并使前两个增量可购买项效果基数+0.1",
            cost: new Decimal(1e8),
            unlocked() { return true; },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        23: {
            title: "增量升级23",
            description: "移除增量速度的线性成本增长",
            cost: new Decimal(1e11),
            unlocked() { return true; },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        24: {
            title: "增量升级24",
            description: "移除增量强度的线性成本增长",
            cost: new Decimal(1e25),
            unlocked() { return true; },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        25: {
            title: "增量升级25",
            description: "移除增量耐力的线性成本增长",
            cost: new Decimal(5e27),
            unlocked() { return true; },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        31: {
            title: "增量升级31",
            description(){
                if(hasUpgrade("incrementy_m",33))return "每个购买的增量强度为增量强度基数+1";
                if(hasUpgrade("incrementy_b",13))return "每个购买的增量强度为增量强度基数+0.02";
                return "每个购买的增量强度为增量强度基数+0.02(上限10)";
            },
            cost: new Decimal(1e60),
            unlocked() { return player.tm.buyables[5].gte(2); },
            effect() {
                if(hasUpgrade("incrementy_m",33))return player.incrementy_i.buyables[12];
                let ret = Decimal.mul(player.incrementy_i.buyables[12],0.02);
                if(!hasUpgrade("incrementy_b",13))ret=ret.min(10);
                return ret;
            },
            effectDisplay() { return "+"+format(this.effect()) },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        32: {
            title: "增量升级32",
            description(){
                if(hasUpgrade("incrementy_m",32))return "每个购买的增量速度为增量速度基数+1";
                if(hasUpgrade("incrementy_a",25))return "每个购买的增量速度为增量速度基数+0.01";
                return "每个购买的增量速度为增量速度基数+0.01(上限10)";
            },
            cost: new Decimal(1e79),
            unlocked() { return player.tm.buyables[5].gte(2); },
            effect() {
                if(hasUpgrade("incrementy_m",32))return player.incrementy_i.buyables[11];
                let ret = Decimal.mul(player.incrementy_i.buyables[11],0.01);
                if(!hasUpgrade("incrementy_a",25))ret=ret.min(10);
                return ret;
            },
            effectDisplay() { return "+"+format(this.effect()) },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        33: {
            title: "增量升级33",
            description: "反物质效果在增量耐力之前应用",
            cost: new Decimal(1e260),
            unlocked() { return player.tm.buyables[5].gte(2); },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        34: {
            title: "增量升级34",
            description: "移除增量耐力的二次成本增长",
            cost: new Decimal("1e560"),
            unlocked() { return player.tm.buyables[5].gte(2); },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        35: {
            title: "增量升级35",
            description: "基于增量耐力等级提升基础增量获取",
            cost: new Decimal("1e590"),
            unlocked() { return player.tm.buyables[5].gte(2); },
            effect() {
                let ret=player.incrementy_i.buyables[13].add(1);
                if(hasUpgrade("incrementy_m",14))ret=ret.pow(5);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        41: {
            title: "增量升级41",
            description: "增量升级12效果平方化",
            cost: new Decimal("e1e5"),
            unlocked() { return player.incrementy_q.challenges[11]; },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        42: {
            title: "增量升级42",
            description: "中微子生成等级提升增量速度等级",
            cost: new Decimal("e1.196e5"),
            unlocked() { return player.incrementy_q.challenges[11]; },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        43: {
            title: "增量升级43",
            description: "增量提升胶子获取",
            cost: new Decimal("e1.22e5"),
            unlocked() { return player.incrementy_q.challenges[11]; },
            effect() {
                let ret=player.modpoints[5].add(10).log10().pow(player.modpoints[5].add(10).log10().add(10).log10());
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        44: {
            title: "增量升级44",
            description: "增量提升中微子获取",
            cost: new Decimal("e1.38e5"),
            unlocked() { return player.incrementy_q.challenges[11]; },
            effect() {
                let ret=player.modpoints[5].add(10).log10().pow(player.modpoints[5].add(10).log10().add(10).log10().mul(2));
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        45: {
            title: "增量升级45",
            description(){
                if(hasUpgrade("incrementy_e", 34))return "物质获取减速开始更晚";
                return "物质获取指数乘以2";
            },
            cost: new Decimal("e1.43e5"),
            unlocked() { return player.incrementy_q.challenges[11]; },
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
    },
    buyables:{
        rows: 1,
        cols: 3,
        11: {
            title: "增量速度",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(2, x).mul(Decimal.pow(1.01, x.pow(2))).mul(10);
                if(hasUpgrade("incrementy_i",23))cost = Decimal.pow(1.01, x.pow(2)).mul(10);
                if(hasUpgrade("incrementy_a",12))cost = Decimal.pow(1.01, x.pow(2));
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_i.buyables[11])+(data.free.gt(0)?("+"+formatWhole(data.free)):"")+"<br>"+
                "成本: "+format(data.cost)+" 增量<br>"+
                "效果: "+(hasUpgrade("incrementy_a",24)?"基础 ":"")+"增量获取x"+format(data.effect);
            },
            unlocked() { return hasUpgrade("incrementy_i",15); }, 
            canAfford() {
                return player.modpoints[5].gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.modpoints[5] = player.modpoints[5].sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                let base=new Decimal(1.5);
                if(hasUpgrade("incrementy_i",21))base=base.add(0.1);
                if(hasUpgrade("incrementy_i",22))base=base.add(0.1);
                if(hasUpgrade("incrementy_i",32))base=base.add(upgradeEffect("incrementy_i",32));
                return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
            },
            free(){
                let ret=new Decimal(0);
                if(hasUpgrade("incrementy_i",42))ret=ret.add(player.incrementy_n.buyables[11]);
                if(hasUpgrade("incrementy_i",42))ret=ret.add(layers.incrementy_n.buyables[11].free());
                if(hasUpgrade("incrementy_b",15))ret=ret.add(player.incrementy_i.buyables[13].mul(layers.incrementy_b.challenges[12].rewardEffect()));
                if(hasUpgrade("incrementy_m",34))ret=ret.add(player.incrementy_i.buyables[12]);
                return ret;
            },
        },
        12: {
            title: "增量强度",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost=Decimal.pow(4, x).mul(Decimal.pow(1.25, x.pow(2))).mul(1e4);
                if(hasUpgrade("incrementy_i",24))cost = Decimal.pow(1.25, x.pow(2)).mul(1e4);
                if(hasUpgrade("incrementy_a",13))cost = Decimal.pow(1.25, x.pow(2));
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_i.buyables[12])+"<br>"+
                "成本: "+format(data.cost)+" 增量<br>"+
                "效果: "+(hasUpgrade("incrementy_b",22)?"基础 ":"")+"增量获取x"+format(data.effect);
            },
            unlocked() { return hasUpgrade("incrementy_i",21); }, 
            canAfford() {
                return player.modpoints[5].gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.modpoints[5] = player.modpoints[5].sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                let base=new Decimal(2);
                if(hasUpgrade("incrementy_i",22))base=base.add(0.1);
                if(hasUpgrade("incrementy_i",31))base=base.add(upgradeEffect("incrementy_i",31));
                base = base.plus(layers.incrementy_b.challenges[11].rewardEffect())
                return Decimal.pow(base,player[this.layer].buyables[this.id]);
            },
        },
        13: {
            title: "增量耐力",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost=Decimal.pow(2, x).mul(Decimal.pow(1.25, x.pow(2))).mul(Decimal.pow(1.1, Decimal.pow(1.2, x))).mul(1e6);
                if(hasUpgrade("incrementy_i",25))cost = Decimal.pow(1.25, x.pow(2)).mul(Decimal.pow(1.1, Decimal.pow(1.2, x))).mul(1e6);
                if(hasUpgrade("incrementy_i",34))cost = Decimal.pow(1.1, Decimal.pow(1.2, x)).mul(1e6);
                if(hasUpgrade("incrementy_sp",54))cost = Decimal.pow(1.1, Decimal.pow(1.19, x));
                if(hasUpgrade("incrementy_pi",31))cost = Decimal.pow(1.1, Decimal.pow(1.185, x));
                if(hasUpgrade("incrementy_pi",41))cost = Decimal.pow(1.1, Decimal.pow(1.18, x));
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_i.buyables[13])+(data.free.gt(0)?("+"+formatWhole(data.free)):"")+"<br>"+
                "成本: "+format(data.cost)+" 增量<br>"+
                "效果: 基础增量获取^"+format(data.effect)+(player.incrementy_i.buyables[13].add(data.free).gte(data.softcap)?" (减速)<br>减速开始于 "+formatWhole(data.softcap):"");
            },
            unlocked() { return hasUpgrade("incrementy_i",22); }, 
            canAfford() {
                return player.modpoints[5].gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.modpoints[5] = player.modpoints[5].sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                if (inChallenge("incrementy_b", 11)) return player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()).div(hasMilestone("incrementy_o",5)?10:20).plus(1)
                let base=new Decimal(1.04);
                let power=player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free());
                let softcap=layers[this.layer].buyables[this.id].softcap();
                if(power.gte(softcap))power=power.div(softcap).sqrt().mul(softcap);
                return Decimal.pow(base,power);
            },
            softcap(){
                if(inChallenge("incrementy_sp", 21))return new Decimal(1);
                let ret=new Decimal(40).add(layers.incrementy_sp.effect()).add(layers.incrementy_pi.effect());
                if(player.incrementy_am.challenges[11])ret=ret.add(5);
                if(player.incrementy_m.challenges[11])ret=ret.add(5);
                if(hasUpgrade("incrementy_e",22))ret=ret.add(1);
                if(hasUpgrade("incrementy_e",24))ret=ret.add(1);
                if(hasUpgrade("incrementy_am",32))ret=ret.add(3);
                if(hasUpgrade("incrementy_s",24))ret=ret.add(5);
                if(hasUpgrade("incrementy_s",34))ret=ret.add(1);
                if(hasUpgrade("incrementy_b",21))ret=ret.add(2);
                if(hasUpgrade("incrementy_b",25))ret=ret.add(2);
                if(hasUpgrade("incrementy_b",35))ret=ret.add(5);
                if(hasUpgrade("incrementy_a",33))ret=ret.add(5);
                if(hasUpgrade("incrementy_sp",34))ret=ret.add((player.incrementy_sp.upgrades||[]).length/10);
                return ret;
            },
            free(){
                let ret=new Decimal(0);
                if(hasUpgrade("incrementy_o",13))ret=ret.add(1);
                return ret;
            },
        },
    },
    tabFormat: ["upgrades","buyables"],
    update(diff){
        if(hasUpgrade("incrementy_i",11))player.modpoints[5]=player.modpoints[5].add(upgradeEffect("incrementy_i",11).mul(diff));
        
        if(hasUpgrade("incrementy_a",12)){
            var target=player.modpoints[5].add(1).log(1.01).pow(1/2).add(1).floor();
            if(target.gt(player.incrementy_i.buyables[11])){
                player.incrementy_i.buyables[11]=target;
            }
        }
        if(hasUpgrade("incrementy_a",13)){
            var target=player.modpoints[5].add(1).log(1.25).pow(1/2).add(1).floor();
            if(target.gt(player.incrementy_i.buyables[12])){
                player.incrementy_i.buyables[12]=target;
            }
        }
        if(hasUpgrade("incrementy_m",13)){
            var target=player.modpoints[5].div(1e6).add(1).log(1.1).add(1).log(1.2).add(1).floor();
            if(hasUpgrade("incrementy_sp",54))target=player.modpoints[5].add(1).log(1.1).add(1).log(1.19).add(1).floor();
            if(hasUpgrade("incrementy_pi",31))target=player.modpoints[5].add(1).log(1.1).add(1).log(1.185).add(1).floor();
            if(hasUpgrade("incrementy_pi",41))target=player.modpoints[5].add(1).log(1.1).add(1).log(1.18).add(1).floor();
            if(target.gt(player.incrementy_i.buyables[13])){
                player.incrementy_i.buyables[13]=target;
            }
        }
    },
});

addLayer("incrementy_am", {
    name: "反物质层",
    symbol: "AM",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#DB4C83",
    requires(){
        if(player.incrementy_sp.best.gte(2))return new Decimal(1);
        return new Decimal(110);
    },
    resource: "反物质",
    baseResource: "已购买的增量可购买项等级总数",
    baseAmount() {return player.incrementy_i.buyables[11].add(player.incrementy_i.buyables[12]).add(player.incrementy_i.buyables[13])},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(15)
        if(hasUpgrade("incrementy_b",24))mult = new Decimal(1);
        mult=mult.mul(layers.incrementy_a.effect()[1]);
        mult=mult.mul(layers.incrementy_m.effect()[1]);
        if(hasUpgrade("incrementy_n",25))mult = mult.mul(buyableEffect("incrementy_n",32));
        if(hasUpgrade("incrementy_am",31))mult = mult.mul(upgradeEffect("incrementy_am",31));
        mult=mult.mul(player.incrementy_e.points.max(1).pow(layers.incrementy_sp.challenges[21].rewardEffect().sub(1)))
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    branches: ["incrementy_i"],
    row: 1,
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(2) && (!player.incrementy_pi.hidelayers)},
        
    doReset(l){
        if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || !l.startsWith("incrementy_")){return;}
        layerDataReset("incrementy_am",["upgrades","milestones","challenges"]);
        return;
    },
    effect(){
        if (inChallenge("incrementy_m", 12)) return new Decimal(1)
        let ret = player.incrementy_am.points.plus(1).pow(1.5);
        if(hasMilestone("incrementy_o",1))ret = player.incrementy_am.points.plus(1);
        return ret
    },
    effectDescription(){
        if(hasUpgrade("incrementy_i",33))return "将基础增量获取乘以" + format(layers.incrementy_am.effect())
        return "将增量获取乘以" + format(layers.incrementy_am.effect())
    },
    getResetGain() {
        let ret=player.incrementy_i.buyables[11].add(player.incrementy_i.buyables[12]).add(player.incrementy_i.buyables[13]);
        if(ret.lt(110) && !(player.incrementy_sp.best.gte(2)))return new Decimal(0);
        if(hasUpgrade("incrementy_e",35))return Decimal.pow(10,ret).mul(layers.incrementy_am.gainMult()).floor();
        if(hasUpgrade("incrementy_sp",45))return Decimal.pow(3,ret).mul(layers.incrementy_am.gainMult()).floor();
        if(hasUpgrade("incrementy_sp",25))return Decimal.pow(2,ret).mul(layers.incrementy_am.gainMult()).floor();
        if(hasUpgrade("incrementy_sp",21))return Decimal.pow(1.5,ret).mul(layers.incrementy_am.gainMult()).floor();
        if(hasUpgrade("incrementy_s",43))return Decimal.pow(1.25,ret).mul(layers.incrementy_am.gainMult()).floor();
        if(hasUpgrade("incrementy_b",24))return Decimal.pow(1.181,ret).mul(layers.incrementy_am.gainMult()).floor();
        return Decimal.pow(1.1,ret.sub(110)).mul(layers.incrementy_am.gainMult()).floor();
    },
    getNextAt() {
        let ret=player.incrementy_i.buyables[11].add(player.incrementy_i.buyables[12]).add(player.incrementy_i.buyables[13]).add(1).max(110);
        return ret;
    },
    upgrades: {
        rows: 3,
        cols: 5,
        11: {
            title: "反物质升级11",
            description: "增量提升增量获取",
            cost: new Decimal(2),
            unlocked() { return true; },
            effect() {
                let base=1.5;
                let ret = Decimal.pow(base,Decimal.log10(player.modpoints[5].add(1)).pow(0.9));
                if(hasUpgrade("incrementy_am",21))ret=ret.pow(1.5);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        12: {
            title: "反物质升级12",
            description: "增量升级12效果平方化",
            cost: new Decimal(200),
            unlocked() { return true; },
        },
        13: {
            title: "反物质升级13",
            description: "基于增量速度等级提升基础增量获取",
            cost: new Decimal(1000),
            unlocked() { return true; },
            effect() {
                let ret=player.incrementy_i.buyables[11].add(1);
                if(hasUpgrade("incrementy_am",24))ret=ret.pow(2);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        14: {
            title: "反物质升级14",
            description: "基于增量强度等级提升基础增量获取",
            cost: new Decimal(20000),
            unlocked() { return true; },
            effect() {
                return player.incrementy_i.buyables[12].add(1);
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        15: {
            title: "反物质升级15",
            description(){return "每秒获得"+(player.incrementy_sp.best.gte(2)?"1e6":100)+"%反物质获取";},
            cost: new Decimal(1e10),
            unlocked() { return true; },
        },
        21: {
            title: "反物质升级21",
            description: "反物质升级11效果^1.5，且增量升级14提升基础增量获取",
            cost: new Decimal(1e40),
            unlocked() { return player.tm.buyables[5].gte(4); },
        },
        22: {
            title: "反物质升级22",
            description: "每个反物质升级将基础增量获取乘以10",
            cost: new Decimal(1e43),
            unlocked() { return player.tm.buyables[5].gte(4); },
            effect() {
                let ret=Decimal.pow(10,player.incrementy_am.upgrades.length);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        23: {
            title: "反物质升级23",
            description: "解锁反物质挑战",
            cost: new Decimal(1e46),
            unlocked() { return player.tm.buyables[5].gte(4); },
        },
        24: {
            title: "反物质升级24",
            description: "反物质升级13效果平方化",
            cost: new Decimal(1e50),
            unlocked() { return player.tm.buyables[5].gte(5); },
        },
        25: {
            title: "反物质升级25",
            description: "解锁反物质挑战",
            cost: new Decimal(1e55),
            unlocked() { return player.tm.buyables[5].gte(5); },
        },
        31: {
            title: "反物质升级31",
            description: "基于夸克挑战完成数提升反物质获取",
            cost: new Decimal("1e1550"),
            unlocked() { return hasChallenge("incrementy_q", 21); },
            effect(){
                let c = 0
                if (hasChallenge("incrementy_q", 11)) c ++
                if (hasChallenge("incrementy_q", 12)) c ++
                if (hasChallenge("incrementy_q", 21)) c ++
                if (hasChallenge("incrementy_q", 22)) c ++
                return Decimal.pow(1+c, 300)
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        32: {
            title: "反物质升级32",
            description: "增量耐力减速开始推迟3级(52 -> 55)",
            cost: new Decimal("1e1770"),
            unlocked() { return hasChallenge("incrementy_q", 21); },
        },
        33: {
            title: "反物质升级33",
            description: "粒子获取公式更好",
            cost: new Decimal("1e1815"),
            unlocked() { return hasChallenge("incrementy_q", 21); },
        },
        34: {
            title: "反物质升级34",
            description: "解锁夸克挑战",
            cost: new Decimal("1e1900"),
            unlocked() { return hasChallenge("incrementy_q", 21); },
        },
        35: {
            title: "反物质升级35",
            description: "变形虫获取公式更好",
            cost: new Decimal("1e2000"),
            unlocked() { return hasChallenge("incrementy_q", 21); },
        },
    },
    passiveGeneration(){
        if(hasUpgrade("incrementy_am",15)&&player.incrementy_sp.best.gte(2))return 1e4;
        if(hasUpgrade("incrementy_am",15))return 1;
        return 0;
    },
    
    challenges:{
        rows: 1,
        cols: 2,
        11: {
            name: "知道?", 
            challengeDescription: "获得正常增量获取的^0.1",
            rewardDescription: "增量耐力减速开始推迟5级(40 -> 45)",
            unlocked(){
                return hasUpgrade("incrementy_am",23);
            },
            goal: new Decimal(1e68),
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        12: {
            name: "不!", 
            challengeDescription: "重置点数，获得正常点数获取的^0.1",
            rewardDescription: "解锁物质层和物质重置功能",
            unlocked(){
                return hasUpgrade("incrementy_am",25);
            },
            goal: new Decimal("1e30000"),
            currencyInternalName: "points",
            resetPoints: true,
        },
    },
});

addLayer("incrementy_a", {
    name: "变形虫层",
    symbol: "A",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#1B4C23",
    requires(){
        if(player.incrementy_sp.best.gte(2))return new Decimal(1);
        return new Decimal("1e600");
    },
    resource: "变形虫",
    baseResource: "增量",
    baseAmount() {return player.modpoints[5]},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("incrementy_n",25))mult = mult.mul(buyableEffect("incrementy_n",33));
        mult = mult.mul(player.incrementy_q.points.max(10).log10().pow(layers.incrementy_b.challenges[21].rewardEffect()))
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    branches: ["incrementy_am"],
    row: 2,
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(3) && (!player.incrementy_pi.hidelayers)},
        
    doReset(l){
        if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || l=="incrementy_a" || l=="incrementy_e" || !l.startsWith("incrementy_")){return;}
        layerDataReset("incrementy_a",["upgrades","milestones","challenges"]);
        return;
    },
    getResetGain() {
        let ret=player.modpoints[5];
        if(player.incrementy_sp.best.gte(2))ret=ret.add(1).mul("1e600");
        if(ret.lt("1e600"))return new Decimal(0);
        ret=ret.log10().div(6).pow(hasUpgrade("incrementy_a",31)?0.56:hasUpgrade("incrementy_sp",33)?0.55:hasUpgrade("incrementy_am",35)?0.52:0.5).sub(10);
        ret=Decimal.pow(10,ret).mul(layers.incrementy_a.gainMult()).floor();
        return ret;
    },
    getNextAt() {
        let ret=tmp.incrementy_a.getResetGain.plus(1);
        ret=ret.div(layers.incrementy_a.gainMult()).max(1).log10();
        ret=ret.add(10).pow(hasUpgrade("incrementy_a",31)?(1/0.56):hasUpgrade("incrementy_sp",33)?(1/0.55):hasUpgrade("incrementy_am",35)?(1/0.52):2).mul(6);
        ret=Decimal.pow(10,ret);
        if(player.incrementy_sp.best.gte(2))ret=ret.div("1e600").sub(1);
        return ret;
    },
    effect(){
        if (inChallenge("incrementy_m", 11) || inChallenge("incrementy_m", 12)) return [new Decimal(1), new Decimal(1)]
        let eff1 = player.incrementy_a.points.add(1).pow(6)
        if(hasUpgrade("incrementy_a",32))return [eff1, eff1];
        let eff2 = player.incrementy_a.points.add(1).pow(hasUpgrade("incrementy_sp",44)?4:hasUpgrade("incrementy_sp",32)?3:2)
        return [eff1, eff2]
    },
    effectDescription(){
        let eff = layers.incrementy_a.effect()
        if(hasUpgrade("incrementy_a",32) && hasUpgrade("incrementy_sp",42))return "将基础增量获取和反物质获取乘以" + format(eff[0])
        if(hasUpgrade("incrementy_sp",42))return "将基础增量获取乘以" + format(eff[0]) + "，反物质获取乘以" + format(eff[1])
        return "将增量获取乘以" + format(eff[0]) + "，反物质获取乘以" + format(eff[1])
    },
    
    upgrades: {
        rows: 3,
        cols: 5,
        11: {
            title: "变形虫升级11",
            description(){
                if(hasUpgrade("incrementy_a",24))return "每个变形虫升级将基础增量获取乘以1e10";
                return "每个变形虫升级将增量获取乘以1e10";
            },
            cost: new Decimal(1),
            unlocked() { return true; },
            effect() {
                let ret=Decimal.pow(1e10,player.incrementy_a.upgrades.length);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        12: {
            title: "变形虫升级12",
            description: "自动购买增量速度，并将增量速度成本除以10",
            cost: new Decimal(3),
            unlocked() { return true; },
        },
        13: {
            title: "变形虫升级13",
            description: "自动购买增量强度，并将增量强度成本除以1e4",
            cost: new Decimal(5),
            unlocked() { return true; },
        },
        14: {
            title: "变形虫升级14",
            description: "解锁经典声望树中的声望升级",
            cost: new Decimal(100),
            unlocked() { return true; },
        },
        15: {
            title: "变形虫升级15",
            description(){return "每秒获得"+(player.incrementy_sp.best.gte(2)?"1e6":100)+"%变形虫获取";},
            cost: new Decimal(2000),
            unlocked() { return true; },
        },
        21: {
            title: "变形虫升级21",
            description: "基于变形虫数量提升基础增量获取",
            cost: new Decimal(1e30),
            unlocked() { return player.tm.buyables[5].gte(7); },
            effect() {
                let ret=player.incrementy_a.points.add(10);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        22: {
            title: "变形虫升级22",
            description: "基于物质数量提升基础增量获取",
            cost: new Decimal(1e31),
            unlocked() { return player.tm.buyables[5].gte(7); },
            effect() {
                let base=3;
                let ret = Decimal.pow(base,Decimal.log10(player.incrementy_m.points.add(1)).pow(0.9));
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        23: {
            title: "变形虫升级23",
            description: "基于能量数量提升基础增量获取",
            cost: new Decimal(1e32),
            unlocked() { return player.tm.buyables[5].gte(7); },
            effect() {
                let base=3;
                let ret = Decimal.pow(base,Decimal.log10(player.incrementy_e.points.add(1)).pow(0.9));
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        24: {
            title: "变形虫升级24",
            description: "变形虫升级11提升基础增量获取",
            cost: new Decimal(1e34),
            unlocked() { return player.tm.buyables[5].gte(7); },
        },
        25: {
            title: "变形虫升级25",
            description: "移除增量升级32上限",
            cost: new Decimal(1e37),
            unlocked() { return player.tm.buyables[5].gte(7); },
        },
        31: {
            title: "变形虫升级31",
            description: "变形虫获取更好",
            cost: new Decimal("1e50000"),
            unlocked() { return hasUpgrade("incrementy_sp",52); },
        },
        32: {
            title: "变形虫升级32",
            description: "变形虫对反物质的效果更好",
            cost: new Decimal("1e67300"),
            unlocked() { return hasUpgrade("incrementy_sp",52); },
        },
        33: {
            title: "变形虫升级33",
            description: "增量耐力减速开始推迟5级(70 -> 75)",
            cost: new Decimal("1e69600"),
            unlocked() { return hasUpgrade("incrementy_sp",52); },
        },
        34: {
            title: "变形虫升级34",
            description: "解锁更多物质升级",
            cost: new Decimal("1e74600"),
            unlocked() { return hasUpgrade("incrementy_sp",52); },
        },
        35: {
            title: "变形虫升级35",
            description: "变形虫提升超级声望点数获取",
            cost: new Decimal("1e75000"),
            unlocked() { return hasUpgrade("incrementy_sp",52); },
            effect() {
                let ret = player.incrementy_a.points.add(100).log10().sqrt();
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
    },
    passiveGeneration(){
        if(hasUpgrade("incrementy_a",15)&&player.incrementy_sp.best.gte(2))return 1e4;
        if(hasUpgrade("incrementy_a",15))return 1;
        return 0;
    }
});


addLayer("incrementy_m", {
    name: "物质层",
    symbol: "M",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#3B1053",
    requires(){
        if(player.incrementy_sp.best.gte(2))return new Decimal(1);
        return new Decimal("1e2000");
    },
    resource: "物质",
    baseResource: "增量",
    baseAmount() {return player.modpoints[5]},
    type: "normal",
    exponent(){
        let ret=new Decimal(0.001);
        if(hasUpgrade("incrementy_i",45) && !hasUpgrade("incrementy_e",34))ret=ret.mul(2);
        return ret;
    },
    gainMult() {
        mult = new Decimal(10)
        if(hasUpgrade("incrementy_e",12))mult=mult.mul(upgradeEffect("incrementy_e",12));
        if(hasUpgrade("incrementy_m",22))mult=mult.mul(upgradeEffect("incrementy_m",22));
        if(hasUpgrade("incrementy_m",24))mult=mult.mul(upgradeEffect("incrementy_m",24));
        if(hasUpgrade("incrementy_e",15))mult=mult.mul(upgradeEffect("incrementy_e",15));
        if(hasUpgrade("incrementy_e",21))mult=mult.mul(upgradeEffect("incrementy_e",21));
        if(hasUpgrade("incrementy_e",23))mult=mult.mul(upgradeEffect("incrementy_e",23));
        if(hasUpgrade("incrementy_n",25))mult = mult.mul(buyableEffect("incrementy_n",31));
        if(hasUpgrade("incrementy_p",35))mult = mult.mul(buyableEffect("incrementy_p",13));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    getResetGain() {
        let ret = tmp[this.layer].baseAmount.div(tmp[this.layer].requires).pow(tmp[this.layer].exponent);
        if(!hasUpgrade("incrementy_e",32) && ret.gte("e15e5"))ret = Decimal.pow(10, ret.log10().div(15).log10().mul(3e5));
        else if(!hasUpgrade("incrementy_e",34) && ret.gte("e2e6"))ret = Decimal.pow(10, ret.log10().div(2).log10().div(6).mul(2e6));
        else if(!hasUpgrade("incrementy_pi",15) && ret.gte("e36e6"))ret = Decimal.pow(10, ret.log10().div(36).log10().mul(6e6));
        else if(!(hasMilestone("incrementy_o",0)) && ret.gte("e4e7"))ret = Decimal.pow(10, ret.log10().div(4).log10().div(7).mul(4e7));
        else if(!(hasMilestone("incrementy_o",2)) && ret.gte("e1e8"))ret = Decimal.pow(10, ret.log10().root(8).mul(1e7));
        else if(ret.gte("e1e8"))ret = Decimal.pow(10, ret.log10().root(4).mul(1e6));
        ret = ret.times(tmp[this.layer].gainMult);
        return ret;
    },
    branches: ["incrementy_i"],
    row: 1,
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(3) && player.incrementy_am.challenges[12]>=1 && (!player.incrementy_pi.hidelayers);},
        
    doReset(l){
        if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || !l.startsWith("incrementy_")){return;}
        layerDataReset("incrementy_m",["upgrades","milestones","challenges"]);
        return;
    },
    effect(){
        if(hasMilestone("incrementy_o",0))return [new Decimal(1),new Decimal(1)];
        let eff1 = player.incrementy_m.points.add(1).pow(10)
        let eff2 = player.incrementy_m.points.mul(10).add(1).pow(0.5)
        return [eff1, eff2]
    },
    effectDescription(){
        if(hasMilestone("incrementy_o",0))return "";
        let eff = layers.incrementy_m.effect()
        return "将增量获取乘以" + format(eff[0]) + "，反物质获取乘以" + format(eff[1])
    },
    
    upgrades: {
        rows: 3,
        cols: 5,
        11: {
            title: "物质升级11",
            description(){
                if(hasUpgrade("incrementy_m",21) && player.incrementy_m.challenges[12])return "每个物质升级将基础增量获取乘以1e9";
                if(hasUpgrade("incrementy_m",21) || player.incrementy_m.challenges[12])return "每个物质升级将基础增量获取乘以1e6";
                return "每个物质升级将基础增量获取乘以1e4";
            },
            cost: new Decimal(20),
            unlocked() { return true; },
            effect() {
                let ret=Decimal.pow(1e4,player.incrementy_m.upgrades.length);
                if(hasUpgrade("incrementy_m",21))ret=ret.pow(1.5);
                if(player.incrementy_m.challenges[12])ret=ret.pow(1.5);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        12: {
            title: "物质升级12",
            description: "增量升级12效果平方化",
            cost: new Decimal(20),
            unlocked() { return true; },
        },
        13: {
            title: "物质升级13",
            description: "自动购买增量耐力",
            cost: new Decimal(50),
            unlocked() { return true; },
        },
        14: {
            title: "物质升级14",
            description: "增量升级35效果^5",
            cost: new Decimal(150),
            unlocked() { return true; },
        },
        15: {
            title: "物质升级15",
            description: "解锁能量层",
            cost: new Decimal(300),
            unlocked() { return true; },
        },
        21: {
            title: "物质升级21",
            description: "物质升级11效果^1.5",
            cost: new Decimal(1e40),
            unlocked() { return player.tm.buyables[5].gte(5); },
        },
        22: {
            title: "物质升级22",
            description: "基于增量耐力等级提升物质获取",
            cost: new Decimal(1e45),
            unlocked() { return player.tm.buyables[5].gte(5); },
            effect() {
                let ret=player.incrementy_i.buyables[13].add(1).pow(1.2);
                ret=Decimal.pow(1.1,ret);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        23: {
            title: "物质升级23",
            description: "解锁物质挑战",
            cost: new Decimal(1e62),
            unlocked() { return player.tm.buyables[5].gte(6); },
        },
        24: {
            title: "物质升级24",
            description: "基于变形虫数量提升物质获取",
            cost: new Decimal(1e70),
            unlocked() { return player.tm.buyables[5].gte(6); },
            effect() {
                if(hasUpgrade("incrementy_m",31))return player.incrementy_a.points.add(1);
                let base=3;
                let ret = Decimal.pow(base,Decimal.log10(player.incrementy_a.points.add(1)).pow(0.9));
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        25: {
            title: "物质升级25",
            description: "解锁物质挑战",
            cost: new Decimal(1e110),
            unlocked() { return player.tm.buyables[5].gte(6); },
        },
        31: {
            title: "物质升级31",
            description: "物质升级24效果更好",
            cost: new Decimal("e225e4"),
            unlocked() { return hasUpgrade("incrementy_a",34); },
        },
        32: {
            title: "物质升级32",
            description: "增量升级32效果更好",
            cost: new Decimal("e238e4"),
            unlocked() { return hasUpgrade("incrementy_a",34); },
        },
        33: {
            title: "物质升级33",
            description: "增量升级31效果更好",
            cost: new Decimal("e242e4"),
            unlocked() { return hasUpgrade("incrementy_a",34); },
        },
        34: {
            title: "物质升级34",
            description: "增量强度提供免费增量速度",
            cost: new Decimal("e2435e3"),
            unlocked() { return hasUpgrade("incrementy_a",34); },
        },
        35: {
            title: "物质升级35",
            description: "物质提升超级声望点数获取",
            cost: new Decimal("e244e4"),
            unlocked() { return hasUpgrade("incrementy_a",34); },
            effect() {
                let ret = player.incrementy_m.points.add(1e100).log10().log10();
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
    },
    passiveGeneration(){
        if(hasUpgrade("incrementy_e",11)&&player.incrementy_sp.best.gte(2))return 1e4;
        if(hasUpgrade("incrementy_e",11))return 100;
        return 0;
    },
    challenges:{
        rows: 1,
        cols: 2,
        11: {
            name: "吱吱声", 
            challengeDescription: "变形虫基础效果为1，增量获取平方根",
            rewardDescription: "增量耐力减速开始推迟5级(45 -> 50)",
            unlocked(){
                return hasUpgrade("incrementy_m",23)
            },
            goal: new Decimal("1e2100"),
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
        12: {
            name: "小溪声", 
            challengeDescription: "变形虫和反物质基础效果为1，增量获取立方根",
            rewardDescription: "物质升级11效果^1.5",
            unlocked(){
                return hasUpgrade("incrementy_m",25)
            },
            goal: new Decimal("1e960"),
            currencyLayer: "modpoints",
            currencyInternalName: "5",
            currencyDisplayName: "增量",
        },
    },
});

addLayer("incrementy_e", {
    name: "能量层",
    symbol: "E",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#E3FF00",
    requires: new Decimal(1),
    resource: "能量",
    baseResource: "物质和反物质中的较小值",
    baseAmount() {return player.incrementy_m.points.min(player.incrementy_am.points)},
    type: "normal",
    exponent: 1,
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("incrementy_e",13))mult=mult.mul(upgradeEffect("incrementy_e",13));
        if(hasUpgrade("incrementy_n",22))mult = mult.mul(buyableEffect("incrementy_n",23));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    branches: ["incrementy_am","incrementy_m"],
    row: 2,
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(3) && hasUpgrade("incrementy_m",15) && (!player.incrementy_pi.hidelayers);},
        
    doReset(l){
        if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || l=="incrementy_a" || l=="incrementy_e" || !l.startsWith("incrementy_")){return;}
        layerDataReset("incrementy_e",["upgrades","milestones","challenges"]);
        return;
    },
    
    upgrades: {
        rows: 3,
        cols: 5,
        11: {
            title: "能量升级11",
            description(){return "每秒获得"+(player.incrementy_sp.best.gte(2)?"1e6":10000)+"%能量和物质获取"},
            cost: new Decimal(1),
            unlocked() { return true; },
        },
        12: {
            title: "能量升级12",
            description: "基于能量提升物质获取",
            cost: new Decimal(1e9),
            unlocked() { return true; },
            effect() {
                let base=10;
                let ret = Decimal.pow(base,Decimal.log10(player.incrementy_e.points.add(1)).pow(0.9));
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        13: {
            title: "能量升级13",
            description: "基于增量提升能量获取",
            cost: new Decimal(1e30),
            unlocked() { return true; },
            effect() {
                let base=1.01;
                if(hasMilestone("incrementy_o",2))base = 1.005;
                let ret = Decimal.pow(base,Decimal.log10(player.modpoints[5].add(1)).pow(0.9));
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        14: {
            title: "能量升级14",
            description: "每个能量升级将增量获取乘以1e50",
            cost: new Decimal(1e50),
            unlocked() { return true; },
            effect() {
                let ret=Decimal.pow(1e50,player.incrementy_e.upgrades.length);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        15: {
            title: "能量升级15",
            description: "基于增量速度等级提升物质获取",
            cost: new Decimal(1e100),
            unlocked() { return true; },
            effect() {
                if(hasUpgrade("incrementy_e",33))return Decimal.pow(10,player.incrementy_i.buyables[11]);
                if(hasUpgrade("incrementy_e",31))return Decimal.pow(3,player.incrementy_i.buyables[11]);
                let ret=player.incrementy_i.buyables[11].add(1);
                ret=Decimal.pow(1.01,ret);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        21: {
            title: "能量升级21",
            description(){
                if(hasUpgrade("incrementy_e",25) && player.incrementy_m.challenges[12])return "每个能量升级将物质获取乘以1e8";
                return "每个能量升级将物质获取乘以1e5";
            },
            cost: new Decimal(1e175),
            unlocked() { return player.tm.buyables[5].gte(8); },
            effect() {
                let ret=Decimal.pow(1e5,player.incrementy_e.upgrades.length);
                if(hasUpgrade("incrementy_e",25))ret=ret.pow(1.6);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        22: {
            title: "能量升级22",
            description: "增量耐力减速开始推迟1级(50 -> 51)",
            cost: new Decimal(1e257),
            unlocked() { return player.tm.buyables[5].gte(8); },
        },
        23: {
            title: "能量升级23",
            description: "基于树等级提升物质获取",
            cost: new Decimal(1e272),
            unlocked() { return player.tm.buyables[5].gte(9); },
            effect() {
                let ret=Decimal.pow(2,player.tm.buyables[5].pow(1.5));
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        24: {
            title: "能量升级24",
            description: "增量耐力减速开始推迟1级(51 -> 52)",
            cost: new Decimal("1e313"),
            unlocked() { return player.tm.buyables[5].gte(9); },
        },
        25: {
            title: "能量升级25",
            description: "能量升级21效果^1.6",
            cost: new Decimal("1e335"),
            unlocked() { return player.tm.buyables[5].gte(9); },
        },
        31: {
            title: "能量升级31",
            description: "能量升级15效果更好",
            cost: new Decimal("e38e5"),
            unlocked() { return hasUpgrade("incrementy_sp",55); },
        },
        32: {
            title: "能量升级32",
            description: "物质获取减速开始更晚",
            cost: new Decimal("e45e5"),
            unlocked() { return hasUpgrade("incrementy_sp",55); },
        },
        33: {
            title: "能量升级33",
            description: "能量升级15效果更好",
            cost: new Decimal("e533e4"),
            unlocked() { return hasUpgrade("incrementy_sp",55); },
        },
        34: {
            title: "能量升级34",
            description: "增量升级45效果改变",
            cost: new Decimal("e606e4"),
            unlocked() { return hasUpgrade("incrementy_sp",55); },
        },
        35: {
            title: "能量升级35",
            description: "基础反物质获取更好(每增量可购买项等级10倍)",
            cost: new Decimal("ee7"),
            unlocked() { return hasUpgrade("incrementy_sp",55); },
        },
    },
    resetsNothing: true,
    passiveGeneration(){
        if(hasUpgrade("incrementy_e",11)&&player.incrementy_sp.best.gte(2))return 1e4;
        if(hasUpgrade("incrementy_e",11))return 100;
        return 0;
    }
});

addLayer("incrementy_p", {
    name: "粒子层",
    symbol: "P",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#FFC0F0",
    requires: new Decimal(1),
    resource: "粒子",
    baseResource: "增量",
    baseAmount() {return player.modpoints[5]},
    type: "normal",
    exponent: 1,
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("incrementy_n",13))mult = mult.mul(buyableEffect("incrementy_n",12));
        if(hasUpgrade("incrementy_n",22))mult = mult.mul(buyableEffect("incrementy_n",22));
        if(hasUpgrade("incrementy_g",13))mult = mult.mul(upgradeEffect("incrementy_g",13));
        if(hasUpgrade("incrementy_p",31))mult = mult.mul(buyableEffect("incrementy_p",11));
        return mult
    },
    gainExp() {
        mult = new Decimal(1)
        if(hasUpgrade("incrementy_n",24))mult = mult.mul(1.5);
        if(hasUpgrade("incrementy_g",14))mult = mult.mul(upgradeEffect("incrementy_g",14));
        if(hasUpgrade("incrementy_am",33))mult = mult.mul(1.05);
        return mult
    },
    getResetGain() {
        if(hasUpgrade("incrementy_n",23))return layers.incrementy_p.getResetGainReal();
        let ret=layers.incrementy_p.getResetGainReal();
        return Decimal.min(ret,ret.mul(60).sub(player.incrementy_p.points)).max(0);
    },
    getResetGainReal() {
        let ret=player.modpoints[5];
        if(ret.lt(1))return new Decimal(0);
        if(hasUpgrade("incrementy_n",15))ret=ret.log10().pow(2).pow(layers.incrementy_p.gainExp());
        else ret=ret.log10().div(20000).sqrt().pow(layers.incrementy_p.gainExp());
        ret=ret.mul(layers.incrementy_p.gainMult());
        return ret;
    },
    canReset() {
        return layers.incrementy_p.getResetGain().gt(0);
    },
    prestigeButtonText(){
        if(layers.incrementy_p.getResetGain().lte(0))return "+<b>0</b> 粒子";
        if(layers.incrementy_p.getResetGain().lt(1e-3))return "+<b>"+exponentialFormat1(layers.incrementy_p.getResetGain(),2)+"</b> 粒子";
        if(layers.incrementy_p.getResetGain().lt(1))return "+<b>"+format(layers.incrementy_p.getResetGain(),4)+"</b> 粒子";
        return "+<b>"+format(layers.incrementy_p.getResetGain())+"</b> 粒子";
    },
    getNextAt() {
        let ret=tmp.incrementy_p.getResetGainReal.plus(1).floor();
        ret=ret.div(layers.incrementy_p.gainMult()).max(1);
        if(hasUpgrade("incrementy_n",15))ret=ret.sqrt().root(layers.incrementy_p.gainExp());
        else ret=ret.pow(2).mul(20000).root(layers.incrementy_p.gainExp());
        ret=Decimal.pow(10,ret);
        return ret;
    },
    branches: ["incrementy_i","incrementy_n","incrementy_g","incrementy_q"],
    row: 2,
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(10);},
        
    doReset(l){
        if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || l=="incrementy_a" || l=="incrementy_e" || !l.startsWith("incrementy_")){return;}
        layerDataReset("incrementy_p",["upgrades","milestones","challenges"]);
        return;
    },
    
    tabFormat: ["main-display",
                "prestige-button", "resource-display",
                ["blank", "5px"],
                "milestones",
                ["display-text",function(){if(hasUpgrade("incrementy_n",23))return "";return "粒子上限: "+format(tmp.incrementy_p.getResetGainReal.mul(60))+" (基于你的增量)"}],
                "upgrades","buyables"
        ],
    resetsNothing: true,
    passiveGeneration(){
        if(player.incrementy_sp.best.gte(3)&&hasUpgrade("incrementy_p",11))return 1e4;
        if(hasUpgrade("incrementy_s",11)&&hasUpgrade("incrementy_p",11))return 100;
        if(hasUpgrade("incrementy_p",11))return 1;
        return 0;
    },
    
    upgrades: {
        rows: 3,
        cols: 5,
        11: {
            title: "粒子升级11",
            description(){return "每秒获得"+(player.incrementy_sp.best.gte(3)?"1e6":hasUpgrade("incrementy_s",11)?10000:100)+"%粒子获取"},
            cost: new Decimal(15),
            unlocked() { return true; },
        },
        12: {
            title: "粒子升级12",
            description: "解锁中微子",
            cost: new Decimal(65),
            unlocked() { return player.tm.buyables[5].gte(11); },
        },
        13: {
            title: "粒子升级13",
            description: "中微子获取指数乘以1.35",
            cost: new Decimal(6e13),
            unlocked() { return player.tm.buyables[5].gte(11); },
        },
        14: {
            title: "粒子升级14",
            description: "基于中微子数量提升中微子获取",
            cost: new Decimal(2e14),
            unlocked() { return player.tm.buyables[5].gte(11); },
            effect() {
                let base=1.5;
                let ret = Decimal.pow(base,Decimal.log10(player.incrementy_n.points.add(1)).pow(0.9));
                if(hasUpgrade("incrementy_n",21))ret=ret.pow(2);
                if(hasUpgrade("incrementy_p",22))ret=ret.pow(2);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        15: {
            title: "粒子升级15",
            description: "增量升级12效果平方化",
            cost: new Decimal(5e14),
            unlocked() { return player.tm.buyables[5].gte(11); },
        },
        21: {
            title: "粒子升级21",
            description: "中微子获取指数乘以1.1",
            cost: new Decimal(1e55),
            unlocked() { return player.tm.buyables[5].gte(13); },
        },
        22: {
            title: "粒子升级22",
            description: "粒子升级14效果平方化",
            cost: new Decimal(1e90),
            unlocked() { return player.tm.buyables[5].gte(13); },
        },
        23: {
            title: "粒子升级23",
            description: "粒子升级添加到中微子可购买项第一列",
            cost: new Decimal(1e150),
            unlocked() { return player.tm.buyables[5].gte(13); },
        },
        24: {
            title: "粒子升级24",
            description: "粒子升级添加到中微子可购买项第二列",
            cost: new Decimal(1e153),
            unlocked() { return player.tm.buyables[5].gte(13); },
        },
        25: {
            title: "粒子升级25",
            description: "粒子升级添加到中微子可购买项第三列",
            cost: new Decimal(1e219),
            unlocked() { return player.tm.buyables[5].gte(13); },
        },
        31: {
            title: "粒子升级31",
            description: "解锁第一个粒子可购买项",
            cost: new Decimal("1e943"),
            unlocked() { return player.tm.buyables[5].gte(18); },
        },
        32: {
            title: "粒子升级32",
            description: "解锁第二个粒子可购买项",
            cost: new Decimal("1e1045"),
            unlocked() { return hasChallenge("incrementy_q",22); },
        },
        33: {
            title: "粒子升级33",
            description: "粒子加速添加到中微子可购买项第一列",
            cost: new Decimal("1e1096"),
            unlocked() { return hasChallenge("incrementy_q",22); },
        },
        34: {
            title: "粒子升级34",
            description(){
                if(hasUpgrade("incrementy_pi",25))return "在TPTR中获得"+format(player.incrementy_p.points.add(1e3))+"倍更多重写点数，在游戏开发树中获得"+format(player.incrementy_s.points.add(10))+"倍更多经验/现金";
                return "在TPTR中获得1e3倍更多重写点数，在游戏开发树中获得10倍更多经验";
            },
            cost: new Decimal("1e1170"),
            unlocked() { return hasChallenge("incrementy_q",22); },
        },
        35: {
            title: "粒子升级35",
            description: "解锁第三个粒子可购买项",
            cost: new Decimal("1e1250"),
            unlocked() { return hasChallenge("incrementy_q",22); },
        },
    },
    buyables:{
        rows: 1, 
        cols: 3,
        11: {
            title: "粒子加速",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(2, x.pow(3)).mul("1e990");
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_p.buyables[11])+"+"+formatWhole(data.free)+"<br>"+
                "成本: "+format(data.cost)+" 粒子<br>"+
                "效果: 粒子获取x"+format(data.effect);
            },
            unlocked(){ return hasUpgrade("incrementy_p", 31) },
            canAfford() {
                return player.incrementy_p.points.gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                let base=new Decimal(100);
                return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
            },
            free(){
                let ret=new Decimal(0);
                if(hasUpgrade("incrementy_s",21))ret=ret.add(player.incrementy_s.upgrades.length||0);
                if(hasUpgrade("incrementy_s",22))ret=ret.add(player.incrementy_p.buyables[12]);
                if(hasUpgrade("incrementy_s",22))ret=ret.add(layers.incrementy_p.buyables[12].free());
                if(hasUpgrade("incrementy_b",31))ret=ret.add(player.incrementy_b.upgrades.length||0);
                if(hasUpgrade("incrementy_b",33))ret=ret.add(player.incrementy_b.challenges[11]);
                if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[12]);
                if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[21]);
                if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[22]);
                return ret;
            }
        },
        12: {
            title: "粒子碰撞",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(2, x.pow(3)).mul("1e1090");
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_p.buyables[12])+"+"+formatWhole(data.free)+"<br>"+
                "成本: "+format(data.cost)+" 粒子<br>"+
                "效果: 中微子和夸克获取x"+format(data.effect);
            },
            unlocked(){ return hasUpgrade("incrementy_p", 32) },
            canAfford() {
                return player.incrementy_p.points.gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                let base=new Decimal(1e7);
                return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
            },
            free(){
                let ret=new Decimal(0);
                if(hasUpgrade("incrementy_s",21))ret=ret.add(player.incrementy_s.upgrades.length||0);
                if(hasUpgrade("incrementy_s",23))ret=ret.add(player.incrementy_p.buyables[13]);
                if(hasUpgrade("incrementy_s",23))ret=ret.add(layers.incrementy_p.buyables[13].free());
                if(hasUpgrade("incrementy_b",31))ret=ret.add(player.incrementy_b.upgrades.length||0);
                if(hasUpgrade("incrementy_b",33))ret=ret.add(player.incrementy_b.challenges[11]);
                if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[12]);
                if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[21]);
                if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[22]);
                return ret;
            }
        },
        13: {
            title: "粒子模拟",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(5, x.pow(3)).mul("1e1250");
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_p.buyables[13])+"+"+formatWhole(data.free)+"<br>"+
                "成本: "+format(data.cost)+" 粒子<br>"+
                "效果: 胶子、物质和中微子获取x"+format(data.effect);
            },
            unlocked(){ return hasUpgrade("incrementy_p", 35) },
            canAfford() {
                return player.incrementy_p.points.gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                let base=new Decimal(1e10);
                return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
            },
            free(){
                let ret=new Decimal(0);
                if(hasUpgrade("incrementy_s",21))ret=ret.add(player.incrementy_s.upgrades.length||0);
                if(hasUpgrade("incrementy_b",31))ret=ret.add(player.incrementy_b.upgrades.length||0);
                if(hasUpgrade("incrementy_b",33))ret=ret.add(player.incrementy_b.challenges[11]);
                if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[12]);
                if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[21]);
                if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[22]);
                ret=ret.add(layers.incrementy_b.challenges[22].rewardEffect()[1])
                return ret;
            }
        },
    },
    update(diff){
        if(hasUpgrade("incrementy_s",12)){
            var target=player.incrementy_p.points.div("1e990").add(1).log(2).pow(1/3).add(1).floor();
            if(target.gt(player.incrementy_p.buyables[11])){
                player.incrementy_p.buyables[11]=target;
            }
        }
        if(hasUpgrade("incrementy_s",12)){
            var target=player.incrementy_p.points.div("1e1090").add(1).log(2).pow(1/3).add(1).floor();
            if(target.gt(player.incrementy_p.buyables[12])){
                player.incrementy_p.buyables[12]=target;
            }
        }
        if(hasUpgrade("incrementy_s",12)){
            var target=player.incrementy_p.points.div("1e1250").add(1).log(5).pow(1/3).add(1).floor();
            if(target.gt(player.incrementy_p.buyables[13])){
                player.incrementy_p.buyables[13]=target;
            }
        }
    },
});


addLayer("incrementy_n", {
    name: "中微子层",
    symbol: "N",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#B5F146",
    requires: new Decimal(1),
    resource: "中微子",
    baseResource: "粒子",
    baseAmount() {return player.incrementy_p.points},
    type: "normal",
    exponent() {
        ret = new Decimal(1)
        if(hasUpgrade("incrementy_p",13))ret = ret.mul(1.35);
        if(hasUpgrade("incrementy_p",21))ret = ret.mul(1.1);
        if(hasUpgrade("incrementy_g",15))ret = ret.mul(upgradeEffect("incrementy_g",15));
        if (inChallenge("incrementy_sp", 12)) ret = ret.div(100)
        return ret
    },
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("incrementy_n",12))mult = mult.mul(buyableEffect("incrementy_n",11));
        if(hasUpgrade("incrementy_p",14))mult = mult.mul(upgradeEffect("incrementy_p",14));
        if(hasUpgrade("incrementy_g",12))mult = mult.mul(upgradeEffect("incrementy_g",12));
        if(hasUpgrade("incrementy_i",44))mult = mult.mul(upgradeEffect("incrementy_i",44));
        if(hasUpgrade("incrementy_p",32))mult = mult.mul(buyableEffect("incrementy_p",12));
        if(hasUpgrade("incrementy_p",35))mult = mult.mul(buyableEffect("incrementy_p",13));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 1,
    layerShown(){return player.tm.currentTree==5 && hasUpgrade("incrementy_p",12);},
    doReset(l){
        if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || !l.startsWith("incrementy_")){return;}
        layerDataReset("incrementy_n",["upgrades","milestones","challenges"]);
        return;
    },
    tabFormat: ["main-display",
                "prestige-button", "resource-display",
                ["blank", "5px"],
                "milestones",
                "buyables",
                "upgrades"
            ],
    resetsNothing: true,
    passiveGeneration(){
        if(player.incrementy_sp.best.gte(3)&&hasUpgrade("incrementy_n",11))return 1e4;
        if(hasUpgrade("incrementy_s",11)&&hasUpgrade("incrementy_n",11))return 100;
        if(hasUpgrade("incrementy_n",11))return 1;
        return 0;
    },
    upgrades: {
        rows: 2,
        cols: 5,
        11: {
            title: "中微子升级11",
            description(){return "每秒获得"+(player.incrementy_sp.best.gte(3)?"1e6":hasUpgrade("incrementy_s",11)?10000:100)+"%中微子获取"},
            cost: new Decimal(15),
            unlocked() { return true; },
        },
        12: {
            title: "中微子升级12",
            description: "解锁中微子可购买项",
            cost: new Decimal(1e3),
            unlocked() { return true; },
        },
        13: {
            title: "中微子升级13",
            description: "解锁中微子可购买项",
            cost: new Decimal(1e6),
            unlocked() { return true; },
        },
        14: {
            title: "中微子升级14",
            description: "解锁中微子可购买项",
            cost: new Decimal(1e12),
            unlocked() { return true; },
        },
        15: {
            title: "中微子升级15",
            description: "基础粒子获取公式更好",
            cost: new Decimal(1e18),
            unlocked() { return true; },
        },
        21: {
            title: "中微子升级21",
            description: "粒子升级14效果平方化",
            cost: new Decimal(1e54),
            unlocked() { return player.tm.buyables[5].gte(12); },
        },
        22: {
            title: "中微子升级22",
            description: "解锁3个中微子可购买项",
            cost: new Decimal(1e65),
            unlocked() { return player.tm.buyables[5].gte(12); },
        },
        23: {
            title: "中微子升级23",
            description: "移除粒子上限",
            cost: new Decimal(1e169),
            unlocked() { return player.tm.buyables[5].gte(12); },
        },
        24: {
            title: "中微子升级24",
            description: "基础粒子获取指数乘以1.5",
            cost: new Decimal(1e175),
            unlocked() { return player.tm.buyables[5].gte(12); },
        },
        25: {
            title: "中微子升级25",
            description: "解锁3个中微子可购买项",
            cost: new Decimal(1e200),
            unlocked() { return player.tm.buyables[5].gte(13); },
        },
    },
    update(diff){
        if(hasUpgrade("incrementy_s",11)){
            var target=player.incrementy_n.points.div(100).add(1).log(1.25).pow(1/2).add(1).floor();
            if(target.gt(player.incrementy_n.buyables[11])){
                player.incrementy_n.buyables[11]=target;
            }
        }
        if(hasUpgrade("incrementy_s",11)){
            var target=player.incrementy_n.points.div(1e6).add(1).log(1.5).pow(1/2).add(1).floor();
            if(target.gt(player.incrementy_n.buyables[12])){
                player.incrementy_n.buyables[12]=target;
            }
        }
        if(hasUpgrade("incrementy_s",11)){
            var target=player.incrementy_n.points.div(1e11).add(1).log(2).pow(1/2).add(1).floor();
            if(target.gt(player.incrementy_n.buyables[13])){
                player.incrementy_n.buyables[13]=target;
            }
        }
        if(hasUpgrade("incrementy_s",11)){
            var target=player.incrementy_n.points.div(1e50).add(1).log(2.5).pow(1/2).add(1).floor();
            if(target.gt(player.incrementy_n.buyables[21])){
                player.incrementy_n.buyables[21]=target;
            }
        }
        if(hasUpgrade("incrementy_s",11)){
            var target=player.incrementy_n.points.div(1e70).add(1).log(5).pow(1/2).add(1).floor();
            if(target.gt(player.incrementy_n.buyables[22])){
                player.incrementy_n.buyables[22]=target;
            }
        }
        if(hasUpgrade("incrementy_s",11)){
            var target=player.incrementy_n.points.div(1e110).add(1).log(125).pow(1/2).add(1).floor();
            if(target.gt(player.incrementy_n.buyables[23])){
                player.incrementy_n.buyables[23]=target;
            }
        }
        if(hasUpgrade("incrementy_s",11)){
            var target=player.incrementy_n.points.div(1e150).add(1).log(1000).pow(1/2).add(1).floor();
            if(target.gt(player.incrementy_n.buyables[31])){
                player.incrementy_n.buyables[31]=target;
            }
        }
        if(hasUpgrade("incrementy_s",11)){
            var target=player.incrementy_n.points.div(1e200).add(1).log(1250).pow(1/2).add(1).floor();
            if(target.gt(player.incrementy_n.buyables[32])){
                player.incrementy_n.buyables[32]=target;
            }
        }
        if(hasUpgrade("incrementy_s",11)){
            var target=player.incrementy_n.points.div(1e250).add(1).log(1e10).pow(1/2).add(1).floor();
            if(target.gt(player.incrementy_n.buyables[33])){
                player.incrementy_n.buyables[33]=target;
            }
        }
    },
    buyables:{
        rows: 3,
        cols: 3,
        11: {
            title: "中微子生成",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(1.25, x.pow(2)).mul(100);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_n.buyables[11])+"+"+formatWhole(data.free)+"<br>"+
                "成本: "+format(data.cost)+" 中微子<br>"+
                "效果: 中微子获取x"+format(data.effect);
            },
            unlocked() { return hasUpgrade("incrementy_n",12) },
            canAfford() {
                return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
                let base=new Decimal(3);
                if(hasUpgrade("incrementy_g",23))base=base.add(1.5);
                if(hasUpgrade("incrementy_s",12))base=base.add(0.9);
                base = base.plus(layers.incrementy_b.challenges[11].rewardEffect())
                return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
            },
            free(){
                let ret=player.incrementy_n.buyables[12];
                ret=ret.add(layers.incrementy_n.buyables[12].free());
                ret=ret.add(player.incrementy_n.buyables[21]);
                ret=ret.add(layers.incrementy_n.buyables[21].free());
                if(hasUpgrade("incrementy_p",23))ret=ret.add(player.incrementy_p.upgrades.length||0);
                if(hasUpgrade("incrementy_p",33))ret=ret.add(player.incrementy_p.buyables[11]);
                if(hasUpgrade("incrementy_p",33))ret=ret.add(layers.incrementy_p.buyables[11].free());
                if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
                return ret;
            }
        },
        12: {
            title: "粒子生成",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(1.5, x.pow(2)).mul(1e6);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_n.buyables[12])+"+"+formatWhole(data.free)+"<br>"+
                "成本: "+format(data.cost)+" 中微子<br>"+
                "效果: 粒子获取x"+format(data.effect);
            },
            unlocked() { return hasUpgrade("incrementy_n",13) },
            canAfford() {
                return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
                let base=new Decimal(1.4);
                base = base.plus(layers.incrementy_b.challenges[22].rewardEffect()[0])
                return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
            },
            free(){
                let ret=player.incrementy_n.buyables[13];
                ret=ret.add(layers.incrementy_n.buyables[13].free());
                ret=ret.add(player.incrementy_n.buyables[22]);
                ret=ret.add(layers.incrementy_n.buyables[22].free());
                if(hasUpgrade("incrementy_p",24))ret=ret.add(player.incrementy_p.upgrades.length||0);
                if(hasUpgrade("incrementy_s",14))ret=ret.add(player.incrementy_p.buyables[12]);
                if(hasUpgrade("incrementy_s",14))ret=ret.add(layers.incrementy_p.buyables[12].free());
                if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
                return ret;
            }
        },
        13: {
            title: "基础增量获取",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(2, x.pow(2)).mul(1e11);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_n.buyables[13])+"+"+formatWhole(data.free)+"<br>"+
                "成本: "+format(data.cost)+" 中微子<br>"+
                "效果: 基础增量获取x"+format(data.effect);
            },
            unlocked() { return hasUpgrade("incrementy_n",14) },
            canAfford() {
                return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
                let base=new Decimal(1e5);
                if (inChallenge("incrementy_b", 12))  base= base.pow(new Decimal(2).div(3 + challengeCompletions("incrementy_b", 12)));
                 if (inChallenge("incrementy_b", 21)) return new Decimal(1)
                return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
            },
            free(){
                let ret=player.incrementy_n.buyables[23];
                ret=ret.add(layers.incrementy_n.buyables[23].free());
                if(hasUpgrade("incrementy_p",25))ret=ret.add(player.incrementy_p.upgrades.length||0);
                if(hasUpgrade("incrementy_s",15))ret=ret.add(player.incrementy_p.buyables[13]);
                if(hasUpgrade("incrementy_s",15))ret=ret.add(layers.incrementy_p.buyables[13].free());
                if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
                return ret;
            }
        },
        21: {
            title: "增量提升",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(2.5, x.pow(2)).mul(1e50);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_n.buyables[21])+"+"+formatWhole(data.free)+"<br>"+
                "成本: "+format(data.cost)+" 中微子<br>"+
                "效果: 增量获取x"+format(data.effect)+" (基于中微子)";
            },
            unlocked() { return hasUpgrade("incrementy_n",22) },
            canAfford() {
                return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
                let base=player.incrementy_n.best.plus(10).log10().pow(10);
                return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
            },
            free(){
                let ret=player.incrementy_n.buyables[22];
                ret=ret.add(layers.incrementy_n.buyables[22].free());
                ret=ret.add(player.incrementy_n.buyables[31]);
                ret=ret.add(layers.incrementy_n.buyables[31].free());
                if(hasUpgrade("incrementy_p",23))ret=ret.add(player.incrementy_p.upgrades.length||0);
                if(hasUpgrade("incrementy_p",33))ret=ret.add(player.incrementy_p.buyables[11]);
                if(hasUpgrade("incrementy_p",33))ret=ret.add(layers.incrementy_p.buyables[11].free());
                if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
                return ret;
            }
        },
        22: {
            title: "粒子提升",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(5, x.pow(2)).mul(1e70);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_n.buyables[22])+"+"+formatWhole(data.free)+"<br>"+
                "成本: "+format(data.cost)+" 中微子<br>"+
                "效果: 粒子获取x"+format(data.effect)+" (基于中微子)";
            },
            unlocked() { return hasUpgrade("incrementy_n",22) },
            canAfford() {
                return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
                let base=player.incrementy_n.best.plus(10).log10().pow(0.5);
                base = base.times(layers.incrementy_sp.challenges[22].rewardEffect())
                return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
            },
            free(){
                let ret=player.incrementy_n.buyables[23];
                ret=ret.add(layers.incrementy_n.buyables[23].free());
                ret=ret.add(player.incrementy_n.buyables[32]);
                ret=ret.add(layers.incrementy_n.buyables[32].free());
                if(hasUpgrade("incrementy_p",24))ret=ret.add(player.incrementy_p.upgrades.length||0);
                if(hasUpgrade("incrementy_s",14))ret=ret.add(player.incrementy_p.buyables[12]);
                if(hasUpgrade("incrementy_s",14))ret=ret.add(layers.incrementy_p.buyables[12].free());
                if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
                return ret;
            }
        },
        23: {
            title: "能量提升",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(125, x.pow(2)).mul(1e110);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_n.buyables[23])+"+"+formatWhole(data.free)+"<br>"+
                "成本: "+format(data.cost)+" 中微子<br>"+
                "效果: 能量获取x"+format(data.effect);
            },
            unlocked() { return hasUpgrade("incrementy_n",22) },
            canAfford() {
                return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
                let base=new Decimal(100);
                return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
            },
            free(){
                let ret=player.incrementy_n.buyables[33];
                ret=ret.add(layers.incrementy_n.buyables[33].free());
                if(hasUpgrade("incrementy_p",25))ret=ret.add(player.incrementy_p.upgrades.length||0);
                if(hasUpgrade("incrementy_s",15))ret=ret.add(player.incrementy_p.buyables[13]);
                if(hasUpgrade("incrementy_s",15))ret=ret.add(layers.incrementy_p.buyables[13].free());
                if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
                return ret;
            }
        },
        31: {
            title: "物质获取",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(1000, x.pow(2)).mul(1e150);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_n.buyables[31])+"+"+formatWhole(data.free)+"<br>"+
                "成本: "+format(data.cost)+" 中微子<br>"+
                "效果: 物质获取x"+format(data.effect);
            },
            unlocked() { return hasUpgrade("incrementy_n",25) },
            canAfford() {
                return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
                let base=new Decimal(25);
                return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
            },
            free(){
                let ret=player.incrementy_n.buyables[32];
                ret=ret.add(layers.incrementy_n.buyables[32].free());
                if(hasUpgrade("incrementy_p",23))ret=ret.add(player.incrementy_p.upgrades.length||0);
                if(hasUpgrade("incrementy_p",33))ret=ret.add(player.incrementy_p.buyables[11]);
                if(hasUpgrade("incrementy_p",33))ret=ret.add(layers.incrementy_p.buyables[11].free());
                if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
                return ret;
            }
        },
        32: {
            title: "反物质获取",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(1250, x.pow(2)).mul(1e200);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_n.buyables[32])+"+"+formatWhole(data.free)+"<br>"+
                "成本: "+format(data.cost)+" 中微子<br>"+
                "效果: 反物质获取x"+format(data.effect);
            },
            unlocked() { return hasUpgrade("incrementy_n",25) },
            canAfford() {
                return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
                let base=new Decimal(10);
                return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
            },
            free(){
                let ret=player.incrementy_n.buyables[33];
                ret=ret.add(layers.incrementy_n.buyables[33].free());
                if(hasUpgrade("incrementy_p",24))ret=ret.add(player.incrementy_p.upgrades.length||0);
                if(hasUpgrade("incrementy_s",14))ret=ret.add(player.incrementy_p.buyables[12]);
                if(hasUpgrade("incrementy_s",14))ret=ret.add(layers.incrementy_p.buyables[12].free());
                if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
                return ret;
            }
        },
        33: {
            title: "变形虫获取",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(1e10, x.pow(2)).mul(1e250);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "数量: "+formatWhole(player.incrementy_n.buyables[33])+"+"+formatWhole(data.free)+"<br>"+
                "成本: "+format(data.cost)+" 中微子<br>"+
                "效果: 变形虫获取x"+format(data.effect);
            },
            unlocked() { return hasUpgrade("incrementy_n",25) },
            canAfford() {
                return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
                let base=new Decimal(10);
                return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
            },
            free(){
                let ret=new Decimal(0);
                if(hasUpgrade("incrementy_p",25))ret=ret.add(player.incrementy_p.upgrades.length||0);
                if(hasUpgrade("incrementy_s",15))ret=ret.add(player.incrementy_p.buyables[13]);
                if(hasUpgrade("incrementy_s",15))ret=ret.add(layers.incrementy_p.buyables[13].free());
                if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
                return ret;
            }
        },
    },
});

addLayer("incrementy_g", {
    name: "胶子层",
    symbol: "G",
    position: 3,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#744100",
    requires(){
        if(player.incrementy_sp.best.gte(3))return new Decimal(1);
        return new Decimal(1e300);
    },
    resource: "胶子",
    baseResource: "粒子",
    baseAmount() {return player.incrementy_p.points},
    type: "normal",
    exponent() {
        ret = new Decimal(1)
        if(hasUpgrade("incrementy_g",34))ret = ret.mul(upgradeEffect("incrementy_g",34));
        return ret
    },
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("incrementy_i",43))mult = mult.mul(upgradeEffect("incrementy_i",43));
        if(hasUpgrade("incrementy_p",35))mult = mult.mul(buyableEffect("incrementy_p",13));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 1,
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(14) && (!player.incrementy_pi.hidelayers);},
    doReset(l){
        if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || !l.startsWith("incrementy_")){return;}
        layerDataReset("incrementy_g",["upgrades","milestones","challenges"]);
        return;
    },
    resetsNothing: true,
    passiveGeneration(){
        if(player.incrementy_sp.best.gte(3)&&hasUpgrade("incrementy_g",11))return 1e4;
        if(hasUpgrade("incrementy_s",11)&&hasUpgrade("incrementy_g",11))return 100;
        if(hasUpgrade("incrementy_g",11))return 1;
        return 0;
    },
    upgrades: {
        rows: 3,
        cols: 5,
        11: {
            title: "胶子升级11",
            description(){return "每秒获得"+(player.incrementy_sp.best.gte(3)?"1e6":hasUpgrade("incrementy_s",11)?10000:100)+"%胶子获取"},
            cost: new Decimal(15),
            unlocked() { return true; },
        },
        12: {
            title: "胶子升级12",
            description: "胶子提升中微子",
            cost: new Decimal(1e25),
            effect() {
                let base=10;
                let ret = Decimal.pow(base,Decimal.log10(player.incrementy_g.points.add(1)).pow(0.9));
                return ret;
            },
            unlocked() { return true; },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        13: {
            title: "胶子升级13",
            description: "胶子提升粒子",
            cost: new Decimal(1e28),
            effect() {
                let base=1.5;
                let ret = Decimal.pow(base,Decimal.log10(player.incrementy_g.points.add(1)).pow(0.9));
                if(hasUpgrade("incrementy_g",31))ret=ret.pow(2);
                return ret;
            },
            unlocked() { return true; },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        14: {
            title: "胶子升级14",
            description: "胶子提升粒子获取指数",
            cost: new Decimal(1e32),
            effect() {
                let ret = player.incrementy_g.points.add(1).log10().pow(0.5).mul(0.1).add(1);
                if(ret.gte(132.25)){ret = ret.sqrt().mul(11.5);}
                if(hasUpgrade("incrementy_g",25))ret=ret.pow(2);
                if(hasUpgrade("incrementy_g",32))ret=ret.pow(1.1);
                return ret;
            },
            unlocked() { return true; },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        15: {
            title: "胶子升级15",
            description: "胶子提升中微子获取指数",
            cost: new Decimal(1e57),
            effect() {
                let ret = player.incrementy_g.points.add(1).log10().pow(0.2).mul(0.01).add(1);
                if(hasUpgrade("incrementy_g",33))ret=ret.pow(1.5);
                return ret;
            },
            unlocked() { return true; },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        21: {
            title: "胶子升级21",
            description: "胶子提升基础增量获取",
            cost: new Decimal(1e63),
            effect() {
                let ret = player.incrementy_g.points.add(1);
                return ret;
            },
            unlocked() { return player.tm.buyables[5].gte(15); },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        22: {
            title: "胶子升级22",
            description: "增量升级12效果基于此树等级提升",
            cost: new Decimal(1e64),
            effect() {
                let ret = player.tm.buyables[5].sqrt();
                return ret;
            },
            unlocked() { return player.tm.buyables[5].gte(15); },
            effectDisplay() { return "^"+format(this.effect()) },
        },
        23: {
            title: "胶子升级23",
            description: "中微子生成基础+1.5",
            cost: new Decimal(1e65),
            unlocked() { return player.tm.buyables[5].gte(15); },
        },
        24: {
            title: "胶子升级24",
            description: "中微子提升增量获取",
            cost: new Decimal(1e126),
            effect() {
                let ret = player.incrementy_n.points.add(1);
                return ret;
            },
            unlocked() { return player.tm.buyables[5].gte(15); },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        25: {
            title: "胶子升级25",
            description: "胶子升级14效果平方化",
            cost: new Decimal(1e127),
            unlocked() { return player.tm.buyables[5].gte(15); },
        },
        31: {
            title: "胶子升级31",
            description: "胶子升级13效果平方化",
            cost: new Decimal(1e296),
            unlocked() { return player.incrementy_q.challenges[12]; },
        },
        32: {
            title: "胶子升级32",
            description: "胶子升级14效果^1.1",
            cost: new Decimal("1e390"),
            unlocked() { return player.incrementy_q.challenges[12]; },
        },
        33: {
            title: "胶子升级33",
            description: "胶子升级15效果^1.5",
            cost: new Decimal("1e509"),
            unlocked() { return player.incrementy_q.challenges[12]; },
        },
        34: {
            title: "胶子升级34",
            description: "胶子提升胶子获取指数",
            cost: new Decimal("1e538"),
            effect() {
                let ret = player.incrementy_g.points.add(1).log10().add(1).log10().pow(0.2).mul(0.04).add(1);
                return ret;
            },
            unlocked() { return player.incrementy_q.challenges[12]; },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        35: {
            title: "胶子升级35",
            description: "胶子降低经典声望树中的幻影灵魂成本",
            cost: new Decimal("1e600"),
            effect() {
                let base=1e30;
                let ret = Decimal.pow(base,Decimal.log10(player.incrementy_g.points.add(1)).pow(0.9));
                return ret;
            },
            unlocked() { return player.incrementy_q.challenges[12]; },
            effectDisplay() { return "/"+format(this.effect()) },
        },
    },
});

addLayer("incrementy_q", {
    name: "夸克层",
    symbol: "Q",
    position: 4,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#A40130",
    requires(){
        if(player.incrementy_sp.best.gte(3))return new Decimal(1);
        return new Decimal("1e500");
    },
    resource: "夸克",
    baseResource: "粒子",
    baseAmount() {return player.incrementy_p.points},
    type: "normal",
    exponent() {
        ret = new Decimal(0.5)
        if(hasUpgrade("incrementy_s",35))ret = ret.mul(2)
        return ret
    },
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("incrementy_p",32))mult = mult.mul(buyableEffect("incrementy_p",12));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 1,
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(16) && (!player.incrementy_pi.hidelayers);},
    doReset(l){
        if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || !l.startsWith("incrementy_")){return;}
        layerDataReset("incrementy_q",["upgrades","milestones","challenges"]);
        return;
    },
    resetsNothing: true,
    passiveGeneration(){
        if(player.incrementy_sp.best.gte(3)&&hasUpgrade("incrementy_q",11))return 1e4;
        if(hasUpgrade("incrementy_s",11)&&hasUpgrade("incrementy_q",11))return 100;
        if(hasUpgrade("incrementy_q",11))return 1;
        return 0;
    },
    upgrades: {
        rows: 2,
        cols: 5,
        11: {
            title: "夸克升级11",
            description(){return "每秒获得"+(player.incrementy_sp.best.gte(3)?"1e6":hasUpgrade("incrementy_s",11)?10000:100)+"%夸克获取"},
            cost: new Decimal(15),
            unlocked() { return true; },
        },
        12: {
            title: "夸克升级12",
            description: "解锁夸克挑战",
            cost: new Decimal(1e10),
            unlocked() { return player.tm.buyables[5].gte(17); },
        },
        13: {
            title: "夸克升级13",
            description: "解锁夸克挑战",
            cost: new Decimal(1e35),
            unlocked() { return player.tm.buyables[5].gte(17); },
        },
        14: {
            title: "夸克升级14",
            description: "夸克提升经典声望树中的声望点数获取",
            cost: new Decimal(1e190),
            effect() {
                let ret = Decimal.log10(player.incrementy_q.points.add(1)).pow(2e4);
                if(player.incrementy_q.points.gte("1e5000"))ret = player.incrementy_q.points.pow(55);
                return ret;
            },
            unlocked() { return player.tm.buyables[5].gte(17); },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        15: {
            title: "夸克升级15",
            description: "解锁夸克挑战",
            cost: new Decimal(1e192),
            unlocked() { return player.tm.buyables[5].gte(18); },
        },
    },
    challenges: {
        rows: 2,
        cols: 2,
        11: {
            name: "儿子", 
            challengeDescription: "增量获取平方根化",
            rewardDescription: "解锁一些增量升级",
            unlocked(){
                return hasUpgrade("incrementy_q",12);
            },
            currencyDisplayName: "增量",
            currencyInternalName: "5",
            currencyLayer: "modpoints",
            goal(){
                let exp = layers.incrementy_q.getChallGoalExp()
                return Decimal.pow(10, 50000).pow(exp)
            },
        },
        12: {
            name: "太阳", 
            challengeDescription: "增量获取立方根化",
            rewardDescription: "解锁一些胶子升级",
            unlocked(){
                return hasUpgrade("incrementy_q",13);
            },
            currencyDisplayName: "增量",
            currencyInternalName: "5",
            currencyLayer: "modpoints",
            goal(){
                let exp = layers.incrementy_q.getChallGoalExp()
                return Decimal.pow(10, 37800).pow(exp)
            },
        },
        21: {
            name: "极点", 
            challengeDescription: "增量获取五次方根化",
            rewardDescription: "解锁一些反物质升级",
            unlocked(){
                return hasUpgrade("incrementy_q",15);
            },
            currencyDisplayName: "增量",
            currencyInternalName: "5",
            currencyLayer: "modpoints",
            goal(){
                let exp = layers.incrementy_q.getChallGoalExp()
                return Decimal.pow(10, 28838).pow(exp)
            },
        },
        22: {
            name: "投票", 
            challengeDescription: "增量获取四次方根化",
            rewardDescription: "解锁一些粒子升级",
            unlocked(){
                return hasUpgrade("incrementy_am",34);
            },
            currencyDisplayName: "增量",
            currencyInternalName: "5",
            currencyLayer: "modpoints",
            goal(){
                let exp = layers.incrementy_q.getChallGoalExp()
                return Decimal.pow(10, 44000).pow(exp)
            },
        },
    },
    getChallGoalExp(){
        let q = player.incrementy_q.points
        if (q.gt(100)) q = q.log10().times(50)
        if (q.gt(1e4)) q = q.log10().times(2.5).pow(4)
        if (q.gt(1e10)) q = q.log10().pow(10)
        return q.plus(10).log10().plus(9).log10().pow(-1)
    },
});


addLayer("incrementy_s", {
    name: "碎片层",
    symbol: "S",
    position: 4,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#1346DF",
    requires(){
        if(player.incrementy_sp.best.gte(8))return new Decimal(1);
        return new Decimal("1e1450");
    },
    resource: "碎片",
    baseResource: "粒子",
    baseAmount() {return player.incrementy_p.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        mult = mult.times(layers.incrementy_sp.challenges[12].rewardEffect());
        if(hasUpgrade("incrementy_s",31))mult=mult.mul(upgradeEffect("incrementy_s",31));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    branches: ["incrementy_p"],
    row: 3,
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(19)},
    doReset(l){
        if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || l=="incrementy_a" || l=="incrementy_e" || l=="incrementy_n" || l=="incrementy_g" || l=="incrementy_q" || l=="incrementy_p" || l=="incrementy_s" || !l.startsWith("incrementy_")){return;}
        layerDataReset("incrementy_s",["upgrades","milestones","challenges"]);
        return;
    },
    getResetGain() {
        let ret=player.incrementy_p.points;
        if(hasUpgrade("incrementy_sp",12)){
            ret=Decimal.pow(10,ret.add(10).log10().pow(hasUpgrade("incrementy_sp",14)?0.3:0.25)).mul(tmp.incrementy_s.gainMult).floor();
            return ret;
        }
        if(player.incrementy_sp.best.gte(8))return ret.add(10).log10().pow(hasUpgrade("incrementy_s",41)?2:1).mul(tmp.incrementy_s.gainMult).floor();
        if(ret.lt("1e1450"))return new Decimal(0);
        if(hasUpgrade("incrementy_b",15))ret = ret.log10().pow(hasUpgrade("incrementy_s",41)?2:1).mul(tmp.incrementy_s.gainMult).floor();
        else ret=ret.div("1e1440").log10().div(10).pow(0.5).mul(tmp.incrementy_s.gainMult).floor();
        return ret;
    },
    getNextAt() {
        let ret=tmp.incrementy_s.getResetGain.plus(1);
        ret=ret.div(tmp.incrementy_s.gainMult);
        if(hasUpgrade("incrementy_sp",12)){
            ret=Decimal.pow(10,ret.log10().pow(hasUpgrade("incrementy_sp",14)?(10/3):4));
            return ret;
        }
        if(hasUpgrade("incrementy_b",15)||player.incrementy_sp.best.gte(8)){
            ret=Decimal.pow(10,ret.pow(1/(hasUpgrade("incrementy_s",41)?2:1)));
            return ret;
        }
        ret=ret.pow(2).mul(10);
        ret=Decimal.pow(10,ret).mul("1e1440");
        return ret;
    },
    effect(){
        if(!player.incrementy_s.unlocked)return new Decimal(1);
        let eff1 = player.incrementy_s.points.add(1).pow(10).max(10000);
        return eff1
    },
    effectDescription(){
        let eff = layers.incrementy_s.effect()
        return "将"+(hasUpgrade("incrementy_s",32)?"基础":"")+"增量获取乘以" + format(eff) + (player.incrementy_s.best.lt(100)?"。至少需要完成一次碎片重置才能获得10,000倍效果":"")
    },
    
    upgrades: {
        rows: 4,
        cols: 5,
        11: {
            title: "碎片升级11",
            description: "自动购买中微子可购买项。粒子/中微子/胶子/夸克升级11效果×100",
            cost: new Decimal(1),
            unlocked() { return true; },
        },
        12: {
            title: "碎片升级12",
            description: "自动购买粒子可购买项。中微子生成基数+0.9",
            cost: new Decimal(3),
            unlocked() { return true; },
        },
        13: {
            title: "碎片升级13",
            description: "碎片升级添加到所有中微子可购买项",
            cost: new Decimal(10),
            unlocked() { return true; },
        },
        14: {
            title: "碎片升级14",
            description: "粒子碰撞添加到中微子可购买项第二列",
            cost: new Decimal(30),
            unlocked() { return true; },
        },
        15: {
            title: "碎片升级15",
            description: "粒子模拟添加到中微子可购买项第三列",
            cost: new Decimal(100),
            unlocked() { return true; },
        },
        21: {
            title: "碎片升级21",
            description: "碎片升级添加到所有粒子可购买项",
            cost: new Decimal(20),
            unlocked() { return player.tm.buyables[5].gte(20); },
        },
        22: {
            title: "碎片升级22",
            description: "粒子碰撞添加到粒子加速",
            cost: new Decimal(60),
            unlocked() { return player.tm.buyables[5].gte(20); },
        },
        23: {
            title: "碎片升级23",
            description: "粒子模拟添加到粒子碰撞",
            cost: new Decimal(150),
            unlocked() { return player.tm.buyables[5].gte(20); },
        },
        24: {
            title: "碎片升级24",
            description: "增量耐力减速开始推迟5级(55 -> 60)",
            cost: new Decimal(200),
            unlocked() { return player.tm.buyables[5].gte(20); },
        },
        25: {
            title: "碎片升级25",
            description(){return "每秒获得"+(player.incrementy_sp.best.gte(8)?"1e6":100)+"%碎片获取"},
            cost: new Decimal(300),
            unlocked() { return player.tm.buyables[5].gte(20); },
        },
        31: {
            title: "碎片升级31",
            description: "每个玻色子挑战完成使碎片获取翻倍",
            cost: new Decimal(2e6),
            effect() {
                let ret = Decimal.pow(2,layers.incrementy_b.getBChallengeTotal());
                return ret;
            },
            unlocked() { return player.tm.buyables[5].gte(21); },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        32: {
            title: "碎片升级32",
            description: "碎片效果在增量耐力之前应用",
            cost: new Decimal(2e7),
            unlocked() { return player.tm.buyables[5].gte(21); },
        },
        33: {
            title: "碎片升级33",
            description: "玻色子获取更好",
            cost: new Decimal(6e7),
            unlocked() { return player.tm.buyables[5].gte(21); },
        },
        34: {
            title: "碎片升级34",
            description: "增量耐力减速开始推迟1级(60 -> 61)",
            cost: new Decimal(1.5e8),
            unlocked() { return player.tm.buyables[5].gte(21); },
        },
        35: {
            title: "碎片升级35",
            description: "基础夸克获取平方化",
            cost: new Decimal(5e8),
            unlocked() { return player.tm.buyables[5].gte(21); },
        },
        41: {
            title: "碎片升级41",
            description: "碎片获取更好",
            cost: new Decimal(1e13),
            unlocked() { return player.tm.buyables[5].gte(25); },
        },
        42: {
            title: "碎片升级42",
            description: "降低玻色子挑战目标",
            cost: new Decimal(5e19),
            unlocked() { return player.tm.buyables[5].gte(25); },
        },
        43: {
            title: "碎片升级43",
            description: "反物质获取更好",
            cost: new Decimal(2e20),
            unlocked() { return player.tm.buyables[5].gte(25); },
        },
        44: {
            title: "碎片升级44",
            description: "降低玻色子挑战目标",
            cost: new Decimal(2e20),
            unlocked() { return player.tm.buyables[5].gte(26); },
        },
        45: {
            title: "碎片升级45",
            description: "降低玻色子挑战目标",
            cost: new Decimal(2e20),
            unlocked() { return player.tm.buyables[5].gte(27); },
        },
    },
    passiveGeneration(){
        if(player.incrementy_sp.best.gte(8)&&hasUpgrade("incrementy_s",25))return 1e4;
        if(hasUpgrade("incrementy_s",25))return 1;
        return 0;
    }
});

addLayer("incrementy_b", {
    name: "玻色子层",
    symbol: "B",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#D346DF",
    requires(){
        if(player.incrementy_sp.best.gte(5))return new Decimal(1);
        return new Decimal("1e4000");
    },
    resource: "玻色子",
    baseResource: "粒子",
    baseAmount() {return player.incrementy_p.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("incrementy_b",14))mult=mult.mul(upgradeEffect("incrementy_b",14));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    getResetGain() {
        let ret=player.incrementy_p.points;
        if(hasUpgrade("incrementy_sp",12)){
            ret=Decimal.pow(10,ret.add(10).log10().pow(hasMilestone("incrementy_o",5)?0.43:hasUpgrade("incrementy_sp",14)?0.4:0.3)).mul(tmp.incrementy_b.gainMult).floor();
            return ret;
        }
        if(player.incrementy_sp.best.gte(5)){
            ret=ret.add(10).log10().div(2).pow(hasUpgrade("incrementy_s",33)?2:1.5).mul(tmp.incrementy_b.gainMult).floor();
            return ret;
        }
        if(ret.lt("1e4000"))return new Decimal(0);
        ret=ret.div("1e3900").log10().div(2).pow(hasUpgrade("incrementy_s",33)?2:1.5).mul(tmp.incrementy_b.gainMult).floor();
        return ret;
    },
    getNextAt() {
        let ret=tmp.incrementy_b.getResetGain.plus(1);
        ret=ret.div(tmp.incrementy_b.gainMult);
        if(hasUpgrade("incrementy_sp",12)){
            ret=Decimal.pow(10,ret.log10().pow(10/(hasMilestone("incrementy_o",5)?4.3:hasUpgrade("incrementy_sp",14)?4:3)));
            return ret;
        }
        ret=ret.pow(1/(hasUpgrade("incrementy_s",33)?2:1.5)).mul(2);
        if(player.incrementy_sp.best.gte(5)){
            ret=Decimal.pow(10,ret);
        }else ret=Decimal.pow(10,ret).mul("1e3900");
        return ret;
    },
    branches: ["incrementy_p", "incrementy_g", "incrementy_q"],
    row: 0,
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(21) && (!player.incrementy_pi.hidelayers)},
    doReset(l){
        if(l=="incrementy_i" || l=="incrementy_b" || !l.startsWith("incrementy_")){return;}
        layerDataReset("incrementy_b",["upgrades","milestones","challenges"]);
        return;
    },
    upgrades: {
        rows: 3,
        cols: 5,
        11: {
            title: "玻色子升级11",
            description(){return "每秒获得"+(player.incrementy_sp.best.gte(5)?"1e6":100)+"%玻色子获取"},
            cost: new Decimal(15),
            unlocked() { return true; },
        },
        12: {
            title: "玻色子升级12",
            description: "解锁玻色子挑战",
            cost: new Decimal(50000),
            unlocked() { return true; },
        },
        13: {
            title: "玻色子升级13",
            description: "移除增量升级31上限",
            cost: new Decimal(500000),
            unlocked() { return true; },
        },
        14: {
            title: "玻色子升级14",
            description: "每个玻色子挑战完成使玻色子获取翻倍",
            cost: new Decimal(1500000),
            effect() {
                let ret = Decimal.pow(2,layers.incrementy_b.getBChallengeTotal());
                return ret;
            },
            unlocked() { return true; },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        15: {
            title: "玻色子升级15",
            description: "解锁玻色子挑战，并使碎片获取更好",
            cost: new Decimal(1e7),
            unlocked() { return true; },
        },
        21: {
            title: "玻色子升级21",
            description: "增量耐力减速开始推迟2级(61 -> 63)",
            cost: new Decimal(1e10),
            unlocked() { return player.tm.buyables[5].gte(22); },
        },
        22: {
            title: "玻色子升级22",
            description: "增量强度在增量耐力之前应用",
            cost: new Decimal(3e10),
            unlocked() { return player.tm.buyables[5].gte(22); },
        },
        23: {
            title: "玻色子升级23",
            description: "将玻色子上限提高到20，并解锁第三个挑战",
            cost: new Decimal(3e11),
            unlocked() { return player.tm.buyables[5].gte(22); },
        },
        24: {
            title: "玻色子升级24",
            description: "反物质获取公式更好",
            cost: new Decimal(3e12),
            unlocked() { return player.tm.buyables[5].gte(22); },
        },
        25: {
            title: "玻色子升级25",
            description: "增量耐力减速开始推迟2级(63 -> 65)",
            cost: new Decimal(1e13),
            unlocked() { return player.tm.buyables[5].gte(22); },
        },
        31: {
            title: "玻色子升级31",
            description: "玻色子升级添加到所有粒子可购买项",
            cost: new Decimal(1e14),
            unlocked() { return player.tm.buyables[5].gte(23); },
        },
        32: {
            title: "玻色子升级32",
            description: "解锁最终玻色子挑战",
            cost: new Decimal(2e15),
            unlocked() { return player.tm.buyables[5].gte(23); },
        },
        33: {
            title: "玻色子升级33",
            description: "玻色子挑战1完成数添加到所有粒子可购买项",
            cost: new Decimal(1e18),
            unlocked() { return player.tm.buyables[5].gte(24); },
        },
        34: {
            title: "玻色子升级34",
            description: "玻色子挑战2-4完成数添加到所有粒子可购买项",
            cost: new Decimal(3e18),
            unlocked() { return player.tm.buyables[5].gte(24); },
        },
        35: {
            title: "玻色子升级35",
            description: "增量耐力减速开始推迟5级(65 -> 70)",
            cost: new Decimal(1e19),
            unlocked() { return player.tm.buyables[5].gte(24); },
        },
    },
    passiveGeneration(){
        if(player.incrementy_sp.best.gte(5)&&hasUpgrade("incrementy_b",11))return 1e4;
        if(hasUpgrade("incrementy_b",11))return 1;
        return 0;
    },
    resetsNothing: true,
    effect(){
        let amt = player.incrementy_b.points
        let ret = amt.times(9).plus(1).log10()
        if(hasUpgrade("incrementy_sp",23))return ret;
        if (hasUpgrade("incrementy_b", 23)) {
            if (ret.gt(20)) ret = ret.times(5).log10().pow(4).times(1.25)
        } else if (ret.gt(10)) ret = ret.log10().times(10)
        return ret
    },
    effectDescription(){
        let a = "将"+(hasUpgrade("incrementy_pi",24)?"基础":"")+"增量获取乘以变形虫^" + format(layers.incrementy_b.effect().div(hasUpgrade("incrementy_pi",24)?9:1)) + "倍"
        return a 
    },
    
    tabFormat: [
        "main-display", "prestige-button", "resource-display",
        ["display-text", "开始挑战会重置玻色子和增量"],
        "upgrades","challenges"
    ],
    
    getBChallengeTotal(){
        return challengeCompletions("incrementy_b", 11) + challengeCompletions("incrementy_b", 12) + challengeCompletions("incrementy_b", 21) + challengeCompletions("incrementy_b", 22);
    },
    challenges:{
        rows: 2,
        cols: 2,
        11: {
            name: "存在", 
            challengeDescription: "增量耐力效果变为线性而非指数",
            rewardDescription: "基于玻色子挑战完成总数提升增量强度基础和中微子生成基础",
            rewardEffect(){
                let tot = new Decimal(layers.incrementy_b.getBChallengeTotal() + 1)
                let comps = challengeCompletions("incrementy_b", 11)

                if (tot.gt(3) && !hasUpgrade("incrementy_sp", 15)) tot = tot.log(3).plus(2)
                if (tot.gt(4) && !hasUpgrade("incrementy_sp", 15)) tot = tot.log(4).plus(3)
                    
                if (comps >= 4 && !hasUpgrade("incrementy_sp", 15)) comps = Math.log10(comps * 33 + 1) + 1

                let ret = Decimal.pow(tot, comps).minus(1)

                if (ret.gt(50)) ret = ret.times(2).log10().times(25)

                return ret
            },
            rewardDisplay(){
                let comps = "因为你已完成" + formatWhole(challengeCompletions("incrementy_b", 11)) + "/"+layers.incrementy_b.challenges[22].completionLimit()+"次挑战，"
                let eff = "基础增加" + format(layers.incrementy_b.challenges[11].rewardEffect()) + ""
                return comps + eff
            },
            unlocked(){
                return hasUpgrade("incrementy_b",12);
            },
            goal(){
                let comps = challengeCompletions("incrementy_b", 11)
                if(comps>=60)return Decimal.pow(10,(comps**7)/(100-comps));
                if(comps>=40)return Decimal.pow(10,(comps**6)/(60-comps));
                if(comps>=20)return Decimal.pow(10,(comps**5)*2);
                if(hasUpgrade("incrementy_s",42)||comps>=10)return Decimal.pow(10,200000+comps*comps*15000);
                let base = 286000
                base += comps * comps * comps * 2000
                return Decimal.pow(10, base)
            },
            currencyDisplayName: "增量",
            currencyInternalName: "5",
            currencyLayer: "modpoints",
            completionLimit(){
                let ret=10;
                if(hasUpgrade("incrementy_sp",11))ret+=(player.incrementy_sp.upgrades||[]).length;
                if(hasUpgrade("incrementy_sp",11)&&hasUpgrade("incrementy_sp",31))ret+=(player.incrementy_sp.upgrades||[]).length;
                if(hasMilestone("incrementy_o",5))ret+=10;
                return ret;
            },
        },
        12: {
            name: "容器", 
            challengeDescription() {
                return "基础增量获取可购买项基数提高到" + format(new Decimal(2).div(3 + challengeCompletions("incrementy_b", 12)), 3)
            },
            rewardDescription: "增量耐力为中微子速度提供免费等级",
            rewardEffect(){
                let comps = challengeCompletions("incrementy_b", 12)

                let ret = Decimal.pow(comps + 8, 1.5).times(2)

                if (comps == 0) ret = new Decimal(0)

                return ret
            },
            rewardDisplay(){
                let comps = "因为你已完成" + formatWhole(challengeCompletions("incrementy_b", 12)) + "/"+layers.incrementy_b.challenges[22].completionLimit()+"次挑战，"
                let eff = "每耐力等级获得" + format(layers.incrementy_b.challenges[12].rewardEffect()) + "个免费速度等级"
                return comps + eff
            },
            unlocked(){
                return hasUpgrade("incrementy_b",15);
            },
            goal(){
                let comps = challengeCompletions("incrementy_b", 12)
                if(comps>=60)return Decimal.pow(10,(comps**7)/(100-comps));
                if(comps>=40)return Decimal.pow(10,(comps**6)/(60-comps));
                if(comps>=20)return Decimal.pow(10,(comps**5)*2);
                if(hasUpgrade("incrementy_s",42)||comps>=10)return Decimal.pow(10,200000+comps*comps*15000);
                let base = 614000
                base += comps * 22000
                if (comps >= 3)base += (comps-2) * (comps-2) * 12500
                return Decimal.pow(10, base)
            },
            currencyDisplayName: "增量",
            currencyInternalName: "5",
            currencyLayer: "modpoints",
            completionLimit(){
                let ret=10;
                if(hasUpgrade("incrementy_sp",11))ret+=(player.incrementy_sp.upgrades||[]).length;
                if(hasUpgrade("incrementy_sp",11)&&hasUpgrade("incrementy_sp",31))ret+=(player.incrementy_sp.upgrades||[]).length;
                if(hasMilestone("incrementy_o",5))ret+=10;
                return ret;
            },
        },
        21: {
            name: "乐队", 
            challengeDescription: "基础增量获取可购买项基数为1",
            rewardDescription: "夸克数量的对数提升变形虫获取",
            rewardEffect(){
                let comps = challengeCompletions("incrementy_b", 21)

                let ret = Decimal.pow(comps * 5 + 11, 1.5)

                if (comps == 0) ret = new Decimal(0)

                return ret
            },
            rewardDisplay(){
                let comps = "因为你已完成" + formatWhole(challengeCompletions("incrementy_b", 21)) + "/"+layers.incrementy_b.challenges[22].completionLimit()+"次挑战，"
                let eff = "获得log10(夸克)^" + format(layers.incrementy_b.challenges[21].rewardEffect()) + "倍的变形虫获取"
                return comps + eff
            },
            unlocked(){
                return hasUpgrade("incrementy_b",23);
            },
            goal(){
                let comps = challengeCompletions("incrementy_b", 21)
                if(comps>=60)return Decimal.pow(10,(comps**7)/(100-comps));
                if(comps>=40)return Decimal.pow(10,(comps**6)/(60-comps));
                if(comps>=20)return Decimal.pow(10,(comps**5)*2);
                if(hasUpgrade("incrementy_s",42)||comps>=10)return Decimal.pow(10,200000+comps*comps*15000);
                let base = 926000
                base += comps * 66000
                if (comps >= 5)base += (comps-4) * (comps-4) * 25000
                return Decimal.pow(10, base)
            },
            currencyDisplayName: "增量",
            currencyInternalName: "5",
            currencyLayer: "modpoints",
            completionLimit(){
                let ret=10;
                if(hasUpgrade("incrementy_sp",11))ret+=(player.incrementy_sp.upgrades||[]).length;
                if(hasUpgrade("incrementy_sp",11)&&hasUpgrade("incrementy_sp",31))ret+=(player.incrementy_sp.upgrades||[]).length;
                if(hasMilestone("incrementy_o",5))ret+=10;
                return ret;
            },
        },
        22: {
            name: "禁止", 
            challengeDescription: "同时处于前三个挑战中",
            rewardDescription: "提升粒子生成基础，并获得额外粒子模拟等级",
            rewardEffect(){
                let comps = challengeCompletions("incrementy_b", 22)

                let ret = Decimal.pow(comps, 2).plus(comps).sub(1);

                if (comps == 0) ret = new Decimal(0)

                return [ret, comps * (comps + 3) / 2 + comps * 4]
            },
            rewardDisplay(){
                let comps = "因为你已完成" + formatWhole(challengeCompletions("incrementy_b", 22)) + "/"+layers.incrementy_b.challenges[22].completionLimit()+"次挑战，"
                let eff = "粒子生成基础+" + format(layers.incrementy_b.challenges[22].rewardEffect()[0]) + "，"
                let eff2 =  "并获得" + formatWhole(layers.incrementy_b.challenges[22].rewardEffect()[1]) + "个额外粒子模拟等级"
                return comps + eff + eff2
            },
            unlocked(){
                return hasUpgrade("incrementy_b",32);
            },
            goal(){
                let comps = challengeCompletions("incrementy_b", 22)
                if(comps>=60)return Decimal.pow(10,(comps**7)/(100-comps));
                if(comps>=40)return Decimal.pow(10,(comps**6)/(60-comps));
                if(comps>=20)return Decimal.pow(10,(comps**5)*2);
                if(hasUpgrade("incrementy_s",45)||comps>=10)return Decimal.pow(10,200000+comps*comps*15000);
                if(hasUpgrade("incrementy_s",44))return Decimal.pow(10,890000+comps*comps*15000);
                if(hasUpgrade("incrementy_s",42))return Decimal.pow(10,1000000+comps*comps*15000);
                let base = 624000
                base += comps ** 2 * 20000
                base += comps * 66000
                return Decimal.pow(10, base)
            },
            currencyDisplayName: "增量",
            currencyInternalName: "5",
            currencyLayer: "modpoints",
            completionLimit(){
                let ret=10;
                if(hasUpgrade("incrementy_sp",11))ret+=(player.incrementy_sp.upgrades||[]).length;
                if(hasUpgrade("incrementy_sp",11)&&hasUpgrade("incrementy_sp",31))ret+=(player.incrementy_sp.upgrades||[]).length;
                if(hasMilestone("incrementy_o",5))ret+=10;
                return ret;
            },
            countsAs: [11, 12, 21],
        },
    },
});

addLayer("incrementy_sp", {
    name: "超级声望层",
    symbol: "SP",
    position: 2,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        chall1points: new Decimal(0),
        chall2points: new Decimal(0),
        chall3points: new Decimal(0),
        chall4points: new Decimal(0),
    }},
    color: "#1CA2E8",
    requires: new Decimal(1e20),
    resource: "超级声望点数",
    baseResource: "碎片",
    baseAmount() {return player.incrementy_s.points},
    branches: ["incrementy_s"],
    type: "normal",
    gainMult() {
        mult = new Decimal(1)
        mult = mult.times(layers.incrementy_sp.challenges[11].rewardEffect());
        if(player.milestone_m.best.gte(5))mult = mult.mul(tmp.milestone_m.milestone5Effect);
        if(hasUpgrade("incrementy_sp",51))mult=mult.mul(upgradeEffect("incrementy_sp",51));
        if(hasUpgrade("incrementy_a",35))mult=mult.mul(upgradeEffect("incrementy_a",35));
        if(hasUpgrade("incrementy_m",35))mult=mult.mul(upgradeEffect("incrementy_m",35));
        if(hasUpgrade("incrementy_pi",11))mult=mult.mul(upgradeEffect("incrementy_pi",11));
        mult = mult.times(layers.incrementy_o.effect());
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    getResetGain() {
        let ret=player.incrementy_s.points;
        if(ret.lt("1e20"))return new Decimal(0);
        if(hasUpgrade("incrementy_pi",22)){
            ret=Decimal.pow(10,ret.add(10).log10().pow(0.4)).mul(tmp.incrementy_sp.gainMult).floor();
            return ret;
        }
        ret=ret.log10().div(20).pow(2).mul(tmp.incrementy_sp.gainMult).floor();
        return ret;
    },
    getNextAt() {
        let ret=tmp.incrementy_sp.getResetGain.plus(1);
        ret=ret.div(tmp.incrementy_sp.gainMult);
        if(hasUpgrade("incrementy_pi",22)){
            ret=Decimal.pow(10,ret.log10().pow(10/4));
            return ret;
        }
        ret=ret.pow(1/(2)).mul(20);
        ret=Decimal.pow(10,ret);
        return ret;
    },
    row: 3,
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(28)},
    doReset(l){
        if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || l=="incrementy_a" || l=="incrementy_e" || l=="incrementy_n" || l=="incrementy_g" || l=="incrementy_q" || l=="incrementy_p" || l=="incrementy_s" || l=="incrementy_sp" || !l.startsWith("incrementy_")){return;}
        layerDataReset("incrementy_sp",["upgrades","milestones","challenges","chall1points","chall2points","chall3points","chall4points"]);
        return;
    },
    effect(){
        if(player.tm.buyables[5].lte(28))return new Decimal(0);
        let amt = player.incrementy_sp.points
        let ret = amt.add(10).log10().mul(Decimal.pow(1.1,player.tm.buyables[5])).div(5);
        if(ret.gte(20))ret = ret.div(20).sqrt().mul(20);
        if(ret.gte(84))ret = ret.add(16).log10().mul(42);
        return ret
    },
    effectDescription(){
        let a = "将增量耐力减速开始推迟" + format(layers.incrementy_sp.effect()) + "级(基于此树等级)"
        return a 
    },
    milestones: {
        1: {
            requirementDescription: "<b>蟾蜍</b><br>需要: 2超级声望点数",
            effectDescription: "反物质/变形虫/物质/能量需求为1。反物质/变形虫被动获取×1e4，物质/能量被动获取×100",
            done(){
                return player.incrementy_sp.best.gte(2)
            },
        },
        2: {
            requirementDescription: "<b>脚趾</b><br>需要: 3超级声望点数",
            effectDescription: "粒子/中微子/胶子/夸克需求为1。被动获取×100",
            done(){
                return player.incrementy_sp.best.gte(3)
            },
        },
        3: {
            requirementDescription: "<b>拖曳</b><br>需要: 5超级声望点数",
            effectDescription: "玻色子需求为1。被动获取×1e4",
            done(){
                return player.incrementy_sp.best.gte(5)
            },
        },
        4: {
            requirementDescription: "<b>等待</b><br>需要: 8超级声望点数",
            effectDescription: "碎片需求为1。被动获取×1e4",
            done(){
                return player.incrementy_sp.best.gte(8)
            },
        },
        5: {
            requirementDescription: "<b>重量</b><br>需要: 13超级声望点数",
            effectDescription: "增量升级13效果更好",
            done(){
                return player.incrementy_sp.best.gte(13)
            },
        },
    },
    challenges:{
        rows: 2,
        cols: 2,
        11: {
            name: "石英",
            challengeDescription: "所有中微子可购买项基数设为1",
            rewardDescription: "挑战点数提升超级声望点数获取",
            rewardEffect(){
                let comps = challengeCompletions("incrementy_sp", 11)
                
                let pts = player.incrementy_sp.chall1points

                let exp = Decimal.div(5, 11-Math.sqrt(comps))
                if (hasUpgrade("incrementy_sp", 43)) exp = exp.times(2)

                return Decimal.pow(pts.plus(1), exp)
            },
            rewardDisplay(){
                let comps = "因为你拥有" + formatWhole(player.incrementy_sp.chall1points) + "挑战点数"
                comps += "并完成" + formatWhole(challengeCompletions("incrementy_sp", 11)) + "/100次挑战，"
                let eff = "获得" + format(layers.incrementy_sp.challenges[11].rewardEffect()) + "倍超级声望点数"
                return comps + eff
            },
            unlocked(){
                return player.tm.buyables[5].gte(29);
            },
            goal(initial = false){
                let comps = challengeCompletions("incrementy_sp", 11)
                let init = hasUpgrade("incrementy_pi", 44) ? 1 : hasUpgrade("incrementy_sp", 41) ? 20 : 21
                let exp = initial ? init : init + comps
                return Decimal.pow(10, Decimal.pow(2, exp))
            },
            currencyDisplayName: "增量",
            currencyInternalName: "5",
            currencyLayer: "modpoints",
            completionLimit: 100,
        },
        12: {
            name: "夸脱",
            challengeDescription: "中微子获取提高到0.01次方",
            rewardDescription: "挑战点数提升碎片获取",
            rewardEffect(){
                let comps = challengeCompletions("incrementy_sp", 12)
                
                let pts = player.incrementy_sp.chall2points

                let exp = pts.sqrt().min(10 + comps * 3);
                if(hasUpgrade("incrementy_pi", 45))exp = new Decimal(10 + comps * 3);

                let ret = Decimal.pow(pts.plus(1), exp)

                if(hasUpgrade("incrementy_pi", 45))return ret;
                ret = ret.log10().add(1);
                return ret
            },
            rewardDisplay(){
                let comps = "因为你拥有" + formatWhole(player.incrementy_sp.chall2points) + "挑战点数"
                comps += "并完成" + formatWhole(challengeCompletions("incrementy_sp", 12)) + "/100次挑战，"
                let eff = "获得" + format(layers.incrementy_sp.challenges[12].rewardEffect()) + "倍碎片获取"
                return comps + eff
            },
            unlocked(){
                return hasUpgrade("incrementy_sp", 35);
            },
            goal(initial = false){
                let comps = challengeCompletions("incrementy_sp", 12)
                let init = hasUpgrade("incrementy_pi", 44) ? 1 : hasUpgrade("incrementy_sp", 41) ? 27 : 31
                let exp = initial ? init : init + comps
                return Decimal.pow(10, Decimal.pow(2, exp))
            },
            currencyDisplayName: "增量",
            currencyInternalName: "5",
            currencyLayer: "modpoints",
            completionLimit: 100,
        },
        21: {
            name: "珠宝",
            challengeDescription: "增量耐力减速从1级开始",
            rewardDescription: "挑战点数提升能量到反物质的协同效果",
            rewardEffect(){
                let comps = challengeCompletions("incrementy_sp", 21)

                if (comps == 0) return new Decimal(1)

                let pts = player.incrementy_sp.chall3points.div(1000)

                let effpts = pts.pow(1 - .8/Math.sqrt(comps))
                let ret = Decimal.minus(Decimal.div(1, effpts.plus(10).log10()), 1).times(-1).add(1)

                if (hasUpgrade("incrementy_pi", 12)) ret = ret.sub(1).sqrt().add(1)
                return ret
            },
            rewardDisplay(){
                let comps = "因为你拥有" + formatWhole(player.incrementy_sp.chall3points) + "挑战点数，"
                comps += "并完成" + formatWhole(challengeCompletions("incrementy_sp", 21)) + "/100次挑战，"
                let eff = "能量^" + format(layers.incrementy_sp.challenges[21].rewardEffect().sub(1), 4) + "倍提升反物质获取"
                return comps + eff
            },
            unlocked(){
                return player.tm.buyables[5].gte(34);
            },
            goal(initial = false){
                let comps = challengeCompletions("incrementy_sp", 21)
                let init = hasMilestone("incrementy_o",1) ? 1 : hasUpgrade("incrementy_sp", 41) ? 20 : 21
                let exp = initial ? init : init + comps
                return Decimal.pow(10, Decimal.pow(2, exp))
            },
            currencyDisplayName: "增量",
            currencyInternalName: "5",
            currencyLayer: "modpoints",
            completionLimit: 100,
        },
        22: {
            name: "焦耳",
            challengeDescription: "增量获取提高到0.01次方",
            rewardDescription: "挑战点数提升粒子加速基础",
            rewardEffect(){
                let comps = challengeCompletions("incrementy_sp", 22)

                let pts = player.incrementy_sp.chall4points

                return Decimal.pow(pts.plus(1), comps/10)
            },
            rewardDisplay(){
                let comps = "因为你拥有" + formatWhole(player.incrementy_sp.chall4points) + "挑战点数，"
                comps += "并完成" + formatWhole(challengeCompletions("incrementy_sp", 22)) + "/100次挑战，"
                let eff = "获得" + format(layers.incrementy_sp.challenges[22].rewardEffect()) + "倍粒子加速基础"
                return comps + eff
            },
            unlocked(){
                return player.tm.buyables[5].gte(34);
            },
            goal(initial = false){
                let comps = challengeCompletions("incrementy_sp", 22)
                let init = hasMilestone("incrementy_o",1) ? 1 : hasUpgrade("incrementy_sp", 41) ? 13 : 14
                let exp = initial ? init : init + comps
                return Decimal.pow(10, Decimal.pow(2, exp))
            },
            currencyDisplayName: "增量",
            currencyInternalName: "5",
            currencyLayer: "modpoints",
            completionLimit: 100,
        },
    },
    update(){
        if (inChallenge("incrementy_sp", 11) || hasUpgrade("incrementy_pi", 35)) {
            let base = layers.incrementy_sp.challenges[11].goal(true)
            let pts = player.modpoints[5]
            let diff = player.modpoints[5].max(10).log(10).max(2).log(2).minus(base.log(10).log(2)).max(0)
            player.incrementy_sp.chall1points=player.incrementy_sp.chall1points.max(diff.plus(1).pow(3).minus(1).times(100).floor());
        }
        if (inChallenge("incrementy_sp", 12) || hasUpgrade("incrementy_pi", 35)) {
            let base = layers.incrementy_sp.challenges[12].goal(true)
            let pts = player.modpoints[5]
            let diff = player.modpoints[5].max(10).log(10).max(2).log(2).minus(base.log(10).log(2)).max(0)
            player.incrementy_sp.chall2points=player.incrementy_sp.chall2points.max(diff.plus(1).pow(3).minus(1).times(100).floor());
        }
        
        if(hasUpgrade("incrementy_pi", 44)){
            let target=player.modpoints[5].max(10).log(10).max(2).log(2);
            player.incrementy_sp.challenges[11]=Math.max(player.incrementy_sp.challenges[11],target.floor().min(100).toNumber());
            player.incrementy_sp.challenges[12]=Math.max(player.incrementy_sp.challenges[12],target.floor().min(100).toNumber());
        }
        
        if (inChallenge("incrementy_sp", 21) || hasMilestone("incrementy_o",3)) {
            let base = layers.incrementy_sp.challenges[21].goal(true)
            let pts = player.modpoints[5]
            let diff = player.modpoints[5].max(10).log(10).max(2).log(2).minus(base.log(10).log(2)).max(0)
            player.incrementy_sp.chall3points=player.incrementy_sp.chall3points.max(diff.plus(1).pow(3).minus(1).times(100).floor());
        }
        if (inChallenge("incrementy_sp", 22) || hasMilestone("incrementy_o",3)) {
            let base = layers.incrementy_sp.challenges[22].goal(true)
            let pts = player.modpoints[5]
            let diff = player.modpoints[5].max(10).log(10).max(2).log(2).minus(base.log(10).log(2)).max(0)
            player.incrementy_sp.chall4points=player.incrementy_sp.chall4points.max(diff.plus(1).pow(3).minus(1).times(100).floor());
        }
        
        
        if(hasUpgrade("incrementy_pi", 44) || hasMilestone("incrementy_o",4)){
            let target=player.modpoints[5].max(10).log(10).max(2).log(2);
            player.incrementy_sp.challenges[21]=Math.max(player.incrementy_sp.challenges[21],target.floor().min(100).toNumber());
            player.incrementy_sp.challenges[22]=Math.max(player.incrementy_sp.challenges[22],target.floor().min(100).toNumber());
        }
    },
    
    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "超级声望升级11",
            description(){if(hasUpgrade("incrementy_sp",31))return "每个超级声望升级+2最大玻色子挑战完成数";else return "每个超级声望升级+1最大玻色子挑战完成数"},
            cost: new Decimal(500),
            unlocked() { return player.tm.buyables[5].gte(29); },
        },
        12: {
            title: "超级声望升级12",
            description: "玻色子和碎片获取更好",
            cost: new Decimal(750),
            unlocked() { return player.tm.buyables[5].gte(30); },
        },
        13: {
            title: "超级声望升级13",
            description(){return "每秒获得"+(hasUpgrade("incrementy_sp",24)?"1e6":hasUpgrade("incrementy_sp",22)?10000:100)+"%超级声望点数"},
            cost: new Decimal(1000),
            unlocked() { return player.tm.buyables[5].gte(31); },
        },
        14: {
            title: "超级声望升级14",
            description: "玻色子和碎片获取更好",
            cost: new Decimal(10000),
            unlocked() { return player.tm.buyables[5].gte(31); },
        },
        15: {
            title: "超级声望升级15",
            description: "移除玻色子挑战1奖励中的一些减速上限",
            cost: new Decimal(50000),
            unlocked() { return player.tm.buyables[5].gte(31); },
        },
        21: {
            title: "超级声望升级21",
            description: "反物质获取更好",
            cost: new Decimal(500000),
            unlocked() { return player.tm.buyables[5].gte(31); },
        },
        22: {
            title: "超级声望升级22",
            description: "超级声望升级13效果×100",
            cost: new Decimal(1500000),
            unlocked() { return player.tm.buyables[5].gte(31); },
        },
        23: {
            title: "超级声望升级23",
            description: "移除玻色子效果减速上限",
            cost: new Decimal(5e7),
            unlocked() { return player.tm.buyables[5].gte(31); },
        },
        24: {
            title: "超级声望升级24",
            description: "超级声望升级13效果×100",
            cost: new Decimal(3e8),
            unlocked() { return player.tm.buyables[5].gte(31); },
        },
        25: {
            title: "超级声望升级25",
            description: "基础反物质获取更好(每增量可购买项等级2倍)",
            cost: new Decimal(1e10),
            unlocked() { return player.tm.buyables[5].gte(31); },
        },
        31: {
            title: "超级声望升级31",
            description: "超级声望升级11效果翻倍",
            cost: new Decimal(2e10),
            unlocked() { return player.tm.buyables[5].gte(32); },
        },
        32: {
            title: "超级声望升级32",
            description: "变形虫对反物质的效果更好",
            cost: new Decimal(6e10),
            unlocked() { return player.tm.buyables[5].gte(32); },
        },
        33: {
            title: "超级声望升级33",
            description: "基础变形虫获取更好",
            cost: new Decimal(2e11),
            unlocked() { return player.tm.buyables[5].gte(32); },
        },
        34: {
            title: "超级声望升级34",
            description: "每个超级声望升级将增量耐力减速开始推迟0.1级",
            cost: new Decimal(1e11),
            unlocked() { return player.tm.buyables[5].gte(33); },
        },
        35: {
            title: "超级声望升级35",
            description: "解锁更多超级声望挑战",
            cost: new Decimal(3e11),
            unlocked() { return player.tm.buyables[5].gte(33); },
        },
        41: {
            title: "超级声望升级41",
            description: "降低超级声望挑战目标",
            cost: new Decimal(1e15),
            unlocked() { return player.tm.buyables[5].gte(35); },
        },
        42: {
            title: "超级声望升级42",
            description: "变形虫对增量的效果在增量耐力之前应用",
            cost: new Decimal(3e15),
            unlocked() { return player.tm.buyables[5].gte(35); },
        },
        43: {
            title: "超级声望升级43",
            description: "石英奖励平方化",
            cost: new Decimal(6e15),
            unlocked() { return player.tm.buyables[5].gte(35); },
        },
        44: {
            title: "超级声望升级44",
            description: "变形虫对反物质的效果更好",
            cost: new Decimal(3e18),
            unlocked() { return player.tm.buyables[5].gte(35); },
        },
        45: {
            title: "超级声望升级45",
            description: "基础反物质获取更好(每增量可购买项等级3倍)",
            cost: new Decimal(1e19),
            unlocked() { return player.tm.buyables[5].gte(35); },
        },
        51: {
            title: "超级声望升级51",
            description: "玻色子挑战完成数提升超级声望点数获取",
            cost: new Decimal(2e19),
            effect() {
                let ret = Decimal.pow(1.2,(layers.incrementy_b.getBChallengeTotal())**(hasUpgrade("incrementy_sp",53)?0.75:0.5));
                return ret;
            },
            unlocked() { return player.tm.buyables[5].gte(36); },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        52: {
            title: "超级声望升级52",
            description: "解锁更多变形虫升级",
            cost: new Decimal(3e20),
            unlocked() { return player.tm.buyables[5].gte(36); },
        },
        53: {
            title: "超级声望升级53",
            description: "超级声望升级51效果更好",
            cost: new Decimal(3e23),
            unlocked() { return player.tm.buyables[5].gte(36); },
        },
        54: {
            title: "超级声望升级54",
            description: "增量耐力更便宜",
            cost: new Decimal(1e27),
            unlocked() { return player.tm.buyables[5].gte(37); },
        },
        55: {
            title: "超级声望升级55",
            description: "解锁更多能量升级",
            cost: new Decimal(1e28),
            unlocked() { return player.tm.buyables[5].gte(37); },
        },
    },
    passiveGeneration(){
        if(hasUpgrade("incrementy_sp",13) && hasUpgrade("incrementy_sp",24))return 1e4;
        if(hasUpgrade("incrementy_sp",13) && hasUpgrade("incrementy_sp",22))return 100;
        if(hasUpgrade("incrementy_sp",13))return 1;
        return 0;
    },
});



addLayer("incrementy_pi", {
    name: "π介子层", 
    symbol: "π", 
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        hidelayers: false
    }},
    color: "#EC8241",
    requires: new Decimal(1e30), 
    resource: "π介子",
    baseResource: "超级声望点数",
    baseAmount() {return player.incrementy_sp.points}, 
    branches: ["incrementy_sp"],
    type: "normal", 
    effect(){
        let amt = player.incrementy_pi.points
        let ret = amt.sqrt();
        if(ret.gte(6))ret=ret.add(994).log10().mul(2);
        if(ret.gte(8))ret=ret.mul(512).root(4);
        ret=ret.min(this.effect2());
        
        return ret
    },
    effect2(){
        let amt = new Decimal(4);
        if(player.tm.buyables[5].gte(39))amt = amt.add(2);
        if(player.tm.buyables[5].gte(42))amt = amt.add(2);
        if(hasUpgrade("incrementy_pi",33))amt = amt.add(2);
        if(hasUpgrade("incrementy_o",14))amt = amt.add(2);
        if(hasMilestone("incrementy_o",6))amt = amt.add(2);
        return amt
    },
    effectDescription(){
        let eff = layers.incrementy_pi.effect()
        let eff2 = layers.incrementy_pi.effect2()
        let a = "将增量耐力减速开始推迟" + format(eff) + "级(最大:"+format(eff2)+")";
        return a
    },
    
    gainMult() { 
        mult = new Decimal(1)
        if(hasUpgrade("incrementy_pi",23))mult=mult.mul(upgradeEffect("incrementy_pi",23));
        if(player.milestone_m.best.gte(50))mult = mult.mul(tmp.milestone_m.milestone50Effect);
        mult = mult.times(layers.incrementy_o.effect());
        if(hasMilestone("incrementy_o",6))mult = mult.mul(1e5);
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    getResetGain() {
        let ret=player.incrementy_sp.points;
        if(ret.lt("1e30"))return new Decimal(0);
        if(hasUpgrade("incrementy_pi",21)){
            ret=ret.add(10).log10().div(2).pow(1.5);
        }else{
            ret=ret.log10().div(10).pow(0.5);
        }
        if(hasUpgrade("incrementy_o",15))ret=ret.pow(buyableEffect("incrementy_o",12));
        ret=ret.mul(tmp.incrementy_pi.gainMult).floor();
        return ret;
    },
    getNextAt() {
        let ret=tmp.incrementy_pi.getResetGain.plus(1);
        ret=ret.div(tmp.incrementy_pi.gainMult);
        
        if(hasUpgrade("incrementy_pi",21)){
            ret=ret.pow(1/1.5).mul(2);
        }else{
            ret=ret.pow(2).mul(10);
        }
        ret=Decimal.pow(10,ret).max(1e30);
        return ret;
    },
    upgrades:{
        rows: 5,
        cols: 5,
    },
    row: 3, 
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(38)},
    doReset(l){
        if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || l=="incrementy_a" || l=="incrementy_e" || l=="incrementy_n" || l=="incrementy_g" || l=="incrementy_q" || l=="incrementy_p" ||  l=="incrementy_s" || l=="incrementy_sp" ||  l=="incrementy_pi" || !l.startsWith("incrementy_")){return;}
        layerDataReset("incrementy_pi",["upgrades","milestones","challenges"]);
        return;
    },
    milestones: {
        1: {
            requirementDescription: "<b>1 π介子</b>", 
            effectDescription: "可以隐藏此树中的一些层级(保留I,N,P,S,SP和SP以上的层级)",
            done(){
                return player.incrementy_pi.best.gte(1)
            },
            toggles:[["incrementy_pi","hidelayers"]]
        },
    },
    upgrades: {
        rows: 5,
        cols: 5, 
        11: {
            title: "π介子升级11",
            description: "π介子提升超级声望点数获取",
            cost: new Decimal(30),
            unlocked() { return player.tm.buyables[5].gte(39); },
            effect() {
                let ret = player.incrementy_pi.points.pow(2).add(1);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        }, 
        12: {
            title: "π介子升级12",
            description: "平方根化宝石指数(增强效果!)",
            cost: new Decimal(40),
            unlocked() { return player.tm.buyables[5].gte(39); },
        }, 
        13: {
            title: "π介子升级13",
            description: "增量升级12效果更好",
            cost: new Decimal(50),
            unlocked() { return player.tm.buyables[5].gte(40); },
        }, 
        14: {
            title: "π介子升级14",
            description: "π介子提升动态树中的硬币获取",
            cost: new Decimal(60),
            unlocked() { return player.tm.buyables[5].gte(40); },
            effect() {
                let ret = player.incrementy_pi.points.pow(1.5).add(1);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        }, 
        15: {
            title: "π介子升级15",
            description: "物质获取减速开始更晚",
            cost: new Decimal(70),
            unlocked() { return player.tm.buyables[5].gte(40); },
        }, 
        21: {
            title: "π介子升级21",
            description: "π介子获取更好",
            cost: new Decimal(50),
            unlocked() { return player.tm.buyables[5].gte(41); },
        }, 
        22: {
            title: "π介子升级22",
            description: "超级声望获取更好",
            cost: new Decimal(500),
            unlocked() { return player.tm.buyables[5].gte(41); },
        }, 
        23: {
            title: "π介子升级23",
            description: "基于π介子升级数量提升π介子获取",
            cost: new Decimal(1000),
            unlocked() { return player.tm.buyables[5].gte(41); },
            effect() {
                let ret=Decimal.pow(hasUpgrade("incrementy_pi",32)?2:1.2,player.incrementy_pi.upgrades.length);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        24: {
            title: "π介子升级24",
            description: "玻色子效果更好",
            cost: new Decimal(3000),
            unlocked() { return player.tm.buyables[5].gte(41); },
        },
        25: {
            title: "π介子升级25",
            description: "粒子升级34效果更好",
            cost: new Decimal(6000),
            unlocked() { return player.tm.buyables[5].gte(41); },
        },
        31: {
            title: "π介子升级31",
            description: "增量耐力更便宜",
            cost: new Decimal(5000),
            unlocked() { return player.tm.buyables[5].gte(42); },
        },
        32: {
            title: "π介子升级32",
            description: "π介子升级23效果更好",
            cost: new Decimal(20000),
            unlocked() { return player.tm.buyables[5].gte(42); },
        },
        33: {
            title: "π介子升级33",
            description: "最大π介子效果+2",
            cost: new Decimal(1e9),
            unlocked() { return player.tm.buyables[5].gte(42); },
        },
        34: {
            title: "π介子升级34",
            description: "每秒获得10000%π介子获取",
            cost: new Decimal(2e9),
            unlocked() { return hasUpgrade("tm",54); },
        },
        35: {
            title: "π介子升级35",
            description: "自动获取前2个超级声望挑战点数",
            cost: new Decimal(1e12),
            unlocked() { return hasUpgrade("tm",54); },
        },
        41: {
            title: "π介子升级41",
            description: "增量耐力更便宜",
            cost: new Decimal(5e12),
            unlocked() { return hasUpgrade("tm",54); },
        },
        42: {
            title: "π介子升级42",
            description: "在游戏开发树中,声望更便宜",
            cost: new Decimal(3e13),
            unlocked() { return hasUpgrade("tm",54); },
        },
        43: {
            title: "π介子升级43",
            description: "在游戏开发树中,'CS 3354软件工程'提升现金获取",
            cost: new Decimal(6e15),
            unlocked() { return hasUpgrade("tm",54); },
        },
        44: {
            title: "π介子升级44",
            description: "自动获取完成数并降低前2个超级声望挑战目标",
            cost: new Decimal(1e16),
            unlocked() { return hasUpgrade("tm",54); },
        },
        45: {
            title: "π介子升级45",
            description: "超级声望挑战2奖励更好",
            cost: new Decimal(4e16),
            unlocked() { return hasUpgrade("tm",54); },
        },
    },
    passiveGeneration(){
        if(hasUpgrade("incrementy_pi",34))return 100;
        return 0;
    },
})


addLayer("incrementy_o", {
    name: "起源层", 
    symbol: "O", 
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        times: 0,
        time: 0,
        abtime: 0,
    }},
    color: "#79134A",
    requires: new Decimal(1e20), 
    resource: "起源",
    baseResource: "π介子",
    baseAmount() {return player.incrementy_pi.points}, 
    branches: ["incrementy_pi"],
    row:4,
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(43)},
    type: "normal", 
    effect(){
        let amt = player.incrementy_o.total
        let ret = amt.times(2).plus(1).pow(2)
        return ret
    },
    effectDescription(){
        let eff = layers.incrementy_o.effect()
        let a = "将π介子和超级声望点数获取乘以" + format(eff) + "倍(基于总起源数)"

        return a + "。"
    },
    gainMult() { 
        mult = new Decimal(1)
        if(hasUpgrade("incrementy_o",11))mult=mult.mul(Decimal.pow(2,player.incrementy_o.upgrades.length));
        if(player.milestone_m.points.gte(69))mult=mult.mul(1.5)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    getResetGain() {
        let ret=player.incrementy_pi.points;
        if(ret.lt("1e20"))return new Decimal(0);
        ret=ret.log10().div(20).pow(2).mul(tmp.incrementy_o.gainMult).floor();
        return ret;
    },
    getNextAt() {
        let ret=tmp.incrementy_o.getResetGain.plus(1);
        ret=ret.div(tmp.incrementy_o.gainMult);
        
        ret=ret.pow(0.5).mul(20);
        ret=Decimal.pow(10,ret).max(1e20);
        return ret;
    },
    doReset(l){
        if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || l=="incrementy_a" || l=="incrementy_e" || l=="incrementy_n" || l=="incrementy_g" || l=="incrementy_q" || l=="incrementy_p" ||  l=="incrementy_s" || l=="incrementy_sp"  || l=="incrementy_o"  || l=="incrementy_f"  || l=="incrementy_c" || !l.startsWith("incrementy_")){return;}
        layerDataReset("incrementy_o",["upgrades","milestones"]);
        return;
    },
    buyables: {
        rows: 3,
        cols: 3,
        11: {
            title: "增量提升",
            display(){
                let additional = ""
                let ex = layers.incrementy_o.buyables[11].extra()
                if (ex.gt(0)) additional = "+" + formatWhole(ex)

                let start = "<b><h2>数量</h2>: " + formatWhole(player.incrementy_o.buyables[11]) + additional + "</b><br>"
                let eff = "<b><h2>效果</h2>: ^" + format(layers.incrementy_o.buyables[11].effect(), 4) + "增量</b><br>"
                let cost = "<b><h2>成本</h2>: " + format(layers.incrementy_o.buyables[11].cost()) + " 起源</b><br>"
                return "<br>" + start + eff + cost
            },
            cost(a){
                let x = getBuyableAmount("incrementy_o", 11).plus(a)
                let base1 = 2
                let exp2 = x.times(x)
                return Decimal.pow(base1, exp2)
            },
            effectBase(){
                let base = new Decimal(1.001)
                return base
            },
            effect(){
                let x = layers.incrementy_o.buyables[11].total()
                let base = layers.incrementy_o.buyables[11].effectBase()
                return Decimal.pow(base, x)
            },
            canAfford(){
                return player.incrementy_o.points.gte(layers.incrementy_o.buyables[11].cost())
            },
            total(){
                return getBuyableAmount("incrementy_o", 11).plus(layers.incrementy_o.buyables[11].extra())
            },
            extra(){
                let ret = new Decimal(0)
                return ret
            },
            buy(){
                let cost = layers.incrementy_o.buyables[11].cost()
                if (!layers.incrementy_o.buyables[11].canAfford()) return
                player.incrementy_o.buyables[11] = player.incrementy_o.buyables[11].plus(1)
                player.incrementy_o.points = player.incrementy_o.points.minus(cost)
            },
            buyMax(maximum){       
                return
            },
            unlocked(){ return true },
        },
        12: {
            title: "π介子提升",
            display(){
                let additional = ""
                let ex = layers.incrementy_o.buyables[12].extra()
                if (ex.gt(0)) additional = "+" + formatWhole(ex)

                let start = "<b><h2>数量</h2>: " + formatWhole(player.incrementy_o.buyables[12]) + additional + "</b><br>"
                let eff = "<b><h2>效果</h2>: ^" + format(layers.incrementy_o.buyables[12].effect(), 4) + "基础π介子获取</b><br>"
                let cost = "<b><h2>成本</h2>: " + format(layers.incrementy_o.buyables[12].cost()) + " 起源</b><br>"
                return "<br>" + start + eff + cost
            },
            cost(a){
                let x = getBuyableAmount("incrementy_o", 12).plus(a)
                let base1 = 3
                let exp2 = x.times(x)
                return Decimal.pow(base1, exp2)
            },
            effectBase(){
                let base = new Decimal(1.02)
                return base
            },
            effect(){
                let x = layers.incrementy_o.buyables[12].total()
                let base = layers.incrementy_o.buyables[12].effectBase()
                return Decimal.pow(base, x)
            },
            canAfford(){
                return player.incrementy_o.points.gte(layers.incrementy_o.buyables[12].cost())
            },
            total(){
                return getBuyableAmount("incrementy_o", 12).plus(layers.incrementy_o.buyables[12].extra())
            },
            extra(){
                let ret = new Decimal(0)
                return ret
            },
            buy(){
                let cost = layers.incrementy_o.buyables[12].cost()
                if (!layers.incrementy_o.buyables[12].canAfford()) return
                player.incrementy_o.buyables[12] = player.incrementy_o.buyables[12].plus(1)
                player.incrementy_o.points = player.incrementy_o.points.minus(cost)
            },
            buyMax(maximum){       
                return
            },
            unlocked(){ return hasUpgrade("incrementy_o", 15) },
        },
    },
    upgrades:{
        rows: 5,
        cols: 5,
        11: {
            title: "起源升级11",
            description: "每个起源升级使起源获取翻倍",
            cost: new Decimal(10),
            unlocked(){return player.tm.buyables[5].gte(44)}
        },
        12: {
            title: "起源升级12",
            description: "每个起源升级每秒获得100%起源获取",
            cost: new Decimal(100),
            unlocked(){return player.tm.buyables[5].gte(44)}
        },
        13: {
            title: "起源升级13",
            description: "获得1个免费增量耐力等级",
            cost: new Decimal(1000),
            unlocked(){return player.tm.buyables[5].gte(44)}
        },
        14: {
            title: "起源升级14",
            description: "最大π介子效果+2",
            cost: new Decimal(10000),
            unlocked(){return player.tm.buyables[5].gte(44)}
        },
        15: {
            title: "起源升级15",
            description: "解锁第二个起源可购买项",
            cost: new Decimal(100000),
            unlocked(){return player.tm.buyables[5].gte(44)}
        },
    },
    milestones: {
        0: {
            requirementDescription: "<b>赫尔曼德</b><br>需要: 1总起源", 
            effectDescription: "移除物质效果但物质获取减速开始更晚",
            done(){
                return player.incrementy_o.total.gte(1)
            },
        },
        1: {
            requirementDescription: "<b>米尔诺</b><br>需要: 2总起源", 
            effectDescription: "降低反物质效果但降低超级声望挑战3-4目标",
            done(){
                return player.incrementy_o.total.gte(2)
            },
        },
        2: {
            requirementDescription: "<b>阿蒂亚</b><br>需要: 3总起源", 
            effectDescription: "降低能量升级13效果但物质获取减速开始更晚",
            done(){
                return player.incrementy_o.total.gte(3)
            },
        },
        3: {
            requirementDescription: "<b>科恩</b><br>需要: 5总起源", 
            effectDescription: "自动化超级声望挑战3-4挑战点数",
            done(){
                return player.incrementy_o.total.gte(5)
            },
        },
        4: {
            requirementDescription: "<b>斯梅尔</b><br>需要: 8总起源", 
            effectDescription: "自动化超级声望挑战3-4完成数",
            done(){
                return player.incrementy_o.total.gte(8)
            },
        },
        5: {
            requirementDescription: "<b>汤普森</b><br>需要: 13总起源", 
            effectDescription: "玻色子获取更好且玻色子挑战完成上限+10",
            done(){
                return player.incrementy_o.total.gte(13)
            },
        },
        6: {
            requirementDescription: "<b>邦别里</b><br>需要: 21总起源", 
            effectDescription: "π介子效果更好。解锁起源可购买项。",
            done(){
                return player.incrementy_o.total.gte(21)
            },
        },
    },
    tabFormat: {
        "升级": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades"
            ],
            unlocked(){
                return true
            },
        },
        "buyables": {
            content: [
                "main-display",
                "buyables",
            ],
            unlocked(){
                return true
            },
        },
        "milestones": {
            content: [
                "main-display",
                "milestones",
            ],
            unlocked(){
                return true
            },
        },
    },
    passiveGeneration(){
        if(hasUpgrade("incrementy_o",12))return player.incrementy_o.upgrades.length;
        return 0;
    },
})


