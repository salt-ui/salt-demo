const TingleUI = require('tingle-ui');
let {Toast, Button, Boxs} = TingleUI;
let HBox = Boxs.HBox;
let Box = Boxs.Box;

class Page extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick(options) {
        Toast.show(options);
    }

    changeTheme() {
        let element = document.getElementById('current-theme');
        let href = element.href;
        let timestamp =  new Date().getTime();
        if (~href.indexOf('default')) {
            element.href = href.replace(/default\.css(.*)/, '') + 'blue.css?' + timestamp;
        } else if (~href.indexOf('blue')) {
            element.href = href.replace(/blue\.css(.*)/, '') + 'dd.css?' + timestamp;
        } else if (~href.indexOf('dd')) {
            element.href = href.replace(/dd\.css(.*)/, '') + 'default.css?' + timestamp;
        }
    }

    render() {
        let t = this;
        return (
            <div className="page-button">
                <div className="t-PL16 t-PR16">
                    <Button type="primary" onClick={t.handleClick.bind(t, {
                    type: 'success',
                    content: '提交成功'
                })}>一级按钮</Button>
                    <Button type="secondary" onClick={t.handleClick.bind(t, {
                    type: 'error',
                    content: '提交出错'
                })}>二 级 按 钮</Button>
                    <Button type="minor" onClick={t.handleClick.bind(t, {
                    type: 'fail',
                    content: '取消'
                })}>幽灵按钮</Button>
                    <HBox>
                        <Box flex={1} className="t-PR8">
                            <Button type="primary" onClick={t.handleClick.bind(t, {content: '提交失败'})}>小按钮</Button>
                        </Box>
                        <Box flex={1} className="t-PL8">
                            <Button type="secondary" onClick={t.changeTheme.bind(t)}>切换主题</Button>
                        </Box>
                    </HBox>
                    <Button disabled={true}>禁用按钮</Button>
                </div>
                <Button className="fixed-button tPF" onClick={t.handleClick.bind(t, {content: '请稍后', type: 'loading'})}>通栏按钮</Button>
            </div>
        );
    }
}

module.exports = Page;
