import React from "react";
import { FileTree } from "./components/FileTree";
import { FileEditor } from "./components/FileEditor";
import { FileSelectedTabs } from "./components/FileSelectedTabs";
import { FileActions } from "./components/FileActions";
import { useDirectories } from "./hooks/useDirectories";

import { Wrapper, WrapperFileTree, WrapperFileEditor } from "./styles";
import { useNavigate } from "react-router-dom";

export const Editor = () => {
  const navigate = useNavigate();

  const {
    directories,
    selectedDirectory,
    selectedFile,
    openDirectories,
    openFiles,

    handleCreateDirectory,
    handleCreateFile,
    handleRenameDirectory,
    handleDeleteDirectory,

    handleSelectDirectory,
    handleOpenAndCloseDirectory,

    handleSelectFile,
    handleOpenAndCloseFile,

    handleChangeDraftFiles,
    selectedDraftFile,

    handleClickSaveFiles,
    draftFiles,
  } = useDirectories();

  const handleClickGoBackProjects = () => {
    navigate("/");
  };

  return (
    <Wrapper onKeyPress={(e) => console.log(e.key)}>
      <WrapperFileTree>
        <FileActions
          thereAreFilesToSave={!!draftFiles?.length}
          onClickSaveFiles={handleClickSaveFiles}
          onClickGoBackProjects={handleClickGoBackProjects}
        />
        <FileTree
          directories={directories}
          selectedDirectory={selectedDirectory}
          selectedFile={selectedFile}
          openFiles={openFiles}
          openDirectories={openDirectories}
          onOpenAndCloseDirectory={handleOpenAndCloseDirectory}
          onOpenAndCloseFile={handleOpenAndCloseFile}
          onSelectFolder={handleSelectDirectory}
          onSelectFile={handleSelectFile}
          onCreateNewFolder={handleCreateDirectory}
          onCreateNewFile={handleCreateFile}
          onRenameDirectory={handleRenameDirectory}
          onDeleteDirectory={handleDeleteDirectory}
        />
      </WrapperFileTree>
      <WrapperFileEditor>
        <FileSelectedTabs
          openFiles={openFiles}
          onSelectFile={handleSelectFile}
          selectedFile={selectedFile}
          onOpenAndCloseFile={handleOpenAndCloseFile}
        />
        <FileEditor
          selectedFile={selectedFile}
          selectedDraftFile={selectedDraftFile}
          handleChangeDraftFiles={handleChangeDraftFiles}
        />
      </WrapperFileEditor>
    </Wrapper>
  );
};
