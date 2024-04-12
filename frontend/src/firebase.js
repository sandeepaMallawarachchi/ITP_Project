import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCQ_WRq3WzB_S74RNxeGP4l7eCqNP4dYOg",
  authDomain: "hendrik-s-tea.firebaseapp.com",
  projectId: "hendrik-s-tea",
  storageBucket: "hendrik-s-tea.appspot.com",
  messagingSenderId: "568505252780",
  appId: "1:568505252780:web:8635ac9d1c1cb217535809",
  measurementId: "G-T0SPWRDWTD"
};

const app = initializeApp(firebaseConfig);

export default app;