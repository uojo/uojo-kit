const {elog, clog, BufferExec} = require('../index')

// 阻挡间隔内的队列任务
const fn1 = (cb)=>{
	setTimeout(function(){
		cb && cb()
	},500)
}

// 队列异步执行
/* const bufferObj1 = new BufferExec({async:true});
for(let i=0;i<2;i++){
	bufferObj1.trigger( ()=>{
		fn1()
	} )
} */


// 队列同步执行
const bufferObj = new BufferExec({
	runBy:'queue',
	speedTaskEnter:0,
	// runBy:'timeline',
	// nextPoint:'first'
	// nextPoint:'last',
});

const main3 = ()=>{
	for(let i=0;i<5;i++){
		bufferObj.trigger( (next)=>{
			
			fn1(()=>{
				clog('magenta', i, Date.now())
				next();
			})
			
		} )
	}
}


module.exports = function(){
	main3()
}