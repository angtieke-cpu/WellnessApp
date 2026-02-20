import axios from 'axios';
import locationData from '../../assets/data/locationData.json';
import userData from '../../assets/data/userData.json';
import { saveDate } from '../../helpers/storage';

export const loginApi = async (username: string, password: string) => {
  const response = userData.userData.find(
    data => data.password === password && username === data.userId
  );
  const locationResponse = locationData.locationData.find(
    data => data.Teams === response?.userId
  );
  // )
  //   const response = await axios.post('https://example.com/api/login', { username, password});

  if (locationResponse?.Teams) {
    return locationResponse;
  } else {
    return null;
  }
  // Assumes API returns { token: string }
};
export const postUserDetails = async (userData: any) => {
  let response;
  console.log({userData});
  //  Object.assign(userData,{'outlet_name':'test'})
  await axios
    .post('https://hplub.7brains.in/hp/api/hppersonaldetails/', userData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      response = res;
      console.log(res)
    })
    .catch(err => {
      console.log(err.response);
      if (
        err.response.data.message ===
        'Record with the same retailer_date_key already exists.'
      ) {
        response = err;
      }
    });
  if (response) {
    // saveUserDetails(userData);
    // movePersonalDetails();
    return 'user post Succesful';
  } else {
    return 'user post fail';
  }
};
export const postOrderDetails = async (orderDetails: any) => {
  let response;
  console.log({orderDetails});
  // orderDetails.map(async (text:any, index:any) => {
  //   /* ... your code ... */

  //     if(index <= (orderDetails.length-1)){ //last element

  await axios
    .post(
      'https://hplub.7brains.in/hp/api/order/',
      {orders: orderDetails},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    .then(res => {
      // moveOrderDetails();
      response = res;
      console.log({response});
    })
    .catch(err => {
      console.log(err.response);
    });
  // }
  //   else{
  //     await axios.post('https://hplub.7brains.in/hp/api/order/', text,{headers: {
  //       Accept: 'application/json',
  //         'Content-Type': 'application/json'}
  //     }).then(res=>{
  //       response = res;
  //       console.log({response})
  //     }).catch(err=>{
  //      console.log(err.response);
  //     });
  //   }
  // });

  if (response) {
    return 'order post Succesful';
  } else {
    return 'order post fail';
  }
};

export const postImageDetails = async (imageDetails: any) => {
  let response;
  console.log({imageDetails});
  // imageDetails.map(async (text:any, index:any) => {
  //   /* ... your code ... */

  //     if(index <= (imageDetails.length-1)){ //last element

  await axios
    .post(
      'https://hplub.7brains.in/hp/api/brandingimage/',
      {branding_images: imageDetails},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    .then(res => {
      response = res;
      //  moveImageDetails();
      console.log({response});
    })
    .catch(err => {
      console.log(err.response);
    });
  // else{
  //   await axios.post('https://hplub.7brains.in/hp/api/brandingimage/', text,{headers: {
  //     Accept: 'application/json',
  //       'Content-Type': 'application/json'}
  //   }).then(res=>{
  //     response = res;
  //     console.log({response})
  //   }).catch(err=>{
  //    console.log(err.response);
  //   });
  // }
  // });

  if (response) {
    return 'img Upload Succesful';
  } else {
    return 'img upload fail';
  }
};
