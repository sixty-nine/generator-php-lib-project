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
                name: 'git',
                message: 'Would you like to initialize GIT?'
            }
        ]);
    }

    install() {
        if (this.props.git) {
            console.info(chalk.blueBright('Initializing GIT...'));
            const config = { cwd: this.destinationPath('') };
            this.spawnCommand('git', ['init'], config);
            this.spawnCommand('git', ['add', '.'], config);
            this.spawnCommand('git', ['ci', '-m', 'Initial commit'], config);
        }
    }

    end() {
        this.cfg.set('flags', 'git', this.props.git);
    }
};
