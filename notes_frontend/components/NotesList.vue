<template>
  <section class="notes-list">
    <div v-if="!notes.length" class="empty">
      No notes found in this category or search.
    </div>
    <ul v-else>
      <li v-for="note in notes" :key="note.id" class="note-item">
        <div>
          <div class="note-meta">
            <span class="note-category">{{ note.category }}</span>
            <span class="note-date">{{ dateFormat(note.updatedAt) }}</span>
          </div>
          <div class="note-title">{{ note.title }}</div>
          <div class="note-content" v-html="excerpt(note.content)"></div>
        </div>
        <div class="note-actions">
          <button class="btn btn-accent" @click="$emit('edit', note)">
            Edit
          </button>
          <button class="btn btn-danger" @click="$emit('delete', note.id)">
            Delete
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  notes: {
    id: string
    title: string
    content: string
    category: string
    updatedAt: string
  }[]
}>()

function excerpt(content: string) {
  const plain = content.replace(/<[^>]+>/g, '')
  if (plain.length > 120) {
    return plain.slice(0, 120) + '...'
  }
  return plain
}

function dateFormat(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleString()
}
</script>

<style scoped>
.notes-list {
  width: 100%;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.note-item {
  display: flex;
  align-items: flex-start;
  background: #f9fafd;
  margin-bottom: 1.1rem;
  border-radius: 7px;
  box-shadow: 0 2px 9px #4242420a;
  padding: 1rem 1.2rem;
  justify-content: space-between;
  border: 1px solid #ececec;
}

.note-meta {
  font-size: 0.9rem;
  color: #424242cc;
  margin-bottom: 0.22rem;
  display: flex;
  gap: 1.5rem;
}
.note-category {
  color: #1976d2;
  font-weight: 700;
}
.note-title {
  font-size: 1.22rem;
  color: #222;
  font-weight: 700;
  margin: 0.12rem 0 0.25rem 0;
}
.note-content {
  font-size: 1.01rem;
  color: #333;
}
.note-actions {
  display: flex;
  gap: 0.55rem;
  align-items: flex-start;
}
.btn {
  font-size: 0.97rem;
  border-radius: 5px;
  font-weight: 600;
  border: none;
  padding: 0.35rem 0.95rem;
  margin-left: 0.2rem;
  cursor: pointer;
  transition: background 0.13s;
}
.btn-accent {
  background: #ff5722;
  color: #fff;
}
.btn-accent:hover {
  background: #e44d1f;
}
.btn-danger {
  background: #ea5858;
  color: #fff;
}
.btn-danger:hover {
  background: #c82333;
}
.empty {
  text-align: center;
  color: #999;
  margin-top: 3rem;
  font-size: 1.1rem;
}
</style>
