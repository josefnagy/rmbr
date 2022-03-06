<template>
  <div class="editor">
    <div v-if="frontEditor" class="controls">
      <button
        @click="
          focused === 'f'
            ? frontEditor.chain().focus().toggleBold().run()
            : backEditor.chain().focus().toggleBold().run()
        "
        class="btn btn-tertiary"
        :class="{ 'is-active': frontEditor.isActive('bold') }"
      >
        <img :src="boldIcon" alt="Bold" />
      </button>
      <button
        @click="
          focused === 'f'
            ? frontEditor.chain().focus().toggleItalic().run()
            : backEditor.chain().focus().toggleItalic().run()
        "
        class="btn btn-tertiary"
        :class="{ 'is-active': frontEditor.isActive('italic') }"
      >
        <img :src="italicIcon" alt="Italic" />
      </button>
      <button
        @click="
          focused === 'f'
            ? frontEditor.chain().focus().toggleStrike().run()
            : backEditor.chain().focus().toggleStrike().run()
        "
        class="btn btn-tertiary"
        :class="{ 'is-active': frontEditor.isActive('strike') }"
      >
        <img :src="strikethroughtIcon" alt="Strikethrought" />
      </button>
      <button
        @click="
          focused === 'f'
            ? frontEditor.chain().focus().toggleCode().run()
            : backEditor.chain().focus().toggleCode().run()
        "
        class="btn btn-tertiary"
        :class="{ 'is-active': frontEditor.isActive('code') }"
      >
        <img :src="codeLineIcon" alt="codeLineIcon" />
      </button>
      <button
        @click="
          focused === 'f'
            ? frontEditor.chain().focus().unsetAllMarks().run()
            : backEditor.chain().focus().unsetAllMarks().run()
        "
        class="btn btn-tertiary"
      >
        <img :src="clearMarksIcon" alt="clearMarksIcon" />
      </button>
      <button
        @click="
          focused === 'f'
            ? frontEditor.chain().focus().clearNodes().run()
            : backEditor.chain().focus().clearNodes().run()
        "
        class="btn btn-tertiary"
      >
        CN
      </button>
      <button
        @click="
          focused === 'f'
            ? frontEditor.chain().focus().setParagraph().run()
            : backEditor.chain().focus().setParagraph().run()
        "
        class="btn btn-tertiary"
        :class="{ 'is-active': frontEditor.isActive('paragraph') }"
      >
        <img :src="paragraphIcon" alt="paragraphIcon" />
      </button>
      <button
        @click="
          focused === 'f'
            ? frontEditor.chain().focus().toggleHeading({ level: 1 }).run()
            : backEditor.chain().focus().toggleHeading({ level: 1 }).run()
        "
        class="btn btn-tertiary"
        :class="{ 'is-active': frontEditor.isActive('heading', { level: 1 }) }"
      >
        <img :src="headingIcon" alt="Heading Icon" />
      </button>
      <button
        @click="
          focused === 'f'
            ? frontEditor.chain().focus().toggleBulletList().run()
            : backEditor.chain().focus().toggleBulletList().run()
        "
        class="btn btn-tertiary"
        :class="{ 'is-active': frontEditor.isActive('bulletList') }"
      >
        <img :src="listUnorderedIcon" alt="List unordered icon" />
      </button>
      <button
        @click="
          focused === 'f'
            ? frontEditor.chain().focus().toggleOrderedList().run()
            : backEditor.chain().focus().toggleOrderedList().run()
        "
        class="btn btn-tertiary"
        :class="{ 'is-active': frontEditor.isActive('orderedList') }"
      >
        <img :src="listOrderedIcon" alt="List ordered icon" />
      </button>
      <button
        @click="
          focused === 'f'
            ? frontEditor.chain().focus().toggleCodeBlock().run()
            : backEditor.chain().focus().toggleCodeBlock().run()
        "
        class="btn btn-tertiary"
        :class="{ 'is-active': frontEditor.isActive('codeBlock') }"
      >
        <img :src="codeBlockIcon" alt="codeBlockIcon" />
      </button>
      <button
        @click="
          focused === 'f'
            ? frontEditor.chain().focus().setHorizontalRule().run()
            : backEditor.chain().focus().setHorizontalRule().run()
        "
        class="btn btn-tertiary"
      >
        <img :src="separatorIcon" alt="separatorIcon" />
      </button>
      <button
        @click="
          focused === 'f'
            ? frontEditor.chain().focus().undo().run()
            : backEditor.chain().focus().undo().run()
        "
        class="btn btn-tertiary"
      >
        <img :src="undoIcon" alt="Undo Icon" />
      </button>
      <button
        @click="
          focused === 'f'
            ? frontEditor.chain().focus().redo().run()
            : backEditor.chain().focus().redo().run()
        "
        class="btn btn-tertiary"
      >
        <img :src="redoIcon" alt="Redo Icon" />
      </button>
    </div>
    <editor-content :editor="frontEditor" />
    <editor-content :editor="backEditor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: Object,
      default: () => ({ front: "", back: "" }),
    },
  },

  data() {
    return {
      frontEditor: null,
      backEditor: null,
      focused: "",
      boldIcon: require("@/assets/icons/bold.svg"),
      italicIcon: require("@/assets/icons/italic.svg"),
      paragraphIcon: require("@/assets/icons/paragraph.svg"),
      strikethroughtIcon: require("@/assets/icons/strikethrough.svg"),
      codeViewIcon: require("@/assets/icons/code-view.svg"),
      codeLineIcon: require("@/assets/icons/code-line.svg"),
      codeBlockIcon: require("@/assets/icons/code-box-line.svg"),
      undoIcon: require("@/assets/icons/arrow-go-back-line.svg"),
      redoIcon: require("@/assets/icons/arrow-go-forward-line.svg"),
      h1Icon: require("@/assets/icons/h-1.svg"),
      h2Icon: require("@/assets/icons/h-2.svg"),
      h3Icon: require("@/assets/icons/h-3.svg"),
      headingIcon: require("@/assets/icons/heading.svg"),
      listUnorderedIcon: require("@/assets/icons/list-unordered.svg"),
      listOrderedIcon: require("@/assets/icons/list-ordered.svg"),
      separatorIcon: require("@/assets/icons/separator.svg"),
      hardBreakIcon: require("@/assets/icons/page-separator.svg"),
      clearMarksIcon: require("@/assets/icons/format-clear.svg"),
    };
  },

  computed: {
    frontFocus() {
      return this.frontEditor ? this.frontEditor.isFocused : null;
    },
    backFocus() {
      return this.backEditor ? this.backEditor.isFocused : null;
    },
  },

  watch: {
    frontFocus(val) {
      val ? (this.focused = "f") : "";
    },

    backFocus(val) {
      val ? (this.focused = "b") : "";
    },
  },

  mounted() {
    this.frontEditor = new Editor({
      content: this.value.front,
      extensions: [StarterKit],
      onUpdate: () => {
        const newValue = { ...this.value, front: this.frontEditor.getHTML() };
        this.$emit("input", newValue);
      },
    });

    this.backEditor = new Editor({
      content: this.value.back,
      extensions: [StarterKit],
      onUpdate: () => {
        const newValue = { ...this.value, back: this.backEditor.getHTML() };
        this.$emit("input", newValue);
      },
    });
  },

  beforeDestroy() {
    this.frontEditor.destroy();
    this.backEditor.destroy();
  },
};
</script>
<style lang="scss">
.controls {
  margin-bottom: 2rem;
  button {
    background-color: transparent;
    border: none;
    padding: 2px 5px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  button:hover {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }
}

/* Basic editor styles */
.ProseMirror {
  border: 1px solid $black;
  width: 100%;
  height: 25rem;
  margin-bottom: 2rem;
  padding: 1rem;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }
  ul {
    list-style: circle;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}
</style>
