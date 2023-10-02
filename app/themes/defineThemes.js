import { loader } from "@monaco-editor/react";

const monacoThemes = {
  githublight: "GitHub Light",
  githubdark: "GitHub Dark",
  github: "GitHub",
};

const defineTheme = (theme) => {
  return new Promise((res) => {
    Promise.all([
      loader.init(),
      import(`@/app/themes/${monacoThemes[theme]}.json`),
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData);
      res();
    });
  });
};

export { defineTheme };
