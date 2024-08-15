<template>
  <div class="glass-ui-kit">
    
    <!-- Glass Hero Section -->
    <section id="home" class="glass-hero">
      <div class="text-center p-6 max-w-3xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">TinkerHub SNMIMT</h2>
        <p class="text-lg md:text-xl mb-6">
        HOME PAGE COMING SOON
        </p>
        
      </div>
    </section>

    
    <!-- Glass Footer Section -->
    <footer class="bg-gray-800 text-white py-4 text-center">
      <p>&copy; 2024 TinkerHub SNMIMT. All rights reserved.</p>
      
    </footer>
  </div>
</template>

<script>
export default {
  name: 'GlassUiKit',
};
</script>

<style scoped>
/* Glass effect */
.glass-ui-kit {
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.glass-navbar, .glass-hero, .glass-card, .glass-about {
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Navbar styling */
.glass-navbar {
  background: rgba(255, 255, 255, 0.4);
}

/* Hero section styling */
.glass-hero {
  background: rgba(0, 0, 0, 0.4);
  color: white;
}

/* Card styling */
.glass-card {
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* About section styling */
.glass-about {
  background: rgba(255, 255, 255, 0.4);
}

.glass-card h3, .glass-card p, .glass-about p, .glass-about li {
  color: var(--color-text);
}

/* Responsiveness */
@media (max-width: 768px) {
  .glass-navbar ul {
    flex-direction: column;
    gap: 4px;
  }

  .glass-card {
    width: 100%;
  }

  .glass-about ul, .glass-impact ul {
    padding-left: 20px;
  }
}
</style>
