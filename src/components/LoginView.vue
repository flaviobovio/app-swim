<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Usuario" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <button type="submit">Iniciar sesión</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await axios.post(import.meta.env.VITE_API_BASE_URL + '/token/', {
      username: username.value,
      password: password.value,
    })


    localStorage.setItem('access', res.data.access)
    localStorage.setItem('refresh', res.data.refresh)

    router.push('/')
  } catch (err) {
    alert('Credenciales incorrectas')
  }
}
</script>
