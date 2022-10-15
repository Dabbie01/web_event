/*
 * @Author: Dabbie 2310734576@qq.com
 * @Date: 2022-10-15 11:10:21
 * @LastEditors: Dabbie 2310734576@qq.com
 * @LastEditTime: 2022-10-15 11:13:47
 * @FilePath: \event_creating\assets\js\baseAPI.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 在每次调用$.get()  $.post()  $.ajax() 的时候，会先调用该函数ajaxPrefilter()，
// 在这个函数中，可以拿到我们给Ajax提供的配置对象。
$.ajaxPrefilter(function(options){
    // 在发起真正的请求前，统一拼接请求的根路径
    options.url= 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);
})