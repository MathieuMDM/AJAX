<?php
require_once('connect.php');

function addClientphp($connexion)
{
    if ($connexion) {
        if (isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['email'])) {
            $requete = $connexion->prepare("INSERT INTO clientsX (nom, prenom, email) VALUES (:nom, :prenom, :email)");
            $requete->bindparam(':nom', $_POST['nom']);
            $requete->bindparam(':prenom', $_POST['prenom']);
            $requete->bindparam(':email', $_POST['email']);
            $req = $requete->execute();

            echo json_encode($req);
        }
    }
}

function deleteClientphp($connexion)
{
    if ($connexion) {
        $id = $_POST['id'];
        $requete = $connexion->prepare("DELETE FROM clientsX WHERE id=:id");
        $requete->bindparam(':id', $id);
        $req = $requete->execute();

        echo json_encode($req);
    }
}

function updateClientphp($connexion)
{
    $id = $_POST['id'];

    $requete = $connexion->prepare("SELECT * FROM clientsX WHERE id='$id'");

    try {
        $requete->execute();
    } catch (Exception $e) {
        die('Erreur : ' . $e->getMessage());
    }

    $resultat = $requete->fetchAll(PDO::FETCH_ASSOC);

    if ($resultat) {
        echo json_encode($resultat);
    } else {
        echo "0";
    }
}

function updateIDClientphp($connexion)
{
    $id = $_POST['id'];
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $email = $_POST['email'];

    $requete = $connexion->prepare("UPDATE clientsX SET nom='$nom', prenom='$prenom', email='$email' WHERE id='$id'");

    //il ne faut pas passer de paramètre dans la méthode execute().
    // $resultat = $requete->execute($connexion);
    $resultat = $requete->execute();

    if ($resultat) {
        echo json_encode($resultat);
    } else {
        echo "0";
    }
}

function selectClientphp($connexion)
{
    $requete = $connexion->prepare("SELECT * FROM clientsX");


    try {
        $requete->execute();
    } catch (Exception $e) {
        die('Erreur : ' . $e->getMessage());
    }

    $resultat = $requete->fetchAll(PDO::FETCH_ASSOC);

    if ($resultat) {
        echo json_encode($resultat); //cała tabela do json
    } else {
        echo "0";
    }
}
//Ce morceau de code doit rester dans le fichier connect.php
// try {
//     $connexion = new PDO("mysql:host=" . SERVER . ";dbname=" . BASE, USER, PASSWORD);
// } catch (Exception $e) {
//     echo "Erreur de connexion = " . $e->getMessage();
// }

$action = $_POST['action'];
$action($connexion);
