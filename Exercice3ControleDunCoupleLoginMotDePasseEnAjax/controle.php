<?php
require_once('connect.php');
    
    try {
        $connexion = new PDO("mysql:host=" . SERVER . ";dbname=" . BASE, USER, PASSWORD);
    } catch (Exception $e) {
        echo "Erreur de connexion = ".$e->getMessage();
    }
    
    $login = $_POST['login'];
    $password = $_POST['password'];
    
    $requete = $connexion->prepare("SELECT * FROM connexion WHERE login = :parm1 AND mot_de_passe= :parm2");
    $requete->bindparam(':parm1', $login);
    $requete->bindparam(':parm2', $password);
    
    try {
        $requete->execute();
    } catch (Exception $e) {
        die('Erreur : ' . $e->getMessage());
    }
    
    $resultat = $requete->fetch(PDO::FETCH_ASSOC);
        
    if ($resultat) {
        echo $resultat['prenom'].' '.$resultat['nom'];
    } else {
        echo "0";
    }