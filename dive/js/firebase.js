import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js'
import { getFirestore,setDoc,doc,getDoc,getDocs,deleteDoc,updateDoc,arrayUnion,collection   } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js"

// Add Firebase products that you want to use
import { getAuth,onAuthStateChanged,signInWithPopup,GoogleAuthProvider,signOut,getRedirectResult,signInWithRedirect,updateProfile  } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js'
const firebaseConfig = {
    apiKey: "AIzaSyA5Fk8CSmadx2B_4BaUL2D_d8Rl6Dm7DAs",
    authDomain: "dive-ba838.firebaseapp.com",
    projectId: "dive-ba838",
    storageBucket: "dive-ba838.appspot.com",
    messagingSenderId: "324226287533",
    appId: "1:324226287533:web:69342b9658a467c8eb8324",
    measurementId: "G-49HM8DB8RT"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore();
var user;
const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
provider.setCustomParameters({
   prompt: 'select_account'
});

const signOutBtn = document.getElementById("signOutBtn")
const saveBtn = document.getElementById("saveBtn")
updateProfile(auth.currentUser, {
  displayName: "Jane Q. User"
}).then(() => {
  // Profile updated!
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});
onAuthStateChanged(auth, user => {
    if(user == null){
      signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const displayName = user.displayName;
        console.log('displayName: ' + displayName);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }
    else{
      user = getAuth().currentUser.uid;
      getAuth().currentUser.providerData.forEach((profile) => {
        // console.log("Sign-in provider: " + profile.providerId);
        // console.log("  Provider-specific UID: " + profile.uid);
        // console.log("  Name: " + profile.displayName);
        // console.log("  Email: " + profile.email);
        // console.log("  Photo URL: " + profile.photoURL);
        document.getElementById('u_name').innerHTML = profile.displayName;
        uname = profile.displayName;
        document.getElementById('u_photo').innerHTML = '<img style="transform: scale(0.7,0.7);" src=" '+ profile.photoURL + '" with="600" heigh="400" alt="一張圖片">';
      });
      const docRef = doc(db, "Users", user);
      getDoc(docRef).then(docSnap => {
        tempIndex = 0;
        items = [];
        if (docSnap.exists()) {
          const subColRef = collection(db, "Users", user,"record");
          getDocs(subColRef).then(subDocSnap => {
            subDocSnap.forEach((doc) => {
              if(doc.data().end == false){
                console.log("Document data:", docSnap.data().index);
                tempIndex = docSnap.data().index-1;
                if(docSnap.data().items != undefined){
                  items = docSnap.data().items;
                }
              }
            });
          })
          
        }
      })
      
    }
});
signOutBtn.onclick = function(event) { 
  if (confirm('確定要登出帳號嗎?')) {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    }); 
  } else {

  }
  };
deleteBtn.onclick = function(event) {
  if (confirm('確定要刪除遊玩紀錄嗎?')) {
    user = getAuth().currentUser.uid;
    getDoc(doc(db, "Users", user)).then(docSnap => {
      if (docSnap.exists()) {
        deleteDoc(doc(db, "Users", user));
        signInWithRedirect(auth, provider);
      } 
    })
  } else {

  }
  
  
};
saveBtn.onclick = function(event) {
  user = getAuth().currentUser.uid;
  const docRef = doc(db, "Users", user);
  var haveRecord = false;
  var lastRecord = 0;
  const subColRef = collection(db, "Users", user,"record");
  getDocs(subColRef).then(docSnap => {
    docSnap.forEach((doc) => {
      lastRecord += 1;
      if(doc.data().end == false){
        haveRecord = true;
        lastRecord = doc.id;
        console.log("Id: ", doc.id, "End: ", doc.data().end);
        setDoc(docRef, {
          sceneIndex: sceneIndex,
          score: score,
          index: index,
          items: items
        });
        
        return;
      }
    });
    if(!haveRecord){
      lastRecord  += 1
    }
    const recRef = doc(db, "Users", user,"record",lastRecord.toString());
    getDoc(recRef).then(recSnap => {
      if (!recSnap.exists()){
        setDoc(recRef, {
          end: false
        });
      }
    })
    if(saveArray != []){
      console.log('歷程存檔')
      saveArray.forEach(element =>
         updateDoc(doc(db, "Users", user,"record",lastRecord.toString()), {
            [element[0]]: [element[1],element[2]],
            end:false
          })
         );
    }
    else{
      console.log('沒歷程存檔')
      updateDoc(doc(db, "Users", user,"record",lastRecord.toString()), {
        end:false
      });
    }
    if(index >= textArray.length-2){
      console.log('最終存檔')
      updateDoc(doc(db, "Users", user,"record",lastRecord.toString()), {
        end:true
      });
    }

    
  })
  
 };
 


const washingtonRef = doc(db, "cities", "LA");
await updateDoc(washingtonRef, {
  test: arrayUnion(50)
});