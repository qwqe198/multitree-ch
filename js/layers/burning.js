addLayer("burning_a", {
    name: "燃烧A层", // 可选，仅在少数地方使用，如果省略则使用图层ID
    symbol: "A", // 显示在图层节点上的符号，默认为ID首字母大写
    position: 1, // row内水平位置，默认按图层ID字母排序
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        flameStrength: new Decimal(0)
    }},
    color: "#444444",
    requires: new Decimal(10), // 可以是考虑需求增长的函数
    resource: "灰烬", // 声望货币名称
    baseResource: "余烬", // 声望基于的资源名称
    baseAmount() {return player.modpoints[4]}, // 获取当前基础资源量
    type: "normal", // normal: 获取货币的成本取决于获取量 static: 成本取决于已有量
    exponent: 0.5, // 声望货币指数
    gainMult() { // 计算来自加成的货币乘数
        mult = new Decimal(1)
        if(hasUpgrade("burning_a",22))mult=mult.mul(upgradeEffect("burning_a",22));
        if(hasUpgrade("tptc_p",23))mult=mult.mul(upgradeEffect("tptc_p",23));
        mult=mult.mul(tmp.burning_e.allocatedEffects[1]);
        return mult
    },
    gainExp() { // 计算来自加成的货币指数
        return new Decimal(1)
    },
    row: 0, // 图层在树中的row(0是第一row)
    hotkeys: [],
    layerShown(){return player.tm.currentTree==4;},
        
        doReset(l){
            if(!l.startsWith("burning_")){return;}
            player.burning_a.flameStrength=layers.burning_a.maxFlameStrength();
            if(l=="burning_a" || !l.startsWith("burning_")){return;}
            layerDataReset("burning_a",["upgrades","milestones","challenges"]);
            player.burning_a.flameStrength=layers.burning_a.maxFlameStrength();
            return;
        },
        
    hotkeys: [
        {key: "a", description: "a: 重置余烬获取灰烬",
            onPress(){if (player.tm.currentTree==4 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==4}}
    ],
    
        upgrades: {
            rows: 4,
            cols: 4,
            11: {
                title: "灰烬升级11",
                description: "开始产生余烬。",
                cost: new Decimal(0),
                unlocked() { return true; },
                onPurchase(){
                    player.burning_a.flameStrength=new Decimal(1);
                }
            },
            12: {
                title: "灰烬升级12",
                description: "火焰强度衰减速度减半。",
                cost: new Decimal(2),
                unlocked() { return true; },
            },
            13: {
                title: "灰烬升级13",
                description: "基于灰烬数量获得更多余烬。",
                cost: new Decimal(2),
                unlocked() { return true; },
                effect() {
                    let base=3;
                    let ret = Decimal.pow(base,Decimal.log10(player.burning_a.points.add(3)).pow(0.9));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            14: {
                title: "灰烬升级14",
                description: "余烬提升点数获取。",
                cost: new Decimal(5),
                unlocked() { return true; },
                effect() {
                    let base=1e10;
                    let ret = Decimal.pow(base,Decimal.log10(player.modpoints[4].mul(10).add(1)).pow(0.9));
                    if(hasUpgrade("burning_a",23))ret=ret.pow(3);
                    if(hasUpgrade("burning_c",11))ret=ret.pow(upgradeEffect("burning_c",11));
                    if(hasUpgrade("burning_e",13))ret=ret.pow(layers.burning_e.allocatedEffects()[3]);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            21: {
                title: "灰烬升级21",
                description: "点数提升余烬获取。",
                cost: new Decimal(25),
                unlocked() { return player.tm.buyables[4].gte(2); },
                effect() {
                    let base=1.01;
                    let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.5));
                    if(hasUpgrade("burning_a",42))ret=ret.pow(2);
                    if(hasUpgrade("burning_c",21))ret=ret.pow(upgradeEffect("burning_c",21));
                    if(hasUpgrade("burning_e",25))ret=ret.pow(layers.burning_e.allocatedEffects()[5]);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            22: {
                title: "灰烬升级22",
                description: "火焰提升灰烬获取。",
                cost: new Decimal(100),
                unlocked() { return player.tm.buyables[4].gte(2); },
                effect() {
                    let base=3;
                    let ret = Decimal.pow(base,Decimal.log10(player.burning_a.flameStrength.add(1)).pow(0.5));
                    if(hasUpgrade("burning_a",43))ret=ret.pow(2);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            23: {
                title: "灰烬升级23",
                description: "灰烬升级14效果立方化。",
                cost: new Decimal(300),
                unlocked() { return player.tm.buyables[4].gte(2); },
            },
            24: {
                title: "灰烬升级24",
                description: "解锁经典声望树中的一个声望升级。",
                cost: new Decimal(500),
                unlocked() { return player.tm.buyables[4].gte(2); },
            },
            31: {
                title: "灰烬升级31",
                description(){
                    return "保留"+format(this.effect().mul(100))+"%的最大火焰强度。";
                },
                cost: new Decimal(1e8),
                unlocked() { return player.tm.buyables[4].gte(3); },
                effect() {
                    let ret=new Decimal(0.02);
                    if(hasUpgrade("burning_a",33))ret=ret.add(upgradeEffect("burning_a",33));
                    if(hasUpgrade("burning_c",15))ret=ret.add(0.2);
                    if(hasUpgrade("burning_e",15))ret=ret.add(0.2);
                    return ret;
                },
            },
            32: {
                title: "灰烬升级32",
                description: "火焰衰减使用更好的公式。",
                cost: new Decimal(1e9),
                unlocked() { return player.tm.buyables[4].gte(3); },
            },
            33: {
                title: "灰烬升级33",
                description: "灰烬升级31效果基于灰烬升级数量提升。",
                cost: new Decimal(1e20),
                unlocked() { return player.tm.buyables[4].gte(3); },
                effect() {
                    return new Decimal(player.burning_a.upgrades.length).mul(0.015);
                },
                effectDisplay() { return "+"+format(this.effect().mul(100))+"%" },
            },
            34: {
                title: "灰烬升级34",
                description: "每秒获得100%的灰烬获取量。",
                cost: new Decimal(1e25),
                unlocked() { return player.tm.buyables[4].gte(3); },
            },
            41: {
                title: "灰烬升级41",
                description: "电力提升火焰强度。",
                cost: new Decimal(1e30),
                unlocked() { return player.tm.buyables[4].gte(4); },
                effect() {
                    let base=2;
                    let ret = Decimal.pow(base,Decimal.log10(player.burning_e.points.add(1)).pow(0.5));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            42: {
                title: "灰烬升级42",
                description: "灰烬升级21效果平方化。",
                cost: new Decimal(1e50),
                unlocked() { return player.tm.buyables[4].gte(4); },
            },
            43: {
                title: "灰烬升级43",
                description: "灰烬升级22效果平方化。",
                cost: new Decimal(1e75),
                unlocked() { return player.tm.buyables[4].gte(4); },
            },
            44: {
                title: "灰烬升级44",
                description: "灰烬提升电力获取。",
                cost: new Decimal(1e80),
                unlocked() { return player.tm.buyables[4].gte(5); },
                effect() {
                    let base=2;
                    let ret = Decimal.pow(base,Decimal.log10(player.burning_a.points.add(1)).pow(0.5));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
        },
        maxFlameStrength(){
            let ret=new Decimal(1);
            ret=ret.mul(tmp.burning_c.effect);
            ret=ret.mul(tmp.burning_e.allocatedEffects[0]);
            if(hasUpgrade("burning_a",41))ret=ret.mul(upgradeEffect("burning_a",41));
            return ret;
        },
        update(diff){
            let mult=new Decimal(25);
            if(hasUpgrade("burning_a",13))mult=mult.mul(upgradeEffect("burning_a",13));
            if(hasUpgrade("burning_a",21))mult=mult.mul(upgradeEffect("burning_a",21));
            mult=mult.mul(tmp.burning_e.allocatedEffects[2]);
            if(hasUpgrade("burning_c",12))mult=mult.mul(upgradeEffect("burning_c",12));
            if(hasUpgrade("burning_a",11) && hasUpgrade("burning_a",32)){
                player.burning_a.flameStrength=player.burning_a.flameStrength.min(tmp.burning_a.maxFlameStrength);
                player.modpoints[4]=player.modpoints[4].add(player.burning_a.flameStrength.mul(mult).mul(diff));
                player.burning_a.flameStrength=player.burning_a.flameStrength.sub(tmp.burning_a.flameKeep).mul(Decimal.pow(0.5,tmp.burning_a.flameDecay.mul(diff))).add(tmp.burning_a.flameKeep).max(tmp.burning_a.flameKeep);
            }else if(hasUpgrade("burning_a",11)){
                player.burning_a.flameStrength=player.burning_a.flameStrength.min(tmp.burning_a.maxFlameStrength);
                player.modpoints[4]=player.modpoints[4].add(player.burning_a.flameStrength.mul(mult).mul(diff));
                player.burning_a.flameStrength=player.burning_a.flameStrength.sub(tmp.burning_a.flameDecay.mul(diff)).max(tmp.burning_a.flameKeep);
            }
        },
        flameDecay(){
            let ret=new Decimal(1);
            if(hasUpgrade("burning_a",12))ret=ret.div(2);
            if(!hasUpgrade("burning_a",32))ret=ret.mul(tmp.burning_a.maxFlameStrength);
            return ret;
        },
        flameKeep(){
            let ret=new Decimal(0);
            if(hasUpgrade("burning_a",31))ret=new Decimal(upgradeEffect("burning_a",31));
            ret=ret.mul(tmp.burning_a.maxFlameStrength);
            return ret;
        },
    passiveGeneration(){
        if(hasUpgrade("burning_a",34))return 1;
        return 0;
    }
});


addLayer("burning_c", {
    name: "燃烧C层",
    symbol: "C",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0)
    }},
    color: "#666666",
    requires: new Decimal(100),
    resource: "煤炭",
    baseResource: "余烬",
    baseAmount() {return player.modpoints[4]},
    type: "static",
    base: 2,
    exponent: 1.1,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 1,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==4 && player.tm.buyables[4].gte(2);},
        
        doReset(l){
            if(!l.startsWith("burning_")){return;}
            if(l=="burning_a" || l=="burning_c" || l=="burning_e" || !l.startsWith("burning_")){return;}
            layerDataReset("burning_c",["upgrades","milestones","challenges"]);
            return;
        },
        
    hotkeys: [
        {key: "c", description: "c: 重置余烬获取煤炭",
            onPress(){if (player.tm.currentTree==4 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==4}}
    ],
    
    effect() {
        let effect = player[this.layer].points.add(1).pow(0.75)
        if(hasUpgrade("burning_c",15))effect = player[this.layer].points.add(1).mul(Decimal.pow(1.05,player[this.layer].points));
        if(hasUpgrade("burning_e",24))effect = effect.pow(layers.burning_e.allocatedEffects()[4]);
        return effect
    },

    effectDescription() {
        return "提升火焰效果" + format(tmp[this.layer].effect) + "倍"
    },
     branches: ["burning_a"],
     upgrades: {
            rows: 2,
            cols: 5,
            11: {
                title: "煤炭升级11",
                description: "基于最佳煤炭数量提升灰烬升级14效果。",
                cost: new Decimal(12),
                unlocked() { return player.tm.buyables[4].gte(3); },
                effect() {
                    let base=3;
                    let ret = Decimal.pow(base,Decimal.log10(player.burning_c.best.add(3)).pow(0.9));
                    ret=ret.min(2000/3);
                    return ret;
                },
                effectDisplay() { return "^"+format(this.effect()) },
            },
            12: {
                title: "煤炭升级12",
                description: "煤炭提升余烬获取。",
                cost: new Decimal(15),
                unlocked() { return player.tm.buyables[4].gte(3); },
                effect() {
                    return Decimal.pow(1.2,player.burning_c.points).mul(1.25);
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            13: {
                title: "煤炭升级13",
                description: "煤炭提升电力获取。不错。",
                cost: new Decimal(69),
                unlocked() { return player.tm.buyables[4].gte(4); },
                effect() {
                    return player.burning_c.points.add(1);
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            14: {
                title: "煤炭升级14",
                description: "自动购买煤炭，煤炭重置不重置任何内容，可以购买最大煤炭。",
                cost: new Decimal(100),
                unlocked() { return player.tm.buyables[4].gte(4); },
            },
            15: {
                title: "煤炭升级15",
                description: "煤炭效果使用更好的公式，灰烬升级31效果+20%。",
                cost: new Decimal(125),
                unlocked() { return player.tm.buyables[4].gte(5); },
            },
            21: {
                title: "煤炭升级21",
                description: "基于最佳煤炭数量提升灰烬升级21效果。",
                cost: new Decimal(200),
                unlocked() { return hasUpgrade("tm",13); },
                effect() {
                    let base=1.2;
                    if(hasUpgrade("burning_c",22))base+=0.3;
                    if(hasUpgrade("burning_c",23))base+=0.3;
                    if(hasUpgrade("burning_c",24))base+=0.2;
                    if(hasUpgrade("burning_c",25))base+=0.1;
                    let ret = Decimal.pow(base,Decimal.log10(player.burning_c.best.add(3)).pow(0.9));
                    return ret;
                },
                effectDisplay() { return "^"+format(this.effect()) },
            },
            22: {
                title: "煤炭升级22",
                description: "煤炭升级21效果更好。",
                cost: new Decimal(333),
                unlocked() { return hasUpgrade("tm",13); },
            },
            23: {
                title: "煤炭升级23",
                description: "煤炭升级21效果更好。",
                cost: new Decimal(500),
                unlocked() { return hasUpgrade("tm",13); },
            },
            24: {
                title: "煤炭升级24",
                description: "煤炭升级21效果更好。",
                cost: new Decimal(2000),
                unlocked() { return hasUpgrade("tm",24); },
            },
            25: {
                title: "煤炭升级25",
                description: "煤炭升级21效果更好。",
                cost: new Decimal(4000),
                unlocked() { return hasUpgrade("tm",24); },
            },
     },
     
        
        canBuyMax() {return hasUpgrade("burning_c",14);},
     autoPrestige(){
         return hasUpgrade("burning_c",14);
     },resetsNothing(){
         return hasUpgrade("burning_c",14)
     },
});


addLayer("burning_e", {
    name: "燃烧E层",
    symbol: "E",
    position: 1,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        allocation: [0,0,0,0,0,0],
    }},
    color: "#dddd00",
    requires: new Decimal(100),
    resource: "电力",
    baseResource: "余烬",
    baseAmount() {return player.modpoints[4]},
    type: "normal",
    exponent: 0.65,
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("burning_c",13))mult=mult.mul(upgradeEffect("burning_c",13));
        if(hasUpgrade("burning_e",15))mult=mult.mul(upgradeEffect("burning_e",15));
            if(hasUpgrade("burning_a",44))mult=mult.mul(upgradeEffect("burning_a",44));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 1,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==4 && player.tm.buyables[4].gte(3);},
        
        doReset(l){
            if(!l.startsWith("burning_")){return;}
            if(l=="burning_a" || l=="burning_c" || l=="burning_e" || !l.startsWith("burning_")){return;}
            layerDataReset("burning_c",["upgrades","milestones","challenges"]);
            return;
        },
        
    hotkeys: [
        {key: "e", description: "e: 重置余烬获取电力",
            onPress(){if (player.tm.currentTree==4 && canReset(this.layer) && player.tm.buyables[4].gte(3)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==4}}
    ],
    
    effect() {
        let base=3;
        let ret = Decimal.pow(base,Decimal.log10(player.burning_e.points.add(1)).pow(0.9));
        if (ret.gte("1e1050000")) ret = ret.root(10).times("1e945000")
        return ret;
    },

    effectDescription() {
        return "为分配的电力提供" + format(tmp[this.layer].effect) + "倍强度"
    },
     branches: ["burning_a"],
     tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
                    ["display-text",function(){return '已分配电力点数: ' + formatWhole(tmp.burning_e.totalAllocation) + '/' + formatWhole(tmp.burning_e.maxAllocation) + ', 下次在'+format(tmp.burning_e.maxAllocationNext)+'电力'}],
                    ["display-text",function(){return '单条电力条最大点数: ' + formatWhole(tmp.burning_e.maxAllocation2)}],
                    "blank",
        ["row", [["clickable", 11], "blank", ["bar", "flameBoost"], "blank", ["clickable", 12]]],
        "blank",
        ["row", [["clickable", 21], "blank", ["bar", "ashBoost"], "blank", ["clickable", 22]]],
        "blank",
        ["row", [["clickable", 31], "blank", ["bar", "emberBoost"], "blank", ["clickable", 32]]],
        "blank",
        ["row", [["clickable", 41], "blank", ["bar", "a14Boost"], "blank", ["clickable", 42]]],
        "blank",
        ["row", [["clickable", 51], "blank", ["bar", "coalBoost"], "blank", ["clickable", 52]]],
        "blank",
        ["row", [["clickable", 61], "blank", ["bar", "a21Boost"], "blank", ["clickable", 62]]],
                    "upgrades"
                ],
        
    bars: {
        flameBoost: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player[this.layer].allocation[0] / layers[this.layer].maxAllocation2()
            },
            display() {
                return "提升火焰效果(" + format(layers[this.layer].allocatedEffects()[0]) + "倍)"
            },
            baseStyle: {
                "background-color": "#FFFFFF"
            },
            fillStyle: {
                "background-color": "#DDDD00"
            },
            textStyle: {
                "color": "#000000"
            }
        },
        ashBoost: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player[this.layer].allocation[1] / layers[this.layer].maxAllocation2()
            },
            display() {
                return "提升灰烬获取(" + format(layers[this.layer].allocatedEffects()[1]) + "倍)"
            },
            baseStyle: {
                "background-color": "#FFFFFF"
            },
            fillStyle: {
                "background-color": "#DDDD00"
            },
            textStyle: {
                "color": "#000000"
            }
        },
        emberBoost: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player[this.layer].allocation[2] / layers[this.layer].maxAllocation2()
            },
            display() {
                return "提升余烬获取(" + format(layers[this.layer].allocatedEffects()[2]) + "倍)"
            },
            baseStyle: {
                "background-color": "#FFFFFF"
            },
            fillStyle: {
                "background-color": "#DDDD00"
            },
            textStyle: {
                "color": "#000000"
            }
        },
        a14Boost: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player[this.layer].allocation[3] / layers[this.layer].maxAllocation2()
            },
            display() {
                return "提升灰烬升级14(^" + format(layers[this.layer].allocatedEffects()[3]) + ")"
            },
            baseStyle: {
                "background-color": "#FFFFFF"
            },
            fillStyle: {
                "background-color": "#DDDD00"
            },
            textStyle: {
                "color": "#000000"
            },
            unlocked(){
                return hasUpgrade("burning_e",13);
            },
        },
        coalBoost: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player[this.layer].allocation[4] / layers[this.layer].maxAllocation2()
            },
            display() {
                return "提升煤炭效果(^" + format(layers[this.layer].allocatedEffects()[4]) + ")"
            },
            baseStyle: {
                "background-color": "#FFFFFF"
            },
            fillStyle: {
                "background-color": "#DDDD00"
            },
            textStyle: {
                "color": "#000000"
            },
            unlocked(){
                return hasUpgrade("burning_e",24);
            },
        },
        a21Boost: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player[this.layer].allocation[5] / layers[this.layer].maxAllocation2()
            },
            display() {
                return "提升灰烬升级21(^" + format(layers[this.layer].allocatedEffects()[5]) + ")"
            },
            baseStyle: {
                "background-color": "#FFFFFF"
            },
            fillStyle: {
                "background-color": "#DDDD00"
            },
            textStyle: {
                "color": "#000000"
            },
            unlocked(){
                return hasUpgrade("burning_e",25);
            },
        },
    },
                clickables: {
        rows: 6,
        cols: 2,
        11: {
            display() {
                return "<h1><b>-</b></h1>"
            },
            canClick() {
                return player[this.layer].allocation[0] > 0
            },
            onClick(){
                player[this.layer].allocation[0] = Math.round(player[this.layer].allocation[0] - 1)
            },
            style: {
                "width": "50px",
                "height": "50px"
            }
        },
        12: {
            display() {
                return "<h1><b>+</b></h1>"
            },
            canClick() {
                return layers[this.layer].totalAllocation() < layers[this.layer].maxAllocation() && player[this.layer].allocation[0] < layers[this.layer].maxAllocation2()
            },
            onClick(){
                player[this.layer].allocation[0] = Math.round(player[this.layer].allocation[0] + 1)
            },
            style: {
                "width": "50px",
                "height": "50px"
            }
        },
        21: {
            display() {
                return "<h1><b>-</b></h1>"
            },
            canClick() {
                return player[this.layer].allocation[1] > 0
            },
            onClick(){
                player[this.layer].allocation[1] = Math.round(player[this.layer].allocation[1] - 1)
            },
            style: {
                "width": "50px",
                "height": "50px"
            }
        },
        22: {
            display() {
                return "<h1><b>+</b></h1>"
            },
            canClick() {
                return layers[this.layer].totalAllocation() < layers[this.layer].maxAllocation() && player[this.layer].allocation[1] < layers[this.layer].maxAllocation2()
            },
            onClick(){
                player[this.layer].allocation[1] = Math.round(player[this.layer].allocation[1] + 1)
            },
            style: {
                "width": "50px",
                "height": "50px"
            }
        },
        31: {
            display() {
                return "<h1><b>-</b></h1>"
            },
            canClick() {
                return player[this.layer].allocation[2] > 0
            },
            onClick(){
                player[this.layer].allocation[2] = Math.round(player[this.layer].allocation[2] - 1)
            },
            style: {
                "width": "50px",
                "height": "50px"
            }
        },
        32: {
            display() {
                return "<h1><b>+</b></h1>"
            },
            canClick() {
                return layers[this.layer].totalAllocation() < layers[this.layer].maxAllocation() && player[this.layer].allocation[2] < layers[this.layer].maxAllocation2()
            },
            onClick(){
                player[this.layer].allocation[2] = Math.round(player[this.layer].allocation[2] + 1)
            },
            style: {
                "width": "50px",
                "height": "50px"
            }
        },
        41: {
            display() {
                return "<h1><b>-</b></h1>"
            },
            canClick() {
                return player[this.layer].allocation[3] > 0
            },
            onClick(){
                player[this.layer].allocation[3] = Math.round(player[this.layer].allocation[3] - 1)
            },
            unlocked(){
                return hasUpgrade("burning_e",13);
            },
            style: {
                "width": "50px",
                "height": "50px"
            }
        },
        42: {
            display() {
                return "<h1><b>+</b></h1>"
            },
            canClick() {
                return layers[this.layer].totalAllocation() < layers[this.layer].maxAllocation() && player[this.layer].allocation[3] < layers[this.layer].maxAllocation2()
            },
            onClick(){
                player[this.layer].allocation[3] = Math.round(player[this.layer].allocation[3] + 1)
            },
            unlocked(){
                return hasUpgrade("burning_e",13);
            },
            style: {
                "width": "50px",
                "height": "50px"
            }
        },
        51: {
            display() {
                return "<h1><b>-</b></h1>"
            },
            canClick() {
                return player[this.layer].allocation[4] > 0
            },
            onClick(){
                player[this.layer].allocation[4] = Math.round(player[this.layer].allocation[4] - 1)
            },
            unlocked(){
                return hasUpgrade("burning_e",24);
            },
            style: {
                "width": "50px",
                "height": "50px"
            }
        },
        52: {
            display() {
                return "<h1><b>+</b></h1>"
            },
            canClick() {
                return layers[this.layer].totalAllocation() < layers[this.layer].maxAllocation() && player[this.layer].allocation[4] < layers[this.layer].maxAllocation2()
            },
            onClick(){
                player[this.layer].allocation[4] = Math.round(player[this.layer].allocation[4] + 1)
            },
            unlocked(){
                return hasUpgrade("burning_e",24);
            },
            style: {
                "width": "50px",
                "height": "50px"
            }
        },
        61: {
            display() {
                return "<h1><b>-</b></h1>"
            },
            canClick() {
                return player[this.layer].allocation[5] > 0
            },
            onClick(){
                player[this.layer].allocation[5] = Math.round(player[this.layer].allocation[5] - 1)
            },
            unlocked(){
                return hasUpgrade("burning_e",25);
            },
            style: {
                "width": "50px",
                "height": "50px"
            }
        },
        62: {
            display() {
                return "<h1><b>+</b></h1>"
            },
            canClick() {
                return layers[this.layer].totalAllocation() < layers[this.layer].maxAllocation() && player[this.layer].allocation[5] < layers[this.layer].maxAllocation2()
            },
            onClick(){
                player[this.layer].allocation[5] = Math.round(player[this.layer].allocation[5] + 1)
            },
            unlocked(){
                return hasUpgrade("burning_e",25);
            },
            style: {
                "width": "50px",
                "height": "50px"
            }
        },
    },
    totalAllocation(){
        return player[this.layer].allocation[0] + player[this.layer].allocation[1] + player[this.layer].allocation[2] + player[this.layer].allocation[3] + player[this.layer].allocation[4] + player[this.layer].allocation[5]
    },
    maxAllocation(){
        let base=10;
        if(hasUpgrade("burning_e",11))base=5;
        let ret=Decimal.log(player[this.layer].points.add(base-1),base);
        if(ret.gte(500))ret = ret.mul(2).log10().mul(100).add(200);
        return Math.floor(ret.min(1e10).toNumber());
    },
    maxAllocationNext(){
        let base=10;
        if(hasUpgrade("burning_e",11))base=5;
        if(tmp[this.layer].maxAllocation>=500){
            return Decimal.pow(base,Decimal.pow(10,(tmp[this.layer].maxAllocation-199)/100).div(2)).sub(base-1);
        }
        return Decimal.pow(base,tmp[this.layer].maxAllocation+1).sub(base-1);
    },
    maxAllocation2(){
        let ret=3;
        if(hasUpgrade("burning_e",12))ret=ret+upgradeEffect("burning_e",12);
        return ret;
    },
    allocatedEffects(){
        let ret=[
        tmp[this.layer].effect.mul(player[this.layer].allocation[0]**layers[this.layer].allocationPower() / 100).add(1).pow(0.75),
        tmp[this.layer].effect.mul(player[this.layer].allocation[1]**layers[this.layer].allocationPower() / 100).add(1),
        tmp[this.layer].effect.mul(player[this.layer].allocation[2]**layers[this.layer].allocationPower() / 100).add(1).pow(1.25),
        tmp[this.layer].effect.mul(Decimal.pow(2,player[this.layer].allocation[3]**layers[this.layer].allocationPower()).sub(1)).div(1e8).add(1).log10().pow(0.5).div(10).add(1),
        tmp[this.layer].effect.mul(Decimal.pow(2,player[this.layer].allocation[4]**layers[this.layer].allocationPower()).sub(1)).div("1e1000").add(1).log10().pow(0.5).div(100).add(1).min(1.9),
        tmp[this.layer].effect.mul(Decimal.pow(2,player[this.layer].allocation[5]**layers[this.layer].allocationPower()).sub(1)).div("1e2500").add(1).log10().pow(0.5).div(65).add(1).min(2.2)
        ];
        if(ret[3].gte(70))ret[3]=ret[3].mul(70).sqrt();
        if(ret[3].gte(81))ret[3]=ret[3].mul(81).sqrt();
        ret[3]=ret[3].min(100);
        return ret;
    },
    allocationPower(){
        let ret=1;
        if(hasUpgrade("burning_e",21))ret=ret+0.3;
        if(hasUpgrade("burning_e",22))ret=ret+0.3;
        if(hasUpgrade("burning_e",23))ret=ret+0.2;
        return ret;
    },
    
        upgrades: {
            rows: 3,
            cols: 5,
            11: {
                title: "电力升级11",
                description: "电力点数基数降为5。",
                cost: new Decimal(10000),
                unlocked() { return true; },
            },
            12: {
                title: "电力升级12",
                description: "基于电力升级数量提升单条电力条最大点数。",
                cost: new Decimal(1e10),
                unlocked() { return true; },
                effect() {
                    return player.burning_e.upgrades.length*player.burning_e.upgrades.length;
                },
                effectDisplay() { return "+"+format(this.effect()) },
            },
            13: {
                title: "电力升级13",
                description: "解锁一个电力条。",
                cost: new Decimal(1e20),
                unlocked() { return player.tm.buyables[4].gte(4); },
            },
            14: {
                title: "电力升级14",
                description: "每秒获得100%的电力获取量。",
                cost: new Decimal(1e35),
                unlocked() { return player.tm.buyables[4].gte(4); },
            },
            15: {
                title: "电力升级15",
                description: "电力提升自身获取，灰烬升级31效果+20%。",
                cost: new Decimal(1e50),
                unlocked() { return player.tm.buyables[4].gte(5); },
                effect() {
                    let base=1.1;
                    let ret = Decimal.pow(base,Decimal.log10(player.burning_e.points.add(1)).pow(0.9));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            21: {
                title: "电力升级21",
                description: "分配的电力点数的效果更好。",
                cost: new Decimal(1e110),
                unlocked() { return hasUpgrade("tm",13); },
            },
            22: {
                title: "电力升级22",
                description: "分配的电力点数的效果更好。",
                cost: new Decimal(1e200),
                unlocked() { return hasUpgrade("tm",13); },
            },
            23: {
                title: "电力升级23",
                description: "分配的电力点数的效果更好。",
                cost: new Decimal("1e1000"),
                unlocked() { return hasUpgrade("tm",24); },
            },
            24: {
                title: "电力升级24",
                description: "解锁一个电力条。",
                cost: new Decimal("1e3000"),
                unlocked() { return hasUpgrade("tm",24); },
            },
            25: {
                title: "电力升级25",
                description: "解锁一个电力条。",
                cost: new Decimal("1e6200"),
                unlocked() { return hasUpgrade("tm",24); },
            },
        },
        passiveGeneration(){
            if(hasUpgrade("burning_e",14))return 1;
            return 0;
        }
});