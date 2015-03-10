module.exports = (function() {
    var from;
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
    var to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
    var mapping = {};
    var i = 0;
    while (i < from.length) {
        mapping[from.charAt(i)] = to.charAt(i);
        i++;
    }
    return function(str) {
        var c, ret;
        ret = [];
        i = 0;
        while (i < str.length) {
            c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i))) {
                ret.push(mapping[c]);
            } else {
                ret.push(c);
            }
            i++;
        }
        return ret.join("").replace(/[^-A-Za-z0-9]+/g, "-").toLowerCase();
    };
})();