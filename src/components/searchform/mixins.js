export default {
    data () {
        return {
        }
    },
    methods: {
        dateFormat(format, type) {
            switch (type) {
                case 'date':
                case 'daterange':
                    return format ? format : 'yyyy-MM-dd';
                    break;
                case 'datetime':
                case 'datetimerange':
                    return format ? format : 'yyyy-MM-dd HH:mm';
                    break;
                default:
                    return format ? format : 'yyyy-MM-dd HH:mm';
                    break;
            }
        }
    }
}
