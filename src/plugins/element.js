import Vue from 'vue'
import { Button, Dialog, FormItem, Form, Input,MessageBox, TimeSelect, Message } from 'element-ui'
Vue.use(Button)
Vue.use(Dialog)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(TimeSelect)
Vue.use(Message)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

