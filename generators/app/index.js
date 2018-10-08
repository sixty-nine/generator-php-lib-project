'use strict';
const Generator = require('yeoman-generator');
const Config = require('../helpers/config');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.option('force');
    }

    prompting() {
        this.cfg = new Config(this.config);

        if (this.options.force || !this.cfg.get('project', 'name')) {
            this.composeWith(require.resolve('./generator-info'));
        }

        if (this.options.force || !this.cfg.get('author', 'name')) {
            this.composeWith(require.resolve('./generator-author'));
        }
    }

    configuring() {
        if (!this.cfg.get('paths', 'root')) {
            this.cfg.set('paths', 'src', 'src/' + this.cfg.get('project', 'namespace'));
            this.cfg.set(
                'paths',
                'tests',
                'src/' + this.cfg.get('project', 'namespace') + '/Tests'
            );
            this.cfg.save();
        }

        if (
            this.options.force ||
            !this.config.fs.exists(this.destinationPath('LICENSE'))
        ) {
            this.composeWith(require.resolve('generator-license'), {
                name: this.cfg.get('author', 'name'),
                email: this.cfg.get('author', 'email'),
                website: this.cfg.get('author', 'url'),
                defaultLicense: 'MIT',
                output: this.destinationPath('LICENSE')
            });
        }

        this.composeWith(require.resolve('./generator-files'));

        this.composeWith(require.resolve('./generator-composer'));

        this.composeWith(require.resolve('./generator-git'));
    }

    writing() {}

    install() {}
};
