<template>
    <form @submit.prevent="$emit('submit')" class="mt-3">
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input v-model="modelValue.name" class="form-control" required />
      </div>
  
      <div class="mb-3">
        <label class="form-label">Sex</label>
        <select id="sex" v-model="modelValue.sex" class="form-control" required>
          <option disabled value="">Please select one</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      </div>


      <div class="mb-3">
        <label class="form-label">Edad</label>
        <input type="number" v-model="modelValue.age" class="form-control" required />
      </div>
  

      <div class="mb-3">
        <label class="form-label">Club</label>
        <ClubSelect v-model="modelValue.club" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Ciudad</label>
        <input v-model="modelValue.city" class="form-control" required />
      </div>
  
      <button type="submit" class="btn btn-success me-2">
        {{ isNew ? '➕ Agregar' : '💾 Guardar' }}
      </button>
  
      <button v-if="!isNew" type="button" @click="$emit('delete')" class="btn btn-danger">
        ❌ Borrar
      </button>
    </form>
  </template>
  
<script setup>

  import ClubSelect from './ClubSelect.vue';

  defineProps({
    modelValue: Object,
    isNew: Boolean,
  });
  defineEmits(['submit', 'delete']);
</script>
  
<script>
  // Methods
  const fetchData = async () => {
    try {
      const response = await api.get("/club/");
      items.value = response.data;
    } catch (err) {
      error.value = "Failed to fetch data";
    } finally {
      loading.value = false;
    }
  };
</script>