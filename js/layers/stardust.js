


addLayer("stardust_s", {
    name: "星尘", 
    symbol: "S", 
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#404060",
    requires: new Decimal(10), 
    resource: "星尘", 
    baseResource: "能量", 
    baseAmount() {return player.modpoints[2]}, 
    type: "normal", 
    exponent: 0.5, 
    gainMult() { 
        mult = new Decimal(1)
        mult = mult.mul(tmp.stardust_so.effect);
        if(hasUpgrade("tptc_p",21))mult = mult.mul(upgradeEffect("tptc_p",21));
        mult = mult.mul(buyableEffect("stardust_n",13));
        if(hasUpgrade("stardust_c",13))mult = mult.mul(upgradeEffect("stardust_c",13));
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 0, 
    hotkeys: [],
    layerShown(){return player.tm.currentTree==2},
        
        doReset(l){
            if(l=="stardust_s" || !l.startsWith("stardust_")){return;}
            layerDataReset("stardust_s",["upgrades","milestones","challenges"]);
            return;
        },
        update(diff){
            let gain=new Decimal(0);
            if(hasUpgrade("stardust_s",11))gain=gain.add(1);
            gain=gain.add(buyableEffect("stardust_so",11));
            if(hasUpgrade("stardust_s",13))gain=gain.mul(upgradeEffect("stardust_s",13));
            gain=gain.mul(tmp.stardust_n.effect);
            gain=gain.mul(buyableEffect("stardust_n",11));
            if(hasUpgrade("stardust_s",21))gain=gain.mul(upgradeEffect("stardust_s",21));
            if(hasUpgrade("stardust_s",22))gain=gain.mul(upgradeEffect("stardust_s",22));
            gain=gain.mul(buyableEffect("stardust_n",12));
            if(hasUpgrade("stardust_c",15))gain=gain.mul(upgradeEffect("stardust_c",15));
            player.modpoints[2]=player.modpoints[2].add(gain.mul(diff));
        },
        upgrades: {
            rows: 4,
            cols: 5,
            11: {
                title: "星尘升级11",
                description: "基础能量获取+1",
                cost: new Decimal(0),
                unlocked() { return true; },
            },
            12: {
                title: "星尘升级12",
                description: "点数获取基于你的能量获得加成",
                cost: new Decimal(1),
                unlocked() { return true; },
                effect() {
                    let base=20;
                    let ret = Decimal.pow(base,Decimal.log10(player.modpoints[2].mul(10).add(1)).pow(0.9));
                    if(player.stardust_c.points.gte(31))ret = Decimal.pow(base,Decimal.log10(player.modpoints[2].mul(10).add(1)).pow(0.95));
                    if(player.stardust_c.points.gte(33))ret = player.modpoints[2].add(1).pow(1.3);
                    if(player.stardust_c.points.gte(37))ret = player.modpoints[2].add(1).pow(1.5625);
                    if(hasUpgrade("stardust_so",11))ret=ret.pow(2);
                    if(hasUpgrade("stardust_n",11))ret=ret.pow(2);
                    if(hasUpgrade("stardust_s",31))ret=ret.pow(2);
                    if(hasUpgrade("stardust_c",14))ret=ret.pow(2);
                    if(hasUpgrade("stardust_c",31))ret=ret.pow(upgradeEffect("stardust_c",31));
                    if(hasUpgrade("stardust_s",14))ret=ret.pow(2);
                    if(hasUpgrade("stardust_s",43))ret=ret.pow(2);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            13: {
                title: "星尘升级13",
                description: "能量获取基于此树的等级获得加成",
                cost: new Decimal(1),
                unlocked() { return true; },
                effect() {
                    let ret=Decimal.pow(2,player.tm.buyables[2].pow(1.5));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            21: {
                title: "星尘升级21",
                description: "点数提升能量获取",
                cost: new Decimal(3e5),
                unlocked() { return player.tm.buyables[2].gte(4); },
                effect() {
                    let base=1.03;
                    let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.5));
                    if(hasUpgrade("stardust_s",33))ret=ret.pow(2);
                    if(hasUpgrade("stardust_c",35))ret=ret.pow(upgradeEffect("stardust_c",35));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            22: {
                title: "星尘升级22",
                description: "星尘提升能量获取",
                cost: new Decimal(1e6),
                unlocked() { return player.tm.buyables[2].gte(4); },
                effect() {
                    let base=2;
                    let ret = Decimal.pow(base,Decimal.log10(player.stardust_s.points.add(1)).pow(0.9));
                    if(hasUpgrade("stardust_c",32))ret=ret.pow(upgradeEffect("stardust_c",32));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            23: {
                title: "星尘升级23",
                description: "解锁声望树经典中的一个声望升级",
                cost: new Decimal(5e7),
                unlocked() { return player.tm.buyables[2].gte(4); },
            },
            31: {
                title: "星尘升级31",
                description: "星尘升级12效果平方",
                cost: new Decimal(1e19),
                unlocked() { return player.tm.buyables[2].gte(6); },
            },
            32: {
                title: "星尘升级32",
                description: "每秒获得100%星尘获取量",
                cost: new Decimal(1e20),
                unlocked() { return player.tm.buyables[2].gte(6); },
            },
            33: {
                title: "星尘升级33",
                description: "星尘升级21效果平方",
                cost: new Decimal(1e21),
                unlocked() { return player.tm.buyables[2].gte(6); },
            },
            14: {
                title: "星尘升级14",
                description: "星尘升级12效果平方",
                cost: new Decimal("1e600"),
                unlocked() { return hasUpgrade("tm",12); },
            },
            24: {
                title: "星尘升级24",
                description: "反射星云和暗星云的效果平方",
                cost: new Decimal("1e635"),
                unlocked() { return hasUpgrade("tm",12); },
            },
            34: {
                title: "星尘升级34",
                description: "星座3的基础效果立方",
                cost: new Decimal("1e700"),
                unlocked() { return hasUpgrade("tm",12); },
            },
            15: {
                title: "星尘升级15",
                description: "水晶升级31的效果^2",
                cost: new Decimal("1e1900"),
                unlocked() { return hasUpgrade("tm",21); },
            },
            25: {
                title: "星尘升级25",
                description: "星星的基础效果^1.5",
                cost: new Decimal("1e1980"),
                unlocked() { return hasUpgrade("tm",21); },
            },
            35: {
                title: "星尘升级35",
                description: "星云的基础效果^1.5",
                cost: new Decimal("1e2550"),
                unlocked() { return hasUpgrade("tm",21); },
            },
            41: {
                title: "星尘升级41",
                description: "星星升级12效果更强，并应用于TPTC中的生成器",
                cost: new Decimal("1e9450"),
                unlocked() { return hasUpgrade("tm",32); },
            },
            42: {
                title: "星尘升级42",
                description: "星云升级12效果更强，并应用于TPTC中的加速器",
                cost: new Decimal("1e9480"),
                unlocked() { return hasUpgrade("tm",32); },
            },
            43: {
                title: "星尘升级43",
                description: "星尘升级12效果平方",
                cost: new Decimal("1e9510"),
                unlocked() { return hasUpgrade("tm",32); },
            },
            44: {
                title: "星尘升级44",
                description: "星座3的基础效果立方",
                cost: new Decimal("1e9600"),
                unlocked() { return hasUpgrade("tm",32); },
            },
            45: {
                title: "星尘升级45",
                description: "解锁一个星座",
                cost: new Decimal("1e9610"),
                unlocked() { return hasUpgrade("tm",32); },
            },
        },
     passiveGeneration(){
         if(hasUpgrade("stardust_s",32))return 1;
         return 0;
     },
     hotkeys: [
        {key: "s", description: "s: 收集星尘", onPress(){if (player.tm.currentTree==2 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==2}}
    ],
});


addLayer("stardust_so", {
    name: "星星", 
    symbol: "SO", 
    position: 0, 
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#fadb6b",
    requires: new Decimal(200), 
    resource: "星星", 
    baseResource: "能量", 
    baseAmount() {return player.modpoints[2]}, 
    type: "normal", 
    exponent: 0.4, 
    gainMult() { 
        mult = new Decimal(1)
        mult = mult.div(buyableEffect("stardust_n",13).pow(layers.stardust_n.nerfPower()));
        if(hasUpgrade("stardust_c",25))mult=mult.mul(upgradeEffect("stardust_c",25));
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    effect() {
        eff = player[this.layer].points.add(1).sqrt()
        if(hasUpgrade("stardust_s",25))eff = eff.pow(1.5);
        if(hasUpgrade("stardust_so",14))eff = eff.mul(buyableEffect("stardust_so",12));
        return eff
        },
    effectDescription() {
        eff = this.effect();
        return "将星尘获取提升"+format(eff)+"倍"
    },
    row: 1, 
    hotkeys: [],
    layerShown(){return player.tm.currentTree==2 && player.tm.buyables[2].gte(2)},
        
        doReset(l){
            if(l=="stardust_s" || l=="stardust_so" || l=="stardust_n" || !l.startsWith("stardust_")){return;}
            layerDataReset("stardust_so",["upgrades","milestones","challenges"]);
            return;
        },
        
        buyables: {
            rows: 1,
            cols: 4,
            11: {
                title : "星座1", 
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = Decimal.pow(2, x.pow(1.4))
                    if(hasUpgrade("stardust_c",21))cost = Decimal.pow(2, x.pow(1.3))
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { 
                    let eff = Decimal.pow(3, x.pow(0.9)).mul(x)
                    if(hasUpgrade("stardust_c",21))eff = Decimal.pow(4, x).mul(x)
                    eff = eff.mul(buyableEffect("stardust_n",14));
                    return eff;
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "成本: " + format(data.cost) + " 星星\n\
                    数量: " + player[this.layer].buyables[this.id] + "\n\
                    为能量生成基础+" + format(data.effect)
                },
                unlocked() { return player[this.layer].unlocked }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)    
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
            },
            12: {
                title : "星座2", 
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = Decimal.pow(2, x.pow(1.4)).times(1e6)
                    if(hasUpgrade("stardust_c",21))cost = Decimal.pow(2, x.pow(1.3))
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { 
                    let eff = Decimal.pow(2, x.pow(0.8)).mul(x).add(1)
                    if(hasUpgrade("stardust_c",21))eff = Decimal.pow(3, x.pow(0.9)).mul(x).add(1)
                    eff = eff.mul(buyableEffect("stardust_n",14));
                    return eff;
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "成本: " + format(data.cost) + " 星星\n\
                    数量: " + player[this.layer].buyables[this.id] + "\n\
                    将星星效果乘" + format(data.effect) + "倍"
                },
                unlocked() { return hasUpgrade("stardust_so",14); }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)    
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
            },
            13: {
                title : "星座3", 
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = Decimal.pow(3, x.pow(1.5))
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { 
                    let eff = Decimal.pow(1.5, x.pow(0.7)).mul(x).add(1)
                    if(hasUpgrade("stardust_s",34))eff=eff.pow(3);
                    if(hasUpgrade("stardust_s",44))eff=eff.pow(3);
                    eff = eff.mul(buyableEffect("stardust_n",14));
                    return eff;
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "成本: " + format(data.cost) + " 星星\n\
                    数量: " + player[this.layer].buyables[this.id] + "\n\
                    将声望树经典中的子空间获取乘" + format(data.effect) + "倍"
                },
                unlocked() { return hasUpgrade("stardust_c",33); }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)    
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
            },
            14: {
                title : "星座4", 
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = Decimal.pow(4, x.pow(1.5))
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { 
                    let eff = Decimal.pow(10, x).mul(x.pow(2).add(1))
                    eff = eff.mul(buyableEffect("stardust_n",14));
                    return eff;
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "成本: " + format(data.cost) + " 星星\n\
                    数量: " + player[this.layer].buyables[this.id] + "\n\
                    将水晶需求除以" + format(data.effect)
                },
                unlocked() { return hasUpgrade("stardust_s",45); }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)    
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
            },
        },
        upgrades: {
            rows: 1,
            cols: 5,
            11: {
                title: "星星升级11",
                description: "星尘升级12效果平方",
                cost: new Decimal(1000),
                unlocked() { return player.tm.buyables[2].gte(4); },
            },
            12: {
                title: "星星升级12",
                description: "声望树经典中的加速器基于你的星星数量变得更便宜",
                cost: new Decimal(1e6),
                unlocked() { return player.tm.buyables[2].gte(5); },
                effect() { 
                    let base=1e12;
                    let ret = Decimal.pow(base,Decimal.log10(player.stardust_so.points.add(1)).pow(0.9)).add(1);
                    if(hasUpgrade("stardust_s",41))ret=player.stardust_so.points.pow(50).add(1);
                    if(hasUpgrade("stardust_so",13))ret=ret.pow(2);
                    return ret;
                },
                effectDisplay() { return "/"+format(this.effect()) },
            },
            13: {
                title: "星星升级13",
                description: "星星升级12效果平方",
                cost: new Decimal(1e9),
                unlocked() { return player.tm.buyables[2].gte(6); },
            },
            14: {
                title: "星星升级14",
                description: "解锁一个星座",
                cost: new Decimal(1e10),
                unlocked() { return player.tm.buyables[2].gte(7); },
            },
            15: {
                title: "星星升级15",
                description: "水晶基于你的星星数量变得更便宜",
                cost: new Decimal(1e100),
                unlocked() { return player.tm.buyables[2].gte(8); },
                effect() { 
                    let base=1.3;
                    let ret = Decimal.pow(base,Decimal.log10(player.stardust_so.points.add(1)).pow(0.9));
                    return ret;
                },
                effectDisplay() { return "/"+format(this.effect()) },
            },
        },
           branches: [["stardust_s", 5]],
     hotkeys: [
        {key: "S", description: "Shift-s: 重置星尘获取星星", onPress(){if (player.tm.currentTree==2 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==2}}
    ],
     passiveGeneration(){
         if(hasUpgrade("stardust_c",11))return 1;
         return 0;
     },
});


addLayer("stardust_n", {
    name: "星云", 
    symbol: "N", 
    position: 1,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#6541d1",
    requires: new Decimal(100), 
    resource: "星云", 
    baseResource: "星尘", 
    baseAmount() {return player.stardust_s.points}, 
    type: "normal", 
    exponent: 0.4, 
    gainMult() { 
        mult = new Decimal(1)
        mult = mult.div(buyableEffect("stardust_n",12).pow(layers.stardust_n.nerfPower()));
        if(hasUpgrade("stardust_c",25))mult=mult.mul(upgradeEffect("stardust_c",25));
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    effect() {
        eff = player[this.layer].points.add(1).sqrt()
        if(hasUpgrade("stardust_s",35))eff = eff.pow(1.5);
        return eff
        },
    effectDescription() {
        eff = this.effect();
        return "将能量获取提升"+format(eff)+"倍"
    },
    row: 1, 
    hotkeys: [],
    layerShown(){return player.tm.currentTree==2 && player.tm.buyables[2].gte(3)},
        
        doReset(l){
            if(l=="stardust_s" || l=="stardust_so" || l=="stardust_n" || !l.startsWith("stardust_")){return;}
            layerDataReset("stardust_n",["upgrades","milestones","challenges"]);
            return;
        },
        
        buyables: {
            rows: 1,
            cols: 4,
            11: {
                title : "发射星云", 
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = Decimal.pow(2, x.pow(1.4))
                    if(hasUpgrade("stardust_c",22))cost = Decimal.pow(2, x.pow(1.3))
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { 
                    let eff = Decimal.pow(3, x.pow(0.6))
                    if(hasUpgrade("stardust_c",22))eff = Decimal.pow(4, x.pow(0.8))
                    return eff;
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "成本: " + format(data.cost) + " 星云\n\
                    数量: " + player[this.layer].buyables[this.id] + "\n\
                    将能量获取乘" + format(data.effect) + "倍"
                },
                unlocked() { return player[this.layer].unlocked }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)    
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
            },
            12: {
                title : "反射星云", 
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = Decimal.pow(2, x.pow(2))
                    if(hasUpgrade("stardust_c",22))cost = Decimal.pow(2, x.pow(1.7))
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { 
                    let eff = Decimal.pow(3, x.pow(0.8))
                    if(hasUpgrade("stardust_c",22))eff = Decimal.pow(4, x.pow(0.8))
                    if(hasUpgrade("stardust_s",24))eff=eff.pow(2);
                    return eff;
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "成本: " + format(data.cost) + " 星云\n\
                    数量: " + player[this.layer].buyables[this.id] + "\n\
                    将星云获取除以" + format(data.effect.pow(layers.stardust_n.nerfPower())) + "倍并将能量获取乘" + format(data.effect) + "倍"
                },
                unlocked() { return player[this.layer].unlocked && player.tm.buyables[2].gte(4)}, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)    
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
            },
            13: {
                title : "暗星云", 
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = Decimal.pow(2, x.pow(2))
                    if(hasUpgrade("stardust_c",22))cost = Decimal.pow(2, x.pow(1.7))
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { 
                    let eff = Decimal.pow(3, x.pow(0.8))
                    if(hasUpgrade("stardust_c",22))eff = Decimal.pow(4, x.pow(0.8))
                    if(hasUpgrade("stardust_s",24))eff=eff.pow(2);
                    return eff;
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "成本: " + format(data.cost) + " 星云\n\
                    数量: " + player[this.layer].buyables[this.id] + "\n\
                    将星星获取除以" + format(data.effect.pow(layers.stardust_n.nerfPower())) + "倍并将星尘获取乘" + format(data.effect) + "倍"
                },
                unlocked() { return player[this.layer].unlocked && player.tm.buyables[2].gte(5)}, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)    
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
            },
            14: {
                title : "行星状星云", 
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = Decimal.pow(2, x.pow(1.7))
                    if(hasUpgrade("stardust_c",22))cost = Decimal.pow(2, x.pow(1.5))
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { 
                    let eff = Decimal.pow(1.3, x)
                    if(hasUpgrade("stardust_c",22))eff = Decimal.pow(1.4, x)
                    return eff;
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "成本: " + format(data.cost) + " 星云\n\
                    数量: " + player[this.layer].buyables[this.id] + "\n\
                    将星座效果乘" + format(data.effect) + "倍"
                },
                unlocked() { return player[this.layer].unlocked && player.tm.buyables[2].gte(6)}, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)    
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
            },
        },
        nerfPower (){
            let ret = new Decimal(0.35);
            if(hasUpgrade("stardust_n",14))ret=ret.mul(0.8);
            if(hasUpgrade("stardust_n",15))ret=ret.mul(0.6);
            return ret;
        },
        upgrades: {
            rows: 1,
            cols: 5,
            11: {
                title: "星云升级11",
                description: "星尘升级12效果平方",
                cost: new Decimal(100),
                unlocked() { return player.tm.buyables[2].gte(4); },
            },
            12: {
                title: "星云升级12",
                description: "声望树经典中的生成器基于你的星云数量变得更便宜",
                cost: new Decimal(1e5),
                unlocked() { return player.tm.buyables[2].gte(5); },
                effect() { 
                    let base=1e12;
                    let ret = Decimal.pow(base,Decimal.log10(player.stardust_n.points.add(1)).pow(0.9)).add(1);
                    if(hasUpgrade("stardust_s",42))ret=player.stardust_n.points.pow(50).add(1);
                    if(hasUpgrade("stardust_n",13))ret=ret.pow(2);
                    return ret;
                },
                effectDisplay() { return "/"+format(this.effect()) },
            },
            13: {
                title: "星云升级13",
                description: "星云升级12效果平方",
                cost: new Decimal(1e7),
                unlocked() { return player.tm.buyables[2].gte(6); },
            },
            14: {
                title: "星云升级14",
                description: "星云可购买项的削弱效果^0.8",
                cost: new Decimal(1e8),
                unlocked() { return player.tm.buyables[2].gte(7); },
            },
            15: {
                title: "星云升级15",
                description: "星云可购买项的削弱效果^0.6",
                cost: new Decimal(1e100),
                unlocked() { return player.tm.buyables[2].gte(8); },
            },
        },
           branches: [["stardust_s", 6]],
        hotkeys: [
            {key: "n", 
            description: "n: 重置星尘获取星云",
            onPress(){if (player.tm.currentTree==2 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==2}}
        ],
     passiveGeneration(){
         if(hasUpgrade("stardust_c",12))return 1;
         return 0;
     },
});


addLayer("stardust_c", {
    name: "水晶", 
    symbol: "C", 
    position: 1, 
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        shards: new Decimal(0),
    }},
    color: "#A0A0E0",
    requires: new Decimal(3.333e33), 
    resource: "水晶", 
    baseResource: "星尘", 
    baseAmount() {return player.stardust_s.points}, 
    type: "static", 
    base: 9,
    exponent: 3,
    gainMult() { 
        mult = new Decimal(1)
        if(hasUpgrade("stardust_so",15))mult = mult.div(upgradeEffect("stardust_so",15));
        if(hasUpgrade("stardust_c",34))mult = mult.div(upgradeEffect("stardust_c",34));
        if(hasUpgrade("stardust_s",45))mult = mult.div(buyableEffect("stardust_so",14));
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    effect() {
        eff = player[this.layer].points.pow(1.25).floor().times(5);
        return eff
    },
    effectDescription() {
        if(player[this.layer].points.gte(17))return "";
        eff = this.effect();
        return "提供"+format(eff)+"碎片"
    },
    row: 2, 
    hotkeys: [],
    layerShown(){return player.tm.currentTree==2 && player.tm.buyables[2].gte(8)},
        
        doReset(l){
            if(l=="stardust_s" || l=="stardust_so" || l=="stardust_n" || l=="stardust_c" || !l.startsWith("stardust_")){return;}
            layerDataReset("stardust_c",["upgrades","milestones","challenges"]);
            return;
        },
        buyables: {
            1: {
                title: "重置水晶升级",
                display: "",
                unlocked() { return player[this.layer].unlocked && player[this.layer].points.lt(17)}, 
                canAfford() {
                    return true;
                },
                buy() { 
                    if(confirm("这将强制重置水晶！确定吗？")){
                        player[this.layer].upgrades=[];
                        doReset(this.layer,true);
                    }
                },
                buyMax() {},
                style: {'height':'60px'},
            },
        },

		        upgrades: {
            rows: 3,
            cols: 5,
            11: {
                title: "水晶升级11",
                description: "每秒获得100%星星获取量",
                cost(){
                    return new Decimal(6).sub(player.stardust_c.points).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(8); },
            },
            12: {
                title: "水晶升级12",
                description: "每秒获得100%星云获取量",
                cost(){
                    return new Decimal(6).sub(player.stardust_c.points).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(8); },
            },
            13: {
                title: "水晶升级13",
                description: "水晶乘算星尘获取",
                cost(){
                    return new Decimal(8).sub(player.stardust_c.points).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(9); },
                effect() { 
                    let ret=player.stardust_c.points.add(1).pow(4);
                    if(player.stardust_c.points.gte(3))ret=ret.pow(2.5);
                    if(player.stardust_c.points.gte(28))ret=Decimal.pow(10,player.stardust_c.points);
                    if(player.stardust_c.points.gte(41))ret=Decimal.pow(1e10,player.stardust_c.points);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            14: {
                title: "水晶升级14",
                description: "星尘升级12效果平方",
                cost(){
                    return new Decimal(15).sub(player.stardust_c.points.mul(2)).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(9); },
            },
            15: {
                title: "水晶升级15",
                description: "水晶乘算能量获取",
                cost(){
                    return new Decimal(13).sub(player.stardust_c.points.mul(2)).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(9); },
                effect() { 
                    let ret=player.stardust_c.points.add(1).pow(5);
                    if(player.stardust_c.points.gte(3))ret=ret.pow(2.5);
                    if(player.stardust_c.points.gte(28))ret=Decimal.pow(1e10,player.stardust_c.points);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            21: {
                title: "水晶升级21",
                description: "星座更便宜且效果更强",
                cost(){
                    return new Decimal(18).sub(player.stardust_c.points.mul(2)).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(10); },
            },
            22: {
                title: "水晶升级22",
                description: "星云可购买项更便宜且效果更强",
                cost(){
                    return new Decimal(18).sub(player.stardust_c.points.mul(2)).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(10); },
            },
            23: {
                title: "水晶升级23",
                description: "自动购买星座",
                cost(){
                    return new Decimal(8).sub(player.stardust_c.points).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(10); },
            },
            24: {
                title: "水晶升级24",
                description: "自动购买星云可购买项",
                cost(){
                    return new Decimal(8).sub(player.stardust_c.points).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(10); },
            },
            25: {
                title: "水晶升级25",
                description: "水晶乘算星星和星云获取",
                cost(){
                    return new Decimal(10).sub(player.stardust_c.points).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(10); },
                effect() { 
                    let ret=player.stardust_c.points.add(1).pow(6);
                    if(player.stardust_c.points.gte(30))ret=Decimal.pow(2,player.stardust_c.points);
                    if(player.stardust_c.points.gte(41))ret=Decimal.pow(1e10,player.stardust_c.points);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            31: {
                title: "水晶升级31",
                description: "水晶提升星尘升级12",
                cost(){
                    return new Decimal(35).sub(player.stardust_c.points.mul(3)).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(11); },
                effect() { 
                    let ret=player.stardust_c.points.pow(0.5).div(5).add(1);
                    if(player.stardust_c.points.gte(28))ret=player.stardust_c.points.pow(0.5).div(2);
                    if(hasUpgrade("stardust_s",15))ret=ret.pow(2);
                    if(player.stardust_c.points.gte(760))ret=new Decimal(190);
                    if(player.stardust_c.points.gte(950))ret=player.stardust_c.points.div(5);
                    if(player.stardust_c.points.gte(1000))ret=new Decimal(200);
                    return ret;
                },
                effectDisplay() { return "^"+format(this.effect()) },
            },
            32: {
                title: "水晶升级32",
                description: "水晶提升星尘升级22",
                cost(){
                    return new Decimal(40).sub(player.stardust_c.points.mul(3)).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(11); },
                effect() { 
                    let ret=player.stardust_c.points.pow(0.5).div(2.5).add(1);
                    if(player.stardust_c.points.gte(38))ret=player.stardust_c.points.div(10);
                    if(player.stardust_c.points.gte(68))ret=new Decimal(6.8);
                    if(player.stardust_c.points.gte(90))ret=new Decimal(7);
                    if(player.stardust_c.points.gte(140))ret=player.stardust_c.points.div(20);
                    if(player.stardust_c.points.gte(200))ret=new Decimal(10);
                    if(player.stardust_c.points.gte(500))ret=player.stardust_c.points.div(50);
                    if(player.stardust_c.points.gte(760))ret=new Decimal(15.2);
                    if(player.stardust_c.points.gte(836))ret=player.stardust_c.points.div(55);
                    if(player.stardust_c.points.gte(990))ret=new Decimal(18);
                    return ret;
                },
                effectDisplay() { return "^"+format(this.effect()) },
            },
            33: {
                title: "水晶升级33",
                description: "解锁一个星座",
                cost(){
                    return new Decimal(50).sub(player.stardust_c.points.mul(3)).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(11); },
            },
            34: {
                title: "水晶升级34",
                description: "水晶使自身更便宜",
                cost(){
                    return new Decimal(42).sub(player.stardust_c.points.mul(3)).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(12); },
                effect() { 
                    let ret=Decimal.pow(275,player.stardust_c.points.sub(2).max(0).pow(2.3)).max(1);
                    return ret;
                },
                effectDisplay() { return "/"+format(this.effect()) },
            },
            35: {
                title: "水晶升级35",
                description: "水晶提升星尘升级21",
                cost(){
                    return new Decimal(14).sub(player.stardust_c.points).max(0);
                },
                currencyDisplayName: "碎片",
                currencyInternalName: "shards",
                currencyLayer: "stardust_c",
                unlocked() { return player.tm.buyables[2].gte(12) && player.stardust_c.best.gte(8); },
                effect() { 
                    let ret=player.stardust_c.points.pow(0.5).mul(2).add(1);
                    if(player.stardust_c.points.gte(43))ret=player.stardust_c.points.div(3);
                    if(player.stardust_c.points.gte(129))ret=player.stardust_c.points.div(2.5);
                    if(player.stardust_c.points.gte(200))ret=player.stardust_c.points.pow(2).div(500);
                    if(player.stardust_c.points.gte(250))ret=player.stardust_c.points.div(2);
                    if(player.stardust_c.points.gte(760))ret=new Decimal(380);
                    if(player.stardust_c.points.gte(950))ret=player.stardust_c.points.div(2.5);
                    return ret;
                },
                effectDisplay() { return "^"+format(this.effect()) },
            },
        },

		      branches: [["stardust_s", 4]],
        hotkeys: [
            {key: "c", 
            description: "c: 压缩星尘为水晶",
            onPress(){if (player.tm.currentTree==2 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==2}}
        ],
        
     tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
                    ["display-text",function(){if(player.stardust_c.points.lt(17))return "剩余碎片: "+format(player.stardust_c.shards)+"/"+format(tmp.stardust_c.effect)}],
                    ["buyable",1],
                    "upgrades","milestones"
                ],
        usedShards(){
            var ret=new Decimal(0);
            for(var i in player.stardust_c.upgrades){
                ret=tmp.stardust_c.upgrades[player.stardust_c.upgrades[i]].cost.add(ret);
            }
            return ret;
        },
        update(diff){
            player.stardust_c.shards=layers.stardust_c.effect().sub(layers.stardust_c.usedShards());
            if(hasUpgrade("stardust_c",23)){
                var target=player.stardust_so.points.add(1).log(2).pow(1/1.4).add(1).floor();
                if(hasUpgrade("stardust_c",21))target=player.stardust_so.points.add(1).log(2).pow(1/1.3).add(1).floor();
                if(target.gt(player.stardust_so.buyables[11])){
                    player.stardust_so.buyables[11]=target;
                }
            }
            if(hasUpgrade("stardust_c",23) && hasUpgrade("stardust_so",14)){
                var target=player.stardust_so.points.div(1e6).add(1).log(2).pow(1/1.4).add(1).floor();
                if(hasUpgrade("stardust_c",21))target=player.stardust_so.points.add(1).log(2).pow(1/1.3).add(1).floor();
                if(target.gt(player.stardust_so.buyables[12])){
                    player.stardust_so.buyables[12]=target;
                }
            }
            if(hasUpgrade("stardust_c",23) && hasUpgrade("stardust_c",33)){
                var target=player.stardust_so.points.add(1).log(3).pow(1/1.5).add(1).floor();
                if(target.gt(player.stardust_so.buyables[13])){
                    player.stardust_so.buyables[13]=target;
                }
            }
            if(hasUpgrade("stardust_c",23) && hasUpgrade("stardust_s",45)){
                var target=player.stardust_so.points.add(1).log(4).pow(1/1.5).add(1).floor();
                if(target.gt(player.stardust_so.buyables[14])){
                    player.stardust_so.buyables[14]=target;
                }
            }
            if(hasUpgrade("stardust_c",24)){
                var target=player.stardust_n.points.add(1).log(2).pow(1/1.4).add(1).floor();
                if(hasUpgrade("stardust_c",22))target=player.stardust_n.points.add(1).log(2).pow(1/1.3).add(1).floor();
                if(target.gt(player.stardust_n.buyables[11])){
                    player.stardust_n.buyables[11]=target;
                }
            }
            if(hasUpgrade("stardust_c",24)){
                var target=player.stardust_n.points.add(1).log(2).pow(1/2).add(1).floor();
                if(hasUpgrade("stardust_c",22))target=player.stardust_n.points.add(1).log(2).pow(1/1.7).add(1).floor();
                if(target.gt(player.stardust_n.buyables[12])){
                    player.stardust_n.buyables[12]=target;
                }
            }
            if(hasUpgrade("stardust_c",24)){
                var target=player.stardust_n.points.add(1).log(2).pow(1/2).add(1).floor();
                if(hasUpgrade("stardust_c",22))target=player.stardust_n.points.add(1).log(2).pow(1/1.7).add(1).floor();
                if(target.gt(player.stardust_n.buyables[13])){
                    player.stardust_n.buyables[13]=target;
                }
            }
            if(hasUpgrade("stardust_c",24)){
                var target=player.stardust_n.points.add(1).log(2).pow(1/1.7).add(1).floor();
                if(hasUpgrade("stardust_c",22))target=player.stardust_n.points.add(1).log(2).pow(1/1.5).add(1).floor();
                if(target.gt(player.stardust_n.buyables[14])){
                    player.stardust_n.buyables[14]=target;
                }
            }
        },
        
        
     canBuyMax(){
         return player.stardust_c.best.gte(50);
     },autoPrestige(){
         return player.stardust_c.best.gte(50);
     },resetsNothing(){
         return player.stardust_c.best.gte(50);
     },
    milestones: [
        {
            requirementDescription: "50水晶",
            done() {return player.stardust_c.best.gte(50)},
            effectDescription: "自动化此层级",
        },
        ]
});