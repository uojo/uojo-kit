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
uojoKit.red('content') // 支持颜色：'black','red','green','yellow','blue','magenta','cyan','white','gray'
uojoKit.elog('content')
```

### BufferExec(options)
将大量需要执行的任务组成队列，按顺序或并发执行。

#### options 参数：

字段 | 默认值 | 作用
:---|:-------|:---
nextPoint | first |下一个执行的任务是取队列中新（last）旧（first）
pushLimitMaxTime | 0 |任务进入队列的最小时间间隔
runBeforeClearTasks | false | 队列执行方式。`timeline`：时间轴，即当前任务执行完后取下一个任务后，在下一个任务执行前将当前队列中所有任务清空。`queue`：按队列顺序执行

#### 方法：
名称 | 参数 | 说明
:---|:---|:-----
push |function(next){} | 将任务推入待执行队列


示例：
```
const bufferQueue = new uojoKit.BufferExec();

for(let i=0;i<5;i++){
    bufferQueue.push((next)=>{
        console.log(i)
        setTimeout(()=>{
            next(); // 告知当前任务执行完毕，执行下一个任务
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
### 0.4.0
- 重写 bufferExec 方法。
### 0.3.0
- LOG_LEVEL 替换为 LOG_ENV，且值为 debug 时才会执行 elog
### 0.2.0
- elog 显示事件触发的完整路径
### 0.1.3
- 修复 elog 显示行号的bug
### 0.1.2
- 修复显示 Error 对象
- 方法 clog 新增快捷调用方式：clog.red('...') 等于 clog('red','...')
### 0.1.1
- 文档补充
### 0.1.0
- 初始化。提供方法：log 模块、BufferExec 类、DelayExec 类



