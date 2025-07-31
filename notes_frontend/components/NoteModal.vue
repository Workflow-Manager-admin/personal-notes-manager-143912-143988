<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ note && note.id ? 'Edit Note' : 'New Note' }}</h2>
      </div>
      <form @submit.prevent="onSave">
        <div class="modal-body">
          <div class="form-group">
            <label for="note-title">Title</label>
            <input
              id="note-title"
              v-model="draft.title"
              maxlength="80"
              required
              autofocus
              type="text"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="note-category">Category</label>
            <select
              id="note-category"
              v-model="draft.category"
              class="form-control"
              required
            >
              <option disabled value="">Select or enter new...</option>
              <option v-for="cat in catOpts" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
            <input
              v-if="draft.category === 'Other'"
              v-model="draft.category"
              type="text"
              class="form-control"
              placeholder="Enter category"
            />
          </div>
          <div class="form-group">
            <label for="note-content">Content</label>
            <textarea
              id="note-content"
              v-model="draft.content"
              rows="7"
              class="form-control"
              style="resize: vertical;"
              maxlength="2000"
              required
            ></textarea>
          </div>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" @click="close">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            {{ note && note.id ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  note: {
    id?: string
    title: string
    content: string
    category: string
    updatedAt?: string
  } | null
  categories: string[]
}>()
const emit = defineEmits(['close', 'save'])

const draft = ref({
  id: '',
  title: '',
  content: '',
  category: '',
})

const catOpts = computed(() => {
  const arr = (props.categories || []).filter((c) => c && c !== 'All')
  if (!arr.includes('Other')) arr.push('Other')
  return arr
})

watch(
  () => props.note,
  (val) => {
    if (val) {
      draft.value = { ...val }
    } else {
      draft.value = { id: '', title: '', content: '', category: '' }
    }
  },
  { immediate: true }
)

function close() {
  emit('close')
}
function onSave() {
  if (!draft.value.title || !draft.value.content || !draft.value.category) return
  emit('save', { ...draft.value })
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  z-index: 300;
  inset: 0;
  background: #222f56a0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #fff;
  border-radius: 9px;
  box-shadow: 0 7px 64px #1976d23d;
  max-width: 530px;
  width: 97vw;
  padding: 0 0 1rem 0;
  animation: appear 0.2s cubic-bezier(.17,.67,.83,.67);
}
@keyframes appear {
  from { transform: translateY(24px) scale(0.98);opacity:0.7;}
  to   { transform: none;opacity:1;}
}
.modal-header {
  background: #1976d2;
  padding: 1.2rem 1.5rem 1rem 1.5rem;
  margin-bottom: 0.6rem;
  border-radius: 9px 9px 0 0;
  color: #fff;
}
.modal-header h2 {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
}
.modal-body {
  padding: 0.85rem 1.5rem 0.2rem 1.5rem;
}
.form-group {
  margin-bottom: 1.2rem;
}
label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.32rem;
  color: #222;
}
.form-control {
  width: 100%;
  border: 1px solid #d8dee9;
  border-radius: 6px;
  background: #fafbfc;
  padding: 0.5rem 0.7rem;
  font-size: 1rem;
}
.form-control:focus {
  outline: 2px solid #1976D2aa;
  border-color: #1976D2;
}
.modal-actions {
  padding: 0.2rem 1.5rem 0.9rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.4rem;
}
.btn {
  font-weight: 600;
  border-radius: 5px;
  border: none;
  padding: 0.4rem 1.25rem;
  cursor: pointer;
}
.btn-primary {
  background: #1976d2;
  color: #fff;
}
.btn-primary:hover { background: #1557a0; }
.btn-secondary {
  background: #ececec;
  color: #222;
}
.btn-secondary:hover {
  background: #ededed;
}
</style>
