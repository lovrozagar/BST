function Node(data, left = null, right = null) {
  return {
    data: data,
    left: left,
    right: right,
  }
}

function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) return null

  const mid = parseInt((start + end) / 2)
  const root = Node(arr[mid])

  root.left = buildTree(arr, start, mid - 1)
  root.right = buildTree(arr, mid + 1, end)

  return root
}

function Tree(arrObj) {
  let uniqueArr
  if (Array.isArray(arrObj)) {
    uniqueArr = [...new Set(arrObj.sort((a, b) => a - b))]
  }

  return {
    root: Array.isArray(arrObj) ? buildTree(uniqueArr) : arrObj,

    insert(value, root = this.root) {
      if (root === null) {
        root = Node(value)
        return root
      }

      if (value < root.data) {
        root.left = this.insert(value, root.left)
      } else if (value > root.data) {
        root.right = this.insert(value, root.right)
      }

      return root
    },

    delete(value, root = this.root) {
      if (root === null) {
        return root
      }

      if (value < root.data) {
        root.left = this.delete(value, root.left)
      } else if (value > root.data) {
        root.right = this.delete(value, root.right)
      } else {
        if (root.left === null) {
          return root.right
        } else if (root.right === null) {
          return root.left
        } else {
          const minData = function findNextSmallestRightData(root) {
            let min = root.data
            let newRoot = root

            while (newRoot.left !== null) {
              min = root.left.data
              newRoot = root.left
            }

            return min
          }

          root.data = minData(root.right)

          root.right = this.delete(root.data, root.right)
        }
      }

      return root
    },

    find(value, root = this.root) {
      if (root === null || root.data === value) {
        return root
      }

      if (value < root.data) {
        return this.find(value, root.left)
      }
      return this.find(value, root.right)
    },

    levelOrder(arr = [], queue = [], root = this.root) {
      if (root === null) return
      arr.push(root.data)

      queue.push(root.left)
      queue.push(root.right)

      while (queue.length) {
        const level = queue[0]
        queue.shift()
        this.levelOrder(arr, queue, level)
      }

      return arr
    },

    inorder(arr = [], root = this.root) {
      if (root === null) return

      if (root.left) this.inorder(arr, root.left)

      arr.push(root.data)

      if (root.right) this.inorder(arr, root.right)

      return arr
    },

    preorder(arr = [], root = this.root) {
      if (root === null) return

      arr.push(root.data)

      if (root.left) this.preorder(arr, root.left)

      if (root.right) this.preorder(arr, root.right)

      return arr
    },

    postorder(arr = [], root = this.root) {
      if (root === null) return

      if (root.left) this.postorder(arr, root.left)

      if (root.right) this.postorder(arr, root.right)

      arr.push(root.data)

      return arr
    },

    height(root = this.root) {
      if (root === null) return 0

      let lHeight = this.height(root.left)
      let rHeight = this.height(root.right)

      if (lHeight > rHeight) {
        return lHeight + 1
      } else {
        return rHeight + 1
      }
    },

    depth(node, root = this.root, depth = 0) {
      if (root === null || node === null) return
      if (node === root) return `Depth: ${depth}`
      if (node.data < root.data) {
        return this.depth(node, root.left, (depth += 1))
      } else {
        return this.depth(node, root.right, (depth += 1))
      }
    },

    isBalanced(root = this.root) {
      const lHeight = this.height(root.left)
      const rHeight = this.height(root.right)
      const diff = Math.abs(lHeight - rHeight)
      return diff < 2 ? 'true' : 'false'
    },

    rebalance(root = this.root) {
      let arr = this.levelOrder([], [], root)
      arr.sort((a, b) => a - b)
      return (this.root = buildTree(arr))
    },
  }
}
