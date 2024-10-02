<script>
export default {
  name: "page-not-found"
}
</script>

<template>
  <div class="container">
    <h1>404</h1>
    <p>{{ $t('page-not-found.description') }}</p>
    <a href="/" class="button">{{ $t('page-not-found.back-home') }}</a>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
}

.container {
  text-align: center;
}

h1 {
  font-size: 8rem;
  margin-bottom: 1rem;
  letter-spacing: 10px;
  color: rgba(255, 255, 255, 0.9);
}

p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.button {
  padding: 0.75rem 2rem;
  background-color: #ffffff;
  color: #2575fc;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  text-decoration: none;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.button:hover {
  background-color: #2575fc;
  color: #ffffff;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.3);
  transform: translateY(-5px);
}

</style>