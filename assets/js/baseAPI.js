/*
 * @Author: Dabbie 2310734576@qq.com
 * @Date: 2022-10-15 11:10:21
 * @LastEditors: Dabbie 2310734576@qq.com
 * @LastEditTime: 2022-10-15 16:33:51
 * @FilePath: \event_creating\assets\js\baseAPI.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 在每次调用$.get()  $.post()  $.ajax() 的时候，会先调用该函数ajaxPrefilter()，
// 在这个函数中，可以拿到我们给Ajax提供的配置对象。
$.ajaxPrefilter(function(options){
    // 在发起真正的请求前，统一拼接请求的根路径
    options.url= 'http://www.liulongbin.top:3007' + options.url
    // console.log(options.url);

    // 统一为有权限的接口设置headers请求头
    // 可以添加一个判断，只有以/my/的url才需要添加headers
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 全局统一挂载complete回调函数
    options.complete = function(res){
        // console.log('执行了complete回调');
        // console.log(res);
        // 在complete回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            // 1.  强制清空token
            localStorage.removeItem('token')
            // 2.  强制跳转到登录界面
            location.href = '/login.html'
        }
    }
   
})