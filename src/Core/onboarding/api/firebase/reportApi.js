import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const usersRef = firestore().collection('reports');

const getReports = (user, resolve) => {
  if (user) {
    usersRef
      .get()
      .then(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          list.push(doc.data());
          // console.log(doc.id, '=>', doc.data());
        });

        const userData = list;
        console.error('getReports ', userData);

        resolve({ ...userData });
      })
      .catch(error => {
        console.error('getReports ', error);
        resolve(null);
      });
  } else {
    resolve(null);
  }
};

export const retrieveReports = () => {
  return new Promise(resolve => {
    return auth().onAuthStateChanged(user => {
      return getReports(user, resolve);
    });
  });
};
