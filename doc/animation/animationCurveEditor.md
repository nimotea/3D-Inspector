# AnimationCurveEditor

[BabylonJS Animation Curve Editor Intro Link](https://doc.babylonjs.com/toolsAndResources/inspector/animationCurveEditor)

## 基础知识

动画曲线编辑器是 BABYLON.Inspector 当中一个非常强大的特性功能, 所以想要使用 动画编辑器就必须先引入 Inspector 模块, 其中有两种非代码方式可以在线使用 Inspector 功能

* [Babylon Playground](https://playground.babylonjs.com/) ![playground Inspector](../../public/images/playgroundInspector.png)
* [Babylon Sandbox](https://sandbox.babylonjs.com/) ![sandbox Inspector](../../public/images/sandboxInspector.png)
  

> 需要说明的是，这两个在线站点都有一些限制， playground 站点是 一个快速协同 的 babylonjs运行平台, 所以如果需要导入自己提供的 glb 文件，需要首先提供一个 互联网能访问的模型加载地址。 sandbox 是一个模型检测 debug 站点，用户可以在这里检查自身的模型是否正常，但是无法同时导入多个 模型文件。 如果需要使用到自身提供的多个 3d 模型文件的话，就需要使用代码方式引入 [Inspector 模块](../Insepector.md)。

## 动画须知

在使用动画编辑器之前，首先需要了解，babylonjs 中的动画 其实就是 按顺序执行的一系列帧画面，所以，如果了解了每一帧 模型对象的属性值，就可以制作出对应的动画。

## Curve Editor

使用动画编辑器有两种场景
* 选中一个模型对象，选择右侧对象的 Animations 属性，点击 Editor 就可以新增或修改动画 ![选择模型创建动画](../../public/images/open_curve_editor1.jpg)
* 选中一个模型的 AnimationGroup ,即可编辑 Group 中每个单独动画 ![选择动画组修改动画](../../public/images/open_curve_editor2.jpg)

> 一般来说简单的动画只需要对模型对象新建 Animations 动画，AnimationGroup 场景不多见

### 菜单说明

![动画编辑器菜单](../../public/images/curve_editor_menu.jpg)

上图即为动画编辑器的菜单界面，我们对属性做一一介绍

*  "+" 按钮即为创建动画按钮，一个动画编辑器中可以对对象创建多个动画![创建动画配置](../../public/images/createMenu.jpg)
   * Display Name 为动画名称
   * Mode 为 List 即为内置的模型属性，Custom 即为 自定义的模型属性
   * Property 取决于 Mode 的选择模式，一般List 情况下就能够下拉选择到 position rotation 等常用属性
   * Type 即 property 的数据类型，这个也和代码创建动画的参数是一致的
   * Loop Mode 用来决定 动画播放模式，是循环播放还是只播放一次等等
*  第二个箭头符号 则表示用户可以上传动画内容，和下一个保存按钮中的保存为 json  文件中的格式保持对应。
*  保存按钮， 可以保存到 babylon 的在线服务器也可以保存为 json 文件
*  编辑按钮，可以编辑现有的动画内容
*  每秒显示帧数, fps 支持用户自定义修改

接下来介绍编辑器主体部分的帧控制面板。![帧控制面板](../../public/images/keyControls.jpg)

![帧控制面板细节](../../public/images/frameKey.png)

* 当前 key 帧数，当用户选中一个 key 时,可以通过这个输入框来修改 当前 key 的帧号 (**选中一个key时**)
* 当前 key value 当用户选中一个 key 时，可以通过这个输入框来修改当前 key 的属性具体值 (**选中一个key时**)
* 




## 动画制作

1. 获取到总帧数，以及特定行为(转向移动)的对应帧数。
    > 这一步是动画制作最重要的一步，总体上可以参考物理位移原理来合理设计帧数 

   * 首先获取到物体运动的路线图，记录下每一个特殊(转向移动)帧 模型对象所在的坐标(这里可以使用Inspector 当中的坐标拾取功能以及 位移 gizmo 工具来快速获取)
    
     ![路径坐标](../../public/images/pathPosition.png)
   * 可以给物体运动设置一个固定速度，比如每秒 2.5 个单位，使用坐标算出来 每个坐标到坐标的距离，除以时间便是每个单独路径的耗时 
        
     ![路径耗时](../../public/images/calculateTime.png)
    
   * 然后需要计算累计耗时

     ![路径耗时](../../public/images/Calculate_accumulated_time.png)
    
   * 累计耗时乘以 默认 每秒渲染的帧数， 就可以得到最终的 动画帧数据了 
   **切记不要忘了乘每秒帧数，默认每秒60帧**

2. 

