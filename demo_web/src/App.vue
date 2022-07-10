<template>
  <div class="main">
    <div class="head">
      <div class="headTitle">Tasks</div>
      <div>
        <el-select v-model="listInfo.selevtVal" placeholder="Filter by assignee" size="large" clearable
          @clear="getTaskList" @change="getTaskList">
          <el-option :value="item.UserId" v-for="item in listInfo.userList" :label="`${item.Name}---${item.UserId}`" />
        </el-select>
      </div>
    </div>
    <PhaseItem :list="listInfo.p1list" label="Phase1" @sortChange="sortChange" />
    <PhaseItem :list="listInfo.p2list" label="Phase2" @sortChange="sortChange" />
    <PhaseItem :list="listInfo.p3list" label="Phase3" @sortChange="sortChange" />
    <PhaseItem :list="listInfo.ulist" label="Uncategorised" @sortChange="sortChange" />
  </div>
  <el-empty description="暂无数据" v-show="listInfo.list.length === 0" />
</template>

<script setup>
import { getTask, getUser } from '@/api/api'
import { reactive, onMounted } from 'vue'
import PhaseItem from '@/components/PhaseItem.vue'

// 定义数据
let listInfo = reactive({
  list: [],
  userList: [],
  selevtVal: '',
  p1list: [],
  p2list: [],
  p3list: [],
  ulist: []
})


// 获取列表数据
const getTaskList = () => {
  getTask({
    search: listInfo.selevtVal
  }).then((res) => {
    listInfo.list = res.result.list
    let p1list = []
    let p2list = []
    let p3list = []
    let ulist = []
    res.result.list.forEach(item => {
      if (!item.Phase) {
        ulist.push(item)
      } else if (item.Phase == 1) {
        p1list.push(item)
      } else if (item.Phase == 2) {
        p2list.push(item)
      } else if (item.Phase == 3) {
        p3list.push(item)
      }
    });
    listInfo.p1list = p1list
    listInfo.p2list = p2list
    listInfo.p3list = p3list
    listInfo.ulist = ulist
  })
}

// 获取下拉列表数据
const getUserList = () => {
  getUser({}).then((res) => {
    listInfo.userList = res.result.list
  })
}

// 排序改变
const sortChange = () => {
  getTaskList()
}

onMounted(() => {
  getTaskList()
  getUserList()
})

</script>

<style>
.main {
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
}

.head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.headTitle {
  font-size: 20px;
  font-weight: 700;
}

.bigBox {
  display: flex;
  margin-bottom: 20px;
}

.label {
  width: 16.66%;
  max-width: 200px;
  color: #fff;
  background-color: #ccc;
  padding: 20px;
  box-sizing: border-box;
  word-break: break-all;
}

.label.Phase1 {
  background-color: #000;
}

.label.Phase2 {
  background-color: #666;
}

.label.Phase3 {
  background-color: #999;
}

.content {
  width: 83.34%;
  max-width: 1000px;
}

.wrapper {
  width: 100%;
  background-color: #eee;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.aBlock {
  width: 33.3%;
  max-width: 306px;
  min-width: 283px;
  margin: 10px;
  background-color: #fff;
  padding: 20px;
  border-radius: 3px;
  box-sizing: border-box;
  word-break: break-all;
}

.taskName {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
}

.description {
  height: 60px;
  font-size: 12px;
}

.other {
  height: 30px;
}

.icon {
  display: inline-block;
  width: 25px;
  height: 25px;
  background-color: #ccc;
  border-radius: 50%;
  float: left;
  margin-right: 5px;
}

.assignee {
  display: inline-block;
  height: 25px;
  line-height: 25px;
  float: left;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.btn {
  background-color: skyblue;
  color: #fff;
  padding: 8px 10px;
  border-radius: 5px;
}

.btn.priority1 {
  background-color: blue;
}

.btn.priority2 {
  background-color: #4848df;
}

.btn.priority3 {
  background-color: #5a5adb;
}

.btn.priority4 {
  background-color: #515195;
}

.btn.priority5 {
  background-color: #4a4a66;
}

.btn.priority6 {
  background-color: #676781;
}

.btn.priority7 {
  background-color: #8c8c9d;
}

.btn.priority8 {
  background-color: #ccc;
}

@media only screen and (max-width: 767px) {
  .main {
    width: 100%;
    margin: 20px 0;
    overflow-x: hidden;
  }

  .label {
    width: 20%;
    padding: 10px 5px;
  }

  .content {
    width: 80%;
  }

  .wrapper {
    width: 100%;
  }

  .aBlock {
    width: 100%;
    max-width: 100%;
    min-width: 90%;
  }

  .btn {
    padding: 5px 8px;
    font-size: 12px;
  }
}
</style>
