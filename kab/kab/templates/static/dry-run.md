## Dry Run

The modifying verbs (`POST`, `PUT`, `PATCH, and `DELETE`) can accept requests
in a dry run mode. Dry run mode helps to evaluate a request through the
typical request stages (admission chain, validation, merge conflicts) up until
persisting objects to storage. The response body for the request is as close
as possible to a non-dry-run response. The system guarantees that dry-run
requests will not be persisted in storage or have any other side effects.

### Make a dry-run request

Dry-run is triggered by setting the `dryRun` query parameter. This parameter is
a string. The valid value is either `"All"` or `""`.

When `dryRun` is set to `"All"`, every stage runs as normal, except for the
final storage stage. Admission controllers are run to check that the request
is valid, mutating controllers mutate the request, merge is performed on
`PATCH`, fields are defaulted, and schema validation occurs. The changes are
not persisted to the underlying storage, but the final object which would have
been persisted is still returned to the user, along with the normal status
code.

If the request would trigger an admission controller which would have side
effects, the request will fail rather than risk an unwanted side effect.
All built-in admission control plugins support dry-run.

Additionally, admission webhooks can declare in their configuration object
that they do not have side effects by setting the `sideEffects` field to
`"None"`. If a webhook actually does have side effects, then the `sideEffects`
field should be set to `"NoneOnDryRun"`, and the webhook should also be
modified to understand the `dryRun` field in `AdmissionReview`, and prevent
side effects on dry-run requests.

The default value is empty string which means keeping the default modifying
behavior.

For example:

```
:::html
POST /api/v1/namespaces/test/pods?dryRun=All
Content-Type: application/json
Accept: application/json
```

The response would look the same as for non-dry-run request, but the values of
some generated fields may differ.

### Dry-run Authorization

Authorization for dry-run and non-dry-run requests is identical. Thus, to make
a dry-run request, the user must be authorized to make the non-dry-run
request.

For example, to run a dry-run `PATCH` for Deployments, you must have the `PATCH`
permission for `deployments`, as in the example of the RBAC rule below.

```
:::yaml
rules:
- apiGroups: ["extensions", "apps"]
  resources: ["deployments"]
  verbs: ["patch"]
```

Some values of an object are typically generated before the object is
persisted. It is important not to rely upon the values of these fields set by
a dry-run request, since these values will likely be different in dry-run mode
from when the real request is made.
