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
      <td>Update a resource, also referred to as <B>replace</B>.</td>
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

**TODO**: Node has `proxy`, `metrics`, `spec`, `stats`, `log` subresources.
These subresources are part of the kubelet API.

### Non-Resource Request Verbs

- `logFileHandler`  
- `logFileListHandler`  
- `getCoreAPIVersions` 
- `getAPIVersions` 
- `getCodeVersion` 
- `getServiceAccountIssuerOpenIDConfiguration`
- `getServiceAccountIssuerOpenIDKeyset`

The following API is not documented:

- `/debug/pprof` returns the debug profile.
- `/readyz` 
- `/livez`
- `/livez/<component>`: https://kubernetes.io/docs/reference/using-api/health-checks/#individual-health-checks

https://kubernetes.io/docs/reference/using-api/health-checks/#api-endpoints-for-health


