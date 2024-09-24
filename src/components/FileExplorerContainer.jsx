/* eslint-disable no-unused-vars */
import { useState } from "react";
import FileExplorerItem from "./FileExplorerItem";
import { useEffect } from "react";

const FileExplorerContainer = () => {
  //States
  const [selectedFolder, setSelectedFolder] = useState(undefined);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [data, setData] = useState([
    {
      id: "1",
      name: "root",
      isFolder: true,
      items: [
        {
          id: "2",
          name: "root2",
          isFolder: true,
          items: [],
        },
        {
          id: "3",
          name: "root3",
          isFolder: false,
          items: [],
        },
        {
          id: "4",
          name: "root4",
          isFolder: true,
          items: [],
        },
        {
          id: "5",
          name: "root5",
          isFolder: true,
          items: [
            {
              id: "6",
              name: "root6",
              isFolder: false,
              items: [],
            },
          ],
        },
      ],
    },
  ]);
  const [selectedPath, setSelectedPath] = useState(undefined);

  //Functions
  function addFileOrFolder(folderId, name, isFolder) {
    function checkFolder(item) {
      if (item.id === folderId && item.isFolder) {
        const newItem = {
          id: new Date().getTime().toString(),
          name,
          isFolder,
          items: [],
        };
        return {
          ...item,
          items: [...item.items, newItem],
        };
      }
      return {
        ...item,
        items: item.items.map(checkFolder),
      };
    }

    setData(data.map(checkFolder));
  }

  function addFolder() {
    const folderName = prompt("folder name");
    addFileOrFolder(selectedFolder.id, folderName, true);
  }

  function addFile() {
    const fileName = prompt("file name");
    addFileOrFolder(selectedFolder.id, fileName, false);
  }

  function findPath(item, targetName, path = "") {
    let currentPath = path ? `${path}/${item.name}` : item.name;

    if (item.name === targetName) {
      return currentPath;
    }

    if (item.items) {
      for (let child of item.items) {
        const result = findPath(child, targetName, currentPath);
        if (result) {
          return result;
        }
      }
    }

    return null;
  }

  useEffect(() => {
    if (selectedFile) {
      setSelectedPath(findPath(data[0], selectedFile.name));
    } else if (selectedFolder) {
      setSelectedPath(findPath(data[0], selectedFolder.name));
    } else {
      setSelectedPath(undefined);
    }
  }, [selectedFile, selectedFolder]);

  return (
    <div className="w-screen h-screen flex bg-gray-600 p-10">
      <div className="w-1/2 bg-gray-800 h-full p-4">
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <button onClick={addFile} className="text-gray-50">
              new file
            </button>
            <button onClick={addFolder} className="text-gray-50">
              new folder
            </button>
          </div>
        </div>
        {data.map((item) => (
          <FileExplorerItem
            key={item.id}
            item={item}
            setSelectedFolder={setSelectedFolder}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            selectedFolder={selectedFolder}
          />
        ))}
      </div>
      <div className="w-1/2 bg-gray-700 h-full p-4">
        {selectedPath && <div className="text-gray-100">{selectedPath}</div>}
      </div>
    </div>
  );
};

export default FileExplorerContainer;
