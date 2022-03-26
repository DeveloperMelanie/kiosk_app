import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const KioskContext = createContext()

const KioskProvider = ({ children }) => {
    const [categories, setCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState({})
    const [product, setProduct] = useState({})
    const [modal, setModal] = useState(false)
    const [order, setOrder] = useState([])
    const [name, setName] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const fetchCategories = async () => {
        const { data } = await axios.get('/api/categories')
        setCategories(data)
        setCurrentCategory(
            JSON.parse(localStorage.getItem('currentCategory')) ?? data[0]
        )
    }

    useEffect(() => {
        fetchCategories()
        setOrder(JSON.parse(localStorage.getItem('order')) ?? [])
    }, [])

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order))

        const newTotal = order.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        )
        setTotal(newTotal)
    }, [order])

    const handleClickCategory = id => {
        const category = categories.find(category => category.id === id)
        setCurrentCategory(category)
        localStorage.setItem('currentCategory', JSON.stringify(category))

        if (router.pathname !== '/') router.push('/')
    }

    const handleSetProduct = product => {
        setProduct(product)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAddProduct = ({ category, ...product }) => {
        if (order.some(item => item.id === product.id)) {
            // Update quantity
            const updatedOrder = order.map(item =>
                item.id === product.id ? product : item
            )
            setOrder(updatedOrder)
            toast.success('Actualizado correctamente')
        } else {
            const newOrder = [...order, product]
            setOrder(newOrder)
            toast.success('Agregado al pedido')
        }

        setModal(false)
    }

    const handleEditQuantity = id => {
        const productToUpdate = order.find(item => item.id === id)
        setProduct(productToUpdate)
        setModal(true)
    }

    const handleDeleteProduct = id => {
        const updatedOrder = order.filter(item => item.id !== id)
        setOrder(updatedOrder)
        toast.success('Eliminado del pedido')
    }

    const finalizeOrder = async e => {
        e.preventDefault()

        try {
            await axios.post('/api/orders', {
                order,
                name,
                total,
                date: Date.now().toString(),
            })

            // Reset app
            setCurrentCategory(categories[0])
            setOrder([])
            setName('')
            setTotal(0)

            router.push('/')
            setTimeout(
                () => toast.success('Pedido realizado correctamente'),
                500
            )
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <KioskContext.Provider
            value={{
                categories,
                currentCategory,
                handleClickCategory,
                product,
                handleSetProduct,
                modal,
                handleChangeModal,
                order,
                handleAddProduct,
                handleEditQuantity,
                handleDeleteProduct,
                name,
                setName,
                finalizeOrder,
                total,
            }}
        >
            {children}
        </KioskContext.Provider>
    )
}

export { KioskProvider }

export default KioskContext
