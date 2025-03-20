/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  $createTableCellNode,
  $createTableNode,
  $createTableRowNode,
  InsertTableCommandPayloadHeaders,
  TableCellHeaderStates,
  TableNode,
} from '@lexical/table';
import {$createParagraphNode, $createTextNode} from 'lexical';

export function $createTableNodeWithDimensions(
  rowCount: number,
  columnCount: number,
  includeHeaders: InsertTableCommandPayloadHeaders = true,
): TableNode {
  const tableNode = $createTableNode();

  // insert first merged cell
  const tableFirstRowNode = $createTableRowNode();
  const tableFirstCellNode = $createTableCellNode(
    TableCellHeaderStates.NO_STATUS,
    columnCount,
  );
  tableFirstCellNode.setBackgroundColor('#cef');
  const firstRowParagraphNode = $createParagraphNode();
  firstRowParagraphNode.append($createTextNode());
  tableFirstCellNode.append(firstRowParagraphNode);
  tableFirstRowNode.append(tableFirstCellNode);
  tableNode.append(tableFirstRowNode);

  for (let iRow = 1; iRow < rowCount; iRow++) {
    const tableRowNode = $createTableRowNode();

    for (let iColumn = 0; iColumn < columnCount; iColumn++) {
      let headerState = TableCellHeaderStates.NO_STATUS;

      if (typeof includeHeaders === 'object') {
        if (iRow === 0 && includeHeaders.rows) {
          headerState |= TableCellHeaderStates.ROW;
        }
        if (iColumn === 0 && includeHeaders.columns) {
          headerState |= TableCellHeaderStates.COLUMN;
        }
      } else if (includeHeaders) {
        if (iRow === 0) {
          headerState |= TableCellHeaderStates.ROW;
        }
        if (iColumn === 0) {
          headerState |= TableCellHeaderStates.COLUMN;
        }
      }

      const tableCellNode = $createTableCellNode(headerState);
      const paragraphNode = $createParagraphNode();
      paragraphNode.append($createTextNode());
      tableCellNode.append(paragraphNode);
      tableRowNode.append(tableCellNode);
    }

    tableNode.append(tableRowNode);
  }

  return tableNode;
}
