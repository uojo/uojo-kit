// const log = require('./src/log');

const handle = {
	BufferExec:require('./src/bufferExec'),
	DelayExec:require('./src/delayExec')
}

Object.assign( handle, require('./src/log') )

module.exports = handle

