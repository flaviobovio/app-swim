<template>
    <button 
      :class="computedClass" 
      :type="type" 
      :disabled="disabled" 
      @click="onClick"
    >
      <slot />
    </button>
  </template>
  
  <script>
  export default {
    name: "SwimmerButton",
    props: {
      variant: {
        type: String,
        default: "primary", // Default Bootstrap variant
      },
      size: {
        type: String,
        default: "", // Options: '', 'sm', 'lg'
      },
      type: {
        type: String,
        default: "button", // Default button type
      },
      disabled: {
        type: Boolean,
        default: false, // Default not disabled
      },
    },
    computed: {
      computedClass() {
        return [
          "btn", // Base Bootstrap button class
          `btn-${this.variant}`, // Dynamically apply variant class
          this.size ? `btn-${this.size}` : "", // Dynamically apply size class
        ].join(" ");
      },
    },
    methods: {
      onClick(event) {
        this.$emit("click", event); // Emit click event to parent
      },
    },
  };
  </script>
  
  <style scoped>
  /* Optional custom styles */
  </style>
  