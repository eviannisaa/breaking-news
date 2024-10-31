import React from 'react';

interface RatingProps {
   rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
   const roundedStars = Math.round(rating);
   const totalStars = 5;

   return (
      <div>
         {Array.from({ length: totalStars }, (_, index) => {
            if (index < roundedStars) {
               return <span key={index} className="text-yellow-500">⭐</span>;
            } else {
               return <span key={index} className="text-gray-400"></span>;
            }
         })}
      </div>
   );
};

export default Rating;
