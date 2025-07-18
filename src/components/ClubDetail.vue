<template>
    <div class="container mt-4">
      <h3>{{ isNew ? 'Agregar Club' : 'Editar Club' }}</h3>
      <ClubForm
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
  import ClubForm from './ClubForm.vue';
  import api from '../axios';
  
  const router = useRouter();
  const route = useRoute();
    
  const id = route.params.id;
  const isNew = computed(() => !id);

  
  const form = reactive({
    name: '',
    city: '',
  });
  
  onMounted(async () => {
    if (!isNew.value) {
      try {
        const response = await api.get(`/club/${id}/`);
        Object.assign(form, response.data);
      } catch {
        toast.error(`Error al cargar club`);
      }
    }
  });
  
  const handleSubmit = async () => {
    try {
      if (isNew.value) {
        await api.post('/club/', form);
      } else {
        await api.put(`/club/${id}/`, form);
      }
      router.push({ path: '/clubList/', query: { success: isNew.value ? 'Club agregado' : 'Club actualizado' } });

    } catch {
      toast.error('Falla al guardar club');
    }
  };
  
  const handleDelete = async () => {
    if (!confirm('Borrar fecha?')) return;
    try {
      await api.delete(`/club/${id}/`);
      router.push('/clubList/');      
      router.push({ path: '/clubList/', query: { success: 'Club borrado' } });
    } catch {
      toast.error('Falla al borrar club');
    }
  };
  </script>
  