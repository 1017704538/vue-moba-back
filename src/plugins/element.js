import Vue from 'vue'
import {
    Container, 
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    Icon,
    MenuItem,
    MenuItemGroup,
    Form,
    FormItem,
    Input,
    Button,
    Message,
    MessageBox,
    Table,
    TableColumn,
    Dialog,
    Select,
    Option,
    Upload,
    Rate,
    Tabs,
    TabPane,
    Row,
    Col

} from 'element-ui'

Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Icon)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Rate)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
