// import axios from 'axios';
// import { userAction } from '../slice/user'

// const user = JSON.parse(localStorage.getItem("token"));
// // console.log('token',user)
// // const currentUser = user && JSON.parse(user).currentUser;
// // const TOKEN = currentUser?.accessToken;


// const TOKEN = user;
// const URL = 'http://localhost:3001/api/profile/user'

// const publicRequest = axios.create({
//     baseURL: URL})

//     const userRequest = axios.create({
//         baseURL: URL,
//         // headers: { token: `Bearer ${TOKEN}` },
//         credentials: 'include'
//     }.credentials.includes)  

//       export const updateUser = async (id, user, dispatch ) => {
//         dispatch(userAction.UpdateUserStart());
//         try {
//             const response = await userRequest.patch(`http://localhost:3001/api/profile/user/${id}`, user);
//           dispatch(userAction.UpdateUserSuccess(response.data.user));
//         } catch (error) {
//           dispatch(userAction.UpdateUserFailure(error.response.data.message));
//         }
//       };    

// // export const addProducts = async (product, dispatch) => {
// //         dispatch(userAction.addProductsStart());
// //         try {
// //           const response = await userRequest.post('/api/products/createProduct', product);
// //           // console.log(res.data.data.products);
// //           dispatch(userAction.addProductsSuccess(response.data.data.products));
// //         } catch (error) {
// //           console.log(error.message);
// //           dispatch(userAction.addProductsFailure());
// //         }
// //       }; 
      
// // export const updateUserProduct = async (id, product, dispatch) => {
// //         dispatch(userAction.updateProductStart());
// //         try {
// //           const response = await userRequest.patch(`api/profile/userProduct/${id}`, product);
// //           console.log(response)
// //           dispatch(userAction.updateProductsSuccess({ id: id, product: product}));
// //         } catch (error) {
// //           console.log(error.message);
// //           dispatch(userAction.updateProductsFailure());
// //         }
// //       };   
      
// export const deleteUserProducts = async (id, dispatch) => {
//         dispatch(userAction.deleteProductsStart());
//         try {
//           const response = await userRequest.delete(`api/profile/userProduct/${id}`);
//           console.log(response)
//           dispatch(userAction.deleteProductsSuccess(id));
//         } catch (error) {
//           console.log(error.message);
//           dispatch(userAction.deleteProductsFailure());
//         }
//       };          
