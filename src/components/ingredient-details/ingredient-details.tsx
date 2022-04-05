import React,{useEffect,useState} from 'react';
import css from "./ingredient-details.module.css";
import { useSelector } from '../../hooks/hooks';
import {useHistory} from 'react-router-dom';
import { TIngredient } from '../../types'

export const IngredientDetails = () => {
	//let { id } = useParams();
    const history = useHistory();
    const id = history.location.pathname.slice(13);
	type EmptyObject = Record<any, never>|undefined;

	let ingredients = useSelector((store) => store.ingr.data);
	let item:TIngredient|EmptyObject = {};
	let [ingredient, setIngredient] = useState<TIngredient| EmptyObject>({});

    const ingredientId = history.location.pathname.slice(13);

    console.log(ingredientId)
	useEffect(()=>{
		item = ingredients.find(el => el._id === id);  // id пустой!
		setIngredient(item)
	},[id, ingredients]);

	if(!item) {
		return (
			<div>Загружаю ингредиент....</div>
		)
	} else {
		return (
			<div className={css.product_portal}>
				<img src={ingredient?.image} alt={ingredient?.name} className={css.w480}/>
				<span className="text text_type_main-medium">{ingredient?.name}</span>
				<div className={css.product_energy}>
					<span className="text text_type_main-small text_color_inactive">Калории, ккал<br/>{ingredient?.calories}</span>
					<span className="text text_type_main-small text_color_inactive">Белки, г<br/>{ingredient?.proteins}</span>
					<span className="text text_type_main-small text_color_inactive">Жиры, г<br/>{ingredient?.fat}</span>
					<span className="text text_type_main-small text_color_inactive">Углеводы, г<br/>{ingredient?.carbohydrates}</span>
				</div>
			</div>
		);
	}
}