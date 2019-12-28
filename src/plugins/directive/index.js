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
    el.style.fontSize = binding.value + 'px';
}

const heightInserted = (el, binding) => {
    el.style.height = binding.value + 'px';
}

const widthInserted = (el, binding) => {
    if (binding.value.toString().lastIndexOf('%') > 0) {
        el.style.width = binding.value;
    } else {
        el.style.width = binding.value + 'px';
    }
}

export {
    colorInserted,
    resizeInserted,
    fontInserted,
    heightInserted,
    widthInserted
}
