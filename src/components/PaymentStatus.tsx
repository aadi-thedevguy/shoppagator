'use client'

import { pollOrderStatus } from '@/server/payment.server'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWR from 'swr'

interface PaymentStatusProps {
  orderEmail: string
  orderId: string
  isPaid: boolean
}

const PaymentStatus = ({ orderEmail, orderId, isPaid }: PaymentStatusProps) => {
  const router = useRouter()

  const { data } = useSWR(
    isPaid === false ? ['orderStatus', orderId] : null,
    async () => await pollOrderStatus({ orderId }),
    {
      refreshInterval: isPaid ? 0 : 1000,
    },
  )

  useEffect(() => {
    if (data?.isPaid) router.refresh()
  }, [data?.isPaid, router])

  return (
    <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
      <div>
        <p className="font-medium text-gray-900">Shipping To</p>
        <p>{orderEmail}</p>
      </div>

      <div>
        <p className="font-medium text-gray-900">Order Status</p>
        <p>{isPaid ? 'Payment successful' : 'Pending payment'}</p>
      </div>
    </div>
  )
}

export default PaymentStatus
