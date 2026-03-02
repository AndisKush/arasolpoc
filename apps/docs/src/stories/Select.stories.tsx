import type { Meta } from '@storybook/react';
import { Select } from '@andisds/ui';
import { useState } from 'react';

const exampleOptions = [
  { idForm: 1, fieldName: 'Example 1' },
  { idForm: 2, fieldName: 'Example 2' },
  { idForm: 3, fieldName: 'Example 3' },
];

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;

export const Default = () => {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div style={{ width: 300, paddingBottom: 200 }}>
      <Select
        label="Label"
        options={exampleOptions}
        value={selected}
        onChange={setSelected}
        valueKey="idForm" 
        labelKey="fieldName"
        placeholder="`Placeholder text...`"
      />
      <pre style={{ marginTop: 20, fontSize: 12 }}>
        Selected: {JSON.stringify(selected, null, 2)}
      </pre>
    </div>
  );
};