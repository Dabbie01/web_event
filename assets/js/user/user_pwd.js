/*
 * @Author: Dabbie 2310734576@qq.com
 * @Date: 2022-10-16 15:38:48
 * @LastEditors: Dabbie 2310734576@qq.com
 * @LastEditTime: 2022-10-16 16:33:25
 * @FilePath: \event_creating\assets\js\user\user_pwd.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
$(function(){
    // 为表单自定义校验规则
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位, 且不能出现空格'
          ],
        samePwd: function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同！'
            }
          },
        rePwd: function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码不一致！'
            }
          }
    })

    // 发起请求实现重置密码的功能
    $('.layui-form').on('submit', function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            succrss: function(res){
                if(res.status !== 0){
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })  
    })
})