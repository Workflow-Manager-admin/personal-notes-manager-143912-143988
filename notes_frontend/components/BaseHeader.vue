<template>
  <header class="header">
    <nav class="nav">
      <div class="app-title">
        <span class="accent">Notes</span> Manager
      </div>
      <div class="nav-actions">
        <a
          class="nav-link"
          href="https://nuxt.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nuxt Docs
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup></script>

<style scoped>
.header {
  width: 100%;
  background: #1976d2;
  color: #fff;
  box-shadow: 0 2px 8px #1976d213;
  height: 56px;
  display: flex;
  align-items: center;
  z-index: 21;
}
.nav {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
  justify-content: space-between;
  padding: 0 2rem;
}
.app-title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #fff;
  display: flex;
  align-items: center;
}
.app-title .accent {
  color: #ff5722;
  font-weight: 900;
  margin-right: 0.3rem;
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.nav-link {
  color: #fff;
  opacity: 0.85;
  text-decoration: none;
  font-size: 1rem;
  transition: opacity 0.16s;
  border-bottom: 2px solid transparent;
}
.nav-link:hover,
.nav-link:focus {
  opacity: 1;
  border-bottom: 2px solid #ff5722;
}
</style>
