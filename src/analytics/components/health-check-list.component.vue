<script>
import {HealthCheckService} from "../services/healthCheck.service.js";
import {CenterService} from "../services/center.service.js";
import {TreadmillService} from "../services/treadmill.service.js";

export default {
  name: "health-check-list",
  data() {
    return {
      combinedData: [],
      healthCheckService: new HealthCheckService(),
      centerService: new CenterService(),
      treadmillService: new TreadmillService(),
    };
  },
  mounted() {
    // Fetch data for health checks, centers, and treadmills simultaneously
    Promise.all([
      this.healthCheckService.getAll(),
      this.centerService.getAll(),
      this.treadmillService.getAll()
    ])
        .then(([healthCheckResponse, centerResponse, treadmillResponse]) => {
          const healthChecks = healthCheckResponse.data;
          const centers = centerResponse.data;
          const treadmills = treadmillResponse.data;

          // Combine data from health checks, treadmills, and centers
          this.combinedData = healthChecks.map(item => {
            const treadmill = treadmills.find(treadmill => String(treadmill.id) === String(item.treadmillId));
            const center = treadmill ? centers.find(center => String(center.id) === String(treadmill.centerId)) : null;

            return {
              ...item,
              date: `${item.year}-${String(item.month).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`,
              time: `${String(item.hour).padStart(2, '0')}:${String(item.minutes).padStart(2, '0')}:${String(item.seconds).padStart(2, '0')}`,
              centerName: center ? center.name : "Unknown",  // Use center name if found, else "Unknown"
              serialNumber: treadmill ? treadmill.serialNumber : "Unknown"  // Use treadmill serial number
            };
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  }
}
</script>

<template>
  <div class="health-check-list-container">
    <div class="card">
      <h1>{{ $t('health-checks.health-check-records') }}</h1>
      <pv-data-table :value="combinedData" removableSort paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]" tableStyle="min-width: 50rem"
                     paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                     currentPageReportTemplate="{first} to {last} of {totalRecords}">
        <template #paginatorstart>
          <pv-button type="button" icon="pi pi-refresh" text />
        </template>
        <template #paginatorend>
          <pv-button type="button" icon="pi pi-download" text />
        </template>
        <pv-column field="id" :header="$t('health-checks.table.records-id')" sortable style="width: 10%"/>
        <pv-column field="treadmillId" :header="$t('health-checks.table.treadmill-id')" sortable style="width: 10%"/>
        <pv-column field="serialNumber" :header="$t('health-checks.table.serial-number')" sortable style="width: 10%"/>
        <pv-column field="centerName" :header="$t('health-checks.table.center-name')" sortable style="width: 10%"/>
        <pv-column field="date" :header="$t('health-checks.table.date')" sortable style="width: 10%"/>
        <pv-column field="time" :header="$t('health-checks.table.Time')" sortable style="width: 10%"/>
        <pv-column field="volts" :header="$t('health-checks.table.Volts')" sortable style="width: 10%"/>
        <pv-column field="watts" :header="$t('health-checks.table.Watts')" sortable style="width: 10%"/>
        <pv-column field="hp" :header="$t('health-checks.table.hp')" sortable style="width: 10%"/>
      </pv-data-table>
    </div>
  </div>
</template>