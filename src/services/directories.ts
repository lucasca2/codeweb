import { api } from "../lib/axios";

export async function getProjects() {
  try {
    const { data } = await api.get("/directories");

    console.log(data);

    return data;
  } catch (e) {
    throw e;
  }
}

interface IDirectoryDTO {
  name: string;
  content?: string;
  isFolder: boolean;
  parentId?: string;
  lastModifier?: string;
}

export async function createDirectory(directory: IDirectoryDTO) {
  try {
    const { data } = await api.post("/directories", directory);

    console.log(data);

    return data;
  } catch (e) {
    throw e;
  }
}

interface IDirectoryUpdateDTO {
  id: string;
  name?: string;
  content?: string;
  isFolder?: boolean;
  parentId?: string;
  lastModifier?: string;
}

export async function updateDirectory(directory: IDirectoryUpdateDTO) {
  try {
    const { data } = await api.put(`/directories/${directory.id}`, directory);

    console.log(data);

    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteDirectory(id: string) {
  try {
    const { data } = await api.delete(`/directories/${id}`);

    console.log(data);

    return data;
  } catch (e) {
    throw e;
  }
}

export async function getDirectory(id: string) {
  try {
    const { data } = await api.get(`/directories/${id}`);

    if (!data.id) return null;

    return data;
  } catch (e) {
    throw e;
  }
}
