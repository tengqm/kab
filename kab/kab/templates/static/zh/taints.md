## Node Taints

The following taints are defined for Nodes:

<table class="table">
<thead><tr><th>taint</th><th>description</th></tr></thead>
<tbody>
<tr>
  <td><tt>"node.kubernetes.io/not-ready"</tt></td>
  <td>Added when a Node is not ready and removed when the Node becomes ready.
    The node controller monitors the health of all Nodes and adds or removes this
    taint accordingly.
  </td>
</tr>
<tr>
  <td><tt>"node.kubernetes.io/unreachable"</tt></td>
  <td> Added when a Node becomes unreachable from the node controller
    (corresponding to Node condition <code>Ready</code> becomes <code>"Unknown"</code>),
    and removed when the Node becomes reachable again (condition <code>Ready</code>
    becomes <code>"True"</code>).
    The node controller monitors the health of all Nodes and adds or removes this
    taint accordingly.
  </td>
</tr>
<tr>
  <td><tt>"node.kubernetes.io/unschedulable"</tt></td>
  <td>Added when a Node becomes unschedulable and removed when the Node
    becomes schedulable.  This taint is added to a Node during node
    initialization to avoid race condition.
  </td>
</tr>
<tr>
  <td><tt>"node.kubernetes.io/memory-pressure"</tt></td>
  <td>Added when a Node has memory pressure and removed when the Node has enough
    memory. The kubelet detects memory pressure based on the <code>"memory.available"</code>
    and <code>"allocatableMemory.available"</code> observed on a Node. The observed
    values are then compared to the corresponding threshods that can be set on the
    kubelet to determine if the node condition and taint should be added/removed.
  </td>
</tr>
<tr>
  <td><tt>"node.kubernetes.io/disk-pressure"</tt></td>
  <td>Added when a Node has disk pressure and removed when the Node has enough disk.
    The kubelet detects disk pressure by observing the <code>"imagefs.available"</code>,
    <code>"imagefs.inodesFree"</code>, <code>"nodefs.available"</code>, and
    <code>"nodefs.inodesFree"</code>  metrics for a node. The observed values are
    then compared to the corresponding threshods that can be set on the kubelet
    to determine if the node condition and taint should be added/removed.
  </td>
</tr>
<tr>
  <td><tt>"node.kubernetes.io/pid-pressure"</tt></td>
  <td>Added when a Node has PID pressure and removed when the Node has enough PIDs.
    The kubelet checks the PIDs consumed by Kubernetes on a node and the
    <code>rlimit</code> setting on the node. The number of available PIDs are
    referred to as the <code>"pid.available"</code> metric. The metric is
    then compared to the corresponding threshods that can be set on the kubelet
    to determine if the node condition and taint should be added/removed.
  </td>
</tr>
<tr>
  <td><tt>"node.kubernetes.io/network-unavailable"</tt></td>
  <td>Added when a Node's network is unavailable and removed when its network
    becomes ready. This is initially set by the kubelet when the cloud provider
    used indicates a requirement for additional network configuration. Only
    when the route on the cloud is configured properly will the taint be
    removed by the cloud provider.
  </td>
</tr>
</tbody>
</table>

When determining whether to add or remove the following labels, the kubelet
first compares the corresponding metrics listed in the above table to the
thresholds that are set on kubelet via the <code>--eviction-hard</code>
or the <code>--eviction-soft</code> flag. For thresholds set via
<code>--eviction-hard</code>, the metric is compared directly to the
threshold. For thresholds specified through <code>--eviction-soft</code>,
the kubelet postpone the decision for a period that is specified
using the <code>--eviction-soft-grace-period</code> flag. If the condition
does not change over the period, a condition is set on the node.

- <code>"node.kubernetes.io/memory-pressure"</code>
- <code>"node.kubernetes.io/disk-pressure"</code>
- <code>"node.kubernetes.io/pid-pressure"</code>

The setting of node taints is guarded by the `TaintNodesByCondition` feature
gate which was GA'ed in 1.17.

A cloud provider can further taint a node to indicate its current status.

<table class="table">
<thead><tr><th>taint</th><th>description</th></tr></thead>
<tbody>
<tr>
  <td><tt>"node.cloudprovider.kubernetes.io/uninitialized"</tt></td>
  <td>A taint to indicate that the node is not usable yet. When the kubelet is
    started with an external cloud provider, this taint is applied automatically.
    When a controller from the cloud controller manager has initialized the node,
    the taint is removed.
  </td>
</tr>
<tr>
  <td><tt>"node.cloudprovider.Kubernetes.io/shutdown"</tt></td>
  <td>This is a taint added to a Node by an external cloud provider to signal
    that the node is shutting down.
  </td>
</tr>
</tbody>
</table>
