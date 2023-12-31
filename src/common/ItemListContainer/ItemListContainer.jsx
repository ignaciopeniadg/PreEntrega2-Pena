import './itemListContainer.css'
import { NavLink, useParams, useNavigate} from 'react-router-dom'
import { useEffect, useState,} from 'react'
import { getItems, getCategorias } from "../../services"
import { ItemList } from "../../common/ItemList/itemList"
import { ItemServicio } from "../../common/ItemServicio/ItemServicio"
/* import { getCategory, getCategories } from "./ProductoItemsCategorias" */

const ItemListContainer = () => {
    const { catId } = useParams();
    const navigate = useNavigate();

    const [Servicios, setItems] = useState ([]);
    const [categorias, setCategorias] = useState ([]);

    useEffect (() => {
        getItems(catId).then((data) => {
            setItems(data);
        });
    }, [catId]);

    useEffect (() => {
        getCategorias().then((data) => {
            setCategorias(data);
        });
    }, []);

    return (
        <>
            <container>
                <nav className='nav__categorias'>
                    <ul>
                        {categorias.map((categoria) => (
                            <li>
                                <NavLink className="nav__categorias-link" to ={`/categoria/${categoria.id}`}>{categoria.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <ItemList  Servicios={Servicios.map(itemServicio => (
                    {
                        ...itemServicio,
                        onItemClicked: () => navigate(`/item-detail/${itemServicio.id}`),
                        textButton: "Ver detalle"
                    }
                )
                
                )} />
            </container>

        </>
    )
}

export { ItemListContainer } 