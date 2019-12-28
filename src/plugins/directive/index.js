/**
 * 自定义指令
 */
import VResize from 'v-resize';

const colorInserted = (el, binding) => {
    el.style.color = binding.value;
}

const resizeInserted = {
    resize: VResize
}

const fontInserted = (el, binding) => {
    el.style.fontSize = binding.value;
}
export {
    colorInserted,
    resizeInserted,
    fontInserted
}
