/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$getRoot} from 'lexical';
import {useEffect} from 'react';

import {$createTableNodeWithDimensions} from '../utils/createTableNodeWithDimensions';

export const useInsertTable = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      const table = $createTableNodeWithDimensions(2, 2, false);
      root.append(table);
    });
  }, [editor]);
};
