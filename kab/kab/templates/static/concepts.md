## Overview

The Kubernetes API is a resource-based (RESTful) programmatic interface
provided through HTTP.
The REST API is the fundamental fabric of Kubernetes, exposed by the API server.
With the API, you can:

- create, retrieve, update and delete primary resources via the standard HTTP
  verbs (`POST`, `PUT`, `PATCH`, `DELETE`, `GET`).
- operate the additional subresources for objects that support them.
- instruct the API server to return responses in specific format for
  convenience or efficiency. 
- watch the changes on certain resources to get notifications.
- retrieve a consistent list of resources to allow other components to
  effectively cache and sync the resource states.

## Objects

Kubernetes objects are persistent entities that represent a concrete
instance of a concept in the cluster. Collectively, these objects form the
state of your cluster. 
Each object is a *record of intent*. Once an object is created, the system
constantly works to ensure that object exists.

Most Kubernetes objects have following fields that govern the object's
configuration:

- `apiVersion`: the [API group and version](#api-groups-and-versioning) used
  for creating or updating the object.
- `kind`: the kind of the object you want to operate on.
- `metadata`: the data that helps uniquely identify an object, for example, a
  `name` string, a `UID` and the `namespace` the object resides in.
- `spec`: the *desired state*, i.e. properties you want the object to have.
- `status`: the *current state* of the object, as supplied and updated by the system.

## API Groups and Versioning

Kubernetes supports multiple API versions, each at a different API path, such
as `/api/v1` or `/apis/rbac.authorization.k8s.io/v1alpha1`.

### API Groups

API groups make it easier to extend the Kubernetes API. The API group is
specified in a REST path and in the `apiVersion` field of a serialized object.

There are several API groups in Kubernetes:

- The `core` (also called `legacy`) group is found at REST path `/api/v1`. The
  `core` group is not specified as part of the `apiVersion` field, for
  example, `apiVersion: v1`.

- The named groups are at REST path `/apis/$GROUP_NAME/$VERSION` and use
  `apiVersion: $GROUP_NAME/$VERSION` (for example, `apiVersion: batch/v1`).

** TODO: List of API Groups **

#### Enabling/Disabling API Groups

Certain resources and API groups are enabled by default. You can enable or
disable them by setting `--runtime-config` on the API server.  The
`--runtime-config` flag accepts comma separated `<key>[=<value>]` pairs
describing the runtime configuration of the API server. If the `=<value>` part
is omitted, it is treated as if `=true` is specified.  For example:

- to disable `batch/v1`, set `--runtime-config=batch/v1=false`;
- to enable `batch/v2alpha1`, set `--runtime-config=batch/v2alpha1`

Note: When you enable or disable groups or resources, you need to restart the
API server and controller manager to pick up the `--runtime-config` changes.

### API Resources

#### Resource Scope

All resource types are either scoped by the cluster or to a namespace.
A namespace-scoped resource type will be deleted when its namespace is deleted
and access to that resource type is controlled by authorization checks on the
namespace scope.

#### Resource Type versus Resource

A *resource type* is the name used in the API path, e.g. `pods`,
`namespaces`. All resource types have a concrete schema which is
called a *kind*.

A list of instances of a resource type is known as a *collection*.
A single instance of the resource type is called a *resource*.

#### Resources versus Objects

Most API resources are [objects](#objects).  A small number of types of
resources are "virtual" concepts. They represent operations rather than
objects, such as a permission check.  All objects have a unique name to allow
idempotent creation, but virtual resources may not have unique names if they
are not retrievable or do not rely on idempotency.

API resources are distinguished by their API group, resource kind, namespace
(for namespaced resources), and name. The API server may serve the same
underlying data through multiple API versions and handle the conversion
between API versions transparently. All these different versions are actually
representations of the same resource.

For example, suppose there are two versions `v1` and `v1beta1` for the same
resource. An object created by the `v1beta1` version can then be read,
updated, and deleted by either the `v1beta1` or the `v1` versions.

#### Sub-Resources

Some resource types will have one or more *sub-resources*, represented as sub
paths below the resource.

#### Resource Version

Every Kubernetes object has a resourceVersion field representing the
version of that resource as stored in the underlying database.

For a collection of resources (either namespaced or cluster scoped) returned
from the API server, the response contains a `resourceVersion` value that can
be used to initiate a `watch` against the server.

### API Versions

Versioning is done at the API group level rather than at the resource or field
level to ensure that the API presents a clear, consistent view of system
resources and behavior, and to enable controlling access to end-of-life and/or
experimental APIs.

The JSON and Protobuf serialization schemas follow the same guidelines for
schema changes. The following descriptions cover both formats.

The API versioning and software versioning are indirectly related. The
[API and release versioning proposal](https://git.k8s.io/community/contributors/design-proposals/release/versioning.md)
describes the relationship between API versioning and software versioning.

Different API versions indicate different levels of stability and support. You
can find more information about the criteria for each level in the
[API Changes][changes] documentation.

Here's a summary of each level:

*Alpha*:

  * The version names contain alpha (for example, `v1alpha1`).
  * The software may contain bugs. Enabling a feature may expose bugs. A
    feature may be disabled by default.
  * The support for a feature may be dropped at any time without notice.
  * The API may change in incompatible ways in a later software release
    without notice.
  * The software is recommended for use only in short-lived testing clusters,
    due to increased risk of bugs and lack of long-term support.

*Beta*:

  * The version names contain `beta` (for example, `v2beta3`).
  * The software is well tested. Enabling a feature is considered safe.
    Features are enabled by default.
  * The support for a feature will not be dropped, though the details may
    change.
  * The schema and/or semantics of objects may change in incompatible ways in
    a subsequent beta or stable release. When this happens, migration
    instructions are provided. Schema changes may require deleting, editing,
    and re-creating API objects. The editing process may not be straightforward.
    The migration may require downtime for applications that rely on the feature.
  * The feature is not recommended for production uses. Subsequent releases
    may introduce incompatible changes. If you have multiple clusters which
    can be upgraded independently, you may be able to relax this restriction.

*Stable/GA*:

  * The version name is `vX` where `X` is an integer.
  * The stable versions of features appear in released software for many
    subsequent versions.

## The OpenAPI Specification

The official API specification is generated in the
[OpenAPI V2](https://www.openapis.org/) format from the Go source code.

