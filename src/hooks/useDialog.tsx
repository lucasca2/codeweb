import React, { createContext, useContext, useState } from "react";
import { Dialog } from "../components/Dialog";

interface IDialogProvider {
  children: React.ReactNode;
}

interface IDialogContext {
  openDialog: (dialogOptions: TDialog) => void;
  closeDialog: () => void;
}

type TDialog = {
  message?: string;
  placeholder?: string;
  onSubmit?: (value: string | boolean) => Promise<void> | void;
  submitLabel?: string;
  cancelLabel?: string;
  defaultValue?: string;
};

const DialogContext = createContext({} as IDialogContext);

function DialogProvider({ children }: IDialogProvider) {
  const [dialogOptions, setDialogOptions] = useState<TDialog>({} as TDialog);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleOpenDialog({
    defaultValue,
    message,
    placeholder,
    onSubmit,
    submitLabel,
    cancelLabel,
  }: TDialog) {
    setDialogOptions({
      defaultValue,
      message,
      placeholder,
      onSubmit,
      submitLabel,
      cancelLabel,
    });
    setIsOpen(true);
  }

  function handleCloseDialog() {
    setDialogOptions({} as TDialog);
    setIsOpen(false);
  }

  return (
    <DialogContext.Provider
      value={{
        closeDialog: handleCloseDialog,
        openDialog: handleOpenDialog,
      }}
    >
      {isOpen && <Dialog {...dialogOptions} onClose={handleCloseDialog} />}
      {children}
    </DialogContext.Provider>
  );
}

function useDialog() {
  return useContext(DialogContext);
}

export { DialogProvider, useDialog };
