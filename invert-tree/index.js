
function invertTree(root){
    function swap(node){
      const temp = node.left
      if(node.right){
        node.left = node.right
      }else{
        // don't leave "undefined" because it breaks the deepEquals test
        delete node.left
      }
      if(temp){
        node.right = temp
      }else{
        // don't leave "undefined" because it breaks the deepEquals test
        delete node.right
      }
    }
    function traverse(node){
      if(node){
        swap(node)
        traverse(node.left)
        traverse(node.right)
      }
    }
    traverse(root)

}

module.exports = invertTree
