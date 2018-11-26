'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const Config = require('../helpers/config');

module.exports = class extends Generator {
    initializing() {
        this.cfg = new Config(this.config);
    }

    writing() {
        const createFiles = () => {
            console.info(chalk.blueBright('Creating files...'));

            const files = [
                '.editorconfig',
                '.gitignore',
                '.gitattributes',
                '.travis.yml',
                'phpmd.xml',
                'tests/phpunit.xml',
                'tests/bootstrap.php'
            ];

            files.forEach(file => {
                this.fs.copy(this.templatePath(file), this.destinationPath(file));
            });
        };

        const createTemplates = () => {
            console.info(chalk.blueBright('Creating templates...'));

            const templates = ['composer.json', '.scrutinizer.yml', 'README.md'];

            const cfg = this.cfg.all();
            cfg.project.phpNamespace = cfg.project.namespace.replace('/', '\\\\');

            templates.forEach(template => {
                this.fs.copyTpl(
                    this.templatePath(template),
                    this.destinationPath(template),
                    cfg
                );
            });
        };

        const createDirectories = () => {
            console.info(chalk.blueBright('Creating directories...'));
            const srcDummy = this.destinationPath(
                this.cfg.get('paths', 'src') + '/.gitkeep'
            );
            const testsDummy = this.destinationPath(
                this.cfg.get('paths', 'tests') + '/.gitkeep'
            );
            this.fs.write(srcDummy, '');
            this.fs.write(testsDummy, '');
            this.fs.delete(srcDummy);
            this.fs.delete(testsDummy);
        };

        createDirectories();
        createFiles();
        createTemplates();
    }
};
