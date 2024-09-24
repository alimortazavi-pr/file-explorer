/* eslint-disable no-unused-vars */
import { useState } from "react";

/* eslint-disable react/prop-types */
const FileExplorerItem = ({
  item,
  onClickItemHandler,
  selectedFileOrFolder,
  onClickEditHandler,
  deleteFileOrFolder,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  function toggleIsExpanded() {
    setIsExpanded((prev) => !prev);
  }

  function selectFileOrFolder() {
    onClickItemHandler(item, item.isFolder);
    toggleIsExpanded();
  }

  // eslint-disable-next-line react/prop-types
  return (
    <div className="text-white mb-2">
      <div
        onClick={selectFileOrFolder}
        className={`font-semibold cursor-pointer px-3 ${
          selectedFileOrFolder.fileOrFolder?.id == item.id
            ? "flex items-center justify-between bg-gray-200/20"
            : ""
        }`}
      >
        <span>
          {item.isFolder ? (isExpanded ? "📂" : "📁") : "📄"} {item.name}
        </span>
        {selectedFileOrFolder.fileOrFolder?.id == item.id && item.id != 1 && (
          <div className="flex items-center gap-2">
            <span onClick={onClickEditHandler}>edit</span>
            <span onClick={deleteFileOrFolder}>delete</span>
          </div>
        )}
      </div>
      {item.isFolder && item.items.length > 0 && isExpanded && (
        <div className="ms-3 mt-2">
          {item.items.map((it) => (
            <FileExplorerItem
              key={it.id}
              item={it}
              selectedFileOrFolder={selectedFileOrFolder}
              onClickItemHandler={onClickItemHandler}
              onClickEditHandler={onClickEditHandler}
              deleteFileOrFolder={deleteFileOrFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileExplorerItem;
