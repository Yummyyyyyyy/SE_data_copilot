<template>
  <div class="container container-custom">
    <h2>可视化图表展示</h2>
    <button @click="selectChartType('pie')">饼图</button>
    <button @click="selectChartType('line')">折线图</button>
    <button @click="selectChartType('bar')">柱状图</button>
    
     
  </div>
  
  <img v-if="chartImageData" :src="chartImageData" alt="Chart">
</template>
  
<script >
import axios from 'axios';

export default {
  computed: {
    columns() {
      return this.$store.state.visualData.columns;
    },
    results() {
      return this.$store.state.visualData.results;
    }
  },
  data() {
    return {
      chartImageData: ''
    };
  },
  methods: {
    selectChartType(type) {
      console.log(type);
      console.log(this.columns);
      console.log(this.results);
      
      axios.post('http://127.0.0.1:8000/visualize/', JSON.stringify({
        chart_type: type,
        columns: this.columns,
        results: this.results
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        const imageData = response.data.image_data;
        this.chartImageData = `data:image/png;base64,${imageData}`;
      })
      .catch(error => {
        console.error('Error sending chart type for visualization:', error);
      });
    }
  }
};
  
 </script>

  
<style scoped>
  
</style>
  