import { h } from 'vue'
import Actions from '@/components/Actions.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<Report>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all'
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: 'Select row'
      }),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      )
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email'))
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-left' }, 'Amount'),
    cell: ({ row }: any) => {
      const amount = row.getValue('amount')

      return h('div', { class: 'text-left font-medium' }, '$' + amount)
    }
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }: any) => {
      const status = row.getValue('status')

      return h('div', { class: 'text-left font-medium' }, status)
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => {
      const { t } = useI18n()
      return h('div', { class: 'text-center' }, t('Actions'))
    },
    cell: ({ row }: any) => {
      const data = row.original

      return h(
        'div',
        { class: 'relative' },
        h(Actions, {
          data
        })
      )
    }
  }
]
