
namespace JSX {
    export interface IntrinsicElements {
        div: Partial<HTMLDivElement>;
        span: Partial<HTMLSpanElement>;
        h1: Partial<HTMLHeadingElement>;
        h2: Partial<HTMLHeadingElement>;
        h3: Partial<HTMLHeadingElement>;
        h4: Partial<HTMLHeadingElement>;
        h5: Partial<HTMLHeadingElement>;
        h6: Partial<HTMLHeadingElement>;
        details: Partial<HTMLElement>;
        summary: Partial<HTMLElement>;
        pre: Partial<HTMLPreElement>;
        ul: Partial<HTMLUListElement>;
        ol: Partial<HTMLOListElement>;
        li: Partial<HTMLLIElement>;
        code: Partial<HTMLElement>;
        a: Partial<HTMLAnchorElement>;
        i: Partial<HTMLElement>;
    }
    
    export interface Element extends HTMLElement {
    }
    
    interface AttributeCollection {
        [name: string]: string;
    }
    
    export function createElement(tagName: string, attributes: AttributeCollection | null, ...children: any[]): Element {
        const element = document.createElement(tagName);
        if (attributes) {
            for (let key of Object.keys(attributes)) {
                if (key === "className") {
                    element.setAttribute("class", attributes[key]);
                } else {
                    element.setAttribute(key, attributes[key]);
                }
            }
        }
        for (let child of children) {
            appendChild(element, child);
        }
        return element;
    }
    
    function appendChild(parent: Node, child: any) {
        if (typeof child === "undefined" || child === null) {
            return;
        }
        if (Array.isArray(child)) {
            for (let value of child) {
                appendChild(parent, value);
            }
        } else if (typeof child === "string") {
            parent.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            parent.appendChild(child);
        } else {
            parent.appendChild(document.createTextNode(String(child)));
        }
    }
}
