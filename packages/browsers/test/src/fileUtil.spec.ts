/**
 * @license
 * Copyright 2025 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'assert';
import fs from 'fs';
import os from 'os';
import path from 'path';

import {extractZip} from '../../lib/cjs/fileUtil.js';

describe('extract-zip', function () {
  let tmpDir = '/tmp/puppeteer-browsers-test';

  const fixturesPath = path.join(__dirname, '..', 'fixtures');

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'puppeteer-browsers-test'));
  });

  afterEach(async () => {
    fs.rmSync(tmpDir, {
      recursive: true,
    });
  });

  it('unpacks an archive with permissions', async () => {
    await extractZip(path.join(fixturesPath, 'test.zip'), tmpDir);
    const dir = fs.readdirSync(tmpDir, {
      recursive: true,
    });
    assert.deepStrictEqual(dir, [
      'test',
      'test/folder',
      'test/main.txt',
      'test/run.sh',
      'test/folder/folder.txt',
    ]);
    assert.strictEqual(
      fs.readFileSync(path.join(tmpDir, 'test/main.txt'), 'utf8'),
      'main',
    );
  });
});
