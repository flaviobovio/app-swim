<template>
    <form @submit.prevent="$emit('submit')" class="mt-3">
        <div class="mb-3">
            <label class="form-label">Nadador</label>
            <!-- <input v-model="modelValue.swimmer" class="form-control" required /> -->
            <SwimmerSelect v-model="modelValue.swimmer.id" required />
        </div>

        <div class="mb-3">
        <label class="form-label">Fecha</label>
        <input v-model="modelValue.date.date" class="form-control" required />
      </div>
  
       <div class="mb-3">
        <label class="form-label">Metros</label>
        <input v-model="modelValue.meters" class="form-control" required />
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
  import SwimmerSelect from './SwimmerSelect.vue';
  defineProps({
    modelValue: Object,
    isNew: Boolean,
  });
  defineEmits(['submit', 'delete']);
</script>
  