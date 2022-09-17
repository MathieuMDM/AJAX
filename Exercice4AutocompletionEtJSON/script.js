$(document).ready(() => {
  $.ajax({
    url: "pays.json",
    dataType: "json",
    success: paysF,
  });
});

function paysF(valeur) {
  $.each(valeur.listePays, function (index, element) {
    $("<option>")
      .attr("value", this.nom_pays_fr)
      .text(this.nom_pays_fr)
      .appendTo("#paysL");
  });
}
