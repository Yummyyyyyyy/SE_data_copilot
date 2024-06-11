<template>
  <div class="main-panel" style="margin-left:150px; width:950px">
    <div class="content-wrapper">
      <div class="row" >
      <div class="col-md-4 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Database Tables</h4>
            <select v-model="selectedDatabase" class="form-control">
              <option v-for="database in databases" :value="database">{{ database }}</option>
            </select>
            <button class="btn btn-primary mt-3" @click="fetchTables">Confirm</button>
            <ul class="list-group mt-3">
              <li class="list-group-item" v-for="table in tables" :key="table">
                <button @click="selectTable(table)" class="btn btn-link">{{ table }}</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-8 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Table Data</h4>
            <div v-if="selectedTable">
              <table class="table">
                <thead>
                  <tr>
                    <th v-for="column in columns" :key="column">{{ column }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in rows" :key="index">
                    <td v-for="(value, key) in row" :key="key">{{ value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>
              <p>No table selected</p>
            </div>
          </div>
        </div>
      </div>
      </div>    
    </div>   
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const selectedDatabase = ref('');
const databases = ref([]);
const tables = ref([]);
const selectedTable = ref('');
const columns = ref([]);
const rows = ref([]);

// 获取所有数据库
const fetchDatabases = () => {
 axios.get('http://127.0.0.1:8000/databases/')
   .then(response => {
     databases.value = response.data.databases;
     if (databases.value.length > 0) {
       selectedDatabase.value = databases.value[0];  // 选择第一个数据库
     }
   })
   .catch(error => {
     console.error(error);
   });
};

// 获取选定数据库的所有表名
const fetchTables = () => {
 axios.get(`http://127.0.0.1:8000/tables/${selectedDatabase.value}/`)
   .then(response => {
     tables.value = response.data.tables;
   })
   .catch(error => {
     console.error(error);
   });
};

// 获取选定表的所有数据
const fetchTableData = () => {
 axios.get(`http://127.0.0.1:8000/table/${selectedDatabase.value}/${selectedTable.value}/`)
   .then(response => {
     columns.value = response.data.columns;
     rows.value = response.data.rows;
   })
   .catch(error => {
     console.error(error);
   });
};

// 选择数据库后更新表和表数据
const selectDatabase = () => {
 fetchTables();
};

// 选择表后更新表数据
const selectTable = (table) => {
 selectedTable.value = table;
 fetchTableData();
};

// 初始加载时获取所有数据库
onMounted(fetchDatabases);
</script>

<style scoped>

</style>
