<template>
  <main>
    <DynamicForm :patientId="patientId" title="Here you can edit the information of the patients"/>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DynamicForm from '../components/Edit.vue';

const route = useRoute()
const patientId = ref(route.params.id)

onMounted(() => {
  console.log(patientId.value) // Überprüfen Sie, ob die patientId korrekt extrahiert wird
})
</script>

<style scoped></style>
