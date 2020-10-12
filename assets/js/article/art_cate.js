$(function () {
    initArtCateList();

    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                var str = template('tpl-art-cate', res)
                $('tbody').html(str)
            }
        })
    }

    // 2.显示文章添加分类列表
    $("#btnAdd").on("click", function () {
        indexAdd = layer.open({
            type: 1,
            title: '修改文章类型',
            area: ['500px', '260px'],
            content: $('#dialog-add').html() //这里content是一个普通的String
        });

    })

    // 提交文章分类添加事件
    var indexAdd = null;
    $('body').on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg('恭喜您，添加文章类别成功！');
                layer.close(indexAdd)
            }
        })
    })

    // 修改展示表单
    var indexEtid = null;
    var form = layui.form;
    $('tbody').on("click", '.btn-edit', function () {
        indexEtid = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-edit').html() //这里content是一个普通的String
        });
        var Id = $(this).attr("data-id")
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 修改 - 提交
    $("body").on('submit', "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg('恭喜你，修改它成功了！！！！！！')
                layer.close(indexEtid)
            }
        })
    })

    // 删除功能
    $("tbody").on("click", ".btn-delete", function () {
        var Id = $(this).attr("data-id");
        // 显示对话框
        layer.confirm('是否确定删除？', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initArtCateList()
                    layer.msg('恭喜你，文章类别删除成功！！！！！！')
                    layer.close(index)
                }
            })
        });
    })
})