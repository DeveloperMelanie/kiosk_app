import { useEffect, useCallback } from 'react'
import useKiosk from 'hooks/useKiosk'
import { formatMoney } from 'helpers'

import Layout from 'layout/Layout'

export default function Total() {
    const { order, name, setName, total, finalizeOrder } = useKiosk()

    const checkOrder = useCallback(() => {
        return order.length === 0 || name === '' || name.length < 3
    }, [order, name])

    useEffect(() => {
        checkOrder()
    }, [order, checkOrder])

    return (
        <Layout page='Confirmar Pedido'>
            <h1 className='text-4xl font-black'>Total y Confirmar Pedido</h1>
            <p className='text-2xl my-10'>Confirma tu pedido a continuación</p>

            <form onSubmit={finalizeOrder}>
                <div>
                    <label
                        htmlFor='name'
                        className='block uppercase text-slate-800 font-bold text-xl'
                    >
                        Nombre
                    </label>
                    <input
                        name='name'
                        id='name'
                        className='bg-gray-100 w-full lg:w-1/3 mt-3 p-2 rounded-md'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className='mt-10'>
                    <p className='text-2xl'>
                        Total a pagar:{' '}
                        <span className='font-bold'>{formatMoney(total)}</span>
                    </p>
                </div>

                <div className='mt-5'>
                    <input
                        className={`${
                            checkOrder()
                                ? 'bg-indigo-100'
                                : 'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'
                        } w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
                        type='submit'
                        value='Confirmar Pedido'
                        disabled={checkOrder()}
                    />
                </div>
            </form>
        </Layout>
    )
}
