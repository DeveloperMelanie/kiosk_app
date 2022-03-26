import Image from 'next/image'
import useKiosk from 'hooks/useKiosk'

import Category from './Category'

export default function Sidebar() {
    const { categories } = useKiosk()

    return (
        <>
            <Image
                width={300}
                height={100}
                src='/assets/img/logo.svg'
                alt='Logotipo'
            />

            <nav className='mt-10'>
                {categories.map(category => (
                    <Category key={category.id} category={category} />
                ))}
            </nav>
        </>
    )
}
