import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $getSelection } from 'lexical';
import { $generateNodesFromDOM } from '@lexical/html';
import { useEffect } from 'react';

const EditorStatePlugin = ({ value }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (value) setEditorState(editor);
  }, [value]);

  const setEditorState = (editor) => {
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(value, 'text/html');
      const nodes = $generateNodesFromDOM(editor, dom);
      $getRoot().select();
      const selection = $getSelection();
      selection.insertNodes(nodes);
    });
  };

  return null;
};

export default EditorStatePlugin;
