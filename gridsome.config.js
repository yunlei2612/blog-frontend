// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: 'http://113.31.116.81:1337',
        queryLimit: 1000, 
        contentTypes: ['article','follower','following','project','post'],
        typeName:'Strapi'
      }
    }
  ],
  templates: {
   
    StrapiPost: [
      {
        path: '/post/:id',
        component: './src/templates/Blog.vue'
      }
    ],
  },
}
