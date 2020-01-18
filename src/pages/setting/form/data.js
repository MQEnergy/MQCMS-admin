export default [
    {
        ele_title: '单行文本',
        ele_name: 'input',
        ele_hash: '',
        ele_prop: '',
        ele_type: 'text',
        ele_value: '',
        placeholder: '请输入单行文本',
        ele_id: 1,
        options: []
    },
    {
        ele_title: '多行文本',
        ele_name: 'input',
        ele_hash: '',
        ele_prop: '',
        ele_type: 'textarea',
        ele_value: '',
        placeholder: '请输入多行文本',
        ele_id: 2,
        options: []
    },
    {
        ele_title: '单选框组',
        ele_name: 'radio_group',
        ele_hash: '',
        ele_prop: '',
        ele_type: '',
        ele_value: '1',
        placeholder: '',
        ele_id: 3,
        options: [
            {
                label: "1",
                name: "是"
            },
            {
                label: "0",
                name: "否"
            }
        ]
    },
    {
        ele_title: '多选框组',
        ele_name: 'checkbox_group',
        ele_hash: '',
        ele_prop: '',
        ele_type: '',
        ele_value: ["项目一", "项目二"],
        placeholder: '',
        ele_id: 4,
        options: [
            {
                label: "项目一",
                name: "项目1"
            },
            {
                label: "项目二",
                name: "项目2"
            }
        ]
    },
    {
        ele_title: '时间组件',
        ele_name: 'datepicker',
        ele_hash: '',
        ele_prop: '',
        ele_type: 'daterange',
        ele_value: "",
        placeholder: '请选择日期',
        ele_id: 5,
        options: {}
    }
];