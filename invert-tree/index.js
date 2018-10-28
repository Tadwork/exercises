
function swap(root){
    function post_order_traversal(node,transformation){
        if(node){
            post_order_traversal(node.left,transformation)
            post_order_traversal(node.right,transformation)
            transformation(node)
        }
    }
    post_order_traversal(root,(node)=>{
        const tempRight = node.right
        if(node.left){
            node.right = node.left
        }else{
            delete node.right
        }
        if(tempRight){
            node.left = tempRight
        }else{
            delete node.left
        }
    })
}
module.exports = swap