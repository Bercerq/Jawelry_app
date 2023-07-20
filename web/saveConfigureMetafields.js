const CREATE_METAFILED_MUTATION = `
mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
    metafieldDefinitionCreate(definition: $definition) {
      createdDefinition {
        id
        name
        namespace
        key
        # add other return fields
      }
      userErrors {
        field
        message
        code
      }
    }
  }`;



export default async function saveConfiguration(session) {
    const client = new shopify.api.clients.Graphql({ session });
  
    try {
      await client.query({
        data: {
          query: CREATE_METAFILED_MUTATION,
          variables: {
            definition: {
                "name": "Ingredients",
                "namespace": "$app:jawerly_app",
                "key": "ingredients",
                "description": "A list of ingredients used to make the product.",
                "type": "list.single_line_text_field",
                "ownerType": "PRODUCT"
              }
          },
        },
      });
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        throw new Error(
          `${error.message}\n${JSON.stringify(error.response, null, 2)}`
        );
      } else {
        throw error;
      }
    }
  }
  