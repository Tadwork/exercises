
function keeping_structure(root){
    const values = [];
    function in_order_traversal(node){
        if(node){
            in_order_traversal(node.left)
            values.push(node.value)
            in_order_traversal(node.right)
        }
    }
    in_order_traversal(root)
    console.log(values)
    function in_order_replace(node){
        if(node){
            console.log(values)
            in_order_replace(node.left)
            node.value = values.pop()
            in_order_replace(node.right)
        }
    }
    in_order_replace(root)
}
function swap(root){
    function pre_order_swap(node){
        if(node){
            pre_order_swap(node.left)
            pre_order_swap(node.right)
            const temp = node.right;
            if(node.left){
                node.right = node.left
            }else{
                delete node.right
            }
            if(temp){
                node.left = temp
            }else{
                delete node.left
            }
        }
    }
    pre_order_swap(root)
}
module.exports = swap