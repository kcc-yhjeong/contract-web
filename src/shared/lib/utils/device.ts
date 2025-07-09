export const getOSByUserAgent = () => {
    if (isIOS()) {
        return 'ios';
    }

    if (isAndroid()) {
        return 'android';
    }

    return 'web';
};

export const isAndroid = () => {
    return navigator.userAgent.match(/Android/i) !== null;
};

export const isIOS = () => {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null;
};

export const isMacOS = () => {
    return navigator.platform.match(/Macintosh|MacIntel|MacPPC|Mac68K/) !== null;
};

export const isMobile = () => {
    return isAndroid() || isIOS();
};

export const isMobileWeb = () => {
    const userAgent = getOSByUserAgent();

    if (userAgent === 'ios' || userAgent === 'android') {
        return true;
    }
    return false;
};

export const isKakao = () => {
    return navigator.userAgent.match(/KAKAO/i) !== null;
};

export const isIE = () => {
    return navigator.userAgent.match(/MSIE|Trident/i) !== null;
};
