# uojo-kit

> 常用 node 模块集合

## 使用

安装

```
npm install uojo-kit
```

代码中引入

```
const uojoKit = require("uojo-kit")

```

## 方法

### log
对 console.log 进行分装，实现：log 输出的颜色定制、log 显示的代码行号

方法 | 功能
:---|:---
clog | log 输出的颜色定制
eclog | 显示代码执行行号

示例：
```
uojoKit.clog('red','content')
uojoKit.elog('content')
```

### BufferExec(options)
对单任务队列执行进行缓冲执行。简单的说，这个类可以收集需要执行的任务，按顺序执行。

options 参数：

字段 | 默认值 | 作用
:---|:-------|:---
nextPoint | first |下一个执行的任务是取队列中新（last）旧（first）
speedTaskEnter | 0 |任务进入队列的最小时间间隔
runBy | timeline |队列执行方式。`timeline`：时间轴，即当前任务执行完后取下一个任务后，在下一个任务执行前将当前队列中所有任务清空。`queue`：按队列顺序执行

方法：
名称 | 作用
:---|:-----
trigger | 将任务推入执行队列，并触发该任务执行
receipt | 回执当前任务执行完毕


示例：
```
const bufferQueue = new uojoKit.BufferExec({
    runBy:'queue',
    speedTaskEnter:0
})

for(let i=0;i<5;i++){
    bufferQueue.trigger((next)=>{
        setTimeout(()=>{
            console.log(i)
            next(); //执行下一个任务
        })
        
    })
}
```

### DelayExec(times)
对需要密集执行的任务，进行一定的过滤。即起到防火墙的效果

参数

参数 | 默认值 | 作用
:---|:---|:---
times | 0 | 任务最小间隔时间

方法

名称 | 作用
:---|:---
hit(recordName) | 需要执行的任务名，当recordName不传时，默认为 `匿名记录`

示例：
```
const fireWall = new uojoKit.DelayExec()
let count = 10;
let tid=setInterval(()=>{
    if(count<1){
        clearInterval(tid);
        return;
    }
    count--;
    if( fireWall.hit('fire') ){
        console.log('中弹')
    
    }else{
        console.log('阻挡')
    
    }
},30)
```

## changeLog
### 0.1.1
- 文档补充
### 0.1.0
- 初始化。提供方法：log 模块、BufferExec 类、DelayExec 类



