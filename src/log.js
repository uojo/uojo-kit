var chalk = require('chalk')
var colors = require('colors');

const show_level = (process.env.LOG_LEVEL==='product');

const handle = {
	log : function(){
		console.log.apply(undefined, arguments);
	},
	elog : function(){
		if( show_level )return;
		// console.log.apply(undefined, arguments);
		var err = new Error, stacks = err.stack.split('\n');
		// this.log(2,stacks)
		var tStr = stacks[2].match(/([^\)\\]*)\)$/)[1]
		// this.log(tStr)
		var a1 = [tStr.green]
		// var data = Array.prototype.concat.call( arguments, a1 )
		// this.log(12,data.length)
		handle.log.apply(undefined, a1.concat( Array.prototype.slice.call( arguments, 0 ) ) )
	},
	clog : function(){
		if( show_level )return;
		
		let ops = arguments[0], data=Array.prototype.slice.call( arguments, 1 )
		if( typeof ops==='string'){
			ops = {color:ops}
		}else if (typeof ops==='object' && !ops.color){
			ops.color = 'gray'
		}else{
			ops = {color:'white'}
		}

		let val = chalk[ops.color]
		.apply(undefined, data.map(el=>{
			return typeof el==="object"?JSON.stringify(el):el;
		}))
		handle.log.call(undefined, val);
	}
}

module.exports = handle