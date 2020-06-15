const Koa = require('koa');
const KoaRouter = require('koa-router');
const {ApolloServer, gql} = require('apollo-server-koa');
const resolvers = require('./apollo/resolvers');
const typeDefs = require('./apollo/typedefs');
const json = require('koa-json');

const app = new Koa();
const router = new KoaRouter();

app.use(json());
app.use(router.routes()).use(router.allowedMethods());

router.get('/test', ctx => (ctx.body = {'msg': 'Hello World'}));

/* The ApolloServer constructor requires two parameters: your schema definition and your set of resolvers. */
const apolloServer = new ApolloServer({typeDefs, resolvers});

apolloServer.applyMiddleware({app});

app.listen({port: 3000}, () =>
    console.log(`🚀 Server ready at http://localhost:3000${apolloServer.graphqlPath}`),
);