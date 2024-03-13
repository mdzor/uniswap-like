'use client'

import { ColumnDef } from '@tanstack/react-table'

import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { formatCrypto, formatNumber } from '@/lib/utils'

export type TokenData = {
  name: string
  symbol: string
  price: string
  priceChange1: string
  priceChange24: string
  volume: string
}

export const columns: ColumnDef<TokenData>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Token Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className='font-medium'>{row.getValue('name')}</div>
    }
  },
  {
    accessorKey: 'symbol',
    header: 'Symbol',
  },
  {
    accessorKey: 'platform',
    header: 'Platform',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      return <div className='font-medium'>${formatCrypto(row.getValue('price'))}</div>
    }
  },
  {
      accessorKey: 'priceChange1',
      header: '1H',
      cell: ({ row }) => {
        const priceChange1 = parseFloat(row.getValue('priceChange1'));
        const isNegative = priceChange1 < 0;
        const classNames = isNegative ? 'text-red-600' : 'text-green-500';
        return (
          <div className={classNames} >
            {priceChange1.toFixed(1)}%
          </div>
        );
      }
  },
  {
    accessorKey: 'priceChange24',
    header: '24H',
    cell: ({ row }) => {
      const priceChange24 = parseFloat(row.getValue('priceChange24'));
      const isNegative = priceChange24 < 0;
      const classNames = isNegative ? 'text-red-600' : 'text-green-500';

      return (
        <div className={classNames}>
          {priceChange24.toFixed(1)}%
        </div>
      );
    }
  },
  {
    accessorKey: 'volume',
    header: 'Volume',
    cell: ({ row }) => {
      const volume = parseFloat(row.getValue('volume') as string);
      return <div className='font-medium'>${formatNumber(volume)}</div>
    }
  }
]