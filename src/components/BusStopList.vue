<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="(busStop, index) in displayedBusStops" 
        :key="busStop.id" 
        class="p-4 glass rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer" 
        @click="$emit('showDetails', busStop)"
      >
        <h3 class="text-xl font-bold">{{ busStop.route }}</h3>
        <p class="text-lg font-semibold">{{ $t('Arrival Time') }}: {{ busStop.arrivalTime }}</p>
      </div>
    </div>
    <div v-if="busStops.length > displayedCount" class="text-center mt-4">
      <button @click="showMore" class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
        Show More
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'BusStopList',
  props: {
    busStops: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const displayedCount = ref(5); // Start by showing the first 5 bus stops

    const displayedBusStops = computed(() => {
      return props.busStops.slice(0, displayedCount.value);
    });

    const showMore = () => {
      // Increase the number of displayed bus stops by 5
      displayedCount.value += 5;
    };

    return {
      displayedBusStops,
      displayedCount,
      showMore
    };
  }
};
</script>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.hover\:shadow-lg:hover {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
}

button {
  transition: background-color 0.3s ease;
}
</style>
