# day28: 旧客服项目上线
2019-12-09（周一）

我做梦都想进大厂。

### 工作
今天早上就是把旧客服项目上线，改了点BUG，没有感到一丝放松，因为还有客服重构没完成。

当输入框输入了表情之后，其实是以 `img` 标签插入到可编辑的 `div` 标签内的，如果把整段html发送到聊天框内，聊天框那边为了显示表情，又需要生成相同的节点，这样就会带来一个问题，就是xss攻击，因为用户可以随意地将html标签输入进来，然后点击发送，聊天框内什么东西都可能出现，这显然是不可以的。

于是要进行输入之后，点击发送时的转义，我的做法是把包含表情特定格式 `img` 标签和其他正常文字以字符串传入一个函数，这个函数内部运用正则匹配，把 `img` 标签 `match`  到返回一个数组，遍历该数组，将匹配到的每一个标签名存在一个对象里，为 key，再进行一次 `replace` 将该标签换为 `slice` 到的表情真正的名字，以 `[:keai_kwayi:]` 这样的格式返回发送到聊天框，明天要做的就是聊天框对这部分的翻译，以及对其他标签的转义。

`replace` 有个坑：

```javascript
// 错误使用
const strTest = 'Hello javascript';
strTest.replace(/javascript/, 'World');
console.log(strTest);	// 依然打印的是 Hello javascript

// 正确使用
const strTest = 'Hello javascript';
const strTestTemp = strTest.replace(/javascript/, 'World');
strTest = strTestTemp;
console.log(strTest);	// 打印的是 Hello World
```

### 学习
今天还算正常，学了两集vue的视频教程，内容也是比较陌生，希望坚持跟完这个项目之后自己再好好看看官方文档，做点其他项目，渐渐把Vue熟悉起来。加油啊！
