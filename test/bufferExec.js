const {elog, clog, BufferExec} = require('../index')

// �赲����ڵĶ�������
const fn1 = (cb)=>{
	setTimeout(function(){
		cb && cb()
	},500)
}

// �����첽ִ��
/* const bufferObj1 = new BufferExec({async:true});
for(let i=0;i<2;i++){
	bufferObj1.trigger( ()=>{
		fn1()
	} )
} */


// ����ͬ��ִ��
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