/*
 * @Author: Dabbie 2310734576@qq.com
 * @Date: 2022-10-14 12:24:01
 * @LastEditors: Dabbie 2310734576@qq.com
 * @LastEditTime: 2022-10-14 17:44:29
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

   // 自定义表单验证--密码输入
   // 从layui中拿到form
   var form = layui.form
   // 从layui中拿到layer，用于提示信息
   var layer= layui.layer

   // 通过form-verify()函数自定义校验规则
   form.verify({
      // 自定义一个叫pwd的校验规则，然后将其运用到密码框的lay-verify里
      pwd: [
         /^[\S]{6,12}$/
         ,'密码必须6到12位，且不能出现空格'
       ],
      // 自定义一个叫repwd的校验规则，校验两次密码是否一致,这次采用function格式
       repwd: function(value){
         // value形参拿到的是确认密码框中的内容
         // 我们还需要拿到输入密码框中的内容
         // 两者进行判断 return  
         // [name=password]是属性选择器
         var pwd = $('.reg-box [name=password]').val()
         if(pwd !== value) {
            return '两次密码不一致！'
         }
       }
   })

   // 监听注册表单的提交事件
   $('#form_reg').on('submit',function(e){
      // 阻止表单的默认提交行为
      e.preventDefault()
      // 通过接口文档可知是post请求
      $.post('http://www.liulongbin.top:3007/api/reguser',{username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()},
      function(res){
         if(res.status !== 0){
            return layer.msg(res.message)
         }
         layer.msg('注册成功，请登录！')
         // 模拟点击行为，跳转到登录界面
         $('#link_login').click()
      })
   })
})