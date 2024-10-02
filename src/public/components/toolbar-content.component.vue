<script>

export default {
  name: 'toolbar-content',
  data(){
    return {
      items: [
        {label: 'home', to: '/home'},
        {label: 'Health Checks', to: '/analytics/health-checks'}
      ]
    }
  }
}
</script>

<template>
  <div class="card">
    <pv-toolbar class="bg-primary" style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
      <template #start>
        <div class="flex items-center gap-3">
          <img src="/src/assets/branding.png" alt="branding">
        </div>
      </template>

      <template #end>

        <div class="flex-column">
          <router-link v-for="item in items" :key="item.label"  :to="item.to">
            <pv-button class="p-button-text"  severity="info ">{{ item.label }}</pv-button>
          </router-link>
        </div>
      </template>
    </pv-toolbar>
  </div>

  <main>
    <router-view/>
  </main>
</template>

<style scoped>

</style>