import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IncrementDecrementValueComponent } from '@/app/presenter/views/shared/components/common/atoms/increment-decrement-value/increment-decrement-value.component';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { provideIcons } from '@ng-icons/core';
import { materialUIIcons } from '@/app/presenter/icons/providerIcons';

export default {
  title: 'Components/IncrementDecrementValue',
  component: IncrementDecrementValueComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, IconComponent],
      providers: [provideIcons({ ...materialUIIcons })], // Aquí añades los viewProviders
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label displayed next to the value',
    },
    max: {
      control: 'number',
      description: 'Maximum value allowed',
    },
    min: {
      control: 'number',
      description: 'Minimum value allowed',
    },
    steps: {
      control: 'number',
      description: 'Step value for increment/decrement',
    },
    control: {
      control: 'object',
      description: 'FormControl instance',
    },
  },
} as Meta<IncrementDecrementValueComponent>;

const Template: StoryFn<IncrementDecrementValueComponent> = (
  args: IncrementDecrementValueComponent
) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  control: new FormControl(1),
  label: 'Items',
  min: 0,
  max: 10,
  steps: 1,
};

export const NoMaxLimit = Template.bind({});
NoMaxLimit.args = {
  control: new FormControl(0),
  label: 'Unlimited Items',
  min: 0,
  max: null,
  steps: 1,
};

export const WithCustomSteps = Template.bind({});
WithCustomSteps.args = {
  control: new FormControl(5),
  label: 'Quantity',
  min: 0,
  max: 20,
  steps: 5,
};

export const OnlyDecrement = Template.bind({});
OnlyDecrement.args = {
  control: new FormControl(1),
  label: 'Decrement Only',
  min: 0,
  max: 5,
  steps: -1,
};
