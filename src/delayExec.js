// 每条记录的最小响应时间
module.exports = function( delayTime = 0 ){
	let map = {};
	
	// 回执，表示 exec_fn 已经结束
	this.hit = ( record )=>{
		// 默认匿名记录
		if(record===undefined){
			record = 'anonymous'
		}
		let nowTime = (new Date).getTime()
		let pass = false; // 是否允许通过
		if( map[record] === undefined ){
			pass = true;
			map[record] = nowTime;
		}else if( (nowTime-map[record])>delayTime ){
			pass = true;
			map[record] = nowTime;
		}
		
		return pass;
	}
	
} 