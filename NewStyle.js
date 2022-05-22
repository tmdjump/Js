function header(arr, rule){
    var X5='file:///storage/emulated/0/Android/data/com.example.hikerview/files/Documents/rules/dzHouse/html/二级新样式.html';
if(!request(X5)) writeFile(X5, request('https://gitee.com/coward-cat/js/raw/master/%E4%BA%8C%E7%BA%A7%E6%96%B0%E6%A0%B7%E5%BC%8F.html'));
var data = {
    //要显示的大文字
    TITLE: rule.大字,
    //要搜索的片名
    SEARCH: rule.片名,
    //图片一定不要加Referer
    PIC: rule.图片,
    //TEXT里用<br>换行
    TEXT: rule.描述,
}
putVar('二级样式数据', data);
arr.push({
    desc: 'auto&&list',
    url: X5,
    col_type: 'x5_webview_single',
});

function getFileName (name) {
      return name.substring(name.lastIndexOf('/')).slice(1)
}
var cache ="hiker://files/cache/x5二级缓存图片别动.txt";
deleteFile("hiker://files/cache/"+fetch(cache))
var lx=getFileName (data.PIC)
writeFile(cache, lx)
}
header;
//封装断插
//var lazy =`@lazyRule=.js:var player=JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);var jsurl = player.url; if (player.encrypt == '1') {var jsurl = unescape(jsurl);} else if (player.encrypt == '2') {var jsurl = unescape(base64Decode(jsurl));};var from=player.from;if(jsurl.match(/youku|mgtv|ixigua|qq.com|qiyi|migu|sohu|pptv|le|bili/)){eval("var json_p =" + fetch("hiker://files/rules/DuanNian/MyParse.json"));eval(request(json_p.settings.cj));m3u8=aytmParse(jsurl);jsurl.indexOf("mgtv.com") > -1 ? m3u8 + ";{User-Agent@Mozilla/5.0 (Windows NT 10.0)}" : m3u8}else if(jsurl.match(/renrenmi/)){var video = request('https://api.anje.cn/analysis.php?v='+jsurl).match(/urls = "(.*?)"/)[1];cacheM3u8(video)}else{jsurl}`;