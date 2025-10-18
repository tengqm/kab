## 常用的标签

社区目前定义的（保留的）标签如下：

<table class="table">
  <thead>
    <tr>
      <th>标签</th>
      <th>用于</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><tt>"kubernetes.io/arch"</tt></td>
     <td><tt>Node</tt></td>
     <td><tt>kubelet</tt> 会将此标签设置为 Go 语言的 <tt>runtime.GOARCH</tt> 值。
       此标签的主要使用场景是混合集群，也就是既包含 x86 节点也包含 ARM 节点的集群。
     </td>
    </tr>
    <tr>
     <td><tt>"kubernetes.io/os"</tt></td>
     <td><tt>Node</tt></td>
     <td><tt>kubelet</tt> 会将次标签设置为 Go 语言的 <tt>runtime.GOARCH</tt> 值。
       此标签的主要使用场景是混合集群，也就是包含运行不同操作系统（例如 Linux 和 Windows）
       节点的集群。
     </td>
    </tr>
    <tr>
     <td><tt>"kubernetes.io/hostname"</tt></td>
     <td><tt>Node</tt></td>
     <td><tt>kubelet</tt> 会在初始化 Node 对象时设置此标签的取值。
       此标签的主要使用场景是支持 Pod 间反亲和性和多个 Pod 的拓扑分布策略。
     </td>
    </tr>
    <tr>
     <td><tt>"topology.kubernetes.io/zone"</tt></td>
     <td><tt>Node</tt>、<tt>PersistentVolume</tt></td>
     <td>对于 Node 对象而言，此标签的值是由云平台提供的；
       对于 PersistentVolume 对象而言，此标签的值是由制备该 PV 的组件设置的。
     </td>
    </tr>
    <tr>
     <td><tt>"topology.kubernetes.io/region"</tt></td>
     <td><tt>Node</tt>、<tt>PersistentVolume</tt></td>
     <td>对于 Node 对象而言，此标签的值是由云平台提供的；
       对于 PersistentVolume 对象而言，此标签的值是由制备该 PV 的组件设置的。
     </td>
    </tr>
    <tr>
     <td><tt>"failure-domain.beta.kubernetes.io/zone"</tt></td>
     <td><tt>Node</tt>、<tt>PersistentVolume</tt></td>
     <td>对于 Node 对象而言，此标签的值是由云平台提供的；
       对于 PersistentVolume 对象而言，此标签的值是由制备该 PV 的组件设置的。
       从 v1.17 开始，此标签被弃用；用户应该使用 <code>"topology.kubernetes.io/zone"</code> 标签。
     </td>
    </tr>
    <tr>
     <td><tt>"failure-domain.beta.kubernetes.io/region"</tt></td>
     <td><tt>Node</tt>, <tt>PersistentVolume</tt></td>
     <td>对于 Node 对象而言，此标签的值是由云平台提供的；
       对于 PersistentVolume 对象而言，此标签的值是由制备该 PV 的组件设置的。
       从 v1.17 开始，此标签被弃用；用户应该使用 <code>"topology.kubernetes.io/region"</code> 标签。
     </td>
    </tr>
    <tr>
     <td><tt>"beta.kubernetes.io/instance-type"</tt></td>
     <td><tt>Node</tt></td>
     <td>此标签由云平台负责设置，表明节点在云平台上对应的实例类型。
     </td>
    </tr>
    <tr>
     <td><tt>"node.kubernetes.io/instance-type"</tt></td>
     <td><tt>Node</tt></td>
     <td>此标签由云平台负责设置，表明节点在云平台上对应的实例类型。
     </td>
    </tr>
    <tr>
     <td><tt>"node.kubernetes.io/windows-build"</tt></td>
     <td><tt>Node</tt></td>
     <td>此标签用于 Windows 节点，表明节点上操作系统的构建号码。
       所给的构建号码格式为 <code>"<主版本>.<次版本>.<构建号>"</code> 形式
       （例如：<code>"10.0.17763"</code>.）。
       此标签是从 v1.17.0 开始提供的。
     </td>
    </tr>
    <tr>
     <td><tt>"service.kubernetes.io/headless"</tt></td>
     <td><tt>Endpoints</tt></td>
     <td>此标签是由 Endpoints 的控制器添加到 Endpoints 对象之上的，
       其目的是标明 Endpoints 上层的 Service 是否是<B>无头服务（Headless Service）</B>。
       <tt>kube-proxy</tt> 以及某些控制器会查看此标签的内容，
       以确定在使用无头服务时是否要对 Endpoints 对象进行复制。
     </td>
    </tr>
  </tbody>
</table>

