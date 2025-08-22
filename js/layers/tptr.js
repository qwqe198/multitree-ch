
// 声望层
addLayer("tptr_p", {
    name: "声望层",
    symbol: "P",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#31aeb0",
    requires(){
        if(hasUpgrade("tptc_p",34))return new Decimal(1);
        return new Decimal(10);
    },
    resource: "声望点数",
    baseResource: "重写点数", 
    baseAmount() {return player.modpoints[7]},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        if(inChallenge("tptr_h",12))return new Decimal(0);
        ret = new Decimal(1)
        if(hasUpgrade("tptc_p",32))ret=ret.mul(upgradeEffect("tptc_p",32));
        if(player.tm.buyables[8].gte(1))ret=ret.mul(tmp.milestone_m.powerEffect[0]);
        
        if(hasUpgrade("tptr_p",21))ret=ret.mul(upgradeEffect("tptr_p",21));
        if(hasUpgrade("tptr_p",23))ret=ret.mul(upgradeEffect("tptr_p",23));
        if(hasUpgrade("tptr_p",41))ret=ret.mul(upgradeEffect("tptr_p",41));
        if(hasUpgrade("tptr_b",11))ret=ret.mul(upgradeEffect("tptr_b",11));
        if(hasUpgrade("tptr_g",11))ret=ret.mul(upgradeEffect("tptr_g",11));
        if(hasUpgrade("tptr_e",12))ret=ret.mul(upgradeEffect("tptr_e",12));
        if (player.tptr_t.unlocked) ret = ret.times(tmp.tptr_t.enEff);
        if(player.tptr_s.unlocked)ret=ret.mul(buyableEffect("tptr_s",11));
        if(player.tptr_e.unlocked)ret=ret.mul(buyableEffect("tptr_e",11).first);
        if (hasUpgrade("tptr_b", 31)) ret = ret.times(upgradeEffect("tptr_b", 31));
        return ret
    },
    gainExp() {
        if (hasUpgrade("tptr_p", 31))return  new Decimal(1.05);
        return new Decimal(1)
    },
    getResetGain() {
        if (tmp[this.layer].baseAmount.lt(tmp[this.layer].requires)) return new Decimal(0)
        let gain = tmp[this.layer].baseAmount.div(tmp[this.layer].requires).pow(tmp[this.layer].exponent).times(tmp[this.layer].gainMult).pow(tmp[this.layer].gainExp)
        
        // 软上限处理
        if (gain.gte(Decimal.pow(10,7e7/3))){
            let mult2 = tmp[this.layer].gainMult;
            let mult3 = new Decimal(1);
            if(player.tm.buyables[8].gte(1))mult2=mult2.div(tmp.milestone_m.powerEffect[0]);
            if(player.tm.buyables[8].gte(1))mult3=mult3.mul(tmp.milestone_m.powerEffect[0]);
            let gain2 = tmp[this.layer].baseAmount.div(tmp[this.layer].requires).pow(tmp[this.layer].exponent).times(mult2).pow(tmp[this.layer].gainExp);
            if(gain2.gte("ee7"))gain2 = gain2.mul("ee7").sqrt();
            if(gain2.gte("ee11"))gain2 = Decimal.pow(10,gain2.log10().mul(1e11).sqrt());
            gain2 = gain2.mul(mult3);
            gain = Decimal.max(Decimal.pow(10,7e7/3),gain2);
        }
        
        return gain.floor().max(0);
    },
    row: 0,
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",16)},
    upgrades: {
        rows: 4,
        cols: 4,
        11: {
            title: "开始",
            description(){
                return "每秒生成"+format(upgradeEffect("tptr_p",11))+"重写点数"
            },
            cost() { return new Decimal(0); },
            effect() {
                let ret = new Decimal(1);
                if(player.tptc_mb.buyables[13].gte(5))ret=ret.mul(buyableEffect("tptc_ma",15));
                
                if(hasUpgrade("tptr_p",12))ret=ret.mul(upgradeEffect("tptr_p",12));
                if(hasUpgrade("tptr_p",13))ret=ret.mul(upgradeEffect("tptr_p",13));
                if(hasUpgrade("tptr_p",22))ret=ret.mul(upgradeEffect("tptr_p",22));
                ret=ret.mul(tmp.tptr_b.effect[0]);
                ret=ret.mul(tmp.tptr_g.powerEff);
                if (player.tptr_t.unlocked) ret = ret.times(tmp.tptr_t.enEff);
                if(player.tptr_s.unlocked)ret=ret.mul(buyableEffect("tptr_s",11));
                if(player.tptr_q.unlocked)ret=ret.mul(tmp.tptr_q.enEff);
                
                if(hasUpgrade("incrementy_pi",25))ret=ret.mul(player.incrementy_p.points.add(1e3));
                else if(hasUpgrade("incrementy_p",34))ret=ret.mul(1e3);
                
                if(player.milestone_m.best.gte(7))ret=ret.mul((tmp.milestone_m.powerEffect[0]||new Decimal(1)).pow(player.tm.buyables[8].gte(10)?1:player.tm.buyables[8].gte(8)?0.7:player.milestone_m.best.gte(28)?0.6:player.milestone_m.best.gte(26)?0.5:player.tm.buyables[8].gte(6)?0.42:player.milestone_m.best.gte(20)?0.4:player.milestone_m.best.gte(19)?0.35:player.tm.buyables[8].gte(4)?(1/3):player.milestone_m.best.gte(15)?0.3:player.milestone_m.best.gte(9)?0.25:player.milestone_m.best.gte(8)?0.2:0.1));
                
                return ret;
            },
        },
        12: {
            title: "声望提升",
            description: "声望点数提升重写点数生成",
            cost() { return new Decimal(1); },
            effect() {
                let eff = player.tptr_p.points.plus(2).pow(0.5);
                if (hasUpgrade("tptr_g", 14)) eff = eff.pow(1.5);
                if (hasUpgrade("tptr_g", 24)) eff = eff.pow(1.4666667);
                let sc=new Decimal("1e3500");
                if (hasUpgrade("tptr_hn", 12)) sc = sc.mul(upgradeEffect("tptr_hn", 12));
                if(hasChallenge("tptr_h", 22) && eff.gte(sc))eff = Decimal.pow(10, eff.log10().root(new Decimal(2).sub((hasUpgrade("tptr_hn", 21)) ? upgradeEffect("tptr_hn", 21) : 0)).times(new Decimal(sc).log10().pow(Decimal.sub(1, new Decimal(2).sub((hasUpgrade("tptr_hn", 21)) ? upgradeEffect("tptr_hn", 21) : 0).pow(-1)))));
                else eff = eff.min(sc);
                if (hasUpgrade("tptr_p", 14)) eff = eff.pow(3);
                if (hasUpgrade("tptr_hn", 14)) eff = eff.pow(1.05);

                return eff;
            },
            unlocked() { return hasUpgrade("tptr_p", 11) },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        13: {
            title: "自我协同",
            description: "重写点数提升自身生成",
            cost() { return new Decimal(5); },
            effect() { 
                let eff = player.modpoints[7].plus(1).log10().pow(0.75).plus(1);
                if (hasUpgrade("tptr_p", 33)) eff = eff.pow(upgradeEffect("tptr_p", 33));
                if (hasUpgrade("tptr_g", 15)) eff = eff.pow(upgradeEffect("tptr_g", 15));
                if (hasUpgrade("tptr_hn", 13)) eff = eff.pow(upgradeEffect("tptr_hn", 13));
                return eff;
            },
            unlocked() { return hasUpgrade("tptr_p", 12) },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        14: {
            title: "声望强度",
            description: "<b>声望提升</b>效果立方(不受软上限影响)",
            cost() { return new Decimal("e64300000") },
            unlocked() { return hasUpgrade("tptr_hn", 11) },
        },

        21: {
            title: "更多声望",
            description() { return "声望点数获取增加80%" },
            cost() { return new Decimal(20); },
            effect() {
                let ret = new Decimal(1.8);
                return ret;
            },
            unlocked() { return player.tptr_b.best.gte(1)&&hasUpgrade("tptr_p", 11) },
        },
        22: {
            title: "升级力量",
            description: "重写点数生成基于已购买的声望升级更快",
            cost() { return new Decimal(75); },
            effect() {
                let eff = Decimal.pow(1.4, player.tptr_p.upgrades.length);
                if (hasUpgrade("tptr_p", 32)) eff = eff.pow(2);
                if (hasUpgrade("tptr_hn", 22)) eff = eff.pow(upgradeEffect("tptr_hn", 22))
                if (hasUpgrade("tptr_hn", 32)) eff = eff.pow(7);

                return eff;
            },
            unlocked() { return player.tptr_b.best.gte(1)&&hasUpgrade("tptr_p", 12) },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        23: {
            title: "反向声望提升",
            description: "声望点数获取基于重写点数提升",
            cost() { return new Decimal(5e3); },
            effect() {
                let eff = player.modpoints[7].plus(1).log10().cbrt().plus(1);
                if (hasUpgrade("tptr_p", 33)) eff = eff.pow(upgradeEffect("tptr_p", 33));
                if (hasUpgrade("tptr_g", 23)) eff = eff.pow(upgradeEffect("tptr_g", 23));
                if (hasUpgrade("tptr_hn", 23)) eff = eff.pow(upgradeEffect("tptr_hn", 23));

                return eff;
            },
            unlocked() { return player.tptr_b.best.gte(1)&&hasUpgrade("tptr_p", 13) },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        24: {
            title: "等离子能量",
            description: "Tachoclinal Plasma效果使用更好的公式",
            cost() { return new Decimal("e692e5") },
            unlocked() { return hasUpgrade("tptr_hn", 11) },
        },
        31: {
            title: "我们需要更多声望",
            description: "声望点数获取提升到1.05次方",
            cost() { return new Decimal(1e45); },
            unlocked() { return player.tm.buyables[7].gte(4); },
        },
        32: {
            title: "依然无用",
            description: "<b>升级力量</b>效果平方",
            cost() { return new Decimal("1e2800"); },
            unlocked() { return player.tm.buyables[7].gte(4); },
        },
        33: {
            title: "列领导者",
            description: "基于总声望点数增强以上两个升级",
            cost() { return new Decimal("1e2800"); },
            effect() { return player.tptr_p.total.plus(1).log10().plus(1).log10().div(5).plus(1).times(hasUpgrade("tptr_hn", 33) ? upgradeEffect("tptr_hn", 33) : 1) },
            effectDisplay() { return "^"+format(tmp.tptr_p.upgrades[33].effect) },
            unlocked() { return player.tm.buyables[7].gte(4); },
        },
        34: {
            title: "太阳潜力",
            description: "太阳性乘以太阳性获取指数",
            cost() { return new Decimal("e126e6"); },
            unlocked() { return hasUpgrade("tptr_hn", 11) },
            effect() { return player.tptr_o.points.plus(1).log10().plus(1).log10().plus(1).log10().plus(1).times((hasUpgrade("tptr_hn", 34)) ? upgradeEffect("tptr_hn", 34) : 1) },
            effectDisplay() { return format(tmp.tptr_p.upgrades[34].effect)+"倍" },
        },
        41: {
            title: "声望递归",
            description: "声望点数提升自身获取",
            cost() { return new Decimal("e67777777") },
            unlocked() { return hasUpgrade("tptr_hn", 11) },
            effect() { 
                let eff = Decimal.pow(10, player.tptr_p.points.plus(1).log10().pow(.8));
                if (hasUpgrade("tptr_hn", 41)) eff = eff.pow(upgradeEffect("tptr_hn", 41));
                return eff;
            },
            effectDisplay() { return format(tmp.tptr_p.upgrades[41].effect)+"倍" },
        },
        42: {
            title: "空间感知",
            description: "太空建筑成本增长减慢50%",
            cost() { return new Decimal("e84e6") },
            unlocked() { return hasUpgrade("tptr_hn", 11) },
        },
        43: {
            title: "助推潜力",
            description: "特质能量也影响助推效果",
            cost() { return new Decimal("e123e6") },
            unlocked() { return hasUpgrade("tptr_hn", 11) },
        },
        44: {
            title: "拼写词典",
            description: "基于助推器延迟前两个法术的软上限",
            cost() { return new Decimal("e118e6") },
            unlocked() { return hasUpgrade("tptr_hn", 11) },
            effect() { return player.tptr_b.points.plus(1).pow(3) },
            effectDisplay() { return format(tmp.tptr_p.upgrades[44].effect)+"倍延迟" },
            style: {"font-size": "9px"},
        },
    },
    doReset(l){
        if(l=="tptr_p" || !l.startsWith("tptr_")){return;}
        layerDataReset("tptr_p",["upgrades","milestones","challenges"]);
        return;
    },
    effect() {
        let ret = player.tptr_p.points.add(1).pow(1000).mul("e1e5").min(Decimal.pow(2,player.tptr_p.points));
        return ret;
    },
    effectDescription() {
        let eff = this.effect();
        return "在TPTC中将声望点数获取提升"+format(eff)+"倍"
    },
    update(diff){
        if(hasUpgrade("tptr_p",11))player.modpoints[7]=player.modpoints[7].add(upgradeEffect("tptr_p",11).mul(diff));
    },
    passiveGeneration(){
        if(player.tptr_g.best.gte(10))return 1;
        return 0;
    },
});

// 助推器层
addLayer("tptr_b", {
    name: "助推器层",
    symbol: "B",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#6e64c4",
    requires(){
        if(hasUpgrade("tptc_p",34))return new Decimal(1);
        return new Decimal(200);
    },
    resource: "助推器",
    baseResource: "重写点数", 
    baseAmount() {return player.modpoints[7]},
    type: "static",
    branches: ["tptr_p"],
    exponent: 1.25,
    base: 5,
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade("tptr_b", 23)) mult = mult.div(upgradeEffect("tptr_b", 23));
        if (player.tptr_s.unlocked) mult = mult.div(buyableEffect("tptr_s", 13));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    getSc1(){
        let sc1=new Decimal(12);
        if(hasUpgrade("tptr_q",31))sc1=sc1.add(upgradeEffect("tptr_q",31));
        return sc1;
    },
    getResetGain() {
        let ret=getResetGain(this.layer,"static").add(player[this.layer].points);
        let sc1=layers[this.layer].getSc1();
        if(ret.gte(1000))ret=ret.div(sc1).sqrt().mul(sc1).div(1225).pow(0.1).mul(1225).floor().max(1000);
        return ret.sub(player[this.layer].points).max(1);
    },
    getNextAt(canMax) {
        if (!tmp[this.layer].canBuyMax) canMax = false
        let amt = player[this.layer].points.plus((canMax&&tmp[this.layer].baseAmount.gte(tmp[this.layer].nextAt))?tmp[this.layer].resetGain:0);
        let sc1=layers[this.layer].getSc1();
        if(amt.gte(1000))amt=amt.div(1225).pow(10).mul(1225).div(sc1).pow(2).mul(sc1).max(1000).ceil();
        let extraCost = Decimal.pow(tmp[this.layer].base, amt.pow(tmp[this.layer].exponent).div(tmp[this.layer].gainExp)).times(tmp[this.layer].gainMult)
        let cost = extraCost.times(tmp[this.layer].requires).max(tmp[this.layer].requires)
        return cost;
    },
    row: 1,
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",17)},
    doReset(l){
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_b.best);
        layerDataReset("tptr_b",["upgrades","milestones","challenges"]);
        player.tptr_b.best=b;
        return;
    },
    addToBase() {
        let base = new Decimal(0);
        if (hasUpgrade("tptr_b", 12)) base = base.plus(upgradeEffect("tptr_b", 12));
        if (hasUpgrade("tptr_b", 13)) base = base.plus(upgradeEffect("tptr_b", 13));
        if (hasUpgrade("tptr_t", 11)) base = base.plus(upgradeEffect("tptr_t", 11));
        if (hasUpgrade("tptr_e", 11)) base = base.plus(upgradeEffect("tptr_e", 11).b);
        if (player.tptr_e.unlocked) base = base.plus(buyableEffect("tptr_e",11).second);
        if (player.tptr_s.unlocked) base = base.plus(buyableEffect("tptr_s",12));
        if (hasUpgrade("tptr_t", 25)) base = base.plus(upgradeEffect("tptr_t", 25));
        return base;
    },
    effectBase() {
        let base = new Decimal(2);
        
        // 加法
        base = base.plus(layers.tptr_b.addToBase());
        
        // 乘法
        if (player.tptr_sb.unlocked) base = base.times(tmp.tptr_sb.effect[0]);
        if (hasUpgrade("tptr_q", 12)) base = base.times(upgradeEffect("tptr_q", 12))
        if (hasUpgrade("tptr_q", 34)) base = base.times(upgradeEffect("tptr_q", 34))
        
        if (player.tptr_m.unlocked) base = base.times(tmp.tptr_m.clickables[11].effect);
        return base.pow(tmp.tptr_b.power);
    },
    power() {
        let power = new Decimal(1);
        if (player.tptr_m.spellTimes[11].gt(0)) power = power.times(1.05);
        return power;
    },
    effect() {
        if(inChallenge("tptr_h",41))return [new Decimal(1),new Decimal(1)];
        let eff2 = player.tptr_b.points.add(1)
        if(hasChallenge("tptr_h",41))eff2 = Decimal.pow(1.03,player.tptr_b.points);
        if (hasUpgrade("tptc_b", 22))eff2 = Decimal.pow(1.1,player.tptr_b.points.div(2));
        if (hasUpgrade("tptc_b", 23))eff2 = Decimal.pow(1.2,player.tptr_b.points.div(2));
        if (hasUpgrade("tptc_b", 24))eff2 = Decimal.pow(1.3,player.tptr_b.points.div(2));
        if (hasUpgrade("tptc_b", 13))eff2 = eff2.pow(2)
        let ret = [Decimal.pow(tmp.tptr_b.effectBase, player.tptr_b.points).max(0).times(hasUpgrade("tptr_p", 43)?tmp.tptr_q.enEff:1), eff2];
        return ret;
    },
    effectDescription() {
        let eff = this.effect();
        return "将重写点数生成提升"+format(eff[0])+"倍，并在TPTC中将助推器基础值提升"+format(eff[1])+"倍"
    },
    update(diff){
    },
    
    upgrades: {
        rows: 1,
        cols: 4,
        11: {
            title: "BP组合",
            description: "最佳助推器提升声望点数获取",
            cost() { return new Decimal(3);},
            effect() { 
                let ret = player.tptr_b.best.sqrt().plus(1);
                if (hasUpgrade("tptr_b", 32)) ret = Decimal.pow(1.125, player.tptr_b.best).times(ret);
                if (hasUpgrade("tptr_s", 15)) ret = ret.pow(buyableEffect("tptr_s", 14).root(2.7));
                return ret;
            },
            unlocked() { return player.tptr_b.best.gte(1) },
            effectDisplay() { return format(this.effect())+"倍" },
        },
        12: {
            title: "交叉污染",
            description: "生成器添加到助推器效果基础",
            cost() { return new Decimal(7); },
            effect() {
                let ret = player.tptr_g.points.add(1).log10().sqrt().div(3).times(hasUpgrade("tptr_e", 14)?upgradeEffect("tptr_e", 14):1);
                return ret;
            },
            unlocked() { return hasUpgrade("tm",22) },
            effectDisplay() { return "+"+format(tmp.tptr_b.upgrades[12].effect) },
        },
        13: {
            title: "PB反转",
            description: "总声望点数添加到助推器效果基础",
            cost() { return new Decimal(8); },
            effect() {
                let ret = player.tptr_p.total.add(1).log10().add(1).log10().div(3).times(hasUpgrade("tptr_e", 14)?upgradeEffect("tptr_e", 14):1);
                return ret;
            },
            unlocked() { return hasUpgrade("tm",22) },
            effectDisplay() { return "+"+format(tmp.tptr_b.upgrades[13].effect) },
        },
        21: {
            title: "Gen Z^2",
            description: "生成器力量效果平方",
            cost() { return new Decimal(9);},
            unlocked() { return hasUpgrade("tm",22) },
        },
        22: {
            title: "上到五楼",
            description: "生成器力量效果^1.2",
            cost() { return new Decimal(23); },
            unlocked() { return hasUpgrade("tm",22) },
        },
        23: {
            title: "折扣一",
            description: "基于重写点数使助推器更便宜",
            cost() { return new Decimal(91); },
            effect() { 
                let ret = player.modpoints[7].add(1).log10().add(1).pow(3.2);
                if (hasUpgrade("tptr_s",14)) ret = ret.pow(buyableEffect("tptr_s", 14));
                return ret;
            },
            unlocked() { return hasUpgrade("tm",22) },
            effectDisplay() { return "/"+format(tmp.tptr_b.upgrades[23].effect) },
        },
        31: {
            title: "更差的BP组合",
            description: "超级助推器提升声望点数获取",
            cost() { return new Decimal(1079) },
            unlocked() { return player.tm.buyables[7].gte(13) },
            effect() { 
                let exp = 1
                return Decimal.pow(1e20, player.tptr_sb.points.pow(1.5)).pow(exp); 
            },
            effectDisplay() { return format(tmp.tptr_b.upgrades[31].effect)+"倍" }
        },
        32: {
            title: "更好的BP组合",
            description() { return "<b>BP组合</b>使用更好的公式" },
            cost() { return new Decimal(1080) },
            unlocked() { return player.tm.buyables[7].gte(13) },
        },
        33: {
            title: "更多加法",
            description: "<b>更多加法</b>基于超级助推器更强",
            cost() { return new Decimal(1079) },
            unlocked() { return player.tm.buyables[7].gte(13) },
            effect() { return player.tptr_sb.points.times(player.tptr_sb.points.gte(4)?2.6:2).plus(1).pow(1) },
            effectDisplay() { return format(tmp.tptr_b.upgrades[33].effect)+"倍" },
        },
    },
    
    milestones: {
        0: {
            requirementDescription: "7个助推器",
            done() { return player.tptr_b.best.gte(7) },
            effectDescription: "可以批量购买助推器",
        },
    },
    canBuyMax() {return player.tptr_b.best.gte(7)},
    resetsNothing() {return player.tptr_t.best.gte(1)},
    autoPrestige() {return player.tptr_t.best.gte(1)},
});

// 生成器层
addLayer("tptr_g", {
    name: "生成器层",
    symbol: "G",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        power: new Decimal(0),
    }},
    color: "#a3d9a5",
    requires(){
        if(hasUpgrade("tptc_p",34))return new Decimal(1);
        return new Decimal(200);
    },
    resource: "生成器",
    baseResource: "重写点数", 
    baseAmount() {return player.modpoints[7]},
    type: "static",
    branches: ["tptr_p"],
    exponent: 1.25,
    base: 5,
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade("tptr_g", 22)) mult = mult.div(upgradeEffect("tptr_g", 22));
        if (player.tptr_s.unlocked) mult = mult.div(buyableEffect("tptr_s", 13));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    getSc1(){
        let sc1=new Decimal(12);
        if(hasUpgrade("tptr_q",31))sc1=sc1.add(upgradeEffect("tptr_q",31));
        return sc1;
    },
    getResetGain() {
        let ret=getResetGain(this.layer,"static").add(player[this.layer].points);
        let sc1=layers[this.layer].getSc1();
        if(ret.gte(1000))ret=ret.div(sc1).sqrt().mul(sc1).div(1225).pow(0.1).mul(1225).floor().max(1000);
        return ret.sub(player[this.layer].points).max(1);
    },
    getNextAt(canMax) {
        if (!tmp[this.layer].canBuyMax) canMax = false
        let amt = player[this.layer].points.plus((canMax&&tmp[this.layer].baseAmount.gte(tmp[this.layer].nextAt))?tmp[this.layer].resetGain:0);
        let sc1=layers[this.layer].getSc1();
        if(amt.gte(1000))amt=amt.div(1225).pow(10).mul(1225).div(sc1).pow(2).mul(sc1).max(1000).ceil();
        let extraCost = Decimal.pow(tmp[this.layer].base, amt.pow(tmp[this.layer].exponent).div(tmp[this.layer].gainExp)).times(tmp[this.layer].gainMult)
        let cost = extraCost.times(tmp[this.layer].requires).max(tmp[this.layer].requires)
        return cost;
    },
    row: 1,
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",18)},
    doReset(l){
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_g.best);
        layerDataReset("tptr_g",["upgrades","milestones","challenges"]);
        player.tptr_g.best=b;
        return;
    },
    addToBase() {
        let base = new Decimal(0);
        return base;
    },
    effBase() {
        let base = new Decimal(2);
        
        // 加法
        if (hasUpgrade("tptr_g", 12)) base = base.plus(upgradeEffect("tptr_g", 12));
        if (hasUpgrade("tptr_g", 13)) base = base.plus(upgradeEffect("tptr_g", 13));
        if (hasUpgrade("tptr_e", 11)) base = base.plus(upgradeEffect("tptr_e", 11).g);
        if (player.tptr_e.unlocked) base = base.plus(buyableEffect("tptr_e",11).second);
        if (player.tptr_s.unlocked) base = base.plus(buyableEffect("tptr_s",12));
        
        // 乘法
        if (hasUpgrade("tm", 47)) base = base.times(tmp.tptr_sg.enEff)
        if (hasUpgrade("tptr_q", 12)) base = base.times(upgradeEffect("tptr_q", 12))
            
        return base;
    },
    effect() {
        if(inChallenge("tptr_h",41))return [new Decimal(0),new Decimal(1)];
        
        let eff2 = player.tptr_g.points.add(1)
        if(hasChallenge("tptr_h",41))eff2 = Decimal.pow(1.03,player.tptr_g.points);
        if (hasUpgrade("tptc_g", 22))eff2 = Decimal.pow(1.1,player.tptr_g.points.div(2));
        if (hasUpgrade("tptc_g", 23))eff2 = Decimal.pow(1.2,player.tptr_g.points.div(2));
        if (hasUpgrade("tptc_g", 24))eff2 = Decimal.pow(1.3,player.tptr_g.points.div(2));
        if (hasUpgrade("tptc_g", 13))eff2 = eff2.pow(2)
        
        let eff = [Decimal.pow(this.effBase(), player.tptr_g.points).sub(1).max(0), eff2];
        if (hasUpgrade("tptr_g", 21)) eff[0] = eff[0].times(upgradeEffect("tptr_g", 21));
        if (hasUpgrade("tptr_g", 25)) eff[0] = eff[0].times(upgradeEffect("tptr_g", 25));
        if (hasUpgrade("tptr_t", 15)) eff[0] = eff[0].times(tmp.tptr_t.enEff);
        if (hasUpgrade("tptr_s", 12)) eff[0] = eff[0].times(upgradeEffect("tptr_s", 12));
        if (hasUpgrade("tptr_s", 13)) eff[0] = eff[0].times(upgradeEffect("tptr_s", 13));
        if(player.tptr_q.unlocked) eff[0] = eff[0].times(tmp.tptr_q.enEff);
        return eff;
    },
    effectDescription() {
        return "每秒生成"+format(tmp.tptr_g.effect[0])+"生成器能量\n("+format(tmp.tptr_g.effBase)+"倍每个)，并在TPTC中将生成器基础值提升"+format(tmp.tptr_g.effect[1])+"倍"
    },
    update(diff){
        if (player.tptr_g.unlocked) player.tptr_g.power = player.tptr_g.power.plus(tmp.tptr_g.effect[0].times(diff));
    },
    powerExp() {
        let exp = new Decimal(1/3);
        if(hasUpgrade("tptr_b",21))exp = exp.mul(2);
        if(hasUpgrade("tptr_b",22))exp = exp.mul(1.2);
        if(hasUpgrade("tptr_q",13))exp = exp.mul(1.25);
        return exp;
    },
    powerEff() {
        return player.tptr_g.power.plus(1).pow(this.powerExp());
    },
    tabFormat: ["main-display",
        "prestige-button", "resource-display",
        "blank",
        ["display-text",
            function() {return '你有 ' + format(player.tptr_g.power) + ' 生成器能量，将重写点数生成提升'+format(tmp.tptr_g.powerEff)+'倍'},
                {}],
        "milestones", "upgrades"],
    upgrades: {
        rows: 3,
        cols: 5,
        11: {
            title: "GP组合",
            description: "最佳生成器提升声望点数获取",
            cost() { return new Decimal(3) },
            effect() { return player.tptr_g.best.sqrt().plus(1) },
            unlocked() { return player.tptr_g.best.gte(1) },
            effectDisplay() { return format(tmp.tptr_g.upgrades[11].effect)+"倍" },
        },
        12: {
            title: "我需要更多",
            description: "助推器添加到生成器基础",
            cost() { return new Decimal(7) },
            effect() { 
                let ret = player.tptr_b.points.add(1).log10().sqrt().div(3).times(hasUpgrade("tptr_e", 14)?upgradeEffect("tptr_e", 14):1);
                if (hasUpgrade("tptr_s", 24)) ret = ret.times(upgradeEffect("tptr_s", 24));
                return ret;
            },
            unlocked() { return hasUpgrade("tm",22) },
            effectDisplay() { return "+"+format(tmp.tptr_g.upgrades[12].effect) },
        },
        13: {
            title: "我需要更多II",
            description: "最佳声望点数添加到生成器基础",
            cost() { return new Decimal(8) },
            effect() { 
                let ret = player.tptr_p.best.add(1).log10().add(1).log10().div(3).times(hasUpgrade("tptr_e", 14)?upgradeEffect("tptr_e", 14):1);
                if (hasUpgrade("tptr_s", 24)) ret = ret.times(upgradeEffect("tptr_s", 24));
                return ret;
            },
            unlocked() { return hasUpgrade("tm",22) },
            effectDisplay() { return "+"+format(tmp.tptr_g.upgrades[13].effect) },
        },
        14: {
            title: "提升提升",
            description() { return "<b>声望提升</b>提升到1.5次方" },
            cost() { return new Decimal(13) },
            unlocked() { return hasUpgrade("tm",22) },
        },
        15: {
            title: "外部协同",
            description: "<b>自我协同</b>基于生成器更强",
            cost() { return new Decimal(27) },
            effect() { 
                let eff = player.tptr_g.points.sqrt().add(1);
                if (eff.gte(400)) eff = eff.cbrt().times(Math.pow(400, 2/3))
                return eff;
            },
            unlocked() { return hasUpgrade("tm",22) },
            effectDisplay() { return "^"+format(tmp.tptr_g.upgrades[15].effect) },
        },
        21: {
            title: "我需要更多III",
            description: "生成器能量提升自身生成",
            cost() { return new Decimal(94) },
            effect() { 
                let ret = player.tptr_g.power.add(1).log10().add(1);
                if (hasUpgrade("tptr_s", 24)) ret = ret.pow(upgradeEffect("tptr_s", 24));
                return ret;
            },
            unlocked() { return hasUpgrade("tm",22) },
            effectDisplay() { return format(tmp.tptr_g.upgrades[21].effect)+"倍" },
        },
        22: {
            title: "折扣二",
            description: "基于声望点数使生成器更便宜",
            cost() { return new Decimal(97) },
            effect() { 
                let eff = player.tptr_p.points.add(1).pow(0.25);
                return eff;
            },
            unlocked() { return hasUpgrade("tm",22) },
            effectDisplay() { return "/"+format(tmp.tptr_g.upgrades[22].effect) },
        },
        23: {
            title: "双重反转",
            description: "<b>反向声望提升</b>基于助推器更强",
            cost() { return new Decimal(117) },
            effect() { return player.tptr_b.points.pow(0.5).add(1) },
            unlocked() { return hasUpgrade("tm",22) },
            effectDisplay() { return "^"+format(tmp.tptr_g.upgrades[23].effect) },
        },
        24: {
            title: "再次提升提升",
            description: "<b>声望提升</b>提升到1.467次方",
            cost() { return new Decimal(1000) },
            unlocked() { return player.tm.buyables[7].gte(5) },
        },
        25: {
            title: "我需要更多IV",
            description: "声望点数提升生成器能量获取",
            cost() { return new Decimal(1000) },
            effect() { 
                let ret = player.tptr_p.points.add(1).log10().pow(3).add(1);
                if (hasUpgrade("tptr_s", 24)) ret = ret.pow(upgradeEffect("tptr_s", 24));
                return ret;
            },
            unlocked() { return player.tm.buyables[7].gte(5) },
            effectDisplay() { return format(tmp.tptr_g.upgrades[25].effect)+"倍" },
        },
    },
    
    milestones: {
        0: {
            requirementDescription: "7个生成器",
            done() { return player.tptr_g.best.gte(7) },
            effectDescription: "可以批量购买生成器",
        },
        1: {
            requirementDescription: "10个生成器",
            done() { return player.tptr_g.best.gte(10) },
            effectDescription: "每秒获得100%的声望点数获取",
        },
    },
    canBuyMax() {return player.tptr_g.best.gte(7)},
    resetsNothing() {return player.tptr_s.best.gte(1)},
    autoPrestige() {return player.tptr_s.best.gte(1)},
});

// 时间胶囊层
addLayer("tptr_t", {
    name: "时间胶囊层",
    symbol: "T",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        energy: new Decimal(0),
    }},
    color: "#006609",
    requires() { if(hasUpgrade("tptr_t",23))return new Decimal(1);return new Decimal(1e120); },
    resource: "时间胶囊",
    baseResource: "重写点数", 
    baseAmount() {return player.modpoints[7]},
    type: "static",
    branches: ["tptr_b"],
    exponent: 1.85,
    base: 1e15,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    getSc1(){
        let sc1=new Decimal(12);
        return sc1;
    },
    getResetGain() {
        let ret=getResetGain(this.layer,"static").add(player[this.layer].points);
        let sc1=layers[this.layer].getSc1();
        if(ret.gte(1000))ret=ret.div(sc1).sqrt().mul(sc1).div(1225).pow(0.1).mul(1225).floor().max(1000);
        return ret.sub(player[this.layer].points).max(1);
    },
    getNextAt(canMax) {
        if (!tmp[this.layer].canBuyMax) canMax = false
        let amt = player[this.layer].points.plus((canMax&&tmp[this.layer].baseAmount.gte(tmp[this.layer].nextAt))?tmp[this.layer].resetGain:0);
        let sc1=layers[this.layer].getSc1();
        if(amt.gte(1000))amt=amt.div(1225).pow(10).mul(1225).div(sc1).pow(2).mul(sc1).max(1000).ceil();
        let extraCost = Decimal.pow(tmp[this.layer].base, amt.pow(tmp[this.layer].exponent).div(tmp[this.layer].gainExp)).times(tmp[this.layer].gainMult)
        let cost = extraCost.times(tmp[this.layer].requires).max(tmp[this.layer].requires)
        return cost;
    },
    row: 2,
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",26)},
    doReset(l){
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || l=="tptr_t" || l=="tptr_e" || l=="tptr_s" || l=="tptr_sb" || l=="tptr_sg" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_t.best);
        layerDataReset("tptr_t",["upgrades","milestones","challenges"]);
        player.tptr_t.best=b;
        return;
    },
    enCapMult() {
        let mult = new Decimal(1);
        if (hasUpgrade("tptr_t", 12)) mult = mult.times(upgradeEffect("tptr_t", 12));
        if (hasUpgrade("tptr_t", 21)) mult = mult.times(100);
        if (hasUpgrade("tptr_t", 22)) mult = mult.times(upgradeEffect("tptr_t", 22));
        if (player.tptr_h.unlocked) mult = mult.times(tmp.tptr_h.effect[0]);
        if (player.tptr_o.unlocked) mult = mult.times(tmp.tptr_o.solEnEff2);
        return mult;
    },
    enGainMult() {
        let mult = new Decimal(1);
        if (hasUpgrade("tptr_t", 22)) mult = mult.times(upgradeEffect("tptr_t", 22));
        if (player.tptr_h.unlocked) mult = mult.times(tmp.tptr_h.effect[0]);
        return mult;
    },
    effBaseMult() {
        let mult = new Decimal(1);
        if (player.tptr_o.unlocked) mult = mult.times(buyableEffect("tptr_o", 13));
        if (player.tptr_ba.unlocked) mult = mult.times(tmp.tptr_ba.posBuff);
        if (player.tptr_m.unlocked) mult = mult.times(tmp.tptr_m.clickables[12].effect);
        return mult;
    },
    effBasePow() {
        let exp = new Decimal(1);
        if (player.tptr_m.spellTimes[12].gt(0)) exp = exp.times(1.1);
        return exp;
    },
    effGainBaseMult() {
        let mult = new Decimal(1);
        if (player.tptr_ps.unlocked) mult = mult.times(challengeEffect("tptr_h", 32));
        return mult;
    },
    effLimBaseMult() {
        let mult = new Decimal(1);
        return mult;
    },
    nonExtraTCPow() {
        let pow = new Decimal(1);
        return pow;
    },
    effect() { 
        if(!hasUpgrade("tm",26))return {gain: new Decimal(0), limit: new Decimal(0), tptc_t_boost: new Decimal(1)};
        else return {
            gain: Decimal.pow(tmp.tptr_t.effBaseMult.times(tmp.tptr_t.effGainBaseMult).times(3).pow(tmp.tptr_t.effBasePow), player.tptr_t.points.times(tmp.tptr_t.nonExtraTCPow).plus(player.tptr_t.buyables[11].mul(inChallenge("tptr_h",31)?0:1)).plus(tmp.tptr_t.freeExtraTimeCapsules)).sub(1).max(0).times(player.tptr_t.points.times(tmp.tptr_t.nonExtraTCPow).plus(player.tptr_t.buyables[11].mul(inChallenge("tptr_h",31)?0:1)).gt(0)?1:0).times(tmp.tptr_t.enGainMult).mul(inChallenge("tptr_h",32)?0:1).max(0),
            limit: Decimal.pow(tmp.tptr_t.effBaseMult.times(tmp.tptr_t.effLimBaseMult).times(2).pow(tmp.tptr_t.effBasePow), player.tptr_t.points.times(tmp.tptr_t.nonExtraTCPow).plus(player.tptr_t.buyables[11].mul(inChallenge("tptr_h",31)?0:1)).plus(tmp.tptr_t.freeExtraTimeCapsules)).sub(1).max(0).times(100).times(player.tptr_t.points.times(tmp.tptr_t.nonExtraTCPow).plus(player.tptr_t.buyables[11].mul(inChallenge("tptr_h",31)?0:1)).gt(0)?1:0).times(tmp.tptr_t.enCapMult).max(0),
            tptc_t_boost: player.tptr_t.points.pow(hasUpgrade("tptc_t",11)?3:1).pow(hasUpgrade("tptc_t",12)?3:1).pow(hasUpgrade("tptc_t",13)?20/9:1).add(1)
        }
    },
    effectDescription() {
        return "每秒生成"+format(tmp.tptr_t.effect.gain)+"时间能量，但有"+format(tmp.tptr_t.effect.limit)+"的上限\n你的非额外时间胶囊在TPTC中将时间胶囊基础值提升"+format(tmp.tptr_t.effect.tptc_t_boost)+"倍"
    },
    enEff() {
        if(!hasUpgrade("tm",26))return new Decimal(1);
        let eff = player.tptr_t.energy.add(1).pow(1.2);
        if (hasUpgrade("tptr_t", 14)) eff = eff.pow(1.3);
        if (hasUpgrade("tptr_q", 24)) eff = eff.pow(7.5);
        return eff;
    },
    enEff2() {
        if (!hasUpgrade("tptr_t", 24)) return new Decimal(0);
        let exp = 5/9
        let eff = player.tptr_t.energy.max(0).plus(1).log10().pow(exp);
        if(eff.gte(1.4e6))eff = eff.sqrt().mul(new Decimal(1.4e6).sqrt());
        return eff.floor();
    },
    nextEnEff2() {
        if (!hasUpgrade("tptr_t", 24)) return new Decimal(1/0);
        let ret=tmp.tptr_t.enEff2.plus(1);
        if(ret.gte(1.4e6))ret = ret.pow(2).div(1.4e6);
        let next = Decimal.pow(10, ret.pow(1.8));
        return next;
    },
    milestones: {
        0: {
            requirementDescription: "1个时间胶囊",
            done() { return player.tptr_t.best.gte(1) },
            effectDescription: "自动购买助推器，助推器重置不影响任何内容",
        },
        1: {
            requirementDescription: "7个时间胶囊",
            done() { return player.tptr_t.best.gte(7) },
            effectDescription: "可以批量购买时间胶囊",
        },
    },
    update(diff) {
        if(hasUpgrade("tm",26))player.tptr_t.energy = player.tptr_t.energy.plus(this.effect().gain.times(diff)).min(this.effect().limit).max(0);
        if(player.tptr_h.best.gte(1))layers.tptr_t.buyables[11].buyMax();
    },
    tabFormat: ["main-display",
        "prestige-button", "resource-display",
        "blank",
        "milestones",
        ["display-text",
            function() {return '你有 ' + format(player.tptr_t.energy) + ' 时间能量，将点数与声望点数获取提升'+format(tmp.tptr_t.enEff)+'倍'+(hasUpgrade("tptr_t", 24)?("，并提供"+formatWhole(tmp.tptr_t.enEff2)+"个免费额外时间胶囊(下一个在"+format(tmp.tptr_t.nextEnEff2)+")"):"")},
                {}],"buyables", "upgrades"],
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            title: "额外时间胶囊",
            costExp() {
                let exp = new Decimal(1.2);
                return exp;
            },
            cost(x=player[this.layer].buyables[this.id]) {
                if (x.gte(25) && tmp[this.layer].buyables[this.id].costScalingEnabled) x = x.pow(2).div(25)
                let cost = x.times(0.4).pow(tmp[this.layer].buyables[this.id].costExp).add(1).times(10)
                return cost.floor()
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let e = tmp.tptr_t.freeExtraTimeCapsules;
                return "你有"+formatWhole(player[this.layer].buyables[this.id])+(e.gt(0)?("+"+formatWhole(e)):"")+"额外时间胶囊\n\
                下一个额外时间胶囊成本: " + format(data.cost) + " 助推器";
            },
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() {
                return player.tptr_b.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                if(player.tptr_b.points.lt(tmp[this.layer].buyables[this.id].cost))return;
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.canAfford()) return;
                let b = player.tptr_b.points.plus(1);
                let tempBuy = b.div(10).sub(1).max(0).root(tmp[this.layer].buyables[this.id].costExp).div(0.4);
                if (tempBuy.gte(25) && tmp[this.layer].buyables[this.id].costScalingEnabled) tempBuy = tempBuy.times(25).sqrt();
                let target = tempBuy.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'222px'},
        }
    },
    upgrades: {
        rows: 4,
        cols: 5,
        11: {
            title: "伪助推",
            description: "非额外时间胶囊添加到助推器基础",
            cost() { return new Decimal(5) },
            unlocked() { return player.tptr_t.unlocked },
            effect() { 
                return player.tptr_t.points.pow(player.tm.buyables[7].gte(9)?0.9:0.6).add(0.5).plus(hasUpgrade("tptr_t", 13)?upgradeEffect("tptr_t", 13):0);
            },
            effectDisplay() { return "+"+format(tmp.tptr_t.upgrades[11].effect) },
        },
        12: {
            title: "限制拉伸器",
            description: "基于助推器延迟时间能量上限",
            cost() { return new Decimal(8) },
            unlocked() { return player.tptr_t.unlocked },
            effect() { 
                return player.tptr_b.points.pow(0.95).add(1)
            },
            effectDisplay() { return format(tmp.tptr_t.upgrades[12].effect)+"倍" },
        },
        13: {
            title: "伪伪助推",
            description: "额外时间胶囊添加到<b>伪助推</b>效果",
            cost() { return new Decimal(32) },
            unlocked() { return hasUpgrade("tm", 34) },
            effect() { 
                return player.tptr_t.buyables[11].add(tmp.tptr_t.freeExtraTimeCapsules).pow(0.95);
            },
            effectDisplay() { return "+"+format(tmp.tptr_t.upgrades[13].effect) },
        },
        14: {
            title: "更多时间",
            description: "时间能量效果提升到1.3次方",
            cost() { return new Decimal(33) },
            unlocked() { return hasUpgrade("tptr_t", 13) },
        },
        15: {
            title: "时间效力",
            description: "时间能量影响生成器能量获取",
            cost() { return new Decimal(38) },
            unlocked() { return hasUpgrade("tptr_t", 13) },
        },
        21: {
            title: "弱化链条",
            description: "时间能量上限乘以100",
            cost() { return new Decimal(40) },
            unlocked() { return player.tm.buyables[7].gte(11) },
        },
        22: {
            title: "增强时间",
            description: "增强点数提升时间能量的生成和上限",
            cost() { return new Decimal(40) },
            unlocked() { return player.tm.buyables[7].gte(11) },
            effect() { 
                return player.tptr_e.points.plus(1).root(10);
            },
            effectDisplay() { return format(tmp.tptr_t.upgrades[22].effect)+"倍" },
        },
        23: {
            title: "反转时间",
            description: "TPTC和TPTR中时间胶囊的基础需求降为1",
            cost() { return new Decimal(42) },
            unlocked() { return player.tm.buyables[7].gte(11) },
        },
        24: {
            title: "时间膨胀",
            description: "解锁新的时间能量效果",
            cost() { return new Decimal(41) },
            unlocked() { return player.tm.buyables[7].gte(11) },
        },
        25: {
            title: "基础",
            description: "时间能量添加到助推器基础",
            cost() { return new Decimal(41) },
            unlocked() { return player.tm.buyables[7].gte(11) },
            effect() { return player.tptr_t.energy.plus(1).log10().div(1.2); },
            effectDisplay() { return "+"+format(tmp.tptr_t.upgrades[25].effect) },
        },
    },
    freeExtraTimeCapsules() {
        let free = new Decimal(0);
        if (hasUpgrade("tptr_t", 24)) free = free.plus(tmp.tptr_t.enEff2);
        if (hasUpgrade("tptr_q", 22)) free = free.plus(upgradeEffect("tptr_q", 22));
        return free;
    },
    canBuyMax() {return player.tptr_t.best.gte(7)},
    resetsNothing() {return player.tptr_h.best.gte(1)},
    autoPrestige() {return player.tptr_h.best.gte(1)},
});

// 增强层
addLayer("tptr_e", {
    name: "增强层",
    symbol: "E",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#b82fbd",
    requires() { 
        if(hasUpgrade("tptr_e",22))return new Decimal(1);
        return new Decimal(1e120); 
    },
    resource: "增强点数",
    baseResource: "重写点数", 
    baseAmount() {return player.modpoints[7]},
    type: "normal",
    exponent: 0.02,
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade("tptr_e", 24)) mult = mult.times(upgradeEffect("tptr_e", 24));
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    effectDescription() {
        return "在TPTC中将增强器效果提升^"+format(tmp.tptr_e.effect);
    },
    effect() { 
        let ret=player.tptr_e.points.add(1).log10().div(100).add(1);
        if(ret.gte(100))ret = ret.sqrt().mul(10).sqrt().mul(10);
        return ret;
    },
    row: 2,
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",27)},
    branches: ["tptr_b","tptr_g"],
    doReset(l){
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || l=="tptr_t" || l=="tptr_e" || l=="tptr_s" || l=="tptr_sb" || l=="tptr_sg" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_s.best);
        layerDataReset("tptr_e",["upgrades","milestones","challenges"]);
        player.tptr_s.best=b;
        return;
    },
    freeEnh() {
        let enh = new Decimal(0);
        if (hasUpgrade("tptr_e", 13)) enh = enh.plus(1);
        if (hasUpgrade("tptr_e", 21)) enh = enh.plus(2);
        if (hasUpgrade("tptr_e", 23)) enh = enh.plus(upgradeEffect("tptr_e", 23));
        if (hasUpgrade("tptr_q", 22)) enh = enh.plus(upgradeEffect("tptr_q", 22));
        return enh;
    },
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            title: "增强器",
            costScalingEnabled() {
                return true;
            },
            cost(x=player[this.layer].buyables[this.id]) {
                if (x.gte(25) && tmp[this.layer].buyables[this.id].costScalingEnabled) x = x.pow(2).div(25)
                let cost = Decimal.pow(2, x.pow(1.5))
                return cost.floor()
            },
            power() {
                let pow = new Decimal(1);
                return pow;
            },
            effect(x=player[this.layer].buyables[this.id]) {
                let power = tmp[this.layer].buyables[this.id].power
                x = x.plus(tmp.tptr_e.freeEnh);
                if (!player[this.layer].unlocked) x = new Decimal(0);
                
                let eff = {}
                if (x.gte(0)) eff.first = Decimal.pow(25, x.pow(power.times(1.1)))
                else eff.first = Decimal.pow(1/25, x.times(-1).pow(power.times(1.1)))
                if (hasUpgrade("tptr_q", 24)) eff.first = eff.first.pow(7.5);
                if (eff.first.gte("e5e9"))eff.first = Decimal.pow(10,eff.first.log10().cbrt().mul(Decimal.pow(5e9,2/3)));
            
                if (x.gte(0)) eff.second = x.pow(power.times(0.8))
                else eff.second = x.times(-1).pow(power.times(0.8)).times(-1)
                
                if(inChallenge("tptr_h",31))return {first:new Decimal(1),second:new Decimal(1)};
                return eff;
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "你有"+formatWhole(player[this.layer].buyables[11])+(tmp.tptr_e.freeEnh.gt(0)?("+"+formatWhole(tmp.tptr_e.freeEnh)):"")+"个增强器\n\
                将声望点数获取乘以"+format(data.effect.first)+"倍\n\
                将助推器/生成器基础值增加"+format(data.effect.second)+"\n\
                下一个增强器成本: "+format(data.cost)+"增强点数";
            },
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() {
                return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.canAfford()) return;
                let tempBuy = player[this.layer].points.max(1).log2().root(1.5)
                if (tempBuy.gte(25) && tmp[this.layer].buyables[this.id].costScalingEnabled) tempBuy = tempBuy.times(25).sqrt();
                let target = tempBuy.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'222px'},
        },
    },
    upgrades: {
        rows: 4,
        cols: 4,
        11: {
            title: "第二行协同",
            description: "助推器和生成器互相增强",
            cost() { return new Decimal(1e128) },
            unlocked() { return player.tm.buyables[7].gte(5) },
            effect() { 
                let exp = 1
                return {g: player.tptr_b.points.add(1).log10().pow(exp), b: player.tptr_g.points.add(1).log10().pow(exp)} 
            },
            effectDisplay() { return "生成器基础值+"+format(tmp.tptr_e.upgrades[11].effect.g)+"，助推器基础值+"+format(tmp.tptr_e.upgrades[11].effect.b) },
        },
        12: {
            title: "增强声望",
            description: "总增强点数提升声望点数获取",
            cost() { return new Decimal(3e129) },
            unlocked() { return player.tm.buyables[7].gte(5) },
            effect() { 
                let ret = player.tptr_e.total.add(1).pow(1.5) 
                if(ret.gte("1e1500"))ret = ret.sqrt().mul("1e750");
                return ret
            },
            effectDisplay() { return format(tmp.tptr_e.upgrades[12].effect)+"倍" },
        },
        13: {
            title: "增强加成",
            description: "获得1个免费增强器",
            cost() { return new Decimal(3e189) },
            unlocked() { return hasUpgrade("tm", 34) },
        },
        14: {
            title: "更多加法",
            description: "所有增加助推器/生成器基础值的升级效果翻四倍",
            cost() { return new Decimal(1e240) },
            unlocked() { return player.tm.buyables[7].gte(10) },
            effect() {
                let e = new Decimal(4)
                if (hasUpgrade("tptr_b", 33)) e = e.times(upgradeEffect("tptr_b", 33))
                return e;
            },
            effectDisplay() { return format(tmp.tptr_e.upgrades[14].effect)+"倍" },
        },
        21: {
            title: "增强加成+",
            description: "再获得2个免费增强器",
            cost() { return new Decimal(1e264) },
            unlocked() { return player.tm.buyables[7].gte(11) },
        },
        22: {
            title: "增强反转",
            description: "在TPTC和TPTR中增强层的需求降为1",
            cost() { return new Decimal("1e316") },
            unlocked() { return player.tm.buyables[7].gte(11) },
        },
        23: {
            title: "进入E空间",
            description: "空间能量提供免费增强器",
            cost() { return new Decimal(1e267) },
            unlocked() { return player.tm.buyables[7].gte(11) },
            effect() {
                let eff = player.tptr_s.points.pow(2).div(25);
                return eff.floor();
            },
            effectDisplay() { return "+"+formatWhole(tmp.tptr_e.upgrades[23].effect) },
        },
        24: {
            title: "巨大增长",
            description: "助推器和生成器提升增强点数获取",
            cost() { return new Decimal(1e275) },
            unlocked() { return player.tm.buyables[7].gte(11) },
            effect() { return Decimal.pow(1.1, player.tptr_b.points.plus(player.tptr_g.points).pow(0.9)) },
            effectDisplay() { return format(tmp.tptr_e.upgrades[24].effect)+"倍" },
        },
    },
    update(){
        if(player.tptr_q.best.gte(1))layers.tptr_e.buyables[11].buyMax();
    },
    passiveGeneration(){
        if(player.tptr_q.best.gte(1))return 1;
        return 0;
    },
})

// 空间能量层
addLayer("tptr_s", {
    name: "空间能量层",
    symbol: "S",
    position: 3,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        spent: new Decimal(0),
    }},
    color: "#dfdfdf",
    requires() { 
        if(hasUpgrade("tptr_s",23))return new Decimal(1);
        return new Decimal(1e120); 
    },
    resource: "空间能量",
    baseResource: "重写点数", 
    baseAmount() {return player.modpoints[7]},
    type: "static",
    branches: ["tptr_g"],
    exponent: 1.85,
    base() { return (hasUpgrade("tptr_ss", 11)?1e10:1e15) },
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    getSc1(){
        let sc1=new Decimal(12);
        return sc1;
    },
    getResetGain() {
        let ret=getResetGain(this.layer,"static").add(player[this.layer].points);
        let sc1=layers[this.layer].getSc1();
        if(ret.gte(1000))ret=ret.div(sc1).sqrt().mul(sc1).div(1225).pow(0.1).mul(1225).floor().max(1000);
        return ret.sub(player[this.layer].points).max(1);
    },
    getNextAt(canMax) {
        if (!tmp[this.layer].canBuyMax) canMax = false
        let amt = player[this.layer].points.plus((canMax&&tmp[this.layer].baseAmount.gte(tmp[this.layer].nextAt))?tmp[this.layer].resetGain:0);
        let sc1=layers[this.layer].getSc1();
        if(amt.gte(1000))amt=amt.div(1225).pow(10).mul(1225).div(sc1).pow(2).mul(sc1).max(1000).ceil();
        let extraCost = Decimal.pow(tmp[this.layer].base, amt.pow(tmp[this.layer].exponent).div(tmp[this.layer].gainExp)).times(tmp[this.layer].gainMult)
        let cost = extraCost.times(tmp[this.layer].requires).max(tmp[this.layer].requires)
        return cost;
    },
    row: 2,
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",28)},
    doReset(l){
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || l=="tptr_t" || l=="tptr_e" || l=="tptr_s" || l=="tptr_sb" || l=="tptr_sg" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_s.best);
        if(player.tptr_ss.best.gte(4))layerDataReset("tptr_s",["upgrades","milestones","challenges","buyables"]);
        else layerDataReset("tptr_s",["upgrades","milestones","challenges"]);
        player.tptr_s.best=b;
        return;
    },
    space() {
        let space = player.tptr_s.best.pow(1.1).times(3);
        if (hasUpgrade("tptr_s", 13)) space = space.plus(2);
        if (player.tptr_ss.unlocked) space = space.plus(tmp.tptr_ss.eff1);
        if(player.tptr_ss.best.gte(10))return space.floor();
        return space.floor().sub(player.tptr_s.spent).max(0);
    },
    buildingBaseRoot() {
        let root = new Decimal(1);
        if (hasUpgrade("tptr_s", 34) && player.i.buyables[12].gte(5)) root = root.times(upgradeEffect("tptr_s", 34));
        return root;
    },
    effectDescription() {
        return "在TPTC中将空间建筑1-7的效果提升^"+format(tmp.tptr_s.effect);
    },
    effect() { 
        return player.tptr_s.points.pow(0.5).div(100).add(1)
    },
    buildingBaseCosts() { 
        let rt = tmp.tptr_s.buildingBaseRoot;
        return {
            11: new Decimal(1e3).root(rt),
            12: new Decimal(1e10).root(rt),
            13: new Decimal(1e25).root(rt),
            14: new Decimal(1e48).root(rt),
            15: new Decimal(1e250).root(rt),
            16: new Decimal("e3e7").root(rt),
            17: new Decimal("e4.5e7").root(rt),
            18: new Decimal("e6e7").root(rt),
            19: new Decimal("e3.5e8").root(rt),
            20: new Decimal("e1.5e9").root(rt),
    }},
    freeSpaceBuildings() {
        let x = new Decimal(0);
        if (hasUpgrade("tptr_s", 11)) x = x.plus(1);
        if (hasUpgrade("tptr_s", 22)) x = x.plus(upgradeEffect("tptr_s", 22));
        if (hasUpgrade("tptr_q", 22)) x = x.plus(upgradeEffect("tptr_q", 22));
        if (hasUpgrade("tptr_ss", 31)) x = x.plus(upgradeEffect("tptr_ss", 31));
        return x;
    },
    freeSpaceBuildings1to4() {
        let x = new Decimal(0);
        if (player.tptr_s.unlocked) x = x.plus(buyableEffect("tptr_s", 15));
        return x;
    },
    totalBuildingLevels() {
        let len = Object.keys(player.tptr_s.buyables).length
        if (len==0) return new Decimal(0);
        if (len==1) return Object.values(player.tptr_s.buyables)[0].plus(tmp.tptr_s.freeSpaceBuildings).plus(toNumber(Object.keys(player.tptr_s.buyables))<15?tmp.tptr_s.freeSpaceBuildings1to4:0)
        let l = Object.values(player.tptr_s.buyables).reduce((a,c,i) => Decimal.add(a, c).plus(toNumber(Object.keys(player.tptr_s.buyables)[i])<15?tmp.tptr_s.freeSpaceBuildings1to4:0)).plus(tmp.tptr_s.freeSpaceBuildings.times(len));
        return l;
    },
    manualBuildingLevels() {
        let len = Object.keys(player.tptr_s.buyables).length
        if (len==0) return new Decimal(0);
        if (len==1) return Object.values(player.tptr_s.buyables)[0]
        let l = Object.values(player.tptr_s.buyables).reduce((a,c) => Decimal.add(a, c));
        return l;
    },
    buildingPower() {
        if (!player.tptr_s.unlocked || inChallenge("tptr_h", 21)) return new Decimal(0);
        let pow = new Decimal(1);
        if (hasUpgrade("tptr_s", 21)) pow = pow.plus(0.08);
        if (hasChallenge("tptr_h", 21)) pow = pow.plus(challengeEffect("tptr_h", 21).div(100));
        if (player.tptr_ss.unlocked) pow = pow.plus(layers.tptr_ss.eff2());
        if (hasUpgrade("tptr_ss", 42)) pow = pow.plus(1);
        if (hasUpgrade("tptr_ba", 12)) pow = pow.plus(upgradeEffect("tptr_ba", 12));
        
        pow = pow.plus(tmp.tptc_s.buyables[19].effect.sub(1));
        return pow;
    },
    tabFormat: ["main-display",
        "prestige-button",
        "blank",
        ["display-text", function() {return '你的最佳空间能量是 ' + formatWhole(player.tptr_s.best)}],
        "blank",
        "milestones", "blank", 
        ["display-text", function() {return '你有 ' + format(player.tptr_g.power) + ' 生成器能量'}],
        ["display-text", function() {return '你的空间能量提供了 ' + formatWhole(tmp.tptr_s.space) + ' 空间'}],
        ["display-text", function() {return tmp.tptr_s.buildingPower.eq(1)?"":("空间建筑能量: "+format(tmp.tptr_s.buildingPower.times(100))+"%")}],
        "blank",
        "buyables", "blank", "upgrades"],
    divBuildCosts() {
        let div = new Decimal(1);
        if (hasUpgrade("tptr_s", 23)) div = div.times(1e20);
        if (player.tptr_ss.unlocked) div = div.times(tmp.tptr_ss.eff3);
        return div;
    },
    buildScalePower() {
        let scale = new Decimal(1);
        if (hasUpgrade("tptr_p", 42)) scale = scale.times(.5);
        return scale;
    },
    buyables: {
        rows: 1,
        cols: 10,
        showRespec() { return player.tptr_s.unlocked },
        respec() {
            player[this.layer].spent = new Decimal(0);
            resetBuyables(this.layer)
            doReset(this.layer, true)
        },
        respecText: "重置空间建筑",
        11: {
            title: "主要空间建筑",
            costExp() { 
                let exp = 1.35;
                return exp;
            },
            cost(x=player[this.layer].buyables[this.id]) {
                let base = tmp.tptr_s.buildingBaseCosts[this.id];
                if (x.eq(0)) return new Decimal(0);
                return Decimal.pow(base, x.times(tmp.tptr_s.buildScalePower).pow(tmp[this.layer].buyables[this.id].costExp)).times(base).div(tmp.tptr_s.divBuildCosts);
            },
            freeLevels() {
                let levels = tmp.tptr_s.freeSpaceBuildings.plus(tmp.tptr_s.freeSpaceBuildings1to4);
                return levels;
            },
            effect(x=player[this.layer].buyables[this.id]) {
                let eff = Decimal.pow(x.plus(1).plus(tmp.tptr_s.freeSpaceBuildings).times(tmp.tptr_s.buildingPower), player.tptr_s.points.sqrt()).times(x.plus(tmp.tptr_s.buyables[this.id].freeLevels).times(tmp.tptr_s.buildingPower).max(1).times(4)).max(1);
                return eff;
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return ("成本: " + formatWhole(data.cost) + " 生成器能量\n\
                等级: " + formatWhole(player[this.layer].buyables[this.id])+(data.freeLevels.gt(0)?(" + "+formatWhole(data.freeLevels)):"") + "\n\
                空间能量将重写点数获取和声望点数获取乘以" + format(data.effect)+"倍");
            },
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() {
                return player.tptr_g.power.gte(tmp[this.layer].buyables[this.id].cost) && layers.tptr_s.space().gt(0)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.tptr_g.power = player.tptr_g.power.sub(cost)
                player.tptr_s.spent = player.tptr_s.spent.plus(1);
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            target() { return player.tptr_g.power.times(tmp.tptr_s.divBuildCosts).div(tmp.tptr_s.buildingBaseCosts[this.id]).max(1).log(tmp.tptr_s.buildingBaseCosts[this.id]).root(tmp[this.layer].buyables[this.id].costExp).div(tmp.tptr_s.buildScalePower).plus(1).floor().min(player[this.layer].buyables[this.id].plus(layers.tptr_s.space())) }, 
            buyMax() {
                if (!this.canAfford() || !this.unlocked()) return;
                let target = this.target();
                player.tptr_s.spent = player.tptr_s.spent.plus(target.sub(player[this.layer].buyables[this.id]))
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            }, 
            style: {'height':'100px'},
        },
        12: {
            title: "次要空间建筑",
            costExp() { 
                let exp = 1.35;
                return exp;
            },
            cost(x=player[this.layer].buyables[this.id]) {
                let base = tmp.tptr_s.buildingBaseCosts[this.id];
                return Decimal.pow(base, x.times(tmp.tptr_s.buildScalePower).pow(tmp[this.layer].buyables[this.id].costExp)).times(base).div(tmp.tptr_s.divBuildCosts);
            },
            freeLevels() {
                let levels = tmp.tptr_s.freeSpaceBuildings.plus(tmp.tptr_s.freeSpaceBuildings1to4);
                return levels;
            },
            effect(x=player[this.layer].buyables[this.id]) {
                let eff = x.plus(tmp.tptr_s.buyables[this.id].freeLevels).times(tmp.tptr_s.buildingPower).sqrt();
                return eff;
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return ("成本: " + formatWhole(data.cost) + " 生成器能量\n\
                等级: " + formatWhole(player[this.layer].buyables[this.id])+(data.freeLevels.gt(0)?(" + "+formatWhole(data.freeLevels)):"") + "\n\
                将助推器/生成器基础值增加" + format(data.effect));
            },
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() {
                return player.tptr_g.power.gte(tmp[this.layer].buyables[this.id].cost) && layers.tptr_s.space().gt(0)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.tptr_g.power = player.tptr_g.power.sub(cost)
                player.tptr_s.spent = player.tptr_s.spent.plus(1);
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            target() { return player.tptr_g.power.times(tmp.tptr_s.divBuildCosts).div(tmp.tptr_s.buildingBaseCosts[this.id]).max(1).log(tmp.tptr_s.buildingBaseCosts[this.id]).root(tmp[this.layer].buyables[this.id].costExp).div(tmp.tptr_s.buildScalePower).plus(1).floor().min(player[this.layer].buyables[this.id].plus(layers.tptr_s.space())) }, 
            buyMax() {
                if (!this.canAfford() || !this.unlocked()) return;
                let target = this.target();
                player.tptr_s.spent = player.tptr_s.spent.plus(target.sub(player[this.layer].buyables[this.id]))
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            }, 
            style: {'height':'100px'},
        },
        13: {
            title: "三级空间建筑",
            costExp() { 
                let exp = 1.35;
                return exp;
            },
            cost(x=player[this.layer].buyables[this.id]) {
                let base = tmp.tptr_s.buildingBaseCosts[this.id];
                return Decimal.pow(base, x.times(tmp.tptr_s.buildScalePower).pow(tmp[this.layer].buyables[this.id].costExp)).times(base).div(tmp.tptr_s.divBuildCosts);
            },
            freeLevels() {
                let levels = tmp.tptr_s.freeSpaceBuildings.plus(tmp.tptr_s.freeSpaceBuildings1to4);
                return levels;
            },
            effect(x=player[this.layer].buyables[this.id]) {
                let eff = Decimal.pow(1e18, x.plus(tmp.tptr_s.buyables[this.id].freeLevels).times(tmp.tptr_s.buildingPower).pow(0.9))
                if(eff.gte(new Decimal("e1e12"))){
                    return Decimal.pow(10, eff.log10().root(3).times(new Decimal("e1e12").log10().pow(2/3)));
                }
                return eff;
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return ("成本: " + formatWhole(data.cost) + " 生成器能量\n\
                等级: " + formatWhole(player[this.layer].buyables[this.id])+(data.freeLevels.gt(0)?(" + "+formatWhole(data.freeLevels)):"") + "\n\
                将助推器/生成器成本除以" + format(data.effect));
            },
            unlocked() { return player[this.layer].unlocked && player.tm.buyables[7].gte(5) }, 
            canAfford() {
                return player.tptr_g.power.gte(tmp[this.layer].buyables[this.id].cost) && layers.tptr_s.space().gt(0)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.tptr_g.power = player.tptr_g.power.sub(cost)
                player.tptr_s.spent = player.tptr_s.spent.plus(1);
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            target() { return player.tptr_g.power.times(tmp.tptr_s.divBuildCosts).div(tmp.tptr_s.buildingBaseCosts[this.id]).max(1).log(tmp.tptr_s.buildingBaseCosts[this.id]).root(tmp[this.layer].buyables[this.id].costExp).div(tmp.tptr_s.buildScalePower).plus(1).floor().min(player[this.layer].buyables[this.id].plus(layers.tptr_s.space())) }, 
            buyMax() {
                if (!this.canAfford() || !this.unlocked()) return;
                let target = this.target();
                player.tptr_s.spent = player.tptr_s.spent.plus(target.sub(player[this.layer].buyables[this.id]))
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            }, 
            style: {'height':'100px'},
        },
        14: {
            title: "四级空间建筑",
            costExp() { 
                let exp = 1.35;
                return exp;
            },
            cost(x=player[this.layer].buyables[this.id]) {
                let base = tmp.tptr_s.buildingBaseCosts[this.id];
                let cost = Decimal.pow(base, x.times(tmp.tptr_s.buildScalePower).pow(tmp[this.layer].buyables[this.id].costExp)).times(base);
                if (hasUpgrade("tptr_s", 15)) cost = cost.root(3);
                return cost.div(tmp.tptr_s.divBuildCosts);
            },
            freeLevels() {
                let levels = tmp.tptr_s.freeSpaceBuildings.plus(tmp.tptr_s.freeSpaceBuildings1to4);
                return levels;
            },
            effect(x=player[this.layer].buyables[this.id]) {
                let ret = x.plus(tmp.tptr_s.buyables[this.id].freeLevels).times(tmp.tptr_s.buildingPower).times((hasUpgrade("tptr_s", 15))?3:1).add(1).pow(1.25);
                if(ret.gte(1e6))return ret.log10().pow(1).times(new Decimal(1e6).div(new Decimal(1e6).log10().pow(1)));
                return ret
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "成本: " + formatWhole(data.cost) + " 生成器能量\n\
                等级: " + formatWhole(player[this.layer].buyables[this.id])+(data.freeLevels.gt(0)?(" + "+formatWhole(data.freeLevels)):"") + "\n\
                <b>折扣一</b>效果提升至" + format(data.effect)+"次方";
            },
            unlocked() { return player[this.layer].unlocked&&hasUpgrade("tptr_s", 14) }, 
            canAfford() {
                return player.tptr_g.power.gte(tmp[this.layer].buyables[this.id].cost) && layers.tptr_s.space().gt(0)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.tptr_g.power = player.tptr_g.power.sub(cost)
                player.tptr_s.spent = player.tptr_s.spent.plus(1);
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            target() { return player.tptr_g.power.times(tmp.tptr_s.divBuildCosts).pow(hasUpgrade("tptr_s", 15)?3:1).div(tmp.tptr_s.buildingBaseCosts[this.id]).max(1).log(tmp.tptr_s.buildingBaseCosts[this.id]).root(tmp[this.layer].buyables[this.id].costExp).div(tmp.tptr_s.buildScalePower).plus(1).floor().min(player[this.layer].buyables[this.id].plus(layers.tptr_s.space())) }, 
            buyMax() {
                if (!this.canAfford() || !this.unlocked()) return;
                let target = this.target();
                player.tptr_s.spent = player.tptr_s.spent.plus(target.sub(player[this.layer].buyables[this.id]))
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            }, 
            style: {'height':'100px'},
        },
        15: {
            title: "五级空间建筑",
            cost(x=player[this.layer].buyables[this.id]) {
                let base = tmp.tptr_s.buildingBaseCosts[this.id];
                let cost = Decimal.pow(base, x.times(tmp.tptr_s.buildScalePower).pow(1.35)).times(base);
                return cost.div(tmp.tptr_s.divBuildCosts);
            },
            freeLevels() {
                let levels = tmp.tptr_s.freeSpaceBuildings;
                return levels;
            },
            effect(x=player[this.layer].buyables[this.id]) {
                let ret = x.plus(tmp.tptr_s.buyables[this.id].freeLevels).times(tmp.tptr_s.buildingPower).div(2);
                if (hasUpgrade("tptr_q", 32)) ret = ret.times(2);
                return ret.floor();
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "成本: " + formatWhole(data.cost) + " 生成器能量\n\
                等级: " + formatWhole(player[this.layer].buyables[this.id])+(data.freeLevels.gt(0)?(" + "+formatWhole(data.freeLevels)):"") + "\n\
                为所有之前的空间建筑增加" + formatWhole(data.effect)+"级";
            },
            unlocked() { return player[this.layer].unlocked&&hasUpgrade("tptr_s", 25) }, 
            canAfford() {
                return player.tptr_g.power.gte(tmp[this.layer].buyables[this.id].cost) && layers.tptr_s.space().gt(0)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.tptr_g.power = player.tptr_g.power.sub(cost)
                player.tptr_s.spent = player.tptr_s.spent.plus(1);
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            target() { return player.tptr_g.power.times(tmp.tptr_s.divBuildCosts).div(tmp.tptr_s.buildingBaseCosts[this.id]).max(1).log(tmp.tptr_s.buildingBaseCosts[this.id]).root(1.35).div(tmp.tptr_s.buildScalePower).plus(1).floor().min(player[this.layer].buyables[this.id].plus(layers.tptr_s.space())) }, 
            buyMax() {
                if (!this.canAfford() || !this.unlocked()) return;
                let target = this.target();
                player.tptr_s.spent = player.tptr_s.spent.plus(target.sub(player[this.layer].buyables[this.id]))
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            }, 
            style: {'height':'100px'},
        },
    },
    canBuyMax() {return player.tptr_s.best.gte(7)},
    resetsNothing() {return player.tptr_ss.best.gte(1)},
    autoPrestige() {return player.tptr_ss.best.gte(1)},
    milestones: {
        0: {
            requirementDescription: "1点空间能量",
            done() { return player[this.layer].best.gte(1) },
            effectDescription: "自动购买生成器，生成器重置不影响任何内容",
        },
        1: {
            requirementDescription: "7点空间能量",
            done() { return player[this.layer].best.gte(7) },
            effectDescription: "可以批量购买空间能量",
        },
    },
    upgrades: {
        rows: 3,
        cols: 5,
        11: {
            title: "空间X",
            description: "为所有空间建筑增加1个免费等级",
            cost() { return new Decimal(2) },
            unlocked() { return player.tm.buyables[7].gte(5) }
        },
        12: {
            title: "生成器生成器",
            description: "生成器能量提升自身生成",
            cost() { return new Decimal(3) },
            unlocked() { return hasUpgrade("tptr_s", 11) },
            effect() { return player.tptr_g.power.add(1).log10().add(1) },
            effectDisplay() { return format(tmp.tptr_s.upgrades[12].effect)+"倍" },
        },
        13: {
            title: "运走",
            description: "空间建筑等级提升生成器能量获取，并获得额外2点空间",
            cost() { return new Decimal(32) },
            unlocked() { return hasUpgrade("tm", 34) },
            effect() { 
                let eff=Decimal.pow(20, tmp.tptr_s.totalBuildingLevels);
                if(eff.gte(new Decimal("e1.5e11"))){
                    return Decimal.pow(10, eff.log10().root(5).times(new Decimal("e1.5e11").log10().pow(4/5)));
                }
                return eff;
            },
            effectDisplay() { return format(tmp.tptr_s.upgrades[13].effect)+"倍" },
        },
        14: {
            title: "进入重复",
            description: "解锁<b>四级空间建筑</b>",
            cost() { return new Decimal(33) },
            unlocked() { return hasUpgrade("tm", 34) }
        },
        15: {
            title: "四方",
            description: "<b>四级空间建筑</b>成本立方根，效果提升3倍，并影响<b>BP组合</b>(提升至2.7次方根)",
            cost() { return new Decimal(44) },
            unlocked() { return hasUpgrade("tptr_s", 14) },
        },
        21: {
            title: "宽敞",
            description: "所有空间建筑效果提升8%",
            cost() { return new Decimal(50) },
            unlocked() { return player.tm.buyables[7].gte(11) },
        },
        22: {
            title: "时空异常",
            description: "非额外时间胶囊提供免费空间建筑",
            cost() { return new Decimal(51) },
            unlocked() { return player.tm.buyables[7].gte(11) },
            effect() { return player.tptr_t.points.cbrt().floor() },
            effectDisplay() { return "+"+formatWhole(tmp.tptr_s.upgrades[22].effect) },
        },
        23: {
            title: "反转空间",
            description: "在TPTC和TPTR中空间层的需求降为1，所有空间建筑成本除以1e20",
            cost() { return new Decimal(52) },
            unlocked() { return player.tm.buyables[7].gte(11) },
        },
        24: {
            title: "想要更多？",
            description: "所有四个<b>我需要更多</b>升级基于总空间建筑等级更强",
            cost() { return new Decimal(54) },
            unlocked() { return player.tm.buyables[7].gte(11) },
            effect() {
                return tmp.tptr_s.totalBuildingLevels.sqrt().div(5).plus(1);
            },
            effectDisplay() { return format(tmp.tptr_s.upgrades[24].effect.sub(1).times(100))+"%更强" },
        },
        25: {
            title: "再来一个？",
            description: "解锁五级空间建筑",
            cost() { return new Decimal(54) },
            unlocked() { return player.tm.buyables[7].gte(13) },
        },
    },
});

// 超级助推器层
addLayer("tptr_sb", {
    name: "超级助推器层",
    symbol: "SB",
    position: 0,
    color: "#504899",
    requires(){
        let ret=new Decimal(1000);
        if(hasUpgrade("tptc_p",35))ret = ret.sub(125);
        if(hasUpgrade("tptc_p",45))ret = ret.sub(100);
        if(hasChallenge("tptr_h",11))ret = ret.sub(50);
        if(hasUpgrade("tptc_sb",12))ret = ret.sub(50);
        if(player.tm.buyables[7].gte(12))ret = ret.sub(25);
        if(player.tm.buyables[7].gte(13))ret = ret.sub(50);
        if(player.tm.buyables[7].gte(14))ret = ret.sub(75);
        if(player.tm.buyables[7].gte(15))ret = ret.sub(50);
        if(player.tm.buyables[7].gte(19))ret = ret.sub(75);
        if(hasChallenge("tptc_h",31))ret = ret.sub(100);
        return ret
    },
    resource: "超级助推器",
    baseResource: "助推器", 
    baseAmount() {return player.tptr_b.points},
    roundUpCost: true,
    type: "static",
    branches: ["tptr_b"],
    exponent() { return 1.25 },
    base() { return 1.05 },
    gainMult() { 
        let mult = new Decimal(1);
        if (hasUpgrade("tptr_ss", 21)) mult = mult.div(1.2);
        return mult;
    },
    row: 2,
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",36)},
    doReset(l){
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || l=="tptr_t" || l=="tptr_e" || l=="tptr_s" || l=="tptr_sb" || l=="tptr_sg" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_sb.best);
        layerDataReset("tptr_sb",["upgrades","milestones","challenges"]);
        player.tptr_sb.best=b;
        return;
    },
    effectBase() {
        let base = new Decimal(5);
        if (hasChallenge("tptr_h", 12)) base = base.plus(.25);
        return base;
    },
    effect() {
        return [Decimal.pow(this.effectBase(), player.tptr_sb.points).max(0),player.tptr_sb.points.add(1).pow(hasUpgrade("tptc_sb",14)?2:hasUpgrade("tptc_sb",11)?1.15:1)];
    },
    effectDescription() {
        return "将助推器基础值乘以"+format(tmp.tptr_sb.effect[0])+"倍，并在TPTC中将超级助推器基础值提升"+format(tmp.tptr_sb.effect[1])+"倍"
    },
    tabFormat: ["main-display",
        "prestige-button",
        "blank",
    ],
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
    }},
    canBuyMax() {return player.tptr_o.best.gte(1)},
    resetsNothing() {return player.tptr_o.best.gte(1)},
    autoPrestige() {return player.tptr_o.best.gte(1)},
})

// 超级生成器层
addLayer("tptr_sg", {
    name: "超级生成器层",
    symbol: "SG",
    position: 4,
    color: "#248239",
    requires(){
        let ret=new Decimal(966);
        if(hasUpgrade("tptc_sg",11))ret = ret.sub(56);
        if(hasUpgrade("tptc_sg",12))ret = ret.sub(80);
        if(hasUpgrade("tptc_sg",14))ret = ret.sub(100);
        if(player.tm.buyables[7].gte(13))ret = ret.sub(60);
        if(player.tm.buyables[7].gte(14))ret = ret.sub(70);
        if(player.tm.buyables[7].gte(19))ret = ret.sub(50);
        if(hasUpgrade("tptr_q",33))ret = ret.sub(150);
        if(hasChallenge("tptc_h",31))ret = ret.sub(100);
        return ret
    },
    resource: "超级生成器",
    baseResource: "生成器", 
    baseAmount() {return player.tptr_g.points},
    roundUpCost: true,
    type: "static",
    branches: ["tptr_g"],
    exponent() { return 1.25 },
    base() { return 1.05 },
    gainMult() { 
        let mult = new Decimal(1);
        if (hasUpgrade("tptr_ss", 21)) mult = mult.div(1.2);
        return mult;
    },
    row: 2,
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",37)},
    update(diff) {
        player.tptr_sg.power = player.tptr_sg.power.plus(tmp.tptr_sg.effect[0].times(diff));
        player.tptr_sg.time = player.tptr_sg.time.plus(diff);
    },
    doReset(l){
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || l=="tptr_t" || l=="tptr_e" || l=="tptr_s" || l=="tptr_sb" || l=="tptr_sg" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_sg.best);
        layerDataReset("tptr_sg",["upgrades","milestones","challenges"]);
        player.tptr_sg.best=b;
        return;
    },
    effectBase() {
        let base = new Decimal(5);
        if (hasUpgrade("tptr_ss", 32)) base = base.plus(upgradeEffect("tptr_ss", 32));
        if (hasUpgrade("tptr_ba", 32)) base = base.times(upgradeEffect("tptr_ba", 32));
        return base;
    },
    effect() {
        let eff = Decimal.pow(this.effectBase(), player.tptr_sg.points).sub(1).max(0);
        if (player.tm.buyables[7].gte(20)) eff = eff.times(challengeEffect("tptr_h", 31));
        return [eff,player.tptr_sg.points.add(1)];
    },
    effectDescription() {
        return "每秒生成"+format(tmp.tptr_sg.effect[0])+"超级生成器能量，并在TPTC中将超级生成器基础值提升"+format(tmp.tptr_sg.effect[1])+"倍"
    },
    enEff() {
        let eff = player.tptr_sg.power.plus(1).sqrt();
        return eff;
    },
    tabFormat: ["main-display",
        "prestige-button",
        "blank",
        ["display-text", function() {return '你有 ' + format(player.tptr_sg.power) + ' 超级生成器能量，将生成器基础值乘以'+format(tmp.tptr_sg.enEff)+'倍'}],
        "blank",
    ],
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        power: new Decimal(0),
        first: 0,
        auto: false,
        time: new Decimal(0),
    }},
    canBuyMax() {return player.tptr_ss.best.gte(8)},
    resetsNothing() {return player.tptr_ss.best.gte(8)},
    autoPrestige() {return player.tptr_ss.best.gte(8)},
})


// 阻碍精神层
addLayer("tptr_h", {
    name: "阻碍精神层",
    symbol: "H",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        chall31bought: 0,
        first: 0,
        auto: false,
    }},
    color: "#a14040",
    requires: new Decimal(1e30),
    resource: "阻碍精神",
    baseResource: "时间能量", 
    baseAmount() {return player.tptr_t.energy},
    type: "normal",
    exponent: 0.125,
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade("tptr_q", 14)) mult = mult.times(upgradeEffect("tptr_q", 14).h);
        if (player.tptr_m.unlocked) mult = mult.times(tmp.tptr_m.hexEff);
        if (hasUpgrade("tptr_ba", 22)) mult = mult.times(tmp.tptr_ba.negBuff);
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 3,
    doReset(l){
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || l=="tptr_t" || l=="tptr_e" || l=="tptr_s" || l=="tptr_sb" || l=="tptr_sg" || l=="tptr_o" || l=="tptr_h" || l=="tptr_q" || l=="tptr_ss" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_h.best);
        layerDataReset("tptr_h",["upgrades","milestones","challenges"]);
        player.tptr_h.best=b;
        return;
    },
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",46)},
    branches: ["tptr_t"],
    effect() { 
        if (!player[this.layer].unlocked) return [new Decimal(1),new Decimal(1)];
        let h = player.tptr_h.points.times(player.modpoints[7].plus(1).log("1e1000").plus(1));
        
        if(h.gte(15e4)){
            h=Decimal.pow(10, h.log10().root(4).times(new Decimal(15e4).log10().pow(3/4)));
        }
        
        let eff = h.plus(1).pow(3).pow(hasChallenge("tptr_h", 11)?1.2:1).pow(hasUpgrade("tptr_ba", 21)?8:1);
        if(hasUpgrade("tptr_ba", 21))return [eff,eff];
        return [eff,new Decimal(1)];
    },
    effectDescription() {
        if(hasUpgrade("tptr_ba", 21))return "将重写点数获取、时间能量获取、TPTR中的时间能量上限和TPTC中的真实声望树(H挑战)效果乘以"+format(tmp.tptr_h.effect[0])+"倍(由重写点数增强)"
        return "将重写点数获取、时间能量获取和时间能量上限乘以"+format(tmp.tptr_h.effect[0])+"倍(由重写点数增强)"
    },
    milestones: {
        0: {
            requirementDescription: "1点阻碍精神",
            done() { return player.tptr_h.best.gte(1) },
            effectDescription: "自动购买时间胶囊，时间胶囊重置不影响任何内容。自动购买额外时间胶囊。",
        },
    },
    challenges: {
        rows: 4,
        cols: 2,
        11: {
            name: "真实声望树Mk.II",
            completionLimit: 1,
            challengeDescription: "在TPTC中强制重置第7行。你被困在TPTC的'真实声望树'中。",
            unlocked() { return player.tptr_h.unlocked },
            goal() { return new Decimal("e574e5") },
            currencyDisplayName: "点数",
            currencyInternalName: "points",
            rewardDescription: "阻碍精神效果提升至1.2次方。超级助推器更便宜。在TPTC的H层解锁新挑战。",
        },
        12: {
            name: "无声望Mk.II",
            completionLimit: 1,
            challengeDescription: "在TPTC中强制重置第7行。你被困在TPTC的'无声望'中。此外，TPTR中的声望点数获取为0。",
            unlocked() { return player.tm.buyables[7].gte(8) },
            goal() { return new Decimal("e522e5") },
            currencyDisplayName: "点数",
            currencyInternalName: "points",
            rewardDescription() { return "超级助推器基础值增加0.25。在TPTC的H层解锁新挑战。" },
        },
        21: {
            name: "空间不足",
            completionLimit: 1,
            challengeDescription: "在TPTC中强制重置第7行。TPTC和TPTR中的空间建筑被禁用。",
            unlocked() { return player.tm.buyables[7].gte(15) },
            goal() { return new Decimal("e212e6") },
            currencyDisplayName: "点数",
            currencyInternalName: "points",
            rewardDescription: "空间能量增强空间建筑的强度。",
            rewardEffect() { return player.tptr_s.points.div(2).times(1) },
            rewardDisplay() { return format(this.rewardEffect())+"%更强(加法)" },
        },
        22: {
            name: "降级",
            completionLimit: 1,
            challengeDescription: "在TPTC中强制重置第7行。唯一能提升点数生成的只有来自除TPTC和TPTR外的树的点数获取倍数升级和可购买项。",
            unlocked() { return player.tm.buyables[7].gte(16) },
            goal() { return new Decimal("ee8") },
            currencyDisplayName: "点数",
            currencyInternalName: "points",
            rewardDescription: "<b>声望提升</b>的硬上限现在变为软上限。",
        },
        31: {
            name: "永恒",
            scalePower() {
                let power = new Decimal(1);
                return power;
            },
            completionLimit() { 
                let lim = 10
                if (hasUpgrade("tptr_ss", 23)) lim += 10;
                if (player.tm.buyables[7].gte(23)) lim += 10;
                return lim
            },
            challengeDescription() {
                let lim = this.completionLimit();
                let infLim = !isFinite(lim);
                return "在TPTC中强制重置第7行。TPTC和TPTR中的增强器和额外时间胶囊无效。<br>完成次数: "+formatWhole(challengeCompletions("tptr_h", 31))+(infLim?"":("/"+lim));
            },
            unlocked() { return player.tm.buyables[7].gte(20) },
            goal() { 
                let comps = Decimal.mul(challengeCompletions("tptr_h", 31), tmp.tptr_h.challenges[this.id].scalePower);
                return Decimal.pow("e1e7", Decimal.pow(comps, 2)).times("e51e7") 
            },
            completeInBulk() {
                return;
                if (!inChallenge("tptr_h", 31)) return;
                if (challengeCompletions("tptr_h", 31)>=tmp[this.layer].challenges[this.id].completionLimit) return;
                let target = player.points.div("1e5325").max(1).log("1e50").root(2.5)
                if (target.gte(20)) target = target.sub(19).root(1.95).plus(19);
                target = target.div(tmp.tptr_h.challenges[this.id].scalePower).plus(1).floor();
                player.tptr_h.challenges[this.id] = Math.min(Math.max(player.tptr_h.challenges[this.id], target.toNumber()), tmp[this.layer].challenges[this.id].completionLimit);
                if (isNaN(player.tptr_h.challenges[this.id])) player.tptr_h.challenges[this.id] = 0;
            },
            currencyDisplayName: "点数",
            currencyInternalName: "points",
            rewardDescription() { return "<b>永恒</b>完成次数基于游戏时间提升超级生成器能量获取。" },
            rewardEffect() { 
                let eff = Decimal.mul(9, Decimal.add(player.timePlayed, 1).cbrt()).plus(1).pow(challengeCompletions("tptr_h", 31));
                if (!eff.eq(eff)) eff = new Decimal(1);
                return eff;
            },
            rewardDisplay() { return format(this.rewardEffect())+"倍" },
        },
        32: {
            name: "选项D",
            scalePower() {
                let power = new Decimal(1);
                return power;
            },
            completionLimit() { 
                let lim = 10;
                return lim;
            },
            challengeDescription() { 
                let lim = this.completionLimit();
                let infLim = !isFinite(lim);
                return '在TPTC中强制重置第7行。TPTC和TPTR中的助推器、生成器、时间胶囊、增强器和空间建筑无效。<br>完成次数: '+formatWhole(challengeCompletions("tptr_h", 32))+(infLim?"":('/'+lim))
            },
            goal() {
                let comps = Decimal.mul(challengeCompletions("tptr_h", 32), tmp.tptr_h.challenges[this.id].scalePower);
                return Decimal.pow("e5e10", Decimal.pow(comps, 3)).times("e4e11");
            },
            completeInBulk() {
                return;
                if (challengeCompletions("h", 32)>=tmp[this.layer].challenges[this.id].completionLimit) return;
                let target = player.points.div("1e9000").max(1).log("1e1000").cbrt();
                if (target.gte(3.04)) target = target.div(1.425);
                if (target.gte(3)) target = target.plus(.96);
                target = target.div(tmp.h.challenges[this.id].scalePower).plus(1).floor();
                player.h.challenges[this.id] = Math.min(Math.max(player.h.challenges[this.id], target.toNumber()), tmp[this.layer].challenges[this.id].completionLimit);
                if (isNaN(player.h.challenges[this.id])) player.h.challenges[this.id] = 0;
            },
            currencyDisplayName: "点数",
            currencyInternalName: "points",
            rewardDescription: "<b>选项D</b>完成次数乘以时间能量获取基础值。",
            rewardEffect() { 
                let eff = Decimal.pow(100, Decimal.pow(challengeCompletions("tptr_h", 32), 2));
                if(eff.gte(1e33))eff = Decimal.pow(10,eff.log10().div(33).cbrt().mul(33));
                if (!eff.eq(eff)) eff = new Decimal(1);
                return eff;
            },
            rewardDisplay() { return format(tmp.tptr_h.challenges[32].rewardEffect)+"倍" },
            unlocked() { return (tmp.tptr_ps.buyables[11].effects.hindr||0)>=1 },
            countsAs: [21,31,41]
        },
        41: {
            name: "无助推器/生成器Mk.II",
            completionLimit: 1,
            challengeDescription: "在TPTC中强制重置第7行。TPTC和TPTR中的助推器和生成器无效。",
            unlocked() { return player.tm.buyables[7].gte(24) },
            goal() { return new Decimal("e115e8") },
            currencyDisplayName: "点数",
            currencyInternalName: "points",
            rewardDescription: "助推器和生成器的第二效果更好。在TPTC的H层解锁新挑战。",
        },
    },
    milestones: {
        1: {
            requirementDescription: "TPTR等级23",
            unlocked() { return player.tm.buyables[7].gte(20) },
            done() { return player.tm.buyables[7].gte(23) },
            effectDescription: "每秒获得100%的阻碍精神获取，并增加10次永恒最大完成次数。",
        },
    },
    passiveGeneration(){
        if(player.tm.buyables[7].gte(23))return 1;
        return 0;
    },
})

// 特质层
addLayer("tptr_q", {
    name: "特质层",
    symbol: "Q",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        energy: new Decimal(0),
        time: new Decimal(0),
        auto: false,
        first: 0,
        pseudoUpgs: [],
    }},
    color: "#c20282",
    requires(){
        if(player.tm.buyables[7].gte(10))return new Decimal("1e512");
        if(player.tm.buyables[7].gte(9))return new Decimal("1e1000");
        return new Decimal("1e1500");
    },
    resource: "特质",
    baseResource: "生成器能量", 
    baseAmount() {return player.tptr_g.power},
    type: "normal",
    exponent() { return 0.0075; },
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade("tptr_q", 14)) mult = mult.times(upgradeEffect("tptr_q", 14).q);
        if (player.tptr_m.unlocked) mult = mult.times(tmp.tptr_m.hexEff);
        mult = mult.times(tmp.tptr_q.impr[33].effect);
        if (hasUpgrade("tptr_ba", 22)) mult = mult.times(tmp.tptr_ba.negBuff);
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 3,
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",47)},
    doReset(l){
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || l=="tptr_t" || l=="tptr_e" || l=="tptr_s" || l=="tptr_sb" || l=="tptr_sg" || l=="tptr_o" || l=="tptr_h" || l=="tptr_q" || l=="tptr_ss" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_q.best);
        layerDataReset("tptr_q",["upgrades","milestones","challenges"]);
        player.tptr_q.best=b;
        return;
    },
    branches: ["tptr_e"],
    enGainMult() {
        let mult = new Decimal(1);
        if (hasUpgrade("tptr_q", 11)) mult = mult.times(upgradeEffect("tptr_q", 11));
        if (hasUpgrade("tptr_q", 21)) mult = mult.times(upgradeEffect("tptr_q", 21));
        if (player.tptr_o.unlocked) mult = mult.times(buyableEffect("tptr_o", 12));
        if (player.tptr_ba.unlocked) mult = mult.times(tmp.tptr_ba.negBuff);
        return mult;
    },
    enGainExp() {
        let exp = player.tptr_q.buyables[11].plus(tmp.tptr_q.freeLayers).sub(1);
        return exp;
    },
    enEff() {
        let eff = player.tptr_q.energy.plus(1).pow(2);
        if (hasUpgrade("tptr_q", 23)) eff = eff.pow(3);
        eff = eff.times(tmp.tptr_q.impr[23].effect)
        if(eff.gte(new Decimal("e1800000")))eff = Decimal.pow(10,eff.log10().mul(1800000).sqrt());
        return eff;
    },
    update(diff) {
        player.tptr_q.time = player.tptr_q.time.plus(diff);
        if (tmp.tptr_q.enGainExp.gte(0)) player.tptr_q.energy = player.tptr_q.energy.plus(new Decimal(player.timePlayed).times(tmp.tptr_q.enGainMult).pow(tmp.tptr_q.enGainExp).times(diff));
        if (player.tptr_ba.best.gte(1)) layers.tptr_q.buyables[11].buyMax();
    },
    effect() {
        let ret = player.tptr_q.points.add(1);
        return ret;
    },
    effectDescription() {
        let eff = this.effect();
        return "在TPTC中将特质层基础值提升"+format(eff)+"倍"
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        ["display-text", function() {return '你有 ' + formatWhole(player.tptr_g.power)+' 生成器能量'},{}],
        "blank",
        ["display-text", function() {return '你有 ' + formatWhole(player.tptr_q.energy)+' 特质能量，将重写点数和生成器能量获取乘以' + format(tmp.tptr_q.enEff)+'倍'},{}],
        "blank",
        "milestones", "blank",
        "blank",
        "buyables", "blank",
        ["display-text", function() {if(!hasUpgrade("tptr_q", 41))return "";return '你有 ' + layers.tptr_q.getImprovements(11)+' 核心改进(下次在'+format(layers.tptr_q.impr.nextAt(11))+'特质能量)，<b>特质核心</b>效果^' + format(tmp.tptr_q.impr[11].effect)},{}],
        ["display-text", function() {if(!hasUpgrade("tptr_q", 41))return "";return '你有 ' + layers.tptr_q.getImprovements(12)+' 次级改进(下次在'+format(layers.tptr_q.impr.nextAt(12))+'特质能量)，<b>回到第二行</b>效果x' + format(tmp.tptr_q.impr[12].effect)},{}],
        ["display-text", function() {if(!hasUpgrade("tptr_q", 41))return "";return '你有 ' + layers.tptr_q.getImprovements(13)+' 四级改进(下次在'+format(layers.tptr_q.impr.nextAt(13))+'特质能量)，<b>第四行协同</b>效果^' + format(tmp.tptr_q.impr[13].effect)},{}],
        ["display-text", function() {if(!hasUpgrade("tptr_q", 42))return "";return '你有 ' + layers.tptr_q.getImprovements(21)+' 发展改进(下次在'+format(layers.tptr_q.impr.nextAt(21))+'特质能量)，<b>特质城市</b>效果^' + format(tmp.tptr_q.impr[21].effect)},{}],
        ["display-text", function() {if(!hasUpgrade("tptr_q", 42))return "";return '你有 ' + layers.tptr_q.getImprovements(22)+' 超限改进(下次在'+format(layers.tptr_q.impr.nextAt(22))+'特质能量)，<b>无限可能</b>效果x' + format(tmp.tptr_q.impr[22].effect)},{}],
        ["display-text", function() {if(!hasUpgrade("tptr_q", 42))return "";return '你有 ' + layers.tptr_q.getImprovements(23)+' 能量改进(下次在'+format(layers.tptr_q.impr.nextAt(23))+'特质能量)，特质能量效果x' + format(tmp.tptr_q.impr[23].effect)},{}],
        ["display-text", function() {if(!hasUpgrade("tptr_q", 44))return "";return '你有 ' + layers.tptr_q.getImprovements(31)+' 规模改进(下次在'+format(layers.tptr_q.impr.nextAt(31))+'特质能量)，<b>规模软化</b>效果x' + format(tmp.tptr_q.impr[31].effect)},{}],
        ["display-text", function() {if(!hasUpgrade("tptr_q", 44))return "";return '你有 ' + layers.tptr_q.getImprovements(32)+' 助推器改进(下次在'+format(layers.tptr_q.impr.nextAt(32))+'特质能量)，<b>助推器狂热</b>效果x' + format(tmp.tptr_q.impr[32].effect)},{}],
        ["display-text", function() {if(!hasUpgrade("tptr_q", 44))return "";return '你有 ' + layers.tptr_q.getImprovements(33)+' 特质改进(下次在'+format(layers.tptr_q.impr.nextAt(33))+'特质能量)，特质获取x' + format(tmp.tptr_q.impr[33].effect)},{}],
        ["display-text", function() {if((tmp.tptr_ps.buyables[11].effects.quirkImpr||0)<1)return "";return '你有 ' + layers.tptr_q.getImprovements(41)+' 太阳改进(下次在'+format(layers.tptr_q.impr.nextAt(41))+'特质能量)，太阳能量获取x' + format(tmp.tptr_q.impr[41].effect)},{}],
        ["display-text", function() {if((tmp.tptr_ps.buyables[11].effects.quirkImpr||0)<2)return "";return '你有 ' + layers.tptr_q.getImprovements(42)+' 子空间改进(下次在'+format(layers.tptr_q.impr.nextAt(42))+'特质能量)，子空间基础x' + format(tmp.tptr_q.impr[42].effect)},{}],
        ["display-text", function() {if((tmp.tptr_ps.buyables[11].effects.quirkImpr||0)<3)return "";return '你有 ' + layers.tptr_q.getImprovements(43)+' 层级改进(下次在'+format(layers.tptr_q.impr.nextAt(43))+'特质能量)，免费特质层级+' + format(tmp.tptr_q.impr[43].effect)},{}],
        "upgrades",
    ],
    freeLayers() {
        let l = new Decimal(0);
        if (player.tm.buyables[7].gte(28)) l = l.plus(tmp.tptr_m.clickables[13].effect);
        if (tmp.tptr_q.impr[43].unlocked) l = l.plus(tmp.tptr_q.impr[43].effect);
        return l;
    },
    
    impr: {
        scaleSlow() {
            let slow = new Decimal(1);
            return slow;
        },
        baseReq() { 
            let req = new Decimal(1e128);
            if (player.tptr_ps.unlocked) req = req.div(tmp.tptr_ps.soulEff);
            return req;
        },
        amount() { 
            let amt = player.tptr_q.energy.div(this.baseReq()).plus(1).log10().div(2).root(layers.tptr_q.impr.scaleSlow().pow(-1).plus(1)).max(0);
            if (amt.gte(270)) amt = amt.log10().times(270/Math.log10(270));
            return amt.floor();
        },
        overallNextImpr() { 
            let impr = tmp.tptr_q.impr.amount.plus(1);
            if (impr.gte(270)) impr = Decimal.pow(10, impr.div(270/Math.log10(270)));
            return Decimal.pow(10, impr.pow(layers.tptr_q.impr.scaleSlow().pow(-1).plus(1)).times(2)).sub(1).times(this.baseReq());
        },
        nextAt(id=11) { 
            let impr = layers.tptr_q.getImprovements(id).times(9).add(tmp.tptr_q.impr[id].num);
            if (impr.gte(270)) impr = Decimal.pow(10, impr.div(270/Math.log10(270)));
            return Decimal.pow(10, impr.pow(layers.tptr_q.impr.scaleSlow().pow(-1).plus(1)).times(2)).sub(1).times(this.baseReq());
        },
        free() {
            let free = new Decimal(0);
            return free.floor();
        },
        11: {
            num: 1,
            title: "核心改进",
            description: "<b>特质核心</b>更强。",
            unlocked() { return hasUpgrade("tptr_q", 41) },
            effect() { return Decimal.mul(0.1, layers.tptr_q.getImprovements(11).plus(tmp.tptr_q.impr.free)).plus(1) },
        },
        12: {
            num: 2,
            title: "次级改进",
            description: "<b>回到第二行</b>更强。",
            unlocked() { return hasUpgrade("tptr_q", 41) },
            effect() { return Decimal.mul(0.05, layers.tptr_q.getImprovements(12).plus(tmp.tptr_q.impr.free)).plus(1) },
        },
        13: {
            num: 3,
            title: "四级改进",
            description: "<b>第四行协同</b>更强。",
            unlocked() { return hasUpgrade("tptr_q", 41) },
            effect() { return Decimal.mul(0.25, layers.tptr_q.getImprovements(13).plus(tmp.tptr_q.impr.free)).plus(1) },
        },
        21: {
            num: 4,
            title: "发展改进",
            description: "<b>特质城市</b>更强。",
            unlocked() { return hasUpgrade("tptr_q", 42) },
            effect() { return Decimal.mul(1.5, layers.tptr_q.getImprovements(21).plus(tmp.tptr_q.impr.free)).plus(1) },
        },
        22: {
            num: 5,
            title: "超限改进",
            description: "<b>无限可能</b>更强。",
            unlocked() { return hasUpgrade("tptr_q", 42) },
            effect() { return Decimal.mul(0.2, layers.tptr_q.getImprovements(22).plus(tmp.tptr_q.impr.free)).plus(1) },
        },
        23: {
            num: 6,
            title: "能量改进",
            description: "特质能量效果更强。",
            unlocked() { return hasUpgrade("tptr_q", 42) },
            effect() { return Decimal.pow(1e25, Decimal.pow(layers.tptr_q.getImprovements(23).plus(tmp.tptr_q.impr.free), 1.5)) },
        },
        31: {
            num: 7,
            title: "规模改进",
            description: "<b>规模软化</b>更强。",
            unlocked() { return hasUpgrade("tptr_q", 44) },
            effect() { return Decimal.mul(0.5, layers.tptr_q.getImprovements(31).plus(tmp.tptr_q.impr.free)).plus(1) },
        },
        32: {
            num: 8,
            title: "助推器改进",
            description: "<b>助推器狂热</b>更强。",
            unlocked() { return hasUpgrade("tptr_q", 44) },
            effect() { return Decimal.mul(0.2, layers.tptr_q.getImprovements(32).plus(tmp.tptr_q.impr.free)).plus(1) },
        },
        33: {
            num: 9,
            title: "特质改进",
            description: "特质获取更强。",
            unlocked() { return hasUpgrade("tptr_q", 44) },
            effect() { return Decimal.pow(1e8, Decimal.pow(layers.tptr_q.getImprovements(33).plus(tmp.tptr_q.impr.free), 1.2)) },
        },
        41: {
            num: 271,
            title: "太阳改进",
            description: "太阳能量获取更强。",
            unlocked() { return (tmp.tptr_ps.buyables[11].effects.quirkImpr||0)>=1 },
            effect() { return Decimal.pow("1e400", Decimal.pow(layers.tptr_q.getImprovements(41).plus(tmp.tptr_q.impr.free), 0.9)) },
        },
        42: {
            num: 281,
            title: "子空间改进",
            description: "子空间基础更强。",
            unlocked() { return (tmp.tptr_ps.buyables[11].effects.quirkImpr||0)>=2 },
            effect() { return Decimal.pow(10, Decimal.pow(layers.tptr_q.getImprovements(42).plus(tmp.tptr_q.impr.free), 0.75)) },
        },
        43: {
            num: 301,
            title: "层级改进",
            description: "增加免费特质层级。",
            unlocked() { return (tmp.tptr_ps.buyables[11].effects.quirkImpr||0)>=3 },
            effect() { return Decimal.mul(Decimal.pow(layers.tptr_q.getImprovements(43).plus(tmp.tptr_q.impr.free), 0.8), 1.25) },
        },
    },
    getImprovements(id=11) {
        if (!player[this.layer].unlocked) return new Decimal(0);
        return tmp[this.layer].impr[id].unlocked?(tmp[this.layer].impr.amount.sub(tmp[this.layer].impr[id].num).div(9).plus(1).floor().max(0)):new Decimal(0);
    },
    buyables: {
        rows: 1,
        cols: 1,
        11: {
            title: "特质层级",
            costBase() {
                let base = new Decimal(2);
                if (hasUpgrade("tptr_q", 43)) base = base.sub(.25);
                return base;
            },
            cost(x=player[this.layer].buyables[this.id]) {
                let base = this.costBase();
                let cost = Decimal.pow(base, Decimal.pow(base, x).sub(1));
                return cost.floor()
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "你有"+format(player[this.layer].buyables[this.id])+(tmp.tptr_q.freeLayers?(tmp.tptr_q.freeLayers.gt(0)?("+"+format(tmp.tptr_q.freeLayers)):""):"")+"特质层级。<br>"+
                "它们每秒产生"+format(new Decimal(player.timePlayed).times(tmp.tptr_q.enGainMult).pow(tmp.tptr_q.enGainExp))+"特质能量。<br>"+
                "下一个特质层级成本: " + format(data.cost) + "特质";
            },
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() {
                return player.tptr_q.points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.tptr_q.points = player.tptr_q.points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                if (!this.unlocked || !this.canAfford()) return;
                let base = this.costBase();
                let target = player.tptr_q.points.max(1).log(base).plus(1).log(base);
                target = target.plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'222px'},
        },
    },
    milestones: {
        0: {
            requirementDescription: "1特质",
            done() { return player.tptr_q.best.gte(1) },
            effectDescription: "每秒获得100%的增强点数获取。自动购买增强器。",
        },
        1: {
            requirementDescription: "TPTR等级23",
            done() { return player.tm.buyables[7].gte(23) },
            effectDescription: "每秒获得100%的特质获取。",
        },
    },
    upgrades: {
        rows: 4,
        cols: 5, 
        11: {
            title: "特质核心",
            description: "总特质乘以每个特质层级的产量(由购买的特质升级增强)。",
            cost() { return new Decimal(1e50) },
            unlocked() { return player.tm.buyables[7].gte(14) },
            effect() { return player.tptr_q.total.plus(1).log10().plus(1).pow(player.tptr_q.upgrades.length).pow(tmp.tptr_q.impr[11].effect); },
            effectDisplay() { return format(tmp.tptr_q.upgrades[11].effect)+"倍" },
        },
        12: {
            title: "回到第二行",
            description: "总特质乘以助推器/生成器的基础值。",
            cost() { return new Decimal(1e60) },
            unlocked() { return player.tm.buyables[7].gte(14) },
            effect() { return player.tptr_q.total.plus(1).log10().plus(1).pow(1.25).times(tmp.tptr_q.impr[12].effect) },
            effectDisplay() { return format(tmp.tptr_q.upgrades[12].effect)+"倍" },
        },
        13: {
            title: "跳过跳过第二",
            description: "生成器能量效果提升至1.25次方。",
            cost() { return new Decimal(1e80) },
            unlocked() { return player.tm.buyables[7].gte(14) },
        },
        14: {
            title: "第四行协同",
            description: "阻碍精神和特质互相增强对方的获取。",
            cost() { return new Decimal(1e85) },
            unlocked() { return player.tm.buyables[7].gte(14) },
            effect() { 
                let q = player.tptr_q.points;
                let h = player.tptr_h.points;
                if(q.gte("1e1100"))q = Decimal.log10(q).pow(1100/3);
                if(h.gte("1e1000"))h = Decimal.log10(h).pow(1000/3);
                return {
                    h: q.plus(1).cbrt().pow(tmp.tptr_q.impr[13].effect),
                    q: h.plus(1).root(4).pow(tmp.tptr_q.impr[13].effect),
                };
            },
            effectDisplay() { return "H: "+format(tmp.tptr_q.upgrades[14].effect.h)+"倍, Q: "+format(tmp.tptr_q.upgrades[14].effect.q)+"倍" },
        },
        21: {
            title: "特质城市",
            description: "超级助推器乘以每个特质层级的产量。",
            cost() { return new Decimal(1e100) },
            unlocked() { return player.tm.buyables[7].gte(14) },
            effect() { return Decimal.pow(1.25, player.tptr_sb.points).pow(tmp.tptr_q.impr[21].effect) },
            effectDisplay() { return format(tmp.tptr_q.upgrades[21].effect)+"倍" },
        },
        22: {
            title: "无限可能",
            description: "总特质提供免费的额外时间胶囊、增强器和空间建筑。",
            cost() { return new Decimal(1e110) },
            unlocked() { return player.tm.buyables[7].gte(14) },
            effect() { return player.tptr_q.total.plus(1).log10().sqrt().times(tmp.tptr_q.impr[22].effect).floor() },
            effectDisplay() { return "+"+formatWhole(tmp.tptr_q.upgrades[22].effect) },
        },
        23: {
            title: "等待游戏",
            description: "特质能量效果立方。",
            cost() { return new Decimal(1e115) },
            unlocked() { return player.tm.buyables[7].gte(14) },
        },
        24: {
            title: "指数疯狂",
            description: "第一个时间能量效果和第一个增强器效果提升至7.5次方。",
            cost() { return new Decimal(1e125) },
            unlocked() { return player.tm.buyables[7].gte(14) },
        },
        31: {
            title: "规模软化",
            description: "基于特质层级，第2-3行静态层级的1000后缩放开始得更晚。",
            cost() { return new Decimal(1e250) },
            unlocked() { return player.tm.buyables[7].gte(20) },
            effect() { return player.tptr_q.buyables[11].sqrt().times(0.4).times(tmp.tptr_q.impr[31].effect) },
        },
        32: {
            title: "五级超空间",
            description: "五级空间建筑效果翻倍。",
            cost() { return new Decimal(1e290) },
            unlocked() { return player.tm.buyables[7].gte(20) },
        },
        33: {
            title: "生成进展",
            description: "超级生成器更便宜。",
            cost() { return new Decimal(1e300) },
            unlocked() { return player.tm.buyables[7].gte(20) },
        },
        34: {
            title: "助推器狂热",
            description: "任何增加助推器基础值的东西也会以降低的速率乘以它。",
            cost() { return new Decimal("1e310") },
            unlocked() { return player.tm.buyables[7].gte(20) },
            effect() { return tmp.tptr_b.addToBase.plus(1).root(2.5).times(tmp.tptr_q.impr[32].effect) },
            effectDisplay() { return format(tmp.tptr_q.upgrades[34].effect)+"倍" },
        },
        41: {
            title: "更特质",
            description: "解锁特质改进。",
            cost() { return new Decimal("1e400") },
            unlocked() { return player.tm.buyables[7].gte(21) },
        },
        42: {
            title: "改进提升",
            description: "解锁3个更多特质改进。",
            cost() { return new Decimal("1e600") },
            unlocked() { return player.tm.buyables[7].gte(21) },
        },
        43: {
            title: "更多层级",
            description: "特质层级成本缩放速度减慢25%。",
            cost() { return new Decimal("1e650") },
            unlocked() { return player.tm.buyables[7].gte(21) },
        },
        44: {
            title: "改进丰富",
            description: "解锁另外3个特质改进。",
            cost() { return new Decimal("1e800") },
            unlocked() { return player.tm.buyables[7].gte(21) },
        },
    },
    passiveGeneration(){
        if(player.tm.buyables[7].gte(23))return 1;
        return 0;
    },
})

// 太阳层
addLayer("tptr_o", {
    name: "太阳层",
    symbol: "O",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        energy: new Decimal(0),
        first: 0,
    }},
    color: "#ffcd00",
    nodeStyle() {return {
        "background": "radial-gradient(#ffcd00, #ff4300)" 
    }},
    componentStyles: {
        "prestige-button": "radial-gradient(#ffcd00, #ff4300)"
    },
    requires() { 
        let req = new Decimal(10);
        if (hasUpgrade("tptr_ba", 23)) req = req.div(tmp.tptr_ba.posBuff.max(1));
        return req;
    },
    resource: "太阳能量",
    baseResource: "超级助推器", 
    baseAmount() {return player.tptr_sb.points},
    type: "normal",
    exponent() { 
        let exp = new Decimal(10);
        if (hasUpgrade("tptr_p", 34)) exp = exp.times(upgradeEffect("tptr_p", 34));
        return exp;
    },
    gainMult() {
        mult = buyableEffect("tptr_o", 11);
        return mult
    },
    gainExp() {
        return new Decimal(1);
    },
    row: 3,
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",38)},
    doReset(l){
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || l=="tptr_t" || l=="tptr_e" || l=="tptr_s" || l=="tptr_sb" || l=="tptr_sg" || l=="tptr_o" || l=="tptr_h" || l=="tptr_q" || l=="tptr_ss" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_o.best);
        layerDataReset("tptr_o",["upgrades","milestones","challenges"]);
        player.tptr_o.best=b;
        return;
    },
    branches: ["tptr_sb", "tptr_t"],
    effect() { 
        let eff = player.tptr_o.points.plus(1).log10().mul(4).sqrt();
        let cap = 0.1;
        if (eff.gt(10)) eff = eff.log10().times(3).plus(7)
        return eff.div(100).min(cap);
    },
    effect2() { if(!player.tptr_o.unlocked)return new Decimal(0);return player.tptr_o.points.div(1e20).plus(1).sqrt(); },
    effect3() { if(!player.tptr_o.unlocked)return new Decimal(1);
        if(player.tptr_o.points.gte(1e300)){
            return player.tptr_o.points.add(1).log10().add(1).log10().div(1.6).add(1);
        }
        return player.tptr_o.points.add(1).log10().add(1).log10().add(1).log10().add(1); 
    },
    solEnGain() { 
        let gain = player.tptr_t.energy.max(1).pow(tmp.tptr_o.effect).times(tmp.tptr_o.effect2);
        if (player.tptr_m.unlocked) gain = gain.times(tmp.tptr_m.hexEff);
        gain = gain.times(tmp.tptr_q.impr[41].effect);
        if(!player.tptr_ba.unlocked)gain = gain.min(1e100);
        return gain;
    },
    effectDescription() { return "每秒生成"+format(tmp.tptr_o.solEnGain)+"太阳能量"+(player.tptr_ba.unlocked?"":"(上限:1e100)")+"，并在TPTC中增加"+format(tmp.tptr_o.effect3.sub(1))+"超助推器基础值"; },
    update(diff) {
        player.tptr_o.energy = player.tptr_o.energy.plus(tmp.tptr_o.solEnGain.times(diff));
        if(player.tm.buyables[7].gte(22)){
            player.tptr_o.buyables[11]=player.tptr_o.buyables[11].add(layers.tptr_o.buyables[11].gain().mul(diff));
            player.tptr_o.buyables[12]=player.tptr_o.buyables[12].add(layers.tptr_o.buyables[12].gain().mul(diff));
            player.tptr_o.buyables[13]=player.tptr_o.buyables[13].add(layers.tptr_o.buyables[13].gain().mul(diff));
        }
        if(player.tm.buyables[7].gte(26)){
            player.tptr_o.buyables[21]=player.tptr_o.buyables[21].add(layers.tptr_o.buyables[21].gain().mul(diff));
        }
    },
    solEnEff2() { return player.tptr_o.energy.plus(1).pow(2) },
    tabFormat: ["main-display",
        "prestige-button",
        "resource-display",
        "blank",
        ["display-text", function() {return '你有 ' + format(player.tptr_o.energy) + ' 太阳能量，将时间能量上限乘以'+format(tmp.tptr_o.solEnEff2)+'倍。'},{}],
        "blank",
        "milestones",
        "blank",
        ["display-text", function() { return "<b>太阳能量: "+format(tmp.tptr_o.solPow.times(100))+"%</b><br>" },{}],
        "buyables",
        "blank"
    ],
    solPow() {
        let pow = new Decimal(1);
        if (hasUpgrade("tptr_ss", 33)) pow = pow.plus(upgradeEffect("tptr_ss", 33));
        if (hasUpgrade("tptr_ss", 41)) pow = pow.plus(buyableEffect("tptr_o", 21));
        if (hasUpgrade("tptr_ba", 11)) pow = pow.plus(upgradeEffect("tptr_ba", 11));
        if(pow.gte(32))return pow.div(32).cbrt().mul(32);
        return pow;
    },
    multiplyBuyables() {
        let mult = new Decimal(1);
        return mult;
    },
    buyableGainExp() {
        let exp = new Decimal(1);
        return exp;
    },
    buyables: {
        rows: 3,
        cols: 3,
        11: {
            title: "太阳核心",
            gain() { return player.tptr_o.points.div(2).root(1.5).pow(tmp.tptr_o.buyableGainExp).floor() },
            effect() { 
                let amt = player[this.layer].buyables[this.id].times(tmp.tptr_o.multiplyBuyables);
                if(amt.gte(5e4))amt=Decimal.pow(10,amt.log10().sqrt().mul(new Decimal(5e4).log10().sqrt()));
                if(amt.gte(4.75453173647236e21))amt=amt.log10().pow(3).mul(4.75453173647236e21).div(new Decimal(4.75453173647236e21).log10().pow(3));
                return Decimal.pow(hasUpgrade("tptr_ss", 22)?(amt.plus(1).pow(tmp.tptr_o.solPow).cbrt()):(amt.plus(1).pow(tmp.tptr_o.solPow).log10().plus(1)), 1)
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = ("牺牲所有太阳能量获得"+formatWhole(tmp[this.layer].buyables[this.id].gain)+"太阳核心\n"+
                "需求: 2太阳能量\n"+
                "数量: " + formatWhole(player[this.layer].buyables[this.id])+((tmp.tptr_o.multiplyBuyables||new Decimal(1)).eq(1)?"":(" x "+format(tmp.tptr_o.multiplyBuyables))))+"\n"+
                ("效果: 将太阳能量获取乘以"+format(tmp[this.layer].buyables[this.id].effect)+"倍")
                return display;
            },
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() { return player.tptr_o.points.gte(2) },
            buy() { 
                player.tptr_o.points = new Decimal(0);
                player.tptr_o.buyables[this.id] = player.tptr_o.buyables[this.id].plus(tmp[this.layer].buyables[this.id].gain);
            },
            style: {'height':'140px', 'width':'140px'},
        },
        12: {
            title: "对流层等离子体",
            gain() { return player.tptr_o.points.div(100).times(player.tptr_o.energy.div(2500)).root(3.5).pow(tmp.tptr_o.buyableGainExp).floor() },
            effect() { return Decimal.pow(hasUpgrade("tptr_p", 24)?Decimal.pow(10, player[this.layer].buyables[this.id].times(tmp.tptr_o.multiplyBuyables).plus(1).log10().cbrt()):(player[this.layer].buyables[this.id].times(tmp.tptr_o.multiplyBuyables).plus(1).pow(tmp.tptr_o.solPow).log10().plus(1).log10().times(10).plus(1)), 1) },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = ("牺牲所有太阳能量和太阳能量获得"+formatWhole(tmp[this.layer].buyables[this.id].gain)+"对流层等离子体\n"+
                "需求: 100太阳能量和2,500太阳能量\n"+
                "数量: " + formatWhole(player[this.layer].buyables[this.id])+((tmp.tptr_o.multiplyBuyables||new Decimal(1)).eq(1)?"":(" x "+format(tmp.tptr_o.multiplyBuyables))))+"\n"+
                ("效果: 将超级助推器基础和每个特质层级乘以"+format(tmp[this.layer].buyables[this.id].effect)+"倍")
                return display;
            },
            unlocked() { return player.tm.buyables[7].gte(17) }, 
            canAfford() { return player.tptr_o.points.gte(100)&&player.tptr_o.energy.gte(2500) },
            buy() { 
                player.tptr_o.points = new Decimal(0);
                player.tptr_o.energy = new Decimal(0);
                player.tptr_o.buyables[this.id] = player.tptr_o.buyables[this.id].plus(tmp[this.layer].buyables[this.id].gain);
            },
            style: {'height':'140px', 'width':'140px', 'font-size':'9px'},
        },
        13: {
            title: "对流能量",
            gain() { return player.tptr_o.points.div(1e3).times(player.tptr_o.energy.div(2e5)).times(player.tptr_ss.subspace.div(10)).root(6.5).pow(tmp.tptr_o.buyableGainExp).floor() },
            effect() { return player[this.layer].buyables[this.id].times(tmp.tptr_o.multiplyBuyables).plus(1).pow(tmp.tptr_o.solPow).log10().plus(1).pow(2.5).pow(1) },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = ("牺牲所有太阳能量、太阳能量和子空间获得"+formatWhole(tmp[this.layer].buyables[this.id].gain)+"对流能量\n"+
                "需求: 1,000太阳能量、200,000太阳能量和10子空间\n"+
                "数量: " + formatWhole(player[this.layer].buyables[this.id])+((tmp.tptr_o.multiplyBuyables||new Decimal(1)).eq(1)?"":(" x "+format(tmp.tptr_o.multiplyBuyables))))+"\n"+
                ("效果: 将时间胶囊基础和子空间获取乘以"+format(tmp[this.layer].buyables[this.id].effect)+"倍")
                return display;
            },
            unlocked() { return player.tm.buyables[7].gte(18) }, 
            canAfford() { return player.tptr_o.points.gte(1e3)&&player.tptr_o.energy.gte(2e5)&&player.tptr_ss.subspace.gte(10) },
            buy() { 
                player.tptr_o.points = new Decimal(0);
                player.tptr_o.energy = new Decimal(0);
                player.tptr_ss.subspace = new Decimal(0);
                player.tptr_o.buyables[this.id] = player.tptr_o.buyables[this.id].plus(tmp[this.layer].buyables[this.id].gain);
            },
            style: {'height':'140px', 'width':'140px', 'font-size':'9px'},
        },
        21: {
            title: "日冕波",
            gain() { return player.tptr_o.points.div(1e5).root(5).times(player.tptr_o.energy.div(1e30).root(30)).times(player.tptr_ss.subspace.div(1e8).root(8)).times(player.tptr_q.energy.div("1e675").root(675)).pow(tmp.tptr_o.buyableGainExp).floor() },
            effect() { 
                let eff = player[this.layer].buyables[this.id].times(tmp.tptr_o.multiplyBuyables).plus(1).pow(tmp.tptr_o.solPow).log10().plus(1).log10();
                if(eff.gte(4))eff = Decimal.pow(10,eff.log10().div(Math.log10(4)).sqrt().mul(Math.log10(4)));
                if (hasUpgrade("tptr_hn", 24)) eff = eff.times(2);
                return eff;
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = ("牺牲所有太阳能量、太阳能量、子空间和特质能量获得"+formatWhole(tmp[this.layer].buyables[this.id].gain)+"日冕波\n"+
                "需求: 100,000太阳能量、1e30太阳能量、500,000,000子空间和1e675特质能量\n"+
                "数量: " + formatWhole(player[this.layer].buyables[this.id])+((tmp.tptr_o.multiplyBuyables||new Decimal(1)).eq(1)?"":(" x "+format(tmp.tptr_o.multiplyBuyables))))+"\n"+
                ("效果: +"+format(tmp[this.layer].buyables[this.id].effect)+"子空间基础值和+"+format(tmp[this.layer].buyables[21].effect.times(100))+"%太阳能量")
                return display;
            },
            unlocked() { return player[this.layer].unlocked&&hasUpgrade("tptr_ss", 41) }, 
            canAfford() { return player.tptr_o.points.gte(1e5)&&player.tptr_o.energy.gte(1e30)&&player.tptr_ss.subspace.gte(1e8)&&player.tptr_q.energy.gte("1e675") },
            buy() { 
                player.tptr_o.points = new Decimal(0);
                player.tptr_o.energy = new Decimal(0);
                player.tptr_ss.subspace = new Decimal(0);
                player.tptr_q.energy = new Decimal(0);
                player.tptr_o.buyables[this.id] = player.tptr_o.buyables[this.id].plus(tmp[this.layer].buyables[this.id].gain);
            },
            style: {'height':'140px', 'width':'140px', 'font-size':'9px'},
        },
    },
    milestones: {
        0: {
            requirementDescription: "1太阳能量",
            done() { return player.tptr_o.best.gte(1) },
            effectDescription: "自动购买超级助推器，超级助推器重置不影响任何内容。可以批量购买超级助推器。",
        },
        1: {
            requirementDescription: "TPTR等级21",
            done() { return player.tm.buyables[7].gte(21) },
            effectDescription: "每秒获得100%的太阳能量获取。",
        },
        2: {
            requirementDescription: "TPTR等级22",
            done() { return player.tm.buyables[7].gte(22) },
            effectDescription: "每秒获得100%的前3个太阳能量可购买项获取。",
        },
        3: {
            requirementDescription: "TPTR等级26",
            unlocked() { return player.tm.buyables[7].gte(25) },
            done() { return player.tm.buyables[7].gte(26) },
            effectDescription: "每秒获得100%的日冕波获取。",
        },
    },
    passiveGeneration(){
        if(player.tm.buyables[7].gte(21))return 1;
        return 0;
    }
});



// 子空间能量层
addLayer("tptr_ss", {
    name: "子空间能量层",
    symbol: "SS",
    position: 3,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        subspace: new Decimal(0),
        auto: false,
        first: 0,
    }},
    color: "#e8ffff",
    requires: new Decimal(28),
    roundUpCost: true,
    resource: "子空间能量",
    baseResource: "空间能量",
    baseAmount() {return player.tptr_s.points},
    type: "static",
    exponent: new Decimal(1.1),
    base: new Decimal(1.15),
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    effBase() {
        let base = new Decimal(2);
        if (hasUpgrade("tptr_ss", 32)) base = base.plus(upgradeEffect("tptr_ss", 32));
        if (hasUpgrade("tptr_ss", 41)) base = base.plus(buyableEffect("tptr_o", 21));
        
        if (player.tptr_ba.unlocked) base = base.times(tmp.tptr_ba.posBuff);
        base = base.times(tmp.tptr_q.impr[42].effect);
        return base;
    },
    effect() { 
        let gain = Decimal.pow(tmp.tptr_ss.effBase, player.tptr_ss.points).sub(1);
        if (hasUpgrade("tptr_ss", 13)) gain = gain.times(upgradeEffect("tptr_ss", 13));
        if (player.tptr_o.unlocked) gain = gain.times(buyableEffect("tptr_o", 13));
        if (player.tptr_m.unlocked) gain = gain.times(tmp.tptr_m.hexEff);
        return [gain,player.tptr_ss.points.add(1)];
    },
    effectDescription() {
        return "每秒生成"+format(tmp.tptr_ss.effect[0])+"子空间，并在TPTC中将子空间基础值提升"+format(tmp.tptr_ss.effect[1])+"倍"
    },
    update(diff) {
        if(player.tptr_ss.best.gte(10)&&layers.tptr_s.buyables[11].unlocked())layers.tptr_s.buyables[11].buyMax();
        if(player.tptr_ss.best.gte(10)&&layers.tptr_s.buyables[12].unlocked())layers.tptr_s.buyables[12].buyMax();
        if(player.tptr_ss.best.gte(10)&&layers.tptr_s.buyables[13].unlocked())layers.tptr_s.buyables[13].buyMax();
        if(player.tptr_ss.best.gte(10)&&layers.tptr_s.buyables[14].unlocked())layers.tptr_s.buyables[14].buyMax();
        if(player.tptr_ss.best.gte(10)&&layers.tptr_s.buyables[15].unlocked())layers.tptr_s.buyables[15].buyMax();
        if (player.tptr_ss.unlocked) player.tptr_ss.subspace = player.tptr_ss.subspace.plus(tmp.tptr_ss.effect[0].times(diff));
    },
    row: 3,
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",39)},
    doReset(l){
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || l=="tptr_t" || l=="tptr_e" || l=="tptr_s" || l=="tptr_sb" || l=="tptr_sg" || l=="tptr_o" || l=="tptr_h" || l=="tptr_q" || l=="tptr_ss" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_ss.best);
        layerDataReset("tptr_ss",["upgrades","milestones","challenges"]);
        player.tptr_ss.best=b;
        return;
    },
    branches: ["tptr_s"],
    effPow() {
        let pow = new Decimal(1);
        if (hasUpgrade("tptr_ss", 12)) pow = pow.times(upgradeEffect("tptr_ss", 12));
        if (hasUpgrade("tptr_ba", 12)) pow = pow.times(upgradeEffect("tptr_ba", 12).plus(1));
        return pow;
    },
    eff1() { return player.tptr_ss.subspace.plus(1).pow(tmp.tptr_ss.effPow).log10().pow(3).times(100).floor() },
    eff2() { return player.tptr_ss.subspace.plus(1).pow(tmp.tptr_ss.effPow).log10().plus(1).log10().div(6) },
    eff3() { return player.tptr_ss.subspace.plus(1).pow(tmp.tptr_ss.effPow).pow(1e3) },
    tabFormat: ["main-display",
        "prestige-button",
        "resource-display",
        "blank",
        ["display-text",
            function() {return '你有 ' + format(player.tptr_ss.subspace) + ' 子空间，提供'+formatWhole(tmp.tptr_ss.eff1)+'额外空间，使空间建筑效果增强'+format(tmp.tptr_ss.eff2.times(100))+'%，并使空间建筑成本降低'+format(tmp.tptr_ss.eff3)+'倍'},
                {}],
        "blank",
        "upgrades","milestones"
    ],
    upgrades: {
        rows: 4,
        cols: 3,
        11: {
            title: "空间觉醒",
            description: "空间能量需求基础值降低(1e15 -> 1e10)",
            cost: new Decimal(3),
            unlocked() { return player.tptr_ss.unlocked },
        },
        12: {
            title: "子空间觉醒",
            description: "子空间能量增强所有子空间效果",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("tptr_ss", 11) },
            effect() { 
                let eff = player.tptr_ss.points.div(2.5).plus(1).sqrt();
                return eff;
            },
            effectDisplay() { return "增强"+format(tmp.tptr_ss.upgrades[12].effect.sub(1).times(100))+"%" },
        },
        13: {
            title: "粉碎使者",
            description: "特质提升子空间获取",
            cost: new Decimal(6),
            unlocked() { return hasUpgrade("tptr_ss", 11) },
            effect() { return player.tptr_q.points.plus(1).log10().div(10).plus(1); },
            effectDisplay() { return format(tmp.tptr_ss.upgrades[13].effect)+"倍" },
        },
        21: {
            title: "非法升级",
            description: "超级助推器和超级生成器便宜20%",
            cost: new Decimal(7),
            unlocked() { return hasUpgrade("tptr_ss", 13) },
        },
        22: {
            title: "阳光之下",
            description: "<b>太阳核心</b>使用更好的效果公式",
            cost: new Decimal(8),
            unlocked() { return hasUpgrade("tm", 38) },
        },
        23: {
            title: "反永恒",
            description: "<b>永恒</b>上限+10",
            cost: new Decimal(11),
            unlocked() { return player.tm.buyables[7].gte(21) },
        },
        31: {
            title: "无更多进展",
            description: "未使用的空间提供免费空间建筑",
            cost: new Decimal(12),
            unlocked() { return player.tm.buyables[7].gte(21) },
            effect() { return tmp.tptr_s.space.plus(1).cbrt().sub(1).floor() },
            effectDisplay() { return "+"+formatWhole(tmp.tptr_ss.upgrades[31].effect) },
        },
        32: {
            title: "超越无限",
            description: "基于特质层级增加子空间能量和超级生成器基础值",
            cost: new Decimal(12),
            unlocked() { return player.tm.buyables[7].gte(22) },
            effect() { return player.tptr_q.buyables[11].sqrt().div(1.25) },
            effectDisplay() { return "+"+format(tmp.tptr_ss.upgrades[32].effect) },
        },
        33: {
            title: "永恒太阳性",
            description: "太阳核心提升太阳能量",
            cost: new Decimal(13),
            unlocked() { return player.tm.buyables[7].gte(22) },
            effect() { return player.tptr_o.buyables[11].plus(1).log10().div(10) },
            effectDisplay() { return "+"+format(tmp.tptr_ss.upgrades[33].effect.times(100))+"%" },
        },
        41: {
            title: "更多阳光",
            description: "解锁日冕波",
            cost: new Decimal(15),
            unlocked() { return player.tm.buyables[7].gte(25) },
        },
        42: {
            title: "子子空间",
            description: "空间建筑效果增强100%(加法)",
            cost: new Decimal(17),
            unlocked() { return player.tm.buyables[7].gte(26) },
        },
        43: {
            title: "平衡C-R协同",
            description: "解锁平衡能量的新效果",
            cost: new Decimal(20),
            unlocked() { return player.tm.buyables[7].gte(29) },
        },
    },
    milestones: {
        0: {
            requirementDescription: "1子空间能量",
            done() { return player.tptr_ss.best.gte(1) },
            effectDescription: "自动购买空间能量，空间能量重置不影响任何内容",
        },
        1: {
            requirementDescription: "4子空间能量",
            done() { return player.tptr_ss.best.gte(4) },
            effectDescription: "空间建筑不会重置",
        },
        2: {
            requirementDescription: "8子空间能量",
            done() { return player.tptr_ss.best.gte(8) },
            effectDescription: "自动购买超级生成器，超级生成器重置不影响任何内容。可以批量购买超级生成器",
        },
        3: {
            requirementDescription: "10子空间能量",
            done() { return player.tptr_ss.best.gte(10) },
            effectDescription: "自动购买空间建筑，空间建筑不再消耗空间",
        },
    },
    canBuyMax() {return player.tptr_ba.best.gte(1)},
    resetsNothing() {return player.tptr_ba.best.gte(1)},
    autoPrestige() {return player.tptr_ba.best.gte(1)},
})

// 魔法层
addLayer("tptr_m", {
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
        },
    }},
    color: "#eb34c0",
    requires: new Decimal("1e285"),
    resource: "魔法",
    baseResource: "阻碍精神",
    baseAmount() {return player.tptr_h.points},
    type: "normal",
    exponent: 0.007,
    row: 4,
    hotkeys: [],
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",56)},
    branches: ["tptr_o","tptr_h","tptr_q"],
    doReset(l){
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || l=="tptr_t" || l=="tptr_e" || l=="tptr_s" || l=="tptr_sb" || l=="tptr_sg" || l=="tptr_o" || l=="tptr_h" || l=="tptr_q" || l=="tptr_ss" || l=="tptr_m" || l=="tptr_ba" || l=="tptr_ps" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_m.best);
        layerDataReset("tptr_m",["upgrades","milestones","challenges"]);
        player.tptr_m.best=b;
    },
    tabFormat: ["main-display",
        "prestige-button", "resource-display",
        ["blank", "5px"],
        "milestones",
        ["display-text","施放法术消耗1魔法。法术效果基于你的魔法值"],
        ["display-text",
            function() {return '有效魔法: ' + format(player.tptr_m.points.mul(layers.tptc_m.clickables[16].effect())) + ', 法术强度: '+format(tmp.tptr_m.spellPower.mul(100))+"%"},
                {}],
        "clickables",
        ["display-text",
            function() {return '你有 ' + format(player.tptr_m.hexes) + ' 法术印记，'+tmp.tptr_m.hexEffDesc},
                {}],"upgrades"
    ],
    spellPower() { 
        if (!player[this.layer].unlocked) return new Decimal(0);
        let power = new Decimal(1);
        return power;
    },
    clickables: {
        rows: 1,
        cols: 5,
        11: {
            title: "助推器发射",
            unlocked(){return true},
            canClick(){return player.tptr_m.points.gte(1) && player.tptr_m.spellTimes[11].lte(0)},
            onClick(){
                player.tptr_m.points=player.tptr_m.points.sub(1);
                player.tptr_m.hexes=player.tptr_m.hexes.add(1);
                player.tptr_m.spellTimes[11]=new Decimal(60);
            },
            effect(){
                if(player.tptr_m.spellTimes[11].lte(0))return new Decimal(1);
                return layers.tptr_m.clickables[11].realEffect();
            },
            realEffect(){
                let power = tmp.tptr_m.spellPower.times(player.tptr_m.points.mul(layers.tptc_m.clickables[16].effect()).max(1).log10().plus(1));
                let eff = power.div(2).plus(1)
                if (hasUpgrade("tptr_ba", 31)) eff = Decimal.pow(1.1, power).times(eff);
                let sc=new Decimal(1e6);
                if (hasUpgrade("tptr_p", 44)) sc = sc.mul(upgradeEffect("tptr_p", 44));
                if(eff.gte(sc))eff = Decimal.pow(10,eff.log10().div(sc.log10()).root(1.5).mul(sc.log10()));
                return eff.div(1.5).max(1);
            },
            display(){
                return "效果: 助推器基础值^1.05，x"+format(layers.tptr_m.clickables[11].realEffect())+"\n\
                持续时间: "+formatTime(player.tptr_m.spellTimes[11].max(0));
            },
            style: {'height':'160px','width':'200px'},
        },
        12: {
            title: "时间扭曲",
            unlocked(){return true},
            canClick(){return player.tptr_m.points.gte(1) && player.tptr_m.spellTimes[12].lte(0)},
            onClick(){
                player.tptr_m.points=player.tptr_m.points.sub(1);
                player.tptr_m.hexes=player.tptr_m.hexes.add(1);
                player.tptr_m.spellTimes[12]=new Decimal(60);
            },
            effect(){
                if(player.tptr_m.spellTimes[12].lte(0))return new Decimal(1);
                return layers.tptr_m.clickables[12].realEffect();
            },
            realEffect(){
                let power = tmp.tptr_m.spellPower.times(player.tptr_m.points.mul(layers.tptc_m.clickables[16].effect()).max(1).log10().plus(1));
                let eff = power.div(5).plus(1)
                if (hasUpgrade("tptr_ba", 31)) eff = Decimal.pow(1.1, power).times(eff);
                let sc=new Decimal(1e6);
                if (hasUpgrade("tptr_p", 44)) sc = sc.mul(upgradeEffect("tptr_p", 44));
                if(eff.gte(sc))eff = Decimal.pow(10,eff.log10().div(sc.log10()).root(2).mul(sc.log10()));
                return eff.div(1.2).max(1);
            },
            display(){
                return "效果: 时间胶囊基础值^1.1，x"+format(layers.tptr_m.clickables[12].realEffect())+"\n\
                持续时间: "+formatTime(player.tptr_m.spellTimes[12].max(0));
            },
            style: {'height':'160px','width':'200px'},
        },
        13: {
            title: "特质放大",
            unlocked(){return player.tm.buyables[7].gte(28)},
            canClick(){return player.tptr_m.points.gte(1) && player.tptr_m.spellTimes[13].lte(0)},
            onClick(){
                player.tptr_m.points=player.tptr_m.points.sub(1);
                player.tptr_m.hexes=player.tptr_m.hexes.add(1);
                player.tptr_m.spellTimes[13]=new Decimal(60);
            },
            effect(){
                if(player.tptr_m.spellTimes[13].lte(0))return new Decimal(1);
                return layers.tptr_m.clickables[13].realEffect();
            },
            realEffect() {
                let power = tmp.tptr_m.spellPower.times(player.tptr_m.points.mul(layers.tptc_m.clickables[16].effect()).max(1).log10().plus(1));
                let eff = power.times(1.25)
                let sc=new Decimal(1).max(player.tptr_ps.points.pow(2.5)).min(45);
                if(eff.gte(sc))eff = eff.div(sc).root(5).mul(sc);
                return eff;
            },
            display() {
                return "效果: +"+format(layers.tptr_m.clickables[13].realEffect())+"免费特质层级\n\
                持续时间: "+formatTime(player.tptr_m.spellTimes[13].max(0));
            },
            style: {'height':'160px','width':'200px'},
        },
    },
    update(diff){
        for(var i in player.tptr_m.spellTimes){
            player.tptr_m.spellTimes[i]=player.tptr_m.spellTimes[i].sub(diff);
            if(player.tm.buyables[7].gte(27) && player.tptr_m.spellTimes[i].lte(0) && player.tptr_m.points.gte(1) && tmp.tptr_m.clickables[i] && tmp.tptr_m.clickables[i].unlocked){
                player.tptr_m.points=player.tptr_m.points.sub(1);
                player.tptr_m.hexes=player.tptr_m.hexes.add(1);
                player.tptr_m.spellTimes[i]=new Decimal(60);
            }
        }
    },
    hexEff() {
        return player.tptr_m.hexes.times(2).plus(1).pow(10).min("1e10000");
    },
    hexEffDesc() {
        return "将阻碍精神、特质、太阳能量和子空间获取乘以"+format(tmp.tptr_m.hexEff)+"倍";
    },
    milestones: {
        0: {
            requirementDescription: "TPTR等级27",
            done() { return player.tm.buyables[7].gte(27) },
            effectDescription: "每秒获得100%的魔法获取，自动施放法术",
        },
    },
    passiveGeneration(){
        if(player.tm.buyables[7].gte(27))return 1;
        return 0;
    }
})

// 平衡能量层
addLayer("tptr_ba", {
    name: "平衡能量层",
    symbol: "BA",
    position: 3,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        allotted: 0.5,
        pos: new Decimal(0),
        neg: new Decimal(0),
        keepPosNeg: false,
        first: 0,
    }},
    color: "#fced9f",
    requires: new Decimal("1e365"),
    resource: "平衡能量",
    baseResource: "特质",
    baseAmount() {return player.tptr_q.points},
    type: "normal",
    exponent: 0.005,
    gainMult() {
        mult = new Decimal(1);
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    effect() { 
        if(!hasUpgrade("tptr_ss",33))return new Decimal(1);
        return player.tptr_ba.points.add(10).log10();
    },
    effectDescription() {
        if(!hasUpgrade("tptr_ss",33))return null;
        return "在TPTC中将正能量和负能量效果提升^"+format(tmp.tptr_ba.effect)+"次方"
    },
    row: 4,
    doReset(l){
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || l=="tptr_t" || l=="tptr_e" || l=="tptr_s" || l=="tptr_sb" || l=="tptr_sg" || l=="tptr_o" || l=="tptr_h" || l=="tptr_q" || l=="tptr_ss" || l=="tptr_m" || l=="tptr_ba" || l=="tptr_ps" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_ba.best);
        layerDataReset("tptr_ba",["upgrades","milestones","challenges"]);
        player.tptr_ba.best=b;
        return;
    },
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",58) },
    branches: ["tptr_q","tptr_ss"],
    update(diff) {
        if (!player.tptr_ba.unlocked) return;
        player.tptr_ba.pos = player.tptr_ba.pos.plus(tmp.tptr_ba.posGain.times(diff));
        player.tptr_ba.neg = player.tptr_ba.neg.plus(tmp.tptr_ba.negGain.times(diff));
    },
    dirBase() { return player.tptr_ba.points.times(10) },
    posGainMult() {
        let mult = new Decimal(1);
        if (hasUpgrade("tptr_ba", 24)) mult = mult.times(upgradeEffect("tptr_ba", 24).pos);
        return mult;
    },
    posGain() { 
        if(player.tptr_hn.best.gte(2) || player.tptr_hn.total.gte(2)){
            return tmp.tptr_ba.dirBase.times(tmp.tptr_ba.posGainMult) 
        }
        return Decimal.pow(tmp.tptr_ba.dirBase, player.tptr_ba.allotted).times(player.tptr_ba.allotted).times(tmp.tptr_ba.posGainMult) 
    },
    posBuff() { 
        let eff = player.tptr_ba.pos.plus(1).log10().plus(1).div(tmp.tptr_ba.negNerf); 
        if(eff.gte(1e6))eff=eff.cbrt().mul(1e4);
        return eff;
    },
    noNerfs() {
        return player.tptr_hn.total.gte(2) || player.tptr_hn.best.gte(2);
    },
    posNerf() { return tmp.tptr_ba.noNerfs?new Decimal(1):(player.tptr_ba.pos.plus(1).sqrt()) },
    negGainMult() {
        let mult = new Decimal(1);
        if (hasUpgrade("tptr_ba", 24)) mult = mult.times(upgradeEffect("tptr_ba", 24).neg);
        return mult;
    },
    negGain() { 
        if(player.tptr_hn.best.gte(2) || player.tptr_hn.total.gte(2)){
            return tmp.tptr_ba.dirBase.times(tmp.tptr_ba.negGainMult) 
        }
        return Decimal.pow(tmp.tptr_ba.dirBase, (1-player.tptr_ba.allotted)).times(1-player.tptr_ba.allotted).times(tmp.tptr_ba.negGainMult) 
    },
    negBuff() { 
        let eff = player.tptr_ba.neg.plus(1).pow((hasUpgrade("tptr_ba", 13))?10:1).div(tmp.tptr_ba.posNerf);
        if(eff.gte("1e1500"))eff=Decimal.pow(10,eff.log10().div(1500).sqrt().mul(1500));
        return eff;
    },
    negNerf() { return tmp.tptr_ba.noNerfs?new Decimal(1):(player.tptr_ba.neg.plus(1).log10().plus(1).sqrt().div(hasUpgrade("tptr_ba", 14)?2:1).max(1)) },
    tabFormat: ["main-display",
        "prestige-button",
        "resource-display",
        "blank",
        "milestones",
        "blank",
        ["clickables", 31],
        ["row", [["clickables", 21], ["clickables", 11], "blank", ["bar", "balanceBar"], "blank", ["clickables", 12], ["clickables", 22]]],
        ["row", [
            ["column", [["display-text", function() {return ("+"+format(tmp.tptr_ba.negGain)+"/秒")}, {}], ["display-text", function() {return "负能量: "+format(player.tptr_ba.neg)}, {}], ["display-text", function() {return (("增益: 将每个特质层级乘以"+format(tmp.tptr_ba.negBuff)))}, {}], ["display-text", function() {return tmp.tptr_ba.noNerfs?"":(("削弱: 将正能量增益除以"+format(tmp.tptr_ba.negNerf)))}, {}], "blank", ["row", [["upgrades", 11], ["upgrades", 13]]]], {"max-width": "240px"}], 
            "blank", "blank", "blank", 
            ["column", 
            [["display-text", function() {return ("+"+format(tmp.tptr_ba.posGain)+"/秒")}, {}], ["display-text", function() {return "正能量: "+format(player.tptr_ba.pos)}, {}], ["display-text", function() {return (("增益: 将子空间和时间基础值乘以"+format(tmp.tptr_ba.posBuff)))}, {}], ["display-text", function() {return tmp.tptr_ba.noNerfs?"":(("削弱: 将负能量增益除以"+format(tmp.tptr_ba.posNerf)))}, {}], "blank", ["row", [["upgrades", 14], ["upgrades", 12]]]], {"max-width": "240px"}]], {"visibility": function() { return player.tptr_ba.unlocked?"visible":"hidden" }}],
        ["row", [["upgrades", 22], ["upgrades", 21], ["upgrades", 23]]],
        ["row", [["upgrades", 31], ["upgrades", 24], ["upgrades", 32]]],
        ["upgrades", 33],
        "blank", "blank"
    ],
    bars: {
        balanceBar: {
            direction: RIGHT,
            width: 400,
            height: 20,
            progress() { return player.tptr_ba.allotted },
            unlocked() { return player.tptr_ba.unlocked && player.tptr_hn.best.lt(2) && player.tptr_hn.total.lt(2) },
            fillStyle() { 
                let r = 235 + (162 - 235) * tmp.tptr_ba.bars.balanceBar.progress;
                let g = 64 + (249 - 64) * tmp.tptr_ba.bars.balanceBar.progress;
                let b = 52 + (252 - 52) * tmp.tptr_ba.bars.balanceBar.progress;
                return {"background-color": ("rgb("+r+", "+g+", "+b+")") } 
            },
            borderStyle() { return {"border-color": "#fced9f"} },
        },
    },
    clickables: {
        rows: 3,
        cols: 2,
        11: {
            title: "-",
            unlocked() { return player.tptr_ba.unlocked && player.tptr_hn.best.lt(2) && player.tptr_hn.total.lt(2) },
            canClick() { return player.tptr_ba.allotted>0 },
            onClick() { player.tptr_ba.allotted = Math.max(player.tptr_ba.allotted-0.05, 0) },
            style: {"height": "50px", "width": "50px", "background-color": "rgb(235, 64, 52)"},
        },
        12: {
            title: "+",
            unlocked() { return player.tptr_ba.unlocked && player.tptr_hn.best.lt(2) && player.tptr_hn.total.lt(2) },
            canClick() { return player.tptr_ba.allotted<1 },
            onClick() { player.tptr_ba.allotted = Math.min(player.tptr_ba.allotted+0.05, 1) },
            style: {"height": "50px", "width": "50px", "background-color": "rgb(162, 249, 252)"},
        },
        21: {
            title: "←",
            unlocked() { return player.tptr_ba.unlocked && player.tptr_hn.best.lt(2) && player.tptr_hn.total.lt(2) },
            canClick() { return player.tptr_ba.allotted>0 },
            onClick() { player.tptr_ba.allotted = 0 },
            style: {"height": "50px", "width": "50px", "background-color": "rgb(235, 64, 52)"},
        },
        22: {
            title: "→",
            unlocked() { return player.tptr_ba.unlocked && player.tptr_hn.best.lt(2) && player.tptr_hn.total.lt(2) },
            canClick() { return player.tptr_ba.allotted<1 },
            onClick() { player.tptr_ba.allotted = 1 },
            style: {"height": "50px", "width": "50px", "background-color": "rgb(162, 249, 252)"},
        },
        31: {
            title: "C",
            unlocked() { return player.tptr_ba.unlocked && player.tptr_hn.best.lt(2) && player.tptr_hn.total.lt(2) },
            canClick() { return player.tptr_ba.allotted!=.5 },
            onClick() { player.tptr_ba.allotted = .5 },
            style: {"height": "50px", "width": "50px", "background-color": "yellow"},
        },
    },
    milestones: {
        0: {
            requirementDescription: "1平衡能量",
            done() { return player.tptr_ba.best.gte(1) },
            effectDescription: "自动购买子空间能量，子空间能量重置不影响任何内容，可以批量购买子空间能量。自动购买特质层级",
        },
        1: {
            requirementDescription: "TPTR等级30",
            done() { return player.tm.buyables[7].gte(30) },
            effectDescription: "每秒获得100%的平衡能量获取",
        },
    },
    upgrades: {
        rows: 3,
        cols: 4,
        11: {
            title: "负离子",
            description: "负能量提升太阳能量",
            cost: new Decimal(1e12),
            unlocked() { return hasUpgrade("tm",44) },
            effect() { 
                let ret = player.tptr_ba.neg.plus(1).log10().sqrt().div(10);
                if(ret.gte(1.5))return ret.log10().pow(0.5).times(new Decimal(1.5).div(new Decimal(1.5).log10().pow(0.5)));
                return ret;
            },
            effectDisplay() { return "+"+format(tmp.tptr_ba.upgrades[11].effect.times(100))+"%" },
        },
        12: {
            title: "正离子",
            description: "正能量提升空间建筑能量和所有子空间效果",
            cost: new Decimal(1e12),
            unlocked() { return hasUpgrade("tm",44) },
            effect() { 
                let ret = player.tptr_ba.pos.plus(1).log10().cbrt().div(10);
                if(ret.gte(0.75))return ret.log10().pow(0.25).times(new Decimal(0.75).div(new Decimal(0.75).log10().pow(0.25)));
                return ret;
            },
            effectDisplay() { return "+"+format(tmp.tptr_ba.upgrades[12].effect.times(100))+"%" },
        },
        13: {
            title: "负能量",
            description: "将负能量增益提升至10次方",
            cost: new Decimal(1e13),
            unlocked() { return hasUpgrade("tm",44) },
        },
        14: {
            title: "正能量氛围",
            description: "将负能量削弱减半",
            cost: new Decimal(1e13),
            unlocked() { return hasUpgrade("tm",44) },
        },
        21: {
            title: "中性原子",
            description: "阻碍精神效果提升至8次方，并影响TPTC中的真实声望树(H挑战)效果",
            cost: new Decimal(1e20),
            unlocked() { return hasUpgrade("tm",44) },
        },
        22: {
            title: "负质量",
            description: "负能量增益也乘以阻碍精神和特质获取",
            cost: new Decimal(1e23),
            unlocked() { return player.tm.buyables[7].gte(27) },
        },
        23: {
            title: "完全正",
            description: "正能量增益也除以太阳能量需求",
            cost: new Decimal(1e23),
            unlocked() { return player.tm.buyables[7].gte(27) },
        },
        24: {
            title: "网络中立性",
            description: "正能量和负能量互相增强对方的生成",
            cost: new Decimal(1e28),
            unlocked() { return player.tm.buyables[7].gte(27) },
            effect() { 
                let ret = {
                    pos: player.tptr_ba.neg.div(1e12).plus(1).log10().plus(1).pow(hasUpgrade("tptr_ba", 33)?15:5),
                    neg: player.tptr_ba.pos.div(1e12).plus(1).log10().plus(1).pow(hasUpgrade("tptr_ba", 33)?15:5),
                } 
                return ret;
            },
            effectDisplay() { return "正: "+format(tmp.tptr_ba.upgrades[24].effect.pos)+"倍, 负: "+format(tmp.tptr_ba.upgrades[24].effect.neg)+"倍" },
            style: {"font-size": "9px"},
        },
        31: {
            title: "有形退化",
            description: "前两个法术使用更好的公式",
            cost: new Decimal(1e50),
            unlocked() { return player.tm.buyables[7].gte(29) },
        },
        32: {
            title: "可见再生",
            description: "正能量乘以超级生成器基础值",
            cost: new Decimal(1e50),
            unlocked() { return player.tm.buyables[7].gte(29) },
            effect() { 
                let eff = player.tptr_ba.pos.plus(1).log10().div(50).plus(1).pow(10);
                if(eff.gte(1e9))eff = eff.log10().pow(1.6).times(new Decimal(1e9).div(new Decimal(1e9).log10().pow(1.6)));
                return eff;
            },
            effectDisplay() { return format(tmp.tptr_ba.upgrades[32].effect)+"倍" },
            style: {"font-size": "9px"},
        },
        33: {
            title: "真正平等",
            description: "<b>网络中立性</b>效果立方",
            cost: new Decimal(1e50),
            unlocked() { return player.tm.buyables[7].gte(28) },
        },
    },
    passiveGeneration(){
        if(player.tm.buyables[7].gte(30))return 1;
        return 0;
    }
})

// 幻影灵魂层
addLayer("tptr_ps", {
    name: "幻影灵魂层",
    symbol: "PS",
    position: 2,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        prevH: new Decimal(0),
        souls: new Decimal(0),
        power: new Decimal(0),
        auto: false,
        autoW: false,
        autoGhost: false,
        first: 0,
    }},
    color: "#b38fbf",
    requires: new Decimal("1e16000"),
    resource: "幻影灵魂",
    baseResource: "特质能量",
    baseAmount() {return player.tptr_q.energy},
    type: "static",
    exponent: new Decimal(1.5),
    base() { 
        let b = new Decimal("1e8000");
        return b;
    },
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    effect() {
        return player.tptr_ps.points.add(1).pow(10);
    },
    effectDescription() {
        return "在TPTC中将幻影灵魂基础值乘以"+format(tmp.tptr_ps.effect)+"倍";
    },
    canBuyMax() { return player.tptr_hn.best.gte(1) },
    row: 4,
    hotkeys: [],
    resetsNothing() { return player.tptr_hn.best.gte(1) },
    doReset(l){ 
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || l=="tptr_t" || l=="tptr_e" || l=="tptr_s" || l=="tptr_sb" || l=="tptr_sg" || l=="tptr_o" || l=="tptr_h" || l=="tptr_q" || l=="tptr_ss" || l=="tptr_m" || l=="tptr_ba" || l=="tptr_ps" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_ps.best);
        layerDataReset("tptr_ps",["upgrades","milestones","challenges","buyables"]);
        player.tptr_ps.best=b;
    },
    update(diff) {
        player.tptr_ps.souls = player.tptr_ps.souls.max(tmp.tptr_ps.soulGain.times(player.tptr_h.points.max(1).log10()))
        player.tptr_ps.prevH = new Decimal(player.tptr_h.points);
        player.tptr_ps.power = new Decimal(0);
    },
    autoPrestige() { return player.tptr_hn.best.gte(1); },
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",57) },
    branches: ["tptr_q", ["tptr_h", 2]],
    soulGainExp() { return 1.5 },
    soulGainMult() {
        let mult = new Decimal(1);
        return mult;
    },
    soulGain() {
        let gain = Decimal.pow(player.tptr_ps.points, tmp.tptr_ps.soulGainExp).div(9.4).times(layers.tptr_ps.soulGainMult());
        return gain;
    },
    gainDisplay() {
        let gain = tmp.tptr_ps.soulGain;
        let display = "";
        if (gain.eq(0)) display = "0"
        else if (gain.gte(1)) display = format(gain)+" 每阻碍精神数量级"
        else display = "1 每 "+format(gain.pow(-1))+" 阻碍精神数量级"
        return display;
    },
    soulEffExp() {
        let exp = new Decimal(1.5e3);
        return exp;
    },
    soulEff() {
        let eff = player.tptr_ps.souls.plus(1).pow(layers.tptr_ps.soulEffExp());
        return eff;
    },
    powerGain() { return player.tptr_ps.souls.plus(1).times(tmp.tptr_ps.buyables[21].effect) },
    powerExp() { return player.tptr_ps.points.sqrt().times(tmp.tptr_ps.buyables[21].effect) },
    tabFormat: {
        "main-display": {
            content: ["main-display",
                "prestige-button",
                "resource-display",
                "blank",
                ["display-text", function() { return "你有 "+formatWhole(player.tptr_ps.souls)+" 诅咒灵魂 "+("(获取: "+tmp.tptr_ps.gainDisplay+")")+"：将特质改进需求除以"+format(tmp.tptr_ps.soulEff)+(tmp.nerdMode?(" (x+1)^("+formatWhole(tmp.tptr_ps.soulEffExp)+")"):"") }],
                "blank",
                ["buyables", 11],
            ],
        },
    },
    buyables: {
        rows: 2,
        cols: 1,
        11: {
            title: "幽灵",
            scaleSlow() {
                let speed = new Decimal(1);
                return speed;
            },
            cost(x=player[this.layer].buyables[this.id]) {
                let cost1 = x.div(tmp.tptr_ps.buyables[this.id].scaleSlow).times(2).plus(1).floor();
                let cost2 = x.div(tmp.tptr_ps.buyables[this.id].scaleSlow).plus(1).pow(4).times(174).plus(200).floor();
                return { phantom: cost1, damned: cost2 };
            },
            effects(adj=0) {
                let data = {};
                let x = player[this.layer].buyables[this.id].plus(adj);
                if (x.gte(1)) data.hindr = x.add(1).div(2).floor().min(1).toNumber();
                if (x.gte(2)) data.damned = x.sub(1).times(0.5).div(10/9.4).plus(1);
                if (x.gte(4)) data.quirkImpr = x.div(2).sub(1).floor().min(3).toNumber();
                return data;
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = (("成本: " + formatWhole(data.cost.phantom) + " 幻影灵魂, "+formatWhole(data.cost.damned)+" 诅咒灵魂")+"\n\
                数量: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                效果: ")
                let curr = data.effects;
                let next = this.effects(1);
                if (Object.keys(next).length>0) {
                    if (next.hindr) {
                        display += "\n"
                        if (curr.hindr) display += curr.hindr+" 新阻碍精神"+(curr.hindr==1?"":"")+(curr.hindr>=1?" (已达上限)":"")
                        else display += "<b>下一个: 解锁新阻碍精神</b>"
                    }
                    if (next.damned) {
                        display += "\n"
                        if (curr.damned) display += "将诅咒灵魂获取和效果指数乘以"+format(curr.damned)+(tmp.nerdMode?" ((x-1)*0.5+1)":"");
                        else display += "<b>下一个: 乘以诅咒灵魂获取和效果指数</b>"
                    }
                    if (next.quirkImpr) {
                        display += "\n"
                        if (curr.quirkImpr) display += curr.quirkImpr+" 新特质改进"+(curr.quirkImpr==1?"":"")+(curr.quirkImpr>=3?" (已达上限)":"")
                        else if (next.quirkImpr>(curr.quirkImpr||0)) display += "<b>下一个: 解锁新特质改进</b>"
                    }
                } else display += "无"
                return display;
            },
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() {
                return player.tptr_ps.points.gte(tmp[this.layer].buyables[this.id].cost.phantom)&&player.tptr_ps.souls.gte(tmp[this.layer].buyables[this.id].cost.damned)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                let target = player.tptr_ps.points.sub(1).div(2).min(player.tptr_ps.souls.sub(200).div(174).root(4).sub(1)).times(tmp.tptr_ps.buyables[this.id].scaleSlow).plus(1).floor().max(0)
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target)
            },
            style: {'height':'200px', 'width':'200px'},
        },
        21: {
            title: "幽灵精神",
            scaleSlow() {
                let slow = new Decimal(1);
                return slow;
            },
            cost(x=player[this.layer].buyables[this.id]) {
                let cost = Decimal.pow(10, Decimal.pow(2, x.div(this.scaleSlow()))).times(x.eq(0)?1e21:1e22);
                return cost;
            },
            effect() {
                return player[this.layer].buyables[this.id].div(25).plus(1).pow(2);
            },
            effect2() {
                return player[this.layer].buyables[this.id].div(10).plus(1);
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let display = ((tmp.nerdMode?("成本公式: (10^(2^x))*1e22"):("成本: " + formatWhole(data.cost) + " 幻影能量"))+"\n\
                数量: " + formatWhole(player[this.layer].buyables[this.id])+"\n\
                效果: "+(tmp.nerdMode?("公式1: (x/25+1)^2, 公式2: (x/10+1)"):("将幻影能量获取/指数乘以"+format(tmp.tptr_ps.buyables[this.id].effect)+"，并将幻影助推器效果增强"+format(tmp.tptr_ps.buyables[this.id].effect2.sub(1).times(100))+"%")))
                return display;
            },
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() {
                return player.tptr_ps.power.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player.tptr_ps.power = player.tptr_ps.power.sub(cost);
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            buyMax() {
                let target = player.tptr_ps.power.times(1).div(1e22).max(1).log10().max(1).log(2).times(this.scaleSlow()).plus(1).floor();
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target);
            },
            style: {'height':'200px', 'width':'200px'},
        },
    },
})


// 荣誉层
addLayer("tptr_hn", {
    name: "荣誉层",
    symbol: "HN",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
    }},
    color: "#ffbf00",
    nodeStyle() {
        return {
            "background": "radial-gradient(#ffbf00, #ffeb91, #ffbf00, #ffeb91)",
            "background-size": "50% 100%",
            "animation": "honour 10s linear infinite",
        }
    },
    componentStyles: {
        "prestige-button": "radial-gradient(#ffbf00, #ffeb91, #ffbf00, #ffeb91)"
    },
    resource: "荣誉点数",
    baseResource: "魔法值",
    baseAmount() {return player.tptr_m.points},
    type: "normal",
    exponent: new Decimal(0.025),
    requires() { 
        let b = Decimal.pow(10,700).div(player.tptr_ba.points.add(1).pow(0.8));
        if(player.tm.buyables[7].gte(31)) b = player.tptr_ba.points.add(1).pow(-0.8);
        return b;
    },
    gainMult() {
        return new Decimal(1)
    },
    gainExp() {
        return new Decimal(1)
    },
    canBuyMax() { return false },
    row: 5,
    hotkeys: [],
    resetsNothing() { return false },
    doReset(l){ 
        if(l=="tptr_p" || l=="tptr_b" || l=="tptr_g" || l=="tptr_t" || l=="tptr_e" || l=="tptr_s" || l=="tptr_sb" || l=="tptr_sg" || l=="tptr_o" || l=="tptr_h" || l=="tptr_q" || l=="tptr_ss" || l=="tptr_m" || l=="tptr_ba" || l=="tptr_ps" || l=="tptr_hn" || l=="tptr_n" || l=="tptr_hs" || l=="tptr_i" || !l.startsWith("tptr_")){return;}
        var b=new Decimal(player.tptr_hn.best);
        layerDataReset("tptr_hn",["upgrades","milestones","challenges"]);
        player.tptr_hn.best=b;
    },
    softcap: new Decimal(1e5),
    softcapPower: new Decimal(0.2),
    layerShown(){return player.tm.currentTree==7 && hasUpgrade("tm",19) },
    branches: ["tptr_m", "tptr_ba"],
    tabFormat: ["main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() { return "平衡能量会略微降低荣誉重置需求。" }],
                "blank",
                "milestones",
                "upgrades"
            ],
            
    milestones: {
        0: {
            requirementDescription: "1总荣誉",
            done() { return player.tptr_hn.total.gte(1) || player.tptr_hn.best.gte(1) },
            effectDescription: "自动购买幻影灵魂，可以批量购买幻影灵魂，幻影灵魂重置不影响任何内容并保留幽灵。",
        },
        1: {
            requirementDescription: "2总荣誉",
            done() { return player.tptr_hn.total.gte(2) || player.tptr_hn.best.gte(2) },
            effectDescription: "移除正能量和负能量的削弱效果。平衡能量会直接产生正能量和负能量。",
        },
        2: {
            requirementDescription: "TPTR等级31",
            done() { return player.tm.buyables[7].gte(31) },
            effectDescription: "基础荣誉需求降为1。",
        },
        3: {
            requirementDescription: "TPTR等级32",
            done() { return player.tm.buyables[7].gte(32) },
            effectDescription: "每秒获得100%的荣誉获取。",
        },
    },
    
    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "重新开始",
            description: "可以解锁更多声望升级。",
            cost() { return new Decimal(50) },
        },
        12: {
            title: "荣誉提升",
            description: "<b>声望提升</b>的软上限基于你的总荣誉开始得更晚。",
            cost() { return new Decimal(1) },
            unlocked() { return hasUpgrade("tptr_p", 12) },
            effect() { 
                let ret=player.tptr_hn.total.plus(1).pow(1e4) 
                if(ret.gte(1e10))ret=Decimal.pow(10,ret.log10().mul(10).sqrt());
                return ret;
            },
            effectDisplay() { return format(tmp.tptr_hn.upgrades[12].effect)+"倍延迟" },
        },
        13: {
            title: "自我-自我协同",
            description: "<b>自我协同</b>基于其效果更强。",
            cost() { return new Decimal(2) },
            unlocked() { return hasUpgrade("tptr_p", 13) },
            effect() { return tmp.tptr_p.upgrades[13].effect.max(1).log10().plus(1).log10().times(40).plus(1) },
            effectDisplay() { return "^"+format(tmp.tptr_hn.upgrades[13].effect) },
        },
        14: {
            title: "反平静",
            description: "<b>声望强度</b>效果增强5%。",
            cost() { return new Decimal(2e5) },
            unlocked() { return hasUpgrade("tptr_p", 13) },
        },
        21: {
            title: "点数效率",
            description: "<b>声望提升</b>的软上限基于你的法术印记变得更弱。",
            cost() { return new Decimal(20) },
            unlocked() { return hasUpgrade("tptr_p", 21) },
            cap() { return new Decimal(0.9) },
            effect() { return player.tptr_m.hexes.plus(1).log10().plus(1).log10().times(0.15).min(0.9) },
            effectDisplay() { return format(tmp.tptr_hn.upgrades[21].effect.times(100))+"%更弱"+(tmp.tptr_hn.upgrades[21].effect.gte(tmp.tptr_hn.upgrades[21].cap)?" (已达上限)":"") },
        },
        22: {
            title: "超级升级",
            description: "<b>升级力量</b>基于你的诅咒灵魂更强。",
            cost() { return new Decimal(4) },
            unlocked() { return hasUpgrade("tptr_p", 22) },
            effect() { return Decimal.pow(10, player.tptr_ps.souls.plus(1).log10().plus(1).log10().sqrt().times(5)).times(1) },
            effectDisplay() { return "^"+format(tmp.tptr_hn.upgrades[22].effect) },
        },
        23: {
            title: "反转轰动",
            description: "<b>反向声望提升</b>基于你的平衡能量更强。",
            cost() { return new Decimal(100) },
            unlocked() { return hasUpgrade("tptr_p", 23) },
            effect() { return player.tptr_ba.points.plus(1).log10().plus(1).pow(.75).times(1) },
            effectDisplay() { return "^"+format(tmp.tptr_hn.upgrades[23].effect) },
        },
        24: {
            title: "日冕能量",
            description: "两种日冕波效果都翻倍(不受软上限影响)。",
            cost() { return new Decimal(1e11) },
            unlocked() { return hasUpgrade("tptr_p", 24) },
        },
        31: {
            title: "经典重启",
            description: "在声望树经典版中解锁更多第6行升级。",
            cost() { return new Decimal(1000) },
        },
        32: {
            title: "不那么无用",
            description: "<b>升级力量</b>提升至7次方。",
            cost() { return new Decimal(1e5) },
            unlocked() { return hasUpgrade("tptr_p", 32) },
        },
        33: {
            title: "列领导者领导者",
            description: "<b>列领导者</b>基于你的最佳荣誉更强。",
            cost() { return new Decimal(500) },
            unlocked() { return hasUpgrade("tptr_p", 33) },
            effect() { return Decimal.pow(10, player.tptr_hn.best.plus(1).log10().plus(1).log10().sqrt()).times(1) },
            effectDisplay() { return format(tmp.tptr_hn.upgrades[33].effect)+"倍" },
        },
        34: {
            title: "太阳发挥",
            description: "<b>太阳潜力</b>效果基于你的总荣誉增强。",
            cost() { return new Decimal(5e11) },
            unlocked() { return hasUpgrade("tptr_p", 34) },
            effect() { return player.tptr_hn.total.plus(1).log10().plus(1).log10().plus(1).log10().plus(1) },
            effectDisplay() { return format(tmp.tptr_hn.upgrades[34].effect)+"倍" },
        },
    },
    passiveGeneration(){
        if(player.tm.buyables[7].gte(32))return 1;
        return 0;
    }
})