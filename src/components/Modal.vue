<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-50" @click="$emit('close')"></div>
      <div class="bg-white rounded-lg shadow-lg p-6 z-50 glass animate-fade-in">
        <header class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">{{ title }}</h2>
          <button @click="$emit('close')" class="text-gray-600 hover:text-gray-900">
            <span class="text-xl">&times;</span>
          </button>
        </header>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Modal',
    props: {
      isVisible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      }
    }
  };
  </script>
  
  <style scoped>
  .fixed {
    position: fixed;
  }
  .inset-0 {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .z-50 {
    z-index: 50;
  }
  .bg-black {
    background-color: black;
  }
  .opacity-50 {
    opacity: 0.5;
  }
  .glass {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 15px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  </style>
  