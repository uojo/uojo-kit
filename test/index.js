const kit = require('../index');
const {clog, bufferExec, delayExec} = kit;

console.log( kit )


// 队列执行
const bufferObj1 = new bufferExec({async:true});
for(let i=0;i<3;i++){
	bufferObj1.trigger( ()=>{
		clog(i)
	} )
}

const bufferObj2 = new bufferExec({async:false});
for(let i=0;i<3;i++){
	bufferObj2.trigger( ()=>{
		clog(i)
		return true;
	} )
}

const bufferObj3 = new bufferExec({async:false});
for(let i=0;i<3;i++){
	bufferObj3.trigger( (next)=>{
		clog(i)
		next();
	} )
}

// 阻挡间隔内的队列任务，
const delayobj = new delayExec(3000)
let j=0, start=Date.now();
let tid2 = setInterval(()=>{
	j++;
	if(j===4){
		clearInterval(tid2)
	}
	
	if( delayobj.run('hello') ){
		clog(j, Date.now()-start )
		start = Date.now()
	}

},1000)



