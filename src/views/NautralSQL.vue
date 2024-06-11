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
                        <div  v-if="tencentResults.length" class="btn-group" role="group" aria-label="Basic example">
                          <button @click="saveRecord(tencentColumns, tencentResults)" type="button" class="btn btn-outline-secondary">选择并保存为记录</button>
                          <button @click="visualizeSql(tencentuColumns, tencentResults)" type="button" class="btn btn-outline-secondary">可视化</button>
                          <button  @click="exportCSV('Tencent',tencentColumns, tencentResults)" type="button" class="btn btn-outline-secondary">导出</button>
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
                        <div  v-if="zhipuResults.length" class="btn-group" role="group" aria-label="Basic example">
                          <button @click="saveRecord(zhipuColumns, zhipuResults)" type="button" class="btn btn-outline-secondary">选择并保存为记录</button>
                          <button @click="visualizeSql(zhipuColumns, zhipuResults)" type="button" class="btn btn-outline-secondary">可视化</button>
                          <button  @click="exportCSV('Zhipu',zhipuColumns, zhipuResults)" type="button" class="btn btn-outline-secondary">导出</button>
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
                        <div  v-if="sparkResults.length" class="btn-group" role="group" aria-label="Basic example">
                            <button @click="saveRecord(sparkColumns, sparkResults)" type="button" class="btn btn-outline-secondary">选择并保存为记录</button>
                            <button @click="visualizeSql(sparkColumns, sparkResults)" type="button" class="btn btn-outline-secondary">可视化</button>
                            <button  @click="exportCSV('Spark',sparkColumns, sparkResults)" type="button" class="btn btn-outline-secondary">导出</button>
                        </div>
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
                     <div  v-if="chatglmResults.length" class="btn-group" role="group" aria-label="Basic example">
                            <button @click="saveRecord(chatglmColumns, chatglmResults)" type="button" class="btn btn-outline-secondary">选择并保存为记录</button>
                            <button @click="visualizeSql(chatglmColumns, chatglmResults)" type="button" class="btn btn-outline-secondary">可视化</button>
                            <button  @click="exportCSV('Chatglm',chatglmColumns, chatglmResults)" type="button" class="btn btn-outline-secondary">导出</button>
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
        },
      
        saveRecord(modelName, columns, results) {
            const record = {
                database: this.selectedDatabase,
                query: this.query,
                results: { columns, rows: results },
                timestamp: new Date().toISOString(),
            };
            axios.post('http://127.0.0.1:8000/save_record/', record)
                .then(response => {
                    alert('记录已保存');
                })
                .catch(error => {
                    console.error('Error saving record:', error);
                });
        },
      

        exportCSV(modelName, columns, results) {
            if (!results || !columns) {
            console.error('Invalid result data for CSV export');
            return;
            }

            // 构建 CSV 数据
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += columns.join(",") + "\n";
            results.forEach(row => {
            const values = columns.map(column => row[column]);
            csvContent += values.join(",") + "\n";
            });

            // 创建下载链接并触发下载
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `${modelName}_query_results.csv`);
            document.body.appendChild(link);
            link.click();
        },

        visualizeSql(columns, results) {
            this.$store.commit('updateVisualData', { columns, results });
            this.$router.push({ name: 'Visualize' });
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
                console.error('Error fetching databases:', error);
            })
    }

}
 </script>
 <style scoped>

</style>
