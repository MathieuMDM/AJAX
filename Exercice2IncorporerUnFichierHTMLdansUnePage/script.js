$(document).ready(function () {
  $(".bouton1").click(() => {
    $(".menu").load("menu-1.html");
  });

  $(".bouton2").click(() => {
    $(".menu").load("menu-2.html");
  });

  $(".bouton3").click(() => {
    $.ajax({
      url: "test.html",
      success: function (data) {
        $("#contenu").html(data);
      },
    });
  });
});
