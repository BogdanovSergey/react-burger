import React,{useEffect} from 'react';
import css from "./ingredient-details.module.css";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const IngredientDetails = () => {
	let { id } = useParams();
	let ingredients = useSelector(store => store.ingr.data);
	console.log(ingredients)
	const item = ingredients.find(el => el._id === id)
console.log(id)
	if(!item) {
		return 'Загружаю ингредиент....'
	} else {
		return (
			<div className={css.product_portal}> {/*onClick={()=>setModalActive(true)}*/}
				<img src={item.image} alt={item.name} style={{width: '480px'}}/>
				<span className="text text_type_main-medium">{item.name}</span>
				<div className={css.product_energy}>
					<span
						className="text text_type_main-small text_color_inactive">Калории, ккал<br/>{item.calories}</span>
					<span className="text text_type_main-small text_color_inactive">Белки, г<br/>{item.proteins}</span>
					<span className="text text_type_main-small text_color_inactive">Жиры, г<br/>{item.fat}</span>
					<span className="text text_type_main-small text_color_inactive">Углеводы, г<br/>{item.carbohydrates}</span>
				</div>
			</div>
		);
	}
}

IngredientDetails.propTypes = {
	productData : PropTypes.any
}