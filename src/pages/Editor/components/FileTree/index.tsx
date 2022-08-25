import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import {
  MdFolder,
  MdInsertDriveFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import {
  Wrapper,
  ContextMenuWrapper,
  ContextMenuOption,
  FolderWrapper,
  FolderLabel,
  WrapperIcon,
  Label,
} from "./styles";
import { ContextMenu } from "./components";

export type TDirectory = {
  id: string;
  name: string;
  content?: string;
  isFolder: boolean;
  parentId?: string;
  lastModifier?: string;
  children?: TDirectory[];
};

interface FileTree {
  onContextMenu?: (e: MouseEvent<HTMLDivElement>) => void;

  directories?: TDirectory[];

  selectedFile?: TDirectory;
  onSelectFile: (file: TDirectory) => void;

  selectedDirectory?: TDirectory;
  onSelectFolder: (dir?: TDirectory) => void;

  onCreateNewFolder: (parentId?: string) => void;
  onCreateNewFile: (parentId: string) => void;
  onRenameDirectory: (directory: TDirectory) => void;
  onDeleteDirectory: (directory: TDirectory) => void;

  onOpenAndCloseDirectory: (directory: TDirectory) => void;
  onOpenAndCloseFile: (file: TDirectory) => void;

  openDirectories: TDirectory[];
  openFiles: TDirectory[];
}

export const FileTree: FC<FileTree> = ({
  directories,
  selectedFile,
  selectedDirectory,
  onSelectFolder,
  onSelectFile,
  onCreateNewFolder,
  onCreateNewFile,
  onRenameDirectory,
  onDeleteDirectory,

  onOpenAndCloseDirectory,
  onOpenAndCloseFile,

  openDirectories,
  openFiles,
  ...props
}) => {
  const fileTreeWrapper = useRef() as React.MutableRefObject<HTMLDivElement>;
  const contextMenuWrapper = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [contextMenuIsOpen, setContextMenuIsOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: string;
    y: string;
    revert: boolean;
  } | null>(null);

  function handleOpenContextMenu(x: number, y: number) {
    const contextMenuHeight = contextMenuWrapper.current.offsetHeight;
    const fileTreeHeight = fileTreeWrapper.current.offsetHeight;

    setContextMenuIsOpen(true);
    setContextMenuPosition({
      x: `${x}px`,
      y: `${y}px`,
      revert: contextMenuHeight + y > fileTreeHeight,
    });
  }

  useEffect(() => {
    function handleClickOutToCloseContext() {
      setContextMenuIsOpen(false);
      setContextMenuPosition(null);
      document.removeEventListener("click", handleClickOutToCloseContext);
    }

    if (contextMenuIsOpen) {
      document.addEventListener("click", handleClickOutToCloseContext);
    }
  }, [contextMenuIsOpen]);

  function handleCloseContextMenu() {
    setContextMenuIsOpen(false);
    setContextMenuPosition(null);
  }

  const handleClickOnFolder =
    (directory: TDirectory) => (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      handleCloseContextMenu();
      onSelectFolder(directory);
    };

  const handleRightClickOnFolder =
    (directory: TDirectory) => (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      onSelectFolder(directory);
      handleOpenContextMenu(event.pageX, event.pageY);
    };

  const handleClickOnOpenCloseFolder =
    (directory: TDirectory) => (event: MouseEvent<HTMLDivElement>) => {
      if (directory.isFolder) {
        event.stopPropagation();

        handleCloseContextMenu();
        onSelectFolder(directory);
        onOpenAndCloseDirectory(directory);
      }
    };

  const handleDoubleClickOnFolder =
    (directory: TDirectory) => (event: MouseEvent<HTMLDivElement>) => {
      if (directory.isFolder) {
        handleClickOnOpenCloseFolder(directory)(event);
      } else {
        if (openFiles.find((fil) => fil.id === directory.id)) {
          onSelectFile(directory);
        } else {
          onOpenAndCloseFile(directory);
        }
      }
    };

  function renderFolders(directoriesToMap?: TDirectory[], identation = 0) {
    if (!directoriesToMap?.length) return null;

    return directoriesToMap?.map((directory) => {
      const directoryIsOpen = openDirectories.find(
        (dir) => dir.id === directory.id
      );
      const directoryIsSelected = directory.id === selectedDirectory?.id;

      return (
        <FolderWrapper>
          <FolderLabel
            isSelected={directoryIsSelected}
            onClick={handleClickOnFolder(directory)}
            onContextMenu={handleRightClickOnFolder(directory)}
            onDoubleClick={handleDoubleClickOnFolder(directory)}
          >
            <WrapperIcon onClick={handleClickOnOpenCloseFolder(directory)}>
              {directory.isFolder &&
                (directoryIsOpen ? (
                  <MdKeyboardArrowDown size={20} />
                ) : (
                  <MdKeyboardArrowRight size={20} />
                ))}
            </WrapperIcon>
            <WrapperIcon>
              {directory.isFolder ? (
                <MdFolder size={20} />
              ) : (
                <MdInsertDriveFile size={18} />
              )}
            </WrapperIcon>

            <Label>{directory.name}</Label>
          </FolderLabel>
          {directoryIsOpen && renderFolders(directory.children, identation + 1)}
        </FolderWrapper>
      );
    });
  }

  return (
    <>
      <Wrapper
        ref={fileTreeWrapper}
        onClick={() => onSelectFolder?.()}
        onContextMenu={(event: MouseEvent<HTMLDivElement>) => {
          event.preventDefault();

          handleCloseContextMenu();
        }}
        {...props}
      >
        {renderFolders(directories)}
      </Wrapper>

      <ContextMenu
        ref={contextMenuWrapper}
        contextMenuIsOpen={contextMenuIsOpen}
        contextMenuPosition={contextMenuPosition}
        selectedDirectory={selectedDirectory}
        onCreateNewFolder={onCreateNewFolder}
        onCreateNewFile={onCreateNewFile}
        onRenameDirectory={onRenameDirectory}
        onDeleteDirectory={onDeleteDirectory}
      />
    </>
  );
};
