import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './skeleton'

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Skeleton className="w-[100px] h-[20px]" />,
}

export const Circle: Story = {
  render: () => <Skeleton className="w-12 h-12 rounded-full" />,
}

export const Card: Story = {
  render: () => (
    <div className="w-[380px] space-y-4 p-4 border rounded-lg">
      <Skeleton className="h-[200px] w-full rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  ),
}

export const UserProfile: Story = {
  render: () => (
    <div className="flex items-center space-x-4 w-[300px]">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[60%]" />
      </div>
    </div>
  ),
}

export const EventCard: Story = {
  render: () => (
    <div className="w-[320px] border rounded-lg overflow-hidden">
      <Skeleton className="h-[180px] w-full" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  ),
}

export const LoadingGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[680px]">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-3 p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[85%]" />
        </div>
      ))}
    </div>
  ),
}
