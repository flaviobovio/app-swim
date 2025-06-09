<script setup>
  import { ref, onMounted } from "vue";
  import { useRouter, useRoute } from 'vue-router';
  import api from "../axios";
  import { useSuccessToast } from '../composables/useSuccessToast.js';

  useSuccessToast();


  const router = useRouter();
  // const route = useRoute();


  
  
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
      const response = await api.get("/date/");
      items.value = response.data;
    } catch (err) {
      error.value = "Error al cargar datos";
    } finally {
      loading.value = false;
    }
  };

// Fetch data on mount
onMounted(fetchData);

const handleClickEdit = (date) => {
  router.push(`/dateDetail/${date.id}`);
};

const handleClickAdd = () => {
  router.push(`/dateDetail/new`);
};



</script>

<template>
  <div class="container-fluid mt-5">
    <h3 class="text-center mb-5">{{ msg }}</h3>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>📅 Fechas</h2>
      <button class="btn btn-primary" @click="() => handleClickAdd()">
        ➕ Agregar
      </button>
    </div>    

    <!-- Table Header -->
    <div class="row bg-primary text-white " data-bs-header>
      <div class="col-4" data-bs-cell>Fecha</div>
      <div class="col-2" data-bs-cell>Activa</div>
      <div class="col-2" data-bs-cell> </div>      
    </div>

    <!-- Table Rows -->
    <div
      class="row border-bottom py-2 align-items-center"
      v-for="item in items" :key="item.id"
      data-bs-row
    >
      <div class="col-4" data-bs-cell>{{ item.date }}</div>
      <div class="col-2" data-bs-cell>{{ (item.active) ? "☑️" : "" }}</div>

      <div class="col-2" data-bs-cell>
        <button type="button" class="btn btn-primary" @click="() => handleClickEdit(item)">✏️</button>
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
