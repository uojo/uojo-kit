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
const err = new Error(), err2 = new Error('abc')


elog('number',12)
elog('string','hello 中文')
elog('object',da,err)
elog('array',da.a.e)

// clog('red',err,err2,'world',{a:1})
clog.red('red')

const colors = ['black','red','green','yellow','blue','magenta','cyan','white','gray',
// 'redBright','greenBright','yellowBright',
// 'blueBright','magentaBright',
// 'cyanBright','whiteBright'
];

// return;
for(let i in colors){
	let name = colors[i]
	clog[name](i,name)
}

// console.log('end')