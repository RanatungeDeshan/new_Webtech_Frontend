<template>
  <div>
    <h3>{{ title }}</h3>
    <div class="form-container">
      <label>Name des Patienten*:</label>
      <input v-model="nameField" placeholder="Name" type="text" />

      <label>Geburtsdatum*:</label>
      <input v-model="birthField" placeholder="Geburtsdatum" type="date" />

      <label>Phone Number*:</label>
      <input v-model.number="telNumField" placeholder="TelNum" type="number" />

      <label>Health Condition:</label>
      <textarea v-model="healthConditionField" placeholder="Health Condition"></textarea>

      <label>Appointment:</label>
      <input v-model="appointmentField" placeholder="Appointment" type="date" />

      <button type="button" @click="save">Speichern</button>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>

    <div>
      <!-- ... -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{
  title: string
}>()

type Patient = {
  id?: number
  name: string
  birthdate: Date
  telNum: number
  healthCondition?: string
  appointment?: Date | null
}

const patients = ref<Patient[]>([])
const nameField = ref('')
const birthField = ref('')
const telNumField = ref<number | null>(null)
const healthConditionField = ref('')
const appointmentField = ref('')
const errorMessage = ref('')

function convertToDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function save() {
  if (!nameField.value || !birthField.value || telNumField.value === null) {
    errorMessage.value = 'Bitte fülle alle obligatorischen Felder aus.'
    return
  }

  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = `${baseUrl}/patients`
  const data: Patient = {
    name: nameField.value,
    birthdate: convertToDate(birthField.value),
    telNum: telNumField.value,
    healthCondition: healthConditionField.value || 'Undefined',
    appointment: appointmentField.value !== null ? convertToDate(appointmentField.value) : null
  }
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((responseData) => {
      console.log('Success:', responseData)
      patients.value.push(responseData)
      // Wenn das Speichern erfolgreich ist, setze die Fehlermeldung zurück
      errorMessage.value = ''
    })
    .catch((error) => {
      console.log('error', error)
      errorMessage.value = 'Fehler beim Speichern des Patienten.'
    })
}

onMounted(() => {
  // Laden der Patienten beim Start
  loadPatients()
})

function loadPatients() {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = `${baseUrl}/patients/`
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }
  fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((result) => result.forEach((patient: Patient) => patients.value.push(patient)))
    .catch((error) => console.log('error', error))
}
</script>

<style scoped>
/* Hintergrundfarbe für den gesamten Container */
div {
  background-color: #f0f0f0;
}

/* Überschrift zentrieren und Farbe ändern */
h3 {
  text-align: center;
  color: #333;
}

/* Formular-Container mit Abstand und Rahmen */
.form-container {
  max-width: 400px;
  margin: 1rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Eingabefelder mit etwas Abstand und Schatten */
input {
  margin: 0.5rem;
  padding: 0.5rem;
  box-shadow: inset 0 0 5px #ddd;
}

textarea {
  width: 300px;
  height: 100px;
  margin: 0.5rem;
  padding: 0.5rem;
  box-shadow: inset 0 0 5px #ddd;
  resize: none; /* Deaktiviere die Größenänderung */
  overflow: hidden; /* Verstecke den Bildlauf */
  line-height: 1.5; /* Setze die Zeilenhöhe */
}

/* Speichern-Button mit Farbe und Hover-Effekt */
button {
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: #0099ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0077cc;
}

/* Fehlermeldung mit roter Farbe und Abstand */
.error-message {
  color: red;
  margin-top: 10px;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
