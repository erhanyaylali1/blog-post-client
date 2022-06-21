import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $getSelection } from 'lexical';
import { $generateNodesFromDOM } from '@lexical/html';
import { useEffect } from 'react';
import { $createImageNode } from './ImageNode';

const EditorStatePlugin = ({ value }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (value) setEditorState(editor);
  }, [value]);

  const setEditorState = (editor) => {
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(value, 'text/html');
      const elements = dom.querySelectorAll('body > :not(.editor-paragraph)');

      elements.forEach((el) => el.remove());

      const image = dom.querySelector('.imported-image');
      const src = image.firstElementChild.getAttribute('src');
      const alt = image.firstElementChild.getAttribute('alt');

      const nodes = $generateNodesFromDOM(editor, dom);

      const index = nodes.findIndex((node) => node.__type === 'linebreak');
      const imageNode = $createImageNode({ src, alt });

      nodes.splice(index, 1);
      const key = nodes[index - 1].__key;
      console.log(nodes, nodes.length);
      console.log(key);

      const root = $getRoot();
      root.select();
      const selection = $getSelection();
      selection.insertNodes(nodes);

      root.getChildAtIndex(index - 1).insertAfter(imageNode);
    });
  };

  return null;
};

export default EditorStatePlugin;
