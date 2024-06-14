"use client"

import  { useRef } from "react";

import Editor from "@monaco-editor/react";

function CodeEditor({lang}:{lang:string}) {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }

  return (
    <Editor
      height="90vh"
      defaultLanguage="c++"
      defaultValue=""
      language={lang}
      onMount={handleEditorDidMount}
      theme="vs-dark"
      width="50vw"
    />
  );
}

export default CodeEditor;