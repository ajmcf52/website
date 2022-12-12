export const setCacheCookie = (name, value, options = {}) => {
    document.cookie =
        encodeURIComponent(name) +
        "=" +
        encodeURIComponent(value) +
        "; max-age=900";
};

export const getCacheCookie = async (regex) => {
    var cookies = document.cookie.split(/;\s*/),
        i;
    for (i = 0; i < cookies.length; i++) {
        if (cookies[i].match(regex)) {
            return decodeURIComponent(cookies[i]);
        }
    }
    return undefined;
};
