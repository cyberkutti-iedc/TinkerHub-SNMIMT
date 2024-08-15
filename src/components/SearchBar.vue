<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <input
        type="text"
        v-model="query"
        @input="handleInput"
        placeholder="Search for a bus stop"
        class="search-input"
      />
      <button class="clear-button" @click="clearQuery" v-if="query">
        <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.348 5.652a.5.5 0 0 0-.707 0L10 8.293 6.36 4.652a.5.5 0 0 0-.707.707L9.293 9l-3.64 3.641a.5.5 0 0 0 .707.707L10 9.707l3.641 3.64a.5.5 0 0 0 .707-.707L10.707 9l3.641-3.648a.5.5 0 0 0 0-.707z" fill="#000"/>
        </svg>
      </button>
      <svg class="search-icon" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 18l-4.35-4.35a7.5 7.5 0 1 0-1.415 1.415L18 19l1-1zM2 7.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    };
  },
  methods: {
    handleInput() {
      this.$emit('search', this.query);
    },
    clearQuery() {
      this.query = '';
      this.handleInput();
    }
  }
};
</script>

<style scoped>
.search-bar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 2rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 1px #4a90e2;
}

.search-icon {
  position: absolute;
  left: 0.5rem;
  color: #6b7280;
}

.clear-button {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
}

.clear-button svg {
  width: 16px;
  height: 16px;
}
</style>
