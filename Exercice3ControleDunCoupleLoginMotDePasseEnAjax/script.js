$("#connect").click(() => {
  $.ajax({
    type: "POST",
    url: "controle.php",
    data: "login=" + $("#login").val() + "&password=" + $("#password").val(),
    success: function (valeur) {
      if (valeur != false) {
        $("div#message").html("Bonjour " + valeur);
      } else {
        $("div#message").html(
          "Vous avez entré des données erronées, essaye encore"
        );
      }
    },
  });
});
