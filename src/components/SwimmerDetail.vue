<template>
    <div class="container mt-4">
      <h3>{{ isNew ? 'Add New Swimmer' : 'Edit Swimmer' }}</h3>
      <SwimmerForm
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
  import SwimmerForm from './SwimmerForm.vue';
  import api from '../api';
  
  const router = useRouter();
  const route = useRoute();
    
  const id = route.params.id;
  const isNew = computed(() => !id);

  
  const form = reactive({
    name: '',
    age: '',
    club: '',
    city: '',
  });
  
  onMounted(async () => {
    if (!isNew.value) {
      try {
        const response = await api.get(`/swimmer/${id}/`);
        Object.assign(form, response.data);
      } catch {
        toast.error('Failed to load swimmer');
      }
    }
  });
  
  const handleSubmit = async () => {
    try {
      if (isNew.value) {
        await api.post('/swimmer/', form);
        toast.success('Swimmer added!');
      } else {
        await api.put(`/swimmer/${id}/`, form);
        toast.success('Swimmer updated!');
      }
      router.push('/');
    } catch {
      toast.error('Failed to save swimmer');
    }
  };
  
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this swimmer?')) return;
    try {
      await api.delete(`/swimmer/${id}/`);
      toast.success('Swimmer deleted');
      router.push('/');
    } catch {
      toast.error('Failed to delete swimmer');
    }
  };
  </script>
  