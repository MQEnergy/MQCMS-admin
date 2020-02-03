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
                case 'year':
                    return format ? format : 'yyyy';
                    break;
                case 'month':
                    return format ? format : 'yyyy-MM';
                    break;
                default:
                    return format ? format : 'yyyy-MM-dd HH:mm';
                    break;
            }
        }
    }
}
