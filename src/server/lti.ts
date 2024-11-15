import Lti from 'ltijs';
import Database from 'ltijs-sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Setup ltijs-sequelize using SQLite
const db = new Database('sqlite::memory:');

// Setup provider
const lti = new Lti('KEYID', // Key identifier
  { 
    url: 'mongodb://localhost/dbname', // Database url
    connection: db, // Database connection object
    debug: true // Debug mode
  },
  { 
    staticPath: path.join(__dirname, '../../dist'), // Path to static files
    cookies: {
      secure: false, // Set secure to true in production
      sameSite: 'None'
    },
    devMode: true // Set devMode to false in production
  }
);

// Setup LTI platform configuration
const setup = async () => {
  // Deploy all databases
  await lti.deploy();

  // Register platform
  await lti.registerPlatform({
    url: 'https://platform.url',
    name: 'Platform Name',
    clientId: 'CLIENTID',
    authenticationEndpoint: 'https://platform.url/auth',
    accesstokenEndpoint: 'https://platform.url/token',
    authConfig: {
      method: 'JWK_SET',
      key: 'https://platform.url/jwks'
    }
  });

  // Setup whitelist for valid resource links
  lti.whitelist.add('https://platform.url');
};

// LTI launch callback
lti.onConnect((token, req, res) => {
  // Create session
  return res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Deep linking callback
lti.onDeepLinking(async (token, req, res) => {
  const resource = {
    type: 'ltiResourceLink',
    title: 'PFL Academy Resource',
    url: `${process.env.APP_URL}/launch`,
    custom: {
      resource: token.platformContext.resource.id
    }
  };

  return lti.DeepLinking.createDeepLinkingMessage(token, resource, { message: 'Resource successfully created' });
});

// Names and Roles Provisioning Service
lti.onNrps((token, req, res) => {
  const members = []; // Fetch members from your database
  return members;
});

// Assignment and Grade Services
lti.onAgs((token, req, res) => {
  const lineItems = []; // Fetch grade items from your database
  return lineItems;
});

export { lti, setup };