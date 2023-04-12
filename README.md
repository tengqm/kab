# Kubernetes API Browser (KAB)

## 0. Introduction to the KAB tool

The Kubernetes API is a huge collection of endpoints that serve different
resource types. All users interact with the API server in various ways.
However, the current API specification and its documentation has some
limitations that are difficult to overcome.

1. The API specification is generated from the comments in the Go source
   code which may be imprecise and limited in their capability to leverage
   the OpenAPI constructs.
1. The API specification generator relys on a limited set of directives in
   the Go source comments for parsing, so there is not much room for the tool
   to close the gap.
1. There is no suitable browser for the Kubernetes OpenAPI specification.

The Kubernetes API Browser (KAB) tool is designed to resolve the above
problems by providing an interactive browser backed by manually optimized
specification contents.

The usage of this tool is simple:

```
docker run -p 8000:8000 quay.io/tengqm/kab
```

Then point your browser to 'http://localhost:8000' and start exploring.

## 1. Problems of Generated OpenAPI Specification

The Kubernetes API specification is generated from Go source code comments,
which are primarily targeted at Kubernetes developers instead of its users.
The situation is worsened by the lack of a global guideline to code comments.

While the developer community is to some extent aware of these inaccuracies or
mistakes, it is still impractical to completely avoid such problems.

### 1.1 Comments are for developers

The shared constructs also generates a lot of redundant (and sometimes
meaningless) text in the API spec. For example, the `apiVersion` field for an
API resource is currently documented as the following:

```json
{
  "apiVersion": {
     "description": "APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources",
     "type": "string"
  },
}
```

This document is generated from the shared comment for the `APIVersion` Go
field, but it is not targeted at users. One of the common issues of the API
specification is that the fields of types are often times referenced by their
Go member names (e.g. `APIVersion`) rather than the API field names presented
to user (e.g. `apiVersion`).  When these names are exposed to users, they may
get confused what the document is referring to. 

As for the `description` field, the content is not targeting end users either.
A user won't care how the server converts the schema to internal values and
the pointer to the API convention design document is irrelevant to Kubernetes
users.

In KAB, fields like this are revised on a per-package, per-type basis. For
example, for the definition (resource) `io.k8s.api.storage.v1.CSIDriver`, the
`apiVersion` field is documented as:

```json
{
  "apiVersion": {
    "description": "The version of the schema for the object representation",
    "enum": [
      "storage.k8s.io/v1"
    ],
    "type": "string"
  }
}
```

### 1.2 Markdown comment assumption fails everywhere

There is an implicit assumption that the comments are somehow written in
Markdown syntax for document typesetting. Consequently, the correct generation
of documentation relies on proper usage of Markdown syntax in the comment,
which are difficult to enforce across the community. A missing empty line may
lead to an incorrectly rendered list. For example, the following comment looks
good enough for Go developers until we want to extract the comment as Markdown
text. To make a Markdown parser happy, we have to add an empty line before the
list, or else the rendered output will be unreadable.

```Go
  // addressType specifies the type of address carried by this EndpointSlice.
  // All addresses in this slice must be the same type. This field is
  // immutable after creation. The following address types are currently
  // supported:
  // * IPv4: Represents an IPv4 Address.
  // * IPv6: Represents an IPv6 Address.
  // * FQDN: Represents a Fully Qualified Domain Name.
  AddressType AddressType
```

### 1.3 Limitations 

Generating documentation from source code helps improve the consistency
between the implementation and the documentation, however, for API
specification, the amount of constraints or conditions may eventually prove
that we have to maintain the specification separately rather than "document"
all the details using language extensions.

The API specification generator today relies on many source code level
annotations for documenting the field level constraints. The following are
some examples:

- `+optional`: This used to indicate a field is not mandatory. There are many
  places this annotation is incorrectly used. Considering that we are not
  differentiating definitions used for different requests, such a problem is
  aggravated. What's more, this annotation sometimes conflicts with the
  comment. For example, one cannot tell if the `IQN` field is required or not
  based on the following snippet:

  ```Go
  type ISCSIVolumeSource struct {
    // Required: target iSCSI Qualilfied Name
    // +optional
    IQN string
    ...
  }
  ```

- `+unionDiscriminator`: This is used to mark a field that is used to
  differentiate two different structs.

- `+featureGate=...`: This is used to relate a field to the name of the
  feature gate that signifies the stage for the field/feature.

There are ongoing efforts to add more annotations. There are many constraints
that can be covered only by informal and inconsistent Go comments rather than
any annotations. The following are a few examples:

- The value range of an integer field. This is supported in OpenAPI
  specification using the `minimum` and/or `maximum` attributes, but only
  informally and inconsistently captured in the Go source comments.

  In KAB, such constraints are manually added to the specification based on
  the validation logic. For example:

  ```yaml
  # io.k8s.api.core.v1.PodSpec.CREATE
  properties:
    activeDeadlineSeconds:
      description: "Duration in seconds the Pod may be ..."
      format: int64
      minimum: 1
      type: integer
  ```

- The length of a string field. For string that is required, most of the time
  the semantic is that the string must be provided and it cannot be empty.
  This constraint is supported in OpenAPI specification using the `minLength`
  attribute, but it is can only documented in the Go source comments.

  In KAB, such constraints are manually added to the specification based on
  the validation logic. For example:

  ```yaml
  # io.k8s.api.core.v1.Container
  properties:
    name: "Name of the container. Each container in ..."
    minLength: 1
    type: string
  ```


- The size of an array. For array/list type of fields, there may be constraint
  that the array cannot be empty. Such constraints are not formally captured
  or documented.

  In KAB, this constraint is added based on the validation logic. For example:

  ```yaml
  # io.k8s.api.core.v1.Pod.CREATE
  properties:
    containers:
      description: "List of containers in the Pod. Containers ..."
      items:
        $ref: #/definitions/io.k8s.api.core.v1.Container
      minItems: 1
      type: array
      x-kubernetes-patch-merge-key: name
      x-kubernetes-patch-strategy: merge
  ```

- The default value. Default values are not formally documented although
  supported in OpenAPI specification using the `default` attribute. 

- The stages of fields are not formally documented. For example, an Alpha
  field maybe documented as "ALPHA", "Alpha" or "alpha" in the comments.
  Deprecated fields or types are not formally documented either. The related
  comment may be "DEPRECATED", "deprecated" or "Deprecated". The only way to
  find out which fields are going away is to grep the whole specification and
  manually parse the comments.

In KAB, the field level constraints are carefully amended based on the builtin
validation logic. OpenAPI keywords are added where appropriate. When there is
no related OpenAPI attribute keyword, the field/type comment is amended to
include these details.


## 2. Problems from the generator

In addition to the problems found in the code comments, there are issues
related to the limitations of the generator.

### 2.1 No differentiation among `CREATE`, `UPDATE` and `GET`

The same resource may have different requirements to its fields. For a `CREATE`
request, some fields are mandatory and other fields are optional. For an
`UPDATE` request, the set of mandatory fields might be different from that of
a `CREATE` request. There are fields that cannot be updated once specified.
For example, you are not supposed to specify the `.status` field when creating
an object, but when you are updating an existing object, you are permitted to
mutate its `.status` field. For another example, you may have to specify the
`.metadata.name` field when creating an object, but you don't have to provide
this field when updating it.

When you are reading an object or a list of objects, you will likely get all
the fields back except for those "write-only" ones. This effectively means
that for a `GET` request, all fields of a given type may be mandatory. 

### 2.2 Comments for embedded structs 

There is no inheritance in the Go language. Nested structs is the preferred
way to capture common attributes among different groups of objects. This
language design presents challenges for documentation generated from the
code comments. For example, the `ObjectMeta` struct shared by many API
resources contains the `Name` field which is presented to users as the
`.metadata.name` field. Different resource types may have different
requirements to their names, but there is only one place to specify the
comment for this field. It is difficult to highlight that, for example, the
name for a `CronJob` object must be less than 53 characters.

### 2.3 Documents are too generic to be useful

Take another look at the `apiVersion` document above, the document correctly
specifies that the type of this field is a `string`, but it fails to indicate
what is the expected value of the string. For almost all API types taht are
documented today, this `apiVersion` field has a fixed value. For example, for
`io.k8s.api.core.v1.ConfigMap`, this has to be "`v1`"; for
`io.k8s.api.storage.v1.CSIDriver`, this has to be "`storage.k8s.io/v1`"; for
`io.k8s.api.rbac.v1.ClusterRole`, this has to be
"`rbac.authorization.k8s.v1`".

In KAB, fields like these are treated as having a constant string value in the
`enum` field. The definition of the `Pod` resource type then begins with the
following snippet:

```
{
  "apiVersion": {
    "description": "The version of the schema for the object representation",
    "enum": [
      "v1"
    ],
    "type": "string"
  },
  "kind": {
    "description": "A string value representing the REST resource",
    "enum": [
      "Pod"
    ],
    "type": "string"
  },
  ...
}
```

### 2.4 Enumeration for fields 

For example, the `imagePullPolicy` of the `v1/Container` type can be one of
"`Always`", "`IfNotPresent`", and "`Never`". The value set is defined as three
standalone string constants in the source code due to lack of `enum`
constructs in the Go language. The consequence is that the API specification
generator cannot safely deduce the safe set of valid values by analyzing the
source code. The best thing it can do is to specify that the `imagePullPolicy`
field is a string. Such an obvious enumeration can documented only as source
code comments. However, the developers still fail to do so in many cases,
because in the source code, everything looks just fine.

In KAB, fields like this are documented explicitly using `enum`s, e.g.

```yaml
  # ...
  imagePullPolicy:
    description: "Image pull policy. Defaults to `Always` if the `:latest` tag is specified."
    enum:
      - Always
      - IfNotPresent
      - Never
    type: string
```

### 2.5 Duplicated operation parameters

Many operations in Kubernetes API share the same collection of parameters.
In the OpenAPI specification, shared parameters can be captured in a dedicated
section (`parameters`). Because the Kubernetes API specification is generated
on a per-package, per-type basis, such global optimization cannot be applied.
Instead, what we get is a huge API specification containing many ducplicated
contents regarding the operation parameters. For example, in the 1.21 release,
there are 502 operations where the `dryRun` parameter is repeatedly
documented as operation level parameters rather than a global parameter that
can be shared and referenced. 

In KAB, such parameters are analyzed and extracted into a dedicated collection
and then referenced from the operations. For example,

```yaml
  operationId: createBatchV1NamespacedJob
  parameters:
    # 'body' is an operation-level parameter
    - name: body
      in: body
      required: true
      schema: "#/definitions/io.k8s.api.batch.v1.Job.CREATE"
    # 'dryRun' is a shared parameter
    - $ref: "#/parameters/dryRun"
    # 'namespace' is a shared parameter
    - $ref: "#/parameters/namespace"
    # 'pretty' is a shared parameter
    - $ref: "#/parameters/pretty"
```

## 3. Presenting the API specification

There are some existing documentation and tools for users to browse through
the huge collection of API groups, resources and operation definitions.

- The "k8s.io/website" has been serving the API documentation using a huge
  HTML generated from the OpenAPI specification. With all contents rendered in
  a single page, user experience is not so good.

- There is an effort to break the huge page into several groups, each of which
  generated as a Markdown text file and then rendered using the Hugo website
  framework. This effor only improves the site consistency with respect to its
  look and feel, in addition to reduced time to load the pages.

- Other OpenAPI browsers are available too. But most of those tools are
  organizing the API specification firstly by the HTTP verbs and paths.
  To Kubernetes users, the resource types (data models) are equally important
  or even more important than the operation definitions.

The KAB tool provides several features to ease the navigation of the k8s API:

- It provides a micro-service packaged into a single, self-contained docker
  image ready to run on either a server box or on a local machine.
- It provides easy navigation of all resources, definitions, operations,
  and the links among them.
- It simplifies the navigation of resources, definitions, operations across
  API versions and group versions.
- With one mouse click, you can perform comparisons between different API
  versions, group versions.
- You can inspect the change history of all resources, definitions or
  operations.
- Using the builtin YAML editor with in-place suggestions, you can easily
  compose a resource definition and then download/export it into a YAML or
  JSON for to use.

In addition to the content derived from the Kubernetes OpenAPI specification,
the KAB tool also provides documentation closely related to using the API,
such as the various methods partially updating an existing object, the HTTP
headers, the common labels, the pagination mechanism etc.

Any suggestions on feature improvments are always welcomed.
 
## 4. About future direction

Besides the limitations outlined above, the current practice of generating
Kubernetes API specification from source code may become a huge burden to
carry on for the whole community. Below are some of my thoughts about the
future development and maintenance of the API specification.

- Revising comments for documentation fixes is never the first priority for
  the developer community although we all appreciate the "API first" nature
  of a micro-service platform. There are always more urgent issues to fix,
  more compelling features to land. Pull requests (PRs) that tweak the
  documentation usually takes months to years to get reviewed and merged.

- The many details of the API definition cannot be captured in the source code
  comment in a structured manner. We will have to rely on the validation logic
  to perform error checking.

- The developers have to be cautious about code comments. For example, they
  are not supposed to freely add some to-do items as comments because such
  comments may get captured into the user-facing documentation.

- Making the source code the single source of truth had enabled the community
  to land features quickly without severely degrade the quality of
  documentation. However, as the Kubernetes core becomes more and more stable,
  we may need to rethink the relationship between API specification and the
  feature implementation.

Hopefully, this KAB tool can help raise the awareness and concerns and trigger
further discussions on improving the Kubernetes API documentation.

## 5. Technology Stack

- Python 3.6x, 3.7x (3.7.3 is used in development)
- Django 3.x (3.1.5 used in development)
- Bootstrap 4.3.x (4.3.1 is used in development)
