/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  getUserById,
  User
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */

var { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId)
    console.log('get object from id', fromGlobalId(globalId), globalId)
    if (type === 'User') {
      return getUser(id);
    } else {
      return null;
    }
  },
  (obj) => {
    console.log('get graphql type from object')
    if (obj instanceof User) {
      return userType;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 */

var userType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => {
    return {
      id: globalIdField('User'),
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The name of the user'
      }
    }
  },
  interfaces: [nodeInterface],
});


/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      user: {
        type: userType,
        resolve: () => {
          console.log('args for query')
          return getUserById('1')
        }
      }
    }
  }
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
