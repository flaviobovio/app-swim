<template>
  <div class="row w-100 g-2">
    <div class="col-12 col-md-3">
      <input
        type="text"
        class="form-control"
        placeholder="Nombre / DNI"
        v-model="search"
        @input="onSearch"
      />
    </div>

    <div class="col-12 col-md-9" v-if="search.length >= 3">
      <select
        :value="modelValue"
        @change="onChange"
        class="form-select"
        :required="required"
      >
        <option v-if="swimmers.length === 0" disabled value="">
          No se encontró ningún nadador
        </option>
        <option
          v-for="swimmer in swimmers"
          :key="swimmer.id"
          :value="swimmer.id"
        >
          {{ swimmer.name }} ({{ swimmer.age }}) - {{ swimmer.identification }}
        </option>
      </select>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import api from "../axios";

const props = defineProps({
  modelValue: [String, Number],
  required: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);

const search = ref('');
const swimmers = ref([]);
let debounceTimeout = null;

const onSearch = () => {
  clearTimeout(debounceTimeout);
  if (search.value.length >= 3) {
    debounceTimeout = setTimeout(fetchSwimmers, 300);
  } else {
    swimmers.value = [];
  }
};

const fetchSwimmers = async () => {
  try {
    const response = await api.get('/swimmer/', {
      params: { search: search.value }
    });
    swimmers.value = response.data;

    // Select first swimmer if available
    if (swimmers.value.length > 0) {
      emit('update:modelValue', swimmers.value[0].id);
    } else {
      emit('update:modelValue', '');
    }

  } catch (err) {
    console.error('Error al buscar nadadores:', err);
    swimmers.value = [];
    emit('update:modelValue', '');
  }
};

const onChange = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>
