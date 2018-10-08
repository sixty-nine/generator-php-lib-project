'use strict';

const Generator = require('yeoman-generator');
const utils = require('../helpers/utils');
const Config = require('../helpers/config');

module.exports = class extends Generator {
    async prompting() {
        const cfg = new Config(this.config);

        const { projectFullName } = await this.prompt({
            type: 'input',
            name: 'projectFullName',
            message: 'Your project full name',
            default: cfg.get('project', 'name') || 'vendor/project'
        });

        let defNamespace = cfg.get('project', 'namespace');

        if (!defNamespace) {
            const vendorProject = projectFullName.split('/');
            defNamespace =
                utils.dashToPascal(vendorProject[0]) +
                '/' +
                utils.dashToPascal(vendorProject[1]);
        }

        const { projectNamespace, projectDescription } = await this.prompt([
            {
                type: 'input',
                name: 'projectNamespace',
                message: 'Your project namespace',
                default: defNamespace
            },
            {
                type: 'input',
                name: 'projectDescription',
                message: 'Your project description',
                default: cfg.get('project', 'description')
            }
        ]);

        cfg.set('project', 'name', projectFullName);
        cfg.set('project', 'namespace', projectNamespace);
        cfg.set('project', 'description', projectDescription);
        cfg.set('project', 'phpNamespace', projectNamespace.replace('/', '\\\\'));
        cfg.save();
    }
};
