<template>
    <form @submit.prevent="$emit('submit')" class="mt-3">
      <div class="mb-3">
          <label class="form-label">Nadador</label>
          <template v-if="isNew">
            <SwimmerSelect v-model="modelValue.swimmer" required />
          </template>
          <template v-else>
            <input v-model="modelValue.swimmer_detail.name" readonly class="form-control" />
          </template>

      </div>

      <div class="mb-3">
        <label class="form-label">Fecha</label>
        <template v-if="isNew">
          <DateSelect v-model="modelValue.date" required />
        </template>
        <template v-else>
          <input v-model="modelValue.date_detail.date" readonly class="form-control" />
        </template>
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
  import SwimmerSelect from '../../components/SwimmerSelect.vue';
  import DateSelect from '../../components/DateSelect.vue';
  defineProps({
    modelValue: Object,
    isNew: Boolean,
  });
  defineEmits(['submit', 'delete']);
</script>
  