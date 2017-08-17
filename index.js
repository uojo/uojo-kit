// const log = require('./src/log');

const handle = {
	...require('./src/log'),
	bufferExec:require('./src/bufferExec'),
	delayExec:require('./src/delayExec')
}

module.exports = handle

