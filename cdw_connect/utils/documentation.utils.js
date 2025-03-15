const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

/**
 * Setup Swagger documentation
 * @param app
 */
function setupDocs(app) {
  // swagger definition
  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "CDW Connect",
      version: "1.0.0",
      description: "Description",
    },
    servers: [
      {
        url: "http://localhost:8080/",
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "auth-token",
        },
      },
      schemas: {
        posts: {
          type: "object",
          properties: {
            email: { type: "string" },
            postId: { type: "string" },
            title: { type: "string" },
            location: { type: "string" },
            media: { type: "string" },
            caption: { type: "string" },
            timestamp: { type: "string" },
            like: {
              type: "object",
              properties: {
                count: { type: "number" },
                users: { type: "array" },
              },
            },
            comments: {
              type: "object",
              properties: {
                employeeId: { type: "string" },
                comment: { type: "string" },
                timestamp: { type: "string" },
              },
            },
          },
        },
        employees: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            registerDate: { type: "string" },
            employeeId: { type: "string" },
            email: { type: "string" },
            name: { type: "string" },
            role: { type: "string" },
            gender: { type: "string" },
            profilePicture: { type: "string" },
            profileBio: { type: "string" },
            destination: { type: "string" },
            certifications: { type: "array" },
            experience: { type: "number" },
            bu: { type: "string" },
            location: { type: "string" },
            approvalStatus: { type: "string" },
            password: { type: "string" },
            timestamp: { type: "string" },
          },
        },
      },
    },
  };

  // swagger options
  const options = {
    swaggerDefinition,
    apis: ["./routes/*.js", "./controllers/*.js"],
  };

  // swagger spec
  const swaggerSpec = swaggerJSDoc(options);

  // create docs route
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = { setupDocs };
