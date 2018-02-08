const {elog, clog, BufferExec} = require('../index')

// 阻挡间隔内的队列任务
const fn1 = (cb)=>{
	setTimeout(function(){
		cb && cb()
	},500)
}

const task_async = function(){
	// 队列异步执行
	const bufferObj1 = new BufferExec({async:true});
	for(let i=0;i<2;i++){
		bufferObj1.trigger( ()=>{
			fn1()
		} )
	}
}

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
		bufferObj.push((next)=>{
			clog("green","被执行", j, "总队列数:", bufferObj.tasks.length)
			// next();
		},)
		j--;
	},10)

	setTimeout(()=>{
		console.log("已经进入的任务队列数",bufferObj.tasks.length)
	},60)
	
}
// task_sync();

const task_always = function(){
	// 队列同步执行
	const bufferObj = new BufferExec({
		runBeforeClearTasks:false,
		pushLimitMaxTime:0
	});
	var i = 0, tid;
	var tid = setInterval(function(){
			i++
			bufferObj.push(function(next){
				clog("green","被执行",i,bufferObj.tasks.length)
				setTimeout(()=>{
					next();
				},1000)
			})
		},500)

	// console.log("已经进入的任务队列数",bufferObj.tasks.length)
	
}
// task_always();

module.exports = function(){
	
}