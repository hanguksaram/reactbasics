import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBtzsDbD9z4DOj6OlV2ScOFMCw8sMGHaVg",
    authDomain: "nba-proj.firebaseapp.com",
    databaseURL: "https://nba-proj.firebaseio.com",
    projectId: "nba-proj",
    storageBucket: "nba-proj.appspot.com",
    messagingSenderId: "368435111110"
  }

  firebase.initializeApp(config)

  const firebaseDB = firebase.database()

  const firebaseArticles = firebaseDB.ref('articles')
  const firebaseTeams = firebaseDB.ref('teams')
  const firebaseVideos = firebaseDB.ref('videos')
  const firebaseLooper = (snapshot) => {
    const data = []
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    })
    return data

  }

  export {
      firebase,
      firebaseDB,
      firebaseArticles,
      firebaseTeams,
      firebaseVideos,
      firebaseLooper

  }