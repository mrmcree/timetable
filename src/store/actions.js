//action 负责异步操作
import * as types from "./mutation-types";
function getDate() {
  let date = new Date();
  let day = date.getDay(); //星期几
  let timeStamp = date.getTime(); //时间戳
  return {
    day,
    timeStamp
  };
}
export const initToday = ({ commit, state }) => {
  let day = getDate().day;
  commit(types.INIT_TODAY, day);
};
