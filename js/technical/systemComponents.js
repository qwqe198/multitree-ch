// 系统组件
var systemComponents = {
    // 标签按钮组件
    'tab-buttons': {
        props: ['layer', 'data', 'name'],
        template: `
            <div class="upgRow">
                <div v-for="tab in Object.keys(data)">
                    <button 
                        v-if="data[tab].unlocked == undefined || data[tab].unlocked" 
                        v-bind:class="{
                            tabButton: true, 
                            notify: subtabShouldNotify(layer, name, tab), 
                            resetNotify: subtabResetNotify(layer, name, tab)
                        }" 
                        v-bind:style="[
                            {'border-color': tmp[layer].color}, 
                            tmp[layer].componentStyles['tab-button'], 
                            data[tab].buttonStyle
                        ]"
                        v-on:click="function(){
                            player.subtabs[layer][name] = tab; 
                            needCanvasUpdate = true;
                        }"
                    >
                        {{tab}}
                    </button>
                </div>
            </div>
        `
    },

    // 树节点组件
    'tree-node': {
        props: ['layer', 'abb', 'size'],
        template: `
        <button 
            v-if="nodeShown(layer)"
            v-bind:id="layer"
            v-on:click="function() {
                if(tmp[layer].isLayer) {showTab(layer)}
                else {run(layers[layer].onClick, layers[layer])}
            }"
            v-bind:tooltip="(tmp[layer].tooltip == '') ? false : (tmp[layer].isLayer) ? (
                player[layer].unlocked ? (tmp[layer].tooltip ? tmp[layer].tooltip : formatWhole(player[layer].points) + ' ' + tmp[layer].resource)
                : (tmp[layer].tooltipLocked ? tmp[layer].tooltipLocked : '需要 ' + formatWhole(tmp[layer].requires) + ' ' + tmp[layer].baseResource + ' 解锁 (当前有 ' + formatWhole(tmp[layer].baseAmount) + ' ' + tmp[layer].baseResource + ')')
            )
            : (
                tmp[layer].canClick ? (tmp[layer].tooltip ? tmp[layer].tooltip : '我是一个按钮!')
                : (tmp[layer].tooltipLocked ? tmp[layer].tooltipLocked : '我是一个按钮!')
            )"
            v-bind:class="{
                treeNode: tmp[layer].isLayer,
                treeButton: !tmp[layer].isLayer,
                smallNode: size == 'small',
                [layer]: true,
                ghost: tmp[layer].layerShown == 'ghost',
                hidden: !tmp[layer].layerShown,
                locked: tmp[layer].isLayer ? !(player[layer].unlocked || tmp[layer].canReset) : !(tmp[layer].canClick),
                notify: tmp[layer].notify,
                resetNotify: tmp[layer].prestigeNotify,
                can: ((player[layer].unlocked || tmp[layer].isLayer) && tmp[layer].isLayer) || (!tmp[layer].isLayer && tmp[layer].canClick),
            }"
            v-bind:style="tmp[layer].computedNodeStyle"
        >
            {{(abb !== '' && tmp[layer].image === undefined) ? abb : '&nbsp;'}}
        </button>
        `
    },

    // 层标签页组件
    'layer-tab': {
        props: ['layer', 'back', 'spacing', 'embedded'],
        template: `
        <div v-bind:style="[
            tmp[layer].style ? tmp[layer].style : {}, 
            (tmp[layer].tabFormat && !Array.isArray(tmp[layer].tabFormat)) ? 
                tmp[layer].tabFormat[player.subtabs[layer].mainTabs].style : {}
        ]">
            <div v-if="back">
                <button v-bind:class="back == 'big' ? 'other-back' : 'back'" v-on:click="goBack()">←</button>
            </div>
            <div v-if="!tmp[layer].tabFormat">
                <div v-if="spacing" v-bind:style="{'height': spacing}" :key="this.$vnode.key + '-spacing'"></div>
                <info-box 
                    v-if="tmp[layer].infoboxes" 
                    :layer="layer" 
                    :data="Object.keys(tmp[layer].infoboxes)[0]"
                    :key="this.$vnode.key + '-info'"
                ></info-box>
                <main-display 
                    v-bind:style="tmp[layer].componentStyles['main-display']" 
                    :layer="layer"
                ></main-display>
                <div v-if="tmp[layer].type !== 'none'">
                    <prestige-button 
                        v-bind:style="tmp[layer].componentStyles['prestige-button']" 
                        :layer="layer"
                    ></prestige-button>
                </div>
                <resource-display 
                    v-bind:style="tmp[layer].componentStyles['resource-display']" 
                    :layer="layer"
                ></resource-display>
                <milestones 
                    v-bind:style="tmp[layer].componentStyles.milestones" 
                    :layer="layer"
                ></milestones>
                <div v-if="Array.isArray(tmp[layer].midsection)">
                    <column 
                        :layer="layer" 
                        :data="tmp[layer].midsection" 
                        :key="this.$vnode.key + '-mid'"
                    ></column>
                </div>
                <clickables 
                    v-bind:style="tmp[layer].componentStyles['clickables']" 
                    :layer="layer"
                ></clickables>
                <buyables 
                    v-bind:style="tmp[layer].componentStyles.buyables" 
                    :layer="layer"
                ></buyables>
                <upgrades 
                    v-bind:style="tmp[layer].componentStyles['upgrades']" 
                    :layer="layer"
                ></upgrades>
                <challenges 
                    v-bind:style="tmp[layer].componentStyles['challenges']" 
                    :layer="layer"
                ></challenges>
                <achievements 
                    v-bind:style="tmp[layer].componentStyles.achievements" 
                    :layer="layer"
                ></achievements>
                <br><br>
            </div>
            <div v-if="tmp[layer].tabFormat">
                <div v-if="Array.isArray(tmp[layer].tabFormat)">
                    <div v-if="spacing" v-bind:style="{'height': spacing}"></div>
                    <column 
                        :layer="layer" 
                        :data="tmp[layer].tabFormat" 
                        :key="this.$vnode.key + '-col'"
                    ></column>
                </div>
                <div v-else>
                    <div class="upgTable" v-bind:style="{
                        'padding-top': (embedded ? '0' : '25px'), 
                        'margin-top': (embedded ? '-10px' : '0'), 
                        'margin-bottom': '24px'
                    }">
                        <tab-buttons 
                            v-bind:style="tmp[layer].componentStyles['tab-buttons']" 
                            :layer="layer" 
                            :data="tmp[layer].tabFormat" 
                            :name="'mainTabs'"
                        ></tab-buttons>
                    </div>
                    <layer-tab 
                        v-if="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].embedLayer" 
                        :layer="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].embedLayer" 
                        :embedded="true" 
                        :key="this.$vnode.key + '-' + layer"
                    ></layer-tab>
                    <column 
                        v-else 
                        :layer="layer" 
                        :data="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].content" 
                        :key="this.$vnode.key + '-col'"
                    ></column>
                </div>
            </div>
        </div>`
    },

    // 覆盖头部组件
    'overlay-head': {
        template: `            
        <div class="overlayThing" style="padding-bottom:7px; width: 90%; z-index: 1000; position: relative">
            <span v-if="player.devSpeed && player.devSpeed != 1" class="overlayThing">
                <br>开发速度: {{format(player.devSpeed)}}x<br>
            </span>
            <span v-if="player.offTime !== undefined" class="overlayThing">
                <br>离线时间: {{formatTime(player.offTime.remain)}}<br>
            </span>
            <br>
            <span v-if="player.points.lt('1e1000')" class="overlayThing">你有 </span>
            <h2 class="overlayThing" id="points">{{format(player.points)}}</h2>
            <span v-if="player.points.lt('1e1e6')" class="overlayThing"> {{modInfo.pointsName}}</span>
            <br>
            <span v-if="canGenPoints()" class="overlayThing">({{format(getPointGen())}}/秒)</span>
            <div v-for="thing in tmp.displayThings" class="overlayThing">
                <span v-if="thing" v-html="thing"></span>
            </div>
        </div>`
    },

    // 信息标签页组件
    'info-tab': {
        template: `
        <div>
            <h2>{{modInfo.name}}</h2>
            <br>
            <h3>{{VERSION.withName}}</h3>
            <span v-if="modInfo.author">
                <br>
                作者: {{modInfo.author}}	
            </span>
            <br>
            The Modding Tree <a v-bind:href="'https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md'" target="_blank" class="link" v-bind:style = "{'font-size': '14px', 'display': 'inline'}" >{{TMT_VERSION.tmtNum}}</a> by Acamaeda
            <br>
            The Prestige Tree 由 Jacorb 和 Aarex 制作
            <br>
            原始创意来自 papyrus (在 Discord 上)
            <br><br>
            <div class="link" onclick="showTab('changelog-tab')">更新日志</div><br>
            <span v-if="modInfo.discordLink">
                <a class="link" v-bind:href="modInfo.discordLink" target="_blank">{{modInfo.discordName}}</a><br>
            </span>
            <a class="link" href="https://discord.gg/F3xveHV" target="_blank" v-bind:style="modInfo.discordLink ? {'font-size': '16px'} : {}">The Modding Tree Discord</a><br>
            <a class="link" href="http://discord.gg/wwQfgPa" target="_blank" v-bind:style="{'font-size': '16px'}">主 Prestige Tree 服务器</a><br>
            <br><br>
            游戏时间: {{ formatTime(player.timePlayed) }}<br><br>
            <h3>快捷键</h3><br>
            <span v-for="key in hotkeys" v-if="player[key.layer].unlocked && tmp[key.layer].hotkeys[key.id].unlocked" v-html="key.description+'<br>'"></span>
        </div>`
    },

    // 选项标签页组件
    'options-tab': {
        template: `
        <table>
            <tr>
                <td><button class="opt" onclick="save()">保存</button></td>
                <td><button class="opt" onclick="toggleOpt('autosave')">自动保存: {{ player.autosave?"开":"关" }}</button></td>
                <td><button class="opt" onclick="hardReset()">硬重置</button></td>
            </tr>
            <tr>
                <td><button class="opt" onclick="exportSave()">导出到剪贴板</button></td>
                <td><button class="opt" onclick="importSave()">导入</button></td>
                <td><button class="opt" onclick="toggleOpt('offlineProd')">离线生产: {{ player.offlineProd?"开":"关" }}</button></td>
            </tr>
            <tr>
                <td><button class="opt" onclick="switchTheme()">主题: {{ getThemeName() }}</button></td>
                <td><button class="opt" onclick="adjustMSDisp()">显示里程碑: {{ player.msDisplay.toUpperCase() }}</button></td>
                <td><button class="opt" onclick="toggleOpt('hqTree')">高质量树: {{ player.hqTree?"开":"关" }}</button></td>
            </tr>
            <tr>
                <td><button class="opt" onclick="toggleOpt('hideChallenges')">已完成挑战: {{ player.hideChallenges?"隐藏":"显示" }}</button></td>
            </tr> 
        </table>`
    },

    // 返回按钮组件
    'back-button': {
        template: `
        <button v-bind:class="back" onclick="goBack()">←</button>
        `
    }
}