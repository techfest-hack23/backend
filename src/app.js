const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const mongodb = require('./mongodb');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongodb);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

// default users
const defaultUsers = [
  {
    email: 'admin',
    password: process.env.DEFAULT_ADMIN_PASSWORD || 'Welcome1',
    first_name: 'System',
    last_name: 'Administrator',
    nick_name: 'Sys Admin',
    role: 'community-admin',
    is_client: false,
    client_id: null
  },
  {
    email: 'client1',
    password: process.env.DEFAULT_Client_PASSWORD || 'Welcome1',
    first_name: 'Client',
    last_name: 'User1',
    nick_name: 'Client 1',
    role: 'Client',
    is_client: true,
    client_id: null
  },
  {
    email: 'Client2',
    password: process.env.DEFAULT_Client_PASSWORD || 'Welcome1',
    first_name: 'Client',
    last_name: 'User2',
    nick_name: 'Client 2',
    role: 'Client',
    is_client: true,
    client_id: null
  },
  {
    email: 'navigator1',
    password: process.env.DEFAULT_NAVIGATOR_PASSWORD || 'Welcome1',
    first_name: 'Community',
    last_name: 'Navigator1',
    nick_name: 'Navigator 1',
    role: 'community-navigator',
    is_navigator: true,
    client_id: null
  },
  {
    email: 'navigator2',
    password: process.env.DEFAULT_NAVIGATOR_PASSWORD || 'Welcome1',
    first_name: 'Community',
    last_name: 'Navigator2',
    nick_name: 'Navigator 2',
    role: 'community-navigator',
    is_navigator: true,
    client_id: null
  },
  {
    email: 'provider1',
    password: process.env.DEFAULT_ORGANIZATION_PASSWORD || 'Welcome1',
    first_name: 'Community',
    last_name: 'Provider',
    nick_name: 'Provider 1',
    phone_numbers: [],
    emails: [],
    role: 'community-organization',
    is_client: false,
    client_id: null,
    is_provider: true,
    organization_id: null
  },
  {
    email: 'provider2',
    password: process.env.DEFAULT_ORGANIZATION_PASSWORD || 'Welcome1',
    first_name: 'Community',
    last_name: 'Provider',
    nick_name: 'Provider 2',
    phone_numbers: [],
    emails: [],
    role: 'community-organization',
    is_client: false,
    client_id: null,
    is_provider: true,
    organization_id: null
  }
]

// const defaultCabins = [
//   {
//     name: ''
//   }
// ]

const defaultClients = [
  {
    first_name: 'Client',
    last_name: 'User1',
    nick_name: 'Client 1',
    date_of_birth: '11/29/1981',
    known_aliases: [
      'Person 1'
    ],
    known_addresses: [

    ],
    known_phone_numbers: [],
    known_medications: [],
    known_addictions: [],
    known_contacts: [],
    notes: [],
    is_user: true,
    user_id: '6509c89a646b668412cece46'
  },
  {
    first_name: 'Client',
    last_name: 'User2',
    nick_name: 'Client 2',
    date_of_birth: '11/29/1982',
    known_aliases: [
      'Person 1'
    ],
    known_addresses: [

    ],
    known_phone_numbers: [],
    known_medications: [],
    known_addictions: [],
    known_contacts: [],
    is_user: true,
    user_id: '6509c89a646b668412cece46'
  },
]

// const default  = [
//   {
    
//   }
// ]

// create default admin user
setTimeout(async () => {
  try {
    const usersData = await app.service('users').find();
    if(usersData.total == 0) {
      console.log(`[info] no users found creating defaults`);
      // await app.service('users').create({
      //   email: 'admin',
      //   password: process.env.DEFAULT_ADMIN_PASSWORD || 'Welcome1',
      //   first_name: 'System',
      //   last_name: 'Administrator',
      //   nick_name: 'Sys Admin',
      //   role: 'community-admin',
      //   is_client: false,
      //   client_id: null

      // });

      for ( let user of defaultUsers ) {
        await app.service('users').create(user);
      }
      for ( let p of defaultClients ) {
        await app.service('clients').create(p)
      }
    }
  }
  catch(e) {
    // console.log(`[error] unable to create default objects`, e);
  }
}, 5000)

module.exports = app;
