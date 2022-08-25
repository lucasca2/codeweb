import { useEffect, useMemo, useState } from "react";
import {
  createDirectory,
  deleteDirectory,
  getDirectory,
  updateDirectory,
} from "../../../services/directories";
import { useDialog } from "../../../hooks/useDialog";
import { useParams } from "react-router-dom";

export type TDirectory = {
  id: string;
  name: string;
  content?: string;
  isFolder: boolean;
  parentId?: string;
  lastModifier?: string;
  children?: TDirectory[];
};

export function useDirectories() {
  const params = useParams();
  const [directories, setDirectories] = useState<TDirectory[]>([]);

  const [selectedDirectory, setSelectedDirectory] = useState<TDirectory>();
  const [openDirectories, setOpenDirectories] = useState<TDirectory[]>([]);

  const [selectedFile, setSelectedFile] = useState<TDirectory>();
  const [openFiles, setOpenFiles] = useState<TDirectory[]>([]);

  const [draftFiles, setDraftFiles] = useState<TDirectory[]>();

  const { openDialog, closeDialog } = useDialog();

  async function getInitialData() {
    const data: TDirectory = await getDirectory(params.id as string);

    if (data) {
      setDirectories([data]);
    }
  }

  useEffect(() => {
    getInitialData();
  }, []);

  async function handleCreateDirectory(parentId?: string) {
    openDialog({
      message: "Create a new folder",
      placeholder: "Name a folder",
      onSubmit: async (value) => {
        await createDirectory({
          name: value as string,
          isFolder: true,
          lastModifier: "System",
          parentId,
        });

        await getInitialData();

        closeDialog();
      },
    });
  }

  async function handleCreateFile(parentId?: string) {
    openDialog({
      message: "Create a new file",
      placeholder: "Name a file",
      onSubmit: async (value) => {
        await createDirectory({
          name: value as string,
          isFolder: false,
          lastModifier: "System",
          parentId,
        });

        await getInitialData();

        closeDialog();
      },
    });
  }

  async function handleRenameDirectory(directory: TDirectory) {
    openDialog({
      message: `Rename a "${directory.name}" file to another name`,
      placeholder: "Rename a file",
      defaultValue: directory.name,
      onSubmit: async (value) => {
        await updateDirectory({
          id: directory.id,
          name: value as string,
          lastModifier: "System",
        });

        await getInitialData();

        closeDialog();
      },
    });
  }

  async function handleDeleteDirectory(directory: TDirectory) {
    openDialog({
      message: `Would you like to delete "${directory.name}"?`,
      onSubmit: async () => {
        await deleteDirectory(directory.id);

        await getInitialData();

        closeDialog();
      },
    });
  }

  function handleSelectDirectory(directory?: TDirectory) {
    setSelectedDirectory(directory || undefined);
  }

  function handleOpenAndCloseDirectory(directory: TDirectory) {
    setOpenDirectories((prevDirectories) => {
      if (prevDirectories?.find((dir) => dir.id === directory.id)) {
        return prevDirectories?.filter((dir) => dir.id !== directory.id);
      }

      return [...prevDirectories, directory];
    });
  }

  function handleSelectFile(file: TDirectory) {
    setSelectedFile(file);
  }

  function handleOpenAndCloseFile(file: TDirectory) {
    setOpenFiles((prevFiles) => {
      if (prevFiles?.find((fil) => fil.id === file.id)) {
        const newFiles = prevFiles?.filter((fil) => fil.id !== file.id);
        if (
          newFiles.length > 0 &&
          selectedFile &&
          !newFiles.find((fil) => fil.id === selectedFile.id)
        ) {
          handleSelectFile(newFiles[0]);
        }

        if (newFiles.length === 0) {
          setSelectedFile(undefined);
        }

        return newFiles;
      }

      handleSelectFile(file);
      return [...prevFiles, file];
    });
  }

  function handleChangeDraftFiles(content?: string) {
    if (selectedFile && content) {
      const selectedDraftFile =
        draftFiles?.find((fil) => fil.id === selectedFile.id) || selectedFile;

      setDraftFiles([
        ...(draftFiles?.filter((fil) => fil.id !== selectedFile.id) || []),
        {
          ...selectedDraftFile,
          content,
        },
      ]);
    }
  }

  const selectedDraftFile = useMemo(() => {
    return draftFiles?.find((fil) => fil.id === selectedFile?.id) || null;
  }, [draftFiles, selectedFile]);

  async function handleClickSaveFiles() {
    console.log(draftFiles);
    if (draftFiles?.length) {
      await Promise.all(
        draftFiles.map(async (file) => {
          const newDirectory = await updateDirectory({
            id: file.id,
            content: file.content,
            lastModifier: "System",
          });

          if (selectedFile && selectedFile.id === newDirectory.id) {
            setSelectedFile(newDirectory);
          }

          if (openFiles.find((fil) => fil.id === newDirectory.id)) {
            setOpenFiles(
              openFiles.map((fil) => {
                if (fil.id === newDirectory.id) {
                  return newDirectory;
                }

                return fil;
              })
            );
          }
        })
      );

      setDraftFiles(undefined);
      await getInitialData();
    }
  }

  return {
    directories,
    setDirectories,

    selectedDirectory,
    setSelectedDirectory,

    selectedFile,
    setSelectedFile,

    openDirectories,
    setOpenDirectories,

    openFiles,
    setOpenFiles,

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
  };
}
