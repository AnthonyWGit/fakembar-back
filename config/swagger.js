import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Carambar & Co API',
      version: '1.0.0',
      description: 'API for managing Carambar jokes',
      contact: {
        name: 'Carambar API Support',
        url: 'https://carambar.com/support',
        email: 'api-support@carambar.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.API_PORT}/api/v1`,
        description: 'Local development server'
      },
      {
        url: 'https://fakembar.com/api/v1',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        Joke: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Auto-generated ID'
            },
            text: {
              type: 'string',
              description: 'The joke content'
            },
            answer: {
              type: 'string',
              description: 'The punchline/answer'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        }
      }
    }
  },
  // Paths to files containing OpenAPI definitions
  apis: [
    path.join(__dirname, '../src/routes/*.js'),
    path.join(__dirname, '../src/controllers/*.js')
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;