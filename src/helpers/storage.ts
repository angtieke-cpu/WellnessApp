import {MMKV} from 'react-native-mmkv';
// import  from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { useDispatch } from 'react-redux';

export const storage = new MMKV();

// Helper functions to interact with MMKV
export const saveToken = (token: string, id: string) => {
  storage.set('userToken', token);
  let sequence = getOrderSequence();
  // console.log(sequence);

  if (sequence) {
    // folderCreaton();
    let numbr = Number(sequence) + 1;
    // console.log(numbr);
    saveOrderSeq(numbr + '');
  } else {
    saveOrderSeq('200');
    folderCreaton();
  }
  storage.set('uniqId', id);
};

export const createRetailDirectory = async (personalDetails: any) => {
  var retailDirectoryStatus;
  if (!storage.getBoolean('retailDirectory')) {
    var path1 = `${RNFS.ExternalDirectoryPath}/hpclData/source/`;
    retailDirectoryStatus = await RNFS.mkdir((path1 += getOutletName()))
      .then(status => {
        // console.log(status);
        storage.set('retailDirectory', true);
        return 'retail directory done';
      })
      .catch(err => {
        console.log(err);
        return 'error';
      });
      return retailDirectoryStatus;
  } else {
    console.log('already exists');
    return 'retail directory done';
  }
    
};

export const removeRetailDirectory = () => {
  storage.set('retailDirectory', false);
};

export const setLocationAccess = (val:boolean) => {
  storage.set('locationAccess', val);
};

export const getLocationAccess = () => {
  return storage.getBoolean('locationAccess');
};

export const createArchiveDirectory = async () => {
  // console.log(storage.getBoolean('retailDirectory'));
  // if(!storage.getBoolean('retailDirectory')){
  var path1 = `${RNFS.ExternalDirectoryPath}/hpclData/archive/`;
  await RNFS.mkdir((path1 += getOutletName()))
    .then(status => {
      console.log(status);
    })
    .catch(err => console.log(err));
  // else{
  //   console.log('already exists');
  //   return  true;
  // }
};

export const saveOrderSeq = (val: string) => {
  console.log('seq' + val);
  storage.delete('orderSequence');
  storage.set('orderSequence', val);
  // storage.removeItem('orderDetails');
};
export const saveOutletTodaySeq = (val: string) => {
  storage.delete('outletTodaySeq');
  storage.set('outletTodaySeq', val);
};
export const getoutletTodaySeq = () => {
  let outletTodaySeq;
  outletTodaySeq = storage.getString('outletTodaySeq');
  // .then(val => {
  //   outletTodaySeq = val;
  // });
  return outletTodaySeq;
};
export const saveProductiveOrderTodaySeq = (val: string) => {
  storage.delete('productiveOrderTodaySeq');
  storage.set('productiveOrderTodaySeq', val);
};
export const getproductiveOrderTodaySeq = () => {
  let productiveOrderTodaySeq;
  productiveOrderTodaySeq = storage.getString('productiveOrderTodaySeq');
  // .then(val => {
  // productiveOrderTodaySeq = val;
  // });
  return productiveOrderTodaySeq;
};
export const saveOutletToalSeq = (val: string) => {
  storage.delete('outletToalSeq');
  storage.set('outletToalSeq', val);
};
export const getoutletToalSeq = () => {
  let outletToalSeq;
  outletToalSeq = storage.getString('outletToalSeq');
  // .then(val => {
  //   outletToalSeq = val;
  // });
  return outletToalSeq;
};
export const saveProductiveOrderTotalSeq = (val: string) => {
  storage.delete('productiveOrderTotalSeq');
  storage.set('productiveOrderTotalSeq', val);
};
export const getproductiveOrderTotalSeq = () => {
  let productiveOrderTotalSeq;
  productiveOrderTotalSeq = storage.getString('productiveOrderTotalSeq');
  // .then(val => {
  //   productiveOrderTotalSeq = val;
  // });
  return productiveOrderTotalSeq;
};
export const saveDate = () => {
  let val = getCurrentDate();
  storage.delete('date');
  storage.set('date', val);
};
export const getdate = () => {
  let date;
  date = storage.getString('date');
  // .then(val => {
  //   date = val;
  // });
  return date;
};
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const removeOrderDetails = () => {
  storage.delete('orderDetails');
};

export const deletePersonalDetails = () => {
  storage.delete('personalDetails');
};

export const removePersonalDetails = () => {
  storage.delete('personalDetails');
};
export const removeImageDetails = () => {
  storage.delete('imageDetails');
};

export const saveUserData = (data: any) => {
  storage.set('userData', JSON.stringify(data));
};

export const savePersonalDetails = (data: any) => {
  storage.set('personalDetails', JSON.stringify(data));
  console.log(data);
};

export const clearData = async () => {
  // var paths = [`${RNFS.ExternalDirectoryPath}/hoclData/userDetails.json`,
  //   `${RNFS.ExternalDirectoryPath}/hoclData/imgDetails.json`,
  //   `${RNFS.ExternalDirectoryPath}/hoclData/orderDetails.json`
  // ];
  var path = `${RNFS.ExternalDirectoryPath}/hpclData/archive/`;
  // paths.map(async file=>{
  await RNFS.readDir(path)
    .then(json => {
      console.log(json);
      json.map(data => {
        RNFS.unlink(data.path);
      });
    })
    .catch(err => {
      console.log(err);
    });

  // })
};

export const saveOnlineOrderDetails = (data: any) => {
  storage.set('orderDetails', JSON.stringify(data));
};
export const saveUserDetails = async (data: any) => {
  var userDataStatus;
  var path = `${
    RNFS.ExternalDirectoryPath
  }/hpclData/source/${getOutletName()}/`;
  console.log(path);
  var json = JSON.stringify(data);
  userDataStatus = await RNFS.writeFile(
    (path += `${getOutletName()}_PersonalDetails.json`),
    json,
    'utf8'
  )
    .then(success => {
      console.log('userData file written! : ');
      let res1 = getoutletTodaySeq();
      let res = getoutletToalSeq();
      console.log(res);
      // getoutletTodaySeq().then((res: any) => {
      if (res) {
        let numbr = Number(res) + 1;
        saveOutletToalSeq(numbr + '');
      } else {
        saveOutletToalSeq('1');
      }
      let tdyDate = getCurrentDate();
      let storageDate = getdate();
      if (tdyDate == storageDate) {
        // if(res1){
        if (res1) {
          let numbr = Number(res1) + 1;
          saveOutletTodaySeq(numbr + '');
        } else {
          saveOutletTodaySeq('1');
        }
        // }
      } else {
        saveOutletTodaySeq('1');
        saveDate();
      }
      return ' USer FIle Wriiten';
      // });
    })
    .catch(err => {
      console.log(err.message);
      return 'Error';
    });

  return userDataStatus;
};
export const moveImageDetails = async () => {
  var path = `${
    RNFS.ExternalDirectoryPath
  }/hpclData/source/${getOutletName()}/`;
  var path1 = `${
    RNFS.ExternalDirectoryPath
  }/hpclData/archive/${getOutletName()}/`;
  await RNFS.moveFile(
    (path += `${getOutletName()}_ImageDetails.json`),
    (path1 += '_ImageDetails.json')
  )
    .then(success => {
      console.log('IMAGE FILE MOVEN! : ');
    })
    .catch(err => {
      console.log(err.message);
    });
};
export const movePersonalDetails = async () => {
  var path = `${
    RNFS.ExternalDirectoryPath
  }/hpclData/source/${getOutletName()}/`;
  var path1 = `${
    RNFS.ExternalDirectoryPath
  }/hpclData/archive/${getOutletName()}/`;
  await RNFS.moveFile(
    (path += `${getOutletName()}_PersonalDetails.json`),
    (path1 += '_PersonalDetails.json')
  )
    .then(success => {
      console.log('PERSONAL FILE MOVEN! : ');
    })
    .catch(err => {
      console.log(err.message);
    });
};
export const moveOrderDetails = async () => {
  var path = `${
    RNFS.ExternalDirectoryPath
  }/hpclData/source/${getOutletName()}/`;
  var path1 = `${
    RNFS.ExternalDirectoryPath
  }/hpclData/archive/${getOutletName()}/`;
  await RNFS.moveFile(
    (path += `${getOutletName()}_OrderDetails.json`),
    (path1 += '_OrderDetails.json')
  )
    .then(success => {
      console.log('ORDER FILE MOVEN! : ');
    })
    .catch(err => {
      console.log(err.message);
    });
};
export const saveImageDetails = async (data: any) => {
  var imageStatus;
  var path = `${
    imageStatus = await RNFS.ExternalDirectoryPath
  }/hpclData/source/${getOutletName()}/`;
  var json = JSON.stringify(data);
  await RNFS.writeFile(
    (path += `${getOutletName()}_ImageDetails.json`),
    json,
    'utf8'
  )
    .then(success => {
      console.log('IMAGE FILE WRITTEN! : ');
      return 'image file done'
    })
    .catch(err => {
      console.log(err.message);
      return 'Error'
    });

    return imageStatus;
};
export const saveOrderDetails = async (data: any) => {
  var orderDetails;
  console.log({data});
  var path = `${ RNFS.ExternalDirectoryPath}/hpclData/source/${getOutletName()}/`;
  var json = JSON.stringify(data);
  console.log({json});
  orderDetails = await RNFS.writeFile(
    (path += `${getOutletName()}_OrderDetails.json`),
    json,
    'utf8'
  )
    .then((success: any) => {
      console.log(success);
      if (data.length > 0) {
        let res = getproductiveOrderTotalSeq();
        let res1 = getproductiveOrderTodaySeq();
        // .then((res: any) => {
        if (res) {
          let numbr = Number(res) + 1;
          saveProductiveOrderTotalSeq(numbr + '');
        } else {
          saveProductiveOrderTotalSeq('1');
        }
        let tdyDate = getCurrentDate();
        let storageDate = getdate();
        if (tdyDate == storageDate) {
          if (res1) {
            let numbr = Number(res1) + 1;
            saveProductiveOrderTodaySeq(numbr + '');
          } else {
            saveProductiveOrderTodaySeq('1');
          }
        } else {
          saveProductiveOrderTodaySeq('1');
          saveDate();
        }
      }
      // });
      console.log('ORDERJSON WRITTEN! : ');
      return 'Order written'
    })
    .catch(err => {
      console.log(err.message);
      return 'Error'
    });
    return orderDetails;
};
export const saveOnlineImageDetails = async (data: any) => {
  storage.set('imageDetails', JSON.stringify(data));
};

export const saveOutletName = (data: string) => {
  storage.set('outletName', data);
};
export const getOutletName = () => {
  console.log('outletName', storage.getString('outletName'));
  return storage.getString('outletName');
};

export const getToken = () => {
  let token;
  // await storage.getItem('userToken').then(val => {
  //   token = val;
  // });
  token = storage.getString('userToken');
  console.log(token);
  removePersonalDetails();
  removeImageDetails();
  removeOrderDetails();
  removeRetailDirectory();
  return token;
};

export const getOrderSequence = () => {
  let orderSequence;
  orderSequence = storage.getString('orderSequence');
  console.log(orderSequence);
  return orderSequence;
};

export const getUniqID = () => {
  let uniqId = storage.getString('uniqId');
  console.log(uniqId);
  // .then(val => {
  //   uniqId = val;
  // });
  return uniqId;
};

export const getorderDetails = () => {
  const orderDetails = storage.getString('orderDetails');
  const userObject = JSON.parse(orderDetails ? orderDetails : '[]');
  return userObject;
};

// export const getPermOrderDetails = async (): Promise<any> => {
//   let orderDetails;
//   await storage.getString('orderDetails').then(value => {
//     console.log(value);
//     const userObject = JSON.parse(value ? value : '[]');
//     orderDetails = userObject;
//   });
//   return orderDetails;
// };
export const getImageDetails = () => {
  const orderDetails = storage.getString('imageDetails');
  const userObject = JSON.parse(orderDetails ? orderDetails : '[]');
  return userObject;
};

export const getUserData = () => {
  const userData = storage.getString('userData');
  const userObject = JSON.parse(userData ? userData : '{}');
  return userObject;
};

export const getPersonalDetails = () => {
  const userData = storage.getString('personalDetails');

  const personalDetails = JSON.parse(userData ? userData : '{}');
  return personalDetails;
};

export const fetchUserData = () => {
  let userData;
  userData = storage.getString('userData');
  // .then(value => {
  console.log(userData);
  const userObject = JSON.parse(userData ? userData : '{}');
  userData = userObject;
  // });
  storage.set('userData', JSON.stringify(userData));
  removePersonalDetails();
  removeImageDetails();
  removeOrderDetails();
};

export const removeToken = () => {
  console.log('removeToken');
  storage.delete('userToken');
};

export const setSyncCall = (val: boolean) => {
  console.log(val);
  storage.set('syncCall', val);
};

export const getSyncCall = () => {
  const value = storage.getBoolean('syncCall');
  if (value) return true;
  else return false;
};

export const fetcdOfflineFiles = async () => {
  // var paths = [`${RNFS.ExternalDirectoryPath}/hoclData/userDetails.json`,
  //   `${RNFS.ExternalDirectoryPath}/hoclData/imgDetails.json`,
  //   `${RNFS.ExternalDirectoryPath}/hoclData/orderDetails.json`
  // ];
  var path = `${RNFS.ExternalDirectoryPath}/hpclData/source/`;
  var directory;
  // paths.map(async file=>{
  await RNFS.readDir(path)
    .then(json => {
      directory = json;
    })
    .catch(err => {
      console.log(err);
    });

  return directory;

  // })
};

export const folderCreaton = async () => {
  var path = `${RNFS.ExternalDirectoryPath}/hpclData`;
  var path1 = `${RNFS.ExternalDirectoryPath}/hpclData/source`;
  var path2 = `${RNFS.ExternalDirectoryPath}/hpclData/archive`;
  console.log(RNFS.ExternalDirectoryPath);
  let parenntFolder = await RNFS.exists(path);
  console.log(parenntFolder);
  if (!parenntFolder) {
    RNFS.mkdir(path)
      .then(status => console.log('parenntFolder Created'))
      .catch(err => console.log(err));
    RNFS.mkdir(path1)
      .then(status => console.log('src folder creation'))
      .catch(err => console.log(err));
    RNFS.mkdir(path2)
      .then(status => console.log('archive folder creation'))
      .catch(err => console.log(err));
  } else {
    console.log('already Exsists');
  }
};
