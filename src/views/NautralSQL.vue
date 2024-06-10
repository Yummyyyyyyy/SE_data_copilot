<template>
    <div>
      <h1>Natural Language Query</h1>
      <input v-model="query" placeholder="Enter your query" />
      <button @click="sendQuery">Send Query</button>

      <div v-if="results.length">
        <h2>Results</h2>

        <div class="col-md-12 stretch-card">
        <div class="card">
          <div class="card-body">
            <p class="card-title">Query Results</p>
            <div class="table-responsive">
              <table id="query-results-listing" class="table">
                <thead>
                  <tr>
                    <th v-for="column in columns" :key="column">{{ column }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, rowIndex) in results" :key="rowIndex">
                    <td v-for="(value, key) in row" :key="key">{{ value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="error" class="error">{{ error }}</div>
          </div>
        </div>
        </div>

      </div>


    </div>
</template>
  
<script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        query: '',
        results: []
      }
    },
    methods: {
      sendQuery() {
        axios.post('http://127.0.0.1:8000/natural_sql/', { query: this.query })
          .then(response => {
            this.columns = response.data.columns
            this.results = response.data.results
          })
          .catch(error => {
            console.error('Error sending query:', error)
          })
      }
    }
  }
 </script>
 <style scoped>

</style>