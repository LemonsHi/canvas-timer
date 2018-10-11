# canvas-timer
canvas 实例 -- 编写 canvas 时钟

### 2018-10-10 canvas 入门笔记

beginPath: canvas 开始新的路径

closePath: canvas 结束当前路径
```
注意如下两点：
1. 如果图像不是封闭图像，closePath 会自动使图像封闭
2. baginPath 和 closePath 没有规定必须成对出现，如果想实现不封闭的图像，可以不使用 closePath 方法
```
### 2018-10-11 canvas-timer 实践记录
实践基本完成，完成内容如下：
1. 实时展示实践
2. 时间改变，动态小球下落 -- 运用了自由落体物理模型和弹力模型
