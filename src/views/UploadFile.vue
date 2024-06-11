<template>
    <div class="main-panel" style="margin-left:150px; width:950px">
        <div class="content-wrapper">
            <div class="row">
                <div class="col-12 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">上传.sql文件并指定自己的数据库名,创建自己的数据库</h4>
                            <div class="form-group">
                                <label>SQL File upload</label>
                                <input v-model="databaseName" type="text" class="form-control" placeholder="Your database name">
                                <input ref="fileInput" type="file" class="file-upload-default" @change="handleFileUpload">
                                <div class="input-group col-xs-12">
                                    <input type="text" ref="fileUploadInfo" class="form-control file-upload-info" disabled placeholder="Upload SQL file">
                                    <span class="input-group-append">
                                        <button class="file-upload-browse btn btn-primary" type="button" @click="triggerFileUpload">Browse</button>
                                    </span>
                                </div>
                            </div>
                            <button class="btn btn-success" type="button" @click="uploadFile">Upload</button>
                            <div v-if="uploadSuccess" class="success-message">{{ successMessage }}</div>
                            <div v-if="uploadError" class="error-message">{{ errorMessage }}</div>
                            <div v-if="dbCreated" class="db-message">{{ dbMessage }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import { ref } from 'vue';

export default {
    data() {
        return {
            file: null,
            uploadSuccess: false,
            uploadError: false,
            successMessage: '',
            errorMessage: '',
            dbCreated: false,
            dbMessage: '',
            databaseName: '',
        };
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
            this.$refs.fileUploadInfo.value = this.file ? this.file.name : '';
        },
        triggerFileUpload() {
            this.$refs.fileInput.click();
        },
        uploadFile() {
            // 检查文件类型是否为 .sql
            if (!this.file || !this.file.name.endsWith('.sql')) {
                alert('仅支持上传 .sql 文件');
                return;
            }
            const formData = new FormData();
            formData.append('file', this.file);
            formData.append('database_name', this.databaseName);
            console.log(formData); 

            axios.post('http://127.0.0.1:8000/upload_file/', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                this.uploadSuccess = true;
                this.uploadError = false;
                this.successMessage = response.data.message;
                this.dbCreated = response.data.db_created;
                this.dbMessage = response.data.db_message;
            })
            .catch(error => {
                this.uploadSuccess = false;
                this.uploadError = true;
                this.errorMessage = error.response.data.message;
            });
        }
    },
    
};
</script>
<style scoped>

</style>
