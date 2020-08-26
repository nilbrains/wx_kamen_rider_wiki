Component({

  options: {

    multipleSlots: true // 在组件定义时的选项中启用多slot支持

  },

  properties: {
    emptyImage: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: "/assets/images/empty/empty.png" // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    info: {
      type: String,
      value: "空空如也~"
    },
    showInfo: {
      type: Boolean,
      value: true
    },
    buttonTitle: {
      type: String,
      value: "点击重试"
    },
    showButton: {
      type: Boolean,
      value: false
    }
  },
})