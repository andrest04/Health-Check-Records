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
      <h1>Health Check Records</h1>
      <pv-data-table :value="combinedData" removableSort paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]" tableStyle="min-width: 50rem"
                     paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                     currentPageReportTemplate="{first} to {last} of {totalRecords}">
        <template #paginatorstart>
          <pv-button type="button" icon="pi pi-refresh" text />
        </template>
        <template #paginatorend>
          <pv-button type="button" icon="pi pi-download" text />
        </template>
        <pv-column field="id" header="Record Id" sortable style="width: 10%"/>
        <pv-column field="treadmillId" header="Treadmill Id" sortable style="width: 10%"/>
        <pv-column field="serialNumber" header="Serial Number" sortable style="width: 10%"/>
        <pv-column field="centerName" header="Center Name" sortable style="width: 10%"/>
        <pv-column field="date" header="Date" sortable style="width: 10%"/>
        <pv-column field="time" header="Time" sortable style="width: 10%"/>
        <pv-column field="volts" header="Volts" sortable style="width: 10%"/>
        <pv-column field="watts" header="Watts" sortable style="width: 10%"/>
        <pv-column field="hp" header="HP" sortable style="width: 10%"/>
      </pv-data-table>
    </div>
  </div>
</template>