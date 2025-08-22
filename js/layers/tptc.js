
addLayer("tptc_p", {
    name: "声望", 
    symbol: "P", 
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#00bfbf",
    requires(){
        if(hasUpgrade("tptc_p",34))return new Decimal(1);
        return new Decimal(10);
    },
    resource: "声望点数", 
    baseResource: "点数", 
    baseAmount() {return player.points}, 
    type: "normal", 
    exponent: 0.5, 
    gainMult() { 
        mult = new Decimal(1)
        mult = mult.mul(tmp.tptc_s.buyables[12].effect);
        mult = mult.mul(tmp.tptc_e.buyables[11].effect[1]);
        if(hasUpgrade("tptc_sp",11))mult = mult.mul(upgradeEffect("tptc_sp",11));
        if(hasUpgrade("tptc_sp",23))mult = mult.mul(upgradeEffect("tptc_sp",23));
        if(inChallenge("tptc_h",12))mult = new Decimal(0);
        if(inChallenge("tptr_h",12))mult = new Decimal(0);
        if(hasUpgrade("incrementy_q",14))mult = mult.mul(upgradeEffect("incrementy_q",14));
        mult = mult.mul(tmp.tptr_p.effect);
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 0, 
    layerShown(){return player.tm.currentTree==1},
        upgrades: {
            rows: 5,
            cols: 5,
            11: {
                title: "声望升级11",
                description(){
                    if(hasUpgrade("tptc_p",13))return "点数生成基于此树的等级提升";
                    return "点数生成翻倍";
                },
                cost: new Decimal(1),
                unlocked() { return true; },
                effect() { 
                    let ret=Decimal.pow(2,player.tm.buyables[1].pow(1.5));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            12: {
                title: "声望升级12",
                description: "点数生成基于你的声望点数数量加速",
                cost: new Decimal(1),
                unlocked() { return true; },
                effect() { 
                    let base=3;
                    let ret = Decimal.pow(base,Decimal.log10(player.tptc_p.points.mul(2).add(3)).pow(hasUpgrade("tptc_sp",33)?0.91:0.9));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            13: {
                title: "声望升级13",
                description: "解锁树管理器",
                cost: new Decimal(2),
                unlocked() { return true; },
            },
            14: {
                title: "声望升级14",
                description: "第二行声望升级的基础效果^1.25",
                cost: new Decimal("1e80000"),
                unlocked() { return player.tm.buyables[1].gte(14); },
            },
            15: {
                title: "声望升级15",
                description: "基于购买的多树升级提升第二行声望升级的基础效果",
                cost: new Decimal("e1e6"),
                unlocked() { return hasUpgrade("tm",15); },
                effect() { 
                    if(hasUpgrade("tptc_p",31))return (1+(player.tm.upgrades.length||0)*0.05)**2;
                    return 1+(player.tm.upgrades.length||0)*0.05;
                },
                effectDisplay() { return "^"+format(this.effect()) },
            },
            21: {
                title: "声望升级21",
                description(){
                    return "星尘树中的星尘获取基于你的声望点数提升";
                },
                cost: new Decimal("1e2400"),
                unlocked() { return hasUpgrade("stardust_s",23); },
                effect() { 
                    let base=1.03;
                    let ret = Decimal.pow(base,Decimal.log10(player.tptc_p.points.add(1)).pow(0.5));
                    if(hasUpgrade("tptc_p",14))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_p",15))ret=ret.pow(upgradeEffect("tptc_p",15));
                    if(hasUpgrade("tptc_p",33))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_sp",14))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_sp",15))ret=ret.pow(1.25);
                    if(player.tptc_i.buyables[11].gte(3))ret = ret.mul(tmp.tptc_s.buyables[15].effect);
                    if(player.tptc_mb.buyables[11].gte(3))ret = ret.mul(tmp.tptc_m.clickables[14].effect);
                    if(player.tptc_mb.buyables[12].gte(3))ret = ret.mul(tmp.tptc_l.buyables[17].effect);
                    if(player.tptc_mb.buyables[13].gte(4))ret=ret.mul(buyableEffect("tptc_ma",14));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            22: {
                title: "声望升级22",
                description(){
                    return "声望森林中的粒子获取基于你的声望点数提升";
                },
                cost: new Decimal("1e7200"),
                unlocked() { return hasUpgrade("forest_p",23); },
                effect() { 
                    let base=1.03;
                    let ret = Decimal.pow(base,Decimal.log10(player.tptc_p.points.add(1)).pow(0.5));
                    if(hasUpgrade("tptc_p",14))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_p",15))ret=ret.pow(upgradeEffect("tptc_p",15));
                    if(hasUpgrade("tptc_p",33))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_sp",14))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_sp",15))ret=ret.pow(1.25);
                    if(player.tptc_i.buyables[11].gte(3))ret = ret.mul(tmp.tptc_s.buyables[15].effect);
                    if(player.tptc_mb.buyables[11].gte(3))ret = ret.mul(tmp.tptc_m.clickables[14].effect);
                    if(player.tptc_mb.buyables[12].gte(3))ret = ret.mul(tmp.tptc_l.buyables[17].effect);
                    if(player.tptc_mb.buyables[13].gte(4))ret=ret.mul(buyableEffect("tptc_ma",14));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            23: {
                title: "声望升级23",
                description(){
                    return "燃烧树中的灰烬获取基于你的声望点数提升";
                },
                cost: new Decimal("1e12000"),
                unlocked() { return hasUpgrade("burning_a",24); },
                effect() { 
                    let base=1.03;
                    let ret = Decimal.pow(base,Decimal.log10(player.tptc_p.points.add(1)).pow(0.5));
                    if(hasUpgrade("tptc_p",14))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_p",15))ret=ret.pow(upgradeEffect("tptc_p",15));
                    if(hasUpgrade("tptc_p",33))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_sp",14))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_sp",15))ret=ret.pow(1.25);
                    if(player.tptc_i.buyables[11].gte(3))ret = ret.mul(tmp.tptc_s.buyables[15].effect);
                    if(player.tptc_mb.buyables[11].gte(3))ret = ret.mul(tmp.tptc_m.clickables[14].effect);
                    if(player.tptc_mb.buyables[12].gte(3))ret = ret.mul(tmp.tptc_l.buyables[17].effect);
                    if(player.tptc_mb.buyables[13].gte(4))ret=ret.mul(buyableEffect("tptc_ma",14));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            24: {
                title: "声望升级24",
                description(){
                    return "增量树宇宙中的基础增量获取基于你的声望点数提升";
                },
                cost: new Decimal("1e24000"),
                unlocked() { return hasUpgrade("incrementy_a",14); },
                effect() { 
                    let base=1.03;
                    let ret = Decimal.pow(base,Decimal.log10(player.tptc_p.points.add(1)).pow(0.5));
                    if(hasUpgrade("tptc_p",14))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_p",15))ret=ret.pow(upgradeEffect("tptc_p",15));
                    if(hasUpgrade("tptc_p",33))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_sp",14))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_sp",15))ret=ret.pow(1.25);
                    if(player.tptc_i.buyables[11].gte(3))ret = ret.mul(tmp.tptc_s.buyables[15].effect);
                    if(player.tptc_mb.buyables[11].gte(3))ret = ret.mul(tmp.tptc_m.clickables[14].effect);
                    if(player.tptc_mb.buyables[12].gte(3))ret = ret.mul(tmp.tptc_l.buyables[17].effect);
                    if(player.tptc_mb.buyables[13].gte(4))ret=ret.mul(buyableEffect("tptc_ma",14));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            25: {
                title: "声望升级25",
                description(){
                    return "游戏开发树中的更新基于你的声望点数变得更便宜";
                },
                cost: new Decimal("1e50000"),
                unlocked() { return hasUpgrade("gd_u",32); },
                effect() { 
                    let base=1.03;
                    let ret = Decimal.pow(base,Decimal.log10(player.tptc_p.points.add(1)).pow(0.5));
                    if(hasUpgrade("tptc_p",14))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_p",15))ret=ret.pow(upgradeEffect("tptc_p",15));
                    if(hasUpgrade("tptc_p",33))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_sp",14))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_sp",15))ret=ret.pow(1.25);
                    if(player.tptc_i.buyables[11].gte(3))ret = ret.mul(tmp.tptc_s.buyables[15].effect);
                    if(player.tptc_mb.buyables[11].gte(3))ret = ret.mul(tmp.tptc_m.clickables[14].effect);
                    if(player.tptc_mb.buyables[12].gte(3))ret = ret.mul(tmp.tptc_l.buyables[17].effect);
                    if(player.tptc_mb.buyables[13].gte(4))ret=ret.mul(buyableEffect("tptc_ma",14));
                    return ret;
                },
                effectDisplay() { return "/"+format(this.effect()) },
            },
            31: {
                title: "声望升级31",
                description: "声望升级15的效果^2",
                cost: new Decimal(1),
                unlocked() { return hasUpgrade("tm",23); },
            },
            32: {
                title: "声望升级32",
                description: "TPTR中的声望点数基于你的声望点数提升",
                cost: new Decimal("e1817e4"),
                unlocked() { return hasUpgrade("tm",23); },
                effect() { 
                    let base=((hasUpgrade("tptc_p",41))?1.03:1.005);
                    let ret = Decimal.pow(base,Decimal.log10(player.tptc_p.points.add(1)).pow(0.5));
                    if(hasUpgrade("tptc_p",14)&&hasUpgrade("tptc_p",41))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_p",15)&&hasUpgrade("tptc_p",41))ret=ret.pow(upgradeEffect("tptc_p",15));
                    if(hasUpgrade("tptc_p",33)&&hasUpgrade("tptc_p",41))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_sp",34))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_sp",35))ret=ret.pow(1.25);
                    if(hasUpgrade("tptc_p",42)&&player.tptc_i.buyables[11].gte(3))ret = ret.mul(tmp.tptc_s.buyables[15].effect);
                    if(hasUpgrade("tptc_m",12))ret = ret.mul(tmp.tptc_m.clickables[15].effect);
                    if(hasUpgrade("tptc_p",43)&&player.tptc_mb.buyables[12].gte(3))ret = ret.mul(tmp.tptc_l.buyables[17].effect);
                    if(hasUpgrade("tptc_p",42)&&player.tptc_mb.buyables[13].gte(4))ret=ret.mul(buyableEffect("tptc_ma",14));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            33: {
                title: "声望升级33",
                description: "第二行声望升级的基础效果^1.25",
                cost: new Decimal(1),
                unlocked() { return hasUpgrade("tm",33); },
            },
            34: {
                title: "声望升级34",
                description: "将TPTC和TPTR中声望、助推器和生成器的基础需求降低至1",
                cost: new Decimal("e45e6"),
                unlocked() { return hasUpgrade("tm",33); },
            },
            35: {
                title: "声望升级35",
                description: "TPTC和TPTR中的超级助推器变得更便宜",
                cost: new Decimal("e5e7"),
                unlocked() { return hasUpgrade("tm",33); },
            },
            41: {
                title: "声望升级41",
                description: "声望升级32效果更好且能提升声望升级32的第二行声望升级",
                cost: new Decimal(1),
                unlocked() { return hasUpgrade("tm",41); },
            },
            42: {
                title: "声望升级42",
                description: "多树B法术效果更好。空间建筑5和机器4提升声望升级32",
                cost: new Decimal("e64e7"),
                unlocked() { return hasUpgrade("tm",41); },
            },
            43: {
                title: "声望升级43",
                description: "生命助推器7提升声望升级32",
                cost: new Decimal("e735e6"),
                unlocked() { return hasUpgrade("tm",41); },
            },
            44: {
                title: "声望升级44",
                description: "超级生成器能量效果更好",
                cost: new Decimal("e876543210"),
                unlocked() { return hasUpgrade("tm",41); },
            },
            45: {
                title: "声望升级45",
                description: "TPTC和TPTR中的超级助推器变得更便宜",
                cost: new Decimal("e1e9"),
                unlocked() { return hasUpgrade("tm",41); },
            },
            51: {
                title: "声望升级51",
                description: "动力树中的硬币获取基于你的声望点数提升",
                cost: new Decimal("ee12"),
                unlocked() { return hasUpgrade("dynas_c",34); },
                effect() { 
                    let base=1.03;
                    let ret = Decimal.pow(base,Decimal.log10(player.tptc_p.points.add(1)).pow(hasUpgrade("tptc_p",55)?0.3:hasUpgrade("tptc_p",54)?0.275:hasUpgrade("tptc_p",53)?0.25:hasUpgrade("tptc_p",52)?0.2:0.15));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            52: {
                title: "声望升级52",
                description: "上一个升级效果更好",
                cost: new Decimal("e27e11"),
                unlocked() { return hasUpgrade("dynas_c",34); },
            },
            53: {
                title: "声望升级53",
                description: "上一个升级效果更好",
                cost: new Decimal("e45e11"),
                unlocked() { return hasUpgrade("dynas_c",34); },
            },
            54: {
                title: "声望升级54",
                description: "上一个升级效果更好",
                cost: new Decimal("e14e12"),
                unlocked() { return hasUpgrade("dynas_c",34); },
            },
            55: {
                title: "声望升级55",
                description: "上一个升级效果更好",
                cost: new Decimal("e22e12"),
                unlocked() { return hasUpgrade("dynas_c",34); },
            },
        },  
        
        doReset(l){
            if(l=="tptc_p" || !l.startsWith("tptc_")){return;}
            layerDataReset("tptc_p",["upgrades","milestones","challenges"]);
            return;
        },
     passiveGeneration(){
         if(player.tptc_g.best.gte(3))return 1;
         return 0;
     },
     hotkeys: [
           {key: "p", description: "P: 声望重置",
            onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==1}}
     ],
});


addLayer("tptc_b", {
    name: "助推器",
    symbol: "B",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#415a9e",
    requires(){
        if(hasUpgrade("tptc_p",34))return new Decimal(1);
        return new Decimal(500);
    },
    resource: "助推器",
    baseResource: "点数", 
    baseAmount() {return player.points},
    type: "static",
    base: 10,
    exponent: 1.5,
    gainMult() { 
        mult = new Decimal(1)
        if(hasUpgrade("stardust_so",12))mult = mult.div(upgradeEffect("stardust_so",12));
        if(hasUpgrade("stardust_s",42))mult = mult.div(upgradeEffect("stardust_n",12));
        if(player.tptc_i.buyables[11].gte(2))mult = mult.div(buyableEffect("tptc_s",14));
        if(hasUpgrade("tptc_g",12))mult = mult.div(upgradeEffect("tptc_g",12));
        if(hasUpgrade("forest_p",51))mult = mult.div(upgradeEffect("forest_p",51));
        if(hasUpgrade("forest_p",54))mult = mult.div(upgradeEffect("forest_p",54));
        return mult
    },
    row: 1,
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(2)},
    branches: ["tptc_p"],
    effect() {
        if(inChallenge("tptc_h",21)||inChallenge("tptr_h",41))return new Decimal(1);
        let ret = player.tptc_b.points;
        let base = new Decimal(2);
        if(hasUpgrade("tptc_e",12))base = base.mul(tmp.tptc_e.buyables[11].effect[0]);else base = base.add(tmp.tptc_e.buyables[11].effect[0]);
        base = base.mul(tmp.tptc_sb.effect);
        if(hasUpgrade("tptc_b",11))base = base.mul(upgradeEffect("tptc_b",11));
        base = base.mul(tmp.tptr_b.effect[1]);
        ret = Decimal.pow(base,ret);
        return ret;
    },
    effectDescription() { 
           let eff = this.effect();
           return "将点数获取乘" + format(eff) + "倍"
       },
    doReset(l){
            if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_b.best);
            layerDataReset("tptc_b",["upgrades","milestones","challenges"]);
            player.tptc_b.best=b;
        },
        canBuyMax() {return player.tptc_t.best.gte(2)},
    autoPrestige(){
         return player.tptc_h.best.gte(1);
     },resetsNothing(){
         return player.tptc_h.best.gte(1);
     },
     hotkeys: [
           {key: "b", description: "B: 助推器重置",
            onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==1}}
     ],
     upgrades: {
            rows: 2,
            cols: 5,
            11: {
                title: "助推器升级11",
                description: "基于你的生成器数量乘算助推器基础",
                cost: new Decimal(5625),
                unlocked() { return hasUpgrade("tm",11); },
                effect() { 
                    let ret=Decimal.pow(player.tptc_g.points.add(2),0.5);
                    if(hasUpgrade("tptc_b",14))ret = player.tptc_g.points.add(1);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            12: {
                title: "助推器升级12",
                description: "基于你的助推器数量使生成器变得更便宜",
                cost: new Decimal(7600),
                unlocked() { return hasUpgrade("tm",11); },
                effect() { 
                    let ret=Decimal.pow(10,player.tptc_b.points);
                    if(hasUpgrade("tptc_b",15))ret = ret.pow(65);
                    if(hasUpgrade("tptc_b",21))ret = ret.pow(1000/65);
                    return ret;
                },
                effectDisplay() { return "/"+format(this.effect()) },
            },
            13: {
                title: "助推器升级13",
                description: "TPTR中助推器的第二个效果平方",
                cost: new Decimal(85000),
                unlocked() { return hasUpgrade("tm",22); },
            },
            14: {
                title: "助推器升级14",
                description: "助推器升级11效果更好",
                cost: new Decimal(1250000),
                unlocked() { return hasUpgrade("tm",22); },
            },
            15: {
                title: "助推器升级15",
                description: "助推器升级12效果更好",
                cost: new Decimal(1440000),
                unlocked() { return hasUpgrade("tm",22); },
            },
            21: {
                title: "助推器升级21",
                description: "助推器升级12效果更好",
                cost: new Decimal(22e7),
                unlocked() { return hasUpgrade("tm",22); },
            },
            22: {
                title: "助推器升级22",
                description: "TPTR中助推器的第二个效果更好",
                cost: new Decimal(552e6),
                unlocked() { return hasUpgrade("tm",22); },
            },
            23: {
                title: "助推器升级23",
                description: "TPTR中助推器的第二个效果更好",
                cost: new Decimal(17e8),
                unlocked() { return hasUpgrade("tm",22); },
            },
            24: {
                title: "助推器升级24",
                description: "TPTR中助推器的第二个效果更好",
                cost: new Decimal(22e8),
                unlocked() { return hasUpgrade("tm",22); },
            },
     }
});

addLayer("tptc_g", {
    name: "生成器",
    symbol: "G",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        power: new Decimal(0),
    }},
    color: "#409c6e",
    requires(){
        if(hasUpgrade("tptc_p",34))return new Decimal(1);
        return new Decimal(500);
    },
    resource: "生成器",
    baseResource: "点数", 
    baseAmount() {return player.points},
    type: "static",
    base: 10,
    exponent: 1.5,
    gainMult() { 
        mult = new Decimal(1)
        if(hasUpgrade("stardust_n",12))mult = mult.div(upgradeEffect("stardust_n",12));
        if(hasUpgrade("stardust_s",41))mult = mult.div(upgradeEffect("stardust_so",12));
        if(player.tptc_i.buyables[11].gte(2))mult = mult.div(buyableEffect("tptc_s",14));
        if(hasUpgrade("tptc_b",12))mult = mult.div(upgradeEffect("tptc_b",12));
        if(hasUpgrade("forest_p",52))mult = mult.div(upgradeEffect("forest_p",52));
        if(hasUpgrade("forest_p",55))mult = mult.div(upgradeEffect("forest_p",55));
        return mult
    },
    row: 1,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(2)},
    branches: ["tptc_p"],
    effect() {
        if(inChallenge("tptc_h",21)||inChallenge("tptr_h",41))return new Decimal(0);
        let ret = player.tptc_g.points;
        let base = new Decimal(2);
        base = base.add(tmp.tptc_sg.getSGenPowerEff);
        if(hasUpgrade("tptc_e",12))base = base.mul(tmp.tptc_e.buyables[11].effect[0]);else base = base.add(tmp.tptc_e.buyables[11].effect[0]);
        base = base.mul(tmp.tptr_g.effect[1]);
        if(hasUpgrade("tptc_g",14))base = base.mul(upgradeEffect("tptc_g",14));
        ret = Decimal.pow(base,ret).mul(ret);
        
        let sc=player.tptc_g.points.div(1e7);
        if(player.tptc_g.points.gte(4e6))sc=player.tptc_g.points.sqrt().div(5000);
        if(player.tptc_g.points.gte(7.84e6))sc=player.tptc_g.points.sqrt().div(7).sqrt().mul(0.028).min(1);
        if(ret.gte("e3e7"))ret = ret.div("e3e7").pow(sc).mul("e3e7");
        if(ret.gte("e7e7"))ret = ret.div("e7e7").pow(sc).mul("e7e7");
        
        ret = ret.mul(tmp.tptc_q.quirkEff);
        return ret;
    },
    effectDescription() { 
           let eff = this.effect();
           return "每秒生成"+format(eff)+"生成器能量"
       },
    doReset(l){
            if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_g.best);
            layerDataReset("tptc_g",["upgrades","milestones","challenges"]);
            player.tptc_g.best=b;
        },
        
     update(diff){
         player.tptc_g.power = player.tptc_g.power.add(tmp.tptc_g.effect.times(diff)).max(0)
     },
     
        canBuyMax() {return player.tptc_s.best.gte(2)},
     tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    "blank",
                    ["display-text",
                        function() {
                            return '你有 ' + format(player.tptc_g.power) + ' 生成器能量，将点数获取乘' + format(tmp.tptc_g.getGenPowerEff)+'倍';
                        },
                        {}],
                        "milestones",
                        "upgrades"
                ],
    
    getGenPowerEffExp() {
        let exp = new Decimal(0.4)
        if(hasUpgrade("tptc_g",11))exp = exp.mul(2);
        if(hasChallenge("tptc_h",21))exp = exp.mul(1.0416666666666666666666666);
        if(hasChallenge("tptc_h",22))exp = exp.mul(1.2);
        return exp;
    },
    getGenPowerEff() {
        let power = player.tptc_g.power;
        let eff = power.add(1).pow(tmp.tptc_g.getGenPowerEffExp);
        return eff
    },
    milestones: {
            0: {requirementDescription: "3生成器",
                done() {return player[this.layer].best.gte(3)},
                effectDescription: "每秒获得100%声望点数获取量",
            },
    },
     autoPrestige(){
         return player.tptc_h.best.gte(1);
     },resetsNothing(){
         return player.tptc_h.best.gte(1);
     },
     hotkeys: [
           {key: "g", description: "G: 生成器重置",
            onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==1}}
     ],
     upgrades: {
            rows: 2,
            cols: 5,
            11: {
                title: "生成器升级11",
                description: "生成器能量效果平方",
                cost: new Decimal(6075),
                unlocked() { return hasUpgrade("tm",11); },
            },
            12: {
                title: "生成器升级12",
                description: "基于你的生成器数量使助推器变得更便宜",
                cost: new Decimal(7600),
                unlocked() { return hasUpgrade("tm",11); },
                effect() { 
                    let ret=Decimal.pow(10,player.tptc_g.points);
                    if(hasUpgrade("tptc_g",15))ret = ret.pow(65);
                    if(hasUpgrade("tptc_g",21))ret = ret.pow(1000/65);
                    return ret;
                },
                effectDisplay() { return "/"+format(this.effect()) },
            },
            13: {
                title: "生成器升级13",
                description: "TPTR中生成器的第二个效果平方",
                cost: new Decimal(85000),
                unlocked() { return hasUpgrade("tm",22); },
            },
            14: {
                title: "生成器升级14",
                description: "基于你的助推器数量乘算生成器基础",
                cost: new Decimal(1250000),
                unlocked() { return hasUpgrade("tm",22); },
                effect() { 
                    let ret = player.tptc_b.points.add(1);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            15: {
                title: "生成器升级15",
                description: "生成器升级12效果更好",
                cost: new Decimal(1440000),
                unlocked() { return hasUpgrade("tm",22); },
            },
            21: {
                title: "生成器升级21",
                description: "生成器升级12效果更好",
                cost: new Decimal(22e7),
                unlocked() { return hasUpgrade("tm",22); },
            },
            22: {
                title: "生成器升级22",
                description: "TPTR中生成器的第二个效果更好",
                cost: new Decimal(555555555),
                unlocked() { return hasUpgrade("tm",22); },
            },
            23: {
                title: "生成器升级23",
                description: "TPTR中生成器的第二个效果更好",
                cost: new Decimal(17e8),
                unlocked() { return hasUpgrade("tm",22); },
            },
            24: {
                title: "生成器升级24",
                description: "TPTR中生成器的第二个效果更好",
                cost: new Decimal(22e8),
                unlocked() { return hasUpgrade("tm",22); },
            },
     }
});


addLayer("tptc_t", {
    name: "时间",
    symbol: "T",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        energy: new Decimal(0),
    }},
    color: "#3f993d",
    requires() { if(hasUpgrade("tptr_t",23))return new Decimal(1);return new Decimal(5e6); },
    resource: "时间胶囊",
    baseResource: "点数", 
    baseAmount() {return player.points},
    type: "static",
    base: 1e4,
    exponent: 2,
    row: 2,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(3)},
    branches: ["tptc_b"],
    effect() {
        let ret = this.effect1();
        let base = new Decimal(2);
        if(player.tptc_h.challenges[11])base=base.add(tmp.tptc_h.challenges[11].rewardEffect);
        base = base.mul(tmp.tptr_t.effect.tptc_t_boost);
        ret = Decimal.pow(base,ret).mul(ret);
        ret=ret.mul(tmp.tptc_m.clickables[11].effect);
        ret=ret.mul(inChallenge("tptr_h",32)?0:1);
        return ret;
    },
    effect1(d=0) {
        let ret = player.tptc_t.points.add(player.tptc_t.buyables[11].mul(inChallenge("tptr_h",31)?0:1));
        if(hasUpgrade("tptc_t",15)){
            let power=1;
            if(hasUpgrade("tm",61))power+=(Math.pow(Math.min(player.timePlayed,604800)+d,0.55)/1000);
            let mult=0.5;
            ret = ret.add(player.tptc_t.points.pow(1/power).add(player.tptc_t.buyables[11].pow(1/power)).pow(power).mul(mult));
        }
        return ret;
    },
    effectDescription() { 
           let eff = this.effect();
           return "每秒生成"+format(eff)+"时间能量"+((inChallenge("tptc_h",11)||inChallenge("tptr_h",11))?"，但限制为"+format(player.tptc_t.points.pow(player.tptc_t.buyables[11].sqrt().mul(this.effect1().sub(player.tptc_t.buyables[11]).sub(player.tptc_t.points).max(1).sqrt()).add(5)))+"时间能量":"");
       },
    doReset(l){
            if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_t.best);
            layerDataReset("tptc_t",["upgrades","milestones","challenges"]);
            player.tptc_t.best=b;
        },
        
     update(diff){
         player.tptc_t.energy = player.tptc_t.energy.add(tmp.tptc_t.effect.times(diff)).max(0)
         if((inChallenge("tptc_h",11)||inChallenge("tptr_h",11)))player.tptc_t.energy=player.tptc_t.energy.min(player.tptc_t.points.pow(player.tptc_t.buyables[11].sqrt().mul(this.effect1().sub(player.tptc_t.buyables[11]).sub(player.tptc_t.points).max(1).sqrt()).add(5)));
         if(player.tptc_m.best.gte(1)){
            player.tptc_t.buyables[11]=player.tptc_t.buyables[11].max(player.tptc_b.points.add(1).pow(1/(hasUpgrade("tptc_t",14)?1.4:1.5)).sub(2).add(0.000001).floor());
         }
     },
     
     tabFormat: ["main-display",
                    "prestige-button", "resource-display",
            "blank",
                        "milestones",
                    ["display-text",
                        function() {
                            return '你有 ' + format(player.tptc_t.energy) + ' 时间能量，将点数获取乘' + format(tmp.tptc_t.getEnergyEff)+'倍';
                        },
                        {}],
                        "buyables","upgrades"
                ],
    
    getEnergyEffExp() {
        let exp = new Decimal(1)
        return exp;
    },
    getEnergyEff() {
        let energy = player.tptc_t.energy;
        let eff = energy.add(1).pow(tmp.tptc_t.getEnergyEffExp);
        return eff
    },
    
    milestones: {
            0: {requirementDescription: "2时间胶囊",
                done() {return player[this.layer].best.gte(2)},
                effectDescription: "可以购买最大助推器",
            },
    },
    
    buyables: {
            rows: 1,
            cols: 1,
            11: {
                title: "额外时间胶囊",
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = x.add(3).pow(hasUpgrade("tptc_t",14)?1.4:1.5).sub(1).ceil();
                    return cost
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    let extra2 = tmp[this.layer].effect1.sub(player[this.layer].buyables[this.id]).sub(player[this.layer].points);
                    return "你有"+formatWhole(player[this.layer].buyables[this.id])+(extra2.gte(1)?("+"+formatWhole(extra2)+(hasUpgrade("tptc_t",15)?(" (+"+format(layers[this.layer].effect1(1).sub(tmp[this.layer].effect1))+"/s)"):"")):"")+"额外时间胶囊。\n\
                    下一个额外时间胶囊成本: " + format(data.cost) + " 助推器";
                },
                unlocked() { return player.tptc_h.challenges[11] }, 
                canAfford() {
                    return player.tptc_b.points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player.tptc_b.points = player.tptc_b.points.sub(cost)    
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
                buyMax() {},
                style: {'height':'222px'},
            },
    },
     
        canBuyMax() {return player.tptc_h.best.gte(1)},
     autoPrestige(){
         return player.tptc_m.best.gte(1);
     },resetsNothing(){
         return player.tptc_m.best.gte(1);
     },
     hotkeys: [
           {key: "t", description: "T: 时间重置",
            onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==1}}
     ],
     upgrades: {
            rows: 1,
            cols: 5,
            11: {
                title: "时间升级11",
                description: "TPTR中时间胶囊的第二个效果立方",
                cost: new Decimal(3333),
                unlocked() { return hasUpgrade("tm",31); },
            },
            12: {
                title: "时间升级12",
                description: "TPTR中时间胶囊的第二个效果立方",
                cost: new Decimal(6000),
                unlocked() { return hasUpgrade("tm",31); },
            },
            13: {
                title: "时间升级13",
                description: "TPTR中时间胶囊的第二个效果^2.222",
                cost: new Decimal(12500),
                unlocked() { return hasUpgrade("tm",35); },
            },
            14: {
                title: "时间升级14",
                description: "额外时间胶囊更便宜",
                cost: new Decimal(750000),
                unlocked() { return hasUpgrade("tm",35); },
            },
            15: {
                title: "时间升级15",
                description: "基于时间胶囊和额外时间胶囊获得免费额外时间胶囊",
                cost: new Decimal(1e6),
                unlocked() { return hasUpgrade("tm",35); },
            },
     }
});


addLayer("tptc_e", {
    name: "增强",
    symbol: "E",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#9643a3",
    requires() { if(hasUpgrade("tptr_e",22))return new Decimal(1);return new Decimal(5e6); },
    resource: "增强点数",
    baseResource: "点数", 
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.1,
    row: 2,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(3)},
    branches: ["tptc_b","tptc_g"],
    doReset(l){
            if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_e.best);
            layerDataReset("tptc_e",["upgrades","milestones","challenges"]);
            player.tptc_e.best=b;
        },
    buyables: {
            rows: 1,
            cols: 1,
            11: {
                title: "增强器",
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = Decimal.pow(2, x.pow(1.5))
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { 
                    let eff = [];
                    eff[0]=x;
                    if(hasUpgrade("tptc_e",13))eff[0] = x.pow(1.1);
                    if(hasUpgrade("tptc_e",15))eff[0] = x.pow(1.11);
                    if(hasUpgrade("tptc_e",12))eff[0] = eff[0].max(1);
                    eff[0]=eff[0].pow(tmp.tptr_e.effect);
                    eff[1]=Decimal.pow(10,x.pow(0.9));
                    if(hasUpgrade("tptc_e",11))eff[1] = Decimal.pow(10, x.mul(10));
                    if(hasUpgrade("tptc_e",14))eff[1] = Decimal.pow(10, x.mul(15));
                    eff[1]=eff[1].pow(tmp.tptr_e.effect);
                    if(inChallenge("tptr_h",31))return [new Decimal(1),new Decimal(1)];
                    return eff;
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "你有"+formatWhole(player[this.layer].buyables[this.id])+"增强器。\n\
                    它们将声望点数获取乘"+format(data.effect[1])+"倍\n\
                    它们"+(hasUpgrade("tptc_e",12)?"乘算":"加算")+"助推器/生成器基础"+format(data.effect[0])+"\n\
                    下一个增强器成本: " + format(data.cost) + " 增强点数";
                },
                unlocked() { return true }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)    
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
                buyMax() {},
                style: {'height':'222px'},
            },
    },
     passiveGeneration(){
         if(player.tptc_q.best.gte(1))return 1;
         return 0;
     },
     update(diff){
         if(player.tptc_ba.best.gte(1)){
                var target=player.tptc_e.points.add(1).log(2).pow(1/1.5).add(1).floor();
                if(target.gt(player.tptc_e.buyables[11])){
                    player.tptc_e.buyables[11]=target;
                }
         }
     },
     
     hotkeys: [
           {key: "e", description: "E: 增强重置",
            onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==1}}
     ],
     upgrades: {
            rows: 1,
            cols: 5,
            11: {
                title: "增强升级11",
                description: "第一个增强器效果更好",
                cost: new Decimal("e45e5"),
                unlocked() { return hasUpgrade("tm",31); },
            },
            12: {
                title: "增强升级12",
                description: "第二个增强器效果使用乘法而非加法",
                cost: new Decimal("e19e6"),
                unlocked() { return hasUpgrade("tm",31); },
            },
            13: {
                title: "增强升级13",
                description: "第二个增强器效果更好",
                cost: new Decimal("e15e7"),
                unlocked() { return hasUpgrade("tm",35); },
            },
            14: {
                title: "增强升级14",
                description: "第一个增强器效果更好",
                cost: new Decimal("e4e11"),
                unlocked() { return hasUpgrade("tm",35); },
            },
            15: {
                title: "增强升级15",
                description: "第二个增强器效果更好",
                cost: new Decimal("e116e10"),
                unlocked() { return hasUpgrade("tm",35); },
            },
     }
});


addLayer("tptc_s", {
    name: "太空层_s",
    symbol: "S",
    position: 3,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        energy: new Decimal(0),
    }},
    color: "#dfdfdf",
    requires() { if(hasUpgrade("tptr_s",23))return new Decimal(1);return new Decimal(5e6); },
    resource: "太空能量",
    baseResource: "点数", 
    baseAmount() {return player.points},
    type: "static",
    base: 1e4,
    exponent: 2,
    row: 2,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(3)},
    branches: ["tptc_g"],
    doReset(l){
            if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_s.best);
            layerDataReset("tptc_s",["upgrades","milestones","challenges"]);
            player.tptc_s.best=b;
        },
	 tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
                        "milestones",
                    ["display-text",
                        function() {
                            if(hasUpgrade("tptc_s",15))return "太空建筑有效太空能量: "+format(tmp.tptc_s.getEffectiveSE);
                            return '你还有 ' + format(tmp.tptc_s.getSpace) + ' 剩余空间可用于太空建筑'
                        },
                         {}],
                    ["display-text",
                        function() {return '你有 ' + format(player.tptc_g.power) + ' 发电机能量'},
                        {}],
                        "buyables","upgrades"
                ],
                    
    getBaseSpace(){
        if(hasUpgrade("tptc_s",15))return Decimal.dInf;
        let baseSpace = player.tptc_s.best.pow(3).mul(10);
        baseSpace=baseSpace.floor();
        return baseSpace;
    },
    getSpace(){
        let baseSpace = tmp.tptc_s.getBaseSpace;
        return baseSpace.sub(tmp.tptc_s.getSpaceSpent);
    },
    getSpaceSpent(){
        return player[this.layer].buyables[11].add(player[this.layer].buyables[12]).add(player[this.layer].buyables[13]).add(player[this.layer].buyables[14]).add(player[this.layer].buyables[15]).add(player[this.layer].buyables[16]).add(player[this.layer].buyables[17]).add(player[this.layer].buyables[18]).add(player[this.layer].buyables[19]);
    },
    getEffectiveSE(){
        return player.tptc_s.points.mul(layers.tptc_s.buyables[20].effect());
    },
    buyables: {
            rows: 1,
            cols: 10,
            11: {
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = Decimal.pow(1e4,Decimal.pow(x,1.35))
                    if(x.eq(0))return new Decimal(0)
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) {
                    if(inChallenge("tptr_h", 21))return new Decimal(1);
                    x=x.add(layers.tptc_s.buyables[18].effect());
                    let eff = Decimal.pow(layers.tptc_s.getEffectiveSE().add(1),x.mul(3));
                    eff=eff.pow(tmp.tptc_ss.ssEff);
                    eff=eff.pow(tmp.tptc_hs.buyables[11].effect);
                    eff=eff.pow(tmp.tptc_i.buyables[11].effect[this.id]);
                    eff=eff.pow(tmp.tptr_s.effect);
                    return eff;
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "太空建筑1\n\
                    成本: " + format(data.cost) + " 发电机能量\n\
                    等级: " + format(player[this.layer].buyables[this.id]) + "\n"+
                    "当前: 点数获取乘以"+format(data.effect)+"倍 (受太空能量加成)";
                },
                unlocked() { return true }, 
                canAfford() {
                    return player.tptc_g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.tptc_s.getSpace.gt(0)
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player.tptc_g.power = player.tptc_g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {},
                style: {'height':'120px','width':'120px'},
            },
            12: {
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = Decimal.pow(1e6,Decimal.pow(x,1.35))
                    if(x.eq(0))return new Decimal(0)
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) {
                    if(inChallenge("tptr_h", 21))return new Decimal(1);
                    x=x.add(layers.tptc_s.buyables[18].effect());
                    let eff = Decimal.pow(layers.tptc_s.getEffectiveSE().add(1),x.mul(3));
                    eff=eff.pow(tmp.tptc_ss.ssEff);
                    eff=eff.pow(tmp.tptc_hs.buyables[12].effect);
                    eff=eff.pow(tmp.tptc_i.buyables[11].effect[this.id]);
                    eff=eff.pow(tmp.tptr_s.effect);
                    return eff;
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "太空建筑2\n\
                    成本: " + format(data.cost) + " 发电机能量\n\
                    等级: " + format(player[this.layer].buyables[this.id]) + "\n"+
                    "当前: 声望点数获取乘以"+format(data.effect)+"倍 (受太空能量加成)";
                },
                unlocked() { return true }, 
                canAfford() {
                    return player.tptc_g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.tptc_s.getSpace.gt(0)
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player.tptc_g.power = player.tptc_g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {},
                style: {'height':'120px','width':'120px'},
            },
            13: {
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = Decimal.pow(hasUpgrade("tptc_s",13)?1e8:1e20,Decimal.pow(x,1.35))
                    if(x.eq(0))return new Decimal(0)
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) {
                    if(inChallenge("tptr_h", 21))return new Decimal(1);
                    x=x.add(layers.tptc_s.buyables[18].effect());
                    let se=layers.tptc_s.getEffectiveSE().add(1);
                    let eff = x.add(1).mul(se.pow(hasUpgrade("tptc_s",12)?1:0.7));
                    if(se.gte(1e7)){
                        eff = x.add(1).pow(se.log10()).pow(hasUpgrade("tptc_s",12)?1:0.7);
                    }
                    eff=eff.pow(tmp.tptc_ss.ssEff);
                    eff=eff.pow(tmp.tptc_hs.buyables[13].effect);
                    eff=eff.pow(tmp.tptc_i.buyables[11].effect[this.id]);
                    eff=eff.pow(tmp.tptr_s.effect);
                    if(hasUpgrade("tptc_s",11))eff=eff.pow(1.1);
                    if(hasUpgrade("tptc_s",12))eff=eff.pow(10/1.1);
                    return eff;
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "太空建筑3\n\
                    成本: " + format(data.cost) + " 发电机能量\n\
                    等级: " + format(player[this.layer].buyables[this.id]) + "\n"+
                    "当前: 子空间获取乘以"+format(data.effect)+"倍 (受太空能量加成)";
                },
                unlocked() { return player.tptc_i.buyables[11].gte(1) }, 
                canAfford() {
                    return player.tptc_g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.tptc_s.getSpace.gt(0)
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player.tptc_g.power = player.tptc_g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {},
                style: {'height':'120px','width':'120px'},
            },
            14: {
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = Decimal.pow(1e10,Decimal.pow(x,1.35))
                    if(x.eq(0))return new Decimal(0)
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) {
                    if(inChallenge("tptr_h", 21))return new Decimal(1);
                    x=x.add(layers.tptc_s.buyables[18].effect());
                    let eff = Decimal.pow(layers.tptc_s.getEffectiveSE().add(1),x.mul(3));
                    eff=eff.pow(tmp.tptc_ss.ssEff);
                    eff=eff.pow(tmp.tptc_hs.buyables[14].effect);
                    eff=eff.pow(tmp.tptc_i.buyables[11].effect[this.id]);
                    eff=eff.pow(tmp.tptr_s.effect);
                    return eff;
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "太空建筑4\n\
                    成本: " + format(data.cost) + " 发电机能量\n\
                    等级: " + format(player[this.layer].buyables[this.id]) + "\n"+
                    "当前: 助推器/发电机成本除以"+format(data.effect)+"倍 (受太空能量加成)";
                },
                unlocked() { return player.tptc_i.buyables[11].gte(2) }, 
                canAfford() {
                    return player.tptc_g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.tptc_s.getSpace.gt(0)
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player.tptc_g.power = player.tptc_g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {},
                style: {'height':'120px','width':'120px'},
            },
            15: {
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = Decimal.pow(hasUpgrade("tptc_s",14)?1e12:hasUpgrade("tptc_s",13)?1e30:1e100,Decimal.pow(x,1.35))
                    if(x.eq(0))return new Decimal(0)
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) {
                    if(inChallenge("tptr_h", 21))return new Decimal(1);
                    x=x.add(layers.tptc_s.buyables[18].effect());
                    let eff = Decimal.pow(layers.tptc_s.getEffectiveSE().add(1),x.pow(0.5).mul(0.05));
                    eff=eff.pow(tmp.tptc_ss.ssEff);
                    eff=eff.pow(tmp.tptc_hs.buyables[15].effect);
                    eff=eff.pow(tmp.tptc_i.buyables[11].effect[this.id]);
                    eff=eff.pow(tmp.tptr_s.effect);
                    return eff;
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "太空建筑5\n\
                    成本: " + format(data.cost) + " 发电机能量\n\
                    等级: " + format(player[this.layer].buyables[this.id]) + "\n"+
                    "当前: 声望升级第二行效果乘以"+format(data.effect)+"倍 (受太空能量加成)";
                },
                unlocked() { return player.tptc_i.buyables[11].gte(3) }, 
                canAfford() {
                    return player.tptc_g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.tptc_s.getSpace.gt(0)
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player.tptc_g.power = player.tptc_g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {},
                style: {'height':'120px','width':'120px'},
            },
            16: {
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = Decimal.pow(hasUpgrade("tptc_s",14)?1e14:hasUpgrade("tptc_s",13)?1e35:1e50,Decimal.pow(x,1.35))
                    if(x.eq(0))return new Decimal(0)
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) {
                    if(inChallenge("tptr_h", 21))return new Decimal(1);
                    x=x.add(layers.tptc_s.buyables[18].effect());
                    let eff = Decimal.pow(layers.tptc_s.getEffectiveSE().add(1),x.pow(0.9).mul(0.05));
                    eff=eff.pow(tmp.tptc_ss.ssEff);
                    eff=eff.pow(tmp.tptc_hs.buyables[16].effect);
                    eff=eff.pow(tmp.tptc_i.buyables[11].effect[this.id]);
                    eff=eff.pow(tmp.tptr_s.effect);
                    return eff;
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "太空建筑6\n\
                    成本: " + format(data.cost) + " 发电机能量\n\
                    等级: " + format(player[this.layer].buyables[this.id]) + "\n"+
                    "当前: 幻影灵魂需求除以"+format(data.effect)+"倍 (受太空能量加成)";
                },
                unlocked() { return player.tptc_i.buyables[11].gte(4) }, 
                canAfford() {
                    return player.tptc_g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.tptc_s.getSpace.gt(0)
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player.tptc_g.power = player.tptc_g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {},
                style: {'height':'120px','width':'120px'},
            },
            17: {
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = Decimal.pow(hasUpgrade("tptc_s",14)?1e16:1e40,Decimal.pow(x,1.35))
                    if(x.eq(0))return new Decimal(0)
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) {
                    if(inChallenge("tptr_h", 21))return new Decimal(1);
                    x=x.add(layers.tptc_s.buyables[18].effect());
                    let eff = Decimal.pow(layers.tptc_s.getEffectiveSE().add(1),x.pow(0.7).mul(0.05));
                    eff=eff.pow(tmp.tptc_ss.ssEff);
                    eff=eff.pow(tmp.tptc_hs.buyables[17].effect);
                    eff=eff.pow(tmp.tptc_i.buyables[11].effect[this.id]);
                    eff=eff.pow(tmp.tptr_s.effect);
                    return eff;
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "太空建筑7\n\
                    成本: " + format(data.cost) + " 发电机能量\n\
                    等级: " + format(player[this.layer].buyables[this.id]) + "\n"+
                    "当前: 生命能量获取乘以"+format(data.effect)+"倍 (受太空能量加成)";
                },
                unlocked() { return player.tptc_i.buyables[11].gte(5) }, 
                canAfford() {
                    return player.tptc_g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.tptc_s.getSpace.gt(0)
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player.tptc_g.power = player.tptc_g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {},
                style: {'height':'120px','width':'120px'},
            },
            18: {
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = Decimal.pow(hasUpgrade("tptc_s",14)?1e50:1e100,Decimal.pow(x,2))
                    if(x.eq(0))return new Decimal(0)
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) {
                    let eff = Decimal.log10(layers.tptc_s.getEffectiveSE().add(10));
                    eff=eff.mul(x);
                    eff=eff.mul(tmp.tptc_ss.ssEff);
                    eff=eff.mul(tmp.tptc_hs.buyables[18].effect);
                    eff=eff.mul(tmp.tptc_i.buyables[11].effect[this.id]);
                    return eff;
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "太空建筑8\n\
                    成本: " + format(data.cost) + " 发电机能量\n\
                    等级: " + format(player[this.layer].buyables[this.id]) + "\n"+
                    "当前: 为太空建筑1-7增加"+format(data.effect)+"免费等级 (受太空能量加成)";
                },
                unlocked() { return player.tptc_i.buyables[11].gte(6) }, 
                canAfford() {
                    return player.tptc_g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.tptc_s.getSpace.gt(0)
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player.tptc_g.power = player.tptc_g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {},
                style: {'height':'120px','width':'120px'},
            },
            19: {
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = Decimal.pow(1e100,Decimal.pow(x,4.5))
                    if(x.eq(0))return new Decimal(0)
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) {
                    let eff = x.add(10).log10();
                    if(hasUpgrade("tptc_hs",22))eff = eff.add(x.div(1000));
                    if(hasUpgrade("tptc_hs",23))eff = eff.max(x.div(100).add(1));
                    if(hasUpgrade("tptc_hs",24))eff = eff.mul(tmp.tptc_ss.ssEff);
                    return eff;
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "太空建筑9\n\
                    成本: " + format(data.cost) + " 发电机能量\n\
                    等级: " + format(player[this.layer].buyables[this.id]) + "\n"+
                    "当前: 在TPTR中太空建筑效果增加"+format(data.effect.sub(1).mul(100))+"%";
                },
                unlocked() { return hasUpgrade("tptc_s",14) }, 
                canAfford() {
                    return player.tptc_g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.tptc_s.getSpace.gt(0)
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player.tptc_g.power = player.tptc_g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {},
                style: {'height':'120px','width':'120px'},
            },
            20: {
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = Decimal.pow(1e300,Decimal.pow(x,6))
                    if(x.eq(0))return new Decimal(0)
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) {
                    let eff = x.div(3).add(10).log10();
                    if(hasUpgrade("tptc_hs",25))eff = eff.mul(tmp.tptc_ss.ssEff);
                    return eff;
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "太空建筑10\n\
                    成本: " + format(data.cost) + " 发电机能量\n\
                    等级: " + format(player[this.layer].buyables[this.id]) + "\n"+
                    "当前: 太空建筑有效太空能量"+format(data.effect)+"倍";
                },
                unlocked() { return hasUpgrade("tptc_s",15) }, 
                canAfford() {
                    return player.tptc_g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.tptc_s.getSpace.gt(0)
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player.tptc_g.power = player.tptc_g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {},
                style: {'height':'120px','width':'120px'},
            },
    },
    
    milestones: {
            0: {
                requirementDescription: "2点太空能量",
                done() {return player[this.layer].best.gte(2)},
                effectDescription: "可以批量购买发电机",
            },
    },
    
    canBuyMax() {return player.tptc_ss.best.gte(1)},
    autoPrestige(){
         return player.tptc_ba.best.gte(1);
     },
    resetsNothing(){
         return player.tptc_ba.best.gte(1);
     },
    update(diff){
         if(player.tptc_ba.best.gte(1)){
            var pow=player.tptc_g.power;
            if(hasUpgrade("tptc_s",15)){
                var target=pow.add(1).log(1e300).pow(1/6).add(1).floor();
                if(target.gt(player.tptc_s.buyables[20])){
                    player.tptc_s.buyables[20]=target;
                }
            }
            if(hasUpgrade("tptc_s",14)){
                var target=pow.add(1).log(1e100).pow(1/4.5).add(1).floor();
                if(target.gte(tmp.tptc_s.getSpace.add(player.tptc_s.buyables[19])))target=tmp.tptc_s.getSpace.add(player.tptc_s.buyables[19]);
                if(target.gt(player.tptc_s.buyables[19])){
                    player.tptc_s.buyables[19]=target;
                }
            }
            if(player.tptc_i.buyables[11].gte(6)){
                var target=pow.add(1).log(hasUpgrade("tptc_s",14)?1e50:1e100).pow(1/2).add(1).floor();
                if(target.gte(tmp.tptc_s.getSpace.add(player.tptc_s.buyables[18])))target=tmp.tptc_s.getSpace.add(player.tptc_s.buyables[18]);
                if(target.gt(player.tptc_s.buyables[18])){
                    player.tptc_s.buyables[18]=target;
                }
            }
            if(player.tptc_i.buyables[11].gte(5)){
                var target=pow.add(1).log(hasUpgrade("tptc_s",14)?1e16:1e40).pow(1/1.35).add(1).floor();
                if(target.gte(tmp.tptc_s.getSpace.add(player.tptc_s.buyables[17])))target=tmp.tptc_s.getSpace.add(player.tptc_s.buyables[17]);
                if(target.gt(player.tptc_s.buyables[17])){
                    player.tptc_s.buyables[17]=target;
                }
            }
            if(player.tptc_i.buyables[11].gte(4)){
                var target=pow.add(1).log(hasUpgrade("tptc_s",14)?1e14:hasUpgrade("tptc_s",13)?1e35:1e50).pow(1/1.35).add(1).floor();
                if(target.gte(tmp.tptc_s.getSpace.add(player.tptc_s.buyables[16])))target=tmp.tptc_s.getSpace.add(player.tptc_s.buyables[16]);
                if(target.gt(player.tptc_s.buyables[16])){
                    player.tptc_s.buyables[16]=target;
                }
            }
            if(player.tptc_i.buyables[11].gte(3)){
                var target=pow.add(1).log(hasUpgrade("tptc_s",14)?1e12:hasUpgrade("tptc_s",13)?1e30:1e100).pow(1/1.35).add(1).floor();
                if(target.gte(tmp.tptc_s.getSpace.add(player.tptc_s.buyables[15])))target=tmp.tptc_s.getSpace.add(player.tptc_s.buyables[15]);
                if(target.gt(player.tptc_s.buyables[15])){
                    player.tptc_s.buyables[15]=target;
                }
            }
            if(player.tptc_i.buyables[11].gte(2)){
                var target=pow.add(1).log(1e10).pow(1/1.35).add(1).floor();
                if(target.gte(tmp.tptc_s.getSpace.add(player.tptc_s.buyables[14])))target=tmp.tptc_s.getSpace.add(player.tptc_s.buyables[14]);
                if(target.gt(player.tptc_s.buyables[14])){
                    player.tptc_s.buyables[14]=target;
                }
            }
            if(player.tptc_i.buyables[11].gte(1)){
                var target=pow.add(1).log(hasUpgrade("tptc_s",13)?1e8:1e20).pow(1/1.35).add(1).floor();
                if(target.gte(tmp.tptc_s.getSpace.add(player.tptc_s.buyables[13])))target=tmp.tptc_s.getSpace.add(player.tptc_s.buyables[13]);
                if(target.gt(player.tptc_s.buyables[13])){
                    player.tptc_s.buyables[13]=target;
                }
            }
            var target=pow.add(1).log(1e6).pow(1/1.35).add(1).floor();
            if(target.gte(tmp.tptc_s.getSpace.add(player.tptc_s.buyables[12])))target=tmp.tptc_s.getSpace.add(player.tptc_s.buyables[12]);
            if(target.gt(player.tptc_s.buyables[12])){
                player.tptc_s.buyables[12]=target;
            }
            target=pow.add(1).log(1e4).pow(1/1.35).add(1).floor();
            if(target.gte(tmp.tptc_s.getSpace.add(player.tptc_s.buyables[11])))target=tmp.tptc_s.getSpace.add(player.tptc_s.buyables[11]);
            if(target.gt(player.tptc_s.buyables[11])){
                player.tptc_s.buyables[11]=target;
            }
         }
     },
     
     hotkeys: [
           {
               key: "s", 
               description: "S: 太空重置",
               onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, 
               unlocked(){return player.tm.currentTree==1}
           }
     ],
     upgrades: {
            rows: 1,
            cols: 5,
            11: {
                title: "太空升级11",
                description: "太空建筑3的效果略微增强",
                cost: new Decimal(3333),
                unlocked() { return hasUpgrade("tm",31); },
            },
            12: {
                title: "太空升级12",
                description: "太空建筑3的效果增强",
                cost: new Decimal(7777),
                unlocked() { return hasUpgrade("tm",35); },
            },
            13: {
                title: "太空升级13",
                description: "太空建筑成本降低",
                cost: new Decimal(12500),
                unlocked() { return hasUpgrade("tm",35); },
            },
            14: {
                title: "太空升级14",
                description: "太空建筑成本降低，并解锁太空建筑9",
                cost: new Decimal(750000),
                unlocked() { return hasUpgrade("tm",35); },
            },
            15: {
                title: "太空升级15",
                description: "获得无限空间并解锁太空建筑10",
                cost: new Decimal(1600000),
                unlocked() { return hasUpgrade("tm",35); },
            },
     }
});


addLayer("tptc_sb", {
    name: "超级助推器层",
    symbol: "SB",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#415a9e",
    requires: function(){
        return new Decimal(10);
    },
    resource: "超级助推器",
    baseResource: "助推器", 
    baseAmount() {return player.tptc_b.points},
    type: "static",
    base: function(){
        if(hasUpgrade("tptc_sp",24))return new Decimal(1.1);
        if(hasUpgrade("tptc_sb",13))return new Decimal(1.12);
        if(hasUpgrade("tptc_p",45))return new Decimal(1.125);
        if(hasUpgrade("tptc_sb",12))return new Decimal(1.15);
        if(hasUpgrade("tptc_p",35))return new Decimal(1.19);
        return new Decimal(1.2);
    },
    exponent: 1.2,
    row: 2,
    roundUpCost: true,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(4)},
    branches: ["tptc_b"],
    effect() {
        if(inChallenge("tptc_ge",12)||inChallenge("tptc_h",31))return new Decimal(1);
        let ret = player.tptc_sb.points;
        let base = new Decimal(1.5);
        base = base.mul(tmp.tptc_hb.effect);
        if(hasUpgrade('tptc_m',15))base = base.mul(tmp.tptc_m.clickables[13].effect.pow(hasUpgrade('tptc_sb',15)?0.125:0.1));
        if(player.tptc_ge.challenges[12])base = base.mul(tmp.tptc_ge.challenges[12].rewardEffect);
        base = base.mul(tmp.tptr_sb.effect[1]);
        ret = Decimal.pow(base,ret);
        return ret;
    },
    effectDescription() {
        let eff = this.effect();
        return "将助推器效果基础值乘以"+format(eff)+"倍";
    },
    doReset(l){
        if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || !l.startsWith("tptc_")){return;}
        var b=new Decimal(player.tptc_sb.best);
        layerDataReset("tptc_sb",["upgrades","milestones","challenges"]);
        player.tptc_sb.best=b;
    },
    canBuyMax() {return player.tptc_hb.best.gte(1)},
    autoPrestige(){
        return player.tptc_m.best.gte(1);
    },
    resetsNothing(){
        return player.tptc_m.best.gte(1);
    },
    hotkeys: [
        {key: "B", description: "Shift+B: 超级助推器重置",
        onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==1}}
    ],
    upgrades: {
        rows: 1,
        cols: 5,
        11: {
            title: "超级助推器升级11",
            description(){return "TPTR中的第二个超级助推器效果^"+(hasUpgrade("tptc_sb",14)?2:1.15)},
            cost: new Decimal(29),
            unlocked() { return hasUpgrade("tm",31); },
        },
        12: {
            title: "超级助推器升级12",
            description: "TPTC和TPTR中的超级助推器更便宜",
            cost: new Decimal(31),
            unlocked() { return hasUpgrade("tm",35); },
        },
        13: {
            title: "超级助推器升级13",
            description: "TPTC和TPTR中的超级助推器更便宜",
            cost: new Decimal(48),
            unlocked() { return hasUpgrade("tm",35); },
        },
        14: {
            title: "超级助推器升级14",
            description: "超级助推器升级11效果更强",
            cost: new Decimal(70),
            unlocked() { return hasUpgrade("tm",35); },
        },
        15: {
            title: "超级助推器升级15",
            description: "魔法升级15效果更强",
            cost: new Decimal(81),
            unlocked() { return hasUpgrade("tm",56); },
        },
    }
});

addLayer("tptc_sg", {
    name: "超级生成器层",
    symbol: "SG",
    position: 4,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        power: new Decimal(0),
    }},
    color: "#409c6e",
    requires: function(){
        if(hasUpgrade('tptc_sg',13))return new Decimal(10);
        if(hasUpgrade('dynas_c',25))return new Decimal(30);
        return new Decimal(70);
    },
    resource: "超级生成器",
    baseResource: "生成器", 
    baseAmount() {return player.tptc_g.points},
    type: "static",
    base: 1.1,
    exponent: 1.2,
    row: 2,
    roundUpCost: true,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(7) && player.tptc_h.challenges[12]>=1},
    branches: ["tptc_g"],
    tabFormat: ["main-display",
                "prestige-button", "resource-display",
                ["blank", "5px"],
                ["display-text",
                    function() {
                        return '你有 ' + format(player.tptc_sg.power) + ' 超级生成器能量，将生成器基础值增加 ' + format(tmp.tptc_sg.getSGenPowerEff);
                    },
                    {}],"upgrades"
            ],
    effect() {
        if(inChallenge("tptc_ge",12)||inChallenge("tptc_h",31))return new Decimal(0);
        let ret = player.tptc_sg.points;
        let base = new Decimal(2);
        base=base.mul(tmp.tptc_m.clickables[13].effect);
        if(player.tptc_ge.challenges[12])base = base.mul(tmp.tptc_ge.challenges[12].rewardEffect);
        base = base.mul(tmp.tptr_sg.effect[1]);
        ret = Decimal.pow(base,ret).mul(ret);
        return ret;
    },
    effectDescription() {
        let eff = this.effect();
        return "每秒生成"+format(eff)+"超级生成器能量";
    },
    doReset(l){
        if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || !l.startsWith("tptc_")){return;}
        var b=new Decimal(player.tptc_sg.best);
        layerDataReset("tptc_sg",["upgrades","milestones","challenges"]);
        player.tptc_sg.best=b;
    },
    update(diff){
        player.tptc_sg.power = player.tptc_sg.power.add(tmp.tptc_sg.effect.times(diff)).max(0)
    },
    getSGenPowerEff(){
        if(hasUpgrade("tptc_p",44))return player.tptc_sg.power.add(1);
        return player.tptc_sg.power.add(1).pow(0.4).sub(1).mul(2);
    },
    canBuyMax(){
        return player.tptc_sp.best.gte(1);
    },
    autoPrestige(){
        return player.tptc_sp.best.gte(1);
    },
    resetsNothing(){
        return player.tptc_sp.best.gte(1);
    },
    hotkeys: [
        {key: "G", description: "Shift+G: 超级生成器重置",
        onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==1}}
    ],
    upgrades: {
        rows: 1,
        cols: 5,
        11: {
            title: "超级生成器升级11",
            description: "TPTR中的超级生成器更便宜",
            cost: new Decimal(42),
            unlocked() { return hasUpgrade("tm",31); },
        },
        12: {
            title: "超级生成器升级12",
            description: "TPTR中的超级生成器更便宜",
            cost: new Decimal(43),
            unlocked() { return hasUpgrade("tm",35); },
        },
        13: {
            title: "超级生成器升级13",
            description: "超级生成器更便宜",
            cost: new Decimal(73),
            unlocked() { return hasUpgrade("tm",35); },
        },
        14: {
            title: "超级生成器升级14",
            description: "TPTR中的超级生成器更便宜",
            cost: new Decimal(79),
            unlocked() { return hasUpgrade("tm",35); },
        },
        15: {
            title: "超级生成器升级15",
            description: "超空间升级12效果更强",
            cost: new Decimal(81),
            unlocked() { return hasUpgrade("tm",56); },
        },
    }
});

addLayer("tptc_h", {
    name: "阻碍精神层",
    symbol: "H",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#a14040",
    requires: function(){
        return new Decimal(2e4);
    },
    resource: "阻碍精神",
    baseResource: "时间能量", 
    baseAmount() {return player.tptc_t.energy},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        mult = mult.mul(tmp.tptc_m.hexEff);
        mult = mult.mul(tmp.tptc_ba.baEff);
        return mult
    },
    row: 3,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(5)},
    branches: ["tptc_t"],
    doReset(l){
        if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || l=="tptc_h" || l=="tptc_q" || l=="tptc_hb" || l=="tptc_ss" || !l.startsWith("tptc_")){return;}
        var b=new Decimal(player.tptc_h.best);
        layerDataReset("tptc_h",["upgrades","milestones","challenges"]);
        player.tptc_h.best=b;
    },
    tabFormat: ["main-display",
                "prestige-button", "resource-display",
                ["blank", "5px"],
                "milestones",
                "challenges"
            ],
    milestones: {
        0: {
            requirementDescription: "1个阻碍精神",
            done() {return player[this.layer].best.gte(1)},
            effectDescription: "自动购买助推器/生成器，助推器/生成器重置不影响任何内容。可以批量购买时间胶囊。",
        },
    },
    challenges: {
        rows: 3,
        cols: 2,
        11: {
            name: "真正的声望树",
            completionLimit: 1,
            challengeDescription() {
                if(player.tptc_h.challenges[11])return "时间能量基于时间胶囊和额外时间胶囊有上限。";
                return "时间能量基于时间胶囊有上限。";
            },
            unlocked() { return true },
            goal: function(){
                return new Decimal(1e48);
            },
            currencyDisplayName: "点数",
            currencyInternalName: "points",
            rewardEffect() {
                let ret = new Decimal(1).add(player.tptc_h.points.add(1).log10().pow(0.5)).mul(player.tm.buyables[1]).div(5);
                if(hasUpgrade("tptc_l",14))ret=ret.mul(buyableEffect("tptc_l",14));
                ret=ret.mul(tmp.tptr_h.effect[1]);
                return ret;
            },
            rewardDisplay() { 
                return "时间胶囊基础值+"+format(this.rewardEffect()); 
            },
            rewardDescription() { 
                return "解锁额外时间胶囊。时间胶囊基础值受阻碍精神和本树等级加成。"
            },
        },
        12: {
            name: "无声望",
            completionLimit: 1,
            challengeDescription() {
                return "无法获得任何声望点数。"
            },
            unlocked() { return player.tm.buyables[1].gte(7) },
            goal: function(){
                return new Decimal("1e320");
            },
            currencyDisplayName: "点数",
            currencyInternalName: "points",
            rewardDescription() { 
                return "解锁超级生成器。"
            },
        },
        21: {
            name: "禁用助推器/生成器",
            completionLimit: 1,
            challengeDescription() {
                return "助推器和生成器无效。";
            },
            unlocked() { return hasChallenge("tptr_h", 11) },
            goal: function(){
                return new Decimal("e24250000");
            },
            currencyDisplayName: "点数",
            currencyInternalName: "points",
            rewardDescription() { 
                return "生成器能量效果^1.042"
            },
        },
        22: {
            name: "前两行无效",
            completionLimit: 1,
            challengeDescription() {
                return "无法获得声望点数。助推器和生成器无效。";
            },
            unlocked() { return hasChallenge("tptr_h", 12) },
            goal: function(){
                return new Decimal("e24900000");
            },
            currencyDisplayName: "点数",
            currencyInternalName: "points",
            rewardDescription() { 
                return "生成器能量效果^1.2"
            },
            countsAs: [12,21]
        },
        31: {
            name: "禁用超级助推器/超级生成器",
            completionLimit: 1,
            challengeDescription() {
                return "超级助推器和超级生成器无效。";
            },
            unlocked() { return hasChallenge("tptr_h", 41) },
            goal: function(){
                return new Decimal("e407e8");
            },
            currencyDisplayName: "点数",
            currencyInternalName: "points",
            rewardDescription() { 
                return "TPTR中的超级助推器和超级生成器更便宜。"
            },
        },
    },
    passiveGeneration(){
        if(player.tptc_sp.best.gte(1))return 1;
        return 0;
    },
    hotkeys: [
        {key: "h", description: "H: 阻碍精神重置",
        onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==1}}
    ],
});

addLayer("tptc_q", {
    name: "特质层",
    symbol: "Q",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        energy: new Decimal(0),
        time1: 0
    }},
    color: "#ff2bf2",
    requires: function(){
        return new Decimal(1e20);
    },
    resource: "特质",
    baseResource: "生成器能量", 
    baseAmount() {return player.tptc_g.power},
    type: "normal",
    exponent: 0.075,
    gainMult() {
        mult = new Decimal(1)
        mult = mult.mul(tmp.tptc_m.hexEff);
        mult = mult.mul(tmp.tptc_ba.baEff);
        return mult
    },
    row: 3,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(5)},
    branches: ["tptc_e"],
    doReset(l){
        if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || l=="tptc_h" || l=="tptc_q" || l=="tptc_hb" || l=="tptc_ss" || !l.startsWith("tptc_")){return;}
        var b=new Decimal(player.tptc_q.best);
        layerDataReset("tptc_q",["upgrades","milestones","challenges"]);
        player.tptc_q.best=b;
    },
    tabFormat: ["main-display",
                "prestige-button", "resource-display",
                ["blank", "5px"],
                "milestones",
                "buyables",
                ["display-text",
                    function() {return '你有 ' + format(player.tptc_q.energy) + ' 特质能量，将点数与生成器能量获取乘以'+ format(tmp.tptc_q.quirkEff)+"倍" },
                    {}]
            ],
    milestones: {
        0: {
            requirementDescription: "1个特质",
            done() {return player[this.layer].best.gte(1)},
            effectDescription: "每秒获得100%的增强点数获取。",
        },
    },
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            title: "特质层",
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(2, x.pow(2))
                return cost
            },
            effect(x=player[this.layer].buyables[this.id]) {
                if(inChallenge("tptc_ge",22))return new Decimal(0);
                let base=new Decimal(player.timePlayed);
                base=base.mul(tmp.tptc_m.clickables[12].effect);
                base=base.mul(tmp.tptr_q.effect);
                if(player.tptc_ge.challenges[22])base = base.mul(tmp.tptc_ge.challenges[22].rewardEffect);
                let eff = x.mul(Decimal.pow(base,x.sub(1)));
                return eff;
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "你有"+format(player[this.layer].buyables[this.id])+"个特质层。<br>"+
                "它们每秒生产"+format(data.effect)+"特质能量。<br>"+
                "下一个特质层成本: " + format(data.cost) + " 特质";
            },
            canAfford() {
                return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
            },
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
            },
            buyMax() {},
            style: {'height':'222px'},
        },
    },
    update(diff){
        player.tptc_q.energy=player.tptc_q.energy.add(tmp.tptc_q.buyables[11].effect.mul(diff)).max(0);
        
        if(player.tptc_hs.best.gte(1)){
            var target=player.tptc_q.points.add(1).log(2).pow(1/2).add(1).floor();
            if(target.gt(player.tptc_q.buyables[11])){
                player.tptc_q.buyables[11]=target;
            }
        }
    },
    quirkEff(){
        let x=player.tptc_q.energy.add(1);
        return x;
    },
    passiveGeneration(){
        if(player.tptc_sp.best.gte(1))return 1;
        return 0;
    },
    hotkeys: [
        {key: "q", description: "Q: 特质重置",
        onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==1}}
    ],
});

addLayer("tptc_ss", {
    name: "子空间层",
    symbol: "SS",
    position: 3,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        subspace: new Decimal(0),
    }},
    color: "white",
    requires: function(){
        return new Decimal(7);
    },
    resource: "子空间能量",
    baseResource: "空间能量", 
    baseAmount() {return player.tptc_s.points},
    type: "static",
    base: 1.14,
    exponent: 1.2,
    row: 3,
    roundUpCost: true,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(6)},
    branches: ["tptc_s","tptc_e"],
    effect() {
        if(inChallenge("tptc_ge",21))return new Decimal(0);
        let ret = player.tptc_ss.points;
        let base = new Decimal(2);
        if(hasUpgrade("tptc_hs",13))base = base.mul(upgradeEffect("tptc_hs",13));
        if(player.tptc_ge.challenges[21])base = base.mul(tmp.tptc_ge.challenges[21].rewardEffect);
        if (player.tptr_ss.unlocked)base = base.mul(tmp.tptr_ss.effect[1]);
        ret = Decimal.pow(base,ret).mul(ret);
        if(hasUpgrade("tptc_sp",22))ret = ret.mul(upgradeEffect("tptc_sp",22));
        if(player.tptc_i.buyables[11].gte(1))ret = ret.mul(buyableEffect("tptc_s",13));
        if(hasUpgrade("stardust_c",33))ret = ret.mul(buyableEffect("stardust_so",13));
        if(hasUpgrade("tptc_ma",13))ret=ret.mul(upgradeEffect("tptc_ma",13));
        return ret;
    },
    effectDescription() {
        let eff = this.effect();
        return "每秒生成"+format(eff)+"子空间";
    },
    doReset(l){
        if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || l=="tptc_h" || l=="tptc_q" || l=="tptc_hb" || l=="tptc_ss" || !l.startsWith("tptc_")){return;}
        var b=new Decimal(player.tptc_ss.best);
        layerDataReset("tptc_ss",["upgrades","milestones","challenges"]);
        player.tptc_ss.best=b;
    },
    milestones: {
        0: {
            requirementDescription: "1个子空间能量",
            done() {return player[this.layer].best.gte(1)},
            effectDescription: "可以批量购买空间能量。",
        },
    },
    tabFormat: ["main-display",
                "prestige-button", "resource-display",
                ["blank", "5px"],
                "milestones",
                "buyables",
                ["display-text",
                    function() {
                        if(hasUpgrade("tptc_hs",25))return '你有 ' + format(player.tptc_ss.subspace) + ' 子空间，将太空建筑1-7的效果提升到'+ format(tmp.tptc_ss.ssEff)+'次方，并将太空建筑8-10的效果乘以'+ format(tmp.tptc_ss.ssEff)+'倍'
                        if(hasUpgrade("tptc_hs",24))return '你有 ' + format(player.tptc_ss.subspace) + ' 子空间，将太空建筑1-7的效果提升到'+ format(tmp.tptc_ss.ssEff)+'次方，并将太空建筑8-9的效果乘以'+ format(tmp.tptc_ss.ssEff)+'倍'
                        if(player.tptc_i.buyables[11].gte(6))return '你有 ' + format(player.tptc_ss.subspace) + ' 子空间，将太空建筑1-7的效果提升到'+ format(tmp.tptc_ss.ssEff)+'次方，并将太空建筑8的效果乘以'+ format(tmp.tptc_ss.ssEff)+'倍'
                        return '你有 ' + format(player.tptc_ss.subspace) + ' 子空间，将太空建筑效果提升到'+ format(tmp.tptc_ss.ssEff)+'次方' },
                    {}]
            ],
    ssEff() {
        let ret=player.tptc_ss.subspace;
        ret=ret.add(1).log10();
        ret=ret.add(1).log10();
        return ret.sqrt().div(2).add(1);
    },
    update(diff){
        player.tptc_ss.subspace=player.tptc_ss.subspace.add(tmp.tptc_ss.effect.mul(diff)).max(0);
    },
    canBuyMax(){
        return player.tptc_hs.best.gte(1);
    },
    autoPrestige(){
        return player.tptc_hs.best.gte(1);
    },
    resetsNothing(){
        return player.tptc_hs.best.gte(1);
    },
    hotkeys: [
        {key: "S", description: "Shift+S: 子空间重置",
        onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==1}}
    ],
});

addLayer("tptc_hb", {
    name: "超级助推器层",
    symbol: "HB",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        subspace: new Decimal(0),
    }},
    color: "#513d94",
    requires: function(){
        return new Decimal(6);
    },
    resource: "超级助推器",
    baseResource: "超级助推器", 
    baseAmount() {return player.tptc_sb.points},
    type: "static",
    base: 1.14,
    exponent: 1.2,
    row: 3,
    roundUpCost: true,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(6)},
    branches: ["tptc_sb","tptc_t"],
    effect() {
        let ret = player.tptc_hb.points;
        let base = new Decimal(1.25);
        if(hasUpgrade("tptc_l",11))base=base.add(layers.tptc_l.buyables[11].effect());
        base=base.add(tmp.tptr_o.effect3.sub(1));
        ret = Decimal.pow(base,ret);
        return ret;
    },
    effectDescription() {
        let eff = this.effect();
        return "将超级助推器效果基础值乘以"+format(eff)+"倍";
    },
    doReset(l){
        if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || l=="tptc_h" || l=="tptc_q" || l=="tptc_hb" || l=="tptc_ss" || !l.startsWith("tptc_")){return;}
        var b=new Decimal(player.tptc_hb.best);
        layerDataReset("tptc_hb",["upgrades","milestones","challenges"]);
        player.tptc_hb.best=b;
    },
    milestones: {
        0: {
            requirementDescription: "1个超级助推器",
            done() {return player[this.layer].best.gte(1)},
            effectDescription: "可以批量购买超级助推器。",
        },
    },
    tabFormat: ["main-display",
                "prestige-button", "resource-display",
                ["blank", "5px"],
                "milestones"
            ],
    canBuyMax(){
        return player.tptc_l.best.gte(1);
    },
    autoPrestige(){
        return player.tptc_l.best.gte(1);
    },
    resetsNothing(){
        return player.tptc_l.best.gte(1);
    },
    hotkeys: [
        {key: "ctrl+b", description: "Ctrl+B: 超级助推器重置",
        onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==1}}
    ],
});


addLayer("tptc_m", {
    name: "魔法层",
    symbol: "M",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        hexes: new Decimal(0),
            spellTimes: {
                11: new Decimal(0),
                12: new Decimal(0),
                13: new Decimal(0),
                14: new Decimal(0),
                15: new Decimal(0),
                16: new Decimal(0),
            },
    }},
    color: "#eb34c0",
    requires: function(){
        return new Decimal(1e7);
    },
    resource: "魔法",
    baseResource: "阻碍精神", 
    baseAmount() {return player.tptc_h.points},
    type: "normal",
    exponent: 0.3,
    row: 4,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(7)},
    branches: ["tptc_hb","tptc_h","tptc_q"],
    doReset(l){
            if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || l=="tptc_h" || l=="tptc_q" || l=="tptc_hb" || l=="tptc_ss" || l=="tptc_m" || l=="tptc_ba" || l=="tptc_ps" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_m.best);
            layerDataReset("tptc_m",["upgrades","milestones","challenges"]);
            player.tptc_m.best=b;
        },
     tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
                        "milestones",
                    ["display-text","施放法术需要1点魔法。法术效果基于你的魔法和符文数量。"],
                        "可点击项",
                    ["display-text",
                        function() {return '你有 ' + format(player.tptc_m.hexes) + ' 符文，将阻碍精神和特质获取乘以 ' + format(tmp.tptc_m.hexEff) },
                        {}],"upgrades"
                ],
    
    milestones: {
            0: {requirementDescription: "1点魔法",
                done() {return player[this.layer].best.gte(1)}, 
                effectDescription: "自动购买时间胶囊/超级助推器，时间胶囊/超级助推器重置不影响任何内容。自动购买额外时间胶囊。",
            },
    },
    clickables: {
            rows: 1,
            cols: 6,
            11: {
                title: "时间法术",
                unlocked(){return true},
                canClick(){return player.tptc_m.points.gte(1) && player.tptc_m.spellTimes[11].lte(0)},
                onClick(){
                    player.tptc_m.points=player.tptc_m.points.sub(1);
                    player.tptc_m.hexes=player.tptc_m.hexes.add(1);
                    player.tptc_m.spellTimes[11]=new Decimal(60);
                },
                effect(){
                    if(player.tptc_m.spellTimes[11].lte(0))return new Decimal(1);
                    return layers.tptc_m.clickables[11].realEffect();
                },
                realEffect(){
                    let ret=Decimal.pow(10,Decimal.log10(player.tptc_m.points.add(1).mul(player.tptc_m.hexes.add(1)).max(1)).add(2).mul(2).pow(0.9));
                    ret=ret.pow(tmp.tptc_mb.buyables[11].effect);
                    return ret;
                },
                display(){
                    return "将时间能量获取乘以"+format(layers.tptc_m.clickables[11].realEffect())+"倍\n\
                    持续时间: "+formatTime(player.tptc_m.spellTimes[11].max(0));
                },
                style: {'height':'160px','width':'200px'},
            },
            12: {
                title: "特质法术",
                unlocked(){return player.tptc_mb.buyables[11].gte(1)},
                canClick(){return player.tptc_m.points.gte(1) && player.tptc_m.spellTimes[12].lte(0)},
                onClick(){
                    player.tptc_m.points=player.tptc_m.points.sub(1);
                    player.tptc_m.hexes=player.tptc_m.hexes.add(1);
                    player.tptc_m.spellTimes[12]=new Decimal(60);
                },
                effect(){
                    if(player.tptc_m.spellTimes[12].lte(0))return new Decimal(1);
                    return layers.tptc_m.clickables[12].realEffect();
                },
                realEffect(){
                    let ret=Decimal.pow(1.1,Decimal.log10(player.tptc_m.points.add(1).mul(player.tptc_m.hexes.add(1)).max(1)).add(2).mul(2).pow(0.5));
                    ret=ret.pow(tmp.tptc_mb.buyables[11].effect);
                    return ret;
                },
                display(){
                    return "将特质层基础值乘以"+format(layers.tptc_m.clickables[12].realEffect())+"倍\n\
                    持续时间: "+formatTime(player.tptc_m.spellTimes[12].max(0));
                },
                style: {'height':'160px','width':'200px'},
            },
            13: {
                title: "超级生成器法术",
                unlocked(){return player.tptc_mb.buyables[11].gte(2)},
                canClick(){return player.tptc_m.points.gte(1) && player.tptc_m.spellTimes[13].lte(0)},
                onClick(){
                    player.tptc_m.points=player.tptc_m.points.sub(1);
                    player.tptc_m.hexes=player.tptc_m.hexes.add(1);
                    player.tptc_m.spellTimes[13]=new Decimal(60);
                },
                effect(){
                    if(player.tptc_m.spellTimes[13].lte(0))return new Decimal(1);
                    return layers.tptc_m.clickables[13].realEffect();
                },
                realEffect(){
                    let ret=Decimal.pow(1.1,Decimal.log10(player.tptc_m.points.add(1).mul(player.tptc_m.hexes.add(1)).max(1)).add(2).pow(0.3)).min(50000);
                    ret=ret.pow(tmp.tptc_mb.buyables[11].effect);
                    return ret;
                },
                display(){
                    return "将超级生成器基础值乘以"+format(layers.tptc_m.clickables[13].realEffect())+"倍\n\
                    持续时间: "+formatTime(player.tptc_m.spellTimes[13].max(0));
                },
                style: {'height':'160px','width':'200px'},
            },
            14: {
                title: "多树法术A",
                unlocked(){return player.tptc_mb.buyables[11].gte(3)},
                canClick(){return player.tptc_m.points.gte(1) && player.tptc_m.spellTimes[14].lte(0)},
                onClick(){
                    player.tptc_m.points=player.tptc_m.points.sub(1);
                    player.tptc_m.hexes=player.tptc_m.hexes.add(1);
                    player.tptc_m.spellTimes[14]=new Decimal(60);
                },
                effect(){
                    if(player.tptc_m.spellTimes[14].lte(0))return new Decimal(1);
                    return layers.tptc_m.clickables[14].realEffect();
                },
                realEffect(){
                    let ret=Decimal.pow(1.5,Decimal.log10(player.tptc_m.points.add(1).mul(player.tptc_m.hexes.add(1)).max(1)).add(2).pow(0.4));
                    ret=ret.pow(tmp.tptc_mb.buyables[11].effect);
                    return ret;
                },
                display(){
                    return "将声望升级第二行效果乘以"+format(layers.tptc_m.clickables[14].realEffect())+"倍\n\
                    持续时间: "+formatTime(player.tptc_m.spellTimes[14].max(0));
                },
                style: {'height':'160px','width':'200px'},
            },
            15: {
                title: "多树法术B",
                unlocked(){return hasUpgrade("tptc_m",12)},
                canClick(){return player.tptc_m.points.gte(1) && player.tptc_m.spellTimes[15].lte(0)},
                onClick(){
                    player.tptc_m.points=player.tptc_m.points.sub(1);
                    player.tptc_m.hexes=player.tptc_m.hexes.add(1);
                    player.tptc_m.spellTimes[15]=new Decimal(60);
                },
                effect(){
                    if(player.tptc_m.spellTimes[15].lte(0))return new Decimal(1);
                    return layers.tptc_m.clickables[15].realEffect();
                },
                realEffect(){
                    let ret=Decimal.pow(2,Decimal.log10(player.tptc_m.points.add(1).mul(player.tptc_m.hexes.add(1)).max(1)).add(2).pow(0.1));
                    if(hasUpgrade("tptc_p",42))ret=Decimal.pow(1.5,Decimal.log10(player.tptc_m.points.add(1).mul(player.tptc_m.hexes.add(1)).max(1)).add(2).pow(0.4));
                    ret=ret.pow(tmp.tptc_mb.buyables[11].effect);
                    return ret;
                },
                display(){
                    return "将声望升级32效果乘以"+format(layers.tptc_m.clickables[15].realEffect())+"倍\n\
                    持续时间: "+formatTime(player.tptc_m.spellTimes[15].max(0));
                },
                style: {'height':'160px','width':'200px'},
            },
            16: {
                title: "重写法术",
                unlocked(){return hasUpgrade("tptc_m",14)},
                canClick(){return player.tptc_m.points.gte(1) && player.tptc_m.spellTimes[16].lte(0)},
                onClick(){
                    player.tptc_m.points=player.tptc_m.points.sub(1);
                    player.tptc_m.hexes=player.tptc_m.hexes.add(1);
                    player.tptc_m.spellTimes[16]=new Decimal(60);
                },
                effect(){
                    if(player.tptc_m.spellTimes[16].lte(0))return new Decimal(1);
                    return layers.tptc_m.clickables[16].realEffect();
                },
                realEffect(){
                    let ret=Decimal.pow(1.5,Decimal.log10(player.tptc_m.points.add(1).mul(player.tptc_m.hexes.add(1)).max(1)).add(2).pow(0.2));
                    ret=ret.pow(tmp.tptc_mb.buyables[11].effect);
                    return ret;
                },
                display(){
                    return "将TPTR中法术的有效魔法乘以"+format(layers.tptc_m.clickables[16].realEffect())+"倍\n\
                    持续时间: "+formatTime(player.tptc_m.spellTimes[16].max(0));
                },
                style: {'height':'160px','width':'200px'},
            },
    },
    
        update(diff){
            for(var i in player.tptc_m.spellTimes){
                player.tptc_m.spellTimes[i]=player.tptc_m.spellTimes[i].sub(diff);
                if(player.tptc_ps.best.gte(1) && player.tptc_m.spellTimes[i].lte(0) && player.tptc_m.points.gte(1) && tmp.tptc_m.clickables[i] && tmp.tptc_m.clickables[i].unlocked){
                    player.tptc_m.points=player.tptc_m.points.sub(1);
                    player.tptc_m.hexes=player.tptc_m.hexes.add(1);
                    player.tptc_m.spellTimes[i]=new Decimal(60);
                }
            }
            if(hasUpgrade("tptc_m",11))player.tptc_m.hexes=player.tptc_m.hexes.add(upgradeEffect("tptc_m",11).mul(diff));
            if(hasUpgrade("tptc_m",13))player.tptr_m.hexes=player.tptr_m.hexes.add(upgradeEffect("tptc_m",13).mul(diff));
        },
    hexEff() {
        let eff = player.tptc_m.hexes.mul(20).add(1).pow(0.4);
        return eff;
    },
        upgrades: {
            rows: 1,
            cols: 5,
            11: {
                title: "魔法升级11",
                description(){
                    return "基于你的魔法获得符文。";
                },
                cost: new Decimal(1e6),
                unlocked() { return true; },
                effect() {
                    let ret=player.tptc_m.points.sqrt().add(1);
                    ret=ret.mul(tmp.tptc_l.lifePowerEff);
                    if(hasUpgrade("tptc_l",12))ret=ret.mul(tmp.tptc_l.buyables[12].effect);
                    return ret;
                },
                effectDisplay() { return "+"+format(this.effect())+"/秒" },
            },
            12: {
                title: "魔法升级12",
                description: "解锁一个新法术。",
                cost: new Decimal("ee5"),
                unlocked() { return hasUpgrade("tm",23); },
            },
            13: {
                title: "魔法升级13",
                description(){
                    return "再次基于你的魔法获得符文，但这次...是在TPTR中！";
                },
                cost: new Decimal("e6e6"),
                unlocked() { return hasUpgrade("tm",56); },
                effect() {
                    let ret=player.tptr_m.points.add(1);
                    if(ret.gte("e25000000"))ret = Decimal.pow(10,ret.log10().div(25000000).cbrt().mul(25000000));
                    return ret;
                },
                effectDisplay() { return "+"+format(this.effect())+"/秒" },
            },
            14: {
                title: "魔法升级14",
                description: "解锁一个新法术。",
                cost: new Decimal("e15e7"),
                unlocked() { return hasUpgrade("tm",56); },
            },
            15: {
                title: "魔法升级15",
                description: "法术3以降低的速率增强超级助推器。",
                cost: new Decimal("e3e9"),
                unlocked() { return hasUpgrade("tm",56); },
            },
        },
     passiveGeneration(){
         if(player.tptc_l.best.gte(1))return 1;
         return 0;
     },
     hotkeys: [
           {key: "M", description: "Shift+M: 魔法重置",
            onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==1}}
     ],
});

addLayer("tptc_ba", {
    name: "平衡能量层",
    symbol: "BA",
    position: 3,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        power: new Decimal(0),
        pos: new Decimal(0),
        neg: new Decimal(0),
    }},
    color: "#ebc88f",
    requires: function(){
        return new Decimal(1e5);
    },
    resource: "平衡能量",
    baseResource: "特质", 
    baseAmount() {return player.tptc_q.points},
    type: "normal",
    exponent: 0.35,
    row: 4,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(7)},
    branches: [["tptc_h",2],"tptc_q","tptc_ss"],
    effect() {
        let points1 = player.tptc_ba.points
        if (points1.gte(1e12)) points1 = points1.log10().pow(2).times(1e12/144).min(points1)
        let ret={
            power: points1.pow(0.2),
            pos: player.tptc_ba.points.pow(0.7),
            neg: player.tptc_ba.points.pow(0.65).times(0.4),
        }
        if(hasUpgrade("tptc_l",25)){
            ret.pos=ret.neg=player.tptc_ba.points;
        }
        ret.power=ret.power.mul(tmp.tptc_ba.posEff);
        ret.power=ret.power.mul(tmp.tptc_ba.negEff);
        return ret;
    },
    effectDescription() {
           let eff = this.effect();
           return "每秒生成"+format(eff.power)+"平衡能量，"+format(eff.pos)+"积极性，和"+format(eff.neg)+"消极性";
       },
    doReset(l){
            if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || l=="tptc_h" || l=="tptc_q" || l=="tptc_hb" || l=="tptc_ss" || l=="tptc_m" || l=="tptc_ba" || l=="tptc_ps" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_ba.best);
            layerDataReset("tptc_ba",["upgrades","milestones","challenges"]);
            player.tptc_ba.best=b;
        },
     tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
                        "milestones",
                    ["display-text",
                        function() {return '你有 ' + format(player.tptc_ba.power) + ' 平衡能量，将阻碍精神和特质获取乘以 ' + format(tmp.tptc_ba.baEff) },
                        {}],
                    ["display-text",
                        function() {return '你有 ' + format(player.tptc_ba.pos) + ' 积极性，将平衡能量获取乘以 ' + format(tmp.tptc_ba.posEff) },
                        {}],
                    ["display-text",
                        function() {return '你有 ' + format(player.tptc_ba.neg) + ' 消极性，将平衡能量获取乘以 ' + format(tmp.tptc_ba.negEff) },
                        {}],
                ],
    
    milestones: {
            0: {requirementDescription: "1点平衡能量",
                done() {return player[this.layer].best.gte(1)}, 
                effectDescription: "自动购买空间能量，空间能量重置不影响任何内容。自动购买增强器。自动购买太空建筑。",
            },
    },
        update(diff){
            player.tptc_ba.power=player.tptc_ba.power.add(tmp.tptc_ba.effect.power.mul(diff)).max(0);
            player.tptc_ba.pos=player.tptc_ba.pos.add(tmp.tptc_ba.effect.pos.mul(diff)).max(0);
            player.tptc_ba.neg=player.tptc_ba.neg.add(tmp.tptc_ba.effect.neg.mul(diff)).max(0);
        },
    baEff() {
        let eff = player.tptc_ba.power.add(1).pow(0.3);
        return eff;
    },
    posEff() {
        let eff = player.tptc_ba.pos.add(1).log10().add(1).pow(2);
        if(player.tptc_mb.buyables[12].gte(1))eff=eff.pow(buyableEffect("tptc_l",15));
        eff = eff.pow(tmp.tptr_ba.effect);
        return eff;
    },
    negEff() {
        let eff = player.tptc_ba.neg.add(1).log10().add(1).pow(2);
        if(player.tptc_mb.buyables[12].gte(1))eff=eff.pow(buyableEffect("tptc_l",15));
        eff = eff.pow(tmp.tptr_ba.effect);
        return eff;
    },
     passiveGeneration(){
         if(player.tptc_hs.best.gte(1))return 1;
         return 0;
     },
     hotkeys: [
           {key: "a", description: "A: 平衡重置",
            onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==1}}
     ],
});


addLayer("tptc_sp", {
    name: "超级声望层",
    symbol: "SP",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0)
    }},
    color: "#439ea3",
    requires: function(){
        return new Decimal("1e450");
    },
    resource: "超级声望点数",
    baseResource: "声望点数", 
    baseAmount() {return player.tptc_p.points},
    type: "normal",
    exponent: 0.02,
    row: 5,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(8)},
    branches: ["tptc_m","tptc_ba"],
    doReset(l){
            if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || l=="tptc_h" || l=="tptc_q" || l=="tptc_hb" || l=="tptc_ss" || l=="tptc_m" || l=="tptc_ba" || l=="tptc_ps" || l=="tptc_sp" || l=="tptc_l" || l=="tptc_hs" || l=="tptc_i" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_sp.best);
            layerDataReset("tptc_sp",["upgrades","milestones","challenges"]);
            player.tptc_sp.best=b;
        },
    milestones: {
            0: {requirementDescription: "1点超级声望点数",
                done() {return player[this.layer].best.gte(1)}, 
                effectDescription: "每秒获得100%的阻碍精神和特质获取。自动购买超级生成器，超级生成器重置不影响任何内容，可以批量购买超级生成器。",
            },
    },
        upgrades: {
            rows: 3,
            cols: 5,
            11: {
                title: "超级声望升级11",
                description(){
                    return "声望点数获取基于本树等级提升。";
                },
                cost: new Decimal(1),
                unlocked() { return true; },
                effect() {
                    let ret=Decimal.pow(2,player.tm.buyables[1].pow(2));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            12: {
                title: "超级声望升级12",
                description(){
                    return "点数获取基于你的超级声望点数提升。";
                },
                cost: new Decimal(1),
                unlocked() { return true; },
                effect() {
                    let base=1e10;
                    let ret = Decimal.pow(base,Decimal.log10(player.tptc_sp.points.mul(2).add(3)).pow(hasUpgrade("tptc_sp",32)?0.91:0.9));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            13: {
                title: "超级声望升级13",
                description(){
                    return "在树管理器中解锁一个新功能。";
                },
                cost: new Decimal(2),
                unlocked() { return true; },
            },
            21: {
                title: "超级声望升级21",
                description(){
                    return "每秒获得100%的超级声望点数获取。";
                },
                cost: new Decimal(1e75),
                unlocked() { return player.tm.buyables[1].gte(11); },
            },
            22: {
                title: "超级声望升级22",
                description(){
                    return "基于你的超级声望点数获得更多子空间。";
                },
                cost: new Decimal(1e200),
                unlocked() { return player.tm.buyables[1].gte(12); },
                effect() {
                    let base=1.1;
                    let ret = Decimal.pow(base,Decimal.log10(player.tptc_sp.points.add(1)).pow(0.75));
                    if(hasUpgrade("tptc_sp",31))ret=ret.pow(1.2);
                    if (ret.gte("1e21000000")) ret = Decimal.pow(10,ret.log10().div(2.1).log10().mul(3e6));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            23: {
                title: "超级声望升级23",
                description(){
                    return "声望点数获取基于你的超级声望点数提升。";
                },
                cost: new Decimal("1e1000"),
                unlocked() { return player.tm.buyables[1].gte(13); },
                effect() {
                    let base=1e10;
                    let ret = Decimal.pow(base,Decimal.log10(player.tptc_sp.points.mul(2).add(3)).pow(0.9));
                    if (ret.lte(player.tptc_sp.points.pow(2)) && hasUpgrade("tptc_sp",25)) ret = player.tptc_sp.points.pow(2);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            31: {
                title: "超级声望升级31",
                description: "超级声望升级22效果^1.2",
                cost: new Decimal("1e10000"),
                unlocked() { return player.tm.buyables[1].gte(16); },
            },
            32: {
                title: "超级声望升级32",
                description: "超级声望升级12效果更强",
                cost: new Decimal("e13e8"),
                unlocked() { return hasUpgrade("tm", 42); },
            },
            33: {
                title: "超级声望升级33",
                description: "声望升级12效果更强",
                cost: Decimal.pow(10,Math.sqrt(2e18)),
                unlocked() { return hasUpgrade("tm", 42); },
            },
            14: {
                title: "超级声望升级14",
                description: "声望升级第二行基础效果^1.25",
                cost: new Decimal("e15e8"),
                unlocked() { return hasUpgrade("tm", 42); },
            },
            24: {
                title: "超级声望升级24",
                description: "超级助推器更便宜。",
                cost: new Decimal("e18e8"),
                unlocked() { return hasUpgrade("tm", 42); },
            },
            34: {
                title: "超级声望升级34",
                description: "声望升级32基础效果^1.25",
                cost: new Decimal("e12e9"),
                unlocked() { return hasUpgrade("tm", 42); },
            },
            15: {
                title: "超级声望升级15",
                description: "声望升级第二行基础效果^1.25",
                cost: new Decimal("e26e10"),
                unlocked() { return hasUpgrade("tptr_hn", 31); },
            },
            25: {
                title: "超级声望升级25",
                description: "超级声望升级23效果更强",
                cost: new Decimal("e29e10"),
                unlocked() { return hasUpgrade("tptr_hn", 31); },
            },
            35: {
                title: "超级声望升级35",
                description: "声望升级32基础效果^1.25",
                cost: new Decimal("e75e10"),
                unlocked() { return hasUpgrade("tptr_hn", 31); },
            },
        },
     passiveGeneration(){
         if(hasUpgrade("tptc_sp",21))return 1;
         return 0;
     },
});


addLayer("tptc_ps", {
    name: "幻影灵魂层",
    symbol: "PS",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0)
    }},
    color: "#b38fbf",
    requires: function(){
        return new Decimal("1e50");
    },
    resource: "幻影灵魂",
    baseResource: "特质能量", 
    baseAmount() {return player.tptc_q.energy},
    type: "static",
    base: 1e10,
    exponent: 1.5,
    row: 4,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(9)},
    branches: [["tptc_h",3],["tptc_q",3]],
    gainMult(){
        let ret=new Decimal(1);
        if(player.tptc_i.buyables[11].gte(4))ret=ret.div(tmp.tptc_s.buyables[16].effect);
        if(player.tptc_mb.buyables[12].gte(2))ret=ret.div(tmp.tptc_l.buyables[16].effect);
        if(hasUpgrade("incrementy_g",35))ret=ret.div(upgradeEffect("incrementy_g",35));
        return ret;
    },
    effect() {
        let ret = player.tptc_ps.points;
        let base = new Decimal(4);
        if(player.tptc_ge.challenges[22])base = base.mul(tmp.tptc_ge.challenges[22].rewardEffect);
        base=base.mul(buyableEffect("tptc_mb",12));
        base=base.mul(tmp.tptr_ps.effect);
        ret = Decimal.pow(base,ret);
        return ret;
    },
    effectDescription() {
           let eff = this.effect();
           return "将生命能量获取乘以"+format(eff)+"倍";
       },
    doReset(l){
            if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || l=="tptc_h" || l=="tptc_q" || l=="tptc_hb" || l=="tptc_ss" || l=="tptc_m" || l=="tptc_ba" || l=="tptc_ps" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_ps.best);
            layerDataReset("tptc_ps",["upgrades","milestones","challenges"]);
            player.tptc_ps.best=b;
        },
    milestones: {
            0: {requirementDescription: "1个幻影灵魂",
                done() {return player[this.layer].best.gte(1)}, 
                effectDescription: "自动施放法术。",
            },
    },
     hotkeys: [
           {key: "P", description: "Shift+P: 幻影灵魂重置",
            onPress(){if (player.tm.currentTree==1 && canReset(this.layer)) doReset(this.layer)}, unlocked(){return player.tm.currentTree==1}}
     ],
     canBuyMax(){
         return player.tptc_i.best.gte(1);
     },autoPrestige(){
         return player.tptc_i.best.gte(1);
     },resetsNothing(){
         return player.tptc_i.best.gte(1);
     },
});


addLayer("tptc_l", {
    name: "生命精华层",
    symbol: "L",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        power: new Decimal(0)
    }},
    color: "#7fbf7f",
    requires: function(){
        return new Decimal(5e6);
    },
    resource: "生命精华",
    baseResource: "符文", 
    baseAmount() {return player.tptc_m.hexes},
    type: "normal",
    exponent: 0.15,
    row: 5,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(9)},
    branches: ["tptc_hb","tptc_m"],
    gainMult(){
        let ret=new Decimal(1);
        ret=ret.mul(tmp.tptc_mb.effect);
        return ret;
    },
    effect() {
        let ret = player.tptc_l.points;
        ret=ret.mul(tmp.tptc_ps.effect);
        if(player.tptc_i.buyables[11].gte(4))ret=ret.mul(tmp.tptc_s.buyables[17].effect);
        if(player.tptc_ge.challenges[31])ret=ret.mul(tmp.tptc_ge.challenges[31].rewardEffect);
        return ret;
    },
    effectDescription() {
           let eff = this.effect();
           return "每秒生成"+format(eff)+"生命能量";
       },
    doReset(l){
            if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || l=="tptc_h" || l=="tptc_q" || l=="tptc_hb" || l=="tptc_ss" || l=="tptc_m" || l=="tptc_ba" || l=="tptc_ps"  || l=="tptc_sp" || l=="tptc_l" || l=="tptc_hs" || l=="tptc_i" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_l.best);
            layerDataReset("tptc_l",["upgrades","milestones","challenges"]);
            player.tptc_l.best=b;
        },
    milestones: {
            0: {requirementDescription: "1点生命精华",
                done() {return player[this.layer].best.gte(1)}, 
                effectDescription: "自动购买超级助推器，超级助推器重置不影响任何内容，可以批量购买超级助推器。每秒获得100%的魔法获取。",
            },
    },
     update(diff){
         player.tptc_l.power = player.tptc_l.power.add(tmp.tptc_l.effect.times(diff)).max(0)
         if(hasUpgrade("tptc_l",11)){
             if(player.tptc_ps.points.gte(layers.tptc_l.buyables[11].cost())){
                 player.tptc_l.buyables[11]=player.tptc_ps.points.add(1);
             }
         }
         if(hasUpgrade("tptc_l",12)){
             if(player.tptc_ps.points.gte(layers.tptc_l.buyables[12].cost())){
                 if(hasUpgrade("tptc_l",21))player.tptc_l.buyables[12]=player.tptc_ps.points.add(1);
                 else player.tptc_l.buyables[12]=player.tptc_ps.points.root(1.1).div(1.5).floor().add(1);
             }
         }
         if(hasUpgrade("tptc_l",13)){
             if(player.tptc_ps.points.gte(layers.tptc_l.buyables[13].cost())){
                 if(hasUpgrade("tptc_l",24))player.tptc_l.buyables[13]=player.tptc_ps.points.add(1);
                 else player.tptc_l.buyables[13]=player.tptc_ps.points.root(1.2).div(2).floor().add(1);
             }
         }
         if(hasUpgrade("tptc_l",14)){
             if(player.tptc_ps.points.gte(layers.tptc_l.buyables[14].cost())){
                 if(hasUpgrade("tptc_l",23))player.tptc_l.buyables[14]=player.tptc_ps.points.add(1);
                 else player.tptc_l.buyables[14]=player.tptc_ps.points.root(1.2).floor().add(1);
             }
         }
         if(player.tptc_mb.buyables[12].gte(1)){
             if(player.tptc_ps.points.gte(layers.tptc_l.buyables[15].cost())){
                 if(hasUpgrade("tptc_l",22))player.tptc_l.buyables[15]=player.tptc_ps.points.add(1);
                 else player.tptc_l.buyables[15]=player.tptc_ps.points.div(2).floor().add(1);
             }
         }
         if(player.tptc_mb.buyables[12].gte(2)){
             if(player.tptc_ps.points.gte(layers.tptc_l.buyables[16].cost())){
                 player.tptc_l.buyables[16]=player.tptc_ps.points.root(1.4).div(2).floor().add(1);
             }
         }
         if(player.tptc_mb.buyables[12].gte(3)){
             if(player.tptc_ps.points.gte(layers.tptc_l.buyables[17].cost())){
                 player.tptc_l.buyables[17]=player.tptc_ps.points.root(1.5).floor().add(1);
             }
         }
     },
     tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
                    ["display-text",
                        function() {
                            return '你有 ' + format(player.tptc_l.power) + ' 生命能量，将魔法升级11效果乘以 ' + format(tmp.tptc_l.lifePowerEff);
                        },
                        {}],
                        "milestones",
                        "buyables",
                        "upgrades",
                ],
    lifePowerEff(){
        let ret=player.tptc_l.power.add(1).sqrt();
        return ret;
    },
        upgrades: {
            rows: 2,
            cols: 5,
            11: {
                title: "生命升级11",
                description: "解锁生命助推器1。",
                cost: new Decimal(300),
                unlocked() { return player.tm.buyables[1].gte(11); },
            },
            12: {
                title: "生命升级12",
                description: "解锁生命助推器2。",
                cost: new Decimal(1000),
                unlocked() { return player.tm.buyables[1].gte(12); },
            },
            13: {
                title: "生命升级13",
                description: "解锁生命助推器3。",
                cost: new Decimal(1e8),
                unlocked() { return player.tm.buyables[1].gte(13); },
            },
            14: {
                title: "生命升级14",
                description: "解锁生命助推器4。",
                cost: new Decimal(1e13),
                unlocked() { return player.tm.buyables[1].gte(14); },
            },
            15: {
                title: "生命升级15",
                description: "每秒获得100%的生命精华获取。",
                cost: new Decimal(1e30),
                unlocked() { return player.tm.buyables[1].gte(15); },
            },
            21: {
                title: "生命升级21",
                description: "生命助推器2更便宜。",
                cost: new Decimal("e569e6"),
                unlocked() { return hasUpgrade("tptr_hn",31); },
            },
            22: {
                title: "生命升级22",
                description: "生命助推器5更便宜。",
                cost: new Decimal("e599e6"),
                unlocked() { return hasUpgrade("tptr_hn",31); },
            },
            23: {
                title: "生命升级23",
                description: "生命助推器4更便宜且效果更强。",
                cost: new Decimal("e631e6"),
                unlocked() { return hasUpgrade("tptr_hn",31); },
            },
            24: {
                title: "生命升级24",
                description: "生命助推器3更便宜。",
                cost: new Decimal("e75e7"),
                unlocked() { return hasUpgrade("tptr_hn",31); },
            },
            25: {
                title: "生命升级25",
                description: "生命助推器5效果更强，且积极性/消极性获取更强。",
                cost: new Decimal("ee9"),
                unlocked() { return hasUpgrade("tptr_hn",31); },
            },
        },
        
    buyables: {
            rows: 1,
            cols: 7,
            11: {
                title: "生命助推器1",
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = x;
                    if(!hasUpgrade("tptc_l",11))return Infinity;
                    return cost
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "数量: "+formatWhole(player[this.layer].buyables[this.id])+"<br>"+
                    "下一个需要: "+formatWhole(data.cost)+"幻影灵魂<br>"+
                    "效果: 超级助推器基础值+"+format(data.effect);
                },
                effect(){
                    if(inChallenge("tptc_ge",31) || !hasUpgrade("tptc_l",11))return new Decimal(0);
                    let x=player[this.layer].buyables[this.id].mul(player.tptc_l.power.add(1).log10().add(1));
                    return x.pow(0.1).sub(1).div(5).max(0);
                },
                unlocked() { return hasUpgrade("tptc_l",11) }, 
                canAfford() {
                    return false;
                },
                buyMax() {},
                style: {'height':'222px','background-color':'#7fbf7f'},
            },
            12: {
                title: "生命助推器2",
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = x.mul(1.5).pow(1.1).floor();
                    if(!hasUpgrade("tptc_l",12))return Infinity;
                    if(hasUpgrade("tptc_l",21))return x;
                    return cost
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "数量: "+formatWhole(player[this.layer].buyables[this.id])+"<br>"+
                    "下一个需要: "+formatWhole(data.cost)+"幻影灵魂<br>"+
                    "效果: 符文获取"+format(data.effect)+"倍";
                },
                effect(){
                    if(inChallenge("tptc_ge",31) || !hasUpgrade("tptc_l",12))return new Decimal(1);
                    let x=player[this.layer].buyables[this.id].mul(player.tptc_l.power.add(1).log10().add(1));
                    return Decimal.pow(50,x.pow(0.5));
                },
                unlocked() { return hasUpgrade("tptc_l",12) }, 
                canAfford() {
                    return false;
                },
                buyMax() {},
                style: {'height':'222px','background-color':'#7fbf7f'},
            },
            13: {
                title: "生命助推器3",
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = x.mul(2).pow(1.2).floor();
                    if(!hasUpgrade("tptc_l",13))return Infinity;
                    if(hasUpgrade("tptc_l",24))return x;
                    return cost
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "数量: "+formatWhole(player[this.layer].buyables[this.id])+"<br>"+
                    "下一个需要: "+formatWhole(data.cost)+"幻影灵魂<br>"+
                    "效果: 超级空间能量获取"+format(data.effect)+"倍";
                },
                effect(){
                    if(inChallenge("tptc_ge",31) || !hasUpgrade("tptc_l",13))return new Decimal(1);
                    let x=player[this.layer].buyables[this.id].mul(player.tptc_l.power.add(1).log10().add(1));
                    return x.add(1).pow(1.5);
                },
                unlocked() { return hasUpgrade("tptc_l",13) }, 
                canAfford() {
                    return false;
                },
                buyMax() {},
                style: {'height':'222px','background-color':'#7fbf7f'},
            },
            14: {
                title: "生命助推器4",
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = x.pow(1.2).floor();
                    if(!hasUpgrade("tptc_l",14))return Infinity;
                    if(hasUpgrade("tptc_l",23))return x;
                    return cost
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "数量: "+formatWhole(player[this.layer].buyables[this.id])+"<br>"+
                    "下一个需要: "+formatWhole(data.cost)+"幻影灵魂<br>"+
                    "效果: 将H挑战'真正的声望树'奖励乘以"+format(data.effect)+"倍";
                },
                effect(){
                    if(inChallenge("tptc_ge",31) || !hasUpgrade("tptc_l",14))return new Decimal(1);
                    let x=player[this.layer].buyables[this.id].mul(player.tptc_l.power.add(1).log10().add(1));
                    if(hasUpgrade("tptc_l",23))return Decimal.pow(10,x.add(1).log10().pow(2.5));
                    return x.add(1).pow(0.5);
                },
                unlocked() { return hasUpgrade("tptc_l",14) }, 
                canAfford() {
                    return false;
                },
                buyMax() {},
                style: {'height':'222px','background-color':'#7fbf7f'},
            },
            15: {
                title: "生命助推器5",
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = x.mul(2).floor();
                    if(!player.tptc_mb.buyables[12].gte(1))return Infinity;
                    if(hasUpgrade("tptc_l",22))return x;
                    return cost
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "数量: "+formatWhole(player[this.layer].buyables[this.id])+"<br>"+
                    "下一个需要: "+formatWhole(data.cost)+"幻影灵魂<br>"+
                    "效果: 积极性&消极性效果^"+format(data.effect);
                },
                effect(){
                    if(inChallenge("tptc_ge",31) || player.tptc_mb.buyables[12].lt(1))return new Decimal(1);
                    let x=player[this.layer].buyables[this.id].mul(player.tptc_l.power.add(1).log10().add(1));
                    ret=x.add(1).pow(0.7);
                    if(hasUpgrade("tptc_l",25)){
                        if(ret.gte(Decimal.pow(2,16))){
                            ret=ret.log2().div(16).pow(0.82).mul(5).add(11);
                            ret=Decimal.pow(2,ret);
                        }
                    }else if(ret.gte(Decimal.pow(2,15))){
                        ret=ret.log2().div(15).pow(0.8).mul(5).add(10);
                        ret=Decimal.pow(2,ret);
                    }
                    return ret;
                },
                unlocked() { return player.tptc_mb.buyables[12].gte(1) }, 
                canAfford() {
                    return false;
                },
                buyMax() {},
                style: {'height':'222px','background-color':'#7fbf7f'},
            },
            16: {
                title: "生命助推器6",
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = x.mul(2).pow(1.4).floor();
                    if(!player.tptc_mb.buyables[12].gte(2))return Infinity;
                    return cost
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "数量: "+formatWhole(player[this.layer].buyables[this.id])+"<br>"+
                    "下一个需要: "+formatWhole(data.cost)+"幻影灵魂<br>"+
                    "效果: 幻影灵魂"+format(data.effect)+"倍更便宜";
                },
                effect(){
                    if(inChallenge("tptc_ge",31) || player.tptc_mb.buyables[12].lt(2))return new Decimal(1);
                    let x=player[this.layer].buyables[this.id].mul(player.tptc_l.power.add(1).log10().add(1));
                    return Decimal.pow(1e5,x.pow(0.75));
                },
                unlocked() { return player.tptc_mb.buyables[12].gte(2) }, 
                canAfford() {
                    return false;
                },
                buyMax() {},
                style: {'height':'222px','background-color':'#7fbf7f'},
            },
            17: {
                title: "生命助推器7",
                cost(x=player[this.layer].buyables[this.id]) {
                    let cost = x.pow(1.5).floor();
                    if(!player.tptc_mb.buyables[12].gte(3))return Infinity;
                    return cost
                },
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "数量: "+formatWhole(player[this.layer].buyables[this.id])+"<br>"+
                    "下一个需要: "+formatWhole(data.cost)+"幻影灵魂<br>"+
                    "效果: 将声望升级第二行效果乘以"+format(data.effect)+"倍";
                },
                effect(){
                    if(inChallenge("tptc_ge",31) || player.tptc_mb.buyables[12].lt(3))return new Decimal(1);
                    let x=player[this.layer].buyables[this.id].mul(player.tptc_l.power.add(1).log10().add(1));
                    let ret=Decimal.pow(1.25,x.pow(0.4));
                    if(player.tptc_ge.challenges[11])ret=ret.pow(tmp.tptc_ge.challenges[11].rewardEffect);
                    return ret;
                },
                unlocked() { return player.tptc_mb.buyables[12].gte(3) }, 
                canAfford() {
                    return false;
                },
                buyMax() {},
                style: {'height':'222px','background-color':'#7fbf7f'},
            },
    },
    passiveGeneration(){
        if(hasUpgrade("tptc_l",15))return 1;
        return 0;
    }
});

addLayer("tptc_hs", {
    name: "超空间层",
    symbol: "HS",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0)
    }},
    color: "white",
    requires: function(){
        return new Decimal(27);
    },
    resource: "超空间能量",
    baseResource: "空间能量", 
    baseAmount() {return player.tptc_s.points},
    type: "normal",
    exponent: 20,
    row: 5,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(10)},
    branches: ["tptc_ss","tptc_ba"],
    gainMult(){
        let ret=new Decimal(1);
        if(hasUpgrade("tptc_l",13))ret=ret.mul(buyableEffect("tptc_l",13));
        ret=ret.mul(tmp.tptc_mb.effect);
        return ret;
    },
    doReset(l){
            if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || l=="tptc_h" || l=="tptc_q" || l=="tptc_hb" || l=="tptc_ss" || l=="tptc_m" || l=="tptc_ba" || l=="tptc_ps"  || l=="tptc_sp" || l=="tptc_l" || l=="tptc_hs" || l=="tptc_i" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_hs.best);
            if(player.tptc_mb.best.gte(6))layerDataReset("tptc_hs",["upgrades","milestones","challenges","buyables"]);
            else layerDataReset("tptc_hs",["upgrades","milestones","challenges"]);
            player.tptc_hs.best=b;
        },
    milestones: {
            0: {requirementDescription: "1点超空间能量",
                done() {return player[this.layer].best.gte(1)}, 
                effectDescription: "自动购买子空间能量，子空间能量重置不影响任何内容，可以批量购买子空间能量。自动购买特质层。每秒获得100%的平衡能量获取。",
            },
    },
        
    usedHS() {
        return player[this.layer].buyables[11].add(player[this.layer].buyables[12]).add(player[this.layer].buyables[13]).add(player[this.layer].buyables[14]).add(player[this.layer].buyables[15]).add(player[this.layer].buyables[16]).add(player[this.layer].buyables[17]).add(player[this.layer].buyables[18]);
    },
    realBuildLimit(){
        let ret=new Decimal(player.tm.buyables[1]).sqrt().mul(3).sub(5.6);
        if(hasUpgrade("tptc_hs",21))ret=new Decimal(3).add(player.tptc_hs.upgrades.length);
        if(hasUpgrade("tptc_hs",11))ret=ret.add(upgradeEffect("tptc_hs",11));
        if(hasUpgrade("tptc_hs",12))ret=ret.add(upgradeEffect("tptc_hs",12));
        if(hasUpgrade("tptc_i",11))ret=ret.add(upgradeEffect("tptc_i",11));
        if(player.tptc_mb.buyables[13].gte(2))ret=ret.add(buyableEffect("tptc_ma",12));
        return ret;
    },
    buildLimit(){
        let ret=layers.tptc_hs.realBuildLimit().floor();
        return ret;
    },
     tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
                        "milestones",
                    ["buyables",1],
                    ["display-text",function(){return "超建筑限制: "+formatWhole(tmp.tptc_hs.buildLimit)+", 升级进度: "+format(tmp.tptc_hs.realBuildLimit.sub(tmp.tptc_hs.buildLimit).mul(100))+"%"}],
                    ["display-text",function(){if(player.tm.buyables[1].lt(20))return "升级树来增加进度。";return "";}],
                    ["display-text",function(){return "已使用 "+formatWhole(tmp.tptc_hs.usedHS)+" 超空间点"}],
                    ["buyables",2],
                        "buyables","upgrades"
                ],
                
    buyables: {
            rows: 1,
            cols: 8,
            1: {
                title: "超空间", 
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = Decimal.pow(2, x.pow(1.3));
                    if(hasUpgrade("tptc_hs",14))cost=cost.pow(0.7);
                    return cost
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "你有"+format(player.tptc_hs.buyables[1])+"超空间点<br>"+
                    "下一个成本: "+format(data.cost)+" 超空间能量";
                },
                unlocked() { return player[this.layer].unlocked }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost);
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, 
                style: {'height':'222px'},
            },
            2: {
                title: "重置超空间建筑",
                display() { 
                    return "";
                },
                unlocked() { return player[this.layer].unlocked }, 
                canAfford() {
                    return true;
                },
                buy() { 
                    if(confirm("这将强制重置超空间！确定吗？")){
                        player[this.layer].buyables[11]=new Decimal(0);
                        player[this.layer].buyables[12]=new Decimal(0);
                        player[this.layer].buyables[13]=new Decimal(0);
                        player[this.layer].buyables[14]=new Decimal(0);
                        player[this.layer].buyables[15]=new Decimal(0);
                        player[this.layer].buyables[16]=new Decimal(0);
                        player[this.layer].buyables[17]=new Decimal(0);
                        player[this.layer].buyables[18]=new Decimal(0);
                        doReset("tptc_hs",true);
                    }
                },
                buyMax() {}, 
                style: {'height':'60px'},
            },
            11: {
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "超建筑1<br>"+
                    "等级: "+format(player.tptc_hs.buyables[11])+"/"+format(tmp.tptc_hs.buildLimit)+"<br>"+
                    "效果: 太空建筑1效果^"+format(data.effect)+"<br>";
                },
                unlocked() { return player[this.layer].unlocked }, 
                canAfford() {
                    return layers[this.layer].usedHS().lt(player.tptc_hs.buyables[1]) && player.tptc_hs.buyables[this.id].lt(tmp.tptc_hs.buildLimit);
                },
                effect(){
                    if(inChallenge("tptc_ge",32))return new Decimal(1);
                    let x=player[this.layer].buyables[this.id];
                    if(player.tptc_ge.challenges[32])x=x.mul(tmp.tptc_ge.challenges[32].rewardEffect);
                    return x.mul(0.2).add(1);
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, 
                style: {'height':'120px','width':'120px'},
            },
            12: {
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "超建筑2<br>"+
                    "等级: "+format(player.tptc_hs.buyables[12])+"/"+format(tmp.tptc_hs.buildLimit)+"<br>"+
                    "效果: 太空建筑2效果^"+format(data.effect)+"<br>";
                },
                unlocked() { return player[this.layer].unlocked }, 
                canAfford() {
                    return layers[this.layer].usedHS().lt(player.tptc_hs.buyables[1]) && player.tptc_hs.buyables[this.id].lt(tmp.tptc_hs.buildLimit);
                },
                effect(){
                    if(inChallenge("tptc_ge",32))return new Decimal(1);
                    let x=player[this.layer].buyables[this.id];
                    if(player.tptc_ge.challenges[32])x=x.mul(tmp.tptc_ge.challenges[32].rewardEffect);
                    return x.mul(0.2).add(1);
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, 
                style: {'height':'120px','width':'120px'},
            },
            13: {
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "超建筑3<br>"+
                    "等级: "+format(player.tptc_hs.buyables[13])+"/"+format(tmp.tptc_hs.buildLimit)+"<br>"+
                    "效果: 太空建筑3效果^"+format(data.effect)+"<br>";
                },
                unlocked() { return player[this.layer].unlocked && player.tptc_i.buyables[11].gte(1) }, 
                canAfford() {
                    return layers[this.layer].usedHS().lt(player.tptc_hs.buyables[1]) && player.tptc_hs.buyables[this.id].lt(tmp.tptc_hs.buildLimit);
                },
                effect(){
                    if(inChallenge("tptc_ge",32))return new Decimal(1);
                    let x=player[this.layer].buyables[this.id];
                    if(player.tptc_ge.challenges[32])x=x.mul(tmp.tptc_ge.challenges[32].rewardEffect);
                    return x.mul(0.2).add(1);
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, 
                style: {'height':'120px','width':'120px'},
            },
            14: {
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "超建筑4<br>"+
                    "等级: "+format(player.tptc_hs.buyables[14])+"/"+format(tmp.tptc_hs.buildLimit)+"<br>"+
                    "效果: 太空建筑4效果^"+format(data.effect)+"<br>";
                },
                unlocked() { return player[this.layer].unlocked && player.tptc_i.buyables[11].gte(2) }, 
                canAfford() {
                    return layers[this.layer].usedHS().lt(player.tptc_hs.buyables[1]) && player.tptc_hs.buyables[this.id].lt(tmp.tptc_hs.buildLimit);
                },
                effect(){
                    if(inChallenge("tptc_ge",32))return new Decimal(1);
                    let x=player[this.layer].buyables[this.id];
                    if(player.tptc_ge.challenges[32])x=x.mul(tmp.tptc_ge.challenges[32].rewardEffect);
                    return x.mul(0.2).add(1);
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, 
                style: {'height':'120px','width':'120px'},
            },
            15: {
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "超建筑5<br>"+
                    "等级: "+format(player.tptc_hs.buyables[15])+"/"+format(tmp.tptc_hs.buildLimit)+"<br>"+
                    "效果: 太空建筑5效果^"+format(data.effect)+"<br>";
                },
                unlocked() { return player[this.layer].unlocked && player.tptc_i.buyables[11].gte(3) }, 
                canAfford() {
                    return layers[this.layer].usedHS().lt(player.tptc_hs.buyables[1]) && player.tptc_hs.buyables[this.id].lt(tmp.tptc_hs.buildLimit);
                },
                effect(){
                    if(inChallenge("tptc_ge",32))return new Decimal(1);
                    let x=player[this.layer].buyables[this.id];
                    if(player.tptc_ge.challenges[32])x=x.mul(tmp.tptc_ge.challenges[32].rewardEffect);
                    return x.mul(0.2).add(1);
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, 
                style: {'height':'120px','width':'120px'},
            },
            16: {
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "超建筑6<br>"+
                    "等级: "+format(player.tptc_hs.buyables[16])+"/"+format(tmp.tptc_hs.buildLimit)+"<br>"+
                    "效果: 太空建筑6效果^"+format(data.effect)+"<br>";
                },
                unlocked() { return player[this.layer].unlocked && player.tptc_i.buyables[11].gte(4) }, 
                canAfford() {
                    return layers[this.layer].usedHS().lt(player.tptc_hs.buyables[1]) && player.tptc_hs.buyables[this.id].lt(tmp.tptc_hs.buildLimit);
                },
                effect(){
                    let x=player[this.layer].buyables[this.id];
                    if(player.tptc_ge.challenges[32])x=x.mul(tmp.tptc_ge.challenges[32].rewardEffect);
                    return x.mul(0.2).add(1);
                },
                buy() { 
                    if(inChallenge("tptc_ge",32))return new Decimal(1);
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, 
                style: {'height':'120px','width':'120px'},
            },
            17: {
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "超建筑7<br>"+
                    "等级: "+format(player.tptc_hs.buyables[17])+"/"+format(tmp.tptc_hs.buildLimit)+"<br>"+
                    "效果: 太空建筑7效果^"+format(data.effect)+"<br>";
                },
                unlocked() { return player[this.layer].unlocked && player.tptc_i.buyables[11].gte(5) }, 
                canAfford() {
                    return layers[this.layer].usedHS().lt(player.tptc_hs.buyables[1]) && player.tptc_hs.buyables[this.id].lt(tmp.tptc_hs.buildLimit);
                },
                effect(){
                    if(inChallenge("tptc_ge",32))return new Decimal(1);
                    let x=player[this.layer].buyables[this.id];
                    if(player.tptc_ge.challenges[32])x=x.mul(tmp.tptc_ge.challenges[32].rewardEffect);
                    return x.mul(0.2).add(1);
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, 
                style: {'height':'120px','width':'120px'},
            },
            18: {
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    return "超建筑8<br>"+
                    "等级: "+format(player.tptc_hs.buyables[18])+"/"+format(tmp.tptc_hs.buildLimit)+"<br>"+
                    "效果: 太空建筑8效果乘以"+format(data.effect)+"倍<br>";
                },
                unlocked() { return player[this.layer].unlocked && player.tptc_i.buyables[11].gte(6) }, 
                canAfford() {
                    return layers[this.layer].usedHS().lt(player.tptc_hs.buyables[1]) && player.tptc_hs.buyables[this.id].lt(tmp.tptc_hs.buildLimit);
                },
                effect(){
                    if(inChallenge("tptc_ge",32))return new Decimal(1);
                    let x=player[this.layer].buyables[this.id];
                    if(player.tptc_ge.challenges[32])x=x.mul(tmp.tptc_ge.challenges[32].rewardEffect);
                    return x.mul(0.2).add(1);
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, 
                style: {'height':'120px','width':'120px'},
            },
    },
    
        upgrades: {
            rows: 2,
            cols: 5,
            11: {
                title: "超空间升级11",
                description: "生成器增加超建筑限制升级进度。",
                cost: new Decimal(2e4),
                unlocked() { return player.tm.buyables[1].gte(11); }, 
                effect() { 
                    let ret=Decimal.log10(player.tptc_g.points.add(1)).div(4);
                    return ret;
                },
                effectDisplay() { return "+"+format(this.effect().mul(100))+"%" }, 
            },
            12: {
                title: "超空间升级12",
                description: "超级生成器增加超建筑限制升级进度。",
                cost: new Decimal(1e6),
                unlocked() { return player.tm.buyables[1].gte(12); }, 
                effect() { 
                    let ret=Decimal.log10(player.tptc_sg.points.add(1)).pow(2).div(2.5);
                    if(hasUpgrade("tptc_sg",15))ret=ret.max(player.tptc_sg.points.pow(2).div(3000));
                    return ret;
                },
                effectDisplay() { return "+"+format(this.effect().mul(100))+"%" }, 
            },
            13: {
                title: "超空间升级13",
                description: "超空间能量增强子空间基础值。",
                cost: new Decimal(1e15),
                unlocked() { return player.tm.buyables[1].gte(13); }, 
                effect() { 
                    let ret = Decimal.log10(player.tptc_hs.points.add(1)).pow(0.5).div(1.5);
                    ret = ret.div(2).add(1);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" }, 
            },
            14: {
                title: "超空间升级14",
                description: "超空间成本^0.7",
                cost: new Decimal(1e18),
                unlocked() { return player.tm.buyables[1].gte(14); }, 
            },
            15: {
                title: "超空间升级15",
                description: "每秒获得100%的超空间能量获取。",
                cost: new Decimal(1e22),
                unlocked() { return player.tm.buyables[1].gte(15); }, 
            },
            21: {
                title: "超空间升级21",
                description: "超空间升级增加超建筑限制升级进度。",
                cost: new Decimal("4e449"),
                unlocked() { return hasUpgrade("tptr_hn",31); }, 
            },
            22: {
                title: "超空间升级22",
                description: "太空建筑9效果更强。",
                cost: new Decimal("1e453"),
                unlocked() { return hasUpgrade("tptr_hn",31); }, 
            },
            23: {
                title: "超空间升级23",
                description: "太空建筑9效果更强。",
                cost: new Decimal("1e460"),
                unlocked() { return hasUpgrade("tptr_hn",31); }, 
            },
            24: {
                title: "超空间升级24",
                description: "子空间增强太空建筑9。",
                cost: new Decimal("1e478"),
                unlocked() { return hasUpgrade("tptr_hn",31); }, 
            },
            25: {
                title: "超空间升级25",
                description: "子空间增强太空建筑10。",
                cost: new Decimal("1e497"),
                unlocked() { return hasUpgrade("tptr_hn",31); }, 
            },
        },
        update(diff){
        if(player.tptc_mb.best.gte(1)){
                var target=player.tptc_hs.points;
                if(hasUpgrade("tptc_hs",14))target=target.pow(1/0.7);
                target=target.add(1).log(2).pow(1/1.3).add(1).floor();
                if(target.gt(player.tptc_hs.buyables[1])){
                    player.tptc_hs.buyables[1]=target;
                }
         }
        },
    passiveGeneration(){
        if(hasUpgrade("tptc_hs",15))return 1;
        return 0;
    }
});

addLayer("tptc_i", {
    name: "帝国层",
    symbol: "I",
    position: 3,
    startData() { return {
        unlocked: false,
        points: new Decimal(0)
    }},
    color: "#e5dab7",
    requires: function(){
        return new Decimal(1e10);
    },
    resource: "帝国砖块",
    baseResource: "子空间", 
    baseAmount() {return player.tptc_ss.subspace},
    type: "static",
    base: new Decimal(1e10),
    exponent: 1.45,
    row: 5,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(13)},
    branches: ["tptc_ss","tptc_sg"],
    doReset(l){
            if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || l=="tptc_h" || l=="tptc_q" || l=="tptc_hb" || l=="tptc_ss" || l=="tptc_m" || l=="tptc_ba" || l=="tptc_ps"  || l=="tptc_sp" || l=="tptc_l" || l=="tptc_hs" || l=="tptc_i" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_i.best);
            if(player.tptc_mb.best.gte(6))layerDataReset("tptc_i",["upgrades","milestones","challenges","buyables"]);
            else layerDataReset("tptc_i",["upgrades","milestones","challenges"]);
            player.tptc_i.best=b;
        },
    milestones: {
            0: {requirementDescription: "1块帝国砖块",
                done() {return player[this.layer].best.gte(1)}, 
                effectDescription: "自动购买幻影灵魂，幻影灵魂重置不影响任何内容，可以批量购买幻影灵魂。",
            },
            1: {requirementDescription: "3块帝国砖块",
                done() {return player[this.layer].best.gte(3)}, 
                effectDescription: "可以批量购买帝国砖块，帝国砖块重置不影响任何内容。",
            },
    },
        
    buyables: {
            rows: 1,
            cols: 1,
            11: {
                title: "帝国建筑", 
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = Decimal.pow(2, x.pow(0.54));
                    if(player.tptc_mb.buyables[13].gte(1))cost=cost.div(buyableEffect("tptc_ma",11));
                    cost=cost.ceil();
                    return cost
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    let ret="等级: "+formatWhole(player.tptc_i.buyables[11])+"<br>"+
                    "成本: "+formatWhole(data.cost)+" 帝国砖块<br>"+
                    "已解锁 "+formatWhole(player.tptc_i.buyables[11].min(6))+" 新太空建筑"+(player.tptc_i.buyables[11].gte(6)?" (MAX)":"");
                    if(player.tptc_i.buyables[11].gte(6)||hasUpgrade("tptc_i",12)){
                        ret=ret+"<br>太空建筑1效果^"+format(tmp.tptc_i.buyables[11].effect[11])+((player.tptc_i.buyables[11].sub(6).toNumber()%8==0&&!hasUpgrade("tptc_i",12))?" (下一效果)":"");
                    }
                    if(player.tptc_i.buyables[11].gte(7)||hasUpgrade("tptc_i",12)){
                        ret=ret+"<br>太空建筑2效果^"+format(tmp.tptc_i.buyables[11].effect[12])+((player.tptc_i.buyables[11].sub(7).toNumber()%8==0&&!hasUpgrade("tptc_i",12))?" (下一效果)":"");
                    }
                    if(player.tptc_i.buyables[11].gte(8)||(hasUpgrade("tptc_i",12)&&player.tptc_i.buyables[11].gte(1))){
                        ret=ret+"<br>太空建筑3效果^"+format(tmp.tptc_i.buyables[11].effect[13])+((player.tptc_i.buyables[11].sub(8).toNumber()%8==0&&!hasUpgrade("tptc_i",12))?" (下一效果)":"");
                    }
                    if(player.tptc_i.buyables[11].gte(9)||(hasUpgrade("tptc_i",12)&&player.tptc_i.buyables[11].gte(2))){
                        ret=ret+"<br>太空建筑4效果^"+format(tmp.tptc_i.buyables[11].effect[14])+((player.tptc_i.buyables[11].sub(9).toNumber()%8==0&&!hasUpgrade("tptc_i",12))?" (下一效果)":"");
                    }
                    if(player.tptc_i.buyables[11].gte(10)||(hasUpgrade("tptc_i",12)&&player.tptc_i.buyables[11].gte(3))){
                        ret=ret+"<br>太空建筑5效果^"+format(tmp.tptc_i.buyables[11].effect[15])+((player.tptc_i.buyables[11].sub(10).toNumber()%8==0&&!hasUpgrade("tptc_i",12))?" (下一效果)":"");
                    }
                    if(player.tptc_i.buyables[11].gte(11)||(hasUpgrade("tptc_i",12)&&player.tptc_i.buyables[11].gte(4))){
                        ret=ret+"<br>太空建筑6效果^"+format(tmp.tptc_i.buyables[11].effect[16])+((player.tptc_i.buyables[11].sub(11).toNumber()%8==0&&!hasUpgrade("tptc_i",12))?" (下一效果)":"");
                    }
                    if(player.tptc_i.buyables[11].gte(12)||(hasUpgrade("tptc_i",12)&&player.tptc_i.buyables[11].gte(5))){
                        ret=ret+"<br>太空建筑7效果^"+format(tmp.tptc_i.buyables[11].effect[17])+((player.tptc_i.buyables[11].sub(12).toNumber()%8==0&&!hasUpgrade("tptc_i",12))?" (下一效果)":"");
                    }
                    if(player.tptc_i.buyables[11].gte(13)||(hasUpgrade("tptc_i",12)&&player.tptc_i.buyables[11].gte(6))){
                        ret=ret+"<br>太空建筑8效果乘以"+format(tmp.tptc_i.buyables[11].effect[18])+((player.tptc_i.buyables[11].sub(13).toNumber()%8==0&&!hasUpgrade("tptc_i",12))?" (下一效果)":"");
                    }
                    return ret;
                },
                effect() {
                    if(inChallenge("tptc_ge",21))return {
                            11: new Decimal(1),
                            12: new Decimal(1),
                            13: new Decimal(1),
                            14: new Decimal(1),
                            15: new Decimal(1),
                            16: new Decimal(1),
                            17: new Decimal(1),
                            18: new Decimal(1),
                    };
                    if(hasUpgrade("tptc_i",12))return {
                            11: player.tptc_i.buyables[11].div(75).add(1),
                            12: player.tptc_i.buyables[11].div(75).add(1),
                            13: player.tptc_i.buyables[11].div(75).add(1),
                            14: player.tptc_i.buyables[11].div(75).add(1),
                            15: player.tptc_i.buyables[11].div(75).add(1),
                            16: player.tptc_i.buyables[11].div(75).add(1),
                            17: player.tptc_i.buyables[11].div(75).add(1),
                            18: player.tptc_i.buyables[11].div(75).add(1),
                    };
                    let ret={
                            11: player.tptc_i.buyables[11].add(1).div(8).floor().mul(0.1).add(1),
                            12: player.tptc_i.buyables[11].add(0).div(8).floor().mul(0.1).add(1),
                            13: player.tptc_i.buyables[11].sub(1).div(8).floor().mul(0.1).add(1),
                            14: player.tptc_i.buyables[11].sub(2).div(8).floor().mul(0.1).add(1),
                            15: player.tptc_i.buyables[11].sub(3).div(8).floor().mul(0.1).add(1),
                            16: player.tptc_i.buyables[11].sub(4).div(8).floor().mul(0.1).add(1),
                            17: player.tptc_i.buyables[11].sub(5).div(8).floor().mul(0.1).add(1),
                            18: player.tptc_i.buyables[11].sub(6).div(8).floor().mul(0.1).add(1),
                    };
                    return ret;
                },
                unlocked() { return true; },
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost);
                },
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, 
                style: {'height':function(){
                        if(player.tptc_i.buyables[11].gte(hasUpgrade("tptc_i",12)?6:13))return '372px';
                        if(player.tptc_i.buyables[11].gte(hasUpgrade("tptc_i",12)?5:12))return '342px';
                        if(player.tptc_i.buyables[11].gte(hasUpgrade("tptc_i",12)?4:11))return '312px';
                        if(player.tptc_i.buyables[11].gte(hasUpgrade("tptc_i",12)?3:10))return '282px';
                        if(player.tptc_i.buyables[11].gte(hasUpgrade("tptc_i",12)?2:9))return '252px';
                        return '222px';
                    }
                },
            },
    },
        upgrades: {
            rows: 1,
            cols: 5,
            11: {
                title: "帝国升级11",
                description: "帝国砖块增加超建筑限制升级进度。",
                cost: new Decimal(7),
                unlocked() { return true; }, 
                effect() { 
                    let ret=Decimal.log10(player.tptc_i.points.add(1)).pow(2);
                    return ret;
                },
                effectDisplay() { return "+"+format(this.effect().mul(100))+"%" }, 
            },
            12: {
                title: "帝国升级12",
                description: "帝国建筑效果更强。",
                cost: new Decimal(4269),
                unlocked() { return true; }, 
            },
            13: {
                title: "帝国升级13",
                description: "帝国砖块增强机器能量获取。",
                cost: new Decimal(10000),
                unlocked() { return player.tm.buyables[1].gte(20); }, 
                effect() { 
                    let ret=player.tptc_i.points.add(1).pow(2);
                    return ret;
                },
                effectDisplay() { return "x"+format(this.effect().mul(100)) }, 
            },
        },
     canBuyMax(){
         return player.tptc_i.best.gte(3);
     },autoPrestige(){
         return player.tptc_mb.best.gte(1);
     },resetsNothing(){
         return player.tptc_i.best.gte(3);
     },
});


addLayer("tptc_mb", {
    name: "精通砖块层",
    symbol: "MB",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0)
    }},
    color: "#ff9f7f",
    nodeStyle() {return {
            "background": (player.tptc_mb.unlocked||canReset("tptc_mb"))?("radial-gradient(circle, rgba(255,100,100,1) 0%, rgba(255,159,127,1) 50%)"):"#bf8f8f" ,
        }},
    requires: function(){
        return new Decimal(10);
    },
    resource: "精通砖块",
    baseResource: "幻影灵魂", 
    baseAmount() {return player.tptc_ps.points},
    type: "static",
    base: new Decimal(1.2),
    exponent: new Decimal(0.85),
    row: 6,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(15)},
    branches: ["tptc_l",["tptc_ps",2]],
    effect() {
        let ret = Decimal.pow(100,player.tptc_mb.points);
        return ret;
    },
    effectDescription() { 
           let eff = this.effect();
           return "将生命精华和超空间能量获取乘以"+format(eff)+"倍";
       },
    doReset(l){
    if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || l=="tptc_h" || l=="tptc_q" || l=="tptc_hb" || l=="tptc_ss" || l=="tptc_m" || l=="tptc_ba" || l=="tptc_ps"  || l=="tptc_sp" || l=="tptc_l" || l=="tptc_hs" || l=="tptc_i" || l=="tptc_mb" || l=="tptc_ge" || l=="tptc_ma" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_mb.best);
            layerDataReset("tptc_mb",["upgrades","milestones","challenges"]);
            player.tptc_mb.best=b;
        },
        roundUpCost:true,
        
     tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
                        "milestones",
                    ["display-text",function(){if(player.tptc_mb.best.gte(33))return "";return "剩余精通砖块: "+formatWhole(player.tptc_mb.points.sub(tmp.tptc_mb.usedMB))+"/"+formatWhole(player.tptc_mb.points)}],
                    ["buyables",2],
                        "buyables","upgrades"
                ],
    milestones: {
            0: {requirementDescription: "1块精通砖块",
                done() {return player[this.layer].best.gte(1)}, 
                effectDescription: "自动购买超空间。自动购买帝国砖块。",
            },
            1: {requirementDescription: "3块精通砖块",
                done() {return player[this.layer].best.gte(3)}, 
                effectDescription: "在树管理器中解锁新功能。",
            },
            2: {requirementDescription: "6块精通砖块",
                done() {return player[this.layer].best.gte(6)}, 
                effectDescription: "超建筑和帝国建筑不会重置。",
            },
            3: {requirementDescription: "15块精通砖块",
                done() {return player[this.layer].best.gte(15)}, 
                effectDescription: "精通建筑1不消耗任何精通砖块。",
            },
            4: {requirementDescription: "33块精通砖块",
                done() {return player[this.layer].best.gte(33)}, 
                effectDescription: "精通建筑2不消耗任何精通砖块。",
            },
            5: {requirementDescription: "40块精通砖块",
                done() {return player[this.layer].best.gte(40)}, 
                effectDescription: "精通砖块重置不影响任何内容，可以批量购买精通砖块。",
            },
            6: {requirementDescription: "TPTC等级20 & TMT等级6",
                done() {return player.tm.buyables[0].gte(6) && player.tm.buyables[1].gte(20)}, 
                effectDescription: "树管理器中的新功能？",
            },
            7: {requirementDescription: "59块精通砖块",
                done() {return player[this.layer].best.gte(59)}, 
                effectDescription: "精通建筑2更便宜且效果更强。",
            },
            8: {requirementDescription: "66块精通砖块",
                done() {return player[this.layer].best.gte(66)}, 
                effectDescription: "精通建筑1效果更强。",
            },
            9: {requirementDescription: "79块精通砖块",
                done() {return player[this.layer].best.gte(79)}, 
                effectDescription: "自动购买精通砖块和精通建筑。精通建筑3更便宜且效果更强。",
            },
    },
    buyables: {
            rows: 1,
            cols: 3,
            2: {
                title: "重置精通建筑",
                display() { 
                    return "";
                },
                unlocked() { return player[this.layer].unlocked && player[this.layer].best.lt(79)}, 
                canAfford() {
                    return true;
                },
                buy() { 
                    if(confirm("这将强制重置精通！确定吗？")){
                        player[this.layer].buyables[11]=new Decimal(0);
                        player[this.layer].buyables[12]=new Decimal(0);
                        player[this.layer].buyables[13]=new Decimal(0);
                        doReset("tptc_mb",true);
                    }
                },
                buyMax() {}, 
                style: {'height':'60px'},
            },
            11: {
                title: "精通建筑1", 
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = x.plus(1);
                    return cost
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    let ret="等级: "+formatWhole(player.tptc_mb.buyables[11])+"<br>"+
                    "成本: "+formatWhole(data.cost)+" 未使用精通砖块<br>"+
                    "已解锁 "+formatWhole(player.tptc_mb.buyables[11].min(3))+" 新法术"+(player.tptc_mb.buyables[11].gte(3)?" (MAX)":" (下一级 "+formatWhole(data.nextat)+")");
                    if(player[this.layer].best.gte(15))ret="等级: "+formatWhole(player.tptc_mb.buyables[11])+"<br>"+
                    "需求: "+formatWhole(data.cost)+" 精通砖块<br>"+
                    "已解锁 "+formatWhole(player.tptc_mb.buyables[11].min(3))+" 新法术"+(player.tptc_mb.buyables[11].gte(3)?" (MAX)":" (下一级 "+formatWhole(data.nextat)+")");
                    if(player.tptc_mb.buyables[11].gte(3) || player[this.layer].best.gte(66)){
                        ret=ret+"<br>法术效果^"+format(data.effect);
                    }
                    return ret;
                },
                effect() {
                    let ret=player.tptc_mb.buyables[11].sub(3).max(0).mul(0.01).add(1);
                    if(player[this.layer].best.gte(66))ret=player.tptc_mb.buyables[11].max(0).mul(0.02).add(1);
                    return ret;
                },
                nextat() {
                    let ret=player.tptc_mb.buyables[11].add(1);
                    if(ret.gte(4))return new Decimal(9999);
                    return ret;
                },
                unlocked() { return true; }, 
                canAfford() {
                    if(player[this.layer].best.gte(15))return player[this.layer].points.gte(layers[this.layer].buyables[this.id].cost());
                    return player[this.layer].points.gte(layers[this.layer].buyables[this.id].cost().add(layers[this.layer].usedMB()));
                },
                buy() { 
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, 
                style: {'height':'222px'},
            },
            12: {
                title: "精通建筑2", 
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = x.mul(2).plus(3);
                    if(player[this.layer].best.gte(59))cost = x.plus(1);
                    return cost
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    let ret="等级: "+formatWhole(player.tptc_mb.buyables[12])+"<br>"+
                    "成本: "+formatWhole(data.cost)+" 未使用精通砖块<br>"+
                    "已解锁 "+formatWhole(player.tptc_mb.buyables[12].min(3))+" 新生命增强"+(player.tptc_mb.buyables[12].gte(3)?" (MAX)":" (下一级 "+formatWhole(data.nextat)+")");
                    if(player[this.layer].best.gte(33))ret="等级: "+formatWhole(player.tptc_mb.buyables[12])+"<br>"+
                    "需求: "+formatWhole(data.cost)+" 精通砖块<br>"+
                    "已解锁 "+formatWhole(player.tptc_mb.buyables[12].min(3))+" 新生命增强"+(player.tptc_mb.buyables[12].gte(3)?" (MAX)":" (下一级 "+formatWhole(data.nextat)+")");
                    if(player.tptc_mb.buyables[12].gte(3) || player[this.layer].best.gte(59)){
                        ret=ret+"<br>幻影灵魂基础值乘以"+format(data.effect);
                    }
                    return ret;
                },
                effect() {
                    let ret=player.tptc_mb.buyables[12].sub(3).max(0).pow(0.2).add(1);
                    if(player[this.layer].best.gte(59))ret=player.tptc_mb.buyables[12].max(0).add(1);
                    return ret;
                },
                nextat() {
                    let ret=player.tptc_mb.buyables[12].add(1);
                    if(ret.gte(4))return new Decimal(9999);
                    return ret;
                },
                unlocked() { return player.tm.buyables[1].gte(16); }, 
                canAfford() {
                    if(player[this.layer].best.gte(33))return player[this.layer].points.gte(layers[this.layer].buyables[this.id].cost());
                    return player[this.layer].points.gte(layers[this.layer].buyables[this.id].cost().add(layers[this.layer].usedMB()));
                },
                buy() { 
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, 
                style: {'height':'222px'},
            },
            13: {
                title: "精通建筑3", 
                cost(x=player[this.layer].buyables[this.id]) { 
                    let cost = x.mul(9).plus(36);
                    if(player[this.layer].best.gte(79))cost = x.plus(1);
                    return cost
                },
                display() { 
                    let data = tmp[this.layer].buyables[this.id]
                    let ret="等级: "+formatWhole(player.tptc_mb.buyables[13])+"<br>"+
                    "需求: "+formatWhole(data.cost)+" 精通砖块<br>"+
                    "已解锁 "+formatWhole(player.tptc_mb.buyables[13].min(5))+" 新机器"+(player.tptc_mb.buyables[13].gte(5)?" (MAX)":" (下一级 "+formatWhole(data.nextat)+")");
                    if(player[this.layer].best.gte(79)){
                        ret=ret+"<br>机器效果乘以"+format(data.effect);
                    }
                    return ret;
                },
                effect() {
                    if(!player[this.layer].best.gte(79))return new Decimal(1);
                    let ret=player.tptc_mb.buyables[13].max(0).add(1).log10().add(1);
                    return ret;
                },
                nextat() {
                    let ret=player.tptc_mb.buyables[13].add(1);
                    if(ret.gte(6))return new Decimal(9999);
                    return ret;
                },
                unlocked() { return player.tm.buyables[1].gte(19); }, 
                canAfford() {
                    return player[this.layer].points.gte(layers[this.layer].buyables[this.id].cost());
                },
                buy() { 
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, 
                style: {'height':'222px'},
            },
    },
    usedMB() {
        let ret=player[this.layer].buyables[11].mul(player[this.layer].buyables[11].add(1)).div(2);
        if(player[this.layer].best.gte(15))ret=new Decimal(0);
        ret=ret.add(player[this.layer].buyables[12].mul(player[this.layer].buyables[12].add(2)));
        if(player[this.layer].best.gte(33))ret=new Decimal(0);
        return ret;
    },
     canBuyMax(){
         return player.tptc_mb.best.gte(40);
     },autoPrestige(){
         return player.tptc_mb.best.gte(79);
     },resetsNothing(){
         return player.tptc_mb.best.gte(40);
     },update(diff){
         if(player.tptc_mb.best.gte(79)){
             player[this.layer].buyables[11]=player[this.layer].buyables[12]=player[this.layer].buyables[13]=player[this.layer].points;
         };
     }
});

// 机械挑战数据
var getMechanicalChallenges=function() {
    let mechanicalChallenges={
        rows: 11,
        cols: 2,
        11: {
            name: "机械挑战A",
            completionLimit: 1,
            challengeDescription() {
                if(player.tm.buyables[1].gte(19)){
                    return "点数增益倍数升级和其他树的可购买项效果^"+format(tmp.tptc_ge.c11pow,3);
                }
                return "点数增益倍数升级和其他树的可购买项效果^0.001";
            },
            unlocked() { return player.tptc_ge.unlocked },
            goal: new Decimal("1e200000"),
            currencyDisplayName: "声望点数",
            currencyInternalName: "points",
            currencyLayer: "tptc_p",
            rewardEffect() {
                let ret = player.tptc_ge.points.add(1).log10().add(1).log10().pow(0.75).mul(3);
                let pcs=player.tptc_ge.challenges[41]+player.tptc_ge.challenges[42]+player.tptc_ge.challenges[52]+player.tptc_ge.challenges[71]+player.tptc_ge.challenges[91];
                ret=ret.mul(pcs*0.2+player.tptc_ge.challenges[112]*0.4+1).add(1);
                return ret;
            },
            rewardDisplay() { 
                return "生命助推器7效果^"+format(this.rewardEffect()); 
            },
            rewardDescription() { 
                return "齿轮增强生命助推器7"
            },
        },
        12: {
            name: "机械挑战B",
            completionLimit: 1,
            challengeDescription() {
                return "超级助推器和超级生成器无效。";
            },
            unlocked() { return player.tptc_ge.unlocked },
            goal: new Decimal("1e391400"),
            currencyDisplayName: "声望点数",
            currencyInternalName: "points",
            currencyLayer: "tptc_p",
            rewardEffect() {
                let ret=player.tptc_ge.points.add(1).log10().add(1).log10().pow(0.5).mul(0.5);
                let pcs=player.tptc_ge.challenges[41]+player.tptc_ge.challenges[51]+player.tptc_ge.challenges[61]+player.tptc_ge.challenges[72]+player.tptc_ge.challenges[92];
                ret=ret.mul(pcs*0.05+player.tptc_ge.challenges[112]*0.1+1).add(1);
                return ret;
            },
            rewardDisplay() { 
                return "SB/SG效果基础值乘以"+format(this.rewardEffect()); 
            },
            rewardDescription() { 
                return "齿轮增强SB/SG效果基础值"
            },
        },
        21: {
            name: "机械挑战C",
            completionLimit: 1,
            challengeDescription() {
                return "无法获得子空间。帝国建筑超过6级无效。";
            },
            unlocked() { return player.tptc_ge.unlocked },
            goal: new Decimal("1e990000"),
            currencyDisplayName: "声望点数",
            currencyInternalName: "points",
            currencyLayer: "tptc_p",
            rewardEffect() {
                let ret = new Decimal(1).add(player.tptc_ge.points.add(1).log10().add(1).log10()).mul(player.tptc_i.points.add(1).log10());
                let pcs=player.tptc_ge.challenges[42]+player.tptc_ge.challenges[51]+player.tptc_ge.challenges[62]+player.tptc_ge.challenges[81]+player.tptc_ge.challenges[101];
                ret=ret.pow(pcs*6+player.tptc_ge.challenges[112]*12+6).add(1);
                return ret;
            },
            rewardDisplay() { 
                return "子空间效果基础值乘以"+format(this.rewardEffect()); 
            },
            rewardDescription() { 
                return "齿轮和帝国砖块增强子空间效果基础值"
            },
        },
        22: {
            name: "机械挑战D",
            completionLimit: 1,
            challengeDescription() {
                return "特质层无效。";
            },
            unlocked() { return player.tptc_ge.unlocked },
            goal: new Decimal("1e1355000"),
            currencyDisplayName: "声望点数",
            currencyInternalName: "points",
            currencyLayer: "tptc_p",
            rewardEffect() {
                let ret=player.tptc_ge.points.add(1).log10().add(1).log10().pow(0.5).mul(0.5);
                let pcs=player.tptc_ge.challenges[52]+player.tptc_ge.challenges[61]+player.tptc_ge.challenges[62]+player.tptc_ge.challenges[82]+player.tptc_ge.challenges[102];
                ret=ret.mul(pcs*0.5+player.tptc_ge.challenges[112]+1).add(1);
                return ret;
            },
            rewardDisplay() { 
                return "特质层和幻影灵魂基础值乘以"+format(this.rewardEffect()); 
            },
            rewardDescription() { 
                return "齿轮增强特质层和幻影灵魂基础值"
            },
        },
        31: {
            name: "机械挑战E",
            completionLimit: 1,
            challengeDescription() {
                return "生命助推器无效。";
            },
            unlocked() { return player.tptc_ge.unlocked },
            goal: new Decimal("1e1585000"),
            currencyDisplayName: "声望点数",
            currencyInternalName: "points",
            currencyLayer: "tptc_p",
            rewardEffect() {
                let ret = player.tptc_ge.points.add(1).pow(2);
                let pcs=player.tptc_ge.challenges[71]+player.tptc_ge.challenges[72]+player.tptc_ge.challenges[81]+player.tptc_ge.challenges[82]+player.tptc_ge.challenges[111];
                ret=ret.pow(pcs*0.1+player.tptc_ge.challenges[112]*0.2+1);
                return ret;
            },
            rewardDisplay() { 
                return "生命能量获取乘以"+format(this.rewardEffect()); 
            },
            rewardDescription() { 
                return "齿轮增强生命能量获取"
            },
        },
        32: {
            name: "机械挑战F",
            completionLimit: 1,
            challengeDescription() {
                return "超建筑无效。";
            },
            unlocked() { return player.tptc_ge.unlocked },
            goal: new Decimal("1e1800000"),
            currencyDisplayName: "声望点数",
            currencyInternalName: "points",
            currencyLayer: "tptc_p",
            rewardEffect() {
                let ret = player.tptc_ge.points.add(1).log10().add(1).log10().pow(0.5).mul(0.1);
                let pcs=player.tptc_ge.challenges[91]+player.tptc_ge.challenges[92]+player.tptc_ge.challenges[101]+player.tptc_ge.challenges[102]+player.tptc_ge.challenges[111];
                ret=ret.mul(pcs*0.05+player.tptc_ge.challenges[112]*0.1+1).add(1);
                return ret;
            },
            rewardDisplay() { 
                return "超建筑效果增强"+format(this.rewardEffect())+"倍"; 
            },
            rewardDescription() { 
                return "齿轮增强超建筑"
            },
        },
        112: {
            name: "元机械挑战",
            completionLimit: 1,
            challengeDescription: "所有机械挑战同时生效",
            unlocked() { return player.tm.buyables[1].gte(18);},
            goal: new Decimal("1e810000"),
            currencyDisplayName: "声望点数",
            currencyInternalName: "points",
            currencyLayer: "tptc_p",
            rewardDescription: "增强所有机械挑战的奖励",
            countsAs: [11,12,21,22,31,32]
        }
    };
    
    // 生成配对机械挑战
    let getPairedMechanicalChallenge=function(a,b){
        let ids=[[11,"A"],[12,"B"],[21,"C"],[22,"D"],[31,"E"],[32,"F"]];
        let ida=ids[a];
        let idb=ids[b];
        return {
            name: "配对机械挑战 "+ida[1]+idb[1],
            completionLimit: 1,
            challengeDescription: "机械挑战"+ida[1]+"和"+idb[1]+"同时生效",
            unlocked(){return player.tm.buyables[1].gte(18);},
            goal: mechanicalChallenges[ida[0]].goal.mul(mechanicalChallenges[idb[0]].goal),
            currencyDisplayName: "声望点数",
            currencyInternalName: "points",
            currencyLayer: "tptc_p",
            rewardDescription: "增强这些子挑战的奖励",
            countsAs: [ida[0],idb[0]]
        };
    }
    
    // 添加所有配对挑战
    mechanicalChallenges[41]=getPairedMechanicalChallenge(0,1);
    mechanicalChallenges[42]=getPairedMechanicalChallenge(0,2);
    mechanicalChallenges[51]=getPairedMechanicalChallenge(1,2);
    mechanicalChallenges[52]=getPairedMechanicalChallenge(0,3);
    mechanicalChallenges[61]=getPairedMechanicalChallenge(1,3);
    mechanicalChallenges[62]=getPairedMechanicalChallenge(2,3);
    mechanicalChallenges[71]=getPairedMechanicalChallenge(0,4);
    mechanicalChallenges[72]=getPairedMechanicalChallenge(1,4);
    mechanicalChallenges[81]=getPairedMechanicalChallenge(2,4);
    mechanicalChallenges[82]=getPairedMechanicalChallenge(3,4);
    mechanicalChallenges[91]=getPairedMechanicalChallenge(0,5);
    mechanicalChallenges[92]=getPairedMechanicalChallenge(1,5);
    mechanicalChallenges[101]=getPairedMechanicalChallenge(2,5);
    mechanicalChallenges[102]=getPairedMechanicalChallenge(3,5);
    mechanicalChallenges[111]=getPairedMechanicalChallenge(4,5);
    
    return mechanicalChallenges;
}

// 齿轮层
addLayer("tptc_ge", {
    name: "齿轮层",
    symbol: "GE",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0)
    }},
    color: "#bfbfbf",
    nodeStyle() {return {
            "background": (player.tptc_ge.unlocked||canReset("tptc_ge"))?("radial-gradient(circle, rgba(191,191,191,1) 0%, rgba(131,133,134,1) 100%)"):"#bf8f8f" ,
        }},
    requires: function(){
        return new Decimal("1e18000");
    },
    gainMult(){
        let ret=new Decimal(1);
        if(hasUpgrade("tptc_ma",12))ret=ret.mul(upgradeEffect("tptc_ma",12));
        return ret;
    },
    resource: "齿轮",
    baseResource: "超级声望点数", 
    baseAmount() {return player.tptc_sp.points},
    type: "normal",
    exponent: 0.002,
    row: 6,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(17)},
    branches: [["tptc_sp",2]],
    doReset(l){
            if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || l=="tptc_h" || l=="tptc_q" || l=="tptc_hb" || l=="tptc_ss" || l=="tptc_m" || l=="tptc_ba" || l=="tptc_ps" || l=="tptc_sp" || l=="tptc_l" || l=="tptc_hs" || l=="tptc_i" || l=="tptc_mb" || l=="tptc_ge" || l=="tptc_ma" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_ge.best);
            layerDataReset("tptc_ge",["upgrades","milestones","challenges"]);
            player.tptc_ge.best=b;
        },
    
    challenges:getMechanicalChallenges(),
    
    milestones: {
            0: {
                requirementDescription: "TPTC等级19",
                done() {return player.tm.buyables[1].gte(19)}, 
                effectDescription: "每秒获得1000%的齿轮获取。解锁齿轮升级。",
            },
    },
    passiveGeneration(){
        if(player.tm.buyables[1].gte(19))return 10;
        return 0;
    },
    c11pow(){
        if(!hasUpgrade("tptc_ma",11))return new Decimal(0.001);
        return layers.tptc_ma.upgrades[11].effect();
    },
    
    upgrades: {
            rows: 1,
            cols: 5,
            11: {
                title: "齿轮升级11",
                description: "机器能量获取基于你的齿轮增强",
                cost: new Decimal("1e417"),
                unlocked() { return player.tm.buyables[1].gte(19) },
                effect(){
                    let b=player.tptc_ge.points.add(1).log10();
                    if(hasUpgrade("tptc_ge",12))b=b.pow(2);
                    if(hasUpgrade("tptc_ge",13))b=b.pow(2);
                    if(hasUpgrade("tptc_ge",14))b=b.pow(2);
                    return b;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            12: {
                title: "齿轮升级12",
                description: "齿轮升级11效果^2",
                cost: new Decimal("1e438"),
                unlocked() { return player.tm.buyables[1].gte(19) },
            },
            13: {
                title: "齿轮升级13",
                description: "齿轮升级11效果^2",
                cost: new Decimal("1e470"),
                unlocked() { return player.tm.buyables[1].gte(19) },
            },
            14: {
                title: "齿轮升级14",
                description: "齿轮升级11效果^2",
                cost: new Decimal("ee9"),
                unlocked() { return player.tm.buyables[1].gte(19) },
            },
    },
});

// 机器能量层
addLayer("tptc_ma", {
    name: "机器能量层",
    symbol: "MA",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0)
    }},
    color: "#9f9f9f",
    nodeStyle() {return {
            "background": (player.tptc_ge.unlocked||canReset("tptc_ge"))?("radial-gradient(circle, rgba(112,109,109,1) 0%, rgba(159,159,159,1) 100%)"):"#bf8f8f" ,
        }},
    requires: function(){
        return new Decimal("1e100");
    },
    gainMult(){
        let ret=new Decimal(1);
        if(hasUpgrade("tptc_ge",11))ret=ret.mul(upgradeEffect("tptc_ge",11));
        if(hasUpgrade("tptc_i",13))ret=ret.mul(upgradeEffect("tptc_i",13));
        if(player.tptc_mb.buyables[13].gte(3))ret=ret.mul(buyableEffect("tptc_ma",13));
        return ret;
    },
    resource: "机器能量",
    baseResource: "超空间能量", 
    baseAmount() {return player.tptc_hs.points},
    type: "normal",
    exponent: 0.01,
    row: 6,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==1 && player.tm.buyables[1].gte(19)},
    branches: ["tptc_hs","tptc_i"],
    doReset(l){
            if(l=="tptc_p" || l=="tptc_b" || l=="tptc_g" || l=="tptc_t" || l=="tptc_e" || l=="tptc_s" || l=="tptc_sb" || l=="tptc_sg" || l=="tptc_h" || l=="tptc_q" || l=="tptc_hb" || l=="tptc_ss" || l=="tptc_m" || l=="tptc_ba" || l=="tptc_ps" || l=="tptc_sp" || l=="tptc_l" || l=="tptc_hs" || l=="tptc_i" || l=="tptc_mb" || l=="tptc_ge" || l=="tptc_ma" || !l.startsWith("tptc_")){return;}
            var b=new Decimal(player.tptc_ge.best);
            layerDataReset("tptc_ma",["upgrades","milestones","challenges"]);
            player.tptc_ma.best=b;
        },
    
    upgrades: {
            rows: 1,
            cols: 5,
            11: {
                title: "机器能量升级11",
                description: "机械挑战A的削弱效果被机器能量削弱",
                cost: new Decimal(10),
                unlocked() { return true; },
                effect(){
                    if(player.tptc_ma.points.lte(0))return new Decimal(0.01);
                    let b=player.tptc_ma.points.add(1).log10().add(1).log10().add(1).log10().add(1).recip();
                    return Decimal.sub(1,b).pow(1.2);
                },
                effectDisplay() { return "^0.001 -> ^"+format(this.effect(),3) },
            },
            12: {
                title: "机器能量升级12",
                description: "齿轮获取基于机器能量增强",
                cost: new Decimal(1e4),
                unlocked() { return true; },
                effect(){
                    let ret=player.tptc_ma.points.add(1).pow(0.5);
                    ret=ret.mul(Decimal.pow(1.0003,player.tptc_ma.points).min(1e20));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
            13: {
                title: "机器能量升级13",
                description: "子空间获取基于机器能量增强",
                cost: new Decimal(5e6),
                unlocked() { return true; },
                effect(){
                    let ret=player.tptc_ma.points.add(1).pow(2.5);
                    ret=ret.mul(Decimal.pow(1.00002,player.tptc_ma.points).min(1e100));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"倍" },
            },
    },
    buyables: {
            rows: 1,
            cols: 5,
            11: {
                title: "机器1",
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "帝国建筑便宜"+format(data.effect)+"倍";
                },
                effect(){
                    if(player.tptc_mb.buyables[13].lt(1))return new Decimal(1);
                    let x=player.tptc_ma.points.add(1).log10().add(1);
                    return x.pow(0.2).mul(tmp.tptc_mb.buyables[13].effect);
                },
                unlocked() { return player.tptc_mb.buyables[13].gte(1) }, 
                canAfford() { return false; },
                buyMax() {},
                style: {'height':'222px','background-color':'#9f9f9f'},
            },
            12: {
                title: "机器2",
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "增加"+format(data.effect.mul(100))+"%超建筑限制进度";
                },
                effect(){
                    if(player.tptc_mb.buyables[13].lt(2))return new Decimal(0);
                    let x=player.tptc_ma.points.add(1).log10();
                    return x.pow(0.5).div(10).mul(tmp.tptc_mb.buyables[13].effect);
                },
                unlocked() { return player.tptc_mb.buyables[13].gte(2) }, 
                canAfford() { return false; },
                buyMax() {},
                style: {'height':'222px','background-color':'#9f9f9f'},
            },
            13: {
                title: "机器3",
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return format(data.effect)+"倍机器能量获取";
                },
                effect(){
                    if(player.tptc_mb.buyables[13].lt(3))return new Decimal(1);
                    let x=player.tptc_ma.points;
                    return x.pow(0.1).mul(tmp.tptc_mb.buyables[13].effect);
                },
                unlocked() { return player.tptc_mb.buyables[13].gte(3) }, 
                canAfford() { return false; },
                buyMax() {},
                style: {'height':'222px','background-color':'#9f9f9f'},
            },
            14: {
                title: "机器4",
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "声望升级第二行效果"+format(data.effect)+"倍";
                },
                effect(){
                    if(player.tptc_mb.buyables[13].lt(4))return new Decimal(1);
                    let x=player.tptc_ma.points;
                    return x.pow(10).mul(tmp.tptc_mb.buyables[13].effect);
                },
                unlocked() { return player.tptc_mb.buyables[13].gte(4) }, 
                canAfford() { return false; },
                buyMax() {},
                style: {'height':'222px','background-color':'#9f9f9f'},
            },
            15: {
                title: "机器5",
                display() {
                    let data = tmp[this.layer].buyables[this.id]
                    return "TPTR中重写点数获取"+format(data.effect)+"倍";
                },
                effect(){
                    if(player.tptc_mb.buyables[13].lt(5))return new Decimal(1);
                    let x=player.tptc_ma.points;
                    return x.pow(100).mul(tmp.tptc_mb.buyables[13].effect);
                },
                unlocked() { return player.tptc_mb.buyables[13].gte(5) }, 
                canAfford() { return false; },
                buyMax() {},
                style: {'height':'222px','background-color':'#9f9f9f'},
            },
    },
    
    milestones: {
            0: {
                requirementDescription: "TPTC等级20",
                done() {return player.tm.buyables[1].gte(20)}, 
                effectDescription: "每秒获得1000%的机器能量获取。",
            },
    },
    passiveGeneration(){
        if(player.tm.buyables[1].gte(20))return 10;
        return 0;
    },
});

