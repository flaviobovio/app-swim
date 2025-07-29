<template>
    <form @submit.prevent="$emit('submit')" class="mt-3">
      <div class="mb-3">
        <label class="form-label">Club</label>
        <input v-model="modelValue.name" class="form-control" required />
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


  defineProps({
    modelValue: Object,
    isNew: Boolean,
  });
  defineEmits(['submit', 'delete']);
</script>
  