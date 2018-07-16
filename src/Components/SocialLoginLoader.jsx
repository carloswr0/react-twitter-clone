import React, { Component } from 'react';
import LoaderCSS from "../Style/loaders.css";
import Menu from '@material-ui/icons/Menu';
/* Saludos, este componente acepta 4 parametros, el 4to siendo opcional. */

/* this.props.isLoading (Boolean) activa el className $isItLoading para que gire.	*/
/* this.props.socialIcon (String) añade el className del icono que se visualizara.	*/
/* this.props.onClick (Function) le hereda al boton la funcion a realizar.			*/

/* El CSS de este componente esta localizado en assets/css/dev/loader.css. 			*/

class SocialLoginLoader extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		if (this.props.onClick) this.props.onClick();
	}
	render() {
		return(
			<div className="Main-SocialLoginLoader" >       
				<div className={`Spinner-SocialLoginLoader ${this.props.isLoading ? 'LoadingAuthentication' : ''}`}></div>   
				<div className="Button-SocialLoginLoader ContentBrush" onClick={this.handleClick}>
					<Menu className="Icon-SocialLoginLoader"/>
				</div>
			</div> 
		)
 	}
}



export default SocialLoginLoader;