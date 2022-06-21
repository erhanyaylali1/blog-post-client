import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from 'lexical';

import { useEffect } from 'react';
import { $createImageNode } from './ImageNode';

export const INSERT_IMAGE_COMMAND = createCommand();

export default function ImagesPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        console.log(payload);
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          if (selection?.anchor?.getNode()) {
            selection.insertParagraph();
          }
          const imageNode = $createImageNode(payload);
          console.log(imageNode);
          selection.insertNodes([imageNode]);
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
