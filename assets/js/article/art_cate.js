/*
 * @Author: Dabbie 2310734576@qq.com
 * @Date: 2022-10-17 12:39:01
 * @LastEditors: Dabbie 2310734576@qq.com
 * @LastEditTime: 2022-10-17 16:43:58
 * @FilePath: \event_creating\assets\js\article\art_cate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
$(function(){
    var layer = layui.layer
    var form = layui.form
    
    initArtCateList()
    
    // 获取文章分类的列表
    function initArtCateList(){
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res){
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 弹出层索引--用于关闭弹出层
    var indexAdd = null

    // 为添加类别绑定点击事件
    $('#btnAddCate').on('click',function(){
        // 弹出层
        indexAdd = layer.open({
            type: 1, 
            area: ['500px', '250px'],
            title: '添加文章类别',
            content: $('#dialog-add').html()
          })
    })


    // 弹出层表单是动态生成的，不能直接绑定事件
    // 通过代理的形式为 form-add 表单绑定submit事件
    $('body').on('submit', '#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data : $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    // 表满了，没法做测试
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
            }
        })
    })

    var indexEdit = null
    // 通过代理的形式为 btn-edit  表单绑定click事件
    $('tbody').on('click', '.btn-edit', function(){
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1, 
            area: ['500px', '250px'],
            title: '修改文章类别',
            content: $('#dialog-edit').html()
          })

          var id = $(this).attr('data-id')
        //   console.log(id);
        //   发起请求，获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res){
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过代理的方式，为修改分类的表单添加submit事件
    $('body').on('submit', '#form-edit', function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 通过代理的方式，为删除按钮添加点击事件
    $('tbody').on('click', '.btn-delete', function(){
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res){
                    if(res.status !== 0){
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index);
                    initArtCateList()
                }
            })
        })
    })
})