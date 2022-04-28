export default function formatColorsStyles(components) {
    return components.reduce((accum, component) => {
        return {
            ...accum,
            [`$${component.name}`]: rgbToHex(
                component.fills[0].color.r,
                component.fills[0].color.g,
                component.fills[0].color.b
            )
        };
    }, {});
}

function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(color) {
    let hex = Math.round(color * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}