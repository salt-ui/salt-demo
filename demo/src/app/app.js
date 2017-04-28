window.FastClick && FastClick.attach(document.body);
require('@ali/tingle-context');

// 插入 demo svg
let TingleIconSymbolsDemo = require('./../svg/tingle-icon-symbols.svg');
ReactDOM.render(<TingleIconSymbolsDemo/>, document.getElementById('TingleIconSymbolsDemo'));

// 避免内外webview报错
window.AliworkWebView_WillGoBack = function () {
};

const { Router, Route, IndexRoute, Link, hashHistory, browserHistory } = ReactRouter;
const PageHome = require('../pages/home');
const PageButton = require('../pages/button');
const PageList = require('../pages/list');
const PageForm = require('../pages/form');
const PageIcon = require('../pages/icon');
const PageDialog = require('../pages/dialog');
const PageGallery = require('../pages/gallery');
const PageScene = require('../pages/scene');
const PageCalendar = require('../pages/calendar');
const PageExtra = require('../pages/extra');

let _config = {
    ddCorpId: 'dingd8e1123006514592',
    appId: '38',// 必填，微应用ID
    timestamp: new Date().getTime(),// 必填，生成签名的时间戳
    nonceStr: 'alex',// 必填，生成签名的随机串
    signature: 'alex'// 必填，签名
};

window.Ali && Ali.ready(function () {
    if (Ali.isDingDing) {
        let timestamp =  new Date().getTime();
        let element = document.getElementById('current-theme');
        let href = element.href;
        element.href = href.replace(/(default|blue)\.css(.*)/, '') + 'dd.css?' + timestamp;
    }
});

//window.Ali && Ali.ready(function () {
//    let shakeHandler = function () {
//        let element = document.getElementById('current-theme');
//        let href = element.href;
//        if (~href.indexOf('default')) {
//            element.href = href.replace(/default/, 'blue');
//        } else if (~href.indexOf('blue')) {
//            element.href = href.replace(/blue/, 'dd');
//        } else if (~href.indexOf('dd')) {
//            element.href = href.replace(/dd/, 'default');
//        }
//    };
//    if (Ali.isDingDing) {
//        dd.device.accelerometer.watchShake({
//            sensitivity: 5,//振动幅度，Number类型，加速度变化超过这个值后触发shake
//            frequency: 50,//采样间隔(毫秒)，Number类型，指每隔多长时间对加速度进行一次采样， 然后对比前后变化，判断是否触发shake
//            callbackDelay: 1000,//触发『摇一摇』后的等待时间(毫秒)，Number类型，防止频繁调用
//            onSuccess : function(result) {
//                shakeHandler();
//            },
//            onFail : function(err) {
//                alert(err)
//            }
//        });
//    } else if (Ali.isAliwork) {
//        Ali.config({
//            appId: _config.appId,
//            corpId: _config.ddCorpId,
//            timestamp: _config.timestamp, // 必填，生成签名的时间戳
//            nonceStr: _config.nonceStr, // 必填，生成签名的随机串
//            signature: _config.signature // 必填，签名
//        });
//        let watchShake = function () {
//            AlipayJSBridge.call("watchShake", function () {
//                shakeHandler();
//                setTimeout(function () {
//                    watchShake()
//                }, 1000);
//            });
//        };
//        watchShake();
//    }
//
//});
class App extends React.Component {
    render() {
        return (
            <div className="page-content">
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route name="app" path="/" component={App}>
            <IndexRoute component={PageHome}/>
            <Route path="button" component={PageButton}/>
            <Route path="list" component={PageList}/>
            <Route path="form" component={PageForm}/>
            <Route path="icon" component={PageIcon}/>
            <Route path="dialog" component={PageDialog}/>
            <Route path="calendar" component={PageCalendar}/>
            <Route  path="scene" component={PageScene}/>
            <Route  path="extra" component={PageExtra}/>
        </Route>
    </Router>, document.getElementById('TingleDemo')
);

