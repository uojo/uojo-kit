const {elog, clog, DelayExec} = require('../index')

// 阻挡间隔内的队列任务
const delayobj = new DelayExec(40)

module.exports = function(){
	let test = {
		total:15,
		s:0,e:0
	};
	
	let count = test.total;
	let tid=setInterval(()=>{
		if(count<1){
			clearInterval(tid);
			elog(test)
			return;
		}
		clog('green',count)
		count--;
		if( delayobj.hit('app') ){
			elog(Date.now())
			test.s++
		}else{
			clog('yellow','wait a moment')
			test.e++
		}
		
	},30)
}