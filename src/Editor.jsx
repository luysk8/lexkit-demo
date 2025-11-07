import {
  createEditorSystem,
  boldExtension,
  italicExtension,
  historyExtension,
  listExtension,
  linkExtension,
  alignExtension,
  imageExtension,
  RichText,
} from "@lexkit/editor";
import "./Editor.css";

// 1. Define your extensions (as const for type safety)
const extensions = [
  boldExtension,
  italicExtension,
  listExtension,
  linkExtension,
  historyExtension,
  alignExtension,
  imageExtension,
];

// 2. Create typed editor system
const { Provider, useEditor } = createEditorSystem();

// Toolbar Component - Shows basic text formatting buttons
function Toolbar() {
  const { commands, activeStates } = useEditor();

  const handleImageInsert = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      commands.insertImage({ src: url, alt: "User image" });
    }
  };

  return (
    <div className="basic-toolbar">
      <button
        onClick={() => commands.toggleBold()}
        className={activeStates.bold ? "active" : ""}
        title="Bold (Ctrl+B)"
      >
        Bold
      </button>
      <button
        onClick={() => commands.toggleItalic()}
        className={activeStates.italic ? "active" : ""}
        title="Italic (Ctrl+I)"
      >
        Italic
      </button>
      <button
        onClick={() => commands.toggleUnorderedList()}
        className={activeStates.unorderedList ? "active" : ""}
        title="Bullet List"
      >
        • List
      </button>
      <button
        onClick={() => commands.toggleOrderedList()}
        className={activeStates.orderedList ? "active" : ""}
        title="Numbered List"
      >
        1. List
      </button>
      <button
        onClick={() => commands.align('left')}
        className={activeStates.align === 'left' ? "active" : ""}
        title="Align Left"
      >
        Left
      </button>
      <button
        onClick={() => commands.align('center')}
        className={activeStates.align === 'center' ? "active" : ""}
        title="Align Center"
      >
        Center
      </button>
      <button
        onClick={() => commands.align('right')}
        className={activeStates.align === 'right' ? "active" : ""}
        title="Align Right"
      >
        Right
      </button>
      <button
        onClick={() => commands.align('justify')}
        className={activeStates.align === 'justify' ? "active" : ""}
        title="Align Justify"
      >
        Justify
      </button>
      <button onClick={handleImageInsert} title="Insert Image">
        Image
      </button>
      <button
        onClick={() => commands.undo()}
        disabled={!activeStates.canUndo}
        className={!activeStates.canUndo ? "disabled" : ""}
        title="Undo (Ctrl+Z)"
      >
        ↶ Undo
      </button>
      <button
        onClick={() => commands.redo()}
        disabled={!activeStates.canRedo}
        className={!activeStates.canRedo ? "disabled" : ""}
        title="Redo (Ctrl+Y)"
      >
        ↷ Redo
      </button>
    </div>
  );
}

// Main Component
export function Editor() {
  return (
    <Provider extensions={extensions}>
      <div className="basic-editor">
        <Toolbar />
        <RichText
          classNames={{
            container: "basic-editor-container",
            contentEditable: "basic-content",
            placeholder: "basic-placeholder",
          }}
          placeholder="Start writing your content here..."
        />
      </div>
    </Provider>
  );
}
