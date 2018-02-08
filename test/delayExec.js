const {elog, clog, DelayExec} = require('../index')

// 阻挡间隔内的队列任务
const delayobj = new DelayExec(20)

const runTest = function(){
	let test = {
		total:4,
		s:0,
		e:0
	};
	
	let count = test.total;
	let tid=setInterval(()=>{
		if(count<1){
			clearInterval(tid);
			elog(test)
			return;
		}
		clog('red',"index >",count)
		count--;
		if( delayobj.hit('app') ){
			clog('green',"enter >",count)
			// elog(Date.now())
			test.s++
		}else{
			clog('yellow','wait a moment')
			test.e++
		}
		
	},10)
}

runTest();

module.exports = runTest