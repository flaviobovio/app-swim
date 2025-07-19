<template>
    <select
      :value="modelValue"
      @change="handleChange"
      class="form-control"
      :required="required"
    >
      <option disabled value="">Seleccione una fecha</option>
      <option
        v-for="date in dates"
        :key="date.id"
        :value="date.id"
      >
        {{ date.name }}
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
  const dates = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  // Cargar fechas
  const fetchDates = async () => {
    try {
      const response = await api.get('/date/');
      dates.value = response.data;
    } catch (err) {
      error.value = 'Error al cargar fechas';
    } finally {
      loading.value = false;
    }
  };
  
  // Emitir cambio
  const handleChange = (event) => {
    const value = event.target.value;
    emit('update:modelValue', value); // emitimos solo el ID (string o number)
  };
  
  onMounted(fetchDates);
  </script>
  