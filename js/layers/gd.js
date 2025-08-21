
addLayer("gd_u", {
    name: "更新层",
    symbol: "U",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0)
    }},
    color: "#4BDC13",
    requires: new Decimal(5),
    resource: "更新版本",
    baseResource: "工作时长",
    baseAmount() {return player.modpoints[6]},
    type(){
        if(hasUpgrade("gd_u",41))return "normal";
        return "static";
    },
    base: 5,
    exponent: 0.5,
    resetDescription: "发布新版本获得",
    gainMult() {
        if(!hasUpgrade("gd_u",41))return this.gainMult2();return this.gainMult3();
    },
    gainMult2() {
        mult = new Decimal(1)
        if(hasUpgrade("gd_e",11) && !hasUpgrade("gd_u",44))mult=mult.div(upgradeEffect("gd_e",11));
        if(!hasUpgrade("gd_u",45))mult = mult.div(tmp.gd_f.buyables[14].effect);
        if(hasUpgrade("tptc_p",25))mult=mult.div(upgradeEffect("tptc_p",25));
        if(hasUpgrade("gd_g",15) && hasUpgrade("gd_l",13) && !hasUpgrade("gd_u", 43))mult = mult.div(upgradeEffect("gd_l",13));
        return mult
    },
    gainMult3() {
        mult = this.gainMult2();
        if(!hasUpgrade("gd_u",51))mult=mult.recip().log10().sqrt().add(1);
        else {
            mult=Decimal.pow(10,upgradeEffect("tptc_p",25).add(1e10).log10().pow(0.1).add(1));
        }
        if(hasUpgrade("gd_g",15) && hasUpgrade("gd_l",13) && hasUpgrade("gd_u", 43))mult = mult.mul(upgradeEffect("gd_u", 43));
        if(hasUpgrade("gd_e",11) && hasUpgrade("gd_u",44))mult = mult.mul(upgradeEffect("gd_u",44));
        if(hasUpgrade("gd_u",45))mult = mult.mul(upgradeEffect("gd_u",45));
        if(player.milestone_m.best.gte(29))mult = mult.mul(tmp.milestone_m.milestone29Effect);
        return mult;
    },
    gainExp() {
        return new Decimal(1)
    },
    getResetGain() {
        if(!hasUpgrade("gd_u",41))return getResetGain(this.layer,"static");
        let ret=player.modpoints[6];
        if(ret.lt(5))return new Decimal(0);
        ret=ret.log10().pow(hasUpgrade("gd_u",62)?3:2).mul(tmp.gd_u.gainMult3).floor();
        return ret;
    },
    getNextAt(a) {
        if(!hasUpgrade("gd_u",41))return getNextAt(this.layer,a,"static");
        let ret=tmp.gd_u.getResetGain.plus(1);
        ret=ret.div(tmp.gd_u.gainMult3);
        ret=ret.pow(1/(hasUpgrade("gd_u",62)?3:2));
        ret=Decimal.pow(10,ret).max(5);
        return ret;
    },
    row: 0,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==6 && player.tm.buyables[6].gte(1);},
        
    doReset(l){
        if(l=="gd_u" || !l.startsWith("gd_")){return;}
        layerDataReset("gd_u",["upgrades","milestones","challenges"]);
        return;
    },
        
    hotkeys: [
        {key: "u", description: "按U发布新版本",
            onPress(){if (player.tm.currentTree==6 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==6}}
    ],
    
    upgrades: {
        rows: 6,
        cols: 5,
        11: {
            title: "更新升级11",
            description(){
                return "开始开发自己的模组。每秒获得"+format(upgradeEffect("gd_u",11))+"工作时长"
            },
            cost: new Decimal(0),
            effect() {
                let ret = tmp.gd_u.upgrades[11].realEffect;
                if(player.modpoints[6].gte(tmp.gd_u.scstart))ret=ret.div(player.modpoints[6]).mul(tmp.gd_u.scstart);
                return ret;
            },
            realEffect() {
                let ret = new Decimal(1);
                if(hasUpgrade("gd_u",12))ret = ret.mul(3);
                if(hasUpgrade("gd_u",14))ret = ret.mul(upgradeEffect("gd_u",14));
                if(hasUpgrade("gd_u",15))ret = ret.mul(upgradeEffect("gd_u",15));
                if(hasUpgrade("gd_e",12))ret = ret.mul(upgradeEffect("gd_e",12));
                if(hasUpgrade("gd_c",11))ret = ret.mul(upgradeEffect("gd_c",11));
                ret = ret.mul(buyableEffect("gd_r",11)[0]);
                ret = ret.mul(buyableEffect("gd_c",11));
                ret = ret.mul(tmp.gd_f.fansEffect);
                if(hasUpgrade("gd_a",11) && hasUpgrade("gd_r",14))ret = ret.mul(tmp.gd_r.effect);
                ret = ret.mul(tmp.gd_a.buyables[12].effect);
                if(hasUpgrade("gd_r",25))ret = ret.mul(tmp.gd_t.effect);
                return ret;
            },
        },
        12: {
            title: "更新升级12",
            description: "生产力提升3倍",
            cost: new Decimal(1),
        },
        13: {
            title: "更新升级13",
            description: "基于更新版本数量延迟生产力减速",
            cost: new Decimal(1),
            unlocked() { return true; },
            effect() {
                let ret = new Decimal(3).add(player.gd_u.points.pow(2).mul(4));
                if(hasUpgrade("gd_a",13)&&hasUpgrade("gd_r",33))ret=player.gd_u.points.add(1).pow(10);
                if(hasUpgrade("gd_a",13)&&hasUpgrade("gd_r",32))ret=ret.pow(100);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        14: {
            title: "更新升级14",
            description: "其他模组的经验启发你。点数提升生产力",
            cost: new Decimal(3),
            unlocked() { return true; },
            effect() {
                let base=1.005;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.5));
                if(hasUpgrade("gd_u",22))ret=ret.pow(2);
                if(hasUpgrade("gd_g",11)&&hasUpgrade("gd_f",12))ret=ret.pow(2);
                if(hasUpgrade("gd_u",35))ret=ret.pow(2);
                if(hasUpgrade("gd_g",15)&&hasUpgrade("gd_f",22))ret=ret.pow(2);
                if(hasUpgrade("gd_u",54))ret=ret.pow(2);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        15: {
            title: "更新升级15",
            description: "更新版本提升生产力",
            cost: new Decimal(10),
            unlocked() { return true; },
            effect() {
                let ret = new Decimal(3).add(player.gd_u.points.mul(2));
                if(hasUpgrade("gd_a",11)&&hasUpgrade("gd_r",15))ret=ret.pow(2);
                if(hasUpgrade("gd_u",34))ret=ret.pow(2);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        21: {
            title: "更新升级21",
            description: "基于工作时长提升点数获取",
            cost: new Decimal(100),
            unlocked() { return player.tm.buyables[6].gte(2); },
            effect() {
                let base=1e60;
                let ret = Decimal.pow(base,Decimal.log10(player.modpoints[6].mul(10).add(1)).pow(0.9));
                if(hasUpgrade("gd_e",34))ret = player.modpoints[6].add(1).pow(1000);
                if(hasUpgrade("gd_u",25))ret=ret.pow(2);
                if(hasUpgrade("gd_u",33))ret=ret.pow(2);
                if(hasUpgrade("gd_c",23))ret=ret.pow(1.25);
                if(hasUpgrade("gd_e",24))ret=ret.pow(2);
                if(hasUpgrade("gd_u",55))ret=ret.pow(10);
                if(hasUpgrade("gd_l",25))ret=ret.pow(4);
                if(hasUpgrade("gd_g",31))ret=ret.pow(tmp.gd_f.buyables[15].effect2);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        22: {
            title: "更新升级22",
            description: "更新升级14效果平方化",
            cost: new Decimal(200),
            unlocked() { return player.tm.buyables[6].gte(2); },
        },
        23: {
            title: "更新升级23",
            description: "为模组添加捐赠链接。每秒获得1%现金收益",
            cost: new Decimal(300),
            unlocked() { return player.tm.buyables[6].gte(2); },
        },
        24: {
            title: "更新升级24",
            description: "现金指数乘以1.5",
            cost: new Decimal(400),
            unlocked() { return player.tm.buyables[6].gte(2); },
        },
        25: {
            title: "更新升级25",
            description: "更新升级21效果平方化",
            cost: new Decimal(500),
            unlocked() { return player.tm.buyables[6].gte(2); },
        },
        31: {
            title: "更新升级31",
            description: "在Discord服务器添加捐赠消息。每秒获得99%现金收益",
            cost: new Decimal(1650),
            unlocked() { return player.gd_f.best.gte(4); },
        },
        32: {
            title: "更新升级32",
            description: "解锁经典声望树中的声望升级",
            cost: new Decimal(19e4),
            unlocked() { return player.tm.buyables[6].gte(8); },
        },
        33: {
            title: "更新升级33",
            description: "更新升级21效果平方化",
            cost: new Decimal(33e4),
            unlocked() { return player.tm.buyables[6].gte(8); },
        },
        34: {
            title: "更新升级34",
            description: "更新升级15效果平方化",
            cost: new Decimal(375e3),
            unlocked() { return player.tm.buyables[6].gte(8); },
        },
        35: {
            title: "更新升级35",
            description: "更新升级14效果平方化",
            cost: new Decimal(4e5),
            unlocked() { return player.tm.buyables[6].gte(8); },
        },
        41: {
            title: "更新升级41",
            description: "现在可以持续发布更新了！此升级将改变游戏开发树！",
            cost: new Decimal(68e10),
            unlocked() { return hasUpgrade("tm",45); },
        },
        42: {
            title: "更新升级42",
            description: "自动发布器速度提升100倍",
            cost: new Decimal(2e14),
            unlocked() { return hasUpgrade("tm",45); },
        },
        43: {
            title: "更新升级43",
            description: "Jean(第三TA)将基于更新版本和他的等级提升更新获取，而非降低更新需求",
            cost: new Decimal(4e16),
            unlocked() { return hasUpgrade("tm",45); },
            effect() {
                let base=Decimal.log10(player.gd_u.points.add(10)).sqrt().mul(0.01).add(1);
                return base.pow(player.gd_l.carmackLevel);
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        44: {
            title: "更新升级44",
            description: "经验升级11将基于经验提升更新获取，而非降低更新需求",
            cost: new Decimal(6e18),
            unlocked() { return hasUpgrade("tm",45); },
            effect() {
                let ret=Decimal.log10(player.gd_e.points.add(10)).pow(0.03);
                if(hasUpgrade("gd_e",21))ret = ret.pow(2);
                if(hasUpgrade("gd_e",31))ret = ret.pow(10);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        45: {
            title: "更新升级45",
            description: "'Github'声望可购买项将基于粉丝提升更新获取，而非降低更新需求",
            cost: new Decimal(8e20),
            unlocked() { return hasUpgrade("tm",45); },
            effect() {
                let ret=player.gd_f.fans.add(1e10).log10().add(1e10).log10().mul(player.gd_f.buyables[14].add(1)).pow(hasUpgrade("gd_u",64)?0.4:0.25).pow(layers.gd_g.effect()[1]);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        51: {
            title: "更新升级51",
            description: "基于TPTC中的声望升级25获取更多更新",
            cost: new Decimal(2e23),
            unlocked() { return hasUpgrade("gd_u",43)&&hasUpgrade("gd_u",44)&&hasUpgrade("gd_u",45); },
        },
        52: {
            title: "更新升级52",
            description: "更新版本降低第三行图层的需求",
            cost: new Decimal(1e25),
            unlocked() { return hasUpgrade("gd_u",51); },
            effect() {
                let ret=player.gd_u.points.add(1).pow(5);
                return ret;
            },
            effectDisplay() { return "/"+format(this.effect()) },
        },
        53: {
            title: "更新升级53",
            description: "更新版本提升时间通量层所有环的效果",
            cost: new Decimal(1e25),
            unlocked() { return hasUpgrade("gd_u",51); },
            effect() {
                let ret=player.gd_u.points.pow(0.1);
                return ret;
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        54: {
            title: "更新升级54",
            description: "更新升级14效果平方化",
            cost: new Decimal(1e25),
            unlocked() { return hasUpgrade("gd_u",51); },
        },
        55: {
            title: "更新升级55",
            description: "更新升级21效果^10",
            cost: new Decimal(1e25),
            unlocked() { return hasUpgrade("gd_u",51); },
        },
        61: {
            title: "更新升级61",
            description: "当购买善意升级31时，声望可购买项'点数提升'受善意影响",
            cost: new Decimal(1e50),
            unlocked() { return hasUpgrade("tm",51); },
        },
        62: {
            title: "更新升级62",
            description: "前两行资源获取更好",
            cost: new Decimal(3e50),
            unlocked() { return hasUpgrade("tm",51); },
        },
        63: {
            title: "更新升级63",
            description: "解锁新的重构效果",
            cost: new Decimal(5e55),
            unlocked() { return hasUpgrade("tm",51); },
        },
        64: {
            title: "更新升级64",
            description: "声望可购买项'Twitch'和'Github'效果更好",
            cost: new Decimal(2e56),
            unlocked() { return hasUpgrade("tm",51); },
        },
        65: {
            title: "更新升级65",
            description: "解锁新的重构效果",
            cost: new Decimal(5e57),
            unlocked() { return hasUpgrade("tm",51); },
        },
    },
    update(diff){
        if(hasUpgrade("gd_u",11)){
            function f1(p,ss){
                if(p.lte(ss))return p;
                return p.sub(ss).div(ss).add(1).pow(2).sub(1).div(2).mul(ss).add(ss);
            }
            function f2(t,ss){
                if(t.lte(ss))return t;
                return t.sub(ss).div(ss).mul(2).add(1).root(2).sub(1).mul(ss).add(ss);
            }
            if(player.gd_r.best.gte(10)){
                player.modpoints[6]=f2(f1(player.modpoints[6],layers.gd_u.scstart()).add(tmp.gd_u.upgrades[11].realEffect.mul(diff)),layers.gd_u.scstart());
                player.gd_r.refactored=f2(f1(player.gd_r.refactored,layers.gd_u.scstart()).add(tmp.gd_u.upgrades[11].realEffect.mul(diff).mul(tmp.gd_a.buyables[11].effect)),layers.gd_u.scstart());
                player.gd_r.buyables[11]=new Decimal(1);
            }else if(player.gd_r.buyables[11].lt(1))player.modpoints[6]=f2(f1(player.modpoints[6],layers.gd_u.scstart()).add(tmp.gd_u.upgrades[11].realEffect.mul(diff)),layers.gd_u.scstart());
            else player.gd_r.refactored=f2(f1(player.gd_r.refactored,layers.gd_u.scstart()).add(tmp.gd_u.upgrades[11].realEffect.mul(diff).mul(tmp.gd_a.buyables[11].effect)),layers.gd_u.scstart());
        }
    },
    scstart(){
        let ret=new Decimal(1);
        if(hasUpgrade("gd_u",13))ret = ret.mul(upgradeEffect("gd_u",13));
        ret = ret.mul(tmp.gd_e.effect);
        if(hasUpgrade("gd_c",14))ret = ret.mul(10);
        ret = ret.mul(tmp.gd_r.effect);
        ret = ret.mul(tmp.gd_s.buyables[12].effect);
        ret = ret.mul(tmp.gd_a.buyables[21].effect);
        return ret;
    },
    
    layers(){
        let ret=Decimal.log10(player.gd_u.points.add(1)).pow(1.5).mul(7).floor();
        return ret;
    },
    rows(){
        let ret=Decimal.log10(layers.gd_u.layers().add(1)).pow(1.5).mul(7).floor().min(layers.gd_u.layers());
        return ret;
    },
    canBuyMax() {return hasUpgrade("gd_c",12)&&!hasUpgrade("gd_u",41)},
    autoPrestige(){
        return hasUpgrade("gd_c",12)&&!hasUpgrade("gd_u",41);
    },resetsNothing(){
        return hasUpgrade("gd_c",12);
    },passiveGeneration(){
        if(hasUpgrade("gd_u",42))return 100;
        if(hasUpgrade("gd_u",41))return 1;
        return 0;
    },
    tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
                    ["display-text",
                        function() {
                            if(!hasUpgrade("gd_u",41))return '';
                            if(hasUpgrade("gd_u",51))return '因为TPTC中的声望升级25之前使更新便宜了'+format(tmp.gd_u.gainMult2.recip())+'倍，你的更新获取乘以'+format(Decimal.pow(10,upgradeEffect("tptc_p",25).add(1e10).log10().pow(0.1).add(1)));
                            if(hasUpgrade("gd_u",44)&&hasUpgrade("gd_u",45)&&hasUpgrade("gd_u",43))return '因为TPTC中的声望升级25之前使更新便宜了'+format(tmp.gd_u.gainMult2.recip())+'倍，你的更新获取乘以'+format(tmp.gd_u.gainMult2.recip().log10().sqrt().add(1));
                            return '因为你之前的升级使更新便宜了'+format(tmp.gd_u.gainMult2.recip())+'倍，你的更新获取乘以'+format(tmp.gd_u.gainMult2.recip().log10().sqrt().add(1));
                        },
                        {}],
                    ["display-text",
                        function() {
                            return '你的TMT模组有' + formatWhole(tmp.gd_u.layers) + '层(基于更新版本)';
                        },
                        {}],
                    ["display-text",
                        function() {
                            return '你的TMT模组有' + formatWhole(tmp.gd_u.rows) + 'row(基于模组中的层数)';
                        },
                        {}],
                        "milestones",
                        "upgrades"
                ],
});

addLayer("gd_e", {
    name: "经验层",
    symbol: "E",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0)
    }},
    color: "#FF5642",
    requires(){
        ret = new Decimal(20)
        if(hasUpgrade("gd_u",62))ret = new Decimal(1);
        return ret
    },
    resource: "经验",
    baseResource: "更新版本",
    baseAmount() {return player.gd_u.points},
    type: "normal",
    exponent(){
        ret = new Decimal(3)
        if(hasUpgrade("gd_u",62))ret = ret.mul(1.125);
        if(hasUpgrade("gd_e",15))ret = ret.mul(1.1);
        if(player.gd_r.best.gte(10))ret = ret.mul((buyableEffect("gd_r",11)[1]||new Decimal(1)).max(1));
        if(hasUpgrade("gd_a",11) && hasUpgrade("gd_r",11))ret = ret.mul(upgradeEffect("gd_r",11));
        return ret
    },
    resetDescription: "重新开始获得",
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("gd_c",13))mult = mult.mul(upgradeEffect("gd_c",13));
        if(hasUpgrade("gd_e",14))mult = mult.mul(upgradeEffect("gd_e",14));
        mult = mult.mul(tmp.gd_f.buyables[13].effect);
        if(player.gd_s.best.gte(10))mult = mult.mul(buyableEffect("gd_s",21));
        if(player.gd_r.best.gte(30))mult = mult.mul((buyableEffect("gd_r",11)[3]||new Decimal(1)).max(1));
        if(hasUpgrade("gd_r",25))mult=mult.mul(tmp.gd_t.effect);
        if(hasUpgrade("incrementy_pi",25))mult = mult.mul(player.incrementy_s.points.add(10));
        else if(hasUpgrade("incrementy_p",34))mult=mult.mul(10);
        if(hasUpgrade("gd_g",15) && hasUpgrade("gd_l",11) && hasUpgrade("gd_l",21))mult = mult.mul(upgradeEffect("gd_l",11));
        if(player.milestone_m.best.gte(30) && player.tm.buyables[8].gte(11))mult = mult.mul(tmp.milestone_m.milestone29Effect);
        
        if(hasUpgrade("gd_g",34))mult = mult.mul(upgradeEffect("gd_g",14)).mul(100);
        if(hasUpgrade("gd_g",34) && hasUpgrade("gd_f",14))mult = mult.mul(upgradeEffect("gd_f",14));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    effect(){
        let ret = player.gd_e.points.add(1).pow(0.75);
        if(player.gd_s.best.gte(1))ret=ret.pow(buyableEffect("gd_s",11));
        return ret
    },
    effectDescription(){
        return "将生产力减速延迟" + format(layers.gd_e.effect()) + "倍"
    },
    branches: ["gd_u"],
    row: 1,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==6 && player.tm.buyables[6].gte(2);},
        
    doReset(l){
        if(l=="gd_u" || l=="gd_c" || l=="gd_e" || l=="gd_f" || l=="gd_g" || !l.startsWith("gd_")){return;}
        layerDataReset("gd_e",["upgrades","milestones","challenges"]);
        return;
    },
        
    hotkeys: [
        {key: "e", description: "按E重置游戏重新开始",
            onPress(){if (player.tm.currentTree==6 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==6}}
    ],
    
    upgrades: {
        rows: 3,
        cols: 5,
        11: {
            title: "经验升级11",
            description(){
                if(hasUpgrade("gd_u",44))return "基于经验获取更多更新";
                return "基于经验降低更新需求";
            },
            cost: new Decimal(3),
            effect() {
                if(hasUpgrade("gd_u",44))return upgradeEffect("gd_u",44);
                let ret = player.gd_e.points.add(1).pow(0.5);
                if(hasUpgrade("gd_e",21))ret = ret.pow(2);
                if(hasUpgrade("gd_e",31))ret = ret.pow(10);
                return ret;
            },
            effectDisplay() { if(hasUpgrade("gd_u",44))return format(this.effect())+"倍"; return "/"+format(this.effect()) },
        },
        12: {
            title: "经验升级12",
            description: "经验提升生产力",
            cost: new Decimal(400),
            effect() {
                let ret = player.gd_e.points.add(1).pow(0.3);
                if(hasUpgrade("gd_s",12))ret = ret.pow(buyableEffect("gd_s",11));
                return ret
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        13: {
            title: "经验升级13",
            description: "经验提升现金获取",
            cost: new Decimal(20000),
            effect() {
                let ret = player.gd_e.points.add(1).pow(0.1);
                if(hasUpgrade("gd_a",11) && hasUpgrade("gd_r",12))ret = ret.pow(2);
                if(hasUpgrade("gd_s",14))ret = ret.pow(1.1);
                if(hasUpgrade("gd_a",12) && hasUpgrade("gd_r",22))ret = ret.pow(1.2);
                if(hasUpgrade("gd_e",25))ret = ret.pow(1.1363636363636363636363636363636);
                if(hasUpgrade("gd_e",32))ret = ret.pow(1.3333333333333333333333333333333);
                if(hasUpgrade("gd_e",33))ret = ret.pow(1.25);
                return ret
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        14: {
            title: "经验升级14",
            description: "基于工作时长提升经验获取",
            cost: new Decimal(2e5),
            effect() {
                if(hasUpgrade("gd_g",33)){
                    let base=10;
                    let ret = Decimal.pow(base,Decimal.log10(player.modpoints[6].mul(10).add(1)).pow(0.3));
                    return ret;
                }
                let ret = player.modpoints[6].add(10).log10();
                return ret
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        15: {
            title: "经验升级15",
            description: "经验指数乘以1.1",
            cost: new Decimal(2e7),
        },
        21: {
            title: "经验升级21",
            description: "经验升级11效果平方化",
            cost: new Decimal(1e300),
            unlocked() { return hasUpgrade("tm",25); },
        },
        22: {
            title: "经验升级22",
            description: "终点更便宜",
            cost: new Decimal("1e386"),
            unlocked() { return hasUpgrade("tm",25); },
        },
        23: {
            title: "经验升级23",
            description: "时间通量获取更好",
            cost: new Decimal("1e391"),
            unlocked() { return hasUpgrade("tm",25); },
        },
        24: {
            title: "经验升级24",
            description: "更新升级21效果平方化",
            cost: new Decimal("1e405"),
            unlocked() { return hasUpgrade("tm",25); },
        },
        25: {
            title: "经验升级25",
            description: "经验升级13效果^1.1364",
            cost: new Decimal("1e411"),
            unlocked() { return hasUpgrade("tm",25); },
        },
        31: {
            title: "经验升级31",
            description: "经验升级11效果^10",
            cost: new Decimal("1e540"),
            unlocked() { return hasUpgrade("tm",43); },
        },
        32: {
            title: "经验升级32",
            description: "经验升级13效果^1.3333",
            cost: new Decimal("1e545"),
            unlocked() { return hasUpgrade("tm",43); },
        },
        33: {
            title: "经验升级33",
            description: "经验升级13效果^1.25",
            cost: new Decimal("1e584"),
            unlocked() { return hasUpgrade("tm",43); },
        },
        34: {
            title: "经验升级34",
            description: "更新升级21效果更好",
            cost: new Decimal("6.66e666"),
            unlocked() { return hasUpgrade("tm",43); },
        },
        35: {
            title: "经验升级35",
            description: "极大提升时间通量获取",
            cost: new Decimal("1e1333"),
            unlocked() { return hasUpgrade("tm",43); },
        },
    },
    passiveGeneration(){
        let ret=0;
        if(player.gd_s.best.gte(1))ret=1;
        return ret;
    },
});

addLayer("gd_c", {
    name: "现金层",
    symbol: "C",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0)
    }},
    color: "#F5A833",
    
    requires(){
        ret = new Decimal(20)
        if(hasUpgrade("gd_u",62))ret = new Decimal(1);
        return ret
    },
    resource: "现金",
    baseResource: "更新版本",
    baseAmount() {return player.gd_u.points},
    type: "normal",
    exponent(){
        ret = new Decimal(1.5)
        if(hasUpgrade("gd_u",24))ret = ret.mul(1.5)
        if(hasUpgrade("gd_g",11) && hasUpgrade("gd_f",11))ret = ret.mul(upgradeEffect("gd_f",11));
        if(hasUpgrade("gd_c",22))ret = ret.mul(1.1)
        if(hasUpgrade("gd_g",21) && hasUpgrade("gd_f",33))ret = ret.mul(1.5)
        if(hasUpgrade("gd_u",63))ret = ret.mul((buyableEffect("gd_r",11)[1]||new Decimal(1)).max(1));
        return ret
    },
    resetDescription: "将模组出售给出版商获得",
    gainMult() {
        mult = new Decimal(100)
        if(hasUpgrade("gd_e",13))mult = mult.mul(upgradeEffect("gd_e",13));
        if(hasUpgrade("gd_e",14) && hasUpgrade("gd_g",33))mult = mult.mul(upgradeEffect("gd_e",14));
        mult = mult.mul(tmp.gd_f.buyables[12].effect);
        if(hasUpgrade("gd_g",14))mult = mult.mul(upgradeEffect("gd_g",14));
        if(hasUpgrade("gd_g",11) && hasUpgrade("gd_f",14))mult = mult.mul(upgradeEffect("gd_f",14));
        if(hasUpgrade("gd_r",25))mult=mult.mul(tmp.gd_t.effect);
        if(hasUpgrade("gd_g",15) && hasUpgrade("gd_l",11))mult = mult.mul(upgradeEffect("gd_l",11));
        if(player.milestone_m.best.gte(30) && player.tm.buyables[8].gte(11))mult = mult.mul(tmp.milestone_m.milestone29Effect);
        if(hasUpgrade("incrementy_pi",25))mult = mult.mul(player.incrementy_s.points.add(10));
        if(hasUpgrade("gd_u",65))mult = mult.mul((buyableEffect("gd_r",11)[3]||new Decimal(1)).max(1));
        if(hasUpgrade("incrementy_pi",43))mult = mult.mul(buyableEffect("gd_s",21));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    branches: ["gd_u"],
    row: 1,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==6 && player.tm.buyables[6].gte(2);},
        
    doReset(l){
        if(l=="gd_u" || l=="gd_c" || l=="gd_e" || l=="gd_r" || l=="gd_a" || !l.startsWith("gd_")){return;}
        layerDataReset("gd_c",["upgrades","milestones","challenges"]);
        return;
    },
        
    hotkeys: [
        {key: "c", description: "按C将模组出售给出版商",
            onPress(){if (player.tm.currentTree==6 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==6}}
    ],
    
    upgrades: {
        rows: 3,
        cols: 5,
        11: {
            title: "现金升级11",
            description: "购买文本编辑器。现金提升生产力",
            cost: new Decimal(50),
            effect() {
                let ret = player.gd_c.points.add(1).pow(0.5);
                if(hasUpgrade("gd_c",21))ret = ret.pow(2);
                if(hasUpgrade("gd_c",25))ret = ret.pow(2);
                return ret
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        12: {
            title: "现金升级12",
            description: "购买自动发布器。自动发布更新，可以批量发布更新，且更新重置不影响任何内容",
            cost: new Decimal(400),
        },
        13: {
            title: "现金升级13",
            description: "购买在线编程课程。现金提升经验获取",
            cost: new Decimal(20000),
            effect() {
                let ret = player.gd_c.points.add(1).pow(0.1);
                if(hasUpgrade("gd_g",11) && hasUpgrade("gd_f",13))ret = ret.pow(2);
                if(hasUpgrade("gd_s",14))ret = ret.pow(1.1);
                if(hasUpgrade("gd_g",15) && hasUpgrade("gd_f",23))ret = ret.pow(1.2);
                if(hasUpgrade("gd_g",21) && hasUpgrade("gd_f",32))ret = ret.pow(1.1363636363636363636363636363636);
                if(hasUpgrade("gd_c",34))ret = ret.pow(1.333333333333333333333333);
                if(hasUpgrade("gd_f",34))ret = ret.pow(1.25);
                return ret
            },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        14: {
            title: "现金升级14",
            description: "购买昂贵的IDE。将生产力减速延迟10倍",
            cost: new Decimal(1e6),
        },
        15: {
            title: "现金升级15",
            description: "购买硬件升级器。解锁现金可购买项",
            cost: new Decimal(1e8),
        },
        21: {
            title: "现金升级21",
            description: "现金升级11效果平方化",
            cost: new Decimal(1e216),
            unlocked() { return hasUpgrade("tm",25); },
        },
        22: {
            title: "现金升级22",
            description: "现金指数乘以1.1",
            cost: new Decimal(5e217),
            unlocked() { return hasUpgrade("tm",25); },
        },
        23: {
            title: "现金升级23",
            description: "更新升级21效果^1.25",
            cost: new Decimal(2.22e222),
            unlocked() { return hasUpgrade("tm",25); },
        },
        24: {
            title: "现金升级24",
            description: "讲座获取更好",
            cost: new Decimal(1e240),
            unlocked() { return hasUpgrade("tm",25); },
        },
        25: {
            title: "现金升级25",
            description: "现金升级11效果平方化",
            cost: new Decimal(1e275),
            unlocked() { return hasUpgrade("tm",25); },
        },
        31: {
            title: "现金升级31",
            description: "讲座效果更好",
            cost: new Decimal("1e450"),
            unlocked() { return hasUpgrade("tm",43); },
        },
        32: {
            title: "现金升级32",
            description: "降低前4个TA的经验需求",
            cost: new Decimal("1e562"),
            unlocked() { return hasUpgrade("tm",43); },
        },
        33: {
            title: "现金升级33",
            description: "提升前4个TA的效果",
            cost: new Decimal("1e575"),
            unlocked() { return hasUpgrade("tm",43); },
        },
        34: {
            title: "现金升级34",
            description: "现金升级13效果^1.3333",
            cost: new Decimal("1e900"),
            unlocked() { return hasUpgrade("tm",43); },
        },
        35: {
            title: "现金升级35",
            description: "极大提升讲座获取",
            cost: new Decimal("1e1333"),
            unlocked() { return hasUpgrade("tm",43); },
        },
    },
    passiveGeneration(){
        let ret=0;
        if(hasUpgrade("gd_u",23))ret=ret+0.01;
        if(hasUpgrade("gd_u",31))ret=ret+0.99;
        if(hasUpgrade("gd_g",13))ret=ret+upgradeEffect("gd_g",13);
        return ret;
    },
    
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            title: "升级硬件",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(2,x).mul(1e7);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "等级: "+player[this.layer].buyables[this.id]+"\n\
                成本: " + format(data.cost) + " 现金\n\
                效果: " + format(data.effect) + "倍生产力";
            },
            unlocked() { return hasUpgrade("gd_c",15) }, 
            canAfford() {
                return player.gd_c.points.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.gd_c.points = player.gd_c.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
            },
            effect(x=player[this.layer].buyables[this.id]) {
                let ret = Decimal.pow(2,x);
                if(player.gd_s.best.gte(20))ret=ret.pow(buyableEffect("gd_s",22));
                return ret
            },
            buyMax() {},
            style: {'height':'222px'},
        },
    },
    update(diff){
        if(player.gd_s.best.gte(20)){
            var target=player.gd_c.points.add(1).div(1e7).log(2).pow(1).add(1).floor();
            if(target.gt(player.gd_c.buyables[11])){
                player.gd_c.buyables[11]=target;
            }
        }
    }
});

addLayer("gd_r", {
    name: "重构层",
    symbol: "R",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        refactored: new Decimal(0),
    }},
    color: "#4CABF5",
    requires: new Decimal(1e7),
    resource: "重构次数",
    baseResource: "经验",
    baseAmount() {return player.gd_e.points},
    type: "static",
    base: 3,
    exponent(){
        ret = new Decimal(1.25)
        return ret
    },
    resetDescription: "重新设计TMT模组获得",
    gainMult() {
        mult = new Decimal(1)
        if(hasMilestone("gd_d",2))mult=mult.div(1e8);
        if(hasUpgrade("gd_u",52))mult = mult.div(upgradeEffect("gd_u",52));
        if(hasUpgrade("gd_g",15) && hasUpgrade("gd_l",12) && hasUpgrade("gd_l",22))mult = mult.div(upgradeEffect("gd_l",12));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    effect(){
        let base=new Decimal(5);
        if(player.gd_r.best.gte(20))base = base.add((buyableEffect("gd_r",11)[2]||new Decimal(1)).max(1));
        let ret = Decimal.pow(base,player.gd_r.points);
        return ret
    },
    effectDescription(){
        if(hasUpgrade("gd_a",11) && hasUpgrade("gd_r",14))return "将生产力减速延迟" + format(layers.gd_r.effect()) + "倍并提升生产力" + format(layers.gd_r.effect()) + "倍";
        return "将生产力减速延迟" + format(layers.gd_r.effect()) + "倍"
    },
    branches: ["gd_e"],
    row: 2,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==6 && player.tm.buyables[6].gte(3);},
        
    doReset(l){
        if(l=="gd_u" || l=="gd_c" || l=="gd_e" || l=="gd_r" || l=="gd_s" || l=="gd_f" || l=="gd_l" || l=="gd_g" || !l.startsWith("gd_")){return;}
        var b=new Decimal(player.gd_r.best);
        layerDataReset("gd_r",["upgrades","milestones","challenges"]);
        player.gd_r.best=b;
        return;
    },
    milestones: {
        0: {
            requirementDescription: "10次重构",
            done() {return player[this.layer].best.gte(10)},
            effectDescription: "永久启用重构功能。解锁重构工作的额外效果",
        },
        1: {
            requirementDescription: "20次重构",
            done() {return player[this.layer].best.gte(20)},
            effectDescription: "解锁重构工作的额外效果",
        },
        2: {
            requirementDescription: "30次重构",
            done() {return player[this.layer].best.gte(30)},
            effectDescription: "解锁重构工作的额外效果",
        },
    },
    
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            title: "重构功能",
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let ret = "重构功能当前"+(player[this.layer].buyables[11].lt(1)?"禁用":"启用")+"\n\
                已重构工作: "+formatWhole(player[this.layer].refactored)+"工作时长\n\
                效果: " + format(data.effect[0]) + "倍生产力";
                if(player[this.layer].best.gte(10))ret=ret+"<br>" + format(data.effect[1]) + "倍经验指数";
                if(player[this.layer].best.gte(20))ret=ret+"<br>+" + format(data.effect[2]) + "基础重构值";
                if(player[this.layer].best.gte(30))ret=ret+"<br>" + format(data.effect[3]) + "倍经验获取";
                if(hasUpgrade("gd_u",63))ret=ret+"<br>" + format(data.effect[1]) + "倍现金指数";
                if(hasUpgrade("gd_u",65))ret=ret+"<br>" + format(data.effect[3]) + "倍现金获取";
                return ret;
            },
            unlocked() { return true },
            canAfford() {
                return player.gd_r.points.gte(1);
            },
            buy() {
                if(player[this.layer].buyables[11].lt(1))player[this.layer].buyables[11] = new Decimal(1);
                else player[this.layer].buyables[11] = new Decimal(0)
            },
            effect(){
                let ret=player[this.layer].refactored.add(10).log10().pow(player.gd_r.points.mul(0.1).add(1));
                let ret2=player[this.layer].refactored.add(10).log10().add(1).log10().add(1).log10().mul(0.5).add(1);
                let ret3=player[this.layer].refactored.add(10).log10();
                let ret4=player[this.layer].refactored.add(10).log10().pow(player.gd_r.points.mul(0.1).add(1).mul(0.3));
                return [ret, ret2, ret3, ret4];
            },
            buyMax() {},
            style: {'height':'222px'},
        },
    },
    canBuyMax() {return hasMilestone("gd_a",0)},
    autoPrestige(){
        return hasMilestone("gd_a",0);
    },resetsNothing(){
        return hasMilestone("gd_a",0);
    },
    
    upgrades: {
        rows: 3,
        cols: 5,
        11: {
            title: "重构升级11",
            description: "重构提升经验指数",
            cost: new Decimal(24),
            effect() {
                let ret = player.gd_r.points.add(1).log10().add(1).log10().mul(0.5).add(1);
                if(hasUpgrade("gd_a",12) && hasUpgrade("gd_r",21))ret=ret.pow(2);
                return ret
            },
            effectDisplay() { return format(this.effect())+"倍" },
            unlocked(){return hasUpgrade("gd_a",11);}
        },
        12: {
            title: "重构升级12",
            description: "经验升级13效果平方化",
            cost: new Decimal(26),
            unlocked(){return hasUpgrade("gd_a",11);}
        },
        13: {
            title: "重构升级13",
            description: "解锁API可购买项",
            cost: new Decimal(32),
            unlocked(){return hasUpgrade("gd_a",11);}
        },
        14: {
            title: "重构升级14",
            description: "重构效果提升生产力",
            cost: new Decimal(36),
            unlocked(){return hasUpgrade("gd_a",11);}
        },
        15: {
            title: "重构升级15",
            description: "更新升级15效果平方化",
            cost: new Decimal(40),
            unlocked(){return hasUpgrade("gd_a",11);}
        },
        21: {
            title: "重构升级21",
            description: "重构升级11效果平方化",
            cost: new Decimal(75),
            unlocked(){return hasUpgrade("gd_a",12);}
        },
        22: {
            title: "重构升级22",
            description: "经验升级13效果^1.2",
            cost: new Decimal(85),
            unlocked(){return hasUpgrade("gd_a",12);}
        },
        23: {
            title: "重构升级23",
            description: "解锁API可购买项",
            cost: new Decimal(105),
            unlocked(){return hasUpgrade("gd_a",12);}
        },
        24: {
            title: "重构升级24",
            description: "终点更便宜",
            cost: new Decimal(125),
            unlocked(){return hasUpgrade("gd_a",12);}
        },
        25: {
            title: "重构升级25",
            description: "解锁新图层",
            cost: new Decimal(200),
            unlocked(){return hasUpgrade("gd_a",12);}
        },
        31: {
            title: "重构升级31",
            description: "终点更便宜",
            cost: new Decimal(280),
            unlocked(){return hasUpgrade("gd_a",13);}
        },
        32: {
            title: "重构升级32",
            description: "更新升级13效果^100",
            cost: new Decimal(296),
            unlocked(){return hasUpgrade("gd_a",13);}
        },
        33: {
            title: "重构升级33",
            description: "更新升级13效果更好",
            cost: new Decimal(328),
            unlocked(){return hasUpgrade("gd_a",13);}
        },
        34: {
            title: "重构升级34",
            description: "解锁API可购买项",
            cost: new Decimal(360),
            unlocked(){return hasUpgrade("gd_a",13);}
        },
        35: {
            title: "重构升级35",
            description: "极大提升时间通量获取",
            cost: new Decimal(531),
            unlocked(){return hasUpgrade("gd_a",13);}
        },
    },
});

addLayer("gd_f", {
    name: "声望层",
    symbol: "F",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        fans: new Decimal(1),
    }},
    color: "#F564E7",
    requires: new Decimal(1e7),
    resource: "声望",
    baseResource: "现金",
    baseAmount() {return player.gd_c.points},
    type: "static",
    base(){
        if(hasUpgrade("incrementy_pi",42))return 3;
        return 4;
    },
    exponent(){
        ret = new Decimal(1.25)
        return ret
    },
    resetDescription: "提升社交地位获得",
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("gd_g",15) && hasUpgrade("gd_l",12))mult = mult.div(upgradeEffect("gd_l",12));
        if(hasUpgrade("gd_u",52))mult = mult.div(upgradeEffect("gd_u",52));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    effect(){
        let ret = Decimal.pow(5,player.gd_r.points);
        return ret
    },
    branches: ["gd_c"],
    row: 2,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==6 && player.tm.buyables[6].gte(4);},
        
    doReset(l){
        if(l=="gd_u" || l=="gd_c" || l=="gd_e" || l=="gd_r" || l=="gd_s" || l=="gd_f" || l=="gd_a" || l=="gd_t" || !l.startsWith("gd_")){return;}
        layerDataReset("gd_f",["upgrades","milestones","challenges"]);
        return;
    },
    
    tabFormat: ["main-display",
                "prestige-button", "resource-display",
                ["blank", "5px"],
                ["display-text",
                    function() {
                        return '你有' + format(player.gd_f.fans) + '粉丝，将生产力提升' + format(tmp.gd_f.fansEffect) + '倍';
                    },
                    {}],
                ["display-text",
                    function() {
                        return '粉丝数量受点数限制';
                    },
                    {}],
                ["display-text",
                    function() {
                        return '你的最佳声望每秒将粉丝数量乘以' + format(tmp.gd_f.fansGain);
                    },
                    {}],
                "milestones",
                "buyables",
                "upgrades"
        ],
    
    fansGain(){
        let ret=new Decimal(1.02).pow(player.gd_f.best);
        ret=ret.pow(tmp.gd_f.buyables[11].effect);
        ret=ret.pow(layers.gd_g.effect()[0]);
        return ret;
    },
    fansEffect(){
        let ret=player.gd_f.fans.add(9).log10();
        if(hasUpgrade("gd_f",15))ret=ret.add(layers.gd_f.fansGain().pow(0.01).add(9).log10());
        if(hasUpgrade("gd_g",12))ret=ret.pow(layers.gd_g.effect()[1]);
        return ret;
    },
    buyables: {
        rows: 1,
        cols: 5,
        11: {
            title: "Discord",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost=x.add(1);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "粉丝提升获取速度\n\
                账号数: "+formatWhole(player[this.layer].buyables[this.id])+"\n\
                成本: "+formatWhole(data.cost)+"声望\n\
                效果: " + format(data.effect) + "倍粉丝获取速度";
            },
            unlocked() { return true },
            canAfford() {
                return player.gd_f.points.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.gd_f.points = player.gd_f.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                return player.gd_f.fans.add(9).log10().pow(player[this.layer].buyables[this.id].sqrt().mul(0.1)).pow(layers.gd_g.effect()[1]).pow(hasUpgrade("gd_g",23)?0.2:1);
            },
            buyMax() {},
            style: {'height':'222px'},
        },
        12: {
            title: "Patreon",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost=x.mul(2).add(2);
                if(hasUpgrade("gd_g", 23))cost=x.add(1);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "粉丝提升现金获取\n\
                账号数: "+formatWhole(player[this.layer].buyables[this.id])+"\n\
                成本: "+formatWhole(data.cost)+"声望\n\
                效果: " + format(data.effect) + "倍现金获取";
            },
            unlocked() { return true },
            canAfford() {
                return player.gd_f.points.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.gd_f.points = player.gd_f.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                return player.gd_f.fans.add(9).log10().pow(player[this.layer].buyables[this.id].sqrt().mul(0.4)).pow(layers.gd_g.effect()[1]);
            },
            buyMax() {},
            style: {'height':'222px'},
        },
        13: {
            title: "Twitch",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost=x.mul(2).add(3);
                if(player.gd_g.best.gte(4))cost=x.mul(2).add(2);
                if(hasUpgrade("gd_g", 23))cost=x.add(1);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "粉丝提升经验获取\n\
                账号数: "+formatWhole(player[this.layer].buyables[this.id])+"\n\
                成本: "+formatWhole(data.cost)+"声望\n\
                效果: " + format(data.effect) + "倍经验获取";
            },
            unlocked() { return true },
            canAfford() {
                return player.gd_f.points.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.gd_f.points = player.gd_f.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                return player.gd_f.fans.add(9).log10().pow(player[this.layer].buyables[this.id].sqrt().mul(hasUpgrade("gd_u",64)?0.4:0.25)).pow(layers.gd_g.effect()[1]);
            },
            buyMax() {},
            style: {'height':'222px'},
        },
        14: {
            title: "Github",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost=x.mul(3).add(4);
                if(player.gd_g.best.gte(4))cost=x.mul(3).add(3);
                if(hasUpgrade("gd_g", 23))cost=x.add(1);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                if(hasUpgrade("gd_u",45))
                return "粉丝提升更新获取\n\
                账号数: "+formatWhole(player[this.layer].buyables[this.id])+"\n\
                成本: "+formatWhole(data.cost)+"声望\n\
                效果: " + format(data.effect) + "倍更新获取";
                return "基于粉丝降低更新需求\n\
                账号数: "+formatWhole(player[this.layer].buyables[this.id])+"\n\
                成本: "+formatWhole(data.cost)+"声望\n\
                效果: 更新需求/" + format(data.effect);
            },
            unlocked() { return true },
            canAfford() {
                return player.gd_f.points.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.gd_f.points = player.gd_f.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                if(hasUpgrade("gd_u",45))return upgradeEffect("gd_u",45);
                return player.gd_f.fans.add(9).log10().pow(player[this.layer].buyables[this.id].sqrt().mul(hasUpgrade("gd_u",64)?0.4:0.3)).pow(layers.gd_g.effect()[1]);
            },
            buyMax() {},
            style: {'height':'222px'},
        },
        15: {
            title: "点数提升",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost=Decimal.pow(1.2,x).mul(10).ceil();
                if(player.gd_g.best.gte(4))cost=Decimal.pow(1.15,x).mul(5).ceil();
                if(hasUpgrade("gd_g", 23))cost=x.add(1);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "基于粉丝提升点数获取\n\
                等级: "+formatWhole(player[this.layer].buyables[this.id])+"\n\
                成本: "+formatWhole(data.cost)+"声望\n\
                效果: "+(hasUpgrade("gd_g",31)?("更新升级21效果^" + format(data.effect2,4) + (hasUpgrade('gd_g',32)?(hasUpgrade('gd_u',61)?"":"(不受善意影响)"):(" (不受粉丝"+(hasUpgrade('gd_u',61)?")":"和善意影响)")))):("点数获取乘以" + format(data.effect) + ""));
            },
            unlocked() { return true },
            canAfford() {
                return player.gd_f.points.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.gd_f.points = player.gd_f.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                let base=10;
                let ret = Decimal.pow(base,Decimal.log10(player.gd_f.fans.add(10)).pow(0.55));
                return ret.pow(player[this.layer].buyables[this.id].pow(0.9)).min("ee10").pow(layers.gd_g.effect()[1]);
            },
            effect2(){
                let ret=player[this.layer].buyables[this.id].add(1).log10().pow(2).div(48).add(1);
                if(hasUpgrade('gd_u',61)){
                    ret=player[this.layer].buyables[this.id].add(1).log10().pow(2).div(87).add(1);
                    ret=ret.pow(layers.gd_g.effect()[1]);
                }
                if(hasUpgrade('gd_g',32)){
                    ret=ret.pow(player.gd_f.fans.add(1).log10().add(1).log10().div(100).add(1));
                }
                return ret;
            },
            buyMax() {},
            style: {'height':'222px'},
        },
    },
    update(diff){
        player.gd_f.fans=player.gd_f.fans.mul(tmp.gd_f.fansGain.pow(diff)).min(player.points).max(player.gd_f.fans);
        if(player.gd_g.points.gte(4)){
            player.gd_f.buyables[11]=player.gd_f.buyables[11].max(player.gd_f.points);
            if(hasUpgrade("gd_g", 23)){
                player.gd_f.buyables[12]=player.gd_f.buyables[12].max(player.gd_f.points);
                player.gd_f.buyables[13]=player.gd_f.buyables[13].max(player.gd_f.points);
                player.gd_f.buyables[14]=player.gd_f.buyables[14].max(player.gd_f.points);
                player.gd_f.buyables[15]=player.gd_f.buyables[15].max(player.gd_f.points);
            }else{
                player.gd_f.buyables[12]=player.gd_f.buyables[12].max(player.gd_f.points.div(2).floor());
                player.gd_f.buyables[13]=player.gd_f.buyables[13].max(player.gd_f.points.div(2).floor());
                player.gd_f.buyables[14]=player.gd_f.buyables[14].max(player.gd_f.points.div(3).floor());
                player.gd_f.buyables[15]=player.gd_f.buyables[15].max(player.gd_f.points.max(1).div(5).log(1.15).add(1).floor());
            }
        }
    },
    
    upgrades: {
        rows: 3,
        cols: 5,
        11: {
            title: "声望升级11",
            description: "声望提升现金指数",
            cost: new Decimal(8),
            effect() {
                let ret = player.gd_f.points.add(1).log10().add(1).log10().mul(0.5).add(1);
                if(hasUpgrade("gd_g",15) && hasUpgrade("gd_f",21))ret=ret.pow(2);
                return ret
            },
            effectDisplay() { return format(this.effect())+"倍" },
            unlocked(){return hasUpgrade("gd_g",11);}
        },
        12: {
            title: "声望升级12",
            description: "更新升级14效果平方化",
            cost: new Decimal(16),
            unlocked(){return hasUpgrade("gd_g",11);}
        },
        13: {
            title: "声望升级13",
            description: "现金升级13效果平方化",
            cost: new Decimal(24),
            unlocked(){return hasUpgrade("gd_g",11);}
        },
        14: {
            title: "声望升级14",
            description: "基于声望提升现金获取",
            cost: new Decimal(28),
            effect() {
                let ret = Decimal.pow(1.15,player.gd_f.points);
                if(hasUpgrade("gd_g",15) && hasUpgrade("gd_f",24))ret=ret.pow(5);
                return ret
            },
            effectDisplay() { return format(this.effect())+"倍" },
            unlocked(){return hasUpgrade("gd_g",11);}
        },
        15: {
            title: "声望升级15",
            description: "基于粉丝获取速度提升粉丝效果",
            cost: new Decimal(32),
            unlocked(){return hasUpgrade("gd_g",11);}
        },
        21: {
            title: "声望升级21",
            description: "声望升级11效果平方化",
            cost: new Decimal(50),
            unlocked(){return hasUpgrade("gd_g",15);}
        },
        22: {
            title: "声望升级22",
            description: "更新升级14效果平方化",
            cost: new Decimal(60),
            unlocked(){return hasUpgrade("gd_g",15);}
        },
        23: {
            title: "声望升级23",
            description: "现金升级13效果^1.2",
            cost: new Decimal(72),
            unlocked(){return hasUpgrade("gd_g",15);}
        },
        24: {
            title: "声望升级24",
            description: "声望升级14效果^5",
            cost: new Decimal(80),
            unlocked(){return hasUpgrade("gd_g",15);}
        },
        25: {
            title: "声望升级25",
            description: "解锁新图层",
            cost: new Decimal(110),
            unlocked(){return hasUpgrade("gd_g",15);}
        },
        31: {
            title: "声望升级31",
            description: "降低第5个TA的需求",
            cost: new Decimal(200),
            unlocked(){return hasUpgrade("gd_g",21);}
        },
        32: {
            title: "声望升级32",
            description: "现金升级13效果^1.1364",
            cost: new Decimal(300),
            unlocked(){return hasUpgrade("gd_g",21);}
        },
        33: {
            title: "声望升级33",
            description: "现金指数乘以1.5",
            cost: new Decimal(350),
            unlocked(){return hasUpgrade("gd_g",21);}
        },
        34: {
            title: "声望升级34",
            description: "现金升级13效果^1.25",
            cost: new Decimal(400),
            unlocked(){return hasUpgrade("gd_g",21);}
        },
        35: {
            title: "声望升级35",
            description: "极大提升讲座获取",
            cost: new Decimal(440),
            unlocked(){return hasUpgrade("gd_g",21);}
        },
    },
    milestones: {
        0: {
            requirementDescription: "4声望",
            done() {return player[this.layer].best.gte(4)},
            effectDescription: "可以购买最大声望，声望不重置任何内容，并解锁一个更新升级",
        },
    },
    canBuyMax() {return hasMilestone("gd_f",0)},
    autoPrestige(){
        return hasMilestone("gd_g",0);
    },resetsNothing(){
        return hasMilestone("gd_f",0);
    },
});


addLayer("gd_s", {
    name: "入学层",
    symbol: "S",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#917567",
    requires: new Decimal(1e9),
    resource: "入学次数",
    baseResource: "经验",
    baseAmount() {return player.gd_e.points},
    type: "static",
    base(){
        let ret=10;
        if(hasMilestone("gd_d",4))ret--;
        if(player.milestone_m.points.gte(66))ret--;
        return ret;
    },
    exponent(){
        ret = new Decimal(1.25)
        return ret
    },
    resetDescription: "申请另一所大学获得",
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("gd_g",15) && hasUpgrade("gd_l",14))mult = mult.div(upgradeEffect("gd_l",14));
        if(hasUpgrade("gd_u",52))mult = mult.div(upgradeEffect("gd_u",52));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    branches: ["gd_e","gd_c"],
    row: 2,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==6 && player.tm.buyables[6].gte(5);},
        
    doReset(l){
        if(l=="gd_u" || l=="gd_c" || l=="gd_e" || l=="gd_r" || l=="gd_s" || l=="gd_f" || l=="gd_a" || l=="gd_g" || !l.startsWith("gd_")){return;}
        var b=new Decimal(player.gd_s.best);
        layerDataReset("gd_s",["upgrades","milestones","challenges"]);
        player.gd_s.best=b;
        return;
    },
    
    tabFormat: ["main-display",
                "prestige-button", "resource-display",
                ["blank", "5px"],
                "milestones",
                "buyables",
                "upgrades",
        ],
    
    milestones: {
        0: {
            requirementDescription: "1次入学",
            done() {return player[this.layer].best.gte(1)},
            effectDescription: "解锁课程。每秒获得100%经验获取",
        },
        1: {
            requirementDescription: "4次入学",
            done() {return player[this.layer].best.gte(4)},
            effectDescription: "解锁课程",
        },
        2: {
            requirementDescription: "10次入学",
            done() {return player[this.layer].best.gte(10)},
            effectDescription: "解锁课程",
        },
        3: {
            requirementDescription: "20次入学",
            done() {return player[this.layer].best.gte(20)},
            effectDescription: "解锁课程。自动升级硬件",
        },
    },
    buyables: {
        rows: 2,
        cols: 2,
        11: {
            title: "CS 1337 计算机科学",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost=Decimal.pow(2,x.pow(1.2)).mul(1e8);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "提升经验效果\n\
                课程数: "+formatWhole(player[this.layer].buyables[this.id])+(player.gd_d.best.gt(0)?("+"+formatWhole(layers.gd_d.effect())):"")+"\n\
                成本: "+formatWhole(data.cost)+"现金\n\
                效果: ^" + format(data.effect)+" (基于入学次数提升)";
            },
            unlocked() { return player.gd_s.best.gte(1) },
            canAfford() {
                return player.gd_c.points.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.gd_c.points = player.gd_c.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                return player.gd_s.buyables[11].add(layers.gd_d.effect()).mul(player.gd_s.points.mul(0.1).add(1)).pow(0.5).mul(0.1).add(1);
            },
            buyMax() {},
            style: {'height':'222px'},
        },
        12: {
            title: "CS 2305 离散数学",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost=Decimal.pow(5,x.pow(1.2)).mul(1e8);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "延迟生产力减速\n\
                课程数: "+formatWhole(player[this.layer].buyables[this.id])+(player.gd_d.best.gt(0)?("+"+formatWhole(layers.gd_d.effect())):"")+"\n\
                成本: "+formatWhole(data.cost)+"现金\n\
                效果: " + format(data.effect)+"倍 (基于入学次数提升)";
            },
            unlocked() { return player.gd_s.best.gte(4) },
            canAfford() {
                return player.gd_c.points.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.gd_c.points = player.gd_c.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                let ret=Decimal.pow(1.5,player.gd_s.buyables[12].add(layers.gd_d.effect()).mul(player.gd_s.points.mul(0.1).add(1)));
                if(hasUpgrade("gd_s",15))ret=ret.pow(2);
                return ret;
            },
            buyMax() {},
            style: {'height':'222px'},
        },
        21: {
            title: "CS 3354 软件工程",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost=Decimal.pow(10,x.pow(1.2)).mul(1e15);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "提升经验获取\n\
                课程数: "+formatWhole(player[this.layer].buyables[this.id])+(player.gd_d.best.gt(0)?("+"+formatWhole(data.free)):"")+"\n\
                成本: "+formatWhole(data.cost)+"现金\n\
                效果: " + format(data.effect)+"倍 (基于入学次数提升)";
            },
            unlocked() { return player.gd_s.best.gte(10) },
            canAfford() {
                return player.gd_c.points.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.gd_c.points = player.gd_c.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                let ret=Decimal.pow(1.5,player.gd_s.buyables[21].add(layers.gd_s.buyables[21].free()).mul(player.gd_s.points.mul(0.1).add(1)));
                if(ret.gte(1e200))ret=ret.log10().div(2).pow(100);
                return ret;
            },
            buyMax() {},
            style: {'height':'222px'},
            free(){
                let ret=layers.gd_d.effect();
                if(hasUpgrade("gd_s",11))ret=ret.add(10);
                return ret;
            },
        },
        22: {
            title: "CS 4352 人机交互",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost=Decimal.pow(1e4,x.pow(1.5)).mul(1e40);
                if(hasUpgrade("gd_s",13))cost=Decimal.pow(100,x.pow(1.2)).mul(1e20);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "提升硬件升级效果\n\
                课程数: "+formatWhole(player[this.layer].buyables[this.id])+(player.gd_d.best.gt(0)?("+"+formatWhole(layers.gd_d.effect())):"")+"\n\
                成本: "+formatWhole(data.cost)+"现金\n\
                效果: ^" + format(data.effect)+" (基于入学次数提升)";
            },
            unlocked() { return player.gd_s.best.gte(20) },
            canAfford() {
                return player.gd_c.points.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player.gd_c.points = player.gd_c.points.sub(cost)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(){
                return player.gd_s.buyables[22].add(layers.gd_d.effect()).mul(player.gd_s.points.mul(0.1).add(1)).pow(0.5).mul(0.05).add(1);
            },
            buyMax() {},
            style: {'height':'222px'},
        },
    },
    canBuyMax() {return hasMilestone("gd_d",0)},
    autoPrestige(){
        return hasMilestone("gd_d",0);
    },resetsNothing(){
        return hasMilestone("gd_d",0);
    },
    upgrades: {
        rows: 1,
        cols: 5,
        11: {
            title: "入学升级11",
            description: "为'CS 3354 软件工程'添加10个免费等级",
            cost: new Decimal(28),
            unlocked() { return player.tm.buyables[6].gte(9) },
        },
        12: {
            title: "入学升级12",
            description: "'CS 1337 计算机科学'提升经验升级12",
            cost: new Decimal(32),
            unlocked() { return player.tm.buyables[6].gte(9) },
        },
        13: {
            title: "入学升级13",
            description: "'CS 4352 人机交互'更便宜",
            cost: new Decimal(34),
            unlocked() { return player.tm.buyables[6].gte(9) },
        },
        14: {
            title: "入学升级14",
            description: "经验升级13和现金升级13效果^1.1",
            cost: new Decimal(35),
            unlocked() { return player.tm.buyables[6].gte(9) },
        },
        15: {
            title: "入学升级15",
            description: "'CS 2305 离散数学'效果平方化",
            cost: new Decimal(36),
            unlocked() { return player.tm.buyables[6].gte(9) },
        },
    },
    update(diff){
        if(player.gd_d.points.gte(2)){
            player.gd_s.buyables[11]=player.gd_s.buyables[11].max(player.gd_c.points.div(1e8).add(1).log(2).pow(1/1.2).add(1).floor());
            player.gd_s.buyables[12]=player.gd_s.buyables[12].max(player.gd_c.points.div(1e8).add(1).log(5).pow(1/1.2).add(1).floor());
            player.gd_s.buyables[21]=player.gd_s.buyables[21].max(player.gd_c.points.div(1e15).add(1).log(10).pow(1/1.2).add(1).floor());
            player.gd_s.buyables[22]=player.gd_s.buyables[22].max(player.gd_c.points.div(1e40).add(1).log(1e4).pow(1/1.5).add(1).floor());
            if(hasUpgrade("gd_s",13))player.gd_s.buyables[22]=player.gd_s.buyables[22].max(player.gd_c.points.div(1e20).add(1).log(100).pow(1/1.2).add(1).floor());
        }
    },
});


addLayer("gd_g", {
    name: "善意层",
    symbol: "G",
    position: 4,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        unused: new Decimal(0),
    }},
    color: "#156B25",
    requires: new Decimal(6),
    resource: "善意值",
    baseResource: "声望",
    baseAmount() {return player.gd_f.points},
    type: "static",
    base: 1.5,
    exponent(){
        ret = new Decimal(1.25)
        return ret
    },
    roundUpCost: true,
    effect(){
        if(inChallenge("gd_d",11)||inChallenge("gd_d",21)||inChallenge("gd_d",22))return [new Decimal(1), new Decimal(1)];
        let ret = player.gd_g.points.mul(3).add(1).mul(player.gd_f.best.pow(player.gd_g.points.pow(0.3).mul(0.5))).pow(hasUpgrade("gd_g",23)?0.2:1).max(1);
        let ret2 = player.gd_g.points.pow(0.3).mul(0.5).add(1);
        return [ret, ret2];
    },
    effectDescription(){
        return "将粉丝获取速度提升" + format(layers.gd_g.effect()[0]) + "倍(基于最佳声望)"
    },
    resetDescription: "获得粉丝信任获得",
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("gd_g",15) && hasUpgrade("gd_l",15))mult = mult.div(upgradeEffect("gd_l",15));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    branches: ["gd_f"],
    row: 3,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==6 && player.tm.buyables[6].gte(6);},
        
    doReset(l){
        if(l=="gd_u" || l=="gd_c" || l=="gd_e" || l=="gd_r" || l=="gd_s" || l=="gd_f" || l=="gd_a" || l=="gd_t" || l=="gd_d" || l=="gd_l" || l=="gd_g" || !l.startsWith("gd_")){return;}
        var b=new Decimal(player[this.layer].best);
        layerDataReset(this.layer,["upgrades","milestones","challenges"]);
        player[this.layer].best=b;
        return;
    },
        
    tabFormat: ["main-display",
                ["display-text",
                    function() {
                        return '你的善意值将声望可购买项效果提升至' + format(layers.gd_g.effect()[1]) + '次方';
                    },
                    {}],
                "prestige-button", "resource-display",
                "milestones",
                ["blank", "5px"],
                ["display-text",function(){return "剩余善意值: "+formatWhole(player.gd_g.unused)+"/"+formatWhole(player.gd_g.points)}],
                ["blank", "5px"],
                ["buyable",1],
                "upgrades"
        ],
        
    usedGW(){
        var ret=new Decimal(0);
        for(var i in player.gd_g.upgrades){
            ret=tmp.gd_g.upgrades[player.gd_g.upgrades[i]].cost.add(ret);
        }
        return ret;
    },
    update(diff){
        player.gd_g.unused=player.gd_g.points.sub(layers.gd_g.usedGW());
    },
    
    buyables: {
        1: {
            title: "重置善意升级",
            display: "",
            unlocked() { return player[this.layer].unlocked && player[this.layer].points.lt(15) }, 
            canAfford() {
                return true;
            },
            buy() {
                if(confirm("这将强制重置善意值！确定吗？")){
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
            title: "善意升级11",
            description: "解锁声望升级",
            cost: new Decimal(1),
            currencyDisplayName: "剩余善意值",
            currencyInternalName: "unused",
            currencyLayer: "gd_g",
            unlocked() { return player[this.layer].best.gte(1); },
        },
        12: {
            title: "善意升级12",
            description: "第二个善意效果也影响粉丝效果",
            cost: new Decimal(1),
            currencyDisplayName: "剩余善意值",
            currencyInternalName: "unused",
            currencyLayer: "gd_g",
            effect() {
                let ret = tmp.gd_g.effect[1];
                return ret
            },
            effectDisplay() { return "^"+format(this.effect()) },
            unlocked() { return player[this.layer].best.gte(1); },
        },
        13: {
            title: "善意升级13",
            description(){
                return "更多善意=更多捐赠。每秒获得"+format(upgradeEffect("gd_g",13)*100)+"%现金获取";
            },
            cost: new Decimal(1),
            currencyDisplayName: "剩余善意值",
            currencyInternalName: "unused",
            currencyLayer: "gd_g",
            effect() {
                if(inChallenge("gd_d",11)||inChallenge("gd_d",21)||inChallenge("gd_d",22))return 0;
                if(player.gd_g.points.lte(0))return 0;
                if(player.gd_g.points.gte(100))return 1e10;
                let ret = player.gd_g.points.mul(5).mul(Decimal.pow(1.5,player.gd_g.points)).recip().add(1e-10).recip().toNumber();
                return ret;
            },
            unlocked() { return player[this.layer].best.gte(1); },
        },
        14: {
            title: "善意升级14",
            description: "第一个善意效果也影响现金获取",
            cost: new Decimal(1),
            currencyDisplayName: "剩余善意值",
            currencyInternalName: "unused",
            currencyLayer: "gd_g",
            effect() {
                let ret = tmp.gd_g.effect[0];
                return ret
            },
            effectDisplay() { return format(this.effect())+"倍" },
            unlocked() { return player[this.layer].best.gte(1); },
        },
        15: {
            title: "善意升级15",
            description: "解锁新的一排声望升级",
            cost: new Decimal(1),
            currencyDisplayName: "剩余善意值",
            currencyInternalName: "unused",
            currencyLayer: "gd_g",
            unlocked() { return hasUpgrade("gd_g",11) && player.gd_d.challenges[12]; },
        },
        21: {
            title: "善意升级21",
            description: "解锁新的一排声望升级",
            cost: new Decimal(2),
            currencyDisplayName: "剩余善意值",
            currencyInternalName: "unused",
            currencyLayer: "gd_g",
            unlocked() { return hasUpgrade("gd_g",15) && player.gd_d.challenges[22]; },
        },
        22: {
            title: "善意升级22",
            description: "提升讲座获取",
            cost: new Decimal(2),
            currencyDisplayName: "剩余善意值",
            currencyInternalName: "unused",
            currencyLayer: "gd_g",
            unlocked() { return player[this.layer].best.gte(9); },
        },
        23: {
            title: "善意升级23",
            description: "[Fans.zip]降低粉丝获取但使第2-5个声望可购买项更便宜，但会强制重置善意值",
            cost: new Decimal(2),
            currencyDisplayName: "剩余善意值",
            currencyInternalName: "unused",
            currencyLayer: "gd_g",
            unlocked() { return player[this.layer].best.gte(9); },
            onPurchase(){
                doReset(this.layer,true);
            }
        },
        24: {
            title: "善意升级24",
            description: "提升时间通量获取",
            cost: new Decimal(2),
            currencyDisplayName: "剩余善意值",
            currencyInternalName: "unused",
            currencyLayer: "gd_g",
            unlocked() { return player[this.layer].best.gte(13); },
        },
        25: {
            title: "善意升级25",
            description: "解锁讲座升级",
            cost: new Decimal(2),
            currencyDisplayName: "剩余善意值",
            currencyInternalName: "unused",
            currencyLayer: "gd_g",
            unlocked() { return player[this.layer].best.gte(15); },
        },
        31: {
            title: "善意升级31",
            description: "声望可购买项'点数提升'将提升更新升级21而非点数获取",
            cost: new Decimal(3),
            currencyDisplayName: "剩余善意值",
            currencyInternalName: "unused",
            currencyLayer: "gd_g",
            unlocked() { return player[this.layer].best.gte(18) && hasUpgrade("tm",52); },
        },
        32: {
            title: "善意升级32",
            description: "购买善意升级31后，声望可购买项'点数提升'效果受粉丝影响",
            cost: new Decimal(3),
            currencyDisplayName: "剩余善意值",
            currencyInternalName: "unused",
            currencyLayer: "gd_g",
            unlocked() { return player[this.layer].best.gte(24) && hasUpgrade("tm",52); },
        },
        33: {
            title: "善意升级33",
            description: "提升经验升级14效果并应用于现金获取",
            cost: new Decimal(3),
            currencyDisplayName: "剩余善意值",
            currencyInternalName: "unused",
            currencyLayer: "gd_g",
            unlocked() { return player[this.layer].best.gte(24) && hasUpgrade("tm",52); },
        },
        34: {
            title: "善意升级34",
            description: "声望升级14和第一个善意效果提升经验获取",
            cost: new Decimal(3),
            currencyDisplayName: "剩余善意值",
            currencyInternalName: "unused",
            currencyLayer: "gd_g",
            unlocked() { return player[this.layer].best.gte(27) && hasUpgrade("tm",52); },
        },
    },
    milestones: {
        0: {
            requirementDescription: "3善意值",
            done() { return player[this.layer].best.gte(3) },
            effectDescription: "自动购买声望",
        },
        1: {
            requirementDescription: "4善意值",
            done() { return player[this.layer].best.gte(4) },
            effectDescription: "自动购买声望可购买项，声望可购买项更便宜",
        },
    },
});

addLayer("gd_a", {
    name: "API层",
    symbol: "A",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        unused: new Decimal(0),
    }},
    color: "#AADB60",
    requires: new Decimal(20),
    resource: "端点",
    baseResource: "重构次数",
    baseAmount() {return player.gd_r.points},
    type: "static",
    base(){
        var l = 0;
        if(hasUpgrade("gd_a",12) && hasUpgrade("gd_r",24))l++;
        if(hasUpgrade("gd_e",22))l++;
        if(hasUpgrade("gd_a",13) && hasUpgrade("gd_r",31))l++;
        return new Decimal([1.5,1.2,1.15,1.1,1.08][l]);
    },
    exponent(){
        var l = 0;
        if(player.milestone_m.points.gte(67))l++;
        return new Decimal([1.1,1.05][l]);
    },
    roundUpCost: true,
    resetDescription: "设计",
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("gd_g",15) && hasUpgrade("gd_l",15) && hasUpgrade("gd_l",24))mult = mult.div(upgradeEffect("gd_l",15));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    branches: ["gd_r"],
    row: 3,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==6 && player.tm.buyables[6].gte(7);},
        
    doReset(l){
        if(l=="gd_u" || l=="gd_c" || l=="gd_e" || l=="gd_r" || l=="gd_s" || l=="gd_f" || l=="gd_a" || l=="gd_t" || l=="gd_d" || l=="gd_l" || l=="gd_g" || !l.startsWith("gd_")){return;}
        var b=new Decimal(player[this.layer].best);
        layerDataReset(this.layer,["upgrades","milestones","challenges"]);
        player[this.layer].best=b;
        return;
    },
        
    tabFormat: ["main-display",
                "prestige-button", "resource-display",
                "milestones",
                ["blank", "5px"],
                ["display-text",function(){return "剩余端点: "+formatWhole(player.gd_a.unused)+"/"+formatWhole(player.gd_a.points)}],
                ["blank", "5px"],
                ["buyable",1],
                "buyables",
                "upgrades"
        ],
        
    usedEndpoints(){
        var ret=new Decimal(0);
        for(var i in player.gd_a.upgrades){
            ret=tmp.gd_a.upgrades[player.gd_a.upgrades[i]].cost.add(ret);
        }
        for(var i in player.gd_a.buyables){
            if(i!=1)ret=player.gd_a.buyables[i].add(ret);
        }
        return ret;
    },
    update(diff){
        player.gd_a.unused=player.gd_a.points.sub(layers.gd_a.usedEndpoints());
    },
    upgrades: {
        rows: 1,
        cols: 4,
        11: {
            title: "API升级11",
            description: "解锁重构升级",
            cost: new Decimal(1),
            currencyDisplayName: "剩余端点",
            currencyInternalName: "unused",
            currencyLayer: "gd_a",
            unlocked() { return player[this.layer].best.gte(1); },
        },
        12: {
            title: "API升级12",
            description: "解锁新的一排重构升级",
            cost: new Decimal(1),
            currencyDisplayName: "剩余端点",
            currencyInternalName: "unused",
            currencyLayer: "gd_a",
            unlocked() { return hasUpgrade("gd_a",11) && player.gd_d.challenges[11]; },
        },
        13: {
            title: "API升级13",
            description: "解锁新的一排重构升级",
            cost: new Decimal(1),
            currencyDisplayName: "剩余端点",
            currencyInternalName: "unused",
            currencyLayer: "gd_a",
            unlocked() { return hasUpgrade("gd_a",12) && player.gd_d.challenges[21]; },
        },
    },
    milestones: {
        0: {
            requirementDescription: "1端点",
            done() { return player[this.layer].best.gte(1) },
            effectDescription: "自动购买重构，可以购买最大重构，重构不重置任何内容",
        },
        1: {
            requirementDescription: "50端点",
            done() { return player[this.layer].best.gte(50) },
            effectDescription: "可以购买最大端点",
        },
    },
    
    buyables: {
        1: {
            title: "重新设计API",
            display: "",
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() {
                return true;
            },
            buy() {
                if(confirm("这将强制重置API！确定吗？")){
                    player[this.layer].upgrades=[];
                    player[this.layer].buyables={11:new Decimal(0),12:new Decimal(0),21:new Decimal(0)};
                    doReset(this.layer,true);
                }
            },
            buyMax() {},
            style: {'height':'60px'},
        },
        rows: 2,
        cols: 2,
        11: {
            title: "/refactoring/boost",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost=new Decimal(1);
                return cost
            },
            req(x=player[this.layer].buyables[this.id]) {
                let cost=Decimal.pow(4,x).mul(3e4);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "提升重构工作获取\n\
                端点: "+formatWhole(player[this.layer].buyables[this.id])+"\n\
                成本: "+formatWhole(data.cost)+"剩余端点\n\
                需求: "+formatWhole(data.req)+"更新\n\
                效果: " + format(data.effect)+"倍(基于总端点提升)";
            },
            unlocked() { return hasUpgrade("gd_a",11) && hasUpgrade("gd_r",13); }, 
            canAfford() {
                return player.gd_a.unused.gte(tmp[this.layer].buyables[this.id].cost) && player.gd_u.points.gte(tmp[this.layer].buyables[this.id].req)
            },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                player.gd_a.unused=player.gd_a.points.sub(layers.gd_a.usedEndpoints());
            },
            effect(){
                if(inChallenge("gd_d",12)||inChallenge("gd_d",21)||inChallenge("gd_d",22))return new Decimal(1);
                if(player.gd_a.points.gte(20))return Decimal.pow(1e10,player.gd_a.buyables[11].mul(player.gd_a.points.add(1)));
                return Decimal.pow(1e5,player.gd_a.buyables[11].mul(player.gd_a.points.mul(0.1).add(1)).pow(0.5));
            },
            buyMax() {},
            style: {'height':'222px'},
        },
        12: {
            title: "/productivity/boost",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost=new Decimal(1);
                return cost
            },
            req(x=player[this.layer].buyables[this.id]) {
                let cost=Decimal.pow(4,x).mul(3e4);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "提升生产力\n\
                端点: "+formatWhole(player[this.layer].buyables[this.id])+"\n\
                成本: "+formatWhole(data.cost)+"剩余端点\n\
                需求: "+formatWhole(data.req)+"更新\n\
                效果: " + format(data.effect)+"倍(基于总端点提升)";
            },
            unlocked() { return hasUpgrade("gd_a",12) && hasUpgrade("gd_r",23); }, 
            canAfford() {
                return player.gd_a.unused.gte(tmp[this.layer].buyables[this.id].cost) && player.gd_u.points.gte(tmp[this.layer].buyables[this.id].req)
            },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                player.gd_a.unused=player.gd_a.points.sub(layers.gd_a.usedEndpoints());
            },
            effect(){
                if(inChallenge("gd_d",12)||inChallenge("gd_d",21)||inChallenge("gd_d",22))return new Decimal(1);
                if(player.gd_a.points.gte(20))return Decimal.pow(1e10,player.gd_a.buyables[12].mul(player.gd_a.points.add(1)));
                return Decimal.pow(1e5,player.gd_a.buyables[12].mul(player.gd_a.points.mul(0.1).add(1)).pow(0.5));
            },
            buyMax() {},
            style: {'height':'222px'},
        },
        21: {
            title: "/slowdown/boost",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost=new Decimal(1);
                return cost
            },
            req(x=player[this.layer].buyables[this.id]) {
                let cost=Decimal.pow(4,x).mul(3e4);
                return cost
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "生产力减速开始更晚\n\
                端点: "+formatWhole(player[this.layer].buyables[this.id])+"\n\
                成本: "+formatWhole(data.cost)+"剩余端点\n\
                需求: "+formatWhole(data.req)+"更新\n\
                效果: " + format(data.effect)+"倍(基于总端点提升)";
            },
            unlocked() { return hasUpgrade("gd_a",13) && hasUpgrade("gd_r",34); }, 
            canAfford() {
                return player.gd_a.unused.gte(tmp[this.layer].buyables[this.id].cost) && player.gd_u.points.gte(tmp[this.layer].buyables[this.id].req)
            },
            buy() {
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                player.gd_a.unused=player.gd_a.points.sub(layers.gd_a.usedEndpoints());
            },
            effect(){
                if(inChallenge("gd_d",12)||inChallenge("gd_d",21)||inChallenge("gd_d",22))return new Decimal(1);
                if(player.gd_a.points.gte(20))return Decimal.pow(1e10,player.gd_a.buyables[21].mul(player.gd_a.points.add(1)));
                return Decimal.pow(1e5,player.gd_a.buyables[21].mul(player.gd_a.points.mul(0.1).add(1)).pow(0.5));
            },
            buyMax() {},
            style: {'height':'222px'},
        },
    },
    canBuyMax() {return hasMilestone("gd_a",1)},
});

addLayer("gd_d", {
    name: "文凭层",
    symbol: "D",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        unused: new Decimal(0),
    }},
    color: "#6212FA",
    requires: new Decimal(25),
    resource: "文凭",
    baseResource: "入学次数",
    baseAmount() {return player.gd_s.points},
    type: "static",
    base: 1.2,
    exponent(){
        ret = new Decimal(1.1)
        return ret
    },
    roundUpCost: true,
    resetDescription: "毕业获得",
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    branches: ["gd_r","gd_s","gd_f"],
    row: 3,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==6 && player.tm.buyables[6].gte(8);},
        
    doReset(l){
        if(l=="gd_u" || l=="gd_c" || l=="gd_e" || l=="gd_r" || l=="gd_s" || l=="gd_f" || l=="gd_a" || l=="gd_t" || l=="gd_d" || l=="gd_l" || l=="gd_g" || !l.startsWith("gd_")){return;}
        var b=new Decimal(player[this.layer].best);
        layerDataReset(this.layer,["upgrades","milestones","challenges"]);
        player[this.layer].best=b;
        return;
    },
        
    milestones: {
        0: {
            requirementDescription: "1文凭",
            done() { return player[this.layer].best.gte(1) },
            effectDescription: "自动购买入学，可以购买最大入学，入学不重置任何内容",
        },
        1: {
            requirementDescription: "2文凭",
            done() { return player[this.layer].best.gte(2) },
            effectDescription: "自动购买课程(入学可购买项)",
        },
        2: {
            requirementDescription: "3文凭",
            done() { return player[this.layer].best.gte(3) },
            effectDescription: "重构便宜1e8倍",
        },
        3: {
            requirementDescription: "9文凭",
            unlocked() {return hasUpgrade("gd_r",25) && hasUpgrade("gd_f",25);},
            done() { return player[this.layer].best.gte(9) },
            effectDescription: "极大提升时间通量和讲座获取。每秒获得100%时间通量和讲座获取。购买时间通量可购买项无需花费",
        },
        4: {
            requirementDescription: "19文凭",
            unlocked() {return hasUpgrade("gd_r",35) && hasUpgrade("gd_f",35);},
            done() { return player[this.layer].best.gte(19) },
            effectDescription: "入学更便宜",
        }
    },
    effect(){
        let ret = player.gd_d.points.mul(player.gd_d.points.div(2).add(3)).floor();
        return ret;
    },
    effectDescription(){
        return "为每门课程增加" + format(layers.gd_d.effect()) + "个免费等级";
    },
    
    challenges: {
        rows: 2,
        cols: 2,
        11: {
            name: "计算机科学学士",
            challengeDescription: "通过引起文凭重置并禁用第4行所有图层(文凭和API除外)来展示你的专业掌握。(声望升级仍然有效)",
            rewardDescription: "解锁一个API升级",
            goal: new Decimal(22),
            currencyDisplayName: "入学次数",
            currencyInternalName: "points",
            currencyLayer: "gd_s",
            unlocked() { return player.tm.buyables[6].gte(10); },
            style: { width: "400px", height: "320px" }
        },
        12: {
            name: "市场营销学士",
            challengeDescription: "通过引起文凭重置并禁用第4行所有图层(文凭和善意值除外)来展示你的专业掌握。(重构升级仍然有效)",
            rewardDescription: "解锁一个善意值升级",
            goal: new Decimal(55),
            currencyDisplayName: "入学次数",
            currencyInternalName: "points",
            currencyLayer: "gd_s",
            unlocked() { return player.tm.buyables[6].gte(11); },
            style: { width: "400px", height: "320px" }
        },
        21: {
            name: "计算机科学硕士",
            challengeDescription: "通过引起文凭重置并禁用第4行所有图层(文凭和时间通量除外)来展示你的专业掌握",
            rewardDescription: "解锁第9个环和一个API升级",
            goal: new Decimal(140),
            currencyDisplayName: "入学次数",
            currencyInternalName: "points",
            currencyLayer: "gd_s",
            unlocked() { return hasMilestone("gd_d", 3) },
            countsAs: [ 11, 12 ],
            style: { width: "400px", height: "320px" }
        },
        22: {
            name: "市场营销硕士",
            challengeDescription: "通过引起文凭重置并禁用第4行所有图层(文凭和讲座除外)来展示你的专业掌握",
            rewardDescription: "解锁另一个TA和一个善意值升级",
            goal: new Decimal(160),
            currencyDisplayName: "入学次数",
            currencyInternalName: "points",
            currencyLayer: "gd_s",
            unlocked() { return hasMilestone("gd_d", 3) },
            countsAs: [ 11, 12 ],
            style: { width: "400px", height: "320px" }
        }
    },
});



addLayer("gd_t", {
    name: "时间通量层",
    symbol: "T",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        shards: new Decimal(0),
        rings: new Array(8).fill(new Decimal(0))
    }},
    color: "#9F52F0",
    requires() {
        ret = new Decimal(200)
        if(hasUpgrade("gd_e", 23))ret = ret.sub(10)
        if(player.gd_d.best.gte(9))ret = ret.sub(20)
        if(hasUpgrade("gd_r", 35))ret = ret.sub(70)
        if(hasUpgrade("gd_e", 35))ret = ret.sub(50)
        return ret
    },
    resource: "时间通量",
    baseResource: "重构次数",
    baseAmount() {return player.gd_r.points},
    type: "normal",
    exponent(){
        ret = new Decimal(20)
        if(hasUpgrade("gd_g", 24))ret = ret.add(5)
        return ret
    },
    roundUpCost: true,
    resetDescription: "重构时间获得",
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("gd_e", 23))mult = mult.mul(20)
        if(hasUpgrade("gd_r", 35))mult = mult.mul(5)
        if(player.milestone_m.best.gte(30))mult = mult.mul(tmp.milestone_m.milestone29Effect)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    branches: ["gd_r","gd_s"],
    row: 3,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==6 && hasUpgrade("gd_r",25)},
        
    doReset(l){
        if(l=="gd_u" || l=="gd_c" || l=="gd_e" || l=="gd_r" || l=="gd_s" || l=="gd_f" || l=="gd_a" || l=="gd_t" || l=="gd_d" || l=="gd_l" || l=="gd_g" || !l.startsWith("gd_")){return}
        var b=new Decimal(player[this.layer].best)
        layerDataReset(this.layer,["upgrades","milestones","challenges"])
        player[this.layer].best=b
        return
    },
        
    tabFormat: ["main-display",
                "prestige-button", "resource-display",
                "milestones",
                ["blank", "5px"],
                ["display-text",function(){return "你有"+formatWhole(player.gd_t.shards)+"时间碎片，正在将工作时长获取、经验和现金获取提升"+format(tmp.gd_t.effect)+"倍"}],
                "upgrades",
                "buyables"
        ],
    
    effect() {
        if (inChallenge("gd_d", 22)) return 1
        return player[this.layer].shards.add(1)
    },
    
    buyables: {
        rows: 9,
        cols: 1,
        11: {
            title: "第一环",
            display() {
                if (getBuyableAmount(this.layer, this.id).gt(0))
                    return `使时间碎片生成速度翻倍。<br/>当前: ${format(this.effect())}/秒<br/>需要${formatWhole(this.cost())}时间通量`
                return `生成时间碎片。<br/>当前: ${format(this.effect())}/秒<br/>需要${formatWhole(this.cost())}时间通量`
            },
            cost(x) { return new Decimal(2).pow(new Decimal(1).pow(1.5)).pow(x || getBuyableAmount(this.layer, this.id)) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if(player.gd_d.best.lt(9))player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, new Decimal(1).add(getBuyableAmount(this.layer, this.id)))
            },
            effect() {
                if (getBuyableAmount(this.layer, this.id).gt(0))
                    return new Decimal(2).pow(getBuyableAmount(this.layer, this.id).sub(1)).times(buyableEffect(this.layer, 21).multiplier).times(player.milestone_m.best.gte(21)?tmp.milestone_m.milestone21Effect:1).times(hasUpgrade("gd_u",53)?upgradeEffect("gd_u",53):1)
                return new Decimal(0)
            },
            style: { width: "600px", height: "120px" }
        },
        21: {
            title: "第二环",
            display() {
                const effect = this.effect()
                if (getBuyableAmount(this.layer, this.id).gt(0))
                    return `使第一环的倍率增长速度翻倍。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
                return `随时间增强第一环。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
            },
            cost(x) { return new Decimal(2).pow(new Decimal(2).pow(1.5)).pow(Decimal.add(x || getBuyableAmount(this.layer, this.id), 1)) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if(player.gd_d.best.lt(9))player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, new Decimal(1).add(getBuyableAmount(this.layer, this.id)))
            },
            effect() {
                return {
                    multiplier: player.gd_t.rings[0].add(1),
                    rate: getBuyableAmount(this.layer, this.id).gt(0) ? new Decimal(2).pow(getBuyableAmount(this.layer, this.id).sub(1)).mul(buyableEffect(this.layer, 31).multiplier).times(player.milestone_m.best.gte(21)?tmp.milestone_m.milestone21Effect:1).times(hasUpgrade("gd_u",53)?upgradeEffect("gd_u",53):1) : new Decimal(0)
                }
            },
            style: { width: "600px", height: "120px" }
        },
        31: {
            title: "第三环",
            display() {
                const effect = this.effect()
                if (getBuyableAmount(this.layer, this.id).gt(0))
                    return `使第二环的倍率增长速度翻倍。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
                return `随时间增强第二环。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
            },
            cost(x) { return new Decimal(2).pow(new Decimal(3).pow(1.5)).pow(Decimal.add(x || getBuyableAmount(this.layer, this.id), 1)) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if(player.gd_d.best.lt(9))player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, new Decimal(1).add(getBuyableAmount(this.layer, this.id)))
            },
            effect() {
                return {
                    multiplier: player.gd_t.rings[1].add(1),
                    rate: getBuyableAmount(this.layer, this.id).gt(0) ? new Decimal(2).pow(getBuyableAmount(this.layer, this.id).sub(1)).mul(buyableEffect(this.layer, 41).multiplier).times(player.milestone_m.best.gte(21)?tmp.milestone_m.milestone21Effect:1).times(hasUpgrade("gd_u",53)?upgradeEffect("gd_u",53):1) : new Decimal(0)
                }
            },
            style: { width: "600px", height: "120px" }
        },
        41: {
            title: "第四环",
            display() {
                const effect = this.effect()
                if (getBuyableAmount(this.layer, this.id).gt(0))
                    return `使第三环的倍率增长速度翻倍。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
                return `随时间增强第三环。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
            },
            cost(x) { return new Decimal(2).pow(new Decimal(4).pow(1.5)).pow(Decimal.add(x || getBuyableAmount(this.layer, this.id), 1)) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if(player.gd_d.best.lt(9))player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, new Decimal(1).add(getBuyableAmount(this.layer, this.id)))
            },
            effect() {
                return {
                    multiplier: player.gd_t.rings[2].add(1),
                    rate: getBuyableAmount(this.layer, this.id).gt(0) ? new Decimal(2).pow(getBuyableAmount(this.layer, this.id).sub(1)).mul(buyableEffect(this.layer, 51).multiplier).times(player.milestone_m.best.gte(21)?tmp.milestone_m.milestone21Effect:1).times(hasUpgrade("gd_u",53)?upgradeEffect("gd_u",53):1) : new Decimal(0)
                }
            },
            style: { width: "600px", height: "120px" }
        },
        51: {
            title: "第五环",
            display() {
                const effect = this.effect()
                if (getBuyableAmount(this.layer, this.id).gt(0))
                    return `使第四环的倍率增长速度翻倍。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
                return `随时间增强第四环。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
            },
            cost(x) { return new Decimal(2).pow(new Decimal(5).pow(1.5)).pow(Decimal.add(x || getBuyableAmount(this.layer, this.id), 1)) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if(player.gd_d.best.lt(9))player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, new Decimal(1).add(getBuyableAmount(this.layer, this.id)))
            },
            effect() {
                return {
                    multiplier: player.gd_t.rings[3].add(1),
                    rate: getBuyableAmount(this.layer, this.id).gt(0) ? new Decimal(2).pow(getBuyableAmount(this.layer, this.id).sub(1)).mul(buyableEffect(this.layer, 61).multiplier).times(player.milestone_m.best.gte(21)?tmp.milestone_m.milestone21Effect:1).times(hasUpgrade("gd_u",53)?upgradeEffect("gd_u",53):1) : new Decimal(0)
                }
            },
            style: { width: "600px", height: "120px" }
        },
        61: {
            title: "第六环",
            display() {
                const effect = this.effect()
                if (getBuyableAmount(this.layer, this.id).gt(0))
                    return `使第五环的倍率增长速度翻倍。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
                return `随时间增强第五环。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
            },
            cost(x) { return new Decimal(2).pow(new Decimal(6).pow(1.5)).pow(Decimal.add(x || getBuyableAmount(this.layer, this.id), 1)) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if(player.gd_d.best.lt(9))player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, new Decimal(1).add(getBuyableAmount(this.layer, this.id)))
            },
            effect() {
                return {
                    multiplier: player.gd_t.rings[4].add(1),
                    rate: getBuyableAmount(this.layer, this.id).gt(0) ? new Decimal(2).pow(getBuyableAmount(this.layer, this.id).sub(1)).mul(buyableEffect(this.layer, 71).multiplier).times(player.milestone_m.best.gte(21)?tmp.milestone_m.milestone21Effect:1).times(hasUpgrade("gd_u",53)?upgradeEffect("gd_u",53):1) : new Decimal(0)
                }
            },
            style: { width: "600px", height: "120px" }
        },
        71: {
            title: "第七环",
            display() {
                const effect = this.effect()
                if (getBuyableAmount(this.layer, this.id).gt(0))
                    return `使第六环的倍率增长速度翻倍。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
                return `随时间增强第六环。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
            },
            cost(x) { return new Decimal(2).pow(new Decimal(7).pow(1.5)).pow(Decimal.add(x || getBuyableAmount(this.layer, this.id), 1)) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if(player.gd_d.best.lt(9))player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, new Decimal(1).add(getBuyableAmount(this.layer, this.id)))
            },
            effect() {
                return {
                    multiplier: player.gd_t.rings[5].add(1),
                    rate: getBuyableAmount(this.layer, this.id).gt(0) ? new Decimal(2).pow(getBuyableAmount(this.layer, this.id).sub(1)).mul(buyableEffect(this.layer, 81).multiplier).times(player.milestone_m.best.gte(21)?tmp.milestone_m.milestone21Effect:1).times(hasUpgrade("gd_u",53)?upgradeEffect("gd_u",53):1) : new Decimal(0)
                }
            },
            style: { width: "600px", height: "120px" }
        },
        81: {
            title: "第八环",
            display() {
                const effect = this.effect()
                if (getBuyableAmount(this.layer, this.id).gt(0))
                    return `使第七环的倍率增长速度翻倍。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
                return `随时间增强第七环。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
            },
            cost(x) { return new Decimal(2).pow(new Decimal(8).pow(1.5)).pow(Decimal.add(x || getBuyableAmount(this.layer, this.id), 1)) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if(player.gd_d.best.lt(9))player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, new Decimal(1).add(getBuyableAmount(this.layer, this.id)))
            },
            effect() {
                return {
                    multiplier: player.gd_t.rings[6].add(1),
                    rate: getBuyableAmount(this.layer, this.id).gt(0) ? new Decimal(2).pow(getBuyableAmount(this.layer, this.id).sub(1)).mul(buyableEffect(this.layer, 91).multiplier).times(player.milestone_m.best.gte(21)?tmp.milestone_m.milestone21Effect:1).times(hasUpgrade("gd_u",53)?upgradeEffect("gd_u",53):1) : new Decimal(0)
                }
            },
            style: { width: "600px", height: "120px" }
        },
        91: {
            title: "第九环",
            display() {
                const effect = this.effect()
                if (getBuyableAmount(this.layer, this.id).gt(0))
                    return `使第八环的倍率增长速度翻倍。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
                return `随时间增强第八环。<br/>当前: ${format(effect.multiplier)}倍 (+${format(effect.rate)}/秒)<br/>需要${formatWhole(this.cost())}时间通量`
            },
            cost(x) { return new Decimal(2).pow(new Decimal(9).pow(1.5)).pow(Decimal.add(x || getBuyableAmount(this.layer, this.id), 1)) },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if(player.gd_d.best.lt(9))player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, new Decimal(1).add(getBuyableAmount(this.layer, this.id)))
            },
            effect() {
                return {
                    multiplier: player.gd_t.rings[7].add(1),
                    rate: getBuyableAmount(this.layer, this.id).gt(0) ? new Decimal(2).pow(getBuyableAmount(this.layer, this.id).sub(1)).times(player.milestone_m.best.gte(21)?tmp.milestone_m.milestone21Effect:1).times(hasUpgrade("gd_u",53)?upgradeEffect("gd_u",53):1) : new Decimal(0)
                }
            },
            style: { width: "600px", height: "120px" },
            unlocked() { return hasChallenge("gd_d", 21) }
        }
    },
    passiveGeneration(){
        let ret=0
        if(player.gd_d.best.gte(9))ret=ret+1
        return ret
    },
})

addLayer("gd_l", {
    name: "讲座层",
    symbol: "L",
    color: "#09DE89",
    branches: [ 'gd_s', 'gd_f' ],
    row: 3,
    position: 4,
    resource: "讲座",
    baseResource: "声望",
    resetDescription: "教学获得",
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        gabenExp: new Decimal(0),
        gabenLevel: new Decimal(0),
        lExp: new Decimal(0),
        lLevel: new Decimal(0),
        carmackExp: new Decimal(0),
        carmackLevel: new Decimal(0),
        thompsonExp: new Decimal(0),
        thompsonLevel: new Decimal(0),
        meierExp: new Decimal(0),
        meierLevel: new Decimal(0)
    }},
    layerShown(){return player.tm.currentTree==6 && hasUpgrade("gd_f",25)},
    type: "normal",
    requires() {
        ret = new Decimal(110)
        if(hasUpgrade("gd_c", 24))ret = ret.sub(10)
        if(player.gd_d.best.gte(9))ret = ret.sub(20)
        if(hasUpgrade("gd_g", 22))ret = ret.sub(30)
        return ret
    },
    baseAmount() { return player.gd_f.points },
    exponent() {
        let ret=new Decimal(10)
        if(hasUpgrade("gd_f", 35))ret = ret.add(10)
        if(hasUpgrade("gd_c", 35))ret = ret.add(5)
        return ret
    },
    gainMult() {
        mult = new Decimal(2)
        if(hasUpgrade("gd_c", 24))mult = mult.mul(20)
        if(hasUpgrade("gd_f", 35))mult = mult.mul(2.5)
        if(player.milestone_m.best.gte(30))mult = mult.mul(tmp.milestone_m.milestone29Effect)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    effect() {
        if(hasUpgrade("gd_c", 31))return player[this.layer].points
        return player[this.layer].points.sqrt()
    },
    effect2() {
        return Math.floor(Decimal.log10(player[this.layer].points.add(1)).div(Decimal.log10(layers[this.layer].levelBase())))
    },
    levelBase() {
        return 1.7
    },
    effectDescription() {
        if(hasUpgrade(this.layer,23))return `提供${format(this.effect2())}个TA等级`
        return `每秒为你的TA生成${format(this.effect())}经验`
    },
    
    doReset(l){
        if(l=="gd_u" || l=="gd_c" || l=="gd_e" || l=="gd_r" || l=="gd_s" || l=="gd_f" || l=="gd_a" || l=="gd_t" || l=="gd_d" || l=="gd_l" || l=="gd_g" || !l.startsWith("gd_")){return}
        var b=new Decimal(player[this.layer].best)
        layerDataReset(this.layer,["upgrades","milestones","challenges"])
        player[this.layer].best=b
        return
    },
    
    update(diff) {
        const effect = this.effect().mul(diff)
        if(!hasUpgrade(this.layer,23)){
            if (hasUpgrade(this.layer, 11)) player[this.layer].gabenExp = player[this.layer].gabenExp.add(effect)
            if (player[this.layer].gabenExp.gte(this.bars.gaben.cost())) {
                player[this.layer].gabenLevel = player[this.layer].gabenLevel.add(1)
                player[this.layer].gabenExp = new Decimal(0)
            }
            if (hasUpgrade(this.layer, 12)) player[this.layer].lExp = player[this.layer].lExp.add(effect)
            if (player[this.layer].lExp.gte(this.bars.l.cost())) {
                player[this.layer].lLevel = player[this.layer].lLevel.add(1)
                player[this.layer].lExp = new Decimal(0)
            }
            if (hasUpgrade(this.layer, 13)) player[this.layer].carmackExp = player[this.layer].carmackExp.add(effect)
            if (player[this.layer].carmackExp.gte(this.bars.carmack.cost())) {
                player[this.layer].carmackLevel = player[this.layer].carmackLevel.add(1)
                player[this.layer].carmackExp = new Decimal(0)
            }
            if (hasUpgrade(this.layer, 14)) player[this.layer].thompsonExp = player[this.layer].thompsonExp.add(effect)
            if (player[this.layer].thompsonExp.gte(this.bars.thompson.cost())) {
                player[this.layer].thompsonLevel = player[this.layer].thompsonLevel.add(1)
                player[this.layer].thompsonExp = new Decimal(0)
            }
            if (hasUpgrade(this.layer, 15)) player[this.layer].meierExp = player[this.layer].meierExp.add(effect)
            if (player[this.layer].meierExp.gte(this.bars.meier.cost())) {
                player[this.layer].meierLevel = player[this.layer].meierLevel.add(1)
                player[this.layer].meierExp = new Decimal(0)
            }
        }else{
            player[this.layer].gabenLevel = player[this.layer].gabenLevel.max(layers[this.layer].effect2())
            player[this.layer].gabenExp = new Decimal(player[this.layer].points)
            player[this.layer].lLevel = player[this.layer].lLevel.max(layers[this.layer].effect2())
            player[this.layer].lExp = new Decimal(player[this.layer].points)
            player[this.layer].carmackLevel = player[this.layer].carmackLevel.max(layers[this.layer].effect2())
            player[this.layer].carmackExp = new Decimal(player[this.layer].points)
            player[this.layer].thompsonLevel = player[this.layer].thompsonLevel.max(layers[this.layer].effect2())
            player[this.layer].thompsonExp = new Decimal(player[this.layer].points)
            player[this.layer].meierLevel = player[this.layer].meierLevel.max(layers[this.layer].effect2())
            player[this.layer].meierExp = new Decimal(player[this.layer].points)
        }
    },
    roundUpCost: true,
    tabFormat: {
        Main:{content:[
            ["infobox", "lore"],
            ["display-text", () => inChallenge("gd_d", 21) ? `<h2 style="color: red;">在${layers.gd_d.challenges[player.gd_d.activeChallenge].name}学位计划期间禁用</h2>` : ""],
            "main-display",
            "prestige-button", "resource-display",
            "blank",
            ["display-text", "<h2>加布·纽维尔</h2>"],
            ["row", [["upgrade", 11], "blank", ["bar", "gaben"]]],
            "blank",
            ["display-text", () => hasUpgrade("gd_l", 11) ? "<h2>L</h2>" : ""],
            ["row", [["upgrade", 12], "blank", ["bar", "l"]]],
            "blank",
            ["display-text", () => hasUpgrade("gd_l", 12) ? "<h2>约翰·卡马克</h2>" : ""],
            ["row", [["upgrade", 13], "blank", ["bar", "carmack"]]],
            "blank",
            ["display-text", () => hasUpgrade("gd_l", 13) ? "<h2>珍·汤普森</h2>" : ""],
            ["row", [["upgrade", 14], "blank", ["bar", "thompson"]]],
            "blank",
            ["display-text", () => challengeCompletions("gd_d", 22) > 0 ? "<h2>西德尼·梅尔</h2>" : ""],
            ["row", [["upgrade", 15], "blank", ["bar", "meier"]]],
            "blank"
        ]},Upgrades:{content:["main-display",
            "prestige-button", "resource-display","upgrades"]}},
    bars: {
        gaben: {
            fillStyle: {'background-color' : "#1b2838"},
            baseStyle: {'background-color' : "#171a21"},
            textStyle: {'color': '#04e050'},
            borderStyle() {return {}},
            direction: RIGHT,
            width: 400,
            height: 140,
            progress() {
                return (player[this.layer].gabenExp.div(this.cost())).toNumber()
            },
            display() {
                return `当前TA等级: ${formatWhole(player[this.layer].gabenLevel)}<br/><br/>${format(player[this.layer].gabenExp)} / ${formatWhole(this.cost())} 到下一级`
            },
            cost() { return new Decimal(hasUpgrade("gd_l",23)?layers[this.layer].levelBase():hasUpgrade("gd_c",32)?2:4).pow(player[this.layer].gabenLevel).mul(hasUpgrade("gd_l",23)?layers[this.layer].levelBase():hasUpgrade("gd_c",32)?1:1) },
            unlocked: true
        },
        l: {
            fillStyle: {'background-color' : "#2B5293"},
            baseStyle: {'background-color' : "#2b772b"},
            textStyle: {'color': '#04e050'},
            borderStyle() {return {}},
            direction: RIGHT,
            width: 400,
            height: 140,
            progress() {
                return (player[this.layer].lExp.div(this.cost())).toNumber()
            },
            display() {
                return `当前TA等级: ${formatWhole(player[this.layer].lLevel)}<br/><br/>${format(player[this.layer].lExp)} / ${formatWhole(this.cost())} 到下一级`
            },
            cost() { return new Decimal(hasUpgrade("gd_l",23)?layers[this.layer].levelBase():hasUpgrade("gd_c",32)?2:4).pow(player[this.layer].lLevel).mul(hasUpgrade("gd_l",23)?layers[this.layer].levelBase():hasUpgrade("gd_c",32)?1:10) },
            unlocked() { return hasUpgrade("gd_l", 11) }
        },
        carmack: {
            fillStyle: {'background-color' : "#cb5e29"},
            baseStyle: {'background-color' : "#692f17"},
            textStyle: {'color': '#04e050'},
            borderStyle() {return {}},
            direction: RIGHT,
            width: 400,
            height: 140,
            progress() {
                return (player[this.layer].carmackExp.div(this.cost())).toNumber()
            },
            display() {
                return `当前TA等级: ${formatWhole(player[this.layer].carmackLevel)}<br/><br/>${format(player[this.layer].carmackExp)} / ${formatWhole(this.cost())} 到下一级`
            },
            cost() { return new Decimal(hasUpgrade("gd_l",23)?layers[this.layer].levelBase():hasUpgrade("gd_c",32)?2:6).pow(player[this.layer].carmackLevel).mul(hasUpgrade("gd_l",23)?layers[this.layer].levelBase():hasUpgrade("gd_c",32)?1:10000) },
            unlocked() { return hasUpgrade("gd_l", 12) }
        },
        thompson: {
            fillStyle: {'background-color' : "#ffffff"},
            baseStyle: {'background-color' : "#000000"},
            textStyle: {'color': '#04e050'},
            borderStyle() {return {}},
            direction: RIGHT,
            width: 400,
            height: 140,
            progress() {
                return (player[this.layer].thompsonExp.div(this.cost())).toNumber()
            },
            display() {
                return `当前TA等级: ${formatWhole(player[this.layer].thompsonLevel)}<br/><br/>${format(player[this.layer].thompsonExp)} / ${formatWhole(this.cost())} 到下一级`
            },
            cost() { return new Decimal(hasUpgrade("gd_l",23)?layers[this.layer].levelBase():hasUpgrade("gd_c",32)?2:12).pow(player[this.layer].thompsonLevel).mul(hasUpgrade("gd_l",23)?layers[this.layer].levelBase():hasUpgrade("gd_c",32)?1:50000) },
            unlocked() { return hasUpgrade("gd_l", 14) }
        },
        meier: {
            fillStyle: {'background-color' : "#947728"},
            baseStyle: {'background-color' : "#04467a"},
            textStyle: {'color': '#04e050'},
            borderStyle() {return {}},
            direction: RIGHT,
            width: 400,
            height: 140,
            progress() {
                return (player[this.layer].meierExp.div(this.cost())).toNumber()
            },
            display() {
                return `当前TA等级: ${formatWhole(player[this.layer].meierLevel)}<br/><br/>${format(player[this.layer].meierExp)} / ${formatWhole(this.cost())} 到下一级`
            },
            cost() { return new Decimal(hasUpgrade("gd_l",23)?layers[this.layer].levelBase():hasUpgrade("gd_f",31)?2:12).pow(player[this.layer].meierLevel).mul(hasUpgrade("gd_l",23)?layers[this.layer].levelBase():hasUpgrade("gd_f",31)?1:50000) },
            unlocked() { return challengeCompletions("gd_d", 22) > 0 }
        }
    },
    upgrades: {
        rows: 2,
        cols: 5,
        11: {
            title: "雇佣加布",
            cost: new Decimal(1),
            description() { return "<br/>加布会根据等级提升现金获取<br/>" },
            effect() { return inChallenge("gd_d", 21) ? new Decimal(1) : new Decimal(hasUpgrade("gd_c",33)?20:2).pow(player[this.layer].gabenLevel) },
            effectDisplay() { return `${format(this.effect())}倍现金获取` }
        },
        12: {
            title: "雇佣L",
            cost: new Decimal(10),
            description() { return "<br/>L会根据等级降低声望需求<br/>" },
            effect() { return inChallenge("gd_d", 21) ? new Decimal(1) : new Decimal(hasUpgrade("gd_c",33)?20:2).pow(player[this.layer].lLevel) },
            effectDisplay() { return `声望需求/${format(this.effect())}` },
            unlocked() { return hasUpgrade("gd_l", 11) }
        },
        13: {
            title: "雇佣约翰",
            cost: new Decimal(2000),
            description() { if(hasUpgrade("gd_u", 43))return "<br/>约翰会根据等级提升更新获取<br/>"; return "<br/>约翰会根据等级降低更新需求<br/>" },
            effect() { if(hasUpgrade("gd_u", 43))return upgradeEffect("gd_u", 43);return inChallenge("gd_d", 21) ? new Decimal(1) : new Decimal(hasUpgrade("gd_c",33)?20:10).pow(player[this.layer].carmackLevel) },
            effectDisplay() { if(hasUpgrade("gd_u", 43))return `${format(this.effect())}倍更新获取`; return `更新需求/${format(this.effect())}` },
            unlocked() { return hasUpgrade("gd_l", 12) }
        },
        14: {
            title: "雇佣珍",
            cost: new Decimal(60000),
            description() { return "<br/>珍会根据等级降低入学需求<br/>" },
            effect() { return inChallenge("gd_d", 21) ? new Decimal(1) : new Decimal(hasUpgrade("gd_c",33)?20:10).pow(player[this.layer].thompsonLevel) },
            effectDisplay() { return `入学需求/${format(this.effect())}` },
            unlocked() { return hasUpgrade("gd_l", 13) }
        },
        15: {
            title: "雇佣西德尼",
            cost: new Decimal(1200000),
            description() { return "<br/>西德尼会根据等级降低善意值需求<br/>" },
            effect() { return inChallenge("gd_d", 21) ? new Decimal(1) : new Decimal(1.05).pow(player[this.layer].meierLevel) },
            effectDisplay() { return `善意值需求/${format(this.effect())}` },
            unlocked() { return challengeCompletions("gd_d", 22) > 0 }
        },
        
        21: {
            title: "讲座升级21",
            cost: new Decimal(1e35),
            description() { return "加布也会提升经验获取" },
            unlocked() { return hasUpgrade("gd_g",25) }
        },
        22: {
            title: "讲座升级22",
            cost: new Decimal(1e36),
            description() { return "L也会降低重构需求" },
            unlocked() { return hasUpgrade("gd_g",25) }
        },
        23: {
            title: "讲座升级23",
            cost: new Decimal(1e37),
            description() { return "TA等级将基于讲座计算，而非经验" },
            unlocked() { return hasUpgrade("gd_g",25) }
        },
        24: {
            title: "讲座升级24",
            cost: new Decimal(3e37),
            description() { return "西德尼也会降低API需求" },
            unlocked() { return hasUpgrade("gd_g",25) }
        },
        25: {
            title: "讲座升级25",
            cost: new Decimal(1e38),
            description() { return "更新升级21效果更好" },
            unlocked() { return hasUpgrade("gd_g",25) }
        },
    },
    passiveGeneration(){
        let ret=0
        if(player.gd_d.best.gte(9))ret=ret+1
        return ret
    },
})
