import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { LexicalNestedComposer } from '@lexical/react/LexicalNestedComposer';
import { mergeRegister } from '@lexical/utils';
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  createEditor,
  DecoratorNode,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
} from 'lexical';
import * as React from 'react';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import Placeholder from '../ui/Placeholder';
import ImageResizer from '../ui/ImageResizer';

const imageCache = new Set();

function useSuspenseImage(src) {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
  }
}

function LazyImage({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  maxWidth,
}) {
  useSuspenseImage(src);
  return (
    <img
      className={className}
      src={src}
      alt={altText}
      ref={imageRef}
      style={{
        height,
        maxWidth,
        width,
      }}
      draggable="false"
    />
  );
}

function ImageComponent({
  style,
  src,
  altText,
  nodeKey,
  width,
  height,
  maxWidth,
  resizable,
  showCaption,
  caption,
}) {
  const ref = useRef(null);
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = useState(false);
  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState(null);

  const onDelete = useCallback(
    (payload) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isImageNode(node)) {
          node.remove();
        }
        setSelected(false);
      }
      return false;
    },
    [isSelected, nodeKey, setSelected]
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        setSelection(editorState.read(() => $getSelection()));
      }),
      editor.registerCommand(
        CLICK_COMMAND,
        (payload) => {
          const event = payload;

          if (isResizing) {
            return true;
          }
          if (event.target === ref.current) {
            if (!event.shiftKey) {
              clearSelection();
            }
            setSelected(!isSelected);
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      )
    );
  }, [
    clearSelection,
    editor,
    isResizing,
    isSelected,
    nodeKey,
    onDelete,
    setSelected,
  ]);

  const setShowCaption = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.setShowCaption(true);
      }
    });
  };

  const onResizeEnd = (nextWidth, nextHeight) => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false);
    }, 200);

    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.setWidthAndHeight(nextWidth, nextHeight);
      }
    });
  };

  const onResizeStart = () => {
    setIsResizing(true);
  };

  const draggable = isSelected && $isNodeSelection(selection);
  const isFocused = $isNodeSelection(selection) && (isSelected || isResizing);

  return (
    <Suspense fallback={null}>
      <>
        <div
          draggable={draggable}
          style={style}
          className="editor-paragraph imported-image mw-100">
          <LazyImage
            className={isFocused ? 'focused' : null}
            src={src}
            altText={altText}
            imageRef={ref}
            width={width}
            height={height}
            maxWidth={maxWidth}
          />
          {resizable && isFocused && (
            <ImageResizer
              showCaption={showCaption}
              setShowCaption={setShowCaption}
              editor={editor}
              imageRef={ref}
              maxWidth={maxWidth}
              onResizeStart={onResizeStart}
              onResizeEnd={onResizeEnd}
            />
          )}
        </div>
        {showCaption && (
          <div className="image-caption-container">
            <LexicalNestedComposer initialEditor={caption}>
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="ImageNode__contentEditable" />
                }
                placeholder={
                  <Placeholder className="ImageNode__placeholder">
                    Enter a caption...
                  </Placeholder>
                }
                initialEditorState={null}
              />
            </LexicalNestedComposer>
          </div>
        )}
      </>
    </Suspense>
  );
}

export class ImageNode extends DecoratorNode {
  __src;
  __altText;
  __width;
  __height;
  __maxWidth;
  __showCaption;
  __caption;

  static getType() {
    return 'image';
  }

  static clone(node) {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__maxWidth,
      node.__width,
      node.__height,
      node.__showCaption,
      node.__caption,
      node.__key
    );
  }

  static importJSON(serializedNode) {
    const { altText, height, width, maxWidth, caption, src, showCaption } =
      serializedNode;
    const node = $createImageNode({
      altText,
      height,
      maxWidth,
      showCaption,
      src,
      width,
    });
    const nestedEditor = node.__caption;
    const editorState = nestedEditor.parseEditorState(caption.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return node;
  }

  constructor(
    src,
    altText,
    maxWidth,
    width,
    height,
    showCaption,
    caption,
    key
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__width = width || 'inherit';
    this.__height = height || 'inherit';
    this.__showCaption = showCaption || false;
    this.__caption = caption || createEditor();
  }

  exportJSON() {
    return {
      altText: this.getAltText(),
      caption: this.__caption.toJSON(),
      height: this.__height === 'inherit' ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      showCaption: this.__showCaption,
      src: this.getSrc(),
      type: 'image',
      version: 1,
      width: this.__width === 'inherit' ? 0 : this.__width,
    };
  }

  setWidthAndHeight() {
    const writable = this.getWritable();
    writable.__width = this.width;
    writable.__height = this.height;
  }

  setShowCaption(showCaption) {
    const writable = this.getWritable();
    writable.__showCaption = showCaption;
  }

  // View

  createDOM(config) {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM() {
    return false;
  }

  getSrc() {
    return this.__src;
  }

  getAltText() {
    return this.__altText;
  }

  decorate() {
    return (
      <ImageComponent
        style={{ width: 'max-content', maxWidth: '100%', position: 'relative' }}
        src={this.__src}
        altText={this.__altText}
        width={this.__width}
        height={this.__height}
        maxWidth={this.__maxWidth}
        nodeKey={this.getKey()}
        showCaption={this.__showCaption}
        caption={this.__caption}
        resizable={true}
      />
    );
  }
}

export function $createImageNode({
  altText,
  height,
  maxWidth = '100%',
  src,
  width,
  showCaption,
  caption,
  key,
}) {
  return new ImageNode(
    src,
    altText,
    maxWidth,
    width,
    height,
    showCaption,
    caption,
    key
  );
}

export function $isImageNode(node) {
  return node instanceof ImageNode;
}
