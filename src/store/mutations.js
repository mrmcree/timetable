//mutation 负责修改state
import * as types from "./mutation-types";
const mutations = {
  [types.INIT_TODAY](state, value) {
    state.today = value;
  },
  [types.ADD_TABLE](state, value) {
    let { name, subTitle, startTime, endTime,index } = value;
    state.tableData[index].push({
      name,
      subTitle,
      startTime,
      endTime
    });
  }
};
export default mutations;
