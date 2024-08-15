<template>
  <div>
    <div v-if="visibleBusStops.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="busStop in visibleBusStops" :key="busStop.id" class="p-4 glass rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
        <h3 class="text-xl font-bold">{{ busStop.route }}</h3>
        <p class="text-lg font-semibold">{{ $t('Arrival Time') }}: {{ busStop.arrivalTime }}</p>
      </div>
    </div>
    <div v-else class="text-center mt-4">
      <p class="text-lg font-semibold">Right now, no buses available.</p>
    </div>
    <div v-if="visibleBusStops.length < filteredBusStops.length" class="text-center mt-4">
      <button @click="showMore" class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
        Show More
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'ComingBuses',
  props: {
    busStops: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const currentTime = ref(new Date());
    const displayCount = ref(5); // Start by displaying the first 5 bus stops

    const fetchCurrentTime = async () => {
      try {
        const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
        currentTime.value = new Date(response.data.datetime);
      } catch (error) {
        console.error('Error fetching current time:', error);
      }
    };

    const parseTimeString = (timeString) => {
      // Convert 12-hour time to 24-hour format
      const [time, modifier] = timeString.split(' ');
      let [hours, minutes] = time.split(':').map(num => parseInt(num, 10));

      if (modifier === 'PM' && hours !== 12) {
        hours += 12;
      } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
      }

      // Return a Date object with today's date and the parsed time
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    };

    const filteredBusStops = computed(() => {
      return props.busStops.filter(busStop => {
        const busStopTime = parseTimeString(busStop.arrivalTime);
        console.log(`Comparing busStopTime: ${busStopTime} with currentTime: ${currentTime.value}`);
        return busStopTime > currentTime.value;
      });
    });

    const visibleBusStops = computed(() => {
      return filteredBusStops.value.slice(0, displayCount.value);
    });

    const showMore = () => {
      displayCount.value += 5; // Show 5 more bus stops each time the button is clicked
    };

    onMounted(async () => {
      await fetchCurrentTime();
    });

    return {
      currentTime,
      filteredBusStops,
      visibleBusStops,
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
