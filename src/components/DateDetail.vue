<template>
    <div class="container mt-4">
      <h3>📅 {{ isNew ? 'Agregar Fecha' : 'Editar Fecha' }}</h3>
      <DateForm
        v-model="form"
        :isNew="isNew"
        @submit="handleSubmit"
        @delete="handleDelete"
      />
    </div>
</template>
  
<script setup>
  import { reactive, onMounted, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { toast } from 'vue3-toastify';  
  import DateForm from './DateForm.vue';
  import api from '../axios';
  
  const router = useRouter();
  const route = useRoute();
    
  const id = route.params.id;
  const isNew = computed(() => !id);

  
  const form = reactive({
    date: '',
    active: false,
  });
  
  onMounted(async () => {
    if (!isNew.value) {
      try {
        const response = await api.get(`/date/${id}/`);
        Object.assign(form, response.data);
      } catch {
        toast.error(`Error al cargar fecha`);
      }
    }
  });
  
  const handleSubmit = async () => {
    try {
      if (isNew.value) {
        await api.post('/date/', form);
      } else {
        await api.put(`/date/${id}/`, form);
      }
      router.push({ path: '/dateList/', query: { success: isNew.value ? 'Fecha agregada' : 'Fecha actualizada' } });

    } catch {
      toast.error('Falla al guardar fecha');
    }
  };
  
  const handleDelete = async () => {
    if (!confirm('Borrar fecha?')) return;
    try {
      await api.delete(`/date/${id}/`);
      router.push('/dateList/');      
      router.push({ path: '/dateList/', query: { success: 'Fecha borrada' } });
    } catch {
      toast.error('Falla al borrar fecha');
    }
  };
  </script>
  