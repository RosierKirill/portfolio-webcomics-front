import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [modelStatus, setModelStatus] = useState('loading');
  const mountRef = useRef(null);

  // Récupérer le personnage
  useEffect(() => {
    let isMounted = true;

    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/characters/${id}`);
        if (isMounted) {
          setCharacter(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du personnage:', error);
      }
    };

    fetchCharacter();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Gérer la scène 3D
  useEffect(() => {
    if (!character || !mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    const container = mountRef.current;
    const width = container.offsetWidth || window.innerWidth * 0.8;
    const height = 400;

    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    const modelUrl = character.model3d_url || null;

    if (modelUrl) {
      loader.load(
        modelUrl,
        (gltf) => {
          const model = gltf.scene;
          model.scale.set(1, 1, 1);
          model.position.set(0, 0, 0);
          scene.add(model);
          setModelStatus('loaded');

          const animate = () => {
            requestAnimationFrame(animate);
            model.rotation.y += 0.01;
            renderer.render(scene, camera);
          };
          animate();
        },
        undefined,
        (error) => {
          console.error('Erreur de chargement du modèle:', error);
          setModelStatus('error');
          addPlaceholderCube(scene, renderer, camera);
        }
      );
    } else {
      setModelStatus('error');
      addPlaceholderCube(scene, renderer, camera);
    }

    camera.position.z = 5;

    return () => {
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [character]);

  const addPlaceholderCube = (scene, renderer, camera) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00b4d8 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  };

  if (!character) return <div className="container">Chargement...</div>;

  const placeholderImage = 'https://dummyimage.com/300x200/cccccc/ffffff.png&text=No+Image';

  return (
    <div className="container character-detail">
      <h1>{character.name}</h1>

      <img
  src={character.image_url || placeholderImage}
  alt={character.name}
  onError={(e) => {
    if (e.target.src !== placeholderImage) {
      e.target.src = placeholderImage;
    }
  }}
  style={{
    width: '300px',
    height: '200px',
    objectFit: 'cover',
    display: 'block',
    margin: '0 auto',
    borderRadius: '5px'
  }}
/>


      <p><strong>Infos générales :</strong> {character.general_info}</p>
      <p><strong>Description :</strong> {character.description}</p>
      <p><strong>Histoire :</strong> {character.history}</p>

      <div>
        {modelStatus === 'loading' && <p>Chargement du modèle 3D...</p>}
        {modelStatus === 'error' && <p>Modèle 3D indisponible</p>}
        <div
          ref={mountRef}
          style={{
            width: '80%',
            height: '400px',
            margin: '2rem auto',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        ></div>
      </div>

      <Link to={`/edit-character/${id}`}>Modifier</Link>
    </div>
  );
};

export default CharacterDetail;
