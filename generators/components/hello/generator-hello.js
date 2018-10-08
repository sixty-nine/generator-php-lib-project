'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const Config = require('../../helpers/config');

module.exports = class extends Generator {
    initializing() {
        this.cfg = new Config(this.config);
    }

    async prompting() {
        this.props = await this.prompt([
            {
                type: 'confirm',
                name: 'skeleton',
                message: 'Would you like to generate a skeleton class?'
            }
        ]);
    }

    end() {
        if (this.props.skeleton) {
            console.info(chalk.blueBright('Generating skeleton...'));

            this.fs.copyTpl(
                this.templatePath('hello.php'),
                this.destinationPath(this.cfg.get('paths', 'src') + '/Hello.php'),
                this.cfg.all()
            );

            this.fs.copyTpl(
                this.templatePath('hello-test.php'),
                this.destinationPath(this.cfg.get('paths', 'tests') + '/HelloTest.php'),
                this.cfg.all()
            );
        }
    }
};
