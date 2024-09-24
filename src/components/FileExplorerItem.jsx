/* eslint-disable no-unused-vars */
import { useState } from "react";

/* eslint-disable react/prop-types */
const FileExplorerItem = ({
  item,
  setSelectedFolder,
  setSelectedFile,
  selectedFile,
  selectedFolder,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  function toggleIsExpanded() {
    setIsExpanded((prev) => !prev);
  }

  function selectFolder() {
    setSelectedFolder(item);
    setSelectedFile(undefined);
    toggleIsExpanded();
  }

  function selectFile() {
    setSelectedFile(item);
    setSelectedFolder(undefined);
  }

  // eslint-disable-next-line react/prop-types
  if (item.isFolder) {
    return (
      <div className="text-white">
        <div
          onClick={selectFolder}
          className={`font-semibold cursor-pointer ${
            selectedFolder?.id == item.id
              ? "flex items-center justify-between px-3 bg-gray-200/20"
              : ""
          }`}
        >
          <span>
            {isExpanded ? "📂" : "📁"} {item.name}
          </span>
          {selectedFolder?.id == item.id && (
            <div className="flex items-center gap-2">
              <span>edit</span>
              <span>delete</span>
            </div>
          )}
        </div>
        {item.items.length > 0 && isExpanded && (
          <div className="ms-3">
            {item.items.map((it) => (
              <FileExplorerItem
                key={it}
                item={it}
                setSelectedFolder={setSelectedFolder}
                setSelectedFile={setSelectedFile}
                selectedFile={selectedFile}
                selectedFolder={selectedFolder}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`cursor-pointer ${
        selectedFile?.id == item.id
          ? "flex items-center justify-between px-3 bg-gray-200/20"
          : ""
      }`}
      onClick={selectFile}
    >
      <div>{item.name}</div>
      {selectedFile?.id == item.id && (
        <div className="flex items-center gap-2">
          <span>edit</span>
          <span>delete</span>
        </div>
      )}
    </div>
  );
};

export default FileExplorerItem;
