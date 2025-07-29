<template>
  <form @submit.prevent="$emit('submit')" class="mt-3">
    <div class="mb-3">
      <label class="form-label">Nombre</label>
      <input v-model="modelValue.name" class="form-control" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Documento</label>
      <input v-model="modelValue.identification" class="form-control" required />
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
      <input
        type="number"
        v-model="modelValue.age"
        class="form-control"
        required
      />
    </div>

    <div class="mb-3">
      <label class="form-label">Categoría</label>
      <CategorySelect
        v-model="modelValue.category"
        :age="ageNumber"
        :disabled="!ageNumber"
        required
      />
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

    <button
      v-if="!isNew"
      type="button"
      @click="$emit('delete')"
      class="btn btn-danger"
    >
      ❌ Borrar
    </button>
  </form>
</template>

<script setup>
import { computed } from 'vue';
import ClubSelect from '../../components/ClubSelect.vue';
import CategorySelect from '../../components/CategorySelect.vue';

const props = defineProps({
  modelValue: Object,
  isNew: Boolean,
});
defineEmits(['submit', 'delete']);

// Convertir edad a número solo si está definida y no vacía
const ageNumber = computed(() => {
  const age = props.modelValue.age;
  return age !== '' && age !== null ? Number(age) : null;
});
</script>
