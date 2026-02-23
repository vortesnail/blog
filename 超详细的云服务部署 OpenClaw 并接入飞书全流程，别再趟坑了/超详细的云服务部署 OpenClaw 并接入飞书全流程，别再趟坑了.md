## 先讲点题外话

大概是 2015 年，我在大学寝室看了一部电影《她》，讲的是一个**人与人工智能相爱的科幻爱情电影**。

![她0.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/X0op/1362X739/0.png/webp)

电影中的“女主”是斯嘉丽配音的人工智能操作系统 OS1 ，她可以深入了解、分析并理解你的生活，通过每日的经历不断成长和完善，不仅能够帮你实打实干事，还能够理解环境和用户的情绪，从而不断地进化成一个你越来越信任和依赖的伙伴。

那时候觉得这种形态的产品终究是会来的，想着 50 岁左右应该人工智能能发展到这种程度，但 2026 年的今天，已经能看到这种产品的雏形了！并且这回我坚定相信，今年年底前就必会有第一个（或几个😂）这样的商业产品发布。

## OpenClaw 助我

很幸运，现在借助 OpenClaw 可以很轻松实现一个初版的这样的产品，而且每一个人都可以拥有，你需要准备的只有以下三样：

- 会操作电脑
- 有一台电脑
- 有一个大模型的 ApiKey

因为 OpenClaw 拥有系统的极高权限和很强的主动性，所以不建议使用自己的常用电脑，比如办公电脑。你应该不想看到因为你跟 AI 吐槽了一句老板，他就私聊骂了你老板这样的事情发生吧。

如果你有闲置的电脑，也建议你备份好资料，格式化后再开始使用，毕竟你的隐私在 AI 面前是公开透明的。

也可以选择像我一样，买一个轻量应用服务器，尝尝鲜，实践一下，探索探索他能为我们带来什么，**走在未来中**。

### 上云！

服务器按常规理解就是一台电脑，各大云厂商都有这种产品，我看了下，现在像阿里云、腾讯云、火山引擎这些，都有活动力度很大的轻量应用服务器。

因为我已经是阿里云的老用户了，没有新人优惠，所以我去腾讯云看了看，诶，真别说，便宜。所以接下来，我会以腾讯云的轻量应用服务器，做一个全流程演示部署 OpenClaw 并接入飞书的详细过程。

让我们开始吧～

#### 购买与配置

进入到[腾讯云官网](https://cloud.tencent.com/)，鼠标移到顶部【产品】，点击【轻量应用服务器】。

![购买1.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/3iqI/1700X936/1.png)

点【开年大促】，因为便宜。

![购买2.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/219P/2736X1326/2.png)

跳转之后，一定要往下翻，或者点击【出海优选】，找到【境外云服务器】，买第一个。

![购买3.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/5THI/1310X1074/3.png)

因为这个能选择海外节点，并且时长能选1个月和3个月，我们本来就是买来尝试的，没必要买太久或者太好的。

选择海内还是海外，看你需求，反正国内比较快，海外比较广～

我也不确定，如果你选了国内的节点，会不会有比如后续安装依赖不成功、输入模型 ApiKey 后续无响应等等问题。

点击【立即购买】之后，会弹出配置选择，我是买了3个月的，你可以只买1个月。

![配置4.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/jvP0/1790X1548/4.png)

这里我多说一嘴，镜像这里你就选 `OpenClaw(Clawdbot)2025.x.x` ，这是云厂商专门为了部署 OpenClaw 优化后的镜像，该有的环境人家都给你搞好了。

因为我自己是技术，我不信邪，不喜欢别人给我搞好的环境，就是要自己去搭环境，然后折腾了4个小时，不是这个版本不对，就是那个服务起不来报错。重装了3次系统，最后还是选了官方提供的镜像，半小时搞定。。

购买付款成功后，来到服务器的控制台，直接点【登录】进入服务器环境。

![登录云服务器5.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/Dm7h/1820X280/5.png)

出现登录确认框，选择【免密登录】，可能还会让你手机扫码验证，验证就行了。

![登录验证6.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/u05t/1108X578/6.png)

#### 部署 OpenClaw

开始部署前，需要预装 node 22.x 版本，我们先检查下，输入以下命令：

```bash
node -v
```

如果是这样的输出，那么就说明我们上面选的镜像已经给我们配好了。

![node版本7.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/BuGL/658X166/7.png)

然后输入以下命令开始走配置流程：

```bash
openclaw onboard
```

你看到的样子大概是这样的。

![配置流程8.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/Lxph/1566X500/8.png)

有的朋友可能会问，为什么看别人教程都是执行下面这个命令？

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

原因还是在于我们购买配置云服务器环境时，选的是 OpenClaw 应用环境，已经帮我们预装好了 OpenClaw，所以我们可以不用再次安装了， `openclaw onboard` 命令是让我们能走配置流程，比如最重要的模型配置。

ok，打住，我们等一下小会儿之后，会有几个问题，如下选择就可以。

![选择9.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/WIi3/1092X900/9.png)

第一个告知你，把系统权限交出去，风险很高；第二个是快速配置还是手动配置；第三个就选当前存在的就行。

再下一个就是让你选择模型，这里我选择的是 OpenAI，使用 CodeX 授权。

![openai授权10.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/5tPe/846X274/10.png)

过程很简单。他给你什么，需要你给他什么，都照做就行了。

比如这是我授权完成之后的样子。

![openai授权11.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/V67J/1380X1084/11.png)

再接着，会让你选择 channel ，也就是你希望的聊天工具。

但是请注意，你或许可以看到 feishu、qq、wecom 这些，**但是先别选**，我们等会说更方便的配置方式。

所以，选择跳过就行。

再往下会让我们选择 skills ，先不用选，如果你需要，可以服务跑起来之后，你和 AI 对话，让他自己装去。

> skills 就是你给 AI 配置的、能让它执行特定任务的自定义技能 / 插件

![skills13.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/3FqF/746X144/13.png)

来到 hooks 这里把所有都选上（按空格选择）。

![hooks14.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/AZAn/1454X324/14.png)

`boot-md` 作用是程序 “开机” 时，先把所有用 Markdown 写的内容“读懂” 并准备好，确保后续使用时能正确处理 Markdown 格式的内容（比如渲染成可读文本、解析配置参数）。

`command-logger` 就是给 OpenClaw 装了个 “监控摄像头”，只要你执行任何 OpenClaw 命令，它就会自动记下来：谁、什么时候、执行了什么命令、传了什么参数、执行成功 / 失败、返回了什么结果。要我说，程序员比较好这口。

`session-memory` 用来保存会话历史消息、维护技能执行的中间状态、实现上下文关联的对话 / 操作。

终于来到最后了，还记得我们之前选的是 OpenClaw 镜像，所以服务是开启的，会看到下面这个重启服务提示，我们选择 Restart 就行。

![重启服务15.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/56EC/1160X268/15.png)

选择使用 WebUI 的方式，来和我们的 AI 对话！我相信你已经不想再写命令后语句了吧。。WebUI 就是你可以使用浏览器，打开一个网址，你可以在这个页面和你的 AI 对话！

![如何和机器人对话16.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/4buk/1070X252/16.png)

当你点击确定后，会滚动到最下面，你会先看到如图。

![部署成功20.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/wAiu/1252X100/20.png)

恭喜你，这表示你成功了。我们直接按 `ctrl + c` 退出对话就行，不然你没办法执行后面的命令。

现在问题来了，我怎么和 AI 对话，刚才说的 WebUI 方式呢？笔记，你往上翻一点，会看到这个。

![部署成功17.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/TNFU/1446X748/17.png)

它提示我们，要用浏览器打开 `http://127.0.0.1:18798/#token=xxxx` 这个地址

坏了，这个服务器没有像我们使用的电脑，有可视化的操作窗口，当然也没有浏览器这东西，那我们还怎么打开呢？

> 使用过云服务器的同学，可能会选择使用公网 IP 地址 + 端口的方式访问，很遗憾，OpenClaw 的服务默认是 127.0.0.1 ，不是 0.0.0.0 ，所以这种方式是行不通的。如果你要去改默认配置，不保证会出什么问题。

别着急，如果仔细看，你在上图中还能看到这么一句命令：

```bash
ssh -N -L 18789:127.0.0.1:18789 root@<host>
```

这条命令会建立一条加密的 SSH 隧道，把你本地电脑的 `18789` 端口和远程服务器的 `18789` 端口 “打通”，你在本地电脑访问 `127.0.0.1:18789` ，请求会被加密传到远程服务器，转发到服务器本机的 `18789` 端口，结果再通过隧道传回来，相当于你本地 “直通” 了远程服务器的 18789 端口。

简单来说就是，你能在你本地电脑上，获得和你在云服务器上一样的访问效果。

现在，我们打开自己正在操作的电脑，也就是说了半天的本地电脑，找到命令行工具，以 MacOS 为例，按下快捷键 `command + 空格` ，输入 `Terminal` ，然后点击打开终端。

把上面 `<host>` 部分替换为自己云服务器的远程公网 IP，回到腾讯云的服务器实例可以看到。

![复制公网IP.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/NwRF/1418X812/%E6%88%AA%E5%B1%8F2026-02-15_20.57.05.png)

复制替换掉就，然后执行。比如我的如下：

```
ssh -N -L 18789:127.0.0.1:18789 root@43.256.98.231
```

然后，去享受你的成果吧！！

打开自己电脑上的浏览器，复制并输入上面提到的地址：

```
http://localhost:18789/#token=xxxx
```

你会发现，你可以对话了，跟它说句，“你好”吧！

![2188X1048/21.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/HZPr/2188X1048/21.png)

你会注意到地址栏不是原来那样了，放心，只是被这个正在访问的网站处理或者重定向了，不影响。

本质上，你已经可以通过这个界面开始对话，让 OpenClaw 为你做事了。但接下来为了对话更方便，我们可以在飞书建个机器人，然后接入我们部署的🦞。

另外，以下三个命令很有用，可以助你排查问题：

```bash
# 查看 openclaw 是否在后台运行
openclaw health
# 查看模型状态，是否连上了大模型
openclaw models list
# 查看聊天通道
openclaw channels list
```

### 接入飞书

还记得之前我们选择 channel 的时候，选择了跳过吗？因为云厂商为我们提供了更方便的形式，答应我，能不折腾命令行去输入就别折腾，没意义。因为你可能会花大把时间在各种包的版本不兼容的问题上。。

首先我们需要有一个【企业自建应用】。

![创建企业自建应用22.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/z1oz/1944X1036/22.png)

填完基本资料创建之后，选择菜单【凭证与基础信息】，然后看右边的【App ID】和【App Secret】。

![appinfo23.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/5YF9/2596X820/23.png)

回到腾讯云服务台，点击【应用管理】，把飞书看到的【App ID】和【App Secret】分别复制到添加的飞书通道下，然后点击【添加并应用】。

![添加飞书24.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/bPJS/1722X1234/24.png)

如果问你要不要重启 Gateway，你确认继续就行。

就这么简单，成功了。

不过我们需要回到飞书开发者后台，建一个机器人。

![建机器人26.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/FYF7/1138X676/26.png)

建好之后，啥也不用动，我们先来配置权限，找到权限管理菜单，点击【批量导入/导出权限】。

![权限管理菜单27.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/ivEv/1218X370/27.png)

然后复制我给你的以下权限。

```json
{
  "scopes": {
    "tenant": [
      "bitable:app",
      "bitable:app:readonly",
      "contact:contact.base:readonly",
      "contact:user.base:readonly",
      "docx:document",
      "docx:document.block:convert",
      "docx:document:create",
      "docx:document:readonly",
      "drive:drive",
      "drive:drive:readonly",
      "im:chat.members:read",
      "im:chat:read",
      "im:chat:readonly",
      "im:message",
      "im:message.group_at_msg:readonly",
      "im:message.group_msg",
      "im:message.p2p_msg:readonly",
      "im:message.reactions:read",
      "im:message:readonly",
      "im:message:recall",
      "im:message:send_as_bot",
      "im:message:update",
      "im:resource",
      "space:document.event:read",
      "task:comment",
      "task:task.event_update_tenant:readonly",
      "task:task:read",
      "task:task:write",
      "wiki:wiki",
      "wiki:wiki:readonly"
    ],
    "user": []
  }
}
```

大概长这样，你可以对照下。

![参照28.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/s8Ez/1666X1376/28.png)


下一步之后，找到菜单【事件与回调】，把事件配置订阅方式改为推荐的：使用长链接接收事件。

![29.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/2bhb/1386X810/29.png)

还要点击右下角，添加事件，以下是我的选择，都全选了。

![全选1 30.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/3LfZ/1666X1400/30.png)

![全选2 31.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/4Hxk/1670X1402/31.png)

你可以自己决定哪些需要。

接着我们把回调配置也设为长链接，这回就不需要添加事件了。

![回调32.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/4bbh/1504X842/32.png)

保存之后就可以了。

最厚一步来了，我们配了这么多东西，肯定是要发布的是吧。

选择【版本管理与发布】，写一些表单资料就行，最后点击保存发布！！

![发布33.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/BNOs/1576X522/33.png)

最后的最后，你在飞书中，就可以打开你的机器人开始正常对话了。

![开始对话34.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/iMKB/1450X571/34.png)

恭喜你，走到了这一步，愉快地玩耍去吧。不过请你务必注意自己的 token 消耗，别变成下面这样了。😂

![哈哈哈.png](https://pic5.fukit.cn/autoupload/3hSUJiZ_4wC6f4BPFCj5WNiO_OyvX7mIgxFBfDMDErs/20260215/EpGD/1024X410/a87a74c6-7eae-4066-8ed9-d25862f89765.png)

如果对你有帮助，欢迎关注我，我会持续分享一些 AI
、科技相关教程、心得～
