<script>
import {HealthCheckService} from "../services/healthCheck.service.js";

export default {
  name: 'average-performance',
  data() {
    return {
      healthChecks: [],
      healthCheckService: new HealthCheckService()
    };
  },
  computed: {
    // Calcular promedios de volts, watts, y hp solo de registros donde hp > 0
    averagePerformance() {
      const validHealthChecks = this.healthChecks.filter(check => check.hp > 0);
      const totalVolts = validHealthChecks.reduce((sum, check) => sum + check.volts, 0);
      const totalWatts = validHealthChecks.reduce((sum, check) => sum + check.watts, 0);
      const totalHP = validHealthChecks.reduce((sum, check) => sum + check.hp, 0);

      const count = validHealthChecks.length;

      return {
        avgVolts: count > 0 ? (totalVolts / count).toFixed(2) : 0,
        avgWatts: count > 0 ? (totalWatts / count).toFixed(2) : 0,
        avgHP: count > 0 ? (totalHP / count).toFixed(2) : 0
      };
    }
  },
  mounted() {
    this.fetchHealthChecks();
  },
  methods: {
    fetchHealthChecks() {
      // Simulate a service call to get health check data
      this.healthCheckService.getAll().then(response => {
        console.log('Health checks:', response.data);
        this.healthChecks = response.data;  // Set health checks from response
      }).catch(error => {
        console.error('Error fetching health checks:', error);
      });
    }
  }
}
</script>

<template>
  <div class="home-container">
    <pv-card style="width: 25rem; overflow: hidden">
      <template #title>{{ $t('home.average-performance') }}</template>
      <template #content>
        <p><strong> {{ $t('home.average.Volts') }}: </strong> {{ averagePerformance.avgVolts }}</p>
        <p><strong>{{ $t('home.average.Watts') }}:</strong> {{ averagePerformance.avgWatts }}</p>
        <p><strong>{{ $t('home.average.hp') }}:</strong> {{ averagePerformance.avgHP }}</p>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.home-container {
  margin: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
