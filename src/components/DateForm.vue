<template>
    <form @submit.prevent="$emit('submit')" class="mt-3">
      <div class="mb-3">
        <label class="form-label">Fecha</label>
        <input type="date" v-model="modelValue.date" class="form-control" required />
      </div>
  
      <div class="mb-4">
        <label class="form-label">Activa</label>
        <button
            type="button"
            class="btn btn-transparent"
            @click="modelValue.active = !modelValue.active"
        >
            {{ modelValue.active ? '✅' : '🔲' }}
        </button>
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
  