<script setup lang="ts">
// @ts-nocheck

const store = useMarkdownStore();

const markdown: Ref<string | null> = ref("");

const textarea = ref();
const lineNumbers = ref([""]);

function updateLineNumbers(content: string) {
  const numberOfLines = content?.split("\n")?.length;
  lineNumbers.value = Array(numberOfLines).fill("");
}

function insertTab(event: Event) {
  if (event.key === "Tab") {
    const start = textarea.value.selectionStart;
    const end = textarea.value.selectionEnd;

    markdown.value = markdown.value.substring(0, start) + "\t" + markdown.value.substring(end);

    textarea.value.focus();

    event.preventDefault();
  }
}

onMounted(() => {
  markdown.value = store.markdown.content;
  updateLineNumbers(store.markdown.content);
});

function handleEditorChange(event: Event) {
  store.markdown = { ...store.markdown, content: event.target.value };
  updateLineNumbers(event.target.value);
}
</script>

<template>
  <EditorSection title="Markdown">
    <div class="flex gap-2 mt-4">
      <div class="line-numbers">
        <span
          class="before:dark:text-white font-semibold text-gray-600 text-sm before:block before:content-[counter(linenumber)] leading-[32px]"
          v-for="(_, index) in lineNumbers"
          :key="index"
        >
        </span>
      </div>
      <textarea
        class="dark:text-white w-full outline-none resize-none bg-transparent p-0 border-0 text-sm font-mono overflow-hidden leading-8"
        v-model="markdown"
        ref="textarea"
        @input="handleEditorChange"
        @keydown.tab.prevent="insertTab"
      >
      </textarea>
    </div>
  </EditorSection>
</template>
<style scoped>
.line-numbers {
  width: 20px;
  font-size: 1rem;
  text-align: right;
  height: 100%;
}

.line-numbers span {
  counter-increment: linenumber;
}
</style>
