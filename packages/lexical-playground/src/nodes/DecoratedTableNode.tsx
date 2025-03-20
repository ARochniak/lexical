/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {TableNode} from '@lexical/table';
import {EditorConfig, LexicalEditor} from 'lexical';

export class DecoratedTableNode extends TableNode {
  static getType() {
    return 'decorated-table-node';
  }

  static clone(node: TableNode) {
    return new DecoratedTableNode(node.__key);
  }

  createDOM(config: EditorConfig, editor?: LexicalEditor) {
    const container = super.createDOM(config, editor) as HTMLTableElement;
    container.classList.add('bw-release-container');
    const table = container.querySelector('table') as HTMLTableElement;

    table.setAttribute('cellspacing', '0');

    return container;
  }
}
