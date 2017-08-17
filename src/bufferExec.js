module.exports = function( options ){
	let exec_lock = false;
	let exec_queue = [];
	// let exec_fn = options.fn
	let async = options.async
	
	// 触发
	this.trigger = (exec_fn)=>{
		if(!exec_fn) return;
		
		if(async){
			exec_fn()
			return;
		}
		console.log('exec_lock',exec_lock)
		
		if(exec_lock){
			exec_queue.push(exec_fn)
			return;
		}
		console.log('exec_queue',exec_queue)
		exec_lock = true;
		exec_queue=[];
		
		let rlt = exec_fn( this.receipt )
		if( rlt ){
			this.receipt();
		}
	}
	
	// 回执，表示 exec_fn 已经结束
	this.receipt = ()=>{
		exec_lock = false
		
		// 检查在执行期间是否有队列进入
		if( exec_queue.length>0 ){
			this.trigger(exec_queue[0])
		}
	}
	
} 