# day8: 越来越得心应手，问题也越来越多
2019-11-19（周二）

今天的天气是真的好啊，晴空万里，看看，不知道说啥就只能说说天气了。

### 工作
经过一周多的工作，我大概已经可以在那晦涩难懂的代码上修修改改了，今天还补了一个前人留下的坑，把我可得瑟坏了。但是说实话我还是需要一个完整的项目来让自己先熟悉业务开发，不然一直给别人的代码修修补补，我真有点难受。

在做客服项目的时候，用到了防抖，主要是用户输入过快导致的请求过多，但是在使用防抖的时候，我因为是监听的 `oninput` 事件，并且需要传值，又因为事件监听触发函数的方式不太了解，怎么搞都搞不对，还好问了一下佳峰哥，他一分钟就解决来我的问题，贴个代码，以记录：

```javascript
function debounce(func, wait) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  }
}

ele.addEventListener('input', debounce((e) => {
  value = e.target.value;
  fn(value);
}, 400));

function fn(value) { ... }
```

说实话，这段代码无比重要，我之后肯定还会用到很多次！

### 学习
今天还遇到了另一个问题，就是在我进行 `innerHTML` 方式插入节点时，再给新添加进的节点添加 `hover` 样式，发现既然只有第一个才起作用！搞了两个多小时，愣是不知道问题出在哪里。回到家也尝试复现这个问题和别人讨论下，结果发现复现不了，因为一样的操作，既然是有效果的，那我就更懵了，明天还是问问佳峰大佬把。
