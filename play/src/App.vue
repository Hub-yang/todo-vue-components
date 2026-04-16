<script setup lang="ts">
import { ref } from 'vue'
import { TButton } from 'todo-vue-components'

const loading = ref(false)
const clickLog = ref<string[]>([])
const exposedBtn = ref<InstanceType<typeof TButton> | null>(null)

function simulateAsync() {
  loading.value = true
  setTimeout(() => (loading.value = false), 2000)
}

function onButtonClick(event: MouseEvent) {
  const tag = (event.currentTarget as HTMLElement).tagName
  clickLog.value.unshift(`[${new Date().toLocaleTimeString()}] target: <${tag.toLowerCase()}>`)
  if (clickLog.value.length > 5) clickLog.value.pop()
}

function focusViaRef() {
  // Access the exposed native element ref from TButton
  ;(exposedBtn.value as unknown as { ref: HTMLElement })?.ref?.focus()
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 py-10 space-y-10 font-sans text-gray-800">
    <header>
      <h1 class="text-3xl font-bold text-gray-900">TButton — API Playground</h1>
      <p class="mt-1 text-gray-400 text-sm">todo-vue-components / packages/components/src/button</p>
    </header>

    <!-- ── type ───────────────────────────────────────────────────── -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-400">type</h2>
      <div class="flex flex-wrap gap-3">
        <TButton>default</TButton>
        <TButton type="primary">primary</TButton>
        <TButton type="success">success</TButton>
        <TButton type="warning">warning</TButton>
        <TButton type="danger">danger</TButton>
        <TButton type="info">info</TButton>
      </div>
    </section>

    <!-- ── size ───────────────────────────────────────────────────── -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-400">size</h2>
      <div class="flex flex-wrap items-center gap-3">
        <TButton type="primary" size="large">large</TButton>
        <TButton type="primary" size="default">default</TButton>
        <TButton type="primary" size="small">small</TButton>
      </div>
    </section>

    <!-- ── plain ──────────────────────────────────────────────────── -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-400">plain</h2>
      <div class="flex flex-wrap gap-3">
        <TButton plain>default</TButton>
        <TButton type="primary" plain>primary</TButton>
        <TButton type="success" plain>success</TButton>
        <TButton type="warning" plain>warning</TButton>
        <TButton type="danger" plain>danger</TButton>
        <TButton type="info" plain>info</TButton>
      </div>
    </section>

    <!-- ── round / circle ─────────────────────────────────────────── -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-400">round / circle</h2>
      <div class="flex flex-wrap items-center gap-3">
        <TButton type="primary" round>round</TButton>
        <TButton type="success" round>round success</TButton>
        <TButton type="primary" circle aria-label="Add item" size="large">
          <template #icon>＋</template>
        </TButton>
        <TButton type="danger" circle aria-label="Delete">
          <template #icon>✕</template>
        </TButton>
        <TButton type="info" circle aria-label="Info" size="small">
          <template #icon>ℹ</template>
        </TButton>
      </div>
    </section>

    <!-- ── text / link ────────────────────────────────────────────── -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-400">text / link</h2>
      <div class="flex flex-wrap gap-3">
        <TButton text>text default</TButton>
        <TButton type="primary" text>text primary</TButton>
        <TButton type="danger" text>text danger</TButton>
        <TButton link>link default</TButton>
        <TButton type="primary" link>link primary</TButton>
      </div>
    </section>

    <!-- ── disabled ───────────────────────────────────────────────── -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-400">disabled</h2>
      <div class="flex flex-wrap gap-3">
        <TButton disabled>default</TButton>
        <TButton type="primary" disabled>primary</TButton>
        <TButton type="success" plain disabled>plain</TButton>
        <TButton type="danger" text disabled>text</TButton>
        <TButton type="warning" round disabled>round</TButton>
      </div>
    </section>

    <!-- ── loading ────────────────────────────────────────────────── -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-400">loading</h2>
      <div class="flex flex-wrap items-center gap-3">
        <TButton type="primary" :loading="loading" @click="simulateAsync">
          {{ loading ? 'Loading…' : 'Click to load (2 s)' }}
        </TButton>
        <TButton type="success" loading>always loading</TButton>
        <TButton type="warning" loading size="small">small</TButton>
        <TButton type="danger" loading round>round</TButton>
      </div>
    </section>

    <!-- ── icon slots ─────────────────────────────────────────────── -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-400">icon slots (#icon / #icon-right)</h2>
      <div class="flex flex-wrap gap-3">
        <TButton type="primary">
          <template #icon>⬇</template>
          Download
        </TButton>
        <TButton type="success">
          Next
          <template #icon-right>→</template>
        </TButton>
        <TButton type="warning">
          <template #icon>★</template>
          Favorite
          <template #icon-right>♥</template>
        </TButton>
        <!-- Loading replaces #icon slot automatically -->
        <TButton type="info" loading>
          <template #icon>⬇</template>
          Loading hides icon
        </TButton>
      </div>
    </section>

    <!-- ── block ──────────────────────────────────────────────────── -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-400">block</h2>
      <TButton type="primary" block>Full-width block button</TButton>
      <TButton type="success" block round>Full-width + round</TButton>
    </section>

    <!-- ── tag (polymorphic) ──────────────────────────────────────── -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-400">tag (polymorphic)</h2>
      <div class="flex flex-wrap gap-3">
        <TButton type="primary">button (default)</TButton>
        <TButton type="success" tag="a" href="#top">rendered as &lt;a&gt;</TButton>
        <TButton type="info" tag="div" role="button" tabindex="0">rendered as &lt;div&gt;</TButton>
      </div>
    </section>

    <!-- ── nativeType ─────────────────────────────────────────────── -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-400">nativeType (in a form)</h2>
      <form class="flex gap-3" @submit.prevent="onButtonClick">
        <TButton native-type="submit" type="primary">submit</TButton>
        <TButton native-type="reset" type="warning">reset</TButton>
        <TButton native-type="button">button</TButton>
      </form>
    </section>

    <!-- ── @click event log ───────────────────────────────────────── -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-400">@click emit</h2>
      <div class="flex flex-wrap gap-3">
        <TButton type="primary" @click="onButtonClick">log click</TButton>
        <TButton type="primary" disabled @click="onButtonClick">disabled → no emit</TButton>
      </div>
      <div class="mt-2 rounded-md bg-gray-50 border border-gray-200 p-3 min-h-12">
        <ul v-if="clickLog.length" class="text-xs text-gray-500 space-y-1 font-mono">
          <li v-for="entry in clickLog" :key="entry">{{ entry }}</li>
        </ul>
        <p v-else class="text-xs text-gray-400">Events appear here.</p>
      </div>
    </section>

    <!-- ── defineExpose / template ref ───────────────────────────── -->
    <section class="space-y-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-400">defineExpose (template ref)</h2>
      <div class="flex gap-3">
        <TButton ref="exposedBtn" type="default">Target button</TButton>
        <TButton type="primary" @click="focusViaRef">
          <template #icon>⌖</template>
          Focus via ref
        </TButton>
      </div>
      <p class="text-xs text-gray-400">
        TButton exposes <code class="bg-gray-100 px-1 rounded">{ ref: HTMLElement }</code>.
        Clicking the right button calls <code class="bg-gray-100 px-1 rounded">.focus()</code> on the left one.
      </p>
    </section>
  </div>
</template>
