<script setup>
  import { ref, onMounted, computed } from "vue";
  import { useRouter } from 'vue-router';
  import api from "../axios.js"; 
  import { useSuccessToast } from '../composables/useSuccessToast.js';
  
  useSuccessToast();

  const router = useRouter();
  
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
      const response = await api.get("/swimmer/");
      items.value = response.data;
    } catch (err) {
      error.value = "Failed to fetch data";
    } finally {
      loading.value = false;
    }
  };

  // Fetch data on mount
  onMounted(fetchData);

const handleClick = (swimmer) => {
  router.push(`/swimmerDetail/${swimmer.id}`);
};

const handleClickAdd = () => {
  router.push(`/swimmerDetail/new`);
};



const searchQuery = ref("");

const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value;

  return items.value.filter((item) => {
    const text = searchQuery.value.toLowerCase();
    return (
      item.name.toLowerCase().includes(text) ||
      item.city?.toLowerCase().includes(text) ||
      item.identification?.toLowerCase().includes(text) ||
      item.club_detail?.name?.toLowerCase().includes(text) ||
      item.category_detail?.name?.toLowerCase().includes(text)
    );
  });
});



</script>

<template>
  <div class="container-fluid mt-5">
    <h3 class="text-center mb-5">{{ msg }}</h3>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>🏊 Nadadores</h2>
 

      <button class="btn btn-primary" @click="() => handleClickAdd()">
        ➕ Agregar
      </button>
    </div>    

<input
  type="text"
  v-model="searchQuery"
  placeholder="Buscar nadador..."
  class="form-control mb-3 w-50"
/>    


    <!-- Table Header -->
    <div class="row bg-primary text-white " data-bs-header>
      <div class="col-3" data-bs-cell>Nombre</div>
      <div class="col-1" data-bs-cell>Documento</div>
      <div class="col-1" data-bs-cell>Sexo</div>
      <div class="col-1" data-bs-cell>Edad</div>
      <div class="col-2" data-bs-cell>Categoría</div>
      <div class="col-1" data-bs-cell>Club</div>
      <div class="col-2" data-bs-cell>Ciudad</div>
      <div class="col-1" data-bs-cell> </div>      
    </div>

    <!-- Table Rows -->
    <div
      class="row border-bottom py-2 align-items-center"
      v-for="item in filteredItems" :key="item.id"
      data-bs-row
    >
      <div class="col-3" data-bs-cell>{{ item.name }}</div>
      <div class="col-1" data-bs-cell>{{ item.identification }}</div>
      <div class="col-1" data-bs-cell>{{ item.sex }}</div>
      <div class="col-1" data-bs-cell>{{ item.age }}</div>
      <div class="col-2" data-bs-cell>{{ item.category_detail.name }}</div>      
      <div class="col-1" data-bs-cell>{{ item.club_detail.name }}</div>
      <div class="col-2" data-bs-cell>{{ item.city }}</div>
      <div class="col-1" data-bs-cell>
        <button type="button" class="btn btn-primary" @click="() => handleClick(item)">📄</button>
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
