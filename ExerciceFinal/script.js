$(document).ready(function () {
  $("#add").on("click", addClient);
  selectClient();
  $("#add2").on("click", updateClient);
  $("#add3").on("click", cancelUpdateClient);
  // $(".delete").on("click", deleteClient);
  // $(".update").on("click", updateClient);
});

var xhr = new XMLHttpRequest();

function addClient() {
  var nom = $("#nom").val();
  var prenom = $("#prenom").val();
  var email = $("#email").val();

  var action = "addClientphp";

  $.ajax({
    type: "POST",
    url: "traitement.php",
    data: { action, nom, prenom, email },
    dataType: "json",
    success: function (response) {
      $("#message")
        .hide()
        .html("<span class='success'>Client ajouté avec succès !</span>")
        .fadeIn(1000);
      $("input").val("");
      selectClient();
    },
    error: function () {
      $("#message").html(
        "<span class='error'>Une erreur s'est produite</span>"
      );
    },
  });
}

function deleteClient(elID) {
  var txt;
  var r = confirm(
    "Etes-vous sûr de vouloir supprimer le produit avec le numéro id = " + elID
  );
  if (r == true) {
    //dane do usuniecia produktu
    deleteClientID(elID);
    txt = "<span class='error'>" + "Le produit a été supprimé";
  } else {
    txt = "<span class='success'>" + "Le produit n'a pas été supprimé";
  }
  document.getElementById("message").innerHTML = txt;
}

function deleteClientID(elID) {
  var id = elID;

  var action = "deleteClientphp";

  $.ajax({
    type: "POST",
    url: "traitement.php",
    data: { action, id },
    dataType: "json",
    success: function (response) {
      $("#message")
        .hide()
        .html("<span class='success'>Client ajouté avec succès !</span>")
        .fadeIn(1000);
      $("input").val("");
      selectClient();
    },
    error: function () {
      $("#message").html(
        "<span class='error'>Une erreur s'est produite</span>"
      );
    },
  });
}

function updateClient() {
  var id = $("#id").val();
  var nom = $("#nom").val();
  var prenom = $("#prenom").val();
  var email = $("#email").val();

  var action = "updateIDClientphp";

  console.log(action, id, nom, prenom, email);
  cancelUpdateClient();
  $.ajax({
    type: "POST",
    url: "traitement.php",
    data: { action, id, nom, prenom, email },
    dataType: "json",
    success: function (response) {
      $("#message")
        .hide()
        .html("<span class='success'>Client modifié avec succès ! !</span>")
        .fadeIn(1000);
      $("input").val("");
      selectClient();
    },
    error: function () {
      $("#message").html(
        "<span class='error'>Une erreur s'est produite</span>"
      );
    },
  });
}

function updateClientID(elID) {
  var element = document.getElementById("add");
  element.classList.add("displayNone");
  var element2 = document.getElementById("add2");
  element2.classList.remove("displayNone");
  var element3 = document.getElementById("add3");
  element3.classList.remove("displayNone");
  //ustawianie wartosci w polach
  var id = elID;
  //Il faut affecter cet id dans l'input masqué si tu veux le manipuler par la suite.
  $("#id").val(id);
  
  var action = "updateClientphp";

  $.ajax({
    type: "POST",
    url: "traitement.php",
    data: { action, id },
    dataType: "json",
    success: function (response) {
      // $("#message").html(JSON.stringify(response));
      $.each(response, function (index, element) {
        $("#nom").val(this.nom);
        $("#prenom").val(this.prenom);
        $("#email").val(this.email);
      });
      // $("#nom").val(nom); //val(nom)
    },
    error: function () {
      $("#message").html(
        "<span class='error'>Une erreur s'est produite</span>"
      );
    },
  });

  // document.getElementById("nom").value = elID;
}

function cancelUpdateClient() {
  var element = document.getElementById("add");
  element.classList.remove("displayNone");
  var element2 = document.getElementById("add2");
  element2.classList.add("displayNone");
  var element3 = document.getElementById("add3");
  element3.classList.add("displayNone");
  //wyczyscic pola z danymi
  $("#nom").val("");
  $("#prenom").val("");
  $("#email").val("");
}

function selectClient() {
  var action = "selectClientphp";

  $.ajax({
    type: "POST",
    url: "traitement.php",
    data: { action: action },
    dataType: "json",
    success: function (response) {
      // $("#message").html(JSON.stringify(response));
      $("#clients td").parent().remove();
      $.each(response, function (index, element) {
        $("#clients").append(
          "<tr><td>" +
            this.nom + //wspolne nazwy z baza danych (json)
            "</td><td>" +
            this.prenom +
            "</td><td>" +
            this.email +
            "</td><td><a class='delete' href='#' onclick='deleteClient(" +
            this.id +
            ")'><i class='fas fa-trash-alt text-danger'></i></a></td><td><a class='update' href='#' onclick='updateClientID(" +
            this.id +
            ")'><i class='fas fa-pencil-alt text-success'></i></a></td></tr>"
        );
      });
    },
    error: function () {
      $("#message").html(
        "<span class='error'>Une erreur s'est produite</span>"
      );
    },
  });
}
