/*
 * @Author: Dabbie 2310734576@qq.com
 * @Date: 2022-10-14 12:24:01
 * @LastEditors: Dabbie 2310734576@qq.com
 * @LastEditTime: 2022-10-14 12:27:59
 * @FilePath: \event_creating\assets\js\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
$(function(){
    // 实现点击“去注册”链接时，跳转（激活）注册box，同时隐藏登录box
    $('#link_reg').on('click', function(){
       $('.login-box').hide()
       $('.reg-box').show()
    })
    // 实现点击“去登录”链接时，跳转（激活）登录box，同时隐藏注册box
    $('#link_login').on('click', function(){
        $('.reg-box').hide()
        $('.login-box').show()
     })
})