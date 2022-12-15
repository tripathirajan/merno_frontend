import {
    BLACK,
    WHITE,
    PRIMARY,
    SECONDARY,
    GREY,
    INFO,
    SUCCESS,
    ERROR,
    WARNING,
    GRADIENTS,
    BLUE_LIGHTER,
    BLACK_GREY,
    BLACK_LIGHT,
    BLACK_LIGHTER
} from "../color";

const palette = {
    common: { black: BLACK, white: WHITE },
    primary: { ...PRIMARY },
    secondary: { ...SECONDARY },
    info: { ...INFO },
    success: { ...SUCCESS },
    warning: { ...WARNING },
    error: { ...ERROR },
    grey: GREY,
    divider: GREY[50024],
    gradients: GRADIENTS,
    text: {
        primary: BLACK,
        secondary: BLACK_LIGHT,
        disabled: BLACK_LIGHTER
    },
    background: { paper: WHITE, default: BLUE_LIGHTER, neutral: BLACK_GREY },
    action: {
        active: GREY[600],
        hover: GREY[5008],
        selected: GREY[50016],
        disabled: GREY[50080],
        disabledBackground: GREY[50024],
        focus: GREY[50024],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48
    }
}

export default palette;