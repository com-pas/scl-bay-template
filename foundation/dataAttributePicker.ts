import type { Tree } from '@openscd/oscd-tree-grid';

function getChildren(parent: Element): Element[] {
  if (parent.tagName === 'SCL')
    return Array.from(parent.querySelectorAll(':scope > Substation'));

  if (parent.tagName === 'Substation')
    return Array.from(
      parent.querySelectorAll(
        ':scope > VoltageLevel, :scope > PowerTransformer, :scope > Function'
      )
    );

  if (parent.tagName === 'PowerTransformer')
    return Array.from(parent.querySelectorAll(':scope > EqFunction'));

  if (parent.tagName === 'VoltageLevel')
    return Array.from(
      parent.querySelectorAll(':scope > Bay, :scope > Function')
    );

  if (parent.tagName === 'Bay')
    return Array.from(
      parent.querySelectorAll(':scope > Function,:scope > ConductingEquipment')
    );

  if (parent.tagName === 'ConductingEquipment')
    return Array.from(
      parent.querySelectorAll(
        ':scope > EqFunction,:scope > SubEquipment,:scope > LNode'
      )
    );

  if (parent.tagName === 'ConductingEquipment')
    return Array.from(
      parent.querySelectorAll(':scope > EqFunction,:scope > SubEquipment')
    );

  if (parent.tagName === 'Function' || parent.tagName === 'SubFunction')
    return Array.from(
      parent.querySelectorAll(':scope > SubFunction, :scope > LNode')
    );

  if (parent.tagName === 'EqFunction' || parent.tagName === 'EqSubFunction')
    return Array.from(
      parent.querySelectorAll(':scope > EqSubFunction, :scope > LNode')
    );

  if (parent.tagName === 'LNode') {
    const lNodeType = parent.ownerDocument.querySelector(
      `LNodeType[id="${parent.getAttribute('lnType')}"]`
    );
    if (!lNodeType) return [];

    return Array.from(lNodeType.querySelectorAll(':scope > DO'));
  }

  if (parent.tagName === 'DO' || parent.tagName === 'SDO') {
    const doType = parent.ownerDocument.querySelector(
      `DOType[id="${parent.getAttribute('type')}"]`
    );
    if (!doType) return [];

    return Array.from(doType.querySelectorAll(':scope > SDO,:scope > DA'));
  }

  if (parent.tagName === 'DA' || parent.tagName === 'BDA') {
    const daType = parent.ownerDocument.querySelector(
      `DAType[id="${parent.getAttribute('type')}"]`
    );
    if (!daType) return [];

    return Array.from(daType.querySelectorAll(':scope > BDA'));
  }

  return [];
}

function getLeafNode(element: Element): string[] {
  const children = getChildren(element);
  if (children.length === 0) return [element.getAttribute('name')!];

  return children.flatMap(child => getLeafNode(child));
}

function hasLeafNode(element: Element, leafNode?: string): boolean {
  if (!leafNode) return true;
  return getLeafNode(element).includes(leafNode);
}

function lNodeTitle(lNode: Element): string {
  const lNodeSpec = lNode.querySelector(':scope LNodeSpecNaming');
  if (lNodeSpec)
    return `${lNodeSpec.getAttribute('sPrefix') ?? ''}${
      lNodeSpec.getAttribute('sLnClass') ?? 'UNKNOWN_INST'
    }${lNodeSpec.getAttribute('sLnInst') ?? ''}`;

  return `${lNode.getAttribute('prefix') ?? ''}${
    lNode.getAttribute('lnClass') ?? 'UNKNOWN_INST'
  }${lNode.getAttribute('lnInst') ?? ''}`;
}

function dataAttributeObject(da: Element, leafNode?: string): Tree {
  const tree: Tree = {};
  const children: Tree = {};

  getChildren(da)
    .filter(daChild => hasLeafNode(daChild, leafNode))
    .forEach(bda => {
      const bdaName = bda.getAttribute('name') ?? 'UNKNOWN_BDA';
      if (bda.getAttribute('bType') === 'Struct') {
        const id = `BDA: ${bdaName}`;
        children[id] = dataAttributeObject(bda, leafNode);
        children[id]!.text = bdaName;
      } else {
        const id = `LEAF: ${bdaName}`;
        children[id] = {};
        children[id]!.text = bdaName;
      }
    });

  tree.children = children;
  return tree;
}

function subDataObjectsObject(sdo: Element, leafNode?: string): Tree {
  const tree: Tree = {};
  const children: Tree = {};

  getChildren(sdo)
    .filter(sdoChild => hasLeafNode(sdoChild, leafNode))
    .forEach(sDoOrDa => {
      if (sDoOrDa.tagName === 'SDO') {
        const sDoName = sDoOrDa.getAttribute('name') ?? 'UNKNOWN_SDO';
        const id = `SDO: ${sDoName}`;
        children[id] = subDataObjectsObject(sDoOrDa, leafNode);
        children[id]!.text = sDoName;
      } else {
        const daName = sDoOrDa.getAttribute('name') ?? 'UNKNOWN_DA';
        if (sDoOrDa.getAttribute('bType') === 'Struct') {
          const id = `DA: ${daName}`;
          children[id] = dataAttributeObject(sDoOrDa, leafNode);
          children[id]!.text = daName;
        } else {
          const id = `LEAF: ${daName}`;
          children[id] = {};
          children[id]!.text = daName;
        }
      }
    });

  tree.children = children;
  return tree;
}

function dataObjectObject(dO: Element, leafNode?: string): Tree {
  const tree: Tree = {};
  const children: Tree = {};

  getChildren(dO)
    .filter(dOChild => hasLeafNode(dOChild, leafNode))
    .forEach(sDoOrDa => {
      if (sDoOrDa.tagName === 'SDO') {
        const sDoName = sDoOrDa.getAttribute('name') ?? 'UNKNOWN_SDO';

        const id = `SDO: ${sDoName}`;
        children[id] = subDataObjectsObject(sDoOrDa, leafNode);
        children[id]!.text = sDoName;
      } else {
        const daName = sDoOrDa.getAttribute('name') ?? 'UNKNOWN_DA';
        if (sDoOrDa.getAttribute('bType') === 'Struct') {
          const id = `DA: ${daName}`;
          children[id] = dataAttributeObject(sDoOrDa, leafNode);
          children[id]!.text = daName;
        } else {
          const id = `LEAF: ${daName}`;
          children[id] = {};
          children[id]!.text = daName;
        }
      }
    });

  tree.children = children;
  return tree;
}

function anyLnObject(lNode: Element, leafNode?: string): Tree {
  const tree: Tree = {};
  const children: Tree = {};

  getChildren(lNode)
    .filter(lNodeChild => hasLeafNode(lNodeChild, leafNode))
    .forEach(dO => {
      const doName = dO.getAttribute('name') ?? 'UNKNOWN_DO';

      const id = `DO: ${doName}`;
      children[id] = dataObjectObject(dO, leafNode);
      children[id]!.text = doName;
    });

  tree.children = children;
  return tree;
}

function funcObject(func: Element, leafNode?: string): Tree {
  const tree: Tree = {};
  const children: Tree = {};

  getChildren(func)
    .filter(funcChild => hasLeafNode(funcChild, leafNode))
    .forEach(funcChild => {
      if (funcChild.tagName === 'LNode') {
        const title = lNodeTitle(funcChild);

        const id = `${funcChild.tagName}: ${title}`;
        children[id] = anyLnObject(funcChild, leafNode);
        children[id]!.text = title;
      } else {
        const funcName = `${funcChild.getAttribute('name') ?? 'UNKNOWN_INST'}`;

        const id = `${funcChild.tagName}: ${funcName}`;
        children[id] = funcObject(funcChild, leafNode);
        children[id]!.text = funcName;
      }
    });

  tree.children = children;

  return tree;
}

function condEqObject(condEq: Element, leafNode?: string): Tree {
  const tree: Tree = {};
  const children: Tree = {};

  getChildren(condEq)
    .filter(condEqChild => hasLeafNode(condEqChild, leafNode))
    .forEach(condEqChild => {
      if (condEqChild.tagName === 'LNode') {
        const title = lNodeTitle(condEqChild);

        const id = `${condEqChild.tagName}: ${title}`;
        children[id] = anyLnObject(condEqChild, leafNode);
        children[id]!.text = title;
      } else if (condEqChild.tagName === 'SubEquipment') {
        const subEqName = `${
          condEqChild.getAttribute('name') ?? 'UNKNOWN_INST'
        }`;

        const id = `${condEqChild.tagName}: ${subEqName}`;
        children[id] = condEqObject(condEqChild, leafNode);
        children[id]!.text = subEqName;
      } else {
        const funcName = `${
          condEqChild.getAttribute('name') ?? 'UNKNOWN_INST'
        }`;

        const id = `${condEqChild.tagName}: ${funcName}`;
        children[id] = funcObject(condEqChild, leafNode);
        children[id]!.text = funcName;
      }
    });

  tree.children = children;

  return tree;
}

function bayObject(bay: Element, leafNode?: string): Tree {
  const tree: Tree = {};
  const children: Tree = {};

  getChildren(bay)
    .filter(bayChild => hasLeafNode(bayChild, leafNode))
    .forEach(bayChild => {
      if (bayChild.tagName === 'ConductingEquipment') {
        const condEqName = `${bayChild.getAttribute('name') ?? 'UNKNOWN_INST'}`;

        const id = `${bayChild.tagName}: ${condEqName}`;
        children[id] = condEqObject(bayChild, leafNode);
        children[id]!.text = condEqName;
      } else {
        const funcName = `${bayChild.getAttribute('name') ?? 'UNKNOWN_INST'}`;

        const id = `${bayChild.tagName}: ${funcName}`;
        children[id] = funcObject(bayChild, leafNode);
        children[id]!.text = funcName;
      }
    });

  tree.children = children;

  return tree;
}

function voltLvObject(voltLv: Element, leafNode?: string): Tree {
  const tree: Tree = {};
  const children: Tree = {};

  getChildren(voltLv).forEach(voltLvChild => {
    if (voltLvChild.tagName === 'Bay') {
      const bayName = `${voltLvChild.getAttribute('name') ?? 'UNKNOWN_INST'}`;

      const id = `${voltLvChild.tagName}: ${bayName}`;
      children[id] = bayObject(voltLvChild, leafNode);
      children[id]!.text = bayName;
    } else {
      const funcName = `${voltLvChild.getAttribute('name') ?? 'UNKNOWN_INST'}`;

      const id = `${voltLvChild.tagName}: ${funcName}`;
      children[id] = funcObject(voltLvChild, leafNode);
      children[id]!.text = funcName;
    }
  });

  tree.children = children;

  return tree;
}

function subStObject(subSt: Element, leafNode?: string): Tree {
  const tree: Tree = {};
  const children: Tree = {};

  getChildren(subSt).forEach(subStChild => {
    if (subStChild.tagName === 'VoltageLevel') {
      const subStName = `${subStChild.getAttribute('name') ?? 'UNKNOWN_INST'}`;

      const id = `${subStChild.tagName}: ${subStName}`;
      children[id] = voltLvObject(subStChild, leafNode);
      children[id]!.text = subStName;
    } else if (subStChild.tagName === 'PowerTransformer') {
      const subStName = `${subStChild.getAttribute('name') ?? 'UNKNOWN_INST'}`;

      const id = `${subStChild.tagName}: ${subStName}`;
      children[id] = condEqObject(subStChild, leafNode);
      children[id]!.text = subStName;
    } else {
      const funcName = `${subStChild.getAttribute('name') ?? 'UNKNOWN_INST'}`;

      const id = `${subStChild.tagName}: ${funcName}`;
      children[id] = funcObject(subStChild, leafNode);
      children[id]!.text = funcName;
    }
  });

  tree.children = children;

  return tree;
}

export function dataAttributeTree(doc: XMLDocument, leafNode?: string): Tree {
  const tree: Tree = {};

  getChildren(doc.querySelector('SCL')!).forEach(subStChild => {
    const subStName = subStChild.getAttribute('name') ?? 'UNKNOWN_LDEVICE';
    const id = `Substation: ${subStName}`;
    tree[id] = subStObject(subStChild, leafNode);
    tree[id]!.text = subStName;
  });

  return tree;
}

export function getSourceDef(paths: string[][]): string[] {
  const sourceRefs: string[] = [];

  for (const path of paths) {
    let source: string = '';
    const leaf = path[path.length - 1];
    const [leafTag] = leaf.split(': ');
    // eslint-disable-next-line no-continue
    if (leafTag !== 'LEAF') continue;

    for (const section of path) {
      const [tag, name] = section.split(': ');
      if (!['DA', 'SDO', 'BDA', 'LEAF'].includes(tag)) source += `/${name}`;
      else source += `.${name}`;
    }

    sourceRefs.push(source.slice(1));
  }

  return sourceRefs;
}
