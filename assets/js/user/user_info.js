/*
 * @Author: Dabbie 2310734576@qq.com
 * @Date: 2022-10-16 11:56:58
 * @LastEditors: Dabbie 2310734576@qq.com
 * @LastEditTime: 2022-10-16 15:07:52
 * @FilePath: \event_creating\assets\js\user\user_info.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


$(function(){
    // 表单验证
    var form = layui.form 
    form.verify({
        // 昵称验证
        nickname : function(value){
            if(value.length > 6){
                return '昵称长度必须在1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo()

    // 初始化用户的基本信息
    var layer = layui.layer
    function initUserInfo(){
        $.ajax({
            // 要记得导入baseAPI.js
            method: 'GET',
            url: '/my/userinfo',
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res)
                // 调用form.var()快速给表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单数据
    $('#btnResset').on('click', function(e){
        // 阻止表单的默认重置行为
        e.preventDefault()
        // 要求点击重置了后，信息回到初始化的个人信息，直接调用初始化用户的基本信息函数即可
        initUserInfo()
    })

    // 监听表单提交事件
    $('.layui-form').on('submit', function(e){
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 更新成功后，我们需要将头像部分和欢迎部分信息同步修改，
                // 这里牵扯到引用父级js中的方法
                // window表示当前iframe的界面
                window.parent.getUserInfo()
            }
        })
    })
})