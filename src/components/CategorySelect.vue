<template>
    <select
      :value="modelValue"
      @change="handleChange"
      class="form-control"
      :required="required"
    >
      <option disabled value="">Seleccione una categoría</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
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
  const categories = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  // Cargar categorías
  const fetchCategories = async () => {
    try {
      const response = await api.get('/category/');
      categories.value = response.data;
    } catch (err) {
      error.value = 'Error al cargar categorías';
    } finally {
      loading.value = false;
    }
  };
  
  // Emitir cambio
  const handleChange = (event) => {
    const value = event.target.value;
    emit('update:modelValue', value); // emitimos solo el ID (string o number)
  };
  
  onMounted(fetchCategories);
  </script>
  