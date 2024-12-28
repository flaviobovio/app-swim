<script setup>
// import { ref } from 'vue'

defineProps({
  msg: String,
})
</script>

<template>

  <div class="container-fluid mt-5" style="width: 100%;">
    <h2 class="text-center mb-5">{{msg}}</h2>

    <!-- Table Header -->
    <div class="row bg-primary text-white fw-bold" data-bs-header style="width: 100%;">
      <div class="col-4" data-bs-cell>Nombre</div>
      <div class="col-1" data-bs-cell>Edad</div>
      <div class="col-3" data-bs-cell>Club</div>
      <div class="col-3" data-bs-cell>Ciudad</div>
      <div class="col-1" data-bs-cell> </div>      
    </div>

    <!-- Table Rows -->
    <div
      class="row border-bottom py-2 align-items-center"
      v-for="item in items" :key="item.id"
      data-bs-row
      style="width: 100%;"
    >
      <div class="col-4" data-bs-cell>{{ item.name }}</div>
      <div class="col-1" data-bs-cell>{{ item.age }}</div>
      <div class="col-3" data-bs-cell>{{ item.club }}</div>
      <div class="col-3" data-bs-cell>{{ item.city }}</div>
      <div class="col-1" data-bs-cell><Button class="data-bs-button">Ver</Button></div>      
    </div>
    <p v-if="loading">Cargando...</p>
    <p v-if="error">{{ error }}</p>   

  </div>













</template>



<script>
  import axios from "axios";

  export default {
    data() {
      return {
        items: [], // Array to store fetched data
        loading: true, // Loading state
        error: null, // Error message
      };
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get("https://flavioboviovt.pythonanywhere.com/api/v1/swimmer/");
          this.items = response.data; // Update the items with API response
        } catch (err) {
          this.error = "Failed to fetch data"; // Set error message if request fails
        } finally {
          this.loading = false; // Turn off loading state
        }
      },
    },
    mounted() {
      this.fetchData(); // Fetch data when the component is mounted
    },
  };
</script>





<style scoped>
.row {
  display: flex;
  align-items: center;
}

[data-bs-header] {
  padding: 10px 0;
  font-size: 1.2rem;
}

[data-bs-row] {
  font-size: 1rem;
  padding: 5px 0;
}

.border-bottom {
  border-color: #dee2e6;
}
</style>
