<template>
    <div class="container mt-4">
      <h3>👥 {{ isNew ? 'Agregar Categoría' : 'Editar Categoría' }}</h3>
      <CategoryForm
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
  import CategoryForm from './CategoryForm.vue';
  import api from '../axios';
  
  const router = useRouter();
  const route = useRoute();
    
  const id = route.params.id;
  const isNew = computed(() => !id);

  
  const form = reactive({
    name: '',
    age_min: '',
    age_max: '',    
  });
  
  onMounted(async () => {
    if (!isNew.value) {
      try {
        const response = await api.get(`/category/${id}/`);
        Object.assign(form, response.data);
      } catch {
        toast.error(`Error al cargar categoría`);
      }
    }
  });
  
  const handleSubmit = async () => {
    try {
      if (isNew.value) {
        await api.post('/category/', form);
      } else {
        await api.put(`/category/${id}/`, form);
      }
      router.push({ path: '/categoryList/', query: { success: isNew.value ? 'Categoría agregado' : 'Categoría actualizado' } });

    } catch {
      toast.error('Falla al guardar categoría');
    }
  };
  
  const handleDelete = async () => {
    if (!confirm('Borrar fecha?')) return;
    try {
      await api.delete(`/category/${id}/`);
      router.push('/categoryList/');      
      router.push({ path: '/categoryList/', query: { success: 'Categoría borrado' } });
    } catch {
      toast.error('Falla al borrar categoría');
    }
  };
  </script>
  