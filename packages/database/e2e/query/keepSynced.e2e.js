/*
 * Copyright (c) 2016-present Invertase Limited & Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

describe('database().ref().keepSynced()', function () {
  describe('v8 compatibility', function () {
    beforeEach(async function beforeEachTest() {
      // @ts-ignore
      globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
    });

    afterEach(async function afterEachTest() {
      // @ts-ignore
      globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = false;
    });

    it('throws if bool is not a valid type', async function () {
      try {
        await firebase.database().ref().keepSynced('foo');
        return Promise.reject(new Error('Did not throw an Error.'));
      } catch (error) {
        error.message.should.containEql("'bool' value must be a boolean value.");
        return Promise.resolve();
      }
    });

    it('toggles keepSynced on and off without throwing', async function () {
      if (Platform.other) return;
      const ref = firebase.database().ref('noop').orderByValue();
      await ref.keepSynced(true);
      await ref.keepSynced(false);
    });
  });

  describe('modular', function () {
    it('throws if bool is not a valid type', async function () {
      const { getDatabase, ref, keepSynced } = databaseModular;

      try {
        await keepSynced(ref(getDatabase()), 'foo');
        return Promise.reject(new Error('Did not throw an Error.'));
      } catch (error) {
        error.message.should.containEql("'bool' value must be a boolean value.");
        return Promise.resolve();
      }
    });

    it('toggles keepSynced on and off without throwing', async function () {
      if (Platform.other) return;
      const { getDatabase, ref, orderByValue, query, keepSynced } = databaseModular;

      const dbRef = query(ref(getDatabase(), 'noop'), orderByValue());
      await keepSynced(dbRef, true);
      await keepSynced(dbRef, false);
    });
  });
});
