export const setCacheCookie = (name, value, options = {}) => {
    document.cookie =
        encodeURIComponent(name) +
        "=" +
        encodeURIComponent(value) +
        "; max-age=3600; samesite=lax;";
};

export const getCacheCookie = async (regex) => {
    var cookies = document.cookie.split(/;\s*/);
    for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].match(regex)) {
            return decodeURIComponent(cookies[i]);
        }
    }
    return undefined;
};
