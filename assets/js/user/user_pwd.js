$(function () {
    // 表单验证
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        smaePwd: function (value) {
            if (value == $("[name=oldPwd]").val()) {
                return '两次密码不能一样';
            }
        },
        rePwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return '新旧密码不一致！';
            }
        }
    })

    // 修改密码
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg("修改密码成功！");
                $(".layui-form")[0].reset()
            }
        })
    })
})