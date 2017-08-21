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
elog('string','hello ÖÐÎÄ')
elog('object',da)
elog('array',da.a.e)


const colors = ['black','red','green','yellow','blue','magenta','cyan','white','gray',
// 'redBright','greenBright','yellowBright',// 'blueBright','magentaBright',
// 'cyanBright','whiteBright'
];

for(let i in colors){
	let name = colors[i]
	clog(name,name)
}

// console.log('end')