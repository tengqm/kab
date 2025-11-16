## 节点污点

针对 Node 对象，系统预定义的污点如下：

<table class="table">
<thead><tr><th>污点</th><th>描述</th></tr></thead>
<tbody>
<tr>
  <td><tt>"node.kubernetes.io/not-ready"</tt></td>
  <td>当 Node 未就绪时添加，在 Node 再次就绪时移除。
    节点控制器会监测所有 Node 对象的健康状态，并根据检测结果自动添加或移除此污点。
  </td>
</tr>
<tr>
  <td><tt>"node.kubernetes.io/unreachable"</tt></td>
  <td>当节点控制器无法访问 Node 所对应节点时添加
    （对应 Node 的状况 <code>Ready</code> 变为 <code>"Unknown"</code>）；
    在 Node 所对应的节点再次变为可达时移除
    （Node 状况 <code>Ready</code> 变为 <code>"True"</code>）。
    节点控制器会监测所有 Node 对象的健康状态，并根据检测结果自动添加或移除此污点。
  </td>
</tr>
<tr>
  <td><tt>"node.kubernetes.io/unschedulable"</tt></td>
  <td>当节点不可接受新调度的 Pod 时添加；在节点再次可接受新调度 Pod 时移除。
    此污点在节点初始化期间被添加到 Node 对象上，目的是避免产生竞态条件。
  </td>
</tr>
<tr>
  <td><tt>"node.kubernetes.io/memory-pressure"</tt></td>
  <td>当节点上出现内存压力时添加到 Node 对象上，在节点内存变为充足时移除。
    kubelet 基于 Node 对应的节点上的 <code>"memory.available"</code>
    和 <code>"allocatableMemory.available"</code> 来观测节点内存压力。
    所观测的值会与在 kubelet 上设置的阈值进行比较，进而确定是否要变更 Node
    上的状况值和污点信息。
  </td>
</tr>
<tr>
  <td><tt>"node.kubernetes.io/disk-pressure"</tt></td>
  <td>当节点上出现磁盘压力时添加，当节点磁盘容量再次变得充裕时移除。
    kubelet 通过观测节点上的度量值 <code>"imagefs.available"</code>、
    <code>"imagefs.inodesFree"</code>、<code>"nodefs.available"</code>
    和 <code>"nodefs.inodesFree"</code> 来判定节点磁盘用量。
    所观测的值会与在 kubelet 上设置的阈值进行比较，进而确定是否要变更 Node
    上的状况值和污点信息。
  </td>
</tr>
<tr>
  <td><tt>"node.kubernetes.io/pid-pressure"</tt></td>
  <td>当节点上出现 PID 压力时添加，当节点可用 PID 再次变得充裕时移除。
    kubelet 会持续观测 Kubernetes 在节点上耗用的 PID 数量以及节点上的
    <code>rlimit</code> 值。节点上可用的 PID 个数可以通过度量值
    <code>"pid.available"</code> 获得。
    所观测的值会与在 kubelet 上设置的阈值进行比较，进而确定是否要变更 Node
    上的状况值和污点信息。
  </td>
</tr>
<tr>
  <td><tt>"node.kubernetes.io/network-unavailable"</tt></td>
  <td>当节点的网络不可用时添加，在节点网络再次就绪时移除。
    当所使用的云平台示意节点需要额外的网络配置操作时，kubelet 会为 Node 添加此污点。
    只有云平台上的节点流量路由被适当配置时，云平台驱动才会移除此污点。
  </td>
</tr>
</tbody>
</table>

在确定是否添加（移除）以下污点标签时，kubelet 首先将对应的度量值与 kubelet
配置中设置的阈值进行比较，对应的 kubelet 设置包括
<code>--eviction-hard</code> 或 <code>--eviction-soft</code> 等命令行标志。
对于通过 <code>--eviction-hard</code> 设置的阈值，kubelet 会直接将度量值与其作比较。
对于通过 <code>--eviction-soft</code> 设置的阈值，kubelet 会根据
<code>--eviction-soft-grace-period</code> 参数所设置的时长将决定向后推迟一段时间。
如果在指定的时间窗口期内状况未发生变化，则 kubelet 会设置对应的状况值和污点值。

- <code>"node.kubernetes.io/memory-pressure"</code>
- <code>"node.kubernetes.io/disk-pressure"</code>
- <code>"node.kubernetes.io/pid-pressure"</code>

在 v1.17 之前，是否自动设置节点污点是可以通过 `TaintNodesByCondition` 特性门控来配置的。

云平台驱动可以为 Node 添加一些其他污点，用以标示节点的当前状态。

<table class="table">
<thead><tr><th>污点</th><th>描述</th></tr></thead>
<tbody>
<tr>
  <td><tt>"node.cloudprovider.kubernetes.io/uninitialized"</tt></td>
  <td>用来表明节点尚无法使用的一种污点。当 kubelet 配置了外部云平台驱动时，
    当云控制器管理器中的某个控制器完成了节点的初始化操作之后，此污点被移除。
  </td>
</tr>
<tr>
  <td><tt>"node.cloudprovider.Kubernetes.io/shutdown"</tt></td>
  <td>外部云平台驱动为 Node 添加此污点时意在表明节点正在被关闭。
  </td>
</tr>
</tbody>
</table>
