import React from 'react';
import './App.css';
import CrosswordPuzzle from './CrosswordPuzzle';

const App = () => {
  return (
    <div className="container">
      <h1>Teka Teki Silang</h1>
      <CrosswordPuzzle />
      <div className="questions">
        <div>
          <h3>Mendatar:</h3>
          <ol>
            <li>Ibukota Indonesia</li>
            <li>Tidak pasti atau mudah berubah-ubah</li>
            <li>Aktivitas mencari nafkah</li>
            <li>Tempat membeli obat</li>
            <li>Istilah untuk orang yang ahli dalam bidang olahraga</li>
          </ol>
        </div>
        <div>
          <h3>Menurun:</h3>
          <ol start={6}>
            <li>Melarikan Diri</li>
            <li>Rasa Kasihan</li>
            <li>
              Apa istilah yang digunakan untuk menyebut periode waktu tertentu dalam
              sejarah?
            </li>
            <li>Penyakit sesak nafas</li>
            <li>Hewan Kurban</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default App;