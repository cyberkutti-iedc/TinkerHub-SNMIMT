<template>
  <div :class="['min-h-screen p-4 glass', darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900']">
    <button @click="toggleDarkMode" class="p-2 bg-gray-700 text-white rounded transition-colors duration-300 ease-in-out">
      <font-awesome-icon :icon="darkMode ? 'sun' : 'moon'" />
    </button>
    
    <!-- Logo Section -->
    <div class="flex justify-center mb-4">
      <img :src="logo" alt="TinkerHub SNMIMT Logo" class="h-20 mx-auto" style="margin-left: -20px;">
    </div>

    <header class="mb-4 text-center glass p-4">
      <h1 class="text-3xl font-bold transition-colors duration-300 ease-in-out">
        {{ $t('collegeBusStopTitle') }}
      </h1>
      <p class="text-lg transition-colors duration-300 ease-in-out">
        {{ $t('collegeBusStopSubtitle') }}
      </p>
    </header>

    <div class="w-full max-w-xs mb-4 md:mb-0">
      <SearchBar v-if="selectedTab === 'search'" @search="searchBusStop" />
    </div>

    <div class="mb-4 text-center glass p-4">
      <p class="text-xl font-bold">
        {{ $t('currentTimeLabel') }}: {{ currentTime }}
      </p>
    </div>

    <div class="tabs mb-4">
      <button @click="selectedTab = 'all'" :class="['tab glass', selectedTab === 'all' ? 'active' : '']">{{ $t('allBusTimes') }}</button>
      <button @click="selectedTab = 'search'" :class="['tab glass', selectedTab === 'search' ? 'active' : '']">{{ $t('searchBus') }}</button>
      <button @click="selectedTab = 'coming'" :class="['tab glass', selectedTab === 'coming' ? 'active' : '']">{{ $t('comingBuses') }}</button>
    </div>

    <div v-if="loading">
      <Loading />
    </div>

    <div v-else>
      <div v-if="selectedTab === 'all'">
        <BusStopList :busStops="filteredBusStops" @showDetails="showBusDetails" />
      </div>
      <div v-if="selectedTab === 'coming'">
        <ComingBuses :busStops="filteredBusStops" />
      </div>
      <div v-if="selectedTab === 'search'">
        <BusStopList :busStops="filteredBusStops" @showDetails="showBusDetails" />
      </div>
    </div>

    <Modal :isVisible="isModalVisible" :title="modalTitle" @close="isModalVisible = false">
      <div v-if="selectedBusStop">
        <p>{{ $t('route') }}: {{ selectedBusStop.route }}</p>
        <p>{{ $t('arrivalTime') }}: {{ selectedBusStop.arrivalTime }}</p>
      </div>
    </Modal>

    <footer class="footer mt-8 glass">
      <p>&copy; 2024 Maliankara College Bus Stop - Bus ETA. {{ $t('Developed by TinkerHub SNMIMT') }}</p>
    </footer>
  </div>
</template>


<script>
import axios from 'axios';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../components/SearchBar.vue';
import BusStopList from '../components/BusStopList.vue';
import ComingBuses from '../components/ComingBuses.vue';
import Modal from '../components/Modal.vue';
import Loading from '../components/Loading.vue';
import busStopsData from '../assets/busStops.json';

// Import both logo images
import logoLight from '../assets/TinkerHub_SNMIMT.png';
import logoDark from '../assets/TinkerHub_SNMIMT_Dark.png';

export default {
  name: 'CollegeBusStop',
  components: {
    SearchBar,
    BusStopList,
    ComingBuses,
    Modal,
    Loading,
    FontAwesomeIcon
  },
  setup() {
    const busStops = ref([]);
    const searchQuery = ref('');
    const darkMode = ref(false);
    const currentTime = ref('');
    const selectedTab = ref('all');
    const timeInterval = ref(null);
    const loading = ref(false);
    const isModalVisible = ref(false);
    const selectedBusStop = ref(null);

    const fetchBusStops = async () => {
      loading.value = true;
      try {
        const response = busStopsData;
        busStops.value = response.map(busStop => ({
          ...busStop,
          arrivalTime: convertTo12HourFormat(busStop.arrivalTime)
        }));
      } catch (error) {
        console.error('Error fetching bus stops:', error);
      } finally {
        loading.value = false;
      }
    };

    const convertTo12HourFormat = (time24) => {
      const [hours, minutes] = time24.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

   const fetchCurrentTime = async () => {
  try {
    const response = await axios.get('httpS://worldtimeapi.org/api/timezone/Asia/Kolkata');
    currentTime.value = new Date(response.data.datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  } catch (error) {
    if (error.response) {
      // Server responded with a status code other than 2xx
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      // No response was received
      console.error('Network Error:', error.request);
    } else {
      // Other errors
      console.error('Error:', error.message);
    }
    // Optionally set an error message for user feedback
  }
};


    const searchBusStop = (query) => {
      searchQuery.value = query;
    };

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
    };

    const showBusDetails = (busStop) => {
      selectedBusStop.value = busStop;
      isModalVisible.value = true;
    };

    onMounted(() => {
      fetchBusStops();
      fetchCurrentTime();
      timeInterval.value = setInterval(fetchCurrentTime, 1000);
    });

    onBeforeUnmount(() => {
      if (timeInterval.value) {
        clearInterval(timeInterval.value);
      }
    });

    const filteredBusStops = computed(() => {
      if (selectedTab.value === 'search' && searchQuery.value) {
        return busStops.value.filter(busStop =>
          busStop.route.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return busStops.value;
    });

    const logo = computed(() => darkMode.value ? logoDark : logoLight);

    return {
      busStops,
      searchQuery,
      darkMode,
      currentTime,
      selectedTab,
      timeInterval,
      loading,
      isModalVisible,
      selectedBusStop,
      fetchBusStops,
      convertTo12HourFormat,
      fetchCurrentTime,
      searchBusStop,
      toggleDarkMode,
      showBusDetails,
      filteredBusStops,
      logo // Use the computed logo here
    };
  }
};
</script>

<style scoped>
/* Glassmorphism */
.glass {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.glass:hover {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
}

.bg-gray-900 {
  background-color: #1a202c;
}

.text-white {
  color: #ffffff;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

.text-gray-800 {
  color: #1a202c;
}

.transition-colors {
  transition: color 0.3s ease, background-color 0.3s ease;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.tab {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  margin: 0 0.25rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.tab.active {
  background-color: #1a202c;
  color: #ffffff;
  border-bottom: none;
}

.footer {
  padding: 1rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .tabs {
    flex-direction: column;
  }

  .tab {
    margin-bottom: 0.5rem;
  }

  .mb-4 {
    margin-bottom: 2rem;
  }

  .p-4 {
    padding: 1rem;
  }

  .text-xl {
    font-size: 1.25rem;
  }

  .text-3xl {
    font-size: 2rem;
  }
}
</style>
