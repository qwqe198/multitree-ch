// Vue组件加载函数
function loadVue() {
    // 显示文本组件
    Vue.component('display-text', {
        props: ['layer', 'data'],
        template: `
            <span class="instant" v-html="data"></span>
        `
    })

    // 原始HTML组件
    Vue.component('raw-html', {
        props: ['layer', 'data'],
        template: `
            <span class="instant" v-html="data"></span>
        `
    })

    // 空白占位组件
    Vue.component('blank', {
        props: ['layer', 'data'],
        template: `
            <div class="instant">
                <div class="instant" v-if="!data" style="width: 8px; height: 17px"></div>
                <div class="instant" v-else-if="Array.isArray(data)" v-bind:style="{width: data[0], height: data[1]}"></div>
                <div class="instant" v-else style="width: 8px; height: data"><br></div>
            </div>
        `
    })

    // 图片显示组件
    Vue.component('display-image', {
        props: ['layer', 'data'],
        template: `
            <img class="instant" v-bind:src="data" v-bind:alt="data">
        `
    })

    // 行布局组件
    Vue.component('row', {
        props: ['layer', 'data'],
        computed: {
            key() {return this.$vnode.key}
        },
        template: `
        <div class="upgTable instant">
            <div class="upgRow">
                <div v-for="(item, index) in data">
                    <div v-if="!Array.isArray(item)" v-bind:is="item" :layer="layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
                    <div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer="layer" :data="item[1]" :key="key + '-' + index"></div>
                    <div v-else-if="item.length==2" v-bind:is="item[0]" :layer="layer" :data="item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
                </div>
            </div>
        </div>
        `
    })

    // 列布局组件
    Vue.component('column', {
        props: ['layer', 'data'],
        computed: {
            key() {return this.$vnode.key}
        },
        template: `
        <div class="upgTable instant">
            <div class="upgCol">
                <div v-for="(item, index) in data">
                    <div v-if="!Array.isArray(item)" v-bind:is="item" :layer="layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
                    <div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer="layer" :data="item[1]" :key="key + '-' + index"></div>
                    <div v-else-if="item.length==2" v-bind:is="item[0]" :layer="layer" :data="item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
                </div>
            </div>
        </div>
        `
    })

    // 信息框组件
    Vue.component('infobox', {
        props: ['layer', 'data'],
        template: `
        <div class="story instant" v-if="tmp[layer].infoboxes && tmp[layer].infoboxes[data]!== undefined && tmp[layer].infoboxes[data].unlocked" v-bind:style="[{'border-color': tmp[layer].color, 'border-radius': player.infoboxes[layer][data] ? 0 : '8px'}, tmp[layer].infoboxes[data].style]">
            <button class="story-title" v-bind:style="[{'background-color': tmp[layer].color}, tmp[layer].infoboxes[data].titleStyle]"
                v-on:click="player.infoboxes[layer][data] = !player.infoboxes[layer][data]">
                <span class="story-toggle">{{player.infoboxes[layer][data] ? "+" : "-"}}</span>
                <span v-html="tmp[layer].infoboxes[data].title ? tmp[layer].infoboxes[data].title : (tmp[layer].name)"></span>
            </button>
            <div v-if="!player.infoboxes[layer][data]" class="story-text" v-bind:style="tmp[layer].infoboxes[data].bodyStyle">
                <span v-html="tmp[layer].infoboxes[data].body ? tmp[layer].infoboxes[data].body : '内容'"></span>
            </div>
        </div>
        `
    })

    // 水平线组件
    Vue.component('h-line', {
        props: ['layer', 'data'],
        template: `
            <hr class="instant" v-bind:style="data ? {'width': data} : {}" class="hl">
        `
    })

    // 垂直线组件
    Vue.component('v-line', {
        props: ['layer', 'data'],
        template: `
            <div class="instant" v-bind:style="data ? {'height': data} : {}" class="vl2"></div>
        `
    })

    // 挑战列表组件
    Vue.component('challenges', {
        props: ['layer'],
        template: `
        <div v-if="tmp[layer].challenges" class="upgTable">
            <div v-for="row in tmp[layer].challenges.rows" class="upgRow">
                <div v-for="col in tmp[layer].challenges.cols">
                    <challenge v-if="tmp[layer].challenges[row*10+col]!== undefined && tmp[layer].challenges[row*10+col].unlocked" :layer="layer" :data="row*10+col" v-bind:style="tmp[layer].componentStyles.challenge"></challenge>
                </div>
            </div>
        </div>
        `
    })

    // 单个挑战组件
    Vue.component('challenge', {
        props: ['layer', 'data'],
        template: `
        <div v-if="tmp[layer].challenges && tmp[layer].challenges[data]!== undefined && tmp[layer].challenges[data].unlocked && !(player.hideChallenges && maxedChallenge(layer, [data]))" v-bind:class="{hChallenge: true, done: tmp[layer].challenges[data].defaultStyle === 'done', canComplete:tmp[layer].challenges[data].defaultStyle === 'canComplete', locked: tmp[layer].challenges[data].defaultStyle === 'locked'}">
            <br><h3 v-html="tmp[layer].challenges[data].name"></h3><br><br>
            <button v-bind:class="{ longUpg: true, can: true, [layer]: true }" v-bind:style="{'background-color': tmp[layer].color}" v-on:click="startChallenge(layer, data)">{{tmp[layer].challenges[data].buttonText}}</button><br><br>
            <span v-if="tmp[layer].challenges[data].fullDisplay" v-html="tmp[layer].challenges[data].fullDisplay"></span>
            <span v-else>
                <span v-html="tmp[layer].challenges[data].challengeDescription"></span><br>
                目标: <span v-if="tmp[layer].challenges[data].goalDescription" v-html="tmp[layer].challenges[data].goalDescription"></span><span v-else>{{format(tmp[layer].challenges[data].goal)}} {{tmp[layer].challenges[data].currencyDisplayName ? tmp[layer].challenges[data].currencyDisplayName : "点数"}}</span><br>
                奖励: <span v-html="tmp[layer].challenges[data].rewardDescription"></span><br>
                <span v-if="tmp[layer].challenges[data].rewardEffect!==undefined">当前效果: <span v-html="(tmp[layer].challenges[data].rewardDisplay) ? (tmp[layer].challenges[data].rewardDisplay) : format(tmp[layer].challenges[data].rewardEffect)"></span></span>
            </span>
        </div>
        `
    })

    // 升级列表组件
    Vue.component('upgrades', {
        props: ['layer', 'data'],
        template: `
        <div v-if="tmp[layer].upgrades" class="upgTable">
            <div v-for="row in (data === undefined ? tmp[layer].upgrades.rows : data)" class="upgRow">
                <div v-for="col in tmp[layer].upgrades.cols"><div v-if="tmp[layer].upgrades[row*10+col]!== undefined && tmp[layer].upgrades[row*10+col].unlocked" class="upgAlign">
                    <upgrade :layer="layer" :data="row*10+col" v-bind:style="tmp[layer].componentStyles.upgrade"></upgrade>
                </div></div>
            </div>
            <br>
        </div>
        `
    })

    // 单个升级组件
    Vue.component('upgrade', {
        props: ['layer', 'data'],
        template: `
        <button v-if="tmp[layer].upgrades && tmp[layer].upgrades[data]!== undefined && tmp[layer].upgrades[data].unlocked" v-on:click="buyUpg(layer, data)" v-bind:class="{ [layer]: true, upg: true, bought: hasUpgrade(layer, data), locked: (!(canAffordUpgrade(layer, data))&&!hasUpgrade(layer, data)), can: (canAffordUpgrade(layer, data)&&!hasUpgrade(layer, data))}"
            v-bind:style="[((!hasUpgrade(layer, data) && canAffordUpgrade(layer, data)) ? {'background-color': tmp[layer].color} : {}), tmp[layer].upgrades[data].style]">
            <span v-if="tmp[layer].upgrades[data].fullDisplay" v-html="tmp[layer].upgrades[data].fullDisplay"></span>
            <span v-else>
                <span v-if="tmp[layer].upgrades[data].title"><h3 v-html="tmp[layer].upgrades[data].title"></h3><br></span>
                <span v-html="tmp[layer].upgrades[data].description"></span>
                <span v-if="tmp[layer].upgrades[data].effectDisplay"><br>当前效果: <span v-html="tmp[layer].upgrades[data].effectDisplay"></span></span>
                <br><br>成本: {{ formatWhole(tmp[layer].upgrades[data].cost) }} {{(tmp[layer].upgrades[data].currencyDisplayName ? tmp[layer].upgrades[data].currencyDisplayName : tmp[layer].resource)}}
            </span>    
            </button>
        `
    })

    // 里程碑组件
    Vue.component('milestones', {
        props: ['layer'],
        template: `
        <div v-if="tmp[layer].milestones">
            <table>
                <tr v-for="id in Object.keys(tmp[layer].milestones)"><div v-if="tmp[layer].milestones[id]!== undefined && tmp[layer].milestones[id].unlocked && milestoneShown(layer, id)"
                    <milestone :layer="layer" :data="id" v-bind:style="tmp[layer].componentStyles.milestone"></milestone>
                </tr></div>
            </table>
            <br>
        </div>
        `
    })

    // 单个里程碑组件
    Vue.component('milestone', {
        props: ['layer', 'data'],
        template: `
        <td v-if="tmp[layer].milestones && tmp[layer].milestones[data]!== undefined && milestoneShown(layer, data)" v-bind:style="[(!tmp[layer].milestones[data].unlocked) ? {'visibility': 'hidden'} : {}, tmp[layer].milestones[data].style]" v-bind:class="{milestone: !hasMilestone(layer, data), milestoneDone: hasMilestone(layer, data)}">
            <h3 v-html="tmp[layer].milestones[data].requirementDescription"></h3><br>
            <span v-html="tmp[layer].milestones[data].effectDescription"></span><br>
        <span v-if="(tmp[layer].milestones[data].toggles)&&(hasMilestone(layer, data))" v-for="toggle in tmp[layer].milestones[data].toggles"><toggle :layer="layer" :data="toggle" v-bind:style="tmp[layer].componentStyles.toggle"></toggle>&nbsp;</span></td></tr>
        `
    })

    // 开关组件
    Vue.component('toggle', {
        props: ['layer', 'data'],
        template: `
        <button class="smallUpg can" v-bind:style="{'background-color': tmp[data[0]].color}" v-on:click="toggleAuto(data)">{{player[data[0]][data[1]]?"开":"关"}}</button>
        `
    })

    // 重置按钮组件
    Vue.component('prestige-button', {
        props: ['layer', 'data'],
        template: `
        <button v-if="(tmp[layer].type !== 'none')" v-bind:class="{ [layer]: true, reset: true, locked: !tmp[layer].canReset, can: tmp[layer].canReset}"
            v-bind:style="[tmp[layer].canReset ? {'background-color': tmp[layer].color} : {}, tmp[layer].componentStyles['prestige-button']]"
            v-html="tmp[layer].prestigeButtonText" v-on:click="doReset(layer)">
        </button>
        `
    })

    // 主显示组件
    Vue.component('main-display', {
        props: ['layer'],
        template: `
        <div><span v-if="player[layer].points.lt('1e1000')">你有 </span><h2 v-bind:style="{'color': tmp[layer].color, 'text-shadow': '0px 0px 10px ' + tmp[layer].color}">{{formatWhole(player[layer].points)}}</h2> {{tmp[layer].resource}}<span v-if="tmp[layer].effectDescription">, <span v-html="tmp[layer].effectDescription"></span></span><br><br></div>
        `
    })

    // 资源显示组件
    Vue.component('resource-display', {
        props: ['layer'],
        template: `
        <div style="margin-top: -13px">
            <span><br>你有 {{formatWhole(tmp[layer].baseAmount)}} {{tmp[layer].baseResource}}</span>
            <span v-if="tmp[layer].passiveGeneration"><br>你每秒获得 {{formatWhole(tmp[layer].resetGain.times(tmp[layer].passiveGeneration))}} {{tmp[layer].resource}}</span>
            <br><br>
            <span v-if="tmp[layer].showBest">你的最佳 {{tmp[layer].resource}} 是 {{formatWhole(player[layer].best)}}<br></span>
            <span v-if="tmp[layer].showTotal">你总共获得了 {{formatWhole(player[layer].total)}} {{tmp[layer].resource}}<br></span>
        </div>
        `
    })

    // 可购买项列表组件
    Vue.component('buyables', {
        props: ['layer', 'data'],
        template: `
        <div v-if="tmp[layer].buyables" class="upgTable">
            <respec-button v-if="tmp[layer].buyables.respec && !(tmp[layer].buyables.showRespec !== undefined && tmp[layer].buyables.showRespec == false)" :layer="layer" v-bind:style="[{'margin-bottom': '12px'}, tmp[layer].componentStyles['respec-button']]"></respec-button>
            <div v-for="row in tmp[layer].buyables.rows" class="upgRow">
                <div v-for="col in tmp[layer].buyables.cols"><div v-if="tmp[layer].buyables[row*10+col]!== undefined && tmp[layer].buyables[row*10+col].unlocked" class="upgAlign" v-bind:style="{'margin-left': '7px', 'margin-right': '7px',  'height': (data ? data : 'inherit'),}">
                    <buyable :layer="layer" :data="row*10+col" :size="data"></buyable>
                </div></div>
                <br>
            </div>
        </div>
        `
    })

    // 单个可购买项组件
    Vue.component('buyable', {
        props: ['layer', 'data', 'size'],
        template: `
        <div v-if="tmp[layer].buyables && tmp[layer].buyables[data]!== undefined && tmp[layer].buyables[data].unlocked" style="display: grid">
            <button v-bind:class="{ buyable: true, can: tmp[layer].buyables[data].canAfford, locked: !tmp[layer].buyables[data].canAfford}"
            v-bind:style="[tmp[layer].buyables[data].canAfford ? {'background-color': tmp[layer].color} : {}, size ? {'height': size, 'width': size} : {}, tmp[layer].componentStyles.buyable, tmp[layer].buyables[data].style]"
            v-on:click="buyBuyable(layer, data)">
                <span v-if="tmp[layer].buyables[data].title"><h2 v-html="tmp[layer].buyables[data].title"></h2><br></span>
                <span v-bind:style="{'white-space': 'pre-line'}" v-html="tmp[layer].buyables[data].display"></span>
            </button>
            <br v-if="(tmp[layer].buyables[data].sellOne !== undefined && !(tmp[layer].buyables[data].canSellOne !== undefined && tmp[layer].buyables[data].canSellOne == false)) || (tmp[layer].buyables[data].sellAll && !(tmp[layer].buyables[data].canSellAll !== undefined && tmp[layer].buyables[data].canSellAll == false))">
            <sell-one :layer="layer" :data="data" v-bind:style="tmp[layer].componentStyles['sell-one']" v-if="(tmp[layer].buyables[data].sellOne)&& !(tmp[layer].buyables[data].canSellOne !== undefined && tmp[layer].buyables[data].canSellOne == false)"></sell-one>
            <sell-all :layer="layer" :data="data" v-bind:style="tmp[layer].componentStyles['sell-all']" v-if="(tmp[layer].buyables[data].sellAll)&& !(tmp[layer].buyables[data].canSellAll !== undefined && tmp[layer].buyables[data].canSellAll == false)"></sell-all>
        </div>
        `
    })

    // 重置按钮组件
    Vue.component('respec-button', {
        props: ['layer', 'data'],
        template: `
            <button v-if="tmp[layer].buyables && tmp[layer].buyables.respec && !(tmp[layer].buyables.showRespec !== undefined && tmp[layer].buyables.showRespec == false)" v-on:click="respecBuyables(layer)" v-bind:class="{ longUpg: true, can: player[layer].unlocked, locked: !player[layer].unlocked }">{{tmp[layer].buyables.respecText ? tmp[layer].buyables.respecText : "重置"}}</button>
        `
    })

    // 可点击项列表组件
    Vue.component('clickables', {
        props: ['layer', 'data'],
        template: `
        <div v-if="tmp[layer].clickables" class="upgTable">
            <master-button v-if="tmp[layer].clickables.masterButtonPress && !(tmp[layer].clickables.showMasterButton !== undefined && tmp[layer].clickables.showMasterButton == false)" :layer="layer" v-bind:style="[{'margin-bottom': '12px'}, tmp[layer].componentStyles['master-button']]"></master-button>
            <div v-for="row in tmp[layer].clickables.rows" class="upgRow">
                <div v-for="col in tmp[layer].clickables.cols"><div v-if="tmp[layer].clickables[row*10+col]!== undefined && tmp[layer].clickables[row*10+col].unlocked" class="upgAlign" v-bind:style="{'margin-left': '7px', 'margin-right': '7px',  'height': (data ? data : 'inherit'),}">
                    <clickable :layer="layer" :data="row*10+col" :size="data" v-bind:style="tmp[layer].componentStyles.clickable"></clickable>
                </div></div>
                <br>
            </div>
        </div>
        `
    })

    // 单个可点击项组件
    Vue.component('clickable', {
        props: ['layer', 'data', 'size'],
        template: `
        <button 
            v-if="tmp[layer].clickables && tmp[layer].clickables[data]!== undefined && tmp[layer].clickables[data].unlocked" 
            v-bind:class="{ upg: true, can: tmp[layer].clickables[data].canClick, locked: !tmp[layer].clickables[data].canClick}"
            v-bind:style="[tmp[layer].clickables[data].canClick ? {'background-color': tmp[layer].color} : {}, size ? {'height': size, 'width': size} : {}, tmp[layer].clickables[data].style]"
            v-on:click="clickClickable(layer, data)">
            <span v-if="tmp[layer].clickables[data].title"><h2 v-html="tmp[layer].clickables[data].title"></h2><br></span>
            <span v-bind:style="{'white-space': 'pre-line'}" v-html="tmp[layer].clickables[data].display"></span>
        </button>
        `
    })

    // 主按钮组件
    Vue.component('master-button', {
        props: ['layer', 'data'],
        template: `
        <button v-if="tmp[layer].clickables && tmp[layer].clickables.masterButtonPress && !(tmp[layer].clickables.showMasterButton !== undefined && tmp[layer].clickables.showMasterButton == false)"
            v-on:click="run(tmp[layer].clickables.masterButtonPress, tmp[layer].clickables)" v-bind:class="{ longUpg: true, can: player[layer].unlocked, locked: !player[layer].unlocked }">{{tmp[layer].clickables.masterButtonText ? tmp[layer].clickables.masterButtonText : "点击我！"}}</button>
        `
    })

    // 微标签组件
    Vue.component('microtabs', {
        props: ['layer', 'data'],
        computed: {
            currentTab() {return player.subtabs[layer][data]}
        },
        template: `
        <div v-if="tmp[layer].microtabs" style="border-style: solid">
            <div class="upgTable instant">
                <tab-buttons :layer="layer" :data="tmp[layer].microtabs[data]" :name="data" v-bind:style="tmp[layer].componentStyles['tab-buttons']"></tab-buttons>
            </div>
            <layer-tab v-if="tmp[layer].microtabs[data][player.subtabs[layer][data]].embedLayer" :layer="tmp[layer].microtabs[data][player.subtabs[layer][data]].embedLayer" :embedded="true"></layer-tab>

            <column v-else v-bind:style="tmp[layer].microtabs[data][player.subtabs[layer][data]].style" :layer="layer" :data="tmp[layer].microtabs[data][player.subtabs[layer][data]].content"></column>
        </div>
        `
    })

    // 进度条组件
    Vue.component('bar', {
        props: ['layer', 'data'],
        template: `
        <div v-if="tmp[layer].bars && tmp[layer].bars[data].unlocked" style="position: relative"><div v-bind:style="[tmp[layer].bars[data].style, tmp[layer].bars[data].dims, {'display': 'table'}]">
            <div class="overlayTextContainer barBorder" v-bind:style="[tmp[layer].bars[data].borderStyle, tmp[layer].bars[data].dims]">
                <span class="overlayText" v-bind:style="[tmp[layer].bars[data].style, tmp[layer].bars[data].textStyle]" v-html="tmp[layer].bars[data].display"></span>
            </div>
            <div class="barBG barBorder" v-bind:style="[tmp[layer].bars[data].style, tmp[layer].bars[data].baseStyle, tmp[layer].bars[data].borderStyle,  tmp[layer].bars[data].dims]">
                <div class="fill" v-bind:style="[tmp[layer].bars[data].style, tmp[layer].bars[data].fillStyle, tmp[layer].bars[data].fillDims]"></div>
            </div>
        </div></div>
        `
    })

    // 成就列表组件
    Vue.component('achievements', {
        props: ['layer'],
        template: `
        <div v-if="tmp[layer].achievements" class="upgTable">
            <div v-for="row in tmp[layer].achievements.rows" class="upgRow">
                <div v-for="col in tmp[layer].achievements.cols"><div v-if="tmp[layer].achievements[row*10+col]!== undefined && tmp[layer].achievements[row*10+col].unlocked" class="upgAlign">
                    <achievement :layer="layer" :data="row*10+col" v-bind:style="tmp[layer].componentStyles.achievement"></achievement>
                </div></div>
            </div>
            <br>
        </div>
        `
    })

    // 单个成就组件
    Vue.component('achievement', {
        props: ['layer', 'data'],
        template: `
        <div v-if="tmp[layer].achievements && tmp[layer].achievements[data]!== undefined && tmp[layer].achievements[data].unlocked" v-bind:class="{ [layer]: true, achievement: true, locked: !hasAchievement(layer, data), bought: hasAchievement(layer, data)}"
            v-bind:tooltip="
                (tmp[layer].achievements[data].tooltip == '') ? false : hasAchievement(layer, data) ? (tmp[layer].achievements[data].doneTooltip ? tmp[layer].achievements[data].doneTooltip : (tmp[layer].achievements[data].tooltip ? tmp[layer].achievements[data].tooltip : '你完成了！'))
                : (tmp[layer].achievements[data].goalTooltip ? tmp[layer].achievements[data].goalTooltip : (tmp[layer].achievements[data].tooltip ? tmp[layer].achievements[data].tooltip : '未解锁'))
            "
            
            v-bind:style="tmp[layer].achievements[data].computedStyle">
            <span v-if="tmp[layer].achievements[data].name"><br><h3 v-bind:style="tmp[layer].achievements[data].textStyle" v-html="tmp[layer].achievements[data].name"></h3><br></span>
        </div>
        `
    })

    // 树形结构组件
    Vue.component('tree', {
        props: ['layer', 'data'],
        computed: {
            key() {return this.$vnode.key}
        },
        template: `<div>
        <span class="upgRow" v-for="(row, r) in data"><table>
            <span v-for="(node, id) in row" style="{width: 0px}">
                <tree-node :layer="node" :abb="tmp[node].symbol" :key="key + '-' + r + '-' + id"></tree-node>
            </span>
            <tr><table><button class="treeNode hidden"></button></table></tr>
        </span></div>
        `
    })

    // 系统组件
    Vue.component('tab-buttons', systemComponents['tab-buttons'])
    Vue.component('tree-node', systemComponents['tree-node'])
    Vue.component('layer-tab', systemComponents['layer-tab'])
    Vue.component('overlay-head', systemComponents['overlay-head'])
    Vue.component('info-tab', systemComponents['info-tab'])
    Vue.component('options-tab', systemComponents['options-tab'])

    // 创建Vue实例
    app = new Vue({
        el: "#app",
        data: {
            player,
            tmp,
            Decimal,
            format,
            formatWhole,
            formatTime,
            focused,
            getThemeName,
            layerunlocked,
            doReset,
            buyUpg,
            startChallenge,
            milestoneShown,
            keepGoing,
            hasUpgrade,
            hasMilestone,
            hasAchievement,
            hasChallenge,
            maxedChallenge,
            inChallenge,
            canAffordUpgrade,
            canCompleteChallenge,
            subtabShouldNotify,
            subtabResetNotify,
            VERSION,
            LAYERS,
            hotkeys,
            activePopups,
        },
    })
}