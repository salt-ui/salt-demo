const TingleUI = require('tingle-ui');
var { Button, Dialog } = TingleUI;

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
    }

    handleAlert() {
        Dialog.alert({
            title: '测试',
            content: '我是测试我是测试我是测试我是测试我是测试',
            onConfirm() {
                console.log('alert confirm');
            }
        });
    }

    handleTitle() {
        Dialog.alert({
            content: '我是测试内容我是测试内容',
            onConfirm() {
                console.log('no title confirm');
            }
        });
    }

    handleMultiLines() {
        Dialog.alert({
            title: '测试',
            content: '我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内',
            onConfirm() {
                console.log('multi lines confirm');
            }
        });
    }

    handleConfirm() {
        Dialog.confirm({
            title: '测试',
            content: '我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内',
            onConfirm() {
                console.log('confirm confirm');
            },
            onCancel() {
                console.log('confirm cancel');
            }
        });
    }

    handlePage() {
        this.refs.mainDialog.show();
    }

    handleMultiLayer() {
        this.refs.popDialog.show();
    }


    render() {
        let t = this;
        let buttons = [{
            content: '取消',
            callback() {
                console.log('page cancel');
            }
        }, {
            content: '异步',
            callback() {
                setTimeout(function () {
                    t.refs.mainDialog.hide()
                }, 2000);
                return false;
            }
        }, {
            content: '确定',
            callback() {
                console.log('page confirm');
            },
            primary: true
        }];
        let popButton = [{
            content: '测试',
            callback: function () {
                console.log('pop button');
            },
            primary: true
        }];

        return (
            <div className="page-dialog">
                <Button className="demo" onClick={t.handleAlert.bind(t)}>alert</Button>
                <Button className="demo" onClick={t.handleConfirm.bind(t)}>confirm</Button>
                <Button className="demo" onClick={t.handleTitle.bind(t)}>no title</Button>
                <Button className="demo" onClick={t.handleMultiLines.bind(t)}>multi lines</Button>
                <Button className="demo" onClick={t.handlePage.bind(t)}>page</Button>
                <Button className="demo" onClick={t.handleMultiLayer.bind(t)}>multi layer</Button>
                <Dialog ref="mainDialog" title="页面上" buttons={buttons}>
                    我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内
                </Dialog>
                <Dialog ref="popDialog" buttons={buttons}>
                    <div onClick={t.handleTitle.bind(t)}>
                        点我出第二层
                    </div>
                </Dialog>
            </div>
        );
    }
}

module.exports = Page;
