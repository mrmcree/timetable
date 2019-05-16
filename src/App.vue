<template>
  <div id="app">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form>
        <el-form-item label="课程名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.subTitle"></el-input>
        </el-form-item>
        <el-time-select
          placeholder="起始时间"
          v-model="form.startTime"
          :picker-options="{
            start: '07:00',
            step: '00:05',
            end: '23:30'
          }"
        ></el-time-select>

        <el-time-select
          placeholder="结束时间"
          v-model="form.endTime"
          :picker-options="{
          start: '07:00',
          step: '00:05',
          end: '23:30',
          minTime: form.startTime
        }"
        ></el-time-select>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="time-table">
      <div class="table-left">
        <div class="left-header">TABLE</div>
        <div class="left-content">
          <div class="f1">上午</div>
          <div class="f2">下午</div>
        </div>
      </div>
      <div class="table-right">
        <div class="table-header">
          <div
            class="header-item"
            v-for="(i,index) in month"
            :key="index"
            :class="{'holiday':index>4,'today-active':todayNum===index+1}"
          >星期{{i}}</div>
        </div>
        <div class="table-content">
          <div class="tables">
            <div class="table" v-for="(i,index) in tableData" :key="index">
              <div class="table-cell" v-for="(item,index) in i" :key="index">
                <div class="name">{{item.name}}</div>
                <div class="subTitle">{{item.subTitle}}</div>
                <div class="time" v-show="item.startTime">{{item.startTime +'-'}}{{item.endTime}}</div>
              </div>
            </div>
          </div>

          <div class="content-wrapper">
            <div class="ctx-item" v-for="(i,index) in month" :key="index">
              <div class="add el-icon-plus" @click="addItem(index)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "app",
  data() {
    return {
      todayNum: 1,
      dialogVisible: false,
      month: ["一", "二", "三", "四", "五", "六", "天"],
      form: {
        name: "",
        subTitle: "",
        startTime: "",
        endTime: ""
      },
      newTime: "",
      index: ""
      // tableData: [[], [], [], [], [], [], []],
    };
  },
  // watch: {
  //   newTime(newV, oldV) {
  //     console.log(newV, oldV,'JAHHAHAHAHHAHAHAHAHAHH');
  //   }
  // },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    addItem(index) {
      this.dialogVisible = true;
      this.index = index;
    },
    submit() {
      let { name, subTitle, startTime, endTime } = this.form;
      let index = this.index;
      this.addTableData({
        name,
        subTitle,
        startTime,
        endTime,
        index
      });
      Object.keys(this.form).forEach(key => (this.form[key] = ""));
      this.dialogVisible = false;
    },
    ...mapActions(["initToday"]),
    ...mapMutations({
      addTableData: "ADD_TABLE"
    })
  },

  computed: {
    ...mapGetters(["today", "tableData"])
  },
  mounted() {
    this.initToday();
    this.todayNum = this.today;
    setInterval(() => {
      let today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      this.newTime = `${h}:${m}`;
      console.log(this.newTime);
      let that = this;
      this.tableData.forEach((value, index) => {
        value.forEach(item => {
          if (that.newTime === item.startTime) {
            this.$message(`${item.name}时间开始了`);
          }
          if (that.newTime === item.endTime) {
            this.$message(`${item.name}时间结束了`);
          }
        });
      });
    }, 5000);
  }
};
</script>

<style lang='scss' scoped>
* {
  margin: 0;
  padding: 0;
}
.time-table {
  width: 90%;
  margin: 0 auto;
  display: flex;
  text-align: center;
  .table-left {
    flex-basis: 10%;

    .left-header {
      height: 50px;
      line-height: 50px;
    }
  }
  .table-right {
    flex-basis: 90%;
    .tables {
      display: flex;
      justify-content: space-between;
      .table {
        flex-basis: calc(100% / 7);
        
        .table-cell {
          min-height: 50px;
          margin: 10px 0;
          width: 100%;
          /* border-bottom: 1px dotted red; */
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          div{
            width: 100%;
          }
        }
      }
    }
  }
  .table-header {
    display: flex;
    height: 50px;
    line-height: 50px;
    justify-content: space-between;
  }
  .content-wrapper {
    display: flex;
    justify-content: space-between;
    .ctx-item {
      flex-basis: calc(100% / 7);
    }
  }
  .header-item {
    cursor: pointer;
    flex-basis: calc(100% / 7);
  }
  .today-active {
    color: red;
  }
  .holiday {
    color: rgb(240, 208, 30);
  }
}
</style>
