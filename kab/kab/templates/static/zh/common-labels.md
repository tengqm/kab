## Well-known Labels

The following labels are currently defined.

<table class="table">
  <thead>
    <tr>
      <th>Label</th>
      <th>Used on</th>
      <th>Note</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><tt>"kubernetes.io/arch"</tt></td>
     <td><tt>Node</tt></td>
     <td>The kubelet sets this with <tt>runtime.GOARCH</tt> as defined by GoLang.
       The main use case is for a hybrid cluster where there are x86 nodes and ARM
       nodes, for example.
     </td>
    </tr>
    <tr>
     <td><tt>"kubernetes.io/os"</tt></td>
     <td><tt>Node</tt></td>
     <td>The kubelet sets this with <tt>runtime.GOARCH</tt> as defined by GoLang.
       The main use case is for a hybrid cluster where there areanodes running
       different operating systems (e.g. Linux and Windows). 
     </td>
    </tr>
    <tr>
     <td><tt>"kubernetes.io/hostname"</tt></td>
     <td><tt>Node</tt></td>
     <td>The label value is set by the kubelet when initializing a Node object.
       The main use cases include Pod anti-affinity and Pod topology spread.
     </td>
    </tr>
    <tr>
     <td><tt>"topology.kubernetes.io/zone"</tt></td>
     <td><tt>Node</tt>, <tt>PersistentVolume</tt></td>
     <td>The label value on a Node is reported by the cloud provider.
       The label value on a PersistentVolume is set by the PV provisioner.
     </td>
    </tr>
    <tr>
     <td><tt>"topology.kubernetes.io/region"</tt></td>
     <td><tt>Node</tt>, <tt>PersistentVolume</tt></td>
     <td>The label value on a Node is reported by the cloud provider.
       The label value on a PersistentVolume is set by the PV provisioner.
     </td>
    </tr>
    <tr>
     <td><tt>"failure-domain.beta.kubernetes.io/zone"</tt></td>
     <td><tt>Node</tt>, <tt>PersistentVolume</tt></td>
     <td>The label value on a Node is reported by the cloud provider.
       The label value on a PersistentVolume is set by the PV provisioner.
       Deprecated since 1.17 in favor of <code>"topology.kubernetes.io/zone"</code>.
     </td>
    </tr>
    <tr>
     <td><tt>"failure-domain.beta.kubernetes.io/region"</tt></td>
     <td><tt>Node</tt>, <tt>PersistentVolume</tt></td>
     <td>The label value on a Node is reported by the cloud provider.
       The label value on a PersistentVolume is set by the PV provisioner.
       Deprecated since 1.17 in favor of <code>"topology.kubernetes.io/region"</code>.
     </td>
    </tr>
    <tr>
     <td><tt>"beta.kubernetes.io/instance-type"</tt></td>
     <td><tt>Node</tt></td>
     <td>The instance type as reported by the cloud provider.
     </td>
    </tr>
    <tr>
     <td><tt>"node.kubernetes.io/instance-type"</tt></td>
     <td><tt>Node</tt></td>
     <td>The instance type as reported by the cloud provider.
     </td>
    </tr>
    <tr>
     <td><tt>"node.kubernetes.io/windows-build"</tt></td>
     <td><tt>Node</tt></td>
     <td>Used on Windows nodes to indicate the Windows build number.
       The number is in the format <code>"<major>.<minor>.<build>"</code>
       format. For example, <code>"10.0.17763"</code>. This label is
       available since v1.17.0.
     </td>
    </tr>
    <tr>
     <td><tt>"service.kubernetes.io/headless"</tt></td>
     <td><tt>Endpoints</tt></td>
     <td>This label is added by a controller to an Endpoints to denote if its
       parent Service is *headless*. The kube-proxy and some controllers can
       check this label to determine if the Endpoints objects should be
       replicated when using headless Services.
     </td>
    </tr>
  </tbody>
</table>

