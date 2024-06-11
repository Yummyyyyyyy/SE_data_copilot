<template>
    <div class="main-panel" style="margin-left:150px; width:950px">
        <div class="content-wrapper">
            <h1>查询历史记录</h1>
            
            <!-- 上面的卡片：显示历史记录的摘要 -->
            <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body" style="max-height: 300px; overflow-y: auto;">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>目标查询数据库</th>
                                        <th>查询自然语言语句</th>
                                        <th>查询时间</th>
                                        <th>结果</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(record, index) in records" :key="record.id">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ record.database }}</td>
                                        <td>{{ record.query }}</td>
                                        <td>{{ new Date(record.timestamp).toLocaleString() }}</td>
                                        <td>
                                            <button @click="viewResults(record)" class="btn btn-outline-secondary">查看</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 下面的卡片：显示选中的查询结果 -->
            <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body" style="max-height: 300px; overflow-y: auto;">
                        <div v-if="selectedRecord">
                            <p class="card-title">Query Results</p>
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th v-for="column in selectedRecord.columns" :key="column">{{ column }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(row, rowIndex) in selectedRecord.rows" :key="rowIndex">
                                            <td v-for="(value, key) in row" :key="key">{{ value }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-if="selectedRecord.error" class="error">{{ selectedRecord.error }}</div>
                        </div>
                        <div v-else>
                            <p>请选择一条记录查看详情</p>
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
            records: [],
            selectedRecord: null,
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/get_records/')
            .then(response => {
                this.records = response.data.records;
            })
            .catch(error => {
                console.error('Error fetching records:', error);
            });
    },

    methods: {
        viewResults(record) {
            console.log('record:', record);
            console.log('record.results:', record.results);
            
            // 检查结果是否存在
            if (record.results) {
                // 深拷贝结果对象
                const results = JSON.parse(JSON.stringify(record.results));
                console.log('results:', results);
                console.log(results.columns);
                // 检查结果是否包含columns属性
                if (results.columns) {
                    // 提取列名
                    const columns = Object.keys(results.columns[0]);
                    console.log('columns:', columns);
                    const rows = results.columns.map(column => Object.values(column));
                    console.log('rows:', rows);
                    this.selectedRecord = {
                        columns: columns,
                        rows: rows
                    };
                    console.log('selectedRecord:', this.selectedRecord);
                    
                } else {
                    console.error('Columns not found in results:', results);
                    // 如果结果中未找到columns属性，则清空selectedRecord
                    this.selectedRecord = {
                        columns: [],
                        rows: []
                    };
                    console.log('selectedRecord:', this.selectedRecord);
                }
            }else {
                // 如果结果不存在，则清空selectedRecord
                this.selectedRecord = {
                    columns: [],
                    rows: []
                };
                console.log('selectedRecord:', this.selectedRecord);
            }

        }
    }
}
</script>

<style scoped>
.card-body {
    max-height: 500px;
    overflow-y: auto;
}

</style>
