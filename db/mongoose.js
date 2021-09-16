const mongoose = require('mongoose');
const config = process.env;

mongoose.connect(config.MONGO_URI || config.MONGO_URI_PRODUCTION, {
//useCreatendex: true, 
   //useFindAndModify: false, 
   useNewUrlParser: true, 
   useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log(`${err}`));