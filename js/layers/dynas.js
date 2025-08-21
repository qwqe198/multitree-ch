
addLayer("dynas_c", {
    name: "动态C层", // 可选，仅在少数地方使用
    symbol: "C", // 显示在图层节点上的符号
    position: 1, // 行内水平位置
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        total: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#FFFF00",
    requires: new Decimal(10), // 可以是考虑需求增长的函数
    resource: "硬币", // 声望货币名称
    baseResource: "动态点数", // 声望基于的资源名称
    baseAmount() {return player.modpoints[9]}, // 获取当前基础资源量
    type: "normal", // normal: 获取货币的成本取决于获取量 static: 成本取决于已有量
    exponent: 0.5, // 声望货币指数
    gainMult() { // 计算来自加成的货币乘数
        mult = new Decimal(1)
        mult=mult.mul(tmp.dynas_b.effect);
        mult=mult.mul(tmp.dynas_m.effect);
        if(hasUpgrade("tptc_p",51))mult=mult.mul(upgradeEffect("tptc_p",51));
        if(hasUpgrade("incrementy_pi",14))mult=mult.mul(upgradeEffect("incrementy_pi",14));
        return mult
    },
    gainExp() { // 计算来自加成的货币指数
        if (player.dynas_b.banking & 4) return new Decimal(0.1)
        return new Decimal(1)
    },
    row: 0, // 图层在树中的行(0是第一行)
    hotkeys: [],
    layerShown(){return player.tm.currentTree==9;},
        
        doReset(l){
            if(!l.startsWith("dynas_")){return;}
            for(var i in tmp.dynas_c.upgrades){
                tmp.dynas_c.upgrades[i].effect=new Decimal(1);
            }
            if(l=="dynas_c" || !l.startsWith("dynas_")){return;}
            layerDataReset("dynas_c",["upgrades","milestones","challenges"]);
            return;
        },
        upgrades: {
            rows: 4,
            cols: 5,
            11: {
                title: "硬币升级11",
                description() {
                    return "每秒获得"+format(this.effect())+"动态点数"
                },
                cost: new Decimal(0),
                unlocked() { return true; },
                effect() {
                    let ret = new Decimal(1);
                    if(hasUpgrade("dynas_c",12))ret=ret.mul(upgradeEffect("dynas_c",12));
                    if(hasUpgrade("dynas_c",21))ret=ret.mul(upgradeEffect("dynas_c",21));
                    if(hasUpgrade("dynas_c",31))ret=ret.mul(upgradeEffect("dynas_c",31));
                    ret=ret.mul(tmp.dynas_w.effect);
                    ret=ret.mul(tmp.dynas_m.effect);
                    ret=ret.mul(tmp.dynas_wf.effect2[0]);
                    ret = ret.mul(buyableEffect("dynas_b",11));
                    ret = ret.mul(buyableEffect("dynas_b",12));
                    ret = ret.mul(buyableEffect("dynas_b",13));
                    ret = ret.mul(buyableEffect("dynas_bd",12));
                    if (player.dynas_b.banking & 1) ret = ret.pow(0.5)
                    if (player.dynas_b.banking & 2) ret = ret.root(3)
                    if (player.dynas_b.banking & 4) ret = ret.pow(0.1)
                    if (player.dynas_b.banking & 8) ret = player.dynas_c.points.pow(0.1).sub(1)
                    if (player.dynas_b.banking & 16) ret = ret.pow(Decimal.pow(player.dynas_b.bankTime, 2).add(1).recip())  
                    return ret;
                },
            },
            12: {
                title: "硬币升级12",
                description() {
                    return "硬币升级11效果基于硬币数量提升"
                },
                cost: new Decimal(1),
                unlocked() { return true; },
                effect() {
                    let base=2;
                    let ret = Decimal.pow(base,Decimal.log10(player.dynas_c.points.add(10)).pow(0.9));
                    if(hasUpgrade("dynas_w",12))ret=ret.pow(upgradeEffect("dynas_w",12));
                    if(hasUpgrade("dynas_c",13))ret=ret.mul(upgradeEffect("dynas_c",13));
                    if(hasUpgrade("dynas_c",21))ret=ret.mul(upgradeEffect("dynas_c",21));
                    ret=ret.mul(tmp.dynas_wf.effect2[0]);
                    ret = ret.mul(buyableEffect("dynas_bd",12));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            13: {
                title: "硬币升级13",
                description() {
                    return "硬币升级12效果基于点数提升"
                },
                cost: new Decimal(1),
                unlocked() { return true; },
                effect() {
                    if (player.dynas_b.banking & 2)return new Decimal(1);
                    let base=1.1;
                    let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(hasUpgrade("dynas_c",43)?0.235:hasUpgrade("dynas_w",15)?0.225:hasUpgrade("dynas_w",13)?0.2:hasUpgrade("dynas_c",35)?0.175:hasUpgrade("dynas_c",32)?0.15:hasUpgrade("dynas_c",24)?0.125:0.1));
                    if(hasUpgrade("dynas_c",14))ret=ret.mul(upgradeEffect("dynas_c",14));
                    if(hasUpgrade("dynas_c",21))ret=ret.mul(upgradeEffect("dynas_c",21));
                    ret=ret.mul(tmp.dynas_wf.effect2[0]);
                    ret = ret.mul(buyableEffect("dynas_bd",12));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            14: {
                title: "硬币升级14",
                description() {
                    return "硬币升级13效果基于动态点数提升"
                },
                cost: new Decimal(5),
                unlocked() { return true; },
                effect() {
                    if (player.dynas_b.banking & 2)return new Decimal(1);
                    let base=1.5;
                    let ret = Decimal.pow(base,Decimal.log10(player.modpoints[9].add(1)).pow(0.9));
                    ret = ret.mul(buyableEffect("dynas_bd",12));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            15: {
                title: "硬币升级15",
                description() {
                    return "基于动态点数提升点数获取"
                },
                cost: new Decimal(10),
                unlocked() { return true; },
                effect() {
                    if (player.dynas_b.banking & 2)return new Decimal(1);
                    let ret=player.modpoints[9];
                    if(ret.gte('1e1000'))ret = ret.pow(0.5).mul('1e500');
                    if(hasUpgrade("dynas_c",41))ret=ret.add(1).pow(3.5e8);
                    else ret=ret.add(1).pow(3.5e6);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            21: {
                title: "硬币升级21",
                description() {
                    return "硬币升级11-13效果基于动态点数提升"
                },
                cost: new Decimal(20),
                unlocked() { return true; },
                effect() {
                    if (player.dynas_b.banking & 2)return new Decimal(1);
                    let base=1.5;
                    if(hasUpgrade("dynas_c",33))base+=0.1;
                    let ret = Decimal.pow(base,Decimal.log10(player.modpoints[9].add(1)).pow(0.9));
                    if(hasUpgrade("dynas_c",42))ret=ret.pow(1.1);
                    if(hasUpgrade("dynas_c",22))ret=ret.mul(upgradeEffect("dynas_c",22));
                    if(hasUpgrade("dynas_c",31))ret=ret.mul(upgradeEffect("dynas_c",31));
                    ret=ret.mul(tmp.dynas_wf.effect2[0]);
                    if(hasUpgrade("dynas_w",11))ret=ret.pow(upgradeEffect("dynas_w",11));
                    ret = ret.mul(buyableEffect("dynas_bd",12));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            22: {
                title: "硬币升级22",
                description() {
                    return "硬币升级21效果基于硬币数量提升"
                },
                cost: new Decimal(100),
                unlocked() { return true; },
                effect() {
                    if (player.dynas_b.banking & 2)return new Decimal(1);
                    let base=1.2;
                    let ret = Decimal.pow(base,Decimal.log10(player.dynas_c.points.add(1)).pow(0.9));
                    if(hasUpgrade("dynas_c",23))ret=ret.mul(upgradeEffect("dynas_c",23));
                    ret=ret.mul(tmp.dynas_wf.effect2[0]);
                    ret = ret.mul(buyableEffect("dynas_bd",12));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            23: {
                title: "硬币升级23",
                description() {
                    return "硬币升级22效果基于硬币数量提升"
                },
                cost: new Decimal(1000),
                unlocked() { return true; },
                effect() {
                    if (player.dynas_b.banking & 2)return new Decimal(1);
                    let base=1.1;
                    let ret = Decimal.pow(base,Decimal.log10(player.dynas_c.points.add(1)).pow(0.9));
                    ret=ret.mul(tmp.dynas_wf.effect2[0]);
                    ret = ret.mul(buyableEffect("dynas_bd",12));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            24: {
                title: "硬币升级24",
                description() {
                    return "硬币升级13效果更好"
                },
                cost: new Decimal(5000),
                unlocked() { return true; },
            },
            25: {
                title: "硬币升级25",
                description() {
                    return "TPTC中的超级生成器更便宜"
                },
                cost: new Decimal(100000),
                unlocked() { return true; },
            },
            31: {
                title: "硬币升级31",
                description() {
                    return "基于最佳工人数量提升硬币升级11和21效果"
                },
                cost: new Decimal(1e7),
                unlocked() { return hasMilestone("dynas_w",0); },
                effect() {
                    if (player.dynas_b.banking & 2)return new Decimal(1);
                    let ret=player.dynas_w.best.pow(1/3).div(2).add(1);
                    if(hasUpgrade("dynas_w",11))ret=ret.pow(upgradeEffect("dynas_w",11));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            32: {
                title: "硬币升级32",
                description() {
                    return "硬币升级13效果更好"
                },
                cost: new Decimal(1e8),
                unlocked() { return hasMilestone("dynas_w",0); },
            },
            33: {
                title: "硬币升级33",
                description() {
                    return "硬币升级21效果更好"
                },
                cost: new Decimal(1e11),
                unlocked() { return hasMilestone("dynas_w",0); },
            },
            34: {
                title: "硬币升级34",
                description() {
                    return "解锁TPTC中的新声望升级"
                },
                cost: new Decimal(1e14),
                unlocked() { return hasMilestone("dynas_w",0); },
            },
            35: {
                title: "硬币升级35",
                description() {
                    return "硬币升级13效果更好"
                },
                cost: new Decimal(1e18),
                unlocked() { return hasMilestone("dynas_w",0); },
            },
            41: {
                title: "硬币升级41",
                description() {
                    return "硬币升级15效果更好"
                },
                cost: new Decimal(1e27),
                unlocked() { return hasMilestone("dynas_w",1); },
            },
            42: {
                title: "硬币升级42",
                description() {
                    return "硬币升级21的基础效果自我提升"
                },
                cost: new Decimal(1e50),
                unlocked() { return hasMilestone("dynas_w",1); },
            },
            43: {
                title: "硬币升级43",
                description() {
                    return "硬币升级13效果更好"
                },
                cost: new Decimal('e2e3'),
                unlocked() { return player.tm.buyables[9].gte(10); },
            },
        },
        update(diff){
            if(hasUpgrade("dynas_c",11))player.modpoints[9]=player.modpoints[9].add(upgradeEffect("dynas_c",11).mul(diff));
        },
    passiveGeneration(){
        if(hasMilestone("dynas_m",0))return 100;
        if(hasMilestone("dynas_wf",0))return 10;
        return 0;
    }
});


addLayer("dynas_wf", {
    name: "动态WF层", 
    symbol: "WF", 
    position: 0, 
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        workUndone: new Decimal(0),
        workDone: new Decimal(0),
    }},
    color: "#555555",
    requires: new Decimal(1e20), 
    resource: "工作搜寻者", 
    baseResource: "硬币", 
    baseAmount() {return player.dynas_c.points}, 
    type: "static", 
    base: 5000,
    exponent: 0.6, 
    gainMult() { 
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 1, 
    hotkeys: [],
    layerShown(){return player.tm.currentTree==9 && player.tm.buyables[9].gte(3);},
        
    effect() {
        let eff = player.dynas_wf.points.pow(1.25);
        if(hasUpgrade("dynas_wf",23))eff = eff.mul(5);
        if(hasUpgrade("dynas_wf",32))eff = eff.mul(hasUpgrade("dynas_wf",34)?2:1.5);
        eff = eff.mul(buyableEffect("dynas_bd", 11));
        eff = eff.mul(buyableEffect("dynas_wf", 21));
        if (hasUpgrade("dynas_wf", 33)) eff = eff.mul(upgradeEffect("dynas_wf", 33));
        return eff
    },
    effect2() {
        let wd=player.dynas_wf.workDone;
        let wu=player.dynas_wf.workUndone;
        
        let wue = wu.add(1).log(1e10).add(1).cbrt().recip();
        if(hasUpgrade("dynas_wf",25))wue = wue.sqrt();

        wue = wue.max(0.001);
        let wde = wd.add(1).pow(0.1).pow(wue).pow(tmp.dynas_wf.buyables[22].effect)
        if(hasUpgrade("dynas_wf",21))wde = wde.mul(wue.pow(3).add(1));
        if (player.dynas_b.banking & 1) wde = wde.pow(0.5)
        return [wde,wue]
    },
    effectDescription() {
        let eff=this.effect();
        return "每秒生成" + format(eff) + "未完成工作";
    },

    branches: [["dynas_c", 1]],

        doReset(l){
            if(l=="dynas_c" || l=="dynas_wf"  || l=="dynas_b" || l=="dynas_sp" || !l.startsWith("dynas_")){return;}
            layerDataReset("dynas_wf",["upgrades","milestones","challenges"]);
            return;
        },
        update(diff){
            player.dynas_wf.workUndone = player.dynas_wf.workUndone.add(this.effect().mul(diff));
            let w=layers.dynas_w.effect2().mul(diff).min(player.dynas_wf.workUndone);
            player.dynas_wf.workDone = player.dynas_wf.workDone.add(w);
            player.dynas_wf.workUndone = player.dynas_wf.workUndone.sub(w);
        },
    
    
    milestones: {
        0: {
            requirementDescription: () => "1个工作搜寻者",
            done() { return player.dynas_wf.best.gte(1) },
            effectDescription: () => "每秒获得1000%硬币增益"
        },
    },
    
    
    upgrades: {
        rows: 3,
        cols: 5,
        11: {
                title: "工作搜寻者升级11",
                description: "基于未完成工作数量更快完成工作",
                cost: new Decimal(250),
                unlocked() { return player.tm.buyables[9].gte(4) },
                effect() {
                    let ret = new Decimal(1).add(player.dynas_wf.workUndone).max(1).log(100).add(1)
                    if(hasUpgrade('dynas_wf',31))ret = new Decimal(1e6).add(player.dynas_wf.workUndone).max(1).log(100).add(1);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
        },
        12: {
                title: "工作搜寻者升级12",
                description: "基于已完成工作效果更快完成工作",
                cost: new Decimal(500),
                unlocked() { return player.tm.buyables[9].gte(4) },
                effect() {
                    let ret = Decimal.log(new Decimal(1).add(tmp.dynas_wf.effect2[0]).max(1), 10).add(1)
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
        },
        13: {
                title: "工作搜寻者升级13",
                description: "基于工作搜寻者数量更快完成工作",
                cost: new Decimal(750),
                unlocked() { return player.tm.buyables[9].gte(4) },
                effect() {
                    let ret = player.dynas_wf.points.pow(hasUpgrade("dynas_wf",22)?0.2:hasUpgrade("dynas_wf",15)?0.08:hasUpgrade("dynas_wf",14)?0.06:0.05).add(1);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
        },
        14: {
                title: "工作搜寻者升级14",
                description: "上一个升级效果更好",
                cost: new Decimal(1000),
                unlocked() { return player.tm.buyables[9].gte(4) },
        },
        15: {
                title: "工作搜寻者升级15",
                description: "上一个升级效果更好",
                cost: new Decimal(1250),
                unlocked() { return player.tm.buyables[9].gte(4) },
        },
        21: {
                title: "工作搜寻者升级21",
                description: "基于未完成工作效果提升已完成工作效果",
                cost: new Decimal(10000),
                effect() {
                    let ret = Decimal.pow(player.dynas_wf.workUndone.add(1).log(1e10).add(1).cbrt().recip(),3).add(1)
                    if(hasUpgrade("dynas_wf",25))ret = Decimal.pow(player.dynas_wf.workUndone.add(1).log(1e10).add(1).root(6).recip(),3).add(1)
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
                unlocked() { return player.tm.buyables[9].gte(6) },
        },
        22: {
                title: "工作搜寻者升级22",
                description: "工作搜寻者升级13效果更好",
                cost: new Decimal(15000),
                unlocked() { return player.tm.buyables[9].gte(6) },
        },
        23: {
                title: "工作搜寻者升级23",
                description: "工作搜寻速度提升5倍",
                cost: new Decimal(24000),
                unlocked() { return player.tm.buyables[9].gte(8) },
        },
        24: {
                title: "工作搜寻者升级24",
                description: "解锁清除工作的按钮",
                cost: new Decimal(27000),
                unlocked() { return player.tm.buyables[9].gte(9) },
        },
        25: {
                title: "工作搜寻者升级25",
                description: "未完成工作效果减弱",
                cost: new Decimal(34500),
                unlocked() { return player.tm.buyables[9].gte(10) },
        },
        31: {
                title: "工作搜寻者升级31",
                description: "工作搜寻者升级11效果更好",
                cost: new Decimal(65536),
                unlocked() { return player.tm.buyables[9].gte(11) },
        },
        32: {
                title: "工作搜寻者升级32",
                description(){
                    if(hasUpgrade("dynas_wf",34))return "工作搜寻速度提升2倍";
                    return "工作搜寻速度提升1.5倍";
                },
                cost: new Decimal(66666),
                unlocked() { return player.tm.buyables[9].gte(11) },
        },
        33: {
                title: "工作搜寻者升级33",
                description: "基于已完成工作提升工作搜寻和完成速度",
                cost: new Decimal(77500),
                unlocked() { return player.tm.buyables[9].gte(12) },
                effect() {
                    let ret = player.dynas_wf.workDone.add(10).log10();
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
        },
        34: {
                title: "工作搜寻者升级34",
                description: "工作搜寻者升级32效果更好，'提升工作搜寻者强度'可购买项更便宜",
                cost: new Decimal(81000),
                unlocked() { return player.tm.buyables[9].gte(12) },
        },
        35: {
                title: "工作搜寻者升级35",
                description: "基于工作搜寻/完成速度提升工作完成速度",
                cost: new Decimal(86000),
                effect() {
                    let ret=layers.dynas_wf.effect().div(layers.dynas_w.effect2()).sqrt().mul(1.1);
                    if(hasUpgrade("dynas_wf",35))ret=ret.pow(2);
                    return ret.max(1.1);
                },
                effectDisplay() { return format(this.effect())+"倍" },
                unlocked() { return player.tm.buyables[9].gte(12) },
        },
    },


    buyables: {
        rows: 2,
        cols: 3,
        11: {
            title: () => "提升工人强度",
            cost(x=player.dynas_wf.buyables[11]) {
                if (x.gte(10)) x = x.pow(x.div(10))
                let cost = Decimal.pow(10, x).mul(1000)
                return cost.floor()
            },
            effect(x=player.dynas_wf.buyables[11]) {
                if (!tmp[this.layer].buyables[12]) return Decimal.pow(1.35, x)

                let eff = new Decimal(1)
                if (tmp[this.layer].buyables[12].effect.add)
                    eff = Decimal.pow(tmp[this.layer].buyables[12].effect.add(1.35), x)
                if (tmp[this.layer].buyables[13])
                    eff = eff.pow(tmp[this.layer].buyables[13].effect)

                return eff;
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "等级 " + player[this.layer].buyables[this.id] + "\n\
                成本: " + format(data.cost) + " 已完成工作\n\
                每级提升工作完成速度×" + format(tmp[this.layer].buyables[12].effect.add ? tmp[this.layer].buyables[12].effect.add(1.35) : 1.35) + "\n\
                当前: ×" + format(data.effect)
            },
            unlocked() { return player.tm.buyables[9].gte(8) },
            canAfford() {
                return player[this.layer].workDone.gte && player[this.layer].workDone.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].workDone = player[this.layer].workDone.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
        },
        12: {
            title: () => "提升工人敏捷度",
            cost(x=player.dynas_wf.buyables[12]) {
                if (x.gte(10)) x = x.pow(x.div(10))
                let cost = Decimal.pow(10, x).mul(2000)
                return cost.floor()
            },
            effect(x=player.dynas_wf.buyables[12]) {
                let eff = x.mul(0.01)
                return eff;
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "等级 " + player[this.layer].buyables[this.id] + "\n\
                成本: " + format(data.cost) + " 已完成工作\n\
                每级提升前一个升级效果+0.01\n\
                当前: +" + format(data.effect)
            },
            unlocked() { return player.tm.buyables[9].gte(9) },
            canAfford() {
                return player[this.layer].workDone.gte && player[this.layer].workDone.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].workDone = player[this.layer].workDone.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
        },
        13: {
            title: () => "提升工人协作性",
            cost(x=player.dynas_wf.buyables[13]) {
                if (x.gte(10)) x = x.pow(x.div(10))
                let cost = Decimal.pow(20, x).mul(5000)
                return cost.floor()
            },
            effect(x=player.dynas_wf.buyables[13]) {
                let eff = x.mul(0.01).add(1)
                return eff;
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "等级 " + player[this.layer].buyables[this.id] + "\n\
                成本: " + format(data.cost) + " 已完成工作\n\
                每级提升第一个升级效果^+0.01\n\
                当前: ^" + format(data.effect)
            },
            unlocked() { return player.tm.buyables[9].gte(11) },
            canAfford() {
                return player[this.layer].workDone.gte && player[this.layer].workDone.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].workDone = player[this.layer].workDone.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
        },
        21: {
            title: () => "提升工作搜寻者强度",
            cost(x=player.dynas_wf.buyables[21]) {
                let cost = Decimal.pow(x.add(hasUpgrade("dynas_wf",34)?61:100), x.sqrt()).mul(hasUpgrade("dynas_wf",34)?7:10)
                return cost.floor()
            },
            effect(x=player.dynas_wf.buyables[21]) {
                let eff = Decimal.pow(1.1, x)
                return eff;
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "等级 " + player[this.layer].buyables[this.id] + "\n\
                成本: " + format(data.cost) + " 工作搜寻者\n\
                每级提升工作搜寻速度×" + format(1.1) + "\n\
                当前: ×" + format(data.effect)
            },
            unlocked() { return player.tm.buyables[9].gte(12) },
            canAfford() {
                return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
        },
        22: {
            title: () => "提升工作质量",
            cost(x=player.dynas_wf.buyables[22]) {
                if (x.gte(10)) x = x.pow(x.div(10))
                let cost = Decimal.pow(10, x).mul(1e12)
                return cost.floor()
            },
            effect(x=player.dynas_wf.buyables[22]) {
                let eff = x.mul(0.4).add(1).cbrt()
                return eff;
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "等级 " + player[this.layer].buyables[this.id] + "\n\
                成本: " + format(data.cost) + " 已完成工作\n\
                提升已完成工作效果\n\
                当前: ^" + format(data.effect)
            },
            unlocked() { return player.tm.buyables[9].gte(13) },
            canAfford() {
                return player[this.layer].workDone.gte && player[this.layer].workDone.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].workDone = player[this.layer].workDone.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
        },
    },

    clickables: {
            1: {
                title: "重置工作",
                display: "重置已完成和未完成工作",
                unlocked() {return hasUpgrade("dynas_wf",24);}, 
                canClick: true,
                onClick(){
                    player[this.layer].workDone=new Decimal(0);
                    player[this.layer].workUndone=new Decimal(0);
                },
                style: {'height':'100px','width':'150px'},
            },
    },

canBuyMax: true,
resetsNothing: () => hasMilestone("dynas_w",2),
autoPrestige: () => hasMilestone("dynas_w",2),


     tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
                    ["display-text",
                        function() {
                            return '你有'+format(player.dynas_wf.workDone)+'已完成工作，将硬币升级11-13和21-23提升'+format(tmp.dynas_wf.effect2[0])+'倍';
                        },
                        {}],
                    ["display-text",
                        function() {
                            return '你有'+format(player.dynas_wf.workUndone)+'未完成工作，将已完成工作效果提升^'+format(tmp.dynas_wf.effect2[1]);
                        },
                        {}],
            ["display-text",
                function () { if(player.tm.buyables[9].lt(8))return "更多可购买项在动态树等级8解锁";if(player.tm.buyables[9].lt(9))return "更多可购买项在动态树等级9解锁";if(player.tm.buyables[9].lt(11))return "更多可购买项在动态树等级11解锁";return "" }],
                        "milestones",
                        ["clickable",1],
                        "buyables",
                        "upgrades"
                ],
});


addLayer("dynas_w", {
    name: "动态W层",
    symbol: "W",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(1e6),
    resource: "工人",
    baseResource: "硬币",
    baseAmount() {return player.dynas_c.points},
    type: "static",
    base: 15000,
    exponent: 1.35,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 2,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==9 && player.tm.buyables[9].gte(2);},
        
    effect() {
        let eff = Decimal.pow(player.dynas_w.points.add(1), 2)
        if(hasMilestone("dynas_w",3))eff = eff.pow(3)
        if(hasMilestone("dynas_w",4))eff = eff.pow(3)
        if (player.dynas_b.banking & 1) eff = eff.pow(0.5)

        return eff
    },
    effectDescription() {
        let eff=this.effect();
        if(player.tm.buyables[9].gte(3))return "将动态点数获取提升×" + format(eff) +"并每秒完成"+format(this.effect2())+"工作";
        return "将动态点数获取提升×" + format(eff)
    },

effect2(){
    let eff = Decimal.pow(player.dynas_w.points, 1.25).mul(10);
    
                    if (hasUpgrade("dynas_wf", 11)) eff = eff.mul(upgradeEffect("dynas_wf", 11));
                    if (hasUpgrade("dynas_wf", 12)) eff = eff.mul(upgradeEffect("dynas_wf", 12));
                    if (hasUpgrade("dynas_wf", 13)) eff = eff.mul(upgradeEffect("dynas_wf", 13));
                    eff = eff.mul(buyableEffect("dynas_wf", 11));
                    
                    eff = eff.mul(buyableEffect("dynas_bd", 11));
        if (hasUpgrade("dynas_wf", 33)) eff = eff.mul(upgradeEffect("dynas_wf", 33));
        if (hasUpgrade("dynas_wf", 35)) eff = eff.mul(1.1);
        if (hasUpgrade("dynas_wf", 35)) eff = eff.max(eff.mul(1.1).mul(layers.dynas_wf.effect()).sqrt());
        
    return eff;
},


    branches: [["dynas_c", 1],["dynas_b", 1],["dynas_wf", 1]],
        doReset(l){
            if(l=="dynas_c" || l=="dynas_w" || l=="dynas_wf"  || l=="dynas_b" || l=="dynas_sp" || !l.startsWith("dynas_")){return;}
            layerDataReset("dynas_w",["upgrades","milestones","challenges"]);
            return;
        },
        upgrades: {
            rows: 2,
            cols: 5,
            11: {
                title: "工人升级11",
                description: "基于最佳工人数量提升硬币升级21和31效果",
                cost: new Decimal(3),
                unlocked() { return hasMilestone("dynas_w", 1) },
                effect() {
                    let ret = player[this.layer].best.div(20).add(1);
                    if (hasUpgrade(this.layer, 14)) ret = ret.add(player[this.layer].points.div(30));
                    
                    if (ret.gte(2.3))ret = ret.mul(2.3).sqrt();
                    if (ret.gte(2.9))ret = ret.mul(2.9).sqrt();
                    return ret.sqrt();
                },
                effectDisplay() { return "^" + format(this.effect()) },
            },
            12: {
                title: "工人升级12",
                description: "基于最佳工人数量提升硬币升级12基础效果",
                cost: new Decimal(4),
                unlocked() { return hasMilestone("dynas_w", 1) },
                effect() {
                    let ret = player[this.layer].best.div(20).add(1);
                    if (ret.gte(4))ret = ret.mul(4).sqrt();
                    return ret.pow(1/6);
                },
                effectDisplay() { return "^" + format(this.effect()) },
            },
            13: {
                title: "工人升级13",
                description: "硬币升级13效果更好",
                cost: new Decimal(5),
                unlocked() { return hasMilestone("dynas_w", 1) },
            },
            14: {
                title: "工人升级14",
                description: "当前工人数量也计入第一个升级公式",
                cost: new Decimal(9),
                unlocked() { return hasMilestone("dynas_w", 1) },
            },
            15: {
                title: "工人升级15",
                description: "硬币升级13效果更好",
                cost: new Decimal(53),
                unlocked() { return hasMilestone("dynas_w", 1) },
            },
        },
        update(diff){
            
        },
    
    
    milestones: {
        0: {
            requirementDescription: () => "1个工人",
            done() { return player[this.layer].best.gte(1) },
            effectDescription: () => "解锁新的一排硬币升级"
        },
        1: {
            requirementDescription: () => "3个工人",
            done() { return player[this.layer].best.gte(3) },
            effectDescription: () => "解锁工人升级",
        },
        2: {
            requirementDescription: () => "13个工人",
            done() { return player[this.layer].best.gte(13) },
            effectDescription: () => "雇佣工作搜寻者不再重置任何内容，自动雇佣工作搜寻者",
        },
        3: {
            requirementDescription: () => "22个工人",
            done() { return player[this.layer].best.gte(22) },
            effectDescription: () => "工人效果立方化",
        },
        4: {
            requirementDescription: () => "27个工人",
            done() { return player[this.layer].best.gte(27) },
            effectDescription: () => "工人效果再次立方化",
        },
        5: {
            requirementDescription: () => "30个工人",
            done() { return player[this.layer].best.gte(30) },
            effectDescription: () => "银行不再重置任何内容，自动建造银行",
        },
        6: {
            requirementDescription: () => "35个工人",
            done() { return player[this.layer].best.gte(35) },
            effectDescription: () => "可以购买最大工人数量",
        },
    },

canBuyMax: () => hasMilestone("dynas_w",6),
autoPrestige: () => hasMilestone("dynas_m",0),
resetsNothing: () => hasMilestone("dynas_m",0),
});


addLayer("dynas_b", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
            banking: 0,
            bankTime: new Decimal(0),
            speed: new Decimal(0),
        }
    },
    symbol: "B", // 显示在图层节点上的符号
    position: 2, // 行内水平位置

    layerShown(){return player.tm.currentTree==9 && player.tm.buyables[9].gte(4);},

    color: () => "#00FF00",
    resource: "银行", // 声望货币名称
    row: 1,

    baseResource: "动态点数", // 声望基于的资源名称
    baseAmount() { return player.modpoints[9] },

    requires: () => new Decimal('1e600'),

    type: "static",
    base: 50000,
    exponent: 1.25,
    canBuyMax: () => hasMilestone("dynas_w",5),
    resetsNothing: () => (hasMilestone("dynas_w",5) && player.dynas_b.banking==0),
    autoPrestige: () => hasMilestone("dynas_w",5),

    effect() {
        var eff = Decimal.pow(16, player.dynas_b.points)
        if (player.dynas_b.banking & 1) eff = eff.pow(0.5)
        return eff
    },
    effectDescription() {
        var eff = this.effect();
        return "将硬币获取提升" + format(eff) + "倍"
    },

    gainMult() {
        return new Decimal(1)
    },
    gainExp() {
        return new Decimal(1)
    },
    doReset(l){
        if(l=="dynas_c" || l=="dynas_wf"  || l=="dynas_b" || l=="dynas_sp" || !l.startsWith("dynas_")){return;}
        layerDataReset("dynas_b",["upgrades","milestones","challenges"]);
        return;
    },
    buyables: {
        rows: 3,
        cols: 3,
        11: {
            title: () => "硬币银行",
            cost(x) {
                return new Decimal(0)
            },
            effect(x) {
                var eff = player[this.layer].buyables[this.id].add(1).pow(0.15)
                eff = eff.mul(buyableEffect("dynas_b",21))
                if (eff.gte("1e45")) eff = eff.mul("1e45").sqrt()
                return eff
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return data.canAfford
                    ? "你有" + format(player[this.layer].buyables[this.id]) + "存入的硬币，将动态点数生成速度提升" + format(data.effect) + "倍。\n\n\
                        银行功能当前" + (player.dynas_b.banking == 1 ? "启用。\n\
                        点击此处禁用银行功能并获得" + format(player.dynas_c.points.sub(player.dynas_b.buyables[11]).max(0)) + "存入硬币" : "禁用。\n\
                        点击此处启用银行功能，这将平方根化所有动态点数生成速度、工人效果和已完成工作效果")
                    : (player.dynas_b.banking > 0 ? "请先禁用当前启用的银行功能" : "需要至少建造2个银行才能使用此功能")
            },
            unlocked() { return player.tm.buyables[9].gte(7) },
            canAfford() { return (player[this.layer].best.gte(2)) && (player[this.layer].banking == 0 || player[this.layer].banking == 1) },
            buy() {
                if (player.dynas_b.banking == 1) player.dynas_b.buyables[11] = player.dynas_b.buyables[11].max(player.dynas_c.points)
                player.dynas_b.banking = player.dynas_b.banking == 1 ? 0 : 1
                tmp[this.layer].resetsNothing=false
                doReset(this.layer, true)
            },
        },
        12: {
            title: () => "动态点数银行",
            cost(x) {
                return new Decimal(0)
            },
            effect(x) {
                var eff = player[this.layer].buyables[this.id].add(1).pow(0.15)
                eff = eff.mul(buyableEffect("dynas_b",21))
                if (eff.gte("1e45")) eff = eff.mul("1e45").sqrt()
                return eff
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return data.canAfford
                    ? "你有" + format(player[this.layer].buyables[this.id]) + "存入的动态点数，将动态点数生成速度提升" + format(data.effect) + "倍。\n\n\
                        银行功能当前" + (player.dynas_b.banking == 2 ? "启用。\n\
                        点击此处禁用银行功能并获得" + format(player.modpoints[9].sub(player.dynas_b.buyables[12]).max(0)) + "存入动态点数" : "禁用。\n\
                        点击此处启用银行功能，这将立方根化你的动态点数生成速度并禁用除前两个外的硬币升级")
                    : (player.dynas_b.banking > 0 ? "请先禁用当前启用的银行功能" : "需要至少建造4个银行才能使用此功能")
            },
            unlocked() { return player.tm.buyables[9].gte(7) },
            canAfford() { return (player[this.layer].best.gte(4)) && (player[this.layer].banking == 0 || player[this.layer].banking == 2) },
            buy() {
                if (player.dynas_b.banking == 2) player.dynas_b.buyables[12] = player.dynas_b.buyables[12].max(player.modpoints[9])
                player.dynas_b.banking = player.dynas_b.banking == 2 ? 0 : 2
                tmp[this.layer].resetsNothing=false
                doReset(this.layer, true)
            },
        },
        13: {
            title: () => "时间银行",
            cost(x) {
                return new Decimal(0)
            },
            effect(x) {
                var eff = player[this.layer].buyables[this.id].add(1).pow(0.15)
                eff = eff.mul(buyableEffect("dynas_b",21))
                if (eff.gte("1e45")) eff = eff.mul("1e45").sqrt()
                return eff
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return data.canAfford
                    ? "你有" + format(player[this.layer].buyables[this.id]) + "存入的时间，将动态点数生成速度提升" + format(data.effect) + "倍。\n\n\
                        银行功能当前" + (player.dynas_b.banking == 3 ? "启用。\n\
                        点击此处禁用银行功能并获得" + format(Decimal.sub(upgradeEffect("dynas_c",11), player.dynas_b.buyables[13]).max(0)) + "存入时间" : "禁用。\n\
                        点击此处启用银行功能，这将同时应用所有之前的银行减益效果。你存入的是每秒生成的动态点数")
                    : (player.dynas_b.banking > 0 ? "请先禁用当前启用的银行功能" : "需要至少建造6个银行才能使用此功能")
            },
            unlocked() { return player.tm.buyables[9].gte(9) },
            canAfford() { return (player[this.layer].best.gte(6)) && (player[this.layer].banking == 0 || player[this.layer].banking == 3) },
            buy() {
                if (player.dynas_b.banking == 3) player.dynas_b.buyables[13] = player.dynas_b.buyables[13].max(upgradeEffect("dynas_c",11))
                player.dynas_b.banking = player.dynas_b.banking == 3 ? 0 : 3
                tmp[this.layer].resetsNothing=false
                doReset(this.layer, true)
            },
        },
        21: {
            title: () => "元硬币银行",
            cost(x) {
                return new Decimal(0)
            },
            effect(x) {
                var eff = player[this.layer].buyables[this.id].mul(2.5).add(1).pow(0.1)
                var softcap = new Decimal("1e15")
                if (eff.gte(softcap)) eff = eff.mul(softcap).sqrt()
                return eff
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return data.canAfford
                    ? "你有" + format(player[this.layer].buyables[this.id]) + "存入的元硬币，将所有之前银行效果的增益提升" + format(data.effect) + "倍。\n\n\
                        银行功能当前" + (player.dynas_b.banking == 4 ? "启用。\n\
                        点击此处禁用银行功能并获得" + format(Decimal.sub(tmp.dynas_c.resetGain, player.dynas_b.buyables[21]).max(0)) + "存入元硬币" : "禁用。\n\
                        点击此处启用银行功能，这将十分之一根化你的动态点数生成和硬币获取。你存入的是硬币重置时的获取量")
                    : (player.dynas_b.banking > 0 ? "请先禁用当前启用的银行功能" : "需要至少建造12个银行才能使用此功能")
            },
            unlocked() { return player.tm.buyables[9].gte(12) },
            canAfford() { return (player[this.layer].best.gte(12)) && (player[this.layer].banking == 0 || player[this.layer].banking == 4) },
            buy() {
                if (player.dynas_b.banking == 4) player.dynas_b.buyables[21] = player.dynas_b.buyables[21].max(tmp.dynas_c.resetGain)
                player.dynas_b.banking = player.dynas_b.banking == 4 ? 0 : 4
                tmp[this.layer].resetsNothing=false
                tmp.dynas_c.resetGain=new Decimal(0)
                doReset(this.layer, true)
            },
        },
    },
    update(diff){
        if (player.dynas_b.banking == 0) player.dynas_b.bankTime = new Decimal(0)
        else player.dynas_b.bankTime = Decimal.add(player.dynas_b.bankTime, diff)
    },

    tabFormat: ["main-display",
                ["prestige-button", function () { return "建造 " }],
                ["blank", "5px"],
                ["display-text",
                    function () { return "你最多拥有过" + format(player.dynas_b.best, 0) + "个银行。" }],
                ["display-text",
                    function () { return player.dynas_b.banking > 0 ? ("你已启用银行功能" + formatTime(player.dynas_b.bankTime.toNumber()) + "。") : "" }],
                ["blank", "5px"],
                ["display-text",
                    function () { return "<h3>银行功能</h3><br/><h5>注意：启用/禁用银行功能将强制重置银行。<br/>对动态点数生成的总倍率：×" + format(tmp.dynas_b.buyables[11].effect.mul(tmp.dynas_b.buyables[12].effect).mul(tmp.dynas_b.buyables[13].effect)) + "</h5>" }],
                "buyables",
                ["display-text",
                    function () { if(player.tm.buyables[9].lt(7))return "更多银行功能在动态树等级7解锁";if(player.tm.buyables[9].lt(9))return "更多银行功能在动态树等级9解锁";if(player.tm.buyables[9].lt(12))return "更多银行功能在动态树等级12解锁";return player.dynas_b.banking & 16 ? ("你有" + format(player.dynas_b.speed) + "速度。") : "" }],
                , "milestones", "upgrades"],
})

addLayer("dynas_m", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
            autoWorkerReset: false,
            autoWorkfinderReset: false,
            allocated: 0,
            landsAvailable: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            landsAllocated: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
    },

    layerShown(){return player.tm.currentTree==9 && player.tm.buyables[9].gte(5);},

    name: "经理",
    color: () => "#77FFFF",
    resource: "经理",
    row: 3,
    symbol: "M",

    baseResource: "银行",
    baseAmount() { return player["dynas_b"].points },
    branches: [["dynas_w", 1], ["dynas_b", 1]],

    requires: () => new Decimal(50),

    type: "static",
    base: 1.22727,
    exponent: 1.01,
    canBuyMax: () => false,
    resetsNothing: () => false,
    
    effect() {
        var eff = Decimal.pow(64, player.dynas_m.points).pow(2)
        return eff
    },
    effectDescription() {
        eff = this.effect()
        return "将你的硬币和动态点数获取提升" + format(eff) + "倍"
    },

    gainMult() {
        return new Decimal(1)
    },
    gainExp() {
        return new Decimal(1)
    },
    doReset(l){
        if(l=="dynas_c" || l=="dynas_wf"  || l=="dynas_b" || l=="dynas_sp" || l=="dynas_w" || l=="dynas_m" || l=="dynas_bd" || !l.startsWith("dynas_")){return;}
        layerDataReset("dynas_m",["upgrades","milestones","challenges"]);
        return;
    },
    milestones: {
        0: {
            requirementDescription: () => "1名经理",
            done() { return player[this.layer].best.gte(1) },
            effectDescription: () => "你可以批量雇佣工人、工作搜寻者和银行，工人和工作搜寻者立即解锁，每秒获得硬币重置获取量的10000%，硬币重置不再重置任何内容。自动雇佣工人。工人重置不影响任何内容"
        },
    },

    tabFormat:
        ["main-display",
            ["prestige-button", function () { return "雇佣 " }],
            ["blank", "5px"],
            ["display-text",
                function () { return "你最多拥有过" + format(player.dynas_m.best, 0) + "名经理。" }],
            ["blank", "5px"], ["microtabs", "stuff"],
        ],
})

addLayer("dynas_bd", {
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
            allocated: new Decimal(1),
            building: 0,
            progress: new Decimal(0),
        }
    },

    layerShown() { return player.tm.buyables[9].gte(10) && player.tm.currentTree==9; },

    doReset(l){
        if(l=="dynas_c" || l=="dynas_wf"  || l=="dynas_b" || l=="dynas_sp" || l=="dynas_w" || l=="dynas_m" || l=="dynas_bd" || !l.startsWith("dynas_")){return;}
        layerDataReset("dynas_bd",["upgrades","milestones","challenges"]);
        return;
    },
    
    color: () => "#FFFF77",
    resource: "建筑工",
    row: 3,
    symbol:"BD",

    baseResource: "工人",
    baseAmount() { return player.dynas_w.points },
    branches: [["dynas_w", 1]],

    requires: () => new Decimal(80),

    effect() {
        return Decimal.pow(player.dynas_bd.points, 2).mul(player.dynas_c.points.add(1).log(100).add(1)).div(5)
    },

    effectDescription() {
        return "提供"+format(this.effect())+"建筑速度(基于硬币)";
    },

    type: "static",
    base: 1.25,
    exponent: 1.01,
    canBuyMax: () => false,

    gainMult() {
        return new Decimal(1)
    },
    gainExp() {
        return new Decimal(1)
    },
    
    buyables: {
        rows: 3,
        cols: 3,
        11: {
            title: () => "酒馆",
            cost(x=player.dynas_bd.buyables[11]) {
                if (x.gte(25)) x = x.pow(2).div(25)
                if (x.gte(15)) x = x.pow(2).div(15)
                return Decimal.pow(2, x).mul(1000)
            },
            effect(x=player.dynas_bd.buyables[11]) {
                return Decimal.pow(1.2, x)
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return data.canAfford
                    ? "你有" + format(player[this.layer].buyables[this.id], 0) + "座酒馆，将工作和完成速度提升" + format(data.effect) + "倍。" + 
                        (player.dynas_bd.building == 11 ? "\n\n\
                        进度: " + format(player.dynas_bd.progress, 0) + " / " + format(data.cost, 0) + " (" + format(Decimal.div(player.dynas_bd.progress, data.cost).mul(100)) + "%) \n\
                        预计完成时间: " + (Decimal.lte(tmp.dynas_bd.effect, 0) ? "无限" : formatTime(data.cost.sub(player.dynas_bd.progress).div(tmp.dynas_bd.effect))) + "\n\
                        点击此处停止建造" : "\n\n\
                        需要进度: " + format(data.cost, 0) + "\n\
                        点击此处开始建造")
                    : "你一次只能建造一个建筑"
            },
            unlocked() { return player.dynas_bd.points.gte(1) },
            canAfford() { return (player.dynas_bd.building == 0 || player.dynas_bd.building == 11) },
            buy() {
                player.dynas_bd.building = (player.dynas_bd.building == 11 ? 0 : 11)
            },
        },
        12: {
            title: () => "住宅区",
            cost(x=player.dynas_bd.buyables[12]) {
                if (x.gte(25)) x = x.pow(2).div(25)
                if (x.gte(15)) x = x.pow(2).div(15)
                return Decimal.pow(1.5, x).mul(800)
            },
            effect(x=player.dynas_bd.buyables[12]) {
                return Decimal.pow(1.2, x)
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return data.canAfford
                    ? "你有" + format(player[this.layer].buyables[this.id], 0) + "个住宅区，将硬币升级11-14和21-23效果提升" + format(data.effect) + "倍。" + 
                        (player.dynas_bd.building == 12 ? "\n\n\
                        进度: " + format(player.dynas_bd.progress, 0) + " / " + format(data.cost, 0) + " (" + format(Decimal.div(player.dynas_bd.progress, data.cost).mul(100)) + "%) \n\
                        预计完成时间: " + (Decimal.lte(tmp.dynas_bd.effect, 0) ? "无限" : formatTime(data.cost.sub(player.dynas_bd.progress).div(tmp.dynas_bd.effect))) + "\n\
                        点击此处停止建造" : "\n\n\
                        需要进度: " + format(data.cost, 0) + "\n\
                        点击此处开始建造")
                    : "你一次只能建造一个建筑"
            },
            unlocked() { return player.tm.buyables[9].gte(11) },
            canAfford() { return (player.dynas_bd.building == 0 || player.dynas_bd.building == 12) },
            buy() {
                player.dynas_bd.building = (player.dynas_bd.building == 12 ? 0 : 12)
            },
        },
    },
    
    update(diff) {
        if (player.dynas_bd.building)player.dynas_bd.progress = Decimal.add(player.dynas_bd.progress, Decimal.mul(tmp.dynas_bd.effect, diff))
        if (player.dynas_bd.building && player.dynas_bd.progress.gte(tmp.dynas_bd.buyables[player.dynas_bd.building].cost)) {
            player.dynas_bd.progress = player.dynas_bd.progress.sub(tmp.dynas_bd.buyables[player.dynas_bd.building].cost)
            player.dynas_bd.buyables[player.dynas_bd.building] = player.dynas_bd.buyables[player.dynas_bd.building].add(1)
        }
    },   

    tabFormat:
        ["main-display",
            ["prestige-button", function () { return "雇佣 " }],
            ["blank", "5px"],
            ["display-text",
                function () { return "你最多拥有过" + format(player.dynas_bd.best, 0) + "名建筑工。" }],
            ["blank", "5px"],
            ["display-text",
                function () { return player.dynas_bd.points.gte(1) ? "<h3>建筑</h3>" : "" }],
            "buyables",
            ["blank", "5px"],
            ["display-text",
                function () { if(player.dynas_bd.points.lt(1))return "";if(player.tm.buyables[9].lt(11))return "更多建筑在动态树等级11解锁"; }],
            ["blank", "5px"], 
            "upgrades"],
})

