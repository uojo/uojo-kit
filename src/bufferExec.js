const DelayExec = require('./delayExec')
const {clog,elog} = require('./log')
/* 
作用：队列中单任务的缓冲执行
async：执行方式，false 同步、true 异步
nextPoint：队列中下一个任务的执行顺序: first、last 
runBy: 队列执行队列依照，timeline 时间轴、queue 队列
*/

module.exports = function( options ){
	let exec_lock = false;
	var exec_queue = [];
	let ops = Object.assign({
		// 可以通过控制线程数，以实现并发执行
		// async:false,
		heartTime:200,
		nextPoint:'first',
		runBeforeClearTasks:false, // 每次执行任务时，是否清空队列
		pushLimitMaxTime:0, //任务进入队列的最小间隔时间
		
	},options);
	let delayExec;
	if(ops.pushLimitMaxTime){
		delayExec = new DelayExec(ops.pushLimitMaxTime)
	}
	
	this.tasks = exec_queue;

	// 将任务推送到队列
	this.push = function(){
		var fn_body = arguments[0];
		if(!fn_body) return;
		
		var fn_args = Array.prototype.slice.call(arguments,1);
		if(delayExec && !delayExec.hit()){
			return;
		}
		
		exec_queue.push({body:fn_body,args:fn_args});
	}
	
	function openLock(){
		exec_lock = false;
	}
	
	// 从队列中取方法执行
	setInterval(function(){
		var qlen = exec_queue.length;
		// console.log(qlen,exec_lock);
		if(qlen && !exec_lock){
			// 从队列取方法并执行
			var tfn;
			if(ops.nextPoint=='first'){
				tfn = exec_queue.shift();
			}else if(ops.nextPoint=='last'){
				tfn = exec_queue.pop();
			}

			exec_lock = true;
			if(ops.runBeforeClearTasks){
				exec_queue = [];
			}
			var tfn_args = [openLock].concat(tfn.args);
			// elog(tfn_args)
			tfn.body.apply(undefined,tfn_args);
		}
	},ops.heartTime);
	
} 