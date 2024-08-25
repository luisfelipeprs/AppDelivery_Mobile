import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const RatingForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRating = (index: any) => {
    setRating(index);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(`Rating: ${rating}, Comment: ${comment}`);
    // Aqui você pode enviar os dados para o servidor
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Avalie seu pedido</h2>

      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesome
            key={star}
            name={star <= rating ? 'star' : 'star-o'}
            size={30}
            color={star <= rating ? '#FFD700' : '#C0C0C0'}
            onPress={() => handleRating(star)}
            className="cursor-pointer"
          />
        ))}
      </div>

      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-base"
        placeholder="Deixe seu comentário"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center font-semibold hover:bg-green-700 transition duration-300"
      >
        Enviar
        <MaterialIcons name="send" size={24} color="white" className="ml-2" />
      </button>
    </div>
  );
};

export default RatingForm;
