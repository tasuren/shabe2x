function preStringifyElementNode(node: Node): string | null {
	if (node.nodeName == "PRE") return "\n\n";
	return null;
}

export function stringifyNode(node: Node): string {
	let text = null;

	// 事前に除外したいNodeを消したりする。
	if (node.nodeType == Node.ELEMENT_NODE) text = preStringifyElementNode(node);
	if (text === null) text = "";
	else return text;

	for (const childNode of node.childNodes)
		if (childNode.nodeType == Node.TEXT_NODE) text += childNode.textContent;
		else text += stringifyNode(childNode);

	if (
		node.nodeType == Node.ELEMENT_NODE &&
		((node.nodeName.length == 2 && node.nodeName.startsWith("H")) || node.nodeName == "P")
	) {
		text += "\n\n";
	}

	return text;
}
