// 每条记录的最小响应时间
module.exports = function( delayTime = 0 ){
	let map = {};
	
	// 回执，表示 exec_fn 已经结束
	this.run = ( record )=>{
		let nowTime = (new Date).getTime()
		let rlt = false;
		if( map[record] === undefined ){
			map[record] = nowTime
			rlt = true;
		}else if( (nowTime-map[record])>delayTime ){
			rlt = true;
			
		}

		return rlt;
	}
	
} 