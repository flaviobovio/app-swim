 <template>
  <select
    :value="modelValue"
    @change="handleChange"
    class="form-control"
    :required="required"
    :disabled="disabled"
  >
    <option v-if="filteredCategories.length === 0" disabled value="">
      No hay categoría válida para esta edad
    </option>
    <option
      v-for="category in filteredCategories"
      :key="category.id"
      :value="category.id"
    >
      {{ category.name }}
    </option>
  </select>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import api from "../axios";

// Props y eventos
const props = defineProps({
  modelValue: [String, Number],
  required: {
    type: Boolean,
    default: false,
  },
  age: {
    type: [Number, null],
    default: null,
  },
  disabled: { type: Boolean, default: false },  
});
const emit = defineEmits(['update:modelValue']);

// Datos
const categories = ref([]);
const loading = ref(true);
const error = ref(null);

// Lógica para filtrar categorías por edad
const filteredCategories = computed(() => {

  if (!props.age || props.age <= 0) return categories.value;


  return categories.value.filter(cat => {
    return props.age >= cat.age_min && props.age <= cat.age_max;
  });
});

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
  emit('update:modelValue', value);
};

onMounted(fetchCategories);

watch(
  () => props.age,
  (newAge) => {
    if (!newAge || newAge <= 0) return;

    const selected = categories.value.find(cat => cat.id === props.modelValue);
    const valid = selected && newAge >= selected.min_age && newAge <= selected.max_age;

    if (!valid) {
      const firstValid = filteredCategories.value[0];
      if (firstValid) {
        emit('update:modelValue', firstValid.id);
      } else {
        emit('update:modelValue', '');  // Limpia si no hay válida
      }
    }
  },
  { immediate: true }
);
</script>
