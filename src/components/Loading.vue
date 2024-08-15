<template>
    <div class="flex items-center justify-center h-full">
      <div class="loader glass"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Loading'
  };
  </script>
  
  <style scoped>
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .loader {
    border: 8px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    border-top: 8px solid rgba(255, 255, 255, 0.3);
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    backdrop-filter: blur(10px);
  }
  </style>
  