js:
//版本: V3.2022年3月1日
initConfig({
    Gitee: 'https://gitee.com/coward-cat/js/raw/master/Coward.js',
})


function 获取源码(url, ua, referer, cookie, extrHeaders) { //传url,ua和refer
    let def_ua = config.ua === '手机' ? MOBILE_UA : PC_UA;
    ua = ua || def_ua;
    extrHeaders = extrHeaders || {};
    let headers = {
        'User-Agent': ua
    };
    if (typeof(referer) !== 'undefined' && referer.length > 4) {
        headers.Referer = referer
    }
    if (typeof(cookie) !== 'undefined' && cookie.length > 4) {
        headers.Cookie = cookie
    } else {
        // 获取源码在接入下载管理跳到其他规则子页面可能会无法获取，需要在进去的时候处理
        if (getMyVar('cookie', '')) {
            headers.Cookie = getMyVar('cookie');
        }
    }
    try {
        Object.assign(headers, extrHeaders); //合并其他的请求头
        // log(headers);
        putMyVar('请求头', JSON.stringify(headers)); // 把这个放进去,为了后面方便打印的时候进行读取
        let html = fetch(url, {
            headers: headers
        });
        if (/\?btwaf=/.test(html)) { //宝塔验证
            url = url + '?btwaf' + html.match(/btwaf(.*?)\"/)[1];
            log("宝塔验证跳转到:" + url);
            html = fetch(url, {
                headers: headers
            });
        }
        return html
    } catch (e) {
        log(e.message);
        return ''
    }
}




function 获取链接() {
MY_URL.replace('hiker://empty##', '')
}
function 一级获取链接(page, regex) {
    let 链接处理工具 = requireCache('https://gitee.com/coward-cat/js/raw/master/UrlProcessor.js')
    true_url = 链接处理工具
        .链接(true_url)
        .页码(page)
        .插入新处理规则(regex || [])
        .获取处理结果();
    return true_url;
}

function 一级搜索引擎() {
    if (page == '1') {
        d.push({
            title: 引擎名称,
            url: "'hiker://search?rule=" + MY_RULE.title + "&s='+input",
            desc: " ",
            col_type: "input"
        });
        for (var i = 0; i < 2; i++) {
            d.push({
                col_type: "big_blank_block"
            })
        }
        d.push({
            col_type: 'line'
        });
        for (var i = 0; i < 3; i++) {
            d.push({
                col_type: "big_blank_block"
            })
        }
    }
}


function 一级打造分类(ruleList) {
    if (!ruleList) {
        let 分类定位 = [
            // 定位四大金刚
            {
                一级分类: 一级定位A,
                子分类: 统一定位B || 一级定位B,
                分类链接: {
                    二次处理(url) {
                        try {
                            return 一级处理C(url)
                        } catch (e) {
                            return url
                        }
                    }
                }
            }
        ]

        if (二级定位A && (统一定位B || 二级定位B)) {
            分类定位.push(
                // 定位其他大分类，如地区、年份等
                {
                    一级分类: 二级定位A,
                    子分类: 统一定位B || 二级定位B,
                    分类链接: {
                        二次处理(url) {
                            try {
                                return 二级处理C(url)
                            } catch (e) {
                                return url
                            }
                        }
                    }
                }
            )
        }
        ruleList = 分类定位;
    }
    // '0' 为默认不折叠，'1' 为默认折叠
    const 当前折叠状态 = getMyVar('header.fold', '1')
    // 引入动态分类依赖
    let htmlCategories = requireCache('https://gitee.com/coward-cat/js/raw/master/categories-header.js')
    var getRangeColors = function() {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
    } // 随机选中的分类颜色
    var colour
    if (分类颜色 !== '') {
        colour = 分类颜色
        //  log(colour)
    } else {
        colour = getRangeColors()
        //  log(colour)
    }
    htmlCategories.界面(d)
        //.分类链接(true_url)
        .源码(html)
        .页码(page)
        .添加分类定位(ruleList)
        .开启内置折叠功能() // 必须
        .折叠(当前折叠状态) // 必须
        .折叠按钮样式({
            title: 当前折叠状态 == "1" ? "““””<big><b><font color='#5959AB'>" + 动态缩小 + "</font></b></big>" : "““””<big><b><font color='#F75D59'>" + 动态扩展 + "</font></b></big>"
        }) // 可选
        // .第几行开始折叠(2) // 可选
        // .折叠按钮样式({ 折叠按钮插入行: 2 })  // 可选，但必须先调用 .第几行开始折叠(index)，然后再传入 { 折叠按钮插入行: index }
        .选中的分类颜色(colour)
        .开始打造分类();
}


function 一级生成片单() {

    var 列表
    var 标题
    var 描述
    var 图片
    var 链接

    if (框架类型 === 'myui-vodlist') {
        列表 = '.myui-vodlist&&li';
        标题 = 'h4&&Text';
        描述 = '.pic-tag||.pic-text&&Text';
        图片 = '.lazyload&&data-original';
        链接 = 'a&&href';
        //log('框架类型·myui-vodlist')
    } else if (框架类型 === '#data_list') {
        列表 = '#data_list&&li';
        标题 = 'a&&title';
        描述 = 'em&&Text';
        图片 = 'img&&data-srcl';
        链接 = 'a&&href';
        //log('框架类型·data_list')
    } else if (框架类型 === 'fed-list-title') {
        列表 = '.fed-list-info&&li';
        标题 = '.fed-list-title&&Text';
        描述 = '.fed-text-center&&Text';
        图片 = 'a&&data-original';
        链接 = 'a&&href';
        //log('框架类型·.fed-list-info')
    } else if (框架类型 === 'item') {
        列表 = 'body&&.item';
        标题 = 'img&&alt';
        描述 = 'p&&Text';
        图片 = 'img&&srcl';
        链接 = 'a&&href';
        //log('框架类型·.item')
    } else if (框架类型 === 'module-items') {
        列表 = '.module-items&&.module-item';
        标题 = 'a&&title';
        描述 = '.module-item-text&&Text';
        图片 = 'img||.lazy&&data-src';
        链接 = 'a&&href';
        //log('框架类型·.module-items')
    } else if (框架类型 === 'pack-ykpack') {
        列表 = 'body&&.pack-ykpack';
        标题 = 'a&&title';
        描述 = 'span,-1&&Text';
        图片 = '.eclazy&&data-original';
        链接 = 'a&&href';
        //log('框架类型·.pack-ykpack')
    } else if (框架类型 === 'stui-vodlist') {
        列表 = '.stui-vodlist&&li';
        标题 = 'a&&title';
        描述 = '.pic-text&&Text';
        图片 = '.lazyload||a&&data-original';
        链接 = 'a&&href';
        //log('框架类型·.stui-vodlist')
    } else if (框架类型 === 'vodlist') {
        列表 = '.vodlist&&li';
        标题 = 'a&&title';
        描述 = 'a&&Text';
        图片 = '.lazyload&&data-original';
        链接 = 'a&&href';
        //log('框架类型·.vodlist')
    } else if (框架类型 === '测试') {
        列表 = 'body&&a';
        标题 = 'body&&a';
        描述 = 'body&&a';
        图片 = 'body&&a';
        链接 = 'body&&a';
        log('框架类型·测试')
    } else if (框架类型 === '') {
        列表 = 框架列表;
        标题 = 框架标题;
        描述 = 框架描述;
        图片 = 框架图片;
        链接 = 框架链接;
        log('框架类型·自定义类型')
    }


    let list = parseDomForArray(html, 列表);
    for (let j in list) {
        d.push({
            title: parseDomForHtml(list[j], 标题),
            desc: parseDomForHtml(list[j], 描述),
            img: parseDom(list[j], 图片) + '@Referer=',
            url: parseDom(list[j], 链接)
        });
    }
}


var 二级 = {
    A: function() {
        var d = [];
        //var html = getResCode();
        
var arts = pdfa(html, 线路列表);
var tabs = [];
for (var i in arts) {
    tabs.push(pdfh(arts[i], 线路标签)
        .replace('-官方', '')
        .replace('备用资源', '')
        .replace('APP专享线路（网站不提供播放）', 'APP专享')
        .replace('）', ')')
        .replace('（', '(')
        .replace('视频', '')
        .replace('TV', '')
        .replace('线路', '')
        .replace('推荐', '')
        .replace('-', '')
        .replace(' ', '')
        .replace(' ', '')
        .replace('哔哩哔哩', 'bilibili')
        .replace('youku', '优酷')
        .replace('qiyi', '爱奇艺')
        .replace('qq', '腾讯')
        .replace('QQ', '腾讯')
        .replace('芒果tv', '芒果')
        .replace('mgtv', '芒果')
        .replace('pptv', 'PPTV')
        .replace('letv', '乐视')
        .replace('sohu', '搜狐')
        .replace('搜狐TV', '搜狐')
        .replace('xigua', '西瓜'))
}

var conts = parseDomForArray(html, 集数列表);
var lists = [];
for (var i in conts) {
    lists.push(parseDomForArray(conts[i], 集数标签))
};

var title = parseDomForHtml(html, 搜索标签);
d.push({
    title: "视界",
    pic_url: 'https://lanmeiguojiang.com/tubiao/q/34.png',
    url: 'hiker://search?s=' + title + '&group=①高清',
    col_type: 'icon_small_4',
});
d.push({
        title: '香情影视',
            pic_url: 'https://lanmeiguojiang.com/tubiao/q/68.png',
                url: 'hiker://search?s=' + title + '&rule=香情影视',
                    col_type: 'icon_small_4',
});
d.push({
    title: '云盘汇影',
    pic_url: 'https://lanmeiguojiang.com/tubiao/ke/82.png',
    url: 'hiker://search?s=' + title + '&rule=云盘汇影',
    col_type: 'icon_small_4',
});
d.push({
    title: '青豆',
    pic_url: 'https://lanmeiguojiang.com/tubiao/q/10.png',
    url: 'hiker://search?s=' + title + '&rule=青豆',
    col_type: 'icon_small_4',
});


for (let i = 0; i < 10; i++) {
    d.push({
        col_type: "blank_block"
    })
}
d.push({
    col_type: 'line'
});
for (let i = 0; i < 10; i++) {
    d.push({
        col_type: "blank_block"
    })
}

d.push({
    url: parseDom(html, 定位封面),
    desc: '0',
    pic_url: parseDom(html, 定位封面),
    col_type: "card_pic_2",
    extra: {
        gradient: true
    }
});

var desc = parseDomForHtml(html, 定位简介).replace('[收起部分]', '').replace(/\s/g, '');
d.push({
    title: '‘‘’’<b><big><font color="#1a0c45">Plot·</font></big></b><small><font color="#3C3C3C">\n\n' + desc.substr(0, 55) + '…</font></small><small><font color="#5959AB">Details</font></small>',
    url: 'hiker://empty#' + '\n\t\t\t\t\t\t\t' + desc + `@rule=js:var res = {}; var d = [];d.push({title:'影片简介：'+ MY_URL.split('hiker://empty#')[1],col_type: 'long_text'});res.data = d; setHomeResult(res);`,
    desc: '0',
    pic_url: '',
    col_type: "card_pic_2",
    extra: {
        gradient: true
    }
});
for (let i = 0; i < 10; i++) {
    d.push({
        col_type: "blank_block"
    })
}
d.push({
    col_type: 'line'
});
for (let i = 0; i < 10; i++) {
    d.push({
        col_type: "blank_block"
    })
}
var obj = {
    "腾讯": "https://lanmeiguojiang.com/tubiao/movie/131.svg",
    "优酷": "https://lanmeiguojiang.com/tubiao/movie/128.svg",
    "奇艺": "https://lanmeiguojiang.com/tubiao/movie/130.svg",
    "爱奇艺": "https://lanmeiguojiang.com/tubiao/movie/130.svg",
    "芒果": "https://lanmeiguojiang.com/tubiao/movie/32.svg",
    "咪咕": "https://lanmeiguojiang.com/tubiao/movie/134.svg",
    "西瓜": "https://lanmeiguojiang.com/tubiao/movie/135.svg",
    "搜狐": "https://lanmeiguojiang.com/tubiao/movie/129.svg",
    "乐视": "https://lanmeiguojiang.com/tubiao/movie/58.svg",
    "风行": "https://lanmeiguojiang.com/tubiao/movie/136.svg",
    "PPTV": "https://lanmeiguojiang.com/tubiao/movie/133.svg",
    "1905": "https://lanmeiguojiang.com/tubiao/movie/132.svg",
    "bilibili": "https://lanmeiguojiang.com/tubiao/movie/20.svg",
    "专线": "https://lanmeiguojiang.com/tubiao/movie/141.svg",
    "专线2": "https://lanmeiguojiang.com/tubiao/movie/142.svg",
};



/*
require('https://gitea.com/AI957/Hiker/raw/m/v/Route.js');
var setup = setupPages("设置");
*/
d.push({
    title: '‘‘’’<b><big><font color="#5959AB">'+标识名称+'</font></big></b>',
    url: 标识链接,
    col_type: 'scroll_button'
});


function getHead(title) {
    return '‘‘’’<strong><font color="#1a0c45">' + title + '</front></strong>';
}


function 所有线路(tabs, taburl) {
    for (var i in tabs) {
        var tabname = tabs[i];
        d.push({
            //title: tabname,
            //img: obj[tabname] || "https://lanmeiguojiang.com/tubiao/movie/137.svg",
            //col_type: 'icon_small_3',
            title: getMyVar(taburl, '0') == i ? getHead(tabname) : tabname,
            col_type: 'scroll_button',
            url: $("#noLoading#").lazyRule((tabname, taburl, i) => {
                putMyVar('当前线路名', tabname);
                putMyVar(taburl, i)
                refreshPage(false);
                return 'hiker://empty'
            }, tabname, taburl, i)
        })
    }

    d.push({
        col_type: 'line_blank'
    });
}

function 空() {
    for (let i = 0; i < 80; i++) {
        d.push({
            col_type: "blank_block"
        })
    }
    d.push({
        title: "““”” <small><font color='grey'>" + "皆空" + "</font></small>",
        col_type: "text_center_1",
        url: 'hiker://empty',
        extra: {
            lineVisible: false
        }
    })
}

function 选集列表(lists, index) {
    //清除变量
    addListener('onClose', $.toString(() => {
        clearMyVar('当前线路名');
        clearMyVar('分集起');
        clearMyVar('分集终');
    }))
    var list = lists[index];
    // 将反序归正
    try {
        if (pdfh(list[0], "a&&Text").match(/(\d+)/)[0] > pdfh(list.slice(-1)[0], "a&&Text").match(/(\d+)/)[0]) list.reverse()
    } catch (e) {}
    try {
        // 线路数大于1，或者集数大于20时，显示正反切换按钮
        // if (tabs.length > 1 || list.length > 20) {
        if (tabs.length > 0) {
            var icon_s = 'http://82.156.222.77/weisyr/icon/';
            if (getMyVar('选集排序') == '正序') {
                var avatar = icon_s + '正序.svg'
            } else {
                var avatar = icon_s + '反序.svg'
            }

            d.push({
                // title: "<b><font color='#EB9941'>" + tabs[index] + "</font></b>" + "<small><font color='grey'>" + '\t\t-- 共 ' + list.length + ' 集' +
                //     "</font></small>",
                title: "<b><font color='#5959AB'>" + tabs[index] + "</font></b>" + "<small><font color='grey'>" + '\t\t〰️\t\t' + "</font></small>" + "<font color='#5959AB'>" + list.length + '集' + "</font>",
                img: obj[tabs[index]]|| "https://lanmeiguojiang.com/tubiao/ke/58.png",
                url: `@lazyRule=.js:if(getMyVar('选集排序')=='正序'){putMyVar('选集排序', '反序');}else{putMyVar('选集排序', '正序')};refreshPage(false);hideLoading();'hiker://empty'`,
                col_type: 'avatar'
            })

            d.push({
                col_type: 'line'
            });
            for (let i = 0; i < 10; i++) {
                d.push({
                    col_type: "blank_block"
                })
            }
        }
    } catch (e) {
        空()
    }


    function 选集() {
        var jm = pdfh(list[i], 'a&&Text').replace(/第|集|话|期/g, '').replace(/预告/g, '📢');
        var url = parseDom(list[i], 'a&&href');
        if (list.length < 5) {
            var col = 'text_2'
        } else {
            var col = jm.length > 5 ? 'text_2' : 'text_4'
        }
        d.push({
            title: jm,
            url: url + lazy,
            col_type: col,
            extra: {
                id: url,
                blockRules: ['.css', '.gif', '.jpg', '.jpeg', '.png', '.ico', '.svg', 'cnzz', 'google', 'xn--*:*', 'hm.baidu.com', '/ads/*.js', '.m3u8', '.mp4']
            }
        });
    }
    try {
        // 开始页码分区 选集＞设定集数10个以上才启用选集分页
        var 选集数组 = list;
        if (选集数组.length > (page_number + 10)) {
            //所有集数除以每页集数，有余进整
            var total = Math.ceil(选集数组.length / page_number);
            var catalogue = []
            for (let i = 0; i < total; i++) {
                catalogue += i * page_number + ',';
                catalogue = catalogue.split(',');
            }

            for (let i = 0; i < 8; i++) {
                d.push({
                    col_type: "blank_block"
                })
            }
            //输出分页按钮
            var 按钮 = [];
            for (var i = 0; i < catalogue.length - 1; i++) {
                var total1 = parseInt(catalogue[i]) + 1;
                var total2 = parseInt(catalogue[i + 1]);
                if (i == (catalogue.length - 2)) var total2 = 选集数组.length;

                d.push({
                    title: star == total1 ? '‘‘' + total1 + '-' + total2 + '’’' : total1 + '-' + total2,
                    url: $("#noLoading#").lazyRule((total1, total2) => {
                        putMyVar('分集起', total1);
                        putMyVar('分集终', total2);
                        refreshPage(false);
                        return 'hiker://empty'
                    }, total1, total2),
                    col_type: 'scroll_button'
                });
                按钮.push(total1 + '-' + total2)
            }
            if (getMyVar('选集排序') == '正序') {
                for (var i = end - 1; i >= star - 1; i--) {
                    选集()
                }
            } else {
                for (var i = star - 1; i < end; i++) {
                    选集()
                }
            }
            //底部页码                 
            d.push({
                col_type: "line"
            })

            var yema = Math.ceil(end / page_number);
            d.push({
                title: "““”” <small><small><font color='grey'>" + yema + ' / ' + total + "</font> </small></small>",
                col_type: "text_center_1",
                url: $("#noLoading#").lazyRule((按钮) => $(按钮, 3).select(_ => {
                    putMyVar('分集起', input.split('-')[0]);
                    putMyVar('分集终', input.split('-')[1]);
                    refreshPage(false);
                    return "toast://载入 " + input + ' 页面 .';
                }), 按钮),
                extra: {
                    lineVisible: false
                }
            })

            //底部操作按钮
            if (底部换页 == '开启') {
                d.push({
                    title: '首页',
                    url: $("#noLoading#").lazyRule((page_number) => {
                        putMyVar('分集起', '1');
                        putMyVar('分集终', page_number);
                        refreshPage(false);
                        return 'hiker://empty'
                    }, page_number),
                    col_type: 'text_4'
                });
                d.push({
                    title: '上一页',
                    url: $("#noLoading#").lazyRule((star, end, page_number, total, 选集数组) => {
                        var s = parseInt(star) - page_number;
                        var e = parseInt(end) - page_number;
                        if (end = 选集数组.length) var e = s + page_number - 1;
                        if (s < 1) {
                            var s = 1;
                            var e = page_number;
                        }
                        if (s > 0) {
                            putMyVar('分集起', s);
                            putMyVar('分集终', e);
                            refreshPage(false);
                        }
                        return 'hiker://empty'
                    }, star, end, page_number, total, 选集数组),
                    col_type: 'text_4'
                });
                d.push({
                    title: '下一页',
                    url: $("#noLoading#").lazyRule((star, end, page_number, total, 选集数组) => {
                        var s = parseInt(star) + page_number;
                        var e = parseInt(end) + page_number;
                        if (e > 选集数组.length) {
                            var s = (total - 1) * page_number + 1;
                            var e = 选集数组.length;
                        }
                        putMyVar('分集起', s);
                        putMyVar('分集终', e);
                        refreshPage(false);
                        return 'hiker://empty'
                    }, star, end, page_number, total, 选集数组),
                    col_type: 'text_4'
                });
                d.push({
                    title: '尾页',
                    url: $("#noLoading#").lazyRule((page_number, total, 选集数组) => {
                        var s = (total - 1) * page_number + 1;
                        putMyVar('分集起', s);
                        putMyVar('分集终', 选集数组.length);
                        refreshPage(false);
                        return 'hiker://empty'
                    }, page_number, total, 选集数组),
                    col_type: 'text_4'
                });
            }
        } // 结束选集分页
        else {
            if (getMyVar('选集排序') == '正序') {
                for (var i = list.length - 1; i >= 0; i--) {
                    选集()
                }
            } else {
                for (var i = 0; i < list.length; i++) {
                    选集()
                }
            }
        }
    } catch (e) {
        空()
    }
    // 底部留空
    d.push({
        title: '\n',
        url: 'hiker://empty',
        col_type: 'rich_text'
    });
} //结束选集列表

//🤡分页开关设置
var page_number = 50;
let 底部换页 = '开启'; //底部控制按钮
try {
    //至少两条线路，或者启用分页才被记录
    if (tabs.length > 1 || lists[0].length > (page_number + 10)) {
        function 记录足迹(线路, 页面) {
            var history = JSON.parse(request('hiker://files//cache/顺_记录线路和页码.json') || '[]');
            var t = history.findIndex(item => item.小程序 == MY_RULE.title);
            if (t == -1) {
                t = history.length;
                history.push({
                    小程序: MY_RULE.title,
                    足迹: []
                })
            }
            var y = history[t].足迹.findIndex(item => item.url == MY_URL);
            if (y == -1) {
                history[t].足迹.push({
                    url: MY_URL,
                    tab: 线路,
                    index: 页面
                });
            } else {
                history[t].足迹[y].tab = 线路;
                history[t].足迹[y].index = 页面;
            }
            if (history[t].足迹.length >= 999) {
                history[t].足迹.splice(0, 1);
            }
            writeFile("hiker://files//cache/顺_记录线路和页码.json", JSON.stringify(history, null, 2));
        }
        //读写足迹
        var historyA = JSON.parse(fetch('hiker://files//cache/顺_记录线路和页码.json') || '[]');
        var historyIT = historyA.find(item => item.小程序 == MY_RULE.title);
        if (historyIT) { //判断当前小程序
            historyIT = historyIT.足迹.find(it => it.url == MY_URL);
            if (historyIT) { //判断当前片子记录
                var itemA = historyIT.tab;
                var itemP = historyIT.index;
                if (getMyVar('分集起') == "") {
                    var star = itemP.split('-')[0];
                    var end = itemP.split('-')[1];
                    if (itemP == 'undefined-undefined' || itemP == '-') {
                        star = '1';
                        end = page_number;
                    }
                }
                if (getMyVar('当前线路名') == "") {
                    var 选中线路 = itemA || '0';
                }
                if (getMyVar('分集起') != "") {
                    var star = getMyVar('分集起');
                    var end = getMyVar('分集终');
                    var 选中线路 = itemA || '0';
                    记录足迹(选中线路, star + '-' + end)
                }
                if (getMyVar('当前线路名') != "") {
                    var star = getMyVar('分集起', '1');
                    var end = getMyVar('分集终', JSON.stringify(page_number));
                    var 选中线路 = getMyVar(MY_URL);
                    记录足迹(选中线路, star + '-' + end)
                }
            } else { //如果片子没有记录
                var star = 1;
                var end = page_number;
                var 选中线路 = '0';
                记录足迹('0', "1" + '-' + page_number)
            }
        } else { //如果小程序没有记录
            var star = 1;
            var end = page_number;
            var 选中线路 = '0';
            记录足迹('0', "1" + '-' + page_number)
        }
    } else {
        var 选中线路 = '0';
    }
} catch (e) {
    空()
}
所有线路(tabs, MY_URL);
选集列表(lists, 选中线路);
setResult(d);    }
}


require('https://gitea.com/AI957/Hiker/raw/m/v/Route.js');
var setup = setupPages("设置");



var 搜索 = {
    A: function() {
        var d = [];
        var res = {};
        var html = getResCode();
        var list = pdfa(html, 框架列表);
        for (var j in list) {
            d.push({
                title: pdfh(list[j], 框架标题),
                desc: pdfh(list[j], 框架描述),
                content: pdfh(list[j], 框架简介),
                img: pd(list[j], 框架图片) + "@Referer=",
                url: "hiker://empty##" + pd(list[j], 框架链接).replace('play', 'detail').replace('/sid/1/nid/1', '').replace('-1-1', '') 
            });
        }
        res.data = d;
        setSearchResult(res);
    },
    B: function() {
        var json = {};
        eval('json=' + getResCode());
        var res = {};
        var d = [];
        for (var i = 0; i < json.list.length; i++) {
            var r = {};
            var j = json.list[i];
            r.title = j.name;
            r.img = j.pic.indexOf('http') != -1 ? j.pic : url + j.pic;
            r.url = urll + j.id + '/' + "#immersiveTheme#";
            r.content = j.name + '\n' + j.en;
            if (r.title !== null && r.title !== undefined && r.title !== '') d.push(r);
        }
        res.data = d;
        setSearchResult(res);
    },
    //搜索C技术源码有墙佬提供，yyds
    C: function() {
        var d = [];
        var html = getResCode();
        if (html.indexOf('检测中') != -1) {
            html = request(MY_URL + '?btwaf' + html.match(/btwaf(.*?)\"/)[1], {
                headers: {
                    'Cookie': getMyVar('cookie')
                }
            });
        }
        if (html.indexOf('系统安全验证') > -1) {
            var ssyz = 'TloGnnikThrfs/5fDNlk5CSsbaGtAH7W/uMZjuYoIupB6bCoo9CotLQHfPIdGgbkbynKqL2aUE2Xy558X2QxHYtTU09vD+4oaCDIuSZO7nxDbLfRGfWj7zql+yMbvF+aJoD/m6Psfw/PyYOAp/ZVGdrPzaCByfd0HL5DFVSw+YF2OC40V8SP9RxdFKKdrBuPxCWdxUCFrJ+1lRy/TU3LC84C4xxEBhgud7RtBp0zZArqBE06+Z3JtDP0eFCz/D5X0409qPHK3e1y/LuUgccuxpHnjYLE1GjlP8wYA2hQWe7yPngggQBHw33/gvb3tuCcxEKTWgmah/R32AH9ZF8jF7WemT26lUizVXe/spCdhDiwRmgTBTHWuSeJWgKHJRb9iVSn2X6OK90RfEqjkC/rIUeZMOlYpXh7zXix9HkNSurWsdOgtH46rV4Xi7EYo5Ksh0ZP9HUrZ5YHpH3pyeXMlZINa9KUhHeS6n79hjw9AlRL8ys+hzx2iDejWJBmihuJVQYjlWSgB7EAMas2+2yzBCS7H2+45+c8/PETISE+t0qXX621OW+KdysH4jBck/eV9seH/bTWaEoBMesyj/x/h6ScJQtQRavyAk+318qOcIJ+68hs502OnfsTjUgXtyXDjZ7TIcvBBIdP0ewBZpCdOxonBPMSC/QfoZBfJDV6YxXMTghGkKraKK2t+/3MUd+PwippGuO3P2jnH88FPyyx9f12Z/jKRNS+6l9fL9MbuGjr/wL73kz5E7sUEI4NTNOkZrShs/ni+qKrz4WBygFPymdAogdK4WNX2t9wb+t0+uk9ozEHo+kmifijiMQHrwsGNh++imQtlLD7hff6T7uHuY9f34N+NRhedZLNOS3aDJ6SQw96bLncC5rIk5XwLw/NejXlzWg2SDlRGyz31UArjafxA8EgsQ0weLWJn8C3+RqU8sO39MGS4yjQDG5gIa4bSUvBru7wJ6t0FTrBFRGYHeSGRAcyu7SB1CRmJ0rFgwBd59E2LLA56xPs9RUpedVUI/RoFKQlr8g0dUnP3BPtDSfkhSsIrOyyo+fD7u6wJmXzxckZYSvaJCyjvoTQR853a7y3wJ/AlB/nhdqW4QtdirczrhioAEdgZ/u0c+QtZx00QFJd+O6UWVqHQREOVdmiGdtJ+yuf05M6vr26SaegpFUR2hiEHZQYOR/+kTta2i0='
            evalPrivateJS(ssyz);
            let headers = {
                "User-Agent": PC_UA,
                "Cookie": getMyVar('cookie'),
                "Referer": MY_URL
            };
            let vcode = getVCode2(验证码, JSON.stringify(headers), 'num');
            fetch(验证码链接 + JSON.parse(vcode).ret, {
                headers: headers,
                method: 'POST'
            });
            html = fetch(getUrl(), {
                headers: headers
            });
        }

        log(html)
        pdfa(html, 框架列表).forEach(list => {
            d.push({
                title: pdfh(list, 框架标题),
                desc: pdfh(list, 框架描述),
                content: pdfh(list, 框架简介),
                img: pd(list, 框架图片) + "@Referer=",
                url: "hiker://empty##" + pd(list, 框架链接).replace('play', 'detail').replace('/sid/1/nid/1', '').replace('-1-1', '') + "#immersiveTheme#"
            });
        })
        setResult(d)
    }
}