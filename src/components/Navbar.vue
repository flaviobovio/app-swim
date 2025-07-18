<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">🏆 Torneo de fondo</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/swimmerList" class="nav-link" active-class="active">Nadadores</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/clubList" class="nav-link" active-class="active">Clubs</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/categories" class="nav-link" active-class="active">Categorias</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/results" class="nav-link" active-class="active">Resultados</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/dateList" class="nav-link" active-class="active">Fechas</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/markList" class="nav-link" active-class="active">Marcas</router-link>
            </li>


          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  // No script needed unless you want dropdowns or user-specific logic
  </script>
  
  <style scoped>
  .navbar .nav-link.active {
    font-weight: bold;
  }
  </style>
  