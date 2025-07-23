<template>
    <div class="container mt-4">
      <h3>⏱️ {{ isNew ? 'Agregar Marca' : 'Editar Marca' }}</h3>
      <MarkForm
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
  import MarkForm from './MarkForm.vue';
  import api from '../axios';
  
  const router = useRouter();
  const route = useRoute();
    
  const id = route.params.id;
  const isNew = computed(() => !id);

  
  const form = reactive({
    swimmer: 0,
    date: 0,
    meters: 0,
    swimmer_detail: { name: '' },
    date_detail: { date: '' },
  });
  
  onMounted(async () => {
    if (!isNew.value) {
      try {
        const response = await api.get(`/mark/${id}/`);
        Object.assign(form, response.data);
      } catch {
        toast.error(`Error al cargar marca`);
      }
    }
  });
  
  const handleSubmit = async () => {
    try {
      if (isNew.value) {
        await api.post('/mark/', form);
      } 
      else {
        await api.put(`/mark/${id}/`, form);
      }
      router.push({ path: '/markList/', query: { success: isNew.value ? 'Marca agregada' : 'Marca actualizada' } });

    } catch {
      toast.error('Falla al guardar marca');
    }
  };
  
  const handleDelete = async () => {
    if (!confirm('Borrar marca?')) return;
    try {
      await api.delete(`/mark/${id}/`);
      router.push('/markList/');      
      router.push({ path: '/markList/', query: { success: 'Marca borrada' } });
    } catch {
      toast.error('Falla al borrar marca');
    }
  };
  </script>
  