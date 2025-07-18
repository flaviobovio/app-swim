<template>
  <select
    :value="modelValue"
    @change="handleChange"
    class="form-control"
    :required="required"
  >
    <option disabled value="">Seleccione un club</option>
    <option
      v-for="club in clubs"
      :key="club.id"
      :value="club.id"
    >
      {{ club.name }}
    </option>
  </select>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from "../axios";

// Props y eventos
const props = defineProps({
  modelValue: [String, Number],
  required: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);

// Datos
const clubs = ref([]);
const loading = ref(true);
const error = ref(null);

// Cargar clubes
const fetchClubs = async () => {
  try {
    const response = await api.get('/club/');
    clubs.value = response.data;
  } catch (err) {
    error.value = 'Error al cargar clubes';
  } finally {
    loading.value = false;
  }
};

// Emitir cambio
const handleChange = (event) => {
  const value = event.target.value;
  emit('update:modelValue', value); // emitimos solo el ID (string o number)
};

onMounted(fetchClubs);
</script>
