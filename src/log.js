const chalk = require('chalk')
const log_hide = (process.env.LOG_ENV!=='debug');

const insertSpace = ()=>{
	
}

const handle = {
	log : function(){
		console.log.apply(undefined, arguments);
	},
	elog : function(){
		if( log_hide )return;
		// console.log.apply(undefined, arguments);
		let err = new Error;
		let	stacks = err.stack.split('\n');
		let stacksLine = stacks[2].replace(/\s/g,"").replace(/\\/g,"/").replace(/[^\(]*\(/,"").replace(/\).*/,"").replace(/[^\w\d:\.\/]/g,'');
		// let stacksTgt = stacks[2].split('\\');
		// handle.log(stacksLine)
		// console.log(3,this)
		// let errStr = stacksTgt[stacksTgt.length-1].replace(/[^\w\d:\.]/g,'');
		
		let a1 =[]
		if(stacksLine){
			a1.push( chalk.keyword('magenta')(stacksLine+'\n') )
		}
		
		// let data = Array.prototype.concat.call( arguments, a1 )
		// handle.log(12,a1)
		handle.log.apply( undefined, a1.concat( Array.prototype.slice.call( arguments, 0 ) ) )
	},
	clog : function(){
		// if( log_hide )return;
		
		// 设置颜色
		let ops = arguments[0];
		if( typeof ops==='string'){
			ops = {color:ops}
		}else if (typeof ops==='object' && !ops.color){
			ops.color = 'gray'
		}else{
			ops = {color:'white'}
		}
		
		let _clog = chalk.keyword(ops.color);
		
		// 显示数据
		let logBody = []
		Array.prototype.slice.call( arguments, 1 ).map( el=>{
			let td;
			// console.log('>', el, _clog() )
			if(el.constructor == Error){
				// console.log(typeof el.stack);
				td = el.stack
			}else if(el.constructor == Array){
				
			}else if(el.constructor == Object){
				td = JSON.stringify(el)
			}else{
				td = el
			}
			
			logBody.push(_clog(td))
		})
		
		// console.log(">>",logBody)
		
		/* let a1 = chalk.keyword('blue')('Hello world!')
		let d1 = [a1,new Error(456), chalk.red(123)]
		console.log.apply( undefined, d1 ); */
		// console.log( ops.color )
		// console.log( chalk.keyword(ops.color)('hello','world') )
		// console.log( chalk.keyword('red')(new Error()) )
		console.log.apply(undefined, logBody);
		// return ;
	}
}

/* handle.elog.ops = function(){
	console.log(1,this)
	// console.log( this('cyan',2,3,4) )
	// handle.clog.call(this,'blue',2,3,4)
	// return false;
} */
/* handle.clog.a = function(){
	console.log(1,this)
	// console.log( this('cyan',2,3,4) )
	handle.clog.call(this,'blue',2,3,4)
	// return false;
} */

// 快捷调用
const colors = ['black','red','green','yellow','blue','magenta','cyan','white','gray']
colors.map(el=>{
	handle.clog[el] = function(){
		// console.log(1,this)
		// console.log( this('cyan',2,3,4) )
		let td = [el].concat(Array.prototype.slice.call( arguments, 0 ))
		handle.clog.apply(this, td)
	}
})


module.exports = handle