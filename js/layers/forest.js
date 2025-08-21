

addLayer("forest_p", {
    name: "粒子层", // 可选，仅在少数地方使用
    symbol: "P", // 显示在图层节点上的符号
    position: 1, // 行内水平位置
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        amtsacrificed: new Decimal(0),
        amtcompressed: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), // 可以是考虑需求增长的函数
    resource: "粒子", // 声望货币名称
    baseResource: "能量", // 声望基于的资源名称
    baseAmount() {return player.modpoints[3]}, // 获取当前基础资源量
    type: "normal", // normal: 获取货币的成本取决于获取量 static: 成本取决于已有量
    exponent() {
        if(player.forest_c.best.gte(1)){
            return 0.75;
        }
        if(player.forest_A.best.gte(1)){
            return 0.7;
        }
        return 0.5;
    }, // 声望货币指数
    gainMult() { // 计算来自加成的货币乘数
        mult = new Decimal(1)
        if(hasUpgrade("forest_p",14))mult=mult.mul(upgradeEffect("forest_p",14));
        if(hasUpgrade("tptc_p",22))mult=mult.mul(upgradeEffect("tptc_p",22));
        if(hasUpgrade("forest_p",25))mult=mult.mul(clickableEffect("forest_p",12));
        if(hasUpgrade("forest_A",11))mult=mult.mul(upgradeEffect("forest_A",11));
        if(hasUpgrade("forest_p",43))mult=mult.mul(upgradeEffect("forest_p",43));
        return mult
    },
    gainExp() { // 计算来自加成的货币指数
        return new Decimal(1)
    },
    row: 0, // 图层在树中的行(0是第一行)
    hotkeys: [],
    layerShown(){return player.tm.currentTree==3},
        
    resetDescription: "改变能量形态获得",
    doReset(l){
        if(l=="forest_p" || !l.startsWith("forest_")){return;}
        layerDataReset("forest_p",["upgrades","milestones","challenges"]);
        return;
    },
        
    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "粒子升级11",
            description() {
                return "每秒获得"+format(this.effect())+"能量"
            },
            cost: new Decimal(0),
            unlocked() { return true; },
            effect() {
                let ret = new Decimal(1);
                if(hasUpgrade("forest_p",12))ret=ret.mul(upgradeEffect("forest_p",12));
                if(hasUpgrade("forest_p",13))ret=ret.mul(upgradeEffect("forest_p",13));
                if(hasUpgrade("forest_p",15))ret=ret.mul(clickableEffect("forest_p",11));
                if(hasUpgrade("forest_p",22))ret=ret.mul(upgradeEffect("forest_p",22));
                if(hasUpgrade("forest_A",11))ret=ret.mul(upgradeEffect("forest_A",11));
                if(hasUpgrade("forest_p",41))ret=ret.mul(upgradeEffect("forest_p",41));
                return ret;
            },
        },
        12: {
            title: "粒子升级12",
            description: "粒子相互碰撞使能量获取倍增",
            cost: new Decimal(1),
            unlocked() { return true; },
            effect() {
                let ret = player.forest_p.points.add(2).sqrt();
                if(hasUpgrade("forest_p",34))ret=ret.pow(1.2);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        13: {
            title: "粒子升级13",
            description: "能量被吸引向发电机使其更强",
            cost: new Decimal(5),
            unlocked() { return true; },
            effect() {
                if (player.modpoints[3].lessThan(1)) return 1
                let logamt = new Decimal("1000").div(player.modpoints[3].root(1.01)).add(1.05)
                if(hasUpgrade("forest_p",31)){
                    logamt = logamt.sub(0.04);
                }
                if(hasUpgrade("forest_p",42)){
                    logamt = logamt.sub(0.009);
                }
                let value = player.modpoints[3].log(logamt).add(2);
                if(hasUpgrade("forest_p",31))value=value.pow(1.1);
                if(hasUpgrade("forest_A",12))value=value.pow(upgradeEffect("forest_A",12));
                if(hasUpgrade("forest_p",42))value=value.pow(1.1);
                if (value.lessThan(2)) return 2
                return value;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        14: {
            title: "粒子升级14",
            description: "利用重力创造更多粒子(粒子升级13提升粒子获取)",
            cost: new Decimal(10),
            unlocked() { return true; },
            effect() {
                let value = new Decimal(upgradeEffect("forest_p", 13)).pow((.5))
                if(hasUpgrade("forest_p",32))value=value.pow(1.5);
                if(hasUpgrade("forest_A",13))value=value.pow(1.3);
                if (value.lessThan(1)) return 1
                return value
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        15: {
            title: "粒子升级15",
            description: "解锁反应堆",
            cost: new Decimal(250),
            unlocked() { return player.tm.buyables[3].gte(2); },
        },
        21: {
            title: "粒子升级21",
            description: "点数获取基于能量提升",
            cost: new Decimal(15),
            unlocked() { return true; },
            effect() {
                let base=1e4;
                let ret = Decimal.pow(base,Decimal.log10(player.modpoints[3].mul(10).add(1)).pow(0.9));
                if(ret.gte("e176e5"))ret=ret.root(11).mul("e16e6");
                if(hasUpgrade("forest_p",24))ret=ret.pow(2);
                ret=ret.pow(player.forest_A.best.pow(0.7).add(1));
                ret=ret.pow(new Decimal(player.forest_A.upgrades.length).mul(0.25).add(1));
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        22: {
            title: "粒子升级22",
            description: "点数提升能量获取",
            cost: new Decimal(1e6),
            unlocked() { return player.tm.buyables[3].gte(2); },
            effect() {
                let base=1.03;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.5));
                if(hasUpgrade("forest_p",33))ret=ret.pow(2);
                if(hasUpgrade("forest_p",45))ret=ret.pow(1.4);
                if(player.forest_c.best.gte(1)){
                    ret=ret.pow(player.forest_c.best.pow(0.8).add(1));
                }
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        23: {
            title: "粒子升级23",
            description: "解锁经典声望树中的声望升级",
            cost: new Decimal(1e7),
            unlocked() { return player.tm.buyables[3].gte(2); },
        },
        24: {
            title: "粒子升级24",
            description: "粒子升级21效果平方化",
            cost: new Decimal(1e9),
            unlocked() { return player.tm.buyables[3].gte(2); },
        },
        25: {
            title: "粒子升级25",
            description: "解锁压缩机",
            cost: new Decimal(1e14),
            unlocked() { return player.tm.buyables[3].gte(3); },
        },
        31: {
            title: "粒子升级31",
            description: "粒子升级13效果提升",
            cost: new Decimal(1e17),
            unlocked() { return player.tm.buyables[3].gte(3); },
        },
        32: {
            title: "粒子升级32",
            description: "粒子升级14效果^1.5",
            cost: new Decimal(1e18),
            unlocked() { return player.tm.buyables[3].gte(3); },
        },
        33: {
            title: "粒子升级33",
            description: "粒子升级22效果平方化",
            cost: new Decimal(1e20),
            unlocked() { return player.tm.buyables[3].gte(3); },
        },
        34: {
            title: "粒子升级34",
            description: "粒子升级12效果^1.2",
            cost: new Decimal(1e22),
            unlocked() { return player.tm.buyables[3].gte(3); },
        },
        35: {
            title: "粒子升级35",
            description: "反应堆和压缩机效果^1.2，且不再消耗能量和粒子",
            cost: new Decimal(1e25),
            unlocked() { return player.tm.buyables[3].gte(3); },
        },
        41: {
            title: "粒子升级41",
            description: "该树的等级提升能量获取",
            cost: new Decimal(1e30),
            unlocked() { return player.tm.buyables[3].gte(4); },
            effect() {
                let ret = Decimal.pow(2,player.tm.buyables[3].pow(1.5));
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        42: {
            title: "粒子升级42",
            description: "粒子升级13效果提升",
            cost: new Decimal(1e46),
            unlocked() { return player.tm.buyables[3].gte(4); },
        },
        43: {
            title: "粒子升级43",
            description: "该树的等级提升粒子获取",
            cost: new Decimal(1e64),
            unlocked() { return player.tm.buyables[3].gte(5); },
            effect() {
                let ret = Decimal.pow(2,player.tm.buyables[3].pow(1.5));
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        44: {
            title: "粒子升级44",
            description: "反应堆和压缩机效果^1.2",
            cost: new Decimal(1e72),
            unlocked() { return player.tm.buyables[3].gte(5); },
        },
        45: {
            title: "粒子升级45",
            description: "粒子升级22效果^1.4",
            cost: new Decimal(1e80),
            unlocked() { return player.tm.buyables[3].gte(5); },
        },
        51: {
            title: "粒子升级51",
            description: "粒子降低经典声望树中助推器成本",
            cost: new Decimal("1e555"),
            unlocked() { return hasUpgrade("tm",14); },
            effect() {
                let base=1e30;
                let ret = Decimal.pow(base,Decimal.log10(player.forest_p.points.mul(10).add(1)).pow(0.9));
                return ret;
            },
            effectDisplay() { return "/"+format(this.effect()) },
        },
        52: {
            title: "粒子升级52",
            description: "能量降低经典声望树中发电机成本",
            cost: new Decimal("1e575"),
            unlocked() { return hasUpgrade("tm",14); },
            effect() {
                let base=1e30;
                let ret = Decimal.pow(base,Decimal.log10(player.modpoints[3].mul(10).add(1)).pow(0.9));
                return ret;
            },
            effectDisplay() { return "/"+format(this.effect()) },
        },
        53: {
            title: "粒子升级53",
            description: "5级后化学品成本增长基于粒子减弱",
            cost: new Decimal("1e575"),
            unlocked() { return hasUpgrade("tm",14); },
            effect() {
                let ret = Decimal.log10(Decimal.log10(Decimal.log10(player.forest_p.points.add(1)).add(1)).add(1)).add(1).pow(0.2);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        54: {
            title: "粒子升级54",
            description: "能量降低经典声望树中助推器成本",
            cost: new Decimal("1e6900"),
            unlocked() { return hasUpgrade("tm",14); },
            effect() {
                let base=1e30;
                let ret = Decimal.pow(base,Decimal.log10(player.modpoints[3].mul(10).add(1)).pow(0.9));
                return ret;
            },
            effectDisplay() { return "/"+format(this.effect()) },
        },
        55: {
            title: "粒子升级55",
            description: "粒子降低经典声望树中发电机成本",
            cost: new Decimal("1e6900"),
            unlocked() { return hasUpgrade("tm",14); },
            effect() {
                let base=1e30;
                let ret = Decimal.pow(base,Decimal.log10(player.forest_p.points.mul(10).add(1)).pow(0.9));
                return ret;
            },
            effectDisplay() { return "/"+format(this.effect()) },
        },
    },
    update(diff){
        if(hasUpgrade("forest_p",11))player.modpoints[3]=player.modpoints[3].add(upgradeEffect("forest_p",11).mul(diff));
        if (getClickableState("forest_p", 11)) {
            var temp=player.forest_p.points.div(20).times(diff).min(player.forest_p.points);
            if(!hasUpgrade("forest_p",35))player.forest_p.points = player.forest_p.points.sub(temp)
            player.forest_p.amtsacrificed = player.forest_p.amtsacrificed.add(temp)
        }
        if (getClickableState("forest_p", 12)) {
            var temp=player.modpoints[3].div(2).times(diff).min(player.modpoints[3]);
            if(!hasUpgrade("forest_p",35))player.modpoints[3] = player.modpoints[3].sub(temp)
            player.forest_p.amtcompressed = player.forest_p.amtcompressed.add(temp)
        }
    },
    clickables: {
        rows: 1,
        cols: 2,
        11: {
            title: "反应堆",
            unlocked: function() {return hasUpgrade("forest_p", 15)},
            display: function() {
                value = "激活反应堆，每秒损失5%粒子但基于总损失粒子获得加成\n当前: " + clickableEffect("forest_p", 11)+ "\n "
                if (typeof getClickableState("forest_p", 11) == "undefined") {setClickableState("forest_p", 11, true)}
                if (getClickableState("forest_p", 11)) {value += "开启"}
                else {value += "关闭"}
                return value
            },
            effect: function() {
                if (player.forest_p.amtsacrificed.lessThan(1)) {return 1}
                let ret=player.forest_p.amtsacrificed.log(1.05).times(10);
                if(hasUpgrade("forest_p",35))ret=ret.pow(1.2);
                if(hasUpgrade("forest_p",44))ret=ret.pow(1.2);
                if(hasUpgrade("forest_A",14))ret=ret.pow(upgradeEffect("forest_A",14));
                return ret;
            },
            canClick: function() {
                return true
            },
            onClick: function() {
                if (typeof getClickableState("forest_p", 11) == "undefined") {setClickableState("forest_p", 11, true)}
                setClickableState("forest_p", 11, !getClickableState("forest_p", 11))
            },
            style: {
                "height": "200px",
                "width": "200px",
                "border-radius": "25%",
                "border": "2px solid",
                "border-color": 'rgba(0, 0, 0, 0.125)',
                "font-size": '10px'
            }
        },
        12: {
            title: "压缩机",
            display: function() {
                value = "激活压缩机，每秒损失50%能量但基于总损失能量获得粒子加成\n当前: " + clickableEffect("forest_p", 12)+ "\n "
                if (typeof getClickableState("forest_p", 12) == "undefined") {setClickableState("forest_p", 12, true)}
                if (getClickableState("forest_p", 12)) {value += "开启"}
                else {value += "关闭"}
                return value
            },
            effect: function () {
                let ret=player.forest_p.amtcompressed.add(1).log(2).add(1);
                if(hasUpgrade("forest_p",35))ret=ret.pow(1.2);
                if(hasUpgrade("forest_p",44))ret=ret.pow(1.2);
                if(hasUpgrade("forest_A",15))ret=ret.pow(upgradeEffect("forest_A",15));
                return ret;
            },
            unlocked: function() {return hasUpgrade("forest_p", 25)},
            canClick: function() {
                return true
            },
            onClick: function() {
                if (typeof getClickableState("forest_p", 12) == "undefined") {setClickableState("forest_p", 12, true)}
                setClickableState("forest_p", 12, !getClickableState("forest_p", 12))
            },
            style: {
                "height": "200px",
                "width": "200px",
                "border-radius": "25%",
                "border": "2px solid",
                "border-color": 'rgba(0, 0, 0, 0.125)',
                "font-size": '10px'
            }
        }
    },
    hotkeys: [
        {key: "p", description: "P: 重置获取粒子",
            onPress(){if (player.tm.currentTree==3 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==3}}
    ],
    passiveGeneration(){
        if(player.forest_A.best.gte(6))return 1;
        return 0;
    }
});


addLayer("forest_A", {
    name: "原子层",
    symbol: "A",
    position: 1,
    startData() { return {
        unlocked: true,
        points: new Decimal(0)
    }},
    color: "#17E6F0",
    requires: new Decimal(1e10),
    resource: "原子",
    baseResource: "能量",
    baseAmount() {return player.modpoints[3]},
    type: "static",
    exponent: 1,
    base(){
        let ret=new Decimal(1e10);
        if(hasUpgrade("forest_A",11))ret=ret.pow(0.9);
        if(hasUpgrade("forest_A",21))ret=ret.pow(0.9);
        if(hasUpgrade("forest_A",22))ret=ret.pow(0.9);
        if(hasUpgrade("forest_A",23))ret=ret.pow(0.9);
        return ret;
    },
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 1,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==3 && player.tm.buyables[3].gte(3);},
        
    resetDescription: "压缩能量获得",
    doReset(l){
        if(l=="forest_p" || l=="forest_A" || !l.startsWith("forest_")){return;}
        var b=new Decimal(player.forest_A.best);
        layerDataReset("forest_A",["upgrades","milestones","challenges"]);
        player.forest_A.best=b;
        return;
    },
        
    hotkeys: [
        {key: "a", description: "A: 重置获取原子",
            onPress(){if (player.tm.currentTree==3 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==3}}
    ],
    branches: ["forest_p"],
    milestones: {
        0: {requirementDescription: "1原子",
            done() {return player[this.layer].best.gte(1)},
            effectDescription(){
                return "粒子获取指数0.5 -> 0.7。粒子升级21效果^"+format(player[this.layer].best.pow(0.7).add(1))+"(基于最佳原子数)";
            },
        },
        1: {requirementDescription: "3原子",
            done() {return player[this.layer].best.gte(3)},
            effectDescription(){
                return "粒子升级21效果^"+format(new Decimal(player[this.layer].upgrades.length).mul(0.25).add(1))+"(基于原子升级数)";
            },
        },
        2: {requirementDescription: "6原子",
            done() {return player[this.layer].best.gte(6)},
            effectDescription(){
                return "每秒获得100%粒子获取量";
            },
        },
    },
    
    upgrades: {
        rows: 2,
        cols: 5,
        11: {
            title: "原子升级11",
            description: "原子提升能量和粒子获取，且原子需求降低",
            cost: new Decimal(3),
            unlocked() { return player[this.layer].best.gte(3); },
            effect() {
                let ret = new Decimal(1).add(player.forest_A.points).pow(3.5);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        12: {
            title: "原子升级12",
            description: "原子提升粒子升级13",
            cost: new Decimal(4),
            unlocked() { return player[this.layer].best.gte(3); },
            effect() {
                let ret = player.forest_A.points.pow(0.5).mul(0.2).add(1);
                return ret;
            },
            effectDisplay() { return "^"+format(this.effect()) },
        },
        13: {
            title: "原子升级13",
            description: "粒子升级14效果^1.3",
            cost: new Decimal(7),
            unlocked() { return player[this.layer].best.gte(3) && player.tm.buyables[3].gte(5); },
        },
        14: {
            title: "原子升级14",
            description: "原子提升反应堆效果",
            cost: new Decimal(9),
            unlocked() { return player[this.layer].best.gte(3) && player.tm.buyables[3].gte(6); },
            effect() {
                let ret = player.forest_A.points.pow(0.5).mul(0.1).add(1);
                return ret;
            },
            effectDisplay() { return "^"+format(this.effect()) },
        },
        15: {
            title: "原子升级15",
            description: "原子提升压缩机效果",
            cost: new Decimal(11),
            unlocked() { return player[this.layer].best.gte(3) && player.tm.buyables[3].gte(7); },
            effect() {
                let ret = player.forest_A.points.pow(0.5).mul(0.1).add(1);
                return ret;
            },
            effectDisplay() { return "^"+format(this.effect()) },
        },
        21: {
            title: "原子升级21",
            description: "原子需求降低",
            cost: new Decimal(17),
            unlocked() { return player[this.layer].best.gte(3) && player.tm.buyables[3].gte(9); },
        },
        22: {
            title: "原子升级22",
            description: "原子需求降低",
            cost: new Decimal(20),
            unlocked() { return player[this.layer].best.gte(3) && player.tm.buyables[3].gte(9); },
        },
        23: {
            title: "原子升级23",
            description: "原子需求降低",
            cost: new Decimal(28),
            unlocked() { return player[this.layer].best.gte(3) && player.tm.buyables[3].gte(9); },
        },
    },
    
    canBuyMax() {return player.forest_c.best.gte(1)},
    autoPrestige(){
        return player.forest_c.best.gte(1);
    },resetsNothing(){
        return player.forest_c.best.gte(1);
    },
});


addLayer("forest_c", {
    name: "化学品层",
    symbol: "C",
    position: 2,
    startData() { return {
        unlocked: true,
        points: new Decimal(0)
    }},
    color: "#DC143C",
    requires: new Decimal(11),
    resource: "化学品合成器",
    baseResource: "原子",
    baseAmount() {return player.forest_A.points},
    type: "static",
    getResetGain: function() {return new Decimal(1)},
    getNextAt() {
        let scaling=new Decimal(2);
        if(hasUpgrade("forest_p",53))scaling=scaling.div(upgradeEffect("forest_p",53));
        if(!hasUpgrade("tm",53)){
            if(player.forest_c.points.gte(15))scaling=scaling.mul(player.forest_c.points.sub(15).pow(player.forest_c.points.div(6)).mul(0.1).add(1));
        }else{
            if(player.forest_c.points.gte(15))scaling=scaling.mul(player.forest_c.points.sub(15).pow(player.forest_c.points.div(7).div(upgradeEffect("forest_p",53))).mul(0.1).div(upgradeEffect("forest_p",53)).add(1));
        }
        let ret=new Decimal(11).add(player.forest_c.points.times(Decimal.max(10,player.forest_c.points.mul(scaling))));
        ret=ret.ceil();
        return ret;
    },
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 1,
    layerShown(){return player.tm.currentTree==3 && player.tm.buyables[3].gte(8);},
        
    resetDescription: "压缩原子获得",
    doReset(l){
        if(l=="forest_p" || l=="forest_A" || l=="forest_c" || !l.startsWith("forest_")){return;}
        var b=new Decimal(player.forest_c.best);
        layerDataReset("forest_c",["upgrades","milestones","challenges"]);
        player.forest_c.best=b;
        return;
    },
        
    hotkeys: [
        {key: "c", description: "C: 重置获取化学品",
            onPress(){if (player.tm.currentTree==3 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==3}}
    ],
    branches: ["forest_A"],
    roundUpCost:true,
     
    milestones: {
        0: {requirementDescription: "1化学品合成器",
            done() {return player[this.layer].best.gte(1)},
            effectDescription(){
                return "粒子获取指数0.7 -> 0.75。粒子升级22效果^"+format(player[this.layer].best.pow(0.8).add(1))+"(基于最佳化学品合成器数)。自动购买原子，原子重置不影响任何内容，可以购买最大原子";
            },
        },
        1: {requirementDescription: "15化学品合成器",
            done() {return player[this.layer].best.gte(15)},
            effectDescription(){
                return "化学品合成器重置不影响任何内容";
            },
        },
    },resetsNothing(){
        return player.forest_c.best.gte(15);
    },
});