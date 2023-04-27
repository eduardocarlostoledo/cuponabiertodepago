import React from 'react';
import ReservaComponente from './ReservaComponente';

const App = () => {
  const producto = 'Camiseta de React';
  const precio = 500;  

  return (
    <div>
      <ReservaComponente producto={producto} precio={precio} />
    </div>
  );
};

export default App;