import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_REQUEST,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    CHECK_AUTHENTICATED_REQUEST,
    CHECK_AUTHENTICATED_MATCHED,
    TITLES_GET_REQUEST,
    TITLES_GET_SUCCESS,
    TITLES_GET_FAILURE,
    TAGS_REQUEST,
    TAGS_SUCCESS,
    TAGS_FAILURE,
    POST_ARTICLE_REQUEST,
    POST_ARTICLE_SUCCESS,
    POST_ARTICLE_FAILURE,
    SINGLE_REQUEST,
    SINGLE_SUCCESS,
    SINGLE_FAILURE,
    EDIT_ARTICLE_REQUEST,
    EDIT_ARTICLE_SUCCESS,
    EDIT_ARTICLE_FAILURE,
    DELETE_ARTICLE_REQUEST,
    DELETE_ARTICLE_SUCCESS,
    DELETE_ARTICLE_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    HOME,
    ARCHIVE,
    TAGS,
    SEARCH
} from '../constants/actionType'
import { checkHttpStatus } from '../utils' // 12.31 原来这里错了，应该加个大括号，作为变量输出来使用的。可以看看下面checkHttpStatus的用法，就知道这里应该加个大括号。这是第一个错误。
import jwtDecode from 'jwt-decode'
//12.16 原来fetch也需要引入？？
import fetch from 'isomorphic-fetch'

export const loginUserRequest = () =>{
    return {
        type: LOGIN_USER_REQUEST
    }
}
export const loginUserSuccess = (token) =>{
    localStorage.setItem('token',token)
    return {
        type: LOGIN_USER_SUCCESS,
        // 12.16重练 出现错误4 这里我直接写成了token:token
        payload: {
            token: token
        }
    }
}

//1.26 测试在store里能否调用嵌套函数。注意必须要有个return，否则不能用。
/*export const testLogin = (token) =>{
    // return loginUserSuccess(token) // 对的
    // dispatch(loginUserSuccess(token)) // 错的
//    这更是对的、正规的：必须是return dispatch 再dispatch：
    return dispatch => {
        dispatch(loginUserSuccess(token))
    }
}*/
//1.26 另外的收获学习：要是调试、或者actionCreators本身，都必须return开头。并且如果要dispatch来调用actions里的其他creators则必须如上那样写。
//1.26 所以得出来：在store里调用testLogin和loginUser是一样的，但至于为何loginUser不能生效，而testLogin能生效，只能说明，loginUser这个函数本身有问题。return dispatch => { dispatch(某actionCreator函数(和对应的参数))} 这是没问题的，问题应该在于这些内部的那些代码。所以考察loginUser的函数哪里有问题。


// 12.16重练 出现错误11 想过、但没用上,需要removeItem('token')；参数也传错了；函数体也错了
// export const loginUserFailure = (status) => {
//     return {
//         type: LOGIN_USER_FAILURE,
//         payload: {
//             status: status
//         }
//     }
// }
export const loginUserFailure = (error) => {
    localStorage.removeItem('token')//加引号是因为代码本身这样，移除只需一个参数，而去是固定加引号在token上，可以在控制台试试
    // console.log('Error', error.res.statusText)// 12.20 把loginUser里自动catch里的error代替为手动catch里的error对象，再打开这段代码。是有数据的。在loginUser里的自动catch的error改为手动里的对象，测试发现是没错的。也就是说这些代码都没错，界面报错的是因为执行了并报自动catch里的error。
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            //是因为在checkHttpStatus下else下的error要throw出来的，所以紧接其后，这里应该是用error.res.来衔接吧，这么认为恰当不。
            status: error.status,
            statusText: error.statusText
        }
    }

}

// 12.16重练 出现错误13 传什么竟然不知道，竟然没传，那要干什么、、、传password；
//另外，里头开始的两处return没记住，不知道怎么用。
// export const loginUser = () => {
//     return function (dispatch) {
//         dispatch(loginUserRequest())
//         fetch('/api/login', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify({token: token})
//         })
//             .then(checkHttpStatus)
//             .then(res => res.josn())
//             .then(res => {
//                 if(matched){
//                     dispatch(loginUserSuccess(token))
//                 }else{
//                     dispatch(loginUserFailure(status))
//                 }
//             })
//     }
// }


//1.26 先注释 调整下，调整测试的代码段，在这段下面的那段代码。
/*export const loginUser = (password) => {
    return dispatch => {// return一个参数为dispatch的匿名函数。想起原生js不也是这样return才能执行么、、、
        //第一个dispatch 发送请求
        dispatch(loginUserRequest())
    //    连接、获取，用ES6的fetch，这里是第二个return，是结果，也是需要return的
    //    12.31 把return fetch的return去掉试试
        fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ password: password })// 这里是password！就是把参数里的数据，转成字符串。为何是password而不是token，我想是因为body里的数据要提交到服务器，所以自己想提交什么数据自己定。
        })
            .then(res => {console.log(res)})  // 正确的写法，拿来测试。并且发现只有这里才能打印出来，其他位置不打印，应该是没执行到。
            .then(checkHttpStatus) //√

            // √ 12.31这样读取才是对的！而.then(console.log(res))是错的。但是只要在.then(checkHttpStatus)后面，就不打印了。
            // .then(res => {console.log(res)})

            //可能是错的
            // .then(res => {checkHttpStatus(res)})

        // 12.31 √  第一个问题，前面引入的checkHttpStatus，应为{ checkHttpStatus }作为变量引入才可以。另外这个测试这样写是对的。
        //     .then(console.log(checkHttpStatus))

        // ×  这里已经找不到res了。12.31 第二个问题，这个res为not defined 但却发现不是res找不到，而是自己写错了，见上面两三行那边注释的。
            // .then(console.log(res))

            .then(res => res.json())// 把response转为json

            //  ×   12.31 这之后的代码出现问题 发现res is not definded。随后发现不是找不到，而是自己没正确书写，.then里要把res当作参数传进去。
            // .then(console.log(res))

            //12.31 综上找到正确的用来测试：却发现只有写在fetch后面的这个测试才会打印，其他位置总之写在 .then(checkHttpStatus)后都不打印。
            // .then(res => {console.log(res)})

            .then(res => {
                // 这里用try catch
                try {
                    //1.26
                    let decoded = jwtDecode(res.token)//res.token！！！
                    dispatch(loginUserSuccess(res.token))//res.token！！！ 因为这个loginUserSuccess函数的参数是token，所以这里就为当前res.的token了
                } catch (e){
                    dispatch(loginUserFailure({
                        res:{
                            status: 403,
                            statusText: 'Invalid token'
                        }
                        // 手动、人工制作error信息
                    }))
                }
            })
            // fetch then catch的自动制作error信息：
            .catch(error => {// 传error 为什么不是res.error  没有res.error！！
                dispatch(loginUserFailure(error))// error用{res:{status: 403,statusText: 'Invalid token'}} 可试出来代码没错，只是正常执行函数流程中自己设置的自动报错信息。
            })
    //    12.29 因为fetch url不存在的缘故，先注释用以下这句先替换：
    //     dispatch(loginUserSuccess(password))
    }
}*/

//1.26 开始修正： 一点一点加：感谢主！
export const loginUser = (token) => {
    return dispatch => {
        dispatch(loginUserRequest())
        // dispatch(loginUserSuccess(token))
    //    现测试，改为fetch：
        fetch('api/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify({token:token})
        })
            .then(checkHttpStatus)
            .then(res => res.json())
            .then( res => {
                try {
                    dispatch(loginUserSuccess(token))
                }catch (e){
                    dispatch(loginUserFailure({
                        res:{
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }))
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error))
            })
            dispatch(loginUserSuccess(token))
    }
}



// 12.16 这个fetch不是很熟练，多练练，找找资料http://www.tuicool.com/articles/M7NRr27
// http://blog.parryqiu.com/2016/03/02/using_fetch_in_nodejs/
// 紧接着就是测试组件，备份好后，然后是下一阶段checkAuth。

/*
* 控制台打开，输入：
* fetch("http://blog.parryqiu.com").then(function(response){console.log(response)})
* 这样就很快速地完成了一次网络请求，我们发现返回的数据也比之前的 XMLHttpRequest 丰富、易用的多。
* 使用 fetch 的构造函数请求数据后，返回一个 Promise 对象，处理即可。可以通过下面的语句处理浏览器兼容的问题:
* if(self.fetch) {// 使用 fetch 框架处理 } else {// 使用 XMLHttpRequest 或者其他封装框架处理}
* 如每次 API 的请求我们想不受缓存的影响，那么可以这样请求：headers: { 'Cache-Control': 'no-cache'}
* */


//12.17 写logout的相关
export const logout = () =>{
    localStorage.removeItem('token')
    return {
        type: LOGOUT_USER
    }
}

export const logoutAndRedirect = () => {
//    logout() 12.29 这么写不对，应该用redux的思想即调用使用dispatch来发起、另外还记得要先传参数dispatch这里还要加传一个state参数不知为何、且首先要有return，这是每一个action里必要的。
    return (dispatch, state) => {
        dispatch(logout())
    }
}


// 12.19
export const checkAuthenticatedRequest = () => {
    return {
        type: CHECK_AUTHENTICATED_REQUEST
    }
}

export const checkAuthenticatedMatched = (matched) => {
    return {
        type: CHECK_AUTHENTICATED_MATCHED,
        isAuthenticated: matched,
        // isAuthenticating: !matched// 12.29 添加这个，这个isAuthenticating要时刻变换着与isAuthenticated相对。12.30 也不一定相对，如都不检测不check的时候，就都为false的。
    }
}

/*export const checkAuth = () => {
    return dispatch => {
        dispatch(checkAuthenticatedRequest())
        return fetch('/api/check', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ token: localStorage.token })
        })
        .then(checkHttpStatus)
            .then( res => res.json())
            .then( res => {
                if(res.match){
                    dispatch(checkAuthenticatedMatched(true))
                }else{
                    dispatch(checkAuthenticatedMatched(false))
                }
            })
        // dispatch(checkAuthenticatedMatched(true))// 12.29 ：也是fetch url的缘故 先改为true测试下
    }
}*/
//1.27 注释上面的，改成底下：因为check那边的state依然没变化好。
export const checkAuth =() => {
    return dispatch => {
        dispatch(checkAuthenticatedRequest())
        fetch("api/check",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify({token: localStorage.token})
        })
            .then(checkHttpStatus)
            .then(res => res.json())
            .then(res => {
                if(res.match){
                    dispatch(checkAuthenticatedMatched(true))
                }else{
                    dispatch(checkAuthenticatedMatched(false))
                }
            })
            dispatch(checkAuthenticatedMatched(true))
    }
}

/*12.19问题：
* 1、fetch提交的内容到哪，如何测试？
* 2、connect的第二个参数dispatch为何能作为props的值就是props.dispatch或props.action？
* A thunk is a function that wraps an expression to delay its evaluation.
    简单来说一个 thunk 就是一个封装表达式的函数，封装的目的是延迟执行表达式
    1 + 2 立即被计算 = 3
    let x = 1 + 2;

    1 + 2 被封装在了 foo 函数内
    foo 可以被延迟执行
    foo 就是一个 thunk
    let foo = () => 1 + 2;

     同步情况：dispatch(action)
     异步情况：dispatch(thunk)

 middleware 完全掌控了 reducer 的触发时机， 也就是 action 到了这里完全由中间件控制，不乐意就不给其他中间件处理的机会，
 而且还可以控制调用其他中间件的时机。
 任何异步的 javascript 逻辑都可以，如： ajax callback, Promise, setTimeout 等等, 也可以使用 es7 的 async 和 await。
* */


/*
* 12.20解决昨天遗留的两个问题，以及现在报错的2个问题。Uncaught (in promise) TypeError: Cannot read property 'status' of undefined(…) ：已经解决，不是代码错误，而是函数中故意写的报错。本页搜索12.20有注释。
* 另外一个报错信息：React Js: Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0
* （http://stackoverflow.com/questions/37269808/react-js-uncaught-in-promise-syntaxerror-unexpected-token-in-json-at-posit）
* Okay, I solved the issue. Firstly the .json needs to be loaded via localhost.
* So I changed the fetch('http://localhost/img/fr.json'). Further I was running my app on localhost:8080,
* so a CORS issue occurred which was taken care by disabling it via a chrome plugin.
* Anyway thanks a lot @jcubic for giving a heads up, because sometimes it not any fault in the code.
 * 昨天的第一个问题，fetch的内容提交到哪。比如checkAuth函数，估计是要api/check这页面要接收数据的函数要有接口。至于传送的数据，可以在network请求体中查看，如Request Payload中有。就是这一句：body: JSON.stringify({ token: localStorage.token })*/



/*
* 12.31
* 首先添加的是app helper 里的auth.js文件，这个是缺失的补上去了。
 * 问题分析：只有isAuthenticating为true，也就说明action里只进行到了loginRequest那一步。而其他的都没执行。为何只能走到那一步？是不是actions文件有问题？
* res is not defined 首先的问题是，没有在.then里把res当作参数传进去。.then(res => console.log(res)) 这样才是正确的。箭头函数代表return
* 其他问题分析：会不会是.then(checkHttpStatus)中的代码走向的是else的那句，也就是说不是actions这个文件代码出错，也不是checkHttpStatus里写错，而是路径出错，你看打印的显示status:404;statusText:"Not Found"
* 所以还是关注下路由后台文件上吧。切入突破点在checkHttpStatus文件，看看报错的条件是怎样。看来是status出现错误，是404，404是什么问题？
* */