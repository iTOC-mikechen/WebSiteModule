* 事件传播
    * 冒泡：
        * 事件委托
    * 捕获：
        btn.addEventListener('click',function(){},true)
    * 事件源对象：触发事件的节点对象
        > 在事件传播过程中不会改变： event.target
    * 阻止事件传播
        > event.stopPropagation(), event.cancelBubble=true;
* ES6中的扩展运算符: `...`
    * 扩展操作
    * 剩余操作
    ```js
        var goods = {name:'goods1',price:998,qty:10};
        var good2 = {...goods,price:1998}

        function sum(a,...b){
        }
        sum(10,20,30);
        sum(10,20,30,40);

        let {name,...o} = goods;

        let arr = [10,6,98,2,3,22,44,12,6,2,44];
        Math.max(...arr);// 等效于Math.max(10,6,98,2,3,22,44,12)

        [...new Set(arr)]
```

模块化开发规范与区别
    * commonJS      NodeJS              同步
    * ESMoudle      ES6                 同步（静态引入）
    * AMD/CMD       require.js/sea.js   异步
* Vue的computed与methods、data的区别
    ```js
        new Vue({
            data:{
                total:100
            },
            computed:{ // 缓存
                //sum(){ // getter
                    // 花费10s
                //},
                sum:{
                    get(){
                        return this.total;
                    },
                    set(newVal){
                        this.total = newVal
                    }
                }
            },
            methods:{
                cal(){
                    // 花费10s
                }
            }
        })

        cal();
        cal();
        sum
        sum
    ```
* jQuery中链式调用的原理
```js
    $('button').addClass('btn')
    $('button').on('click',function(){})
    $('button').attr('type','submit')

    $('button').addClass('btn').on('click',function(){}).attr('type','submit')
    // 在每个方法内返回实例this

    addClass(){

        return this
    },
    on(){

        return this
    },
    attr(){

        return this;
    }
```


生命周期函数执行过程
    1. beforeCreate
    2. created
    3. beforeMount
    4. mounted
* props与data
    * props为父组件传入的数据
* data为组件的数据

* 虚拟DOM
    * diff算法
    * key: 唯一且稳定
        * 没有key：采用复用原则
* 子组件在哪个生命周期函数最先获取到props传入的数据
    > created
* 父子组件的生命周期执行顺序
    1. 父组件beforeCreate
    2. 父组件created
    3. 父组件beforeMount
    4. 子组件beforeCreate
    5. 子组件created
    6. 子组件beforeMount
    7. 子组件mounted
    8. 父组件mounted
* 如何让代码停留5s
    ```js
        function sleep(time){
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve()
                },time)
            })
        }
        console.log('start')
        // 停留5s
        await sleep(5000);
        
        console.log('end');
    ```
* watch,computed,method,data
    ```js
        {{data.username}}
        // can not read the property username of undefined
        // 不能读取undefined的username属性
        data(){
            return {
                data:{}
            }
        },
        created(){
            let data = ajax()
            this.data = {username:'laoxie'}
        }
        beforeMounte(){}
        // 报错
        mounted()
        beforeUpdate(){}

        updated(){}
    ```
* 在父组件中如何调用子组件的方法
    * 组件层级: 父组件实例.children[0]
    * ref: 父组件实例.$refs.xxx

* Vue组件通讯方式
    * 父->子：props
    * 子->父：
        * 自定义事件
            * v-on
                ```js
                    <sub-component v-on:add="addItem" ref="sub"></sub-component>
                    // 父组件代码
                    this.$refs.sub.$on('add',addItem);
                    this.$children[0].$on('add',addItem);
                    this.$refs.sub.show()

                    // sub-component代码
                    this.$on('add',addItem)
                    this.show()
                ```
            * $emit()
        * 把父组件的方法传到子组件执行
    * 深层次组件组件通讯
        * 逐层传递
        * Bus总线
        * 根实例：this.$root
        * Vuex
        * 注入系统：provide / inject
            1. 父组件利用provide共享数据
            2. 子组件通过inject接收数据
                > 接收后，可以通过this.xxx访问
* 父组件中如何调用子组件方法
    * ref
    * 组件层级
* 专业术语
    * BE（Backend）   后端
    * FE（Frontend）  前端

* call,apply,bind三则的区别
    * 共同点：
        * 都是函数原型方法
        * 都能改变this指向
    * 不同点
        * call与apply参数不同
        * call&apply会自动执行函数，bind不会执行函数，而是会返回一个改变了this指向后的函数
        ```js
            //map,filter
            //arr.map(function(){})
            nodeList.map();// map is not a function
            Array.prototype.map.call(nodeList,function(item,idx){})
        ```
* 判断数据类型的方法
    * typeof
    * Object.prototype.toString

    ```js
        var a = 10;
        a.toString();//'10'
        Object.prototype.toString.call(a);
        function type(data){
            return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
        }
    ```
* this只能在函数中使用，表示当前对象，根据所处的环境不同代表不同的东西
    1. 是否通过 new 调用
    2. 是否通过 dot 调用
        * 包含事件绑定
    3. 是否被（call,apply,bind）修改过
    4. 指向window
* 事件中target与currentTarget的区别
    * target: 事件源对象（触发事件的元素）
    * currentTarget: 绑定事件的元素

* Object.assign(target,obj1,obj2,...objN)
    * 把后面的对象属性扩展到target
    * 应用
        * 扩展对象属性
        * 浅复制
* webpack与gulp的区别
    * gulp基于任务的构建工具
    * webpack是基于配置的构建工具

* hash路由原理
    > 核心：hashchange
    ```js
        window.onhashchange = function(){

        }
    ```
* hash路由如何改为history路由
    * 前端：mode改为'history'
    * 后端支持：让除静态资源与数据接口外的所有请求响应index.html
    ```js
        // node
        app.use(express.static('../public'))
        app.use('/api',allRouter)
        app.use((req,res)=>{
            fs.readFile('../public/index.html',(err,content)=>{
                res.set('content-type','text/html;charset=utf-8')
                res.send(content.toString())
            })
        })
    ```

* 以最快速度找出数组中最大值
    ```js
        let arr = [10,20,2,23,21]
        Math.max(...arr);
        Math.max.apply(null,arr)
        // arguments.map(function(){})
        Array.prototype.map.call(arguments,function(){})
        [].map.call()

        // 以最快的速度找出数组中两个数相加等于13的数
        let arr = [1,2,3,4,5,6,7,8,9,10]
    ```
* call,apply,bind三者的区别
* review 
* 环境
    * development
    * production
    * UAT
* Vue组件通讯
    * 父->子：props
    * 子->父：
        * 自定义事件
        * 父组件的方法传到子组件执行
    * 多层级组件通讯
        * Bus
        * Vuex
        * 注入系统：provide / inject
* 函数柯里化
