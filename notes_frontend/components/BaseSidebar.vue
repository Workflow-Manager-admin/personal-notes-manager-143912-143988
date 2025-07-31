<template>
  <aside class="sidebar">
    <div class="sidebar-title">Categories</div>
    <ul class="category-list">
      <li
        v-for="cat in categories"
        :key="cat"
        :class="{ active: selectedCategory === cat }"
        @click="$emit('select-category', cat)"
      >
        {{ cat }}
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
defineProps<{
  categories: string[]
  selectedCategory: string
}>()
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: #f5f7fa;
  border-right: 1px solid #e4e8ee;
  padding: 2.5rem 1rem 1rem 1.1rem;
  min-height: calc(100vh - 56px);
  box-sizing: border-box;
}
.sidebar-title {
  font-weight: 900;
  font-size: 1.12rem;
  letter-spacing: 1px;
  color: #424242;
  text-transform: uppercase;
  margin-bottom: 0.8rem;
}
.category-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.category-list li {
  color: #424242;
  font-size: 1.03rem;
  background: none;
  margin-bottom: 0.3rem;
  border-radius: 5px;
  padding: 0.4rem 1rem;
  cursor: pointer;
  transition: background 0.16s, color 0.14s;
}
.category-list li.active,
.category-list li:hover {
  background: #1976d21a;
  color: #1976d2;
  font-weight: 600;
}
</style>
