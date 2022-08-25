import { Wrapper, Action, WrapperIcon } from "./styles";
import { MdKeyboardArrowLeft, MdSave } from "react-icons/all";

type TFileActions = {
  onClickGoBackProjects: () => void;
  onClickSaveFiles: () => void;
  thereAreFilesToSave: boolean;
};

export function FileActions({
  onClickGoBackProjects,
  onClickSaveFiles,
  thereAreFilesToSave,
}: TFileActions) {
  return (
    <Wrapper>
      <Action onClick={onClickGoBackProjects}>
        <WrapperIcon>
          <MdKeyboardArrowLeft size={20} />
        </WrapperIcon>
        Go back to projects
      </Action>
      {thereAreFilesToSave && (
        <Action onClick={onClickSaveFiles}>
          <WrapperIcon>
            <MdSave size={14} />
          </WrapperIcon>
          Save all files
        </Action>
      )}
    </Wrapper>
  );
}
