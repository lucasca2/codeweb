import { ContextMenuOption, ContextMenuWrapper } from "../styles";
import { TDirectory } from "../../../hooks/useDirectories";
import React from "react";

type TContextMenu = {
  contextMenuIsOpen: boolean;
  contextMenuPosition: { x: string; y: string; revert: boolean } | null;
  selectedDirectory?: TDirectory;
  onCreateNewFolder: (parentId?: string) => void;
  onCreateNewFile: (parentId: string) => void;
  onRenameDirectory: (directory: TDirectory) => void;
  onDeleteDirectory: (directory: TDirectory) => void;
};

export const ContextMenu = React.forwardRef(
  (
    {
      contextMenuIsOpen,
      contextMenuPosition,
      selectedDirectory,
      onCreateNewFolder,
      onCreateNewFile,
      onRenameDirectory,
      onDeleteDirectory,
    }: TContextMenu,
    ref: any
  ) => {
    return (
      <ContextMenuWrapper
        ref={ref}
        isVisible={!!(contextMenuIsOpen && contextMenuPosition)}
        revert={contextMenuPosition?.revert}
        y={contextMenuPosition?.y}
        x={contextMenuPosition?.x}
      >
        {selectedDirectory && (
          <>
            <ContextMenuOption
              onClick={() => onRenameDirectory(selectedDirectory)}
            >
              Rename "{selectedDirectory?.name}"
            </ContextMenuOption>
            <ContextMenuOption
              onClick={() => onDeleteDirectory(selectedDirectory)}
            >
              Delete "{selectedDirectory?.name}"
            </ContextMenuOption>
          </>
        )}

        {selectedDirectory?.isFolder && (
          <>
            <ContextMenuOption
              onClick={() => onCreateNewFolder?.(selectedDirectory?.id)}
            >
              Create a new folder in "{selectedDirectory?.name}"
            </ContextMenuOption>
            <ContextMenuOption
              onClick={() => onCreateNewFile?.(selectedDirectory?.id)}
            >
              Create a new file in "{selectedDirectory?.name}"
            </ContextMenuOption>
          </>
        )}
      </ContextMenuWrapper>
    );
  }
);
