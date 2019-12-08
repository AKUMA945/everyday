import Home from "../views/Home"
import Login from "../views/Login"
import Register from "../views/Register"
import Circle from "../views/home/Circle"
import Mine from "../views/home/Mine"

const router = [{
    path:"/home",
    component:Home,
    children:[{
        path:"/home/circle",
        component:Circle
    },{
        path:"/home/mine",
        component:Mine
    },{
        path:"/home",
        redirect:"/home/circle"
    }]
},{
    path:"/login",
    component:Login
},{
    path:"/register",
    component:Register
},{
    path:"/",
    redirect:"/home"
}]

export default router