import { collection, getFirestore, getDocs } from 'firebase/firestore'; 

const db = getFirestore();
const  getAll = async (userId = 2413) => {
  const userMessagesCollection = collection(db, `user/messages/${userId}`);
  const messagesSnapshot = await getDocs(userMessagesCollection);
  const messagesData = messagesSnapshot.docs.map(doc => doc.data());
  return messagesData;
};

// const create = (data) => {
//   return user.push(data);  
// };

// const update = (key, data) => {
//   return user.child(key).update(data);
// };

// const remove = (key) => {
//   return user.child(key).remove();
// };

// const removeAll = () => {
//   return user.remove();
// };

export default {
  getAll,
  // create,
  // update,
  // remove,
  // removeAll,
};
