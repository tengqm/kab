## Request Verbs

### Request Types

There are in general two types of API requests:

- **Non-resource requests** Requests to endpoints other than `"/api/v1/..."` or
  `"/apis/<group>/<version>/..."` are considered *non-resource requests*, and
  use the lower-cased HTTP method of the request as the verb. For example, a
  `GET` request to endpoints like `"/api"` or `"/healthz"` would use **get** as
  the verb.
- **Resource requests** To determine the request verb for a resource API endpoint,
  review the HTTP verb used and whether or not the request acts on an
  individual resource or a collection of resources:

### Standard Resource Verbs

Almost all object resource types support the standard HTTP verbs - `GET`,
`POST`, `PUT`, `PATCH`, and `DELETE`.

<div class="table-responsive-sm">
<table class="table table-striped">
  <thead>
    <tr><th>HTTP verb</th><th>API request verb</th><th>Note</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><tt>POST &lt;resources&gt;</tt></td>
      <td><B>create</B></td>
      <td>Create a resource</td>
    </tr>
    <tr>
      <td><tt>GET &lt;resource&gt;/&lt;name&gt;</tt></td>
      <td><B>get</B></td>
      <td>Retrieve individual resources, also referred to as <B>read</B>.</td>
    </tr>
    <tr>
      <td><tt>GET &lt;resources&gt;</tt></td>
      <td><B>list</B></td>
      <td>List all resources including full object content</td>
    </tr>
    <tr>
      <td><tt>GET &lt;resources&gt;/?watch=true</tt></td>
      <td><B>watch</B></td>
      <td>Watch individual resources or collections.</td>
    </tr>
    <tr>
      <td><tt>PUT</tt></td>
      <td><B>update</B></td>
      <td>Update a resource, also referred to as <B>replace</B>.
          The whole object must be specified. If a field is omitted, it is
          assumed that the client wants to clear that field's value. In other
          words, the PUT verb does *NOT* accept partial updates. Modification
          of just part of an object may be achieved by GETing the resource,
          modifying part of the <code>spec</code>,
          <code>metadata.labels</code>, <code>metadata.annotations</code> and
          then PUTing it back. Some objects may expose alternative resource
          representations that allow mutation of the <code>status</code>, or
          performing custom actions on the object.
      </td>
    </tr>
    <tr>
      <td><tt>PATCH</tt></td>
      <td><B>patch</B></td>
      <td>Partially update a resource.</td>
    </tr>
    <tr>
      <td><tt>DELETE &lt;resource&gt;</tt></td>
      <td><B>delete</B></td>
      <td>Delete an individual resource</td>
    </tr>
    <tr>
      <td><tt>DELETE &lt;collection&gt;</tt></td>
      <td><B>deletecollection</B></td>
      <td>Delete a collection of resources</td>
    </tr>
  </tbody>
</table>
</div>

### Specialized Resource Verbs 

Kubernetes sometimes uses specialized verbs during authorization for
checking additional permissions. These verbs are not directly associated
with any HTTP verbs. For example:

<div class="table-responsive-sm">
<table class="table table-striped">
  <thead>
    <tr><th>Resource</th><th>API request verb</th><th>Note</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><tt>podsecuritypolicies</tt></td>
      <td><B>use</B></td>
      <td>Reference a PodSecurityPolicy from a Role or a ClusterRole</td>
    </tr>
    <tr>
      <td><tt>roles</tt> or <tt>clusterroles</tt></td>
      <td><B>bind</B></td>
      <td>Reference a Role or a ClusterRole from a RoleBinding or a ClusterRoleBinding.</td>
    </tr> 
    <tr>
      <td><tt>roles</tt> or <tt>clusterroles</tt></td>
      <td><B>escalate</B></td>
      <td>The operation of creating or updating a Role (or a ClusterRole)
         if the requester doesn't have all the permissions included in the Role
         (or ClusterRole) is called an "escalate" operation. This verb is defined
         solely for permission checking by the RBAC authorizer.
      </td>
    </tr> 
    <tr>
      <td><tt>users</tt>, <tt>groups</tt>, <tt>serviceaccounts</tt> or
        <tt>userextras</tt>
      </td>
      <td><B>impersonate</B></td>
      <td>Used by the authenticator to check if the requesting user can perform
        operation on behalf of the specified subjects which can be `users`, `groups`
        or `serviceaccounts` in the core API group or the `userextras` in the
        `authentication.k8s.io` API group.
      </td>
    </tr> 
  </tbody>
</table>
</div>

### Verbs for Sub-Resources

The verbs defined for subresources differ depending on the object.

<div class="table-responsive-sm">
<table class="table table-striped">
  <thead>
    <tr>
      <th>Resource Type</th>
      <th>Sub-resource</th>
      <th>Request verb</th>
      <th>Note</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><tt>Pod</tt></td>
      <td><tt>attach</tt></td>
      <td><B>attach</B></td>
      <td>A long-running request for attaching to a specific container in the
        specified Pod.
      </td>
    </tr>
    <tr>
      <td><tt>Pod</tt></td>
      <td><tt>exec</tt></td>
      <td><B>exec</B></td>
      <td>A long-running request for attaching to a specific container in the
        specified Pod. HTTP verbs can be <tt>GET</tt> or <tt>POST</tt>.
      </td>
    </tr>
    <tr>
      <td><tt>Pod</tt></td>
      <td><tt>log</tt></td>
      <td><B>log</B></td>
      <td>A long-running request for reading the log from a container
        in the specified Pod. The HTTP verb can only be <tt>GET</tt>.
      </td>
    </tr>
    <tr>
      <td><tt>Pod</tt></td>
      <td><tt>proxy</tt></td>
      <td><B>proxy</B></td>
      <td>Send a HTTP command to the proxy of a Pod. Optionally, a path can be
        specified for the HTTP command.
        The HTTP verb can be one of <tt>GET</tt>, <tt>POST</tt>, <tt>DELETE</tt>,
        <tt>HEAD</tt>, <tt>OPTIONS</tt>, <tt>PATCH</tt>, or <tt>PUT</tt>.
      </td>
    </tr>
    <tr>
      <td><tt>Pod</tt></td>
      <td><tt>portforward</tt></td>
      <td><B>portforward</B></td>
      <td>Create or get ports to forward.
        The HTTP verb can be one of <tt>GET</tt> and <tt>POST</tt>.
      </td>
    </tr>
    <tr>
      <td><tt>Service</tt></td>
      <td><tt>proxy</tt></td>
      <td><B>proxy</B></td>
      <td>Send a HTTP command to the proxy of a Service. Optionally, a path can be
        specified for the HTTP command.
        The HTTP verb can be one of <tt>GET</tt>, <tt>POST</tt>, <tt>DELETE</tt>,
        <tt>HEAD</tt>, <tt>OPTIONS</tt>, <tt>PATCH</tt>, or <tt>PUT</tt>.
      </td>
    </tr>
    <tr>
      <td><tt>Node</tt></td>
      <td><tt>proxy</tt></td>
      <td><B>proxy</B></td>
      <td>Send a HTTP command to the proxy of a Node. Optionally, a path can be
        specified for the HTTP command.
        The HTTP verb can be one of <tt>GET</tt>, <tt>POST</tt>, <tt>DELETE</tt>,
        <tt>HEAD</tt>, <tt>OPTIONS</tt>, <tt>PATCH</tt>, or <tt>PUT</tt>.
      </td>
    </tr>

  </tbody>
</table>
</div>

It is NOT possible to access sub-resources across multiple resources.
Generally a new, "virtual" resource type would be used if that becomes necessary.

A `Node` resource has `proxy`, `metrics`, `spec`, `stats`, `log` subresources.
These subresources are part of the kubelet API.

### Non-Resource Request Verbs

- `logFileHandler`: retrieve a specific log file at the specified path
  (<a href="{% url 'view-operation' API 'logFileHandler' %}"><i class="fa fa-eye"></i></a>)
- `logFileListHandler`: list log files exposed at the API server node
  (<a href="{% url 'view-operation' API 'logFileListHandler' %}"><i class="fa fa-eye"></i></a>)
- `getCoreAPIVersions`: list available versions of the "core" API group
  (<a href="{% url 'view-operation' API 'getCoreAPIVersions' %}"><i class="fa fa-eye"></i></a>)
- `getAPIVersions`: list API groups available on the API server
  (<a href="{% url 'view-operation' API 'getAPIVersions' %}"><i class="fa fa-eye"></i></a>)
- `getCodeVersion`: retrieve version information about the API server
  (<a href="{% url 'view-operation' API 'getCodeVersion' %}"><i class="fa fa-eye"></i></a>)
- `getServiceAccountIssuerOpenIDConfiguration`: get service account issuer OpenID configuration
  (<a href="{% url 'view-operation' API 'getServiceAccountIssuerOpenIDConfiguration' %}"><i class="fa fa-eye"></i></a>)
- `getServiceAccountIssuerOpenIDKeyset`: get service account issuer OpenID
  JSON Web Key Set
  (<a href="{% url 'view-operation' API 'getServiceAccountIssuerOpenIDKeyset' %}"><i class="fa fa-eye"></i></a>)

The following APIs are useful for debugging a cluster:

- `/debug/pprof`: returns the debug profile.
- `/healthz`: returns the overall health status of the API server. You can use the
  `verbose` query string to output all known components and their health status.
- `/healthz/<component>`: returns the health status of the specified component.
  The `<component>` can be discovered using the `verbose` query string on `/healthz`.
  If the component specified is not recognized by the API server, a 404 is returned.
- `/readyz`: an endpoint for checking the readiness of the API server. You can
  use the `verbose` query string to output all known components and their
  readiness status.
- `/readyz/<component>`: returns the readiness of the component specified.
  The `<component>` can be discovered using the `verbose` query string on `/readyz`.
  If the component specified is unknown to the API server, a 404 is returned.
- `/livez`: an endpoint for checking the liveness of the API server.
  You can use the `verbose` query string to instruct a verbose output for all
  known components and their status. You can also use the
  `exclude=<component>` query string to filter out a particular component from
  the output.
- `/livez/<component>`: the `<component>` can be discovered using the
  `verbose` query string on `/livez`. If the component specified is not
  recognized by the API server, a 404 is returned.
