## HTTP 状态

API 服务器会根据 HTTP 规范返回 HTTP 状态代码。

### 成功代码

<table class="table table-borderless mx-2">
 <tr>
  <td><samp>200 StatusOK</samp><br/>
   <p class="pl-2">表明请求已经被成功处理。</p> 
  </td>
 </tr>
 <tr>
  <td><samp>201 StatusCreated</samp></br>
   <p class="pl-2">表明创建某类别资源的请求已被成功处理。</p>
  </td>
 </tr>
 <tr>
  <td><samp>204 StatusNoContent</samp><br/>
    <ul class="m-2">
      <li>表明请求已经被成功处理完毕，并且 HTTP 响应中不包含主体数据。</li>
      <li>对于 HTTP OPTIONS 请求而言，总是会返回此状态代码。</li>
    </ul>
  </td>
 </tr>
</table>

### 出错代码

<table class="table table-borderless mx-2">
 <tr>
  <td><samp>307 StatusTemporaryRedirect</samp><br/>
   <div class="m-2 mb-1">表明所请求的资源的地址已经发生变化。</div>
   <div class="m-2 my-1"><small><b>建议处理动作：</b></small>
     <div class="ml-2">跟踪重定向链接再次发起请求。</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>400 StatusBadRequest</samp><br/>
   <div class="m-2 mb-1">表明请求本身是非法的。</div>
   <div class="m-2 my-1"><small><b>建议处理动作：</b></small>
     <div class="ml-2">在修改请求之前，不要再次尝试提交请求。</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>401 StatusUnauthorized</samp><br/>
   <div class="m-2 mb-1">表明服务器可达并且服务器理解客户端的请求意图，
     但是因为客户端未提供身份认证凭据来表明有权执行所请求的操作，
     服务器拒绝采取进一步处理动作。</div>
   <div class="m-2 my-1"><small><b>建议处理动作：</b></small>
     <div class="ml-2">如果用户没有提供身份认证凭据，
       则应该修改请求，提供必要的身份认证信息。
       如果用户提供的身份认证信息，则需要提醒用户其所提供的凭据信息被拒绝。
      </div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>403 StatusForbidden</samp><br/>
   <div class="m-2 mb-1">表明服务器可达并且能够理解客户端的请求意图，
     但是根据服务器端的配置发现，客户端无权针对目标资源执行所请求的操作，
     因此服务器没有继续处理请求。</div>
   <div class="m-2 my-1"><small><b>建议处理动作：</b></small>
     <div class="ml-2">在修改请求之前不要再次重试。</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>404 StatusNotFound</samp><br/>
   <div class="m-2 mb-1">表明所请求的资源已不存在。</div>
   <div class="m-2 my-1"><small><b>建议处理动作：</b></small>
     <div class="ml-2">在修改请求之前不要再次重试。</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>405 StatusMethodNotAllowed</samp><br/>
   <div class="m-2 mb-1">表明客户端针对资源所尝试执行的操作是服务器所无法理解的。</div>
   <div class="m-2 my-1"><small><b>建议处理动作：</b></small>
     <div class="ml-2">在修改请求之前不要再次重试。</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>409 StatusConflict</samp><br/>
   <div class="m-2 mb-1">表明要么客户端所尝试创建的资源已经存在，
     要么客户端所请求的变更操作因为出现冲突而无法完成。</div>
   <div class="m-2 my-1"><small><b>建议处理动作：</b></small>
     <div class="ml-2">
      <ul>
        <li><b>如果是在创建新的资源：</b>
          要么更改资源的标识符并重试，要么先执行 GET 操作，
          比较之前已经存在对象的字段后，通过 PUT 操作来请求变更现有对象。</li>
        <li><b>如果是在更新现有的资源：</b>
          <ul>
           <li>参考状态响应中的 Conflict 信息，了解如何读取与冲突原因相关的信息。</li>
           <li>执行 GET 操作读取对象，比较现有对象的各个字段，
             之后根据预设条件决定是否要执行变更的合并，
             最后使用变更后的请求执行重试操作（注意保留 <code>resourceVersion</code>参数）。</li>
          </ul>
      </ul>
     </div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>410 StatusGone</samp><br/>
   <div class="m-2 mb-1">表明所请求的资源对象在服务器上已经不在存在，
     并且服务器无法提供重定向转发地址。</div>
   <div class="m-2 my-1"><small><b>建议采取动作：</b></small>
     <div class="ml-2">在修改请求之前，不要重试。</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>422 StatusUnprocessableEntity</samp><br/>
   <div class="m-2 mb-1">表明所请求的资源创建或更新操作无法完成，
     原因是请求所携带的数据非法。</div>
   <div class="m-2 my-1"><small><b>建议采取动作：</b></small>
     <div class="ml-2">在修改请求之前不要重试。</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>429 StatusTooManyRequests</samp><br/>
   <div class="m-2 mb-1">表明要么受到客户端的请求速率限制，
     要么服务器端请求过载无法及时处理。</div>
   <div class="m-2 my-1"><small><b>建议采取动作：</b></small>
     <div class="ml-2">参照 HTTP 响应中的 <code>Retry-After</code> 头部信息，
       等待所给的时长之后再次重试。</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>500 StatusInternalServerError</samp><br/>
   <div class="m-2 mb-1">表明服务器可达并且服务器理解请求的意图，
     但是服务器端发生内部错误，无法给出合理的响应；
     或者服务器端无法在合理的时间范围内完成所请求的操作
     （服务器出现脉冲式请求压力或者与另一个服务器之间出现临时性的通信问题）。</div>
   <div class="m-2 my-1"><small><b>建议采取动作：</b></small>
     <div class="ml-2">使用指数型回退机制执行重试操作。</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>503 StatusServiceUnavailable</samp><br/>
   <div class="m-2 mb-1">表明所请求的服务暂时无法提供。</div>
   <div class="m-2 my-1"><small><b>建议执行动作：</b></small>
     <div class="ml-2">使用指数型回退机制执行重试操作。</div>
   </div>
   </td>
 </tr>

 <tr>
  <td><samp>504 StatusServerTimeout</samp><br/>
   <div class="m-2 mb-1">表明请求无法在所指定的时间窗口之内完成。
     只有客户端在请求中设置了 `timeout` 参数时才有可能收到此状态代码。</div>
   <div class="m-2 my-1"><small><b>建议执行动作：</b></small>
     <div class="ml-2">增加 `timeout` 参数所设置的时长，
       基于指数型回退机制发起重试请求。</div>
   </div>
   </td>
 </tr>
</table>

