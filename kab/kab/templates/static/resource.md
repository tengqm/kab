## Resource

Most API resources are objects.  A small number of types of resources are
"virtual" concepts. They represent operations rather than objects, such as a
permission check.  All objects have a unique name to allow idempotent
creation, but virtual resources may not have unique names if they are not
retrievable or do not rely on idempotency.

API resources are distinguished by their API group, resource kind, namespace
(for namespaced resources), and name. The API server may serve the same
underlying data through multiple API versions and handle the conversion
between API versions transparently. All these different versions are actually
representations of the same resource.

For example, suppose there are two versions `v1` and `v1beta1` for the same
resource. An object created by the `v1beta1` version can then be read,
updated, and deleted by either the `v1beta1` or the `v1` versions.

### Resource Scope

All resource types are either scoped by the cluster or to a namespace.
A namespace-scoped resource type will be deleted when its namespace is deleted
and access to that resource type is controlled by authorization checks on the
namespace scope.

### Resource Types

A *resource type* is the name used in the API path, e.g. `pods`,
`namespaces`. All resource types have a concrete schema which is
called a *kind*.

A list of instances of a resource type is known as a *collection*.
A single instance of the resource type is called a *resource*.

### Sub-Resources

Some resource types will have one or more *sub-resources*, represented as sub
paths below the resource.
