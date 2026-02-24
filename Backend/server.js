// //  const env = require('dotenv').config()
// import express from 'express';
// import mongoose from 'mongoose';
// import morgan from 'morgan';
// import cors from 'cors';
// import cookieSession  from 'cookie-session';
// import { config as dotenvConfig } from 'dotenv';
// dotenvConfig();

// //connect database
// import { notFoundError, errorHandler } from './Middelware/error-handler.js';

// import AuthRoutes from './routes/auth.js';
// import UsersRoutes from './routes/user.js';
// import RoleRoutes from './routes/Role.js';
// import reclamation_route from './routes/reclamation.js';
// import reclamation_type_route from './routes/type_reclamation.js';
// import PlatsRoutes from './routes/Plats.js'; //importer le router du fichier 
// import IngredientsRoutes from './routes/Ingredients.js'; 
// import SpecialitesRoutes from './routes/Specialite.js'; 
// import EventRoutes from './routes/evenement_route.js';
// import ParticipantRoutes from './routes/participant_route.js';
// import VoteRoutes from './routes/vote_route.js';
// import ReducUserRoutes from './routes/reducUser_route.js';
// import CommandeRoutes from './routes/Commande.js';


// const app = express(); // creer l'instance de express a utiliser
// const hostname = '127.0.0.1'; //l'@ du serveur
// const port = process.env.PORT || 9090; //le port du serveur
// const databaseName = 'Cookers';

// mongoose.set('debug', true);
// mongoose.Promise = global.Promise;

// mongoose
//   .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
//   .then(() => {
//     console.log(`Connected to ${databaseName}`);
//   })
//   .catch(err => {   
//     console.log(err);
//   });

//   const corsOptions = {
//     origin: ['http://localhost:5200', 'http://localhost:4200'], // Remplacez avec les domaines de votre application Angular
//     optionsSuccessStatus: 200 // Facultatif : spécifiez un code de statut de succès personnalisé
//   };
  
//   app.use(cors(corsOptions));
  
//   app.use(morgan('dev'));
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));
//   app.use('/img', express.static('public/images'));
//   app.use(
//     cookieSession({
//       name: "projectPi-session",
//       secret: "COOKIE_SECRET", // should use as secret environment variable
//       httpOnly: true
//     })
//   );

//   app.use('/reclamation', reclamation_route);
//   app.use('/Commande', CommandeRoutes);
//   app.use('/reclamation_type', reclamation_type_route);
//   app.use('/plats', PlatsRoutes);
//   app.use('/ingredients', IngredientsRoutes);
//   app.use('/specialites', SpecialitesRoutes);
//   app.use('/event', EventRoutes);
//   app.use('/event/participant', ParticipantRoutes);
//   app.use('/event/vote', VoteRoutes);
//   app.use('/reducUser',ReducUserRoutes);
//   app.use('/user', UsersRoutes);
//   app.use('/role', RoleRoutes);
//   app.use('/api', AuthRoutes);
//   app.post('/user/api', (req,res) => {
//     console.log(req.body);
//     res.redirect('http://localhost:4200/userpages/dashboard')
//     });
//   app.post('/user/confirm-user/:userId', (req,res) => {
//    console.log(req.body);
//    res.redirect('http://localhost:4200/auth/login')
//   });

//   app.use(notFoundError);
//   app.use(errorHandler);


// app.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });


import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

import { notFoundError, errorHandler } from './Middelware/error-handler.js';
import AuthRoutes from './routes/auth.js';
import UsersRoutes from './routes/user.js';
import RoleRoutes from './routes/Role.js';
import reclamation_route from './routes/reclamation.js';
import reclamation_type_route from './routes/type_reclamation.js';
import PlatsRoutes from './routes/Plats.js';
import IngredientsRoutes from './routes/Ingredients.js';
import SpecialitesRoutes from './routes/Specialite.js';
import EventRoutes from './routes/evenement_route.js';
import ParticipantRoutes from './routes/participant_route.js';
import VoteRoutes from './routes/vote_route.js';
import ReducUserRoutes from './routes/reducUser_route.js';
import CommandeRoutes from './routes/Commande.js';

const app = express();
const port = process.env.PORT || 9090;
const FRONTEND_URL = 'https://food-wheat-ten.vercel.app';


// =======================
// ✅ MONGODB
// =======================
mongoose.set('debug', false);
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.log('❌ MongoDB Error:', err.message));


// =======================
// ✅ CORS CONFIG (IMPORTANT)
// =======================
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


// =======================
// ✅ MIDDLEWARES
// =======================
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static('public/images'));


// =======================
// ✅ COOKIE SESSION (PRODUCTION READY)
// =======================
app.use(cookieSession({
  name: "projectPi-session",
  secret: process.env.COOKIE_SECRET || "fallback_secret",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",   // 🔥 obligatoire HTTPS
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
}));


// =======================
// ✅ ROUTES
// =======================
app.use('/reclamation', reclamation_route);
app.use('/Commande', CommandeRoutes);
app.use('/reclamation_type', reclamation_type_route);
app.use('/plats', PlatsRoutes);
app.use('/ingredients', IngredientsRoutes);
app.use('/specialites', SpecialitesRoutes);
app.use('/event', EventRoutes);
app.use('/event/participant', ParticipantRoutes);
app.use('/event/vote', VoteRoutes);
app.use('/reducUser', ReducUserRoutes);
app.use('/user', UsersRoutes);
app.use('/role', RoleRoutes);
app.use('/api', AuthRoutes);


// =======================
// ✅ REDIRECTS
// =======================
app.post('/user/api', (req, res) => {
  res.redirect(`${FRONTEND_URL}/userpages/dashboard`);
});

app.post('/user/confirm-user/:userId', (req, res) => {
  res.redirect(`${FRONTEND_URL}/auth/login`);
});


// =======================
// ✅ ERROR HANDLERS
// =======================
app.use(notFoundError);
app.use(errorHandler);


// =======================
// ✅ LOCAL LISTEN
// =======================
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
}

export default app;
