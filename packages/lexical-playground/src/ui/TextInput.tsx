/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {JSX, ReactNode} from 'react';

import './Input.css';

import * as React from 'react';
import {HTMLInputTypeAttribute} from 'react';

type Props = Readonly<{
  'data-test-id'?: string;
  label: string;
  onChange: (val: string) => void;
  placeholder?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  defaultValue?: string;
  append?: ReactNode;
}>;

export default function TextInput({
  label,
  value,
  onChange,
  placeholder = '',
  'data-test-id': dataTestId,
  type = 'text',
  defaultValue,
  append,
}: Props): JSX.Element {
  return (
    <div className="Input__wrapper">
      <label className="Input__label">{label}</label>
      <div className="Input__input-wrapper">
        <input
          type={type}
          className="Input__input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          data-test-id={dataTestId}
          defaultValue={defaultValue}
        />
        {append}
      </div>
    </div>
  );
}
