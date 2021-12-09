const program = require("commander");
const path = require("path");
const Process = require("child_process");

// 配置cli
program
  .version("0.0.1")
  .option("--bdlb", "Git local branch batch delete")
  .option("--bdrb", "Git remote branch batch delete")
  .option("--cmr", "Git create MR")
  .option("-b, --branch <name>", "Git branch name")
  .option("-t, --title <content>", "Git MR title")
  .parse(process.argv);

// console.log("program", program);
const cmdExecInfo = {
  bdlb: "./branch_local.sh",
  bdrb: "./branch_remote.sh"
};

const execFile = (cmd,args=null) => {
  Process.execFile(
    path.resolve(__dirname, `${cmd}`),
    args,
    { cwd: process.cwd() },
    function(error, stdout, stderr) {
      console.log(stdout);
      if (error !== null) {
        console.log("exec error: " + error);
      }
    }
  );
};

Object.keys(cmdExecInfo).forEach(key => {
  if (program[key]) {
    execFile(cmdExecInfo[key]);
  }
});

if (program.cmr) {
  const { title, branch } = program;
  execFile(`./create_mr.sh`,[branch,title]);
}
