## HTTP Status

The server will respond with HTTP status codes that match the HTTP spec.

#### Success Codes

<table class="table table-borderless mx-2">
 <tr>
  <td><samp>200 StatusOK</samp><br/>
   <p class="pl-2">Indicates that the request completed successfully.</p> 
  </td>
 </tr>
 <tr>
  <td><samp>201 StatusCreated</samp></br>
   <p class="pl-2">Indicates that the request to create kind completed successfully.</p>
  </td>
 </tr>
 <tr>
  <td><samp>204 StatusNoContent</samp><br/>
    <ul class="m-2">
      <li>Indicates that the request completed successfully, and the response contains no body.</li>
      <li>Returned in response to HTTP OPTIONS requests.</li>
    </ul>
  </td>
 </tr>
</table>

#### Error Codes

<table class="table table-borderless mx-2">
 <tr>
  <td><samp>307 StatusTemporaryRedirect</samp><br/>
   <div class="m-2 mb-1">Indicates that the address for the requested resource has changed.</div>
   <div class="m-2 my-1"><small><b>Suggested Action</b></small>
     <div class="ml-2">Follow the redirect.</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>400 StatusBadRequest</samp><br/>
   <div class="m-2 mb-1">Indicates the requested is invalid.</div>
   <div class="m-2 my-1"><small><b>Suggested Action</b></small>
     <div class="ml-2">Do not retry. Fix the request.</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>401 StatusUnauthorized</samp><br/>
   <div class="m-2 mb-1">Indicates that the server can be reached and understood the request, but refuses to take any further action, because the client must provide authorization. If the client has provided authorization, the server is indicating the provided authorization is unsuitable or invalid.</div>
   <div class="m-2 my-1"><small><b>Suggested Action</b></small>
     <div class="ml-2">If the user has not supplied authorization information, prompt them for the appropriate credentials. If the user has supplied authorization information, inform them their credentials were rejected and optionally prompt them again.</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>403 StatusForbidden</samp><br/>
   <div class="m-2 mb-1">Indicates that the server can be reached and understood the request, but refuses to take any further action, because it is configured to deny access for some reason to the requested resource by the client.</div>
   <div class="m-2 my-1"><small><b>Suggested Action</b></small>
     <div class="ml-2">Do not retry. Fix the request.</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>404 StatusNotFound</samp><br/>
   <div class="m-2 mb-1">Indicates that the requested resource does not exist.</div>
   <div class="m-2 my-1"><small><b>Suggested Action</b></small>
     <div class="ml-2">Do not retry. Fix the request.</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>405 StatusMethodNotAllowed</samp><br/>
   <div class="m-2 mb-1">Indicates that the action the client attempted to perform on the resource was not supported by the code.</div>
   <div class="m-2 my-1"><small><b>Suggested Action</b></small>
     <div class="ml-2">Do not retry. Fix the request.</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>409 StatusConflict</samp><br/>
   <div class="m-2 mb-1">Indicates that either the resource the client attempted to create already exists or the requested update operation cannot be completed due to a conflict.</div>
   <div class="m-2 my-1"><small><b>Suggested Action</b></small>
     <div class="ml-2">
      <ul>
        <li><b>If creating a new resource:</b>
          Either change the identifier and try again, or GET and compare the fields in the pre-existing object and issue a PUT/update to modify the existing object.</li>
        <li><b>If updating an existing resource:</b>
          <ul>
           <li>See Conflict from the status response on how to retrieve more information about the nature of the conflict.</li>
           <li>GET and compare the fields in the pre-existing object, merge changes (if still valid according to preconditions), and retry with the updated request (including <code>resourceVersion</code>).</li>
          </ul>
      </ul>
     </div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>410 StatusGone</samp><br/>
   <div class="m-2 mb-1">Indicates that the item is no longer available at the server and no forwarding address is known.</div>
   <div class="m-2 my-1"><small><b>Suggested Action</b></small>
     <div class="ml-2">Do not retry. Fix the request.</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>422 StatusUnprocessableEntity</samp><br/>
   <div class="m-2 mb-1">Indicates that the requested create or update operation cannot be completed due to invalid data provided as part of the request.</div>
   <div class="m-2 my-1"><small><b>Suggested Action</b></small>
     <div class="ml-2">Do not retry. Fix the request.</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>429 StatusTooManyRequests</samp><br/>
   <div class="m-2 mb-1">Indicates that the either the client rate limit has been exceeded or the server has received more requests then it can process.</div>
   <div class="m-2 my-1"><small><b>Suggested Action</b></small>
     <div class="ml-2">Read the <code>Retry-After</code> HTTP header from the response, and wait at least that long before retrying.</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>500 StatusInternalServerError</samp><br/>
   <div class="m-2 mb-1">Indicates that the server can be reached and understood the request, but either an unexpected internal error occurred and the outcome of the call is unknown, or the server cannot complete the action in a reasonable time (this may be due to temporary server load or a transient communication issue with another server).</div>
   <div class="m-2 my-1"><small><b>Suggested Action</b></small>
     <div class="ml-2">Retry with exponential backoff.</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>503 StatusServiceUnavailable</samp><br/>
   <div class="m-2 mb-1">Indicates that required service is unavailable.</div>
   <div class="m-2 my-1"><small><b>Suggested Action</b></small>
     <div class="ml-2">Retry with exponential backoff.</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>504 StatusServerTimeout</samp><br/>
   <div class="m-2 mb-1">Indicates that the request could not be completed within the given time. Clients can get this response ONLY when they specified a timeout param in the request.</div>
   <div class="m-2 my-1"><small><b>Suggested Action</b></small>
     <div class="ml-2">Increase the value of the timeout param and retry with exponential backoff.</div>
   </div>
   </td>
 </tr>
</table>

