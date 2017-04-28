/**
 * TingleUI All in One!
 * @author alex.mm
 *
 * Copyright 2014-2016, Tingle Team, Alinw.
 * All rights reserved.
 */

const IconSource = require('./svg/tingle-icon-symbols.svg');
let WRAPPER_ID = '__TingleIconSymbols__';
let doc = document;
let wrapper = doc.getElementById(WRAPPER_ID);
if (!wrapper) {
    wrapper = doc.createElement('div');
    wrapper.id = WRAPPER_ID;
    wrapper.style.display = "none";
    doc.body.appendChild(wrapper);
    ReactDOM.render(<IconSource/>, wrapper);
}

let VERSION;
webpack_set_version

// 按照字母顺序排序
let TingleUI = {
    version: VERSION,
    ActionSheet: require('@ali/tingle-action-sheet'),
    Avatar: require('@ali/tingle-avatar'),
    Boxs: require('@ali/tingle-box'),
    Badge: require('@ali/tingle-badge'),
    Button: require('@ali/tingle-button'),
    Calendar: require('@ali/tingle-calendar'),
    CalendarField: require('@ali/tingle-calendar-field'),
    Card: require('@ali/tingle-card'),
    CascadeSelectField: require('@ali/tingle-cascade-select-field'),
    CheckboxField: require('@ali/tingle-checkbox-field'),
    CitySelectField: require('@ali/tingle-city-select-field'),
    Context: require('@ali/tingle-context'),
    Crumb: require('@ali/tingle-crumb'),
    DatetimeField: require('@ali/tingle-datetime-field'),
    Dialog: require('@ali/tingle-dialog'),
    Field: require('@ali/tingle-field'),
    Gallery: require('@ali/tingle-gallery'),
    Group: require('@ali/tingle-group'),
    Grid: require('@ali/tingle-grid'),
    Icon: require('@ali/tingle-icon'),
    ImageViewer: require('@ali/tingle-image-viewer'),
    Layer: require('@ali/tingle-layer'),
    List: require('@ali/tingle-list'),
    Mask: require('@ali/tingle-mask'),
    Menu: require('@ali/tingle-menu'),
    NavBar: require('@ali/tingle-nav-bar'),
    Note: require('@ali/tingle-note'),
    NumberPicker: require('@ali/tingle-number-picker'),
    NumberPickerField: require('@ali/tingle-number-picker-field'),
    PhotoField: require('@ali/tingle-photo-field'),
    //Picker: require('@ali/tingle-picker'),
    PickerField: require('@ali/tingle-picker-field'),
    Popup: require('@ali/tingle-popup'),
    Progress: require('@ali/tingle-progress'),
    Rate: require('@ali/tingle-rate'),
    RadioField: require('@ali/tingle-radio-field'),
    SearchBar: require('@ali/tingle-search-bar'),
    SelectField: require('@ali/tingle-select-field'),
    Scroller: require('@ali/tingle-scroller'),
    ScrollList: require('@ali/tingle-scroll-list'),
    ScrollView: require('@ali/tingle-scroll-view'),
    Slide: require('@ali/tingle-slide'),
    Slot: require('@ali/tingle-slot'),
    Switch: require('@ali/tingle-switch'),
    SwitchField: require('@ali/tingle-switch-field'),
    Tab: require('@ali/tingle-tab'),
    TabBar: require('@ali/tingle-tab-bar'),
    Table: require('@ali/tingle-table'),
    TextareaField: require('@ali/tingle-textarea-field'),
    TextField: require('@ali/tingle-text-field'),
    Timeline: require('@ali/tingle-timeline'),
    Toast: require('@ali/tingle-toast'),
};

webpack_set_global_salt_ui

module.exports = TingleUI;


