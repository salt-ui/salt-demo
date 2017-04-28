const TingleUI = require('tingle-ui');
let { Progress, Button, Icon, ActionSheet, Popup } = TingleUI;

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            percent1: 0,
            percent2: 30,
            percent3: 70,
        };
        
    }

    render() {
        const t = this;

        if (t.state.percent1 < 100) {
        setTimeout(() => {
            t.setState({
                percent1: t.state.percent1 + 20,
                });
            }, 1000);
        }

        return (
        <div className="page-extra">
            <div style={{ marginBottom: '30px' }}>
                <Progress percent={t.state.percent1} status="normal" showInfo />
            </div>
            <div style={{ marginBottom: '30px' }}>
                <Progress percent={t.state.percent2} status="exception" showInfo={false} />
            </div>
            <div style={{ marginBottom: '30px' }}>
                <Progress percent={t.state.percent3} showInfo strokeWidth={1} />
            </div>
            <div>
                <Button onClick={() => {
                ActionSheet.show({
                        options: ['操作一', '操作二', '操作三', '清空聊天记录'],
                        destructiveButtonIndex: 3,
                        message: '我是描述我是描述',
                        maskClosable: false,
                    }, (index) => {
                        console.log(index);
                    });
                }}
                >动作面板</Button>
            </div>
            <div>
                <Button onClick={() => {
                Popup.show(<div className="demo-popup-container">我是弹出层</div>, {
                    animationType: 'slide-up',
                });
                }}
                >默认向上划出</Button>
                <Button onClick={() => {
                Popup.show(<div className="demo-popup-container">我是弹出层</div>, {
                    animationType: 'slide-down',
                });
                }}
                >向下划出</Button>
                <Button onClick={() => {
                Popup.show(<div className="demo-popup-container-2">我是弹出层</div>, {
                    animationType: 'slide-right',
                });
                }}
                >向右划出</Button>
                <Button onClick={() => {
                Popup.show(<div className="demo-popup-container-2">我是弹出层</div>, {
                    animationType: 'slide-left',
                });
                }}
                >向左划出</Button>
                <Button onClick={() => {
                Popup.show(
                    <div className="demo-popup-container-2">
                    <div onClick={() => {
                        Popup.hide();
                    }}
                    >点我关闭 popup</div>
                    </div>, {
                    maskClosable: false,
                    });
                }}
                >手动控制关闭 Popup</Button>
            </div>
        </div>
        );
    }
}

module.exports = Page;
