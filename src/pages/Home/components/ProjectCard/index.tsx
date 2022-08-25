import { MdDriveFolderUpload, MdFolderShared } from "react-icons/all";
import { MdClose } from "react-icons/md";

import { Wrapper, WrapperLabel, RemoveButton } from "./styles";
import { TDirectory } from "../../../Editor/hooks/useDirectories";

type TProjectCard = {
  project: TDirectory;
  onClickProject: (project: TDirectory) => void;
  onDeleteProject: (project: TDirectory) => void;
};

export function ProjectCard({
  project,
  onDeleteProject,
  onClickProject,
}: TProjectCard) {
  return (
    <Wrapper onClick={() => onClickProject(project)}>
      <WrapperLabel>
        <MdDriveFolderUpload size={22} />
        <span>{project.name}</span>
      </WrapperLabel>
      <RemoveButton
        onClick={(e) => {
          e.stopPropagation();
          onDeleteProject(project);
        }}
      >
        remove
        <MdClose />
      </RemoveButton>
    </Wrapper>
  );
}
