import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import axios from 'axios';

import * as path from 'path';

function find(predicate: string, collection: any) {
    const result = {
        ...collection,
        results: collection.results.filter((item: any) => {
            return item.name.toLowerCase().includes(predicate.toLowerCase());
        })
    };
    return result;
}

function findOrReturn(name: string | undefined, ret: any) {
    return name ? find(name, ret) : ret;
}

const resolvers = {
    Query: {
        people: async (_: any, { name, page }: any) => {
            const response = await axios.get(`https://swapi.co/api/people/?page=${page || 1}`);
            const people = response.data;
            return findOrReturn(name, people);
        },
        starships: async (_: any, { name, page }: any) => {
            const response = await axios.get(`https://swapi.co/api/starships/?page=${page || 1}`);
            const starships = response.data;
            return findOrReturn(name, starships);
        },
        planets: async (_: any, { name, page }: any) => {
            const response = await axios.get(`https://swapi.co/api/planets/?page=${page || 2}`);
            const planets = response.data;
            return findOrReturn(name, planets);
        }
    }
};

const typeDefs = importSchema(path.join(__dirname, './schema.graphql'));

const server = new GraphQLServer({ typeDefs, resolvers });
async function startServer() {
    await server.start();
    console.log('Server is running on localhost:4000');
}

startServer();
