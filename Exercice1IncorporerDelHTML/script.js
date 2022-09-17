// $(".bouton1").click(() => {
//   $(".menu").load("menu-1.html");
// });

// $(".bouton2").click(() => {
//   $(".menu").load("menu-2.html");
// });

$(document).ready(() => {
  $("button").click(function () {
    $(this).attr(this.id); //wyciaganie atrubutu nie jest potrzebne i nie dziala
    $(".menu").load(this.id + ".html");
  });
});
