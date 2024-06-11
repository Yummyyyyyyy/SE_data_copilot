<template>

    <div class="main-panel" style="margin-left:150px; width:950px">
        <div class="content-wrapper">
            <h1>Natural Language Query</h1>
            <div class="row">

                <div class="col-md-8">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">目标查询数据库：</label>
                        <div class="col-sm-9">
                            <select v-model="selectedDatabase" class="form-control">
                                <option v-for="database in databases" :value="database">{{ database }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="input-group grid-margin">
                    <input v-model="query" type="text" class="form-control" placeholder="Enter your query">
                    <div class="input-group-append">
                    <button @click="sendQuery" class="btn btn-sm btn-primary" type="button">Send Query</button>
                    </div>
                </div>
            
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
                <div class="col-md-6  grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <div v-if="sparkResults.length">
                                <h2>Results by Spark LLM</h2>
                                <p class="card-title">Query Results</p>
                                <div class="table-responsive">
                                    <table id="query-results-listing-spark" class="table">
                                        <thead>
                                        <tr>
                                            <th v-for="column in sparkColumns" :key="column">{{ column }}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(row, rowIndex) in sparkResults" :key="rowIndex">
                                            <td v-for="(value, key) in row" :key="key">{{ value }}</td>
                                        </tr>
                                        </tbody>
                                </table>
                                </div>
                                <div v-if="sparkError" class="error">{{ sparkError }}</div>
                            </div>
                     </div>
                    </div>
                </div>
                <div class="col-md-6  grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <div v-if="tencentResults.length">
                                <h2>Results by Tencent</h2>
                                <p class="card-title">Query Results</p>
                                <div class="table-responsive">
                                    <table id="query-results-listing-tencent" class="table">
                                        <thead>
                                        <tr>
                                            <th v-for="column in tencentColumns" :key="column">{{ column }}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(row, rowIndex) in tencentResults" :key="rowIndex">
                                            <td v-for="(value, key) in row" :key="key">{{ value }}</td>
                                        </tr>
                                        </tbody>
                                </table>
                                </div>
                                <div v-if="tencentError" class="error">{{ tencentError }}</div>
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
        // 传送数据库名和查询语句
        query: '',
        selectedDatabase: '',
        databases: [], 
        // 用于保存结果
        chatglmColumns: [],
        chatglmResults: [],
        chatglmError: '',
        zhipuColumns: [],
        zhipuResults: [],
        zhipuError: '',
        sparkColumns: [],
        sparkResults: [],
        sparkError: '',
        tencentColumns: [],
        tencentResults: [],
        tencentError: '',
      }
    },
    methods: {
      sendQuery() {
        if (!this.selectedDatabase) {
                alert('请选择要查询的数据库！');
                return;
        }
        axios.post('http://127.0.0.1:8000/natural_sql/', { query: this.query,database: this.selectedDatabase })
          .then(response => {
            if (response.data.chatglmColumns && response.data.chatglmResults) {
                this.chatglmColumns = response.data.chatglmColumns;
                this.chatglmResults = response.data.chatglmResults;
            }
            if (response.data.zhipuColumns && response.data.zhipuResults) {
                this.zhipuColumns = response.data.zhipuColumns;
                this.zhipuResults = response.data.zhipuResults;
            }
            if (response.data.sparkColumns && response.data.sparkResults) {
                this.sparkColumns = response.data.sparkColumns;
                this.sparkResults = response.data.sparkResults;
            }
            if (response.data.tencentColumns && response.data.tencentResults) {
                this.tencentColumns = response.data.tencentColumns;
                this.tencentResults = response.data.tencentResults;
            }
          })
          .catch(error => {
            console.error('Error sending query:', error)
            this.chatglmError = 'Error sending query: ' + error;
            this.zhipuError = 'Error sending query: ' + error;
            this.sparkError = 'Error sending query: ' + error;
            this.tencentError = 'Error sending query: ' + error;
          })
      }
    },
    mounted() {
        // 获取数据库列表
        axios.get('http://127.0.0.1:8000/databases/')
            .then(response => {
                this.databases = response.data.databases;
                if (this.databases.length > 0) {
                    this.selectedDatabase = this.databases[0];
                }
            })
            .catch(error => {
                console.error('Error fetching databases:', error)
            })
    }

  }
 </script>
 <style scoped>

</style>
