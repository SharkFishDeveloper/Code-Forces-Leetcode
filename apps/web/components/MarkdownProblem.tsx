// "use client"

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { getFile } from '../app/functions/getMdfile';
import remarkGfm from 'remark-gfm'; 


const MarkdownProblem = ({ path }:{ path:string }) => {
const markdownd = `# This is a Markdown heading

Here is some paragraph text with *emphasis* and **strong emphasis**.

You can also include [links](https://www.example.com) and inline code snippets using \`code\` tags.`;
  const [markdown, setMarkdown] = useState('');
  const [error, setError] = useState('');

  useEffect(()=>{
    async  function fetchFile (){
    try {
        const resp =await getFile(path);
        setMarkdown(resp);
    } catch (error) {
        return alert("Cannot find mark down file !!")
    };
   }
   fetchFile();
  },[])


  return (
    <div>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <div className="prose prose-sm md:prose-lg lg:prose-xl mx-auto">
        <ReactMarkdown >
          {markdownd}
        </ReactMarkdown>
      </div>
      )}
    </div>
  );
};

export default MarkdownProblem;