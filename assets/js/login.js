$(function () {
    $("#links-reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#links-login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })

})