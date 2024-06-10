<template>

    <div class="main-panel" style="margin-left:150px; width:950px">
        <div class="content-wrapper">
            <div class="row">
                <h1>Natural Language Query</h1>
                <input v-model="query" placeholder="Enter your query" />
                <button @click="sendQuery">Send Query</button>
                <div class="col-md-6  grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <div v-if="chatglmResults.length">
                                <h2>Results by GLM 3.6</h2>
                                <p class="card-title">Query Results</p>
                                <div class="table-responsive">
                                    <table id="query-results-listing-glm36" class="table">
                                        <thead>
                                        <tr>
                                            <th v-for="column in chatglmColumns" :key="column">{{ column }}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(row, rowIndex) in chatglmResults" :key="rowIndex">
                                            <td v-for="(value, key) in row" :key="key">{{ value }}</td>
                                        </tr>
                                        </tbody>
                                </table>
                                </div>
                                <div v-if="chatglmError" class="error">{{ chatglmError }}</div>
                            </div>
                     </div>
                    </div>
                </div>
                <div class="col-md-6  grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            
                            <div v-if="zhipuResults.length">
                                <h2>Results by GLM 4</h2>
                                <p class="card-title">Query Results</p>
                                <div class="table-responsive">
                                    <table id="query-results-listing-glm4" class="table">
                                        <thead>
                                        <tr>
                                            <th v-for="column in zhipuColumns" :key="column">{{ column }}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(row, rowIndex) in zhipuResults" :key="rowIndex">
                                            <td v-for="(value, key) in row" :key="key">{{ value }}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="zhipuError" class="error">{{ zhipuError }}</div>
                            </div>
                        </div>
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
        chatglmColumns: [],
        chatglmResults: [],
        chatglmError: '',
        zhipuColumns: [],
        zhipuResults: [],
        zhipuError: '',
      }
    },
    methods: {
      sendQuery() {
        axios.post('http://127.0.0.1:8000/natural_sql/', { query: this.query })
          .then(response => {
            if (response.data.chatglmColumns && response.data.chatglmResults) {
                this.chatglmColumns = response.data.chatglmColumns;
                this.chatglmResults = response.data.chatglmResults;
            }
            if (response.data.zhipuColumns && response.data.zhipuResults) {
                this.zhipuColumns = response.data.zhipuColumns;
                this.zhipuResults = response.data.zhipuResults;
            }
          })
          .catch(error => {
            console.error('Error sending query:', error)
            this.chatglmError = 'Error sending query: ' + error;
            this.zhipuError = 'Error sending query: ' + error;
          })
      }
    }
  }
 </script>
 <style scoped>

</style>
