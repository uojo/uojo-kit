const {elog, clog, BufferExec} = require('../index')

const task_async = function(){
	// 阻挡间隔内的队列任务
	const fn1 = (cb)=>{
		setTimeout(function(){
			cb && cb()
		},500)
	}
	// 队列异步执行
	const bufferObj1 = new BufferExec({async:true});
	for(let i=0;i<2;i++){
		bufferObj1.trigger( ()=>{
			fn1()
		} )
	}
}
// task_async()

const task_sync = function(){
	// 队列同步执行
	const bufferObj = new BufferExec({
		pushLimitMaxTime:20
	});
	
	var j=5;
	var tid = setInterval(()=>{
		if(j<1){
			clearInterval(tid);
			return;
		}
		bufferObj.push((next,_j)=>{
			clog("green","被执行的任务编号", _j, "总队列数:", bufferObj.tasks.length)
			next();
		},j)
		j--;
	},10)
	
	setTimeout(()=>{
		console.log("已经进入的任务队列数",bufferObj.tasks.length)
	},60)
	
}
task_sync();

const task_always = function(){
	// 队列同步执行
	const bufferObj = new BufferExec({
		runBeforeClearTasks:true,
		pushLimitMaxTime:0
	});
	var i = 1, j=3, tid;
	var tid = setInterval(function(){
		if(j<1){
			clearInterval(tid);
			return;
		}
		clog('red',"进入队列的任务编号",i);
		bufferObj.push(function(next,_i){
			clog("green","被执行编号",_i, "任务队列数",bufferObj.tasks.length)
			setTimeout(()=>{
				next();
			},1000)
		},i);
		i++;j--;
	},500)
	
	// console.log("已经进入的任务队列数",bufferObj.tasks.length)
	
}
// task_always();

module.exports = function(){
	
}