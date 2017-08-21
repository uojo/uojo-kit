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
	let exec_queue = [];
	// let exec_fn = options.fn
	let ops = Object.assign({
		// 可以通过控制线程数，以实现并发执行
		async:false,
		nextPoint:'first',
		runBy:'timeline',
		speedTaskEnter:0, //任务进入队列的最小间隔时间
		
	},options);
	let delayExec;
	if(ops.speedTaskEnter){
		delayExec = new DelayExec(ops.speedTaskEnter)
	}
	
	
	// 触发
	this.trigger = (exec_fn)=>{
		if(!exec_fn) return;
		
		if(ops.async){
			exec_fn()
			return;
		}
		// console.log('exec_lock',exec_lock)
		
		if(exec_lock){
			if(delayExec && !delayExec.hit()){
				return;
			}
			exec_queue.push(exec_fn)
			return;
		}
		clog('gray','待执行队列数',exec_queue.length)
		exec_lock = true;
		if( ops.runBy ==='timeline' ){
			clog('gray','清空队列')
			// 执行前，清空队列
			exec_queue=[];
		}
		clog('green','函数执行开始')
		exec_fn( this.receipt )

	}
	
	// 回执，表示 exec_fn 已经结束
	this.receipt = ()=>{
		clog('green','函数执行回执')
		exec_lock = false
		// 检查在执行期间是否有队列进入
		if( exec_queue.length>0 ){
			let nextOne;
			if( ops.nextPoint ==='first' ){
				nextOne = exec_queue.shift()
			}else if( ops.nextPoint ==='last' ){
				nextOne = exec_queue.pop()
			}
			
			clog('yellow','执行队列中下一个任务')
			this.trigger( nextOne )
		}
	}
	
} 