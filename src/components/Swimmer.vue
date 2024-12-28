<script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import SwimmerButton from "./SwimmerButton.vue";
  import ModalForm from "./ModalForm.vue";
  
  // Props
  defineProps({
    msg: String,
  });

  // Reactive variables
  const items = ref([]);
  const loading = ref(true);
  const error = ref(null);

  // Methods
  const fetchData = async () => {
    try {
      const response = await axios.get("https://flavioboviovt.pythonanywhere.com/api/v1/swimmer/");
      items.value = response.data;
    } catch (err) {
      error.value = "Failed to fetch data";
    } finally {
      loading.value = false;
    }
  };

  // Fetch data on mount
  onMounted(fetchData);

  const handleClick = () => {
    alert("Button clicked!");
  };
</script>

<template>
  <div class="container-fluid mt-5">
    <h3 class="text-center mb-5">{{ msg }}</h3>

    <!-- Table Header -->
    <div class="row bg-primary text-white fw-bold" data-bs-header>
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
    >
      <div class="col-4" data-bs-cell>{{ item.name }}</div>
      <div class="col-1" data-bs-cell>{{ item.age }}</div>
      <div class="col-3" data-bs-cell>{{ item.club }}</div>
      <div class="col-3" data-bs-cell>{{ item.city }}</div>
      <div class="col-1" data-bs-cell>
        <SwimmerButton 
          variant="info"
          @click="handleClick"
        >Ver</SwimmerButton>
      </div>      
    </div>
    <p v-if="loading">Cargando...</p>
    <p v-if="error">{{ error }}</p>   
  </div>
</template>



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
