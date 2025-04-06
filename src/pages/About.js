import React from 'react';

const About = () => {
  return (
    <div>
      <h1>À propos</h1>
      
      <h2>Description du projet</h2>
      <p>
        Ce projet est une application web inspirée des wikis de fans (comme ceux pour les mangas ou comics), conçue pour explorer un univers de science-fiction. L'objectif principal est de permettre aux utilisateurs de consulter et gérer des personnages avec des informations détaillées (nom, description, histoire, etc.), tout en intégrant des visuels comme des images et des modèles 3D. Actuellement, l'application inclut :
      </p>
      <ul>
        <li>Une page d'accueil avec un catalogue de personnages.</li>
        <li>Une page de détails pour chaque personnage avec rendu 3D via Three.js.</li>
        <li>Des fonctionnalités d'inscription, connexion, ajout et édition de personnages.</li>
        <li>Un design sombre et futuriste avec des placeholders pour les images et modèles 3D.</li>
      </ul>
      <p>
        Le backend utilise Node.js, Express.js et MySQL pour gérer les données, tandis que le frontend est construit avec React pour une interface dynamique. Ce projet est un prototype évolutif, avec des plans pour ajouter plus de contenu (événements, lieux) et améliorer l'interactivité (contrôles 3D, filtres, etc.).
      </p>

      <h2>Mon CV</h2>
      <p>
        Je suis [Votre Nom], le développeur de ce projet. Voici mon CV pour en savoir plus sur mes compétences et mon parcours :
      </p>
      <div>
        <a href="/cv.pdf" download="CV_[Votre_Nom].pdf">
          Télécharger mon CV
        </a>
        {/* Si vous voulez afficher le PDF directement */}
        <iframe
          src="/cv.pdf"
          title="CV"
          width="100%"
          height="500px"
        />
      </div>
    </div>
  );
};

export default About;