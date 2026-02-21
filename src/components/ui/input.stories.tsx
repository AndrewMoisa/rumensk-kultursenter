import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from './input'
import { Mail, Search, Eye } from 'lucide-react'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email...',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const WithValue: Story = {
  args: {
    value: 'Pre-filled value',
    placeholder: 'Enter text...',
  },
}

export const WithIcon: Story = {
  render: () => (
    <div className="relative w-[300px]">
      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder="Email" className="pl-10" type="email" />
    </div>
  ),
}

export const SearchInput: Story = {
  render: () => (
    <div className="relative w-[300px]">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder="Search..." className="pl-10" />
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <form className="w-[300px] space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Name</label>
        <Input placeholder="Enter your name" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Email</label>
        <Input type="email" placeholder="Enter your email" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Message</label>
        <Input placeholder="Your message..." />
      </div>
    </form>
  ),
}
