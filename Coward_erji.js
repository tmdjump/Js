var d = [];
var html = getResCode();

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
        .replace(' ', '')
        .replace(' ', '')
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

var conts = pdfa(html, 选集列表);
var lists = [];
for (var i in conts) {
    lists.push(pdfa(conts[i], 选集标签))
}

//这里定位简介
function 文本取左边(obj, 关键字) {
    var index = obj.indexOf(关键字);
    obj = obj.substring(0, index);
    return obj;
}

function 文本取右边(obj, 关键字) {
    var index = obj.indexOf(关键字);
    obj = obj.substring(index + 1, obj.length);
    return obj;
}

var desc = parseDomForHtml(html, 定位简介).replace('[收起部分]', '').replace(/\s/g, '');

d.push({

    title: '剧情简介：',
    //定位图片
    pic_url: parseDom(html, 定位封面),
    //定位标题
    desc: '‘‘’’<small><font color="#ff62a6fb">简介：' + desc.substr(0, 65) + '...</font><small><font color="#5959AB">查看详情</font></small></small>',
    url: 'hiker://empty#' + desc + `@rule=js:var res = {}; var d = [];d.push({title:'影片简介：'+ MY_URL.split('hiker://empty#')[1],col_type: 'long_text'});res.data = d; setHomeResult(res);`,

    col_type: 'movie_1_vertical_pic_blur',
    extra: {
        gradient: true
    }
});
/*

//二级新样式by顺承天意（已封装断插，变量名lazy）
const hd = require("http://hiker.nokia.press/hikerule/rulelist.json?id=2968&v=1");
hd(d, {
    //显示的白色大字
    大字: pdfh(html, 搜索标签),
    //片名搜索用
    片名: pdfh(html, 搜索标签),
    //图片一定不要加Referer
    图片: pd(html, 定位封面),
    //描述里用<br>换行
    描述: pdfh(html, 定位简介),//.substring(0, 35),
});


*/

var title = parseDomForHtml(html, 搜索标签);

d.push({
    title: "视界",
    pic_url: 'https://lanmeiguojiang.com/tubiao/q/34.png',
    url: 'hiker://search?s=' + title + '&group=①高清',
    col_type: 'icon_small_4',
});
d.push({
    title: '资源采集',
    pic_url: 'https://lanmeiguojiang.com/tubiao/q/79.png',
    url: 'hiker://search?s=' + title + '&rule=资源网采集.xyq',
    col_type: 'icon_small_4',
});
d.push({
    title: '香情影视',
    pic_url: 'https://lanmeiguojiang.com/tubiao/q/68.png',
    url: 'hiker://search?s=' + title + '&rule=香情影视',
    col_type: 'icon_small_4',
});


d.push({
    title: '青豆',
    pic_url: 'https://lanmeiguojiang.com/tubiao/q/10.png',
    url: 'hiker://search?s=' + title + '&rule=青豆',
    col_type: 'icon_small_4',
});


for (var i = 0; i < 4; i++) {
    d.push({
        col_type: "big_blank_block"
    })
}

d.push({
    col_type: 'line'
});

for (var i = 0; i < 5; i++) {
    d.push({
        col_type: "big_blank_block"
    })
}

require('https://gitea.com/AI957/Hiker/raw/m/v/Route.js');

d.push({
    title: '    🚸    ',
    url: setupPages("设置"),
    col_type: 'scroll_button'
});

function getHead(title) {
    return '‘‘’’<small><font color="#5959AB">' + title + '</front></small>';
}


function setTabs(tabs, taburl) {
    for (var i in tabs) {
        var tabname = tabs[i];



        if (tabs.length > 0) {
            d.push({
                //title: tabname,
                title: getHead(tabname),
                col_type: 'scroll_button',
                url: $("#noLoading#").lazyRule((tabname, taburl, i) => {
                    putMyVar('当前线路名', tabname);
                    putMyVar(taburl, i)
                    refreshPage();
                    return 'hiker://empty'
                }, tabname, taburl, i)
            });
        }
    }
}

function setLists(lists, index) {
    var list = lists[index];
    // log('选集有：'+list.length+' · 线路有：'+tabs.length)
    // 将反序归正
    try {
        if (pdfh(list[0], "a&&Text").match(/(\d+)/)[0] > pdfh(list.slice(-1)[0], "a&&Text").match(/(\d+)/)[0]) list.reverse()
    } catch (e) {}

    var icon_s = 'http://82.156.222.77/weisyr/icon/';
  /*  if (getMyVar('选集排序') == 1) {
    
    
        var avatar = icon_s + '正序.svg'
    } else {
        var avatar = icon_s + '反序.svg'
    }
    */
    
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
    
    
 for (var i = 0; i < 3; i++) {
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

    
    d.push({
        title: "<font color='#5959AB'>" + getMyVar('当前线路名', tabs[0]) + "</font>" + "<small><font color='grey'>" + '\t\t〰️\t\t' + "</font></small>" + "<font color='#5959AB'>" + list.length + '集' + "</font>",
        url: `@lazyRule=.js:if(getMyVar('选集排序')==1){putMyVar('选集排序', 0);}else{putMyVar('选集排序', 1)};refreshPage();'hiker://empty';'toast://切换排序成功'`,
        img: obj[getMyVar('当前线路名', tabs[0])] || "https://lanmeiguojiang.com/tubiao/q/40.png",
                    col_type: 'avatar'
    })




    for (let i = 0; i < 4; i++) {
        d.push({
            col_type: "blank_block"
        })
    }

    d.push({
        col_type: 'line'
    });
    for (let i = 0; i < 5; i++) {
        d.push({
            col_type: "blank_block"
        })
    }

    function playLists() {
        var jm = parseDomForHtml(list[j], 'a&&Text').replace(/第|集|话|期/g, '').replace(/预告/g, '📢');
        var url = parseDom(list[j], 'a&&href');
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
    // 开始选集分区
    addListener('onClose', $.toString(() => {
        clearMyVar('当前线路名');
        clearMyVar('分集起');
        clearMyVar('分集终');
    }))
    //选集＞则启用选集分区（list替换成你的选集数组）
    var 选集数组 = list; //改
    if (选集数组.length > 44) {
        //设置每区选集数目
        var page_number = 40;
        var star = getMyVar('分集起', '1');
        var end = getMyVar('分集终', JSON.stringify(page_number));
        var total = Math.ceil(选集数组.length / page_number);
        var catalogue = []
        for (let i = 0; i < total; i++) {
            catalogue += i * page_number + ',';
            catalogue = catalogue.split(',');
        }

        for (let i = 0; i < 5; i++) {
            d.push({
                col_type: "blank_block"
            })
        }

        for (var i = 0; i < catalogue.length - 1; i++) {
            var total1 = parseInt(catalogue[i]) + 1;
            var total2 = parseInt(catalogue[i + 1]);
            if (i == (catalogue.length - 2)) var total2 = 选集数组.length;
            d.push({
                title: star == total1 ? '‘‘' + total1 + '-' + total2 + '’’' : total1 + '-' + total2,
                url: $("#noLoading#").lazyRule((total1, total2) => {
                    putMyVar('分集起', total1);
                    putMyVar('分集终', total2);
                    refreshPage();
                    return 'hiker://empty'
                }, total1, total2),
                col_type: 'scroll_button'
            });
        }
        if (getMyVar('选集排序') == 1) {
            for (var j = end - 1; j >= star - 1; j--) {
                // 打印选集列表
                playLists() //改
            }
        } else {
            for (var j = star - 1; j < end; j++) {
                // 打印选集列表
                playLists() //改
            }
        }
    }
    // 结束选集分区
    else {
        if (getMyVar('选集排序') == 1) {
            for (var j = list.length - 1; j >= 0; j--) {
                playLists()
            }
        } else {
            for (var j = 0; j < list.length; j++) {
                playLists()
            }
        }
    }

    d.push({
        title: '\n',
        url: 'hiker://empty',
        col_type: 'rich_text'
    });
}
setTabs(tabs, MY_URL);
setLists(lists, getMyVar(MY_URL, '0'));
setResult(d);