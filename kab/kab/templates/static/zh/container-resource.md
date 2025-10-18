## 关于资源

资源的名称一般不可以超过 63 个字符；其中可以包含数字、字母、`'-'`、`'_'` 和 `'.'`，
但是首字符和最末字符不可以是 `'-'`、`'_'` 或 `'.'` 之一。

在 Kubernetes 中存在两种类型的资源名称：

- 标准的资源名称：即下面标准资源名称之一，或者带有 `"hugepages-"` 或 `"requests.hugepages-"`
  前缀的名称；
- 完全限定的资源名称：DNS 风格子域名后接一个斜线（`'/'`）再接一个资源名称。

标准资源名称包括：

- `"cpu"`
- `"memory"`
- `"ephemeral-storage"`
- `"requests.cpu"`
- `"requests.memory"`
- `"requests.ephemeral-storage"`
- `"limits.cpu"`
- `"limits.memory"`
- `"limits.ephemeral-storage"`
- `"storage"`
- `"configmaps"`
- `"secrets"`
- `"pods"`
- `"services"`
- `"replicationcontrollers"`
- `"persistentvolumeclaims"`
- `"resourcequotas"`
- `"requests.storage"`
- `"services.nodeports"`
- `"services.loadbalancers"`

### 标准的容器资源名称

在为容器设置资源请求或者资源限制值时，所指定的资源必须是如下之一：

- 一个 *标准容器资源名称*
- 或者一个用于表示扩展资源的 *非原生资源（Non-native Resource）*

这里的 *标准容器资源名称* 意味着以下情形之一：

- 内置的容器资源名称：`"cpu"`、`"memory"` 或者 `"ephemeral-storage"`
- 带有 `"hugepages-"` 前缀的大页面资源

*原生资源（native resource）* 指的是是处于 `"kubernetes.io/"` 名字空间内的资源。
部分限定名（名字中不包含 `'/'` 的情况）都隐式地包含在 `"kubernetes.io/"` 名字空间内。

*扩展资源名（Extended Resource Name）* 是一个满足如下需求的名称：

- 不在 `"kubernetes.io/"` 名字空间内；
- 不带 `"requests."` 前缀；
- 如果加上 `"requests."` 前缀，可以构造一个限定名称。


