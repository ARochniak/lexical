/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type {JSX} from 'react';

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {
  $getTableNodeFromLexicalNodeOrThrow,
  TableCellNode,
} from '@lexical/table';
import {useCallback} from 'react';

import TextInput from '../../ui/TextInput';

type TableResizeActionProps = Readonly<{
  tableCellNode: TableCellNode;
  setIsMenuOpen: (isOpen: boolean) => void;
  showResizingModal: (
    title: string,
    showModal: (onClose: () => void) => JSX.Element,
  ) => void;
}>;

export const TableResizeAction = ({
  tableCellNode,
  setIsMenuOpen,
  showResizingModal,
}: TableResizeActionProps) => {
  const [editor] = useLexicalComposerContext();

  const resizeTableAtSelection = useCallback(
    (width: string) => {
      editor.update(
        () => {
          const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
          tableNode.setStyle(`width: ${parseInt(width, 10)}%`);
        },
        {tag: ['skip-dom-selection']},
      );
    },
    [editor, tableCellNode],
  );

  return (
    <button
      type="button"
      className="item"
      onClick={() => {
        setIsMenuOpen(false);
        editor.getEditorState().read(() => {
          const table = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
          const columnWidths = table.getColWidths();
          showResizingModal('Resize table', () => (
            <div>
              <TextInput
                label="Table width"
                onChange={(value) => {
                  resizeTableAtSelection(value);
                }}
                defaultValue={table.getStyle()}
                type="number"
                append="%"
              />
              {columnWidths?.map((width, index) => (
                <TextInput
                  key={index}
                  label={`Column ${index + 1} width`}
                  defaultValue={width.toString()}
                  type="number"
                  append="%"
                  onChange={(value) => {
                    editor.update(
                      () => {
                        const tableForUpdate =
                          $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
                        const newColumnWidths = [...columnWidths];
                        newColumnWidths[index] = parseInt(value, 10);
                        tableForUpdate.setColWidths(newColumnWidths);
                      },
                      {tag: ['skip-dom-selection']},
                    );
                  }}
                />
              ))}
            </div>
          ));
        });
      }}>
      <span className="text">Resize table</span>
    </button>
  );
};
