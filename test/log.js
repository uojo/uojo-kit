const {elog, clog} = require('../index')
const da = {
		a:{
			b:{
				c:3
			},
			e:[1,2,3]
		},
		f:function(){
			
		}
	}

elog('number',12)
elog('string','hello жпнд')
elog('object',da)
elog('array',da.a.e)

clog('red','red')
clog('green','green')
clog('yellow','yellow')
// console.log('end')