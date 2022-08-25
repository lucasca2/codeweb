import React, { ChangeEvent, useEffect, useState } from "react";

import {
  Wrapper,
  WrapperSearch,
  Input,
  Button,
  WrapperProjects,
  WrapperNoProjectsFound,
} from "./styles";
import {
  createDirectory,
  deleteDirectory,
  getProjects,
} from "../../services/directories";
import { ProjectCard } from "./components/ProjectCard";
import { TDirectory } from "../Editor/hooks/useDirectories";
import { useDialog } from "../../hooks/useDialog";
import { useNavigate } from "react-router-dom";
import { MdSentimentVeryDissatisfied } from "react-icons/all";

export const Home = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [projects, setProjects] = useState<TDirectory[]>([]);
  const [projectsFiltered, setProjectsFiltered] = useState<TDirectory[]>([]);
  const { openDialog, closeDialog } = useDialog();

  async function getInitialData() {
    const data = await getProjects();

    setProjects(data);
  }

  useEffect(() => {
    getInitialData();
  }, []);

  function handleDeleteProject(project: TDirectory) {
    openDialog({
      message: `Would you like to delete "${project.name}"?`,
      onSubmit: async () => {
        await deleteDirectory(project.id);

        await getInitialData();

        closeDialog();
      },
    });
  }

  function handleGoToProject(project: TDirectory) {
    navigate(`/project/${project.id}`);
  }

  function handleCreateProject() {
    openDialog({
      message: "Create a new project",
      placeholder: "Name a project",
      onSubmit: async (value) => {
        const project = await createDirectory({
          name: value as string,
          isFolder: true,
          lastModifier: "System",
        });

        await getInitialData();

        closeDialog();

        navigate(`/project/${project.id}`);
      },
    });
  }

  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    e.target.value = e.target.value.replace(/([^\d\w-.])/g, "");

    setSearchValue(e.target.value);
  }

  useEffect(() => {
    if (!searchValue) {
      setProjectsFiltered(projects);
    } else {
      setProjectsFiltered(
        projects.filter((proj) =>
          proj.name.toUpperCase().includes(searchValue.toUpperCase())
        )
      );
    }
  }, [searchValue, projects]);

  return (
    <Wrapper>
      <WrapperSearch>
        <Input
          onChange={handleChangeSearch}
          value={searchValue}
          placeholder={"Search your projects..."}
        />
        <Button onClick={handleCreateProject}>New Project</Button>
      </WrapperSearch>
      <WrapperProjects>
        {projectsFiltered.map((project) => (
          <ProjectCard
            project={project}
            onClickProject={handleGoToProject}
            onDeleteProject={handleDeleteProject}
          />
        ))}
        {projectsFiltered.length === 0 && (
          <WrapperNoProjectsFound>
            No projects with that name!
            <MdSentimentVeryDissatisfied size={56} />
          </WrapperNoProjectsFound>
        )}
      </WrapperProjects>
    </Wrapper>
  );
};
