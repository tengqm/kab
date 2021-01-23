## API Versions

In Kubernetes, versioning is done at the API group level rather than at the
resource or field level to ensure that the API presents a clear, consistent
view of system resources and behavior, and to enable controlling access to
end-of-life and/or experimental APIs.

The JSON and Protobuf serialization schemas follow the same guidelines for
schema changes. The following descriptions cover both formats.

The API versioning and software versioning are indirectly related. The
<a href="https://github.com/kubernetes/community/blob/master/contributors/design-proposals/architecture/identifiers.md"
target="_blank">API and release versioning proposal
<i class='fa fa-external-link-alt'></a>
describes the relationship between API versioning and software versioning.

Different API versions indicate different levels of stability and support. You
can find more information about the criteria for each level in the
API Changes documentation.

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

