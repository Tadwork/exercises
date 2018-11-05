function post_order_traversal(node,func){
    if(node){
        post_order_traversal(node.left,func)
        post_order_traversal(node.right,func)
        func(node)
    }
}
module.exports = function(root){
    post_order_traversal(root,(node)=>{
        let temp = node.left
        node.left = node.right
        node.right = temp
        if(!node.right) delete node.right
        if(!node.left) delete node.left
    })
}   