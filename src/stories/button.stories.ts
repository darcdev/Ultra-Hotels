import { Meta, StoryFn } from '@storybook/angular';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';

export default {
  title: 'Components/Button',
  component: ButtonComponent,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'large'],
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary'],
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['button', 'submit', 'reset'],
      },
    },
    classStyles: {
      control: 'text',
    },
  },
} as Meta;

const Template: StoryFn<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  text: 'Primary Button',
  variant: 'primary',
  size: 'large',
  type: 'button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Secondary Button',
  variant: 'secondary',
  size: 'large',
  type: 'button',
};

export const SmallPrimary = Template.bind({});
SmallPrimary.args = {
  text: 'Small Primary Button',
  variant: 'primary',
  size: 'small',
  type: 'button',
};

export const SmallSecondary = Template.bind({});
SmallSecondary.args = {
  text: 'Small Secondary Button',
  variant: 'secondary',
  size: 'small',
  type: 'button',
};
