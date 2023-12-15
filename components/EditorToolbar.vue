<script setup lang="ts">
const store = useMarkdownStore();
</script>


<template>
    <div class="flex justify-between bg-zinc-950 dark:bg-zinc-950 border-b border-zinc-900 px-4 py-2 mb-6">
        <div class="flex items-center space-x-2">
            <AsideExplorer side="right">
                <MarkdownTable :keys="['title']" />
            </AsideExplorer>
            <MarkdownActions :actions="['create','save', 'update', 'print', 'delete']" :markdown="store.markdown" />
        </div>
        <div class="flex items-center space-x-6">
            <ThemeSwitch />
            <UserOptions />
        </div>
    </div>
</template>