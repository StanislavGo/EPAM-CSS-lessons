function getChildCommentNodesInElement(element) {
    const childNodes = Array.from(element.childNodes);
    let commentNodes = [];

    for (let childNode of childNodes) {
        const isCommentNode = childNode.nodeType === 8
        
        if (isCommentNode) {
            commentNodes.push(childNode);
        }
    };

    return commentNodes;
}

module.exports = { getChildCommentNodesInElement };
 