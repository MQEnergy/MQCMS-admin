/**
 * 自定义指令
 */
import VResize from 'v-resize';

const colorInserted = (el, binding) => {
    if (binding.value) {
        el.style.color = binding.value;
    }
};

const bgColorInserted = (el, binding) => {
    if (binding.value) {
        el.style.backgroundColor = binding.value;
    }
};

const resizeInserted = {
    resize: VResize
};

const fontInserted = (el, binding) => {
    if (binding.value) {
        el.style.fontSize = binding.value + 'px';
    }
};

const heightInserted = (el, binding) => {
    if (binding.value) {
        el.style.height = binding.value + 'px';
    }
};

const widthInserted = (el, binding) => {
    if (binding.value) {
        if (binding.value.toString().lastIndexOf('%') > 0) {
            el.style.width = binding.value;
        } else {
            el.style.width = binding.value + 'px';
        }
    }
};

export {
    colorInserted,
    resizeInserted,
    fontInserted,
    heightInserted,
    widthInserted,
    bgColorInserted
}
