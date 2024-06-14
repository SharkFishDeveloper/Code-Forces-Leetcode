import  { useState, useRef } from 'react';
import { EditorView } from '@codemirror/view';
// import { basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import CodeMirror from '@uiw/react-codemirror';

const MyCodeEditor = () => {
//   const codeRef = useRef(null);
  const [code, setCode] = useState("// Your code here");

//   const editor = useRef(null);

  const handleCodeChange = (value) => {
    setCode(value);
  };

  return <CodeMirror value={code} height="200px" extensions={cpp}
  autoFocus
  onChange={handleCodeChange} />
};

export default MyCodeEditor;
