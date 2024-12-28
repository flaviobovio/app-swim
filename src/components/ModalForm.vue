<template>
    <div>
      <!-- Modal -->
      <div 
        class="modal fade" 
        tabindex="-1" 
        :class="{ show: show }" 
        :style="{ display: show ? 'block' : 'none' }" 
        aria-hidden="!show"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal Form</h5>
              <button 
                type="button" 
                class="btn-close" 
                @click="$emit('close')"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="formData.name" 
                    class="form-control" 
                    required 
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="formData.email" 
                    class="form-control" 
                    required 
                  />
                </div>
                <div class="mb-3">
                  <label for="message" class="form-label">Message</label>
                  <textarea 
                    id="message" 
                    v-model="formData.message" 
                    class="form-control" 
                    rows="3" 
                  ></textarea>
                </div>
                <div class="text-end">
                  <button 
                    type="button" 
                    class="btn btn-secondary me-2" 
                    @click="$emit('close')"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div 
          class="modal-backdrop fade" 
          :class="{ show: show }"
          @click="$emit('close')"
        ></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from "vue";
  
  const formData = reactive({
    name: "",
    email: "",
    message: "",
  });
  
  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
    // Reset form data
    formData.name = "";
    formData.email = "";
    formData.message = "";
    // Notify parent to close modal
    emit("close");
  };
</script>
  
<style>
  .modal.fade.show {
    display: block;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
  