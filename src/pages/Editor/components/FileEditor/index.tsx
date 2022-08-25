import { Wrapper } from "./styles";
import Editor, { Monaco } from "@monaco-editor/react";
import { useEffect, useMemo, useState } from "react";

import { TDirectory } from "../FileTree";
import myTheme from "./myTheme.json";

type TFileEditor = {
  selectedFile?: TDirectory;
  selectedDraftFile?: TDirectory | null;
  handleChangeDraftFiles: (content?: string) => void;
};

export function FileEditor({
  selectedFile,
  selectedDraftFile,
  handleChangeDraftFiles,
}: TFileEditor) {
  const [languages, setLanguages] = useState<any[]>();

  function handleEditorWillMount(monaco: Monaco) {
    monaco.editor.defineTheme("myTheme", myTheme as any);

    setLanguages(monaco.languages.getLanguages());
  }

  const language = useMemo(() => {
    if (languages && selectedFile) {
      const extension = selectedFile.name.replace(/(.*)(\..[^.]*)$/g, "$2");
      const languageSelected: any = languages.find((lang: any) =>
        lang.extensions?.includes?.(extension)
      );

      return languageSelected?.id || "text";
    }
  }, [languages, selectedFile]);

  if (!selectedFile) return null;

  return (
    <Wrapper>
      <Editor
        theme={"myTheme"}
        width={"100%"}
        height="100%"
        language={language}
        value={selectedDraftFile?.content || selectedFile.content}
        onChange={(value) => handleChangeDraftFiles(value)}
        beforeMount={handleEditorWillMount}
      />
    </Wrapper>
  );
}
