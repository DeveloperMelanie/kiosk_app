import { useRouter } from 'next/router'

const STEPS = [
    { step: 1, name: 'Menú', url: '/' },
    { step: 2, name: 'Resumen', url: '/summary' },
    { step: 3, name: 'Datos y Total', url: '/total' },
]

export default function Steps() {
    const router = useRouter()

    const calculateStep = () => {
        let value
        switch (router.pathname) {
            case '/':
                value = 2
                break
            case '/summary':
                value = 50
                break
            case '/total':
                value = 100
                break
            default:
                break
        }
        return `${value}%`
    }

    return (
        <>
            <div className='flex justify-between mb-5'>
                {STEPS.map(step => (
                    <button
                        key={step.step}
                        className='text-2xl font-bold'
                        onClick={() => router.push(step.url)}
                    >
                        {step.name}
                    </button>
                ))}
            </div>

            <div className='bg-gray-100 mb-10'>
                <div className='rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white progress'></div>
            </div>

            <style jsx>{`
                .progress {
                    width: ${calculateStep()};
                }
            `}</style>
        </>
    )
}
