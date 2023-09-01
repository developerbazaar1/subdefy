// import React from "react";
// import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa";
// const Rating = ({ value }) => {
//   // console.log(value);

//   const ratingStar = Array.from({ length: 5 }, (elem, index) => {
//     let number = index + 0.5;
//     return (
//       <span key={index}>
//         {value >= number ? (
//           <FaStar style={{ color: "orange" }} />
//         ) : value >= number ? (
//           <FaStarHalfAlt />
//         ) : (
//           <FaRegStar />
//         )}
//       </span>
//     );
//   });
//   return <div className="undefined">{ratingStar}</div>;
// };

// export default Rating;

import React from "react";
import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa";

const Rating = ({ value }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    const starValue = index + 1; // Add 1 to index to get star's actual value
    return (
      <span key={index}>
        {value >= starValue ? (
          <FaStar style={{ color: "orange" }} />
        ) : value >= starValue - 0.5 ? (
          <FaStarHalfAlt style={{ color: "orange" }} />
        ) : (
          <FaRegStar />
        )}
      </span>
    );
  });

  return <div className="undefined">{ratingStar}</div>;
};

export default Rating;

// export default Rating;
