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
    email: 'admin@system.local',
    password: process.env.DEFAULT_ADMIN_PASSWORD || 'Welcome1',
    first_name: 'System',
    last_name: 'Administrator',
    nick_name: 'Sys Admin',
    role: 'community-admin',
    is_participant: false,
    participant_id: null
  },
  {
    _id: '6509c89a646b668412cece46',
    email: 'participant1@system.local',
    password: process.env.DEFAULT_PARTICIPANT_PASSWORD || 'Welcome1',
    first_name: 'Participant',
    last_name: 'User1',
    nick_name: 'Participant 1',
    role: 'participant',
    is_participant: true,
    participant_id: null
  },
  {
    _id: '6509c89a646b668412cece47',
    email: 'participant2@system.local',
    password: process.env.DEFAULT_PARTICIPANT_PASSWORD || 'Welcome1',
    first_name: 'Participant',
    last_name: 'User2',
    nick_name: 'Participant 2',
    role: 'participant',
    is_participant: true,
    participant_id: null
  },
  {
    email: 'navigator1@system.local',
    password: process.env.DEFAULT_NAVIGATOR_PASSWORD || 'Welcome1',
    first_name: 'Community',
    last_name: 'Navigator1',
    nick_name: 'Navigator 1',
    role: 'community-navigator',
    is_participant: false,
    participant_id: null
  },
  {
    email: 'navigator2@system.local',
    password: process.env.DEFAULT_NAVIGATOR_PASSWORD || 'Welcome1',
    first_name: 'Community',
    last_name: 'Navigator2',
    nick_name: 'Navigator 2',
    role: 'community-navigator',
    is_participant: false,
    participant_id: null
  },
  {
    email: 'org1@system.local',
    password: process.env.DEFAULT_ORGANIZATION_PASSWORD || 'Welcome1',
    first_name: 'Community',
    last_name: 'Org1',
    nick_name: 'Organization 1',
    role: 'community-organization',
    is_participant: false,
    participant_id: null,
    is_organization: true,
    organization_id: null
  },
  {
    email: 'org2@system.local',
    password: process.env.DEFAULT_ORGANIZATION_PASSWORD || 'Welcome1',
    first_name: 'Community',
    last_name: 'Org2',
    nick_name: 'Organization 2',
    role: 'community-organization',
    is_participant: false,
    participant_id: null,
    is_organization: true,
    organization_id: null
  }
]

const defaultParticipants = [
  {
    first_name: 'Participant',
    last_name: 'User1',
    nick_name: 'Participant 1',
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
  {
    email: 'participant2@system.local',
    password: process.env.DEFAULT_PARTICIPANT_PASSWORD || 'Welcome1',
    first_name: 'Participant',
    last_name: 'User2',
    nick_name: 'Participant 2',
    role: 'participant',
    is_participant: true,
    participant_id: '6509c89a646b668412cece47'
  },
]

const defaultOrganizations  = [
  {
    
  }
]

// create default admin user
setTimeout(async () => {
  try {
    const usersData = await app.service('users').find();
    if(usersData.total == 0) {
      console.log(`[info] no users found creating defaults`);
      // await app.service('users').create({
      //   email: 'admin@system.local',
      //   password: process.env.DEFAULT_ADMIN_PASSWORD || 'Welcome1',
      //   first_name: 'System',
      //   last_name: 'Administrator',
      //   nick_name: 'Sys Admin',
      //   role: 'community-admin',
      //   is_participant: false,
      //   participant_id: null

      // });

      for ( let user of defaultUsers ) {
        await app.service('users').create(user);
      }
      // for ( let p of defaultParticipants ) {
      //   await app.service('participants').create(p)
      // }
    }
  }
  catch(e) {
    // console.log(`[error] unable to create default objects`, e);
  }
}, 15000)

module.exports = app;
