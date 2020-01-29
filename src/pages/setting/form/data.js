export default {
    config: {
        upload: {
            modal_title: '选择图片',
            modal_width: '800',
            modal_mask_closable: false,
            btn_title: '上传图片',
            btn_icon: 'md-camera',
            multiple: false,
            upload_url: '/admin/attachment/upload',
            image_list_url: '/attachment/index',
            del_image_url: '/attachment/delete',
            is_local: true,
            is_stock: true,
            is_net: true,
            is_del: true,
            show_base_upload: true
        },
        form: {
            label_width: 80,
            label_position: 'right',
            size: 'default',
            size_active: true,
            custom_class: ''
        },
        show: {
            modal_title: '详情',
            modal_width: '800',
            modal_mask_closable: false
        },
        icon: {
            font_family: "i-icon",
            css_prefix_text: "i-icon-",
        }
    },
    list: [
        {
            ele_id: 1,
            ele_title: '文本分割线',
            ele_name: 'devider',
            ele_hash: '',
            ele_value: '分割文本',
            ele_size: 'default', // 尺寸，可选值为 small 或 default
            ele_attr: {
                color: '#666',
                colors: ['#000', '#17233d', '#515a6e', '#808695', '#c5c8ce', '#dcdee2', '#e8eaec', '#f8f8f9', '#2d8cf0', '#5cadff', '#2b85e4', '#2db7f5', '#19be6b', '#ff9900', '#ed4014'],
                dashed: false,
                orientation: 'center', // 分割线标题的位置，可选值为 left、right 或 center
                type: 'horizontal' // 水平还是垂直类型，可选值为 horizontal 或 vertical
            }
        },
        {
            ele_id: 2,
            ele_title: 'input组件',
            ele_name: 'input',
            ele_hash: '',
            label_width: 80,
            ele_prop: 'input',
            ele_size: 'default',
            size_active: false,
            is_active: false,
            ele_attr: {
                type: 'text', // text、password、textarea、url、email、date、number、tel
                placeholder: '请输入内容',
                clearable: true,
                disabled: false,
                readonly: false,
                required: false,
                maxlength: 200, // 最大输入长度
                show_word_limit: false, // 是否显示输入字数统计，可以配合 maxlength 使用
                password: false, // 是否显示切换密码图标
                icon: '', // 输入框尾部图标，仅在 text 类型下有效
                prefix: '', // 输入框头部图标
                suffix: '', // 输入框尾部图标
                search: false, // 是否显示为搜索型输入框
                enter_button: false, // 开启 search 时可用，是否有确认按钮，可设为按钮文字
                rows: 2, // 文本域默认行数，仅在 textarea 类型下有效
                autosize: false, // 自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 { minRows: 2, maxRows: 6 }
                number: false, // 将用户的输入转换为 Number 类型
                autofocus: false, // 自动获取焦点
                autocomplete: 'off', // 原生的自动完成功能
                element_id: '', //
                spellcheck: false, // 原生的 spellcheck 属性
                wrap: 'soft' // 原生的 wrap 属性，可选值为 hard 和 soft，仅在 textarea 下生效
            },
            ele_value: '',
            options: []
        },
        {
            ele_id: 3,
            ele_title: '单选框组',
            ele_name: 'radio_group',
            ele_hash: '',
            label_width: 80,
            ele_prop: '',
            ele_size: 'default',
            size_active: false,
            is_active: false,
            ele_attr: {
                group_type: '', // 可选值为 button 或不填，为 button 时使用按钮样式
                group_vertical: false, // 是否垂直排列，按钮样式下无效
                border: false
            },
            ele_value: '1',
            options: [
                {
                    label: "1",
                    value: "是",
                    icon: '', // icon显示
                    disabled: false,
                    true_value: true, // 单个radio的时候使用
                    false_value: false // 单个radio的时候使用
                },
                {
                    label: "0",
                    value: "否",
                    icon: '', // icon显示
                    disabled: false,
                    true_value: true, // 单个radio的时候使用
                    false_value: false
                }
            ]
        },
        {
            ele_id: 4,
            ele_title: '多选框组',
            ele_name: 'checkbox_group',
            ele_hash: '',
            label_width: 80,
            ele_prop: '',
            ele_size: 'default',
            size_active: false,
            is_active: false,
            ele_attr: {
                indeterminate: false, // 设置 indeterminate 状态，只负责样式控制
                border: false, // 是否显示边框
            },
            ele_value: [],
            options: [
                {
                    label: "项目一",
                    disabled: false,
                    icon: '',
                    true_value: true, // 单个checkbox的时候使用 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
                    false_value: false // 单个checkbox的时候使用 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
                },
                {
                    label: "项目二",
                    disabled: false,
                    icon: '',
                    true_value: true,
                    false_value: false
                }
            ]
        },
        {
            ele_id: 5,
            ele_title: '日期组件',
            ele_name: 'datepicker',
            ele_hash: '',
            label_width: 80,
            ele_prop: '',
            ele_size: 'default',
            size_active: false,
            is_active: false,
            ele_attr: {
                type: 'date', // date、daterange、datetime、datetimerange、year、month
                format: 'yyyy-MM-dd',
                placement: 'bottom-start', // top top-start top-end bottom bottom-start bottom-end left left-start left-end right right-start right-end
                placeholder: '请选择日期',
                options: {
                    shortcuts: {
                        text: '',
                        value: '',
                        onClick: 'handleDatePickerClick()'
                    },
                    disabledDate: 'handleDatePickerDisableDate()'
                },
                split_panels: false, // 仅在 daterange 和 datetimerange 下可用
                multiple: false, // 开启后，可以选择多个日期，仅在 date 下可用
                show_week_numbers: false, // 开启后，可以显示星期数。
                start_date_year: new Date().getFullYear(), // 设置默认显示的起始日期。
                start_date_month: new Date().getMonth() + 1, // 设置默认显示的起始日期。
                start_date_day: new Date().getDay(), // 设置默认显示的起始日期。
                confirm: false, // 是否显示底部控制栏，开启后，选择完日期，选择器不会主动关闭，需用户确认后才可关闭
                open: null, // 使用该属性后，选择器不会主动关闭。建议配合 slot 及 confirm 和相关事件一起使用
                disabled: false, // 是否禁用选择器
                clearable: true, // 是否显示清除按钮
                readonly: false, // 完全只读，开启后不会弹出选择器，只在没有设置 open 属性下生效
                editable: true, // 文本框是否可以输入，只在没有使用 slot 时有效
                transfer: false, // 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果
                element_id: '', //
                time_picker_options: {}, // 可以在 type 为 datetime 和 datetimerange 下，配置 TimePicker 的属性，比如时间间隔 steps：:time-picker-options="{steps: [1, 10, 10]}"
                separator: '', // 两个日期间的分隔符
                capture: true // 是否开启 capture 模式，也可通过全局配置
            },
            ele_value: "",
            options: {}
        },
        {
            ele_id: 6,
            ele_title: 'select组件',
            ele_name: 'select',
            ele_hash: '',
            label_width: 80,
            ele_prop: 'select',
            ele_size: 'default',
            ele_value: "",
            size_active: false,
            is_active: false,
            ele_attr: {
                multiple: false, // 是否支持多选
                disabled: false,
                clearable: true,
                filterable: false, // 是否支持搜索
                remote: false, // 是否使用远程搜索
                loading: false, // 当前是否正在远程搜索
                loading_text: '', // 远程搜索中的文字提示
                label: '', // 仅在 remote 模式下，初始化时使用。因为仅通过 value 无法得知选项的 label，需手动设置。
                placeholder: '请选择',
                not_found_text: '无匹配数据', // 当下拉列表为空时显示的内容
                label_in_value: false, // 在返回选项时，是否将 label 和 value 一并返回，默认只返回 value
                placement: 'bottom-start', // 弹窗的展开方向，可选值为 top、bottom、top-start、bottom-start、top-end、bottom-end
                transfer: false, // 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果
                element_id: '',
                transfer_class_name: '', // 3.3.0 开启 transfer 时，给浮层添加额外的 class 名称
                prefix: '', // 3.4.0 在 Select 内显示图标
                max_tag_count: 3, // 3.4.0 多选时最多显示多少个 tag
                max_tag_placeholder: '', // 3.4.0 隐藏 tag 时显示的内容，参数是剩余项数量
                allow_create: false, // 4.0.0 是否允许用户创建新条目，需开启 filterable
                capture: true, // 4.0.0 是否开启 capture 模式，也可通过全局配置
            },
            options: [
                {
                    label: "项目1",
                    value: "项目1",
                    desc: '', // 选项右侧描述
                    disabled: false, // 是否禁用option当前项
                    tag: '项目1' // 设置后，在多选时，标签内容会优先显示设置的值
                },
                {
                    label: "项目2",
                    value: "项目2",
                    desc: '', // 选项右侧描述
                    disabled: false, // 是否禁用option当前项
                    tag: '项目2' // 设置后，在多选时，标签内容会优先显示设置的值
                }
            ]
        },
        {
            ele_id: 7,
            ele_title: '上传组件',
            ele_name: 'upload', // 为自定义上传组件
            ele_hash: '',
            label_width: 80,
            ele_prop: 'upload',
            ele_size: 'default',
            size_active: false,
            is_active: false,
            ele_attr: {
            },
            ele_value: '',
            options: []
        },
        {
            ele_id: 8,
            ele_title: 'switch组件',
            ele_name: 'switch',
            ele_hash: '',
            label_width: 90,
            ele_prop: 'switch',
            ele_size: 'default',
            size_active: false,
            is_active: false,
            ele_attr: {
                disabled: false,
                loading: false,
                true_value: "1",
                false_value: "0",
                true_color: '',
                false_color: '',
                custom: {
                    name: 'span', // span icon
                    slot: ['open', 'close'],
                    type: ['开', '关'],
                    is_custom: false
                    // name: 'icon',
                    // slot: ['open', 'close'],
                    // type: ['md-checkmark', 'md-close']
                }
            },
            ele_value: "1",
            options: []
        },
        {
            ele_id: 9,
            ele_title: '评分组件',
            ele_name: 'rate',
            ele_hash: 'rate',
            label_width: 80,
            ele_prop: '',
            ele_size: 'default',
            size_active: false,
            is_active: false,
            ele_attr: {
                count: 5,
                allow_half: true,
                show_text: false,
                disabled: false,
                clearable: false,
                character: '',
                icon: '',
                custom_icon: ''
            },
            ele_value: 0,
            options: []
        }
    ]
};