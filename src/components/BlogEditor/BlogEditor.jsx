import {
  Code,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatQuote,
  FormatStrikethrough,
  FormatUnderlined,
  Looks3,
  Looks4,
  Looks5,
  Looks6,
  LooksOne,
  LooksTwo,
} from "@mui/icons-material";
import {
  createPlateComponents,
  createPlateOptions,
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_LEFT,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_ALIGN_RIGHT,
} from "@udecode/plate";
import {
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import {
  createBlockquotePlugin,
  ELEMENT_BLOCKQUOTE,
} from "@udecode/plate-block-quote";
import {
  createCodeBlockPlugin,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
} from "@udecode/plate-code-block";
import {
  createHistoryPlugin,
  createReactPlugin,
  getPlatePluginType,
  Plate,
  useEventEditorId,
  useStoreEditorRef,
} from "@udecode/plate-core";
import { createAlignPlugin } from "@udecode/plate-alignment";
import { ToolbarAlign } from "@udecode/plate-alignment-ui";
import {
  HeadingToolbar,
  ToolbarElement,
  ToolbarMark,
} from "@udecode/plate-toolbar";
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  KEYS_HEADING,
} from "@udecode/plate-heading";
import { createParagraphPlugin } from "@udecode/plate-paragraph";
import { useState } from "react";
import { ToolbarCodeBlock } from "@udecode/plate-code-block-ui";
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from "@udecode/plate-break";

import { ELEMENT_TD } from "@udecode/plate-table";

const optionsSoftBreakPlugin = {
  rules: [
    { hotkey: "shift+enter" },
    {
      hotkey: "enter",
      query: {
        allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
      },
    },
  ],
};

const optionsExitBreakPlugin = {
  rules: [
    {
      hotkey: "mod+enter",
    },
    {
      hotkey: "mod+shift+enter",
      before: true,
    },
    {
      hotkey: "enter",
      query: {
        start: true,
        end: true,
        allow: KEYS_HEADING,
      },
    },
  ],
};
const pluginsBasic = [
  //editor
  createReactPlugin(), //withReact
  createHistoryPlugin(), //withHistory

  //elements
  createParagraphPlugin(), //paragraph element
  createBlockquotePlugin(), //blockquote element
  createCodeBlockPlugin(), //code block element
  createHeadingPlugin(), //heading elements

  // marks
  createBoldPlugin(), //bold mark
  createItalicPlugin(), //italic mark
  createUnderlinePlugin(), //underline mark
  createStrikethroughPlugin(), // strikethrough mark,
  createCodePlugin(), // code mark
  createAlignPlugin(), // align text

  createSoftBreakPlugin(optionsSoftBreakPlugin),
  createExitBreakPlugin(optionsExitBreakPlugin),
];

const components = createPlateComponents();
const options = createPlateOptions();

// Quick helper to create a block element with (marked) text
const createElement = (text, { type, mark } = {}) => {
  const leaf = { text };

  if (mark) {
    leaf[mark] = true;
  }

  return {
    type,
    children: [leaf],
  };
};

const initialValueBasicElements = [
  createElement("🧱 Elements", { type: ELEMENT_H1 }),
  createElement("🔥 Basic Elements", { type: ELEMENT_H2 }),
  createElement("These are the most common elements, known as blocks:"),
  createElement("Heading 1", { type: ELEMENT_H1 }),
  createElement("Heading 2", { type: ELEMENT_H2 }),
  createElement("Heading 3", { type: ELEMENT_H3 }),
  createElement("Heading 4", { type: ELEMENT_H4 }),
  createElement("Heading 5", { type: ELEMENT_H5 }),
  createElement("Heading 6", { type: ELEMENT_H6 }),
  createElement("Blockquote", { type: ELEMENT_BLOCKQUOTE }),
  {
    type: ELEMENT_CODE_BLOCK,
    children: [
      {
        type: ELEMENT_CODE_LINE,
        children: [
          {
            text: "const a = 'Hello';",
          },
        ],
      },
      {
        type: ELEMENT_CODE_LINE,
        children: [
          {
            text: "const b = 'World';",
          },
        ],
      },
    ],
  },
  createElement("💅 Marks", { type: ELEMENT_H1 }),
  createElement("💧 Basic Marks", { type: ELEMENT_H2 }),
  createElement(
    "The basic marks consist of text formatting such as bold, italic, underline, strikethrough, subscript, superscript, and code."
  ),
  createElement(
    "You can customize the type, the component and the hotkey for each of these."
  ),
  createElement("This text is bold.", { mark: MARK_BOLD }),
  createElement("This text is italic.", { mark: MARK_ITALIC }),
  createElement("This text is underlined.", {
    mark: MARK_UNDERLINE,
  }),
  {
    type: "ELEMENT_PARAGRAPH",
    children: [
      {
        text: "This text is bold, italic and underlined.",
        [MARK_BOLD]: true,
        [MARK_ITALIC]: true,
        [MARK_UNDERLINE]: true,
      },
    ],
  },
  createElement("This is a strikethrough text.", {
    mark: MARK_STRIKETHROUGH,
  }),
  createElement("This is an inline code.", { mark: MARK_CODE }),
];

const BlogEditor = () => {
  const editableProps = {
    placeholder: "Type…",
    style: {
      padding: "15px",
    },
  };

  const [debugValue, setDebugValue] = useState(null);
  const onChangeDebug = (newValue) => {
    setDebugValue(`value ${JSON.stringify(newValue)}`);
  };

  const ToolbarButtonsAlign = () => {
    const editor = useStoreEditorRef(useEventEditorId("focus"));

    return (
      <>
        <ToolbarElement
          type={getPlatePluginType(editor, ELEMENT_H1)}
          icon={<LooksOne />}
        />
        <ToolbarElement
          type={getPlatePluginType(editor, ELEMENT_H2)}
          icon={<LooksTwo />}
        />
        <ToolbarElement
          type={getPlatePluginType(editor, ELEMENT_H3)}
          icon={<Looks3 />}
        />
        <ToolbarElement
          type={getPlatePluginType(editor, ELEMENT_H4)}
          icon={<Looks4 />}
        />
        <ToolbarElement
          type={getPlatePluginType(editor, ELEMENT_H5)}
          icon={<Looks5 />}
        />
        <ToolbarElement
          type={getPlatePluginType(editor, ELEMENT_H6)}
          icon={<Looks6 />}
        />
        <ToolbarElement
          type={getPlatePluginType(editor, ELEMENT_BLOCKQUOTE)}
          icon={<FormatQuote />}
        />
        <ToolbarCodeBlock
          type={getPlatePluginType(editor, ELEMENT_CODE_BLOCK)}
          icon={<Code />}
        />

        <ToolbarAlign
          type={getPlatePluginType(editor, ELEMENT_ALIGN_LEFT)}
          icon={<FormatAlignLeft />}
        />
        <ToolbarAlign
          type={getPlatePluginType(editor, ELEMENT_ALIGN_CENTER)}
          icon={<FormatAlignCenter />}
        />
        <ToolbarAlign
          type={getPlatePluginType(editor, ELEMENT_ALIGN_RIGHT)}
          icon={<FormatAlignRight />}
        />
        <ToolbarAlign
          type={getPlatePluginType(editor, ELEMENT_ALIGN_JUSTIFY)}
          icon={<FormatAlignJustify />}
        />
        <ToolbarMark
          type={getPlatePluginType(editor, MARK_BOLD)}
          icon={<FormatBold />}
        />
        <ToolbarMark
          type={getPlatePluginType(editor, MARK_ITALIC)}
          icon={<FormatItalic />}
        />
        <ToolbarMark
          type={getPlatePluginType(editor, MARK_UNDERLINE)}
          icon={<FormatUnderlined />}
        />
        <ToolbarMark
          type={getPlatePluginType(editor, MARK_STRIKETHROUGH)}
          icon={<FormatStrikethrough />}
        />
      </>
    );
  };

  return (
    <>
      <HeadingToolbar>
        <ToolbarButtonsAlign />
      </HeadingToolbar>
      <Plate
        id="1"
        editableProps={editableProps}
        initialValue={initialValueBasicElements}
        onChange={onChangeDebug}
        plugins={pluginsBasic}
        components={components}
        options={options}
      >
        {debugValue}
      </Plate>
    </>
  );
};

export default BlogEditor;
