<template>
  <div>
    <el-input aria-placeholder="可以输入用户名"
              prefix-icon="el-icon-search"
              v-model="searchContent"
              style="width: 20%">

    </el-input>
    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    <el-button type="primary" icon="el-icon-back" @click="returnHome">返回</el-button>
    <br/>
    <el-table :data="tableData" style="left: 250px">
      <el-table-column prop="id" label="编号" width="240"></el-table-column>
      <el-table-column prop="name" label="姓名" width="220"></el-table-column>
      <el-table-column prop="password" label="密码" width="240"></el-table-column>
      <el-table-column label="图片" width="240">
        <template slot-scope="imgs">
          <el-image style="width: 100px;height: 100px"
                    :src="'data:image/jpg;base64,'+imgs.row.img">
          </el-image>

        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="deleteById(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br/>
    <el-pagination background
                   layout="prev,pager,next"
                   :page-size="pageSize"
                   :total="total"
                   @current-change="change">

    </el-pagination>

  </div>
</template>

<script>
import axios from "axios";
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
  comments: {ElImageViewer},
  name: "user",
  methods: {
    returnHome() {
      const _this = this;
      window.location.reload();
    },
    search() {
      var _this = this;
      alert(_this.searchContent);
      if (_this.searchContent.length == 0 || _this.searchContent === '') {
        _this.$message.warning("请输入查询内容")
      } else {
        axios.get("http://localhost:8081/love/user-manager/name/" + this.searchContent).then(function (resp) {
          console.log(resp.data.data);
          _this.tableData = resp.data.data;
          _this.total = resp.data.length;

        })
      }
    },
    change(currentPage) {
      console.log(currentPage)
      var _this = this;
      axios.get("http://localhost:8081/love/user-manager" + (currentPage - 1) / 6).then(function (resp) {
        console.log(resp)
        _this.tableData = resp.data.data;
        _this.total = resp.data.totalElements;
      })
    },
    edit(row) {
      this.$router.push({
        path: '/updata',
        query: {
          id: row.id
        }
      })
    },
    deleteById(row) {
      const _this = this;
      _this.$confirm('确认删除吗？是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete("http://localhost:8081/love/user-manager" + row.id).then(function (resp) {
          _this.$message({
            type: 'success',
            message: '删除成功'
          });
          clearTimeout(_this.timer);
          _this.timer = setTimeout(() => {
            window.location.reload();
          }, 1000)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  data() {
    return {
      searchContent: '',
      pageSize: 6,
      total: 10,
      tableData: [],
      img: ''
    }
  },
  created: function () {
    var _this = this;
    axios.get("http://localhost:8081/love/user-manager").then(function (resp) {
          console.log(resp.data.data);
          _this.tableData = resp.data.data;
          _this.total = resp.data.totalElements;
        }
    )
  }
}

</script>

<style scoped>

</style>