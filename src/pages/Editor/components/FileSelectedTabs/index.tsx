import { Wrapper, WrapperTab } from "./styles";
import { TDirectory } from "../FileTree";
import { MdClose } from "react-icons/md";

type FileSelectedTabs = {
  openFiles: TDirectory[];
  onOpenAndCloseFile: (file: TDirectory) => void;
  onSelectFile: (file: TDirectory) => void;
  selectedFile?: TDirectory;
};

export const FileSelectedTabs = ({
  openFiles,
  onOpenAndCloseFile,
  onSelectFile,
  selectedFile,
}: FileSelectedTabs) => {
  return (
    <Wrapper>
      {openFiles.map((file) => (
        <WrapperTab
          onClick={() => onSelectFile(file)}
          isSelected={selectedFile?.id === file.id}
        >
          <span>{file.name}</span>
          <MdClose
            onClick={(e) => {
              e.stopPropagation();
              onOpenAndCloseFile(file);
            }}
          />
        </WrapperTab>
      ))}
    </Wrapper>
  );
};
