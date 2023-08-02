import React, {useState} from 'react'
import '../styles/CodeEditor.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/ayu-dark.css'
/* import 'codemirror/hint/html-hint.js'
import 'codemirror/hint/css-hint.js'
import 'codemirror/hint/xml-hint.js' */
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/htmlmixed/htmlmixed'
import { Controlled as ControlledEditor } from 'react-codemirror2'

export default function CodeEditor({language, displayName, value, onChange}) {

  const [open, setOpen] = useState(true)

  function handleChange(editor, data, value) {
    onChange(value)
  }

  return (
    <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          hint: true,
          mode: language,
          theme: 'ayu-dark',
          lineNumbers: true,
          autoclosetags: true,
          autoCloseBrackets: true,
        }}
      />
  )
}
