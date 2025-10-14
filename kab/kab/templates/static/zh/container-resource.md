## About Resources

A resource name must be no more than 63 characters, consisting of alphanumeric
characters, `'-'`, `'-'` and `'.'` characters allowed anywhere except for the
first and the last character.

There are two kinds of resource names in Kubernetes:

- standard resource name: one of the following strings one prefixed with
  `"hugepages-"` or `"requests.hugepages-"`.
- fully qualified resource name: is a name constructed from a DNS-style subdomain
  name followed by a slash (`'/'`) and a resource name.

A standard resource name is one of the following:

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

### Standard Container Resource Names

When specifying resource requests or resource limits for a container, the
resource name must be one of:

- a *standard container resource name*
- a *non-native resource* for extended resources

A *standard container resource name* here means one of:

- builtin container resource names: `"cpu"`, `"memory"` or `"ephemeral-storage"`
- a hugepage resource, i.e. a string prefixed with `"hugepages-"`.

A *native resource* is a resource in the `"kubernetes.io/"` namespace.
Partially-qualified names (names without `'/'`) are implicitly in the
`"kubernetes.io/"` namespace.

An *extended resource name* is a name that meets the following requirements:

- not in the `"kubernetes.io/"` namespace;
- not prefixed with `"requests."`;
- when prefixed with `"requests."`, it can form a qualified name.

