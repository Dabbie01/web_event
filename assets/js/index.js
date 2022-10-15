/*
 * @Author: Dabbie 2310734576@qq.com
 * @Date: 2022-10-15 15:41:41
 * @LastEditors: Dabbie 2310734576@qq.com
 * @LastEditTime: 2022-10-15 17:20:51
 * @FilePath: \event_creating\assets\js\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

$(function(){
    // 调用getUserInfo() 获取用户基本信息
    getUserInfo()

    // 点击事件：点击退出按钮，实现退出功能
    var layer = layui.layer

    $('#btnLogOut').on('click', function(){
        // 提示用户是否确认退出--使用layui内置模块
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            // do something
            //1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 返回到登录界面
            location.href = '/login.html'

            // 关闭confirm询问框
            layer.close(index)
          });
    })
})

// 获取用户基本信息函数
function getUserInfo() {
    // 发起ajax请求
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 已经在baseAPI中配置了
        // 由于有访问权限，所以需要请求头中携带Authorization
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res){
            if(res.status !== 0){
                return layer.msg = '获取用户信息失败！'
            }
            console.log(res);
            // 调用renderAvatar函数渲染用户头像
            // 传入res.data 里面包含了用户信息
            renderAvatar(res.data)
        },

        // 已经在baseAPI中配置了
        // 不论成功还是失败，最终都会调用complete回调函数
        // complete: function(res){
        //     // console.log('执行了complete回调');
        //     // console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         // 1.  强制清空token
        //         localStorage.removeItem('token')
        //         // 2.  强制跳转到登录界面
        //         location.href = '/login.html'
        //     }
        // }
    })
}


// 渲染用户头像
function renderAvatar(user){
    // 1. 获取用户的名称
    // 用户名字有两种，一个是nickname昵称，一个是username。   如果有nickname那就取nickname
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户头像--有user_pic，则显示用户头像，否则显示文字头像
    if(user.user_pic !== null){
        // 渲染图片头像：有则显示图片头像，隐藏文字头像
        $('.layui-nav-img')
        .attr('src', user.user_pic)
        .show()
        $('.text-avatar').hide()
    }else{
        // 渲染文字头像
        $('.layui-nav-img').hide()
        // name是字符串，可能为中文也可能为英文，我们需要得到其首字母，并且是大写toUpperCase()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}