export default function formatTextStyles(components) {
    return components.reduce((accum, component) => {
        return {
            ...accum,
            [`$${component.name}_font_size`]: component.style.fontSize + 'px',
            [`$${component.name}_font_weight`]: component.style.fontWeight
        };
    }, {});
}