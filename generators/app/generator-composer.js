'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const Config = require('../helpers/config');

module.exports = class extends Generator {
    initializing() {
        this.cfg = new Config(this.config);
    }

    async prompting() {
        this.props = await this.prompt([
            {
                type: 'confirm',
                name: 'composer',
                message: 'Would you like to run composer install?'
            }
        ]);
    }

    install() {
        if (this.props.composer) {
            console.info(chalk.blueBright('Initializing composer...'));
            this.spawnCommand('composer', ['install'], { cwd: this.destinationPath('') });
        }
    }

    end() {
        this.cfg.set('flags', 'composer', this.props.composer);
    }
};
