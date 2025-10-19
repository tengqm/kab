## 扩展

OpenAPI 规范允许厂商对核心规范进行一定程度的扩展。
在 Kubernetes 项目中已经定义并使用的扩展如下：

### `x-kubernetes-embedded-resource`

类型：*boolean*

此属性用来标明字段值是一个嵌入的 Kubernetes `runtime.Object`，
其中会包含 `TypeMeta` 和 `ObjectMeta`s 两个结构。
对应的字段类型一定是 `"object"`。
进一步为嵌入对象施加额外的限制也是可以的。
系统会自动对 `kind`、`apiVersion` 和 `metadata` 字段进行合法性检查。
`x-kubernetes-preserve-unknown-fields` 属性可以为真，
但如果对象是完全规约的（最多包含 `apiVersion`、`kind` 和 `metadata`），也不是必须为真。

### `x-kubernetes-int-or-string`

类型：*boolean*

此属性用来标明字段的取值或者是一个整数，或者是一个字符串。
如果属性值为 `true`，则允许略过 `type` 属性。
同时，如果数据类型符合以下模式之一，`type` 属性的设置可以用 `"anyOf"` 形式设置。

1. `"anyOf": [{"type": "integer"}, {"type": "string"}]`
1. `"allOf": [{"anyOf": [{"type": "integer"}, {"type": "string"} ...]}]`

### `x-kubernetes-list-map-keys`

类型：*string 数组*

此属性用来标注带有 `x-kubernetes-list-type: map` 标注的数组字段，
给出将数组视为映射时使用哪个字段来作为映射鉴检索字段值。
此属性只能用于设置了 `x-kubernetes-list-type` 扩展属性，且扩展属性值为 `"map"`
的数组。
此外，此属性的取值必须是一个字符串列表。对于数组中的每个元素而言，
此列表中的每个字符串必须是其必须设置的属性或者具有默认值的属性。
这一要求背后的原因是要确保列表中每个约束都具有这里所列举的属性。

例如，下面是 `Container` 的 `ports` 属性定义：

```json
{
  "ports": {
      "items": {
        "$ref": "#/definitions/io.k8s.api.core.v1.ContainerPort"
      },
      "type": "array",
      "x-kubernetes-list-map-keys": [
        "containerPort",
        "protocol"
      ],
      "x-kubernetes-list-type": "map",
      "x-kubernetes-patch-merge-key": "containerPort",
      "x-kubernetes-patch-strategy": "merge"
    },
}
```

### `x-kubernetes-list-type`

类型：*string*

此属性用来为数组字段提供额外的拓扑结构描述。
此属性只能用于数组字段，并且其取值只能是下面三种之一：

1. `"atomic"`：所标注的列表要被视为一个整体，也就是一个标量。
   原子性的列表在被更新时会被整体替换掉。
   此扩展属性可以用在任何类型的列表之上（结构列表、标量列表等）。
1. `"set"`：集合是一种不允许包含多个相同值的列表。
   每个元素都必须是一个标量、一个 `x-kubernetes-map-type: atomic` 的对象、
   或者一个 `x-kubernetes-list-type: atomic` 的列表。
1. `"map"`：列表会被视为一个映射，表中元素包含一个非索引的字段来标识元素自身。
   这类列表在被合并时，元素的顺序是被保留的。
   `"map"` 标签只能用在元素类型为 `"object"` 的列表之上。

对于被标注的列表而言，此属性的默认值为 `"atomic"`。

### `x-kubernetes-map-type`

类型：*string*

此扩展属性用来标注一个对象（映射），进一步描述其拓扑构成。
此属性只能用在 `type` 为 `"object"` 的字段之上，并且此属性的合法值有二：

1. `"granular"`：所标注的映射是真实的映射（键值对），
   各个字段之间彼此独立（他们可以被不同的施动者进行操控）。
   对于所有映射而言，这一取值是**默认**行为。
1. `"atomic"`：整个映射会被视为一个整体。
   映射被更新时，会执行整体替换操作。

### `x-kubernetes-preserve-unknown-fields`

类型：*boolean*

设置了此扩展属性时，API 服务器不会去除合法性检查模式中没有规约的字段。
这一属性对字段处理的影响是递归的，只有模式中嵌套的属性显示设置了
`properties` 或者 `additionalProperties` 时才会回退到正常的剪除行为。

此扩展属性的取值可以是 `true`，或者未设置。
属性值为 `false` 时意味着禁止保留未规约（未知）字段。

### `x-kubernetes-unions`

类型：*映射列表*

此扩展属性的设计目的是为映射定义提供 "oneOf" 语义支持。
列表中的每个元素都包含以下字段。

- `discriminator`：如果给出，则其含义为用来区分不同元素的字段名称。
- `fields-to-discriminateBy`：映射值，包含从字段名到 `discriminator` 字段值之间的映射。

例如，下面的属性指定当前对象有一个 `account` 字段，可以用作区分不同的对象。
当 `account` 字段被设置为 `"Group"` 时，必须设置对象的 `group` 字段；
当 `account` 字段被设置为 `"User"` 时，必须设置对象的 `user` 字段。

```json
{
  "properties": {
    "account": {
      "type": "string",
      "minLength": 1
    },
    "user": {
      "type": "object"
    },
    "group": {
      "type": "object"
    },
    "contact": {
      "type": "string"
    }
  },
  "required": [
    "account"
  ],
  "type": "object",
  "x-kubernetes-unions": {
    "discriminator": "account",
    "fields-to-discriminateBy": {
      "User": "user",
      "Group": "group"
    }
  }
}
```

**注意**：到目前为止，Kubernetes 的 API 规范中还没有使用此扩展属性。

### `x-kubernetes-patch-strategy`

类型：*string*

此扩展属性用来设置使用**策略合并补丁（Strategic Merge Patch）**
操作来更新当前列表时要使用的策略。
属性值是一个用逗号分隔的字符串列表，每个字符串的值可以是如下字符串之一：

- `"merge"`：当属性值中包含 `"merge"` 时，对象的列表会被合并。
  如果属性值中不包含 `"merge"`，则默认策略是将整个列表替换掉。

- `"retainKeys"`：当属性值中包含 `"retainKeys"` 时，对于联合性质的结构，
  会清除相互排斥的字段。设置了此值时，在 PATCH 操作中不包含的字段会被清除掉。
  在 `"$retainKeys"` 中包含了的字段会被合并起来。
  `"$retainKeys"` 中列举的字段必须是 PATCH 操作中包含的字段，
  或者是后者集合的超集。

例如，下面的 PATCH 操作会更新 Deployment 对象的 `strategy` 属性，
将 `"RollingUpdate"` 替换为 `"Recreate"`。
由于 `"type"` 字段是显式地列举在 `"$retainKeys"` 字段中，
`"type"` 之外的其他字段都会被清除掉，包括原来的 `"rollingUpdate"` 属性。

```yaml
spec:
  strategy:
    $retainKeys:
      - type
    type: Recreate
```

### `x-kubernetes-patch-merge-key`

类型：*string*

用于设置了 `x-kuernetes-patch-strategy` 扩展属性，并且扩展属性值为 `"merge"`
的列表。此扩展属性的作用是告诉 API 服务器，列表元素对象中的哪个字段被视为主键。
在映射策略性合并补丁操作时，如果多个对象在主键字段上的取值相同，其内容会被合并。

### `x-kubernetes-group-version-kind`

类型：*映射列表*

此扩展属性可以用在与某个 Kubernetes 资源相关联的操作或定义之上。
扩展属性值是一个映射，其中包含对应资源的组、版本和类别信息。
例如：

```json
{
  "x-kubernetes-group-version-kind": {
    "group": "",
    "version": "v1",
    "kind": "Pod"
  }
}
```

### `x-kubernetes-action`

类型：*string*

此扩展属性可以用在与某个 Kubernetes 资源相关联的操作定义之中。
属性的取值可以是 `get`、`list`、`put`、`patch`、`post`、`delete`、
`deletecollection`、`watch`、`watchlist`、`proxy` 或 `connect` 之一。

