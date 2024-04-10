const data = {
  label: "北京市",
  children: [
    {
      label: "朝阳区",
      children: [{ label: "建外街" }, { label: "三里屯街道" }],
    },
    {
      label: "东城区",
      children: [
        { label: "东直门街道" },
        {
          label: "东华门街道",
          children: [{ label: "胡家园社区" }, { label: "新中街社区" }],
        },
      ],
    },
  ],
}

// 搜索路径
function search(keyword) {
  const result = []

  const exec = (data, parentPath = []) => {
    const currentPath = parentPath.concat(data.label)

    if (data.label.includes(keyword)) {
      result.push(currentPath)
    }

    data.children?.forEach((item) => exec(item, currentPath))
  }

  exec(data)

  return result
}

console.log(search("阳"))
console.log(search("街"))
