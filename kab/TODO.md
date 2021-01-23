TODO list

[ ] List of API groups
[ ] Popup field info on definition comparison screen
[ ] Search prototype for definitions, operations
[ ] Generate sample resource with checkboxed treeview
[ ] Filter operations based on resource variants
[ ] Refactor helpers code into classes
[ ] Add badge to deprecated API groups
[ ] When compare operations, add links to removed or added parameters?
[ ] When compare definitions, add links for the added/removed fields.
[ ] Cross verify the parameters allowed for DELETE, LIST, CREATE, PUT, GET operations
[ ] Fix all 'oneOf', 'allOf' definitions
[ ] Fix API response based on apimachinery.pkg.apis.meta.v1.Status
[ ] Rescan all cross version diffs for data.
[ ] Use `meta.k8s.io` as the group name for meta API objects.
    E.g. ListOptions, DeleteOptions, List, Status, WatchEvent, Scale
[ ] Document field selector. It is specified as a string for the list
    operation.
[x] Document the kubernetes extensions:
  * x-kubernetes-list-type: map | atomic | set
  * x-kubernetes-map-type: ganualar | atomic
  * x-kubernetes-list-map-keys: [<string>]
  * x-kubernetes-group-version-kind: [{"group": <group>, "version": <version>, "kind": <kind>}, ...] 
  * x-kubernetes-patch-merge-key: <string>
  * x-kubernetes-patch-strategy: merge | retainKeys | merge,retainKeys
  * x-kubernetes-preserve-unknown-fields: true | false 
  * x-kubernetes-int-or-string:
  * x-kubernetes-embedded-resource:
  * x-kubernetes-unions: {"discriminator": <discriminator>, "fields-to-discriminateBy": {<field>: <discriminator>, }}
[x] Document patch operations
[x] Develop Dockerfile for packaging and release
[x] Document `application/apply-patch+yaml` content type.
[x] More general comparison of group-versions.
[x] Debug the extra resource named "Info"
[x] Add back ignored definitions/operations in 1.13
[x] Add back ignored definitions/operations in 1.14
[x] Add back ignored definitions/operations in 1.15
[x] Add back ignored definitions/operations in 1.16
[x] Add back ignored definitions/operations in 1.17
[x] Add back ignored definitions/operations in 1.18
[x] Add badge to deprecated API resources
[x] Comparison of operations between two versions
[x] Related operations for a given operation

