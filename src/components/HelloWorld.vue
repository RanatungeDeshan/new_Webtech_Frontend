<template>
  <h3> {{ title }} </h3>
  <div>
    <input v-model="nameField" placeholder="Name" type="text">
    <input v-model="ageField" placeholder="Alter" type="number">
    <button type="button" @click="save()">Speichern</button>
  </div>
  <div>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Alter</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="patients.length === 0">
        <td colspan="2">Noch keine Patienten</td>
      </tr>
      <tr v-for="patient in patients" :key="patient.id">
        <td>{{patient.name}}</td>
        <td>{{patient.age}}</td>
      </tr>
      <tr>
        <td>{{ nameField }}</td>
        <td>{{ ageField }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import type {Ref} from 'vue'

defineProps<{
  title: string
}>()

type Patient = { id?: number, name: string, age: number }

const patients: Ref<Patient[]> = ref([])
const nameField = ref('')
const ageField = ref(0)

function loadPatients () {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/patients'
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
  }
  fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach((patient: Patient) => {
        patients.value.push(patient)
      }))
      .catch(error => console.log('error', error))
}

function save () {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode
  const endpoint = baseUrl + '/patients'
  const data: Patient = {
    name: nameField.value,
    age: ageField.value
  }
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
      })
      .catch(error => console.log('error', error))
}

// Lifecycle hooks
onMounted(() => {
  loadPatients()
})
</script>

<style scoped>
h3 {
  text-align: center;
}
table {
  margin-left: auto;
  margin-right: auto;
}
button {
  color: blue;
}
</style>