module.exports = {
  siteMetadata: {
    title: 'Gatsby With Client Data Fetching',
    description:
      'A Gatsby example using a GraphQL query at buildtime, and client api request at runtime.',
  },
  plugins: [
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'cms',
        fieldName: 'cms',
        url: 'https://api-euwest.graphcms.com/v1/cjws6kepu19ge01bv3l8whvun/master',
      },
    },
  ],
}
