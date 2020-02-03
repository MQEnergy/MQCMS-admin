export default {
    config: {
        table: {
            label_width: 80,
            label_position: 'right',
            size: 'default', // 表格大小 large default small
            size_active: true,
            custom_class: ''
        },
        show: {
            modal_title: '详情',
            modal_width: '1000',
            modal_mask_closable: false
        },
        icon: {
            modal_title: '选择图片',
            modal_width: '800',
            modal_mask_closable: false,
            font_family: "i-icon", // 自定义iconfont的class
            css_prefix_text: "i-icon-", // 自定义iconfont的class前缀
        }
    },
    list: [
        {
            ele_id: 1,
            ele_title: '搜索组件',
            ele_name: 'search',
            ele_hash: '',
            custom_class: '',
            sele_value: '分割文本',
            ele_size: 'default', // large default small
            size_active: false,
            is_active: false,
            ele_attr: {
                base_search_form: {
                    type: 'id',
                    keyword: '',
                    options: [
                        {
                            name: 'ID',
                            value: 'id'
                        }
                    ]
                }, // 普通搜索参数
                advanced_search_form: [
                    {
                        label_name: 'label_name:',
                        label_prop: 'label_prop',
                        ele_value: '',
                        ele_type: 'input',
                        options: []
                    },
                ], // 高级搜索参数
                show_refresh: true, // 展示刷新按钮
                show_export: false, // 展示导出按钮
                show_import: false, // 展示导入按钮
                show_create: true, // 展示创建按钮
                show_advanced: true, // 展示高级搜索按钮
                show_multi_action: false, // 展示更多操作按钮
                multi_actions: [
                    {
                        name: '批量删除',
                        value: 'on-multi-del'
                    }
                ], // 更多操作方法数组
            }
        },
        {
            ele_id: 2,
            ele_title: '表格组件',
            ele_name: 'table',
            ele_hash: '',
            custom_class: '',
            ele_size: 'default', // large default small
            size_active: false,
            is_active: false,
            ele_attr: {
                data: [], // 查询的数据
                columns: [], // 查询的列
                stripe: false, // 是否显示间隔斑马纹
                border: false, // 是否显示纵向边框
                show_header: true, // 是都显示头部
                width: 'auto', // 表格宽度，单位 px
                height: '', // 表格高度，单位 px，设置后，如果表格内容大于此值，会固定表头
                max_height: '', // 表格最大高度，单位 px，设置后，如果表格内容大于此值，会固定表头
                loading: false, // 表格是否加载中
                disabled_hover: false, // 禁用鼠标悬停时的高亮
                highlight_row: {
                    value: false,
                    event: 'on-current-change' // 开启 highlight-row 后有效，当表格的当前行发生变化的时候会触发 currentRow：当前高亮行的数据 boldCurrentRow：上一次高亮的数据
                }, // 是否支持高亮选中的行，即单选
                row_class_name: 'on-row-class-name', // 行的 className 的回调方法，传入参数：row：当前行数据 index：当前行的索引
                no_data_text: '暂无数据', // 数据为空时显示的提示内容
                no_filtered_data_text: '暂无筛选结果', // 筛选数据为空时显示的提示内容
                draggable: false, // 是否开启拖拽调整行顺序，需配合 @on-drag-drop 事件使用
                tooltip_theme: 'dark', // 列使用 tooltip 时，配置它的主题，可选值为 dark 或 light
                row_key: false, // 是否强制使用内置的 row-key，开启后可能会影响性能，4.1.0 支持 String
                span_method: 'on-span-method', // 合并行或列的计算方法
                show_summary: false, // 是否在表尾显示合计行
                sum_text: '合计', // 合计行第一列的文本
                summary_method: 'on-summary-method', // 自定义的合计计算方法
                indent_size: '16', // 树形数据缩进宽度，单位 px
                load_data: 'on-load-data', // 异步加载树形数据的方法，详见示例
                context_menu: {
                    value: false,
                    event: 'on-contextmenu'
                }, // 当前行点击右键是否会阻止默认行为
                column_attr: {
                    type: '', // 列类型，可选值为 index、selection、expand、html
                    title: '#', // 列头显示文字
                    key: '', // 对应列内容的字段名
                    width: '', // 列宽
                    min_width: '', // 最小列宽
                    max_width: '', // 最大列宽
                    align: 'left', // 对齐方式，可选值为 left 左对齐、right 右对齐和 center 居中对齐
                    class_name: '', // 列的样式名称
                    fixed: '', // 列是否固定在左侧或者右侧，可选值为 left 左侧和 right 右侧
                    ellipsis: false, // 开启后，文本将不换行，超出部分显示为省略号
                    tooltip: false, // 开启后，文本将不换行，超出部分显示为省略号，并用 Tooltip 组件显示完整内容
                    render: 'on-render', // 自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引，详见示例。
                    render_header: 'on-render-header', // 自定义列头显示内容，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 column 和 index，分别为当前列数据和当前列索引。
                    index_method: 'on-index-method', // type 为 index 时可用，自定义序号
                    sortable: {
                        value: false,
                        event: 'on-sort-method' // 自定义排序使用的方法，接收三个参数 a 、 b 和 type，当设置 sortable: true 时有效。type 值为 asc 和 desc
                    }, // 对应列是否可以排序，如果设置为 custom，则代表用户希望远程排序，需要监听 Table 的 on-sort-change 事件
                    sort_type: '', // 设置初始化排序。值为 asc 和 desc
                    filters: {
                        value: [],
                        event: 'on-filter-method'
                    }, // 过滤数据的选项，格式为数组，数组中每项包含 label 和 value 属性，使用过滤，必须同时配置 filterMethod
                    filter_multiple: true, // 数据过滤的选项是否多选
                    filtered_value: [], // 在初始化时使用过滤，数组，值为需要过滤的 value 集合
                    filter_remote: 'on-filter-remote', // 使用远程过滤
                    children: [], // 表头分组
                    resizable: false, // 该列是否允许拖拽调整宽度，需开启 border 属性，且设置 width
                    tree: '', // 指定该列为显示展开/收起图标，树形数据时使用
                }
            },
        }
    ],
    search_form: [
        {
            ele_id: 1,
            ele_title: 'input组件',
            ele_name: 'input',
            ele_hash: '',
            label_width: 80,
            ele_width: '',
            custom_class: '',
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
            ele_id: 2,
            ele_title: '单选框组',
            ele_name: 'radio_group',
            ele_hash: '',
            label_width: 80,
            ele_width: '100',
            ele_prop: 'radio_group',
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
            ele_id: 3,
            ele_title: '多选框组',
            ele_name: 'checkbox_group',
            ele_hash: '',
            label_width: 80,
            ele_width: '',
            custom_class: '',
            ele_prop: 'checkbox_group',
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
            ele_id: 4,
            ele_title: '日期组件',
            ele_name: 'datepicker',
            ele_hash: '',
            label_width: 80,
            ele_width: '',
            custom_class: '',
            ele_prop: 'datepicker',
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
                separator: '--', // 两个日期间的分隔符
                capture: true // 是否开启 capture 模式，也可通过全局配置
            },
            ele_value: "",
            options: {}
        },
        {
            ele_id: 5,
            ele_title: 'select组件',
            ele_name: 'select',
            ele_hash: '',
            label_width: 80,
            ele_width: '',
            custom_class: '',
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
            ele_id: 6,
            ele_title: 'switch组件',
            ele_name: 'switch',
            ele_hash: '',
            label_width: 90,
            ele_width: '',
            custom_class: '',
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
        }
    ]
};