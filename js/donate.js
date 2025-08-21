// 设置支持者代码
localStorage.supporterCode = localStorage.supporterCode || "";

// 捐赠层
addLayer("donate", {
    startData() { return {unlocked: true}},  // 默认解锁
    color: "#ff8888",  // 颜色为浅红色
    symbol: "D",  // 符号为D
    row: "side",  // 显示在侧边栏
    position: -1,  // 位置为-1
    layerShown() { return true },  // 始终显示
    tooltip: "捐赠",  // 鼠标悬停提示
    tabFormat: [
        "blank", "blank", "blank",  // 三个空白行
        ["raw-html", "<h1><a href=https://afdian.com/@loader3229/plan target=_blank>爱发电捐赠</a></h1>"],  // 爱发电链接
        ["raw-html", "<h1><a href=https://ko-fi.com/loader3229 target=_blank>在Ko-Fi上请我喝咖啡</a></h1>"],  // Ko-Fi链接
        ["raw-html", "<h1><a href=https://patreon.com/user?u=56328626 target=_blank>Patreon捐赠</a></h1>"],  // Patreon链接
        ["raw-html", "<a href=/b.html target=_blank>输入支持者代码获取奖励！</a>"],  // 支持者代码输入链接
    ],
});

// 每10毫秒检查一次支持者代码
setInterval(function(){
    // 验证支持者代码是否正确
    window.supporterCodeInput = (sha512_256(localStorage.supporterCode+"loader3229").slice(2) == '97b4061c3a44e2950549613ba148eff34250441a9b3121698a15fcefdb4f5a');
},10);