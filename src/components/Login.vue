<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login" class="login-form">
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required>
        <button type="submit">Login</button>
      </form>
      <div v-if="loginError" class="error-message">
        Login fehlgeschlagen. Ungültige Anmeldeinformationen.
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const username = ref('');
  const password = ref('');
  const loginError = ref(false);
  const router = useRouter();
  
  const login = () => {
    if (username.value === 'admin' && password.value === 'pass') {
      router.push('/home');
    } else {
      loginError.value = true;
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
  }
  
  input {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
  