// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get('http://localhost:8000/api');
//       setCategories(Object.values(result.data)[0]);
//     };

//     fetchData();
//   }, []);
//   const x = []
//   for(let i =0; i<categories.length; i++){
//     x.push([categories[i].fields.name, categories[i].pk, ])
//   }
//   console.log(x);
//   console.log(categories);
  
//   return (

//     <div className="megamenu">
//       {x.map((category) => (
//         <ul className="single-mega cn-col-4" key={category.id}>
//           <li className="title">
//             <a href={`#${category.id}`}>{category.name}</a>
//           </li>
//           <div id={category.id}>
//             {category.subcategory_set.map((subcategory) => (
//               <li key={subcategory.id}>
//                 <a href={`/product/?category=${subcategory.id}`}>{subcategory.name}</a>
//               </li>
//             ))}
//           </div>
//         </ul>
//       ))}
//     </div>
//   );
// };

// export default Categories;
