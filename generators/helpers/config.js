'use strict';

module.exports = class {
    constructor(config) {
        this.storage = config;
        this.cfg = this.storage.getAll();

        if (!this.has('project', 'name')) {
            this.set('project', 'name', false);
        }

        if (!this.has('author', 'name')) {
            this.set('author', 'name', false);
        }

        this.save();
    }

    has(key, subkey) {
        return Boolean(this.cfg[key]) && Boolean(this.cfg[key][subkey]);
    }

    set(key, subkey, value) {
        if (!this.cfg[key]) {
            this.cfg[key] = {};
        }

        this.cfg[key][subkey] = value;
        this.storage.set(key, this.cfg[key]);
    }

    get(key, subkey) {
        if (!this.has(key, subkey)) {
            return null;
        }

        return this.cfg[key][subkey];
    }

    all() {
        return this.cfg;
    }

    save() {
        this.storage.save();
        this.cfg = this.storage.getAll();
    }
};
