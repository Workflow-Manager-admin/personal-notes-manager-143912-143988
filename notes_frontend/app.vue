<template>
  <div class="app-root">
    <BaseHeader />
    <div class="app-body">
      <BaseSidebar
        :categories="categories"
        :selectedCategory="selectedCategory"
        @select-category="selectCategory"
      />

      <main class="main-content">
        <div class="main-actions">
          <button class="btn btn-primary" @click="openCreateModal">
            + New Note
          </button>
          <input
            class="search"
            placeholder="Search notes..."
            v-model="search"
            @input="onSearch"
            type="search"
            aria-label="Search notes"
          />
        </div>
        <NotesList
          :notes="filteredNotes"
          @edit="openEditModal"
          @delete="deleteNote"
        />
      </main>
    </div>

    <NoteModal
      v-if="showModal"
      :note="editingNote"
      :categories="categories"
      @save="onModalSave"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

import BaseHeader from '~/components/BaseHeader.vue'
import BaseSidebar from '~/components/BaseSidebar.vue'
import NotesList from '~/components/NotesList.vue'
import NoteModal from '~/components/NoteModal.vue'

import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote as apiDeleteNote,
  fetchCategories,
} from '~/utils/api'

interface Note {
  id: string
  title: string
  content: string
  category: string
  updatedAt: string
}

const notes = ref<Note[]>([])
const categories = ref<string[]>([])
const selectedCategory = ref<string>('All')
const search = ref('')
const showModal = ref(false)
const editingNote = ref<Note | null>(null)

const filteredNotes = computed(() => {
  let result = notes.value
  if (selectedCategory.value && selectedCategory.value !== 'All') {
    result = result.filter(n => n.category === selectedCategory.value)
  }
  if (search.value?.trim()) {
    const q = search.value.toLowerCase()
    result = result.filter(
      n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q),
    )
  }
  // sort most recent first
  return result.slice().sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
})

const loadNotes = async () => {
  notes.value = await fetchNotes()
}
const loadCategories = async () => {
  let cats = await fetchCategories()
  categories.value = ['All', ...cats]
}

onMounted(async () => {
  await Promise.all([loadNotes(), loadCategories()])
})

function openCreateModal() {
  editingNote.value = null
  showModal.value = true
}
function openEditModal(note: Note) {
  editingNote.value = { ...note }
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
async function onModalSave(note: Note) {
  if (note.id) {
    await updateNote(note)
  } else {
    await createNote(note)
  }
  await loadNotes()
  showModal.value = false
}
async function deleteNote(id: string) {
  if (confirm('Delete this note?')) {
    await apiDeleteNote(id)
    await loadNotes()
  }
}
function selectCategory(cat: string) {
  selectedCategory.value = cat
}
function onSearch() {}
</script>

<style scoped>
.app-root {
  font-family: 'Inter', Arial, sans-serif;
  background: #fafbfc;
  min-height: 100vh;
  color: #222;
}
.app-body {
  display: flex;
  align-items: stretch;
  min-height: calc(100vh - 56px);
}
.main-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin-left: 0;
  padding: 2rem;
  border-left: 1px solid #ececec;
}
.main-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.search {
  flex: 1;
  max-width: 300px;
  border: 1px solid #d8dee9;
  background: #fafbfc;
  color: #2c2c2c;
  border-radius: 6px;
  padding: 0.4rem 0.7rem;
  font-size: 1rem;
  outline: none;
  transition: border 0.15s;
}
.search:focus {
  border-color: #1976D2;
}
.btn {
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.15rem;
  cursor: pointer;
  box-shadow: 0 2px 6px 0 #1976d220;
  transition: background 0.1s;
}
.btn-primary {
  background: #1976D2;
}
.btn-primary:hover,
.btn-primary:focus {
  background: #1669bb;
}
</style>
