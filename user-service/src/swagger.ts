import swaggerJSDoc from "swagger-jsdoc";


const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi:"3.0.0",
        info: {
            title : "AKWABA SERVICE API",
            version : "1.0.0",
            description :"documentation des api projet akwaba ",
        }
    },
    apis: [
        "src/controllers/*.ts",
        "src/swagger.ts"
    ],
})

export default swaggerSpec