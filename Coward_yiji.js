/**
 * 建议复制粘贴到一个 js 文件，然后上传仓库或者码云，之后都作为依赖进行 requireCache 调用
 * 有能力者可修改一下自定义项再作为依赖 require
 */

function 一级() {};
Object.assign(一级.prototype, {
    constructor: 一级,
    test() {},

    获取源码(url, header) {
        return fetch(true_url, {
            headers: header || {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0)'
            }
        }) // 默认统一使用PC UA
    },


    获取正确链接(page, regex) {
        let 链接处理工具 = requireCache('https://gitee.com/coward-cat/js/raw/master/UrlProcessor.js')

        true_url = 链接处理工具
            .链接(true_url)
            .页码(page)
            .插入新处理规则(regex || [])
            .获取处理结果();
        return true_url;
    },
    打造分类(ruleList) {
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
                title: 当前折叠状态 == "1" ? "““””<big><b><font color='#5959AB'>" + '∧' + "</font></b></big>" : "““””<big><b><font color='#DC143C'>" + '∨' + "</font></b></big>"
           
            }) // 可选

            // .第几行开始折叠(2) // 可选
            // .折叠按钮样式({ 折叠按钮插入行: 2 })  // 可选，但必须先调用 .第几行开始折叠(index)，然后再传入 { 折叠按钮插入行: index }
            .选中的分类颜色(colour)
            .开始打造分类();
    },


    生成片单(d, html) {

        let list = parseDomForArray(html, 列表);
        for (let j in list) {
            d.push({
                title: parseDomForHtml(list[j], 标题),
                desc: parseDomForHtml(list[j], 描述),
                img: parseDom(list[j], 图片) + '@Referer=',
                url: parseDom(list[j], 链接).replace('play', 'detail').replace('/sid/1/nid/1', '') + "#immersiveTheme#"
            });
        }
    }

})

$.exports = new 一级();
$.exports