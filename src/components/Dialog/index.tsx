import React, { useRef, useState, KeyboardEvent, ChangeEvent } from "react";
import {
  WrapperButtons,
  Button,
  Wrapper,
  Title,
  Error,
  Message,
  Input,
  Overlay,
} from "./styles";

type TDialog = {
  message?: string;
  placeholder?: string;
  onSubmit?: (value: string | boolean) => void;
  onClose: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  defaultValue?: string;
};

export const Dialog = ({
  defaultValue,
  message,
  placeholder,
  onClose,
  onSubmit,
  submitLabel = "Confirm",
  cancelLabel = "Cancel",
}: TDialog) => {
  const [error, setError] = useState<string>();
  const input = useRef() as React.MutableRefObject<HTMLInputElement>;

  function handleClickOnSubmit() {
    if (onSubmit) {
      if (placeholder) {
        const inputValue = input.current.value;

        if (!inputValue) {
          setError("You need to type something!");
          return null;
        }

        return onSubmit(inputValue);
      }

      return onSubmit(true);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (error) setError(undefined);
    e.target.value = e.target.value.replace(/([^\d\w-.])/g, "");
  }

  function handleInputKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleClickOnSubmit();
    }
  }

  return (
    <Overlay onClick={onClose}>
      <Wrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {message && <Message>{message}</Message>}
        {(placeholder || defaultValue) && (
          <Input
            autoFocus
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            ref={input}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        )}
        {error && <Error>{error}</Error>}
        <WrapperButtons>
          {onSubmit && <Button onClick={onClose}>{cancelLabel}</Button>}
          <Button onClick={handleClickOnSubmit}>{submitLabel}</Button>
        </WrapperButtons>
      </Wrapper>
    </Overlay>
  );
};
