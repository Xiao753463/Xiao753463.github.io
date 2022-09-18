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
const table = document.getElementById('recordTable')
const page = document.getElementById('page')
var nowPage = 1;
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
        document.getElementById('u_photo').innerHTML = '<img style="transform: scale(0.7,0.7);" src=" '+ profile.photoURL + '" with="600" heigh="400" alt="一張圖片">';
      });
      const docRef = doc(db, "Users", user);
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          const subColRef = collection(db, "Users", user,"record");
          getDocs(subColRef).then(docSnap => {
            docSnap.forEach((doc) => {
              if(doc.data().end == true){
                console.log("讀取第 %d 頁", doc.id,);
                page.innerHTML += "<button id='"+ doc.id +"' class='pageBtn'>"+ doc.id +"</button>"
                
                console.log( doc.id,);
                // Object.keys(doc.data()).sort().forEach((key)=>{
                //     if(key.includes('題目')){
                //         if(doc.data()[key] == 0){
                //             console.log("第 %d 題 答錯", key[2]);
                //             table.innerHTML += "<tr><td>"+key[2] +"</td><td>答錯</td></tr>"
                //         }
                //         else{
                //             console.log("第 %d 題 答對", key[2]);
                //             table.innerHTML += "<tr><td>"+key[2] +"</td><td>答對</td></tr>"
                //         }
                        
                //     }
                // })
                
              }
            });
            
            var elements = document.getElementsByClassName("pageBtn");
            for (var i = 0; i < elements.length; i++) {
              elements[i].style.border = "none";
              elements[i].addEventListener('click', function(event){
                table.innerHTML = ""
                var targetElement = event.target;
                
                for (var a = 0; a < elements.length; a++) {
                  
                  if((a < Number(targetElement.id)-3) || (a > Number(targetElement.id) +1)){
                    elements[a].style.display ="none"
                  }
                  else{
                    elements[a].style.display ="inline-block"
                    console.log(targetElement.id + ": " +elements[a].id)
                  }
                }
                document.getElementById(nowPage).style.backgroundColor = "";
                document.getElementById(nowPage).style.color = "black";
                document.getElementById(nowPage).style.transform = "scale(1,1)";
                document.getElementById(nowPage).style.margin = "0 3px";
                document.getElementById(nowPage).style.color = "#104469";
                document.getElementById(nowPage).style.textShadow = "none";
                targetElement.style.transform = "scale(1.5,1.5)";
                targetElement.style.margin = "0 5px";
                targetElement.style.color = "white";
                targetElement.style.textShadow= "-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)";
                nowPage = targetElement.innerHTML
                console.log(nowPage);
                const docRef = doc(db, "Users", user,"record",nowPage);
                getDoc(docRef).then(docSnap => {
                    Object.keys(docSnap.data()).sort().forEach((key)=>{
                        if(key.includes('題目')){
                            if(docSnap.data()[key][0] == 0){
                                table.innerHTML += "<tr><td>"+key +"</td><td style='color: red'>答錯</td><td>"+docSnap.data()[key][1] +"</td></tr>"
                            }
                            else{
                                table.innerHTML += "<tr><td>"+key +"</td><td>答對</td><td>"+docSnap.data()[key][1] +"</td></tr>"
                            }
                        }
                        if(key.includes('安裝')){
                          if(docSnap.data()[key][0] == 0){
                              table.innerHTML += "<tr><td>"+key +"</td><td>一次成功</td><td>"+docSnap.data()[key][1] +"</td></tr>"
                          }
                          else{
                              table.innerHTML += "<tr><td>"+key +"</td><td style='color: red'>嘗試 "+docSnap.data()[key][0]+" 次</td><td>"+docSnap.data()[key][1] +"</td></tr>"
                          }
                      }
                    })
                })
              }, false);
            }
            if(elements.length > 0){
                document.getElementById(elements.length).click();
            } 
            
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

