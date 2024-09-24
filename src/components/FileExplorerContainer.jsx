/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useEffect } from "react";

//Components
import FileExplorerItem from "./FileExplorerItem";

const FileExplorerContainer = () => {
  //States
  const [selectedFileOrFolder, setSelectedFileOrFolder] = useState({
    fileOrFolder: undefined,
    isFolder: false,
  });
  const [data, setData] = useState([
    {
      id: "1",
      name: "root",
      isFolder: true,
      parentId: "",
      items: [
        {
          id: "2",
          name: "root2",
          isFolder: true,
          parentId: "1",
          items: [],
        },
        {
          id: "3",
          name: "root3",
          isFolder: false,
          parentId: "1",
          items: [],
        },
        {
          id: "4",
          name: "root4",
          isFolder: true,
          parentId: "1",
          items: [],
        },
        {
          id: "5",
          name: "root5",
          isFolder: true,
          parentId: "1",
          items: [
            {
              id: "6",
              name: "root6",
              isFolder: false,
              parentId: "5",
              items: [],
            },
          ],
        },
      ],
    },
  ]);
  const [selectedPath, setSelectedPath] = useState(undefined);

  //Effects
  useEffect(() => {
    if (selectedFileOrFolder.fileOrFolder) {
      setSelectedPath(findPath(data[0], selectedFileOrFolder.fileOrFolder.id));
    } else {
      setSelectedPath(undefined);
    }
  }, [selectedFileOrFolder]);

  //Functions
  function onClickItemHandler(fileOrFolder, isFolder) {
    setSelectedFileOrFolder({
      fileOrFolder: fileOrFolder,
      isFolder,
    });
  }

  function onClickEditHandler() {
    const newFileName = prompt("new file name");
    editFileOrFolder(newFileName);
  }

  function addFileOrFolder(folderId, name, isFolder) {
    if (!name) return;

    function checkFolder(item) {
      if (item.id === folderId && item.isFolder) {
        const newItem = {
          id: new Date().getTime().toString(),
          name,
          isFolder,
          parentId: item.id,
          items: [],
        };
        return {
          ...item,
          items: [...item.items, newItem],
        };
      }

      if (item.items && item.items.length > 0) {
        const updatedItems = item.items.map(checkFolder);
        if (updatedItems !== item.items) {
          return {
            ...item,
            items: updatedItems,
          };
        }
      }

      return item;
    }

    setData((prevData) => {
      const updatedData = prevData.map(checkFolder);

      if (updatedData !== prevData) {
        return updatedData;
      }

      return prevData;
    });
  }

  function editFileOrFolder(newName) {
    if (!newName) return;

    function checkFolder(item) {
      if (item.id === selectedFileOrFolder.fileOrFolder.parentId) {
        const changeItem = {
          ...selectedFileOrFolder.fileOrFolder,
          name: newName,
        };
        return {
          ...item,
          items: [
            ...item.items.filter(
              (it) => it.id !== selectedFileOrFolder.fileOrFolder.id
            ),
            changeItem,
          ],
        };
      }

      if (item.items && item.items.length > 0) {
        const updatedItems = item.items.map(checkFolder);
        if (updatedItems !== item.items) {
          return {
            ...item,
            items: updatedItems,
          };
        }
      }

      return item;
    }
    setSelectedPath(findPath(data[0], selectedFileOrFolder.fileOrFolder.id));
    setData((prevData) => {
      const updatedData = prevData.map(checkFolder);

      if (updatedData !== prevData) {
        return updatedData;
      }

      return prevData;
    });
  }

  function deleteFileOrFolder() {
    function checkFolder(item) {
      if (item.id === selectedFileOrFolder.fileOrFolder.parentId) {
        return {
          ...item,
          items: [
            ...item.items.filter(
              (it) => it.id !== selectedFileOrFolder.fileOrFolder.id
            ),
          ],
        };
      }

      if (item.items && item.items.length > 0) {
        const updatedItems = item.items.map(checkFolder);
        if (updatedItems !== item.items) {
          return {
            ...item,
            items: updatedItems,
          };
        }
      }

      return item;
    }
    setSelectedPath(findPath(data[0], selectedFileOrFolder.fileOrFolder.id));
    setData((prevData) => {
      const updatedData = prevData.map(checkFolder);

      if (updatedData !== prevData) {
        return updatedData;
      }

      return prevData;
    });
  }

  function addFolder() {
    const folderName = prompt("folder name");
    addFileOrFolder(
      selectedFileOrFolder.isFolder
        ? selectedFileOrFolder.fileOrFolder.id
        : selectedFileOrFolder.fileOrFolder.parentId,
      folderName,
      true
    );
  }

  function addFile() {
    const fileName = prompt("file name");
    addFileOrFolder(
      selectedFileOrFolder.isFolder
        ? selectedFileOrFolder.fileOrFolder.id
        : selectedFileOrFolder.fileOrFolder.parentId,
      fileName,
      false
    );
  }

  function findPath(item, targetId, path = "") {
    let currentPath = path ? `${path}/${item.name}` : item.name;

    if (item.id === targetId) {
      return currentPath;
    }

    if (item.items) {
      for (let child of item.items) {
        const result = findPath(child, targetId, currentPath);
        if (result) {
          return result;
        }
      }
    }

    return null;
  }

  return (
    <div className="w-screen h-screen flex bg-gray-600 p-10">
      <div className="w-1/2 bg-gray-800 h-full p-4">
        <div className="flex justify-end mb-3">
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
            selectedFileOrFolder={selectedFileOrFolder}
            onClickItemHandler={onClickItemHandler}
            onClickEditHandler={onClickEditHandler}
            deleteFileOrFolder={deleteFileOrFolder}
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
