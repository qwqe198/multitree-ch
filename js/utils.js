// ************ 主要功能相关 ************

// 重置可购买项
function respecBuyables(layer) {
    if (!layers[layer].buyables) return
    if (!layers[layer].buyables.respec) return
    if (!confirm("确定要重置吗？这将强制你进行\"" + (tmp[layer].name ? tmp[layer].name : layer) + "\"重置！")) return
    run(layers[layer].buyables.respec, layers[layer].buyables)
    updateBuyableTemp(layer)
    document.activeElement.blur()
}

// 检查是否能负担升级
function canAffordUpgrade(layer, id) {
    let upg = tmp[layer].upgrades[id]
    if (tmp[layer].upgrades[id].canAfford !== undefined) return tmp[layer].upgrades[id].canAfford
    let cost = tmp[layer].upgrades[id].cost
    return canAffordPurchase(layer, upg, cost)
}

// 检查是否拥有升级
function hasUpgrade(layer, id) {
    return (player[layer].upgrades.includes(toNumber(id)) || player[layer].upgrades.includes(id.toString()))
}

// 检查是否达成里程碑
function hasMilestone(layer, id) {
    return (player[layer].milestones.includes(toNumber(id)) || player[layer].milestones.includes(id.toString()))
}

// 检查是否获得成就
function hasAchievement(layer, id) {
    return (player[layer].achievements.includes(toNumber(id)) || player[layer].achievements.includes(id.toString()))
}

// 检查是否完成挑战
function hasChallenge(layer, id) {
    return (player[layer].challenges[id])
}

// 检查挑战是否已达上限
function maxedChallenge(layer, id) {
    return (player[layer].challenges[id] >= tmp[layer].challenges[id].completionLimit)
}

// 获取挑战完成次数
function challengeCompletions(layer, id) {
    return (player[layer].challenges[id])
}

// 获取可购买项数量
function getBuyableAmount(layer, id) {
    return (player[layer].buyables[id])
}

// 设置可购买项数量
function setBuyableAmount(layer, id, amt) {
    player[layer].buyables[id] = amt
}

// 获取可点击项状态
function getClickableState(layer, id) {
    return (player[layer].clickables[id])
}

// 设置可点击项状态
function setClickableState(layer, id, state) {
    player[layer].clickables[id] = state
}

// 获取升级效果
function upgradeEffect(layer, id) {
    return (tmp[layer].upgrades[id].effect)
}

// 获取挑战效果
function challengeEffect(layer, id) {
    return (tmp[layer].challenges[id].rewardEffect)
}

// 获取可购买项效果
function buyableEffect(layer, id) {
    return (tmp[layer].buyables[id].effect)
}

// 获取可点击项效果
function clickableEffect(layer, id) {
    return (tmp[layer].clickables[id].effect)
}

// 获取成就效果
function achievementEffect(layer, id) {
    return (tmp[layer].achievements[id].effect)
}

// 检查是否能负担购买
function canAffordPurchase(layer, thing, cost) {
    if (thing.currencyInternalName) {
        let name = thing.currencyInternalName
        if (thing.currencyLocation) {
            return !(thing.currencyLocation[name].lt(cost))
        }
        else if (thing.currencyLayer) {
            let lr = thing.currencyLayer
            return !(player[lr][name].lt(cost))
        }
        else {
            return !(player[name].lt(cost))
        }
    }
    else {
        return !(player[layer].points.lt(cost))
    }
}

// 购买升级
function buyUpgrade(layer, id) {
    buyUpg(layer, id)
}

// 购买升级实现
function buyUpg(layer, id) {
    if (!tmp[layer].upgrades || !tmp[layer].upgrades[id]) return
    let upg = tmp[layer].upgrades[id]
    if (!player[layer].unlocked) return
    if (!tmp[layer].upgrades[id].unlocked) return
    if (player[layer].upgrades.includes(id)) return
    if (upg.canAfford === false) return
    let pay = layers[layer].upgrades[id].pay
    if (pay !== undefined)
        run(pay, layers[layer].upgrades[id])
    else {
        let cost = tmp[layer].upgrades[id].cost

        if (upg.currencyInternalName) {
            let name = upg.currencyInternalName
            if (upg.currencyLocation) {
                if (upg.currencyLocation[name].lt(cost)) return
                upg.currencyLocation[name] = upg.currencyLocation[name].sub(cost)
            }
            else if (upg.currencyLayer) {
                let lr = upg.currencyLayer
                if (player[lr][name].lt(cost)) return
                player[lr][name] = player[lr][name].sub(cost)
            }
            else {
                if (player[name].lt(cost)) return
                player[name] = player[name].sub(cost)
            }
        }
        else {
            if (player[layer].points.lt(cost)) return
            player[layer].points = player[layer].points.sub(cost)
        }
    }
    player[layer].upgrades.push(id);
    if (upg.onPurchase != undefined)
        run(upg.onPurchase, upg)
}

// 最大购买可购买项
function buyMaxBuyable(layer, id) {
    if (!player[layer].unlocked) return
    if (!tmp[layer].buyables[id].unlocked) return
    if (!tmp[layer].buyables[id].canAfford) return
    if (!layers[layer].buyables[id].buyMax) return

    run(layers[layer].buyables[id].buyMax, layers[layer].buyables[id])
    updateBuyableTemp(layer)
}

// 购买可购买项
function buyBuyable(layer, id) {
    if (!player[layer].unlocked) return
    if (!tmp[layer].buyables[id].unlocked) return
    if (!tmp[layer].buyables[id].canAfford) return

    run(layers[layer].buyables[id].buy, layers[layer].buyables[id])
    updateBuyableTemp(layer)
}

// 点击可点击项
function clickClickable(layer, id) {
    if (!player[layer].unlocked) return
    if (!tmp[layer].clickables[id].unlocked) return
    if (!tmp[layer].clickables[id].canClick) return

    run(layers[layer].clickables[id].onClick, layers[layer].clickables[id])
    updateClickableTemp(layer)
}

// 检查是否在挑战中
function inChallenge(layer, id) {
    let challenge = player[layer].activeChallenge
    if (!challenge) return false
    id = toNumber(id)
    if (challenge == id) return true

    if (layers[layer].challenges[challenge].countsAs)
        return tmp[layer].challenges[challenge].countsAs.includes(id)
}

// ************ 杂项功能 ************

var onTreeTab = true

// 显示标签页
function showTab(name) {
    if (LAYERS.includes(name) && !layerunlocked(name)) return
    if (player.tab === name && isPlainObject(tmp[name].tabFormat)) {
        player.subtabs[name].mainTabs = Object.keys(layers[name].tabFormat)[0]
    }
    var toTreeTab = name == "none"
    player.tab = name
    if (player.navTab == "none" && (tmp[name].row !== "side") && (tmp[name].row !== "otherside")) player.lastSafeTab = name
    delete player.notify[name]
    needCanvasUpdate = true
    document.activeElement.blur()
}

// 显示导航标签页
function showNavTab(name) {
    if (LAYERS.includes(name) && !layerunlocked(name)) return

    var toTreeTab = name == "tree"
    player.navTab = name
    player.notify[name] = false
    needCanvasUpdate = true
}

// 返回上一页
function goBack() {
    if (player.navTab !== "none") showTab("none")
    else showTab(player.lastSafeTab)
}

// 对象覆盖
function layOver(obj1, obj2) {
    for (let x in obj2) {
        if (obj2[x] instanceof Decimal) obj1[x] = new Decimal(obj2[x])
        else if (obj2[x] instanceof Object) layOver(obj1[x], obj2[x]);
        else obj1[x] = obj2[x];
    }
}

// 声望通知
function prestigeNotify(layer) {
    if (layers[layer].prestigeNotify) return layers[layer].prestigeNotify()
    else if (tmp[layer].autoPrestige || tmp[layer].passiveGeneration) return false
    else if (tmp[layer].type == "static") return tmp[layer].canReset
    else if (tmp[layer].type == "normal") return (tmp[layer].canReset && (tmp[layer].resetGain.gte(player[layer].points.div(10))))
    else return false
}

// 通知层
function notifyLayer(name) {
    if (player.tab == name || !layerunlocked(name)) return
    player.notify[name] = 1
}

// 子标签页应通知
function subtabShouldNotify(layer, family, id) {
    let subtab = {}
    if (family == "mainTabs") subtab = tmp[layer].tabFormat[id]
    else subtab = tmp[layer].microtabs[family][id]

    if (subtab.embedLayer) return tmp[subtab.embedLayer].notify
    else return subtab.shouldNotify
}

// 子标签页重置通知
function subtabResetNotify(layer, family, id) {
    let subtab = {}
    if (family == "mainTabs") subtab = tmp[layer].tabFormat[id]
    else subtab = tmp[layer].microtabs[family][id]
    if (subtab.embedLayer) return tmp[subtab.embedLayer].prestigeNotify
    else return false
}

// 节点是否显示
function nodeShown(layer) {
    if (layerShown(layer)) return true
    switch (layer) {
        case "idk":
            return player.idk.unlocked
            break;
    }
    return false
}

// 层是否解锁
function layerunlocked(layer) {
    if (tmp[layer] && tmp[layer].type == "none") return (player[layer].unlocked)
    return LAYERS.includes(layer) && (player[layer].unlocked || (tmp[layer].canReset && tmp[layer].layerShown))
}

// 继续游戏
function keepGoing() {
    player.keepGoing = true;
    needCanvasUpdate = true;
}

// 转换为数字
function toNumber(x) {
    if (x.mag !== undefined) return x.toNumber()
    if (x + 0 !== x) return parseFloat(x)
    return x
}

// 更新里程碑
function updateMilestones(layer) {
    for (id in layers[layer].milestones) {
        if (!(hasMilestone(layer, id)) && layers[layer].milestones[id].done()) {
            player[layer].milestones.push(id)
            if (tmp[layer].milestonePopups || tmp[layer].milestonePopups === undefined) doPopup("milestone", tmp[layer].milestones[id].requirementDescription, "里程碑达成!", 3, tmp[layer].color);
        }
    }
}

// 更新成就
function updateAchievements(layer) {
    for (id in layers[layer].achievements) {
        if (isPlainObject(layers[layer].achievements[id]) && !(hasAchievement(layer, id)) && layers[layer].achievements[id].done()) {
            player[layer].achievements.push(id)
            if (layers[layer].achievements[id].onComplete) layers[layer].achievements[id].onComplete()
            if (tmp[layer].achievementPopups || tmp[layer].achievementPopups === undefined) doPopup("achievement", tmp[layer].achievements[id].name, "成就达成!", 3, tmp[layer].color);
        }
    }
}

// 添加游戏时间
function addTime(diff, layer) {
    let data = player
    let time = data.timePlayed
    if (layer) {
        data = data[layer]
        time = data.time
    }

    // 修复内存泄漏问题
    if (time + 0 !== time) {
        console.log("检测到内存泄漏。尝试修复...")
        time = toNumber(time)
        if (isNaN(time) || time == 0) {
            console.log("无法修复! 重置中...")
            time = layer ? player.timePlayed : 0
            if (!layer) player.timePlayedReset = true
        }
    }
    time += toNumber(diff)

    if (layer) data.time = time
    else data.timePlayed = time
}

// 键盘事件处理
document.onkeydown = function (e) {
    if (player === undefined) return;
    if (gameEnded && !player.keepGoing) return;
    let shiftDown = e.shiftKey
    let ctrlDown = e.ctrlKey
    let key = e.key
    if (ctrlDown) key = "ctrl+" + key
    if (onFocused) return
    if (ctrlDown && hotkeys[key]) e.preventDefault()
    if (hotkeys[key]) {
        if (player[hotkeys[key].layer].unlocked)
            hotkeys[key].onPress()
    }
}

var onFocused = false
function focused(x) {
    onFocused = x
}

// 声望按钮文本
function prestigeButtonText(layer) {
    if (layers[layer].prestigeButtonText !== undefined)
        return layers[layer].prestigeButtonText()
    else if (tmp[layer].type == "normal")
        return `${player[layer].points.lt(1e3) ? (tmp[layer].resetDescription !== undefined ? tmp[layer].resetDescription : "重置获得 ") : ""}+<b>${formatWhole(tmp[layer].resetGain)}</b> ${tmp[layer].resource} ${tmp[layer].resetGain.lt(100) && player[layer].points.lt(1e3) ? `<br><br>下次在 ${(tmp[layer].roundUpCost ? formatWhole(tmp[layer].nextAt) : format(tmp[layer].nextAt))} ${tmp[layer].baseResource}` : ""}`
    else if (tmp[layer].type == "static")
        return `${tmp[layer].resetDescription !== undefined ? tmp[layer].resetDescription : "重置获得 "}+<b>${formatWhole(tmp[layer].resetGain)}</b> ${tmp[layer].resource}<br><br>${player[layer].points.lt(30) ? (tmp[layer].baseAmount.gte(tmp[layer].nextAt) && (tmp[layer].canBuyMax !== undefined) && tmp[layer].canBuyMax ? "下次:" : "需要:") : ""} ${formatWhole(tmp[layer].baseAmount)} / ${(tmp[layer].roundUpCost ? formatWhole(tmp[layer].nextAtDisp) : format(tmp[layer].nextAtDisp))} ${tmp[layer].baseResource}        
        `
    else if (tmp[layer].type == "none")
        return ""
    else
        return "你需要声望按钮文本"
}

// 检查是否为函数
function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
};

// 检查是否为纯对象
function isPlainObject(obj) {
    return (!!obj) && (obj.constructor === Object)
}

document.title = modInfo.name

// 弹窗相关变量
var activePopups = [];
var popupID = 0;

// 显示弹窗
function doPopup(type = "none", text = "这是一个测试弹窗。", title = "", timer = 3, color = "") {
    switch (type) {
        case "achievement":
            popupTitle = "成就解锁!";
            popupType = "achievement-popup"
            break;
        case "challenge":
            popupTitle = "挑战完成";
            popupType = "challenge-popup"
            break;
        default:
            popupTitle = "发生了什么事?";
            popupType = "default-popup"
            break;
    }
    if (title != "") popupTitle = title;
    popupMessage = text;
    popupTimer = timer;

    activePopups.push({ "time": popupTimer, "type": popupType, "title": popupTitle, "message": (popupMessage + "\n"), "id": popupID, "color": color })
    popupID++;
}

// 调整弹窗时间
function adjustPopupTime(diff) {
    for (popup in activePopups) {
        activePopups[popup].time -= diff;
        if (activePopups[popup]["time"] < 0) {
            activePopups.splice(popup, 1); // 当时间为0时移除弹窗
        }
    }
}

// 运行函数
function run(func, target, args = null) {
    if (!!(func && func.constructor && func.call && func.apply)) {
        let bound = func.bind(target)
        return bound(args)
    }
    else
        return func;
}
