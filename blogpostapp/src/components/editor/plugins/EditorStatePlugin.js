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
      if (value) {
        editor.update(() => {
          debugger;
          const parser = new DOMParser();
          const dom = parser.parseFromString(value, 'text/html');
    
          const elements = dom.querySelectorAll(
            'body > :not(:not(span).editor-paragraph,.editor-image)'
          );
    
          elements?.forEach((el) => el.remove());
    
          const images = [];
    
          const bodyChilds = dom.querySelector('body').childNodes;
    
          const indexes = [];

          bodyChilds.forEach((child, index) => {
            if (
              child.classList.contains('editor-image') ||
              child.classList.contains('imported-image')
            ) {
              images.push(child);
              indexes.push(index + indexes.length);
              child.remove();
            }
          });
          const nodes = $generateNodesFromDOM(editor, dom);
    
          const root = $getRoot();
          root.select();
          const selection = $getSelection();
          selection.insertNodes(nodes);
    
          if (images.length) {
            images.forEach((image, index) => {
              console.log(image);
              const src = image.getElementsByTagName('img')[0].getAttribute('src');
              const alt = image.getElementsByTagName('img')[0].getAttribute('alt');
              const imageNode = $createImageNode({ src, alt });
              root.getChildAtIndex(indexes[index] - 1).insertAfter(imageNode);
            });
          }
        });
      }
    });
  };

  return null;
};

export default EditorStatePlugin;
