import React,{useEffect,useState} from 'react';
import css from "./ingredient-details.module.css";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const IngredientDetails = () => {
	let { id } = useParams();
	let ingredients = useSelector(store => store.ingr.data);
	let item = {};
	let [ingredient, setIngredient] = useState({});

	useEffect(()=>{
		item = ingredients.find(el => el._id === id);  // id пустой!
		setIngredient(item)
	},[id, ingredients]);

	if(!item) {
		return 'Загружаю ингредиент....'
	} else {
		return (
			<div className={css.product_portal}> {/*onClick={()=>setModalActive(true)}*/}
				<img src={ingredient?.image} alt={ingredient?.name} style={{width: '480px'}}/>
				<span className="text text_type_main-medium">{ingredient?.name}</span>
				<div className={css.product_energy}>
					<span
						className="text text_type_main-small text_color_inactive">Калории, ккал<br/>{ingredient?.calories}</span>
					<span className="text text_type_main-small text_color_inactive">Белки, г<br/>{ingredient?.proteins}</span>
					<span className="text text_type_main-small text_color_inactive">Жиры, г<br/>{ingredient?.fat}</span>
					<span className="text text_type_main-small text_color_inactive">Углеводы, г<br/>{ingredient?.carbohydrates}</span>
				</div>
			</div>
		);
	}
}

IngredientDetails.propTypes = {
	productData : PropTypes.any
}