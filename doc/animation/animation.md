# Animation

**函数参数值，可以查询每个函数方法的原型说明，参数比较多就不一一说明**

## 创建动画的三种方式

1. BABYLON.Animation.CreateAndStartAnimation
2. new BABYLON.Animation
3. scene.onBeforeRenderObservable

## 区别

一方法是 二方法的一种特殊情况, 指定一个 target 的 prop 属性比如 position 或者 rotation, 指定帧数，每秒渲染帧数，动画播放模式，prop 初始值，prop 最终值 等属性，动画将按照指定的模式来从第0帧 一直播放到最后一帧 的动画效果，动画过程中 target 的 prop 属性值 将从初始值缓慢变化到最终值

二方法相比于一方法可以调用 animation 的 setKeys 中指定一些特定帧的 prop 值，在 对 prop 值变化有灵活规则情况下可以考虑用 二 方法

三方法有多种写法
scene.onBeforeRenderObservable.add(function(){})
scene.beforeRender = function(){}
scene.registerBeforeRender(function(){})

从规范上来看，更推荐第一种 Observable 写法，更符合响应式编程规范

方法三 可以在全局注册一个预渲染函数，在每一帧渲染之前都会判断这个函数，所以一方面这种方法可以更灵活的控制 target 的变化, 另一方面会有更大的性能消耗，此外，由于每一帧都需要执行这个函数，所以这种方式来实现动画效果时，一般会定义一些全局对象来在本观察函数中作为判断依据,需要谨慎处理好全局关系。

## 动画编辑器

![动画编辑器](./animationCurveEditor.md) 也可以实现一些精细控制的动画效果, 其中制作好的动画，可以下载为json 文件。代码中引入该动画可以使用如下方式引入，

* 文件 URL 方式引入
  ```javascript
    let animations = Animation.ParseFromFileAsync(null,'jsonFileUrlPath')
    let mesh.animations = animations;
    let startFrame = 0;
    let endFrame  = 100;
    let isLoopPlay = true;
    scene.beginAnimation(mesh,startFrame,endFrame,isLoopPlay);
  ```
* JSON 对象引入
  ```javascript
    let animations = [Animation.Parse(animationJson.animations[0]),Animation.Parse(animationJson.animations[1])];
    let mesh.animations = animations;
    let startFrame = 0;
    let endFrame  = 100;
    let isLoopPlay = true;
    scene.beginAnimation(mesh,startFrame,endFrame,isLoopPlay);
  ```
