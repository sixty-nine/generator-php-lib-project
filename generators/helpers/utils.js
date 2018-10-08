'use strict';

module.exports = {
    camelToDash(str) {
        return str
            .replace(/(^[A-Z])/, ([first]) => first.toLowerCase())
            .replace(/([A-Z])/g, ([letter]) => `-${letter.toLowerCase()}`);
    },

    dashToCamel(str) {
        return str.replace(/-([a-z])/g, function(g) {
            return g[1].toUpperCase();
        });
    },

    dashToPascal(str) {
        return this.ucFirst(this.dashToCamel(str));
    },

    ucFirst(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }
};
