// pathArray example: ['Folder1', 'Subfolder3', 'Sub-subfolder2']
// pathString example: '/Folder1/Subfolder3/Sub-subfolder2/'

function pathToArray(pathString){
  return pathString.slice(1, -1).split("/");
};

function pathToString(pathArray){
  let pathString = "/";
  pathArray.forEach(folder => {
    pathString += folder + "/";
  });
  return pathString;
};

// Lists all pathString values from a jaon containing file records. Removes duplicates
function listUniquePaths(filesjson){
  let allPaths = filesjson.map(fileEntry => {
    return fileEntry.path;
  });
  let uniquePaths = [...new Set(allPaths)];
  uniquePaths.sort();
  return uniquePaths;
};

// Finds a specific node in a tree by pathArray. Returns the copy of that node
function readNode(tree, pathArray){
  if (!tree || tree.length === 0) {
    return null;
  }

  if (pathArray.length === 0){
    return tree;
  }

  let node = tree.find(object => {
    return object.name === pathArray[0];
  });

  if (!node) {
    return null;
  }

  if (pathArray.length > 1) {
    let pathArraySlice = pathArray.slice(1);
    return readNode(node.children, pathArraySlice);
  } else {
    return node;
  }
};

// Determines the index of each node and child node
// Example: ['Folder1', 'Subfolder3', 'Sub-subfolder2'] => [0, 2, 1]
function findPathIndex(tree, pathArray, pathIndexArray){
  if(!pathIndexArray){
    pathIndexArray = [];
  }

  if(!tree || tree.length === 0) {
    return null;
  }

  let node = tree.find(object => {
    return object.name === pathArray[0];
  });

  let nodeIndex = tree.findIndex(object => {
    return object.name === pathArray[0];
  });
  pathIndexArray.push(nodeIndex);

  if (!node) {
    return null;
  }

  if (pathArray.length > 1) {
    let pathArraySlice = pathArray.slice(1);
    return findPathIndex(node.children, pathArraySlice, pathIndexArray);
  } else {
    return pathIndexArray;
  }
};

// Inserts a new node as the last child specified by a pathArray.
// Returns a copy, the original needs to be updated
function insertNode(tree, pathArray, nodeToInsert){
  let pathIndex = findPathIndex(tree, pathArray);
  if (!pathIndex) {
    tree.push(nodeToInsert);
  } else {
    let node = tree[pathIndex[0]];
    for (let i = 1; i < pathIndex.length; i++){
      node = node.children[pathIndex[i]];
    }
    node.children.push(nodeToInsert);    
  }

  return tree;
};

// Replaces the specified key to the specified value of a node specified by a pathArray
// Returns a copy, the original needs to be updated
function updateNode(tree, pathArray, key, value){
  let pathIndex = findPathIndex(tree, pathArray);
  let node = tree[pathIndex[0]];
  for (let i = 1; i < pathIndex.length; i++){
    node = node.children[pathIndex[i]];
  }
  node[key] = value;

  return tree;
};

function createFolderTree(filesjson){
  let tree = [];
  let uniquePaths = listUniquePaths(filesjson);
  let pathArrayList = uniquePaths.map(pathString => {
    return pathToArray(pathString);
  });

  pathArrayList.forEach(pathArray => {
    let parentPathArray = [];
    for (let i = 0; i < pathArray.length; i++){
      let currentPathArray = pathArray.slice(0, i + 1);
      if (readNode(tree, currentPathArray) === null){
        let nodeToInsert = {
          "name": pathArray[i],
          "expanded": false,
          "children": []
        }

        let newTree = insertNode(tree, parentPathArray, nodeToInsert);
        tree = newTree;
      }
      parentPathArray = pathArray.slice(0, i + 1);
    }
  });

  return tree;
}

export { pathToArray, pathToString, listUniquePaths, readNode, findPathIndex, insertNode, updateNode, createFolderTree };