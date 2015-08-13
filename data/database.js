/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Model types
export class User extends Object {}

var users = {}

for (var i = 0; i < 11; i++) {
  users[String(i)] = { id : String(i), name: 'I am Ben number ' + i }
}

console.log('running')

module.exports = {
  // Export methods that your schema can use to interact with your database
  getUserById (id) {
    console.log('get user by id!', users[id])
    return users[id]
  },

  getUsers() {
    console.log('get users!', users)
    return users
  }

};
