import React from 'react';
import css from "../product/index.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const IngredientDetails = (props) => {
	console.log( props.productData.name );
	return(
		<div className={css.product_portal} > {/*onClick={()=>setModalActive(true)}*/}
			<img src={props.productData.image} alt={props.productData.name}/>
			<span style={{display: 'inline-flex'}}>
                <span style={{marginRight:'8px'}}>{props.productData.price}</span> <CurrencyIcon type="primary"/>
           </span>
			<span className="text text_type_main-samll" style={{margin: '10px'}}>{props.productData.name}</span>

			<div className={css.product_energy}>
				<span className="text text_type_main-small text_color_inactive" style={{fontSize: '10px'}}>Калории, ккал<br/>{props.productData.calories}</span>
				<span className="text text_type_main-small text_color_inactive" style={{fontSize: '10px'}}>Белки, г<br/>{props.productData.proteins}</span>
				<span className="text text_type_main-small text_color_inactive" style={{fontSize: '10px'}}>Жиры, г<br/>{props.productData.fat}</span>
				<span className="text text_type_main-small text_color_inactive" style={{fontSize: '10px'}}>Углеводы, г<br/>{props.productData.carbohydrates}</span>
			</div>

		</div>
	);
}