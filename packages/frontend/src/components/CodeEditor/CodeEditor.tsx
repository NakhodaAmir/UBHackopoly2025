import { Editor } from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  readOnly?: boolean;
}

export default function CodeEditor({ value, onChange, readOnly = false }: CodeEditorProps) {
  const defaultCode = `// Write your bot's algorithm here
// Example:
if (enemy.health < 50) {
  attack(enemy);
} else {
  defend();
}

for (let i = 0; i < 3; i++) {
  move('forward');
}
`;

  return (
    <div className="h-full border border-slate-600 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={value || defaultCode}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}
