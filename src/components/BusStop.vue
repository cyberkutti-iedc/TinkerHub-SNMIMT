<template>
    <div class="p-4 bg-white shadow-lg rounded-lg mb-4 flex justify-between items-center">
      <div>
        <h2 class="text-xl font-bold text-indigo-600">{{ busStop.name }}</h2>
        <p class="text-gray-600">{{ busStop.route }}</p>
      </div>
      <div class="text-right">
        <p class="text-lg font-bold text-indigo-600">{{ busStop.arrivalTime }} mins</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BusStop',
    props: {
      busStop: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  