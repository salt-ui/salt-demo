const TingleUI = require('../../../../dist/tingle-ui');
let {
    Group,
    TextField,
    TextareaField,
    Slot,
    SelectField,
    Note,
    Button,
    CheckboxField,
    RadioField,
    Toast,
    SwitchField,
    CitySelectField,
    CalendarField,
    CascadeSelectField,
    PickerField,
} = TingleUI;

const DATA = require('./data');

class Page extends React.Component {

    constructor(props) {
        super(props);
        let t = this;
        let dates = Slot.formatDataValue([
            [2015, 2016],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
        ]);
        var monthArray = [
            {value: 0, text: '一月'}, {value: 1, text: '二月'},
            {value: 2, text: '三月'}, {value: 3, text: '四月'},
            {value: 4, text: '五月'}, {value: 5, text: '六月'},
            {value: 6, text: '七月'}, {value: 7, text: '八月'},
            {value: 8, text: '九月'}, {value: 9, text: '十月'},
            {value: 10, text: '十一月'}, {value: 11, text: '十二月'}
        ];
        let relations = [
            {value: 0, text: '朋友'},
            {value: 1, text: '家人'},
            {value: 2, text: '合作伙伴'},
            {value: 3, text: '供应商'}
        ];
        let buildings = Slot.formatDataValue([
            ['西溪', '黄龙', '龙章'],
            ['1号楼', '2号楼', '3号楼', '4号楼']
        ]);
        let checkboxFieldProps = {
            label: '请选择',
            data: [
                {
                    value:"1",
                    checked:false,
                    text: '你好',
                    disable:false
                },
                {
                    value:"2",
                    checked:true,
                    text:"他好",
                    disable:true
                },
                {
                    value:"3",
                    checked:true,
                    text:"我也好",
                    disable:false
                },
                {
                    value:"4",
                    checked:false,
                    text:"大家都好",
                    disable:false
                }
            ],
            onChange: (value, index, data) => {
                t.handleChange('checked', value);
            }
        };
        let element = document.getElementById('current-theme');
        let href = element.href;
        let radioFieldProps = {
            data: [
                {
                    checked: ~href.indexOf('default'),
                    text: "橙",
                    disable: false,
                    value: 'default'
                },
                {
                    checked: ~href.indexOf('blue'),
                    text: "蓝",
                    disable: false,
                    value: 'blue'
                },
                {
                    checked: ~href.indexOf('dd'),
                    text: "钉钉蓝",
                    disable: false,
                    value: 'dd'
                }
            ],
            onChange: function (value, index, data) {
                let timestamp =  new Date().getTime();
                if (~value.indexOf('default')) {
                    element.href = href.replace(/(blue|dd|default)\.css(.*)/, '') + 'default.css?' + timestamp;
                } else if (~value.indexOf('dd')) {
                    element.href = href.replace(/(blue|dd|default)\.css(.*)/, '') + 'dd.css?' + timestamp;
                } else if (~value.indexOf('blue')) {
                    element.href = href.replace(/(blue|dd|default)\.css(.*)/, '') + 'blue.css?' + timestamp;
                }
            }
        };
        t.state = {
            dates: dates.data,
            monthArray: monthArray,
            relations: relations,
            buildings: buildings.data,
            required1: '',
            required2: dates.value,
            required3: dates.value,
            required5: '小明',
            required6: '13223223987',
            required7: buildings.value,
            required8: '',
            optional9: false,
            optional10: true,
            optional11: '',
            disabled: true,
            checkboxFieldProps: checkboxFieldProps,
            radioFieldProps: radioFieldProps,
            checked: true,
            calendarFieldValue: '2016-01-02',
            cascadeSelectValue: [],
        };
        t.calendarFieldProps = {
            className: 'calendar-field-demo',
            label: '日期区间',
            placeholder: '请选择日期',
            required: false,
            multiLine: true,
            layout: 'h',
            type: 'day',
            visible: false,
            singleMode: false,
            showHalfDay: true,
            showTopPanel: true,
            topPanelTitle: 'title',
            value: this.state.calendarFieldValue,
            readOnly: false,
            // formatter: 'yyyy.MM.dd',
        };
        t.districtData = DATA.districtData;
        t.cascadeSelectOptions = [{
            value: 'zhejiang',
            label: '浙江',
            children: [{
                value: 'hangzhou',
                label: '杭州',
                children: [{
                value: 'xihu',
                label: '西湖',
                }, {
                value: 'xixi',
                label: '西溪',
                }],
            }],
            }, {
            value: 'jiangsu',
            label: '江苏',
            children: [{
                value: 'nanjing',
                label: '南京',
                children: [{
                value: 'zhonghuamen',
                label: '中华门',
                }, {
                value: 'zongtongfu',
                label: '总统府',
                }],
            }, {
                value: 'suzhou',
                label: '苏州',
                children: [{
                value: 'zhuozhengyuan',
                label: '拙政园',
                }, {
                value: 'shizilin',
                label: '狮子林',
                }],
            }],
        }];
        t.cascadeSelectColumns = ['省', '市', '景点'];
    }

    handleChange(label, value) {
        let t = this;
        t.setState({
            [label]: value
        }, () => {
            let disabled = false;
            for (let key in t.state) {
                if (/^required\d+$/.test(key) && !t.state[key]) {
                    disabled = true;
                    break;
                }
            }
            if (!t.state.checked) {
                disabled = true;
            }
            if (disabled !== t.state.disabled) {
                t.setState({
                    disabled: disabled
                });
            }
        });
    }

    handleClick() {
        for (let key in this.state) {
            if (/^required\d+$/.test(key) && !this.state[key]) {
                Toast.show({
                    type: 'error',
                    content: '请填写必填项',
                    onHide: function () {
                    }
                });
                return;
            }
        }
        Toast.show({
            type: 'error',
            content: '提交出错'
        });
    }

    onCalendarOk(value) {
        console.log(value);
        this.setState({
            calendarFieldValue: value,
        });
    }

    handleCascadeSelectChange(value) {
        this.setState({
            cascadeSelectValue: value,
        });
    }

    render() {
        let t = this;
        return (
            <div className="page-form">
                <div>
                    <Note message='10.1 - 10.8 园区封园，不接受入园申请，请提前做好准备' type='warning' closeText='查看详情'/>
                </div>

                <Group>
                    <Group.Head>必填</Group.Head>
                    <Group.List lineIndent={18}>
                        <TextField label="来访单位" placeholder="请输入" value={t.state.required1}
                                   onChange={t.handleChange.bind(t, 'required1')}/>
                        <SelectField label="来访目的" options={t.state.relations} value={t.state.required4}
                                     onSelect={t.handleChange.bind(t, 'required4')}/>
                        <TextField label="访客姓名" placeholder="请输入" value={t.state.required5}
                                   onChange={t.handleChange.bind(t, 'required5')}/>
                        <TextField label="访客手机" placeholder="请输入" value={t.state.required6}
                                   onChange={t.handleChange.bind(t, 'required6')}/>
                        <TextField label="来访人数" placeholder="请输入" value={t.state.required8}
                                   onChange={t.handleChange.bind(t, 'required8')}/>
                        <SwitchField label="进入工作区" on={t.state.optional9}
                                     onChange={t.handleChange.bind(t, 'optional9')}/>
                        <SwitchField label="WIFI" on={t.state.optional10}
                                     onChange={t.handleChange.bind(t, 'optional10')}/>
                        <CitySelectField
                            label="来访城市"
                            placeholder="请输入"
                            districtData={t.districtData}
                        />
                        <CalendarField
                            {...t.calendarFieldProps}
                            value={t.state.calendarFieldValue}
                            onOk={t.onCalendarOk.bind(t)}
                        />
                        <CascadeSelectField
                            label="级联选择"
                            placeholder="请输入"
                            options={t.cascadeSelectOptions}
                            columns={t.cascadeSelectColumns}
                            onSelect={t.handleCascadeSelectChange.bind(t)}
                            value={t.state.cascadeSelectValue}
                        />
                        <PickerField fetchUrl="http://dip.alibaba-inc.com/api/v2/services/schema/mock/57833.jsonp" label="picker-field" readOnly={false}></PickerField>
                    </Group.List>
                </Group>
                <Group>
                    <Group.Head>主题</Group.Head>
                        <RadioField lineIndent={18} {...t.state.radioFieldProps} />
                </Group>
                <Group>
                    <Group.Head>选填</Group.Head>
                    <Group.List lineIndent={18}>
                        <TextareaField label="备注" minRows={3} placeholder="请输入" value={t.state.optional11}
                                       onChange={t.handleChange.bind(t, 'optional11')}/>
                    </Group.List>
                </Group>
                <Group>
                    <Group.Head>必填</Group.Head>
                    <Group.List lineIndent={18}>
                        <CheckboxField className="t-MR10" {...t.state.checkboxFieldProps}/>
                    </Group.List>
                </Group>
                <div style={{padding: '30px 15px'}}>
                    <Button type="primary" onClick={this.handleClick.bind(this)}>提交</Button>
                </div>
            </div>
        )
    }
}

module.exports = Page;
