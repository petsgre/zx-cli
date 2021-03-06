#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
const download = require('download-git-repo')
const chalk = require('chalk')
var prompt = require('prompt');

program
  .version(require('./package').version, '-v, --version')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook');

program
  .command('init project [env]')
  .description('run setup commands for all envs')
  // .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function (env, options) {

    //
    // Start the prompt
    //
    prompt.start();

    var property = {
      name: 'yesno',
      message: '是否使用typescript,输入yes 或 no',
      validator: /yes*|no?/,
      // validator: /y[es]*|n[o]?/,
      warning: '请输入 yes 或 no',
      default: 'no'
    };

    //
    // Get the simple yes or no property
    //
    prompt.get(property, function (err, result) {
      //
      // Log the results.
      //
      // console.log('Command-line input received:');
      var init = require('./init.js')
      if(result.yesno == 'yes'){
        init.init(true)
      }else{
        init.init(false)
      }
    });
    var mode = options.setup_mode || "normal";
    env = env || 'all';
    // console.log('setup for %s env(s) with %s mode', env, mode);
    // console.log(init);

    // download('https://github.com:zlj002/ahamgr_template#master','"./"/asd', { clone: true }, (err) => {
    //     if (err) {
    //       console.log(chalk.red(err))
    //       process.exit()
    //     }
    //     console.log(chalk.green('项目安装成功开始工作吧!'))
    //   })
  });

program
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function (cmd, options) {
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  }).on('--help', function () {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ deploy exec sequential');
    console.log('  $ deploy exec async');
  });

program
  .command('*')
  .action(function (env) {
    console.log('deploying "%s"', env);
  });

program.parse(process.argv);
