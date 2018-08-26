"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const graphql_import_1 = require("graphql-import");
const axios_1 = require("axios");
const path = require("path");
function find(predicate, collection) {
    const result = Object.assign({}, collection, { results: collection.results.filter((item) => {
            return item.name.toLowerCase().includes(predicate.toLowerCase());
        }) });
    return result;
}
function findOrReturn(name, ret) {
    return name ? find(name, ret) : ret;
}
const resolvers = {
    Query: {
        people: (_, { name, page }) => __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`https://swapi.co/api/people/?page=${page || 1}`);
            const people = response.data;
            return findOrReturn(name, people);
        }),
        starships: (_, { name, page }) => __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`https://swapi.co/api/starships/?page=${page || 1}`);
            const starships = response.data;
            return findOrReturn(name, starships);
        }),
        planets: (_, { name, page }) => __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`https://swapi.co/api/planets/?page=${page || 2}`);
            const planets = response.data;
            return findOrReturn(name, planets);
        })
    }
};
const typeDefs = graphql_import_1.importSchema(path.join(__dirname, './schema.graphql'));
const server = new graphql_yoga_1.GraphQLServer({ typeDefs, resolvers });
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.start();
        console.log('Server is running on localhost:4000');
    });
}
startServer();
//# sourceMappingURL=index.js.map