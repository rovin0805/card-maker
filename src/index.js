import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import AuthService from './services/auth_service';
import { firebaseApp } from './services/firebase';
import ImageUploader from './services/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';
import CardRepository from './services/card_repository';

const authService = new AuthService(firebaseApp);
const imageUploader = new ImageUploader();
const cardRepository = new CardRepository(firebaseApp);

const FileInput = React.memo((props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App
      authService={authService}
      FileInput={FileInput}
      cardRepository={cardRepository}
    />
  </React.StrictMode>
);
