'use strict';

const Generator = require('yeoman-generator');
const Config = require('../helpers/config');

module.exports = class extends Generator {
    async prompting() {
        const cfg = new Config(this.config);

        const { authorName, authorEmail, authorUrl } = await this.prompt([
            {
                type: 'input',
                name: 'authorName',
                message: 'Author name',
                default: this.user.git.name()
            },
            {
                type: 'input',
                name: 'authorEmail',
                message: 'Author email',
                default: this.user.git.email()
            },
            {
                type: 'input',
                name: 'authorUrl',
                message: 'Author URL'
            }
        ]);

        cfg.set('author', 'name', authorName);
        cfg.set('author', 'email', authorEmail);
        cfg.set('author', 'url', authorUrl);
        cfg.save();
    }
};
