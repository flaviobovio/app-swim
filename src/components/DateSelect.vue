<template>
    <select
      :value="modelValue"
      @change="handleChange"
      class="form-control"
      :required="required"
    >
      <option
        v-for="date in dates"
        :key="date.id"
        :value="date.id"
      >
        {{ date.date }}
      </option>
    </select>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import api from "../axios";
  
  // Props & Events
  const props = defineProps({
    modelValue: [String, Number],
    required: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['update:modelValue']);
  
  // Date variables
  const dates = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  // Load dates 
  const fetchDates = async () => {
    try {
      const response = await api.get('/date/?active=true');
      dates.value = response.data;

      // Select first date if available
      if (dates.value.length > 0) {
        emit('update:modelValue', dates.value[0].id); 
      }

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
  