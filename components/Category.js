import Image from 'next/image'
import useKiosk from 'hooks/useKiosk'

export default function Category({ category }) {
    const { currentCategory, handleClickCategory } = useKiosk()

    const { name, icon, id } = category

    return (
        <div
            className={`${
                currentCategory?.id === id ? 'bg-amber-400' : ''
            } flex items-center gap-4 w-full border p-5 hover:bg-amber-400 cursor-pointer`}
            onClick={() => handleClickCategory(id)}
        >
            <Image
                width={70}
                height={70}
                src={`/assets/img/icono_${icon}.svg`}
                alt={name}
            />

            <button type='button' className='text-2xl font-bold'>
                {name}
            </button>
        </div>
    )
}
